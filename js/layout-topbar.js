var prevScrollpos = window.pageYOffset;
$(window).scroll(function(event){
  let currentScrollPos = window.pageYOffset;
  is_scrolling = true;
  if (prevScrollpos == 0) {
    $("#topbar-outer").removeClass('hide');
  } else if (prevScrollpos > currentScrollPos){
    $("#topbar-outer").removeClass('hide');
  } else {
    $("#topbar-outer").addClass('hide');
  }
  prevScrollpos = currentScrollPos;
});
