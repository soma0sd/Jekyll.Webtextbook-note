---
---
메타태그를 포함하여 `<head>`태그 안에 들어가는 요소들을 다룹니다. `<head>`태그는 문서 본문을 읽기 전에 브라우저나 웹서비스가 그 문서에 대해 알아둬야 할 요소들이 들어있습니다. 또한, 본문을 불러오기 전에 불러와야 할 스타일 정의나 스크립트도 여기에 들어갑니다.

# 스타일 정의 & 스크립트 로드

## 문서 내에 스타일 시트 추가
```html
<style type="text/css">
body { ... }
</style>
```

## 스타일시트 파일 불러오기
```html
<link rel="stylesheet" href="css/style.css">
```

## 문서 내에 스크립트 추가
```html
<script>
var foo = "var";
</script>
```

## 스크립트 파일 불러오기
```html
<!-- HTML5 기본 -->
<script src="js/function.js"></script>
<!-- 비동기 로드 -->
<script async src="js/function.js"></script>
```

# SEO: 메타 정보

## 브라우저를 위한 정보
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no">
```
* `charset`는 페이지가 어떤 문자로 인코딩 되어있는지를 나타냅니다. UTF-8은 유니코드 텍스트를 의미합니다.
* `name="viewport"`는 스타일 시트가 화면 정보를 이용할 수 있도록 하며, 페이지를 임의로 확대/축소할 수 있는지의 여부 등을 정할 수 있습니다. 반응형 페이지를 구성한다면 반드시 이 태그가 있어야 합니다.

## 페이지 기본 정보
이 정보는 외부 어플리케이션이나 검색엔진 등이 참고합니다.

```html
<meta name="author" content="제작자/소유자">
<meta name="description" content="간단한 페이지 설명">
<meta name="creator" content="제작자">
<meta name="publisher" content="문서를 게시한 사람/업체">
```

## 오픈그래프(Open Graph)
[Open Graph](http://ogp.me/)프로토콜을 이용해 카카오톡, 페이스북 등에서 하이퍼링크를 사용했을 때 보이는 축약정보를 설정합니다.

```html
<meta property="og:title" content="문서의 이름">
<meta property="og:site_name" content="사이트 이름">
<meta property="og:type" content="문서 종류">
<meta property="og:url" content="매개변수 등을 제거한 표준 URL">
<meta property="og:image" content="문서를 설명하는 이미지">
<meta property="og:description" content="간단한 문서 설명">
<meta property="og:locale" content="ko_KR">
```

# 그 외

```html
<title>페이지 이름</title>
<link rel="icon" href="favicon.ico">
```
`<title>`은 페이지 탭 등에서 보일 이름, `rel=icon` 속성을 가진 `<lik>`태그는 페이지 즐겨찾기 아이콘, 페이지탭에서 보이는 아이콘 등 페이지를 나타내는 아이콘입니다.
