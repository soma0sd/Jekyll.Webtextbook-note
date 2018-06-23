---
---

scss는 css를 확장하는 스타일러스 언어입니다.

# 변수

```scss
$size: 3em;
$border-normal: '1px solid';
$border-color: #F00;

.class {
  font-size: $size;
  border: #{$border-normal} #{$border-color}
}

```

```css
.class {
  font-size: 3em;
  border: 1px solid #F00;
}
```

## 전역변수와 지역변수

```scss
$var: 10px;
.a {
  height: $var;
}
.b {
  $var: 20px;
  height: $var;
}
```

```css
.a {
  height: 10px;
}
.b {
  height: 20px;
}
```

## 맵

```scss
$var-map: (
  'a': 10px,
  'b': 20px,
  'c': 30px
);
.a {
  width: map-get($var-map, 'a');
}
.b {
  width: map-get($var-map, 'b');
}
.c {
  width: map-get($var-map, 'c');
}
```

```css
.a {
  width: 10px;
}
.b {
  width: 20px;
}
.c {
  width: 20px;
}
```

# 믹스인

```scss
@mixin mx(){
  // 내용
  font-size: 2em;
}
.class {
  @include mx();
}
```

```css
.class {
  font-size: 2em;
}
```

# 함수

```scss
@function fn($var) {
  @return $var + 1;
}
#id {
  z-index: fn(3);
}
```

```css
#id {
  z-index: 4;
}
```

[SASS]: https://sass-lang.com/
