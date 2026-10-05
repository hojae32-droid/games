/* 3학년 · 힘과 우리 생활 — 영차! 힘 놀이터 (시소 수평 잡기 · 지레 · 밀기와 당기기)
   디자인: 장난감 블록 놀이터 — 빨강·파랑·노랑. 어린이 친구와 시소·지레·나무토막은 직접 그린 그림이고, 친구가 표정으로 응원해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const INK='#1f2d5a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="30" width="40" height="8" rx="3" fill="#ffd23f" stroke="#1f2d5a" stroke-width="3"/><path d="M24 30l-8 12h16z" fill="#e63946" stroke="#1f2d5a" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="14" width="12" height="12" rx="3" fill="#2d7ff9" stroke="#1f2d5a" stroke-width="3"/><rect x="30" y="20" width="10" height="10" rx="3" fill="#ff9d2e" stroke="#1f2d5a" stroke-width="3" transform="rotate(-8 35 25)"/></svg>';
/*@@DATA@@*/
/* 어린이 친구: (x,y)=발 바닥, s=키. mood: neutral/cheer/oops/strain, lean: 몸 기울기, arms: -1(뒤)~1(앞) */
function kid(g,x,y,s,t,o={}){const mood=o.mood||'neutral',col=o.col||'#2d7ff9';g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;
  const bob=mood==='cheer'?-Math.abs(Math.sin(t*10))*s*.12:0;g.translate(0,bob);K.shadow(g,0,-bob+s*.01,s*.32,s*.06,.25);
  if(o.lean)g.rotate(o.lean);
  /* 다리 */
  g.fillStyle='#35406e';for(const d of[-1,1]){K.rr(g,d*s*.1-s*.07,-s*.32,s*.14,s*.3,s*.05);g.fill();g.stroke();g.fillStyle='#e63946';K.rr(g,d*s*.1-s*.09,-s*.05,s*.18,s*.07,s*.03);g.fill();g.stroke();g.fillStyle='#35406e';}
  /* 몸 */
  g.fillStyle=col;K.rr(g,-s*.2,-s*.65,s*.4,s*.38,s*.1);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.35)';K.rr(g,-s*.14,-s*.6,s*.12,s*.08,s*.04);g.fill();
  /* 팔 */
  const arm=(d)=>{g.save();g.translate(d*s*.2,-s*.58);let a;if(mood==='cheer')a=d*(-2.5+Math.sin(t*12)*.3);else if(o.arms!=null)a=d*(.4)+(d>0?-1:1)*o.arms*1.4+(o.arms>0?(d>0?-1.3:-1.3):0)*0;else a=d*.4;
    if(o.arms!=null&&mood!=='cheer'){a=o.arms>0?-1.5:1.5;a*=d>0?1:1;}
    g.rotate(a);g.fillStyle=col;K.rr(g,-s*.05,0,s*.1,s*.26,s*.05);g.fill();g.stroke();g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,s*.28,s*.06,0,TAU);g.fill();g.stroke();g.restore();};arm(-1);arm(1);
  /* 머리 */
  g.translate(0,-s*.82);g.fillStyle='#ffd6b0';g.beginPath();g.arc(0,0,s*.2,0,TAU);g.fill();g.stroke();
  g.fillStyle=o.hair||'#5a3a1f';g.beginPath();g.arc(0,-s*.03,s*.21,Math.PI*1.02,Math.PI*1.98);g.quadraticCurveTo(0,-s*.12,-s*.2,-s*.03);g.fill();g.stroke();
  g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.5,s*.035);
  if(mood==='cheer'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.08,s*.01,s*.035,Math.PI*1.1,Math.PI*1.9);g.stroke();}g.fillStyle='#c0392b';g.beginPath();g.arc(0,s*.07,s*.07,0,Math.PI);g.fill();}
  else if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.08-s*.03,-s*.03);g.lineTo(d*s*.08+s*.03,s*.03);g.moveTo(d*s*.08+s*.03,-s*.03);g.lineTo(d*s*.08-s*.03,s*.03);g.stroke();}g.beginPath();g.arc(0,s*.12,s*.05,1.15*Math.PI,1.85*Math.PI);g.stroke();g.fillStyle='#8fe3ff';g.beginPath();g.ellipse(s*.22,-s*.04+((t*2)%1)*s*.06,s*.025,s*.04,0,0,TAU);g.fill();}
  else if(mood==='strain'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.12,-s*.03);g.lineTo(d*s*.04,0);g.stroke();g.beginPath();g.arc(d*s*.08,s*.02,s*.02,0,TAU);g.fill();}g.beginPath();g.moveTo(-s*.06,s*.09);g.lineTo(s*.06,s*.09);g.stroke();g.fillStyle='#8fe3ff';g.beginPath();g.ellipse(-s*.22,-s*.05+((t*2.5)%1)*s*.07,s*.025,s*.04,0,0,TAU);g.fill();}
  else{for(const d of[-1,1]){g.beginPath();g.arc(d*s*.08,s*.01,s*.025,0,TAU);g.fill();}g.beginPath();g.arc(0,s*.06,s*.05,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
function rockV(g,x,y,s){g.save();g.translate(x,y);g.fillStyle='#8a94a6';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);g.lineJoin='round';g.beginPath();g.moveTo(-s*.5,0);g.lineTo(-s*.46,-s*.4);g.lineTo(-s*.12,-s*.7);g.lineTo(s*.3,-s*.58);g.lineTo(s*.52,-s*.14);g.lineTo(s*.44,0);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.moveTo(-s*.32,-s*.32);g.lineTo(-s*.1,-s*.56);g.lineTo(s*.12,-s*.46);g.lineTo(-s*.1,-s*.28);g.closePath();g.fill();g.restore();}
function vtree(g,x,y,s,k){g.save();g.translate(x,y);g.fillStyle='#8a5a2b';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,s*.04);K.rr(g,-s*.07,-s*.5,s*.14,s*.5,s*.03);g.fill();g.stroke();g.fillStyle=['#43b45a','#52c46a','#2fae4f'][k%3];for(const [dx,dy,r] of [[0,-.9,.4],[-.26,-.68,.3],[.26,-.68,.3],[0,-.68,.32]]){g.beginPath();g.arc(dx*s,dy*s,r*s,0,TAU);g.fill();g.stroke();}g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?Math.min(W/9,H/9):Math.min(W,H)/8,gy=wide?H*.93:H*.74;
    K.sky(g,W,H,'#7cc8f5','#fff3dc');K.clouds(g,W,H,T,.12,3,u*1.6);K.hills(g,W,H,gy-u*.9,'#bfe8c6','#93d8a8');K.ground(g,gy,W,H,'#78cf8c','#a7e8b4');
    /* 시소 */
    const cx=W/2,L=Math.min(W*.8,u*8),ang=Math.sin(T*1.4)*.14;g.fillStyle='#e63946';g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(cx,gy-u*.9);g.lineTo(cx-u*.7,gy);g.lineTo(cx+u*.7,gy);g.closePath();g.fill();g.stroke();
    g.save();g.translate(cx,gy-u*.9);g.rotate(ang);K.rr(g,-L/2,-u*.14,L,u*.28,u*.1);g.fillStyle='#ffd23f';g.fill();g.stroke();
    g.save();g.translate(-L*.38,-u*.14);g.rotate(-ang);kid(g,0,0,u*1.6,T,{mood:ang>0?'cheer':'neutral',col:'#2d7ff9'});g.restore();
    g.save();g.translate(L*.38,-u*.14);g.rotate(-ang);kid(g,0,0,u*1.6,T+1,{mood:ang<0?'cheer':'neutral',col:'#e63946',hair:'#222'});g.restore();g.restore();
    };
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

const GAME={
  id:'sci3-force',title:'영차! 힘 놀이터',title1:'함께 놀자',title2:'영차! 힘 놀이터',emoji:LOGO,
  subtitle:'3학년 · 힘과 우리 생활',
  howto:'시소에 나무토막을 올려 <b>수평</b>을 맞추고, 지레의 <b>받침점</b>을 옮겨 무거운 돌을 들어 올리고, 화면을 밀거나 당겨서 <b>밀기·당기기</b>를 해 봐요!',
  how:p=>({bal:'나무토막을 끌어다 오른쪽에 놓아<br><b>수평</b>을 맞춰요',lever:'받침점(▲)을 옮기고 <b>영차!</b><br>부분 이름 문제도 나와요',push:'밀기면 <b>앞으로 →</b><br>당기기면 <b>내 쪽으로 ←</b> 쓱!',all:'세 가지 놀이가 번갈아 나와요'}[p.levelId]),
  txt:{who:'누구와 놀까요?',dur:'놀이 시간',pace:'한 문제 시간',seat:'번 친구 ',go:'놀이 시작!',s1:'1. 놀이',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#e63946',c2:'#2d7ff9'},hero:heroScene,vignette:.04,durs:[60,90,120],
  levelTitle:'어떤 놀이를 할까요?',
  levels:[
    {id:'bal',g:'3학년 · 힘과 우리 생활',t:'⚖️ 시소 수평 잡기',d:'무거운 쪽은 받침점 가까이'},
    {id:'lever',g:'3학년 · 힘과 우리 생활',t:'🪨 지레로 돌 들기',d:'받침점·힘점·작용점'},
    {id:'push',g:'3학년 · 힘과 우리 생활',t:'👐 밀기와 당기기',d:'쓱 밀고, 쓱 당기고'},
    {id:'all',g:'3학년 · 힘과 우리 생활',t:'🌟 모두 섞기',d:'세 놀이가 번갈아'},
  ],
/*@@SUMMARY@@*/
  Zr(p){const u=p.u;const y0=Math.max(p.top||0,u*2.6)+u*.2,y1=p.H-(p.bot||0)-u*.1;return{y0,y1,h:Math.max(120,y1-y0)};},
  init(p){const st=p.state;st.round=0;st.kindIdx=0;st.ang=0;st.anim=0;st.T=0;st.mood='neutral';st.moodT=0;st.qt=0;st.qmax=0;this.next(p,true);},
  next(p){const st=p.state,L=p.levelId;st.busy=false;st.drag=null;st.round++;st.reveal=null;
    let k=L;if(L==='all'){const seq=['bal','push','lever','push'];k=seq[st.kindIdx++%seq.length];}
    st.kind=k;st.qt=0;st.qmax=0;this['new_'+k](p);},
  setT(p,sec){const st=p.state;st.qmax=sec/p.pace;st.qt=st.qmax;},
  /* ---------- 시소 ---------- */
  new_bal(p){const st=p.state,R=p.R;const combos=[];
    for(let W=1;W<=6;W++)for(let d=1;d<=4;d++)for(let w=1;w<=6;w++)for(let x=1;x<=4;x++)if(W*d===w*x&&W!==w&&W*d<=12)combos.push([W,d,w,x]);
    let c=R.pick(combos);st.L={w:c[0],d:c[1]};st.Rw=c[2];st.ans=c[3];st.placed=null;st.trayX=null;st.tAng=0;this.setT(p,22);
    p.ask('⚖️ 오른쪽에 나무토막을 놓아 <b>수평</b>을 잡아요!','무거우면 받침점 가까이 · 가벼우면 멀리');p.ctrl.innerHTML='';},
  geo(p){const W=p.W,H=p.H,u=p.u,Z=this.Zr(p);const L=Math.min(W*.92,u*10.5);return{cx:W/2,cy:Z.y0+Z.h*.56,L,step:L/2/4.6,bw:Math.min(u*.9,L/11),bh:Math.min(u*.42,H*.045),Z};},
  slotPos(p,side,d){const g=this.geo(p),st=p.state;const off=side*d*g.step;return[g.cx+Math.cos(st.ang)*off,g.cy+Math.sin(st.ang)*off];},
  tray(p){const Z=this.Zr(p);return{x:p.W*.78,y:Z.y1-p.u*.7};},
  /* ---------- 그리기 도우미 ---------- */
  pill(g,str,x,y,s,bg,fg,o={}){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.3;K.card(g,x-w/2,y-s*.82,w,s*1.64,s*.82,bg,{blur:s*.5,dy:s*.12,hi:false,stroke:o.stroke||INK,lw:o.lw||2});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();return w;},
  scene(p,g,gy){const W=p.W,H=p.H,u=p.u,t=p.state.T;
    K.sky(g,W,H,'#7cc8f5','#fff3dc');K.glow(g,W*.86,H*.1,u*3.2,'#fff1a8',.75);K.glow(g,W*.86,H*.1,u*.9,'#ffffff',.9);
    K.clouds(g,W,H,t,.1,3,u*1.7);
    K.hills(g,W,H,gy-u*1.3,'#bfe8c6','#93d8a8');
    /* 깃발 줄 */
    const fl=['#e63946','#ffd23f','#2d7ff9','#43b45a'];g.strokeStyle='rgba(31,45,90,.5)';g.lineWidth=2;g.beginPath();g.moveTo(0,H*.02);g.quadraticCurveTo(W/2,H*.07,W,H*.02);g.stroke();
    for(let i=1;i<14;i++){const f=i/14,x=W*f,y=H*.02+(H*.05)*4*f*(1-f)*.5*2;g.fillStyle=fl[i%4];g.beginPath();g.moveTo(x-u*.2,y);g.lineTo(x+u*.2,y);g.lineTo(x,y+u*.45);g.closePath();g.fill();}
    (W>u*14?[[.07,.9],[.93,1.05],[.8,.75],[.2,.7]]:[]).forEach(([fx,s],i)=>{const x=W*fx,y=gy-u*.1*s;K.shadow(g,x,gy+u*.05,u*.5*s,u*.1,.12);vtree(g,x,y,u*2.2*s,i);});
    K.ground(g,gy,W,H,'#78cf8c','#a7e8b4');
    g.save();const sg=g.createRadialGradient(W/2,gy+u*.9,u*.5,W/2,gy+u*.9,Math.min(W*.48,u*6));sg.addColorStop(0,'rgba(250,224,170,.95)');sg.addColorStop(.8,'rgba(246,214,150,.75)');sg.addColorStop(1,'rgba(246,214,150,0)');
    g.fillStyle=sg;g.beginPath();g.ellipse(W/2,gy+u*.9,Math.min(W*.48,u*6),u*1.1,0,0,7);g.fill();g.restore();
    g.save();g.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<14;i++){const x=((i*0.618+.07)%1)*W,y=gy+u*.3+((i*53)%9)/9*(H-gy-u*.4);g.beginPath();g.ellipse(x,y,u*.14,u*.05,0,0,7);g.fill();}g.restore();},
  plank(g,x,y,w,h){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#ffe27a');gr.addColorStop(.55,'#ffc533');gr.addColorStop(1,'#e0a010');
    g.save();g.shadowColor='rgba(31,45,90,.35)';g.shadowBlur=h*.6;g.shadowOffsetY=h*.3;K.rr(g,x,y,w,h,h*.4);g.fillStyle=gr;g.fill();g.restore();
    K.rr(g,x,y,w,h,h*.4);g.lineWidth=Math.max(2,h*.12);g.strokeStyle=INK;g.stroke();
    g.save();K.rr(g,x,y,w,h,h*.4);g.clip();g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x,y,w,h*.22);g.restore();},
  fulcrum(g,x,y,w,h){K.shadow(g,x,y+h,w*.75,h*.12,.22);g.save();g.fillStyle='#e63946';g.strokeStyle=INK;g.lineWidth=Math.max(2.5,w*.06);g.lineJoin='round';g.beginPath();g.moveTo(x,y);g.lineTo(x-w/2,y+h);g.lineTo(x+w/2,y+h);g.closePath();g.fill();g.stroke();
    g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.moveTo(x,y+h*.08);g.lineTo(x-w*.32,y+h*.95);g.lineTo(x-w*.12,y+h*.95);g.closePath();g.fill();g.restore();K.orb(g,x,y+h*.12,w*.11,'#fde68a');},
  block(g,x,y,w,h,col){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,K.shade(col,.25));gr.addColorStop(1,K.shade(col,-.12));
    K.rr(g,x,y,w,h,h*.28);g.fillStyle=gr;g.fill();g.lineWidth=Math.max(1.6,h*.07);g.strokeStyle=INK;g.stroke();
    g.fillStyle='rgba(255,255,255,.4)';K.rr(g,x+w*.08,y+h*.12,w*.84,h*.22,h*.11);g.fill();
    g.fillStyle=K.shade(col,-.2);for(const d of[-1,1]){g.beginPath();g.arc(x+w/2+d*w*.22,y+h*.12,h*.12,0,TAU);g.fill();}},
  stack(p,gx,x,y,w,ang,col){const g=this.geo(p);col=col||'#ff9d2e';gx.save();gx.translate(x,y);gx.rotate(ang||0);
    for(let k=0;k<w;k++)this.block(gx,-g.bw/2,-(k+1)*g.bh-g.bh*.15,g.bw,g.bh*.94,col);
    K.txt(gx,w,0,-(w+.5)*g.bh-g.bh*.55,{size:g.bh*1.2,color:INK,stroke:'#fff',lw:Math.max(3,g.bh*.22)});gx.restore();},
  qbar(p,g){const st=p.state,u=p.u,Z=this.Zr(p);if(st.busy||!(st.qmax>0)||st.qt<=0)return;const f=clamp(st.qt/st.qmax,0,1);const bw=Math.min(p.W*.8,u*12),bh=Math.max(6,u*.2),bx=p.W/2-bw/2,by=Z.y0-u*.2;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(31,45,90,.25)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#43b45a':(f>.2?'#ffd23f':'#e63946');g.fill();},
  draw_bal(p,gx){const st=p.state,g=this.geo(p),u=p.u,t=st.T;
    this.scene(p,gx,g.cy+u*1.3);
    this.fulcrum(gx,g.cx,g.cy-u*.05,u*1.4,u*1.35);
    gx.save();gx.translate(g.cx,g.cy);gx.rotate(st.ang);this.plank(gx,-g.L/2,-u*.14,g.L,u*.3);
    for(let s of[-1,1])for(let d=1;d<=4;d++){const x=s*d*g.step;gx.fillStyle='rgba(31,45,90,.35)';gx.beginPath();gx.arc(x,u*.03,u*.1,0,7);gx.fill();gx.fillStyle='#fff3c4';gx.beginPath();gx.arc(x,u*.01,u*.075,0,7);gx.fill();
      K.txt(gx,d,x,u*.5,{size:u*.36,color:INK,stroke:'rgba(255,255,255,.9)',lw:3});}
    gx.restore();
    const lvl=Math.abs(st.ang)<.01&&st.placed;if(lvl){K.glow(gx,g.cx,g.cy-u*3.2,u*1.6,'#bbf7d0',.8);this.pill(gx,'✨ 수평 ✨',g.cx,g.cy-u*3.2,u*.42,'#ecfdf5','#15803d',{stroke:'#43b45a'});}
    const [lx,ly]=this.slotPos(p,-1,st.L.d);this.stack(p,gx,lx,ly-u*.12,st.L.w,st.ang,'#2d7ff9');
    if(st.placed){const [rx,ry]=this.slotPos(p,1,st.placed);this.stack(p,gx,rx,ry-u*.12,st.Rw,st.ang);}
    else{const tr=this.tray(p);const x=st.drag?st.drag.x:tr.x,y=st.drag?st.drag.y:tr.y;
      if(!st.drag){K.shadow(gx,tr.x,tr.y+u*.22,u*1.2,u*.12,.2);K.card(gx,tr.x-u*1.1,tr.y-u*.15,u*2.2,u*.3,u*.12,'#c68a3a',{blur:u*.2,dy:u*.06,stroke:INK,lw:2});
        this.pill(gx,'끌어다 놓아요 ↑',tr.x,Math.min(tr.y+u*.6,p.H-u*.32),u*.26,'rgba(255,255,255,.95)','#1f2d5a');}
      else K.shadow(gx,x,y+u*.1,g.bw*.7,u*.1,.18);
      this.stack(p,gx,x,y,st.Rw);
      if(st.drag){for(let d=1;d<=4;d++){const [sx,sy]=this.slotPos(p,1,d);K.glow(gx,sx,sy-u*.1,u*.6,'#fdba74',.35+.15*Math.sin(t*6));gx.strokeStyle='rgba(230,57,70,.8)';gx.lineWidth=2.5;gx.setLineDash([5,5]);gx.beginPath();gx.arc(sx,sy-u*.1,u*.45,0,7);gx.stroke();gx.setLineDash([]);}}}
    if(st.reveal!=null){const [sx,sy]=this.slotPos(p,1,st.reveal);const pu=1+.08*Math.sin(t*8);K.glow(gx,sx,sy-u*.1,u*1.2,'#22c55e',.4);gx.save();gx.strokeStyle='#16a34a';gx.setLineDash([u*.15,u*.1]);gx.lineWidth=3.5;gx.beginPath();gx.arc(sx,sy-u*.1,u*.7*pu,0,7);gx.stroke();gx.restore();}
    /* 응원하는 친구 */
    const kx=g.cx-g.L/2-u*.2<u*1.6?u*1.2:Math.max(u*1.2,g.cx-g.L/2-u*1.1);kid(gx,Math.min(kx,p.W*.1),g.cy+u*1.7,u*2,t,{mood:st.mood,col:'#e63946'});
  },
  place(p,d){const st=p.state;st.placed=d;st.busy=true;const g=this.geo(p);
    const Tl=st.L.w*st.L.d,Tr=st.Rw*d;st.tAng=Math.max(-.22,Math.min(.22,(Tr-Tl)*.035));p.Snd.drum();
    p.state.after=setTimeout(()=>{if(!p.active)return;const ok=Tl===Tr;const [x,y]=this.slotPos(p,1,d);st.mood=ok?'cheer':'oops';st.moodT=1.4;
      p.hit(ok,{x,y:y-p.u*2,tip:ok?'수평이 됐어요! 🎉':(Tr>Tl?'오른쪽이 내려갔어요 — 받침점에 더 <b>가깝게</b> 놓아 봐요':'왼쪽이 내려갔어요 — 받침점에서 더 <b>멀리</b> 놓아 봐요'),
        review:`왼쪽 ${st.L.w}개가 ${st.L.d}칸 → 오른쪽 ${st.Rw}개는 ${st.ans}칸에 놓아야 수평 (무거운 쪽은 받침점 가까이)`});
      if(ok){p.burst(p.W/2,this.geo(p).cy-p.u*2,'#ffd23f',16);setTimeout(()=>{if(p.active){st.tAng=0;this.next(p);}},900);}
      else setTimeout(()=>{if(p.active){st.placed=null;st.tAng=0;st.busy=false;}},1000);},700);},
  /* ---------- 지레 ---------- */
  new_lever(p){const st=p.state,R=p.R;st.lv={f:.5,rock:R.int(3,7),lift:0,strain:0,quiz:null};
    if(st.round%3===0||R.chance(.25)){const part=R.pick(LEVER_PARTS);st.lv.quiz=part[0];st.lv.f=R.num(.3,.6);this.setT(p,14);p.ask(`🪨 지레에서 <b>${part[0]}</b>${J(part[0],'을').slice(part[0].length)} 톡 눌러요!`,part[1]);p.ctrl.innerHTML='';return;}
    p.ask(`🪨 받침점 ▲을 옮겨서 <b>${st.lv.rock*10} kg</b> 돌을 들어 올려요!`,'받침점을 어디에 두어야 힘이 덜 들까요?');
    p.tools([{e:'💪',t:'영차!'}],()=>this.heave(p),{toggle:false});},
  lgeo(p){const W=p.W,u=p.u,Z=this.Zr(p);const L=Math.min(W*.86,u*10);return{x0:W/2-L/2,x1:W/2+L/2,y:Z.y0+Z.h*.62,L};},
  heave(p){const st=p.state,lv=st.lv;if(st.busy||lv.quiz)return;const a=lv.f,b=1-lv.f;
    const need=lv.rock*a/b;const ok=need<=3.2;st.busy=true;lv.strain=1;p.Snd.drum();
    setTimeout(()=>{if(!p.active)return;if(ok){lv.lift=1;p.Snd.slide(300,700,.3,.06);}
      const g=this.lgeo(p);st.mood=ok?'cheer':'oops';st.moodT=1.2;p.hit(ok,{x:g.x0+p.u,y:g.y-p.u*2,tip:ok?'받침점이 돌(작용점)에 가까울수록 힘이 덜 들어요!':'너무 무거워요! 받침점을 <b>돌 쪽으로</b> 옮겨 봐요',review:'지레: 받침점을 작용점(물체) 가까이 옮길수록 작은 힘으로 들 수 있어요'});
      setTimeout(()=>{if(!p.active)return;if(ok)this.next(p);else{st.busy=false;lv.strain=0;}},ok?1100:700);},600);},
  draw_lever(p,gx,dt){const st=p.state,lv=st.lv,g=this.lgeo(p),u=p.u,t=st.T;
    this.scene(p,gx,g.y+u*1.1);
    const fx=g.x0+g.L*lv.f;lv.liftA=(lv.liftA||0)+((lv.lift?1:0)-(lv.liftA||0))*Math.min(1,dt*5);
    const ang=-.28*lv.liftA+(lv.strain&&!lv.lift?Math.sin(t*40)*.01:0);
    K.shadow(gx,g.x0+u*.6,g.y+u*1.15,u*.9*(1-lv.liftA*.4),u*.14,.18*(1-lv.liftA*.5));
    this.fulcrum(gx,fx,g.y+2,u*1.2,u*1.08);
    gx.save();gx.translate(fx,g.y);gx.rotate(ang);this.plank(gx,g.x0-fx,-u*.14,g.L,u*.28);
    rockV(gx,g.x0-fx+u*.6,-u*.12,u*1.9);this.pill(gx,lv.rock*10+' kg',g.x0-fx+u*.6,-u*2.15,u*.3,'#1f2d5a','#fff');
    gx.save();gx.translate(g.x1-fx-u*.3,-u*.12);gx.rotate(-ang);kid(gx,0,0,u*2.2,t,{mood:lv.strain&&!lv.lift?'strain':(lv.lift?'cheer':'neutral'),col:'#e63946',arms:1,lean:lv.strain&&!lv.lift?.12:0});gx.restore();
    gx.restore();
    if(lv.quiz){const pts=this.leverPts(p);
      Object.entries(pts).forEach(([k,[x,y]])=>{const rv=st.reveal===k;const pu=1+.06*Math.sin(t*5);K.glow(gx,x,y,u*1.1,rv?'#22c55e':'#fde68a',.6);gx.save();gx.strokeStyle=rv?'#16a34a':'rgba(230,57,70,.9)';gx.lineWidth=3;gx.setLineDash([6,5]);gx.lineDashOffset=-t*20;gx.beginPath();gx.arc(x,y,u*.7*pu,0,7);gx.stroke();gx.restore();
        K.orb(gx,x,y,u*.3,rv?'#4ade80':'#ffd23f');K.txt(gx,'?',x,y+u*.02,{size:u*.4,color:INK});if(rv)this.pill(gx,k,x,y-u*1.0,u*.3,'#dcfce7','#15803d');});}
    else this.pill(gx,'◀ ▲를 끌어서 옮겨요 ▶',fx,Math.min(g.y+u*1.65,p.H-(p.bot||0)-u*.3),u*.28,'rgba(255,255,255,.95)','#1f2d5a');},
  leverPts(p){const g=this.lgeo(p),lv=p.state.lv,u=p.u;const fx=g.x0+g.L*lv.f;return{받침점:[fx,g.y+u*.5],작용점:[g.x0+u*.6,g.y-u*.4],힘점:[g.x1-u*.3,g.y-u*.2]};},
  /* ---------- 밀기·당기기 ---------- */
  new_push(p){const st=p.state;const it=p.deck(PUSHPULL,'pp');st.pp={it,off:0,go:0};this.setT(p,9);
    p.ask(`${it[1]}`,'밀기면 앞으로 →, 당기기면 내 쪽으로 ← 쓱!');p.ctrl.innerHTML='';},
  draw_push(p,gx,dt){const st=p.state,pp=st.pp,u=p.u,W=p.W,H=p.H,t=st.T,Z=this.Zr(p);const cyc=Z.y0+Z.h*.5;const fy=cyc+u*1.0;
    this.scene(p,gx,fy-u*.35);
    pp.off+=(pp.go*W*.25-pp.off)*Math.min(1,dt*6);
    const ox=W*.6+pp.off;const kx=W*.2+(pp.go>0?pp.off*.8:pp.off*.5);
    kid(gx,kx,fy,u*2.6,t,{mood:st.mood,col:'#2d7ff9',arms:(pp.go||0)>=0?1:-1,lean:pp.go>0?.18:(pp.go<0?-.12:0)});
    K.shadow(gx,ox,fy,u*1.05,u*.2,.22);K.emo(gx,pp.it[0],ox,cyc,u*2.6);
    /* 밀기/당기기 화살표 */
    const ly=Math.min(Z.y1-u*.5,H*.88);this.pill(gx,'← 당기기',W*.25,ly,u*.42,'#e0edff','#1d4ed8',{stroke:'#2d7ff9'});this.pill(gx,'밀기 →',W*.75,ly,u*.42,'#ffe6e3','#c2410c',{stroke:'#e63946'});
    if(st.reveal!=null){const want=st.reveal;gx.save();gx.strokeStyle='#16a34a';gx.lineWidth=u*.25;gx.lineCap='round';const ax=W*.6,ay=cyc-u*2.2;gx.beginPath();gx.moveTo(ax-want*u*1.2,ay);gx.lineTo(ax+want*u*1.2,ay);gx.stroke();gx.fillStyle='#16a34a';gx.beginPath();gx.moveTo(ax+want*u*1.9,ay);gx.lineTo(ax+want*u*1.1,ay-u*.5);gx.lineTo(ax+want*u*1.1,ay+u*.5);gx.fill();gx.restore();}
    else if(!st.busy){const a=.5+.5*Math.sin(t*5);gx.globalAlpha=.45+a*.45;const ax=W*.6,ay=cyc-u*2.4;K.glow(gx,ax,ay,u*1.4,'#ffffff',.5);
      K.txt(gx,'⟵ ⟶',ax,ay,{size:u*.9,color:INK,stroke:'rgba(255,255,255,.85)',lw:4});gx.globalAlpha=1;}},
  swipePush(p,dir){const st=p.state,pp=st.pp;if(st.busy)return;st.busy=true;const want=pp.it[2]==='push'?1:-1;const ok=dir===want;pp.go=dir;p.Snd.whoosh();st.mood=ok?'cheer':'oops';st.moodT=1.2;
    p.hit(ok,{x:p.W*.6,y:p.H*.35,tip:ok?'':`${pp.it[1]} → <b>${want>0?'밀기':'당기기'}</b>`,review:`${pp.it[1]} → ${want>0?'밀기':'당기기'}`});
    setTimeout(()=>{if(p.active)this.next(p);},ok?650:1300);},
  /* ---------- 공통 ---------- */
  update(p,dt){const st=p.state;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    if(st.kind==='bal'){const t=st.tAng||0;st.ang+=(t-st.ang)*Math.min(1,dt*5);}
    if(!st.busy&&st.qmax>0&&st.qt>0){st.qt-=dt;if(st.qt<=0){st.busy=true;st.drag=null;st.mood='oops';st.moodT=1.6;
      if(st.kind==='bal'){st.reveal=st.ans;const [x,y]=this.slotPos(p,1,st.ans);p.hit(false,{pen:20,x,y:y-p.u*2,tip:`시간이 다 됐어요! 정답은 <b>${st.ans}칸</b>`,review:`왼쪽 ${st.L.w}개가 ${st.L.d}칸 → 오른쪽 ${st.Rw}개는 ${st.ans}칸에 놓아야 수평 (무거운 쪽은 받침점 가까이)`,tipMs:2600});}
      else if(st.kind==='push'){const want=st.pp.it[2]==='push'?1:-1;st.reveal=want;p.hit(false,{pen:20,x:p.W*.6,y:p.H*.35,tip:`시간이 다 됐어요! ${st.pp.it[1]} → <b>${want>0?'밀기':'당기기'}</b>`,review:`${st.pp.it[1]} → ${want>0?'밀기':'당기기'}`,tipMs:2600});}
      else if(st.kind==='lever'){st.reveal=st.lv.quiz;const pt=this.leverPts(p)[st.lv.quiz];p.hit(false,{pen:20,x:pt[0],y:pt[1]-p.u,tip:`시간이 다 됐어요! <b>${st.lv.quiz}</b>은 ?가 있는 그 자리예요`,review:`${st.lv.quiz}: ${LEVER_PARTS.find(a=>a[0]===st.lv.quiz)[1]}`,tipMs:2600});}
      setTimeout(()=>{if(p.active)this.next(p);},2000);}}},
  draw(p,gx,dt){this['draw_'+p.state.kind](p,gx,dt);this.qbar(p,gx);},
  down(p,x,y){const st=p.state,u=p.u;if(st.busy)return;
    if(st.kind==='bal'){if(st.placed)return;const t=this.tray(p);const g=this.geo(p);
      if(Math.abs(x-t.x)<u*1.3&&y>t.y-st.Rw*g.bh-u*1.2&&y<t.y+u*.8){st.drag={x,y};return;}
      for(let d=1;d<=4;d++){const [sx,sy]=this.slotPos(p,1,d);if(Math.abs(x-sx)<g.step*.5&&Math.abs(y-sy)<u*1.6){this.place(p,d);return;}}}
    else if(st.kind==='lever'){const lv=st.lv;
      if(lv.quiz){const pts=this.leverPts(p);let best=null,bd=u*1.1;Object.entries(pts).forEach(([k,[px,py]])=>{const d=Math.hypot(x-px,y-py);if(d<bd){bd=d;best=k;}});
        if(best){st.busy=true;const ok=best===lv.quiz;const [px,py]=pts[best];st.mood=ok?'cheer':'oops';st.moodT=1.2;p.hit(ok,{x:px,y:py-u,tip:ok?`맞아요! ${LEVER_PARTS.find(a=>a[0]===best)[1]}`:`거기는 <b>${best}</b>이에요 (${LEVER_PARTS.find(a=>a[0]===best)[1]})`,review:`${lv.quiz}: ${LEVER_PARTS.find(a=>a[0]===lv.quiz)[1]}`});
          setTimeout(()=>{if(p.active){if(ok)this.next(p);else st.busy=false;}},ok?700:900);}return;}
      const g=this.lgeo(p);const fx=g.x0+g.L*lv.f;if(Math.abs(x-fx)<u*1.2&&Math.abs(y-g.y-u*.5)<u*1.4)st.drag={lever:true};}
  },
  move(p,x,y,down){const st=p.state;if(!st.drag||!down)return;
    if(st.drag.lever){const g=this.lgeo(p);st.lv.f=Math.max(.12,Math.min(.88,(x-g.x0)/g.L));return;}
    st.drag.x=x;st.drag.y=y;},
  up(p,x,y,d){const st=p.state,u=p.u;
    if(st.kind==='push'){const dx=x-d.x0;if(Math.abs(dx)>u*.8&&Math.abs(dx)>Math.abs(y-d.y0)*.7)this.swipePush(p,dx>0?1:-1);else if(Math.abs(dx)<u*.5&&Math.abs(y-d.y0)<u*.5&&!st.busy){const Z=this.Zr(p);if(y>Z.y1-u*1.4)this.swipePush(p,x>p.W/2?1:-1);}return;}
    if(!st.drag)return;
    if(st.kind==='bal'&&!st.drag.lever){let best=0,bd=1e9;for(let k=1;k<=4;k++){const [sx]=this.slotPos(p,1,k);const dd=Math.abs(x-sx);if(dd<bd){bd=dd;best=k;}}
      const g=this.geo(p);st.drag=null;if(bd<g.step*.6&&y<g.cy+u*.5)this.place(p,best);return;}
    st.drag=null;},
};

Engine.boot(GAME);
