/* 3학년 · 동물의 생활 — 동물 탐험 달리기 (세 갈래 길에서 맞는 문으로 달려가기)
   디자인: 스티커 같은 정글 탐험. 탐험대원·문·돌·별·나무는 모두 직접 그린 그림이고, 동물 친구는 입체 그림으로 나와요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#2d5a27';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#7fd16a" stroke="#2d5a27" stroke-width="3"/><ellipse cx="24" cy="28" rx="9" ry="7" fill="#ffd23f" stroke="#2d5a27" stroke-width="2.5"/><circle cx="12" cy="20" r="3.6" fill="#ffd23f" stroke="#2d5a27" stroke-width="2.2"/><circle cx="19" cy="13" r="3.6" fill="#ffd23f" stroke="#2d5a27" stroke-width="2.2"/><circle cx="29" cy="13" r="3.6" fill="#ffd23f" stroke="#2d5a27" stroke-width="2.2"/><circle cx="36" cy="20" r="3.6" fill="#ffd23f" stroke="#2d5a27" stroke-width="2.2"/></svg>';
const HAB={
  '땅':[['🐿️','다람쥐'],['🦌','노루'],['🐇','토끼'],['🪱','지렁이'],['🐍','뱀'],['🦔','고슴도치'],['🐻','곰']],
  '물':[['🐟','붕어'],['🐙','문어'],['🐬','돌고래'],['🦈','상어'],['🦑','오징어'],['🐳','고래'],['🦀','꽃게']],
  '하늘':[['🦅','독수리'],['🐦','참새'],['🦋','나비'],['🐝','꿀벌'],['🕊️','비둘기']],
  '사막':[['🐪','낙타'],['🦂','전갈'],['🦊','사막여우']],
  '극지방':[['🐧','펭귄'],['🐻‍❄️','북극곰'],['🦭','물범']],
};
const HAB_TIP={'땅':'땅 위나 땅속에서 걷거나 기어 다녀요','물':'지느러미나 다리로 헤엄쳐요','하늘':'날개가 있어 날아다녀요','사막':'물이 적고 더운 곳에서 견딜 수 있어요','극지방':'두꺼운 털이나 지방으로 추위를 견뎌요'};
const HAB_E={'땅':'🌳','물':'🌊','하늘':'☁️','사막':'🌵','극지방':'🧊'};
const FEAT=[
  {q:'날개가 있는 동물',y:[['🦅','독수리'],['🐝','꿀벌'],['🦋','나비'],['🐦','참새'],['🐞','무당벌레']],n:[['🐕','개'],['🐍','뱀'],['🐟','붕어'],['🐌','달팽이'],['🐇','토끼']]},
  {q:'다리가 없는 동물',y:[['🐍','뱀'],['🪱','지렁이'],['🐌','달팽이'],['🐟','붕어']],n:[['🐜','개미'],['🐕','개'],['🐦','참새'],['🦀','꽃게']]},
  {q:'다리가 6개인 동물 (곤충)',y:[['🐜','개미'],['🐝','꿀벌'],['🦋','나비'],['🐞','무당벌레'],['🦗','메뚜기']],n:[['🕷️','거미 (다리 8개)'],['🦀','꽃게 (다리 10개)'],['🐕','개 (다리 4개)'],['🐦','참새 (다리 2개)']]},
  {q:'더듬이가 있는 동물',y:[['🐜','개미'],['🐝','꿀벌'],['🦋','나비'],['🐞','무당벌레'],['🐌','달팽이']],n:[['🐕','개'],['🐦','참새'],['🐟','붕어'],['🐍','뱀']]},
  {q:'몸이 털로 덮인 동물',y:[['🐕','개'],['🐈','고양이'],['🐿️','다람쥐'],['🐇','토끼'],['🐻','곰']],n:[['🐟','붕어'],['🐍','뱀'],['🐢','거북'],['🐸','개구리']]},
  {q:'지느러미가 있는 동물',y:[['🐟','붕어'],['🦈','상어'],['🐬','돌고래']],n:[['🐙','문어'],['🦀','꽃게'],['🐸','개구리'],['🐧','펭귄']]},
  {q:'몸이 단단한 껍데기로 싸인 동물',y:[['🦀','꽃게'],['🐌','달팽이 (껍데기)'],['🐢','거북 (등딱지)']],n:[['🐸','개구리'],['🪱','지렁이'],['🐕','개'],['🐙','문어']]},
];
const MIMIC=[
  ['🦈','상어 비늘','전신 수영복','물의 저항을 줄여 줘요'],['🐙','문어 빨판','흡착판','매끄러운 곳에 착 달라붙어요'],['🦆','오리 발의 물갈퀴','수영용 오리발','물을 힘차게 밀어내요'],
  ['🐦','물총새 부리','고속 열차 앞모양','공기 저항과 소음을 줄여요'],['🦅','독수리 발톱','물건 집는 집게','물건을 꽉 움켜쥐어요'],['🦎','도마뱀붙이 발바닥','붙였다 뗐다 하는 테이프','벽에 붙었다 떨어져요'],
  ['🦟','모기 입','덜 아픈 주사 바늘','살갗을 아프지 않게 찔러요'],['🐈','고양이 눈','도로의 반사판','어두운 곳에서 빛을 반사해요'],['🐚','홍합 접착 물질','물속에서도 붙는 접착제','물속에서도 단단히 붙어요'],
];
const HC={'땅':['#8fd46a','#5fae44'],'물':['#6fc8f2','#2f8fd0'],'하늘':['#bfe6ff','#8fcdf5'],'사막':['#ffe29a','#f0b95a'],'극지방':['#dff6ff','#a8e0f5']};

/* ───────── 그림 도구 ───────── */
function star5(g,x,y,r,rot,fill){g.save();g.translate(x,y);g.rotate(rot||0);g.beginPath();for(let i=0;i<10;i++){const rr=i%2?r*.45:r,a=-Math.PI/2+i*Math.PI/5;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fillStyle=fill||'#ffd23f';g.fill();g.lineWidth=Math.max(1.5,r*.16);g.strokeStyle='#b8860b';g.lineJoin='round';g.stroke();g.restore();}
function rock(g,x,y,s){g.save();g.translate(x,y);g.fillStyle='#9aa3ad';g.strokeStyle='#4b5560';g.lineWidth=Math.max(2,s*.07);g.lineJoin='round';g.beginPath();g.moveTo(-s*.5,0);g.lineTo(-s*.42,-s*.38);g.lineTo(-s*.1,-s*.62);g.lineTo(s*.28,-s*.52);g.lineTo(s*.5,-s*.12);g.lineTo(s*.42,0);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.moveTo(-s*.3,-s*.3);g.lineTo(-s*.08,-s*.52);g.lineTo(s*.12,-s*.42);g.lineTo(-s*.1,-s*.25);g.closePath();g.fill();g.fillStyle='#4b5560';g.fillRect(-s*.1,-s*.24,s*.05,s*.07);g.fillRect(s*.08,-s*.24,s*.05,s*.07);g.restore();}
function jtree(g,x,y,s,k){g.save();g.translate(x,y);K.shadow(g,0,0,s*.35,s*.07,.2);g.fillStyle='#7a4f2a';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,s*.04);K.rr(g,-s*.07,-s*.55,s*.14,s*.55,s*.04);g.fill();g.stroke();
  const cols=[['#3fae5f','#2e8a49'],['#52c46a','#3aa656'],['#2f9e55','#237a40']][k%3];g.fillStyle=cols[0];for(const [dx,dy,r] of [[0,-.95,.42],[-.28,-.72,.3],[.28,-.72,.3],[0,-.72,.33]]){g.beginPath();g.arc(dx*s,dy*s,r*s,0,TAU);g.fill();g.stroke();}
  g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.arc(-s*.12,-s*1.02,s*.15,0,TAU);g.fill();g.restore();}
function flower(g,x,y,s,c){g.strokeStyle='#2f9e55';g.lineWidth=Math.max(1.5,s*.08);g.beginPath();g.moveTo(x,y);g.lineTo(x,y-s*.5);g.stroke();g.fillStyle=c;for(let i=0;i<5;i++){const a=i*TAU/5;g.beginPath();g.arc(x+Math.cos(a)*s*.16,y-s*.5+Math.sin(a)*s*.16,s*.12,0,TAU);g.fill();}g.fillStyle='#ffd23f';g.beginPath();g.arc(x,y-s*.5,s*.1,0,TAU);g.fill();}
function leafFrame(g,x,y,s,flip,rot,t){g.save();g.translate(x,y);if(flip)g.scale(-1,1);g.rotate(rot);for(let i=0;i<5;i++){g.save();g.rotate(-.2+i*.34+Math.sin(t*.8+i)*.03);const L=s*(.9+(i%2)*.15);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(L*.5,-s*.22,L,0);g.quadraticCurveTo(L*.5,s*.22,0,0);g.fillStyle=i%2?'#3fae5f':'#2f9e55';g.fill();g.lineWidth=Math.max(1.5,s*.03);g.strokeStyle=INK;g.stroke();g.beginPath();g.moveTo(0,0);g.lineTo(L*.9,0);g.strokeStyle='rgba(255,255,255,.35)';g.stroke();g.restore();}g.restore();}
/* 탐험대원(뒷모습). (x,y)=발 아래 가운데, s=키 */
function explorer(g,x,y,s,t,o){const run=Math.sin(t*12),run2=Math.sin(t*12+Math.PI);const jump=o.jump||0;g.save();g.translate(x,y-jump*s*.9);if(o.tilt)g.rotate(o.tilt);
  K.shadow(g,0,jump*s*.9+s*.02,s*.3*(1-jump*.3),s*.06,.28);
  if(o.dash){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=Math.max(2,s*.04);g.lineCap='round';for(let k=0;k<4;k++){g.beginPath();g.moveTo((k-1.5)*s*.2,s*.2+k*s*.04);g.lineTo((k-1.5)*s*.2,s*.8+k*s*.08);g.stroke();}K.glow(g,0,-s*.5,s*.8,'#ffd23f',.45);}
  g.lineWidth=Math.max(2,s*.045);g.strokeStyle=INK;g.lineJoin='round';g.lineCap='round';
  /* 다리 */
  const leg=(d,ph)=>{g.save();g.translate(d*s*.13,-s*.3);g.fillStyle='#3a6fd8';K.rr(g,-s*.07,0,s*.14,s*.24+ph*s*.04,s*.05);g.fill();g.stroke();g.fillStyle='#8a5a2b';K.rr(g,-s*.09,s*.2+ph*s*.04,s*.18,s*.1,s*.04);g.fill();g.stroke();g.restore();};
  if(!jump){leg(-1,run);leg(1,run2);}else{leg(-1,-.5);leg(1,.4);}
  /* 배낭 + 몸 */
  g.fillStyle='#ff9d2e';K.rr(g,-s*.24,-s*.74,s*.48,s*.5,s*.12);g.fill();g.stroke();
  g.fillStyle='#43b45a';K.rr(g,-s*.17,-s*.7,s*.34,s*.4,s*.08);g.fill();g.stroke();g.fillStyle='#2f8a46';g.fillRect(-s*.17,-s*.52,s*.34,s*.05);g.fillStyle='#e8d29a';K.rr(g,-s*.2,-s*.8,s*.4,s*.1,s*.05);g.fill();g.stroke();
  /* 팔 */
  const arm=(d)=>{g.save();g.translate(d*s*.27,-s*.68);g.rotate(o.cheer?d*(-2.4+Math.sin(t*14)*.3):d*(.5+run*d*.5*(d>0?1:-1)));g.fillStyle='#ff9d2e';K.rr(g,-s*.05,0,s*.1,s*.28,s*.05);g.fill();g.stroke();g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,s*.3,s*.06,0,TAU);g.fill();g.stroke();g.restore();};arm(-1);arm(1);
  /* 머리 + 모자 */
  g.fillStyle='#5a3a1f';g.beginPath();g.arc(0,-s*.88,s*.19,0,TAU);g.fill();g.stroke();
  g.fillStyle='#e8d29a';g.beginPath();g.ellipse(0,-s*.95,s*.3,s*.1,0,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(-s*.2,-s*.95);g.quadraticCurveTo(0,-s*1.28,s*.2,-s*.95);g.closePath();g.fill();g.stroke();g.fillStyle='#c0392b';g.fillRect(-s*.19,-s*1.0,s*.38,s*.05);
  /* 기분 말풍선 */
  if(o.mood){const bx=s*.34,by=-s*1.22;g.save();g.translate(bx,by);const pop=Math.min(1,o.moodT*4);g.scale(pop,pop);g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.04);g.beginPath();g.arc(0,0,s*.2,0,TAU);g.fill();g.stroke();
    if(o.mood==='love'){g.fillStyle='#ff4d6d';g.beginPath();g.moveTo(0,s*.09);g.bezierCurveTo(s*.2,-s*.06,s*.08,-s*.15,0,-s*.05);g.bezierCurveTo(-s*.08,-s*.15,-s*.2,-s*.06,0,s*.09);g.fill();}
    else if(o.mood==='dizzy'){g.strokeStyle='#6b5bd6';g.lineWidth=Math.max(2,s*.03);g.beginPath();for(let a=0;a<12;a+=.3){const r=a*s*.012;g.lineTo(Math.cos(a+t*8)*r,Math.sin(a+t*8)*r);}g.stroke();}
    else{star5(g,0,0,s*.12,t*2);}g.restore();}
  g.restore();}

/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W*.5,H)/5.2,hy=H*.36;
    K.vgrad(g,0,0,W,hy+2,['#6ec3f4','#dff3ff']);sunJ(g,W*.84,hy*.45,u*.5);K.clouds(g,W,H,T,.12,3,u*1.1);
    g.fillStyle='#8fcdb0';g.beginPath();g.moveTo(0,hy);for(let x=0;x<=W;x+=W/30)g.lineTo(x,hy-u*.5*(.5+.5*Math.sin(x/W*7+1)));g.lineTo(W,hy);g.fill();
    K.vgrad(g,0,hy,W,H-hy,['#7fd16a','#4fae4a']);
    /* 길 */
    const half0=W*.04,half1=W*.34;g.fillStyle='#e8c88a';g.beginPath();g.moveTo(W/2-half0,hy);g.lineTo(W/2+half0,hy);g.lineTo(W/2+half1,H);g.lineTo(W/2-half1,H);g.fill();
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=3;g.setLineDash([u*.3,u*.25]);g.lineDashOffset=-T*u*3;for(const s of[-1/3,1/3]){g.beginPath();g.moveTo(W/2+s*half0*2,hy);g.lineTo(W/2+s*half1*2,H);g.stroke();}g.setLineDash([]);
    for(let k=0;k<6;k++){const e=((k/6)+T*.22)%1,y=hy+(H-hy)*Math.pow(e,1.7),hf=lerp(half0,half1,Math.pow(e,1.7)),sc=lerp(.25,1,Math.pow(e,1.5));for(const sd of[-1,1])jtree(g,W/2+sd*(hf+u*.8*sc+((k*37)%3)*u*.2*sc),y,u*1.9*sc,k+(sd>0?1:0));}
    explorer(g,W/2,H*.96,u*(W>H*1.6?1.05:1.5),T,{cheer:Math.sin(T*.7)>.8});};
  const sunJ=(g,x,y,r)=>{K.glow(g,x,y,r*3,'#fff3b0',.7);g.fillStyle='#ffd23f';g.beginPath();g.arc(x,y,r,0,TAU);g.fill();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const GAME={
  id:'sci3-animalrun',title:'동물 탐험 달리기',title1:'정글 대모험',title2:'동물 탐험 달리기',emoji:LOGO,
  subtitle:'3학년 · 동물의 생활',
  howto:'세 갈래 길을 달려요! 위에 나온 질문에 맞는 <b>문</b>으로 쓱 옮겨 가서 통과해요. 돌은 피하고 ⭐은 모아요.',
  how:'손가락을 <b>← →</b>로 쓱 밀거나<br>가고 싶은 길을 톡!',
  txt:{who:'누구와 달릴까요?',dur:'탐험 시간',pace:'달리는 속도',seat:'번 대원 ',go:'탐험 출발!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#ff9d2e',c2:'#43b45a'},hero:heroScene,vignette:.05,durs:[60,90,120],
  levelTitle:'어떤 탐험을 할까요?',
  levels:[
    {id:'hab',g:'3학년 · 동물의 생활',t:'🌍 어디에 살까?',d:'땅·물·하늘·사막·극지방'},
    {id:'feat',g:'3학년 · 동물의 생활',t:'🔍 생김새와 특징',d:'날개·다리·더듬이·털…'},
    {id:'mimic',g:'3학년 · 동물의 생활',t:'💡 동물을 본뜬 물건',d:'상어 비늘 → 수영복'},
    {id:'all',g:'3학년 · 동물의 생활',t:'🌟 모두 섞기',d:'세 가지가 번갈아'},
  ],
  summary:`<ul><li>동물은 사는 곳에 알맞은 생김새를 가지고 있어요: 낙타의 혹·긴 속눈썹(사막), 북극곰의 두꺼운 털(극지방), 물고기의 지느러미(물).</li>
    <li>곤충은 다리가 6개, 몸이 머리·가슴·배로 나뉘고 더듬이가 있어요. 거미는 다리가 8개라 곤충이 아니에요.</li>
    <li>동물의 특징을 본떠 물건을 만들어요: 상어 비늘→수영복, 문어 빨판→흡착판, 물총새 부리→고속 열차.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{lane:0,lx:0,objs:[],speed:.22,gap:.4,waveN:0,kindI:0,cool:0,T:0,jump:0,mood:null,moodT:0,tilt:0});this.wave(p);},
  wave(p){const st=p.state,R=p.R,L=p.levelId;let k=L;if(L==='all')k=['hab','feat','mimic'][st.kindI++%3];
    let ans,opts,ask,sub,tipOk,tipBad,review;
    if(k==='hab'){const hs=Object.keys(HAB);const h=R.pick(hs);const a=R.pick(HAB[h]);const others=R.sample(hs.filter(x=>x!==h),2);
      opts=R.shuffle([h,...others]).map(x=>({t:x,e:HAB_E[x],ok:x===h,hab:x}));ask=`${a[0]} <b>${a[1]}</b>${J(a[1],'은').slice(a[1].length)} 어디에 살까?`;sub='알맞은 곳의 문으로 달려가요';
      tipOk=`${a[1]}: ${HAB_TIP[h]}`;tipBad=`${a[1]}${J(a[1],'은').slice(a[1].length)} <b>${h}</b>에 살아요 — ${HAB_TIP[h]}`;review=`${a[1]} → ${h}`;}
    else if(k==='feat'){const f=R.pick(FEAT);const y=R.pick(f.y);const ns=R.sample(f.n,2);
      opts=R.shuffle([{t:y[1].replace(/\s*\(.*\)/,''),e:y[0],ok:true},...ns.map(n=>({t:n[1].replace(/\s*\(.*\)/,''),e:n[0],ok:false,full:n[1]}))]);ask=`<b>${f.q}</b>의 문으로!`;sub='';
      tipOk='';tipBad=`${f.q}: <b>${y[1]}</b>`+(ns.some(n=>n[1].includes('('))?' · '+ns.filter(n=>n[1].includes('(')).map(n=>n[1]).join(', '):'');review=`${f.q} → ${y[1]}`;}
    else{const m=R.pick(MIMIC);const others=R.sample(MIMIC.filter(x=>x!==m),2);
      opts=R.shuffle([m,...others]).map(x=>({t:x[2],ok:x===m}));ask=`${m[0]} <b>${m[1]}</b>의 특징을 본떠 만든 것은?`;sub=m[3];
      tipOk=`${m[1]} → ${m[2]}`;tipBad=`${m[1]}${J(m[1],'을').slice(m[1].length)} 본뜬 것은 <b>${m[2]}</b> — ${m[3]}`;review=`${m[1]} → ${m[2]} (${m[3]})`;}
    p.ask(ask,sub);
    st.objs.push({type:'gate',d:-.05,opts,tipOk,tipBad,review});
    const R2=p.Rf;for(let k2=0;k2<2;k2++){st.objs.push({type:R2.chance(.55)?'rock':'star',d:-.05-(.32+k2*.22)*1,lane:R2.int(-1,1)});}
    st.waveN++;},
  hz(p){const u=p.u;return Math.max((p.top||0)+u*.2,p.H*.16);},
  persp(p,d){const H=p.H,W=p.W;const hy=this.hz(p),py=H*.88;const e=Math.max(0,d);const y=hy+(py-hy)*Math.pow(e,1.7);
    const half=K.lerp(W*.06,Math.min(W*.47,p.u*8.6),Math.pow(e,1.7));return{y,half,s:K.lerp(.25,1,Math.pow(e,1.5))};},
  laneX(p,lane,d){const q=this.persp(p,d);return p.W/2+lane*q.half*2/3;},
  update(p,dt){const st=p.state;st.T+=dt;st.speed=(.22+p.t/p.dur*.1)*p.pace;
    st.lx+=(st.lane-st.lx)*Math.min(1,dt*12);if(st.jump>0)st.jump=Math.max(0,st.jump-dt*2.4);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood=null;}st.tilt*=Math.max(0,1-dt*6);
    let gateLeft=false;
    for(const o of st.objs){o.d+=st.speed*dt;
      if(!o.done&&o.d>=.97){o.done=true;const myLane=st.lane;
        if(o.type==='gate'){const pick=o.opts[myLane+1];const ok=pick.ok;const x=this.laneX(p,myLane,1),y=this.persp(p,1).y-p.u*2;
          p.hit(ok,{x,y,tip:ok?(o.tipOk||undefined):o.tipBad,review:o.review});o.result=ok;st.flash=ok?0:.5;
          if(ok){st.jump=1;st.mood='love';st.moodT=1.2;p.burst(x,y+p.u*.6,'#ffd23f',14);}else{st.mood='dizzy';st.moodT=1.4;st.tilt=.4;}}
        else if(o.lane===myLane){if(o.type==='rock'){p.add(-10,this.laneX(p,o.lane,1),this.persp(p,1).y-p.u*2);p.Snd.drum();st.flash=.4;p.shake();st.mood='dizzy';st.moodT=1;st.tilt=-.4;}else{p.add(20,this.laneX(p,o.lane,1),this.persp(p,1).y-p.u*2);p.Snd.bell(1319,0,.05,.2);st.mood='star';st.moodT=.7;}o.got=true;}}
      if(o.type==='gate'&&!o.done)gateLeft=true;}
    st.objs=st.objs.filter(o=>o.d<1.25);
    if(!gateLeft&&!st.objs.some(o=>o.type==='gate'&&o.d<.2))this.wave(p);
    if(st.flash>0)st.flash-=dt;},
  door(g,u,q,x,hh,w,op,i,t,state){/* state: ''|'ok'|'bad'|'show' */
    const col=op.hab?HC[op.hab]:[['#9fd4ff','#6fb6f0'],['#ffc99a','#ff9d57'],['#d9c4ff','#b394ff']][i];const r=Math.max(4,w*.16);const x0=x-w/2,y0=-hh;
    g.save();g.translate(x,0);
    g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(0,0,w*.5,w*.07,0,0,TAU);g.fill();
    /* 문틀 */
    g.lineWidth=Math.max(2,5*q.s);g.strokeStyle=INK;g.fillStyle=state==='ok'?'#c8f7a8':state==='bad'?'#ffc4b8':'#fffef4';K.rr(g,-w/2,y0,w,hh,r);g.fill();g.stroke();
    /* 속 그림 */
    const pw=w*.82,ph=hh*.6,px=-pw/2,py=y0+hh*.06;g.save();K.rr(g,px,py,pw,ph,r*.7);g.clip();K.vgrad(g,px,py,pw,ph,[col[0],col[1]]);
    if(op.hab==='땅'){g.fillStyle='#8a5a2b';g.fillRect(px,py+ph*.75,pw,ph*.25);g.fillStyle='#43b45a';g.fillRect(px,py+ph*.7,pw,ph*.08);}
    if(op.hab==='물'){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=Math.max(1,3*q.s);for(let k=0;k<3;k++){g.beginPath();for(let xx=0;xx<=pw;xx+=pw/10)g.lineTo(px+xx,py+ph*(.55+k*.15)+Math.sin(xx*.1+t*3+k)*ph*.04);g.stroke();}}
    if(op.hab==='하늘'){g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.arc(px+pw*.3,py+ph*.7,ph*.14,0,TAU);g.arc(px+pw*.45,py+ph*.64,ph*.18,0,TAU);g.arc(px+pw*.62,py+ph*.7,ph*.13,0,TAU);g.fill();}
    if(op.hab==='사막'){g.fillStyle='#f0b95a';g.beginPath();g.ellipse(px+pw*.3,py+ph,pw*.5,ph*.25,0,Math.PI,0);g.fill();}
    if(op.hab==='극지방'){g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.moveTo(px+pw*.1,py+ph);g.lineTo(px+pw*.3,py+ph*.62);g.lineTo(px+pw*.5,py+ph);g.fill();g.beginPath();g.moveTo(px+pw*.45,py+ph);g.lineTo(px+pw*.7,py+ph*.55);g.lineTo(px+pw*.95,py+ph);g.fill();}
    g.restore();
    if(op.e){K.glow(g,0,py+ph*.5,pw*.6,'#ffffff',.55);K.emo(g,op.e,0,py+ph*.5,Math.min(ph*.9,pw*.7));}
    g.lineWidth=Math.max(1.5,3*q.s);g.strokeStyle=INK;K.rr(g,px,py,pw,ph,r*.7);g.stroke();
    /* 이름표 */
    K.tag(g,op.t,0,y0+hh*.82,{size:u*.5*q.s+3,maxW:w*.96,fill:state==='ok'?'#8fe46a':(state==='bad'?'#ff9a8a':'#ffe9a8'),stroke:INK,lw:Math.max(1.5,3*q.s),maxLines:3,color:'#27481f',r:u*.3*q.s,pad:u*.14*q.s});
    if(state==='ok'){for(let k=0;k<4;k++)star5(g,Math.cos(t*4+k*1.6)*w*.5,y0+hh*.3+Math.sin(t*4+k*1.6)*hh*.3,Math.max(3,w*.08),t*3);}
    if(state==='bad'){g.strokeStyle='#e5383b';g.lineWidth=Math.max(3,w*.07);g.lineCap='round';g.beginPath();g.moveTo(-w*.22,y0+hh*.2);g.lineTo(w*.22,y0+hh*.55);g.moveTo(w*.22,y0+hh*.2);g.lineTo(-w*.22,y0+hh*.55);g.stroke();}
    g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,hy=this.hz(p);
    /* 하늘·산·땅 */
    K.vgrad(g,0,0,W,hy+2,['#6ec3f4','#dff3ff']);g.save();K.glow(g,W*.82,hy*.42,u*2.4,'#fff3b0',.7);g.fillStyle='#ffd23f';g.beginPath();g.arc(W*.82,hy*.42,u*.5,0,TAU);g.fill();g.restore();K.clouds(g,W,H,t,.035,3,u*1.1);
    g.save();[['#a9d8c8',.9,1.3,0],['#7fc79b',.55,2.3,1.7]].forEach(([c,amp,fr,ph])=>{g.beginPath();g.moveTo(0,hy+1);for(let x=0;x<=W;x+=W/36)g.lineTo(x,hy-u*amp*(.5+.5*Math.sin(x/W*Math.PI*fr+ph))*(.6+.4*Math.sin(x/W*9+ph)));g.lineTo(W,hy+1);g.closePath();g.fillStyle=c;g.fill();});g.restore();
    K.vgrad(g,0,hy,W,H-hy,['#8fe07a','#5cc055','#3fa648']);
    /* 길 */
    const top=this.persp(p,0),bot=this.persp(p,1.1);
    const rg=g.createLinearGradient(0,top.y,0,bot.y);rg.addColorStop(0,'#f3e2b4');rg.addColorStop(1,'#dcae6e');g.fillStyle=rg;
    g.beginPath();g.moveTo(W/2-top.half,top.y);g.lineTo(W/2+top.half,top.y);g.lineTo(W/2+bot.half,bot.y);g.lineTo(W/2-bot.half,bot.y);g.closePath();g.fill();
    g.save();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=Math.max(2,u*.08);g.lineCap='round';for(const sd of[-1,1]){g.beginPath();g.moveTo(W/2+sd*top.half,top.y);g.lineTo(W/2+sd*bot.half,bot.y);g.stroke();}
    g.strokeStyle='rgba(255,255,255,.6)';for(let k=0;k<8;k++){const d=((k/8)+t*st.speed)%1;const q=this.persp(p,d);g.lineWidth=Math.max(1.5,u*.1*q.s);for(const s of[-1/3,1/3]){g.beginPath();g.moveTo(W/2+s*q.half*2,q.y);g.lineTo(W/2+s*q.half*2,q.y+u*.35*q.s);g.stroke();}}g.restore();
    /* 길가 나무·꽃 */
    for(let k=0;k<6;k++){const d=((k/6)+t*st.speed)%1;const q=this.persp(p,d);for(const sd of[-1,1]){const x=W/2+sd*(q.half+u*1.2*q.s+((k*37)%3)*u*.3*q.s);if(x<-u*2||x>W+u*2)continue;
        if((k+(sd>0?1:0))%3===0)flower(g,x,q.y,u*1.1*q.s,['#ff6b9a','#ffd23f','#ff9d2e'][k%3]);else jtree(g,x,q.y,u*2.3*q.s,k+(sd>0?1:0));}}
    /* 먼 것부터 */
    const objs=st.objs.slice().sort((a,b)=>a.d-b.d);
    for(const o of objs){if(o.d<0)continue;const q=this.persp(p,o.d);
      if(o.type==='gate'){o.opts.forEach((op,i)=>{const lane=i-1;const x=this.laneX(p,lane,o.d);const w=q.half*2/3*.92;const hh=u*3.4*q.s;
          let state='';if(o.done){if(op.ok)state='ok';else if(lane===st.lane)state='bad';}
          g.save();g.translate(0,q.y);g.globalAlpha=o.done?Math.max(0,1-(o.d-.97)*6):1;this.door(g,u,q,x,hh,w,op,i,t,state);g.restore();});}
      else if(!o.got){const x=this.laneX(p,o.lane,o.d);K.shadow(g,x,q.y,u*.45*q.s,u*.1*q.s,.2);
        if(o.type==='star'){K.glow(g,x,q.y-u*.5*q.s,u*.8*q.s,'#fde68a',.6);star5(g,x,q.y-u*.55*q.s-Math.abs(Math.sin(t*4+o.d*9))*u*.15*q.s,u*.5*q.s,Math.sin(t*3)*.2);}
        else rock(g,x,q.y,u*1.15*q.s);}}
    /* 나 */
    const q=this.persp(p,1);const x=W/2+st.lx*q.half*2/3;
    explorer(g,x,q.y+u*.1,u*2.3,t,{jump:Math.sin(st.jump*Math.PI)*.5,cheer:st.jump>0,mood:st.mood,moodT:Math.min(1,st.moodT+.1),dash:p.streak>=3,tilt:st.tilt});
    const my=q.y-u*3;g.save();g.shadowColor='rgba(0,0,0,.3)';g.shadowBlur=u*.2;g.fillStyle=p.color;g.beginPath();g.moveTo(x-u*.22,my);g.lineTo(x+u*.22,my);g.lineTo(x,my+u*.28);g.closePath();g.fill();g.restore();
    /* 정글 잎 장식 */
    leafFrame(g,-u*.2,-u*.1,u*3.2,false,.7,t);leafFrame(g,W+u*.2,-u*.1,u*3.2,true,.7,t);
    if(st.flash>0){g.fillStyle=`rgba(239,68,68,${st.flash*.3})`;g.fillRect(0,0,W,H);}},
  setLane(p,l){const st=p.state;l=Math.max(-1,Math.min(1,l));if(l!==st.lane){st.lane=l;p.Snd.tone(700,.05,'sine',.04);}},
  up(p,x,y,d){const u=p.u;const dx=x-d.x0;
    if(Math.abs(dx)>u*.6&&Math.abs(dx)>Math.abs(y-d.y0)){this.setLane(p,p.state.lane+(dx>0?1:-1));return;}
    const q=this.persp(p,1);const rel=(x-p.W/2)/(q.half*2/3);this.setLane(p,Math.round(Math.max(-1,Math.min(1,rel))));},
};

Engine.boot(GAME);
