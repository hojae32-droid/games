/* 5학년 · 날씨와 우리 생활 — 바람 요트 레이스 (알맞은 방향으로 쓱 밀어 요트를 달리게 하기)
   디자인: 유리 느낌의 바다 항해. 요트·선장·돌고래·해와 달·마을은 모두 직접 그린 그림이고, 라이벌 요트가 쫓아와요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 5v28H10z" fill="#fff" stroke="#0a3a66" stroke-width="2.5" stroke-linejoin="round"/><path d="M27 12c8 6 11 14 11 21H27z" fill="#ff6b57" stroke="#0a3a66" stroke-width="2.5" stroke-linejoin="round"/><path d="M6 36h36l-5 7H11z" fill="#0a3a66"/><path d="M4 45c5-3 8 3 13 0s8 3 13 0 8 3 13 0" fill="none" stroke="#7cc9e8" stroke-width="2.5" stroke-linecap="round"/></svg>';
const WX_WATER=[
  ['밤에 차가워진 풀잎에 맺힌 물방울','이슬'],['새벽에 지표 가까이 뿌옇게 떠 있는 작은 물방울','안개'],['높은 하늘에서 수증기가 응결해 떠 있는 것','구름'],
  ['차가운 거미줄에 맺힌 물방울','이슬'],['강가 아침에 앞이 잘 안 보이게 낀 것','안개'],['공기가 위로 올라가 차가워지며 생긴 것','구름'],
  ['아침 자동차 유리 겉면의 물방울','이슬'],['비행기에서 내려다보이는 하얀 덩어리','구름'],
];
const WX_TWO=[
  {q:'빨래가 잘 마르지 않고 곰팡이가 잘 피어요',l:'습도가 높을 때',r:'습도가 낮을 때',a:'l'},
  {q:'피부가 건조해지고 산불이 나기 쉬워요',l:'습도가 높을 때',r:'습도가 낮을 때',a:'r'},
  {q:'제습기를 켜면 좋아요',l:'습도가 높을 때',r:'습도가 낮을 때',a:'l'},
  {q:'가습기나 젖은 수건을 쓰면 좋아요',l:'습도가 높을 때',r:'습도가 낮을 때',a:'r'},
  {q:'우리나라 <b>여름</b>: 덥고 습해요',l:'남동쪽 바다에서 오는 공기',r:'북서쪽 대륙에서 오는 공기',a:'l'},
  {q:'우리나라 <b>겨울</b>: 춥고 건조해요',l:'남동쪽 바다에서 오는 공기',r:'북서쪽 대륙에서 오는 공기',a:'r'},
  {q:'구름 속 작은 물방울이 커지고 무거워져 떨어지면?',l:'비',r:'안개',a:'l'},
  {q:'구름 속 얼음 알갱이가 녹지 않고 떨어지면?',l:'눈',r:'이슬',a:'l'},
  {q:'상대적으로 공기가 무거워 기압이 높은 곳은?',l:'차가운 공기 (고기압)',r:'따뜻한 공기 (저기압)',a:'l'},
  {q:'건습구 습도계로 알 수 있는 것은?',l:'습도',r:'바람의 세기',a:'l'},
];
/* ───────── 그림 도구 ───────── */
function yacht(g,x,y,s,t,heel,col,mood,o={}){/* (x,y)=수면, s=배 길이 */
  g.save();g.translate(x,y);
  /* 물보라 */
  if(o.wake){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=Math.max(1.5,s*.03);g.lineCap='round';for(let k=0;k<3;k++){const w=((t*1.2+k/3)%1);g.globalAlpha=1-w;g.beginPath();g.moveTo(-s*.5-w*s*.5,s*.02+k*s*.02);g.lineTo(-s*.2,s*.04);g.stroke();}g.globalAlpha=1;}
  g.rotate(heel);
  const bob=Math.sin(t*2.5+(o.ph||0))*s*.02;g.translate(0,bob);
  /* 돛 */
  const bil=(o.bil||0)+Math.sin(t*3+(o.ph||0))*.03;
  const mastH=s*.95;g.fillStyle='#fff';g.strokeStyle='rgba(10,58,102,.55)';g.lineWidth=Math.max(1.4,s*.02);g.lineJoin='round';
  g.beginPath();g.moveTo(-s*.02,-s*.12);g.lineTo(-s*.02,-mastH);g.quadraticCurveTo(-s*.34-bil*s,-mastH*.5,-s*.34,-s*.12);g.closePath();g.fill();g.stroke();
  g.fillStyle=o.sail||'#fff6e0';g.beginPath();g.moveTo(s*.03,-s*.12);g.lineTo(s*.03,-mastH*.92);g.quadraticCurveTo(s*.3+bil*s,-mastH*.45,s*.46,-s*.14);g.closePath();g.fill();g.stroke();
  g.strokeStyle=col;g.lineWidth=Math.max(2,s*.035);g.beginPath();g.moveTo(s*.08,-s*.3);g.quadraticCurveTo(s*.22+bil*s*.5,-s*.26,s*.34,-s*.26);g.stroke();
  g.strokeStyle='#5a4630';g.lineWidth=Math.max(2,s*.03);g.beginPath();g.moveTo(0,-s*.1);g.lineTo(0,-mastH-s*.04);g.stroke();
  /* 깃발 */
  g.fillStyle=col;g.beginPath();g.moveTo(0,-mastH-s*.04);g.lineTo(s*.2+Math.sin(t*8)*s*.02,-mastH-s*.01);g.lineTo(0,-mastH+s*.07);g.fill();
  /* 선장 */
  const cx=-s*.12,cy=-s*.17;g.fillStyle='#ffd6b0';g.beginPath();g.arc(cx,cy-s*.07,s*.07,0,TAU);g.fill();g.fillStyle=col;g.beginPath();g.arc(cx,cy-s*.09,s*.075,Math.PI,0);g.fill();g.fillRect(cx-s*.08,cy-s*.1,s*.16,s*.025);
  g.fillStyle='#222';g.strokeStyle='#222';g.lineWidth=Math.max(1,s*.014);
  if(mood==='happy'){g.beginPath();g.arc(cx-s*.025,cy-s*.07,s*.012,Math.PI,0);g.stroke();g.beginPath();g.arc(cx+s*.025,cy-s*.07,s*.012,Math.PI,0);g.stroke();g.beginPath();g.arc(cx,cy-s*.05,s*.02,.1*Math.PI,.9*Math.PI);g.stroke();
    g.strokeStyle='#ffd6b0';g.lineWidth=Math.max(2,s*.025);g.lineCap='round';g.beginPath();g.moveTo(cx+s*.06,cy);g.lineTo(cx+s*.12,cy-s*.1-Math.abs(Math.sin(t*10))*s*.03);g.stroke();}
  else if(mood==='oops'){g.beginPath();g.arc(cx-s*.025,cy-s*.07,s*.016,0,TAU);g.arc(cx+s*.025,cy-s*.07,s*.016,0,TAU);g.stroke();g.beginPath();g.arc(cx,cy-s*.035,s*.02,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else{g.beginPath();g.arc(cx-s*.025,cy-s*.07,s*.01,0,TAU);g.arc(cx+s*.025,cy-s*.07,s*.01,0,TAU);g.fill();}
  g.fillStyle=col;g.fillRect(cx-s*.06,cy,s*.12,s*.06);
  /* 선체 */
  g.fillStyle='#fff';g.strokeStyle='rgba(10,58,102,.7)';g.lineWidth=Math.max(1.6,s*.025);g.beginPath();g.moveTo(-s*.5,-s*.1);g.lineTo(s*.52,-s*.1);g.quadraticCurveTo(s*.42,s*.08,s*.2,s*.1);g.lineTo(-s*.34,s*.1);g.quadraticCurveTo(-s*.46,s*.05,-s*.5,-s*.1);g.closePath();g.fill();g.stroke();
  g.fillStyle=col;g.beginPath();g.moveTo(-s*.5,-s*.06);g.lineTo(s*.51,-s*.06);g.quadraticCurveTo(s*.47,s*.02,s*.4,s*.04);g.lineTo(-s*.46,s*.04);g.closePath();g.fill();
  g.fillStyle='#bfe6ff';for(let k=0;k<3;k++)g.fillRect(-s*.2+k*s*.16,-s*.09,s*.08,s*.025);
  g.restore();}
function sun(g,x,y,r,t){g.save();K.glow(g,x,y,r*3,'#fff1a8',.6);g.translate(x,y);g.rotate(t*.1);g.strokeStyle='rgba(255,226,120,.8)';g.lineWidth=Math.max(2,r*.12);g.lineCap='round';for(let i=0;i<12;i++){g.rotate(TAU/12);g.beginPath();g.moveTo(r*1.25,0);g.lineTo(r*(1.55+(i%2)*.3),0);g.stroke();}
  g.fillStyle='#ffd23f';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.fillStyle='#fff4b0';g.beginPath();g.arc(-r*.25,-r*.25,r*.45,0,TAU);g.fill();g.restore();}
function moon(g,x,y,r){g.save();K.glow(g,x,y,r*3,'#c7d2fe',.4);g.fillStyle='#fdf6d0';g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.fillStyle='rgba(180,170,120,.35)';g.beginPath();g.arc(x-r*.3,y-r*.1,r*.2,0,TAU);g.arc(x+r*.25,y+r*.3,r*.15,0,TAU);g.arc(x+r*.2,y-r*.4,r*.1,0,TAU);g.fill();g.restore();}
function house(g,x,y,s,col,night){g.save();g.translate(x,y);g.fillStyle=col;g.fillRect(-s*.4,-s*.55,s*.8,s*.55);g.fillStyle='#d9534f';g.beginPath();g.moveTo(-s*.5,-s*.55);g.lineTo(0,-s*1.0);g.lineTo(s*.5,-s*.55);g.closePath();g.fill();g.fillStyle=night?'#ffd96a':'#bfe6ff';g.fillRect(-s*.26,-s*.4,s*.2,s*.2);g.fillRect(s*.06,-s*.4,s*.2,s*.2);g.fillStyle='#8b5a2b';g.fillRect(-s*.07,-s*.22,s*.14,s*.22);g.restore();}
function tree(g,x,y,s,night){g.fillStyle='#6b4a2b';g.fillRect(x-s*.05,y-s*.4,s*.1,s*.4);g.fillStyle=night?'#2f6a3a':'#3fae5f';g.beginPath();g.arc(x,y-s*.65,s*.3,0,TAU);g.arc(x-s*.2,y-s*.5,s*.22,0,TAU);g.arc(x+s*.2,y-s*.5,s*.22,0,TAU);g.fill();}
function gull(g,x,y,s,t){g.save();g.translate(x,y);g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,s*.12);g.lineCap='round';const f=Math.sin(t*5+x)*s*.35;g.beginPath();g.moveTo(-s,f);g.quadraticCurveTo(-s*.5,-s*.5,0,0);g.quadraticCurveTo(s*.5,-s*.5,s,f);g.stroke();g.restore();}
function island(g,x,y,s,t){g.save();g.translate(x,y);K.shadow(g,0,s*.1,s*.7,s*.12,.2);g.fillStyle='#f5d58a';g.beginPath();g.ellipse(0,s*.05,s*.62,s*.2,0,Math.PI,0);g.fill();g.fillStyle='#ffe8ad';g.beginPath();g.ellipse(-s*.1,-s*.02,s*.35,s*.08,0,Math.PI,0);g.fill();
  g.strokeStyle='#8b5a2b';g.lineWidth=Math.max(2,s*.07);g.lineCap='round';g.beginPath();g.moveTo(s*.05,-s*.02);g.quadraticCurveTo(s*.15,-s*.35,s*.08,-s*.62);g.stroke();
  g.fillStyle='#2f9e4f';for(let i=0;i<5;i++){g.save();g.translate(s*.08,-s*.62);g.rotate(-1.2+i*.6+Math.sin(t*2+i)*.06);g.beginPath();g.ellipse(s*.2,0,s*.22,s*.06,0,0,TAU);g.fill();g.restore();}
  g.fillStyle='#ff6b57';g.beginPath();g.moveTo(-s*.3,-s*.05);g.lineTo(-s*.3,-s*.5);g.lineTo(-s*.08,-s*.4);g.lineTo(-s*.3,-s*.3);g.fill();g.fillStyle='#6b4a2b';g.fillRect(-s*.31,-s*.52,s*.025,s*.5);g.restore();}
function dolphin(g,x,y,s,a){g.save();g.translate(x,y);g.rotate(a);g.fillStyle='#4a90c4';g.beginPath();g.moveTo(-s*.5,0);g.quadraticCurveTo(-s*.1,-s*.35,s*.4,-s*.05);g.quadraticCurveTo(s*.62,-s*.04,s*.68,s*.04);g.quadraticCurveTo(s*.4,s*.08,s*.2,s*.14);g.quadraticCurveTo(-s*.2,s*.22,-s*.5,0);g.fill();
  g.fillStyle='#e8f4ff';g.beginPath();g.moveTo(-s*.3,s*.08);g.quadraticCurveTo(s*.1,s*.2,s*.45,s*.06);g.quadraticCurveTo(s*.1,s*.14,-s*.3,s*.08);g.fill();
  g.fillStyle='#3a78a8';g.beginPath();g.moveTo(-s*.5,0);g.lineTo(-s*.72,-s*.16);g.lineTo(-s*.66,s*.08);g.fill();g.beginPath();g.moveTo(-s*.05,-s*.2);g.lineTo(-s*.12,-s*.42);g.lineTo(s*.12,-s*.14);g.fill();
  g.fillStyle='#111';g.beginPath();g.arc(s*.4,-s*.02,s*.025,0,TAU);g.fill();g.restore();}
function wxIcon(g,k,x,y,s,t){g.save();g.translate(x,y);
  if(k==='이슬'){g.strokeStyle='#2f9e4f';g.lineWidth=s*.12;g.lineCap='round';g.beginPath();g.moveTo(-s*.5,s*.3);g.quadraticCurveTo(0,-s*.5,s*.5,s*.3);g.stroke();g.fillStyle='#bfe6ff';g.strokeStyle='#4a90c4';g.lineWidth=s*.05;for(const [dx,dy] of [[-.2,-.05],[.05,-.2],[.28,.0]]){g.beginPath();g.moveTo(dx*s,dy*s-s*.12);g.quadraticCurveTo(dx*s+s*.1,dy*s+s*.04,dx*s,dy*s+s*.1);g.quadraticCurveTo(dx*s-s*.1,dy*s+s*.04,dx*s,dy*s-s*.12);g.fill();g.stroke();}}
  else if(k==='안개'){g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=s*.14;g.lineCap='round';for(let i=0;i<4;i++){const o=Math.sin(t+i)*s*.08;g.beginPath();g.moveTo(-s*.5+o,-s*.3+i*s*.22);g.quadraticCurveTo(0,-s*.42+i*s*.22,s*.5+o,-s*.3+i*s*.22);g.stroke();}}
  else{g.fillStyle='#fff';g.strokeStyle='#9bbfdc';g.lineWidth=s*.05;g.beginPath();g.arc(-s*.25,s*.05,s*.22,Math.PI*.5,Math.PI*1.5);g.arc(-s*.02,-s*.12,s*.3,Math.PI,Math.PI*2);g.arc(s*.28,s*.05,s*.22,Math.PI*1.5,Math.PI*.5);g.closePath();g.fill();g.stroke();}
  g.restore();}

/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H)/9,hz=H*.46;
    K.vgrad(g,0,0,W,hz+2,['#ff9a7a','#ffd6a0','#ffe9c0']);sun(g,W*.72,hz-u*1.2,u*.9,T);
    for(let i=0;i<4;i++){const x=((i*W/3.4+T*u*.18)%(W+u*6))-u*3;K.cloud(g,x,hz*(.25+(i%2)*.18),u*(1.6+i*.15),.8);}
    for(let i=0;i<3;i++)gull(g,W*(.18+i*.2)+Math.sin(T*.5+i)*u*.4,hz*(.28+i*.1)+Math.sin(T+i)*u*.2,u*.28,T+i);
    K.water(g,hz,W,H,'#4cc3f2','#0b4f8a',T,u*.1);
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;for(let k=0;k<22;k++){const xx=((hash(k)*W+T*u*.3*(.5+hash(k+9)))%W),yy=hz+u*.4+hash(k+3)*(H-hz-u*.8);g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+u*(.5+hash(k+5)),yy);g.stroke();}
    const cols=['#ff6b57','#ffd23f','#34c38f'];
    for(let i=0;i<3;i++){const sp=.05+i*.03;const x=((T*sp+i*.37)%1.2)*(W+u*8)-u*3;const yy=hz+u*(1.1+i*1.3)+Math.sin(T+i)*u*.05;yacht(g,x,yy,u*(1.5+i*.5),T,.08+Math.sin(T*.8+i)*.03,cols[i],'happy',{wake:true,ph:i,bil:.1,sail:i===1?'#fff':'#fff6e0'});}
    };
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const GAME={
  id:'sci5-weather',title:'바람 요트 레이스',title1:'날씨 항해사',title2:'바람 요트 레이스',emoji:LOGO,
  subtitle:'5학년 · 날씨와 우리 생활',
  howto:'화면을 <b>바람이 부는 방향</b>(또는 정답 쪽)으로 <b>쓱</b> 밀어요! 맞히면 요트가 앞으로 나가요. 라이벌보다 먼저 섬에 도착하면 보너스!',
  how:'정답 쪽으로 손가락을 <b>쓱!</b> (또는 정답 쪽을 톡)<br>← ↑ →',
  txt:{who:'누구와 항해할까요?',dur:'항해 시간',pace:'한 문제 시간',seat:'번 선장 ',go:'출항!',s1:'1. 항로',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#0a3a66',c2:'#ff6b57'},hero:heroScene,vignette:.08,durs:[60,90,120],
  levelTitle:'어떤 항로로 갈까요?',
  levels:[
    {id:'wind',g:'5학년 · 날씨와 우리 생활',t:'🌬️ 바람의 방향',d:'고기압·저기압, 해풍·육풍'},
    {id:'water',g:'5학년 · 날씨와 우리 생활',t:'🌫️ 이슬·안개·구름',d:'수증기의 응결'},
    {id:'humid',g:'5학년 · 날씨와 우리 생활',t:'💧 습도·비와 눈·계절',d:'둘 중 알맞은 쪽'},
    {id:'all',g:'5학년 · 날씨와 우리 생활',t:'🌟 모두 섞기',d:'골고루 나와요'},
  ],
  summary:`<ul><li><b>습도</b>: 공기 중 수증기가 포함된 정도. 높으면 빨래가 잘 안 마르고 곰팡이가, 낮으면 피부가 건조하고 산불이 나기 쉬워요.</li>
    <li>수증기가 응결해서: 차가운 물체 표면에 맺히면 <b>이슬</b>, 지표 가까이 떠 있으면 <b>안개</b>, 높은 하늘에 떠 있으면 <b>구름</b>이에요.</li>
    <li>바람은 <b>고기압에서 저기압</b>으로 불어요. 낮에는 바다 → 육지(<b>해풍</b>), 밤에는 육지 → 바다(<b>육풍</b>)로 불어요.</li>
    <li>우리나라 여름은 남동쪽 바다의 덥고 습한 공기, 겨울은 북서쪽 대륙의 차고 건조한 공기의 영향을 받아요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{prog:0,boatX:0,kN:0,anim:0,rival:0,rivalX:0,heel:0,mood:'neutral',moodT:0,dolphin:null,T:0,qt:0,qmax:10,legs:0});this.next(p);},
  next(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?['wind','water','humid'][st.kN++%3]:L;st.k=k;st.lock=false;st.res=null;st.card=null;st.labels=null;st.qmax=(k==='water'?9:(k==='wind'?9:11))/p.pace;st.qt=st.qmax;
    if(k==='wind'){const type=R.pick(['sea','press','press','sea']);if(type==='sea'){const day=R.chance(.5),seaLeft=R.chance(.5);st.sc={type,day,seaLeft};
        const toLand=day;st.ans=(toLand?(seaLeft?'r':'l'):(seaLeft?'l':'r'));st.why=day?'낮에는 육지가 빨리 데워져 바다 → 육지로 바람(해풍)':'밤에는 육지가 빨리 식어 육지 → 바다로 바람(육풍)';
        p.ask(`${day?'☀️ 맑은 날 <b>낮</b>':'🌙 맑은 날 <b>밤</b>'}, 바닷가에서 바람은 어느 쪽으로?`,'바람이 부는 방향으로 쓱!');}
      else{const hiLeft=R.chance(.5);st.sc={type,hiLeft};st.ans=hiLeft?'r':'l';st.why='바람은 고기압에서 저기압으로 불어요';p.ask('🌬️ 바람은 어느 쪽으로 불까요?','바람이 부는 방향으로 쓱!');}}
    else if(k==='water'){const it=p.deck(WX_WATER,'ww');st.card=it[0];st.sc={type:'card'};const dirs=R.shuffle(['l','u','r']);st.labels={};['이슬','안개','구름'].forEach((n,i)=>st.labels[dirs[i]]=n);
      st.ans=Object.keys(st.labels).find(d=>st.labels[d]===it[1]);st.why=`${it[0]} → ${it[1]}`;p.ask('🌫️ 무엇일까요?','정답 쪽으로 쓱!');}
    else{const it=p.deck(WX_TWO,'wt');st.card=strip(it.q);st.sc={type:'card'};const sw=R.chance(.5);st.labels=sw?{l:it.r,r:it.l}:{l:it.l,r:it.r};st.ans=sw?(it.a==='l'?'r':'l'):it.a;
      st.why=`${strip(it.q)} → ${it.a==='l'?it.l:it.r}`;p.ask('💧 알맞은 쪽은?','정답 쪽으로 쓱!');}},
  update(p,dt){const st=p.state;st.T+=dt;st.boatX+=(st.prog-st.boatX)*Math.min(1,dt*3);st.anim=Math.max(0,st.anim-dt);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    st.heel+=((st.mood==='oops'?.28*Math.sin(st.T*18):.06+Math.sin(st.T*1.4)*.025)-st.heel)*Math.min(1,dt*8);
    if(st.rival<1&&st.prog<1)st.rival=Math.min(1,st.rival+dt/(62/p.pace)); st.rivalX+=(st.rival-st.rivalX)*Math.min(1,dt*3);
    if(st.rival>=1&&!st.rivalWin){st.rivalWin=true;p.tip('🏴‍☠️ 라이벌 요트가 먼저 도착했어요! 다시 출발!','bad',1800);p.Snd.bad();setTimeout(()=>{if(!p.active)return;st.rival=0;st.rivalX=0;st.prog=0;st.boatX=0;st.rivalWin=false;},1200);}
    if(!st.lock&&st.qt>0){st.qt-=dt;if(st.qt<=0){st.lock=true;st.res={dir:null,ok:false,reveal:true};p.Snd.bad();st.mood='oops';st.moodT=1.2;
        p.hit(false,{pen:20,x:p.W/2,y:p.H*.3,tip:`시간이 다 됐어요! 정답: <b>${this.ansText(st)}</b> — ${st.why}`,review:st.why,tipMs:3000});setTimeout(()=>{if(p.active)this.next(p);},1800);}}},
  tipBot(p){return this.Zs(p).raceH+p.u*.2;},
  ansText(st){return st.k==='wind'?(st.ans==='l'?'← 왼쪽':'오른쪽 →'):st.labels[st.ans];},
  Zs(p){const u=p.u,Z0=(p.top!=null?p.top:u*3),raceH=Math.min(u*2.9,Math.max(70,(p.H-Z0))*.27);const top=p.H-raceH;return{Z0,top,raceH,sh:Math.max(60,top-Z0)};},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,sc=st.sc;if(!sc)return;const{Z0,top,raceH,sh}=this.Zs(p);const night=sc.type==='sea'&&!sc.day;
    /* 하늘 (HUD 뒤까지 가득) */
    if(night){K.vgrad(g,0,0,W,top,['#08122e','#1a2560','#34428a']);K.stars(g,W,top*.6,t,70,5);}else K.vgrad(g,0,0,W,top,['#5fb4f2','#a8d8fb','#e6f5ff']);
    const hz=Z0+sh*.46;
    if(sc.type==='sea'){const seaX=sc.seaLeft?0:W/2,landX=sc.seaLeft?W/2:0;
      if(sc.day){sun(g,W/2,Z0+sh*.2,u*.62,t);K.clouds(g,W,top,t,.12,2,u*1.4);}else moon(g,W/2,Z0+sh*.2,u*.55);
      /* 바다 */
      g.save();g.beginPath();g.rect(seaX,0,W/2,top);g.clip();K.water(g,hz,W+16,top,night?'#2b4c9b':'#4cc3f2',night?'#0f1d4d':'#1677c7',t,u*.08);
      g.fillStyle='rgba(255,255,255,.25)';for(let k=0;k<7;k++){const xx=seaX+((k*W*.1+t*u*.4)%(W/2)),yy=hz+sh*(.1+k%3*.12);g.fillRect(xx,yy,u*.6,2);}
      yacht(g,seaX+W/4,hz+sh*.2,u*1.1,t,.07,'#ff6b57','neutral',{ph:2,wake:false,bil:.05});g.restore();
      /* 육지 */
      g.save();g.beginPath();g.rect(landX,0,W/2,top);g.clip();g.translate(landX,0);K.hills(g,W/2,top,hz-sh*.05,night?'#3c5a3a':'#9be3b4',night?'#2d4a2b':'#5fcf8a');
      const ex=sc.seaLeft?W*.1:W*.4;house(g,W/4,hz+sh*.2,u*1.1,night?'#c9b79a':'#fff3d6',night);house(g,W/4+(sc.seaLeft?u*1.0:-u*1.0),hz+sh*.17,u*.8,night?'#b8a98f':'#ffe2c4',night);tree(g,W/4+(sc.seaLeft?u*1.9:-u*1.9),hz+sh*.2,u*1.1,night);g.restore();
      const bx=W/2;const sg=g.createLinearGradient(bx-u*.6,0,bx+u*.6,0);const sand=night?'#7c6a4a':'#f6dca0';sg.addColorStop(0,K.rgba(sand,sc.seaLeft?0:1));sg.addColorStop(1,K.rgba(sand,sc.seaLeft?1:0));g.fillStyle=sg;g.fillRect(bx-u*.6,hz,u*1.2,top-hz);
      const lbl=(s,x,c1,c2)=>K.tag(g,s,x,top-u*.55,{size:u*.4,maxW:W*.4,fill:c1,stroke:'rgba(255,255,255,.7)',color:c2,r:u*.4});
      lbl('🌊 바다',seaX+W/4,night?'#1e3a8a':'#e0f2fe',night?'#e0e7ff':'#075985');lbl('🏞️ 육지',landX+W/4,night?'#14532d':'#ecfccb',night?'#dcfce7':'#3f6212');
      for(let i=0;i<2;i++)gull(g,W*(.3+i*.35)+Math.sin(t*.4+i)*u*.4,Z0+sh*(.1+i*.07),u*.22,t+i);}
    else if(sc.type==='press'){K.clouds(g,W,top,t,.14,3,u*1.3);K.hills(g,W,top,Z0+sh*.9,'#b9e8c8','#8fd8a8');
      [[sc.hiLeft,W*.25],[!sc.hiLeft,W*.75]].forEach(([hi,x])=>{const r=Math.min(W*.2,u*2.3,sh*.32),y=Z0+sh*.45;const c=hi?'#60a5fa':'#f87171';
        K.glow(g,x,y,r*1.5,c,.35);const gr=g.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);gr.addColorStop(0,K.rgba(hi?'#dbeafe':'#fee2e2',.95));gr.addColorStop(1,K.rgba(hi?'#93c5fd':'#fca5a5',.9));
        g.save();g.shadowColor='rgba(15,27,61,.2)';g.shadowBlur=r*.25;g.shadowOffsetY=r*.08;g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.restore();
        g.save();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;g.beginPath();g.arc(x,y,r*.92,0,TAU);g.stroke();g.restore();
        const n=hi?18:6;g.save();g.fillStyle=hi?'rgba(29,78,216,.4)':'rgba(185,28,28,.35)';for(let k=0;k<n;k++){const a=k*2.4+t*(hi?.2:.6),rr=r*(.3+.5*((k*37)%10)/10);g.beginPath();g.arc(x+Math.cos(a)*rr,y+Math.sin(a)*rr*.9+r*.1,r*.05,0,TAU);g.fill();}g.restore();
        K.txt(g,hi?'고기압':'저기압',x,y-r*.1,{size:Math.max(14,u*.62),color:hi?'#1d4ed8':'#b91c1c'});K.tag(g,hi?'공기가 무거워요':'공기가 가벼워요',x,y+r*.42,{size:u*.3,maxW:r*1.8,fill:'rgba(255,255,255,.92)',color:'#475569',r:u*.3,pad:u*.12});});}
    else{K.clouds(g,W,top,t,.12,3,u*1.4);K.hills(g,W,top,Z0+sh*.9,'#b9e8c8','#8fd8a8');
      const cy=Z0+sh*.42;const r=K.tag(g,st.card,W/2,cy,{size:u*.58,maxW:Math.min(W*.8,u*9),fill:'#ffffff',stroke:'rgba(10,58,102,.25)',maxLines:4,color:'#0a3a66',r:u*.5,pad:u*.3});
      const lab=st.labels,lo={size:u*.42,maxW:W*.4,fill:'#f0f9ff',stroke:'rgba(14,165,233,.5)',color:'#075985',r:u*.45};
      const ly=lab.u?cy+sh*.28:cy+r.h*.5+u*1.15;
      if(lab.l){K.tag(g,'← '+lab.l,Math.max(W*.2,u*2.2),ly,lo);if(lab.u){wxIcon(g,lab.l,Math.max(W*.2,u*2.2),ly-u*1.3,u*.8,t);}}
      if(lab.r){K.tag(g,lab.r+' →',W-Math.max(W*.2,u*2.2),ly,lo);if(lab.u){wxIcon(g,lab.r,W-Math.max(W*.2,u*2.2),ly-u*1.3,u*.8,t);}}
      if(lab.u){K.tag(g,'↑ '+lab.u,W/2,Z0+u*.8,Object.assign({},lo,{maxW:W*.5}));wxIcon(g,lab.u,W/2,Z0+u*1.9,u*.8,t);}}
    /* 정답 화살표 */
    if(st.res){const a=st.res;const draw=(dir,col,al)=>{const v={l:[-1,0],r:[1,0],u:[0,-1]}[dir]||[0,0];const cx=W/2,cy=Z0+sh*(st.k==='water'?.62:.5);g.save();g.globalAlpha=al;g.strokeStyle=col;g.lineWidth=u*.22;g.lineCap='round';g.shadowColor=col;g.shadowBlur=u*.5;
        g.beginPath();g.moveTo(cx-v[0]*u*1.4,cy-v[1]*u*1.4);g.lineTo(cx+v[0]*u*1.4,cy+v[1]*u*1.4);g.stroke();const ax=cx+v[0]*u*1.4,ay=cy+v[1]*u*1.4,px=-v[1],py=v[0];g.fillStyle=col;g.beginPath();g.moveTo(ax+v[0]*u*.5,ay+v[1]*u*.5);g.lineTo(ax+px*u*.4,ay+py*u*.4);g.lineTo(ax-px*u*.4,ay-py*u*.4);g.fill();g.restore();
        K.emo(g,'💨',cx+v[0]*u*2.3,cy+v[1]*u*2.3,u*.8);};
      if(a.dir)draw(a.dir,a.ok?'#22c55e':'#ef4444',1);if(!a.ok&&st.ans&&(st.k==='wind'||true))draw(st.ans,'#22c55e',a.dir?.8:1);}
    /* 한 문제 시간 */
    if(!st.lock&&st.qt>0){const f=clamp(st.qt/st.qmax,0,1);const bw=Math.min(W*.8,u*12),bh=Math.max(6,u*.2),bx=W/2-bw/2,by=Z0-u*.02;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.35)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#3ddc97':(f>.2?'#ffd23f':'#ff5d5d');g.fill();}
    /* ── 레이스 코스 ── */
    K.vgrad(g,0,top-2,W,2,['rgba(255,255,255,.6)','rgba(255,255,255,.6)']);
    K.water(g,top,W+16,H,'#3fb6ee','#0b5d9c',t,u*.06);
    const y0=top+raceH*.62;g.save();g.setLineDash([u*.25,u*.25]);g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.moveTo(u*.4,y0+u*.3);g.lineTo(W-u*1.8,y0+u*.3);g.stroke();g.restore();
    const x0=u*1.2,x1=W-u*2.0;for(let k=1;k<7;k++){const x=x0+(x1-x0)*k/7;const lit=k<=Math.round(st.prog*7);g.fillStyle=lit?'#ffe29a':'#fff';g.strokeStyle='#ff6b57';g.lineWidth=2;g.beginPath();g.arc(x,y0+u*.3+Math.sin(t*2+k)*2,u*.11,0,TAU);g.fill();g.stroke();if(lit){K.glow(g,x,y0+u*.3,u*.4,'#ffe29a',.5);}}
    island(g,W-u*1.0,y0+u*.28,u*1.6,t);
    /* 라이벌 */
    const rx=x0+(x1-x0)*st.rivalX;yacht(g,rx,y0-u*.25,u*.95,t,.04+Math.sin(t*1.3)*.03,'#ef4444','neutral',{ph:3,wake:true,sail:'#ffd9d9',bil:.1});
    K.txt(g,'라이벌',rx,y0-u*1.25,{size:u*.3,color:'#fff',stroke:'rgba(200,30,30,.7)',lw:u*.12});
    /* 내 요트 */
    const bx=x0+(x1-x0)*st.boatX,by2=y0+u*.38;const sz=u*1.35+st.anim*u*.3;
    yacht(g,bx,by2,sz,t,st.heel,p.color,st.mood,{ph:0,wake:true,bil:.15+st.anim*.5});
    if(st.dolphin){const d=(t-st.dolphin)/1.2;if(d>=0&&d<1){const dx=bx-u*2.6+d*u*3.4,dy=y0+u*.5-Math.sin(d*Math.PI)*u*1.8;dolphin(g,dx,dy,u*.9,-Math.cos(d*Math.PI)*.9);}else if(d>=1)st.dolphin=null;}
    K.txt(g,'나',bx,by2-sz*1.1,{size:u*.32,color:'#fff',stroke:'rgba(10,58,102,.7)',lw:u*.12});
  },
  up(p,x,y,d){const st=p.state,u=p.u;if(!p.active||st.lock||!st.sc)return;const dx=x-d.x0,dy=y-d.y0;let dir;
    if(Math.hypot(dx,dy)<u*.8){const Z=this.Zs(p);if(y>Z.top)return;dir=x<p.W*.34?'l':(x>p.W*.66?'r':(st.k==='water'&&y<Z.Z0+Z.sh*.4?'u':(x<p.W/2?'l':'r')));}
    else dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'r':'l'):(dy<0?'u':'d');
    if(dir==='d')return;if(st.k!=='water'&&dir==='u')return;
    st.lock=true;const ok=dir===st.ans;st.res={dir,ok};p.Snd.whoosh();
    p.hit(ok,{x:p.W/2,y:p.H*.3,tip:ok?st.why:`정답: <b>${this.ansText(st)}</b> — ${st.why}`,review:st.why});
    if(ok){st.mood='happy';st.moodT=1.3;st.prog=Math.min(1,st.prog+1/7);st.anim=.3;if(p.streak>=3&&!st.dolphin)st.dolphin=st.T;
      if(st.prog>=1){const bonus=st.rival<.9;setTimeout(()=>{if(!p.active)return;p.add(bonus?100:40,p.W-u,p.H-u*2.4);p.burst(p.W-u*1.5,p.H-u*2.5,'#ffe29a',22);p.burst(p.W-u*1.5,p.H-u*2.5,'#ff6b57',16);p.tip(bonus?'🏝️ 라이벌보다 먼저 섬에 도착! 보너스 +100':'🏝️ 섬에 도착! +40','good',1800);p.Snd.win();st.prog=0;st.boatX=0;st.rival=0;st.rivalX=0;},500);}}
    else{st.mood='oops';st.moodT=1.2;st.rival=Math.min(.95,st.rival+.06);}
    setTimeout(()=>{if(p.active)this.next(p);},ok?750:1700);},
};

Engine.boot(GAME);
