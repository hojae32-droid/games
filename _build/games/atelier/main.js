/* 5~6학년 국어 · 비유하는 표현 — 비유 화가의 아틀리에 (직유·은유 가리기, 비유하는 대상 고르기, 닮은 점 찾기)
   디자인: 크림색 종이와 보라·주황 물감. 맞힐 때마다 캔버스에 그림이 하나씩 그려져 작품이 완성돼요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b1d5a';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 5c10 0 19 7 19 16 0 5-4 7-8 7h-5c-3 0-4 3-2 5 2 3 0 9-6 9C12 42 5 34 5 24 5 13 13 5 24 5z" fill="#fde68a" stroke="#3b1d5a" stroke-width="3" stroke-linejoin="round"/><circle cx="15" cy="22" r="3.5" fill="#c026d3"/><circle cx="22" cy="14" r="3.5" fill="#f97316"/><circle cx="32" cy="16" r="3.5" fill="#22d3ee"/><circle cx="14" cy="32" r="3.5" fill="#84cc16"/></svg>';
/*@@DATA@@*/
/* 스티커 그림 (i번째, 중심 x,y, 크기 s) */
function art(g,i,x,y,s){g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;const k=i%12;
  const circ=(a,b,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(a,b,r,0,TAU);g.fill();g.stroke();};
  if(k===0){for(let j=0;j<10;j++){const a=j*TAU/10;g.beginPath();g.moveTo(Math.cos(a)*s*.4,Math.sin(a)*s*.4);g.lineTo(Math.cos(a)*s*.62,Math.sin(a)*s*.62);g.stroke();}circ(0,0,s*.36,'#fde047');circ(-s*.12,-s*.05,s*.04,INK);circ(s*.12,-s*.05,s*.04,INK);g.beginPath();g.arc(0,s*.04,s*.12,.2,Math.PI-.2);g.stroke();}
  else if(k===1){g.fillStyle='#92400e';g.fillRect(-s*.08,s*.1,s*.16,s*.4);g.strokeRect(-s*.08,s*.1,s*.16,s*.4);circ(0,-s*.15,s*.34,'#4ade80');circ(-s*.25,0,s*.22,'#22c55e');circ(s*.25,0,s*.22,'#22c55e');}
  else if(k===2){g.strokeStyle='#16a34a';g.lineWidth=s*.08;g.beginPath();g.moveTo(0,s*.5);g.lineTo(0,0);g.stroke();g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;g.fillStyle='#f472b6';g.beginPath();g.moveTo(-s*.25,-s*.35);g.quadraticCurveTo(-s*.28,s*.05,0,s*.05);g.quadraticCurveTo(s*.28,s*.05,s*.25,-s*.35);g.lineTo(s*.1,-s*.15);g.lineTo(0,-s*.4);g.lineTo(-s*.1,-s*.15);g.closePath();g.fill();g.stroke();}
  else if(k===3){g.fillStyle='#c4b5fd';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.3,-s*.12,s*.28,s*.34,d*.4,0,TAU);g.fill();g.stroke();g.beginPath();g.ellipse(d*s*.22,s*.22,s*.18,s*.22,-d*.4,0,TAU);g.fill();g.stroke();}g.fillStyle=INK;K.rr(g,-s*.05,-s*.3,s*.1,s*.6,s*.05);g.fill();}
  else if(k===4){g.fillStyle='#fecaca';g.fillRect(-s*.4,-s*.05,s*.8,s*.5);g.strokeRect(-s*.4,-s*.05,s*.8,s*.5);g.fillStyle='#ef4444';g.beginPath();g.moveTo(-s*.5,-s*.05);g.lineTo(0,-s*.5);g.lineTo(s*.5,-s*.05);g.closePath();g.fill();g.stroke();g.fillStyle='#fde047';g.fillRect(-s*.1,s*.15,s*.2,s*.3);g.strokeRect(-s*.1,s*.15,s*.2,s*.3);}
  else if(k===5){const cols=['#ef4444','#f59e0b','#fde047','#4ade80','#38bdf8','#818cf8'];g.lineWidth=s*.1;cols.forEach((c,j)=>{g.strokeStyle=c;g.beginPath();g.arc(0,s*.3,s*(.55-j*.07),Math.PI,TAU);g.stroke();});}
  else if(k===6){g.fillStyle='#fff';g.beginPath();g.arc(-s*.2,s*.05,s*.22,0,TAU);g.arc(s*.05,-s*.08,s*.3,0,TAU);g.arc(s*.3,s*.08,s*.2,0,TAU);g.rect(-s*.2,s*.05,s*.5,s*.22);g.fill();g.stroke();}
  else if(k===7){g.fillStyle='#fde047';g.beginPath();for(let j=0;j<10;j++){const a=j*Math.PI/5-Math.PI/2,r=j%2?s*.2:s*.5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.stroke();}
  else if(k===8){g.fillStyle='#fde68a';g.beginPath();g.arc(0,0,s*.45,0,TAU);g.fill();g.stroke();g.fillStyle='#fef3c7';g.beginPath();g.arc(s*.18,-s*.08,s*.36,0,TAU);g.fill();g.fillStyle='#fff';}
  else if(k===9){circ(0,s*.05,s*.38,'#ef4444');g.strokeStyle='#92400e';g.beginPath();g.moveTo(0,-s*.3);g.lineTo(s*.05,-s*.5);g.stroke();g.fillStyle='#4ade80';g.beginPath();g.ellipse(s*.15,-s*.42,s*.14,s*.07,-.5,0,TAU);g.fill();g.stroke();}
  else if(k===10){g.strokeStyle=INK;g.beginPath();g.moveTo(0,s*.35);g.quadraticCurveTo(s*.1,s*.5,-s*.05,s*.62);g.stroke();g.fillStyle='#60a5fa';g.beginPath();g.ellipse(0,-s*.1,s*.34,s*.42,0,0,TAU);g.fill();g.stroke();}
  else{g.fillStyle='#fb923c';g.beginPath();g.ellipse(0,0,s*.42,s*.26,0,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(s*.38,0);g.lineTo(s*.62,-s*.2);g.lineTo(s*.62,s*.2);g.closePath();g.fill();g.stroke();circ(-s*.2,-s*.05,s*.05,INK);}
  g.restore();}
function painter(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.015);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;K.shadow(g,0,s*.55,s*.45,s*.08,.25);
  g.fillStyle='#f97316';g.beginPath();g.moveTo(-s*.42,s*.55);g.quadraticCurveTo(-s*.42,s*.14,0,s*.12);g.quadraticCurveTo(s*.42,s*.14,s*.42,s*.55);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff';for(const [a,b,c] of[['#c026d3',-.18,.3],['#22d3ee',.08,.4],['#84cc16',.2,.28]]){g.fillStyle=a;g.beginPath();g.arc(b*s,c*s,s*.05,0,TAU);g.fill();}
  g.fillStyle='#f5cfa8';g.beginPath();g.arc(0,-s*.1,s*.36,0,TAU);g.fill();g.stroke();
  g.fillStyle='#7e22ce';g.beginPath();g.ellipse(-s*.04,-s*.4,s*.42,s*.16,-.15,0,TAU);g.fill();g.stroke();g.beginPath();g.arc(s*.1,-s*.56,s*.06,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.04);g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.14,ey=-s*.08;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.05,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.04,s*.09,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.12,s*.07,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,s*.0,s*.08,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
function easel(g,x,y,w,h,u){g.save();g.strokeStyle='#92400e';g.lineWidth=Math.max(4,u*.18);g.lineCap='round';g.beginPath();g.moveTo(x+w*.2,y+h);g.lineTo(x+w*.12,y+h+u*.7);g.moveTo(x+w*.8,y+h);g.lineTo(x+w*.88,y+h+u*.7);g.stroke();g.restore();
  K.card(g,x-u*.2,y-u*.2,w+u*.4,h+u*.4,u*.15,'#b45309',{stroke:INK,lw:Math.max(2,u*.06),blur:u*.3,dy:u*.1});g.fillStyle='#fffdf5';K.rr(g,x,y,w,h,u*.08);g.fill();g.strokeStyle='rgba(59,29,90,.2)';g.lineWidth=2;g.stroke();}
function atelierBg(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#fdf3e0','#f8e8cf','#f3dcc0']);
  g.fillStyle='rgba(192,38,211,.1)';g.beginPath();g.arc(W*.1,H*.15,u*2.4,0,TAU);g.fill();g.fillStyle='rgba(249,115,22,.12)';g.beginPath();g.arc(W*.92,H*.3,u*2,0,TAU);g.fill();g.fillStyle='rgba(34,211,238,.12)';g.beginPath();g.arc(W*.75,H*.9,u*2.2,0,TAU);g.fill();
  g.fillStyle='#b45309';g.fillRect(0,H-u*.35,W,u*.35);}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6.5:Math.min(W,H)/7;atelierBg(g,W,H,u,T);
    const ew=Math.min(W*(wide?.38:.6),u*7),eh=ew*.72,ex=W*(wide?.7:.5)-ew/2,ey=H*(wide?.2:.34);easel(g,ex,ey,ew,eh,u);
    const n=Math.floor((T/1.1)%13);const pos=[[.2,.25],[.7,.2],[.45,.45],[.25,.7],[.75,.65],[.5,.75],[.15,.45],[.85,.42],[.55,.2],[.35,.5],[.65,.45],[.3,.25]];
    for(let i=0;i<Math.min(n,12);i++){const sc=clamp((T/1.1-i),0,1);art(g,i,ex+ew*pos[i][0],ey+eh*pos[i][1],ew*.22*(.5+.5*Math.min(1,sc*2)));}
    painter(g,wide?W*.22:W*.2,H*.78,u*1.7,n%3===0?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'k12-metaphor-atelier',title:'비유 화가의 아틀리에',title1:'말로 그리는 그림',title2:'비유 화가의 아틀리에',emoji:LOGO,
  subtitle:'5~6학년 · 비유하는 표현 · 직유와 은유',
  howto:'말로 그림을 그리는 비유 화가! 문장이 <b>직유</b>인지 <b>은유</b>인지 붓을 골라 칠하고, 빈칸에 어울리는 <b>비유하는 대상</b>을 넣고, 무엇이 <b>닮았는지</b> 찾아요. 맞힐 때마다 캔버스에 그림이 하나씩 채워져요!',
  how:p=>({a:'문장에 어울리는 <b>붓</b>(직유·은유) 고르기',b:'빈칸에 어울리는 <b>비유 대상</b> 넣기',c:'둘의 <b>닮은 점</b> 찾기',all:'세 가지 그림 그리기가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#7e22ce',c2:'#ea580c'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 그림을 그릴까요?',
  txt:{who:'누가 화가가 될까요?',dur:'작업 시간',pace:'한 문제 시간',seat:'번 화가 ',go:'그리기 시작!',s1:'1. 그림',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'a',g:'5~6학년',t:'직유와 은유',d:'~처럼 · ~같이 / A는 B이다'},
    {id:'b',g:'5~6학년',t:'비유하는 대상 고르기',d:'( )처럼 빠르다'},
    {id:'c',g:'5~6학년',t:'닮은 점 찾기',d:'무엇이 어떤 점에서 닮았을까?'},
    {id:'all',g:'5~6학년',t:'🌟 모두 섞기',d:'세 가지가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>비유</b>는 어떤 대상을 그와 비슷한 다른 대상에 빗대어 나타내는 표현이에요. 말하려는 대상(원관념)과 빗댄 대상(보조관념)은 서로 닮은 점이 있어요.</li>
    <li><b>직유</b>는 ‘~처럼, ~같이, ~듯이’를 써서 직접 비유해요 (동생은 다람쥐처럼 재빠르다).</li>
    <li><b>은유</b>는 ‘A는 B이다’처럼 연결하는 말 없이 빗대어요 (내 마음은 호수이다).</li>
    <li>비유를 쓰면 느낌이 생생해져요. 비유 대상을 고를 때는 두 대상의 <b>닮은 점</b>이 무엇인지 생각해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const land=W>=H*1.15;const q=p.state.q;const n=q?q.opts.length:3;const rowMode=q?q.ty!=='common':true;
    const bh=land?Math.min(H*.17,u*2.4):(rowMode?u*1.6:u*1.5),gap=u*.22;const ctrlH=rowMode?bh:n*bh+(n-1)*gap;const cy0=H-ctrlH-u*.4;
    const fh=Math.min(u*2.6,(cy0-Z0)*.26);const fy=Z0+u*.15;const ey0=fy+fh+u*.5;const eh0=cy0-ey0-u*.9;
    return{W,H,u,Z0,land,rowMode,bh,gap,ctrlH,cy0,fh,fy,ey0,eh0,n};},
  ctrlRects(p){const G=this.geo(p),gx=G.u*.3,n=G.n;const out=[];if(G.rowMode){const w=(G.W-gx*2-G.gap*(n-1))/n;for(let i=0;i<n;i++)out.push({x:gx+i*(w+G.gap),y:G.cy0,w,h:G.bh});}else for(let i=0;i<n;i++)out.push({x:gx,y:G.cy0+i*(G.bh+G.gap),w:G.W-gx*2,h:G.bh});return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,n:0,art:[],made:0,T:0,lock:false,pick:-1,qt:0,qmax:0,mood:'neutral',mT:0,flash:0,fly:null});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='a'){const k=R.pick(['s','s','m','m','n']);const s=p.deck(k==='s'?SIM:k==='m'?MET:NON,'dk_'+k);q.ty='kind';q.k=k;q.sent=s;q.text='이 문장에는 어떤 <b>붓</b>이 어울릴까요?';
      q.opts=[['s','직유','~처럼 · ~같이 · ~듯이','#38bdf8'],['m','은유','A는 B이다','#fb923c'],['n','비유 아님','있는 그대로 말함','#a3a3a3']].map(o=>({t:o[1],sub:o[2],col:o[3],ok:o[0]===k}));
      q.reveal=`${s} → ${k==='s'?'직유':k==='m'?'은유':'비유 아님'}`;}
    else if(L==='b'){const s=p.deck(FILL,'dk_b');q.ty='fill';q.sent=s[0];q.ans=s[1];q.opts=R.shuffle([s[1],s[2],s[3]]).map(t=>({t,ok:t===s[1]}));q.text='빈칸에 어울리는 <b>비유하는 대상</b>은?';q.reveal=s[0].replace('@',s[1]);}
    else{const s=p.deck(COMMON,'dk_c');q.ty='common';q.sent=s[0];q.text=`<b>${s[1]}</b>${J(s[1],'과').slice(s[1].length)} <b>${s[2]}</b>의 <b>닮은 점</b>은?`;q.opts=R.shuffle([s[3],s[4],s[5]]).map(t=>({t,ok:t===s[3]}));q.reveal=s[3];}
    q.review=strip(q.sent)+' → '+strip(q.reveal);return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['a','b','c'][st.n%3]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.fly=null;st.qmax=18/p.pace;st.qt=st.qmax;
    p.ask('🎨 '+q.text,q.ty==='kind'?'알맞은 붓을 골라 칠해요':q.ty==='fill'?'어울리는 말을 넣어 문장을 완성해요':'두 대상의 닮은 점을 찾아요');},
  verdict(p,i,timeout){const st=p.state,q=st.q;if(st.lock)return;st.lock=true;st.pick=i;const ok=!timeout&&q.opts[i].ok;st.mood=ok?'happy':'oops';st.mT=1.6;const G=this.geo(p);
    if(ok){const n=st.art.length;const pos=[Math.random()*.72+.14,Math.random()*.6+.2];st.art.push([n,pos[0],pos[1]]);st.made++;st.fly={t:0,i:n,x:pos[0],y:pos[1]};st.flash=1;}
    p.hit(ok,{x:p.W/2,y:G.ey0,tip:ok?undefined:`${timeout?'시간이 다 됐어요! ':''}정답: ${strip(q.reveal)}`,review:q.review,tipMs:ok?1000:3000});
    setTimeout(()=>{if(p.active){if(st.art.length>=12){st.art=[];st.flash=-1;}this.newQ(p);}},ok?1300:2600);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.flash>0)st.flash=Math.max(0,st.flash-dt*1.5);if(st.fly)st.fly.t+=dt;
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  down(p,x,y){const st=p.state;if(!st.q||st.lock)return;const i=this.ctrlRects(p).findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    atelierBg(g,W,H,u,t);
    /* 문장 액자 */
    const fw=Math.min(W*.92,u*20);K.card(g,W/2-fw/2,G.fy,fw,G.fh,u*.3,'#fff',{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.1,sc:INK});
    let txt='“'+q.sent+'”';let blank=null;
    if(q.ty==='fill'){const parts=q.sent.split('@');const pick=st.pick>=0?q.opts[st.pick].t:null;const f=QK.fit(g,parts[0]+'[   ?   ]'+parts[1],fw-u*.8,G.fh-u*.3,Math.min(u*.9,G.fh*.34),1.2);g.font=K.font(f.fs);
      const full=parts[0]+(pick||'   ?   ')+parts[1];g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';
      /* 한 줄이면 빈칸 강조, 여러 줄이면 그냥 */
      const lines=K.wrap(g,'“'+parts[0]+(pick||'   ?   ')+parts[1]+'”',fw-u*.8);let fs=f.fs;
      if(lines.length===1){const w1=g.measureText('“'+parts[0]).width,wb=Math.max(g.measureText(pick||'   ?   ').width+u*.3,u),w2=g.measureText(parts[1]+'”').width;let sx=W/2-(w1+wb+w2)/2;g.textAlign='left';g.fillText('“'+parts[0],sx,G.fy+G.fh/2);
        const ok=pick&&q.opts[st.pick].ok;g.fillStyle=pick?(ok?'#bbf7d0':'#fecaca'):'rgba(192,38,211,.15)';K.rr(g,sx+w1,G.fy+G.fh/2-fs*.65,wb,fs*1.3,u*.12);g.fill();g.strokeStyle=pick?(ok?'#16a34a':'#dc2626'):'#c026d3';g.lineWidth=2;g.stroke();g.fillStyle=INK;g.textAlign='center';g.fillText(pick||'?',sx+w1+wb/2,G.fy+G.fh/2);g.textAlign='left';g.fillText(parts[1]+'”',sx+w1+wb,G.fy+G.fh/2);}
      else QK.txt(g,'“'+parts[0]+(pick||'(   ?   )')+parts[1]+'”',W/2,G.fy+G.fh/2,fw-u*.8,G.fh-u*.3,Math.min(u*.9,G.fh*.34),INK);}
    else QK.txt(g,txt,W/2,G.fy+G.fh/2,fw-u*.8,G.fh-u*.3,Math.min(u*.95,G.fh*.36),INK);
    /* 이젤과 캔버스 */
    const ew=Math.min(W*.8,G.eh0*1.4,u*14),eh=Math.max(u*2,Math.min(G.eh0,ew*.72)),ex=W/2-ew/2,ey=G.ey0;easel(g,ex,ey,ew,eh,u*Math.min(1,eh/(u*5)+.4));
    if(st.flash>0||st.flash<0)K.glow(g,W/2,ey+eh/2,ew*.6,st.flash>0?'#fde68a':'#ffffff',Math.abs(st.flash)*.4);
    st.art.forEach((a,k)=>{const sc=st.fly&&st.fly.i===a[0]?Math.min(1,st.fly.t*2.5):1;art(g,a[0],ex+ew*a[1],ey+eh*a[2],Math.min(ew,eh*1.3)*.2*(.4+.6*sc));});
    g.save();g.textAlign='right';K.txt(g,`🖼️ ${st.art.length} / 12 · 완성 ${Math.floor(st.made/12)}점`,W-u*2.6,G.cy0-u*.28,{size:u*.34,color:INK,maxW:u*5});g.restore();
    /* 타이머 */
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*10),bh=Math.max(5,u*.13);K.rr(g,W/2-bw/2,G.cy0-u*.3,bw,bh,bh/2);g.fillStyle='rgba(59,29,90,.15)';g.fill();K.rr(g,W/2-bw/2,G.cy0-u*.3,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#c026d3':(f>.2?'#f97316':'#ef4444');g.fill();}
    painter(g,Math.max(u*1.1,ex-u*.3),G.cy0-u*1.3,Math.min(u*1.5,G.eh0*.4),st.mood,t);
    /* 보기 */
    this.ctrlRects(p).forEach((r,i)=>{const o=q.opts[i];let stt='idle';if(st.lock){if(o.ok)stt='ok';else if(st.pick===i)stt='bad';else stt='dim';}
      if(q.ty==='kind'){g.save();g.globalAlpha=stt==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,u*.3,stt==='ok'?'#dcfce7':(stt==='bad'?'#fee2e2':'#fff'),{stroke:stt==='ok'?'#16a34a':(stt==='bad'?'#dc2626':INK),lw:Math.max(2,u*.07),blur:0,dy:u*.1,sc:INK});
        g.fillStyle=o.col;g.beginPath();g.arc(r.x+u*.7,r.y+r.h/2,Math.min(u*.45,r.h*.3),0,TAU);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
        QK.txt(g,o.t,r.x+r.w/2+u*.5,r.y+r.h*.38,r.w-u*2,r.h*.4,Math.min(u*.85,r.h*.34),INK);QK.txt(g,o.sub,r.x+r.w/2+u*.5,r.y+r.h*.73,r.w-u*1.8,r.h*.3,Math.min(u*.42,r.h*.17),'#6b21a8');g.restore();}
      else QK.card(g,u,r,o.t,stt,{ink:INK,bd:INK,sc:INK,blur:0,rad:u*.3});});},
};

Engine.boot(GAME);
