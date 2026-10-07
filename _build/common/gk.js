/* 게임 공통 소품: 로고·히어로 화면 틀·숫자 꾸미기 */
function gkLogo(c1,c2,glyph){return '<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="'+c1+'" stroke="'+c2+'" stroke-width="3.5"/><text x="24" y="32" font-size="23" text-anchor="middle">'+glyph+'</text></svg>';}
function gkHero(fn){return function(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);fn(g,W0,H0,T,Math.min(W0,H0)/6);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};};}
const gkComma=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');
/* 보기 영역 위에서 누른 칸 찾기 */
function gkHit(list,x,y){for(let i=0;i<list.length;i++){const r=list[i];if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h)return i;}return -1;}
