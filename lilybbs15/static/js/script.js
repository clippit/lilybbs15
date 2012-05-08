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


  $("#countdown").countDown({
    targetDate: {
       'day'   : 9,
       'month' : 6,
       'year'  : 2012,
       'hour'  : 17,
       'min'   : 0,
       'sec'   : 0
     },
    omitWeeks: true
  });



});