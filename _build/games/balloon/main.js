/* 4학년 · 여러 가지 기체 — 열기구 조종사 (꾹 눌러 공기를 데우면 부풀어 떠올라요)
   디자인: 노을 하늘의 여행 그림. 열기구·조종사·구름은 직접 그린 그림이고, 풍선 속 공기 알갱이가 데울수록 빨라져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#5a2d1a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4c10 0 16 8 14 17-1 6-6 10-9 13H19c-3-3-8-7-9-13C8 12 14 4 24 4z" fill="#ff7a45" stroke="#5a2d1a" stroke-width="3" stroke-linejoin="round"/><path d="M18 8c-3 8-2 18 3 26M30 8c3 8 2 18-3 26" fill="none" stroke="#fff1c9" stroke-width="3"/><rect x="19" y="38" width="10" height="7" rx="2" fill="#c68a3a" stroke="#5a2d1a" stroke-width="2.5"/></svg>';
/*@@DATA@@*/
function flameF(g,x,y,s,t){g.save();g.translate(x,y);const f=1+Math.sin(t*14)*.08;g.scale(f,1/f*(1+Math.sin(t*9)*.06));
  g.fillStyle='#ff8a00';g.beginPath();g.moveTo(0,-s*.9);g.quadraticCurveTo(s*.6,-s*.2,s*.32,s*.28);g.quadraticCurveTo(0,s*.5,-s*.32,s*.28);g.quadraticCurveTo(-s*.6,-s*.2,0,-s*.9);g.fill();
  g.fillStyle='#ffd23f';g.beginPath();g.moveTo(0,-s*.45);g.quadraticCurveTo(s*.3,-s*.05,s*.14,s*.25);g.quadraticCurveTo(0,s*.34,-s*.14,s*.25);g.quadraticCurveTo(-s*.3,-s*.05,0,-s*.45);g.fill();g.restore();}
/* 열기구: (x,y)=풍선 중심, R=반지름, heat 0~1 */
function balloon(g,x,y,R,t,heat,col,mood,flame,mol){g.save();g.translate(x,y);
  const cy=0,ny=R*1.0,nw=R*.3,ky=ny+R*.42,kw=R*.78,kh=R*.42;
  g.strokeStyle='#7c4a1e';g.lineWidth=Math.max(1.5,R*.04);g.beginPath();g.moveTo(-nw,ny);g.lineTo(-kw*.42,ky);g.moveTo(nw,ny);g.lineTo(kw*.42,ky);g.moveTo(0,ny);g.lineTo(0,ky);g.stroke();
  if(flame>0){K.glow(g,0,ny+R*.05,R*(.5+.5*flame),'#fb923c',.7*flame);flameF(g,0,ny+R*.12,R*(.25+.3*flame),t);}
  const env=()=>{g.beginPath();g.arc(0,cy,R,Math.PI*.8,Math.PI*.2);g.quadraticCurveTo(R*.62,cy+R*1.05,nw,ny);g.lineTo(-nw,ny);g.quadraticCurveTo(-R*.62,cy+R*1.05,Math.cos(Math.PI*.8)*R,cy+Math.sin(Math.PI*.8)*R);g.closePath();};
  if(heat>.55)K.glow(g,0,cy,R*1.7,'#fdba74',(heat-.55)*.9);
  g.save();g.shadowColor='rgba(90,45,26,.3)';g.shadowBlur=R*.2;g.shadowOffsetY=R*.08;env();g.fillStyle=col;g.fill();g.restore();
  g.save();env();g.clip();g.fillStyle='#fff1c9';[-.62,0,.62].forEach(k=>{g.beginPath();g.ellipse(k*R,cy+R*.1,R*.17,R*1.35,0,0,TAU);g.fill();});
  const sd=g.createRadialGradient(-R*.4,cy-R*.45,R*.1,0,cy,R*1.25);sd.addColorStop(0,'rgba(255,255,255,.4)');sd.addColorStop(.55,'rgba(255,255,255,0)');sd.addColorStop(1,'rgba(60,20,40,.3)');g.fillStyle=sd;g.fillRect(-R*1.2,cy-R*1.2,R*2.4,R*2.6);
  /* 공기 알갱이 */
  if(mol){for(const m of mol){g.fillStyle=`rgba(255,${Math.round(255-heat*130)},${Math.round(255-heat*200)},.9)`;g.beginPath();g.arc(m.x*R,cy+m.y*R*.9,Math.max(1.6,R*.06),0,TAU);g.fill();}}
  g.restore();g.lineWidth=Math.max(1.8,R*.045);g.strokeStyle=INK;env();g.stroke();
  /* 바구니 */
  const kg=g.createLinearGradient(0,ky,0,ky+kh);kg.addColorStop(0,'#e0aa62');kg.addColorStop(1,'#9a6531');K.card(g,-kw/2,ky,kw,kh,R*.1,kg,{blur:R*.1,dy:R*.04,hi:false,stroke:INK,lw:Math.max(1.5,R*.04)});
  g.strokeStyle='rgba(90,50,20,.45)';g.lineWidth=1;g.beginPath();for(let i=1;i<4;i++){g.moveTo(-kw/2+kw*i/4,ky+2);g.lineTo(-kw/2+kw*i/4,ky+kh-2);}g.moveTo(-kw/2,ky+kh*.55);g.lineTo(kw/2,ky+kh*.55);g.stroke();
  /* 조종사 */
  const px=0,py=ky-R*.02;g.fillStyle='#ffd6b0';g.strokeStyle=INK;g.lineWidth=Math.max(1.4,R*.035);g.beginPath();g.arc(px,py,R*.17,0,TAU);g.fill();g.stroke();
  g.fillStyle='#ff5a36';g.beginPath();g.arc(px,py-R*.02,R*.18,Math.PI,0);g.fill();g.stroke();g.fillStyle=INK;g.strokeStyle=INK;g.lineWidth=Math.max(1.3,R*.03);g.lineCap='round';
  if(mood==='happy'){for(const d of[-1,1]){g.beginPath();g.arc(px+d*R*.07,py+R*.01,R*.03,Math.PI*1.1,Math.PI*1.9);g.stroke();}g.fillStyle='#c0392b';g.beginPath();g.arc(px,py+R*.06,R*.06,0,Math.PI);g.fill();}
  else if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(px+d*R*.07-R*.025,py-R*.02);g.lineTo(px+d*R*.07+R*.025,py+R*.03);g.moveTo(px+d*R*.07+R*.025,py-R*.02);g.lineTo(px+d*R*.07-R*.025,py+R*.03);g.stroke();}g.beginPath();g.arc(px,py+R*.12,R*.04,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else{for(const d of[-1,1]){g.beginPath();g.arc(px+d*R*.07,py,R*.022,0,TAU);g.fill();}g.beginPath();g.arc(px,py+R*.05,R*.04,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='#6b3f1d';K.rr(g,-kw/2-R*.04,ky-R*.03,kw+R*.08,R*.09,R*.04);g.fill();
  g.restore();}
function bird(g,x,y,s,t){g.save();g.translate(x,y);g.strokeStyle='#5a2d1a';g.lineWidth=Math.max(1.5,s*.12);g.lineCap='round';const f=Math.sin(t*6+x)*s*.4;g.beginPath();g.moveTo(-s,f);g.quadraticCurveTo(-s*.5,-s*.5,0,0);g.quadraticCurveTo(s*.5,-s*.5,s,f);g.stroke();g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;const mol=Array.from({length:22},(_,i)=>({x:(hash(i)-.5)*1.4,y:(hash(i+9)-.5)*1.4,vx:(hash(i+3)-.5),vy:(hash(i+5)-.5)}));
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H*.8)/8;K.vgrad(g,0,0,W,H,['#ff9f6b','#ffd3a0','#ffeedd','#bfe3ff']);K.glow(g,W*.2,H*.78,u*4,'#fff1b0',.7);
    K.clouds(g,W,H,T,.5,3,u*1.8);
    g.fillStyle='#8fcf9b';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=W/24)g.lineTo(x,H*.92-Math.sin(x/W*5)*H*.03);g.lineTo(W,H);g.fill();
    for(const m of mol){m.x+=m.vx*dt*1.4;m.y+=m.vy*dt*1.4;if(Math.hypot(m.x,m.y)>.85){m.vx*=-1;m.vy*=-1;}}
    (wide?[[.2,.6,.8,'#ff5a36'],[.5,.7,.6,'#3aa6ff'],[.82,.62,.7,'#ffb703']]:[[.3,.5,1.0,'#ff5a36'],[.62,.32,.8,'#3aa6ff'],[.82,.62,.65,'#ffb703']]).forEach(([fx,fy,s,c],i)=>{const R=u*1.5*s;balloon(g,W*fx,H*fy+Math.sin(T*1.1+i)*u*.25,R,T+i,.5+.3*Math.sin(T+i),c,'happy',i===0?1:0,i===0?mol:null);});
    for(let i=0;i<3;i++)bird(g,((T*u*.6+i*u*3)%(W+u*3))-u,H*(.2+i*.07),u*.25,T+i);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u,y0=Math.max(p.top||0,u*2.6);return{y0,y1:p.H-u*1.2,h:Math.max(100,p.H-u*1.2-y0)};},
  init(p){const st=p.state;Object.assign(st,{y:p.H*.5,vy:0,heat:.4,hold:false,cols:[],flame:0,T:0,mood:'neutral',moodT:0,mol:Array.from({length:24},(_,i)=>({x:(hash(i)-.5)*1.5,y:(hash(i+9)-.5)*1.5,vx:hash(i+3)-.5,vy:hash(i+5)-.5}))});this.addCol(p,p.W*1.05);},
  addCol(p,x){const st=p.state,L=p.levelId,R=p.R;const pool=L==='all'?[...GAS_Q.o2,...GAS_Q.vol,...GAS_Q.air]:GAS_Q[L];const q=p.deck(pool,'gas');
    const opts=R.shuffle([q[1],...R.sample(q[2],Math.min(2,q[2].length))]);const n=opts.length;
    const ys=n===2?[.28,.74]:[.18,.5,.82];st.cols.push({x,q,b:opts.map((t,i)=>({t,ok:t===q[1],fy:ys[i]})),done:false});
    if(!st.cur)this.focus(p);},
  focus(p){const st=p.state;const c=st.cols.find(c=>!c.done);if(c&&c!==st.cur){st.cur=c;p.ask('🎈 '+c.q[0],'맞는 구름에 닿아요');}},
  br(p){return Math.min(p.u*1.2,p.W*.2);},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;st.T+=dt;const Z=this.Z(p);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    const hold=Object.keys(p.ptr).length>0;st.hold=hold;st.heat=K.clamp(st.heat+(hold?.9:-.7)*dt,0,1);
    st.vy+=((.45-st.heat)*Z.h*1.6)*dt;st.vy*=1-dt*1.4;st.y+=st.vy*dt;
    const top=Z.y0+u*.9,bot=Z.y1-u*.4;if(st.y<top){st.y=top;st.vy=Math.max(0,st.vy);}if(st.y>bot){st.y=bot;st.vy=Math.min(0,st.vy);}
    st.flame=hold?1:Math.max(0,st.flame-dt*4);
    for(const m of st.mol){const sp=.5+st.heat*2.6;m.x+=m.vx*dt*sp;m.y+=m.vy*dt*sp;if(Math.hypot(m.x,m.y)>.82){const a=Math.atan2(m.y,m.x);m.x=Math.cos(a)*.8;m.y=Math.sin(a)*.8;const vn=m.vx*Math.cos(a)+m.vy*Math.sin(a);m.vx-=2*vn*Math.cos(a);m.vy-=2*vn*Math.sin(a);}}
    const spd=u*(1.7+p.t/p.dur*.8)*p.pace;const bx=W*.25;
    for(const c of st.cols){c.x-=spd*dt;
      if(!c.done)for(const b of c.b){const by=Z.y0+Z.h*b.fy;const r=this.br(p);if(Math.hypot(c.x-bx,by-st.y)<r+u*.9){c.done=true;b.hit=true;st.mood=b.ok?'happy':'oops';st.moodT=1.2;
          p.hit(b.ok,{x:c.x,y:by-r,tip:b.ok?`정답: ${c.q[1]}`:`정답: <b>${c.q[1]}</b>`,review:plain(c.q[0])+' → '+c.q[1]});this.focus(p);break;}}
      if(!c.done&&c.x<bx-u*1.5){c.done=true;c.miss=true;st.mood='oops';st.moodT=1;p.add(-10,bx,st.y-u*2);p.tip(`지나쳤어요! 정답: <b>${c.q[1]}</b>`,'bad',2000);const rv=plain(c.q[0])+' → '+c.q[1];if(!p.wrong.includes(rv))p.wrong.push(rv);this.focus(p);}}
    st.cols=st.cols.filter(c=>c.x>-u*3);const last=st.cols[st.cols.length-1];const gap=Math.max(W*.7,u*8);if(!last||last.x<W-gap+u*2)this.addCol(p,(last?last.x:W)+gap);},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z=this.Z(p);
    K.vgrad(g,0,0,W,H,['#ff9f6b','#ffd3a0','#ffeedd','#bfe3ff']);
    K.glow(g,W*.12,H*.78,u*4.5,'#fff1b0',.7);K.clouds(g,W,H,t*1.5,.5,3,u*1.8);
    /* 먼 산·언덕 */
    const MP=Math.PI*u*2.6,off=(t*u*.25)%MP;g.fillStyle='rgba(180,120,160,.35)';g.beginPath();g.moveTo(-off,H);for(let x=0;x<=W+MP;x+=u*.4)g.lineTo(x-off,H*.76-Math.abs(Math.sin(x/(u*2.6)))*Math.min(H*.12,u*2));g.lineTo(W+MP-off,H);g.fill();
    const HP=u*12,off2=(t*u*.5)%HP,hy=x=>H*.9-(Math.sin(x/HP*Math.PI*2)*.5+.5)*H*.05;const hg=g.createLinearGradient(0,H*.8,0,H);hg.addColorStop(0,'#a6dc8e');hg.addColorStop(1,'#58b878');g.fillStyle=hg;
    g.beginPath();g.moveTo(-off2,H);for(let x=0;x<=W+HP;x+=u*.4)g.lineTo(x-off2,hy(x));g.lineTo(W+HP-off2,H);g.fill();
    for(let k=0;k*HP<W+HP;k++)[.15,.42,.7,.9].forEach((f,i)=>{const x=(k+f)*HP-off2;if(x>-u&&x<W+u){const y=hy((k+f)*HP)+H*.01;g.fillStyle='#7a4f2a';g.fillRect(x-u*.05,y-u*.5,u*.1,u*.5);g.fillStyle=i>1?'#3fae5f':'#2f9e55';g.beginPath();g.arc(x,y-u*.75,u*.38,0,TAU);g.fill();}});
    for(let i=0;i<3;i++)bird(g,((t*u*.8+i*u*4)%(W+u*3))-u,Z.y0+Z.h*(.1+i*.3),u*.2,t+i);
    /* 답 구름 */
    const puff=(x,y,r)=>{g.beginPath();[[-.55,.1,.7],[.55,.1,.7],[0,-.25,.85],[0,.2,.9]].forEach(([dx,dy,s])=>{g.moveTo(x+dx*r+r*s,y+dy*r);g.arc(x+dx*r,y+dy*r,r*s,0,TAU);});};
    for(const c of st.cols){for(const b of c.b){const by=Z.y0+Z.h*b.fy,r=this.br(p);g.save();g.globalAlpha=c.done&&!b.hit?.35:1;
        if(b.hit)K.glow(g,c.x,by,r*1.9,b.ok?'#4ade80':'#fb7185',.5);
        if(c.done&&!b.hit&&b.ok)K.glow(g,c.x,by,r*1.6,'#4ade80',.35);
        const fill=b.hit?(b.ok?'#dcfce7':'#ffe4e6'):'#ffffff';
        g.save();g.shadowColor='rgba(120,60,40,.25)';g.shadowBlur=r*.35;g.shadowOffsetY=r*.12;g.fillStyle=fill;puff(c.x,by,r);g.fill();g.restore();
        K.tag(g,b.t,c.x,by,{size:u*.44,maxW:r*2.6,fill:'#ffffff00',stroke:'#ffffff00',shadow:false,color:b.hit?(b.ok?'#166534':'#9f1239'):'#5a2d1a'});g.restore();}}
    /* 열기구 */
    const bx=W*.25;const R=u*(.85+st.heat*.55);
    K.shadow(g,bx,H-u*.25,u*(.9-Math.min(.5,(H-st.y)/H*.6)),u*.12,.12);
    balloon(g,bx,st.y,R,t,st.heat,p.color,st.mood,st.flame,st.mol);
    /* 온도계 */
    const tw=Math.min(W*.4,u*4.4),th=Math.max(9,u*.24),tx=u*1.3,ty=Z.y0+u*.5;
    K.card(g,tx-u*.95,ty-u*.34,tw+u*1.3,u*.68,u*.34,'rgba(255,250,242,.94)',{blur:u*.25,dy:u*.06,hi:false,stroke:INK,lw:2});
    K.txt(g,'🌡️',tx-u*.55,ty,{size:u*.42});K.rr(g,tx,ty-th/2,tw,th,th/2);g.fillStyle='#f1d9c4';g.fill();
    const hw=Math.max(th,tw*st.heat);const rg=g.createLinearGradient(tx,0,tx+tw,0);rg.addColorStop(0,'#60a5fa');rg.addColorStop(.5,'#f59e0b');rg.addColorStop(1,'#ef4444');
    g.save();K.rr(g,tx,ty-th/2,hw,th,th/2);g.clip();g.fillStyle=rg;g.fillRect(tx,ty-th/2,tw,th);g.restore();
    K.txt(g,st.hold?'뜨거워요! 🔥':'꾹 눌러 데워요',tx,ty+u*.62,{size:u*.3,color:INK,align:'left',stroke:'#fffaf2',lw:u*.08});},
};

Engine.boot(GAME);
