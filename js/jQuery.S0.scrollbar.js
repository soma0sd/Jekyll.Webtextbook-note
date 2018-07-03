(function($){
// start plugin
$.fn.S0ScrollX = function(options){
  // init options
  var opt = $.extend({
    copy: false,
    button_background: "#FFFFFF",
    button_color: "#000000",
    content: "",
    target: ''
  }, options);
  // variables
  var isDragging  = false;
  var startPointX = 0;
  let barHeight  = 8; //px
  let wrapClass  = " scr-wrap scr-X";
  let itemClass  = " scr-item scr-X";
  let trackClass = " scr-bar scr-X scr-track";
  let thumbClass = " scr-bar scr-X scr-thumb";
  let copyBtnClass = " scr-btn item-copy ripple"
  // sub-functions
  function divHtml(cls){
    return $("<div></div>").addClass(cls)
  }
  function getClass(cls){
    return cls.replace(/\s+/g, '.').replace(/\.+$/, '')
  }
  function resizeView(view){
    // elem is wrapper
    // init doms
    let $scrItem  = $(view).find(getClass(itemClass));
    let $scrTrack = $(view).find(getClass(trackClass));
    let $scrThumb = $(view).find(getClass(thumbClass));
    // get variables
    let ratioW = $(view).width() / $scrItem.width();
    // scrollbar on/off
    if(ratioW >= 1){
      $(view)
        .attr('scr-x', 'off')
        .attr('left', '0')
        .css('cursor', 'unset');
      $scrTrack.hide();
    } else {
      $(view)
        .attr('scr-x', 'on')
        .attr('left', '0')
        .css('cursor', 'e-resize');
      $scrTrack.show();
    }
    // scrollbar resizing
    $scrItem.css('left', 0);
    $scrThumb.css('left', 0);
    $scrThumb.width(ratioW * $scrTrack.width());
  }
  function moveView(view, pageX){
    if(!isDragging){return false}
    // elem is wrapper
    let $scrItem  = $(view).find(getClass(itemClass));
    let $scrTrack = $(view).find(getClass(trackClass));
    let $scrThumb = $(view).find(getClass(thumbClass));
    // get variables
    let startLeft = parseInt($(view).attr('left'));
    let afterLeft = startLeft + pageX - startPointX;
    let itemMargin = $(view).width() - $scrItem.width();
    let scrMargin = $scrTrack.width() - $scrThumb.width();
    let scrRatio = scrMargin / itemMargin;
    if(afterLeft >= 0){
      afterLeft = 0;
    }else if (afterLeft < itemMargin) {
      afterLeft = itemMargin;
    }
    // set move
    $(view).attr('left', String(afterLeft));
    $scrItem.css('left', afterLeft);
    $scrThumb.css('left', afterLeft * scrRatio);
    startPointX = pageX;
  }
  // setup
  $(this).each(function(i, elem){
    // create view
    $(elem).addClass(itemClass);
    $(elem).wrap(divHtml(wrapClass));
    let $wrap = $(elem).parent(getClass(wrapClass));
    // create scrollbar
    let $scrTrack = $(divHtml(trackClass)).appendTo($wrap);
    let $scrThumb = $(divHtml(thumbClass)).appendTo($scrTrack);
    let $copyBtn = null;
    if(opt.copy){
      let $copyBtn = $(divHtml(copyBtnClass).appendTo($wrap));
      $copyBtn
      .html(opt.content)
      .attr('target', opt.target)
      .css('position', 'absolute')
      .css('right', '0.5rem')
      .css('top', '0.5rem')
      .css('width', '2.5rem')
      .css('height', '2.5rem')
      .css('line-height', '2.5rem')
      .css('background', opt.button_background)
      .css('color', opt.button_color)
      .css('text-align', 'center')
      .css('vertical-align', 'middle')
      .css('border-radius', '50%')
      .css('box-shadow', '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)');
    }
    // init view & scrollbar style
    $(elem).css('position', 'absolute')
      .css('left', 0).css('top', 0);
    $wrap.height($(elem).height() + barHeight + 3)
      .css('position', 'relative')
      .css('overflow-x', 'hidden');
    $scrTrack.height(barHeight)
      .css('left', 0).css('right', 0).css('bottom', 0)
      .css('background', "rgba(0,0,0,.2)")
      .css('border-radius', "4px")
      .css('position', 'absolute');
    $scrThumb.css('position', 'absolute')
      .css('left', 0).css('top', 0).css('bottom', 0)
      .css('background', "rgba(0,0,0,.2)")
      .css('border-radius', "4px")
      .css('min-width', '20px');
    resizeView($wrap);
    $wrap
      .mousedown(function(event){
        if($(this).attr('scr-x') == "on"){
          startPointX = event.pageX;
          isDragging = true;
        }
      })
      .mouseup(function(event){
        isDragging = false;
      })
      .mousemove(function(event){
        moveView(this, event.pageX);
      })
      .bind("touchstart", function(event){
        if($(this).attr('scr-x') == "on"){
          startPointX = event.originalEvent.touches[0].pageX;
          isDragging = true;
        }
      })
      .bind("touchmove", function(event){
        moveView(this, event.originalEvent.touches[0].pageX)
      })
      .bind("touchend", function(event){
        isDragging = false;
      });
  });
  $(getClass(copyBtnClass)).off().click(function(){
    let $wrap = $(this).parents(getClass(wrapClass));
    let $code;
    if($(this).attr('target') == ""){
      $code = $wrap.find(getClass(itemClass));
    } else {
      $code = $wrap.find(getClass(itemClass)).find($(this).attr('target'));
    }
    let $tmpDiv = $('<div>복사되었습니다</div>').appendTo($wrap);
    $tmpDiv
      .css('position', 'absolute')
      .css('top', '0').css('bottom', '0').css('left', '0').css('right', '0')
      .css('background', 'rgba(0,0,0,0.4)')
      .css('color', '#FFFFFF')
      .css('text-align', 'center')
      .css('line-height', $wrap.height() + 'px')
      .css('z-index', '10');
    let $text = $('<textarea id="tmp-copy"></Hello World>').appendTo($wrap);
    $text.val($code.text());
    $text.select();
    document.execCommand("copy");
    $text.remove();
    $tmpDiv.fadeIn(400).fadeOut(1000).delay(1400).queue(function(){ $(this).remove()});
  });
  $(window).resize(function(){
    $(getClass(wrapClass)).each(function(){resizeView(this)});
  });
}
// End plugin
})(jQuery);


$('div.highlighter-rouge').S0ScrollX({
  copy: true,
  button_background: "rgba(0, 121, 107, 0.8)",
  button_color: "#FFFFFF",
  content: '<span class="icon">file_copy<span>',
  target: '.rouge-code'
});
$('div.equation').S0ScrollX();
