# 포트폴리오 웹페이지

`toddlerbot.github.io`와 동일한 방식입니다. 빌드 도구·프레임워크 없이 HTML 한 개로 돌아가고,
CSS는 Bulma를 CDN으로 불러옵니다. 파일을 GitHub에 올리면 그대로 사이트가 됩니다.

## 폴더 구조

```
portfolio/
├── index.html          # 전부 여기 있습니다 (CSS 포함)
└── static/
    ├── images/         # 프로젝트 썸네일, og.jpg
    ├── videos/         # 자동재생 데모 영상 (mp4)
    └── pdfs/           # cv.pdf
```

## 배포 (GitHub Pages)

1. GitHub에서 새 저장소를 만듭니다. 이름을 `<본인아이디>.github.io`로 하면
   `https://<본인아이디>.github.io` 주소를 그대로 씁니다.
   (`portfolio` 같은 이름으로 만들면 주소가 `https://<아이디>.github.io/portfolio/`가 됩니다.)

2. 파일을 올립니다.

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Add portfolio page"
   git branch -M main
   git remote add origin https://github.com/<본인아이디>/<저장소명>.git
   git push -u origin main
   ```

3. 저장소 → Settings → Pages → Source를 `Deploy from a branch`, 브랜치를 `main` / `/ (root)`로
   설정하고 저장합니다. 1~2분 뒤 주소가 열립니다.

로컬에서 미리 볼 때는 파일을 더블클릭해도 되고, 경로 문제가 신경 쓰이면:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 먼저 고쳐야 할 곳

`index.html`에서 `TODO`와 `YOUR_`를 검색하면 전부 나옵니다.

| 위치 | 내용 |
|---|---|
| `<h1 class="name-title">` | 이름 |
| `link-buttons` 안의 `href` | GitHub, 이메일, CV, Scholar, 블로그 주소 |
| `--accent` (style 상단) | 강조 색상 |
| `<meta property="og:...">` | 링크 공유 시 보이는 제목·설명·이미지 |
| 각 프로젝트의 `project-links` | 저장소 / 문서 링크 |

Google Scholar 프로필이 아직 없다면 해당 버튼은 지우세요. 빈 링크가 있는 것보다 없는 게 낫습니다.

## 미디어 넣기

**영상이 가장 효과적입니다.** 자율주행 차량이 실제로 달리는 5~10초짜리 무음 mp4 하나가
글 열 줄보다 설득력이 큽니다. 이미 `<video autoplay muted loop playsinline>`으로 되어 있어서
파일만 넣으면 됩니다.

용량은 파일당 5MB 아래로 줄이는 게 좋습니다. GitHub Pages는 저장소 1GB 제한이 있고,
큰 영상은 로딩이 느립니다.

```bash
# 720p, 무음, 웹 최적화
ffmpeg -i input.mp4 -vf "scale=1280:-2" -an -c:v libx264 -crf 28 \
  -movflags +faststart static/videos/f1tenth.mp4
```

이미지는 1600px 이하 JPG로 충분합니다.

## 프로젝트 추가하기

`index.html`의 `<!-- Project 1 -->` 블록을 통째로 복사해 붙이고 내용만 바꾸면 됩니다.
순서는 위에 있을수록 눈에 띄니, 가장 자신 있는 것을 맨 위에 두세요.

## 참고

- Nerfies 원본 템플릿: https://github.com/nerfies/nerfies.github.io
- Bulma 문서: https://bulma.io/documentation/
- 아이콘: Font Awesome (`fa-`), Academicons (`ai-`)
