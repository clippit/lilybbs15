/* Author: Clippit

*/

(function(){

  $(".voteup").on('click', function(e) {
    e.preventDefault();
    $this = $(this);
    if ($this.hasClass('disabled')) {
      return;
    }
    $.ajax({
      type: 'POST',
      url: 'voteup',
      data: {cid: $this.data('cid')},
      success: function (data, textStatus, jqXHR) {
        if (data == 'ok') {
          $this.addClass('disabled').children('span').text('已赞');
        }
      }
    });
  });
  
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

})();

