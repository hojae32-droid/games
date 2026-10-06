/* 5학년 · 빛의 성질 — 빛 반사 퍼즐 (거울을 톡톡 돌려 빛을 정답 과녁으로 보내기)
   디자인: 어두운 광학 실험실 + 무지개. 손전등·거울·벽돌·과녁은 직접 그린 그림이고, 빛이 닿으면 무지개가 퍼져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const RAINBOW=['#ff4d6d','#ff9f1c','#ffe14d','#4ade80','#38bdf8','#818cf8','#c084fc'];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="3" y="3" width="42" height="42" rx="10" fill="#14123a" stroke="#a78bfa" stroke-width="3"/><path d="M8 30L24 14l16 10" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 34l8-14 8 14z" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/></svg>';
const LIGHT_Q=[
  ['물속에 있는 다리가 짧아 보이는 까닭은?','빛의 굴절','빛의 반사'],['컵 속 빨대가 꺾여 보이는 까닭은?','빛의 굴절','빛의 직진'],
  ['거울에 내 모습이 비치는 까닭은?','빛의 반사','빛의 굴절'],['물체 뒤에 그림자가 생기는 까닭은?','빛의 직진','빛의 굴절'],
  ['가운데가 가장자리보다 두꺼운 렌즈는?','볼록 렌즈','평면거울'],['햇빛을 한 점으로 모을 수 있는 것은?','볼록 렌즈','평면거울'],
  ['볼록 렌즈를 이용한 기구는?','돋보기','손거울'],['볼록 렌즈를 이용한 기구는?','현미경','잠망경의 거울'],
  ['햇빛이 프리즘을 지나면?','여러 가지 색으로 나뉘어요','검은색이 돼요'],['거울에 비친 글자는?','좌우가 바뀌어 보여요','위아래가 바뀌어 보여요'],
  ['빛이 공기에서 물로 비스듬히 들어가면?','경계에서 꺾여요','그대로 곧게 가요'],['구급차 앞의 글자를 좌우로 바꿔 쓴 까닭은?','앞차의 거울로 바로 읽게','멋있어 보이게'],
  ['볼록 렌즈로 가까운 물체를 보면?','크게 보여요','항상 작게 보여요'],['햇빛이 거울에 부딪히면?','방향이 바뀌어요','사라져요'],
];
function torch(g,x,y,s,t){K.glow(g,x+s*.35,y,s*1.1,'#fde047',.5);const gr=g.createLinearGradient(0,y-s*.3,0,y+s*.3);gr.addColorStop(0,'#cbd5e1');gr.addColorStop(1,'#64748b');g.lineJoin='round';g.lineWidth=Math.max(1.6,s*.05);g.strokeStyle='#1e1b4b';
  g.fillStyle=gr;K.rr(g,x-s*.45,y-s*.2,s*.6,s*.4,s*.08);g.fill();g.stroke();g.fillStyle='#475569';g.beginPath();g.moveTo(x+s*.15,y-s*.2);g.lineTo(x+s*.38,y-s*.32);g.lineTo(x+s*.38,y+s*.32);g.lineTo(x+s*.15,y+s*.2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fef08a';g.beginPath();g.ellipse(x+s*.38,y,s*.05,s*.3,0,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x-s*.38,y-s*.14,s*.4,s*.05);}
function brick(g,x,y,s){g.save();g.translate(x,y);K.rr(g,-s*.42,-s*.42,s*.84,s*.84,s*.1);g.fillStyle='#7a5a4a';g.fill();g.lineWidth=Math.max(1.4,s*.04);g.strokeStyle='#2a1c16';g.stroke();
  g.save();K.rr(g,-s*.42,-s*.42,s*.84,s*.84,s*.1);g.clip();g.strokeStyle='#2a1c16';g.beginPath();for(let i=1;i<3;i++){g.moveTo(-s*.42,-s*.42+i*s*.28);g.lineTo(s*.42,-s*.42+i*s*.28);}for(let r=0;r<3;r++){const off=r%2?s*.14:-s*.14;for(let c=-1;c<=1;c++){g.moveTo(c*s*.28+off,-s*.42+r*s*.28);g.lineTo(c*s*.28+off,-s*.42+(r+1)*s*.28);}}g.stroke();g.fillStyle='rgba(255,255,255,.12)';g.fillRect(-s*.42,-s*.42,s*.84,s*.1);g.restore();g.restore();}
function bullseye(g,x,y,s,lit,bad){g.save();g.translate(x,y);const cols=bad?['#fecdd3','#fb7185']:lit?['#fef9c3','#facc15']:['#f1f5f9','#ef4444'];if(lit||bad)K.glow(g,0,0,s*1.1,bad?'#fb7185':'#fde047',.6);
  g.lineWidth=Math.max(1.5,s*.04);g.strokeStyle='#1e1b4b';for(let i=0;i<4;i++){g.fillStyle=i%2?cols[0]:cols[1];g.beginPath();g.arc(0,0,s*(.42-i*.1),0,TAU);g.fill();g.stroke();}g.restore();}
function rainbowBurst(g,x,y,r,t,a){g.save();g.globalCompositeOperation='screen';g.lineCap='round';RAINBOW.forEach((c,i)=>{const ang=-Math.PI*.9+i*Math.PI*.8/6;g.strokeStyle=c;g.globalAlpha=a*.85;g.lineWidth=Math.max(2,r*.1);g.beginPath();g.moveTo(x+Math.cos(ang)*r*.3,y+Math.sin(ang)*r*.3);g.lineTo(x+Math.cos(ang)*r*(.9+Math.sin(t*6+i)*.1),y+Math.sin(ang)*r*(.9+Math.sin(t*6+i)*.1));g.stroke();});g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H)/7;K.vgrad(g,0,0,W,H,['#0b0a1a','#14123a','#1e1b4b']);K.dots(g,W,H,u*.7,'rgba(199,210,254,.07)');
    const pts=[[.05,.55],[.35,.55],[.35,.3],[.7,.3],[.7,.7],[.92,.7]];const P=pts.map(([a,b])=>[W*a,H*b]);
    g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle='rgba(253,224,71,.25)';g.lineWidth=u*.35;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.shadowColor='#facc15';g.shadowBlur=u*.4;g.strokeStyle='#fde047';g.lineWidth=u*.1;g.stroke();g.shadowBlur=0;g.strokeStyle='#fffbe6';g.lineWidth=u*.03;g.stroke();g.restore();
    /* 빛 알갱이 */
    let tot=0;const segs=[];for(let i=0;i<P.length-1;i++){const l=Math.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1]);segs.push(l);tot+=l;}
    for(let k=0;k<8;k++){let d=((T*u*2+k*tot/8)%tot);let i=0;while(d>segs[i]){d-=segs[i];i++;}const f=d/segs[i];K.glow(g,lerp2(P[i][0],P[i+1][0],f),lerp2(P[i][1],P[i+1][1],f),u*.3,'#fff',.8);}
    [[P[1],'/'],[P[2],'\\\\'],[P[3],'/'],[P[4],'\\\\']].forEach(([[x,y],m])=>{g.save();g.translate(x,y);g.rotate(m==='/'?-Math.PI/4:Math.PI/4);g.fillStyle='#64748b';K.rr(g,-u*.5,-u*.1,u,u*.2,u*.06);g.fill();const mg=g.createLinearGradient(-u*.5,0,u*.5,0);mg.addColorStop(0,'#e0f2fe');mg.addColorStop(.5,'#fff');mg.addColorStop(1,'#bae6fd');g.fillStyle=mg;K.rr(g,-u*.47,-u*.08,u*.94,u*.12,u*.05);g.fill();g.restore();});
    torch(g,P[0][0]+u*.1,P[0][1],u*1.1,T);bullseye(g,P[5][0]-u*.2,P[5][1],u*1.2,true,false);rainbowBurst(g,P[5][0]-u*.2,P[5][1],u*1.3,T,.9);};
  const lerp2=(a,b,t)=>a+(b-a)*t;
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'sci5-light',title:'빛 반사 퍼즐',title1:'빛의 길을 열어라',title2:'빛 반사 퍼즐',emoji:LOGO,
  subtitle:'5학년 · 빛의 성질',
  howto:'거울을 <b>톡</b> 누르면 방향이 바뀌어요(／ ↔ ＼). 빛이 거울에 부딪혀 방향이 바뀌는 <b>반사</b>를 이용해 빛을 <b>과녁</b>(문제에서는 <b>정답</b>)으로 보내요!',
  how:'거울을 <b>톡</b> 눌러 돌리고<br>빛을 과녁(정답)으로 보내요',
  theme:{c1:'#e8541a',c2:'#2563eb'},hero:heroScene,vignette:.05,durs:[60,90,120],levelTitle:'어떤 실험을 할까요?',
  txt:{who:'누구와 실험할까요?',dur:'실험 시간',pace:'한 문제 시간',seat:'번 연구원 ',go:'실험 시작!',s1:'1. 실험',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'mirror',g:'5학년 · 빛의 성질',t:'🪞 거울로 빛 보내기',d:'빛의 반사 퍼즐'},
    {id:'quiz',g:'5학년 · 빛의 성질',t:'🔍 굴절과 볼록 렌즈',d:'빛으로 정답 맞히기'},
    {id:'all',g:'5학년 · 빛의 성질',t:'🌟 모두 섞기',d:'퍼즐과 문제가 번갈아'},
  ],
  summary:`<ul><li>빛은 곧게 나아가요(<b>직진</b>) → 그림자가 생겨요.</li><li>빛이 거울에 부딪혀 방향이 바뀌는 것을 <b>반사</b>라고 해요. 거울에 비친 모습은 좌우가 바뀌어 보여요.</li>
    <li>빛이 공기와 물처럼 다른 물질의 경계를 비스듬히 지날 때 꺾이는 것을 <b>굴절</b>이라고 해요 (물속 다리가 짧아 보임, 빨대가 꺾여 보임).</li>
    <li><b>볼록 렌즈</b>는 가운데가 두꺼워 빛을 모아요. 돋보기, 현미경, 망원경, 사진기에 쓰여요. 프리즘은 햇빛을 여러 색으로 나눠요.</li></ul>`,
  init(p){const st=p.state;st.kN=0;st.T=0;this.round(p);},
  setT(p,sec){const st=p.state;st.qmax=sec/p.pace;st.qt=st.qmax;},
  round(p){const st=p.state,L=p.levelId,R=p.R;const quiz=L==='quiz'||(L==='all'&&st.kN++%2===1);st.quiz=quiz;st.win=null;st.lock=false;st.rev=false;
    const land=p.W>p.H*1.05;const C=land?7:5,Rw=land?5:7;st.C=C;st.Rw=Rw;
    let ok=false,tries=0;while(!ok&&tries<300){tries++;ok=this.gen(p,R);}
    if(quiz){const q=p.deck(LIGHT_Q,'lq');st.q=q;this.setT(p,22);p.ask('🔦 '+q[0],'거울을 돌려 빛을 정답으로 보내요');}
    else{st.q=null;this.setT(p,32);p.ask('🔦 거울을 톡톡 돌려 빛을 <b>🎯 과녁</b>에 맞혀요!','빛은 거울에 부딪히면 방향이 바뀌어요 (반사)');}
    this.trace(p);if(st.hitT)this.scramble(p);},
  gen(p,R){const st=p.state,C=st.C,Rw=st.Rw;const grid={};const key=(x,y)=>x+','+y;
    const sy=R.int(0,Rw-1);let x=-1,y=sy,dx=1,dy=0;const path=[];let mirrors=0;const want=R.int(2,3);
    for(let seg=0;seg<8;seg++){const n=R.int(1,3);for(let k=0;k<n;k++){x+=dx;y+=dy;if(x<0||y<0||x>=C||y>=Rw||grid[key(x,y)])return false;grid[key(x,y)]='p';path.push([x,y]);}
      if(mirrors<want){const nd=R.chance(.5)?[dy,dx]:[-dy,-dx];// 수직 방향으로 꺾기
        const t=(nd[0]===-dy&&nd[1]===-dx)?'/':'\\';grid[key(x,y)]={m:t};mirrors++;dx=nd[0];dy=nd[1];}
      else{grid[key(x,y)]='T';break;}}
    if(mirrors<want)return false;const tgt=path[path.length-1];if(grid[key(tgt[0],tgt[1])]!=='T')return false;
    st.src={x:-1,y:sy};st.cells={};Object.entries(grid).forEach(([k,v])=>{if(v&&v.m)st.cells[k]={m:v.m,on:true};});st.tgt={x:tgt[0],y:tgt[1],ok:true};
    // 가짜 거울, 벽, 오답 과녁
    const free=()=>{for(let t=0;t<50;t++){const fx=R.int(0,C-1),fy=R.int(0,Rw-1);if(!grid[key(fx,fy)]&&!(fx===0&&fy===sy)){grid[key(fx,fy)]='x';return[fx,fy];}}return null;};
    for(let i=0;i<2;i++){const f=free();if(f)st.cells[key(f[0],f[1])]={m:R.chance(.5)?'/':'\\',on:true};}
    st.walls=[];for(let i=0;i<2;i++){const f=free();if(f)st.walls.push(f);}
    st.tgt2=null;if(st.quiz){const f=free();if(!f)return false;st.tgt2={x:f[0],y:f[1],ok:false};}
    st.hitT=true;return true;},
  scramble(p){const st=p.state,R=p.Rf;for(let t=0;t<20;t++){Object.values(st.cells).forEach(c=>{if(R.chance(.6))c.m=c.m==='/'?'\\':'/';});this.trace(p);if(!st.hitT)return;}
    Object.values(st.cells)[0].m=Object.values(st.cells)[0].m==='/'?'\\':'/';this.trace(p);},
  trace(p){const st=p.state;let x=st.src.x,y=st.src.y,dx=1,dy=0;const pts=[[x,y]];st.hitT=null;const seen=new Set();
    for(let s=0;s<80;s++){x+=dx;y+=dy;if(x<0||y<0||x>=st.C||y>=st.Rw){pts.push([x,y]);break;}
      if(st.walls.some(w=>w[0]===x&&w[1]===y)){pts.push([x-dx*.5,y-dy*.5]);break;}
      const k=x+','+y+','+dx+','+dy;if(seen.has(k))break;seen.add(k);
      if(st.tgt.x===x&&st.tgt.y===y){pts.push([x,y]);st.hitT=st.tgt;break;}if(st.tgt2&&st.tgt2.x===x&&st.tgt2.y===y){pts.push([x,y]);st.hitT=st.tgt2;break;}
      const c=st.cells[x+','+y];if(c){pts.push([x,y]);if(c.m==='/'){[dx,dy]=[-dy,-dx];}else{[dx,dy]=[dy,dx];}}}
    st.beam=pts;},
  Z(p){const u=p.u,y0=Math.max(p.top||0,u*2.6)+u*.1,y1=p.H-(p.bot||0)-u*.1;return{y0,y1,h:Math.max(100,y1-y0)};},
  geo(p){const st=p.state,u=p.u,Z=this.Z(p);const cs=Math.min((p.W-u*1.4)/(st.C+1),(Z.h-u*.3)/st.Rw);const ox=(p.W-cs*(st.C+1))/2+cs,oy=Z.y0+(Z.h-cs*st.Rw)/2;return{cs,ox,oy};},
  cc(p,x,y){const G=this.geo(p);return[G.ox+(x+.5)*G.cs,G.oy+(y+.5)*G.cs];},
  update(p,dt){const st=p.state;st.T+=dt;
    if(!st.lock&&!st.rev&&st.qmax>0){st.qt-=dt;if(st.qt<=0){st.rev=true;st.lock=true;
      if(st.q){p.hit(false,{pen:20,x:p.W/2,y:p.H*.4,tip:`시간이 다 됐어요! 정답: <b>${st.q[1]}</b>`,review:`${st.q[0]} → ${st.q[1]}`,tipMs:2600});}else p.hit(false,{pen:20,x:p.W/2,y:p.H*.4,tip:'시간이 다 됐어요! 새 퍼즐로 넘어가요',tipMs:2200});
      setTimeout(()=>{if(p.active)this.round(p);},1800);return;}}
    if(st.hitT&&!st.lock){st.lock=true;st.qt=0;const t=st.hitT;const [x,y]=this.cc(p,t.x,t.y);
      setTimeout(()=>{if(!p.active)return;if(st.q){const ok=t.ok;p.hit(ok,{x,y,tip:ok?`정답: ${st.q[1]}`:`정답: <b>${st.q[1]}</b>`,review:`${st.q[0]} → ${st.q[1]}`});
          if(!ok){st.lock=false;st.hitT=null;st.wrongT=t;setTimeout(()=>{st.wrongT=null;},900);this.scramble(p);return;}}
        else p.hit(true,{x,y,tip:'빛이 거울에서 반사되어 과녁에 닿았어요!'});
        st.win=st.T;setTimeout(()=>{if(p.active)this.round(p);},900);},350);}},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),cs=G.cs,t=st.T,Z=this.Z(p);
    K.vgrad(g,0,0,W,H,['#14123a','#1e1b4b','#2a1f5c']);K.dots(g,W,H,u*.7,'rgba(199,210,254,.07)');K.glow(g,W*.5,H*.5,Math.max(W,H)*.55,'#6d5dfc',.16);
    const pd=Math.max(2,Math.min(cs*.12,G.oy-Z.y0+2)),bx=G.ox-pd,by=G.oy-pd,bw=cs*st.C+pd*2,bh=cs*st.Rw+pd*2;
    K.card(g,bx,by,bw,bh,cs*.22,'rgba(30,27,80,.92)',{stroke:'rgba(165,180,252,.3)',lw:1.5,blur:u*.6,dy:u*.15,hi:false});
    for(let x=0;x<st.C;x++)for(let y=0;y<st.Rw;y++){const X=G.ox+x*cs+cs*.05,Y=G.oy+y*cs+cs*.05,w=cs*.9;
      const tg=g.createLinearGradient(0,Y,0,Y+w);tg.addColorStop(0,'#3a3590');tg.addColorStop(1,'#2c2873');K.rr(g,X,Y,w,w,cs*.14);g.fillStyle=tg;g.fill();
      g.strokeStyle='rgba(255,255,255,.07)';g.lineWidth=1;K.rr(g,X+.5,Y+.5,w-1,w-1,cs*.14);g.stroke();}
    const [sx,sy]=this.cc(p,-1,st.src.y);torch(g,sx+cs*.1,sy,cs*.95,t);
    for(const w of st.walls){const [x,y]=this.cc(p,w[0],w[1]);brick(g,x,y,cs);}
    const drawT=(tg,label)=>{if(!tg)return;const [x,y]=this.cc(p,tg.x,tg.y);const lit=st.hitT===tg;const bad=st.wrongT===tg;
      if(label){if(lit)K.glow(g,x,y,cs*.9,'#fde047',.6);if(bad)K.glow(g,x,y,cs*.9,'#fb7185',.6);const fill=bad?'#ffe4e6':lit?'#fef9c3':'#ffffff';K.card(g,x-cs*.44,y-cs*.44,cs*.88,cs*.88,cs*.2,fill,{blur:cs*.2,dy:cs*.06,stroke:bad?'#fb7185':lit?'#facc15':'rgba(165,180,252,.7)',lw:2});
        K.tag(g,label,x,y,{size:Math.min(cs*.22,u*.42),maxW:cs*.95,fill:'#ffffff00',stroke:'#ffffff00',shadow:false,maxLines:3,color:'#1e1b4b'});}
      else bullseye(g,x,y,cs*1.1,lit,bad);if(lit&&!bad)rainbowBurst(g,x,y,cs*1.3,t,Math.min(1,(st.win!=null?1:.6)));};
    if(st.q){const lab=[st.q[1],st.q[2]];drawT(st.tgt,lab[0]);drawT(st.tgt2,lab[1]);}else{drawT(st.tgt);}
    if(st.beam){const path=()=>{g.beginPath();st.beam.forEach(([x,y],i)=>{const [cx,cy]=this.cc(p,x,y);i?g.lineTo(cx,cy):g.moveTo(cx,cy);});};
      g.save();g.lineCap='round';g.lineJoin='round';
      g.strokeStyle='rgba(253,224,71,.22)';g.lineWidth=Math.max(10,cs*.32);path();g.stroke();
      g.strokeStyle='#fde047';g.lineWidth=Math.max(3,cs*.1);g.shadowColor='#facc15';g.shadowBlur=cs*.35;path();g.stroke();
      g.shadowBlur=0;g.strokeStyle='#fffbe6';g.lineWidth=Math.max(1.5,cs*.035);path();g.stroke();
      /* 흐르는 빛 알갱이 */
      const pts=st.beam.map(([x,y])=>this.cc(p,x,y));let tot=0;const segs=[];for(let i=0;i<pts.length-1;i++){const l=Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1]);segs.push(l);tot+=l;}
      if(tot>0)for(let k=0;k<6;k++){let d=((t*cs*2+k*tot/6)%tot);let i=0;while(i<segs.length-1&&d>segs[i]){d-=segs[i];i++;}const f=segs[i]?d/segs[i]:0;K.glow(g,pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f,cs*.22,'#ffffff',.9);}
      g.restore();}
    for(const [k,c] of Object.entries(st.cells)){const [x,y]=k.split(',').map(Number);const [cx,cy]=this.cc(p,x,y);
      g.save();g.translate(cx,cy);g.rotate(c.m==='/'?-Math.PI/4:Math.PI/4);
      g.shadowColor='rgba(0,0,0,.35)';g.shadowBlur=cs*.12;g.shadowOffsetY=cs*.04;K.rr(g,-cs*.43,-cs*.08,cs*.86,cs*.16,cs*.05);g.fillStyle='#64748b';g.fill();g.shadowBlur=0;g.shadowOffsetY=0;
      const mg=g.createLinearGradient(-cs*.43,0,cs*.43,0);mg.addColorStop(0,'#e0f2fe');mg.addColorStop(.35,'#ffffff');mg.addColorStop(.5,'#bae6fd');mg.addColorStop(1,'#e0f2fe');
      K.rr(g,-cs*.41,-cs*.07,cs*.82,cs*.1,cs*.04);g.fillStyle=mg;g.fill();g.fillStyle='rgba(255,255,255,.85)';g.fillRect(-cs*.3,-cs*.055,cs*.18,cs*.025);g.restore();
      K.orb(g,cx,cy,Math.max(2.5,cs*.045),'#94a3b8');}
    if(!st.lock&&st.qmax>0&&st.qt>0){const f=clamp(st.qt/st.qmax,0,1);const bw2=Math.min(W*.8,u*12),bh2=Math.max(6,u*.2),bx2=W/2-bw2/2,by2=Z.y0-u*.12;K.rr(g,bx2,by2,bw2,bh2,bh2/2);g.fillStyle='rgba(255,255,255,.18)';g.fill();K.rr(g,bx2,by2,Math.max(bh2,bw2*f),bh2,bh2/2);g.fillStyle=f>.4?'#a78bfa':(f>.2?'#fde047':'#f472b6');g.fill();}},
  down(p,x,y){const st=p.state;if(st.lock)return;const G=this.geo(p);const cx=Math.floor((x-G.ox)/G.cs),cy=Math.floor((y-G.oy)/G.cs);const c=st.cells[cx+','+cy];if(!c)return;
    c.m=c.m==='/'?'\\':'/';p.Snd.tone(900,.04,'sine',.04);this.trace(p);},
};

Engine.boot(GAME);
