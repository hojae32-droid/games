# 빌드 방법
`python3 build.py games/<이름> <출력 index.html>` (공통 틀은 common/, 게임별 코드·테마는 games/<이름>/)
출력 파일은 클라우드에 올리는 단일 index.html 이에요.

- 예전 방식(스크롤 가능한 설정 + 틀 안의 게임 화면): theme.json 에 `"full"` 이 없어요.
- 전체 화면형(`"full": true`): common/full.css(전체 화면 게임 + 단계별 설정 + 탭 결과) 와 common/wiz.js(3단계 설정)를 써요.
  - 첫 화면 배치(`layout`): L-wsplit(왼쪽 그림) · L-wsplitR(오른쪽 그림) · L-wtop(위쪽 그림) · L-wcenter(그림 위 가운데 카드) · L-wfloat(그림 위 오른쪽 카드)
  - 게임 코드에서는 `p.top`(문제 띠 아래 y), `p.bot`(아래 버튼 위 y), `p.pace`(진행 속도 0.8/1/1.3)를 쓸 수 있어요.
  - `font_prefix`(예: `italic 900 `)로 캔버스 글자 굵기·기울임을 정해요.
