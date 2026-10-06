/* 4학년 · 밤하늘 관찰 — 밤하늘 탐험대 (별자리 잇기·북극성 찾기, 달 모양 순서, 행성 순서)
   디자인: 보랏빛 밤하늘과 금빛 별. 별이 친구가 같이 관찰하고, 가끔 지나가는 별똥별을 톡 잡으면 보너스! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4l5.5 12.5L43 18l-10 9.5L35.5 41 24 34l-11.5 7L15 27.5 5 18l13.5-1.5z" fill="#fcd34d" stroke="#b45309" stroke-width="2.5" stroke-linejoin="round"/><circle cx="20" cy="22" r="2" fill="#4c1d95"/><circle cx="28" cy="22" r="2" fill="#4c1d95"/><path d="M20 28q4 3 8 0" stroke="#4c1d95" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
const BGS=Array.from({length:70},(_,i)=>{const f=k=>{const x=Math.sin(i*12.9898+k*78.233)*43758.5453;return x-Math.floor(x);};return[f(1),f(2),.5+f(3)*1.1,f(4)*6];});
function pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=g.measureText(str).width+s*1.2;K.card(g,x-w/2,y-s*.8,w,s*1.6,s*.8,bg,{blur:s*.6,dy:s*.15,hi:false});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();}
function sky(g,W,H,u,t){
  K.vgrad(g,0,0,W,H,['#070b24','#121a4a','#2a2366']);
  g.save();g.translate(W*.5,H*.45);g.rotate(-.35);const mw=g.createLinearGradient(0,-H*.22,0,H*.22);mw.addColorStop(0,'rgba(167,139,250,0)');mw.addColorStop(.5,'rgba(196,181,253,.13)');mw.addColorStop(1,'rgba(167,139,250,0)');g.fillStyle=mw;g.fillRect(-W,-H*.22,W*2,H*.44);g.restore();
  K.glow(g,W*.82,H*.22,Math.max(W,H)*.25,'#7c3aed',.16);K.glow(g,W*.15,H*.8,Math.max(W,H)*.25,'#0ea5e9',.12);
  for(const s of BGS){g.globalAlpha=.35+.35*Math.sin(t*2+s[3]);g.fillStyle='#fff';g.beginPath();g.arc(s[0]*W,s[1]*H,s[2],0,7);g.fill();}g.globalAlpha=1;
  g.fillStyle='#0a0f2c';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=W/30)g.lineTo(x,H-u*.32-Math.abs(Math.sin(x/W*7))*u*.28);g.lineTo(W,H);g.fill();}
function moon(g,x,y,r,ph){K.glow(g,x,y,r*1.6,'#fef3c7',.16+.2*(1-Math.abs(ph-.5)*2));
  const dk=g.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);dk.addColorStop(0,'#3a4677');dk.addColorStop(1,'#1c2348');g.fillStyle=dk;g.beginPath();g.arc(x,y,r,0,7);g.fill();
  g.save();g.translate(x,y);let q=ph;if(q>.5){g.scale(-1,1);q=1-q;}
  const k=Math.cos(q*2*Math.PI)*r;const lt=g.createRadialGradient(r*.2,-r*.35,r*.1,0,0,r*1.05);lt.addColorStop(0,'#fffbe6');lt.addColorStop(.6,'#fde9a6');lt.addColorStop(1,'#e8c869');
  g.fillStyle=lt;g.beginPath();g.arc(0,0,r,-Math.PI/2,Math.PI/2,false);
  if(q<.25)g.ellipse(0,0,Math.abs(k),r,0,Math.PI/2,-Math.PI/2,true);else g.ellipse(0,0,Math.abs(k)+.01,r,0,Math.PI/2,Math.PI*1.5,false);g.fill();g.restore();
  g.save();g.beginPath();g.arc(x,y,r,0,7);g.clip();g.fillStyle='rgba(120,90,40,.13)';[[-.35,-.2,.18],[.25,.3,.14],[.1,-.45,.1],[-.15,.45,.09],[.45,-.05,.08]].forEach(([a,b,c])=>{g.beginPath();g.arc(x+a*r,y+b*r,c*r,0,7);g.fill();});g.restore();
  g.strokeStyle='rgba(199,210,254,.35)';g.lineWidth=Math.max(1.5,r*.03);g.beginPath();g.arc(x,y,r,0,7);g.stroke();}
function planet(g,o,u,t,label){const [n,s,c]=o.pl,x=o.x,y=o.y,r=o.r;
  if(n==='토성'){g.save();g.translate(x,y);g.rotate(-.3);g.strokeStyle='rgba(214,178,94,.85)';g.lineWidth=r*.2;g.beginPath();g.ellipse(0,0,r*1.7,r*.45,0,Math.PI,Math.PI*2);g.stroke();g.strokeStyle='rgba(250,232,180,.6)';g.lineWidth=r*.07;g.beginPath();g.ellipse(0,0,r*1.45,r*.36,0,Math.PI,Math.PI*2);g.stroke();g.restore();}
  K.glow(g,x,y,r*1.5,c,.22);
  const gr=g.createRadialGradient(x-r*.4,y-r*.4,r*.1,x,y,r);gr.addColorStop(0,K.shade(c,.45));gr.addColorStop(.65,c);gr.addColorStop(1,K.shade(c,-.45));g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();
  g.save();g.beginPath();g.arc(x,y,r,0,7);g.clip();
  if(n==='목성'){[[-.5,.12,'rgba(194,65,12,.45)'],[-.1,.14,'rgba(255,237,213,.55)'],[.25,.16,'rgba(194,65,12,.4)'],[.6,.1,'rgba(255,237,213,.4)']].forEach(([f,h,cc])=>{g.fillStyle=cc;g.fillRect(x-r,y+f*r-h*r/2,r*2,h*r);});
    g.fillStyle='rgba(185,28,28,.55)';g.beginPath();g.ellipse(x+r*.3,y+r*.28,r*.18,r*.09,0,0,7);g.fill();}
  if(n==='지구'){g.fillStyle='#4ade80';[[-.3,-.15,.38,.26,.5],[.35,.35,.3,.18,-.4],[.3,-.5,.2,.12,.2]].forEach(([a,b,rx,ry,tt])=>{g.beginPath();g.ellipse(x+a*r,y+b*r,rx*r,ry*r,tt,0,7);g.fill();});
    g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.ellipse(x+r*.05,y-r*.05,r*.5,r*.07,-.3,0,7);g.fill();}
  if(n==='화성'){g.fillStyle='rgba(127,29,29,.3)';g.beginPath();g.ellipse(x-r*.2,y+r*.1,r*.35,r*.2,.3,0,7);g.fill();g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.ellipse(x,y-r*.92,r*.35,r*.12,0,0,7);g.fill();}
  if(n==='수성'){g.fillStyle='rgba(68,64,60,.28)';[[-.3,-.2,.18],[.3,.25,.14],[.2,-.4,.1]].forEach(([a,b,cc])=>{g.beginPath();g.arc(x+a*r,y+b*r,cc*r,0,7);g.fill();});}
  if(n==='금성'||n==='토성'||n==='천왕성'||n==='해왕성'){g.fillStyle='rgba(255,255,255,.18)';[-.35,.15].forEach(f=>{g.fillRect(x-r,y+f*r,r*2,r*.14);});}
  g.restore();
  g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(x-r*.35,y-r*.45,r*.32,r*.16,-.6,0,7);g.fill();
  if(n==='토성'){g.save();g.translate(x,y);g.rotate(-.3);g.strokeStyle='rgba(214,178,94,.95)';g.lineWidth=r*.2;g.beginPath();g.ellipse(0,0,r*1.7,r*.45,0,0,Math.PI);g.stroke();g.strokeStyle='rgba(250,232,180,.75)';g.lineWidth=r*.07;g.beginPath();g.ellipse(0,0,r*1.45,r*.36,0,0,Math.PI);g.stroke();g.restore();}
  if(label!==false)pill(g,n,x,y+r+u*.4,u*.31,'rgba(30,38,90,.88)','#e0e7ff');}
function star(g,x,y,r,col,glow){K.glow(g,x,y,r*(glow?4:2.6),col,glow?.6:.35);g.save();g.fillStyle=col;g.beginPath();
  for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,rr=i%2?r*.38:r*1.25;g[i?'lineTo':'moveTo'](x+Math.cos(a)*rr,y+Math.sin(a)*rr);}g.closePath();g.fill();
  g.fillStyle='#fff';g.beginPath();g.arc(x,y,r*.38,0,7);g.fill();g.restore();}
/* 별이: 탐험 친구 (파란 잠옷 모자를 쓴 별) */
function buddy(g,x,y,s,mood,t){g.save();g.translate(x,y);g.rotate(mood==='oops'?Math.sin(t*28)*.1:Math.sin(t*1.6)*.06);g.scale(1+(mood==='happy'?Math.abs(Math.sin(t*9))*.06:0),1);
  K.glow(g,0,0,s*1.2,'#fde68a',.3);
  g.fillStyle='#fcd34d';g.strokeStyle='#b45309';g.lineWidth=s*.06;g.lineJoin='round';g.beginPath();
  for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,rr=i%2?s*.34:s*.62;const px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?g.lineTo(px,py):g.moveTo(px,py);}g.closePath();g.fill();g.stroke();
  g.fillStyle='#4f46e5';g.beginPath();g.moveTo(-s*.28,-s*.28);g.quadraticCurveTo(-s*.1,-s*.8,s*.34,-s*.7);g.quadraticCurveTo(s*.3,-s*.4,s*.28,-s*.28);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff';g.beginPath();g.arc(s*.36,-s*.72,s*.1,0,TAU);g.fill();
  g.fillStyle='#4c1d95';g.strokeStyle='#4c1d95';g.lineWidth=s*.04;g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.15,ey=-s*.05;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.05,ey-s*.05);g.lineTo(ex+s*.05,ey+s*.05);g.moveTo(ex+s*.05,ey-s*.05);g.lineTo(ex-s*.05,ey+s*.05);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.05,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,s*.04,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.arc(0,s*.1,s*.09,0,Math.PI);g.fill();}else if(mood==='oops'){g.arc(0,s*.2,s*.06,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,s*.08,s*.06,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(244,114,182,.5)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.26,s*.08,s*.06,s*.035,0,0,TAU);g.fill();}
  g.restore();}
function shoot(g,x,y,a,len,al){g.save();g.globalAlpha=al;const gr=g.createLinearGradient(x,y,x-Math.cos(a)*len,y-Math.sin(a)*len);gr.addColorStop(0,'#fff');gr.addColorStop(1,'rgba(165,180,252,0)');g.strokeStyle=gr;g.lineWidth=len*.05+1;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x-Math.cos(a)*len,y-Math.sin(a)*len);g.stroke();K.glow(g,x,y,len*.18,'#fde68a',.8);g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;sky(g,W,H,u,T);
    /* 국자별 그려지는 중 */
    const c=CONS.dipper.pts;const sc=wide?W*.3:W*.55,ox=wide?W*.06:W*.2,oy=wide?H*.7:H*.82;const n=c.length;const prog=(T*.5)%(n+3);
    g.save();g.strokeStyle='#fde047';g.lineWidth=Math.max(2,u*.05);g.lineCap='round';g.shadowColor='#facc15';g.shadowBlur=u*.3;g.beginPath();for(let i=0;i<n&&i<prog;i++){const q=c[i],x=ox+q[0]*sc,y=oy+q[1]*sc*1.1;i?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();g.restore();
    c.forEach((q,i)=>star(g,ox+q[0]*sc,oy+q[1]*sc*1.1,u*(i<prog?.28:.18),i<prog?'#fde047':'#e0e7ff',i<prog));
    moon(g,W*(wide?.84:.78),H*(wide?.3:.5),u*(wide?1.5:1.3),(T*.07)%1);
    planet(g,{pl:PLANETS[5],x:W*(wide?.62:.2),y:H*(wide?.2:.5),r:u*.7},u,T,false);
    const sa=(T*.35)%3;if(sa<1)shoot(g,W*(.1+sa*.6),H*(.05+sa*.3),.5,u*3,1-sa);
    buddy(g,wide?W*.5:W*.84,wide?H*.84:H*.84,u*1.2,Math.sin(T*.7)>.2?'happy':'neutral',T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;return{y0:Math.max(p.top||0,u*2.6)};},
  init(p){const st=p.state;Object.assign(st,{kN:0,objs:[],path:[],T:0,mood:'neutral',moodT:0,shoot:null,shootT:7,rev:false,qt:0,qmax:0});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;st.k=L==='all'?['cons','moon','planet'][st.kN++%3]:L;st.objs=[];st.path=[];st.step=0;st.phase=null;st.lock=false;st.rev=false;st.polFound=false;
    const W=p.W,H=p.H,u=p.u,Z=this.Z(p);const land=W>H;
    st.qmax=({cons:50,moon:22,planet:40}[st.k])/p.pace;st.qt=st.qmax;
    if(st.k==='cons'){const c=CONS[p.deck(['dipper','cass'],'cons')];st.con=c;
      const pts=c.pts;let pol;if(c.ptr){const a=pts[c.ptr[0]],b=pts[c.ptr[1]];pol=[b[0]+(b[0]-a[0])*5,b[1]+(b[1]-a[1])*5];}else{pol=[.38,-.75];}
      const all=[...pts,pol];const minX=Math.min(...all.map(q=>q[0])),maxX=Math.max(...all.map(q=>q[0])),minY=Math.min(...all.map(q=>q[1])),maxY=Math.max(...all.map(q=>q[1]));
      const ax0=land?u*3.2:u*.8,ax1=W-u*.8,ay0=Z.y0+u*.5,ay1=H-u*(land?1.2:3.2);
      const sc=Math.min((ax1-ax0)/(maxX-minX||1),(ay1-ay0)/(maxY-minY||1));const ox=ax0+((ax1-ax0)-(maxX-minX)*sc)/2-minX*sc,oy=ay0+((ay1-ay0)-(maxY-minY)*sc)/2-minY*sc;
      const flip=R.chance(.5);const tx=q=>flip?(ax0+ax1)-(ox+q[0]*sc):ox+q[0]*sc;
      st.objs=pts.map((q,i)=>({x:tx(q),y:oy+q[1]*sc,i,kind:'star',r:u*.32}));st.polaris={x:tx(pol),y:oy+pol[1]*sc,kind:'polaris',r:u*.3};
      for(let k=0;k<6;k++){let x,y,t=0;do{x=R.num(ax0,ax1);y=R.num(ay0,ay1);t++;}while(t<40&&[...st.objs,st.polaris].some(o=>Math.hypot(o.x-x,o.y-y)<u*1.6));st.objs.push({x,y,kind:'decoy',r:u*.28});}
      st.objs.push(st.polaris);
      p.ask(`✨ <b>${c.n}</b>의 별을 끝에서부터 차례로 톡톡 이어요!`,c.n==='북두칠성'?'국자 모양 일곱 별':'W 모양 다섯 별');return;}
    if(st.k==='moon'){const order=R.chance(.6);const list=R.shuffle(MOONS);const n=list.length;
      st.objs=list.map((m,i)=>({m,kind:'moon',r:Math.min(u*1,W/(n+1)*.42)}));this.scatter(p,st.objs);
      if(order){st.phase='order';p.ask('🌙 달의 모양이 바뀌는 <b>순서대로</b> 톡톡!','초승달부터 시작해요');}
      else{const t=R.pick(MOONS);st.phase='one';st.ans=t[0];p.ask(`🌙 <b>${t[2]}</b>에 보이는 달은?`,'알맞은 달을 톡!');}return;}
    const order=R.chance(.5);st.objs=PLANETS.map(pl=>({pl,kind:'planet',r:u*(.35+pl[1]*.55)}));this.scatter(p,st.objs,true);
    if(order){st.phase='order';p.ask('🪐 태양에서 <b>가까운 순서대로</b> 톡톡!','수 · 금 · 지 · 화 · 목 · 토 · 천 · 해');}
    else{const q=R.pick(PL_Q);st.phase='one';st.ans=q[1];p.ask('🪐 '+q[0],'알맞은 행성을 톡!');}},
  scatter(p,objs,sun){const R=p.R,W=p.W,H=p.H,u=p.u,Z=this.Z(p);const x0=sun?u*2.4:u;const placed=[];
    for(const o of objs){let x,y,t=0,bad;do{x=R.num(x0+o.r,W-o.r-u*.3);y=R.num(Z.y0+o.r+u*.4,H-o.r-u*1.1);bad=placed.some(q=>Math.hypot(q.x-x,q.y-y)<q.r+o.r+u*.9)||(x>W-u*2.4&&y>H-u*2.6);t++;}while(t<120&&bad);o.x=x;o.y=y;placed.push(o);}},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    st.shootT-=dt;if(st.shootT<=0&&!st.shoot){const Z=this.Z(p);st.shoot={x:W*p.Rf.num(.5,1),y:Z.y0+u*.2,a:Math.PI*p.Rf.num(.7,.85),v:u*7,t:0};st.shootT=p.Rf.num(9,16);}
    if(st.shoot){const s=st.shoot;s.t+=dt;s.x+=Math.cos(s.a)*s.v*dt;s.y+=Math.sin(s.a)*s.v*dt;if(s.x<-u*3||s.y>H+u*2||s.t>6)st.shoot=null;}
    if(!st.lock&&!st.rev){st.qt-=dt;if(st.qt<=0)this.timeout(p);}},
  timeout(p){const st=p.state,u=p.u;st.rev=true;st.lock=true;st.mood='oops';st.moodT=2.2;
    let tip='시간이 다 됐어요! 정답을 알려 줄게요';
    if(st.k==='cons'){const c=st.con;st.objs.forEach(o=>{if(o.kind==='star'){o.no=o.i+1;st.path.push(o);}});st.polFound=true;tip=`시간이 다 됐어요! 별은 이 순서로 이어요. ${c.d}`;p.wrong.length<40&&!p.wrong.includes(`북극성 찾기 — ${c.d}`)&&p.wrong.push(`북극성 찾기 — ${c.d}`);}
    else if(st.phase==='one'){const o=st.objs.find(o=>(o.kind==='moon'?o.m[0]:o.pl[0])===st.ans);if(o){o.done=true;o.no='✓';}tip=`시간이 다 됐어요! 정답은 <b>${st.ans}</b>`;
      const rv=st.k==='moon'?`${MOONS.find(m=>m[0]===st.ans)[2]} → ${st.ans}`:`${PL_Q.find(q=>q[1]===st.ans)[0]} → ${st.ans}`;if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}
    else{const seq=st.k==='moon'?MOONS.map(m=>m[0]):PLANETS.map(q=>q[0]);st.objs.forEach(o=>{const n=o.kind==='moon'?o.m[0]:o.pl[0];o.done=true;o.bad=false;o.no=seq.indexOf(n)+1;});tip='시간이 다 됐어요! '+seq.join(' → ');
      const rv=(st.k==='moon'?'달의 모양 순서: ':'행성 순서: ')+seq.join(' → ');if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}
    p.hit(false,{pen:10,x:p.W/2,y:p.H*.5,tip,tipMs:3000});setTimeout(()=>{if(p.active)this.round(p);},3000);},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,Z=this.Z(p);
    sky(g,W,H,u,t);
    if(st.shoot){const s=st.shoot;shoot(g,s.x,s.y,s.a+Math.PI,u*3.2,1);}
    if(st.k==='cons'){
      const c=st.con,cw=u*2.6,ch=u*1.6,land=W>H,px=u*.3,py=land?Z.y0+u*.3:H-ch-u*.5;K.card(g,px,py,cw,ch,u*.25,'rgba(30,38,90,.78)',{stroke:'rgba(165,180,252,.45)',lw:1.5,blur:u*.3,dy:u*.08});
      const xs=c.pts.map(q=>q[0]),ys=c.pts.map(q=>q[1]);const s=Math.min((cw-u*.5)/(Math.max(...xs)-Math.min(...xs)),(ch-u*.7)/(Math.max(...ys)-Math.min(...ys)));
      g.strokeStyle='#a5b4fc';g.lineWidth=1.5;g.beginPath();const pp=c.pts.map(q=>[px+u*.25+(q[0]-Math.min(...xs))*s,py+u*.25+(q[1]-Math.min(...ys))*s]);pp.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();
      g.fillStyle='#fde68a';pp.forEach(([x,y])=>{g.beginPath();g.arc(x,y,2.2,0,7);g.fill();});
      K.txt(g,c.n,px+cw/2,py+ch-u*.22,{size:u*.26,color:'#e0e7ff'});
      if(st.path.length>1){g.save();g.strokeStyle='#fde047';g.lineWidth=Math.max(3,u*.07);g.lineCap='round';g.lineJoin='round';g.shadowColor='#facc15';g.shadowBlur=u*.35;g.beginPath();st.path.forEach((o,i)=>i?g.lineTo(o.x,o.y):g.moveTo(o.x,o.y));g.stroke();g.restore();}
      if((st.phase==='polaris'||st.rev)&&c.ptr){const a=st.objs[c.ptr[0]],b=st.objs[c.ptr[1]];g.save();g.setLineDash([u*.1,u*.16]);g.lineWidth=2;g.strokeStyle='rgba(250,204,21,.45)';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(st.polaris.x,st.polaris.y);g.stroke();g.restore();}
      for(const o of st.objs){const tw=1+.15*Math.sin(t*3+o.x);const lit=st.path.includes(o)||(o===st.polaris&&st.polFound);
        star(g,o.x,o.y,o.r*tw*.5,lit?'#fde047':'#e0e7ff',lit);
        if(st.rev&&o.no)K.txt(g,String(o.no),o.x,o.y-o.r*1.5,{size:u*.3,color:'#fde68a',stroke:'#1e1b4b',lw:u*.08});
        if(o.bad){g.save();g.strokeStyle='#fb7185';g.lineWidth=2.5;g.shadowColor='#f43f5e';g.shadowBlur=8;g.beginPath();g.arc(o.x,o.y,o.r*1.4,0,7);g.stroke();g.restore();}}
      if(st.polFound)pill(g,'⭐ 북극성',st.polaris.x,st.polaris.y-u*.75,u*.32,'#fde68a','#713f12');}
    else{
      if(st.k==='planet'){const sx=-u*1.2,sy=Z.y0+(H-Z.y0)/2;K.glow(g,sx,sy,u*5.5,'#fb923c',.45);K.glow(g,sx,sy,u*4,'#fde68a',.5);
        const sg=g.createRadialGradient(sx+u*.8,sy-u*.6,u*.3,sx,sy,u*3);sg.addColorStop(0,'#fffbeb');sg.addColorStop(.45,'#fcd34d');sg.addColorStop(1,'#f97316');g.fillStyle=sg;g.beginPath();g.arc(sx,sy,u*3,0,7);g.fill();
        K.txt(g,'태양',u*.85,sy,{size:u*.42,color:'#7c2d12'});}
      for(const o of st.objs){if(o.kind==='moon'){K.shadow(g,o.x,o.y+o.r*1.05,o.r*.6,o.r*.1,.25);moon(g,o.x,o.y,o.r,o.m[1]);if(o.done||o.bad)pill(g,o.m[0],o.x,o.y+o.r+u*.42,u*.32,o.bad?'#fecdd3':'#fef3c7',o.bad?'#9f1239':'#713f12');}
        else planet(g,o,u,t);
        if(o.done){g.save();g.strokeStyle='#4ade80';g.lineWidth=3;g.shadowColor='#22c55e';g.shadowBlur=u*.3;g.beginPath();g.arc(o.x,o.y,o.r+u*.15,0,7);g.stroke();g.restore();
          const bx=o.x+o.r*.8,by=o.y-o.r*.8;K.orb(g,bx,by,u*.26,'#22c55e');K.txt(g,o.no,bx,by+1,{size:u*.28,color:'#fff'});}
        if(o.bad){g.save();g.strokeStyle='#fb7185';g.lineWidth=3;g.shadowColor='#f43f5e';g.shadowBlur=u*.3;g.beginPath();g.arc(o.x,o.y,o.r+u*.15,0,7);g.stroke();g.restore();}}}
    buddy(g,W-u*1.2,H-u*1.4,u*1.35,st.mood,t);
    if(!st.lock&&!st.rev){const f=clamp(st.qt/st.qmax,0,1),bw=Math.min(W*.5,u*9),bh=Math.max(5,u*.14),bx=W/2-bw/2,by=H-u*.3;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(255,255,255,.14)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#fcd34d':(f>.2?'#fb923c':'#f43f5e');g.fill();}},
  pickAt(p,x,y,list){let best=null,bd=1e9;for(const o of list){const d=Math.hypot(o.x-x,o.y-y);if(d<Math.max(o.r*1.3,p.u*.75)&&d<bd){bd=d;best=o;}}return best;},
  next(p,ms){const st=p.state;st.lock=true;setTimeout(()=>{if(p.active)this.round(p);},ms||700);},
  down(p,x,y){const st=p.state,u=p.u;
    if(st.shoot&&Math.hypot(x-st.shoot.x,y-st.shoot.y)<u*1.3){const s=st.shoot;st.shoot=null;st.mood='happy';st.moodT=1;p.add(5,s.x,s.y);p.Snd.bell(1200,0,.08,.3);p.ring&&p.ring(s.x,s.y,'#fde047');p.tip('🌠 별똥별을 잡았어요! 보너스 +5','good',1200);return;}
    if(st.lock)return;
    if(st.k==='cons'){const o=this.pickAt(p,x,y,st.objs);if(!o)return;const c=st.con;
      if(st.phase==='polaris'){if(o===st.polaris){st.polFound=true;st.mood='happy';st.moodT=1.2;p.hit(true,{x:o.x,y:o.y-u,tip:'북극성은 항상 북쪽 하늘에 있어 방위를 알 수 있어요'});this.next(p,1100);}
        else if(!o.bad){o.bad=true;st.mood='oops';st.moodT=1;p.hit(false,{x:o.x,y:o.y-u,tip:c.d,review:`북극성 찾기 — ${c.d}`});}return;}
      if(o.kind!=='star'){if(!o.bad){o.bad=true;st.mood='oops';st.moodT=1;p.hit(false,{pen:15,x:o.x,y:o.y-u,tip:`그 별은 ${c.n}의 별이 아니에요`,review:`${c.n}: ${c.d}`});}return;}
      if(st.path.includes(o))return;const n=c.pts.length;
      let ok;if(!st.path.length)ok=o.i===0||o.i===n-1;else{const last=st.path[st.path.length-1];ok=Math.abs(o.i-last.i)===1&&(st.path.length<2||Math.sign(o.i-last.i)===Math.sign(last.i-st.path[st.path.length-2].i));}
      if(!ok){p.Snd.bad();p.tip(st.path.length?'바로 옆에 이어지는 별을 눌러요':'모양의 맨 끝 별부터 시작해요','bad',1500);p.shake();st.mood='oops';st.moodT=.8;return;}
      st.path.push(o);p.Snd.bell(660+st.path.length*80,0,.05,.25);
      if(st.path.length===n){st.polFound=false;st.mood='happy';st.moodT=1.2;st.qt=Math.max(st.qt,15/p.pace);p.hit(true,{pts:150,x:o.x,y:o.y-u,tip:`${c.n} 완성! 이제 <b>북극성</b>을 찾아 톡!`});st.phase='polaris';p.ask(`⭐ 이제 <b>북극성</b>을 찾아 톡!`,c.d);}
      return;}
    const o=this.pickAt(p,x,y,st.objs.filter(o=>!o.done));if(!o)return;
    const name=o.kind==='moon'?o.m[0]:o.pl[0];const seq=o.kind==='moon'?MOONS.map(m=>m[0]):PLANETS.map(q=>q[0]);
    if(st.phase==='one'){const ok=name===st.ans;if(ok){o.done=true;o.no='✓';this.next(p);}else{if(o.bad)return;o.bad=true;}
      st.mood=ok?'happy':'oops';st.moodT=1;
      p.hit(ok,{x:o.x,y:o.y-o.r,tip:ok?(o.kind==='moon'?`${name}: ${MOONS.find(m=>m[0]===name)[2]}`:''):`그건 ${name}! 정답: <b>${st.ans}</b>`,review:(o.kind==='moon'?`${MOONS.find(m=>m[0]===st.ans)[2]} → ${st.ans}`:`${PL_Q.find(q=>q[1]===st.ans)[0]} → ${st.ans}`)});return;}
    const want=seq[st.step];
    if(name===want){o.done=true;o.bad=false;st.step++;o.no=st.step;p.Snd.bell(600+st.step*70,0,.06,.3);
      if(st.step>=seq.length){st.mood='happy';st.moodT=1.2;p.hit(true,{pts:150,x:o.x,y:o.y-o.r,tip:seq.join(' → ')});this.next(p,900);}}
    else{o.bad=true;st.mood='oops';st.moodT=.8;setTimeout(()=>{o.bad=false;},600);p.hit(false,{pen:15,x:o.x,y:o.y-o.r,tip:`${st.step?seq[st.step-1]+' 다음은':'처음은'} <b>${want}</b>${IEYO(want)}`,review:(o.kind==='moon'?'달의 모양 순서: ':'행성 순서: ')+seq.join(' → ')});}},
};

Engine.boot(GAME);
