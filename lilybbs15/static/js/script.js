/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/10/16
 *
 * @author Blair Mitchelmore
 * @version 1.2
 *
 **/

jQuery.fn.extend({everyTime:function(c,a,d,b){return this.each(function(){jQuery.timer.add(this,c,a,d,b)})},oneTime:function(c,a,d){return this.each(function(){jQuery.timer.add(this,c,a,d,1)})},stopTime:function(c,a){return this.each(function(){jQuery.timer.remove(this,c,a)})}});
jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(void 0===c||null===c)return null;var a=this.regex.exec(jQuery.trim(c.toString()));return a[2]?parseFloat(a[1])*(this.powers[a[2]]||1):c},add:function(c,a,d,b,e){var g=0;jQuery.isFunction(d)&&(e||(e=b),b=d,d=a);a=jQuery.timer.timeParse(a);if(!("number"!=typeof a||isNaN(a)||0>a)){if("number"!=typeof e||isNaN(e)||0>e)e=
0;var e=e||0,f=jQuery.data(c,this.dataKey)||jQuery.data(c,this.dataKey,{});f[d]||(f[d]={});b.timerID=b.timerID||this.guid++;var h=function(){(++g>e&&e!==0||b.call(c,g)===false)&&jQuery.timer.remove(c,d,b)};h.timerID=b.timerID;f[d][b.timerID]||(f[d][b.timerID]=window.setInterval(h,a));this.global.push(c)}},remove:function(c,a,d){var b=jQuery.data(c,this.dataKey),e;if(b){if(a){if(b[a]){if(d)d.timerID&&(window.clearInterval(b[a][d.timerID]),delete b[a][d.timerID]);else for(d in b[a])window.clearInterval(b[a][d]),
delete b[a][d];for(e in b[a])break;e||(e=null,delete b[a])}}else for(a in b)this.remove(c,a,d);for(e in b)break;e||jQuery.removeData(c,this.dataKey)}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(c,a){jQuery.timer.remove(a)})});



/* Author: Clippit

*/


$(function(){
	$('.floating-rocket').everyTime(10, function () {
			$(".floating-rocket").animate({
				marginTop: "+=10",
				marginLeft: "+=5"
			}, 1000, 'linear').animate({
				marginTop: "-=10",
				marginLeft: "-=5"
			}, 1000, 'linear');
	});
});




