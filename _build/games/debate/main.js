/* 5~6학년 · 토론 — 토론 배틀 아레나 (주장에 알맞은 근거 · 반론하기 · 믿을 만한 자료)
   디자인: 토론 무대. 찬성(파랑)·반대(빨강) 연단, 객석의 청중, 설득 게이지가 줄어드는 상대 토론자.
   발언 시간이 정해져 있어 시간 안에 알맞은 카드를 내야 해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const PRO='#2563eb',CON='#dc2626',GOLD='#d4a72c',INKN='#0b1220';
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M6 8h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H18l-8 7v-7H6a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="#2563eb" stroke="#0b1220" stroke-width="3" stroke-linejoin="round"/><path d="M22 22h18a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-2v6l-7-6H22a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4z" fill="#dc2626" stroke="#0b1220" stroke-width="3" stroke-linejoin="round"/><path d="M12 15h14M26 30h12" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
const FOE_NAMES=['꼼꼼 토론왕','말빨 대장','논리 박사','웅변가','철벽 방어왕','속사포 토론가','능청 달인'];
const LOOKS=[
  {skin:'#f2c9a0',hair:'#3b2a20',style:'short',glass:false,suit:'#475569',tie:'#f59e0b'},
  {skin:'#e8b88c',hair:'#8b3a1e',style:'long',glass:true,suit:'#7c3aed',tie:'#fde68a'},
  {skin:'#d9a273',hair:'#1f2937',style:'curly',glass:false,suit:'#0f766e',tie:'#f472b6'},
  {skin:'#f5d3b3',hair:'#d6d3d1',style:'bald',glass:true,suit:'#334155',tie:'#ef4444'},
  {skin:'#c68a5c',hair:'#111827',style:'bun',glass:false,suit:'#9d174d',tie:'#fde68a'},
  {skin:'#f0c29b',hair:'#6b4423',style:'short',glass:true,suit:'#1d4ed8',tie:'#fbbf24'},
  {skin:'#e0ac82',hair:'#9ca3af',style:'long',glass:false,suit:'#15803d',tie:'#f9fafb'},
];
const MYLOOK={skin:'#f5cfa8',hair:'#2b1b12',style:'short',glass:false,suit:null,tie:'#fde68a'};
/* 토론자: (x,y)=연단 위쪽 가운데. s=크기. mood: neutral|happy|hurt|smug|sweat */
function person(g,x,y,s,look,mood,t,suit,flag){g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';const lw=Math.max(2,s*.045);g.lineWidth=lw;g.strokeStyle=INKN;
  const bob=mood==='happy'?Math.abs(Math.sin(t*8))*s*.05:Math.sin(t*2)*s*.01;g.translate(0,-bob);
  /* 몸 */
  g.fillStyle=suit||look.suit;g.beginPath();g.moveTo(-s*.42,0);g.quadraticCurveTo(-s*.42,-s*.42,-s*.2,-s*.46);g.lineTo(s*.2,-s*.46);g.quadraticCurveTo(s*.42,-s*.42,s*.42,0);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff';g.beginPath();g.moveTo(-s*.12,-s*.46);g.lineTo(0,-s*.3);g.lineTo(s*.12,-s*.46);g.closePath();g.fill();g.stroke();
  g.fillStyle=look.tie;g.beginPath();g.moveTo(-s*.04,-s*.36);g.lineTo(s*.04,-s*.36);g.lineTo(s*.06,-s*.16);g.lineTo(0,-s*.1);g.lineTo(-s*.06,-s*.16);g.closePath();g.fill();
  /* 팔: 기분에 따라 */
  if(mood==='happy'||flag){g.strokeStyle=suit||look.suit;g.lineWidth=s*.13;g.beginPath();g.moveTo(s*.38,-s*.32);g.lineTo(s*.56,-s*.7);g.stroke();g.strokeStyle=look.skin;g.lineWidth=s*.12;g.beginPath();g.moveTo(s*.56,-s*.7);g.lineTo(s*.58,-s*.74);g.stroke();g.strokeStyle=INKN;g.lineWidth=lw;}
  if(flag){g.strokeStyle='#8b5a2b';g.lineWidth=s*.04;g.beginPath();g.moveTo(s*.58,-s*.76);g.lineTo(s*.58,-s*1.4);g.stroke();g.fillStyle='#fff';g.strokeStyle=INKN;g.lineWidth=lw;g.beginPath();g.moveTo(s*.6,-s*1.38);g.quadraticCurveTo(s*.85,-s*1.3+Math.sin(t*8)*s*.05,s*1.05,-s*1.4);g.lineTo(s*1.05,-s*1.15);g.quadraticCurveTo(s*.85,-s*1.1+Math.sin(t*8)*s*.05,s*.6,-s*1.15);g.closePath();g.fill();g.stroke();}
  /* 머리 */
  const hy=-s*.7,hr=s*.27;
  if(look.style==='long'){g.fillStyle=look.hair;g.beginPath();g.ellipse(0,hy+hr*.35,hr*1.2,hr*1.35,0,0,TAU);g.fill();g.stroke();}
  if(look.style==='bun'){g.fillStyle=look.hair;g.beginPath();g.arc(0,hy-hr*1.15,hr*.45,0,TAU);g.fill();g.stroke();}
  g.fillStyle=look.skin;g.beginPath();g.arc(0,hy,hr,0,TAU);g.fill();g.stroke();
  g.fillStyle=look.hair;
  if(look.style==='short'||look.style==='long'||look.style==='bun'){g.beginPath();g.arc(0,hy,hr*1.02,Math.PI*1.04,Math.PI*1.96);g.quadraticCurveTo(hr*.5,hy-hr*.55,0,hy-hr*.5);g.quadraticCurveTo(-hr*.5,hy-hr*.55,-hr*.98,hy-hr*.12);g.closePath();g.fill();g.stroke();}
  else if(look.style==='curly'){for(let i=0;i<7;i++){const a=Math.PI*1.05+i*(Math.PI*.9/6);g.beginPath();g.arc(Math.cos(a)*hr*.95,hy+Math.sin(a)*hr*.95,hr*.3,0,TAU);g.fill();g.stroke();}}
  else if(look.style==='bald'){g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(-hr*.3,hy-hr*.55,hr*.25,hr*.12,-.5,0,TAU);g.fill();}
  /* 얼굴 */
  const ex=hr*.42,ey=hy+hr*.02;g.strokeStyle=INKN;g.fillStyle=INKN;g.lineWidth=Math.max(1.6,s*.035);
  const browY=ey-hr*.42;
  g.beginPath();if(mood==='smug'){g.moveTo(-ex-hr*.2,browY+hr*.05);g.lineTo(-ex+hr*.2,browY-hr*.1);g.moveTo(ex-hr*.2,browY-hr*.1);g.lineTo(ex+hr*.2,browY+hr*.05);}
  else if(mood==='hurt'||mood==='sweat'){g.moveTo(-ex-hr*.2,browY-hr*.1);g.lineTo(-ex+hr*.2,browY+hr*.05);g.moveTo(ex-hr*.2,browY+hr*.05);g.lineTo(ex+hr*.2,browY-hr*.1);}
  else{g.moveTo(-ex-hr*.2,browY);g.lineTo(-ex+hr*.2,browY);g.moveTo(ex-hr*.2,browY);g.lineTo(ex+hr*.2,browY);}g.stroke();
  for(const d of[-1,1]){const px=d*ex;if(mood==='hurt'){g.beginPath();g.moveTo(px-d*hr*.12,ey-hr*.12);g.lineTo(px+d*hr*.12,ey);g.lineTo(px-d*hr*.12,ey+hr*.12);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(px,ey+hr*.05,hr*.14,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else if(mood==='smug'){g.beginPath();g.moveTo(px-hr*.14,ey);g.lineTo(px+hr*.14,ey);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(px,ey,hr*.15,hr*.19,0,0,TAU);g.fill();g.stroke();g.fillStyle=INKN;g.beginPath();g.arc(px+hr*.02,ey+hr*.03,hr*.08,0,TAU);g.fill();}}
  if(look.glass){g.strokeStyle='#1f2937';g.lineWidth=Math.max(1.5,s*.03);for(const d of[-1,1]){g.beginPath();g.arc(d*ex,ey,hr*.27,0,TAU);g.stroke();}g.beginPath();g.moveTo(-ex+hr*.27,ey);g.lineTo(ex-hr*.27,ey);g.stroke();}
  g.strokeStyle=INKN;g.lineWidth=Math.max(1.6,s*.035);const my=hy+hr*.52;g.beginPath();
  if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,my-hr*.1,hr*.22,0,Math.PI);g.fill();g.stroke();}
  else if(mood==='hurt'){g.moveTo(-hr*.2,my+hr*.08);g.quadraticCurveTo(0,my-hr*.1,hr*.2,my+hr*.08);g.stroke();}
  else if(mood==='smug'){g.moveTo(-hr*.2,my);g.quadraticCurveTo(hr*.1,my+hr*.2,hr*.25,my-hr*.1);g.stroke();}
  else if(mood==='sweat'){g.moveTo(-hr*.2,my+hr*.05);g.quadraticCurveTo(-hr*.1,my-hr*.05,0,my+hr*.05);g.quadraticCurveTo(hr*.1,my+hr*.15,hr*.2,my+hr*.05);g.stroke();g.fillStyle='#7dd3fc';g.beginPath();g.ellipse(hr*.95,hy-hr*.25,hr*.1,hr*.17,0,0,TAU);g.fill();}
  else{g.arc(0,my-hr*.1,hr*.2,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(244,114,182,.35)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*hr*.62,my-hr*.12,hr*.14,hr*.08,0,0,TAU);g.fill();}
  g.restore();}
function podium(g,x,y,s,col,label){g.save();g.translate(x,y);
  g.fillStyle=col;g.strokeStyle=INKN;g.lineWidth=Math.max(2,s*.04);g.beginPath();g.moveTo(-s*.5,0);g.lineTo(s*.5,0);g.lineTo(s*.42,s*.55);g.lineTo(-s*.42,s*.55);g.closePath();g.fill();g.stroke();
  g.fillStyle=K.shade(col,.25);g.fillRect(-s*.5,-s*.03,s,s*.06);g.fillStyle=GOLD;g.fillRect(-s*.46,s*.07,s*.92,s*.03);
  K.txt(g,label,0,s*.31,{size:s*.2,color:'#fff',stroke:INKN,lw:s*.04});
  /* 마이크 */
  g.strokeStyle='#cbd5e1';g.lineWidth=s*.03;g.beginPath();g.moveTo(-s*.3,0);g.lineTo(-s*.3,-s*.22);g.quadraticCurveTo(-s*.3,-s*.3,-s*.2,-s*.3);g.stroke();g.fillStyle='#334155';g.beginPath();g.arc(-s*.18,-s*.3,s*.045,0,TAU);g.fill();
  g.restore();}
function crowd(g,W,y,u,t,cheer,sad){const n=Math.max(8,Math.round(W/(u*.95)));
  for(let i=0;i<n;i++){const x=(i+.5)*W/n;const ph=i*1.7;const up=cheer>0?Math.abs(Math.sin(t*9+ph))*u*.22:0;const dn=sad>0?u*.12:0;const yy=y-up+dn+(i%2)*u*.12;
    const shade=['#0f1b33','#12223d','#0c172b'][i%3];g.fillStyle=shade;g.beginPath();g.ellipse(x,yy+u*.55,u*.5,u*.4,0,Math.PI,TAU);g.fill();g.beginPath();g.arc(x,yy,u*.27,0,TAU);g.fill();
    g.strokeStyle='rgba(148,163,184,.25)';g.lineWidth=Math.max(1,u*.03);g.beginPath();g.arc(x,yy,u*.27,Math.PI*1.1,Math.PI*1.9);g.stroke();
    if(cheer>0){g.strokeStyle=shade;g.lineWidth=u*.1;g.lineCap='round';const sw=Math.sin(t*10+ph)*u*.08;g.beginPath();g.moveTo(x-u*.36,yy+u*.4);g.lineTo(x-u*.42+sw,yy-u*.3);g.moveTo(x+u*.36,yy+u*.4);g.lineTo(x+u*.42-sw,yy-u*.3);g.stroke();}}}
function stageBg(g,W,H,u,t,Z0,A,cheer){
  K.vgrad(g,0,0,W,H,['#0b1426','#101c36','#0b1220']);
  /* 커튼: 왼쪽 찬성(파랑) · 오른쪽 반대(빨강) */
  const cw=Math.max(u*1.2,W*.07);
  for(const [x0,dir,c] of [[0,1,PRO],[W,-1,CON]]){const gr=g.createLinearGradient(x0,0,x0+dir*cw,0);gr.addColorStop(0,K.shade(c,-.35));gr.addColorStop(1,K.rgba(K.shade(c,-.1),.2));g.fillStyle=gr;g.beginPath();g.moveTo(x0,0);g.lineTo(x0+dir*cw,0);g.quadraticCurveTo(x0+dir*cw*.6,(Z0+A)*.6,x0+dir*cw*.9,Z0+A);g.lineTo(x0,Z0+A);g.closePath();g.fill();
    g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=2;for(let k=1;k<4;k++){g.beginPath();g.moveTo(x0+dir*cw*k/4,0);g.lineTo(x0+dir*cw*k/4*.95,Z0+A);g.stroke();}}
  /* 스포트라이트 */
  g.save();g.globalCompositeOperation='lighter';[[.22,PRO],[.78,CON]].forEach(([fx,c])=>{const x=W*fx;const gr=g.createLinearGradient(x,0,x,Z0+A);gr.addColorStop(0,K.rgba(c,.28));gr.addColorStop(1,K.rgba(c,0));g.fillStyle=gr;g.beginPath();g.moveTo(x-u*.2,0);g.lineTo(x+u*.2,0);g.lineTo(x+u*2.2,Z0+A);g.lineTo(x-u*2.2,Z0+A);g.closePath();g.fill();});g.restore();
  /* 무대 바닥 */
  const fy=Z0+A-u*.78;const gr=g.createLinearGradient(0,fy,0,Z0+A);gr.addColorStop(0,'#3a2a1c');gr.addColorStop(1,'#1f160e');g.fillStyle=gr;g.fillRect(0,fy,W,Z0+A-fy);
  g.fillStyle=K.rgba(GOLD,.55);g.fillRect(0,fy,W,Math.max(2,u*.05));}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/6.5;const A=H;stageBg(g,W,H,u,T,0,H*.92,Math.sin(T*.7)>.3?1:0);
    const s=Math.min(u*(wide?1.9:2.6),W*.2,H*.42),py=H*.82;const ph=Math.floor(T/2.4)%2;const pm=ph===0?'happy':'smug',fm=ph===0?'hurt':'happy';
    person(g,W*(wide?.09:.25),py,s,MYLOOK,pm,T,PRO);podium(g,W*(wide?.09:.25),py,s,PRO,'찬성');
    person(g,W*(wide?.91:.75),py,s,LOOKS[1],fm,T,null);podium(g,W*(wide?.91:.75),py,s,CON,'반대');
    if(!wide){const bx=W*(ph===0?(wide?.09:.25):(wide?.91:.75))+(wide?(ph===0?1:-1)*u*1.6:0),by=py-s*1.35;const bw=Math.min(u*3.6,W*.4),bh=u*1.1;K.card(g,bx-bw/2,by-bh,bw,bh,u*.25,'#fff8e7',{stroke:GOLD,lw:2,blur:u*.3,dy:u*.1});K.txt(g,ph===0?'근거가 있어요!':'그건 아니에요!',bx,by-bh/2,{size:u*.42,color:INKN});}
    crowd(g,W,H*.95,u*.9,T,Math.sin(T*.7)>.3?1:0,0);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k11-debate-arena',title:'토론 배틀 아레나',title1:'말로 하는 한판 승부',title2:'토론 배틀 아레나',emoji:LOGO,
  subtitle:'5~6학년 · 토론 · 주장과 근거 · 반론',
  howto:'토론 무대에서 상대 토론자와 맞붙어요! 손에 든 <b>근거 카드</b> 중에서 내 주장을 가장 잘 뒷받침하는 카드를 내면 상대의 <b>설득 게이지</b>가 줄어들어요. 감정만 앞선 말, 주제와 상관없는 말, 상대편 근거를 내면 공격이 빗나가요! <b>발언 시간</b> 안에 골라야 해요.',
  how:p=>({a:'내 편을 뒷받침하는<br><b>근거 카드</b>를 내요!',b:'상대 근거의 약한 점을<br>찌르는 <b>반론</b> 카드!',c:'근거를 받쳐 줄<br><b>믿을 만한 자료</b> 고르기',all:'근거 · 반론 · 자료가<br>번갈아 나와요'}[p.levelId]),
  theme:{c1:'#b91c1c',c2:'#1d4ed8'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 토론을 해 볼까요?',
  txt:{who:'누가 토론자가 될까요?',dur:'토론 시간',pace:'발언 시간',seat:'번 토론자 ',go:'토론 시작!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'5~6학년',t:'📣 주장에 알맞은 근거',d:'내 편을 뒷받침하는 근거 카드 내기'},
    {id:'b',g:'5~6학년',t:'🗣️ 반론하기',d:'상대 근거의 약한 점 찌르기'},
    {id:'c',g:'5~6학년',t:'📚 믿을 만한 자료',d:'근거를 뒷받침할 자료 고르기'},
    {id:'all',g:'5~6학년',t:'🌟 모두 섞기',d:'근거 · 반론 · 자료가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>주장</b>은 내가 하고 싶은 말, <b>근거</b>는 그 주장이 옳은 까닭이에요. 근거는 주제와 관계있는 사실이어야 하고 감정이나 억지는 근거가 아니에요.</li>
    <li><b>반론</b>은 상대 근거의 약한 점(다른 방법이 있다, 문제를 줄일 수 있다)을 짚는 말이에요. 동의하거나 감정으로 맞서는 것은 반론이 아니에요.</li>
    <li>믿을 만한 자료는 <b>출처가 분명하고 객관적</b>이며 주제와 관련 있어요. 소문·광고·출처 없는 글·짐작은 믿기 어려워요.</li>
    <li>토론할 때는 상대를 존중하며 <b>주장 → 근거 → 자료</b> 순서로 말하고 <b>발언 시간</b>을 지켜요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const F=H-Z0-u*.3;
    const A=clamp(F*(land?.5:.46),u*3.8,land?u*7.4:u*8.8);const gap=u*.25;const cy0=Z0+A+gap;const cardsH=H-cy0-u*.3;
    let cols,rows;if(land&&W>=H*1.6){cols=4;rows=1;}else if(land||W/H>.62){cols=2;rows=2;}else{cols=1;rows=4;}
    return{W,H,u,Z0,A,cy0,cardsH,cols,rows,land};},
  tipBot(p){const G=this.geo(p);return Math.max(8,p.H-G.cy0+8);},
  cardRects(p){const G=this.geo(p),u=G.u,{cols,rows}=G;const gx=u*.3,gap=u*.22;const w=(G.W-gx*2-(cols-1)*gap)/cols,h=(G.cardsH-(rows-1)*gap)/rows;const out=[];
    for(let i=0;i<4;i++){const c=i%cols,r=Math.floor(i/cols);out.push({x:gx+c*(w+gap),y:G.cy0+r*(h+gap),w,h});}return out;},
  init(p){const st=p.state;Object.assign(st,{hp:100,hpV:100,ko:0,foeI:0,n:0,T:0,q:null,lock:false,pick:-1,rev:false,qt:0,qmax:0,myMood:'neutral',foeMood:'neutral',mT:0,cheer:0,sad:0,atk:null,flag:0,enter:0,pops:[]});this.newQ(p);},
  make(p,L){const R=p.R,q={};const T=p.deck(TOP,'top');const side=R.chance(.5)?'pro':'con';const opp=side==='pro'?'con':'pro';q.T=T;q.side=side;q.L=L;
    q.claim=side==='pro'?T.t:T.n;
    if(L==='a'){const right=R.pick(T[side]);const cards=[right,R.pick(T[opp]),T.irr,R.pick(EMO)];q.ty='atk';q.cards=R.shuffle(cards);q.ans=right;
      q.text='내 주장을 가장 잘 뒷받침하는 <b>근거 카드</b>를 내요!';q.sub='내 편 근거만 골라요 · 감정이나 딴소리는 안 돼요';q.reveal=right;q.why={[cards[1]]:'상대편 주장을 돕는 근거예요',[cards[2]]:'주제와 관계없는 말이에요',[cards[3]]:'근거가 아니라 감정이나 억지예요'};}
    else if(L==='b'){const k=R.int(0,1);const foeArg=T[opp][k];const right=T['r_'+opp][k];const wrong=[R.pick(T[opp].filter(x=>x!==foeArg))||'그 말도 맞는 것 같아요.',R.pick(EMO),R.pick(AGREE)];
      q.ty='reb';q.foeArg=foeArg;q.cards=R.shuffle([right,...wrong]);q.ans=right;q.text='상대의 근거를 받아치는 <b>알맞은 반론</b>을 골라요!';q.sub='상대 말의 약한 점을 짚어요';q.reveal=right;
      q.why={[wrong[0]]:'오히려 상대편 주장을 돕는 말이에요',[wrong[1]]:'근거 없는 감정이나 억지예요',[wrong[2]]:'반론이 아니라 동의하는 말이에요'};}
    else{const right=T.src;q.ty='src';q.cards=R.shuffle([right,...R.sample(BADSRC,3).map(x=>x.replace('{T}',T.k))]);q.ans=right;q.text='내 근거를 뒷받침할 <b>가장 믿을 만한 자료</b>는?';q.sub='출처가 분명하고 객관적인 자료를 골라요';q.reveal=right;q.why={};}
    q.review=`[${q.claim}] ${q.foeArg?'상대: '+q.foeArg+' → ':''}${q.reveal}`;return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.rev=false;st.atk=null;
    st.qmax=({a:26,b:32,c:26}[L])/p.pace;st.qt=st.qmax;p.ask('🗣️ '+q.text,q.sub);},
  resolve(p,i,timeout){const st=p.state,q=st.q,G=this.geo(p),u=p.u;if(st.lock)return;st.lock=true;
    if(timeout){st.rev=true;st.myMood='sweat';st.foeMood='smug';st.mT=2.4;st.sad=2.4;
      p.hit(false,{pen:10,x:p.W/2,y:G.Z0+G.A*.5,tip:`발언 시간이 끝났어요! 정답: <b>${q.ans}</b>`,tipMs:3000,review:q.review});setTimeout(()=>{if(p.active)this.newQ(p);},3000);return;}
    const c=q.cards[i];st.pick=i;const ok=c===q.ans;const r=this.cardRects(p)[i];
    st.atk={t:0,ok};
    if(ok){st.hp=Math.max(0,st.hp-34);st.myMood='happy';st.foeMood='hurt';st.cheer=2;st.mT=1.4;}else{st.rev=true;st.myMood='sweat';st.foeMood='smug';st.sad=2;st.mT=2;}
    p.hit(ok,{x:r.x+r.w/2,y:r.y,tip:ok?['효과 만점!','설득력 최고!','명중!'][i%3]:`${q.why[c]?q.why[c]+'<br>':''}정답: ${q.ans}`,review:q.review,tipMs:ok?1100:3200,color:ok?'#fbbf24':'#ef4444'});
    if(ok&&st.hp<=0){setTimeout(()=>{st.ko++;st.flag=1.6;st.cheer=3;p.Snd.win&&p.Snd.win();p.add(50,p.W/2,G.Z0+G.A*.35);p.tip('🏆 설득 성공! 상대 토론자가 항복했어요','good',1800);},700);
      setTimeout(()=>{st.foeI++;st.hp=100;st.hpV=100;st.enter=1;},2000);setTimeout(()=>{if(p.active)this.newQ(p);},2500);return;}
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1300:3300);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0){st.myMood='neutral';st.foeMood='neutral';}}if(st.cheer>0)st.cheer-=dt;if(st.sad>0)st.sad-=dt;if(st.flag>0)st.flag-=dt;if(st.enter>0)st.enter=Math.max(0,st.enter-dt*1.6);
    st.hpV+=(st.hp-st.hpV)*Math.min(1,dt*5);if(st.atk){st.atk.t+=dt;}
    st.pops=st.pops.filter(q=>(q.t+=dt)<1);
    if(!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.resolve(p,-1,true);}},
  down(p,x,y){const st=p.state;if(st.lock||!st.q)return;const rs=this.cardRects(p);const i=rs.findIndex(r=>K.inRect(x,y,r));if(i<0)return;p.Snd.tap&&p.Snd.tap();this.resolve(p,i,false);},
  bubble(g,x,y,w,h,text,tailX,tailUp,col,u){const gy=y;K.card(g,x,gy,w,h,u*.3,'#fff8e7',{stroke:col||GOLD,lw:Math.max(2,u*.06),blur:u*.35,dy:u*.1});
    g.save();g.fillStyle='#fff8e7';g.strokeStyle=col||GOLD;g.lineWidth=Math.max(2,u*.06);const tx=clamp(tailX,x+u*.5,x+w-u*.5);g.beginPath();g.moveTo(tx-u*.2,gy+h-1);g.lineTo(tx,gy+h+u*.32);g.lineTo(tx+u*.2,gy+h-1);g.closePath();g.fill();g.stroke();g.fillStyle='#fff8e7';g.fillRect(tx-u*.17,gy+h-u*.08,u*.34,u*.1);g.restore();
    let fs=u*.5;g.font=K.font(fs);let lines=K.wrap(g,text,w-u*.7);while(lines.length*fs*1.22>h-u*.3&&fs>8){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,text,w-u*.7);}
    g.fillStyle=INKN;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,x+w/2,gy+h/2+(i-(lines.length-1)/2)*fs*1.22));},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    stageBg(g,W,H,u,t,G.Z0,G.A,st.cheer);
    const mySide=q.side,myCol=mySide==='pro'?PRO:CON,foeCol=mySide==='pro'?CON:PRO;
    const land=G.land;let meX,foeX,s;
    s=land?Math.min((G.A-u*1.4)/2,W*.17,u*3.4):Math.min((G.A-u*4.6)/2,W*.22,u*2.6);s=Math.max(s,u*1.2);
    const podY=G.Z0+G.A-u*.2-s*.55;meX=W*(land?.2:.2);foeX=W*(land?.8:.8);
    const bubTxt=q.ty==='reb'?`상대: “${q.foeArg}”`:`내 주장: ${q.claim}`;
    /* 주제 판 */
    const tw=Math.min(W*(land?.62:.9),u*22),th=u*.95;const tx=W/2-tw/2,ty=G.Z0+u*.12;
    K.card(g,tx,ty,tw,th,u*.2,'rgba(8,14,28,.9)',{stroke:GOLD,lw:2,blur:u*.25,dy:u*.08});
    g.font=K.font(u*.4);let tl=K.wrap(g,'토론 주제: '+q.T.t,tw-u*.6);let tf=u*.4;while(tl.length>1&&tf>8){tf*=.92;g.font=K.font(tf);tl=K.wrap(g,'토론 주제: '+q.T.t,tw-u*.6);}
    g.fillStyle='#fde68a';g.textAlign='center';g.textBaseline='middle';tl.slice(0,2).forEach((l,i)=>g.fillText(l,W/2,ty+th/2-u*.04+(i-(tl.length-1)/2)*tf*1.15));
    if(!st.lock){const f=clamp(st.qt/st.qmax,0,1);const bw=tw-u*.5,bh=Math.max(3,u*.09);K.rr(g,tx+u*.25,ty+th-bh-u*.07,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.14)';g.fill();K.rr(g,tx+u*.25,ty+th-bh-u*.07,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#fbbf24':(f>.2?'#fb923c':'#ef4444');g.fill();}
    const foeLook=LOOKS[st.foeI%LOOKS.length];
    const foeSlide=st.enter*W*.3;
    /* 청중 */
    crowd(g,W,G.Z0+G.A-u*.15,u*.8,t,st.cheer,st.sad);
    /* 말풍선 */
    const speakFoe=q.ty==='reb';
    if(land){const bw=W-2*(W*.2+s*.65)-u*.4,bx=W/2-bw/2,by=ty+th+u*.4,bh=Math.max(u*1.6,podY-s*.3-by-u*.4);this.bubble(g,bx,by,bw,bh,bubTxt,speakFoe?bx+bw*.9:bx+bw*.1,false,speakFoe?foeCol:myCol,u);
      K.txt(g,'VS',W/2,podY+s*.2,{size:u*.55,color:'#fde68a',stroke:INKN,lw:u*.12});}
    else{const bx=u*.4,bw=W-u*.8,by=ty+th+u*.3,bh=u*2.1;this.bubble(g,bx,by,bw,bh,bubTxt,speakFoe?foeX:meX,false,speakFoe?foeCol:myCol,u);}
    /* 토론자 */
    person(g,meX,podY,s,MYLOOK,st.myMood,t,myCol);podium(g,meX,podY,s,myCol,mySide==='pro'?'찬성':'반대');
    person(g,foeX+foeSlide,podY,s,foeLook,st.foeMood,t,null,st.flag>0);podium(g,foeX+foeSlide,podY,s,foeCol,mySide==='pro'?'반대':'찬성');
    /* 이름표 + 설득 게이지 */
    const gw=Math.min(s*1.5,W*.26),gx=foeX+foeSlide-gw/2,gyy=podY-s*1.18;
    K.txt(g,FOE_NAMES[st.foeI%FOE_NAMES.length],foeX+foeSlide,gyy-u*.34,{size:u*.3,color:'#e2e8f0',stroke:INKN,lw:u*.08,maxW:gw*1.4});
    K.rr(g,gx,gyy,gw,u*.28,u*.14);g.fillStyle='rgba(0,0,0,.55)';g.fill();K.rr(g,gx,gyy,Math.max(u*.28,gw*st.hpV/100),u*.28,u*.14);const hg=g.createLinearGradient(gx,0,gx+gw,0);hg.addColorStop(0,'#f87171');hg.addColorStop(1,'#fbbf24');g.fillStyle=hg;g.fill();K.rr(g,gx,gyy,gw,u*.28,u*.14);g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke();
    K.txt(g,'설득 게이지',foeX+foeSlide,gyy+u*.5,{size:u*.24,color:'#cbd5e1',stroke:INKN,lw:u*.06});
    K.txt(g,(mySide==='pro'?'찬성':'반대')+'편 (나)',meX,gyy-u*.34,{size:u*.3,color:'#fff',stroke:INKN,lw:u*.08});
    /* 공격 연출 */
    if(st.atk&&st.atk.t<.7){const f=st.atk.t/.7;const x=meX+(foeX-meX)*f,y=podY-s*.9-Math.sin(f*Math.PI)*s*.6;
      if(st.atk.ok){K.glow(g,x,y,u*1.1,'#fbbf24',.7);g.save();g.translate(x,y);g.rotate(f*12);g.fillStyle='#fde047';g.strokeStyle=INKN;g.lineWidth=2;g.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5,r=i%2?u*.18:u*.42;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.stroke();g.restore();if(f>.9)K.glow(g,foeX,podY-s*.7,u*2,'#fbbf24',.8);}
      else{g.save();g.globalAlpha=f<.8?1:1-(f-.8)*5;g.fillStyle='#94a3b8';g.strokeStyle=INKN;g.lineWidth=2;g.beginPath();g.arc(Math.min(x,foeX-s*.7),y,u*.3,0,TAU);g.fill();g.stroke();g.restore();if(f>.7)K.txt(g,'빗나감!',foeX,podY-s*1.55,{size:u*.4,color:'#fecaca',stroke:INKN,lw:u*.1});}}
    if(st.flag>0)K.txt(g,'설득 성공!',W/2,G.Z0+G.A*.5,{size:u*1.0,color:'#fde047',stroke:INKN,lw:u*.18});
    /* 카드 */
    const rs=this.cardRects(p);const done=st.lock;
    rs.forEach((r,i)=>{const c=q.cards[i];const isAns=c===q.ans;const picked=st.pick===i;let fill='#fff8e7',bd=GOLD,al=1;
      if(done){if(isAns&&(st.rev||picked)){fill='#dcfce7';bd='#16a34a';}else if(picked){fill='#fee2e2';bd='#dc2626';}else al=.5;}
      g.save();g.globalAlpha=al;
      if(done&&isAns&&st.rev)K.glow(g,r.x+r.w/2,r.y+r.h/2,Math.max(r.w,r.h)*.6,'#4ade80',.45+.2*Math.sin(t*8));
      K.card(g,r.x,r.y,r.w,r.h,u*.28,fill,{stroke:bd,lw:Math.max(2,u*.07),blur:u*.3,dy:u*.1});
      /* 글자 배지 */
      const br=Math.min(u*.34,r.h*.22),bx=r.x+br+u*.28,by=r.y+r.h/2;g.fillStyle=bd;g.beginPath();g.arc(bx,by,br,0,TAU);g.fill();K.txt(g,'ABCD'[i],bx,by+br*.05,{size:br*1.2,color:'#fff'});
      const tx0=bx+br+u*.25,tw0=r.x+r.w-tx0-u*.25;let fs=Math.min(u*.62,r.h*.3);g.font=K.font(fs);let lines=K.wrap(g,c,tw0);while((lines.length*fs*1.25>r.h-u*.35||lines.some(l=>g.measureText(l).width>tw0))&&fs>8){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,c,tw0);}
      g.fillStyle=INKN;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,k)=>g.fillText(l,tx0+tw0/2,by+(k-(lines.length-1)/2)*fs*1.25));
      if(done&&picked)K.emo(g,isAns?'✅':'❌',r.x+r.w-u*.35,r.y+u*.35,u*.55);
      g.restore();});},
};

Engine.boot(GAME);
