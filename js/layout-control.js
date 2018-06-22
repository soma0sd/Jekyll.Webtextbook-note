// Button callback Action
// ==============================================
function nav_open(){
  $("#nav-outer").addClass('active');
  $("#nav-outer").after('<div id="nav-overlay" onClick="nav_close()"></div>');
}
function nav_close(){
  $("#nav-outer").removeClass('active');
  $("#nav-overlay").remove();
}
function toc_open(){
  $("#article-toc").addClass('active');
}
function toc_close(){
  $("#article-toc").removeClass('active');
}

// Section Shortcuts
// ==============================================
var $toc_item = $("#markdown-toc a");
var topber_height = $("#topbar-outer").height();
var is_scrolling;
$toc_item.click(function(e) {
  e.preventDefault();
  $("#article-toc").removeClass('active');
  let target_top = $($(this).attr("href")).offset().top;
  let scroll_to = target_top - topber_height;
  $("html, body").stop().animate({scrollTop: scroll_to}, 300, 'swing');
});

function sub_scrollspy(){
  let thisTop = $(document).scrollTop()+topber_height+1;
  $toc_item.removeClass('active');
  $toc_item.each(function(index, el){
    if(index == $toc_item.length-1){
      $(this).addClass('active');
      return false;
    }
    let elemTop = $($(this).attr("href")).offset().top;
    let nextTop = $($toc_item.eq(index + 1).attr("href")).offset().top;
    if(0 <= thisTop && thisTop < elemTop && index == 0){
      return false;
    }
    if(elemTop <= thisTop && nextTop > thisTop){
      $(this).addClass('active');
      return false;
    }
  });
}
$(document).ready(function(){
  sub_scrollspy();
});
setInterval(function(){
  if(is_scrolling){
    sub_scrollspy();
    is_scrolling = false;
  }
}, 250);
