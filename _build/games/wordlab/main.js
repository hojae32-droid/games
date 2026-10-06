/* 5~6학년 국어 · 낱말의 짜임 · 고유어 · 한자어 · 외래어 — 낱말 연구소 (낱말 방울 담기, 합성어 만들기, 뜻을 더하는 말 붙이기)
   디자인: 짙은 청록 연구소 콘솔과 원소 타일. 올빼미 박사와 함께 낱말을 실험해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#08181a';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M18 5h12M20 5v14L8 40a3 3 0 0 0 3 4h26a3 3 0 0 0 3-4L28 19V5" fill="#99f6e4" stroke="#08181a" stroke-width="3.5" stroke-linejoin="round"/><path d="M13 32h22l5 8a3 3 0 0 1-3 4H11a3 3 0 0 1-3-4z" fill="#d946ef"/><circle cx="21" cy="26" r="2.5" fill="#fff"/><circle cx="28" cy="22" r="2" fill="#fff"/></svg>';
/*@@DATA@@*/
const KIND={g:{t:'고유어',s:'본디부터 쓰던 우리말',c:'#4ade80'},h:{t:'한자어',s:'한자로 된 말',c:'#fb923c'},f:{t:'외래어',s:'다른 나라에서 들어와 우리말처럼 쓰는 말',c:'#60a5fa'}};
function owl(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.015);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.58,s*.45,s*.08,.3);
  g.fillStyle='#fff';g.beginPath();g.moveTo(-s*.4,s*.55);g.quadraticCurveTo(-s*.42,s*.1,0,s*.08);g.quadraticCurveTo(s*.42,s*.1,s*.4,s*.55);g.closePath();g.fill();g.stroke();
  g.fillStyle='#a16207';g.beginPath();g.ellipse(0,-s*.1,s*.42,s*.46,0,0,TAU);g.fill();g.stroke();g.fillStyle='#d6a15f';g.beginPath();g.ellipse(0,s*.02,s*.26,s*.3,0,0,TAU);g.fill();
  g.fillStyle='#a16207';for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.2,-s*.48);g.lineTo(d*s*.42,-s*.64);g.lineTo(d*s*.44,-s*.36);g.closePath();g.fill();g.stroke();}
  /* 고글 */
  for(const d of[-1,1]){g.fillStyle='#99f6e4';g.beginPath();g.arc(d*s*.2,-s*.18,s*.17,0,TAU);g.fill();g.stroke();}g.strokeStyle=INK;g.beginPath();g.moveTo(-s*.04,-s*.18);g.lineTo(s*.04,-s*.18);g.stroke();
  g.fillStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.2,ey=-s*.18;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.06,ey-s*.06);g.lineTo(ex+s*.06,ey+s*.06);g.moveTo(ex+s*.06,ey-s*.06);g.lineTo(ex-s*.06,ey+s*.06);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex+s*.01,ey+s*.01,s*.06,0,TAU);g.fill();}}
  g.fillStyle='#f59e0b';g.beginPath();g.moveTo(-s*.07,-s*.04);g.lineTo(s*.07,-s*.04);g.lineTo(0,s*.08);g.closePath();g.fill();g.stroke();
  g.restore();}
function flask(g,cx,by,w,h,col,fill,t,glow){g.save();const nw=w*.28,bw=w;g.translate(cx,by);g.lineJoin='round';g.lineWidth=Math.max(2,w*.04);g.strokeStyle='#e6fffb';
  if(glow)K.glow(g,0,-h*.4,w*1.2,col,.5);
  const path=()=>{g.beginPath();g.moveTo(-nw/2,-h);g.lineTo(-nw/2,-h*.62);g.lineTo(-bw/2,-h*.08);g.quadraticCurveTo(-bw/2,0,-bw/2+w*.12,0);g.lineTo(bw/2-w*.12,0);g.quadraticCurveTo(bw/2,0,bw/2,-h*.08);g.lineTo(nw/2,-h*.62);g.lineTo(nw/2,-h);g.closePath();};
  path();g.fillStyle='rgba(230,255,251,.1)';g.fill();g.save();path();g.clip();const ly=-h*fill;const wob=Math.sin(t*3)*h*.012;const lg=g.createLinearGradient(0,ly,0,0);lg.addColorStop(0,K.rgba(col,.75));lg.addColorStop(1,K.rgba(col,.95));g.fillStyle=lg;g.fillRect(-bw,ly+wob,bw*2,-ly+5);
  g.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<4;k++){const ph=(t*.5+k*.27)%1;g.beginPath();g.arc(-bw*.3+k*bw*.2,-(h*fill)*ph,w*.03+k%2*w*.02,0,TAU);g.fill();}g.restore();
  path();g.stroke();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=w*.05;g.beginPath();g.moveTo(-bw*.32,-h*.5);g.lineTo(-bw*.4,-h*.15);g.stroke();
  g.fillStyle='#e6fffb';K.rr(g,-nw*.65,-h-h*.04,nw*1.3,h*.07,h*.02);g.fill();g.restore();}
function tile(g,x,y,w,h,u,text,col,o){o=o||{};g.save();g.globalAlpha=o.al==null?1:o.al;if(o.glow)K.glow(g,x+w/2,y+h/2,Math.max(w,h)*.9,col,.5);
  K.card(g,x,y,w,h,u*.12,o.fill||'#0f2f35',{stroke:o.bd||col,lw:Math.max(2.5,u*.08),blur:u*.2,dy:u*.06});g.fillStyle=col;g.fillRect(x+u*.08,y+u*.08,w-u*.16,Math.max(3,h*.08));
  if(o.no!=null)K.txt(g,String(o.no),x+u*.3,y+h*.22,{size:Math.min(u*.3,h*.16),color:col});
  QK.txt(g,text,x+w/2,y+h/2+h*.05,w-u*.3,h-u*.5,Math.min(u*.95,h*.34),o.ink||'#e6fffb');g.restore();}
function lab(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#12373d','#0f2a2e','#0a1d20']);g.save();g.strokeStyle='rgba(94,234,212,.08)';g.lineWidth=1;const gs=u*1.1;for(let x=0;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  for(let k=0;k<14;k++){const x=(k*131)%W,y=H-((t*u*.3*(1+k%3)+k*97)%H);g.fillStyle=`rgba(94,234,212,${.08+.06*(k%3)})`;g.beginPath();g.arc(x,y,u*(.08+k%3*.05),0,TAU);g.fill();}
  g.fillStyle='#0a1d20';g.fillRect(0,H-u*.4,W,u*.4);}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6:Math.min(W,H)/7;lab(g,W,H,u,T);
    const ks=['g','h','f'];const fw=wide?Math.min(u*1.5,W*.085):Math.min(u*2.2,W*.15);const fh=fw*1.4;const fcx=wide?W*.82:W*.5;const per=3,n=Math.floor(T/per),ph=(T%per)/per;
    ks.forEach((k,i)=>{const cx=fcx+(i-1)*fw*1.6;flask(g,cx,H*(wide?.82:.88),fw,fh,KIND[k].c,.35+.1*Math.sin(T+i)+(ks[n%3]===k&&ph>.55?.2:0),T,ks[n%3]===k&&ph>.55);});
    const tx=fcx+((n%3)-1)*fw*1.6;const dy=ph*(H*(wide?.82:.88)-fh-H*.2)+H*.18;if(ph<.6){K.glow(g,tx,dy,u*.8,'#5eead4',.6);tile(g,tx-u*.9,dy-u*.45,u*1.8,u*.9,u,['하늘','학교','컴퓨터'][n%3],KIND[ks[n%3]].c);}
    owl(g,wide?W*.12:W*.16,H*.8,u*1.6,ph>.6?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k13-word-lab',title:'낱말 연구소',title1:'낱말 박사의 실험실',title2:'낱말 연구소',emoji:LOGO,
  subtitle:'5~6학년 · 낱말의 짜임 · 고유어 · 한자어 · 외래어',
  howto:'낱말 박사가 되어 실험해요! 떨어지는 낱말 방울을 <b>고유어 · 한자어 · 외래어</b> 플라스크에 담고, 낱말 원소 두 개를 합쳐 <b>새 낱말(합성어)</b>을 만들고, 앞이나 뒤에 <b>뜻을 더하는 조각</b>을 붙여 낱말을 완성해요!',
  how:p=>({a:'낱말 방울을 알맞은 <b>플라스크</b>에 담기',b:'두 원소를 합쳐 <b>합성어</b> 만들기',c:'<b>뜻을 더하는 조각</b> 붙이기',all:'세 가지 실험이 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#0e7490',c2:'#a21caf'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 실험을 할까요?',
  txt:{who:'누가 박사가 될까요?',dur:'실험 시간',pace:'한 문제 시간',seat:'번 박사 ',go:'실험 시작!',s1:'1. 실험',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'5~6학년',t:'고유어 · 한자어 · 외래어',d:'하늘 · 학교 · 컴퓨터'},
    {id:'b',g:'5~6학년',t:'합성어 만들기',d:'손 + 수건 = 손수건'},
    {id:'c',g:'5~6학년',t:'뜻을 더하는 말 붙이기',d:'풋 + 사과 · 나무 + 꾼'},
    {id:'all',g:'5~6학년',t:'🌟 모두 섞기',d:'세 가지 실험이 번갈아 나와요'},
  ],
  summary:`<ul><li><b>고유어</b>는 본디부터 쓰던 우리말(하늘, 마음, 나무), <b>한자어</b>는 한자로 된 말(학교, 시간, 공부), <b>외래어</b>는 다른 나라에서 들어와 우리말처럼 쓰는 말(컴퓨터, 버스, 피아노)이에요.</li>
    <li><b>합성어</b>는 뜻이 있는 두 낱말이 합쳐져 새 낱말이 된 것이에요 (손 + 수건 = 손수건, 밤 + 나무 = 밤나무).</li>
    <li><b>파생어</b>는 낱말에 뜻을 더하는 조각이 붙어 만들어져요. 앞에 붙는 말(풋-, 맨-, 헛-, 햇-, 덧-)과 뒤에 붙는 말(-꾼, -쟁이, -질, -개, -보)이 있어요.</li>
    <li>낱말의 짜임을 알면 모르는 낱말도 뜻을 짐작할 수 있고, 새 낱말을 만들 수 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const pad=u*.3,gap=u*.25;const stripH=u*.95;const sy=Z0+u*.1;const q=p.state.q;
    const optH=Math.min(H*.2,u*2.5);const optY=H-optH-u*.5;const mainTop=sy+stripH+gap;return{W,H,u,Z0,land,pad,gap,sy,stripH,optH,optY,mainTop};},
  flaskRects(p){const G=this.geo(p);const top=G.mainTop+G.u*1.6,bot=G.H-G.u*.5;const h=bot-top;const w=(G.W-G.pad*2-G.gap*2)/3;return[0,1,2].map(i=>({x:G.pad+i*(w+G.gap),y:top,w,h}));},
  optRects(p){const G=this.geo(p);const n=3;const w=(G.W-G.pad*2-G.gap*2)/3;return[0,1,2].map(i=>({x:G.pad+i*(w+G.gap),y:G.optY,w,h:G.optH}));},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,made:[],T:0,lock:false,pick:-1,qt:0,qmax:0,mood:'neutral',mT:0,drop:null,pour:null,boom:0,rev:false});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const k=R.pick(['g','h','f']);const w=p.deck(k==='g'?GO:k==='h'?HAN:FOR,'dk_'+k);q.ty='kind';q.w=w[0];q.hint=w[1]||'';q.ans=k;q.text=`<b>${w[0]}</b>${J(w[0],'은').slice(w[0].length)} 어느 플라스크에 담을까요?`;
      q.reveal=`${w[0]} → ${{g:'고유어',h:'한자어',f:'외래어'}[k]}${w[1]?' ('+w[1]+')':''}`;}
    else if(L==='b'){const c=p.deck(COMP,'dk_b');q.ty='comp';q.a=c[0];q.ans=c[1];q.res=c[0]+c[1];q.words=R.shuffle([c[1],c[2],c[3]]);q.text=`<b>${c[0]}</b> 원소와 합쳐 <b>새 낱말</b>이 되는 것은?`;q.reveal=`${c[0]} + ${c[1]} = ${q.res}`;}
    else{const d=p.deck(DER,'dk_c');q.ty='der';q.root=d[0];q.ans=d[1];q.pre=d[6]==='pre';q.res=q.pre?d[1]+d[0]:d[0]+d[1];q.mean=d[2];q.words=R.shuffle([d[1],d[3],d[4]]);
      q.text=`<b>“${d[2]}”</b>${J(d[2],'을').slice(d[2].length)} 뜻하는 낱말을 만들어요!`;q.reveal=`${q.pre?d[1]+' + '+d[0]:d[0]+' + '+d[1]} = ${q.res} (${d[2]})`;}
    q.review=strip(q.text)+' → '+strip(q.reveal);return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.drop={y:0};st.pour=null;st.boom=0;st.rev=false;
    st.qmax=({kind:16,comp:18,der:20}[q.ty])/p.pace;st.qt=st.qmax;p.ask('🧪 '+q.text,q.ty==='kind'?'낱말 방울이 떨어지기 전에 플라스크를 눌러요':q.ty==='comp'?'합쳐서 새 낱말이 되는 원소를 골라요':'뜻에 맞는 조각을 골라요');},
  verdict(p,i,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.pick=i;let ok;
    if(q.ty==='kind'){ok=!timeout&&['g','h','f'][i]===q.ans;if(!timeout)st.pour={t:0,to:i};}else ok=!timeout&&q.words[i]===q.ans;
    st.mood=ok?'happy':'oops';st.mT=1.6;st.rev=true;st.boom=1;if(ok)st.made.push(q.ty==='kind'?q.w:q.res);const G=this.geo(p);
    p.hit(ok,{x:p.W/2,y:G.mainTop+G.u*1.5,tip:ok?undefined:`${timeout?'시간이 다 됐어요! ':''}${strip(q.reveal)}`,review:q.review,tipMs:ok?1000:3200});
    setTimeout(()=>{if(p.active)this.newQ(p);},ok?1300:2600);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.boom>0)st.boom=Math.max(0,st.boom-dt*1.2);if(st.pour)st.pour.t+=dt;
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;
    if(q.ty==='kind'){const i=this.flaskRects(p).findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}return;}
    const i=this.optRects(p).findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    lab(g,W,H,u,t);
    /* 만든 낱말 줄 */
    K.card(g,G.pad,G.sy,W-G.pad*2,G.stripH,u*.2,'rgba(8,24,26,.85)',{stroke:'#5eead4',lw:2,blur:u*.15,dy:u*.05});K.txt(g,'🧪 만든 낱말',G.pad+u*1.7,G.sy+G.stripH/2,{size:u*.4,color:'#5eead4',maxW:u*3});
    st.made.slice(-5).forEach((w,i)=>{const x=G.pad+u*3.6+i*Math.min(u*2.6,(W-u*5)/5.2);K.card(g,x,G.sy+u*.15,Math.min(u*2.4,(W-u*5)/5.5),G.stripH-u*.3,u*.1,'#17393f',{stroke:'#d946ef',lw:1.5,blur:0,dy:0});K.txt(g,w,x+Math.min(u*2.4,(W-u*5)/5.5)/2,G.sy+G.stripH/2,{size:u*.42,color:'#fff',maxW:Math.min(u*2.2,(W-u*5)/5.8)});});
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,u*.13);K.rr(g,W/2-bw/2,G.sy+G.stripH+u*.1,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.14)';g.fill();K.rr(g,W/2-bw/2,G.sy+G.stripH+u*.1,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#5eead4':(f>.2?'#fbbf24':'#f43f5e');g.fill();}
    if(q.ty==='kind'){const fr=this.flaskRects(p);const dropY0=G.mainTop+u*.4;const dropY1=fr[0].y-u*.2;
      fr.forEach((r,i)=>{const k=['g','h','f'][i];const kk=KIND[k];const fw=Math.min(r.w*.6,r.h*.6,u*4.2);const fh=Math.min(r.h*.72,fw*1.4);const correct=k===q.ans;const fill=.3+.12*Math.sin(t+i)+(st.lock&&correct&&st.pick===i?.25:0);
        flask(g,r.x+r.w/2,r.y+fh+u*.2,fw,fh,kk.c,fill,t,st.rev&&correct);
        K.txt(g,kk.t,r.x+r.w/2,r.y+fh+u*.2+u*.5,{size:Math.min(u*.8,(r.h-fh)*.45),color:kk.c,stroke:'rgba(0,0,0,.4)',lw:u*.08});K.txt(g,kk.s,r.x+r.w/2,r.y+fh+u*.2+u*1.1,{size:Math.min(u*.34,(r.h-fh)*.2),color:'#bfe9e4',maxW:r.w-u*.3});
        if(st.lock&&st.pick===i&&!correct){g.strokeStyle='#f43f5e';g.lineWidth=Math.max(3,u*.1);K.rr(g,r.x,r.y,r.w,r.h,u*.2);g.stroke();}if(st.rev&&correct){g.strokeStyle='#4ade80';g.lineWidth=Math.max(3,u*.1);K.rr(g,r.x,r.y,r.w,r.h,u*.2);g.stroke();}});
      /* 낱말 방울 */
      let dx=W/2,dy=dropY0+(dropY1-dropY0)*clamp(1-st.qt/st.qmax,0,1);
      if(st.pour){const f=clamp(st.pour.t/.6,0,1);const tr=fr[st.pour.to];dx=W/2+(tr.x+tr.w/2-W/2)*f;dy=dy+(tr.y+u*.8-dy)*f-Math.sin(f*Math.PI)*u*.8;}
      if(!(st.pour&&st.pour.t>.6)){K.glow(g,dx,dy,u*1.1,'#5eead4',.5);g.save();g.fillStyle='#d1fae5';g.strokeStyle='#5eead4';g.lineWidth=Math.max(2,u*.07);g.beginPath();g.ellipse(dx,dy,Math.max(u*1.2,u*.34*q.w.length),u*.62,0,0,TAU);g.fill();g.stroke();K.txt(g,q.w,dx,dy,{size:u*.62,color:'#064e3b',maxW:u*3.8});g.restore();}
      if(st.rev&&q.hint)K.txt(g,'('+q.hint+')',W/2,G.mainTop+u*.9,{size:u*.5,color:'#fde68a'});}
    else{const ts=Math.min(u*2.6,(W-G.pad*2)/6,(G.optY-G.mainTop-u*1.2)*.8);const cy=G.mainTop+(G.optY-G.mainTop-u*.4)/2-(q.ty==='der'?u*.4:0)-ts/2;const gx=Math.min(ts*.7,u*1.5);const total=ts*3+gx*2+ts*.6*2;
      let x=W/2-(ts*3+gx*2+ts*.5)/2;const pre=q.pre;const a=q.ty==='comp'?q.a:q.root;const pickW=st.pick>=0?q.words[st.pick]:null;const ok=pickW===q.ans;
      const slotText=pickW||'?';
      const aT=(txt,col,o)=>tile(g,x,cy,ts,ts,u,txt,col,o);
      const fixedFirst=!pre;const x0=x;
      /* [A] + [B] = [R] */
      const tA=pre?slotText:a,tB=pre?a:slotText;
      tile(g,x0,cy,ts,ts,u,tA,pre?(pickW?(ok?'#4ade80':'#f43f5e'):'#d946ef'):'#5eead4',{no:pre?'?':'1',fill:pre&&!pickW?'#1d1030':undefined,glow:st.boom>.5&&ok});
      K.txt(g,'＋',x0+ts+gx/2,cy+ts/2,{size:u*.9,color:'#e6fffb'});
      tile(g,x0+ts+gx,cy,ts,ts,u,tB,pre?'#5eead4':(pickW?(ok?'#4ade80':'#f43f5e'):'#d946ef'),{no:pre?'1':'?',fill:!pre&&!pickW?'#1d1030':undefined,glow:st.boom>.5&&ok});
      K.txt(g,'＝',x0+ts*2+gx*1.5,cy+ts/2,{size:u*.9,color:'#e6fffb'});
      const rx=x0+ts*2+gx*2;const sc=ok&&st.boom>0?1+Math.sin(st.boom*Math.PI)*.2:1;
      g.save();g.translate(rx+ts*.75,cy+ts/2);g.scale(sc,sc);g.translate(-ts*.75,-ts/2);tile(g,0,0,ts*1.5,ts,u,st.lock?(ok?q.res:'💨'):'?','#fbbf24',{no:'R',glow:st.boom>.5&&ok});g.restore();
      if(q.ty==='der')K.txt(g,'📝 '+q.mean,W/2,cy+ts+u*.6,{size:u*.5,color:'#fde68a',maxW:W-u});
      this.optRects(p).forEach((r,i)=>{const w=q.words[i];let col=['#5eead4','#d946ef','#fbbf24'][i];let o={};if(st.lock){if(w===q.ans){o={bd:'#4ade80',glow:true};col='#4ade80';}else if(st.pick===i){col='#f43f5e';}else o={al:.45};}
        tile(g,r.x,r.y,r.w,r.h,u,q.ty==='der'?(q.pre?w+'-':'-'+w):w,col,o);});}
    {const os=Math.min(u*1.3,H*.1);owl(g,u*.9,q.ty==='kind'?H-u*.85:G.optY-os*.65,os,st.mood,t);}},
};

Engine.boot(GAME);
