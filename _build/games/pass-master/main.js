/* 3~6학년 체육 · 경쟁(영역형) 활동 — 패스 마스터
   디자인: 초록 잔디 위 전술 보드. 공을 가진 친구에서 손가락으로 쭉 끌어, 수비수(빨강) 사이의 빈 길로 우리 편에게 패스해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b2e10',YEL='#ffd600';
const LOGO=gkLogo('#2e7d32','#0b2e10','⚽');
const LV={
  easy:{t:'빈 공간 찾기',d:'멈춘 수비수 사이로 패스',g:'3~4학년'},
  move:{t:'움직이는 수비',d:'움직이는 수비의 틈 찾기',g:'5~6학년'},
  goal:{t:'패스 연결 후 슛',d:'두 번 패스하고 골문으로 슛',g:'5~6학년 도전'},
};
const PR=4.2,DR=4.6,BALL=1.8,LA=150,LC=100;
const dist=(a,b)=>Math.hypot(a.a-b.a,a.c-b.c);
function segDist(p,a,b){const dx=b.a-a.a,dy=b.c-a.c,L=dx*dx+dy*dy;let t=L?((p.a-a.a)*dx+(p.c-a.c)*dy)/L:0;t=clamp(t,0,1);return Math.hypot(p.a-(a.a+dx*t),p.c-(a.c+dy*t));}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#2f8a36','#256f2c']);for(let i=0;i<8;i++){g.fillStyle=i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)';g.fillRect(i*W/8,0,W/8,H);}
  g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=3;g.strokeRect(W*.06,H*.1,W*.88,H*.8);g.beginPath();g.moveTo(W/2,H*.1);g.lineTo(W/2,H*.9);g.stroke();g.beginPath();g.arc(W/2,H/2,H*.16,0,TAU);g.stroke();
  const pts=[[.2,.5],[.45,.28],[.5,.72],[.78,.45]];const ph=(T*.5)%3,seg=Math.floor(ph),k=ph-seg;
  g.strokeStyle='rgba(255,214,0,.8)';g.setLineDash([8,8]);g.beginPath();pts.forEach((q,i)=>i?g.lineTo(W*q[0],H*q[1]):g.moveTo(W*q[0],H*q[1]));g.stroke();g.setLineDash([]);
  [[.35,.4],[.6,.55]].forEach(([x,y])=>{g.fillStyle='#ef4444';g.beginPath();g.arc(W*x,H*y,u*.5,0,TAU);g.fill();K.emo(g,'✋',W*x,H*y,u*.7);});
  pts.forEach((q,i)=>{g.fillStyle='#2563eb';g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.arc(W*q[0],H*q[1],u*.5,0,TAU);g.fill();g.stroke();K.txt(g,String(i+1),W*q[0],H*q[1],{size:u*.55,color:'#fff'});});
  const a=pts[seg%3],b=pts[seg%3+1];K.emo(g,'⚽',W*(a[0]+(b[0]-a[0])*k),H*(a[1]+(b[1]-a[1])*k),u*.6);}
const GAME={
  id:'pass-master',title:'패스 마스터',title1:'전술 보드 축구',title2:'패스 마스터',emoji:LOGO,
  subtitle:'3~6학년 체육 · 경쟁(영역형) 활동 · 패스와 공간 찾기',
  howto:'⚽ 공을 가진 친구(노란 빛)에서 <b>손가락으로 쭉 끌어</b> 패스할 친구 위에서 떼요. 패스 길이 <b>수비수(빨강)</b>에 닿으면 가로채기! 빈 공간을 찾아 정확하게 패스해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#2e7d32',c2:YEL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 경기를 할까요?',
  txt:{who:'누가 선수일까요?',dur:'경기 시간',pace:'수비 속도',seat:'번 선수 ',go:'킥오프!',s1:'1. 경기',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>빈 공간(열린 공간)</b>은 수비수가 없는 곳이에요. 패스는 수비수가 없는 길로 보내야 가로채기를 당하지 않아요.</li>
    <li>공을 받을 친구는 수비수와 <b>떨어진 곳</b>에서 받을 준비를 해요.</li>
    <li>수비가 움직일 때는 <b>틈이 열리는 순간</b>을 기다렸다가 패스해요.</li>
    <li>패스를 이어서 골문까지 가려면 <b>정확한 패스 → 슛</b> 순서로 침착하게!</li></ul>`,
  /* 필드 좌표(a: 공격 방향 0~150, c: 가로 0~100) ↔ 화면 */
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.5,pad=u*.4;const land=W>=H*1.15;const LW=land?LA:LC,LH=land?LC:LA;
    const aw=W-pad*2,ah=H-top-pad;const s=Math.min(aw/LW,ah/LH);const fw=LW*s,fh=LH*s,x0=(W-fw)/2,y0=top+(ah-fh)/2;
    const P=(a,c)=>land?{x:x0+a*s,y:y0+c*s}:{x:x0+c*s,y:y0+(LA-a)*s};
    const Q=(x,y)=>land?{a:(x-x0)/s,c:(y-y0)/s}:{a:LA-(y-y0)/s,c:(x-x0)/s};
    return{W,H,u,land,s,x0,y0,fw,fh,P,Q};},
  init(p){const st=p.state;Object.assign(st,{T:0,mates:[],defs:[],hold:0,phase:'idle',anim:null,drag:null,step:0,need:1,t0:0,msg:'',msgC:'',wait:0,fx:[],plays:0,goals:0,passes:0,flash:0});this.newPlay(p);},
  layout(p){const st=p.state,R=p.R,L=p.levelId;
    for(let tries=0;tries<500;tries++){
      const mates=[],defs=[];const nd=L==='goal'?6:5;
      mates.push({a:14+R.f()*16,c:20+R.f()*60});
      for(let i=1;i<4;i++)mates.push({a:(L==='goal'?60:50)+R.f()*70-(i===1?30:0)+(L==='goal'?-20:0),c:12+R.f()*76});
      for(let i=0;i<nd;i++){const d={a:24+R.f()*86,c:10+R.f()*80,bc:0,amp:L==='easy'?0:6+R.f()*8,sp:.8+R.f()*1.2,ph:R.f()*6};d.bc=d.c;defs.push(d);}
      const all=[...mates,...defs];if(all.some((q,i)=>all.some((o,j)=>j>i&&dist(q,o)<PR+DR+2)))continue;
      const blocked=(x,y)=>defs.some(d=>segDist(d,x,y)<DR+BALL*.6);
      const open=mates.slice(1).filter(m=>!blocked(mates[0],m)).length;
      if(L!=='move'&&(open<1||open>2))continue;
      if(L==='goal'&&!mates.slice(1).some(m=>m.a>100))continue;
      st.mates=mates;st.defs=defs;return;}
    st.mates=[{a:20,c:50},{a:70,c:25},{a:80,c:75},{a:100,c:50}];st.defs=[{a:50,c:50,bc:50,amp:0,sp:1,ph:0}];},
  blocked(st,x,y){return st.defs.some(d=>segDist(d,x,y)<DR+BALL*.6);},
  newPlay(p){const st=p.state;this.layout(p);st.hold=0;st.step=0;st.need=p.levelId==='goal'?2:1;st.phase='play';st.anim=null;st.drag=null;st.t0=st.T;
    st.msg='공을 가진 친구(노란 빛)에서 끌어서 패스해요';st.msgC='';
    p.ask(p.levelId==='goal'?'🥅 패스 2번 연결하고 골문으로 슛!':'⚽ 수비를 피해 우리 편에게 패스!',p.levelId==='goal'?'두 번 패스한 뒤 하얀 골대로 끌어요':'수비수(빨강) 사이 빈 길로 끌어요');},
  update(p,dt){const st=p.state;st.T+=dt;if(st.flash>0)st.flash-=dt;
    if(p.levelId!=='easy')st.defs.forEach(d=>{if(d.amp)d.c=d.bc+Math.sin(st.T*d.sp*p.pace+d.ph)*d.amp;});
    st.fx.forEach(f=>f.t+=dt);st.fx=st.fx.filter(f=>f.t<.7);
    if(st.anim){const A=st.anim;A.t+=dt/A.dur;const k=Math.min(1,A.t);A.pos={a:A.from.a+(A.to.a-A.from.a)*k,c:A.from.c+(A.to.c-A.from.c)*k};
      const hit=st.defs.find(d=>dist(d,A.pos)<DR+BALL*.6);if(hit){this.land(p,A.pos);}else if(k>=1)this.land(p,null);}
    if(st.phase==='wait'){st.wait-=dt;if(st.wait<=0)this.newPlay(p);}},
  kick(p,a,b,ti){const st=p.state;st.phase='kick';p.Snd.noise&&p.Snd.noise(.2,1600,.08);const len=dist(a,b);st.anim={t:0,from:{a:a.a,c:a.c},to:{a:b.a,c:b.c},dur:Math.max(.35,len/90),pos:{a:a.a,c:a.c},ti};},
  burst(st,pos,col){st.fx.push({a:pos.a,c:pos.c,t:0,col});},
  land(p,cut){const st=p.state,A=st.anim;st.anim=null;const G=this.geo(p);
    if(cut){const s=G.P(cut.a,cut.c);this.burst(st,cut,'#ef4444');p.hit(false,{pen:15,x:s.x,y:s.y,tip:'가로채기 당했어요! 수비수가 없는 길을 찾아요',tipMs:1500,review:'수비수가 있는 길로 패스하면 가로채기! → 수비수 사이의 빈 길로 패스해요'});
      st.msg='가로채기 당했어요! 수비수가 없는 길을 찾아요';st.msgC='bad';st.phase='wait';st.wait=1.5;st.lost=cut;return;}
    if(A.ti==='goal'){const s=G.P(A.to.a,A.to.c);this.burst(st,A.to,YEL);const el=st.T-st.t0;st.goals++;p.hit(true,{pts:70+Math.round(30*Math.max(0,1-el/20)),x:s.x,y:s.y,tip:'⚽ 골인! 멋진 패스 플레이예요',tipMs:1400});st.msg='⚽ 골인! 멋진 패스 플레이예요';st.msgC='good';st.phase='wait';st.wait=1.5;st.flash=.8;return;}
    st.hold=A.ti;st.step++;st.passes++;const s=G.P(A.to.a,A.to.c);this.burst(st,A.to,YEL);p.hit(true,{pts:40,x:s.x,y:s.y});
    if(st.step>=st.need&&p.levelId!=='goal'){st.msg='패스 성공! 👏';st.msgC='good';st.phase='wait';st.wait=1.1;return;}
    st.phase='play';if(p.levelId==='goal'){st.msg=st.step>=st.need?'이제 골문(하얀 골대)으로 끌어 슛!':'좋아요! 한 번 더 패스';st.msgC='good';}},
  down(p,x,y){const st=p.state;if(st.phase!=='play')return;const G=this.geo(p);const q=G.Q(x,y);const h=st.mates[st.hold];if(dist(q,h)>PR*2.8){st.msg='공을 가진 친구에서 시작해요';st.msgC='';return;}st.drag={q};},
  move(p,x,y){const st=p.state;if(!st.drag)return;st.drag.q=this.geo(p).Q(x,y);},
  up(p,x,y){const st=p.state;if(!st.drag||st.phase!=='play'){st.drag=null;return;}const G=this.geo(p);const q=G.Q(x,y);st.drag=null;const a=st.mates[st.hold];
    if(p.levelId==='goal'&&st.step>=st.need&&q.a>LA-12&&q.c>36&&q.c<64){this.kick(p,a,{a:LA,c:clamp(q.c,40,60)},'goal');return;}
    const ti=st.mates.findIndex((m,i)=>i!==st.hold&&dist(m,q)<PR*2.4);
    if(ti<0){if(dist(q,a)>PR*2){st.msg='패스할 친구 위에서 손을 떼요';st.msgC='';}return;}
    this.kick(p,a,st.mates[ti],ti);},
  botAct(p){const st=p.state;if(st.phase!=='play')return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const a=st.mates[st.hold];
    const sw=(f,t)=>{const s1=G.P(f.a,f.c),s2=G.P(t.a,t.c);return{k:'swipe',x:rc.left+s1.x,y:rc.top+s1.y,dx:s2.x-s1.x,dy:s2.y-s1.y};};
    if(p.levelId==='goal'&&st.step>=st.need)return sw(a,{a:LA-4,c:50});
    const ti=st.mates.findIndex((m,i)=>i!==st.hold&&!this.blocked(st,a,m)&&(p.levelId!=='goal'||i!==0));if(ti<0)return null;return sw(a,st.mates[ti]);},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,s=G.s,P=G.P;
    K.vgrad(g,0,0,W,H,['#1f6b27','#175a1f']);
    /* 잔디 줄무늬 */
    for(let i=0;i<10;i++){const a=P(i*15,0),b=P((i+1)*15,LC);g.fillStyle=i%2?'#3a9a42':'#359141';g.fillRect(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.abs(b.x-a.x),Math.abs(b.y-a.y));}
    g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=Math.max(2,s*.7);g.lineJoin='round';
    const rc=(a1,c1,a2,c2)=>{const A=P(a1,c1),B=P(a2,c2);g.strokeRect(Math.min(A.x,B.x),Math.min(A.y,B.y),Math.abs(B.x-A.x),Math.abs(B.y-A.y));};
    rc(0,0,LA,LC);const m1=P(75,0),m2=P(75,LC);g.beginPath();g.moveTo(m1.x,m1.y);g.lineTo(m2.x,m2.y);g.stroke();const cc=P(75,50);g.beginPath();g.arc(cc.x,cc.y,12*s,0,TAU);g.stroke();
    rc(LA-18,28,LA,72);rc(LA-7,40,LA,60);rc(0,28,18,72);
    /* 골대 */
    {const A=P(LA,38),B=P(LA+4,62);g.fillStyle='#fff';g.fillRect(Math.min(A.x,B.x),Math.min(A.y,B.y),Math.abs(B.x-A.x)||s*4,Math.abs(B.y-A.y)||s*4);
      const gc=P(LA-3,50);g.fillStyle='rgba(255,255,255,.22)';const A2=P(LA-1,40),B2=P(LA,60);g.fillRect(Math.min(A2.x,B2.x)-s*2,Math.min(A2.y,B2.y),Math.abs(B2.x-A2.x)+s*2,Math.abs(B2.y-A2.y)+s*2);}
    if(p.levelId==='goal'&&st.step>=st.need&&st.phase==='play'){const gp=P(LA-2,50);g.save();g.globalAlpha=.5+.4*Math.sin(st.T*6);K.txt(g,'🥅 GOAL',gp.x-(G.land?s*8:0),gp.y+(G.land?0:s*6),{size:u*.5,color:YEL,stroke:INK,lw:u*.12});g.restore();}
    /* 수비수 */
    st.defs.forEach(d=>{const q=P(d.a,d.c);g.setLineDash([5,5]);g.strokeStyle='rgba(255,120,120,.65)';g.lineWidth=2;g.beginPath();g.arc(q.x,q.y,(DR+BALL*.6)*s,0,TAU);g.stroke();g.setLineDash([]);
      g.fillStyle='#ef4444';g.strokeStyle='#fff';g.lineWidth=Math.max(2,s*.5);g.beginPath();g.arc(q.x,q.y,DR*s,0,TAU);g.fill();g.stroke();K.emo(g,'✋',q.x,q.y,DR*s*1.3);});
    /* 패스 조준선 */
    const hp=st.mates[st.hold];
    if(st.drag){const A=P(hp.a,hp.c),B=P(st.drag.q.a,st.drag.q.c);const bad=this.blocked(st,hp,st.drag.q);g.setLineDash([9,7]);g.strokeStyle=bad?'#ff5252':YEL;g.lineWidth=Math.max(3,s*.8);g.lineCap='round';g.beginPath();g.moveTo(A.x,A.y);g.lineTo(B.x,B.y);g.stroke();g.setLineDash([]);g.fillStyle=bad?'#ff5252':YEL;g.beginPath();g.arc(B.x,B.y,Math.max(5,s*1.5),0,TAU);g.fill();}
    /* 우리 편 */
    st.mates.forEach((m,i)=>{const q=P(m.a,m.c);if(i===st.hold&&st.phase==='play'){g.fillStyle='rgba(255,214,0,.28)';g.beginPath();g.arc(q.x,q.y,PR*s*1.8+Math.sin(st.T*6)*s*.5,0,TAU);g.fill();}
      g.fillStyle=p.color;g.strokeStyle='#fff';g.lineWidth=Math.max(2,s*.5);g.beginPath();g.arc(q.x,q.y,PR*s,0,TAU);g.fill();g.stroke();K.txt(g,String(i+1),q.x,q.y+s*.1,{size:PR*s*1.25,color:'#fff',stroke:INK,lw:s*.35});});
    /* 공 */
    {let bp;if(st.anim){const q=P(st.anim.pos.a,st.anim.pos.c);bp={x:q.x,y:q.y};}else if(st.lost){const q=P(st.lost.a,st.lost.c);bp={x:q.x,y:q.y};}else{const q=P(hp.a,hp.c);bp={x:q.x+PR*s*.8,y:q.y-PR*s*.6};}
      if(st.phase!=='wait'||st.msgC!=='bad')st.lost=null;K.shadow&&K.shadow(g,bp.x,bp.y+BALL*s,BALL*s*1.1,BALL*s*.4,.25);K.emo(g,'⚽',bp.x,bp.y,Math.max(16,BALL*s*2.8));}
    st.fx.forEach(f=>{const q=P(f.a,f.c);const k=f.t/.7;g.strokeStyle=f.col;g.globalAlpha=1-k;g.lineWidth=3;g.beginPath();g.arc(q.x,q.y,s*(2+k*8),0,TAU);g.stroke();g.globalAlpha=1;});
    /* 안내 문구 + 패스 수 */
    if(st.msg)K.txt(g,st.msg,W/2,H-u*.55,{size:u*.55,color:st.msgC==='bad'?'#ffd0d0':st.msgC==='good'?'#eaffc6':'#ffffff',stroke:INK,lw:u*.14,maxW:W*.94});
    if(p.levelId==='goal'){K.card(g,u*.3,(p.top||0)+u*.15,u*3.2,u*.7,u*.2,'rgba(11,46,16,.9)',{stroke:'#fff',lw:2,blur:0,dy:0});K.txt(g,'패스 '+Math.min(st.step,st.need)+'/'+st.need,u*.3+u*1.6,(p.top||0)+u*.5,{size:u*.45,color:'#fff',maxW:u*3});}
    if(st.flash>0){g.fillStyle='rgba(255,214,0,'+(st.flash*.3)+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
