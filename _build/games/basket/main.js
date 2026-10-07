/* 5학년 2학기 수학 · 수의 범위와 어림하기 — 반올림 농구
   디자인: 관중이 환호하는 실내 농구장. 공에 적힌 수를 올림·버림·반올림하거나 범위(이상·이하·초과·미만)를 판단해서 알맞은 골대로 슛! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1c2a5e',ORG='#ea580c';
const LOGO=gkLogo('#ffedd5','#1c2a5e','🏀');
const LV={
  up:{t:'올림',d:'구하려는 자리 아래를 올려요',m:'up'},
  down:{t:'버림',d:'구하려는 자리 아래를 버려요',m:'down'},
  round:{t:'반올림',d:'0~4는 버리고 5~9는 올려요',m:'round'},
  dec:{t:'소수 어림하기',d:'소수 첫째·둘째 자리까지',m:'dec'},
  range:{t:'수의 범위',d:'이상·이하·초과·미만 골대 찾기',m:'range'},
  mix:{t:'섞어서 도전',d:'올림·버림·반올림·범위가 섞여요',m:'mix'},
};
const MN={up:'올림',down:'버림',round:'반올림'};
const crowdCol=['#fca5a5','#fde68a','#a7f3d0','#bfdbfe','#ddd6fe','#fbcfe8'];
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#1c2a5e','#324a9a']);
  for(let i=0;i<26;i++){const x=(i+.5)/26*W,y=H*.2+((i*7)%5)*u*.18;g.fillStyle=crowdCol[i%6];g.beginPath();g.arc(x,y+Math.abs(Math.sin(T*3+i))*-u*.1,u*.2,0,TAU);g.fill();}
  g.fillStyle='#e9b86f';g.fillRect(0,H*.78,W,H*.22);g.fillStyle='rgba(120,70,20,.2)';for(let x=0;x<W;x+=u*.9)g.fillRect(x,H*.78,2,H*.22);
  const cx=W*.5,by=H*.14,bw=u*2.4;g.fillStyle='#fff';K.rr(g,cx-bw/2,by,bw,bw*.62,u*.12);g.fill();g.lineWidth=u*.07;g.strokeStyle='#e5e7eb';g.stroke();g.strokeStyle='#ef4444';g.lineWidth=u*.07;g.strokeRect(cx-bw*.2,by+bw*.25,bw*.4,bw*.3);
  const ry=by+bw*.62+u*.06;g.strokeStyle=ORG;g.lineWidth=u*.12;g.beginPath();g.ellipse(cx,ry,bw*.22,bw*.07,0,0,TAU);g.stroke();
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(cx+i*bw*.06,ry);g.lineTo(cx+i*bw*.035,ry+u*.9);g.stroke();}
  const ph=(T%2.4)/2.4;const bx=W*.2+ph*(cx-W*.2),byy=H*.7-Math.sin(ph*Math.PI)*H*.5+(ph>.85?(ph-.85)*H*1.2:0);
  K.glow&&K.glow(g,bx,byy,u,'#ffb36b',.4);g.fillStyle=ORG;g.beginPath();g.arc(bx,byy,u*.5,0,TAU);g.fill();g.strokeStyle='#7c2d12';g.lineWidth=3;g.stroke();g.beginPath();g.moveTo(bx-u*.5,byy);g.lineTo(bx+u*.5,byy);g.moveTo(bx,byy-u*.5);g.lineTo(bx,byy+u*.5);g.stroke();}
const GAME={
  id:'basket',title:'반올림 농구',title1:'실내 농구장 어림 슛',title2:'반올림 농구',emoji:LOGO,
  subtitle:'5학년 2학기 · 수의 범위와 어림하기',
  howto:'공에 적힌 수를 문제대로 <b>올림 · 버림 · 반올림</b>하면 어느 골대에 넣어야 할까요? 공을 골대 쪽으로 <b>휙~ 밀어 던지면</b> 슛! (골대를 눌러도 돼요)<br>🌟 <b>황금 공</b>은 점수가 2배! 빨리 넣을수록 점수가 커요. <b>수의 범위</b>는 알맞은 범위 골대를 찾아요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:ORG,c2:'#1d4ed8'},hero:gkHero(hero),vignette:.03,durs:[60,90,150],levelTitle:'어떤 슛 연습을 할까요?',
  txt:{who:'누가 슈터일까요?',dur:'경기 시간',pace:'슛 시간',seat:'번 선수 ',go:'경기 시작!',s1:'1. 연습',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>올림</b>: 구하려는 자리 아래 수를 모두 올려서 나타내요. 4,521 → 백의 자리까지 올림 = 4,600</li>
    <li><b>버림</b>: 구하려는 자리 아래 수를 모두 버려요. 4,579 → 백의 자리까지 버림 = 4,500</li>
    <li><b>반올림</b>: 구하려는 자리 바로 아래 숫자가 0~4면 버리고, 5~9면 올려요. 4,550 → 백의 자리까지 반올림 = 4,600</li>
    <li><b>이상·이하</b>는 경계의 수를 <b>포함</b>하고, <b>초과·미만</b>은 경계의 수를 <b>포함하지 않아요</b>.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2;const r=Math.max(18,Math.min(W*.085,(H-top)*.085,u*1.9));const hy=top+u*.9;const bwd=Math.min(W/3-u*.4,u*7.5),bh=bwd*.58;
    const hoops=[0,1,2].map(i=>{const cx=W*(i+.5)/3;return{cx,x:cx-bwd/2,y:hy,w:bwd,h:bh+bwd*.62,bx:cx-bwd/2,by:hy,bw:bwd,bh,rimY:hy+bh+bwd*.05,rimRx:bwd*.2};});
    return{W,H,u,top,r,hoops,bx:W/2,by:H-r*1.5-(p.bot||0)};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,drag:null,fly:null,aim:-1});this.newQ(p);},
  make(p,L){const R=p.R;let m=LV[L].m;if(m==='mix')m=R.pick(['up','down','round','round','dec','range']);let q;
    if(m==='range'){const a=R.int(2,9)*10,b=a+R.pick([10,20,30]);const v=R.int(0,1);
      const lab=v===0?[a+' 이하',a+' 초과\n'+b+' 이하',b+' 초과']:[a+' 미만',a+' 이상\n'+b+' 미만',b+' 이상'];
      let n;if(R.chance(.4))n=R.pick([a,b]);else n=R.int(a-9,b+9);
      const reg=v===0?(n<=a?0:n<=b?1:2):(n<a?0:n<b?1:2);
      const ord=R.shuffle([0,1,2]);q={ty:'range',n,show:String(n),inst:'이 수가 들어갈 <b>범위</b>의 골대로!',labels:ord.map(i=>lab[i]),okIdx:ord.indexOf(reg),
        reveal:n+'은(는) '+lab[reg].replace('\n',' ')+(n===a||n===b?' (경계의 수 '+n+(v===0?(n===a?'은 이하에 포함':'은 이하에 포함'):'은 이상에 포함')+')':''),review:'수의 범위: '+n+' → '+lab[reg].replace('\n',' ')};}
    else{const f=(x,pl)=>m==='up'?Math.ceil(x/pl)*pl:m==='down'?Math.floor(x/pl)*pl:Math.floor(x/pl+.5)*pl;let n,ans,pn,fmt,cand,show;
      if(m!=='dec'){const pl=R.pick([10,100,100,1000]);pn={10:'십',100:'백',1000:'천'}[pl];const gen=()=>pl===10?R.int(101,999):pl===100?R.int(1001,9999):R.int(10001,99999);n=gen();while(n%pl===0)n=gen();
        if(m==='round'&&R.chance(.35)){const d=pl/10;n=n-(Math.floor(n/d)%10)*d+5*d;}
        ans=f(n,pl);const op=pl===1000?100:pl*10;cand=[Math.floor(n/pl)*pl,Math.ceil(n/pl)*pl,Math.floor(n/op+.5)*op,ans+pl,ans-pl,pl>10?Math.floor(n/(pl/10)+.5)*(pl/10):ans+2*pl];fmt=gkComma;show=gkComma(n);pn+='의 자리까지';}
      else{const dp=R.pick([1,1,2]),sc=dp===1?100:1000;pn=dp===1?'소수 첫째 자리까지':'소수 둘째 자리까지';const unit=sc/(dp===1?10:100);let k;do{k=R.int(sc+1,sc*10-1);}while(k%unit===0);n=k;
        const ff=x=>m==='up'?Math.ceil(x/unit)*unit:m==='down'?Math.floor(x/unit)*unit:Math.floor(x/unit+.5)*unit;ans=ff(k);fmt=x=>String(+(x/sc).toFixed(3));show=fmt(k);
        cand=[Math.floor(k/unit)*unit,Math.ceil(k/unit)*unit,Math.floor(k/(unit*10)+.5)*unit*10,ans+unit,ans-unit,Math.floor(k/sc+.5)*sc];}
      const uniq=[];cand.forEach(c=>{if(c>0&&c!==ans&&!uniq.includes(c))uniq.push(c);});const opts=[ans,...R.shuffle(uniq).slice(0,2)];while(opts.length<3)opts.push(ans+opts.length*7);const sh=R.shuffle(opts);
      q={ty:'num',n,show,inst:'<b>'+pn+'</b> <b>'+MN[m]+'</b>하면 어느 골대?',labels:sh.map(fmt),okIdx:sh.indexOf(ans),reveal:show+' → '+pn+' '+MN[m]+' = '+fmt(ans),review:show+'을(를) '+pn+' '+MN[m]+' → '+fmt(ans)};}
    q.gold=R.chance(.14);q.text=q.inst;return q;},
  qtime(q){return q.ty==='range'?9:8;},
  askHtml(q){return (q.gold?'🌟 황금 공! ':'🏀 ')+q.inst;},askSub(q){return q.gold?'점수 2배! 공을 휙~ 밀어 던져요':'공을 골대 쪽으로 휙~ 밀어 던져요 (골대를 눌러도 돼요)';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return '골인! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((45+50*frac)*(q.gold?2:1));},
  onNew(p,q){const st=p.state;st.fly=null;st.drag=null;st.aim=-1;st.enter=0;},
  onVerdict(p,q,ok,i,to){const st=p.state;if(to)st.fly={i:-1,t:0};},
  throwTo(p,i){const st=p.state;if(st.lock||!st.q)return;this.verdict(p,i,false);st.fly={i,t:0,ok:st.res==='ok'};st.drag=null;st.aim=-1;p.Snd.tap&&p.Snd.tap();},
  down(p,x,y){const st=p.state;if(st.lock||!st.q)return;const G=this.geo(p);const bp=this.ballPos(p,G);
    if(Math.hypot(x-bp.x,y-bp.y)<G.r*1.9){st.drag={x0:x,y0:y,x:x,y:y};return;}
    const i=gkHit(G.hoops,x,y);if(i>=0)this.throwTo(p,i);},
  move(p,x,y,down){const st=p.state;if(!st.drag)return;st.drag.x=x;st.drag.y=y;const G=this.geo(p);st.aim=this.aimOf(p,G);},
  up(p,x,y){const st=p.state,d=st.drag;if(!d)return;st.drag=null;st.aim=-1;if(st.lock)return;const G=this.geo(p);const dy=y-d.y0;if(dy>-G.r*.5)return;this.throwTo(p,this.aimOf(p,{...G},x,y,d));},
  aimOf(p,G,x,y,d){const st=p.state;d=d||st.drag;if(!d)return -1;x=x==null?d.x:x;y=y==null?d.y:y;const dx=x-d.x0,dy=y-d.y0;if(dy>-G.r*.3)return -1;const ty=G.hoops[0].rimY;const px=G.bx+dx*(ty-G.by)/dy;let b=0,bd=1e9;G.hoops.forEach((h,i)=>{const dd=Math.abs(h.cx-px);if(dd<bd){bd=dd;b=i;}});return b;},
  ballPos(p,G){const st=p.state;let x=G.bx,y=G.by;if(st.drag){x+=(st.drag.x-st.drag.x0)*.35;y+=Math.min(0,st.drag.y-st.drag.y0)*.35;}return{x,y};},
  upd(p,dt){const st=p.state;st.enter=Math.min(1,(st.enter||0)+dt*3);if(st.fly)st.fly.t+=dt;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const h=G.hoops[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+h.cx,y:rc.top+h.y+h.h*.4};},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;const top=G.top;
    K.vgrad(g,0,0,W,H,['#1c2a5e','#2f4590']);
    /* 관중 */
    for(let r=0;r<3;r++)for(let i=0;i<30;i++){const x=(i+.5+(r%2)*.5)/30*W,y=top+u*(5.9+r*.55);const ok=st.res==='ok';const bob=ok?Math.abs(Math.sin(st.T*6+i+r))*u*.25:Math.sin(st.T*2+i)*u*.03;g.fillStyle=crowdCol[(i+r*2)%6];g.beginPath();g.arc(x,y-bob,u*.24,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.arc(x-u*.07,y-bob-u*.05,u*.07,0,TAU);g.fill();}
    /* 바닥 */
    const fy=top+H*.58;K.vgrad(g,0,fy,W,H-fy,['#e9b86f','#c98f45']);g.fillStyle='rgba(120,70,20,.16)';for(let x=0;x<W;x+=u*1.1)g.fillRect(x,fy,2,H-fy);
    g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=Math.max(3,u*.08);g.beginPath();g.ellipse(W/2,H+u*3,W*.46,H*.5,0,Math.PI,TAU);g.stroke();g.beginPath();g.moveTo(0,fy);g.lineTo(W,fy);g.stroke();
    /* 골대 */
    G.hoops.forEach((h,i)=>{const hi=st.aim===i,done=st.lock&&st.fly&&st.fly.i===i;const good=st.lock&&i===q.okIdx;
      g.save();if(hi){K.glow&&K.glow(g,h.cx,h.by+h.bh/2,h.bw*.8,'#ffe066',.5);}
      g.fillStyle='rgba(15,23,42,.35)';g.fillRect(h.cx-u*.08,h.by+h.bh,u*.16,H*.1);
      K.rr(g,h.bx,h.by,h.bw,h.bh,u*.14);g.fillStyle=good&&st.lock?(st.res==='ok'?'#bbf7d0':'#fef08a'):'#f8fafc';g.fill();g.lineWidth=Math.max(3,u*.1);g.strokeStyle=hi?'#facc15':'#e2e8f0';g.stroke();
      g.strokeStyle='#ef4444';g.lineWidth=Math.max(2,u*.06);g.strokeRect(h.cx-h.bw*.18,h.by+h.bh*.62,h.bw*.36,h.bh*.32);
      const lb=q.labels[i].split('\n');const fs=Math.min(h.bh*.34,u*(lb.length>1?.82:1.25));lb.forEach((s,j)=>K.txt(g,s,h.cx,h.by+h.bh*(lb.length>1?(.2+j*.28):.3),{size:fs,color:INK,maxW:h.bw*.92}));
      /* 림과 그물 */
      const rx=h.rimRx,ry=h.rimY;g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=Math.max(1.5,u*.04);const sw=done&&st.fly.t>.6&&st.res==='ok'?Math.sin(st.fly.t*30)*u*.08*Math.max(0,1.2-st.fly.t):0;
      for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(h.cx+k*rx/3,ry);g.lineTo(h.cx+k*rx/4.2+sw,ry+u*1.1);g.stroke();}
      g.beginPath();g.moveTo(h.cx-rx,ry);g.lineTo(h.cx-rx*.75+sw,ry+u*1.1);g.lineTo(h.cx+rx*.75+sw,ry+u*1.1);g.lineTo(h.cx+rx,ry);g.stroke();
      g.strokeStyle=ORG;g.lineWidth=Math.max(4,u*.14);g.beginPath();g.ellipse(h.cx,ry,rx,rx*.26,0,0,TAU);g.stroke();g.restore();});
    /* 시간 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,top+u*.02,bw,Math.max(5,u*.18),st.qt/st.qmax,{good:'#22c55e'});}
    /* 공 */
    const gold=q.gold;const drawBall=(x,y,r,rot,a)=>{g.save();g.globalAlpha=a==null?1:a;g.translate(x,y);if(gold)K.glow&&K.glow(g,0,0,r*2.2,'#fde047',.6);g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(0,r*1.05,r*.9,r*.22,0,0,TAU);g.fill();
      g.rotate(rot);const gr=g.createRadialGradient(-r*.3,-r*.3,r*.1,0,0,r);gr.addColorStop(0,gold?'#fff3a8':'#ff9a55');gr.addColorStop(1,gold?'#eab308':'#c2410c');g.fillStyle=gr;g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.strokeStyle='#5b2108';g.lineWidth=Math.max(2,r*.07);g.stroke();
      g.beginPath();g.moveTo(-r,0);g.lineTo(r,0);g.moveTo(0,-r);g.lineTo(0,r);g.stroke();g.beginPath();g.arc(-r*1.15,0,r*.8,-.9,.9);g.stroke();g.beginPath();g.arc(r*1.15,0,r*.8,Math.PI-.9,Math.PI+.9);g.stroke();g.restore();};
    const bp=this.ballPos(p,G),r=G.r;
    if(st.aim>=0&&st.drag){const h=G.hoops[st.aim];g.setLineDash([u*.2,u*.2]);g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=Math.max(2,u*.07);g.beginPath();g.moveTo(bp.x,bp.y);g.lineTo(h.cx,h.rimY);g.stroke();g.setLineDash([]);}
    const f=st.fly;
    if(!f||f.i===-2){const sc=.3+.7*Math.min(1,st.enter||0);drawBall(bp.x,bp.y,r*sc*(1+Math.sin(st.T*3)*.02),0);const rr=r*sc;K.rr(g,bp.x-rr*.95,bp.y-rr*.42,rr*1.9,rr*.84,rr*.2);g.fillStyle='rgba(255,255,255,.95)';g.fill();K.txt(g,q.show,bp.x,bp.y,{size:rr*(q.show.length>6?.55:.7),color:INK,maxW:rr*1.75});
      if(!st.lock&&!st.drag&&st.T%1.6<.9){K.txt(g,'👆 휙~',bp.x,bp.y-r*1.7,{size:u*.55,color:'#fff',stroke:INK,lw:u*.12,maxW:u*5});}}
    else if(f.i===-1){const t=Math.min(1,f.t/.6);drawBall(bp.x+t*W*.6,bp.y,r,t*8,1-t);K.txt(g,'⏰ 시간 끝!',W/2,G.hoops[0].rimY+u*3.3,{size:u*1,color:'#fff',stroke:INK,lw:u*.2,maxW:W*.8});}
    else{const h=G.hoops[f.i],T0=.62,t=Math.min(1,f.t/T0);const sx=G.bx,sy=G.by,ex=h.cx,ey=h.rimY;const hgt=Math.max(u*2,(sy-ey)*.3);
      if(f.t<T0){const x=sx+(ex-sx)*t,y=sy+(ey-sy)*t-4*hgt*t*(1-t);const sc=1-.5*t;drawBall(x,y,r*sc,t*10);K.rr(g,x-r*sc*.9,y-r*sc*.4,r*sc*1.8,r*sc*.8,r*sc*.2);g.fillStyle='rgba(255,255,255,.95)';g.fill();K.txt(g,q.show,x,y,{size:r*sc*(q.show.length>6?.55:.7),color:INK,maxW:r*sc*1.7});}
      else if(f.ok){const k=Math.min(1,(f.t-T0)/.45);drawBall(ex,ey+k*u*1.3,r*.5*(1-.2*k),10+k*4,1-k*k);K.txt(g,'골인! 🎉',ex,h.by+h.h+u*1.6,{size:u*.9,color:'#fff',stroke:INK,lw:u*.2,maxW:W*.4});}
      else{const k=Math.min(1,(f.t-T0)/.7);const dir=ex<W/2?1:-1;drawBall(ex+dir*k*u*2.4,ey-Math.sin(k*Math.PI)*u*1.2+k*k*u*4.5,r*.5,10+k*9,1-k*.4);K.txt(g,'앗, 빗나갔어요',ex,h.by+h.h+u*1.6,{size:u*.8,color:'#fecaca',stroke:INK,lw:u*.2,maxW:W*.4});}}
    K.card(g,u*.3,H-u*1.3,u*3.2,u*.8,u*.2,'rgba(255,248,236,.95)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🏀 '+(st.okN||0)+'골',u*.3+u*1.6,H-u*.9,{size:u*.5,color:INK,maxW:u*2.9});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1500,badMs:2600,pen:15});
Engine.boot(GAME);
