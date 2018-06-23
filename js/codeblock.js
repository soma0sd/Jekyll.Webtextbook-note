// button action
// ======================
function copy_code(elem){
  let $temp = $("<textarea>");
  let str = $(elem).parent(".code-wrap").find('td.rouge-code').html();
  $("body").append($temp);
  $temp.val($(str).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

// sub function
// ======================
function codeblock_init(elem){
  // eleme: div.highlighter-rouge single element
  $(elem).wrap('<div class="code-wrap"></div>');
  let $wrapper = $(elem).parent('.code-wrap');
  $wrapper.append('<button class="copy-code icon" onclick="copy_code(this)">file_copy</div>');
  $wrapper.append('<div class="background"><div class="bar"></div></div>');
}
function codeblock_bar_resize(elem){
  // eleme: div.highlighter-rouge single element
  let $wrapper = $(elem).parent('.code-wrap');
  let $scr_back = $wrapper.children('.background');
  let $scr_bar  = $scr_back.children('.bar');
  if($wrapper.width() < $(elem).width()){
    $wrapper.attr("scr-x", "on");
    $wrapper.height($(elem).height() + 15);
    $scr_back.show();
  } else {
    $wrapper.height($(elem).height());
    $wrapper.attr("scr-x", "off");
    $scr_back.hide();
  }
  if($wrapper.attr("scr-x") == "off"){return false}
  let scr_bar_width = $scr_back.width() * $wrapper.width() / ($(elem).width() + 25);
  $scr_bar.width(scr_bar_width);
}

var isDragging = false;
var startPointX;
var isOnDiv = false;
function codeblock_on_move(elem, dx){
  // elem: div.highlighter-rouge single element
  let $wrapper = $(elem).parent('.code-wrap');
  if($wrapper.attr("scr-x") != "on"){return false}
  if(!isDragging || !isOnDiv){return false}
  let $scr_back = $wrapper.children('.background');
  let $scr_bar  = $scr_back.children('.bar');
  let scr_margin  = $scr_back.width() - $scr_bar.width();
  let code_margin = $wrapper.width() - $(elem).width() - 25;
  let code_pre_move = $(elem).position().left;
  let code_move = code_pre_move + dx;
  if (code_move < code_margin){
    code_move = code_margin;
  } else if (code_move > 0) {
    code_move = 0;
  }
  let bar_move = scr_margin * code_move / code_margin;
  $scr_bar.css("left", bar_move);
  $(elem).css("left", code_move);
}

// events
// ======================
$(document).ready(function(){
  $("div.highlighter-rouge").each(function(){
    codeblock_init(this);
    codeblock_bar_resize(this);
  });
});
$(window).resize(function(){
  $("div.highlighter-rouge").each(function(){
    codeblock_bar_resize(this);
  });
});


$("div.highlighter-rouge")
.mouseenter(function(){isOnDiv=true;})
.mouseleave(function(){isOnDiv=false;})
.mousedown(function(event){
  isDragging = true;
  startPointX = event.pageX;
})
.mousemove(function(event){
  codeblock_on_move(this, event.pageX - startPointX)
})
.mouseup(function() {
  isDragging = false;
})
.bind("touchstart", function(event){
  isOnDiv = true;
  isDragging = true;
  startPointX = event.originalEvent.touches[0].pageX;
})
.bind("touchmove", function(event){
  codeblock_on_move(this, event.originalEvent.touches[0].pageX - startPointX)
})
.bind("touchend", function(event){
  isDragging = false;
  isOnDiv = false;
});
