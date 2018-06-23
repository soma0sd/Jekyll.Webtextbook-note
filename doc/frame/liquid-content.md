---
---

앞서 만든 틀에 내용물을 채웁니다. 별도의 파일로 분리된 목차(<kbd>toc.yml</kbd>)와 문서 디렉토리(<kbd>doc/</kbd>)를 연결합니다.

# 목차파일과 문서구조
<kbd>toc.yml</kbd>은 YAML양식의 데이터파일입니다. 목차를 나열하는 방식은,

```yaml
- chapter: 1장|chapter-1
  sub:
    - 1장 A절|sub-a
    - 1장 B절|sub-b
- chapter: 2장|chapter-2
```

와 같은 형식을 따릅니다. 바(`|`)문자를 기준으로 표시할 제목과 파일명(URL)이 나뉩니다. 가령 위 예제의 3번줄은 "1장"의 하위 문서로 표시하는 제목은 "1장 1절", URL은 "./doc/chapter-1/sub-a/"[^1]가 됩니다.

[^1]: `/`문자로 끝나는 URL 표현은 Jekyll의 기본속성이 아니며 다음 문서에서 다룹니다.

<kbd>doc/</kbd>디렉토리는 마크다운 형식으로 작성된 문서가 위치합니다.

* **doc/**
  * **chapter-1/**
    * {: .file} **index.md**: "1장"의 내용
    * {: .file} **sub-a.md**: "1장 A절"의 내용
    * {: .file} **sub-b.md**: "1장 B절"의 내용
  * **chapter-2/**
    * {: .file} **index.md**: "2장"의 내용
{: .dir}

위는 <kbd>toc.yml</kbd> 예시에 대응하는 문서 파일 구조입니다.

# Liquid 기본 문법
Liquid 언어는 Jekyll의 변환 대상이 되는 모든 파일에 적용됩니다. **{&#37; 연산|대입 &#37;}**, **\{\{ 출력 \}\}** 의 형식으로 작성하여 Liquid 언어로 작성된 부분을 표시합니다.

## 연산 및 대입
사용한 극히 일부의 태그만 다룹니다. 개인적으로 Liquid는 정말 불만이 많은 언어였습니다. 에지간한 웹페이지용 템플릿 언어들이 가지고 있는 Hook 기능도 없을 뿐더러, 변수의 값을 바꿀 때마다 매번 새로 초기화를 시켜줘야 합니다. 당연히 되리라 예상했던 문법들은 통하지 않습니다. 원하는 기능은 대부분 필터를 이용하여 구현해야 했습니다.

| 태그 | 기능 | 용법 |
|:-:|:-:|:-:|
| assign | 대입 | {&#37; assign var = "foo" &#37;} |
| capture | 대입(문자열) |  {&#37; capture foo &#37;}...{&#37; endcapture &#37;} |
| if | 판단 | {&#37; if condition &#37;}...{&#37; endif &#37;}
| for | 반복 | {&#37; for i in array &#37;}...{&#37; endfor &#37;} |

## 필터
필터는 `assign`이나 출력할 때 변수를 편집하는 역할을 합니다. 변수와 필터는 `|`로 구분합니다. 즉, {&#37; assign foo = var | filter1 | filter2 | ...  &#37;} 이나 \{\{ var  | filter1 | filter2 | ... \}\} 형식으로 활용합니다. 필터는 변수명에 가까운 것 먼저 적용됩니다.

여기서 다루는 필터는 Liquid에서 제공하는 것 뿐만이 아니라 Jekyll에서 추가한 필터도 함께 다루고 있습니다.

| 필터 | 기능 | 용법 |
|:-:|:-:|:-:|
| plus | 수치 증가 | var \| plus: 1 |
| minus | 수치 감소 | var \| minus: 1 |
| split | 문자열 기준으로 잘라 배열 생성 | var \| split: "&" |
| size | 배열의 크기 (숫자) | var \| size |
| slice | 배열의 해당 위치 원소 | var \| slice: 3 |
| prepend | 앞에 붙임 | "CDE" \| prepend: "AB" |
| append | 뒤에 붙임 | "ABC" \| append: "DE" |
| absolute_url | URL 절대위치를 앞에 붙임 | "style.css" \| absolute_url |
| markdownify | 마크다운을 HTML로 변환 | "\*\*bold\*\* text" \| markdownify |

## Jekyll 내장 변수
Jekyll은 템플릿을 만들때 사용할 수 있는 내장 변수를 제공합니다.

| 변수명 | 내용 |
|:-:|:- |
| site.(변수명) | <kbd>_config.yml</kbd>에 등록한 글로벌 변수를 가져옵니다. |
| site.data.(파일명) | <kbd>_data/</kbd>디렉토리에 있는 YAML, CSV, JSON 형식의 파일을 Liquid 변수 형태로 가져옵니다. |
| content | 변환한 페이지나 문서의 내용물을 가져옵니다. |
| page.url | 해당 페이지나 문서의 URL을 가져옵니다. |
| page.content | 변환하기 전의 페이지나 문서의 내용물을 가져옵니다. |
