/* 6학년 · 물체의 운동 — 속력 경주장 (가장 빠른·느린 선수를 재빨리 고르고 경주로 확인하기)
   디자인: 레이싱 게임 — 검정·빨강·노랑, 비스듬한 글씨. 자동차·운전사·관중·신호등은 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="6" width="40" height="36" rx="4" fill="#fff" stroke="#111" stroke-width="3"/><g fill="#111"><rect x="4" y="6" width="10" height="9"/><rect x="24" y="6" width="10" height="9"/><rect x="14" y="15" width="10" height="9"/><rect x="34" y="15" width="10" height="9"/><rect x="4" y="24" width="10" height="9"/><rect x="24" y="24" width="10" height="9"/><rect x="14" y="33" width="10" height="9"/><rect x="34" y="33" width="10" height="9"/></g><rect x="4" y="6" width="40" height="36" rx="4" fill="none" stroke="#111" stroke-width="3"/></svg>';
const RACERS=[['🚗','빨간 차'],['🚙','파란 차'],['🚕','노란 차'],['🏎️','경주차'],['🚓','순찰차'],['🚐','승합차'],['🛻','트럭']];// 모두 자동차라 어떤 속력이 나와도 어색하지 않아요
const CARS={'🚗':{k:'sedan',c:'#e5383b'},'🚙':{k:'suv',c:'#2f6fd6'},'🚕':{k:'taxi',c:'#ffc400'},'🏎️':{k:'sports',c:'#f4f6fa',s:'#e5383b'},'🚓':{k:'police',c:'#1f2937',s:'#f4f6fa'},'🚐':{k:'van',c:'#e6edf7',s:'#2f6fd6'},'🛻':{k:'pickup',c:'#2f9e44'}};
const carDef=e=>{e=String(e).replace(/\uFE0F/g,'');for(const k in CARS)if(k.replace(/\uFE0F/g,'')===e)return CARS[k];return CARS['🚗'];};
const SAFE=[
  ['갑자기 멈출 때 몸이 앞으로 쏠리지 않게 잡아 주는 것은?','안전띠','경적'],['부딪칠 때 순간적으로 부풀어 충격을 줄이는 것은?','에어백','전조등'],
  ['어린이 보호 구역의 제한 속력은?','30 km/h','80 km/h'],['자동차 속력을 줄이도록 도로에 볼록하게 만든 것은?','과속 방지 턱','중앙선'],
  ['횡단보도를 건널 때는?','차가 멈췄는지 확인하고 건너요','뛰어서 빨리 건너요'],['버스를 기다릴 때는?','인도 안쪽에서 기다려요','차도에 내려가 기다려요'],
  ['자동차의 속력이 빠를수록?','멈추는 데 더 먼 거리가 필요해요','더 쉽게 멈출 수 있어요'],['도로 주변에서 공놀이를 하면?','위험해요','안전해요'],
  ['물체의 운동이란?','시간이 지나며 위치가 바뀌는 것','모양이 바뀌는 것'],['속력을 구하는 방법은?','이동 거리 ÷ 걸린 시간','걸린 시간 ÷ 이동 거리'],
];

/* ───────── 그림 도구 ───────── */
function face(g,x,y,r,mood,helm){g.save();g.translate(x,y);g.fillStyle=helm;g.beginPath();g.arc(0,-r*.08,r*1.12,Math.PI,0);g.fill();g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();
  g.fillStyle=helm;g.beginPath();g.arc(0,-r*.1,r*1.06,Math.PI*1.02,Math.PI*1.98);g.lineTo(r*.9,-r*.28);g.quadraticCurveTo(0,-r*.5,-r*.9,-r*.28);g.fill();
  g.strokeStyle='#222';g.fillStyle='#222';g.lineWidth=Math.max(1.2,r*.12);g.lineCap='round';
  if(mood==='cheer'){g.beginPath();g.arc(-r*.36,r*.08,r*.16,Math.PI*1.1,Math.PI*1.9);g.stroke();g.beginPath();g.arc(r*.36,r*.08,r*.16,Math.PI*1.1,Math.PI*1.9);g.stroke();g.fillStyle='#c0392b';g.beginPath();g.ellipse(0,r*.5,r*.32,r*.22,0,0,Math.PI);g.fill();}
  else if(mood==='sad'){g.beginPath();g.arc(-r*.36,r*.12,r*.1,0,TAU);g.arc(r*.36,r*.12,r*.1,0,TAU);g.fill();g.beginPath();g.arc(0,r*.78,r*.28,Math.PI*1.15,Math.PI*1.85);g.stroke();g.fillStyle='#7fd4ff';g.beginPath();g.ellipse(r*.5,r*.4,r*.08,r*.14,0,0,TAU);g.fill();}
  else if(mood==='love'){g.fillStyle='#ff3b6b';for(const d of[-1,1]){g.beginPath();g.moveTo(d*r*.36,r*.3);g.bezierCurveTo(d*r*.7,-r*.05,d*r*.1,-r*.1,d*r*.36,r*.08);g.bezierCurveTo(d*r*.62,-r*.1,d*r*.02,-r*.05,d*r*.36,r*.3);g.fill();}g.strokeStyle='#222';g.beginPath();g.arc(0,r*.45,r*.22,.15*Math.PI,.85*Math.PI);g.stroke();}
  else{g.beginPath();g.arc(-r*.36,r*.1,r*.1,0,TAU);g.arc(r*.36,r*.1,r*.1,0,TAU);g.fill();if(mood==='focus'){g.beginPath();g.moveTo(-r*.6,-r*.12);g.lineTo(-r*.15,r*.0);g.moveTo(r*.6,-r*.12);g.lineTo(r*.15,r*.0);g.stroke();g.beginPath();g.moveTo(-r*.2,r*.55);g.lineTo(r*.2,r*.55);g.stroke();}else{g.beginPath();g.arc(0,r*.42,r*.2,.1*Math.PI,.9*Math.PI);g.stroke();}}
  g.restore();}
/* 자동차: 오른쪽을 보고, (x,y)=바닥 가운데, L=길이 */
function car(g,def,x,y,L,t,rot,mood,boost,sirens){
  const k=def.k,c=def.c,sc=def.s||'#fff';const r=L*.13;
  const P={sedan:{bh:.2,c0:-.24,c1:.14,ch:.2,sl:.1},suv:{bh:.22,c0:-.34,c1:.22,ch:.22,sl:.04},taxi:{bh:.2,c0:-.24,c1:.14,ch:.2,sl:.1},sports:{bh:.15,c0:-.1,c1:.22,ch:.15,sl:.14},police:{bh:.2,c0:-.24,c1:.14,ch:.2,sl:.1},van:{bh:.3,c0:-.44,c1:.38,ch:.2,sl:.03},pickup:{bh:.2,c0:-.02,c1:.3,ch:.2,sl:.06}}[k];
  g.save();g.translate(x,y);
  K.shadow(g,0,r*.1,L*.52,r*.38,.35);
  if(boost){for(let i=0;i<3;i++){const f=(Math.sin(t*40+i*2)+1)/2;g.fillStyle=i?'#ffd23f':'#ff7a1a';g.beginPath();g.moveTo(-L*.5,-r*1.6-i*r*.0);g.lineTo(-L*(.7+f*.25-i*.1),-r*1.7+i*r*.2);g.lineTo(-L*.5,-r*1.1);g.fill();}}
  const bt=-r*1.15,bh=L*P.bh,top=bt-bh;
  g.lineJoin='round';g.lineWidth=Math.max(1.6,L*.022);g.strokeStyle='#151821';
  /* 짐칸(트럭) */
  if(k==='pickup'){g.fillStyle='#237a36';K.rr(g,-L*.5,top+bh*.15,L*.46,bh*.85,L*.02);g.fill();g.stroke();g.fillStyle='#1a5c28';g.fillRect(-L*.47,top+bh*.3,L*.4,bh*.1);}
  /* 몸통 */
  g.fillStyle=c;K.rr(g,-L*.5,top,L,bh+(k==='van'?0:0),L*.06);if(k==='pickup'){g.beginPath();K.rr(g,-L*.04,top,L*.54,bh,L*.06);}g.fill();g.stroke();
  if(k==='sports'||k==='van'||k==='police'){g.fillStyle=sc;g.fillRect(-L*.5+L*.04,top+bh*.62,L*.92,bh*.14);}
  /* 유리 */
  const cx0=P.c0*L,cx1=P.c1*L,ch=L*P.ch,ct=top-ch;
  if(k!=='van'){g.fillStyle=c;g.beginPath();g.moveTo(cx0,top+1);g.lineTo(cx0+ch*.55+P.sl*L,ct);g.lineTo(cx1-ch*.6-P.sl*L,ct);g.lineTo(cx1,top+1);g.closePath();g.fill();g.stroke();
    g.fillStyle='#bfe6ff';g.beginPath();g.moveTo(cx0+ch*.16,top-ch*.06);g.lineTo(cx0+ch*.62+P.sl*L,ct+ch*.14);g.lineTo(cx1-ch*.66-P.sl*L,ct+ch*.14);g.lineTo(cx1-ch*.16,top-ch*.06);g.closePath();g.fill();
    g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(cx0+ch*.4,top-ch*.06);g.lineTo(cx0+ch*.72+P.sl*L,ct+ch*.14);g.lineTo(cx0+ch*.9+P.sl*L,ct+ch*.14);g.lineTo(cx0+ch*.58,top-ch*.06);g.fill();}
  else{g.fillStyle='#bfe6ff';K.rr(g,L*.14,top+bh*.12,L*.22,bh*.42,L*.02);g.fill();g.stroke();K.rr(g,-L*.36,top+bh*.12,L*.4,bh*.42,L*.02);g.fill();g.stroke();}
  /* 운전사 */
  const fx=k==='van'?L*.25:(cx0+cx1)/2+L*.05,fy=k==='van'?top+bh*.33:top-ch*.5,fr=ch*.3;
  if(k==='pickup'){}
  face(g,fx,fy,Math.max(3,k==='van'?bh*.2:fr),mood,k==='police'?'#223':(k==='sports'?'#e5383b':'#ffd400'));
  /* 장식 */
  if(k==='taxi'){g.fillStyle='#fff';K.rr(g,(cx0+cx1)/2-L*.07,ct-L*.05,L*.14,L*.05,L*.01);g.fill();g.stroke();}
  if(k==='police'){const on=Math.sin(t*14)>0;g.fillStyle=on?'#ff3b3b':'#7a1f1f';g.fillRect((cx0+cx1)/2-L*.1,ct-L*.045,L*.1,L*.045);g.fillStyle=on?'#3b6bff':'#1f2e7a';g.fillRect((cx0+cx1)/2,ct-L*.045,L*.1,L*.045);
    if(sirens){K.glow(g,(cx0+cx1)/2-L*.05,ct,L*.35,on?'#ff3b3b':'#3b6bff',.5);}}
  if(k==='sports'){g.fillStyle='#151821';g.fillRect(-L*.5,top-L*.07,L*.05,L*.07);g.fillRect(-L*.52,top-L*.09,L*.2,L*.03);}
  g.fillStyle='#fff7c2';K.rr(g,L*.44,top+bh*.2,L*.06,bh*.25,L*.01);g.fill();g.fillStyle='#ff4b4b';g.fillRect(-L*.5,top+bh*.2,L*.03,bh*.25);
  /* 바퀴 */
  for(const wx of [-L*.28,L*.3]){g.save();g.translate(wx,-r);g.fillStyle='#1a1d26';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.fillStyle='#c9d1de';g.beginPath();g.arc(0,0,r*.55,0,TAU);g.fill();g.rotate(rot);g.strokeStyle='#5a6475';g.lineWidth=Math.max(1,r*.16);for(let i=0;i<5;i++){g.rotate(TAU/5);g.beginPath();g.moveTo(0,0);g.lineTo(r*.5,0);g.stroke();}g.restore();}
  g.restore();}
function trophy(g,x,y,s){g.save();g.translate(x,y);g.fillStyle='#ffc61a';g.strokeStyle='#8a5b00';g.lineWidth=Math.max(1.5,s*.08);g.beginPath();g.moveTo(-s*.4,-s*.9);g.lineTo(s*.4,-s*.9);g.quadraticCurveTo(s*.4,-s*.2,0,-s*.15);g.quadraticCurveTo(-s*.4,-s*.2,-s*.4,-s*.9);g.fill();g.stroke();
  g.beginPath();g.arc(-s*.46,-s*.62,s*.2,Math.PI*.5,Math.PI*1.5);g.stroke();g.beginPath();g.arc(s*.46,-s*.62,s*.2,-Math.PI*.5,Math.PI*.5);g.stroke();g.fillRect(-s*.07,-s*.17,s*.14,s*.25);g.strokeRect(-s*.07,-s*.17,s*.14,s*.25);g.fillRect(-s*.26,s*.08,s*.52,s*.14);g.strokeRect(-s*.26,s*.08,s*.52,s*.14);
  g.fillStyle='rgba(255,255,255,.6)';g.fillRect(-s*.28,-s*.8,s*.08,s*.4);g.restore();}
function crowd(g,W,y,h,u,t,fast){const rows=3,sz=u*.34;for(let r=0;r<rows;r++){for(let x=-sz+(r%2)*sz*.5;x<W+sz;x+=sz*1.1){const i=Math.floor(x/sz)+r*57;const col=['#ff6b6b','#ffd166','#4cc9f0','#a0e060','#f78fb3','#c9b6ff','#ffffff'][Math.floor(hash(i)*7)];
    const bob=Math.abs(Math.sin(t*(fast?9:3)+hash(i+9)*6))*sz*(fast?.45:.12);const yy=y+h-r*h/rows*.9-sz*.4-bob;g.fillStyle=col;g.beginPath();g.arc(x,yy,sz*.42,0,TAU);g.fill();g.fillStyle='#222';g.fillRect(x-sz*.18,yy-sz*.08,sz*.08,sz*.08);g.fillRect(x+sz*.1,yy-sz*.08,sz*.08,sz*.08);}}}
function checker(g,x,y,w,h,n){const c=w/2,rh=h/n;for(let r=0;r<n;r++)for(let k=0;k<2;k++){g.fillStyle=(r+k)%2?'#111':'#fff';g.fillRect(x+k*c,y+r*rh,c,rh+.5);}}
function curb(g,y,W,h,u){const n=u*.8;for(let x=0,k=0;x<W;x+=n,k++){g.fillStyle=k%2?'#fff':'#e8202f';g.fillRect(x,y,n,h);}g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,y+h*.7,W,h*.3);}
function kid(g,x,y,s,t,walk){g.save();g.translate(x,y);const sw=Math.sin(t*8)*walk;K.shadow(g,0,0,s*.28,s*.06,.3);g.strokeStyle='#222';g.lineWidth=Math.max(1.5,s*.05);g.lineCap='round';
  g.beginPath();g.moveTo(-s*.06,-s*.32);g.lineTo(-s*.06+sw*s*.1,0);g.moveTo(s*.06,-s*.32);g.lineTo(s*.06-sw*s*.1,0);g.stroke();
  g.fillStyle='#ffd23f';K.rr(g,-s*.2,-s*.8,s*.4,s*.5,s*.1);g.fill();g.stroke();g.fillStyle='#e8202f';K.rr(g,-s*.3,-s*.75,s*.14,s*.36,s*.05);g.fill();
  g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,-s*.98,s*.2,0,TAU);g.fill();g.stroke();g.fillStyle='#3a2a1a';g.beginPath();g.arc(0,-s*1.02,s*.21,Math.PI,0);g.fill();g.fillStyle='#222';g.fillRect(-s*.08,-s*.98,s*.04,s*.04);g.fillRect(s*.05,-s*.98,s*.04,s*.04);
  g.beginPath();g.moveTo(-s*.2,-s*.62);g.lineTo(-s*.36,-s*.45+sw*s*.1);g.moveTo(s*.2,-s*.62);g.lineTo(s*.36,-s*.45-sw*s*.1);g.stroke();g.restore();}

/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const defs=['🏎️','🚗','🚕','🚓','🚙','🚐'].map(carDef);
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=Math.min(W,H*(wide?1.4:.78))/8;const n=wide?2:3;const th=Math.min(H*(wide?.55:.62),u*3*n);const ty=wide?H-th-H*.04:H*.34;
    K.vgrad(g,0,0,W,H,['#0b0d11','#1b1f2a']);
    /* 관중 */
    g.save();g.globalAlpha=.55;crowd(g,W,ty-u*1.5,u*1.5,u*.9,T,true);g.restore();
    g.fillStyle='#2a2f3b';g.fillRect(0,ty-u*.22,W,u*.22);
    g.fillStyle='#3b4252';g.fillRect(0,ty,W,th);curb(g,ty-u*.2,W,u*.2,u);curb(g,ty+th,W,u*.2,u);
    const lh=th/n;g.fillStyle='rgba(255,255,255,.85)';for(let i=1;i<n;i++)g.fillRect(0,ty+i*lh-1.5,W,3);
    for(let i=0;i<n;i++){const d=defs[(i*2+Math.floor(T/9)*1)%defs.length];const sp=(.18+i*.07+(i===0?.1:0));const L=Math.min(u*2.2,lh*1.4);const x=((T*sp+i*.3)%1.3)*(W+L*2)-L*.8;
      g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=Math.max(2,u*.06);g.lineCap='round';for(let k=0;k<3;k++){g.beginPath();g.moveTo(x-L*.55,ty+i*lh+lh*.5-L*.2+k*L*.12);g.lineTo(x-L*(.9+k*.2),ty+i*lh+lh*.5-L*.2+k*L*.12);g.stroke();}
      car(g,d,x,ty+i*lh+lh*.84,L,T,x/(L*.13),'focus',i===0,true);}
    /* 결승선 */
    checker(g,W*.94,ty,u*.4,th,8);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const GAME={
  id:'sci6-speed',title:'속력 경주장',title1:'누가 가장 빠를까?',title2:'속력 경주장',emoji:LOGO,
  subtitle:'6학년 · 물체의 운동',
  howto:'출발 전에 정보를 보고 <b>가장 빠른</b>(또는 가장 느린) 선수의 줄을 재빨리 <b>톡</b> 골라요. 경주가 시작되면 내 예상이 맞았는지 확인해요!',
  how:'출발 전에 알맞은 선수의 줄을 <b>톡!</b><br>속력 = 이동 거리 ÷ 걸린 시간',
  txt:{who:'누구와 달릴까요?',dur:'경기 시간',pace:'한 문제 시간',seat:'번 선수 ',go:'레이스 시작!',s1:'1. 종목',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#e8202f',c2:'#ffd400'},hero:heroScene,vignette:.1,durs:[60,90,120],
  levelTitle:'어떤 경기를 할까요?',
  levels:[
    {id:'compare',g:'6학년 · 물체의 운동',t:'⏱️ 빠르기 비교',d:'같은 거리 · 같은 시간'},
    {id:'calc',g:'6학년 · 물체의 운동',t:'🧮 속력 구하기',d:'거리 ÷ 시간'},
    {id:'safe',g:'6학년 · 물체의 운동',t:'🚸 속력과 안전',d:'안전띠·에어백·보호 구역'},
    {id:'all',g:'6학년 · 물체의 운동',t:'🌟 모두 섞기',d:'골고루 나와요'},
  ],
  summary:`<ul><li>물체의 <b>운동</b>: 시간이 지나면서 물체의 위치가 바뀌는 것</li>
    <li>같은 거리를 이동할 때는 <b>걸린 시간이 짧을수록</b>, 같은 시간 동안은 <b>이동 거리가 길수록</b> 빨라요.</li>
    <li><b>속력 = 이동 거리 ÷ 걸린 시간</b> (단위: m/s, km/h). 예) 100 m를 20초에 → 5 m/s</li>
    <li>속력이 빠를수록 멈추기 어려워 위험해요. 안전띠·에어백·과속 방지 턱·어린이 보호 구역(30 km/h)이 우리를 지켜요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{kN:0,race:null,carX:0,carGo:0,T:0});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?['compare','calc','safe'][st.kN++%3]:L;st.k=k;st.lock=false;st.pick=null;st.done=false;p.ctrl.innerHTML='';
    if(k==='safe'){const q=p.deck(SAFE,'sf');st.sq=q;st.lanes=null;p.ask('🚸 '+q[0],'알맞은 답을 골라요');
      p.tools(R.shuffle([q[1],q[2]]).map(t=>({t})),(i,t)=>{if(st.lock)return;st.lock=true;const ok=t.t===q[1];st.carGo=ok?1:-1;st.stopT=0;
        p.hit(ok,{x:p.W/2,y:p.H*.3,tip:ok?`정답: ${q[1]}`:`정답: <b>${q[1]}</b>`,review:`${q[0]} → ${q[1]}`});setTimeout(()=>{if(p.active)this.round(p);},ok?1100:1700);},{toggle:false});st.carX=0;st.carGo=0;st.safeT=0;return;}
    const rs=R.sample(RACERS,3);let lanes;
    if(k==='compare'){const sameD=R.chance(.5);if(sameD){const d=R.pick([50,100,200]);const ts=R.sample([8,10,12,15,20,25],3);lanes=rs.map((r,i)=>({r,d,t:ts[i]}));st.mode='같은 거리';}
      else{const t=R.pick([5,10,20]);const ds=R.sample([20,30,40,50,60,80],3);lanes=rs.map((r,i)=>({r,d:ds[i],t}));st.mode='같은 시간';}}
    else{let sp=R.sample([2,3,4,5,6,8,10],3);lanes=rs.map((r,i)=>{const t=R.pick([5,10,15,20,25]);return{r,d:sp[i]*t,t};});st.mode='속력 계산';}
    lanes.forEach(l=>l.v=l.d/l.t);st.lanes=lanes;st.fast=R.chance(.65);st.cd=Math.max(3.4,5.4-p.t/p.dur*1.5)/p.pace;st.cd0=st.cd;st.race=null;
    if(k==='calc'&&R.chance(.4)){st.single=R.int(0,2);const l=lanes[st.single];const ans=l.v;const opts=R.shuffle([ans,Math.round(l.t/l.d*100)/100,l.d+l.t,l.d*l.t].filter((v,i,a)=>a.indexOf(v)===i).slice(0,3));
      if(!opts.includes(ans))opts[0]=ans;st.cd=99;
      p.ask(`🧮 ${l.r[1]}${J(l.r[1],'은').slice(l.r[1].length)} <b>${l.d} m</b>를 <b>${l.t}초</b> 동안 이동했어요. 속력은?`,'속력 = 이동 거리 ÷ 걸린 시간');
      p.tools(R.shuffle(opts).map(v=>({t:v+' m/s',v})),(i,t)=>{if(st.lock)return;st.lock=true;const ok=t.v===ans;
        p.hit(ok,{x:p.W/2,y:p.H*.3,tip:`${l.d} ÷ ${l.t} = <b>${ans} m/s</b>`,review:`${l.d} m를 ${l.t}초에 이동 → 속력 ${l.d} ÷ ${l.t} = ${ans} m/s`});st.pickOk=ok;this.startRace(p);},{toggle:false});return;}
    st.single=null;p.ask(`🏁 <b>가장 ${st.fast?'빠른':'느린'}</b> 선수는? 출발 전에 줄을 톡!`,st.mode==='속력 계산'?'속력 = 이동 거리 ÷ 걸린 시간':st.mode==='같은 거리'?'같은 거리 → 걸린 시간이 짧을수록 빨라요':'같은 시간 → 이동 거리가 길수록 빨라요');},
  startRace(p){const st=p.state;st.race={t:0};st.cd=0;},
  update(p,dt){const st=p.state;st.T+=dt;if(st.k==='safe'){st.safeT+=dt;if(st.carGo===0)st.carX=Math.min(.34,st.carX+dt*.22);else if(st.carGo>0)st.carX=Math.min(.46,st.carX+dt*.1*Math.max(0,1-st.stopT/.9)),st.stopT+=dt;else st.carX=Math.max(.0,st.carX-dt*.25);return;}if(!st.lanes)return;
    if(!st.race&&st.cd<90){st.cd-=dt;if(st.cd<=0&&!st.lock){st.lock=true;p.hit(false,{pen:15,x:p.W/2,y:p.H*.3,tip:'시간 안에 골라요! 경주를 보며 확인해요',review:this.why(p)});st.pickOk=false;this.startRace(p);}}
    if(st.race){st.race.t+=dt;if(st.race.t>2.6&&!st.race.end){st.race.end=true;if(!st.single||1)p.burst(p.W*.9,this.geo(p).top+this.geo(p).lh*1.5,'#ffd400',16);setTimeout(()=>{if(p.active)this.round(p);},700);}}},
  why(p){const st=p.state;return st.lanes.map(l=>`${l.r[1]} ${l.d} m·${l.t}초 → ${Math.round(l.v*100)/100} m/s`).join(' / ');},
  geo(p){const u=p.u,Z0=p.top||0,Z1=p.H-(p.bot||0);const h=Math.max(90,Z1-Z0-u*.3);const lh=Math.min(h/3,u*3.8);const th=lh*3;const top=Z0+u*.15+(h-th)/2;return{top,lh,th,x0:u*.4,x1:p.W-u*.9,Z0,Z1};},
  safeScene(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z0=p.top||0,Z1=p.H-(p.bot||0);const rd=Z0+(Z1-Z0)*.42,rh=Math.min((Z1-Z0)*.34,u*3);
    K.vgrad(g,0,0,W,rd,['#8fd3ff','#e9f7ff']);K.glow(g,W*.85,rd*.25,u*2.2,'#fff3b0',.7);K.clouds(g,W,rd,t,.1,3,u*1.6);
    /* 학교 건물 */
    const bx=W*.12,bw=Math.min(u*5,W*.5),bh=Math.min(rd*.5,u*2.4);g.fillStyle='#ffb347';g.fillRect(bx,rd-bh,bw,bh);g.fillStyle='#e8892a';g.fillRect(bx-u*.1,rd-bh-u*.18,bw+u*.2,u*.22);g.fillStyle='#fff';for(let i=0;i<4;i++)g.fillRect(bx+bw*(.08+i*.23),rd-bh*.8,bw*.14,bh*.34);g.fillStyle='#8b5a2b';g.fillRect(bx+bw*.43,rd-bh*.45,bw*.14,bh*.45);
    g.fillStyle='#e8202f';g.beginPath();g.moveTo(bx+bw*.5,rd-bh-u*.2);g.lineTo(bx+bw*.5,rd-bh-u*.9);g.lineTo(bx+bw*.5+u*.6,rd-bh-u*.65);g.lineTo(bx+bw*.5,rd-bh-u*.45);g.fill();g.fillStyle='#555';g.fillRect(bx+bw*.5-1,rd-bh-u*.95,2,u*.8);
    for(const [tx,s] of [[W*.72,1],[W*.05,.8],[W*.92,.9]]){g.fillStyle='#7a5230';g.fillRect(tx-u*.08,rd-u*1.0*s,u*.16,u*1.0*s);g.fillStyle='#43b45a';g.beginPath();g.arc(tx,rd-u*1.2*s,u*.55*s,0,TAU);g.arc(tx-u*.35*s,rd-u*.95*s,u*.4*s,0,TAU);g.arc(tx+u*.35*s,rd-u*.95*s,u*.4*s,0,TAU);g.fill();}
    /* 인도 + 도로 */
    K.vgrad(g,0,rd,W,u*.5,['#e7dccb','#cbbba3']);const ry=rd+u*.5;K.vgrad(g,0,ry,W,rh,['#4a5262','#2f3542']);g.fillStyle='#ffd400';g.fillRect(0,ry+rh*.5-2,W,4);
    K.vgrad(g,0,ry+rh,W,H-ry-rh,['#cbbba3','#9a8b73']);
    const zx=W*.62,zw=u*1.8;g.fillStyle='rgba(255,255,255,.92)';for(let y=ry+u*.1;y<ry+rh-u*.1;y+=u*.42)g.fillRect(zx,y,zw,u*.24);
    /* 어린이와 표지판 */
    const sx=W*.86;g.fillStyle='#8b95a6';g.fillRect(sx-u*.05,rd-u*1.4,u*.1,u*1.6);g.fillStyle='#ffd400';g.beginPath();g.moveTo(sx,rd-u*2.5);g.lineTo(sx+u*.62,rd-u*1.9);g.lineTo(sx,rd-u*1.3);g.lineTo(sx-u*.62,rd-u*1.9);g.closePath();g.fill();g.strokeStyle='#111';g.lineWidth=Math.max(2,u*.05);g.stroke();K.txt(g,'30',sx,rd-u*1.9,{size:u*.5,color:'#111'});
    const ok=st.carGo>0,bad=st.carGo<0;const kx=zx+zw/2,ky=rd+u*.35;const walk=ok&&st.stopT>.5?1:0;const kyy=ky+(walk?Math.min(1,(st.stopT-.5)/.9)*(rh*.55):0);
    kid(g,kx,Math.min(kyy,ry+rh*.72)+(walk?u*.3:0),u*1.2,t,walk?1:0);
    /* 자동차 */
    const L=Math.min(u*2.8,W*.3);const cx=W*(.15+st.carX);const cy=ry+rh*.78;const def=CARS['🚗'];
    if(st.carGo<0){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=u*.06;g.lineCap='round';for(let k=0;k<3;k++){g.beginPath();g.moveTo(cx-L*.5-k*u*.2,cy-u*.2-k*u*.2);g.lineTo(cx-L*.85-k*u*.3,cy-u*.2-k*u*.2);g.stroke();}}
    if(ok){g.fillStyle='rgba(30,30,30,.35)';g.fillRect(cx-L*.9,cy-u*.04,L*.6,u*.08);}
    car(g,def,cx,cy,L,t,cx/(L*.13)*(1),ok?'love':(bad?'sad':'focus'),false,false);
    if(ok&&st.stopT>.7)K.txt(g,'안전해요!',cx,cy-L*.7,{size:u*.5,color:'#fff',stroke:'#12a150',lw:u*.15});
    if(bad)K.txt(g,'위험해요!',cx,cy-L*.7,{size:u*.5,color:'#fff',stroke:'#e8202f',lw:u*.15});},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;
    if(st.k==='safe'){this.safeScene(p,g);return;}
    K.vgrad(g,0,0,W,H,['#0b0d11','#1b1f2a']);
    if(!st.lanes)return;const G=this.geo(p);const vmax=Math.max(...st.lanes.map(l=>l.v));const ty=G.top,th=G.th,lh=G.lh;
    /* 관중 */
    const fin=!!(st.race&&st.race.t>2.2);g.save();g.globalAlpha=.9;g.fillStyle='#232834';g.fillRect(0,0,W,ty-u*.2);crowd(g,W,Math.max(0,ty-u*2.4),Math.min(u*2.2,ty),u,t,!!st.race);g.restore();
    K.vgrad(g,0,ty-u*.35,W,u*.2,['#2a2f3b','#2a2f3b']);
    /* 아스팔트 */
    g.save();g.shadowColor='rgba(0,0,0,.5)';g.shadowBlur=u*.4;g.fillStyle='#3b4252';g.fillRect(0,ty,W,th);g.restore();
    st.lanes.forEach((l,i)=>{const y=ty+i*lh;K.vgrad(g,0,y,W,lh,[i%2?'#424a5d':'#4b5367','#363d4d']);});
    g.save();for(let k=0;k<180;k++){const a=hash(k*3+1)*W,b=ty+hash(k*5+2)*th;g.fillStyle=k%2?'rgba(255,255,255,.06)':'rgba(0,0,0,.14)';g.fillRect(a,b,2,2);}g.restore();
    const ch=Math.max(5,u*.2);curb(g,ty-ch,W,ch,u);curb(g,ty+th,W,ch,u);
    g.fillStyle='rgba(255,255,255,.88)';for(let i=1;i<3;i++){const y=ty+i*lh;for(let x=-(t*u*(st.race?6:0))%(u*1.4);x<W;x+=u*1.4)g.fillRect(x,y-Math.max(1.5,u*.035),u*.8,Math.max(3,u*.07));}
    const sx=G.x0+u*1.6,fx=G.x1-u*.4;
    g.fillStyle='rgba(255,255,255,.92)';g.fillRect(sx-u*.05,ty,Math.max(3,u*.1),th);
    const fw=Math.max(12,u*.5);K.glow(g,G.x1+fw*.3,ty+th/2,th*.5,'#ffffff',.2);checker(g,G.x1,ty,fw,th,Math.max(6,Math.round(th/(fw/2))));
    const lc=['#ff6b6b','#4cc9f0','#ffd166'];
    const L=Math.min(u*3.4,lh*1.15,(fx-sx)*.34);
    st.lanes.forEach((l,i)=>{const y=ty+i*lh;const sel=st.pick===i;const cy=y+lh*.8;const def=carDef(l.r[0]);
      if(sel){g.save();K.rr(g,u*.08,y+3,W-u*.16,lh-6,u*.2);g.fillStyle='rgba(255,212,0,.14)';g.fill();g.lineWidth=Math.max(3,u*.08);g.strokeStyle='#ffd400';g.shadowColor='#ffd400';g.shadowBlur=u*.5;g.stroke();g.restore();}
      /* 레인 번호 */
      const bs=Math.min(u*.7,lh*.24);g.save();g.translate(G.x0+bs*.55,y+lh*.5);g.transform(1,0,-.18,1,0,0);K.rr(g,-bs*.55,-bs*.6,bs*1.1,bs*1.2,bs*.14);g.fillStyle=lc[i];g.fill();g.restore();K.txt(g,String(i+1),G.x0+bs*.55,y+lh*.5+bs*.02,{size:bs*.7,color:'#111'});
      const prog=st.race?Math.min(1,st.race.t*l.v/vmax/2.2):0;const x0=sx+L*.55,x=x0+(fx-L*.55-x0)*prog;
      /* 출발 칸 */
      g.save();g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=Math.max(2,u*.05);g.beginPath();g.moveTo(sx+L*.9,cy-L*.4);g.lineTo(sx+L*.05,cy-L*.4);g.moveTo(sx+L*.9,cy+u*.05);g.lineTo(sx+L*.05,cy+u*.05);g.stroke();g.restore();
      const moving=st.race&&prog>0&&prog<1;
      if(moving){g.save();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=Math.max(2,u*.06);g.lineCap='round';for(let k=0;k<4;k++){const yy=cy-L*.55+k*L*.18;g.beginPath();g.moveTo(x-L*.55,yy);g.lineTo(x-L*(.95+k*.22+.3*Math.sin(t*20+k)),yy);g.stroke();}g.restore();}
      const best=st.fast?vmax:Math.min(...st.lanes.map(q=>q.v));const isBest=l.v===best;
      let mood='calm';if(st.race){mood=moving?'focus':(isBest&&fin?'cheer':(fin?(st.pick===i?'sad':'calm'):'focus'));if(fin&&st.pick===i&&isBest)mood='love';}
      car(g,def,x,cy,L,t,x/(L*.13*1.0),mood,moving&&(p.streak>=3&&st.pick===i),false);
      /* 정보 */
      const info=`${l.r[1]}  ${l.d} m · ${l.t}초`+(st.race?`  →  ${Math.round(l.v*100)/100} m/s`:'');
      K.tag(g,info,W/2+u*.5,y+lh*.2,{size:Math.min(u*.46,lh*.17),maxW:W*.8,fill:sel?'#fff3a8':'rgba(255,255,255,.96)',stroke:sel?'#ffd400':'rgba(0,0,0,.2)',lw:2,color:'#161a22',r:4});
      if(fin&&isBest){const tr=Math.min(u*.9,lh*.34);K.glow(g,fx-tr*.2,cy-L*.5,u*1.3,'#ffd400',.7);trophy(g,fx-tr*.2,cy-L*.15,tr);K.tag(g,st.fast?'가장 빨라요!':'가장 느려요!',fx-tr*2.4,cy-L*.4,{size:Math.min(u*.42,lh*.15),maxW:u*3.4,fill:'#ffd400',stroke:'#111',lw:2,color:'#111',r:4});}
    });
    if(!st.race&&st.cd<90){const f=Math.max(0,st.cd/st.cd0);const bh=Math.max(6,u*.2),by=G.Z1-bh-u*.1;
      K.rr(g,u*.3,by,W-u*.6,bh,bh/2);g.fillStyle='rgba(255,255,255,.18)';g.fill();
      if(f>0){const gr=g.createLinearGradient(0,0,W,0);gr.addColorStop(0,'#ffd400');gr.addColorStop(1,'#e8202f');K.rr(g,u*.3,by,(W-u*.6)*f,bh,bh/2);g.fillStyle=gr;g.fill();}
      /* 출발 신호등 */
      const n=Math.ceil(st.cd),r=Math.max(7,u*.26),pw=r*7.8,ph=r*2.9,px=sx+u*.3,py=ty-ph-u*.35;
      g.fillStyle='#8b95a6';g.fillRect(px+pw*.3,py+ph,r*.3,u*.35);
      K.card(g,px,py,pw,ph,ph*.2,'#12151b',{blur:u*.3,dy:u*.08,hi:false,stroke:'#555',lw:2});
      for(let k=0;k<3;k++){const lx=px+r*1.6+k*r*2.3,ly=py+ph/2;const on=k<Math.min(3,n);const c=n<=1?'#22c55e':n<=2?'#f59e0b':'#ef4444';
        if(on){K.glow(g,lx,ly,r*2.2,c,.55);K.orb(g,lx,ly,r,c);}else{g.fillStyle='#2f3542';g.beginPath();g.arc(lx,ly,r,0,7);g.fill();}}
      K.txt(g,String(n),px+pw+r*1.2,py+ph/2,{size:r*2.2,color:'#fff',stroke:'rgba(0,0,0,.6)',lw:4});}},
  down(p,x,y){const st=p.state;if(st.k==='safe'||!st.lanes||st.lock||st.single!=null)return;const G=this.geo(p);const i=Math.floor((y-G.top)/G.lh);if(i<0||i>2)return;
    st.lock=true;st.pick=i;const vs=st.lanes.map(l=>l.v);const best=st.fast?Math.max(...vs):Math.min(...vs);const ok=st.lanes[i].v===best;st.pickOk=ok;
    p.hit(ok,{x:p.W/2,y:G.top+i*G.lh,tip:ok?'예상 적중! 경주로 확인해요':'경주를 보며 확인해 봐요',review:this.why(p),tipMs:2000});this.startRace(p);},
};

Engine.boot(GAME);
