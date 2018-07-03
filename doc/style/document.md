---
---
스타일을 작성할 때 가장 먼저 마크다운으로 작성하는 컨텐츠 부분부터 손봤습니다. 이 테스트는 [**원시 마크다운 파일**](https://raw.githubusercontent.com/soma0sd/Jekyll.Webtextbook-note/master/doc/style/document.md)로 원본을 볼 수 있습니다.

- - -

# h1 제목
## h2 제목
### h3 제목
#### h4 제목
##### h5 제목
###### h6 제목

# 수평선

- - -

* * *

# 문단
마크다운은 기본적으로 두 번 줄바꿈 문자(<kbd>Enter</kbd>)를 사용해야 다음 문단으로 넘어갑니다.

그러나 변환기의 특성에 따라
한 번의 줄바꿈 문자로도 문단을
분리하는 경우가 있습니다.

# 인라인 텍스트 꾸미기
문단의 어느 부분에도 `인라인 코드`, <kbd>키보드 입력</kbd>, **굵은 글자**, *기울인 글자*, ~~취소선~~을 사용할 수 있습니다.

# 리스트
* 순서 없는 리스트는 `*`문자와 공백으로 시작합니다.
  * 공백 2개마다 다음 단계로 넘어갑니다.
  * `<ul>` 태그를 가지고 있습니다.
* 공백을 제거하면 상위 리스트로 복귀합니다.

1. 숫자와 마침표를 쓰면
  1. 자동으로 숫자가 붙습니다.
37. 어떤 숫자가 와도 자동으로
3. 번호가 이어집니다.

* 혼합 리스트를 지원하는 경우
  1. 숫자와 항목을
  1. 복합적으로 쓸 수 있습니다.
* 단, 둘의 단계가 달라야 적용됩니다.

# 링크
하이퍼링크는 [Google](https://google.com)과 같이 인라인으로 쓸 수 있습니다. [facebook]과 같이 먼저 링크임을 표시하고 나서 나중에 주소를 정의할 수도 있습니다.

자동링크를 지원하는 변환기는 https://google.com 처럼 주소를 입력하면 자동으로 링크로 변환합니다.

[facebook]: https://www.facebook.com/

# 이미지
![screenshot](https://soma0sd.github.io/Jekyll.Webtextbook-note/screenshot-mobile.jpg)

# 코드블록
**일반 코드블록**
```
def func(foo):
  output = foo.add(12)
  return output
```

**언어를 설정한 코드블록**
```python
def func(foo):
  output = foo.add(12)
  return output
```

**줄당 글자수가 많은 코드블록**
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

# 표

| 항목 | 속성 | 값 |
|:---- |:----:| -:|
| A | **높이** | 1,000 |
| B | *너비* |   860 |

# 인용

> 인용 블록을 생성합니다.


# 수식 표현
변환기에서 지원하는 경우도 있지만 주로 자바스크립트를 이용해서 랜더링합니다.

문단 내에서 수식변환을 사용하는 경우 $ E = mc^{2} $으로 쓸 수 있습니다.

별도의 수식블록을 만드는 경우,

$$ i \hbar \frac{\partial}{\partial t} \Psi(x,t)= \left( -\frac{\hbar^2}{2m}\nabla^2 + V(x,t) \right) \Psi(x,t) $$

와 같이 쓸 수 있습니다.
