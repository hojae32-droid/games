/* 3학년 · 물체와 물질 — 물질 닌자 (날아오는 물건 중 조건에 맞는 것만 쓱 베기)
   디자인: 달밤의 대나무 숲 + 붓글씨. 꼬마 닌자가 같이 싸우고, 연막탄(💣)은 베면 안 돼요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="26" r="19" fill="#1c2340" stroke="#111" stroke-width="2"/><rect x="6" y="19" width="36" height="13" rx="6" fill="#ffe0bd"/><circle cx="17" cy="25.5" r="3.2" fill="#111"/><circle cx="31" cy="25.5" r="3.2" fill="#111"/><rect x="5" y="12" width="38" height="6" fill="#dc2626"/><path d="M42 14l6-5M42 16l6 3" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
/* 꼬마 닌자: 눈으로 표정을 표현해요 */
function ninja(g,x,y,s,mood,t,look,slash){g.save();g.translate(x,y);if(slash>0)g.rotate(Math.sin(slash*18)*.18*slash);else g.translate(0,Math.sin(t*3)*s*.02);
  K.shadow(g,0,s*.78,s*.55,s*.1,.3);
  g.fillStyle='#1c2340';g.strokeStyle='#0b0f22';g.lineWidth=s*.04;
  g.beginPath();g.ellipse(0,s*.5,s*.36,s*.3,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#dc2626';g.fillRect(-s*.36,s*.38,s*.72,s*.1);
  /* 팔: 칼 */
  if(slash>0){g.save();g.rotate(-1.2+ (1-slash)*2.4);g.fillStyle='#e2e8f0';g.strokeStyle='#0b0f22';g.beginPath();g.moveTo(s*.2,0);g.lineTo(s*1.1,-s*.04);g.lineTo(s*1.1,s*.04);g.lineTo(s*.2,s*.06);g.fill();g.stroke();g.restore();}
  g.fillStyle='#1c2340';g.beginPath();g.arc(0,0,s*.5,0,TAU);g.fill();g.stroke();
  g.fillStyle='#ffe0bd';g.beginPath();K.rr(g,-s*.46,-s*.17,s*.92,s*.3,s*.14);g.fill();
  g.fillStyle='#dc2626';g.fillRect(-s*.5,-s*.34,s,s*.13);
  g.beginPath();g.moveTo(s*.48,-s*.3);g.quadraticCurveTo(s*.8,-s*.4+Math.sin(t*5)*s*.1,s*.9,-s*.2+Math.sin(t*5+1)*s*.1);g.lineTo(s*.8,-s*.14);g.quadraticCurveTo(s*.7,-s*.25,s*.46,-s*.22);g.fill();
  const lx=look?clamp(look[0],-1,1)*s*.025:0,ly=look?clamp(look[1],-1,1)*s*.025:0;
  g.strokeStyle='#111';g.fillStyle='#111';g.lineWidth=s*.05;g.lineCap='round';
  for(const d of[-1,1]){const ex=d*s*.2,ey=-s*.03;
    if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.03,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.06,ey-s*.05);g.lineTo(ex+s*.06,ey+s*.05);g.moveTo(ex+s*.06,ey-s*.05);g.lineTo(ex-s*.06,ey+s*.05);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,s*.07,s*.08,0,0,TAU);g.fill();g.fillStyle='#111';g.beginPath();g.arc(ex+lx,ey+ly,s*.04,0,TAU);g.fill();}}
  if(mood==='oops'){g.fillStyle='#7dd3fc';g.beginPath();g.ellipse(s*.38,-s*.1,s*.04,s*.07,0,0,TAU);g.fill();}
  g.restore();}
/* 연막탄 */
function bomb(g,x,y,r,t){g.save();g.translate(x,y);K.orb(g,0,0,r,'#374151');g.strokeStyle='#111827';g.lineWidth=Math.max(2,r*.08);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();
  g.strokeStyle='#a16207';g.lineWidth=r*.12;g.lineCap='round';g.beginPath();g.moveTo(r*.45,-r*.8);g.quadraticCurveTo(r*.8,-r*1.2,r*1.05,-r*1.0);g.stroke();
  const f=1+Math.sin(t*20)*.3;g.fillStyle='#fde047';g.beginPath();g.arc(r*1.05,-r*1.0,r*.2*f,0,TAU);g.fill();g.fillStyle='#f97316';g.beginPath();g.arc(r*1.05,-r*1.0,r*.1*f,0,TAU);g.fill();
  g.fillStyle='#e5e7eb';g.font=K.font(r*.8);g.textAlign='center';g.textBaseline='middle';K.txt(g,'☠',0,r*.05,{size:r*.9,color:'#e5e7eb'});g.restore();}
function lantern(g,x,y,s,t){g.save();g.translate(x,y);g.rotate(Math.sin(t*1.2+x)*.05);g.strokeStyle='#3a2a1a';g.lineWidth=Math.max(1.5,s*.04);g.beginPath();g.moveTo(0,-s*3);g.lineTo(0,0);g.stroke();
  K.glow(g,0,s*.6,s*1.6,'#fb923c',.45);g.fillStyle='#ef4444';g.strokeStyle='#7f1d1d';g.lineWidth=Math.max(1.5,s*.05);g.beginPath();g.ellipse(0,s*.6,s*.5,s*.62,0,0,TAU);g.fill();g.stroke();
  g.strokeStyle='rgba(127,29,29,.6)';for(const k of[-.25,0,.25]){g.beginPath();g.ellipse(0,s*.6,s*.5*Math.abs(1-Math.abs(k)*1.5)+.01,s*.62,0,0,TAU);g.stroke();}
  g.fillStyle='#3a2a1a';g.fillRect(-s*.22,-s*.05,s*.44,s*.1);g.fillRect(-s*.22,s*1.15,s*.44,s*.1);g.restore();}
/* 대나무 숲 배경 */
function bamboo(g,x,w,H,c,seed){const gr=g.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,K.shade(c,-.15));gr.addColorStop(.4,K.shade(c,.25));gr.addColorStop(1,K.shade(c,-.25));g.fillStyle=gr;g.fillRect(x,0,w,H);
  g.fillStyle=K.shade(c,-.35);const seg=w*4.2;for(let y=(seed*37)%seg;y<H;y+=seg){g.fillRect(x-w*.08,y,w*1.16,Math.max(2,w*.12));}
  for(let k=0;k<3;k++){const y=((seed*53+k*211)%97)/97*H*.8+H*.05,sd=(k+seed)%2?1:-1;g.save();g.translate(x+w/2,y);g.rotate(sd*.6);g.fillStyle=K.shade(c,.05);g.beginPath();g.ellipse(sd*w*1.6,0,w*1.6,w*.32,0,0,7);g.fill();g.restore();}}
function forest(g,W,H,u,t){
  K.vgrad(g,0,0,W,H,['#14193f','#1f2f63','#2a5a6e','#3d7a6c']);K.stars(g,W,H*.55,t,40,5);
  const mx=W*.72,my=H*.22;K.glow(g,mx,my,u*3.4,'#fff2c4',.35);g.fillStyle='#fff6dc';g.beginPath();g.arc(mx,my,u*.95,0,7);g.fill();g.fillStyle='rgba(230,214,170,.5)';[[.3,-.2,.18],[-.3,.25,.13],[.15,.4,.1]].forEach(([a,b,r])=>{g.beginPath();g.arc(mx+a*u,my+b*u,r*u,0,7);g.fill();});
  g.save();[['#2b4a73',.62,.12,1.6],['#1f3d5c',.72,.09,2.7]].forEach(([c,yy,amp,fr],k)=>{g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=W/30)g.lineTo(x,H*yy-H*amp*Math.abs(Math.sin(x/W*Math.PI*fr+k)));g.lineTo(W,H);g.closePath();g.fillStyle=c;g.fill();});g.restore();
  K.vgrad(g,0,H*.62,W,H*.2,['rgba(160,220,210,0)','rgba(160,220,210,.18)','rgba(160,220,210,0)']);
  g.save();g.globalAlpha=.55;[.18,.5,.86].forEach((f,i)=>bamboo(g,W*f,u*.22,H,'#2f6b5a',i+3));g.globalAlpha=1;
  [.04,.95].forEach((f,i)=>bamboo(g,W*f-u*.2,u*.4,H,'#3f8f5f',i+1));g.restore();
  const fy=H*.9;K.vgrad(g,0,fy,W,H-fy,['#8a5a3b','#5c3a26']);g.fillStyle='rgba(255,220,180,.25)';g.fillRect(0,fy,W,2);g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1;for(let x=u*1.3;x<W;x+=u*2.6){g.beginPath();g.moveTo(x,fy);g.lineTo(x,H);g.stroke();}}
function drawThing(g,it,u,t){
  if(it.bomb){bomb(g,it.x,it.y,u*.62,t);return;}
  if(it.w){K.tag(g,it.n,it.x,it.y,{size:u*.62,fill:'#fffbeb',stroke:'rgba(245,158,11,.7)',maxW:u*3.2,lw:2,color:'#422006'});return;}
  K.emo(g,it.e,it.x,it.y-u*.12,u*1.35,(it.rot||0)*.3);
  K.tag(g,it.n,it.x,it.y+u*.82,{size:u*.36,fill:'rgba(255,255,255,.94)',stroke:'rgba(103,232,249,.6)',maxW:u*3.4,lw:1.5,color:'#0f2a3d'});}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const E=['🥄','🧤','🥛','🪑','🏀','🔑','📦','🧦'];const N=['금속 숟가락','고무장갑','유리컵','나무 의자','고무공','열쇠','종이 상자','양말'];
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;forest(g,W,H,u,T);
    const per=1.5,dur=1.6;let slashing=0;
    for(let i=0;i<4;i++){const s0=T+i*per/4*1.7;const n=Math.floor(s0/per),s=s0-n*per;const idx=(n*4+i)%E.length;
      const fx=W*(wide?.35:.2)+((n*37+i*23)%100)/100*W*(wide?.55:.6),topY=H*(wide?.28:.4),by=H*.95;const f=clamp(s/dur,0,1);
      const x=fx+(i%2?1:-1)*f*u*1.2,y=by-(by-topY)*4*f*(1-f);const cut=f>.5;
      if(s>dur)continue;
      if(!cut){K.emo(g,E[idx],x,y,u*1.2,f*3);}
      else{const d=(f-.5)*2;for(const sd of[-1,1]){g.save();g.beginPath();g.rect(x-u*3+sd*d*u*1.4,y-u*3+d*d*u*2,u*3,u*6);g.clip();g.translate(sd*d*u*1.4,d*d*u*2);K.emo(g,E[idx],x,y,u*1.2,f*3);g.restore();}
        if(d<.25){slashing=Math.max(slashing,1-d*4);g.save();g.strokeStyle=`rgba(255,255,255,${1-d*4})`;g.lineWidth=u*.12;g.shadowColor='#67e8f9';g.shadowBlur=u*.5;g.lineCap='round';g.beginPath();g.moveTo(x-u*1.6,y-u*1.4);g.lineTo(x+u*1.6,y+u*1.4);g.stroke();g.restore();}}}
    ninja(g,wide?W*.16:W*.18,H*.82,u*1.5,slashing>0?'happy':'neutral',T,[1,-1],slashing);
    lantern(g,W*.07,H*.1,u*.7,T);lantern(g,W*.93,H*.14,u*.6,T+1);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  Z(p){const u=p.u;return{y0:Math.max(p.top||0,u*2.6)};},
  init(p){const st=p.state;Object.assign(st,{items:[],halves:[],trail:[],prev:{},spawnT:.3,tgtT:0,tgtN:0,kind:null,T:0,mood:'neutral',moodT:0,slash:0,cuts:0});this.newTarget(p,true);},
  newTarget(p,first){const st=p.state,L=p.levelId,R=p.R;
    let kind=L==='all'?R.pick(['mat','mat','prop','word']):L;if(!first&&L==='all'&&kind===st.kind)kind=R.pick(['mat','prop','word'].filter(k=>k!==st.kind));
    st.kind=kind;st.tgtT=14;st.tgtMax=14;st.tgtN=0;
    if(kind==='word'){const obj=R.chance(.5);st.target={word:true,obj,test:it=>it.w&&(it.obj===obj),
        ask:`🥷 <b>${obj?'물체':'물질'}</b>${obj?'를':'을'} 나타내는 낱말만 베어라!`,sub:obj?'물체: 모양이 있고 공간을 차지하는 것':'물질: 물체를 만드는 재료'};}
    else{let m;do{m=R.pick(Object.keys(MATS));}while(!first&&m===st.mat&&R.f()<.9);st.mat=m;
      st.target={mat:m,test:it=>!it.w&&it.m===m,
        ask:kind==='prop'?`🥷 <b>${MATS[m].prop}</b> 물질로 만든 것만 베어라!`:`🥷 <b>${m}</b>${J(m,'으로').slice(m.length)} 만든 것만 베어라!`,
        sub:kind==='prop'?'어떤 물질일지 떠올려 봐요':''};}
    if(!first)p.Snd.bell(988,0,.05);
    p.ask(st.target.ask,st.target.sub);},
  spawn(p){const st=p.state,R=p.Rf,W=p.W,H=p.H,u=p.u,Z=this.Z(p);const tg=st.target,pc=p.pace;
    const n=W>H*1.1?R.int(2,3):R.int(1,2);
    for(let k=0;k<n;k++){let it;const want=R.chance(.5);
      if(R.chance(.1)&&p.t>5)it={bomb:true,n:'연막탄',w:false};
      else if(tg.word){const obj=want?tg.obj:!tg.obj;const w=R.pick(obj?WORD_OBJ:WORD_MAT);it={w,obj,e:null,n:w};}
      else{const pool=ITEMS.filter(x=>want?x.m===tg.mat:x.m!==tg.mat);it=Object.assign({},R.pick(pool));}
      const g=H*1.15*pc*pc,peak=(H-Z.y0-u*.7)*R.num(.6,.97);const vy=-Math.sqrt(2*g*peak);
      const x=W*(.12+.76*(k+R.num(.15,.85))/n);const vx=((W/2-x)*R.num(.25,.6)+R.num(-u,u))*pc;
      Object.assign(it,{x,y:H+u,vx,vy,g,rot:0,vr:R.num(-2,2),r:u*.85,born:p.t+k*.15});
      st.items.push(it);}
    st.spawnT=(Math.max(.75,1.35-p.t/p.dur*.5)+R.num(0,.35))/Math.sqrt(pc);},
  update(p,dt){const st=p.state;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.slash>0)st.slash=Math.max(0,st.slash-dt*3);
    st.spawnT-=dt;if(st.spawnT<=0)this.spawn(p);
    st.tgtT-=dt;if(st.tgtT<=0||st.tgtN>=4)this.newTarget(p);
    st.items=st.items.filter(it=>{if(p.t<it.born)return true;it.x+=it.vx*dt;it.y+=it.vy*dt;it.vy+=it.g*dt;it.rot+=it.vr*dt;
      if(it.x<it.r){it.x=it.r;it.vx=Math.abs(it.vx);}if(it.x>p.W-it.r){it.x=p.W-it.r;it.vx=-Math.abs(it.vx);}
      return !(it.vy>0&&it.y>p.H+it.r*2);});
    st.halves=st.halves.filter(hf=>{hf.x+=hf.vx*dt;hf.y+=hf.vy*dt;hf.vy+=p.H*1.4*dt;hf.rot+=hf.vr*dt;return hf.y<p.H+p.u*3;});
    st.trail=st.trail.filter(t=>p.t-t.t<.2);},
  cut(p,it,ax,ay,bx,by){const st=p.state;st.items=st.items.filter(x=>x!==it);st.slash=1;
    const ang=Math.atan2(by-ay,bx-ax)||0;
    [-1,1].forEach(s=>st.halves.push({it,side:s,x:it.x,y:it.y,vx:it.vx*.4+Math.cos(ang+Math.PI/2)*s*p.u*3,vy:Math.min(it.vy,0)*.3+Math.sin(ang+Math.PI/2)*s*p.u*3-p.u*2,rot:it.rot,vr:s*4,ang}));
    p.Snd.slide(1200,500,.12,.05);
    if(it.bomb){st.mood='oops';st.moodT=1;p.shake&&p.shake(.5);p.hit(false,{pen:10,x:it.x,y:it.y,tip:'연막탄(💣)은 베면 안 돼요! 건드리지 않고 피해요',color:'#9ca3af'});return;}
    const ok=st.target.test(it);st.mood=ok?'happy':'oops';st.moodT=.9;
    let tip,review;
    if(it.w){const m=it.obj?'물체':'물질';tip=ok?'':`‘${it.n}’${J(it.n,'은').slice(it.n.length)} <b>${m}</b>${IEYO(m)}`;review=`‘${it.n}’ → ${m}`;}
    else{tip=ok?'':`${it.n}${J(it.n,'은').slice(it.n.length)} <b>${it.m}</b>${J(it.m,'으로').slice(it.m.length)} 만들었어요 — ${MATS[it.m].prop} 물질`;review=`${it.n} → ${it.m}(${MATS[it.m].prop})`;}
    p.hit(ok,{x:it.x,y:it.y,tip:tip||undefined,review,color:it.w?'#facc15':MATS[it.m].c});
    if(ok)st.tgtN++;},
  segHit(p,ax,ay,bx,by){const st=p.state;for(const it of st.items.slice()){if(p.t<it.born)continue;
    const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy;let t=L2?((it.x-ax)*dx+(it.y-ay)*dy)/L2:0;t=Math.max(0,Math.min(1,t));
    const d=Math.hypot(ax+dx*t-it.x,ay+dy*t-it.y);if(d<it.r)this.cut(p,it,ax,ay,bx,by);}},
  down(p,x,y,e){const st=p.state;st.prev[e.pointerId]=[x,y];st.trail.push({x,y,t:p.t,id:e.pointerId});},
  move(p,x,y,down,e){if(!down)return;const st=p.state;const pr=st.prev[e.pointerId];if(!pr)return;
    if(Math.hypot(x-pr[0],y-pr[1])>2){this.segHit(p,pr[0],pr[1],x,y);st.trail.push({x,y,t:p.t,id:e.pointerId});st.prev[e.pointerId]=[x,y];}},
  up(p,x,y,d,e){const st=p.state;if(Math.hypot(x-d.x0,y-d.y0)<8)this.segHit(p,x-1,y-1,x+1,y+1);delete st.prev[e.pointerId];},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T,Z=this.Z(p);
    forest(g,W,H,u,t);lantern(g,W*.1,Z.y0+u*.3,u*.55,t);lantern(g,W*.9,Z.y0+u*.3,u*.55,t+1);
    for(const it of st.items)if(p.t>=it.born){K.glow(g,it.x,it.y,u*1.25,it.bomb?'#9ca3af':(it.w?'#fde68a':'#e0fbff'),.38);drawThing(g,it,u,t);}
    for(const hf of st.halves){g.save();g.translate(hf.x,hf.y);g.rotate(hf.ang);g.beginPath();g.rect(-u*3,hf.side<0?-u*3:0,u*6,u*3);g.clip();g.rotate(-hf.ang);
      g.translate(-hf.x,-hf.y);drawThing(g,Object.assign({},hf.it,{x:hf.x,y:hf.y,rot:hf.rot}),u,t);g.restore();}
    let near=null,nd=1e9;for(const it of st.items){if(p.t<it.born)continue;const d=Math.hypot(it.x-u*1.6,it.y-(H-u*1.6));if(d<nd){nd=d;near=it;}}
    ninja(g,u*1.6,H-u*1.7,u*1.35,st.mood,t,near?[(near.x-u*1.6)/W*4,(near.y-H+u*1.6)/H*4]:null,st.slash);
    const byId={};st.trail.forEach(q=>{(byId[q.id]=byId[q.id]||[]).push(q);});
    Object.values(byId).forEach(tr=>{if(tr.length<2)return;g.lineCap='round';g.lineJoin='round';
      g.save();g.shadowColor='#fb7185';g.shadowBlur=u*.4;
      for(let k=1;k<tr.length;k++){const a=1-(p.t-tr[k].t)/.2;g.strokeStyle=`rgba(254,202,202,${a*.85})`;g.lineWidth=u*.3*a+1;g.beginPath();g.moveTo(tr[k-1].x,tr[k-1].y);g.lineTo(tr[k].x,tr[k].y);g.stroke();
        g.strokeStyle=`rgba(255,255,255,${a})`;g.lineWidth=u*.1*a+1;g.stroke();}g.restore();});
    /* 목표 진행: 4칸 + 남은 시간 */
    const py=(p.top||Z.y0)+u*.45,pr=u*.2;for(let i=0;i<4;i++){const x=W/2+(i-1.5)*pr*2.8;g.beginPath();g.arc(x,py,pr,0,TAU);g.fillStyle=i<st.tgtN?'#facc15':'rgba(0,0,0,.45)';g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,u*.05);g.stroke();}
    const f=clamp(st.tgtT/st.tgtMax,0,1),bw=pr*11.2,bh=Math.max(4,u*.09);K.rr(g,W/2-bw/2,py+pr*1.6,bw,bh,bh/2);g.fillStyle='rgba(0,0,0,.4)';g.fill();K.rr(g,W/2-bw/2,py+pr*1.6,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.3?'#4ade80':'#f87171';g.fill();},
};

Engine.boot(GAME);
