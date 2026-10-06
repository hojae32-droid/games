/* 5학년 · 용해와 용액 — 비커 받기 대작전 (맞는 것만 받고, 설탕으로 진한 용액 만들기)
   디자인: 하얀 실험실 + 청록. 얼굴이 있는 비커가 표정으로 반응하고, 5연속 정답이면 비커가 커져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M12 6h24M15 6v14L6 40a3 3 0 0 0 3 4h30a3 3 0 0 0 3-4L33 20V6" fill="#e0f7fa" stroke="#0e7490" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M11 32h26l4 8a3 3 0 0 1-3 4H10a3 3 0 0 1-3-4z" fill="#f97316"/><circle cx="20" cy="26" r="2.5" fill="#fff"/><circle cx="28" cy="22" r="2" fill="#fff"/></svg>';
/*@@DATA@@*/
function pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=g.measureText(str).width+s*1.1;K.card(g,x-w/2,y-s*.78,w,s*1.56,s*.78,bg,{blur:s*.5,dy:s*.12,hi:false});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();}
function lab(g,W,H,u,t,Z0){const fl=H-u*.2;
  K.vgrad(g,0,0,W,fl,['#e6fbff','#d3f3fb','#c4ecf5']);
  g.save();g.strokeStyle='rgba(14,116,144,.07)';g.lineWidth=1;const ts=u*.9;g.beginPath();for(let x=ts;x<W;x+=ts){g.moveTo(x+.5,0);g.lineTo(x+.5,fl);}for(let y=ts;y<fl;y+=ts){g.moveTo(0,y+.5);g.lineTo(W,y+.5);}g.stroke();g.restore();
  const ww=Math.min(W*.42,u*5.2),wh=Math.min((H-Z0)*.3,u*2.6),wx=W/2-ww/2,wy=Z0+u*.3;
  K.glow(g,W/2,wy+wh/2,Math.max(ww,wh)*1.1,'#ffffff',.6);
  K.card(g,wx-u*.12,wy-u*.12,ww+u*.24,wh+u*.24,u*.3,'#f8fafc',{blur:u*.4,dy:u*.12,hi:false});
  g.save();K.rr(g,wx,wy,ww,wh,u*.2);g.clip();K.vgrad(g,wx,wy,ww,wh,['#7cc4ff','#d6f0ff']);
  g.translate(wx,wy);K.clouds(g,ww,wh,t,.25,2,wh*.5);K.hills(g,ww,wh,wh*.72,'#a7e3bd','#6cc995');g.restore();
  g.fillStyle='#f8fafc';g.fillRect(W/2-u*.05,wy,u*.1,wh);g.fillRect(wx,wy+wh*.48,ww,u*.08);
  const sh=(x0,x1,y)=>{K.card(g,x0,y,x1-x0,u*.16,u*.06,'#c79a6b',{blur:u*.3,dy:u*.12,hi:false});g.fillStyle='#e0b689';g.fillRect(x0,y,x1-x0,u*.05);};
  const sw=Math.min(W*.24,u*3.2);const sy=Z0+(H-Z0)*.4;
  [[u*.2,1],[W-u*.2-sw,-1]].forEach(([x0,d],k)=>{sh(x0,x0+sw,sy);g.save();g.globalAlpha=.85;const items=k?['⚗️','🧫','🧪']:['🧪','🔬','⚗️'];items.forEach((e,i)=>K.emo(g,e,x0+sw*(i+.5)/3,sy-u*.42,u*.7));g.restore();});
  K.vgrad(g,0,fl,W,H-fl,['#5b7c99','#3b5672']);g.fillStyle='rgba(255,255,255,.45)';g.fillRect(0,fl,W,Math.max(2,u*.04));}
/* 얼굴 있는 비커: mood = neutral|happy|oops */
function beaker(g,u,t,x,G,color,conc,dense,mood,splash){const bw=G.bw,bh=G.bh,by=G.by;const lv=by+bh*.25,bot=by+bh,r=u*.28;
  K.shadow(g,x,bot+u*.05,bw*.55,u*.12,.3);K.glow(g,x,bot-bh*.4,bw*.75,color,.18);
  const body=()=>{g.beginPath();g.moveTo(x-bw/2,by);g.lineTo(x-bw/2,bot-r);g.quadraticCurveTo(x-bw/2,bot,x-bw/2+r,bot);g.lineTo(x+bw/2-r,bot);g.quadraticCurveTo(x+bw/2,bot,x+bw/2,bot-r);g.lineTo(x+bw/2,by);g.closePath();};
  g.save();body();g.fillStyle='rgba(255,255,255,.35)';g.fill();g.clip();
  const c1=dense?K.rgba('#f9a8d4',.25+conc*.5):'rgba(103,232,249,.75)',c2=dense?K.rgba('#db2777',.25+conc*.45):'rgba(8,145,178,.85)';
  const wob=Math.sin(t*3)*u*.04+(splash||0)*u*.3*Math.sin(t*30);const lg=g.createLinearGradient(0,lv,0,bot);lg.addColorStop(0,c1);lg.addColorStop(1,c2);g.fillStyle=lg;
  g.beginPath();g.moveTo(x-bw/2,lv+wob);g.quadraticCurveTo(x,lv-wob*2,x+bw/2,lv-wob);g.lineTo(x+bw/2,bot);g.lineTo(x-bw/2,bot);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x-bw/2,lv-wob*.5,bw,Math.max(2,u*.05));
  g.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<5;k++){const ph=(t*.6+k*.23)%1;g.beginPath();g.arc(x-bw*.35+k*bw*.17,bot-(bot-lv)*ph,u*.05+k%2*u*.03,0,7);g.fill();}
  const hg=g.createLinearGradient(x-bw/2,0,x+bw/2,0);hg.addColorStop(0,'rgba(255,255,255,.55)');hg.addColorStop(.18,'rgba(255,255,255,.08)');hg.addColorStop(.8,'rgba(255,255,255,0)');hg.addColorStop(1,'rgba(255,255,255,.3)');g.fillStyle=hg;g.fillRect(x-bw/2,by,bw,bh);
  g.restore();
  body();g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=Math.max(2,u*.07);g.stroke();
  body();g.strokeStyle='rgba(14,116,144,.45)';g.lineWidth=1.5;g.stroke();
  K.card(g,x-bw/2-u*.12,by-u*.08,bw+u*.24,u*.16,u*.08,'#ffffff',{blur:u*.15,dy:u*.04,hi:false,stroke:'rgba(14,116,144,.35)',lw:1.5});
  g.strokeStyle='rgba(14,116,144,.55)';g.lineWidth=1.5;for(let k=1;k<4;k++){const yy=by+bh*k/4;g.beginPath();g.moveTo(x+bw/2-u*.4,yy);g.lineTo(x+bw/2-u*.08,yy);g.stroke();}
  K.card(g,x-bw*.42,bot+u*.02,bw*.84,u*.12,u*.06,color,{blur:u*.2,dy:u*.05,hi:false});
  /* 얼굴 */
  const fy=by+bh*.5,fs=Math.min(bw*.5,bh*.5);g.save();g.translate(x,fy);g.lineCap='round';g.strokeStyle='#0b3a4a';g.fillStyle='#0b3a4a';g.lineWidth=Math.max(2,fs*.07);
  for(const d of[-1,1]){const ex=d*fs*.28,ey=-fs*.1;g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,fs*.14,fs*.17,0,0,TAU);g.fill();g.stroke();
    g.fillStyle='#0b3a4a';if(mood==='oops'){g.beginPath();g.moveTo(ex-fs*.08,ey-fs*.08);g.lineTo(ex+fs*.08,ey+fs*.08);g.moveTo(ex+fs*.08,ey-fs*.08);g.lineTo(ex-fs*.08,ey+fs*.08);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(ex,ey+fs*.03,fs*.08,Math.PI*1.05,Math.PI*1.95);g.stroke();}else{g.beginPath();g.arc(ex,ey+fs*.02,fs*.07,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,fs*.1,fs*.17,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,fs*.3,fs*.12,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,fs*.12,fs*.12,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const E=['🍬','🧂','🧊','🥄','💎'];
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7.5:Math.min(W,H)/6.5;lab(g,W,H,u,T,H*.05);
    const G={bw:Math.min(u*2.6,W*.4),bh:u*2.1,by:H-u*2.3};const per=1.6;const bx=tc=>W/2+Math.sin(tc*.7)*W*.26;
    let splash=0,mood='neutral';const cyc=Math.floor(T/per);
    for(const off of[0,.5]){const tt=T-off*per;const n=Math.floor(tt/per),s=tt-n*per,f=s/per;const xc=bx((n+1)*per+off*per);const y=H*.12+(G.by-u*.2-H*.12)*f*f;if(f>.97)splash=1;
      if(f<=.99){K.glow(g,xc,y,u*.8,'#fff',.7);K.emo(g,E[(((n*2+(off?1:0))%E.length)+E.length)%E.length],xc,y,u*.9,f*2);}}
    const dtc=(T%per)/per;if(dtc<.15||(T+.5*per)%per/per<.15){mood='happy';}
    const x=bx(T);beaker(g,u,T,x,G,'#0891b2',.5+.4*Math.sin(T*.5),false,mood,splash*.5);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;return{y0:Math.max(p.top||0,u*2.6)};},
  init(p){const st=p.state;Object.assign(st,{x:p.W/2,tx:p.W/2,items:[],spawnT:.3,kN:0,cnt:0,conc:0,splash:0,T:0,mood:'neutral',moodT:0,big:0,lastS:0});this.useSet(p);},
  useSet(p){const st=p.state,L=p.levelId;st.k=L==='all'?['dis','sol','dense','word'][st.kN++%4]:L;st.cnt=0;
    if(st.k==='dense'){st.conc=0;p.ask('🍅 <b>설탕</b>을 받아 방울토마토를 <b>맨 위 선</b>까지 띄워요!','물(💧)을 받으면 묽어져요 · 모래는 피해요');}
    else p.ask(SOL[st.k].ask,SOL[st.k].sub);},
  spawn(p){const st=p.state,R=p.Rf,u=p.u,Z=this.Z(p);let a,good,kind;
    if(st.k==='dense'){const r=R.f();if(r<.55){a=['🍬','설탕'];good=true;kind='s';}else if(r<.8){a=['💧','물'];good=false;kind='w';}else{a=['🏖️','모래'];good=false;kind='x';}}
    else{const S=SOL[st.k];good=R.chance(.5);a=p.deck(good?S.yes:S.no,st.k+(good?'y':'n'));}
    st.items.push({a,good,kind,x:R.num(u*1.2,p.W-u*1.2),y:Z.y0-u*.3,vy:u*R.num(2.2,2.8)*(1+p.t/p.dur*.5)*p.pace,rot:R.num(-1,1),age:0});st.cnt++;
    if(p.levelId==='all'&&st.cnt>=(st.k==='word'?6:12))this.useSet(p);st.spawnT=R.num(.65,1.05)/Math.sqrt(p.pace);},
  geo(p){const u=p.u,st=p.state;const k=st.big>0?1.45:1;return{bw:Math.min(u*2.6*k,p.W*.42*k),bh:u*2.1,by:p.H-u*2.3};},
  update(p,dt){const st=p.state,u=p.u,G=this.geo(p);st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.big>0)st.big-=dt;
    if(p.streak===0)st.lastS=0;else if(p.streak>=5&&p.streak%5===0&&st.lastS!==p.streak){st.lastS=p.streak;st.big=6;p.tip('✨ 5연속 성공! 비커가 커졌어요','good',1500);}
    st.x+=(st.tx-st.x)*Math.min(1,dt*12);st.x=K.clamp(st.x,G.bw/2,p.W-G.bw/2);
    st.spawnT-=dt;if(st.spawnT<=0)this.spawn(p);st.splash=Math.max(0,st.splash-dt);
    for(const it of st.items){it.y+=it.vy*dt;it.age+=dt;
      if(!it.done&&it.y>G.by-u*.2&&it.y<G.by+u*.6&&Math.abs(it.x-st.x)<G.bw/2){it.done=true;st.splash=.3;p.Snd.tone(500,.08,'sine',.05);const nm=it.a[1];let ok=it.good;
        if(st.k==='dense'){if(it.kind==='s'){ok=true;st.conc=Math.min(1,st.conc+.14);p.hit(true,{x:it.x,y:G.by-u,tip:'설탕이 녹아 설탕물이 더 진해졌어요',tipMs:1200});if(st.conc>=.99){p.add(80,st.x,G.by-u*3);p.tip('🎉 아주 진한 설탕물! 방울토마토가 높이 떴어요','good',1800);p.Snd.win();st.conc=0;}}
          else if(it.kind==='w'){ok=false;st.conc=Math.max(0,st.conc-.2);p.hit(false,{pen:15,x:it.x,y:G.by-u,tip:'물을 더 넣으면 용액이 <b>묽어져</b> 토마토가 가라앉아요',review:'용액에 물을 더 넣으면 묽어져요 → 방울토마토가 가라앉아요'});}
          else{ok=false;p.hit(false,{x:it.x,y:G.by-u,tip:'모래는 물에 녹지 않아요',review:'모래 → 물에 녹지 않아요'});}}
        else{const S=SOL[st.k];if(it.good)p.hit(true,{x:it.x,y:G.by-u,tip:`${nm}: ${S.tipYes}`,tipMs:1300});
          else p.hit(false,{x:it.x,y:G.by-u,tip:`${nm}${S.tipNo.replace('은(는)',J(nm,'은').slice(nm.length))}`,review:`${nm}${S.tipNo.replace('은(는)',J(nm,'은').slice(nm.length))}`});}
        st.mood=ok?'happy':'oops';st.moodT=.9;}}
    st.items=st.items.filter(it=>!it.done&&it.y<p.H+u);},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),Z=this.Z(p);
    lab(g,W,H,u,st.T,Z.y0);
    for(const it of st.items){const s=u*.95;g.save();g.globalAlpha=clamp(it.age*4,0,1);K.shadow(g,it.x,it.y+s*.55,s*.3,s*.08,.12);K.glow(g,it.x,it.y,s*.8,'#ffffff',.7);K.emo(g,it.a[0],it.x,it.y,s,it.rot*.3);pill(g,it.a[1],it.x,it.y+u*.72,u*.3,'rgba(255,255,255,.95)','#155e75');g.restore();}
    const x=st.x,bw=G.bw,bh=G.bh,by=G.by;const lv=by+bh*.25;
    beaker(g,u,st.T,x,G,p.color,st.conc,st.k==='dense',st.mood,st.splash);
    if(st.splash>0){for(let k=0;k<5;k++){K.orb(g,x-bw/3+k*bw/6,lv-st.splash*u*2*(1+k%2),u*.09,'#67e8f9');}}
    if(st.big>0){pill(g,`✨ 큰 비커 ${Math.ceil(st.big)}초`,x,by-u*.9,u*.27,'#fef3c7','#92400e');}
    if(st.k==='dense'){const ty=by+bh-u*.45-(bh*.62)*st.conc;K.emo(g,'🍅',x+bw*.0,ty+bh*.0,u*.65);
      const ly=by+bh*.36;g.save();g.setLineDash([u*.12,u*.1]);g.strokeStyle='#db2777';g.lineWidth=2;g.beginPath();g.moveTo(x-bw/2,ly);g.lineTo(x+bw/2,ly);g.stroke();g.restore();
      K.txt(g,'🎯',x+bw/2+u*.3,ly,{size:u*.34});
      const mw=bw,mh=u*.2,mx=x-bw/2,my=by-u*.55-(st.big>0?u*.5:0);K.card(g,mx,my,mw,mh,mh/2,'rgba(255,255,255,.9)',{blur:u*.2,dy:u*.05,hi:false});
      if(st.conc>0){g.save();K.rr(g,mx,my,Math.max(mh,mw*st.conc),mh,mh/2);const cg=g.createLinearGradient(mx,0,mx+mw,0);cg.addColorStop(0,'#f9a8d4');cg.addColorStop(1,'#db2777');g.fillStyle=cg;g.fill();g.restore();}
      pill(g,'진하기',x,my-u*.32,u*.26,'#ffffff','#0e7490');}},
  down(p,x){p.state.tx=x;},
  move(p,x,y,down,e){if(down||(e&&e.pointerType==='mouse'))p.state.tx=x;},
};

Engine.boot(GAME);
