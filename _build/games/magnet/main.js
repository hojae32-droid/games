/* 4학년 · 자석의 이용 — 자석 탐사선 (극을 바꿔 끌어당기고 밀어내기, 붙는 물체 고르기)
   디자인: 빨강·파랑 장난감 실험실. 말굽자석 친구와 N·S극 공은 직접 그린 그림이고, 끌리고 밀리는 힘의 선이 보여요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const INK='#1b2a4a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M10 40V20a14 14 0 0 1 28 0v20" fill="none" stroke="#1b2a4a" stroke-width="13" stroke-linecap="butt"/><path d="M10 40V20a14 14 0 0 1 28 0v20" fill="none" stroke="#dc2626" stroke-width="8"/><path d="M24 6a14 14 0 0 1 14 14v20" fill="none" stroke="#2563eb" stroke-width="8"/><rect x="6" y="36" width="8" height="8" fill="#fff" stroke="#1b2a4a" stroke-width="2"/><rect x="34" y="36" width="8" height="8" fill="#fff" stroke="#1b2a4a" stroke-width="2"/></svg>';
/*@@DATA@@*/
/* 말굽자석: (x,y)=가운데, s=크기, pole 'N'|'S' 활성 끝, down: 아래를 향한 열기 */
function horseshoe(g,x,y,s,t,pole,mood,look,down){g.save();g.translate(x,y);g.lineJoin='round';
  const R=s*.5,th=s*.3;const arc=(r,c,w)=>{g.strokeStyle=c;g.lineWidth=w;g.lineCap='butt';g.beginPath();g.moveTo(-r,s*.55);g.lineTo(-r,0);g.arc(0,0,r,Math.PI,0);g.lineTo(r,s*.55);g.stroke();};
  K.shadow(g,0,s*.75,s*.7,s*.1,.22);
  /* 바탕(검은 윤곽) + 빨강/파랑 */
  const rr=R-th/2;g.strokeStyle=INK;g.lineWidth=th+s*.08;g.beginPath();g.moveTo(-rr,s*.55);g.lineTo(-rr,0);g.arc(0,0,rr,Math.PI,0);g.lineTo(rr,s*.55);g.stroke();
  g.lineCap='butt';g.lineWidth=th;g.strokeStyle='#dc2626';g.beginPath();g.moveTo(-rr,s*.55);g.lineTo(-rr,0);g.arc(0,0,rr,Math.PI,Math.PI*1.5);g.stroke();
  g.strokeStyle='#2563eb';g.beginPath();g.moveTo(rr,s*.55);g.lineTo(rr,0);g.arc(0,0,rr,0,-Math.PI*.5,true);g.stroke();
  g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=th*.18;g.beginPath();g.arc(0,0,rr+th*.28,Math.PI*1.08,Math.PI*1.4);g.stroke();
  /* 끝 (흰색 팁) */
  for(const [d,c,l] of [[-1,'#dc2626','N'],[1,'#2563eb','S']]){const act=pole===l;g.fillStyle='#f8fafc';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.04);K.rr(g,d*rr-th/2,s*.4,th,s*.2,s*.03);g.fill();g.stroke();
    if(act)K.glow(g,d*rr,s*.62,s*.5,c,.6);K.txt(g,l,d*rr,s*.5,{size:s*.2,color:c,stroke:'#fff',lw:s*.05});}
  /* 얼굴 */
  g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=Math.max(1.8,s*.035);for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.1,-s*.14,s*.075,s*.09,0,0,TAU);g.fill();g.stroke();}
  g.fillStyle=INK;const lx=clamp(look?look[0]:0,-1,1)*s*.025,ly=clamp(look?look[1]:0,-1,1)*s*.03;
  if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.1-s*.04,-s*.18);g.lineTo(d*s*.1+s*.04,-s*.1);g.moveTo(d*s*.1+s*.04,-s*.18);g.lineTo(d*s*.1-s*.04,-s*.1);g.stroke();}}
  else for(const d of[-1,1]){g.beginPath();g.arc(d*s*.1+lx,-s*.14+ly,s*.035,0,TAU);g.fill();}
  g.lineCap='round';g.beginPath();if(mood==='happy'){g.fillStyle='#c0392b';g.arc(0,-s*.04,s*.09,0,Math.PI);g.fill();}else if(mood==='oops'){g.arc(0,s*.04,s*.06,1.15*Math.PI,1.85*Math.PI);g.stroke();}else if(mood==='strain'){g.moveTo(-s*.06,-s*.0);g.lineTo(s*.06,-s*.0);g.stroke();}else{g.arc(0,-s*.05,s*.06,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.restore();}
function orbBall(g,x,y,r,pole,hl){const c=pole==='N'?'#f05252':'#3f83f8';if(hl)K.glow(g,x,y,r*2.2,'#fde047',.5);K.orb(g,x,y,r,c);g.save();g.lineWidth=Math.max(1.6,r*.1);g.strokeStyle=INK;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();g.restore();K.txt(g,pole,x,y+r*.05,{size:r,color:'#fff',stroke:'rgba(15,27,61,.4)',lw:Math.max(2,r*.15)});if(hl){g.strokeStyle='#fde047';g.lineWidth=Math.max(2,r*.14);g.beginPath();g.arc(x,y,r*1.25,0,TAU);g.stroke();}}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;K.vgrad(g,0,0,W,H,['#243a72','#2b3f73','#1e2e5c']);K.grid(g,W,H,u*.8,'rgba(255,255,255,.07)');
    const cx=wide?W*.82:W/2,cy=H*(wide?.74:.62);
    for(let i=0;i<6;i++){const a=T*.8+i*TAU/6;const rr=u*(2.2+Math.sin(T*1.5+i)*.5);const bx=cx+Math.cos(a)*rr*(wide?1.4:1.1),by=cy+u*.3+Math.sin(a)*rr*.7;
      g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;g.setLineDash([u*.15,u*.15]);g.lineDashOffset=-T*u;g.beginPath();g.moveTo(cx,cy+u*.3);g.lineTo(bx,by);g.stroke();g.setLineDash([]);orbBall(g,bx,by,u*.34,i%2?'N':'S');}
    horseshoe(g,cx,cy-u*.3,u*2.2,T,Math.sin(T)>0?'N':'S',Math.sin(T*.7)>.3?'happy':'neutral',[Math.cos(T),Math.sin(T)]);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u,y0=Math.max(p.top||0,u*2.6),y1=p.H-(p.bot||0)-u*.1;return{y0,y1,h:Math.max(100,y1-y0)};},
  init(p){const st=p.state;Object.assign(st,{mx:p.W/2,my:p.H/2,tx:p.W/2,ty:p.H/2,pole:'N',balls:[],items:[],kN:0,T:0,mood:'neutral',moodT:0,qt:0,qmax:0});this.mode(p);},
  mode(p){const st=p.state,L=p.levelId;const Z=this.Z(p);st.k=L==='all'?['pole','iron','use'][st.kN++%3]:L;st.got=0;st.items=[];st.balls=[];st.zip=null;st.qt=0;st.qmax=0;st.rev=false;
    if(st.k==='pole'){st.target=p.R.pick(['N','S']);st.mx=p.W/2;st.my=Z.y0+Z.h*.6;st.tx=st.mx;st.ty=st.my;for(let i=0;i<8;i++)this.addBall(p,i%2?'N':'S');this.askPole(p);
      p.tools([{e:'🔴',t:'N극'},{e:'🔵',t:'S극'}],k=>{st.pole=k?'S':'N';p.Snd.tone(k?500:700,.08);},{sel:st.pole==='N'?0:1});}
    else{p.ctrl.innerHTML='';const set=st.k==='iron'?MAG_ITEMS:MAG_USE;const R=p.R;const ys=R.sample(set.yes,3),ns=R.sample(set.no,4);
      const all=R.shuffle([...ys.map(a=>({e:a[0],t:a[1],ok:true})),...ns.map(a=>({e:a[0],t:a[1],ok:false}))]);
      const cols=p.W>p.H?4:3;const rows=Math.ceil(all.length/cols);const iy0=Z.y0+p.u*1.9,ih=Z.y1-iy0-p.u*.6;
      all.forEach((it,i)=>{const c=i%cols,r=Math.floor(i/cols);Object.assign(it,{x:p.W*(c+.5)/cols+R.num(-1,1)*p.u*.3,y:iy0+ih*(r+.5)/rows,done:false});});
      st.items=all;st.left=ys.length;st.mx=p.W/2;st.my=Z.y0+p.u*.9;st.tx=st.mx;st.ty=st.my;st.qmax=32/p.pace;st.qt=st.qmax;
      p.ask(st.k==='iron'?'🧲 자석에 <b>붙는</b> 물체를 모두 톡!':'🧲 <b>자석을 이용한</b> 물건을 모두 톡!',`${ys.length}개 숨어 있어요`);}},
  askPole(p){const st=p.state;const t=st.target;p.ask(`🧲 <b style="color:${t==='N'?'#dc2626':'#2563eb'}">${t}극</b> 공만 끌어와요!`,'내 자석의 극을 잘 골라요 · 같은 극은 밀어내요');},
  addBall(p,pole){const st=p.state,R=p.Rf,u=p.u,Z=this.Z(p);let x,y,k=0;do{x=R.num(u,p.W-u);y=R.num(Z.y0+u*.6,Z.y1-u*.5);k++;}while(k<20&&Math.hypot(x-st.mx,y-st.my)<u*4);
    st.balls.push({x,y,vx:R.num(-1,1)*u*.5*p.pace,vy:R.num(-1,1)*u*.5*p.pace,pole});},
  update(p,dt){const st=p.state,u=p.u,W=p.W,H=p.H;st.T+=dt;const Z=this.Z(p);if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}
    if(st.k==='pole'){st.ty=clamp(st.ty,Z.y0+u*.8,Z.y1-u*.8);st.mx+=(st.tx-st.mx)*Math.min(1,dt*7);st.my+=(st.ty-st.my)*Math.min(1,dt*7);
      for(const b of st.balls){const dx=st.mx-b.x,dy=st.my-b.y,d=Math.hypot(dx,dy)||1;const rng=u*3.2;
        if(d<rng){const f=u*40*(1-d/rng)/(d/u+.6);const s=b.pole!==st.pole?1:-1;b.vx+=dx/d*f*s*dt;b.vy+=dy/d*f*s*dt;}
        b.vx*=1-dt*1.2;b.vy*=1-dt*1.2;b.x+=b.vx*dt;b.y+=b.vy*dt;
        if(b.x<u*.5){b.x=u*.5;b.vx=Math.abs(b.vx);}if(b.x>W-u*.5){b.x=W-u*.5;b.vx=-Math.abs(b.vx);}if(b.y<Z.y0+u*.5){b.y=Z.y0+u*.5;b.vy=Math.abs(b.vy);}if(b.y>Z.y1-u*.5){b.y=Z.y1-u*.5;b.vy=-Math.abs(b.vy);}
        if(!b.gone&&d<u*1.05&&b.pole!==st.pole){b.gone=true;const ok=b.pole===st.target;p.Snd.tone(900,.05);st.mood=ok?'happy':'oops';st.moodT=.8;
          p.hit(ok,{x:b.x,y:b.y,color:b.pole==='N'?'#ef4444':'#3b82f6',tip:ok?`${st.pole}극이 ${b.pole}극을 끌어당겼어요 (다른 극끼리는 끌어당겨요)`:`${b.pole}극 공이 붙었어요! ${st.target}극 공을 당기려면 내 자석을 <b>${st.target==='N'?'S':'N'}극</b>으로!`,review:`${st.target}극을 끌어당기려면 ${st.target==='N'?'S':'N'}극 (다른 극끼리 끌어당기고, 같은 극끼리 밀어내요)`});
          if(ok){st.got++;if(st.got%4===0){st.target=st.target==='N'?'S':'N';this.askPole(p);}}}}
      st.balls=st.balls.filter(b=>!b.gone);while(st.balls.filter(b=>b.pole==='N').length<4)this.addBall(p,'N');while(st.balls.filter(b=>b.pole==='S').length<4)this.addBall(p,'S');}
    else{st.mx+=(st.tx-st.mx)*Math.min(1,dt*8);st.my+=(st.ty-st.my)*Math.min(1,dt*8);
      if(st.qmax>0&&!st.rev&&st.left>0){st.qt-=dt;if(st.qt<=0){st.rev=true;st.mood='oops';st.moodT=1.6;p.hit(false,{pen:20,x:W/2,y:H*.4,tip:'시간이 다 됐어요! 초록으로 빛나는 것이 정답이에요',tipMs:2600});
          st.items.forEach(it=>{if(it.ok&&!it.done){const rv=st.k==='iron'?`${it.t} → 자석에 붙어요 (철)`:`${it.t} → 자석을 이용해요`;if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}});setTimeout(()=>{if(p.active)this.mode(p);},2200);}}
      const z=st.zip;if(z){z.t+=dt;if(z.t>.35&&!z.done){z.done=true;const it=z.it;st.mood=it.ok?'happy':'oops';st.moodT=1;
          p.hit(it.ok,{x:it.x,y:it.y-u,tip:it.ok?(st.k==='iron'?`${it.t}: 철이라 자석에 붙어요`:`${it.t}: 자석을 이용해요`):(st.k==='iron'?`${it.t}${J(it.t,'은').slice(it.t.length)} 자석에 붙지 않아요 (철이 아니에요)`:`${it.t}에는 자석이 쓰이지 않아요`),
            review:st.k==='iron'?`${it.t} → ${it.ok?'자석에 붙어요 (철)':'자석에 붙지 않아요'}`:`${it.t} → ${it.ok?'자석을 이용해요':'자석을 이용하지 않아요'}`});
          it.done=true;it.stick=it.ok;if(it.ok)st.left--;
          setTimeout(()=>{if(!p.active)return;st.tx=p.W/2;st.ty=Z.y0+u*.9;st.zip=null;if(st.left<=0)setTimeout(()=>{if(p.active)this.mode(p);},300);},it.ok?450:650);}}}},
  pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.2;K.card(g,x-w/2,y-s*.8,w,s*1.6,s*.8,bg,{blur:s*.4,dy:s*.1,hi:false,stroke:INK,lw:2});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z=this.Z(p);
    if(st.k==='pole'){
      K.vgrad(g,0,0,W,H,['#243a72','#2b3f73','#1e2e5c']);K.grid(g,W,H,u,'rgba(255,255,255,.07)');
      const c=st.pole==='N'?'#ef4444':'#3b82f6';K.glow(g,st.mx,st.my,u*3.4,c,.28);
      g.save();g.setLineDash([u*.15,u*.2]);g.lineDashOffset=-t*u*.8;for(let r=1;r<=3;r++){g.strokeStyle=K.rgba(c,.5-r*.12);g.lineWidth=2;g.beginPath();g.arc(st.mx,st.my,u*r,0,TAU);g.stroke();}g.restore();
      /* 힘의 선 */
      for(const b of st.balls){const d=Math.hypot(b.x-st.mx,b.y-st.my);if(d<u*3.2){const att=b.pole!==st.pole;g.save();g.strokeStyle=att?'rgba(74,222,128,.75)':'rgba(251,113,133,.75)';g.lineWidth=Math.max(2,u*.06);g.setLineDash([u*.12,u*.14]);g.lineDashOffset=(att?1:-1)*t*u*1.6;g.beginPath();g.moveTo(st.mx,st.my);g.lineTo(b.x,b.y);g.stroke();g.restore();}}
      for(const b of st.balls)orbBall(g,b.x,b.y,u*.5,b.pole,b.pole===st.target);
      let near=null,nd=1e9;for(const b of st.balls){const d=Math.hypot(b.x-st.mx,b.y-st.my);if(d<nd){nd=d;near=b;}}
      horseshoe(g,st.mx,st.my-u*.4,u*1.9,t,st.pole,st.mood,near?[(near.x-st.mx)/u,(near.y-st.my)/u]:null);
      this.pill(g,'내 자석 · '+st.pole+'극',st.mx,st.my+u*1.3,u*.28,'rgba(255,255,255,.96)',INK);}
    else{
      const ty=Z.y0-u*.4;K.vgrad(g,0,0,W,ty+u*.4,['#c7e3ff','#e6f2ff']);
      K.vgrad(g,0,ty+u*.3,W,H-ty,['#e8c497','#d9ab74','#c7935c']);
      g.save();g.strokeStyle='rgba(120,70,30,.12)';g.lineWidth=2;for(let k=1;k<8;k++){const y=ty+(H-ty)*k/8;g.beginPath();for(let x=0;x<=W;x+=W/20)g.lineTo(x,y+Math.sin(x/W*6+k)*u*.12);g.stroke();}g.restore();
      g.fillStyle='rgba(255,255,255,.4)';g.fillRect(0,ty+u*.3,W,Math.max(2,u*.08));
      K.card(g,W*.08,Z.y0-u*.1,W*.84,u*.26,u*.13,'#64748b',{blur:u*.2,dy:u*.06,stroke:INK,lw:2});
      for(const it of st.items){if(it.stick)continue;const glow=st.rev&&it.ok;g.save();g.globalAlpha*=it.done?.4:1;
        K.shadow(g,it.x,it.y+u*.82,u*.85,u*.18,.22);if(glow)K.glow(g,it.x,it.y,u*1.5,'#4ade80',.7);
        const pg=g.createRadialGradient(it.x-u*.3,it.y-u*.4,u*.1,it.x,it.y,u*.95);pg.addColorStop(0,'#ffffff');pg.addColorStop(1,it.done?'#fee2e2':(glow?'#dcfce7':'#eef2f7'));
        g.fillStyle=pg;g.beginPath();g.arc(it.x,it.y,u*.92,0,TAU);g.fill();g.strokeStyle=it.done?'#f87171':(glow?'#16a34a':INK);g.lineWidth=Math.max(2,u*.06);g.stroke();
        K.emo(g,it.e,it.x,it.y-u*.1,u*1.05);K.tag(g,it.t,it.x,it.y+u*.95,{size:u*.34,maxW:u*3.2,color:'#3b2a1a'});g.restore();}
      g.save();g.strokeStyle='#475569';g.lineWidth=Math.max(2,u*.08);g.lineCap='round';g.beginPath();g.moveTo(W/2,Z.y0);g.lineTo(st.mx,st.my-u*.5);g.stroke();g.restore();
      K.card(g,W/2-u*.35,Z.y0-u*.2,u*.7,u*.38,u*.12,'#334155',{blur:u*.2,dy:u*.05});
      g.save();g.translate(st.mx,st.my+u*.7);g.scale(1,-1);horseshoe(g,0,0,u*1.2,t,st.zip?'S':'N',st.mood==='neutral'&&st.zip?'strain':st.mood,null);g.restore();
      const z=st.zip;if(z&&z.done&&z.it.ok){K.emo(g,z.it.e,st.mx,st.my+u*1.3,u*.9);}
      this.pill(g,`남은 개수 ${st.left}`,W-u*1.5,Z.y0+u*.9,u*.34,'#ffffff','#1e3a8a');
      if(st.qmax>0&&!st.rev){const f=clamp(st.qt/st.qmax,0,1);const bw=Math.min(W*.8,u*12),bh=Math.max(6,u*.2),bx=W/2-bw/2,by=H-u*.4;K.rr(g,bx,by,bw,bh,bh/2);g.fillStyle='rgba(27,42,74,.25)';g.fill();K.rr(g,bx,by,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#2563eb':(f>.2?'#facc15':'#dc2626');g.fill();}}},
  down(p,x,y){const st=p.state,u=p.u;
    if(st.k==='pole'){st.tx=x;st.ty=y;return;}
    if(st.zip||st.rev)return;const it=st.items.find(i=>!i.done&&Math.hypot(x-i.x,y-i.y)<u*1.1);if(!it)return;
    st.zip={it,t:0};st.tx=it.x;st.ty=it.y-u*1.4;p.Snd.slide(300,800,.2,.05);},
  move(p,x,y,down){if(down&&p.state.k==='pole'){p.state.tx=x;p.state.ty=y;}},
};

Engine.boot(GAME);
