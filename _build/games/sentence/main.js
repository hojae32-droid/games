/* 5~6학년 · 국어 문장 성분의 호응 · 바른 문장 — 문장 수리 공방 (끝 부품 끼우기 · 시간·높임 맞추기 · 어색한 문장 고치기)
   디자인: 종이와 타자기 느낌의 수리 공방. 문장이 컨베이어로 들어오고, 알맞은 부품을 끼우면 기계의 불이 하나씩 켜져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2f26';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#94a3b8" stroke="#3b2f26" stroke-width="3"/><circle cx="24" cy="24" r="4" fill="#f4ead8" stroke="#3b2f26" stroke-width="2.5"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" stroke="#3b2f26" stroke-width="5" stroke-linecap="round"/><path d="M30 8l8 8" stroke="#c2410c" stroke-width="4" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
function gear(g,x,y,r,rot,col){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=col||'#94a3b8';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,r*.12);g.lineJoin='round';g.beginPath();const n=8;for(let i=0;i<n*2;i++){const a=i*Math.PI/n,rr=i%2?r*.78:r;const a2=a-Math.PI/n/2;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fill();g.stroke();g.fillStyle='#f4ead8';g.beginPath();g.arc(0,0,r*.32,0,TAU);g.fill();g.stroke();g.restore();}
function wrenchBear(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.02);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.6,s*.5,s*.09,.25);
  g.fillStyle='#64748b';K.rr(g,-s*.38,s*.05,s*.76,s*.5,s*.18);g.fill();g.stroke();g.fillStyle='#fbbf24';g.fillRect(-s*.38,s*.28,s*.76,s*.08);
  g.fillStyle='#a16207';for(const d of[-1,1]){g.beginPath();g.arc(d*s*.32,-s*.28,s*.14,0,TAU);g.fill();g.stroke();}
  g.fillStyle='#b9824b';g.beginPath();g.arc(0,-s*.12,s*.4,0,TAU);g.fill();g.stroke();g.fillStyle='#e5c9a3';g.beginPath();g.ellipse(0,0,s*.2,s*.15,0,0,TAU);g.fill();
  g.fillStyle='#f59e0b';g.beginPath();g.moveTo(-s*.42,-s*.22);g.quadraticCurveTo(0,-s*.78,s*.42,-s*.22);g.closePath();g.fill();g.stroke();g.fillStyle='#fde68a';g.fillRect(-s*.06,-s*.62,s*.12,s*.3);
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.16,ey=-s*.14;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();g.arc(0,-s*.04,s*.05,0,TAU);g.fill();g.beginPath();if(mood==='happy'){g.arc(0,s*.02,s*.1,0.1*Math.PI,.9*Math.PI);g.stroke();}else if(mood==='oops'){g.arc(0,s*.12,s*.07,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.moveTo(-s*.06,s*.06);g.lineTo(s*.06,s*.06);g.stroke();}
  g.restore();}
function speaker(g,x,y,s,on){g.save();g.translate(x,y);g.fillStyle=on?'#fde68a':'#fffaf0';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.07);K.rr(g,-s*.5,-s*.5,s,s,s*.18);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.moveTo(-s*.28,-s*.12);g.lineTo(-s*.1,-s*.12);g.lineTo(s*.08,-s*.28);g.lineTo(s*.08,s*.28);g.lineTo(-s*.1,s*.12);g.lineTo(-s*.28,s*.12);g.closePath();g.fill();g.lineWidth=Math.max(1.6,s*.06);g.beginPath();g.arc(s*.08,0,s*.18,-.9,.9);g.stroke();g.beginPath();g.arc(s*.08,0,s*.3,-.9,.9);g.stroke();g.restore();}
function shop(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#e8dcc4','#f4ead8','#e6d6b8']);g.save();g.strokeStyle='rgba(125,107,90,.18)';g.lineWidth=1;for(let y=u*.9;y<H;y+=u*.9){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  g.fillStyle='#475569';g.fillRect(0,H-u*.45,W,u*.45);}
function machine(g,x,y,w,h,u,t,lamps,lit,smoke,spark){K.card(g,x,y,w,h,u*.3,'#64748b',{stroke:INK,lw:Math.max(2,u*.07),blur:u*.4,dy:u*.12});
  g.fillStyle='#94a3b8';K.rr(g,x+u*.2,y+u*.2,w-u*.4,u*.55,u*.12);g.fill();
  /* 램프 */
  for(let i=0;i<lamps;i++){const lx=x+u*.5+i*u*.55,ly=y+u*.47;const on=i<lit;g.fillStyle=on?'#fde047':'#475569';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(lx,ly,u*.17,0,TAU);g.fill();g.stroke();if(on){K.glow(g,lx,ly,u*.5,'#fde047',.6);}}
  /* 리벳 */
  g.fillStyle='#cbd5e1';for(const [rx,ry] of[[x+u*.15,y+h-u*.2],[x+w-u*.15,y+h-u*.2],[x+u*.15,y+u*.9],[x+w-u*.15,y+u*.9]]){g.beginPath();g.arc(rx,ry,u*.07,0,TAU);g.fill();}
  gear(g,x+w-u*1.0,y+h-u*1.0,u*.55,t*1.2,'#cbd5e1');gear(g,x+w-u*.4,y+h-u*.55,u*.38,-t*1.7,'#fbbf24');
  /* 연기 / 불꽃 */
  if(smoke>0)for(let k=0;k<4;k++){const f=((t*1.2+k/4)%1);g.fillStyle=`rgba(71,85,105,${(1-f)*.6})`;g.beginPath();g.arc(x+w*.25+k*u*.4,y-f*u*1.2,u*(.2+f*.35),0,TAU);g.fill();}
  if(spark>0)for(let k=0;k<8;k++){const a=k*TAU/8+t*3,r=u*(.4+(1-spark)*1.2);g.fillStyle='#fde047';g.beginPath();g.arc(x+w/2+Math.cos(a)*r*1.5,y+h*.55+Math.sin(a)*r*.7,u*.06,0,TAU);g.fill();}}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const S=['나는 결코 친구를 속이지 않겠다.','만약 비가 온다면 소풍을 미룰 거야.','할머니께서 신문을 보신다.','내 꿈은 의사가 되는 것이다.'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;shop(g,W,H,u,T);
    const mw=Math.min(W*.8,u*14),mh=u*3.4,mx=W/2-mw/2+(wide?W*.06:0),my=H*(wide?.4:.5);const per=4,n=Math.floor(T/per),ph=(T%per)/per;
    machine(g,mx,my,mw,mh,u,T,8,1+(n%8),ph>.6&&ph<.8?1:0,ph>.45&&ph<.6?1-(ph-.45)/.15:0);
    const px=mx+u*.5+clamp(ph/.3,0,1)*(mw-u*1)*0+0;const pw=mw-u*1,ph_=u*1.3,py=my+mh*.5-ph_/2+u*.1;const slide=ph<.25?(1-ph/.25)*mw:0;const out=ph>.85?(ph-.85)/.15*mw:0;
    g.save();g.beginPath();g.rect(mx+u*.3,my+u*.9,mw-u*.6,mh-u*1.3);g.clip();
    g.fillStyle='#334155';g.fillRect(mx+u*.3,py+ph_-u*.1,mw-u*.6,u*.35);
    g.translate(-slide+out,0);K.card(g,px,py,pw,ph_,u*.12,'#fffaf0',{stroke:INK,lw:2,blur:u*.2,dy:u*.06});let fs=u*.5;g.font=K.font(fs);const txt=S[n%S.length];while(g.measureText(txt).width>pw-u*.5&&fs>8){fs*=.92;g.font=K.font(fs);}
    g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,px+pw/2,py+ph_/2);g.restore();
    wrenchBear(g,mx-u*.2,my+mh-u*.5,u*1.5,ph>.5&&ph<.85?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k15-sentence-repair',title:'문장 수리 공방',title1:'고장 난 문장 삽니다',title2:'문장 수리 공방',emoji:LOGO,
  subtitle:'5~6학년 · 문장 성분의 호응 · 바른 문장',
  howto:'고장 난 문장들이 수리 공방에 들어왔어요! 앞말과 <b>짝이 맞는(호응하는)</b> 끝 부품을 끼우고, 시간·높임에 맞게 서술어를 고치고, 어색한 문장 중에서 <b>제대로 고쳐진 문장</b>을 골라 출고해요. 수리가 끝나면 문장 기계에 불이 반짝 켜져요!',
  how:p=>({a:'앞말과 <b>짝이 맞는</b> 끝 부품 끼우기',b:'<b>시간 · 높임</b>에 맞는 서술어 고르기',c:'<b>바르게 고친 문장</b> 골라 출고!',all:'수리 종류가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#c2410c',c2:'#334155'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 수리를 맡을까요?',
  txt:{who:'누가 수리공이 될까요?',dur:'근무 시간',pace:'한 문제 시간',seat:'번 수리공 ',go:'수리 시작!',s1:'1. 수리',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'5~6학년',t:'짝이 맞는 말',d:'결코 ~지 않다 · 만약 ~라면 · 왜냐하면 ~때문이다'},
    {id:'b',g:'5~6학년',t:'시간 · 높임의 호응',d:'어제 ~었다 · 할머니께서 ~시다'},
    {id:'c',g:'6학년',t:'어색한 문장 고치기',d:'주어와 서술어 · 겹치는 말'},
    {id:'all',g:'5~6학년',t:'🌟 모두 섞기',d:'수리 종류가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>호응</b>: 앞에 오는 말과 뒤에 오는 말이 짝을 이루어야 해요. 결코·전혀·별로·도무지 → <b>~지 않다/없다</b>, 만약 → <b>~면</b>, 비록 → <b>~지만</b>, 왜냐하면 → <b>~때문이다</b>, 마치 → <b>~같다</b>.</li>
    <li><b>시간</b> 호응: 어제·작년 → 지난 일(-었-), 지금 → 하고 있는 일(-고 있다), 내일·다음 주 → 앞으로 할 일(-ㄹ 것이다).</li>
    <li><b>높임</b> 호응: 높여야 할 분에게는 <b>-시-</b>를 써요(할머니께서 보신다). 나를 낮출 때는 드리다·모시다를 써요.</li>
    <li>주어와 서술어가 짝이 맞아야 하고(내 꿈은 ~되는 것이다), <b>겹말</b>은 줄여요(역전 앞 → 역 앞, 다시 재발 → 재발).</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.2;const n=3;
    const bh=land?Math.min(H*.2,u*2.8):u*1.5,gap=u*.25;const ctrlH=land?bh:n*bh+(n-1)*gap;const cy0=H-ctrlH-u*.4;
    const mh=Math.min(Math.max(u*3.6,cy0-Z0-u*.8),u*6.2);const my=Z0+u*.5+Math.max(0,(cy0-Z0-u*.8-mh)/2);const mw=Math.min(W*.92,u*20);const mx=(W-mw)/2;
    return{W,H,u,Z0,land,bh,gap,ctrlH,cy0,mx,my,mw,mh};},
  ctrlRects(p){const G=this.geo(p),gx=G.u*.3;const out=[];if(G.land){const w=(G.W-gx*2-G.gap*2)/3;for(let i=0;i<3;i++)out.push({x:gx+i*(w+G.gap),y:G.cy0,w,h:G.bh});}else for(let i=0;i<3;i++)out.push({x:gx,y:G.cy0+i*(G.bh+G.gap),w:G.W-gx*2,h:G.bh});return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,fixed:0,T:0,lock:false,pick:-1,qt:0,qmax:0,mood:'neutral',mT:0,smoke:0,spark:0,enter:1,exit:0,speakT:0,showKey:null});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'||L==='b'){const s=R.pick(L==='a'?PAIR:TIME);q.ty='part';q.glue=s[0].endsWith('+');q.head=s[0].replace(/\+$/,'');q.ans=s[1];q.opts=R.shuffle([s[1],s[2],s[3]]).map(t=>({t,ok:t===s[1]}));q.key=s[4]||'';
      q.text='앞말과 <b>짝이 맞는</b> 끝 부품을 골라 끼워요!';q.reveal=q.head+(q.glue?'':' ')+s[1];q.speak=q.head;q.review=q.reveal+(q.key?` (${q.key})`:'');}
    else{const s=R.pick(FIX);q.ty='fix';q.ans=s[0];q.opts=R.shuffle([s[0],s[1],s[2]]).map(t=>({t,ok:t===s[0]}));q.key=s[3];q.text='바르게 <b>고쳐진 문장</b>을 골라 출고해요!';q.reveal=`${s[0]} (${s[3]})`;q.review=q.reveal;q.speak=s[1];}
    return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.enter=1;st.exit=0;st.showKey=null;
    st.qmax=16/p.pace;st.qt=st.qmax;p.ask('🔧 '+q.text,q.ty==='part'?'끝 부품이 앞말과 어울리는지 살펴봐요':'어색한 곳이 없는 문장이 정답이에요');},
  say(p){const st=p.state;const q=st.q;if(!q)return;try{const sp=window.speechSynthesis;sp.cancel();const m=q.ty==='part'?q.head:q.speak;const u=new SpeechSynthesisUtterance(m);u.lang='ko-KR';u.rate=.95;sp.speak(u);st.speakT=1;}catch(e){}},
  verdict(p,i,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;const ok=!timeout&&q.opts[i].ok;st.pick=i;
    st.mood=ok?'happy':'oops';st.mT=1.6;if(ok){st.fixed++;st.spark=1;}else st.smoke=2;st.showKey=q.key||null;
    const G=this.geo(p);p.hit(ok,{x:p.W/2,y:G.my+G.mh*.3,tip:ok?(q.key?'💡 '+q.key:undefined):`${timeout?'시간이 다 됐어요! ':''}정답: ${q.reveal}${q.key?' · 💡 '+q.key:''}`,review:q.review,tipMs:ok?1500:3200});
    if(ok&&st.qt>st.qmax*.6)p.add(10,p.W/2,G.my);
    setTimeout(()=>{st.exit=1;},ok?900:2000);setTimeout(()=>{if(p.active)this.newQ(p);},ok?1400:2500);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.smoke>0)st.smoke-=dt;if(st.spark>0)st.spark-=dt*1.5;if(st.speakT>0)st.speakT-=dt;
    if(st.enter>0)st.enter=Math.max(0,st.enter-dt*2.2);if(st.exit>0&&st.exit<1.5)st.exit+=dt*2.2;
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;const G=this.geo(p);
    const sx=G.mx+G.mw-G.u*.7,sy=G.my+G.u*.47;if(Math.hypot(x-sx,y-sy)<G.u*.6){this.say(p);return;}
    if(st.lock)return;const rs=this.ctrlRects(p);const i=rs.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    shop(g,W,H,u,t);
    const lamps=Math.max(4,Math.min(10,Math.floor((G.mw-u*7)/(u*.55))));machine(g,G.mx,G.my,G.mw,G.mh,u,t,lamps,st.fixed%(lamps+1),st.smoke>0?1:0,st.spark);
    /* 말하기 버튼 + 수리 건수 */
    speaker(g,G.mx+G.mw-u*.7,G.my+u*.47,u*.55,st.speakT>0);
    K.txt(g,`수리 완료 ${st.fixed}건`,G.mx+G.mw-u*2.8,G.my+u*.47,{size:u*.34,color:INK,maxW:u*3.0});
    /* 타이머 */
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=G.mw-u*.8,bh=Math.max(4,u*.12);K.rr(g,G.mx+u*.4,G.my+u*.8,bw,bh,bh/2);g.fillStyle='rgba(0,0,0,.25)';g.fill();K.rr(g,G.mx+u*.4,G.my+u*.8,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#fde047':(f>.2?'#fb923c':'#ef4444');g.fill();}
    /* 벨트 + 문장 판 */
    const by=G.my+u*1.1,bh=G.mh-u*1.5,pw=G.mw-u*1.2,pxx=G.mx+u*.6;g.save();g.beginPath();g.rect(G.mx+u*.25,by-u*.1,G.mw-u*.5,bh+u*.2);g.clip();
    g.fillStyle='#334155';g.fillRect(G.mx+u*.25,by+bh*.78,G.mw-u*.5,bh*.2);g.fillStyle='rgba(255,255,255,.15)';for(let xx=(t*u*1.3)%(u*.7)-u*.7;xx<G.mw;xx+=u*.7)g.fillRect(G.mx+u*.25+xx,by+bh*.8,u*.25,bh*.16);
    const dx=-st.enter*(G.mw)+Math.min(1,st.exit)*G.mw*(st.pick>=0&&q.opts[st.pick]&&q.opts[st.pick].ok?1:0);const sh=st.smoke>0&&st.pick>=0&&!q.opts[st.pick].ok?Math.sin(t*40)*u*.05:0;
    g.translate(dx+sh,0);const plateH=bh*.72,plateY=by+bh*.02;K.card(g,pxx,plateY,pw,plateH,u*.15,'#fffaf0',{stroke:INK,lw:Math.max(2,u*.05),blur:u*.25,dy:u*.08});
    this.plate(g,q,st,pxx,plateY,pw,plateH,u,t);g.restore();
    {const bs=Math.min(u*1.5,G.mw*.12);wrenchBear(g,Math.max(G.mx-u*.1,bs*.6),G.my+G.mh-u*.55,bs,st.mood,t);}
    /* 설명 쪽지 */
    if(st.showKey){const tw=Math.min(G.mw,u*16);K.card(g,W/2-tw/2,G.my+G.mh+u*.1,tw,u*.75,u*.15,'#fef3c7',{stroke:'#b45309',lw:2,blur:u*.2,dy:u*.06});K.txt(g,'💡 '+st.showKey,W/2,G.my+G.mh+u*.1+u*.37,{size:u*.4,color:'#78350f',maxW:tw-u*.4});}
    /* 보기 */
    const rs=this.ctrlRects(p);rs.forEach((r,i)=>{const o=q.opts[i];let fill='#fffaf0',bd=INK,al=1;
      if(st.lock){if(o.ok){fill='#dcfce7';bd='#15803d';}else if(st.pick===i){fill='#fee2e2';bd='#b91c1c';}else al=.5;}
      g.save();g.globalAlpha=al;K.card(g,r.x,r.y,r.w,r.h,u*.15,fill,{stroke:bd,lw:Math.max(2,u*.06),blur:0,dy:u*.08,sc:'rgba(59,47,38,.9)'});
      if(q.ty==='part')gear(g,r.x+u*.6,r.y+r.h/2,Math.min(u*.4,r.h*.3),t*(st.lock?0:1.5),'#94a3b8');else{g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=2;K.rr(g,r.x+u*.28,r.y+r.h/2-u*.35,u*.55,u*.7,u*.06);g.fill();g.stroke();g.strokeStyle='#94a3b8';g.lineWidth=1.5;for(let k=0;k<3;k++){g.beginPath();g.moveTo(r.x+u*.38,r.y+r.h/2-u*.18+k*u*.17);g.lineTo(r.x+u*.73,r.y+r.h/2-u*.18+k*u*.17);g.stroke();}}
      const tx=r.x+u*1.15,tw=r.w-u*1.4;let fs=Math.min(u*.6,r.h*.34);g.font=K.font(fs);let lines=K.wrap(g,o.t,tw);while((lines.length*fs*1.25>r.h-u*.25||lines.some(l=>g.measureText(l).width>tw))&&fs>8){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,o.t,tw);}
      g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,k)=>g.fillText(l,tx+tw/2,r.y+r.h/2+(k-(lines.length-1)/2)*fs*1.25));
      if(st.lock&&(o.ok||st.pick===i))K.emo(g,o.ok?'✅':'❌',r.x+r.w-u*.35,r.y+u*.35,u*.5);g.restore();});},
  plate(g,q,st,x,y,w,h,u,t){g.save();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';
    if(q.ty==='part'){const gapTxt=st.lock?q.ans:'⚙ ?';const full=q.head+(q.glue?'':' ');const maxW=w-u*.7;let fs=Math.min(u*.75,h*.4);
      const meas=()=>{g.font=K.font(fs);return[g.measureText(full).width,Math.max(g.measureText(gapTxt).width+u*.3,u*.9)];};
      let [w1,w2]=meas();let rows=[[full,gapTxt]];
      if(w1+w2>maxW){let f0=fs;while(w1+w2>maxW&&fs>f0*.66){fs*=.94;[w1,w2]=meas();}
        if(w1+w2>maxW){fs=Math.min(u*.66,h*.3);const words=full.split(' ');const mid=Math.ceil(words.length/2);const r1=words.slice(0,mid).join(' '),r2=words.slice(mid).join(' ')+' ';rows=[[r1,null],[r2,gapTxt]];
          const mm=()=>{g.font=K.font(fs);return Math.max(g.measureText(r1).width,g.measureText(r2).width+Math.max(g.measureText(gapTxt).width+u*.3,u*.9));};let tries=0;while(mm()>maxW&&fs>9&&tries<30){fs*=.94;tries++;}}}
      g.font=K.font(fs);
      const lh=fs*1.35;const y0=y+h/2-((rows.length-1)*lh)/2;rows.forEach((r,i)=>{const a=r[0],b=r[1];const wa=g.measureText(a).width,wb=b?Math.max(g.measureText(b).width+u*.3,u*.9):0;const tot=wa+wb;let sx=x+w/2-tot/2;g.textAlign='left';g.fillStyle=INK;g.fillText(a,sx,y0+i*lh);
        if(b){const bx=sx+wa,by=y0+i*lh;g.save();const ok=st.lock&&st.pick>=0&&q.opts[st.pick]&&q.opts[st.pick].ok;g.fillStyle=st.lock?(ok?'#dcfce7':'#fee2e2'):'rgba(194,65,12,.12)';K.rr(g,bx,by-fs*.62,wb,fs*1.24,u*.1);g.fill();g.strokeStyle=st.lock?(ok?'#15803d':'#b91c1c'):'#c2410c';g.lineWidth=2;g.setLineDash(st.lock?[]:[u*.12,u*.1]);g.stroke();g.setLineDash([]);g.fillStyle=st.lock?(ok?'#14532d':'#7f1d1d'):'#c2410c';g.textAlign='center';g.fillText(b,bx+wb/2,by);g.restore();}});}
    else{const txt=st.lock?q.ans:'어색한 문장 수리 중…';let fs=Math.min(u*.7,h*.38);g.font=K.font(fs);let lines=K.wrap(g,txt,w-u*.8);while(lines.length*fs*1.3>h-u*.3&&fs>9){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,txt,w-u*.8);}
      lines.forEach((l,i)=>g.fillText(l,x+w/2,y+h/2+(i-(lines.length-1)/2)*fs*1.3));if(!st.lock){gear(g,x+u*.6,y+h/2,u*.4,t*2,'#94a3b8');gear(g,x+w-u*.6,y+h/2,u*.4,-t*2,'#fbbf24');}}
    g.restore();},
};

Engine.boot(GAME);
