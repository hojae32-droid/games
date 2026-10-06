/* 4학년 · 물의 상태 변화 — 물방울 변신 러너 (얼음·물·수증기로 변신해 장애물과 문제 문 통과)
   디자인: 아침에서 저녁까지 달리는 산뜻한 물빛 세상. 물방울 친구는 얼음 · 물 · 구름으로 변신하고 표정이 바뀌어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b3a5c';
const mixc=(a,b,t)=>{const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const x=h(a),y=h(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4C24 4 9 22 9 31a15 15 0 0 0 30 0C39 22 24 4 24 4z" fill="#38bdf8" stroke="#0b3a5c" stroke-width="3.5" stroke-linejoin="round"/><circle cx="19" cy="31" r="2.2" fill="#0b3a5c"/><circle cx="29" cy="31" r="2.2" fill="#0b3a5c"/><path d="M20 37q4 3 8 0" stroke="#0b3a5c" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M17 22q-3 4-3 8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/></svg>';
/*@@DATA@@*/
function dface(g,s,mood,ey){g.save();g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=Math.max(1.8,s*.06);g.lineCap='round';
  for(const d of[-1,1]){const x=d*s*.2;if(mood==='oops'){g.beginPath();g.moveTo(x-s*.07,ey-s*.07);g.lineTo(x+s*.07,ey+s*.07);g.moveTo(x+s*.07,ey-s*.07);g.lineTo(x-s*.07,ey+s*.07);g.stroke();}
    else if(mood==='happy'){g.beginPath();g.arc(x,ey+s*.03,s*.08,Math.PI*1.1,Math.PI*1.9);g.stroke();}
    else{g.fillStyle='#fff';g.beginPath();g.ellipse(x,ey,s*.09,s*.11,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(x+s*.02,ey+s*.02,s*.045,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,ey+s*.17,s*.12,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,ey+s*.27,s*.09,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.arc(0,ey+s*.14,s*.09,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(251,146,60,.5)';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.32,ey+s*.1,s*.06,s*.04,0,0,TAU);g.fill();}g.restore();}
/* 물방울 친구: form = ice | water | vapor */
function dropy(g,x,y,s,form,mood,t,anim){g.save();g.translate(x,y);const sc=1+anim*1.2;g.scale(sc,sc);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  if(form==='water'){const gr=g.createRadialGradient(-s*.2,-s*.1,s*.05,0,s*.1,s*.7);gr.addColorStop(0,'#bae6fd');gr.addColorStop(1,'#0ea5e9');g.fillStyle=gr;
    g.beginPath();g.moveTo(0,-s*.8);g.bezierCurveTo(s*.15,-s*.5,s*.55,-s*.15,s*.55,s*.2);g.arc(0,s*.2,s*.55,0,Math.PI);g.bezierCurveTo(-s*.55,-s*.15,-s*.15,-s*.5,0,-s*.8);g.closePath();g.fill();g.stroke();
    g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=s*.07;g.beginPath();g.arc(0,s*.2,s*.42,Math.PI*.95,Math.PI*1.3);g.stroke();
    g.save();g.translate(0,s*.2);dface(g,s,mood,0);g.restore();}
  else if(form==='ice'){const gr=g.createLinearGradient(-s*.5,-s*.5,s*.5,s*.5);gr.addColorStop(0,'#f0f9ff');gr.addColorStop(1,'#7dd3fc');g.fillStyle=gr;K.rr(g,-s*.5,-s*.5,s,s,s*.14);g.fill();g.stroke();
    g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=s*.06;g.beginPath();g.moveTo(-s*.35,-s*.25);g.lineTo(-s*.1,-s*.4);g.moveTo(-s*.38,-s*.1);g.lineTo(-s*.38,s*.1);g.stroke();
    g.save();g.translate(0,s*.05);dface(g,s,mood,0);g.restore();
    const sp=(Math.sin(t*6)+1)/2;g.fillStyle=`rgba(255,255,255,${.5+.5*sp})`;g.beginPath();g.arc(s*.55,-s*.5,s*.08*(1+sp),0,TAU);g.fill();}
  else{const puff=[[-.4,.1,.32],[.4,.12,.3],[0,-.15,.42],[-.15,.2,.4],[.2,.2,.36]];g.fillStyle='#ffffff';
    g.beginPath();puff.forEach(([a,b,r])=>{g.moveTo(a*s+r*s,b*s);g.arc(a*s,b*s,r*s,0,TAU);});g.fill();g.save();g.globalCompositeOperation='source-over';g.strokeStyle=INK;g.stroke();g.restore();
    g.fillStyle='#fff';g.beginPath();puff.forEach(([a,b,r])=>{g.moveTo(a*s+r*s-1,b*s);g.arc(a*s,b*s,r*s-1,0,TAU);});g.fill();
    g.save();g.translate(0,s*.08);dface(g,s,mood,0);g.restore();}
  g.restore();}
const FORM_LBL={ice:'얼음 (고체) · 0℃ 아래',water:'물 (액체)',vapor:'수증기 (기체) · 100℃ 위'};
function runBg(g,W,H,u,gy,t,scroll,f){
  K.sky(g,W,gy,mixc('#6ec3f5','#f59e6b',f),mixc('#e3f4ff','#ffe4c2',f));
  K.glow(g,W*.86,H*.14+f*H*.2,u*2.6,'#fff1a8',.6);K.emo(g,'☀️',W*.86,H*.14+f*H*.2,u*1.3);
  K.clouds(g,W,H,t,.1,3,Math.min(W,H)*.14);
  const ridge=(sp,base,amp,fr,c1,c2)=>{const off=scroll*sp;g.beginPath();g.moveTo(0,gy);for(let x=0;x<=W;x+=W/48){const tt=(x+off)/u;g.lineTo(x,base-amp*(.55+.3*Math.sin(tt*fr)+.15*Math.sin(tt*fr*2.7+1)));}g.lineTo(W,gy);g.closePath();
    const gr=g.createLinearGradient(0,base-amp,0,gy);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fill();};
  ridge(.1,gy-u*.4,u*3.2,.22,mixc('#b7c9ee','#d9a7c7',f),mixc('#d8e6f8','#f5d6c6',f));
  ridge(.25,gy,u*1.8,.35,mixc('#8fd6a6','#d4b06a',f),mixc('#b9e9c8','#ecd29a',f));
  K.ground(g,gy,W,H,'#7bcf7f','#a7e8a0');
  K.vgrad(g,0,gy+u*.35,W,H-gy-u*.35,['#c8955f','#9b6a3e']);
  g.fillStyle='rgba(255,255,255,.18)';for(let x=-(scroll%(u*1.6));x<W;x+=u*1.6){g.beginPath();g.ellipse(x,gy+u*.17,u*.35,u*.06,0,0,7);g.fill();}}
function obstacle(g,o,u,gy,W_OBS,W_STATE){const x=o.x;g.save();g.globalAlpha=o.done&&o.res?.35:1;
  if(o.quiz){K.shadow(g,x,gy+u*.05,u*1.1,u*.18,.2);
    g.save();g.shadowColor='rgba(120,53,15,.35)';g.shadowBlur=u*.4;g.shadowOffsetY=u*.1;g.beginPath();g.moveTo(x-u*.85,gy);g.lineTo(x-u*.85,gy-u*2.8);g.arc(x,gy-u*2.8,u*.85,Math.PI,0);g.lineTo(x+u*.85,gy);g.closePath();
    const dg=g.createLinearGradient(x-u*.85,0,x+u*.85,0);dg.addColorStop(0,'#f59e0b');dg.addColorStop(.5,'#fcd34d');dg.addColorStop(1,'#d97706');g.fillStyle=dg;g.fill();g.restore();
    g.beginPath();g.moveTo(x-u*.6,gy);g.lineTo(x-u*.6,gy-u*2.75);g.arc(x,gy-u*2.75,u*.6,Math.PI,0);g.lineTo(x+u*.6,gy);g.closePath();g.fillStyle='#fff7e0';g.fill();
    K.glow(g,x,gy-u*2.2,u*1.1,'#fde68a',.6);K.txt(g,'?',x,gy-u*2.3,{size:u*1.2,color:'#b45309'});
    if(o.done)K.emo(g,W_STATE[o.need].e,x,gy-u*1,u*1);}
  else if(o.k==='crate'){if(!(o.done&&o.res)){K.shadow(g,x,gy+u*.05,u*.9,u*.16,.22);K.emo(g,'📦',x,gy-u*.8,u*1.7);}}
  else if(o.k==='pipe'){K.shadow(g,x,gy+u*.05,u*1.2,u*.18,.22);
    [[-1],[1]].forEach(([sd])=>{const x0=x+sd*u*.5;g.save();g.shadowColor='rgba(30,41,59,.35)';g.shadowBlur=u*.35;g.shadowOffsetY=u*.08;
      K.rr(g,sd<0?x0-u*.75:x0,gy-u*3.4,u*.75,u*3.4,u*.3);const rg=g.createLinearGradient(x0-u*.75,0,x0+u*.75,0);rg.addColorStop(0,'#94a3b8');rg.addColorStop(1,'#64748b');g.fillStyle=rg;g.fill();g.restore();});
    g.fillStyle='#1e293b';K.rr(g,x-u*.5,gy-u*3.3,u,u*3.3,u*.12);g.fill();g.fillStyle='rgba(56,189,248,.35)';K.rr(g,x-u*.18,gy-u*3.3,u*.36,u*3.3,u*.1);g.fill();}
  else if(o.k==='wall'){K.shadow(g,x,gy+u*.05,u,u*.16,.22);
    g.save();g.shadowColor='rgba(127,29,29,.35)';g.shadowBlur=u*.35;g.shadowOffsetY=u*.08;K.rr(g,x-u*.7,gy-u*2.6,u*1.4,u*2.6,u*.18);const bg=g.createLinearGradient(0,gy-u*2.6,0,gy);bg.addColorStop(0,'#e0735a');bg.addColorStop(1,'#a8402c');g.fillStyle=bg;g.fill();g.restore();
    g.save();K.rr(g,x-u*.7,gy-u*2.6,u*1.4,u*2.6,u*.18);g.clip();g.strokeStyle='rgba(255,235,220,.55)';g.lineWidth=Math.max(1.5,u*.05);
    for(let r=1;r<5;r++){const yy=gy-r*u*.52;g.beginPath();g.moveTo(x-u*.7,yy);g.lineTo(x+u*.7,yy);g.stroke();}
    for(let r=0;r<5;r++){const yy=gy-r*u*.52,of=r%2?0:u*.35;g.beginPath();g.moveTo(x-u*.35+of,yy);g.lineTo(x-u*.35+of,yy-u*.52);g.stroke();}g.restore();}
  if(!o.quiz&&!o.done)K.tag(g,W_OBS[o.k].t,x,gy+u*.7,{size:u*.34,maxW:u*3,color:'#3b2a1a'});
  g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7;const gy=H*.78;const sc=T*u*2.4;runBg(g,W,H,u,gy,T,sc,(Math.sin(T*.1)+1)/4);
    const forms=['water','ice','water','vapor'];const per=2.4;const fi=Math.floor(T/per)%4,form=forms[fi];const f=(T%per)/per;
    const obs=[{k:'pipe'},{k:'crate'},{k:'pipe'},{k:'wall'}][fi];const ox=W*(wide?.75:.85)-f*W*.5;
    obstacle(g,{x:ox,k:obs.k,done:false},u,gy,W_OBS,W_STATE);
    const px=W*(wide?.35:.28);const lift=form==='vapor'?u*2.2+Math.sin(T*3)*u*.2:0;
    K.shadow(g,px,gy+u*.03,u*.5*(lift?.6:1),u*.12,.22);dropy(g,px,gy-u*.75-lift-(form==='water'?Math.abs(Math.sin(T*9))*u*.15:0),u*1.5,form,f<.15?'happy':'neutral',T,Math.max(0,.3-f*2));
    for(let i=0;i<3;i++){const e=['🧊','💧','☁️'][i];K.emo(g,e,W*.04+i*u*.9+u*.4,H*.1+u*.2,u*.6,0,form===['ice','water','vapor'][i]?1:.35);}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
/*@@HEAD@@*/
  init(p){const st=p.state;Object.assign(st,{s:'water',obs:[],gems:[],spawnT:.5,anim:0,scroll:0,cur:null,n:0,T:0,mood:'neutral',moodT:0,pops:[]});
    p.tools([{e:'🧊',t:'얼음'},{e:'💧',t:'물'},{e:'☁️',t:'수증기'}],k=>{st.s=['ice','water','vapor'][k];st.anim=.3;p.Snd.slide(k===0?700:k===1?500:400,k===0?400:k===1?700:900,.15,.05);p.burst&&p.burst(p.W*.22,this.ground(p)-p.u,k===0?'#bae6fd':k===1?'#38bdf8':'#ffffff',8);},{sel:1});},
  ground(p){return Math.min(p.H*.78,p.H-(p.bot||0)-p.u*.6);},
  spawn(p){const st=p.state,L=p.levelId,R=p.Rf,u=p.u;let quiz=L==='change'||(L==='all'&&st.n%2===1);st.n++;
    const spd=this.spd(p);
    if(quiz){const q=p.deck(W_QUIZ,'wq');st.obs.push({x:p.W+u*2,quiz:q,need:q[1]});}
    else{const k=R.pick(Object.keys(W_OBS));st.obs.push({x:p.W+u*2,k,need:W_OBS[k].need});}
    st.spawnT=Math.max(2.4,3.6-p.t/p.dur*1)*(L==='change'?1.15:1)/p.pace;
    /* 다음 장애물 사이에 보석 줄: 하늘 줄은 수증기, 땅 줄은 얼음·물 */
    if(st.n>1&&R.chance(.7)){const hi=R.chance(.5);const gx=p.W+u*2+spd*st.spawnT*.5-u*.9;for(let k=0;k<3;k++)st.gems.push({x:gx+k*u*.9,hi,k,got:false});}},
  spd(p){return p.u*(2.6+p.t/p.dur*1.2)*p.pace;},
  focusNext(p){const st=p.state;const o=st.obs.find(o=>!o.done);if(!o||st.cur===o)return;st.cur=o;
    if(o.quiz)p.ask('❓ '+o.quiz[0],'알맞은 모습으로 변신해서 문을 지나요!');else p.ask(`다음 장애물: ${W_OBS[o.k].e} <b>${W_OBS[o.k].t}</b>`,'어떤 모습으로 변신해야 지나갈 수 있을까?');},
  update(p,dt){const st=p.state,u=p.u;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}const spd=this.spd(p);st.scroll+=spd*dt;st.anim=Math.max(0,st.anim-dt);
    st.spawnT-=dt;if(st.spawnT<=0)this.spawn(p);
    const px=p.W*.22;const gy=this.ground(p);
    for(const o of st.obs){o.x-=spd*dt;if(!o.done&&o.x<px+u*.3){o.done=true;const ok=st.s===o.need;o.res=ok;
        const need=W_STATE[o.need];st.mood=ok?'happy':'oops';st.moodT=1.1;
        if(o.quiz)p.hit(ok,{x:px,y:gy-u*2,tip:ok?o.quiz[2]:`정답: <b>${need.e} ${need.t}</b> — ${o.quiz[2]}`,review:`${o.quiz[0]} → ${need.t} (${o.quiz[2]})`});
        else{const ob=W_OBS[o.k];p.hit(ok,{x:px,y:gy-u*2,tip:ok?ob.tip:`${ob.t}: <b>${need.e} ${need.t}(${need.k})</b>로 변신해야 해요 — ${ob.tip}`,review:`${ob.t} → ${need.t}(${need.k}): ${ob.tip}`});}
        if(ok){p.burst(o.x,gy-u,o.need==='ice'?'#a16207':'#7dd3fc',14);}
        else st.bump=.4;}}
    for(const q of st.gems){q.x-=spd*dt;if(!q.got&&Math.abs(q.x-px)<u*.55){const flying=st.s==='vapor';if(q.hi===flying){q.got=true;p.add(3,q.x,(q.hi?gy-u*2.9:gy-u*.7));p.Snd.tone(900+q.k*120,.08,'sine',.05);}}}
    st.gems=st.gems.filter(q=>q.x>-u&&!q.got);
    st.obs=st.obs.filter(o=>o.x>-u*3);if(st.bump>0)st.bump-=dt;
    this.focusNext(p);},
  pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=g.measureText(str).width+s*1.2;K.card(g,x-w/2,y-s*.8,w,s*1.6,s*.8,bg,{blur:s*.6,dy:s*.15,hi:false});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,gy=this.ground(p),t=st.T;
    runBg(g,W,H,u,gy,t,st.scroll,clamp(p.t/p.dur,0,1)*.7);
    for(const o of st.obs)obstacle(g,o,u,gy,W_OBS,W_STATE);
    for(const q of st.gems){const y=q.hi?gy-u*2.9:gy-u*.7;K.glow(g,q.x,y,u*.5,q.hi?'#ffffff':'#fde68a',.5);g.save();g.translate(q.x,y+Math.sin(t*4+q.k)*u*.05);g.rotate(t*2);g.fillStyle=q.hi?'#bae6fd':'#fde047';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(0,-u*.26);g.lineTo(u*.2,0);g.lineTo(0,u*.26);g.lineTo(-u*.2,0);g.closePath();g.fill();g.stroke();g.restore();}
    const px=W*.22;let py=gy-u*.75;
    let lift=0;if(st.s==='vapor'){lift=u*2.6+Math.sin(t*3)*u*.2;}
    if(st.bump>0)py-=Math.sin(st.bump*20)*u*.2;
    const bob=st.s==='water'?Math.abs(Math.sin(t*10))*u*.15:0;
    K.shadow(g,px,gy+u*.03,u*.55*(lift?.6:1),u*.13*(lift?.6:1),lift?.1:.22);
    const cy=py-lift-bob;K.glow(g,px,cy,u*1.3,{ice:'#bae6fd',water:'#38bdf8',vapor:'#ffffff'}[st.s],.5);
    dropy(g,px,cy,u*1.5,st.s,st.mood,t,st.anim);
    g.save();g.fillStyle=p.color;g.shadowColor=p.color;g.shadowBlur=u*.3;g.beginPath();g.arc(px,cy-u*1.05,u*.13,0,TAU);g.fill();g.restore();
    this.pill(g,FORM_LBL[st.s],px,cy+u*1.15,u*.3,'rgba(255,255,255,.95)','#0c4a6e');},
};

Engine.boot(GAME);
