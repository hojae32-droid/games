/* 3~4학년 국어 · 속담 · 관용 표현 — 속담 카드 짝 맞추기 (카드를 기억했다가 두 장씩 뒤집어 짝 찾기)
   디자인: 한지와 먹, 도장 빨강의 전통 느낌. 호랑이 친구가 같이 응원하고, 카드는 직접 뒤집혀요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3a2414',RED='#b91c1c',TEAL='#0f766e';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="8" width="24" height="32" rx="3" fill="#0f766e" stroke="#3a2414" stroke-width="3"/><circle cx="16" cy="24" r="6" fill="#fde7c8" stroke="#3a2414" stroke-width="2"/><rect x="20" y="8" width="24" height="32" rx="3" fill="#fff8e6" stroke="#3a2414" stroke-width="3" transform="rotate(8 32 24)"/><path d="M28 18h10M27 24h10M26 30h8" stroke="#b91c1c" stroke-width="3" stroke-linecap="round" transform="rotate(8 32 24)"/></svg>';
/*@@DATA@@*/
/* 호랑이 (mood: neutral|happy|oops|peek) */
function tiger(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.015);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.5,s*.08,.25);
  g.fillStyle='#f59e0b';for(const d of[-1,1]){g.beginPath();g.arc(d*s*.38,-s*.32,s*.15,0,TAU);g.fill();g.stroke();g.fillStyle='#fde7c8';g.beginPath();g.arc(d*s*.38,-s*.32,s*.07,0,TAU);g.fill();g.fillStyle='#f59e0b';}
  g.beginPath();g.ellipse(0,0,s*.52,s*.46,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;for(const d of[-1,1]){for(let k=0;k<3;k++){g.beginPath();g.moveTo(d*s*.5,-s*.12+k*s*.14);g.lineTo(d*s*.34,-s*.08+k*s*.14);g.lineTo(d*s*.5,-s*.02+k*s*.14);g.fill();}}
  g.beginPath();g.moveTo(-s*.08,-s*.45);g.lineTo(0,-s*.28);g.lineTo(s*.08,-s*.45);g.closePath();g.fill();for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.2,-s*.44);g.lineTo(d*s*.14,-s*.3);g.lineTo(d*s*.26,-s*.32);g.closePath();g.fill();}
  g.fillStyle='#fff8e6';g.beginPath();g.ellipse(0,s*.12,s*.28,s*.2,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.2,ey=-s*.12;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.06,ey-s*.06);g.lineTo(ex+s*.06,ey+s*.06);g.moveTo(ex+s*.06,ey-s*.06);g.lineTo(ex-s*.06,ey+s*.06);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,s*.1,s*.12,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(ex+s*.015,ey+s*.02,s*.05,0,TAU);g.fill();}}
  g.fillStyle='#b45309';g.beginPath();g.ellipse(0,s*.04,s*.06,s*.04,0,0,TAU);g.fill();
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.14,s*.1,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.24,s*.08,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.moveTo(-s*.1,s*.14);g.quadraticCurveTo(0,s*.2,s*.1,s*.14);g.stroke();}
  g.restore();}
function backPattern(g,x,y,w,h,u){const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,'#14b8a6');gr.addColorStop(1,'#0f766e');g.fillStyle=gr;K.rr(g,x,y,w,h,u*.2);g.fill();g.save();K.rr(g,x+u*.12,y+u*.12,w-u*.24,h-u*.24,u*.14);g.clip();g.strokeStyle='rgba(253,231,200,.4)';g.lineWidth=Math.max(1.5,u*.04);
  const gs=u*.5;for(let xx=x;xx<x+w+h;xx+=gs){g.beginPath();g.moveTo(xx,y);g.lineTo(xx-h,y+h);g.stroke();g.beginPath();g.moveTo(xx-h,y);g.lineTo(xx,y+h);g.stroke();}g.restore();
  const cx=x+w/2,cy=y+h/2,r=Math.min(w,h)*.22;g.fillStyle='#fde7c8';g.beginPath();g.arc(cx,cy,r,0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.05);g.stroke();
  g.fillStyle=RED;g.beginPath();g.arc(cx,cy,r,Math.PI*.5,Math.PI*1.5);g.arc(cx,cy-r/2,r/2,Math.PI*1.5,Math.PI*.5);g.arc(cx,cy+r/2,r/2,Math.PI*1.5,Math.PI*.5,true);g.fill();
  g.strokeStyle=INK;g.lineWidth=Math.max(2.5,u*.07);K.rr(g,x,y,w,h,u*.2);g.stroke();}
function frontFace(g,x,y,w,h,u,text,side,lv,state){const fill=state==='ok'?'#dcfce7':'#fff8e6';g.fillStyle=fill;K.rr(g,x,y,w,h,u*.2);g.fill();g.strokeStyle=state==='ok'?'#16a34a':(side?RED:TEAL);g.lineWidth=Math.max(3,u*.09);g.stroke();
  const tag=lv==='a'?(side?'뒤':'앞'):(side?'뜻':(lv==='b'?'속담':'표현'));g.fillStyle=side?RED:TEAL;g.beginPath();g.arc(x+u*.38,y+u*.38,u*.27,0,TAU);g.fill();K.txt(g,tag,x+u*.38,y+u*.4,{size:u*.28,color:'#fff',maxW:u*.5});
  QK.txt(g,text,x+w/2,y+h/2+u*.15,w-u*.5,h-u*.9,Math.min(u*.8,h*.28),INK,1.2);}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6:Math.min(W,H)/6;K.vgrad(g,0,0,W,H,['#0f766e','#115e59','#134e4a']);
    const cw=wide?Math.min(u*1.5,W*.1):Math.min(u*2.1,W*.18),ch=cw*1.25;const n=wide?3:3;const per=5,ph=(T%per)/per;const x0=wide?W*.98-(n*cw+(n-1)*u*.3):W/2-(n*cw+(n-1)*u*.3)/2;const txt=[['소 잃고','외양간 고친다'],['티끌 모아','태산'],['누워서','떡 먹기'],['등잔 밑이','어둡다']];
    for(let i=0;i<n;i++){const x=x0+i*(cw+u*.3),y=H*(wide?.18:.4)+Math.sin(T*1.5+i)*u*.05;const flip=clamp((ph-.1-i*.08)/.15,0,1)*(ph<.7?1:0)+(ph>=.7&&ph<.8?1-(ph-.7)/.1:0);const sx=Math.abs(Math.cos(flip*Math.PI));g.save();g.translate(x+cw/2,y+ch/2);g.scale(Math.max(.02,sx),1);g.translate(-cw/2,-ch/2);
      if(flip<.5)backPattern(g,0,0,cw,ch,u*.6);else frontFace(g,0,0,cw,ch,u*.6,txt[i][i%2],i%2,'a','');g.restore();}
    tiger(g,wide?W*.12:W*.18,H*.82,u*1.5,ph>.3&&ph<.65?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k09-proverb-cards',title:'속담 카드 짝 맞추기',title1:'어흥! 기억력 대결',title2:'속담 카드 짝 맞추기',emoji:LOGO,
  subtitle:'3~4학년 · 속담 · 관용 표현',
  howto:'처음에 카드를 잠깐 보여 줘요. 잘 기억했다가 카드를 두 장씩 뒤집어 <b>짝</b>을 찾아요! 속담의 앞과 뒤, 속담과 뜻, 관용 표현과 뜻이 짝이에요. <b>적게 뒤집을수록</b> 점수가 높아요.',
  how:p=>({a:'속담의 <b>앞</b>과 <b>뒤</b> 짝 찾기',b:'<b>속담</b>과 <b>뜻</b> 짝 찾기',c:'<b>관용 표현</b>과 <b>뜻</b> 짝 찾기',all:'짝 찾기가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#7c2d12',c2:'#0f766e'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 카드를 맞출까요?',
  txt:{who:'누가 도전할까요?',dur:'도전 시간',pace:'보여 주는 시간',seat:'번 도전자 ',go:'도전 시작!',s1:'1. 카드',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'3~4학년',t:'속담 앞뒤 잇기',d:'소 잃고 ↔ 외양간 고친다'},
    {id:'b',g:'3~4학년',t:'속담과 뜻',d:'누워서 떡 먹기 ↔ 아주 쉬운 일'},
    {id:'c',g:'4학년',t:'관용 표현과 뜻',d:'발이 넓다 ↔ 아는 사람이 많다'},
    {id:'all',g:'3~4학년',t:'🌟 모두 섞기',d:'짝 찾기가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>속담</b>은 옛날부터 전해 오는, 삶의 지혜를 담은 짧은 말이에요 (소 잃고 외양간 고친다 → 일이 잘못된 뒤에 손써도 소용없다).</li>
    <li>속담은 <b>비유</b>로 말해서 겉뜻과 속뜻이 달라요. 속뜻을 알아야 알맞은 때에 쓸 수 있어요.</li>
    <li><b>관용 표현</b>은 둘 이상의 낱말이 합쳐져 원래 뜻과 다른 새로운 뜻을 나타내는 말이에요 (발이 넓다 → 아는 사람이 많다, 귀가 얇다 → 남의 말을 쉽게 믿는다).</li>
    <li>짝을 맞출 때는 카드 위치를 기억하고, 같은 카드를 여러 번 뒤집지 않도록 해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const q=p.state.q;const n=q?q.cards.length:8;const botH=u*1.9;const y0=Z0+u*.9,y1=H-botH-u*.1;
    let cols,rows;if(n===8){cols=land?4:2;}else{cols=land?3:2;}rows=Math.ceil(n/cols);return{W,H,u,Z0,land,y0,y1,cols,rows,botH,n};},
  cardRects(p){const G=this.geo(p);return QK.grid(G.W,G.y0,G.y1,G.n,G.cols,G.u*.4,G.u*.25);},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,coll:0,T:0,mood:'neutral',mT:0,msg:'',pv:0,pvMax:0,open:[],done:new Set(),flips:0,busy:true,fl:[],sparks:[]});this.newQ(p);},
  make(p,L){const R=p.R,q={};const src=L==='a'?PA:L==='b'?PB:PC;const n=p.n===1?4:3;
    const prs=R.sample(src,n);q.L=L;q.prs=prs;q.cards=R.shuffle(prs.flatMap((pr,k)=>[{k,s:0,t:pr[0]},{k,s:1,t:pr[1]}]));
    q.text=L==='a'?'속담의 <b>앞</b>과 <b>뒤</b>가 이어지는 카드를 찾아요!':L==='b'?'<b>속담</b>과 알맞은 <b>뜻</b> 카드를 찾아요!':'<b>관용 표현</b>과 알맞은 <b>뜻</b> 카드를 찾아요!';
    q.reveal=prs.map(x=>L==='a'?x[0]+' '+x[1]:x[0]+' = '+x[1]).join(' / ');q.review=q.reveal;return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.open=[];st.done=new Set();st.flips=0;st.busy=true;
    st.fl=q.cards.map(()=>({f:1,tgt:1}));st.pvMax=(q.cards.length===8?3.4:2.8)/Math.sqrt(p.pace);st.pv=st.pvMax;st.msg='👀 잘 기억해요!';st.finished=false;
    p.ask('🃏 '+q.text,'처음에 카드를 잠깐 보여 줘요');},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}
    if(st.pv>0){st.pv-=dt;if(st.pv<=0){st.fl.forEach(c=>c.tgt=0);st.msg='두 장씩 뒤집어 짝을 찾아요';st.busy=false;}}
    for(const c of st.fl){c.f+=(c.tgt-c.f)*Math.min(1,dt*10);if(Math.abs(c.tgt-c.f)<.01)c.f=c.tgt;}
    st.sparks=st.sparks.filter(s=>(s.t+=dt)<.8);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.busy||st.finished)return;const rs=this.cardRects(p);const k=rs.findIndex(r=>K.inRect(x,y,r));if(k<0||st.done.has(k)||st.open.includes(k))return;
    st.fl[k].tgt=1;st.open.push(k);st.flips++;p.Snd.tone(600,.05,'sine',.04);
    if(st.open.length===2){const [a,b]=st.open;const A=q.cards[a],B=q.cards[b];st.busy=true;
      if(A.k===B.k&&A.s!==B.s){setTimeout(()=>{st.done.add(a);st.done.add(b);st.open=[];st.busy=false;p.Snd.bell(880,0,.06);st.mood='happy';st.mT=1.2;const pr=q.prs[A.k];st.msg='✨ '+(q.L==='a'?`${pr[0]} ${pr[1]}`:`${pr[0]} = ${pr[1]}`);
          const G=this.geo(p),r1=rs[a],r2=rs[b];st.sparks.push({x:r1.x+r1.w/2,y:r1.y+r1.h/2,t:0},{x:r2.x+r2.w/2,y:r2.y+r2.h/2,t:0});
          if(st.done.size===q.cards.length){st.finished=true;const extra=Math.max(0,st.flips-q.cards.length);const part=Math.max(.35,1-.07*extra);st.coll+=q.prs.length;
            p.hit(true,{pts:Math.round(200*part),x:p.W/2,y:G.y0,tip:extra===0?'완벽한 기억력! ('+st.flips+'번)':`짝 맞추기 성공! ${st.flips}번 만에`,review:q.review,tipMs:1600});setTimeout(()=>{if(p.active)this.newQ(p);},1800);}},350);}
      else{st.mood='oops';st.mT=.9;setTimeout(()=>{st.fl[a].tgt=0;st.fl[b].tgt=0;st.open=[];st.busy=false;},900);}}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    K.vgrad(g,0,0,W,H,['#115e59','#0f766e','#0b4f4a']);g.save();g.strokeStyle='rgba(253,231,200,.07)';g.lineWidth=2;const gs=u*1.1;for(let x=0;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
    /* 위쪽 안내 줄 */
    const sw=Math.min(W*.9,u*16);K.card(g,W/2-sw/2,G.Z0-u*.05,sw,u*.75,u*.2,'rgba(255,248,230,.95)',{stroke:INK,lw:2,blur:u*.15,dy:u*.05});
    K.txt(g,st.pv>0?`👀 잘 기억해요! ${Math.ceil(st.pv)}`:st.msg,W/2-u*1.6,G.Z0+u*.32,{size:u*.4,color:INK,maxW:sw-u*3.8});K.txt(g,`🔄 ${st.flips}번 뒤집음`,W/2+sw/2-u*1.6,G.Z0+u*.32,{size:u*.36,color:RED,maxW:u*3});
    const rs=this.cardRects(p);
    rs.forEach((r,k)=>{const c=q.cards[k],f=st.fl[k];const sx=Math.abs(Math.cos(f.f*Math.PI));const done=st.done.has(k);g.save();g.translate(r.x+r.w/2,r.y+r.h/2);g.scale(Math.max(.03,sx),1);g.translate(-r.w/2,-r.h/2);
      K.shadow&&0;if(f.f<.5)backPattern(g,0,0,r.w,r.h,u);else{frontFace(g,0,0,r.w,r.h,u,c.t,c.s,q.L,done?'ok':'');}g.restore();
      if(done){K.glow(g,r.x+r.w/2,r.y+r.h/2,Math.max(r.w,r.h)*.6,'#4ade80',.22);}});
    for(const s of st.sparks)for(let i=0;i<6;i++){const a=i*TAU/6,rr=u*(.3+s.t*1.4);g.fillStyle=`rgba(253,224,71,${1-s.t/.8})`;g.beginPath();g.arc(s.x+Math.cos(a)*rr,s.y+Math.sin(a)*rr,u*.08,0,TAU);g.fill();}
    tiger(g,u*1.1,G.y1+G.botH*.5,Math.min(u*1.5,G.botH*.9),st.mood,t);
    K.card(g,W-u*4.2,G.y1+G.botH*.2,u*3.9,G.botH*.6,u*.2,'rgba(255,248,230,.95)',{stroke:INK,lw:2,blur:u*.15,dy:u*.05});K.txt(g,`📜 모은 말 ${st.coll}개`,W-u*2.25,G.y1+G.botH*.5,{size:u*.42,color:INK,maxW:u*3.6});},
};

Engine.boot(GAME);
