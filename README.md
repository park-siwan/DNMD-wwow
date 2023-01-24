# 디노마드 wwwow 프로젝트

## 아이콘 폰트 설정

- https://icomoon.io/app/#/select/font 에서 import후 ic- 접두어 설정, i태그 설정하고 다운받은 파일을 base/fonts.css 에 삽입해 설정한다. 루트경로에 fonts 폴더를 만들고 eot, svg, ttf, woff 등의 아이콘폰트 파일을 넣어 줘야한다.
- 뒤로가기 버튼 chevron 활용 예시

```html
<i class="ic-chevron" aria-hidden></i>
```

아래와 같이 돌려서 상황에 맞게 사용

```css
transform: rotate(90deg);
```
