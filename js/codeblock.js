function codeSCR(){
  $("div.highlighter-rouge").each(function(){
    $(this).wrap('<div class="code-wrap"></div>');
    $(this).css("position", "absolute");
    let $wrapper = $(this).parent(".code-wrap");
    $wrapper.append('<button class="copy-code icon" onclick="copy_code(this)">file_copy</div>');
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
function copy_code(elem){
  let $temp = $("<textarea>");
  let str = $(elem).parent(".code-wrap").find('td.rouge-code').html();
  $("body").append($temp);
  $temp.val($(str).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
$(document).ready(function(){codeSCR()});
var isDragging = false;
var startPointX;
var isOnDiv = false;
$("div.highlighter-rouge")
.mouseenter(function(){
  isOnDiv=true;
})
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
    let div_margin = $wrapper.attr("inner-width") - $wrapper.width() +15;
    let scr_margin = $scr_back.width() - $scr_bar.width();
    let scr_move = scr_margin * move / div_margin;
    $(this).css("left", move);
    $scr_bar.css("left", -scr_move);
  } else {
    isDragging = false;
  }
})
.mouseup(function() {
  isDragging = false;
})
.bind("touchstart", function(event){
  isDragging = true;
  startPointX = event.originalEvent.touches[0].pageX;
})
.bind("touchmove", function(event){
  if(isDragging){
    let move = Math.round((event.originalEvent.touches[0].pageX - startPointX) * 1.5);
    let maxMove = $(this).parent('.code-wrap').width() - $(this).width() - 15;
    if(move >= 0){
      move = 0;
    } else if (move <= maxMove ) {
      move = maxMove;
    }
    let $wrapper = $(this).parent(".code-wrap")
    let $scr_back = $wrapper.children('.background');
    let $scr_bar = $scr_back.children('.bar');
    let div_margin = $wrapper.attr("inner-width") - $wrapper.width() +15;
    let scr_margin = $scr_back.width() - $scr_bar.width();
    let scr_move = scr_margin * move / div_margin;
    $(this).css("left", move);
    $scr_bar.css("left", -scr_move);
  } else {
    isDragging = false;
  }
})
.bind("touchend", function(event){
  isDragging = false;
});
