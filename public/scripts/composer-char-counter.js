$(document).ready(function() {
  // const $
  $('textarea').keyup(function (){
    const $input = $(this);
    const valueLength = $input.val().length;
    
    let limit = 140
    const finalCount = (limit - valueLength);
    let $counter = $input.parents().find(".counter");

    if (finalCount < 0){
      $counter.css("color", "red")
    } else {
      $counter.css("color", "#545149")
    }
    $counter.text(finalCount)
  })
});