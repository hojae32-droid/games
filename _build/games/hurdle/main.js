/* 1~2학년 수학 · 덧셈과 뺄셈 — 허들 셈 달리기
   디자인: 운동회 달리기 트랙. 식을 풀면 허들을 폴짝 넘고, 시간이 지나면 철퍼덕 넘어져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1e2a4a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="3" y="38" width="42" height="6" rx="3" fill="#e0633f" stroke="#1e2a4a" stroke-width="3"/><rect x="9" y="14" width="5" height="25" rx="2" fill="#f1f4f8" stroke="#1e2a4a" stroke-width="2.5"/><rect x="34" y="14" width="5" height="25" rx="2" fill="#f1f4f8" stroke="#1e2a4a" stroke-width="2.5"/><rect x="6" y="10" width="36" height="10" rx="3" fill="#fff" stroke="#1e2a4a" stroke-width="3"/><path d="M14 10v10M26 10v10M38 10v10" stroke="#e53935" stroke-width="5"/></svg>';
/*@@GEN@@*/
/*@@ART@@*/
const T_JUMP=720,T_TRIP=260,T_FALL=1600;
const HW=34;let HH=32,JUMP=46;
let ctx=null,CW=300,CH=150,G=null,NOWV=0;
const faceOf=(P,now)=>P.pose==='fall'?(P.fallP<.18?'shock':P.fallP<.72?'dizzy':'sad'):P.phase==='trip'?'shock':(P.pose==='jump'||now<P.happyUntil)?'happy':'normal';
const SPARKC=['#FFD84D','#FF6B6B','#4D96FF','#6BCB77','#C77DFF','#FF9F45'];
function burst(P,x,y,s){for(let k=0;k<10;k++){const a=Math.random()*TAU,v=(70+Math.random()*90)*s;P.parts.push({type:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60*s,r:(3+Math.random()*2.5)*s,life:.8,age:0,col:SPARKC[k%SPARKC.length],rot:Math.random()*6});}}
function puff(P,x,y,s,n){for(let k=0;k<n;k++)P.parts.push({type:'dust',x:x+(Math.random()-.5)*14*s,y,vx:(Math.random()-.5)*50*s,vy:-(10+Math.random()*25)*s,r:3*s,gr:10*s,life:.55,age:0});}
/* 첫 화면 그림: 네 친구가 트랙을 달려요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const COL=['#F26B38','#2F80ED','#1E9E57','#9B51E0'],KS=['bunny','cat','bear','penguin'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);ctx=g;
    const wide=W>H*1.25;const u0=wide?H/6.4:Math.min(W,H)/6.2;K.vgrad(g,0,0,W,H,['#8fd3ff','#e5f6ff','#fff6d6']);K.glow(g,W*.86,H*.28,u0*2.4,'#fde047',.7);K.clouds(g,W,H,T,.2,3,u0*1.5);
    const gy=H*.88,tr=u0*2.3;g.fillStyle='#e0633f';K.rr(g,-8,gy-tr*.2,W+16,tr,10);g.fill();g.fillStyle='rgba(255,255,255,.9)';g.fillRect(0,gy-tr*.2,W,Math.max(3,u0*.1));g.fillStyle='rgba(255,255,255,.3)';for(let x=-((T*u0*3)%(u0*1.6));x<W;x+=u0*1.6)g.fillRect(x,gy+tr*.45,u0*.7,Math.max(2,u0*.07));
    const u=Math.min(u0*.062*2.6,wide?H/62:W/52),gap=Math.min(W/4.6,u*34);const x0=W/2-gap*1.5;
    KS.forEach((k,i)=>{const jump=(((T+i*.9)%3.2)<.8);const jt=((T+i*.9)%3.2)/.8;const jy=jump?Math.sin(jt*Math.PI)*u*34:0;g.save();g.translate(x0+i*gap,gy);g.fillStyle='rgba(0,0,0,.15)';el(g,3*u,0,14*u,2.6*u);g.fill();
      HH=32;drawHurdle(g,u*28-((T*u*30)%(gap*4)),0,u*.8,0);g.translate(0,-jy);drawCritter(g,k,u,{pose:jump?'jump':'run',runT:T+i*.23,now:T*1000,face:jump?'happy':'normal'},COL[i]);g.restore();});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'m01-hurdle',title:'허들 셈 달리기',title1:'운동회 달리기 대회',title2:'허들 셈 달리기',emoji:LOGO,
  subtitle:'1~2학년 · 덧셈과 뺄셈',
  howto:'식을 풀고 <b>확인</b>을 누르면 허들을 <b>폴짝</b> 넘어요! 빨리 풀수록 점수가 많아요. 시간이 지나거나 틀리면 허들에 걸려 <b>철퍼덕</b> 넘어져요. 3문제 연속 정답이면 보너스!',
  how:p=>({'1-1':'<b>9까지의 수</b> 덧셈과 뺄셈','1-2':'<b>10 만들기</b>, 받아올림과 받아내림','2-1':'<b>두 자리 수</b> 받아올림·받아내림','2-2':'1~2학년 덧셈·뺄셈 <b>복습</b>'}[p.levelId]),
  theme:{c1:'#f26b38',c2:'#2f80ed'},hero:heroScene,vignette:.04,durs:[60,120,180],levelTitle:'몇 학년 몇 학기 문제를 풀까요?',
  txt:{who:'누가 달릴까요?',dur:'달리는 시간',pace:'한 문제 시간',seat:'번 선수 ',go:'달리기 시작!',s1:'1. 학기',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.keys(SEMESTERS).map(k=>({id:k,g:'1~2학년',t:SEMESTERS[k].label,d:SEMESTERS[k].desc})),
  summary:`<ul><li><b>덧셈</b>은 두 수를 합치는 것, <b>뺄셈</b>은 한 수에서 다른 수를 덜어 내는 것이에요.</li>
    <li>더해서 10이 되는 짝을 외워 두면 <b>받아올림</b>이 쉬워져요 (1+9, 2+8, 3+7, 4+6, 5+5).</li>
    <li>뺄셈에서 일의 자리가 모자라면 십의 자리에서 10을 <b>받아내림</b>해요 (13 − 5 = 8).</li>
    <li>□가 있는 식은 거꾸로 생각해요. 3 + □ = 9 이면 9 − 3 = 6!</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.3,pad=Math.max(8,u*.3),gap=Math.max(6,u*.2);const A=H-Z0-pad;const land=W>=H*1.2;const laneH=A*(land?.5:.4);
    const lane={x:0,y:Z0,w:W,h:laneH};let board,pr;
    if(land){const bw=W*.4;board={x:pad,y:Z0+laneH+gap,w:bw,h:A-laneH-gap};pr={x:pad*2+bw,y:board.y,w:W-bw-pad*3,h:board.h};}
    else{const bh=clamp(A*.15,u*2.2,u*4);board={x:pad,y:Z0+laneH+gap,w:W-pad*2,h:bh};pr={x:pad,y:board.y+bh+gap,w:W-pad*2,h:A-laneH-bh-gap*2};}
    return{W,H,u,Z0,pad,gap,land,lane,board,pad_:pr,keys:MK.keys(pr,Math.max(5,u*.16))};},
  init(p){const st=p.state;const sem=SEMESTERS[p.levelId];HH=32;JUMP=46;
    Object.assign(st,{T:0,q:null,typed:'',qTime:sem.qTime/p.pace,fac:makeQuestionFactory(p.levelId,p.R.int(1,1e9)),msg:null,press:null,
      P:{kind:['bunny','cat','bear','penguin'][p.i%4],color:p.color,bg:0,runT:0,pose:'idle',jumpY:0,fallP:0,happyUntil:0,stepAcc:0,hurdleX:-999,hurdle0:0,phase:'idle',phaseStart:0,popups:[],parts:[]}});
    MK.kb((pp,k)=>this.press(pp,k));p.ask('🏃 식을 풀어서 허들을 넘어요!','정답을 쓰고 <b>확인</b>을 눌러요');this.next(p);st.P.phase='question';},
  next(p){const st=p.state,P=st.P;st.q=st.fac.next();st.typed='';st.msg=null;P.phase='question';P.phaseStart=st.T*1000;P.hurdleX=CW+10;},
  press(p,k){const st=p.state,P=st.P;if(!p.active||P.phase!=='question')return;
    if(k==='del')st.typed=st.typed.slice(0,-1);else if(k==='ok'){this.submit(p);return;}else{if(st.typed.length>=3)return;st.typed=st.typed==='0'?k:st.typed+k;}},
  lanes(p){const G0=this.geo(p);const lh=G0.lane.h,skyH=lh*.34,h=lh-skyH;return{skyH,L:{top:skyH,h,gy:skyH+h*.88,s:Math.min(2.3,h/92),rx:Math.max(130,G0.W*.24)}};},
  setG(p){const G0=this.geo(p);const l=this.lanes(p);CW=G0.W;CH=G0.lane.h;G={n:1,qTime:p.state.qTime,skyH:l.skyH,lanes:[l.L],players:[p.state.P],duration:p.dur};return l.L;},
  shown(q){return q.expr.replace('@',String(q.answer));},
  submit(p){const st=p.state,P=st.P,q=st.q;if(st.typed==='')return;const now=st.T*1000,L=this.setG(p),G0=this.geo(p);const el_=(now-P.phaseStart)/1000;
    if(Number(st.typed)===q.answer){const pts=scoreFor(st.qTime-el_,st.qTime,0);P.happyUntil=now+T_JUMP+500;P.popups.push({t:'+'+(pts+(p.streak>=2?20:0)),c:p.color,t0:now,row:0});
      st.msg={t:'정답! 🎉',ok:1,until:now+1000};burst(P,L.rx+10*L.s,L.top+L.gy-40*L.s-L.top,L.s);P.phase='jump';P.hurdle0=P.hurdleX;P.phaseStart=now;
      p.hit(true,{pts,x:G0.lane.w*.6,y:G0.lane.y+G0.lane.h*.4,quiet:true});}
    else{st.msg={t:'아쉬워요! 정답은 '+q.answer,ok:0,until:now+2200};P.phase='trip';P.hurdle0=P.hurdleX;P.phaseStart=now;p.hit(false,{pen:0,review:this.shown(q),tip:'정답: '+this.shown(q),tipMs:2200});}},
  timeout(p,now){const st=p.state,P=st.P,L=this.setG(p);st.msg={t:'시간이 끝났어요! 정답은 '+st.q.answer,ok:0,until:now+2200};P.phase='fall';P.phaseStart=now;puff(P,L.rx+14*L.s,L.gy-2*L.s,L.s,7);p.hit(false,{pen:0,review:this.shown(st.q),tip:'시간 끝! 정답: '+this.shown(st.q),tipMs:2200});},
  update(p,dt){const st=p.state,P=st.P;st.T+=dt;const now=st.T*1000;const L=this.setG(p);const s=L.s,rx=L.rx,hitX=rx+15*s,startX=CW+10,run=CW*.3;let speed=run;P.pose='run';P.jumpY=0;P.fallP=0;
    if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
    switch(P.phase){
      case 'idle':speed=0;P.pose='idle';break;
      case 'question':{const f=(now-P.phaseStart)/1000/st.qTime;P.hurdleX=startX+(hitX-startX)*Math.min(1,f);if(f>=1)this.timeout(p,now);break;}
      case 'jump':{const f=Math.min(1,(now-P.phaseStart)/T_JUMP),c0=P.hurdle0+HW/2*s,c=rx+(c0-rx)*(1-2*f);P.hurdleX=c-HW/2*s;P.jumpY=Math.sin(Math.PI*f)*JUMP*s;P.pose='jump';if(f>=1){puff(P,rx,L.gy-1*s,s,3);this.next(p);}break;}
      case 'trip':{const f=Math.min(1,(now-P.phaseStart)/T_TRIP);P.hurdleX=P.hurdle0+(hitX-P.hurdle0)*f;if(f>=1){P.phase='fall';P.phaseStart=now;puff(P,rx+14*s,L.gy-2*s,s,7);}break;}
      case 'fall':{const f=(now-P.phaseStart)/T_FALL;P.fallP=Math.min(1,f);P.pose='fall';speed=f>.82?run*(f-.82)/.18:0;P.hurdleX-=speed*dt;if(f>=1)this.next(p);break;}}
    P.bg+=speed*dt;if(speed>0)P.runT+=dt*speed/run;if(P.pose==='run'){P.stepAcc+=dt*speed/run;if(P.stepAcc>.23){P.stepAcc=0;puff(P,rx-6*s,L.gy-1*s,s*.7,1);}}
    P.parts.forEach(q=>{q.age+=dt;q.x+=(q.vx-(q.type==='dust'?speed:speed*.3))*dt;q.y+=q.vy*dt;if(q.type==='spark')q.vy+=240*s*dt;if(q.gr)q.r+=q.gr*dt;});P.parts=P.parts.filter(q=>q.age<q.life);},
  down(p,x,y){const st=p.state;if(!p.active)return;const G0=this.geo(p);const k=MK.hit(G0.keys,x,y);if(k){st.press={k,t:.12};p.Snd.tap&&p.Snd.tap();this.press(p,k);}},
  draw(p,g){const st=p.state,P=st.P;const G0=this.geo(p),W=G0.W,H=G0.H,u=G0.u;const now=st.T*1000;K.vgrad(g,0,0,W,H,['#fff6d6','#ffe9b0']);
    const L=this.setG(p);ctx=g;
    /* 트랙 */
    g.save();g.translate(0,G0.lane.y);g.beginPath();g.rect(0,0,W,G0.lane.h);g.clip();
    drawSky(P.bg,now);const s=L.s;g.fillStyle='#E0633F';g.fillRect(0,L.top,CW,L.h);g.fillStyle='#fff';g.fillRect(0,L.top,CW,Math.max(2,s*1.6));
    g.fillStyle='rgba(255,255,255,.16)';const gp=Math.max(50,90*s);for(let x=-(P.bg%gp);x<CW;x+=gp)g.fillRect(x,L.gy+3*s,20*s,2.5*s);
    if(P.phase!=='idle')drawHurdle(g,P.hurdleX,L.gy,s,P.pose==='fall'?Math.min(1,P.fallP/.15)*1.4:0);
    g.fillStyle='rgba(0,0,0,.2)';el(g,L.rx+3*s,L.gy,Math.max(4,15*s*(1-P.jumpY/(90*s))),3*s);g.fill();
    g.save();g.translate(L.rx,L.gy-P.jumpY);drawCritter(g,P.kind,s,{pose:P.pose,runT:P.runT,fallP:P.fallP,face:faceOf(P,now),now},P.color);g.restore();
    P.parts.forEach(q=>{g.globalAlpha=Math.max(0,1-q.age/q.life);if(q.type==='dust'){g.fillStyle='rgba(255,238,220,.8)';g.beginPath();g.arc(q.x,q.y,q.r,0,7);g.fill();}else star(g,q.x,q.y,q.r,q.col,q.rot+q.age*6);g.globalAlpha=1;});
    P.popups=P.popups.filter(o=>now-o.t0<1000);P.popups.forEach(o=>{const a=(now-o.t0)/1000,fsz=Math.min(38,15*s+8);g.globalAlpha=1-a*a;g.textAlign='left';g.font=K.font(fsz);const y=L.top+L.h*.45+o.row*(fsz+2)-a*10*s,px=L.rx+26*s;g.lineWidth=5;g.strokeStyle='#fff';g.lineJoin='round';g.strokeText(o.t,px,y);g.fillStyle=o.c;g.fillText(o.t,px,y);g.globalAlpha=1;});
    g.restore();
    /* 식 판 */
    const b=G0.board,q=st.q;K.card(g,b.x,b.y,b.w,b.h,u*.3,'#fff',{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:INK});
    if(q&&P.phase==='question'){const f=clamp(1-(now-P.phaseStart)/1000/st.qTime,0,1);const bw=b.w-u*.9,bh=Math.max(5,u*.18);K.rr(g,b.x+u*.45,b.y+u*.28,bw,bh,bh/2);g.fillStyle='#e6edf7';g.fill();K.rr(g,b.x+u*.45,b.y+u*.28,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f<.3?'#ef4444':f<.6?'#f59e0b':'#22c55e';g.fill();}
    if(q){MK.expr(g,q.expr,st.typed,b.x+b.w/2,b.y+b.h*.55,b.w-u*.8,b.h*.5,Math.min(u*1.9,b.h*.5),INK,{box:'#fff7d6',boxBd:'#f59e0b',boxInk:'#c2410c',ph:'#f59e0b'});}
    if(st.msg&&now<st.msg.until){K.txt(g,st.msg.t,b.x+b.w/2,b.y+b.h-Math.min(u*.5,b.h*.14),{size:Math.min(u*.55,b.h*.17),color:st.msg.ok?'#15803d':'#dc2626',maxW:b.w*.9});}
    MK.draw(g,u,G0.keys,{face:'#fff',ink:INK,bd:INK,delFace:'#ffe4e6',okFace:'#22c55e',okInk:'#fff',sh:'#1e2a4a'},st.press,st.typed!=='');
  },
};
Engine.boot(GAME);
