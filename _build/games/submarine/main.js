/* 3학년 · 지구와 바다 — 바다 탐험 잠수정 (맞는 거품만 모으고 해파리는 피하기)
   디자인: 노란 꼬마 잠수정 + 깊이 내려갈수록 어두워지는 바다. 창문 속 선장 표정이 바뀌어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="16" width="36" height="20" rx="10" fill="#fbbf24" stroke="#b45309" stroke-width="3"/><circle cx="30" cy="26" r="6" fill="#bae6fd" stroke="#b45309" stroke-width="2.5"/><rect x="12" y="9" width="10" height="9" rx="3" fill="#ef4444" stroke="#b45309" stroke-width="2"/><path d="M4 26H0M2 22l-2 4 2 4" stroke="#b45309" stroke-width="2.5" fill="none"/><circle cx="42" cy="12" r="3" fill="#e0f2fe"/><circle cx="45" cy="6" r="2" fill="#e0f2fe"/></svg>';
/*@@DATA@@*/
const mixc=(a,b,t)=>{const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const x=h(a),y=h(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');};
function ocean(g,W,H,u,t,dep){const A=['#5fd0f5','#1f9fd6','#0e6aa8','#0a3f73'],B=['#1d6fa5','#0c4a7e','#082f5b','#041a36'];
  K.vgrad(g,0,0,W,H,A.map((c,i)=>mixc(c,B[i],dep)));
  g.save();g.strokeStyle=`rgba(255,255,255,${.35*(1-dep*.7)})`;g.lineWidth=Math.max(2,u*.06);g.beginPath();for(let x=0;x<=W;x+=8)g[x?'lineTo':'moveTo'](x,u*.12+Math.sin(x*.03+t*2)*u*.08);g.stroke();g.restore();
  g.save();for(let k=0;k<4;k++){const x0=W*(.08+k*.27)+Math.sin(t*.5+k)*u*.6;const gr=g.createLinearGradient(0,0,0,H*.8);gr.addColorStop(0,`rgba(255,255,255,${.2*(1-dep*.8)})`);gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;
    g.beginPath();g.moveTo(x0,0);g.lineTo(x0+W*.07,0);g.lineTo(x0-W*.02+u,H*.8);g.lineTo(x0-W*.1+u,H*.8);g.closePath();g.fill();}g.restore();
  g.save();g.fillStyle='rgba(8,47,90,.45)';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=W/24)g.lineTo(x,H*.8-u*(.6+.6*Math.abs(Math.sin(x/W*5.3))+.3*Math.sin(x/W*13)));g.lineTo(W,H);g.closePath();g.fill();g.restore();
  /* 플랑크톤 반짝 */
  if(dep>.15){g.save();for(let k=0;k<22;k++){const x=(k*131)%W,y=(k*89+t*u*.3*(1+k%3))%H;g.fillStyle=`rgba(190,255,240,${(.15+.35*Math.abs(Math.sin(t+k)))*dep})`;g.beginPath();g.arc(x,y,u*.05+k%3*u*.02,0,TAU);g.fill();}g.restore();}}
function floor(g,W,H,u,t){g.save();g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=W/20)g.lineTo(x,H*.93+Math.sin(x/W*6)*u*.25);g.lineTo(W,H);g.closePath();const sg=g.createLinearGradient(0,H*.88,0,H);sg.addColorStop(0,'#f6dca2');sg.addColorStop(1,'#c9a066');g.fillStyle=sg;g.fill();
  g.strokeStyle='rgba(255,245,215,.6)';g.lineWidth=2;g.beginPath();for(let x=0;x<=W;x+=W/20)g[x?'lineTo':'moveTo'](x,H*.93+Math.sin(x/W*6)*u*.25);g.stroke();g.restore();
  [['🪸',.1,1.2],['🌿',.3,.9],['🐚',.55,.6],['🌿',.75,1.1],['🪸',.92,.9],['⭐',.43,.5]].forEach(([e,f,s],i)=>{const x=W*f,y=H*.93+Math.sin(x/W*6)*u*.25;K.emo(g,e,x,y-u*s*.25,u*s,e==='🌿'?Math.sin(t*1.5+i)*.12:0);});}
/* 귀여운 해파리 */
function jelly(g,x,y,s,t,a,zap){g.save();g.translate(x,y);g.globalAlpha*=a;K.glow(g,0,0,s*1.5,zap?'#fde047':'#e9a8ff',.45);
  g.strokeStyle='rgba(244,170,255,.85)';g.lineWidth=s*.07;g.lineCap='round';for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(i*s*.2,s*.15);for(let k=1;k<=6;k++)g.lineTo(i*s*.2+Math.sin(t*3+k*.9+i)*s*.07*k/3,s*.15+k*s*.13);g.stroke();}
  const gr=g.createRadialGradient(-s*.2,-s*.35,s*.05,0,0,s*.7);gr.addColorStop(0,'#fbe3ff');gr.addColorStop(1,'#c084fc');g.fillStyle=gr;g.strokeStyle='#a855f7';g.lineWidth=s*.05;
  g.beginPath();g.moveTo(-s*.62,s*.18);g.quadraticCurveTo(-s*.62,-s*.7,0,-s*.7);g.quadraticCurveTo(s*.62,-s*.7,s*.62,s*.18);for(let i=3;i>=-3;i--)g.quadraticCurveTo(i*s*.2-s*.1,s*.3+Math.sin(t*4+i)*s*.05,i*s*.2-s*.2*0,s*.18);g.fill();g.stroke();
  g.fillStyle='#4c1d95';for(const d of[-1,1]){g.beginPath();g.arc(d*s*.2,-s*.2,s*.06,0,TAU);g.fill();}g.strokeStyle='#4c1d95';g.lineWidth=s*.04;g.beginPath();g.arc(0,-s*.12,s*.08,.2*Math.PI,.8*Math.PI);g.stroke();
  g.restore();}
function fish(g,x,y,s,col,flip,t){g.save();g.translate(x,y);g.scale(flip,1);g.fillStyle=col;g.beginPath();g.ellipse(0,0,s*.5,s*.28,0,0,TAU);g.fill();
  g.beginPath();g.moveTo(-s*.4,0);g.lineTo(-s*.8,-s*.25+Math.sin(t*8)*s*.08);g.lineTo(-s*.8,s*.25+Math.sin(t*8)*s*.08);g.fill();
  g.fillStyle='#fff';g.beginPath();g.arc(s*.28,-s*.05,s*.07,0,TAU);g.fill();g.fillStyle='#0c4a6e';g.beginPath();g.arc(s*.3,-s*.05,s*.035,0,TAU);g.fill();g.restore();}
/* 잠수정: 창문 속 선장 얼굴 */
function sub(g,x,y,u,face,t,color,mood,propOn){g.save();g.translate(x,y);g.scale(face,1);
  K.glow(g,u*1.5,0,u*1.4,'#fff7c2',.3);
  g.fillStyle='#64748b';g.fillRect(-u*1.15,-u*.08,u*.2,u*.16);const pr=Math.sin(t*22);g.fillStyle='#94a3b8';g.beginPath();g.ellipse(-u*1.22,0,u*.08,u*.32*Math.abs(pr)+u*.05,0,0,7);g.fill();
  g.save();g.shadowColor='rgba(5,30,60,.35)';g.shadowBlur=u*.4;g.shadowOffsetY=u*.15;const bg=g.createLinearGradient(0,-u*.5,0,u*.5);bg.addColorStop(0,'#ffe680');bg.addColorStop(.55,'#fbbf24');bg.addColorStop(1,'#d97706');
  K.rr(g,-u*1,-u*.5,u*2,u*1,u*.5);g.fillStyle=bg;g.fill();g.restore();
  g.fillStyle='rgba(255,255,255,.45)';K.rr(g,-u*.7,-u*.4,u*1.3,u*.18,u*.09);g.fill();
  g.fillStyle='rgba(180,83,9,.35)';for(const rx of[-u*.55,-u*.3,-u*.05])g.beginPath(),g.arc(rx,u*.2,u*.05,0,7),g.fill();
  const tg=g.createLinearGradient(0,-u*.85,0,-u*.45);tg.addColorStop(0,K.shade(color.startsWith('#')?color:'#3b82f6',.25));tg.addColorStop(1,color);g.fillStyle=tg;K.rr(g,-u*.4,-u*.82,u*.5,u*.4,u*.12);g.fill();
  g.fillStyle='#94a3b8';g.fillRect(-u*.05,-u*1.05,u*.07,u*.28);g.fillRect(-u*.05,-u*1.05,u*.2,u*.07);
  /* 창문 + 얼굴 */
  const wx=u*.45,wy=-u*.03;g.fillStyle='#e2e8f0';g.beginPath();g.arc(wx,wy,u*.34,0,7);g.fill();
  const wg=g.createRadialGradient(wx-u*.07,wy-u*.09,u*.03,wx,wy,u*.28);wg.addColorStop(0,'#e0f7ff');wg.addColorStop(1,'#38bdf8');g.fillStyle=wg;g.beginPath();g.arc(wx,wy,u*.28,0,7);g.fill();
  g.fillStyle='#ffe0bd';g.beginPath();g.arc(wx,wy+u*.04,u*.2,0,TAU);g.fill();g.fillStyle='#7c4a1e';g.beginPath();g.arc(wx,wy-u*.02,u*.21,Math.PI*1.05,Math.PI*1.95);g.fill();
  g.strokeStyle='#1f2937';g.fillStyle='#1f2937';g.lineWidth=Math.max(1.2,u*.025);g.lineCap='round';
  for(const d of[-1,1]){const ex=wx+d*u*.08,ey=wy+u*.02;if(mood==='oops'){g.beginPath();g.moveTo(ex-u*.03,ey-u*.03);g.lineTo(ex+u*.03,ey+u*.03);g.moveTo(ex+u*.03,ey-u*.03);g.lineTo(ex-u*.03,ey+u*.03);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+u*.01,u*.035,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.beginPath();g.arc(ex,ey,u*.025,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(wx,wy+u*.1,u*.05,0,Math.PI);g.fill();}else if(mood==='oops'){g.arc(wx,wy+u*.15,u*.04,1.1*Math.PI,1.9*Math.PI);g.stroke();}else{g.arc(wx,wy+u*.09,u*.04,.2*Math.PI,.8*Math.PI);g.stroke();}
  g.fillStyle='rgba(255,255,255,.8)';g.beginPath();g.ellipse(wx-u*.1,wy-u*.17,u*.07,u*.04,-.6,0,7);g.fill();
  g.restore();}
function bubble(g,b,t,glow){g.save();g.globalAlpha=b.leave?.4:1;const r=b.r;
  if(glow){g.shadowColor='#4ade80';g.shadowBlur=r*.7;}
  const gr=g.createRadialGradient(b.x-r*.3,b.y-r*.35,r*.1,b.x,b.y,r);gr.addColorStop(0,'rgba(255,255,255,.97)');gr.addColorStop(.75,glow?'rgba(220,252,231,.95)':'rgba(232,248,255,.9)');gr.addColorStop(1,glow?'rgba(134,239,172,.85)':'rgba(160,220,255,.75)');
  g.fillStyle=gr;g.beginPath();g.arc(b.x,b.y,r,0,7);g.fill();g.shadowColor='transparent';
  g.strokeStyle=glow?'#22c55e':'rgba(255,255,255,.95)';g.lineWidth=Math.max(1.5,r*(glow?.09:.05));g.stroke();
  g.strokeStyle='rgba(125,211,252,.55)';g.lineWidth=Math.max(1.5,r*.06);g.beginPath();g.arc(b.x,b.y,r*.9,.3,1.6);g.stroke();
  const ws=b.t.split(' '),ls=[];let cur='';for(const w of ws){if(cur&&(cur+' '+w).length>8){ls.push(cur);cur=w;}else cur=cur?cur+' '+w:w;}if(cur)ls.push(cur);
  const L2=[];for(const l of ls){if(l.length>9){for(let i=0;i<l.length;i+=8)L2.push(l.slice(i,i+8));}else L2.push(l);}
  const nl=Math.min(3,L2.length),fs=r*(nl===1?.42:nl===2?.34:.28);
  K.emo(g,b.e,b.x,b.y-r*(nl===1?.38:nl===2?.5:.58),r*(nl===1?.72:nl===2?.56:.46));
  L2.slice(0,3).forEach((l,i)=>K.txt(g,l,b.x,b.y+r*(nl===1?.42:nl===2?.14+i*.36:.02+i*.3),{size:fs,maxW:r*1.8,color:'#0c4a6e'}));
  g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(b.x-r*.5,b.y-r*.55,r*.16,r*.09,-.7,0,7);g.fill();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const B=[['🌍','둥근 공'],['🌊','밀물'],['🦀','게'],['🐚','조개'],['🧂','짜요']];
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;ocean(g,W,H,u,T,.15+.1*Math.sin(T*.3));floor(g,W,H,u,T);
    for(let i=0;i<3;i++){const x=((T*u*(.6+i*.3)+i*W*.4)%(W+u*4))-u*2;fish(g,W-x,H*(.3+i*.15),u*(.6+i*.1),['#fb923c','#fde047','#f472b6'][i],-1,T+i);}
    B.forEach((b,i)=>{const x=((T*u*.5+i*W/B.length)%(W+u*2))-u;const y=H*(.25+.12*((i*2)%4))+Math.sin(T*1.4+i)*u*.3;bubble(g,{x,y,r:u*.8,e:b[0],t:b[1]},T);});
    const sx=W*(wide?.5:.5)+Math.sin(T*.7)*W*.18,sy=H*.55+Math.sin(T*1.1)*u*.4;sub(g,sx,sy,u*1.05,Math.cos(T*.7)>0?1:-1,T,'#ef4444',Math.sin(T*.9)>.2?'happy':'neutral');
    jelly(g,W*.85,H*.4+Math.sin(T)*u*.4,u*1.1,T,1,false);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;return{y0:Math.max(p.top||0,u*2.6)+u*.4,y1:p.H-u*1.1};},
  init(p){const st=p.state;Object.assign(st,{x:p.W*.5,y:p.H*.55,tx:p.W*.5,ty:p.H*.55,bubs:[],jelly:[],spawnT:0,got:0,face:1,T:0,mood:'neutral',moodT:0,qN:0,qt:0,qmax:0,rev:false,flash:0});this.newQ(p);
    const Z=this.Z(p);st.jelly=[0,1].map(k=>({x:p.W*(k?.8:.2),y:Z.y0+(Z.y1-Z.y0)*(.3+k*.4),ph:k*2}));},
  newQ(p){const st=p.state,L=p.levelId;const pool=L==='all'?[...SEA_Q.earth,...SEA_Q.tide,...SEA_Q.coast]:SEA_Q[L];
    let q;do{q=p.deck(pool,'sea');}while(st.q&&q===st.q&&pool.length>1);st.q=q;st.got=0;st.rev=false;st.qmax=28/p.pace;st.qt=st.qmax;st.bubs.forEach(b=>b.leave=true);st.spawnT=.2;st.qN++;
    p.ask('🚤 '+q.q,'맞는 거품만 모아요!');},
  spawn(p){const st=p.state,R=p.Rf,u=p.u,W=p.W,Z=this.Z(p);const good=R.chance(.45);const it=R.pick(good?st.q.g:st.q.b);
    const left=R.chance(.5);const r=u*(1.05+Math.min(.5,it[1].length*.03));let yy=0;for(let k=0;k<10;k++){yy=R.num(Z.y0+r,Z.y1-r);if(!st.bubs.some(o=>Math.abs(o.y-yy)<(o.r+r)*.95&&(left?o.x<r*3:o.x>W-r*3)))break;}
    st.bubs.push({x:left?-r:W+r,y:yy,vx:(left?1:-1)*R.num(u*.9,u*1.6)*p.pace,ph:R.num(0,6),r,e:it[0],t:it[1],good});
    st.spawnT=R.num(.7,1.2)/Math.sqrt(p.pace);},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H,Z=this.Z(p);st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    st.ty=clamp(st.ty,Z.y0,Z.y1);
    const k=Math.min(1,dt*5);const nx=st.x+(st.tx-st.x)*k;if(Math.abs(nx-st.x)>.5)st.face=nx>st.x?1:-1;st.x=nx;st.y+=(st.ty-st.y)*k;
    if(!st.rev){st.qt-=dt;if(st.qt<=0){st.rev=true;st.mood='oops';st.moodT=2;p.hit(false,{pen:10,x:W/2,y:H*.45,tip:`시간이 다 됐어요! 정답은 <b>${st.q.g.map(g=>g[1]).join(', ')}</b>`,tipMs:2600});
      const rv=strip(st.q.q)+' → '+st.q.g.map(g=>g[1]).join(', ');if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);setTimeout(()=>{if(p.active)this.newQ(p);},2500);}}
    st.spawnT-=dt;if(st.spawnT<=0&&(st.rev?st.bubs.filter(b=>b.good&&!b.leave).length<3:st.bubs.filter(b=>!b.leave).length<6)){if(st.rev){const it=p.Rf.pick(st.q.g);const left=p.Rf.chance(.5),r=u*1.15;st.bubs.push({x:left?-r:W+r,y:p.Rf.num(Z.y0+r,Z.y1-r),vx:(left?1:-1)*u,ph:0,r,e:it[0],t:it[1],good:true});st.spawnT=.8;}else this.spawn(p);}
    for(const b of st.bubs){b.x+=b.vx*dt*(b.leave?3:1);b.y+=Math.sin(p.t*2+b.ph)*u*.3*dt;b.y=clamp(b.y,Z.y0+b.r*.5,Z.y1);
      if(!st.rev&&!b.gone&&!b.leave&&Math.hypot(b.x-st.x,b.y-st.y)<b.r+u*.6){b.gone=true;st.mood=b.good?'happy':'oops';st.moodT=.9;
        p.hit(b.good,{x:b.x,y:b.y,tip:b.good?undefined:`‘${b.t}’${J(b.t,'은').slice(b.t.length)} 아니에요! 정답: <b>${st.q.g.map(g=>g[1]).join(', ')}</b>`,review:strip(st.q.q)+' → '+st.q.g.map(g=>g[1]).join(', '),color:'#7dd3fc'});
        p.ring(b.x,b.y,b.good?'#22c55e':'#ef4444');if(b.good){st.got++;if(st.got>=3)setTimeout(()=>{if(p.active)this.newQ(p);},400);}}}
    st.bubs=st.bubs.filter(b=>!b.gone&&b.x>-b.r*3&&b.x<W+b.r*3);
    for(const j of st.jelly){j.ph+=dt;j.x+=Math.cos(j.ph*.7)*u*1.2*dt;j.y+=Math.sin(j.ph*1.3)*u*.9*dt;j.x=clamp(j.x,u,W-u);j.y=clamp(j.y,Z.y0+u*.5,Z.y1);
      if((j.cool||0)>0)j.cool-=dt;else if(Math.hypot(j.x-st.x,j.y-st.y)<u*1.1){j.cool=1.5;st.mood='oops';st.moodT=1;p.add(-10,st.x,st.y-u);p.Snd.slide(400,200,.2,.05);p.shake();}}},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,Z=this.Z(p);const dep=Math.min(1,(st.qN-1)/9);
    ocean(g,W,H,u,t,dep);
    for(let k=0;k<3;k++){const sp=u*(.5+k*.2),x=((t*sp+k*W*.4)%(W+u*4))-u*2;g.save();g.globalAlpha=.35;fish(g,W-x,H*(.28+k*.17)+Math.sin(t+k)*u*.2,u*(.6+k*.1),['#fb923c','#fde047','#f472b6'][k],-1,t+k);g.restore();}
    floor(g,W,H,u,t);
    for(const j of st.jelly){jelly(g,j.x,j.y,u*1.1,j.ph,(j.cool||0)>0?.5:1,(j.cool||0)>0);}
    for(const b of st.bubs)bubble(g,b,t,st.rev&&b.good);
    sub(g,st.x,st.y,u,st.face,t,p.color,st.mood);
    if(dep>.2){g.save();const gl=g.createRadialGradient(st.x+st.face*u*2.2,st.y,0,st.x+st.face*u*2.2,st.y,u*3);gl.addColorStop(0,`rgba(255,247,194,${.25*dep})`);gl.addColorStop(1,'rgba(255,247,194,0)');g.fillStyle=gl;g.fillRect(0,0,W,H);g.restore();}
    if(p.t%0.3<0.02)p.fx.push({k:'b',x:st.x-st.face*u*1.3,y:st.y,vx:-st.face*u,vy:-u*2,color:'#ffffffaa',r:u*.08,t:0,life:.8});
    /* 진주 3개 + 수심 + 남은 시간 */
    const py=(p.top||Z.y0)+u*.4,pr=u*.22;for(let i=0;i<3;i++){const x=W/2+(i-1)*pr*2.8;const on=i<st.got;K.orb(g,x,py,pr,on?'#fff7ed':'#0b3a5e');g.strokeStyle=on?'#fbbf24':'rgba(255,255,255,.7)';g.lineWidth=Math.max(1.5,u*.05);g.beginPath();g.arc(x,py,pr,0,TAU);g.stroke();}
    K.txt(g,`수심 ${(st.qN-1)*10}m`,W-u*1.5,py,{size:u*.4,color:'#fff',stroke:'rgba(0,30,60,.7)',lw:u*.1});
    if(!st.rev){const f=clamp(st.qt/st.qmax,0,1),bw=pr*8.4,bh=Math.max(4,u*.09);K.rr(g,W/2-bw/2,py+pr*1.6,bw,bh,bh/2);g.fillStyle='rgba(0,0,0,.35)';g.fill();K.rr(g,W/2-bw/2,py+pr*1.6,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.3?'#fcd34d':'#f87171';g.fill();}},
  down(p,x,y,e){const st=p.state;const off=e&&e.pointerType==='touch'?p.u*.9:0;st.tx=x;st.ty=y-off;},
  move(p,x,y,down,e){if(!down)return;const st=p.state;const off=e&&e.pointerType==='touch'?p.u*.9:0;st.tx=x;st.ty=y-off;},
};

Engine.boot(GAME);
