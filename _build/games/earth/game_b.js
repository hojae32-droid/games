
/* ═════════ 자전 미션: 지구 돌리기(때 맞추기 · 하늘 보고 맞추기) ═════════ */
function spinGeo(p){const A=areaOf(p),u=p.u;const land=A.w>A.h*1.05;
  const R=land?Math.min(A.h*.36,A.w*.2):Math.min(A.w*.28,A.h*.22);
  const cx=land?A.w*.36:A.w*.5,cy=land?A.h*.52:A.h*.35;
  const box=land?{x:A.w*.62,y:A.h*.1,w:A.w*.35,h:A.h*.8}:{x:A.w*.08,y:A.h*.64,w:A.w*.84,h:A.h*.33};
  return{A,u,land,R,cx,cy,box};}
function drawSunSide(p,g,G,T){const{cx,cy,R,u}=G;
  K.glow(g,-u*.5,cy,u*7.5,'#ff9a3d',.5);K.glow(g,-u*.5,cy,u*3.4,'#ffe08a',.95);g.fillStyle='#fff1b8';g.beginPath();g.arc(-u*.5,cy,u*1.3,0,TAU);g.fill();
  g.save();g.strokeStyle='rgba(255,224,130,.55)';g.fillStyle='rgba(255,224,130,.7)';g.lineWidth=Math.max(1.5,u*.07);g.lineCap='round';
  for(let k=-2;k<=2;k++){const y=cy+k*R*.42,x0=u*1.4+((T*u*1.5)%(u*.9))*0,x1=cx-Math.sqrt(Math.max(0,R*R-(k*R*.42)**2))-R*.22;if(x1<x0+u)continue;
    g.setLineDash([u*.4,u*.3]);g.lineDashOffset=-T*u*2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();g.setLineDash([]);
    g.beginPath();g.moveTo(x1+u*.28,y);g.lineTo(x1,y-u*.16);g.lineTo(x1,y+u*.16);g.fill();}g.restore();
  K.box(g,G.u*.4,G.u*.35,u*2.2,u*.7,u*.35,'rgba(255,214,102,.95)');K.txt(g,'햇빛',u*1.5,u*.7,{size:u*.38,color:'#5b3b00'});}
function spinArrow(g,G,T){const{cx,cy,R,u}=G;const ar=R+u*.7,a0=-.2,a1=-1.4;g.save();g.strokeStyle='#8ff0e0';g.lineWidth=u*.13;g.lineCap='round';g.shadowColor='#2dd4bf';g.shadowBlur=u*.4;g.beginPath();g.arc(cx,cy,ar,a0,a1,true);g.stroke();
  const ax=cx+Math.cos(a1)*ar,ay=cy+Math.sin(a1)*ar,tg=a1-PI/2;g.fillStyle='#8ff0e0';g.beginPath();g.moveTo(ax+Math.cos(tg)*u*.36,ay+Math.sin(tg)*u*.36);g.lineTo(ax+Math.cos(tg+2.4)*u*.3,ay+Math.sin(tg+2.4)*u*.3);g.lineTo(ax+Math.cos(tg-2.4)*u*.3,ay+Math.sin(tg-2.4)*u*.3);g.fill();g.restore();
  K.txt(g,'자전 방향',cx+Math.cos(-.85)*(ar+u*.85),cy+Math.sin(-.85)*(ar+u*.85),{size:u*.34,color:'#a8f5ea',stroke:'rgba(4,3,16,.8)',lw:3});}
function dayNightTags(g,G){const{cx,cy,R,u}=G;const s=u*.34;
  K.box(g,cx-R*.62-u*.8,cy+R+u*.3,u*1.6,u*.62,u*.31,'#fff2c4');K.txt(g,'낮',cx-R*.62,cy+R+u*.6,{size:s,color:'#7a4a00'});
  K.box(g,cx+R*.62-u*.8,cy+R+u*.3,u*1.6,u*.62,u*.31,'#1e1a5c');K.txt(g,'밤',cx+R*.62,cy+R+u*.6,{size:s,color:'#d6d0ff'});}

const MS={};
MS.time={
  init(p){const st=p.state,R=p.R;const tg=p.deck(TIMES,'tm');st.tg=tg;st.sky=false;let r=R.num(0,TAU);while(Math.abs(angd(r,thetaOf(tg.t)))<1)r=R.num(0,TAU);st.rot=r;st.lastA=null;st.wrongDir=0;st.moved=0;st.res=null;st.idle=0;
    p.ask(`🌓 우리나라 <b>📍</b>가 <b>${tg.n}</b>${J(tg.n,'이').slice(tg.n.length)} 되게 지구를 돌려요!`,'북극 위에서 본 지구예요 · 시계 반대 방향으로 돌아요');p.tools([],()=>{});},
  down(p,x,y){const st=p.state;if(st.lock)return;const G=spinGeo(p);st.lastA=Math.atan2(y-G.cy,x-G.cx);st.moved=0;},
  move(p,x,y,down){const st=p.state;if(!down||st.lock||st.lastA==null)return;const G=spinGeo(p);const a=Math.atan2(y-G.cy,x-G.cx);const d=angd(a,st.lastA);st.lastA=a;
    if(d>0){st.wrongDir+=d;if(st.wrongDir>.7){st.wrongDir=0;p.tip('지구는 북극 위에서 보면 <b>시계 반대 방향</b>(서쪽 → 동쪽)으로 자전해요!','bad',2000);p.Snd.bad();const rv='지구의 자전: 북극 위에서 보면 시계 반대 방향 (서쪽 → 동쪽)';if(!p.wrong.includes(rv)&&p.wrong.length<40)p.wrong.push(rv);}return;}
    st.rot+=d;st.moved+=-d;st.idle=0;if(Math.floor(st.moved*4)!==st._mk){st._mk=Math.floor(st.moved*4);p.Snd.tone(300+Math.random()*60,.025,'sine',.025);}},
  up(p){const st=p.state;if(st.lock||st.moved<.2)return;const tg=st.tg;const th=thetaOf(tg.t);
    if(nearA(st.rot,th,.32)){st.lock=true;st.rot=th;st.res=tg.n+'!';goodHit(p,150,p.W/2,p.H*.16,`<b>${tg.n}</b>: ${tg.note}`);p.Snd.win();nextRound(p,1300);}
    else{st.miss=(st.miss||0)+1;p.tip(`아직이에요! 📍가 태양 쪽(왼쪽)으로 오면 낮, 반대쪽(오른쪽)이면 밤이에요`,'bad',1800);}},
  draw(p,g,A,dt){const st=p.state,G=spinGeo(p),{cx,cy,R,u}=G,T=st.T;const a=intro(p);
    g.save();g.globalAlpha=a;
    drawSunSide(p,g,G,T);
    globe(g,cx,cy,R,st.rot,0);
    K.txt(g,'북극',cx,cy+R*.26,{size:u*.28,color:'#06223f'});
    /* 나 */
    const mx=cx+Math.cos(st.rot)*R*.8,my=cy+Math.sin(st.rot)*R*.8;pin(g,mx,my,u*.75,'#ff4d6d','우리나라');
    spinArrow(g,G,T);dayNightTags(g,G);
    if(st.res)K.card(g,cx-u*2.2,cy-R-u*1.5,u*4.4,u*.9,u*.45,'#ffe9a8',{hi:false}),K.txt(g,st.res,cx,cy-R-u*1.05,{size:u*.5,color:'#5c3a00'});
    /* 우리나라에서 본 하늘 */
    const b=G.box,t=hourOf(st.rot);
    skyView(g,b.x,b.y,b.w,b.h,t,T);K.txt(g,'우리나라에서 본 하늘 (남쪽)',b.x+b.w/2,b.y-u*.32,{size:clamp(u*.3,10,15),color:'#cfc6ff',maxW:b.w});
    /* 오래 걸리면 도움말 */
    st.idle+=dt;if(st.idle>14&&!st.lock){const th=thetaOf(st.tg.t);g.save();g.globalAlpha=.4+.3*Math.sin(T*5);g.strokeStyle='#8ff0e0';g.lineWidth=u*.1;g.setLineDash([u*.2,u*.2]);g.beginPath();g.arc(cx,cy,R*.8,th-.3,th+.3);g.stroke();g.restore();}
    g.restore();}
};
MS.sky={
  init(p){const st=p.state,R=p.R;const tg=p.deck(TIMES.filter(t=>t.t!==3&&t.t!==21),'sk');st.tg=tg;st.sky=true;let r=R.num(0,TAU);while(Math.abs(angd(r,thetaOf(tg.t)))<1)r=R.num(0,TAU);st.rot=r;st.lastA=null;st.wrongDir=0;st.moved=0;st.res=null;st.idle=0;
    p.ask('🔭 <b>하늘 그림</b>과 같은 때가 되도록 지구를 돌려요!','우리나라 📍에서 본 하늘이 목표와 같아져야 해요');p.tools([],()=>{});},
  down:MS.time.down,move:MS.time.move,
  up(p){const st=p.state;if(st.lock||st.moved<.2)return;const tg=st.tg;const th=thetaOf(tg.t);
    if(nearA(st.rot,th,.32)){st.lock=true;st.rot=th;st.res=tg.n+'!';goodHit(p,170,p.W/2,p.H*.16,`하늘의 모습은 <b>${tg.n}</b>이에요: ${tg.note}`);p.Snd.win();nextRound(p,1400);}
    else{p.tip('목표 하늘과 <b>해의 위치</b>를 비교해 봐요. 해가 동쪽 → 남쪽 → 서쪽으로 가요','bad',2200);}},
  draw(p,g,A,dt){const st=p.state,G=spinGeo(p),{cx,cy,R,u}=G,T=st.T;const a=intro(p);g.save();g.globalAlpha=a;
    drawSunSide(p,g,G,T);globe(g,cx,cy,R,st.rot,0);K.txt(g,'북극',cx,cy+R*.26,{size:u*.28,color:'#06223f'});
    const mx=cx+Math.cos(st.rot)*R*.8,my=cy+Math.sin(st.rot)*R*.8;pin(g,mx,my,u*.75,'#ff4d6d','우리나라');spinArrow(g,G,T);dayNightTags(g,G);
    const b=G.box;skyView(g,b.x,b.y,b.w,b.h,st.tg.t,T,{edge:st.res?'#8ff0b0':'#ffd27a'});K.txt(g,'🎯 목표 하늘',b.x+b.w/2,b.y-u*.32,{size:clamp(u*.32,10,16),color:'#ffe3a0',maxW:b.w});
    if(st.res)K.card(g,cx-u*2.2,cy-R-u*1.5,u*4.4,u*.9,u*.45,'#ffe9a8',{hi:false}),K.txt(g,st.res,cx,cy-R-u*1.05,{size:u*.5,color:'#5c3a00'});
    st.idle+=dt;if(st.idle>16&&!st.lock){g.save();g.globalAlpha=.4+.3*Math.sin(T*5);g.strokeStyle='#8ff0e0';g.lineWidth=u*.1;g.setLineDash([u*.2,u*.2]);const th=thetaOf(st.tg.t);g.beginPath();g.arc(cx,cy,R*.8,th-.3,th+.3);g.stroke();g.restore();}
    g.restore();}
};

/* ═════════ 별의 일주 운동: 예측하고 시간 흐름으로 확인 ═════════ */
const TRAIL={
  n:{name:'북쪽',opts:['북극성을 중심으로 시계 반대 방향으로 돌아요','북극성을 중심으로 시계 방향으로 돌아요'],ans:0,why:'지구가 자전해서 북쪽 하늘의 별은 <b>북극성을 중심으로 시계 반대 방향</b>으로 도는 것처럼 보여요'},
  e:{name:'동쪽',opts:['위로 떠올라요','아래로 져요'],ans:0,why:'동쪽 하늘에서는 별이 <b>떠올라요</b>. (해도 동쪽에서 떠올라요)'},
  w:{name:'서쪽',opts:['아래로 져요','위로 떠올라요'],ans:0,why:'서쪽 하늘에서는 별이 <b>져요</b>. (해도 서쪽으로 져요)'},
  s:{name:'남쪽',opts:['동쪽에서 서쪽으로 움직여요','서쪽에서 동쪽으로 움직여요'],ans:0,why:'남쪽 하늘에서는 별이 <b>동쪽에서 서쪽으로</b> 움직여요. 지구가 서쪽에서 동쪽으로 자전하기 때문이에요'},
};
MS.trail={
  init(p){const st=p.state,R=p.R;const k=p.deck(['n','e','w','s'],'tr');const d=TRAIL[k];st.dir=k;st.q=d;st.rev=false;st.rt=0;st.lock=false;
    st.stars=[];for(let i=0;i<34;i++)st.stars.push({x:R.num(.04,.96),y:R.num(.04,.8),r:R.num(.8,2.2)});
    const order=R.shuffle([0,1]);st.opts=order.map(i=>d.opts[i]);st.ans=order.indexOf(0);
    p.ask(`🌌 <b>${d.name} 하늘</b>의 별은 시간이 지나면 어떻게 움직일까요?`,'골라서 맞히면 시간이 빨리 흘러가는 모습을 보여 줘요');
    p.tools(st.opts.map(t=>({t})),(i)=>{if(st.lock||st.rev)return;st.lock=true;st.rev=true;st.rt=0;const ok=i===st.ans;
      if(ok)goodHit(p,120,p.W/2,p.H*.16,d.why);else p.hit(false,{x:p.W/2,y:p.H*.16,tip:'정답: <b>'+st.opts[st.ans]+'</b><br>'+d.why,tipMs:3600,review:`${d.name} 하늘의 별은 ${plain(st.opts[st.ans])} (${plain(d.why)})`});
      p.Snd.slide(200,700,.5,.05);nextRound(p,4300);},{toggle:false});},
  pos(st,s,tau,W,H){const k=st.dir;
    if(k==='n'){const px=W*.5,py=H*.4;const dx=s.x*W-px,dy=s.y*H-py;const r=Math.hypot(dx,dy),a0=Math.atan2(dy,dx);const a=a0-.34*tau;return[px+Math.cos(a)*r,py+Math.sin(a)*r,false];}
    let x=s.x,y=s.y;const wr=v=>((v%1)+1)%1;let wrapped=false;
    if(k==='e'){y=s.y-.1*tau;x=s.x+.035*tau;}else if(k==='w'){y=s.y+.1*tau;x=s.x+.035*tau;}else{x=s.x+.09*tau;}
    const nx=wr(x),ny=k==='s'?s.y:wr(y);if(Math.abs(nx-x)>.001||Math.abs(ny-y)>.001)wrapped=true;
    const arch=k==='s'?-.13*Math.sin(Math.PI*nx):0;return[nx*W,(ny*.8+arch+.0)*H*(k==='s'?1:1),wrapped];},
  draw(p,g,A,dt){const st=p.state,u=p.u,T=st.T;if(st.rev)st.rt+=dt;const a=intro(p);const W=A.w*.92,H=A.h*.92,X=A.w*.04,Y=A.h*.04;
    g.save();g.globalAlpha=a;
    /* 하늘 창 */
    g.save();K.rr(g,X,Y,W,H,u*.4);g.clip();const gr=g.createLinearGradient(0,Y,0,Y+H);gr.addColorStop(0,'#02030f');gr.addColorStop(1,'#101a5a');g.fillStyle=gr;g.fillRect(X,Y,W,H);
    g.translate(X,Y);
    const tau=st.rev?Math.min(st.rt*1.5,5.5):0;
    st.stars.forEach((s,i)=>{const cur=this.pos(st,s,tau,W,H);
      if(st.rev){const n=14;let prev=null;for(let k=0;k<=n;k++){const tt=tau-1.9*(1-k/n);if(tt<0){prev=null;continue;}const q=this.pos(st,s,tt,W,H);if(q[2]||(prev&&Math.hypot(q[0]-prev[0],q[1]-prev[1])>W*.2)){prev=null;continue;}
        if(prev){g.strokeStyle=`rgba(200,225,255,${.15+.6*k/n})`;g.lineWidth=Math.max(1,s.r*.8);g.beginPath();g.moveTo(prev[0],prev[1]);g.lineTo(q[0],q[1]);g.stroke();}prev=q;}}
      K.glow(g,cur[0],cur[1],s.r*3.5,'#cfe3ff',.5);g.fillStyle='#fff';g.beginPath();g.arc(cur[0],cur[1],s.r,0,TAU);g.fill();});
    if(st.dir==='n'){const px=W*.5,py=H*.4;K.glow(g,px,py,u*.9,'#ffe08a',.8);g.fillStyle='#fff3b0';g.beginPath();g.arc(px,py,u*.14,0,TAU);g.fill();K.txt(g,'북극성',px+u*.3,py-u*.42,{size:u*.34,color:'#ffe9a0',stroke:'rgba(0,0,0,.6)',lw:3,align:'left'});}
    /* 땅 */
    g.fillStyle='#04060f';g.beginPath();g.moveTo(0,H*.88);for(let i=0;i<=24;i++)g.lineTo(W*i/24,H*.88-Math.abs(Math.sin(i*1.3+2))*H*.035);g.lineTo(W,H);g.lineTo(0,H);g.fill();
    g.restore();
    K.rr(g,X,Y,W,H,u*.4);g.lineWidth=3;g.strokeStyle='rgba(170,150,255,.6)';g.stroke();
    K.box(g,X+u*.4,Y+u*.35,u*3,u*.7,u*.35,'rgba(10,8,40,.85)','rgba(170,150,255,.6)',1.5);K.txt(g,st.q.name+' 하늘',X+u*1.9,Y+u*.7,{size:u*.4,color:'#e8e2ff'});
    if(st.rev){K.txt(g,'⏩ 시간이 빨리 흘러가요',X+W-u*3,Y+u*.7,{size:clamp(u*.36,11,17),color:'#ffe9a0',stroke:'rgba(0,0,0,.6)',lw:3});}
    g.restore();}
};

/* ═════════ 지구 반대편 ═════════ */
MS.opp={
  init(p){const st=p.state,R=p.R;const tg=p.deck(TIMES,'op');st.tg=tg;st.rot=thetaOf(tg.t);st.rev=false;st.rt=0;st.lock=false;
    const opp=TIMES.find(t=>t.t===(tg.t+12)%24);let wrong;const pool=TIMES.filter(t=>t!==opp);wrong=R.chance(.5)?tg:R.pick(pool.filter(t=>t!==tg));
    const order=R.shuffle([opp,wrong]);st.opts=order;st.ans=order.indexOf(opp);st.opp=opp;
    p.ask(`🌏 우리나라가 <b>${tg.n}</b>일 때, 지구 <b>반대편</b>은 언제일까요?`,'지구 반대편은 태양을 보고 있을까요, 등지고 있을까요?');
    p.tools(order.map(t=>({t:t.n})),(i)=>{if(st.lock||st.rev)return;st.lock=true;st.rev=true;st.rt=0;const ok=i===st.ans;
      const why=`지구는 둥글어서 한쪽이 낮이면 반대쪽은 밤이에요. 우리나라가 <b>${tg.n}</b>일 때 반대편은 <b>${opp.n}</b>이에요`;
      if(ok)goodHit(p,120,p.W/2,p.H*.16,why);else p.hit(false,{x:p.W/2,y:p.H*.16,tip:'정답: <b>'+opp.n+'</b><br>'+why,tipMs:3600,review:`우리나라가 ${tg.n}일 때 지구 반대편은 ${opp.n}`});
      p.Snd.slide(300,800,.3,.05);nextRound(p,3600);},{toggle:false});},
  draw(p,g,A,dt){const st=p.state,G=spinGeo(p),{R,u}=G;const T=st.T;if(st.rev)st.rt+=dt;const a=intro(p);const land=G.land;
    const cx=land?A.w*.5:G.cx,cy=land?A.h*.5:A.h*.5,RR=land?Math.min(A.h*.34,A.w*.2):Math.min(A.w*.26,A.h*.22);
    g.save();g.globalAlpha=a;const GG={cx,cy,R:RR,u};
    drawSunSide(p,g,GG,T);globe(g,cx,cy,RR,st.rot,0);K.txt(g,'북극',cx,cy+RR*.26,{size:u*.28,color:'#06223f'});
    const m1=[cx+Math.cos(st.rot)*RR*.8,cy+Math.sin(st.rot)*RR*.8],m2=[cx+Math.cos(st.rot+PI)*RR*.8,cy+Math.sin(st.rot+PI)*RR*.8];
    pin(g,m1[0],m1[1],u*.75,'#ff4d6d','우리나라');pin(g,m2[0],m2[1],u*.75,'#ffb347','지구 반대편');dayNightTags(g,GG);
    g.save();g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=2;g.setLineDash([6,8]);g.beginPath();g.moveTo(m1[0],m1[1]);g.lineTo(m2[0],m2[1]);g.stroke();g.restore();
    if(st.rev){const al=easeOut(st.rt/.5);g.globalAlpha=al;K.box(g,m2[0]-u*2.1,m2[1]+u*.5,u*4.2,u*.7,u*.35,'#ffe9a8');K.txt(g,st.opp.n,m2[0],m2[1]+u*.85,{size:u*.38,color:'#5c3a00',maxW:u*4});
      K.box(g,m1[0]-u*2.1,m1[1]+u*.5,u*4.2,u*.7,u*.35,'#ffd1da');K.txt(g,st.tg.n,m1[0],m1[1]+u*.85,{size:u*.38,color:'#6b0f26',maxW:u*4});g.globalAlpha=a;}
    g.restore();}
};
