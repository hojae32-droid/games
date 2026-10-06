/* 3~4학년 국어 · 높임 표현 — 높임말 호텔 (손님에 따라 알맞은 높임말로 안내하고 팁 받기)
   디자인: 자주색과 금색의 우아한 호텔 로비. 손님마다 말투를 들어 주고, 바르게 말하면 기뻐하며 팁을 줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2a0a14',GOLD='#d4a72c';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="28" rx="2" fill="#9f1239" stroke="#2a0a14" stroke-width="3"/><path d="M4 14l20-10 20 10z" fill="#d4a72c" stroke="#2a0a14" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="26" width="10" height="16" fill="#fde68a" stroke="#2a0a14" stroke-width="2.5"/><circle cx="14" cy="24" r="3" fill="#fde68a"/><circle cx="34" cy="24" r="3" fill="#fde68a"/></svg>';
/*@@DATA@@*/
const LOOK={grandpa:{skin:'#f1c9a1',hair:'#e5e7eb',glass:true,stache:true,cloth:'#7c2d12',bald:true},grandma:{skin:'#f1c9a1',hair:'#d1d5db',bun:true,cloth:'#9d174d',shawl:'#f9a8d4'},
  teacher:{skin:'#f5d3b3',hair:'#3b2a20',glass:true,cloth:'#1e3a8a',tie:'#fbbf24'},boss:{skin:'#e8b88c',hair:'#111827',cloth:'#111827',tie:'#dc2626',hat:'top'},
  friend:{skin:'#f2c9a0',hair:'#6b4423',cloth:'#16a34a',cap:'#2563eb'},kid:{skin:'#f5cfa8',hair:'#2b1b12',cloth:'#f59e0b',small:true,pony:true},
  mom:{skin:'#f5cfa8',hair:'#3b2a20',long:true,cloth:'#be185d'},guest:{skin:'#e0ac82',hair:'#111827',cloth:'#0e7490',hat:'travel'}};
/* 사람: (x,y)=책상 윗선 가운데. 몸은 위로 */
function person(g,x,y,s,L,mood,t,suit,hotelCap){g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(2,s*.045);g.strokeStyle=INK;
  const k=L&&L.small?.82:1;g.scale(k,k);const bob=mood==='happy'?Math.abs(Math.sin(t*8))*s*.05:Math.sin(t*2)*s*.012;g.translate(0,-bob);
  const cloth=suit||L.cloth;
  g.fillStyle=cloth;g.beginPath();g.moveTo(-s*.42,0);g.quadraticCurveTo(-s*.42,-s*.42,-s*.2,-s*.46);g.lineTo(s*.2,-s*.46);g.quadraticCurveTo(s*.42,-s*.42,s*.42,0);g.closePath();g.fill();g.stroke();
  if(L.shawl){g.fillStyle=L.shawl;g.beginPath();g.moveTo(-s*.4,-s*.2);g.quadraticCurveTo(0,-s*.1,s*.4,-s*.2);g.lineTo(s*.42,0);g.lineTo(-s*.42,0);g.closePath();g.fill();g.stroke();}
  g.fillStyle='#fff';g.beginPath();g.moveTo(-s*.12,-s*.46);g.lineTo(0,-s*.3);g.lineTo(s*.12,-s*.46);g.closePath();g.fill();g.stroke();
  if(L.tie){g.fillStyle=L.tie;g.beginPath();g.moveTo(-s*.04,-s*.36);g.lineTo(s*.04,-s*.36);g.lineTo(s*.06,-s*.16);g.lineTo(0,-s*.1);g.lineTo(-s*.06,-s*.16);g.closePath();g.fill();}
  if(suit){g.fillStyle=GOLD;for(const d of[-1,1]){g.beginPath();g.arc(d*s*.1,-s*.18,s*.03,0,TAU);g.fill();}}
  const hy=-s*.7,hr=s*.27;
  if(L.long){g.fillStyle=L.hair;g.beginPath();g.ellipse(0,hy+hr*.35,hr*1.2,hr*1.4,0,0,TAU);g.fill();g.stroke();}
  if(L.bun){g.fillStyle=L.hair;g.beginPath();g.arc(0,hy-hr*1.15,hr*.45,0,TAU);g.fill();g.stroke();}
  if(L.pony){g.fillStyle=L.hair;g.beginPath();g.ellipse(hr*1.1,hy+hr*.2,hr*.28,hr*.6,.3,0,TAU);g.fill();g.stroke();}
  g.fillStyle=L.skin;g.beginPath();g.arc(0,hy,hr,0,TAU);g.fill();g.stroke();
  g.fillStyle=L.hair;if(!L.bald){g.beginPath();g.arc(0,hy,hr*1.02,Math.PI*1.04,Math.PI*1.96);g.quadraticCurveTo(hr*.5,hy-hr*.55,0,hy-hr*.5);g.quadraticCurveTo(-hr*.5,hy-hr*.55,-hr*.98,hy-hr*.12);g.closePath();g.fill();g.stroke();}
  else{g.beginPath();g.ellipse(-hr*.95,hy+hr*.1,hr*.18,hr*.4,0,0,TAU);g.fill();g.beginPath();g.ellipse(hr*.95,hy+hr*.1,hr*.18,hr*.4,0,0,TAU);g.fill();}
  const ex=hr*.42,ey=hy+hr*.02;g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=Math.max(1.6,s*.035);
  g.beginPath();if(mood==='sad'){g.moveTo(-ex-hr*.2,ey-hr*.5);g.lineTo(-ex+hr*.2,ey-hr*.38);g.moveTo(ex-hr*.2,ey-hr*.38);g.lineTo(ex+hr*.2,ey-hr*.5);}else{g.moveTo(-ex-hr*.2,ey-hr*.42);g.lineTo(-ex+hr*.2,ey-hr*.42);g.moveTo(ex-hr*.2,ey-hr*.42);g.lineTo(ex+hr*.2,ey-hr*.42);}g.stroke();
  for(const d of[-1,1]){const px=d*ex;if(mood==='happy'){g.beginPath();g.arc(px,ey+hr*.05,hr*.14,Math.PI*1.1,Math.PI*1.9);g.stroke();}else if(mood==='sad'){g.fillStyle='#fff';g.beginPath();g.ellipse(px,ey,hr*.15,hr*.19,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(px,ey+hr*.08,hr*.07,0,TAU);g.fill();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(px,ey,hr*.15,hr*.19,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(px+hr*.02,ey+hr*.03,hr*.08,0,TAU);g.fill();}}
  if(L.glass){g.strokeStyle='#1f2937';g.lineWidth=Math.max(1.5,s*.03);for(const d of[-1,1]){g.beginPath();g.arc(d*ex,ey,hr*.27,0,TAU);g.stroke();}g.beginPath();g.moveTo(-ex+hr*.27,ey);g.lineTo(ex-hr*.27,ey);g.stroke();}
  g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.035);const my=hy+hr*.52;g.beginPath();
  if(L.stache){g.fillStyle=L.hair;g.beginPath();g.ellipse(-hr*.2,my-hr*.2,hr*.25,hr*.1,.2,0,TAU);g.ellipse(hr*.2,my-hr*.2,hr*.25,hr*.1,-.2,0,TAU);g.fill();g.beginPath();}
  if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,my-hr*.1,hr*.22,0,Math.PI);g.fill();g.stroke();}else if(mood==='sad'){g.arc(0,my+hr*.2,hr*.18,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,my-hr*.1,hr*.2,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(244,114,182,.35)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*hr*.62,my-hr*.12,hr*.14,hr*.08,0,0,TAU);g.fill();}
  /* 모자 */
  if(L.hat==='top'){g.fillStyle='#111827';g.strokeStyle=INK;K.rr(g,-hr*.7,hy-hr*1.95,hr*1.4,hr*1.1,hr*.1);g.fill();g.stroke();g.fillRect(-hr*1.1,hy-hr*.95,hr*2.2,hr*.18);g.fillStyle='#dc2626';g.fillRect(-hr*.7,hy-hr*1.2,hr*1.4,hr*.18);}
  if(L.hat==='travel'){g.fillStyle='#d6a15f';g.beginPath();g.ellipse(0,hy-hr*.7,hr*1.3,hr*.3,0,0,TAU);g.fill();g.stroke();g.beginPath();g.arc(0,hy-hr*.72,hr*.7,Math.PI,TAU);g.fill();g.stroke();}
  if(L.cap){g.fillStyle=L.cap;g.beginPath();g.arc(0,hy-hr*.2,hr*1.02,Math.PI*1.05,Math.PI*1.95);g.closePath();g.fill();g.stroke();g.beginPath();g.ellipse(hr*.7,hy-hr*.3,hr*.6,hr*.14,0,0,TAU);g.fill();g.stroke();}
  if(hotelCap){g.fillStyle='#9f1239';K.rr(g,-hr*.8,hy-hr*1.35,hr*1.6,hr*.8,hr*.2);g.fill();g.stroke();g.fillStyle=GOLD;g.fillRect(-hr*.8,hy-hr*.75,hr*1.6,hr*.14);g.beginPath();g.arc(0,hy-hr*1.0,hr*.16,0,TAU);g.fill();}
  g.restore();}
function lobby(g,W,H,u,t,deskY){
  K.vgrad(g,0,0,W,H,['#4a0d1f','#3a0b19','#2a0a14']);
  g.strokeStyle='rgba(212,167,44,.18)';g.lineWidth=2;for(let x=u;x<W;x+=u*2.4){g.beginPath();g.moveTo(x,0);g.lineTo(x,deskY);g.stroke();}
  g.fillStyle='rgba(212,167,44,.35)';g.fillRect(0,deskY-u*2.2,W,Math.max(2,u*.06));
  /* 샹들리에 */
  const cx=W/2,cy=u*.2;g.save();g.strokeStyle=GOLD;g.lineWidth=Math.max(2,u*.05);g.beginPath();g.moveTo(cx,-5);g.lineTo(cx,cy+u*.5);g.stroke();K.glow(g,cx,cy+u*.9,u*2.6,'#fde68a',.28+.08*Math.sin(t*2));
  g.fillStyle=GOLD;g.beginPath();g.moveTo(cx-u*1.1,cy+u*.9);g.quadraticCurveTo(cx,cy+u*.3,cx+u*1.1,cy+u*.9);g.quadraticCurveTo(cx,cy+u*1.2,cx-u*1.1,cy+u*.9);g.fill();for(let i=-2;i<=2;i++){const bx=cx+i*u*.45;g.fillStyle='#fef3c7';g.beginPath();g.ellipse(bx,cy+u*1.15+Math.abs(i)*u*.05,u*.07,u*.16,0,0,TAU);g.fill();}g.restore();
  /* 바닥 카펫 */
  const gr=g.createLinearGradient(0,deskY,0,H);gr.addColorStop(0,'#7f1d1d');gr.addColorStop(1,'#450a0a');g.fillStyle=gr;g.fillRect(0,deskY,W,H-deskY);
  g.strokeStyle='rgba(253,230,138,.35)';g.lineWidth=Math.max(2,u*.06);g.strokeRect(-5,deskY+u*.2,W+10,H-deskY-u*.1);}
function desk(g,x,y,w,h,u,t,ring){K.card(g,x,y,w,h,u*.15,'#6b3a1f',{stroke:INK,lw:Math.max(2,u*.06),blur:u*.3,dy:u*.1});g.fillStyle=GOLD;g.fillRect(x,y+h*.1,w,Math.max(3,u*.08));g.fillStyle='rgba(255,255,255,.08)';g.fillRect(x,y+h*.4,w,h*.5);
  /* 벨 */
  const bx=x+w*.5,by=y;g.save();g.translate(bx,by);const sh=ring>0?Math.sin(t*50)*u*.03:0;g.translate(sh,0);g.fillStyle=GOLD;g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.arc(0,0,u*.38,Math.PI,0);g.closePath();g.fill();g.stroke();g.fillRect(-u*.45,-u*.02,u*.9,u*.1);g.beginPath();g.arc(0,-u*.4,u*.07,0,TAU);g.fill();g.stroke();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const order=[['grandpa','할아버지, 진지 드세요.'],['teacher','선생님, 안녕하세요?'],['grandma','할머니, 댁에 모셔다 드릴게요.'],['friend','어서 와!']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;const deskY=H*.66;lobby(g,W,H,u,T,deskY);
    const s=u*(wide?2.1:2.3);const per=4.2,n=Math.floor(T/per),ph=(T%per)/per;const o=order[n%4];const walk=clamp(ph/.2,0,1);const gx=W*(wide?.72:.7)+(1-walk)*W*.4;
    person(g,gx,deskY+u*.7,s,LOOK[o[0]],ph>.55?'happy':'neutral',T);
    desk(g,W*(wide?.3:.2),deskY,W*(wide?.5:.62),u*1.2,u,T,0);
    person(g,W*(wide?.4:.3),deskY+u*.15,s*.95,{skin:'#f5cfa8',hair:'#2b1b12',cloth:'#9f1239'},ph>.55?'happy':'neutral',T,'#9f1239',true);
    if(ph>.2){const a=clamp((ph-.2)/.1,0,1);const bw=Math.min(W*.6,u*11),bx=W*(wide?.5:.5)-bw/2+(wide?W*.12:0),by=deskY-s*1.6;g.save();g.globalAlpha=a;K.card(g,bx,by-u*1.2,bw,u*1.2,u*.25,'#fff8e7',{stroke:GOLD,lw:2,blur:u*.3,dy:u*.1});K.txt(g,(ph>.55?'💬 ':'')+o[1],bx+bw/2,by-u*.6,{size:u*.42,color:INK,maxW:bw-u*.5});g.restore();}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k08-honorific-hotel',title:'높임말 호텔',title1:'어서 오세요, 손님!',title2:'높임말 호텔',emoji:LOGO,
  subtitle:'3~4학년 · 높임 표현 · 웃어른께 쓰는 말',
  howto:'나는 호텔 안내원! 할아버지, 선생님, 친구, 동생… 손님에 따라 <b>알맞은 높임말</b>로 안내해요. 바르게 말하면 손님이 기뻐하며 <b>팁</b>을 주고, 틀리면 손님이 언짢아해요. 빨리 안내할수록 팁이 많아요!',
  how:p=>({a:'<b>높임 낱말</b>로 빈칸 채우기',b:'듣는 사람에 따라<br><b>알맞은 말</b> 고르기',c:'<b>잘못된 높임</b>을 바르게!',all:'세 가지 안내가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#9f1239',c2:'#ca8a04'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 손님을 맞을까요?',
  txt:{who:'누가 안내원이 될까요?',dur:'영업 시간',pace:'손님 기다리는 시간',seat:'번 안내원 ',go:'영업 시작!',s1:'1. 손님',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'3~4학년',t:'높임 낱말',d:'밥 → 진지 · 집 → 댁 · 자다 → 주무시다'},
    {id:'b',g:'3~4학년',t:'듣는 사람에 따라',d:'어른께 · 친구에게 알맞은 말'},
    {id:'c',g:'4학년',t:'잘못된 높임 고치기',d:'커피 나오셨습니다?'},
    {id:'all',g:'3~4학년',t:'🌟 모두 섞기',d:'손님이 번갈아 와요'},
  ],
  summary:`<ul><li><b>높임 낱말</b>: 밥 → 진지, 집 → 댁, 나이 → 연세, 이름 → 성함, 생일 → 생신, 말 → 말씀, 아프다 → 편찮으시다, 자다 → 주무시다, 있다 → 계시다, 먹다 → 드시다.</li>
    <li>웃어른이 <b>하는 일</b>에는 서술어에 <b>-시-</b>를 붙여요 (할머니께서 오<b>시</b>었다). 웃어른께 <b>드리는</b> 일에는 드리다·여쭈다·모시다·뵙다를 써요.</li>
    <li>친구나 동생에게는 높이지 않고 편하게 말해도 돼요. 하지만 상대를 존중하는 말투를 쓰면 더 좋아요.</li>
    <li><b>사물</b>에는 높임을 쓰지 않아요. “커피 나오셨습니다”가 아니라 “커피 나왔습니다”가 바른 말이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.2;const q=p.state.q;const n=q?q.choices.length:3;const wordRow=q&&q.ty==='word';
    const rowMode=wordRow||(land&&n<=3);const bh=land?Math.min(H*.16,u*2.3):u*1.45,gap=u*.22;const ctrlH=rowMode?bh:n*bh+(n-1)*gap;const cy0=H-ctrlH-u*.3;const sh=cy0-Z0-gap;const deskY=Z0+sh*.8;
    return{W,H,u,Z0,land,rowMode,bh,gap,ctrlH,cy0,sh,deskY,n};},
  ctrlRects(p){const G=this.geo(p),gx=G.u*.3,n=G.n;const out=[];if(G.rowMode){const w=(G.W-gx*2-G.gap*(n-1))/n;for(let i=0;i<n;i++)out.push({x:gx+i*(w+G.gap),y:G.cy0,w,h:G.bh});}else for(let i=0;i<n;i++)out.push({x:gx,y:G.cy0+i*(G.bh+G.gap),w:G.W-gx*2,h:G.bh});return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,money:0,served:0,T:0,lock:false,pick:-1,qt:0,qmax:0,mood:'neutral',gMood:'neutral',mT:0,enter:1,exit:0,react:'',ring:0,coins:[],shown:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const s=p.deck(WORDA,'dk_a');q.ty='word';q.g=GUEST[s[0]];q.gk=s[0];q.sent=s[1];q.ans=s[2];q.choices=R.shuffle([s[2],s[3],...(s[4]?[s[4]]:[])]);
      q.order=s[5]||'안내원, 도와주세요!';q.text='빈칸에 들어갈 <b>알맞은 높임 낱말</b>은?';q.reveal=s[1].replace('@',s[2]);q.price=3000;}
    else if(L==='b'){const s=p.deck(TALKB,'dk_b');const gk=R.pick(['old','old','peer']);const gs=gk==='old'?R.pick(['grandpa','grandma','teacher','boss']):R.pick(['friend','kid']);
      q.ty='talk';q.g=GUEST[gs];q.gk=gs;q.order=s[0];q.ans=gk==='old'?s[1]:s[2];q.choices=R.shuffle([s[1],s[2],s[3]]);q.text=`<b>${q.g.n}</b>${gk==='old'?'께':'에게'} 알맞게 말한 것은?`;q.reveal=q.ans;q.price=3500;}
    else{const s=p.deck(FIXC,'dk_c');q.ty='fix';q.g=GUEST[s[0]];q.gk=s[0];q.order=s[1];q.ans=s[2];q.choices=R.shuffle([s[2],s[3],s[4]]);q.text='손님께 <b>바르게 높여</b> 말한 것은?';q.reveal=s[2];q.price=4000;}
    q.review=(q.g?q.g.n+' · ':'')+strip(q.order)+' → '+strip(q.reveal);return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.enter=1;st.exit=0;st.react='';st.gMood='neutral';
    st.qmax=30/p.pace;st.qt=st.qmax;p.ask('🛎️ '+q.text,'손님이 기다리고 있어요 · 빠를수록 팁이 많아요');},
  verdict(p,i,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.pick=i;const ok=!timeout&&q.choices[i]===q.ans;const frac=clamp(st.qt/st.qmax,0,1);
    st.mood=ok?'happy':'oops';st.gMood=ok?'happy':'sad';st.mT=2;st.ring=.5;st.react=ok?q.g.happy:q.g.sad;
    const tip=ok?Math.round(q.price*(.5+.5*frac)/10)*10:0;if(ok){st.money+=tip;st.coins.push({t:0,n:Math.min(6,2+Math.floor(frac*4))});st.served++;}
    const G=this.geo(p);p.hit(ok,{pts:ok?Math.round(60+90*frac):undefined,x:p.W/2,y:G.Z0+G.sh*.4,tip:ok?`팁 ${tip.toLocaleString()}원!`:`${timeout?'손님이 기다리다 지쳤어요! ':'예의 바르지 않아요! '}바른 말: ${q.reveal}`,review:q.review,tipMs:ok?1100:3000});
    setTimeout(()=>{st.exit=.01;},ok?1100:2200);setTimeout(()=>{if(p.active)this.newQ(p);},ok?1700:2800);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.ring>0)st.ring-=dt;
    if(st.enter>0)st.enter=Math.max(0,st.enter-dt*1.4);if(st.exit>0&&st.exit<1)st.exit=Math.min(1,st.exit+dt*1.6);
    st.coins=st.coins.filter(c=>(c.t+=dt)<1);if(st.shown<st.money)st.shown=Math.min(st.money,st.shown+Math.max(20,(st.money-st.shown)*dt*5));
    if(st.q&&!st.lock&&st.qmax>0&&st.enter<.2){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  down(p,x,y){const st=p.state;if(!st.q||st.lock||st.enter>.3)return;const i=this.ctrlRects(p).findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    lobby(g,W,H,u,t,G.deskY);
    const s=Math.min(u*3.2,G.sh*.62,W*.24);const gx=W*(G.land?.72:.68),dx=(st.enter*W*.4)+(st.exit*W*.5);const fy=G.deskY+s*.1;
    /* 손님 */
    person(g,gx+dx,fy+s*.62,s,LOOK[q.gk],st.gMood,t);
    /* 책상 + 안내원 */
    const dw=Math.min(W*(G.land?.5:.62),u*16),dxl=G.land?W*.12:W*.04;
    person(g,dxl+dw*.28,G.deskY+s*.18,s*.95,{skin:'#f5cfa8',hair:'#2b1b12',cloth:'#9f1239'},st.mood,t,p.color,true);
    desk(g,dxl,G.deskY+s*.08,dw,s*.55,u,t,st.ring);
    /* 손님 말풍선 */
    const bw=Math.min(W*.9,u*18),bh0=Math.min(G.sh*.34,u*2.3),bx=W/2-bw/2,by=G.Z0+u*.2;const reacting=st.react&&st.lock;
    const txt=reacting?st.react:q.order;
    g.save();g.globalAlpha=clamp(1-st.enter*1.6,0,1);K.card(g,bx,by,bw,bh0,u*.28,reacting?(st.gMood==='happy'?'#dcfce7':'#fee2e2'):'#fff8e7',{stroke:reacting?(st.gMood==='happy'?'#16a34a':'#dc2626'):GOLD,lw:Math.max(2,u*.06),blur:u*.3,dy:u*.1});
    g.fillStyle='#fff8e7';g.beginPath();g.moveTo(clamp(gx,bx+u,bx+bw-u)-u*.2,by+bh0-1);g.lineTo(clamp(gx,bx+u,bx+bw-u)+u*.1,by+bh0+u*.4);g.lineTo(clamp(gx,bx+u,bx+bw-u)+u*.3,by+bh0-1);g.closePath();g.fill();
    QK.txt(g,txt,W/2,by+bh0/2,bw-u*.6,bh0-u*.25,u*.7,INK);g.restore();
    /* 빈칸 쪽지 (높임 낱말) */
    if(q.ty==='word'){const nw=Math.min(W*.9,u*16),nh=Math.min(G.sh*.26,u*1.8),nx=W/2-nw/2,ny=by+bh0+u*.5;g.save();g.globalAlpha=clamp(1-st.enter*1.6,0,1);K.card(g,nx,ny,nw,nh,u*.12,'#fffdf2',{stroke:'#a16207',lw:2,blur:u*.2,dy:u*.06});
      const pick=st.pick>=0?q.choices[st.pick]:null;const ok=pick===q.ans;const parts=q.sent.split('@');let fs=Math.min(u*.65,nh*.4);g.font=K.font(fs);const fill=pick||'  ?  ';
      const full=parts[0]+'[]'+parts[1];let w1=g.measureText(parts[0]).width,wb=Math.max(g.measureText(fill).width+u*.3,u*1.2),w2=g.measureText(parts[1]).width;while(w1+wb+w2>nw-u*.5&&fs>9){fs*=.93;g.font=K.font(fs);w1=g.measureText(parts[0]).width;wb=Math.max(g.measureText(fill).width+u*.3,u*1.2);w2=g.measureText(parts[1]).width;}
      let sx=W/2-(w1+wb+w2)/2;g.textAlign='left';g.textBaseline='middle';g.fillStyle=INK;g.fillText(parts[0],sx,ny+nh/2);
      g.fillStyle=pick?(ok?'#bbf7d0':'#fecaca'):'rgba(212,167,44,.25)';K.rr(g,sx+w1,ny+nh/2-fs*.65,wb,fs*1.3,u*.1);g.fill();g.strokeStyle=pick?(ok?'#16a34a':'#dc2626'):GOLD;g.lineWidth=2;g.stroke();g.fillStyle=INK;g.textAlign='center';g.fillText(fill,sx+w1+wb/2,ny+nh/2);g.textAlign='left';g.fillText(parts[1],sx+w1+wb,ny+nh/2);g.restore();}
    /* 참을성 막대 */
    if(!st.lock&&st.enter<.2){const f=clamp(st.qt/st.qmax,0,1),pw=Math.min(W*.5,u*10),ph=Math.max(5,u*.15);const py=G.cy0-u*.35;K.rr(g,W/2-pw/2,py,pw,ph,ph/2);g.fillStyle='rgba(255,255,255,.15)';g.fill();K.rr(g,W/2-pw/2,py,Math.max(ph,pw*f),ph,ph/2);g.fillStyle=f>.5?'#86efac':(f>.25?'#fde047':'#f87171');g.fill();K.txt(g,'손님 인내심',W/2-pw/2-u*1.3,py+ph/2,{size:u*.3,color:'#fdeccf',maxW:u*2.4});}
    /* 팁 */
    K.card(g,W-u*4.4,G.Z0-u*.05,u*4.1,u*.8,u*.2,'rgba(29,7,16,.9)',{stroke:GOLD,lw:2,blur:u*.2,dy:u*.05});K.txt(g,`💰 팁 ${Math.round(st.shown).toLocaleString()}원`,W-u*2.35,G.Z0+u*.35,{size:u*.42,color:'#fde68a',maxW:u*3.8});
    for(const c of st.coins)for(let k=0;k<c.n;k++){const f=clamp(c.t*1.4-k*.08,0,1);if(f<=0)continue;const x=gx+(W-u*2.3-gx)*f,y=fy-s*.5+(G.Z0+u*.35-(fy-s*.5))*f-Math.sin(f*Math.PI)*u;g.fillStyle=GOLD;g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,y,u*.17,0,TAU);g.fill();g.stroke();}
    /* 보기 */
    const rs=this.ctrlRects(p);rs.forEach((r,i)=>{const c=q.choices[i];let stt='idle';if(st.lock){if(c===q.ans)stt='ok';else if(st.pick===i)stt='bad';else stt='dim';}
      QK.card(g,u,r,(q.ty==='word'?'':'💬 ')+c,stt,{fill:'#fff8e7',bd:GOLD,ink:INK,sc:'rgba(0,0,0,.6)'});});},
};

Engine.boot(GAME);
