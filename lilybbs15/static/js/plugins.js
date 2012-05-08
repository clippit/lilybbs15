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



/*!
 * jQuery Countdown plugin v1.0
 * http://www.littlewebthings.com/projects/countdown/
 *
 * Copyright 2010, Vassilis Dourdounis
 * 
 **/

(function(b){b.fn.countDown=function(a){config={};b.extend(config,a);diffSecs=this.setCountDown(config);config.onComplete&&b.data(b(this)[0],"callback",config.onComplete);config.omitWeeks&&b.data(b(this)[0],"omitWeeks",config.omitWeeks);b("#"+b(this).attr("id")+" .digit").html('<div class="top"></div><div class="bottom"></div>');b(this).doCountDown(b(this).attr("id"),diffSecs,500);return this};b.fn.stopCountDown=function(){clearTimeout(b.data(this[0],"timer"))};b.fn.startCountDown=function(){this.doCountDown(b(this).attr("id"),
b.data(this[0],"diffSecs"),500)};b.fn.setCountDown=function(a){var c=new Date;a.targetDate?c=new Date(a.targetDate.month+"/"+a.targetDate.day+"/"+a.targetDate.year+" "+a.targetDate.hour+":"+a.targetDate.min+":"+a.targetDate.sec+(a.targetDate.utc?" UTC":"")):a.targetOffset&&(c.setFullYear(a.targetOffset.year+c.getFullYear()),c.setMonth(a.targetOffset.month+c.getMonth()),c.setDate(a.targetOffset.day+c.getDate()),c.setHours(a.targetOffset.hour+c.getHours()),c.setMinutes(a.targetOffset.min+c.getMinutes()),
c.setSeconds(a.targetOffset.sec+c.getSeconds()));diffSecs=Math.floor((c.valueOf()-(new Date).valueOf())/1E3);b.data(this[0],"diffSecs",diffSecs);return diffSecs};b.fn.doCountDown=function(a,c,d){$this=b("#"+a);0>=c&&(c=0,b.data($this[0],"timer")&&clearTimeout(b.data($this[0],"timer")));secs=c%60;mins=Math.floor(c/60)%60;hours=Math.floor(c/60/60)%24;days=!0==b.data($this[0],"omitWeeks")?Math.floor(c/60/60/24):Math.floor(c/60/60/24)%7;weeks=Math.floor(c/60/60/24/7);$this.dashChangeTo(a,"seconds_dash",
secs,d?d:800);$this.dashChangeTo(a,"minutes_dash",mins,d?d:1200);$this.dashChangeTo(a,"hours_dash",hours,d?d:1200);$this.dashChangeTo(a,"days_dash",days,d?d:1200);$this.dashChangeTo(a,"weeks_dash",weeks,d?d:1200);b.data($this[0],"diffSecs",c);0<c?(e=$this,t=setTimeout(function(){e.doCountDown(a,c-1)},1E3),b.data(e[0],"timer",t)):(cb=b.data($this[0],"callback"))&&b.data($this[0],"callback")()};b.fn.dashChangeTo=function(a,c,d,g){$this=b("#"+a);for(a=$this.find("."+c+" .digit").length-1;0<=a;a--){var f=
d%10,d=(d-f)/10;$this.digitChangeTo("#"+$this.attr("id")+" ."+c+" .digit:eq("+a+")",f,g)}};b.fn.digitChangeTo=function(a,c,d){d||(d=800);b(a+" div.top").html()!=c+""&&(b(a+" div.top").css({display:"none"}),b(a+" div.top").html(c?c:"0").slideDown(d),b(a+" div.bottom").animate({height:""},d,function(){b(a+" div.bottom").html(b(a+" div.top").html());b(a+" div.bottom").css({display:"block",height:""});b(a+" div.top").hide().slideUp(10)}))}})(jQuery);
