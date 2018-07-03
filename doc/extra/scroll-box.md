---
---
가로 길이가 긴 코드블럭이나 수식이 잘려보이는 현상을 방지하기 위해 가로방향 스크롤을 적용해야 했습니다. 하지만 기본 스크롤바가 스타일과 잘 어울리지도 않고, 마우스로는 가로방향 스크롤이 불편하여 jQuery 플러그인을 만들었습니다.

# 예시
**코드블럭**

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

**수식**

$$ N_n(t) = \sum_{i=1}^n \left [ N_i(0) \times \left ( \prod_{j=i}^{n-1} \lambda_j \right ) \times
\left ( \sum_{j=i}^n \left ( \frac{e^{-\lambda_j t}}{\prod_{p=i, p\neq j}^n (\lambda_p-\lambda_j)} \right ) \right ) \right ] $$

# 기본 틀

전체 소스코드는 [`jQuery.S0.scrollbar.js`]에서 볼수 있습니다.
여기서는 구현 방식만 간략하게 서술합니다.
플러그인은 jQuery 라이브러리를 불러 온 이후에 불러와야 하며
`$(selector).S0ScrollX()`로 각 요소에 적용합니다.

[`jQuery.S0.scrollbar.js`]: https://raw.githubusercontent.com/soma0sd/Jekyll.Webtextbook-note/master/js/jQuery.S0.scrollbar.js

가장 먼저, 스크롤을 적용할 요소를 감싸는 `div`를 만들고 요소와 함께 스크롤바를 그릴 요소도 새로 만들었습니다. 요소를 감싸는 컨테이너는 `position: relative`속성을,
스크롤하는 요소는 `position: absolute`를 가지게 됩니다.


# 드래그 이벤트

스크롤 할 `div`위에서 옆으로 드래그하면 내용물이 움직이는 방식입니다.
컨테이너 안 요소의 `left`스타일 값을 조정하면 내용물이 스크롤 되는 효과를 만들 수 있습니다.

## 이벤트 함수
드래그는 <kbd>마우스 버튼 누름</kbd> - <kbd>마우스 움직임</kbd> - <kbd>마우스 버튼 뗌</kbd>으로 이루어져 있습니다. 터치도 비슷합니다. jQuery는 해당하는 옵션을 다음과 같이 제공합니다.

* `$.mousedown(fn(event){ })`
* `$.mouseup(fn(event){ })`
* `$.mousemove(fn(event){ })`
* `$.bind("touchstart", fn(event){ })`
* `$.bind("touchmove", fn(event){ })`
* `$.bind("touchend", fn(event){ })`

## 포인터의 위치
이벤트에 따라 포인터의 위치를 저장하거나 읽어들여 계산에 사용해야 합니다.
문서 내에서 포인터의 좌표는 마우스를 사용하는 경우와 터치를 사용하는 경우가 다릅니다.

* `event.pageX`: 마우스를 사용하는 경우
* `event.originalEvent.touches[0].pageX`: 터치스크린을 사용하는 경우

# 화면 크기 변경 이벤트
PC에서 브라우저의 너비를 변경한다거나, 스마트폰에서 세로보기/가로보기를 변겨아는 경우
레이아웃 스타일이 변경되면서 문서영역의 너비가 변경됩니다.


## 스크롤 여부 결정
이때 어떤 컨텐츠는 스크롤을 하지 않아도 괜찮을 정도의 너비를 확보할 수도 있고,
어떤 컨텐츠는 너비가 불충분하여 스크롤이 필요한 경우가 있습니다.

```js
function resizeView(view){
  // view is wrapper
  // init doms
  let $scrItem  = $(view).find(getClass(itemClass));  // 스크롤 대상 요소
  let $scrTrack = $(view).find(getClass(trackClass)); // 스크롤바 트랙
  let $scrThumb = $(view).find(getClass(thumbClass)); // 스크롤바 버튼
  // 요소의 너비와 컨테이너의 너비간 비율
  let ratioW = $(view).width() / $scrItem.width();
  // 조건에 따라 스크롤바를 켜고 끔
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
  // 스크롤 위치 초기화
  $scrItem.css('left', 0);
  $scrThumb.css('left', 0);
  // (생략) 스크롤바 크기 재설정
}
```

## 스크롤바 크기 재설정

너비가 바뀌면 스크롤바의 크기도 바뀝니다. 트랙:버튼 = 요소 너비:컨테이너 너비의 비례식을 활용하였습니다.

```js
function resizeView(view){
  // elem is wrapper
  // init doms
  let $scrItem  = $(view).find(getClass(itemClass));
  // get variables
  let ratioW = $(view).width() / $scrItem.width();
  // ...
  // (생략)
  // ...
  $scrThumb.width(ratioW * $scrTrack.width());
}
```

# 추가 기능: 복사 버튼
이 테마의 경우, 소스코드와 수식에서 드래그 액션은 스크롤에 사용됩니다.
수식은 괜찮을지 몰라도, 소스코드의 경우에 드래그는 내용 복사를 위한 행동일 수 있습니다.
때문에 따로 복사 버튼을 만들어 스크롤 요소 우상단에 붙였습니다.

```js
// 복사 버튼 생성
if(opt.copy){
let $copyBtn = $(divHtml(copyBtnClass).appendTo($wrap));
// 복사버튼 스타일 설정 //
}
//...//

// 복사 기능
$(getClass(copyBtnClass)).off().click(function(){
  let $text = $('<textarea id="tmp-copy"></Hello World>').appendTo($wrap);
  // ... //
  $code = $wrap.find(getClass(itemClass));
  // ... //
  $text.val($code.text());
  $text.select();
  document.execCommand("copy");
  $text.remove();
});
```
