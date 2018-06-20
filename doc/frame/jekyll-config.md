---
---
Jekyll은 웹페이지를 만들기 전에 <kbd>_config.yml</kbd>에 기록되어있는 설정을 참고합니다. 테마에 적합한 설정을 작성합니다.

# 기본 정보

```yaml
title: 사이트 이름
email: user@domain.com
author: user
```

* **title**: 표시할 사이트의 이름을 설정합니다.
* **email**: 연락처를 설정합니다.
* **author**: 제작자/소유자의 명칭을 설정합니다.

이것들은 기본적인 내용들이고, 여기에 제작자의 SNS 주소등이 필요하면 글로벌 변수로 등록하여 템플릿에 적용할 수 있습니다.

# URL 정보
`absolute_url`등 템플릿에서 자원이나 내부URL을 사용할 때 사용하는 항목입니다.

```yaml
url: "https://soma0sd.github.io"
baseurl: "/repo"
docurl: "doc/"
```

* **url**: 홈페이지 도메인을 입력합니다. `http://`나 `https://`까지 함께 입력해야 오류가 발생하지 않습니다.
* **baseurl**: `user.github.io`가 아닌 저장소에서 GitHub Pages를 사용하거나 할 때 `url`속성은 메인페이지를, `baseurl`속성은 이 테마를 적용할 하위페이지의 상대주소가 됩니다.
* **docurl**: 문서파일의 URL과 디렉토리를 설정합니다. 기본값은 `doc/`입니다.

# Jekyll 시스템 설정
Jekyll의 기본 시스템 설정입니다.

```yaml
timezone: Asia/Seoul
permalink: pretty
encoding: UTF-8
markdown: kramdown
highlighter: rouge
```

* **timezone**: 시간대 설정입니다.
* **permalink**: URL설정입니다. 기본 설정은 읽어들이는 `www.home.com/doc.html`처럼 문서의 확장자까지 표시됩니다. `pretty`로 설정하면 `www.home.com/doc/`와 같이 확장자 없는 깔끔한 URL로 표시합니다.
* **encoding**: 문서들의 인코딩 방식을 설정합니다.
* **markdown**: 마크다운 문서를 변환할 라이브러리를 선택합니다.
* **highlighter**: 하이라이트 된 코드블럭을 사용하려는 경우 하이라이트에 사용할 라이브러리를 선택합니다.

만들고 있는 테마는 한종류의 레이아웃만 사용합니다. 이런 경우 다음과 같은 기본값 설정을 미리 해두면, 문서마다 번거롭게 같은 내용을 입력할 필요가 없습니다.

```yaml
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
```

* **scope**: 기본값을 적용할 범위를 선택합니다.
* **values**: 적용할 기본값을 선택합니다.

# 플러그인 설정

## SASS
스타일 속성을 작성하는 도구인 SASS의 속성입니다.

```yaml
sass:
  sass_dir: _scss
  style: compressed
```

* **sass_dir**: `@import`로 불러올 조각 파일들이 들어가는 디렉토리를 정합니다.
* **style**: `compressed`는 SASS의 작업 결과물이 압축된 형태로 나온다는 의미입니다.

## kramdown
마크다운 문서를 HTML로 변환하는 kramdown의 속성입니다.

```yaml
kramdown:
  toc_levels: '1'
  parse_block_html: true
  syntax_highlighter_opts:
    span:
      line_numbers: false
    block:
      line_numbers: true
      start_line: 1
```

* **toc_levels**: 문서의 내부 목차에서 표시할 제목 단계를 설정합니다.
* **parse_block_html**: kramdown은 변환할 문서에 있는 div 등 블록 태그의 내용물을 변환하지 않습니다. 이 속성을 `true`로 설정하면 블록 태그에 `markdown="1"`속성을 주면 블록 내부도 함께 변환합니다.
* **syntax_highlighter_opts**: 코드표현 속성입니다. `span`은 인라인 `block`은 코드블록입니다.
