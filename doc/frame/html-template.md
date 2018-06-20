---
---

홈페이지의 공통요소들을 담을 틀을 만들고 태그 `id`와 `class`를 활용하여 스타일을 정의할 수 있도록 준비합니다.

# 시멘틱 태그
HTML을 이용해 문서를 구성하는 경우 정보를 담는 상자를 `<div>`로 구분합니다. 이런 것들을 비시멘틱 요소라고 합니다. 비시멘틱 요소를 사용해 페이지의 레이아웃을 꾸미면 아래와 비슷한 모양이 됩니다.

```html
<body>
  <div id="topbar-wrap">상단바</div>
  <div id="sidebar-wrap">사이드바</div>
  <div id="main">
    <div id="header">제목</div>
    <div id="article">본문</div>
    <div id="footer">바닥글</div>
  </div>
</body>
```

시멘틱 요소는 태그의 이름은 의미를 가지고 있지만 기능은 `<div>`와 동일합니다. 시멘틱 요소를 사용해 위의 레이아웃을 재구성하면 다음과 같습니다.

```html
<body>
  <nav>상단바</nav>
  <aside>사이드바</aside>
  <main>
    <header>제목</header>
    <article>본문</article>
    <footer>바닥글</footer>
  </main>
</body>
```

시멘틱 태그를 활용해서 레이아웃을 구성하면 어떤 태그가 어디서 닫히는지 명확하게 보입니다. 위의 경우에는 아주 단순한 내용만 들어있지만 내용을 채워나가다 보면 여닫는 두 태그 사이가 한참 멀어지게 됩니다.
