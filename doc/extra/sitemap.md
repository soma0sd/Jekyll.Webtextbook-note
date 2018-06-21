---
---
[구글 서치콘솔]등에 사이트맵을 제공하면 검색 로봇이 효율적으로 사이트에서 정보를 모아 검색결과에 반영하도록 만들 수 있습니다.

[구글 서치콘솔]: https://www.google.com/webmasters/

# XML 양식
구글 웹마스터 도구를 기준으로 사이트맵은,

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://user.com/</loc>
  </url>
  <url>
    <loc>https://user.com/doc-1</loc>
  </url>
  <url>
    <loc>https://user.com/doc-2</loc>
  </url>
</urlset>
```

와 같은 방식으로 작성합니다. 문서의 첫 줄에는 xml 문서임을 알리는 `<?xml?>`태그가 있어야 합니다. `<urlset>`은 사이트 내의 문서가 들어가는 태그입니다. 각 문서는 `<url>`태그로 나눠지고 `<loc>`태그는 문서의 URL이 들어가는 필수 항목입니다.

# jekyll을 이용해 사이트맵 생성

<kbd>_layout/sitemap.xml</kbd>
```xml
<url>
  <loc>{{ ""| absolute_url }}</loc>
</url>
{%- for href in _HrefList %}
<url>
  <loc>{{href}}</loc>
</url>
{%- endfor %}
```
목차를 생성하면서 만든 변수 `_HrefList`는 <kbd>toc.html</kbd>에 등록한 문서들의 URL 리스트입니다.

첫 `<url>`태그는 필터를 사용하여 홈페이지 주소를 반환하도록 하였습니다. 그 다음 `<url>`태그는 `_HrefList`의 요소를 반복하여 등록문서마다 `<url>`태그에 `<loc>`태그를 넣도록 합니다.

만든 <kbd>_layout/sitemap.xml</kbd>을 실제 사이트맵 문서에 적용합니다.

<kbd>sitemap.xml</kbd>
```xml
---
layout: sitemap
---
```

여기까지 했으면 만든 사이트맵을 `(www.user.com)/sitemap.xml`에서 볼 수 있습니다.
