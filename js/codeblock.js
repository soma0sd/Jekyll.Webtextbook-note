function codeSCR(){
  $("div.highlighter-rouge").each(function(){
    $(this).wrap('<div class="code-wrap"></div>');
    $(this).css("position", "absolute");
    let $wrapper = $(this).parent(".code-wrap");
    if($wrapper.width() < $(this).width()){
      $wrapper.height($(this).height() + 15);
      $wrapper.attr("inner-width", $(this).width());
      $wrapper.attr("scr-x", "on");
      $wrapper.append('<div class="background"><div class="bar"></div></div>');
      let $scr_back = $wrapper.children('.background');
      let $scr_bar  = $scr_back.children('.bar');
      let scr_bar_width = $scr_back.width() * $wrapper.width() / $(this).width();
      $scr_bar.width(scr_bar_width);
    } else {
      $wrapper.height($(this).height());
      $wrapper.attr("scr-x", "off");
    }
  });
}
$(document).ready(function(){codeSCR()});
var isDragging = false;
var startPointX;
var isOnDiv = false;
$("div.highlighter-rouge")
.mouseenter(function(){isOnDiv=true;})
.mouseleave(function(){isOnDiv=false;})
.mousedown(function(event){
    isDragging = true;
    startPointX = event.pageX;
})
.mousemove(function(event){
  if(isDragging && isOnDiv){
    let move = Math.round((event.pageX - startPointX) * 1.5);
    let maxMove = $(this).parent('.code-wrap').width() - $(this).width() - 15;
    if(move >= 0){
      move = 0;
    } else if (move <= maxMove ) {
      move = maxMove;
    }
    let $wrapper = $(this).parent(".code-wrap")
    let $scr_back = $wrapper.children('.background');
    let $scr_bar = $scr_back.children('.bar');
    let scr_bar_width = $scr_back.width() * $wrapper.width() / $(this).width();
    let scr_move = ($scr_back.width() - scr_bar_width ) * move / ($wrapper.width() - $(this).width());
    $(this).css("left", move);
    $scr_bar.css("left", scr_move);
  } else {
    isDragging = false;
  }
})
.mouseup(function() {
  isDragging = false;
});
