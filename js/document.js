$(document).ready(function(){
  $('.reversefootnote').each(function(index, el) {
    let sup_txt = $(this).find('sup').html();
    if(sup_txt) {
      $(this).html('<span class="icon">vertical_align_top</span><sup>' + sup_txt + '</sup>');
    } else {
      $(this).html('<span class="icon">vertical_align_top</span>');
    }
  });
});
