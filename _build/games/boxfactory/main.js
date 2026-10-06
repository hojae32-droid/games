/* 5~6학년 · 직육면체 · 각기둥과 각뿔 · 원기둥, 원뿔, 구 — 상자 공장 (겨냥도 콕콕, 전개도 3D로 접기, 입체도형 만들어 출고)
   디자인: 파란 설계도 + 주황 포인트. 상자봇이 검사원이에요. 전개도는 진짜 3D로 접혀요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b2a52';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 6l16 8v18L24 40 8 32V14z" fill="#fbbf24" stroke="#0b2a52" stroke-width="3" stroke-linejoin="round"/><path d="M8 14l16 8 16-8M24 22v18" fill="none" stroke="#0b2a52" stroke-width="3" stroke-linejoin="round"/><path d="M16 10l16 8" stroke="#ff8a1f" stroke-width="4" stroke-linecap="round"/></svg>';
/*@@DATA@@*/
/* ───── 3D 전개도 ───── */
const v3={cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};
function rot3(P,A,D,ph){const v=[P[0]-A[0],P[1]-A[1],P[2]-A[2]];const c=Math.cos(ph),s=Math.sin(ph);const cr=v3.cross(D,v),d=v3.dot(D,v)*(1-c);return[A[0]+v[0]*c+cr[0]*s+D[0]*d,A[1]+v[1]*c+cr[1]*s+D[1]*d,A[2]+v[2]*c+cr[2]*s+D[2]*d];}
function netModel(cells){const key=c=>c[0]+','+c[1];const idx=new Map(cells.map((c,k)=>[key(c),k]));
  const deg=cells.map(c=>[[0,1],[1,0],[0,-1],[-1,0]].filter(([a,b])=>idx.has(key([c[0]+a,c[1]+b]))).length);const root=deg.indexOf(Math.max(...deg));
  const par=cells.map(()=>-1),depth=cells.map(()=>0),hinge=cells.map(()=>null);const seen=new Set([root]);const queue=[root];
  while(queue.length){const k=queue.shift();const c=cells[k];for(const [a,b] of [[0,1],[0,-1],[1,0],[-1,0]]){const nk=idx.get(key([c[0]+a,c[1]+b]));if(nk==null||seen.has(nk))continue;seen.add(nk);par[nk]=k;depth[nk]=depth[k]+1;
    const A=b!==0?[c[1]+(b>0?1:0),c[0],0]:[c[1],c[0]+(a>0?1:0),0];const D=[a,-b,0];hinge[nk]={A,D};queue.push(nk);}}
  const Hh=Math.max(...cells.map(x=>x[0]))+1,Ww=Math.max(...cells.map(x=>x[1]))+1;
  return{cells,root,par,depth,hinge,H:Hh,W:Ww,maxD:Math.max(...depth)};}
/* 접힌 정도 t(초)에서 면마다 3D 꼭짓점 → 화면 좌표 */
function projectNet(M,t,yaw,tilt,cx,cy,sc){const out=[];
  for(let k=0;k<M.cells.length;k++){const c=M.cells[k];let pts=[[c[1],c[0],0],[c[1]+1,c[0],0],[c[1]+1,c[0]+1,0],[c[1],c[0]+1,0]];
    let j=k;while(j!==M.root&&j>=0){const h=M.hinge[j];const pr=clamp((t-(M.depth[j]-1)*.4)/.55,0,1);const e=pr<.5?2*pr*pr:1-Math.pow(-2*pr+2,2)/2;const ph=Math.PI/2*e;if(ph>0)pts=pts.map(P=>rot3(P,h.A,h.D,ph));j=M.par[j];}
    const mx=M.W/2,my=M.H/2,mz=.5*clamp(t/.9,0,1);
    const q=pts.map(P=>{let x=P[0]-mx,y=P[1]-my,z=P[2]-mz;const cy_=Math.cos(yaw),sy_=Math.sin(yaw);const x2=x*cy_-y*sy_,y2=x*sy_+y*cy_;const ct=Math.cos(tilt),st_=Math.sin(tilt);const y3=y2*ct-z*st_,d=y2*st_+z*ct;return[cx+x2*sc,cy+y3*sc,d];});
    out.push({k,q,depth:(q[0][2]+q[1][2]+q[2][2]+q[3][2])/4});}
  return out;}
function inQuad(x,y,q){let s=0;for(let i=0;i<4;i++){const a=q[i],b=q[(i+1)%4];const c=(b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0]);s+=c>0?1:-1;}return Math.abs(s)===4;}
const FCOL=['#fde68a','#bae6fd','#fbcfe8','#bbf7d0','#fed7aa','#ddd6fe'];
/* ───── 그림 도우미 ───── */
function paper(g,x,y,w,h,u){K.card(g,x,y,w,h,u*.25,'#eef5ff',{stroke:'#7fb2ff',lw:2,blur:u*.4,dy:u*.1});g.save();K.rr(g,x,y,w,h,u*.25);g.clip();g.strokeStyle='rgba(59,130,246,.13)';g.lineWidth=1;const gs=u*.7;for(let xx=x+gs;xx<x+w;xx+=gs){g.beginPath();g.moveTo(xx,y);g.lineTo(xx,y+h);g.stroke();}for(let yy=y+gs;yy<y+h;yy+=gs){g.beginPath();g.moveTo(x,yy);g.lineTo(x+w,yy);g.stroke();}g.restore();}
function drawPoly(g,x0,y0,S,n,pyr){const cx=120,cy=150,Rx=80,Ry=26,h=110;const a0=Math.PI/2+(n%2?0:Math.PI/n);const B=[];for(let k=0;k<n;k++){const a=a0+k*2*Math.PI/n;B.push([cx+Rx*Math.cos(a),cy+Ry*Math.sin(a),Math.sin(a)<-0.01]);}
  const P=(x,y)=>[x0+x*S,y0+y*S];g.save();g.lineJoin='round';g.lineCap='round';
  const L=(p1,p2,d)=>{const a=P(p1[0],p1[1]),b=P(p2[0],p2[1]);g.strokeStyle='#134e4a';g.lineWidth=Math.max(1.5,(d?2:3)*S);g.setLineDash(d?[6*S,5*S]:[]);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.setLineDash([]);};
  g.fillStyle='rgba(153,246,228,.6)';g.beginPath();B.forEach((b,i)=>{const p=P(b[0],b[1]);i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);});g.closePath();g.fill();
  for(let k=0;k<n;k++){const a=B[k],b=B[(k+1)%n];L(a,b,a[2]&&b[2]||(a[2]||b[2])&&((a[1]+b[1])/2<cy-2));}
  if(pyr){const T=[cx,cy-h];B.forEach(b=>L(b,T,b[2]));const t=P(T[0],T[1]);g.fillStyle='#ef4444';g.beginPath();g.arc(t[0],t[1],4*S,0,TAU);g.fill();}
  else{const Tp=B.map(b=>[b[0],b[1]-h]);g.fillStyle='#5eead4';g.strokeStyle='#134e4a';g.lineWidth=Math.max(1.5,3*S);g.beginPath();Tp.forEach((b,i)=>{const p=P(b[0],b[1]);i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);});g.closePath();g.fill();g.stroke();B.forEach((b,k)=>L(b,Tp[k],b[2]));}
  g.restore();}
function drawRound(g,x0,y0,S,k){const P=(x,y)=>[x0+x*S,y0+y*S];g.save();g.lineJoin='round';g.strokeStyle='#134e4a';g.lineWidth=Math.max(2,3*S);
  const ell=(cx,cy,rx,ry,a0,a1,dash)=>{const p=P(cx,cy);g.setLineDash(dash?[6*S,5*S]:[]);g.beginPath();g.ellipse(p[0],p[1],rx*S,ry*S,0,a0,a1);g.stroke();g.setLineDash([]);};
  if(k==='cyl'){const a=P(60,40),b=P(180,160);g.fillStyle='#99f6e4';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(a[0],P(60,160)[1]);g.ellipse(P(120,160)[0],P(120,160)[1],60*S,18*S,0,Math.PI,0,true);g.lineTo(b[0],a[1]);g.closePath();g.fill();g.stroke();
    g.fillStyle='#5eead4';g.beginPath();g.ellipse(P(120,40)[0],P(120,40)[1],60*S,18*S,0,0,TAU);g.fill();g.stroke();ell(120,160,60,18,Math.PI,TAU,true);}
  else if(k==='cone'){const t=P(120,20);g.fillStyle='#99f6e4';g.beginPath();g.moveTo(t[0],t[1]);g.lineTo(P(60,160)[0],P(60,160)[1]);g.ellipse(P(120,160)[0],P(120,160)[1],60*S,18*S,0,Math.PI,0,true);g.closePath();g.fill();g.stroke();ell(120,160,60,18,Math.PI,TAU,true);g.fillStyle='#ef4444';g.beginPath();g.arc(t[0],t[1],4*S,0,TAU);g.fill();}
  else{const c=P(120,100);g.fillStyle='#99f6e4';g.beginPath();g.arc(c[0],c[1],80*S,0,TAU);g.fill();g.stroke();ell(120,100,80,22,0,TAU,true);g.fillStyle='#ef4444';g.beginPath();g.arc(c[0],c[1],4*S,0,TAU);g.fill();}
  g.restore();}
function robot(g,x,y,s,mood,t){g.save();g.translate(x,y+Math.sin(t*3)*s*.02);g.lineJoin='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;
  K.shadow(g,0,s*.55,s*.5,s*.08,.3);
  g.fillStyle='#d6a15f';K.rr(g,-s*.5,-s*.5,s,s,s*.1);g.fill();g.stroke();g.strokeStyle='#a16207';g.lineWidth=s*.06;g.beginPath();g.moveTo(-s*.5,-s*.12);g.lineTo(s*.5,-s*.12);g.stroke();g.fillStyle='#fde68a';g.fillRect(-s*.14,-s*.5,s*.28,s*.3);
  g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(0,-s*.5);g.lineTo(0,-s*.75);g.stroke();g.fillStyle=mood==='happy'?'#4ade80':mood==='oops'?'#ef4444':'#fbbf24';g.beginPath();g.arc(0,-s*.78,s*.07,0,TAU);g.fill();g.stroke();
  g.strokeStyle=INK;g.fillStyle=INK;for(const d of[-1,1]){const ex=d*s*.2,ey=s*.05;if(mood==='oops'){g.beginPath();g.moveTo(ex-s*.07,ey-s*.07);g.lineTo(ex+s*.07,ey+s*.07);g.moveTo(ex+s*.07,ey-s*.07);g.lineTo(ex-s*.07,ey+s*.07);g.stroke();}else if(mood==='happy'){g.beginPath();g.arc(ex,ey+s*.02,s*.08,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.fillStyle='#fff';g.beginPath();g.arc(ex,ey,s*.1,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(ex+s*.02,ey+s*.02,s*.045,0,TAU);g.fill();}}
  g.beginPath();if(mood==='happy'){g.fillStyle='#be123c';g.arc(0,s*.22,s*.12,0,Math.PI);g.fill();g.stroke();}else if(mood==='oops'){g.arc(0,s*.34,s*.09,1.15*Math.PI,1.85*Math.PI);g.stroke();}else{g.moveTo(-s*.1,s*.26);g.lineTo(s*.1,s*.26);g.stroke();}
  g.restore();}
function miniBox(g,x,y,s,col){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(1.5,s*.07);g.strokeStyle=INK;g.fillStyle=col||'#d6a15f';K.rr(g,-s*.5,-s*.4,s,s*.8,s*.06);g.fill();g.stroke();g.fillStyle='#fde68a';g.fillRect(-s*.12,-s*.4,s*.24,s*.8);g.strokeRect(-s*.12,-s*.4,s*.24,s*.8);g.restore();}
function belt(g,x,y,w,h,t,u){K.card(g,x,y,w,h,h/2,'#334155',{blur:u*.2,dy:u*.05,hi:false});g.save();K.rr(g,x,y,w,h,h/2);g.clip();g.fillStyle='rgba(255,255,255,.12)';const sp=h*.9,off=(t*u*1.2)%sp;for(let xx=x-sp+off;xx<x+w;xx+=sp){g.beginPath();g.moveTo(xx,y);g.lineTo(xx+sp*.4,y);g.lineTo(xx+sp*.4-h*.3,y+h);g.lineTo(xx-h*.3,y+h);g.closePath();g.fill();}g.restore();}
function factoryBg(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#0b2a52','#082042','#061a38']);g.save();g.strokeStyle='rgba(127,178,255,.1)';g.lineWidth=1;const gs=u*1.4;for(let x=0;x<W;x+=gs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=gs){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;const M=netModel([[0,1],[1,0],[1,1],[1,2],[1,3],[2,1]]);
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;factoryBg(g,W,H,u,T);
    const per=6,ph=T%per;const ft=Math.max(0,ph-1.2);const done=ft>2.4;const yaw=done?(ph-3.6)*.8:0;const tilt=clamp(ft/2.4,0,1)*.95;
    const cs=Math.min(W,H)*(wide?.2:.16);const cx=W*(wide?.7:.5),cy=H*(wide?.5:.58);
    const fs=projectNet(M,ft,yaw,tilt,cx,cy,cs).sort((a,b)=>a.depth-b.depth);
    for(const f of fs){g.fillStyle=FCOL[f.k%6];g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.06);g.lineJoin='round';g.beginPath();f.q.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();g.stroke();}
    belt(g,W*.05,H*.9,W*.9,u*.5,T,u);robot(g,W*(wide?.2:.2),H*(wide?.72:.76),u*1.3,done?'happy':'neutral',T);miniBox(g,((T*u*1.2)%(W*.9))+W*.05,H*.9,u*.6);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'g20-box-factory',title:'상자 공장',title1:'3D로 척척!',title2:'상자 공장',emoji:LOGO,
  subtitle:'5~6학년 · 직육면체 · 각기둥과 각뿔 · 원기둥, 원뿔, 구',
  howto:'상자 공장의 품질 검사원! 겨냥도에서 모서리를 <b>직접 콕콕</b> 짚고, 전개도가 상자가 될지 예상하면 기계가 <b>진짜로 접어서</b> 보여 줘요. 주문서를 보고 각기둥·각뿔을 <b>직접 만들어</b> 출고해요!',
  how:p=>({'5a':'겨냥도에서 <b>모서리를 콕콕</b>!','5b':'전개도가 상자가 될지<br>예상하고 <b>3D로 접기</b>','5c':'★과 <b>마주 보는 면</b> 콕!','6a':'주문서대로<br>입체도형 <b>만들어 출고</b>','6b':'원기둥 · 원뿔 · 구 <b>알아보기</b>',all:'여러 가지 검사가 번갈아 나와요'}[p.levelId]),
  theme:{c1:'#0f766e',c2:'#ea580c'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 검사를 할까요?',
  txt:{who:'누가 검사원이 될까요?',dur:'근무 시간',pace:'한 문제 시간',seat:'번 검사원 ',go:'근무 시작!',s1:'1. 검사',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'5a',g:'5~6학년 · 입체도형',t:'직육면체와 정육면체',d:'겨냥도에서 모서리 콕콕 · 면 · 꼭짓점'},
    {id:'5b',g:'5~6학년 · 입체도형',t:'정육면체의 전개도',d:'예상하고 3D로 접어 확인하기'},
    {id:'5c',g:'5~6학년 · 입체도형',t:'마주 보는 면 찾기',d:'★과 마주 보는 면 콕 → 접어서 확인'},
    {id:'6a',g:'5~6학년 · 입체도형',t:'각기둥과 각뿔',d:'주문서대로 입체 만들기 · 수 세기'},
    {id:'6b',g:'5~6학년 · 입체도형',t:'원기둥 · 원뿔 · 구',d:'구성 요소와 성질'},
    {id:'all',g:'5~6학년 · 입체도형',t:'🌟 모두 섞기',d:'여러 가지 검사가 번갈아 나와요'},
  ],
  summary:`<ul><li><b>직육면체</b>는 면 6개, 모서리 12개, 꼭짓점 8개예요. 마주 보는 면은 서로 평행하고, 한 꼭짓점에서 만나는 세 모서리는 서로 수직이에요. 모서리가 모두 같으면 <b>정육면체</b>예요.</li>
    <li>정육면체의 <b>전개도</b>는 11가지예요. 접었을 때 면이 겹치면 상자가 될 수 없어요.</li>
    <li><b>n각기둥</b>은 면 n+2개, 모서리 3n개, 꼭짓점 2n개 · <b>n각뿔</b>은 면 n+1개, 모서리 2n개, 꼭짓점 n+1개예요.</li>
    <li>원기둥은 밑면이 2개이고 옆면이 굽어 있어요 · 원뿔은 밑면 1개, 꼭짓점과 모선이 있어요 · 구는 어느 방향에서 봐도 원이고 가장 안쪽 점이 중심이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=Math.max(p.top||0,u*2.6);const q=p.state.q;const n=p.state.ctrl?p.state.ctrl.length:0;
    const wide=W>=H*1.1;let rowMode=true;if(n>0){const L=Math.max(...p.state.ctrl.map(c=>String(c.t).length));rowMode=wide||(n<=4&&L<=8);}
    const bh=wide?u*1.5:u*1.4;const gap=u*.2;const ctrlH=n===0?0:(rowMode?bh:n*bh+(n-1)*gap);
    const beltH=u*.9;const cy0=H-ctrlH-(n?u*.25:u*.1);const beltY=cy0-beltH-u*.05;const py=Z0+u*.15;const ph=Math.max(u*3,beltY-py-u*.15);
    return{W,H,u,Z0,rowMode,bh,gap,ctrlH,cy0,beltY,beltH,px:u*.3,py,pw:W-u*.6,ph,n};},
  ctrlRects(p){const G=this.geo(p);const n=G.n;const out=[];const gx=G.u*.3;
    if(G.rowMode){const w=(G.W-gx*2-(n-1)*G.gap)/n;for(let i=0;i<n;i++)out.push({x:gx+i*(w+G.gap),y:G.cy0,w,h:G.bh});}
    else for(let i=0;i<n;i++)out.push({x:gx,y:G.cy0+i*(G.bh+G.gap),w:G.W-gx*2,h:G.bh});return out;},
  init(p){const st=p.state;Object.assign(st,{q:null,ctrl:null,box:0,n:0,T:0,lock:false,pick:-1,sel:new Set(),bn:3,bpyr:false,fold:null,qt:0,qmax:0,rev:false,mood:'neutral',mT:0,msg:null,beltBoxes:[]});this.newQ(p);},
  make(p,i){
    const R=p.R,L=i,q={};
    if(L==='5a'){const k=R.pick(['hidden','par','par','perp','perp','count']);q.ty='edges';q.k=k;
      if(k==='hidden'){q.ans=[0,1,2].map(j=>HID[j]);q.text='겨냥도에서 <b>보이지 않는 모서리</b>를 모두 콕콕! (점선으로 바뀌어요)';q.reveal='보이지 않는 모서리 3개';}
      else if(k==='par'){const e=R.int(0,11);q.hl=e;const d=DIR(e);q.ans=EDG.map((x,j)=>j).filter(j=>j!==e&&DIR(j)===d);q.text='<b>빨간 모서리</b>와 <b>평행한</b> 모서리를 모두 콕콕!';q.reveal='평행한 모서리 3개';}
      else if(k==='perp'){const f=R.pick(Object.keys(FACES));q.face=f;const dn=FACES[f].d;q.ans=EDG.map((x,j)=>j).filter(j=>DIR(j)===dn);q.text=`<b>색칠한 면</b>과 <b>수직인</b> 모서리를 모두 콕콕!`;q.reveal='수직인 모서리 4개';}
      else{const w=R.pick([['면',6],['모서리',12],['꼭짓점',8]]);q.ty='count';q.ans=w[1];q.text=`직육면체의 <b>${w[0]}</b>은 모두 몇 개일까요?`;q.reveal=w[1]+'개';}}
    else if(L==='5b'){const want=R.chance(.5);let net;for(let t=0;t<500;t++){const c=hexo(R);if(!!fold(c)===want){net=c;break;}}if(!net)net=want?NETS[0]:[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]];
      q.ty='net';q.net=net;q.valid=!!fold(net);q.text='이 전개도를 접으면 <b>정육면체 상자</b>가 될까요? 예상하고 접어 봐요!';q.reveal=q.valid?'상자가 돼요':'겹치는 면이 생겨 상자가 될 수 없어요';
      q.opts=[{t:'⭕ 상자가 돼요',ok:q.valid},{t:'❌ 안 돼요',ok:!q.valid}];}
    else if(L==='5c'){const net=R.pick(NETS).map(c=>c.slice());let n2=net;if(R.chance(.5))n2=n2.map(([r,c])=>[r,-c]);if(R.chance(.5))n2=n2.map(([r,c])=>[c,r]);n2=normC(n2);
      const fd=fold(n2);const star=R.int(0,5);const opp=fd.findIndex(f=>f.every((x,k)=>x===-fd[star][k]));q.ty='opp';q.net=n2;q.star=star;q.ans=opp;q.labels=R.shuffle(['가','나','다','라','마','바']);
      q.text='접었을 때 <b>★ 면과 마주 보는 면</b>을 전개도에서 콕!';q.reveal=q.labels[opp]+' 면';}
    else if(L==='6a'){const n=R.int(3,8);const pyr=R.chance(.5);const nm=PN[n]+(pyr?'각뿔':'각기둥');q.n=n;q.pyr=pyr;q.nm=nm;const v={face:pyr?n+1:n+2,edge:pyr?2*n:3*n,vert:pyr?n+1:2*n};q.v=v;
      const k=R.pick(['build','build','build','face','edge','vert']);
      if(k==='build'){q.ty='build';const two=R.sample(['face','edge','vert'],2);const NM={face:'면',edge:'모서리',vert:'꼭짓점'};
        const cand=[];for(let m=3;m<=8;m++)for(const y of[false,true]){const w={face:y?m+1:m+2,edge:y?2*m:3*m,vert:y?m+1:2*m};if(two.every(t=>w[t]===v[t]))cand.push(1);}
        const conds=cand.length===1?two:['face','edge','vert'];q.conds=conds;q.text='📋 주문서: '+conds.map(t=>`<b>${NM[t]} ${v[t]}개</b>`).join(', ')+'인 입체도형을 만들어요!';q.reveal=nm;}
      else{q.ty='poly';q.ans=v[k];q.text=`<b>${nm}</b>의 <b>${{face:'면',edge:'모서리',vert:'꼭짓점'}[k]}</b>은 몇 개일까요?`;q.reveal=q.ans+'개';}}
    else{const f=R.pick(F6);q.ty='round';q.kind=f[3];q.text=f[0];q.reveal=f[1];q.opts=R.shuffle([f[1],...f[2]]).map(t=>({t,ok:t===f[1]}));}
    if(q.ty==='count'||q.ty==='poly'){const a=q.ans;const ds=R.sample([a+1,a-1,a+2,a-2,a+3,a*2].filter(x=>x>0&&x!==a),3);q.opts=R.shuffle([a,...ds]).map(x=>({t:x+'개',ok:x===a}));}
    q.review=strip(q.text)+' → '+q.reveal;return q;},
  newQ(p){const st=p.state,L=p.levelId==='all'?['5a','5b','5c','6a','6b'][st.n%5]:p.levelId;st.n++;const q=this.make(p,L);st.q=q;st.lock=false;st.pick=-1;st.sel=new Set();st.fold=null;st.rev=false;st.msg=null;st.bn=3;st.bpyr=false;
    if(q.opts)st.ctrl=q.opts.map(o=>({t:o.t,ok:o.ok,id:'opt'}));
    else if(q.ty==='edges')st.ctrl=[{t:'🔍 검사 완료!',id:'chk'}];
    else if(q.ty==='build')st.ctrl=[{t:'◀ 변 −1',id:'m'},{t:'변 +1 ▶',id:'p'},{t:'🔁 기둥/뿔',id:'t'},{t:'🏭 출고!',id:'go'}];
    else st.ctrl=null;
    if(q.ty==='net'||q.ty==='opp')st.model=netModel(q.net);
    st.qmax=({edges:45,count:20,net:30,opp:30,build:50,poly:25,round:25}[q.ty])/p.pace;st.qt=st.qmax;
    p.ask('🏭 '+q.text,({edges:'모서리를 직접 콕콕 눌러요',count:'알맞은 수를 골라요',net:'예상하고 접어 봐요',opp:'전개도에서 면을 콕!',build:'변 수와 기둥/뿔을 맞춰 출고!',poly:'알맞은 수를 골라요',round:'알맞은 답을 골라요'})[q.ty]);},
  verdict(p,ok,extra){const st=p.state,q=st.q;st.lock=true;st.mood=ok?'happy':'oops';st.mT=1.6;if(ok){st.box++;st.beltBoxes.push({x:0,t:0});}
    const G=this.geo(p);p.hit(ok,{x:p.W/2,y:G.py+G.ph*.3,tip:ok?(extra&&extra.okTip):'정답: '+q.reveal+(extra&&extra.badTip?' · '+extra.badTip:''),review:q.review,tipMs:ok?1200:3000});
    let wait=ok?1100:2300;if(st.fold){const T=this.foldT(p);wait=Math.max(wait,T*1000+1500);}
    setTimeout(()=>{if(p.active)this.newQ(p);},wait);},
  foldT(p){const st=p.state;return(st.model.maxD)*.4+.55+.6;},
  startFold(p){const st=p.state;st.fold={t:0};st.foldDone=false;},
  tapCtrl(p,i){const st=p.state,q=st.q,c=st.ctrl[i];
    if(c.id==='opt'){st.pick=i;if(q.ty==='net'){this.startFold(p);st.msg=null;}this.verdict(p,c.ok);return;}
    if(c.id==='chk'){const A=new Set(q.ans);const ok=st.sel.size===A.size&&[...st.sel].every(j=>A.has(j));st.rev=true;this.verdict(p,ok,{badTip:'초록색 모서리가 정답'});return;}
    if(c.id==='m'){st.bn=Math.max(3,st.bn-1);p.Snd.tap&&p.Snd.tap();return;}if(c.id==='p'){st.bn=Math.min(8,st.bn+1);p.Snd.tap&&p.Snd.tap();return;}if(c.id==='t'){st.bpyr=!st.bpyr;p.Snd.tap&&p.Snd.tap();return;}
    if(c.id==='go'){const n=st.bn,pyr=st.bpyr;const v={face:pyr?n+1:n+2,edge:pyr?2*n:3*n,vert:pyr?n+1:2*n};const ok=q.conds.every(t=>v[t]===q.v[t]);
      this.verdict(p,ok,{badTip:`만든 것: ${PN[n]}각${pyr?'뿔':'기둥'} (면 ${v.face}, 모서리 ${v.edge}, 꼭짓점 ${v.vert})`});}},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}
    if(st.fold)st.fold.t+=dt;st.beltBoxes.forEach(b=>b.t+=dt);st.beltBoxes=st.beltBoxes.filter(b=>b.t<3);
    if(st.q&&!st.lock&&st.qmax>0){st.qt-=dt;if(st.qt<=0){st.rev=true;
      const q=st.q;if(q.ty==='net'||q.ty==='opp'){st.pick=-2;this.startFold(p);if(q.ty==='opp')st.pick=-2;}
      this.verdict(p,false,{badTip:'시간이 다 됐어요'});}}},
  /* 그림 영역 안의 도형 배치 */
  cubeBox(p){const G=this.geo(p);const S=Math.min(G.pw*.9/250,G.ph*.86/180);return{S,x0:G.px+G.pw/2-125*S,y0:G.py+G.ph/2-90*S};},
  netView(p){const G=this.geo(p),st=p.state,M=st.model;const cs=Math.min(G.pw*.9/(M.W+.2),G.ph*.9/(M.H+.2),G.u*2.6);const cx=G.px+G.pw/2,cy=G.py+G.ph/2;
    const ft=st.fold?st.fold.t:0;const T=this.foldT(p);const tilt=st.fold?clamp(ft/(T*.8),0,1)*.95:0;const yaw=st.fold&&ft>T-.5?(ft-(T-.5))*.8:0;return{cs,cx,cy,ft,tilt,yaw,T};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    factoryBg(g,W,H,u,t);
    paper(g,G.px,G.py,G.pw,G.ph,u);
    /* 남은 시간 */
    if(!st.lock&&st.qmax>0){const f=clamp(st.qt/st.qmax,0,1),bw=G.pw-u*.6,bh=Math.max(3,u*.1);K.rr(g,G.px+u*.3,G.py+u*.18,bw,bh,bh/2);g.fillStyle='rgba(15,42,82,.15)';g.fill();K.rr(g,G.px+u*.3,G.py+u*.18,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f>.4?'#3b82f6':(f>.2?'#f59e0b':'#ef4444');g.fill();}
    if(q.ty==='edges'||q.ty==='count'){const B=this.cubeBox(p);this.drawCube(g,B,q,st);}
    else if(q.ty==='net'||q.ty==='opp'){const V=this.netView(p);const fs=projectNet(st.model,V.ft,V.yaw,V.tilt,V.cx,V.cy,V.cs).sort((a,b)=>a.depth-b.depth);
      const ns=st.fold&&V.ft>V.T-.3&&q.ty==='net'&&!q.valid?normals(q.net):null;const cnt={};if(ns)ns.forEach(n=>cnt[n]=(cnt[n]||0)+1);
      for(const f of fs){const k=f.k;let fill=FCOL[k%6];if(q.ty==='opp'){fill=k===q.star?'#fde047':'#fffbeb';if(st.fold&&(k===q.ans))fill='#86efac';}
        g.fillStyle=fill;g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.05);g.lineJoin='round';g.beginPath();f.q.forEach((pt,i)=>i?g.lineTo(pt[0],pt[1]):g.moveTo(pt[0],pt[1]));g.closePath();g.fill();g.stroke();
        if(ns&&cnt[ns[k]]>1){g.strokeStyle='#ef4444';g.lineWidth=Math.max(3,u*.1);g.stroke();}
        if(q.ty==='opp'){const c=[0,1,2,3].reduce((a,i)=>[a[0]+f.q[i][0]/4,a[1]+f.q[i][1]/4],[0,0]);K.txt(g,k===q.star?'★':q.labels[k],c[0],c[1],{size:V.cs*.4,color:k===q.star?'#b45309':INK});}
        if(st.pick===k&&q.ty==='opp'){g.strokeStyle='#7c3aed';g.lineWidth=Math.max(3,u*.1);g.stroke();}}
      if(st.fold&&V.ft>V.T-.3){const bad=q.ty==='net'&&!q.valid;K.txt(g,bad?'💥 면이 겹쳐요!':(q.ty==='net'?'📦 상자 완성!':'📦 접어 보니 맞아요!'),G.px+G.pw/2,G.py+u*.9,{size:u*.6,color:bad?'#dc2626':'#15803d',stroke:'#fff',lw:u*.12});}}
    else if(q.ty==='build'){const S=Math.min(G.pw*.7/240,(G.ph-u*1.1)/200);drawPoly(g,G.px+G.pw/2-120*S,G.py+(G.ph-u*1.1)/2-100*S+u*.3,S,st.bn,st.bpyr);
      K.txt(g,`밑면: ${PN[st.bn]}각형 · ${st.bpyr?'뿔':'기둥'}`,G.px+G.pw/2,G.py+G.ph-u*.55,{size:u*.5,color:INK});}
    else{const S=Math.min(G.pw*.7/240,G.ph*.9/200);const x0=G.px+G.pw/2-120*S,y0=G.py+G.ph/2-100*S;if(q.ty==='poly')drawPoly(g,x0,y0,S,q.n,q.pyr);else drawRound(g,x0,y0,S,q.kind);}
    /* 벨트 + 상자봇 + 상자 수 */
    belt(g,G.px,G.beltY,G.pw,G.beltH*.55,t,u);for(const b of st.beltBoxes){const f=b.t/3;miniBox(g,G.px+u*2+(G.pw-u*5)*f,G.beltY+G.beltH*.2,u*.7);}
    robot(g,G.px+u*.9,G.beltY-u*.1,u*1.25,st.mood,t);
    K.card(g,G.px+G.pw-u*2.6,G.beltY-u*.55,u*2.5,u*.9,u*.2,'#0f3366',{stroke:'#7fb2ff',lw:2,blur:u*.2,dy:u*.05});miniBox(g,G.px+G.pw-u*2.2,G.beltY-u*.1,u*.5);K.txt(g,`× ${st.box}`,G.px+G.pw-u*1.1,G.beltY-u*.1,{size:u*.5,color:'#fde68a'});
    /* 컨트롤 */
    if(st.ctrl){this.ctrlRects(p).forEach((r,i)=>{const c=st.ctrl[i];const done=st.lock;let fill='#ffffff',bd='#7fb2ff',al=1;
      if(c.id==='opt'&&done){if(c.ok&&(st.rev||st.pick===i||true)){fill='#dcfce7';bd='#16a34a';}else if(st.pick===i){fill='#fee2e2';bd='#dc2626';}else al=.55;}
      if(c.id==='go'||c.id==='chk'){fill='#ff8a1f';bd='#9a3f00';}
      g.save();g.globalAlpha=al;K.card(g,r.x,r.y,r.w,r.h,u*.22,fill,{stroke:bd,lw:Math.max(2,u*.06),blur:u*.2,dy:u*.08});
      let fs=Math.min(u*.6,r.h*.42);g.font=K.font(fs);let lines=K.wrap(g,c.t,r.w-u*.5);while((lines.length*fs*1.2>r.h-u*.2||lines.some(l=>g.measureText(l).width>r.w-u*.4))&&fs>8){fs*=.92;g.font=K.font(fs);lines=K.wrap(g,c.t,r.w-u*.5);}
      g.fillStyle=(c.id==='go'||c.id==='chk')?'#2a1200':INK;g.textAlign='center';g.textBaseline='middle';lines.forEach((l,k)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(k-(lines.length-1)/2)*fs*1.2));g.restore();});}},
  drawCube(g,B,q,st){const {S,x0,y0}=B;const P=k=>[x0+VX[k][0]*S,y0+VX[k][1]*S];const poly=(ks,col,al)=>{g.fillStyle=col;if(al!=null)g.globalAlpha=al;g.beginPath();ks.forEach((k,i)=>{const p=P(k);i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);});g.closePath();g.fill();g.globalAlpha=1;};
    poly([0,1,2,3],'#fed7aa');poly([3,2,6,7],'#fdba74');poly([1,2,6,5],'#fb923c');if(q.face)poly(FACES[q.face].v,'#38bdf8',.8);
    const A=new Set(Array.isArray(q.ans)?q.ans:[]);g.lineCap='round';
    EDG.forEach(([a,b],j)=>{const hid=HID.includes(j);const dashed=q.k==='hidden'?st.sel.has(j):hid;let col='#7c2d12',w=3;
      if(j===q.hl){col='#dc2626';w=6;}else if(st.sel.has(j)&&q.k!=='hidden'){col='#7c3aed';w=6;}else if(st.sel.has(j)){col='#7c3aed';w=4;}
      if(st.rev&&A.has(j)){col='#16a34a';w=6;}else if(st.rev&&st.sel.has(j)){col='#dc2626';}
      const pa=P(a),pb=P(b);g.strokeStyle=col;g.lineWidth=Math.max(2,w*S);g.setLineDash(dashed?[7*S,6*S]:[]);g.beginPath();g.moveTo(pa[0],pa[1]);g.lineTo(pb[0],pb[1]);g.stroke();g.setLineDash([]);});},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;
    if(st.ctrl){const rs=this.ctrlRects(p);const i=rs.findIndex(r=>K.inRect(x,y,r));if(i>=0){this.tapCtrl(p,i);return;}}
    if(q.ty==='edges'){const B=this.cubeBox(p);const P=k=>[B.x0+VX[k][0]*B.S,B.y0+VX[k][1]*B.S];let best=-1,bd=1e9;
      EDG.forEach(([a,b],j)=>{const pa=P(a),pb=P(b);const dx=pb[0]-pa[0],dy=pb[1]-pa[1];const L2=dx*dx+dy*dy;let tt=((x-pa[0])*dx+(y-pa[1])*dy)/L2;tt=clamp(tt,0,1);const d=Math.hypot(pa[0]+dx*tt-x,pa[1]+dy*tt-y);if(d<bd){bd=d;best=j;}});
      if(best>=0&&bd<Math.max(p.u*.5,14)&&best!==q.hl){st.sel.has(best)?st.sel.delete(best):st.sel.add(best);p.Snd.tap&&p.Snd.tap();}return;}
    if(q.ty==='opp'){const V=this.netView(p);const fs=projectNet(st.model,0,0,0,V.cx,V.cy,V.cs);const f=fs.find(f=>inQuad(x,y,f.q));if(!f||f.k===q.star)return;st.pick=f.k;this.startFold(p);this.verdict(p,f.k===q.ans);}},
};

Engine.boot(GAME);
