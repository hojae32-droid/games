/* 4학년 · 다양한 생물과 우리 생활 — 현미경 탐정 (어두운 슬라이드를 렌즈로 비춰 미생물 찾기)
   디자인: 탐정 사무소 느낌의 남청색 + 형광 라임. 렌즈 안은 1.3배로 크게 보이고, 미생물이 꿈틀꿈틀 헤엄쳐요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="20" cy="20" r="14" fill="#13283d" stroke="#a3e635" stroke-width="5"/><circle cx="20" cy="20" r="8" fill="#365314"/><circle cx="16" cy="16" r="3" fill="#d9f99d"/><path d="M31 31l12 12" stroke="#a3e635" stroke-width="7" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
/* 미생물 그림 (u=크기, rot=회전, t=시간) */
function drawOrg(g,k,x,y,u,rot,t){g.save();g.translate(x,y);g.rotate(rot);g.lineCap='round';
  if(k==='zip'){g.fillStyle='#d9f99d';g.strokeStyle='#65a30d';g.lineWidth=2;g.beginPath();g.ellipse(0,0,u*.95,u*.42,0,0,7);g.fill();g.stroke();
    g.beginPath();g.ellipse(u*.2,u*.12,u*.25,u*.12,0,0,7);g.fillStyle='#a3e635';g.fill();
    g.strokeStyle='#65a30d';g.lineWidth=1;for(let a=0;a<6.28;a+=.25){const c=Math.cos(a),s=Math.sin(a);const w=Math.sin(t*12+a*3)*.08;g.beginPath();g.moveTo(c*u*.95,s*u*.42);g.lineTo(c*u*(1.1+w),s*u*(.55+w));g.stroke();}}
  else if(k==='hae'){g.strokeStyle='#16a34a';g.lineWidth=u*.13;for(let j=-1;j<=1;j++){g.beginPath();for(let s=-1.4;s<=1.4;s+=.1){const xx=s*u,yy=j*u*.32+Math.sin(s*2+t+j)*u*.12;s===-1.4?g.moveTo(xx,yy):g.lineTo(xx,yy);}g.stroke();}
    g.strokeStyle='#86efac';g.lineWidth=2;for(let j=-1;j<=1;j++){g.beginPath();for(let s=-1.3;s<=1.3;s+=.05){const xx=s*u,yy=j*u*.32+Math.sin(s*2+t+j)*u*.12+Math.sin(s*14)*u*.04;s===-1.3?g.moveTo(xx,yy):g.lineTo(xx,yy);}g.stroke();}}
  else if(k==='ame'){g.fillStyle='#e0e7ffcc';g.strokeStyle='#6366f1';g.lineWidth=2;g.beginPath();for(let a=0;a<=6.3;a+=.2){const r=u*(.6+.25*Math.sin(a*3+t*1.5)+.12*Math.sin(a*5-t));const xx=Math.cos(a)*r,yy=Math.sin(a)*r;a===0?g.moveTo(xx,yy):g.lineTo(xx,yy);}g.closePath();g.fill();g.stroke();
    g.fillStyle='#818cf8';g.beginPath();g.arc(u*.1,0,u*.16,0,7);g.fill();}
  else if(k==='eug'){g.fillStyle='#4ade80';g.strokeStyle='#15803d';g.lineWidth=2;g.beginPath();g.moveTo(-u*.8,0);g.quadraticCurveTo(0,-u*.42,u*.55,0);g.quadraticCurveTo(0,u*.42,-u*.8,0);g.fill();g.stroke();
    g.fillStyle='#ef4444';g.beginPath();g.arc(u*.35,-u*.05,u*.07,0,7);g.fill();g.strokeStyle='#15803d';g.lineWidth=1.5;g.beginPath();g.moveTo(u*.55,0);for(let s=0;s<=1;s+=.1)g.lineTo(u*.55+s*u*.8,Math.sin(s*9+t*8)*u*.12);g.stroke();}
  else if(k==='mold'){g.strokeStyle='#94a3b8';g.lineWidth=2;const br=(x0,y0,a,l,d)=>{if(d>3)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
      if(d===3){g.fillStyle='#334155';g.beginPath();g.arc(x1,y1,u*.13,0,7);g.fill();}br(x1,y1,a-.5,l*.75,d+1);br(x1,y1,a+.45,l*.7,d+1);};br(0,u*.8,-1.57,u*.6,0);}
  else if(k==='mush'){g.fillStyle='#fde7c8';g.strokeStyle='#92400e';g.lineWidth=2;K.rr(g,-u*.18,-u*.05,u*.36,u*.7,u*.1);g.fill();g.stroke();
    g.fillStyle='#ef4444';g.beginPath();g.moveTo(-u*.8,u*.02);g.quadraticCurveTo(-u*.7,-u*.8,0,-u*.8);g.quadraticCurveTo(u*.7,-u*.8,u*.8,u*.02);g.quadraticCurveTo(0,u*.18,-u*.8,u*.02);g.fill();g.stroke();
    g.fillStyle='#fff';for(const [a,b,r] of [[-.35,-.4,.12],[.2,-.5,.1],[.45,-.2,.08],[-.05,-.2,.07]]){g.beginPath();g.arc(a*u,b*u,r*u,0,7);g.fill();}}
  else if(k==='coc'){g.fillStyle='#f9a8d4';g.strokeStyle='#be185d';g.lineWidth=1.5;[[0,0],[.3,.1],[-.25,.2],[.05,-.3],[-.3,-.2],[.3,-.25],[.05,.35]].forEach(([a,b],i)=>{g.beginPath();g.arc(a*u+Math.sin(t*2+i)*u*.02,b*u,u*.16,0,7);g.fill();g.stroke();});}
  else if(k==='bac'){g.fillStyle='#fdba74';g.strokeStyle='#c2410c';g.lineWidth=1.5;[[0,0,0],[.2,.4,.6],[-.3,-.35,-.4]].forEach(([a,b,r])=>{g.save();g.translate(a*u,b*u);g.rotate(r+Math.sin(t*2+a*9)*.1);K.rr(g,-u*.45,-u*.13,u*.9,u*.26,u*.13);g.fill();g.stroke();g.restore();});}
  else if(k==='spi'){g.strokeStyle='#c084fc';g.lineWidth=u*.12;[-.3,.3].forEach(o=>{g.beginPath();for(let s=-.8;s<=.8;s+=.05){const xx=s*u,yy=o*u+Math.sin(s*9+t*3)*u*.15;s===-.8?g.moveTo(xx,yy):g.lineTo(xx,yy);}g.stroke();});}
  g.restore();}
/* 렌즈 탐정 (돋보기 얼굴 + 탐정 모자) */
function sleuth(g,x,y,s,mood,t,look){g.save();g.translate(x,y);g.rotate(mood==='oops'?Math.sin(t*30)*.08:Math.sin(t*2)*.05);
  g.lineCap='round';g.strokeStyle='#a3e635';g.lineWidth=s*.2;g.beginPath();g.moveTo(s*.38,s*.38);g.lineTo(s*.85,s*.85);g.stroke();
  g.strokeStyle='#4d7c0f';g.lineWidth=s*.08;g.beginPath();g.moveTo(s*.45,s*.45);g.lineTo(s*.8,s*.8);g.stroke();
  K.shadow(g,0,s*.55,s*.45,s*.08,.25);
  const gr=g.createRadialGradient(-s*.15,-s*.2,s*.05,0,0,s*.55);gr.addColorStop(0,'#f0fdf4');gr.addColorStop(1,'#bbf7d0');g.fillStyle=gr;g.strokeStyle='#a3e635';g.lineWidth=s*.12;g.beginPath();g.arc(0,0,s*.5,0,TAU);g.fill();g.stroke();
  g.strokeStyle='#07111c';g.lineWidth=s*.03;g.beginPath();g.arc(0,0,s*.56,0,TAU);g.stroke();
  /* 모자 */
  g.fillStyle='#7c4a1e';g.strokeStyle='#07111c';g.lineWidth=s*.04;g.beginPath();g.moveTo(-s*.5,-s*.38);g.quadraticCurveTo(0,-s*.95,s*.5,-s*.38);g.quadraticCurveTo(0,-s*.3,-s*.5,-s*.38);g.fill();g.stroke();
  g.fillStyle='#5a3513';g.fillRect(-s*.2,-s*.62,s*.4,s*.06);
  const lx=look?clamp(look[0],-1,1)*s*.03:0,ly=look?clamp(look[1],-1,1)*s*.03:0;
  g.fillStyle='#fff';g.strokeStyle='#07111c';g.lineWidth=s*.03;for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.17,-s*.03,s*.1,s*.12,0,0,TAU);g.fill();g.stroke();}
  g.fillStyle='#07111c';
  if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.17-s*.06,-s*.09);g.lineTo(d*s*.17+s*.06,.03*s);g.moveTo(d*s*.17+s*.06,-s*.09);g.lineTo(d*s*.17-s*.06,.03*s);g.stroke();}}
  else for(const d of[-1,1]){g.beginPath();g.arc(d*s*.17+lx,-s*.03+ly,s*.045,0,TAU);g.fill();}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.14,s*.12,0,Math.PI);g.fill();}else if(mood==='oops'){g.arc(0,s*.27,s*.09,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,s*.13,s*.09,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
/* 렌즈로 보는 화면: 바깥은 어둡게, 안은 1.3배로 밝게 */
function lensView(g,W,H,u,lx,ly,R,Z,t,items,drawIt,dimIt,bright){
  K.vgrad(g,0,0,W,H,['#0a1626','#07111c','#050c15']);
  g.save();g.strokeStyle='rgba(163,230,53,.06)';g.lineWidth=1;const gs=u*1.2;for(let x=gs/2;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=gs/2;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();
  for(const it of items){if(!it.gone)dimIt(g,it);}
  g.save();g.beginPath();g.arc(lx,ly,R,0,TAU);g.clip();
  const bg=g.createRadialGradient(lx,ly,0,lx,ly,R);bg.addColorStop(0,'#f4fff4');bg.addColorStop(1,'#cdeede');g.fillStyle=bg;g.fillRect(lx-R,ly-R,R*2,R*2);
  for(let k=0;k<14;k++){const a=k*2.4+t*.05,rr=R*((k*37%10)/11);const x=lx+Math.cos(a)*rr,y=ly+Math.sin(a)*rr;g.fillStyle=k%3?'rgba(134,239,172,.3)':'rgba(196,181,253,.28)';g.beginPath();g.arc(x,y,u*(.2+k%4*.13),0,7);g.fill();}
  g.translate(lx,ly);g.scale(Z,Z);g.translate(-lx,-ly);
  for(const it of items){if(!it.gone)drawIt(g,it);}
  g.restore();
  g.save();g.beginPath();g.arc(lx,ly,R,0,7);g.clip();const ed=g.createRadialGradient(lx,ly,R*.72,lx,ly,R);ed.addColorStop(0,'rgba(10,20,60,0)');ed.addColorStop(1,'rgba(10,20,60,.28)');g.fillStyle=ed;g.fillRect(lx-R,ly-R,R*2,R*2);
  g.fillStyle='rgba(255,255,255,.25)';g.beginPath();g.ellipse(lx-R*.4,ly-R*.55,R*.32,R*.12,-.6,0,7);g.fill();g.restore();
  const mg=g.createLinearGradient(lx-R,ly-R,lx+R,ly+R);mg.addColorStop(0,'#f8fafc');mg.addColorStop(.5,'#94a3b8');mg.addColorStop(1,'#e2e8f0');
  g.save();g.shadowColor='rgba(0,0,0,.6)';g.shadowBlur=u*.4;g.strokeStyle=mg;g.lineWidth=u*.26;g.beginPath();g.arc(lx,ly,R+u*.12,0,7);g.stroke();g.restore();
  g.save();g.strokeStyle=bright;g.lineWidth=u*.07;g.shadowColor=bright;g.shadowBlur=u*.35;g.beginPath();g.arc(lx,ly,R+u*.3,0,7);g.stroke();g.restore();
  /* 손잡이 */
  g.save();g.strokeStyle='#475569';g.lineWidth=u*.34;g.lineCap='round';const ha=Math.PI*.78;g.beginPath();g.moveTo(lx+Math.cos(ha)*(R+u*.35),ly+Math.sin(ha)*(R+u*.35));g.lineTo(lx+Math.cos(ha)*(R+u*1.5),ly+Math.sin(ha)*(R+u*1.5));g.stroke();g.strokeStyle='#a3e635';g.lineWidth=u*.16;g.beginPath();g.moveTo(lx+Math.cos(ha)*(R+u*.6),ly+Math.sin(ha)*(R+u*.6));g.lineTo(lx+Math.cos(ha)*(R+u*1.4),ly+Math.sin(ha)*(R+u*1.4));g.stroke();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const KS=['zip','eug','ame','hae','bac','coc','spi','mold'];const items=KS.map((k,i)=>({kind:k,a:i*TAU/KS.length,r:.25+(i%3)*.17,ph:i}));
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;
    for(const it of items){const a=it.a+T*.12*(it.r>.4?1:-1);it.cx=W*(wide?.6:.5)+Math.cos(a)*W*it.r*(wide?.75:.9);it.cy=H*(wide?.62:.62)+Math.sin(a*1.3)*H*it.r*.9;it.rot=a*2;it.t=T+it.ph;}
    const lx=W*(wide?.6:.5)+Math.sin(T*.5)*W*.22,ly=H*.62+Math.cos(T*.37)*H*.14,R=u*(wide?1.9:2);
    lensView(g,W,H,u,lx,ly,R,1.3,T,items,(g,it)=>drawOrg(g,it.kind,it.cx,it.cy,u*.9,it.rot,it.t),(g,it)=>{g.save();g.globalAlpha=.1;drawOrg(g,it.kind,it.cx,it.cy,u*.9,it.rot,it.t);g.restore();},'#a3e635');
    sleuth(g,wide?W*.12:W*.8,wide?H*.78:H*.88,u*1.3,Math.sin(T*.8)>.2?'happy':'neutral',T,[Math.cos(T)*.5,Math.sin(T)*.5]);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;const y0=Math.max(p.top||0,u*2.6);return{y0,y1:p.H-u*.5};},
  init(p){const st=p.state;Object.assign(st,{lx:p.W/2,ly:p.H/2,tx:p.W/2,ty:p.H/2,items:[],kN:0,T:0,mood:'neutral',moodT:0,qt:0,qmax:0,rev:false});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;st.k=L==='all'?['proto','fungi','use'][st.kN++%3]:L;st.found=0;st.rev=false;
    const W=p.W,H=p.H,u=p.u,Z=this.Z(p);const n=W*H>u*u*60?9:7;const pts=[];
    for(let i=0;i<n;i++){let x,y,k=0,bad;do{x=R.num(u*1.3,W-u*1.3);y=R.num(Z.y0+u*1.5,Z.y1-u*1.2);bad=pts.some(q=>Math.hypot(q[0]-x,q[1]-y)<u*2.6)||(x<u*2.6&&y>H-u*3);k++;}while(k<60&&bad);pts.push([x,y]);}
    const vel=()=>{const a=R.num(0,TAU),s=u*R.num(.25,.55)*p.pace;return[Math.cos(a)*s,Math.sin(a)*s];};
    st.qmax=(st.k==='use'?34:28)/p.pace;st.qt=st.qmax;
    if(st.k==='use'){const gs=R.sample(MIC_USE.good,3),bs=R.sample(MIC_USE.bad,n-3);const all=R.shuffle([...gs.map(a=>({e:a[0],t:a[1],ok:true,by:a[2]})),...bs.map(a=>({e:a[0],t:a[1],ok:false}))]);
      st.items=all.map((a,i)=>{const v=vel();return Object.assign(a,{cx:pts[i][0],cy:pts[i][1],vx:v[0]*.5,vy:v[1]*.5,ph:R.num(0,6),rot:0});});st.need=3;
      p.ask('🔬 세균이나 균류를 <b>이용해 만든 것</b>을 찾아 톡!','3개 숨어 있어요');return;}
    const kinds=st.k==='proto'?['zip','hae','ame','eug']:['mold','mush','coc','bac','spi'];const target=R.pick(kinds);st.target=target;
    const others=kinds.filter(k=>k!==target);const list=[target,target];while(list.length<n)list.push(R.pick(others));
    st.items=R.shuffle(list).map((k,i)=>{const v=vel();return{kind:k,ok:k===target,cx:pts[i][0],cy:pts[i][1],vx:v[0],vy:v[1],rot:R.num(0,6),ph:R.num(0,6)};});st.need=2;
    const m=MIC[target];p.ask(`🔬 <b>${m.n}</b>${J(m.n,'을').slice(m.n.length)} 찾아 톡!`,`${m.g} · ${m.d}`);},
  lensR(p){return Math.min(p.u*2.3,Math.min(p.W,p.H)*.3);},
  update(p,dt){const st=p.state,u=p.u,Z=this.Z(p);st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    st.lx+=(st.tx-st.lx)*Math.min(1,dt*12);st.ly+=(st.ty-st.ly)*Math.min(1,dt*12);
    for(const it of st.items){if(it.gone)continue;it.ph+=dt;it.cx+=it.vx*dt;it.cy+=it.vy*dt;it.rot+=dt*.25*Math.sin(it.ph*.7);
      if(it.cx<u*1.1){it.cx=u*1.1;it.vx=Math.abs(it.vx);}if(it.cx>p.W-u*1.1){it.cx=p.W-u*1.1;it.vx=-Math.abs(it.vx);}
      if(it.cy<Z.y0+u*1.3){it.cy=Z.y0+u*1.3;it.vy=Math.abs(it.vy);}if(it.cy>Z.y1-u*.9){it.cy=Z.y1-u*.9;it.vy=-Math.abs(it.vy);}}
    if(st.qmax>0&&!st.rev&&st.found<st.need){st.qt-=dt;if(st.qt<=0){st.rev=true;st.mood='oops';st.moodT=2;
      p.hit(false,{pen:10,x:p.W/2,y:p.H*.45,tip:'시간이 다 됐어요! 초록으로 빛나는 것이 정답이에요',tipMs:2600});
      st.items.forEach(it=>{if(it.ok&&!it.gone){const rv=st.k==='use'?`${it.t} → ${it.by}을(를) 이용해 만들어요`:`${MIC[it.kind].n}: ${MIC[it.kind].d}`;if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}});
      setTimeout(()=>{if(p.active)this.round(p);},2400);}}},
  pill(g,str,x,y,s,bg,fg,al){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.2;const xx=al==='r'?x-w/2:x;K.card(g,xx-w/2,y-s*.8,w,s*1.6,s*.4,bg,{blur:s*.5,dy:s*.12,hi:false,stroke:'#a3e635',lw:1.5});K.txt(g,str,xx,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,Z=this.Z(p);
    const R=this.lensR(p),zm=1.3,lx=st.lx,ly=st.ly;
    const drawIt=(g,it)=>{const x=it.cx,y=it.cy;
      if(st.k==='use'){K.shadow(g,x,y+u*.45,u*.55,u*.12,.12);K.emo(g,it.e,x,y-u*.15,u*1.2);K.tag(g,it.t,x,y+u*.78,{size:u*.34,maxW:u*3,color:'#1e293b'});}
      else drawOrg(g,it.kind,x,y,u,it.rot,t+it.ph);
      if(it.bad){g.save();g.strokeStyle='#f43f5e';g.lineWidth=Math.max(2,u*.08);g.shadowColor='#f43f5e';g.shadowBlur=u*.3;g.beginPath();g.arc(x,y,u*1.1,0,7);g.stroke();g.restore();}};
    const dimIt=(g,it)=>{g.save();const rv=st.rev&&it.ok;g.globalAlpha=rv?.95:.07;
      if(rv){g.shadowColor='#4ade80';g.shadowBlur=u*.6;g.strokeStyle='#4ade80';g.lineWidth=Math.max(2,u*.1);g.beginPath();g.arc(it.cx,it.cy,u*1.15,0,7);g.stroke();g.shadowBlur=0;}
      if(st.k==='use'){K.emo(g,it.e,it.cx,it.cy-u*.15,u*1.2);if(rv)K.tag(g,it.t,it.cx,it.cy+u*.78,{size:u*.34,maxW:u*3,color:'#fff'});}else drawOrg(g,it.kind,it.cx,it.cy,u,it.rot,t+it.ph);g.restore();};
    lensView(g,W,H,u,lx,ly,R,zm,t,st.items,drawIt,dimIt,p.color);
    /* 탐정 */
    let near=null,nd=1e9;for(const it of st.items){if(it.gone)continue;const d=Math.hypot(it.cx-lx,it.cy-ly);if(d<nd){nd=d;near=it;}}
    sleuth(g,u*1.5,H-u*1.7,u*1.35,st.mood,t,near?[(near.cx-u*1.5)/W*3,(near.cy-H+u*1.7)/H*3]:null);
    this.pill(g,`🔎 찾은 수 ${st.found}/${st.need}`,W-u*.3,Z.y0+u*.45,u*.4,'rgba(13,27,42,.92)','#d9f99d','r');
    if(st.qmax>0&&!st.rev){const f=clamp(st.qt/st.qmax,0,1);const bw=Math.min(W*.6,u*10),bh=Math.max(6,u*.18),bx=W/2-bw/2+u*1.2,by=H-u*.4;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.14)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#a3e635':(f>.2?'#facc15':'#f43f5e');g.fill();}},
  down(p,x,y){p.state.tx=x;p.state.ty=y;},
  move(p,x,y,down,e){if(down||(e&&e.pointerType==='mouse')){p.state.tx=x;p.state.ty=y;}},
  up(p,x,y,d){const st=p.state,u=p.u;if(st.rev)return;if(Math.hypot(x-d.x0,y-d.y0)>12)return;
    const R=this.lensR(p),zm=1.3;st.tx=x;st.ty=y;
    const pos=it=>{const dx=it.cx-st.lx,dy=it.cy-st.ly;return Math.hypot(dx,dy)*zm<R?[st.lx+dx*zm,st.ly+dy*zm,zm]:[it.cx,it.cy,1];};
    let it=null,bd=1e9,bp=null;for(const i of st.items){if(i.gone)continue;const q=pos(i);const dd=Math.hypot(q[0]-x,q[1]-y)/q[2];if(dd<bd){bd=dd;it=i;bp=q;}}
    if(!it||bd>u*1.1)return;
    if(it.ok){it.gone=true;st.found++;st.mood='happy';st.moodT=1.2;
      const tip=st.k==='use'?`${it.t}: ${it.by}${J(it.by,'을').slice(it.by.length)} 이용해 만들어요`:`${MIC[it.kind].n}: ${MIC[it.kind].d}`;
      p.hit(true,{x:bp[0],y:bp[1]-u,tip,color:'#a3e635'});if(st.found>=st.need)setTimeout(()=>{if(p.active)this.round(p);},700);}
    else{if(it.bad)return;it.bad=true;st.mood='oops';st.moodT=1.2;
      const tip=st.k==='use'?`${it.t}${J(it.t,'은').slice(it.t.length)} 미생물을 이용해 만든 것이 아니에요`:`이건 <b>${MIC[it.kind].n}</b>${IEYO(MIC[it.kind].n)} (${MIC[it.kind].d})`;
      const rv=st.k==='use'?'세균·균류를 이용한 것: 김치, 된장, 요구르트, 치즈, 빵, 페니실린':`${MIC[st.target].n}: ${MIC[st.target].d}`;
      p.hit(false,{x:bp[0],y:bp[1]-u,tip,review:rv});}},
};

Engine.boot(GAME);
