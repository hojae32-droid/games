/* 5학년 2학기 수학 · 합동과 대칭(선대칭도형·점대칭도형) — 데칼코마니 화가
   디자인: 물감이 번지는 화가 작업실. 모눈종이에 대칭축(또는 대칭의 중심)을 직접 긋고, 점과 선을 그리면 자동으로 대칭인 점과 선이 그려져요.
   모눈종이에 진짜로 점을 찍어 대칭도형을 완성하고, 대칭축·대칭의 중심도 직접 찾아 그려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b1f5e',VIO='#7c3aed',PINK='#e11d8c',N=10;
const PAL=['#e11d8c','#7c3aed','#0ea5e9','#16a34a','#f59e0b','#ef4444'];
const LV={
  studio:{label:'🎨 대칭 화가 놀이터',desc:'축·중심을 긋고 그리면 자동으로 대칭이 그려져요',tag:'5학년',ic:'🎨',time:0},
  line:{label:'선대칭도형 그리기',desc:'대칭축을 보고 모눈에 점을 찍어 완성해요',tag:'5학년 2학기',ic:'🦋',time:90},
  point:{label:'점대칭도형 그리기',desc:'대칭의 중심으로 180° 돌린 점을 찍어요',tag:'5학년 2학기',ic:'🌀',time:90},
  axis:{label:'대칭축 그리기',desc:'선대칭도형의 대칭축을 직접 그어요',tag:'5학년 2학기',ic:'📏',time:60},
  center:{label:'대칭의 중심 찾기',desc:'점대칭도형의 대칭의 중심을 찍어요',tag:'5학년 2학기',ic:'🎯',time:50},
  cong:{label:'합동인 도형 끼우기',desc:'합동인 조각을 돌리고 뒤집어 끼워요',tag:'5학년 2학기',ic:'🧩',time:45},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 14C18 4 6 6 6 16c0 8 10 12 18 8z" fill="#e11d8c" stroke="#3b1f5e" stroke-width="3" stroke-linejoin="round"/><path d="M24 14c6-10 18-8 18 2 0 8-10 12-18 8z" fill="#a78bfa" stroke="#3b1f5e" stroke-width="3" stroke-linejoin="round"/><path d="M24 12v28" stroke="#3b1f5e" stroke-width="3" stroke-dasharray="4 3"/></svg>';
const LABELS=['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ'];
/* ───── 기하 ───── */
const refl=(P,A,B)=>{const dx=B[0]-A[0],dy=B[1]-A[1];const t=((P[0]-A[0])*dx+(P[1]-A[1])*dy)/(dx*dx+dy*dy);const fx=A[0]+t*dx,fy=A[1]+t*dy;return[2*fx-P[0],2*fy-P[1]];};
const foot=(P,A,B)=>{const dx=B[0]-A[0],dy=B[1]-A[1];const t=((P[0]-A[0])*dx+(P[1]-A[1])*dy)/(dx*dx+dy*dy);return[A[0]+t*dx,A[1]+t*dy];};
const reflP=(P,C)=>[2*C[0]-P[0],2*C[1]-P[1]];
const key=P=>(Math.round(P[0]*2)/2)+','+(Math.round(P[1]*2)/2);
const side=(P,A,B)=>Math.sign((B[0]-A[0])*(P[1]-A[1])-(B[1]-A[1])*(P[0]-A[0]));
const inG=P=>P[0]>=-1e-9&&P[0]<=N+1e-9&&P[1]>=-1e-9&&P[1]<=N+1e-9;
const sortAng=(pts,C)=>{C=C||[pts.reduce((a,b)=>a+b[0],0)/pts.length,pts.reduce((a,b)=>a+b[1],0)/pts.length];return pts.slice().sort((a,b)=>Math.atan2(a[1]-C[1],a[0]-C[0])-Math.atan2(b[1]-C[1],b[0]-C[0]));};
const AXES={v:k=>({a:[k,0],b:[k,N],kind:'v',name:'세로 대칭축'}),h:k=>({a:[0,k],b:[N,k],kind:'h',name:'가로 대칭축'}),d1:()=>({a:[0,0],b:[N,N],kind:'d1',name:'비스듬한 대칭축'}),d2:()=>({a:[N,0],b:[0,N],kind:'d2',name:'비스듬한 대칭축'})};
/* 폴리오미노(합동 퍼즐) */
const rot=pc=>pc.map(([r,c])=>[c,-r]);const flip=pc=>pc.map(([r,c])=>[r,-c]);
const norm=pc=>{const mr=Math.min(...pc.map(c=>c[0])),mc=Math.min(...pc.map(c=>c[1]));return pc.map(([r,c])=>[r-mr,c-mc]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);};
const pkey=pc=>norm(pc).map(c=>c.join(',')).join('|');
const TF=[x=>x,rot,x=>rot(rot(x)),x=>rot(rot(rot(x))),flip,x=>flip(rot(x)),x=>flip(rot(rot(x))),x=>flip(rot(rot(rot(x))))];
const isCong=(a,b)=>TF.some(f=>pkey(f(a))===pkey(b));
const isSymP=pc=>TF.slice(1).some(f=>pkey(f(pc))===pkey(pc));
const connected=c=>{const s=new Set(c.map(x=>x.join(',')));const st=[c[0]];const seen=new Set([c[0].join(',')]);while(st.length){const[a,b]=st.pop();[[0,1],[1,0],[0,-1],[-1,0]].forEach(([x,y])=>{const k=(a+x)+','+(b+y);if(s.has(k)&&!seen.has(k)){seen.add(k);st.push([a+x,b+y]);}});}return seen.size===c.length;};
function genPc(R,n){const cells=[[0,0]];const s=new Set(['0,0']);while(cells.length<n){const[a,b]=R.pick(cells);const[d1,d2]=R.pick([[0,1],[1,0],[0,-1],[-1,0]]);const k=(a+d1)+','+(b+d2);if(s.has(k))continue;s.add(k);cells.push([a+d1,b+d2]);}const n2=norm(cells);return isSymP(n2)?genPc(R,n):n2;}
function mutate(pc,R){for(let t=0;t<50;t++){const c=pc.slice();const k=R.int(0,c.length-1);c.splice(k,1);const[a,b]=R.pick(c);const[d1,d2]=R.pick([[0,1],[1,0],[0,-1],[-1,0]]);const nk=[a+d1,b+d2];if(c.some(x=>x[0]===nk[0]&&x[1]===nk[1]))continue;c.push(nk);if(connected(c))return c;}return pc.concat([[9,9]]);}
/* ───── 문제 만들기 ───── */
function genLine(R,diag){const kind=diag?R.pick(['d1','d2']):R.pick(['v','h','v','h']);const k=R.pick([5,5,4,6]);const ax=AXES[kind](k);const sd=R.pick([-1,1]);
  for(let tr=0;tr<200;tr++){const cand=[];for(let x=0;x<=N;x++)for(let y=0;y<=N;y++){const P=[x,y];if(side(P,ax.a,ax.b)===sd&&inG(refl(P,ax.a,ax.b))){const q=foot(P,ax.a,ax.b);if(Math.hypot(P[0]-q[0],P[1]-q[1])>=.99)cand.push(P);}}
    const m=R.int(3,5);const pts=R.sample(cand,m);const onAx=[];for(let t=0;t<=N;t++){const P=kind==='v'?[k,t]:kind==='h'?[t,k]:kind==='d1'?[t,t]:[t,N-t];onAx.push(P);}const extra=R.sample(onAx,R.int(0,2));
    const all=pts.concat(extra);if(all.length<4)continue;const poly=sortAng(all);const need=pts.map(P=>refl(P,ax.a,ax.b));const used=new Set();let dup=false;need.forEach(P=>{const kk=key(P);if(used.has(kk)||pts.some(Q=>key(Q)===kk))dup=true;used.add(kk);});if(dup)continue;
    return{ty:'line',axis:ax,poly,off:pts,need,diag};}
  return genLine(R,false);}
function genPoint(R){const C=R.pick([[5,5],[5,5],[4.5,5.5],[5.5,4.5],[5,4.5],[4.5,5]]);for(let tr=0;tr<300;tr++){const cand=[];for(let x=0;x<=N;x++)for(let y=0;y<=N;y++){const P=[x,y];const Q=reflP(P,C);if(inG(Q)&&Math.hypot(P[0]-C[0],P[1]-C[1])>=1.5&&P[0]<C[0]+.01&&Math.hypot(P[0]-Q[0],P[1]-Q[1])>=3)cand.push(P);}
    const m=R.int(3,5);const pts=R.sample(cand,m);if(new Set(pts.map(key)).size<m)continue;const poly=sortAng(pts);const need=sortAng(pts.map(P=>reflP(P,C)));const nm=poly.map(P=>reflP(P,C));
    if(nm.some(Q=>pts.some(P=>key(P)===key(Q))))continue;return{ty:'point',center:C,poly,off:poly,need:nm};}
  return genPoint(R);}
function genAxis(R){const kind=R.pick(['v','h','v','h','d1','d2']);const k=R.pick([5,5,4,6]);const ax=AXES[kind](k);
  const ap=t=>kind==='v'?[k,t]:kind==='h'?[t,k]:kind==='d1'?[t,t]:[t,N-t];const nr=kind==='v'?[1,0]:kind==='h'?[0,1]:kind==='d1'?[1,-1]:[1,1];
  for(let tr=0;tr<300;tr++){const ts=R.int(1,3),te=R.int(7,9);const c=R.int(2,4);const mids=R.sample([2,3,4,5,6,7,8].filter(t=>t>ts&&t<te),c).sort((a,b)=>a-b);if(mids.length<2)continue;
    const chain=mids.map(t=>{const d=R.int(1,4);const P=ap(t);return[P[0]+d*nr[0],P[1]+d*nr[1]];});const mir=mids.map((t,i)=>{const d=(chain[i][0]-ap(t)[0])*(nr[0]||0)+(chain[i][1]-ap(t)[1])*(nr[1]||0);const dd=nr[0]&&nr[1]?(chain[i][0]-ap(t)[0])*nr[0]:(nr[0]?chain[i][0]-ap(t)[0]:chain[i][1]-ap(t)[1]);const P=ap(t);return[P[0]-dd*nr[0],P[1]-dd*nr[1]];});
    if(chain.some(inG)===false||!chain.every(inG)||!mir.every(inG))continue;const A0=ap(ts),A1=ap(te);if(!inG(A0)||!inG(A1))continue;const poly=[A0,...chain,A1,...mir.slice().reverse()];if(new Set(poly.map(key)).size!==poly.length)continue;
    const ds=chain.map((P,i)=>Math.abs(P[0]-mir[i][0])+Math.abs(P[1]-mir[i][1]));if(Math.max(...ds)<3)continue;return{ty:'axis',axis:ax,poly};}
  return genAxis(R);}
function genCenter(R){for(let tr=0;tr<300;tr++){const C=R.pick([[5,5],[5,5],[4.5,5.5],[5.5,4.5],[5,4.5],[4.5,5],[6,5],[5,6],[4,5],[5,4]]);const m=R.int(2,3);const pts=[];for(let i=0;i<m;i++){pts.push([C[0]+R.pick([-4,-3,-2,-1,1,2,3,4])*(R.f()<.5?1:1),C[1]+R.pick([-4,-3,-2,-1,0,1,2,3,4])]);}
    const all=[];pts.forEach(P=>{all.push(P,reflP(P,C));});if(!all.every(inG))continue;if(new Set(all.map(key)).size!==all.length)continue;const angs=pts.map(P=>((Math.atan2(P[1]-C[1],P[0]-C[0])%Math.PI)+Math.PI)%Math.PI);let ok=true;for(let i=0;i<m;i++)for(let j=i+1;j<m;j++)if(Math.abs(angs[i]-angs[j])<.2||Math.abs(Math.abs(angs[i]-angs[j])-Math.PI)<.2)ok=false;if(!ok)continue;
    if(all.some(P=>Math.hypot(P[0]-C[0],P[1]-C[1])<1.4))continue;return{ty:'center',center:C,poly:sortAng(all,C)};}
  return genCenter(R);}
/* ───── 그림 도구 ───── */
function hero(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const wing=(g,cx,cy,s,dir,col)=>{g.save();g.translate(cx,cy);g.scale(dir,1);g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.04);g.beginPath();g.moveTo(0,-s*.1);g.bezierCurveTo(s*.2,-s*1.1,s*1.1,-s*.9,s*.95,-s*.1);g.bezierCurveTo(s*1.0,s*.4,s*.5,s*.5,0,s*.1);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(0,s*.1);g.bezierCurveTo(s*.3,s*.5,s*.8,s*1.0,s*.55,s*.95);g.bezierCurveTo(s*.3,s*.9,s*.1,s*.6,0,s*.1);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(s*.55,-s*.35,s*.14,0,TAU);g.fill();g.restore();};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;g.fillStyle='#fbf3ff';g.fillRect(0,0,W0,H0);const cs=u*.5;g.strokeStyle='rgba(124,58,237,.12)';g.lineWidth=1;for(let x=0;x<W0;x+=cs){g.beginPath();g.moveTo(x,0);g.lineTo(x,H0);g.stroke();}for(let y=0;y<H0;y+=cs){g.beginPath();g.moveTo(0,y);g.lineTo(W0,y);g.stroke();}
    const cx=W0/2,cy=H0*.5,s=Math.min(W0*.3,H0*.4);const f=Math.abs(Math.cos(T*1.2));wing(g,cx,cy,s,1,'#e11d8c');g.save();g.globalAlpha=.9;wing(g,cx,cy,s*(.15+.85*f),-1,'#a78bfa');g.restore();g.strokeStyle='#ef4444';g.lineWidth=3;g.setLineDash([8,6]);g.beginPath();g.moveTo(cx,H0*.12);g.lineTo(cx,H0*.9);g.stroke();g.setLineDash([]);g.fillStyle=INK;K.rr(g,cx-s*.04,cy-s*.35,s*.08,s*.7,s*.04);g.fill();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'decalcomanie',title:'데칼코마니 화가',title1:'모눈종이 대칭 화가',title2:'데칼코마니 화가',emoji:LOGO,
  subtitle:'5학년 2학기 · 합동과 대칭',
  howto:'🎨 <b>놀이터</b>: 대칭축(선대칭)이나 대칭의 중심(점대칭)을 직접 긋고 그리면, 점과 선이 <b>자동으로 대칭</b>으로 그려져요!<br>🦋 <b>그리기 문제</b>: 모눈종이에 점을 콕콕 찍어 선대칭·점대칭도형을 완성하고, 대칭축·대칭의 중심도 직접 찾아 그어요.',
  how:p=>LV[p.levelId].label+' — '+LV[p.levelId].desc,
  theme:{c1:'#7c3aed',c2:'#e11d8c'},hero,vignette:.03,durs:[120,180,300],levelTitle:'어떤 그림을 그릴까요?',
  txt:{who:'누가 화가일까요?',dur:'작업 시간',pace:'생각하는 시간',seat:'번 화가 ',go:'그림 그리기 시작!',s1:'1. 작업',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 2학기',t:v.ic+' '+v.label,d:v.desc})),
  summary:`<ul><li><b>선대칭도형</b>: 한 직선을 따라 접었을 때 완전히 겹치는 도형이에요. 그 직선이 <b>대칭축</b>이에요. 서로 대응하는 점은 대칭축에서 <b>같은 거리</b>에 있고, 두 점을 이은 선분은 대칭축과 <b>수직</b>이에요.</li>
    <li><b>점대칭도형</b>: 어떤 점을 중심으로 <b>180° 돌렸을 때</b> 처음 도형과 완전히 겹치는 도형이에요. 그 점이 <b>대칭의 중심</b>이에요. 대응하는 점은 대칭의 중심에서 같은 거리에 있고, 대응점을 이은 선분은 대칭의 중심을 지나요.</li>
    <li><b>합동</b>: 모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형이에요. 돌리거나 뒤집어도 합동이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.4;const pad=u*.35;const land=W>=H*1.1;let gs,gx0,gy0,panel;
    if(land){gs=Math.min(H-top-pad-u*.1,W*.6);gx0=pad;gy0=top+(H-top-pad-gs)/2;panel={x:gx0+gs+pad,y:top,w:W-gx0-gs-pad*2,h:H-top-pad};}
    else{gs=Math.min(W-pad*2,(H-top)*.56);gx0=(W-gs)/2;gy0=top;panel={x:pad,y:top+gs+u*.3,w:W-pad*2,h:H-top-gs-u*.3-pad};}
    const cs=gs/N;return{W,H,u,land,gs,gx0,gy0,cs,panel,top,pad};},
  X(G,x){return G.gx0+x*G.cs;},Y(G,y){return G.gy0+y*G.cs;},
  snap(p,x,y,half){const G=this.geo(p);const f=half?2:1;const gx=Math.round((x-G.gx0)/G.cs*f)/f,gy=Math.round((y-G.gy0)/G.cs*f)/f;if(gx<-.4||gx>N+.4||gy<-.4||gy>N+.4)return null;return[clamp(gx,0,N),clamp(gy,0,N)];},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,pts:[],ax:null,cp:null,wrongs:0,hints:0,hint:0,chk:null,drag:null,msg:'',msgT:0,pr:{},cur:null,rotN:0,flipped:false,sel:-1,piece:null,
    S:{mode:'line',axis:null,center:null,strokes:[],dots:[],tool:'pen',col:0,cur:null,anim:0,done:0,hist:[]}});if(p.levelId!=='studio')this.newQ(p);else p.ask('🎨 <b>대칭 화가 놀이터</b>','먼저 대칭축(또는 중심)을 정하고 그려요');},
  make(p,L){const R=p.R;const st=p.state;let q;st.n0=(st.n0||0)+1;
    if(L==='line')q=genLine(R,st.n0>3&&R.f()<.4);else if(L==='point')q=genPoint(R);else if(L==='axis')q=genAxis(R);else if(L==='center')q=genCenter(R);
    else{const pc=genPc(R,R.int(4,6));const hole=norm(R.pick(TF)(pc));let piece;do{piece=norm(R.pick(TF)(pc));}while(pkey(piece)===pkey(hole));const wrong=[];let t=0;while(wrong.length<2&&t++<300){const w=norm(R.pick(TF)(mutate(pc,R)));if(!isCong(w,pc)&&!wrong.some(x=>isCong(x,w)))wrong.push(w);}
      q={ty:'cong',hole,pcs:R.shuffle([piece,...wrong]),good:piece};q.m=Math.max(...[q.hole,...q.pcs].map(x=>Math.max(...norm(x).flat())+1));}
    q.text='';q.okIdx=0;q.reveal={line:'대응하는 점은 대칭축에서 같은 거리, 반대쪽에 있어요',point:'대응하는 점은 대칭의 중심에서 같은 거리, 정반대쪽에 있어요',axis:'접었을 때 겹치는 직선이 대칭축이에요',center:'대응하는 점을 이은 선분들이 만나는 점이 대칭의 중심이에요',cong:'모양과 크기가 같은 조각을 돌리고 뒤집으면 꼭 맞아요'}[q.ty];q.review={line:'선대칭도형: 대칭축에서 같은 거리에 반대쪽 점 찍기',point:'점대칭도형: 대칭의 중심에서 같은 거리, 정반대쪽 점 찍기',axis:'선대칭도형의 대칭축 긋기',center:'점대칭도형의 대칭의 중심 찾기',cong:'합동인 조각 찾기(돌리고 뒤집기)'}[q.ty];return q;},
  qtime(){return this._p.levelId==='cong'?LV.cong.time:3600;},practice(id){return id!=='cong';},hold(p){return p.levelId!=='cong';},level(p){this._p=p;return p.levelId;},
  askHtml(q){return {line:(q.axis?'🦋 <b>'+q.axis.name+'</b>을 기준으로 선대칭이 되도록 점을 찍어요':''),point:'🌀 <b>대칭의 중심(●)</b>을 기준으로 점대칭이 되도록 점을 찍어요',axis:'📏 이 도형의 <b>대칭축</b>을 모눈 위에 그어요',center:'🎯 이 도형의 <b>대칭의 중심</b>을 찍어요',cong:'🧩 빈 자리와 <b>합동</b>인 조각을 골라 돌리고 뒤집어 끼워요'}[q.ty];},
  askSub(q){return {line:'모눈의 점을 눌러 찍어요 (다시 누르면 지워져요)',point:'모눈의 점을 눌러 찍어요 (다시 누르면 지워져요)',axis:'모눈의 점에서 점까지 끌어서 직선을 그어요',center:'모눈의 점이나 칸의 가운데를 눌러요',cong:'조각을 고르고 ↻ 돌리기, ⇋ 뒤집기'}[q.ty];},
  isOk(q,i){return i===0;},tipOf(q){return q.reveal;},goodTip(q){return '딱 맞아요! '+q.reveal;},
  ptsOf(p,q,frac){const st=p.state;return Math.max(20,Math.round(60+40*frac)-st.wrongs*15-st.hints*8);},
  onNew(p,q){const st=p.state;this._p=p;Object.assign(st,{pts:[],ax:null,cp:null,wrongs:0,hints:0,hint:0,chk:null,drag:null,sel:-1,piece:null,rotN:0,msg:'',msgT:0});},
  onVerdict(p,q,ok){const st=p.state;if(!ok)st.reveal=true;else st.reveal=false;if(q.ty==='cong'){}},
  upd(p,dt){const st=p.state;this._p=p;M_decay(st,dt);if(st.msgT>0)st.msgT-=dt;const S=st.S;if(S.anim>0)S.anim=Math.max(0,S.anim-dt);},
  /* ── 버튼 배치 ── */
  rowsFor(p){const st=p.state,L=p.levelId,S=st.S;
    if(L==='studio'){const rows=[[{id:'m_line',t:'🦋 선대칭',on:S.mode==='line'},{id:'m_point',t:'🌀 점대칭',on:S.mode==='point'}]];
      if(S.mode==='line')rows.push([{id:'a_v',t:'│ 세로'},{id:'a_h',t:'─ 가로'},{id:'a_d1',t:'╲'},{id:'a_d2',t:'╱'}]);else rows.push([{id:'c_mid',t:'● 가운데 중심'}]);
      rows.push([{id:'t_pen',t:'✏️ 점·선',on:S.tool==='pen'},{id:'t_dot',t:'● 점만',on:S.tool==='dot'},{id:'cut',t:'✂ 선 끊기'}]);rows.push(PAL.map((c,i)=>({id:'col'+i,t:'',col:c,on:S.col===i})));
      rows.push([{id:'undo',t:'↶ 되돌리기'},{id:'clear',t:'🗑 지우기'}]);rows.push([{id:'fold',t:S.mode==='line'?'🎞 접어 보기':'🎞 돌려 보기'},{id:'done',t:'⭐ 작품 완성!',hl:true}]);return rows;}
    if(L==='cong')return[[{id:'pc0',piece:0},{id:'pc1',piece:1},{id:'pc2',piece:2}],[{id:'rot',t:'↻ 돌리기'},{id:'flip',t:'⇋ 뒤집기'}],[{id:'ok',t:'🧩 끼우기!',hl:true}]];
    if(L==='axis')return[[{id:'hint',t:'💡 힌트'},{id:'clear',t:'🗑 다시'}],[{id:'ok',t:'✔ 확인!',hl:true}]];
    if(L==='center')return[[{id:'hint',t:'💡 힌트'},{id:'clear',t:'🗑 지우기'}],[{id:'ok',t:'✔ 확인!',hl:true}]];
    return[[{id:'hint',t:'💡 힌트'},{id:'undo',t:'↶ 되돌리기'}],[{id:'clear',t:'🗑 모두 지우기'}],[{id:'ok',t:'✔ 확인!',hl:true}]];},
  btns(p){const G=this.geo(p);const rows=this.rowsFor(p);const P=G.panel;const gap=G.u*.18;const rh=Math.min(G.u*(p.levelId==='cong'?2.3:1.15),(P.h-gap*(rows.length-1))/rows.length);const out=[];
    rows.forEach((row,ri)=>{const y=P.y+ri*(rh+gap);const w=(P.w-gap*(row.length-1))/row.length;row.forEach((b,i)=>out.push(Object.assign({},b,{x:P.x+i*(w+gap),y,w,h:(p.levelId==='cong'&&ri===0)?Math.min(rh,w*1.1):rh})));});return out;},
  /* ── 입력 ── */
  down(p,x,y){const st=p.state,L=p.levelId,G=this.geo(p);const b=this.btns(p).find(b=>K.inRect(x,y,b));if(b){this.press(p,b.id);return;}
    if(st.lock)return;if(L==='cong')return;const S=st.S;
    if(L==='axis'||(L==='studio'&&S.mode==='line'&&!S.axis)){const P=this.snap(p,x,y,false);if(P)st.drag={a:P,b:P};return;}
    if(L==='center'){const P=this.snap(p,x,y,true);if(P){st.cp=P;st.chk=null;M_press(st,'g',.2);}return;}
    if(L==='studio'&&S.mode==='point'&&!S.center){const P=this.snap(p,x,y,true);if(P){S.center=P;st.msg='대칭의 중심을 정했어요! 이제 그려요';st.msgT=3;}return;}
    if(L==='studio'){st.free=true;return this.studioTap(p,x,y);}
    const P=this.snap(p,x,y,false);if(!P)return;const k=key(P);const i=st.pts.findIndex(q=>key(q)===k);if(i>=0)st.pts.splice(i,1);else st.pts.push(P);st.chk=null;M_press(st,'g',.2);p.Snd.tap&&p.Snd.tap();},
  move(p,x,y,down){const st=p.state;if(st.free&&down&&p.levelId==='studio'){const S=st.S,P=this.snap(p,x,y,false);if(P){const last=S.tool==='dot'?(S.dots[S.dots.length-1]||{}).p:S.cur&&S.cur.pts[S.cur.pts.length-1];if(!last||last[0]!==P[0]||last[1]!==P[1])this.studioTap(p,x,y);}return;}if(st.drag&&down){const P=this.snap(p,x,y,false);if(P)st.drag.b=P;}},
  up(p,x,y){const st=p.state;st.free=false;const d=st.drag;st.drag=null;if(!d)return;if(d.a[0]===d.b[0]&&d.a[1]===d.b[1])return;if(p.levelId==='studio'){st.S.axis={a:d.a,b:d.b};st.msg='대칭축을 그었어요! 이제 그려요';st.msgT=3;return;}if(st.lock)return;st.ax={a:d.a,b:d.b};st.chk=null;},
  press(p,id){const st=p.state,L=p.levelId,S=st.S,q=st.q;p.Snd.tap&&p.Snd.tap();
    if(L==='studio')return this.studioBtn(p,id);
    if(st.lock||!q)return;
    if(id==='clear'){st.pts=[];st.ax=null;st.cp=null;st.chk=null;return;}if(id==='undo'){st.pts.pop();st.chk=null;return;}
    if(id==='hint'){st.hint++;st.hints++;st.msg=st.hint===1?(q.ty==='axis'?'접었을 때 양쪽이 겹치는 직선을 찾아요':q.ty==='center'?'대응하는 두 점을 이은 선분을 그어 보면 중심이 보여요':'대응하는 점까지 가는 선(점선)을 보여 줄게요'):'한 점의 자리를 흐릿하게 보여 줄게요';st.msgT=4;return;}
    if(q.ty==='cong'){if(id.startsWith('pc')){st.sel=+id.slice(2);st.piece=q.pcs[st.sel];st.rotN=0;return;}if(!st.piece)return;if(id==='rot'){st.piece=norm(rot(st.piece));st.spin=.3;return;}if(id==='flip'){st.piece=norm(flip(st.piece));st.spin=.3;return;}
      if(id==='ok'){const ok=pkey(st.piece)===pkey(q.hole);if(ok)this.verdict(p,0,false);else{st.wrongs++;const cong=isCong(st.piece,q.hole);st.msg=cong?'합동인 조각이에요! 방향을 더 돌리거나 뒤집어 봐요':'이 조각은 합동이 아니에요 (모양이 달라요)';st.msgT=3;p.hit(false,{pen:8,shake:false,quiet:true,review:q.review});if(st.wrongs>=3){this.verdict(p,1,false);}}return;}return;}
    if(id==='ok')this.check(p);},
  check(p){const st=p.state,q=st.q;let ok=false,info='';
    if(q.ty==='line'||q.ty==='point'){const need=new Set(q.need.map(key)),got=new Set(st.pts.map(key));const good=st.pts.filter(P=>need.has(key(P))),bad=st.pts.filter(P=>!need.has(key(P))),miss=q.need.filter(P=>!got.has(key(P)));st.chk={good,bad,miss};ok=!bad.length&&!miss.length;
      info=bad.length?'빨간 ✕ 점은 대응하는 점이 아니에요':'아직 찍지 않은 점이 '+miss.length+'개 있어요';}
    else if(q.ty==='axis'){if(!st.ax){st.msg='먼저 대칭축을 그어요';st.msgT=2;return;}const A=st.ax.a,B=st.ax.b;const set=new Set(q.poly.map(key));ok=q.poly.every(P=>{const R=refl(P,A,B);return Math.abs(R[0]*2-Math.round(R[0]*2))<1e-6&&Math.abs(R[1]*2-Math.round(R[1]*2))<1e-6&&set.has(key(R));});info='이 직선으로 접으면 겹치지 않아요';}
    else if(q.ty==='center'){if(!st.cp){st.msg='먼저 대칭의 중심을 찍어요';st.msgT=2;return;}ok=Math.abs(st.cp[0]-q.center[0])<1e-6&&Math.abs(st.cp[1]-q.center[1])<1e-6;info='180° 돌렸을 때 겹치는 점이 아니에요';}
    if(ok){this.verdict(p,0,false);return;}st.wrongs++;st.msg=info;st.msgT=4;p.hit(false,{pen:8,shake:false,quiet:true,review:q.review});if(st.wrongs>=3)this.verdict(p,1,false);},
  /* ── 놀이터 ── */
  studioBtn(p,id){const st=p.state,S=st.S;
    if(id==='m_line'){S.mode='line';S.axis=null;S.strokes=[];S.dots=[];S.cur=null;S.hist=[];st.msg='대칭축을 그어요 (끌어서 직선 그리기)';st.msgT=3;return;}if(id==='m_point'){S.mode='point';S.center=null;S.strokes=[];S.dots=[];S.cur=null;S.hist=[];st.msg='대칭의 중심을 눌러요';st.msgT=3;return;}
    if(id==='a_v')S.axis={a:[5,0],b:[5,N]};else if(id==='a_h')S.axis={a:[0,5],b:[N,5]};else if(id==='a_d1')S.axis={a:[0,0],b:[N,N]};else if(id==='a_d2')S.axis={a:[N,0],b:[0,N]};
    else if(id==='c_mid')S.center=[5,5];
    else if(id==='t_pen')S.tool='pen';else if(id==='t_dot')S.tool='dot';else if(id==='cut')S.cur=null;
    else if(id.startsWith('col'))S.col=+id.slice(3);
    else if(id==='undo'){const h=S.hist.pop();if(!h)return;if(h.k==='dot')S.dots.pop();else{const s=S.strokes[S.strokes.length-1];if(s){s.pts.pop();if(s.pts.length<2&&!h.keep){if(!s.pts.length)S.strokes.pop();}}S.cur=S.strokes.length?S.strokes[S.strokes.length-1]:null;if(S.cur&&S.cur.pts.length===0){S.strokes.pop();S.cur=null;}}}
    else if(id==='clear'){S.strokes=[];S.dots=[];S.cur=null;S.hist=[];}
    else if(id==='fold'){if(!(S.axis||S.center)){st.msg='먼저 대칭축(중심)을 정해요';st.msgT=2;return;}S.anim=1.6;}
    else if(id==='done'){const n=S.strokes.reduce((a,s)=>a+Math.max(0,s.pts.length-1),0)+S.dots.length;if(n<3||!(S.axis||S.center)){st.msg='대칭축을 정하고 점이나 선을 3개 이상 그려요';st.msgT=3;return;}const pts=Math.min(120,20+n*8);p.hit(true,{pts,x:p.W/2,y:p.H*.3,tip:'🎨 멋진 대칭 작품이에요! +'+pts,tipMs:1800});st.okN++;S.done++;S.anim=1.6;setTimeout(()=>{const s2=st.S;if(s2&&p.active){s2.strokes=[];s2.dots=[];s2.cur=null;s2.hist=[];}},1700);}},
  studioTap(p,x,y){const st=p.state,S=st.S;if(!(S.axis||S.center)){st.msg=S.mode==='line'?'먼저 대칭축을 그어요 (끌어서 직선 그리기)':'먼저 대칭의 중심을 눌러요';st.msgT=3;return;}const P=this.snap(p,x,y,false);if(!P)return;M_press(st,'g',.2);
    if(S.tool==='dot'){S.dots.push({p:P,col:S.col});S.hist.push({k:'dot'});return;}
    if(!S.cur){S.cur={pts:[P],col:S.col};S.strokes.push(S.cur);S.hist.push({k:'pt',keep:true});}else{const last=S.cur.pts[S.cur.pts.length-1];if(last[0]===P[0]&&last[1]===P[1])return;S.cur.pts.push(P);S.hist.push({k:'pt'});}},
  mirror(S,P){return S.mode==='line'?refl(P,S.axis.a,S.axis.b):reflP(P,S.center);},
  key(p,e){},
  botAct(p){const st=p.state,q=st.q,L=p.levelId;if(L==='studio')return null;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=(x,y)=>({k:'click',x:rc.left+x,y:rc.top+y});const bt=id=>this.btns(p).find(b=>b.id===id);
    if(q.ty==='line'||q.ty==='point'){const need=q.need.find(P=>!st.pts.some(Q=>key(Q)===key(P)));if(need)return cl(this.X(G,need[0]),this.Y(G,need[1]));const b=bt('ok');return cl(b.x+b.w/2,b.y+b.h/2);}
    if(q.ty==='center'){if(!st.cp){return cl(this.X(G,q.center[0]),this.Y(G,q.center[1]));}const b=bt('ok');return cl(b.x+b.w/2,b.y+b.h/2);}
    if(q.ty==='axis'){if(!st.ax){st.ax={a:q.axis.a,b:q.axis.b};return null;}const b=bt('ok');return cl(b.x+b.w/2,b.y+b.h/2);}
    if(q.ty==='cong'){const gi=q.pcs.findIndex(x=>x===q.good);if(st.sel!==gi){const b=bt('pc'+gi);return cl(b.x+b.w/2,b.y+b.h/2);}if(pkey(st.piece)!==pkey(q.hole)){const b=bt(Math.random()<.5?'rot':'flip');return cl(b.x+b.w/2,b.y+b.h/2);}const b=bt('ok');return cl(b.x+b.w/2,b.y+b.h/2);}return null;},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q,L=p.levelId;this._p=p;K.vgrad(g,0,0,W,H,['#fbf3ff','#f3e8ff']);
    if(L!=='cong')this.drawGrid(p,g,G);
    if(L==='studio')this.drawStudio(p,g,G);else if(q&&q.ty==='cong')this.drawCong(p,g,G);else if(q)this.drawTask(p,g,G);
    /* 버튼 */
    this.btns(p).forEach(b=>{if(b.piece!=null){const pc=q&&q.pcs[b.piece];const on=st.sel===b.piece;K.card(g,b.x,b.y,b.w,b.h,u*.2,on?'#ede9fe':'#fff',{stroke:on?VIO:INK,lw:on?5:3,blur:0,dy:0});if(pc)this.polyomino(g,pc,b.x+b.w/2,b.y+b.h/2,Math.min(b.w,b.h)*.85/(q.m||4),'#c084fc',INK);K.txt(g,String(b.piece+1),b.x+u*.35,b.y+u*.35,{size:u*.4,color:'rgba(59,31,94,.5)'});return;}
      const pr=st.pr['b'+b.id]>0;K.rr(g,b.x,b.y+(pr?u*.05:0),b.w,b.h,u*.25);g.fillStyle=b.col||(b.hl?'#f97316':b.on?'#ede9fe':'#ffffff');g.fill();g.lineWidth=b.on?5:3;g.strokeStyle=b.on?VIO:INK;g.stroke();
      if(b.t)K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2+1,{size:Math.min(b.h*.42,u*.75),color:b.hl?'#fff':INK,maxW:b.w*.9});});
    if(!st.lock&&st.qmax>0&&L==='cong'){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:VIO});}
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,G.panel.x+G.panel.w/2,G.panel.y+G.panel.h-u*.5,{size:Math.min(u*.55,G.panel.w*.07),color:'#fff',stroke:INK,lw:u*.13,maxW:G.panel.w*.98});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.3,'rgba(255,255,255,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,L==='studio'?'🎨 작품 '+(st.S.done||0)+'개':'⭐ '+(st.okN||0)+'문제 완성',u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.42,color:INK,maxW:u*3.3});},
  drawGrid(p,g,G){const st=p.state;K.card(g,G.gx0-G.u*.3,G.gy0-G.u*.3,G.gs+G.u*.6,G.gs+G.u*.6,G.u*.25,'#ffffff',{stroke:INK,lw:3,blur:G.u*.2,dy:G.u*.1});
    g.lineWidth=1.2;for(let i=0;i<=N;i++){g.strokeStyle=(i%5===0)?'rgba(124,58,237,.45)':'rgba(124,58,237,.2)';g.beginPath();g.moveTo(this.X(G,i),this.Y(G,0));g.lineTo(this.X(G,i),this.Y(G,N));g.stroke();g.beginPath();g.moveTo(this.X(G,0),this.Y(G,i));g.lineTo(this.X(G,N),this.Y(G,i));g.stroke();}
    g.fillStyle='rgba(124,58,237,.35)';for(let i=0;i<=N;i++)for(let j=0;j<=N;j++){g.beginPath();g.arc(this.X(G,i),this.Y(G,j),Math.max(1.4,G.cs*.045),0,TAU);g.fill();}},
  line(g,A,B,G,col,w,dash){const sx=this.X(G,A[0]),sy=this.Y(G,A[1]),ex=this.X(G,B[0]),ey=this.Y(G,B[1]);g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';if(dash)g.setLineDash(dash);g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.stroke();g.setLineDash([]);},
  fullAxis(g,A,B,G,col,w,dash){const dx=B[0]-A[0],dy=B[1]-A[1];const s=40;this.line(g,[A[0]-dx/Math.hypot(dx,dy)*s,A[1]-dy/Math.hypot(dx,dy)*s],[A[0]+dx/Math.hypot(dx,dy)*s,A[1]+dy/Math.hypot(dx,dy)*s],G,col,w,dash);},
  clipGrid(g,G){g.beginPath();g.rect(G.gx0-2,G.gy0-2,G.gs+4,G.gs+4);g.clip();},
  poly(g,pts,G,fill,stroke,lw){g.beginPath();pts.forEach((P,i)=>{const x=this.X(G,P[0]),y=this.Y(G,P[1]);i?g.lineTo(x,y):g.moveTo(x,y);});g.closePath();if(fill){g.fillStyle=fill;g.fill();}g.strokeStyle=stroke;g.lineWidth=lw;g.lineJoin='round';g.stroke();},
  dot(g,P,G,col,r,lab){g.fillStyle=col;g.beginPath();g.arc(this.X(G,P[0]),this.Y(G,P[1]),r,0,TAU);g.fill();g.lineWidth=2;g.strokeStyle='#fff';g.stroke();if(lab)K.txt(g,lab,this.X(G,P[0])+r*1.9,this.Y(G,P[1])-r*1.9,{size:Math.max(11,r*2.3),color:INK,stroke:'#fff',lw:3});},
  drawTask(p,g,G){const st=p.state,q=st.q,t=st.T,u=G.u;const r=Math.max(4,G.cs*.16);const rev=st.lock&&st.reveal;
    g.save();this.clipGrid(g,G);
    const ax=q.axis;
    if(q.ty==='line'){this.fullAxis(g,ax.a,ax.b,G,'#ef4444',Math.max(3,G.cs*.1),[G.cs*.3,G.cs*.2]);}
    if(q.ty==='axis'&&st.lock&&st.res==='bad')this.fullAxis(g,ax.a,ax.b,G,'#16a34a',Math.max(4,G.cs*.12),[G.cs*.3,G.cs*.2]);
    if(q.ty==='point'||q.ty==='center'){const C=q.center;if(q.ty==='point'||(st.lock&&st.res==='bad')){g.fillStyle='#f97316';g.beginPath();g.arc(this.X(G,C[0]),this.Y(G,C[1]),r*1.4,0,TAU);g.fill();g.lineWidth=3;g.strokeStyle='#fff';g.stroke();}}
    /* 도형 */
    let polyPts=q.poly;let alpha=1;
    if(q.ty==='axis'||q.ty==='center'){this.poly(g,q.poly,G,'rgba(96,165,250,.35)','#1d4ed8',Math.max(3,G.cs*.09));if(q.ty==='center')q.poly.forEach(P=>this.dot(g,P,G,'#1d4ed8',r*.8));}
    else{this.poly(g,q.poly,G,'rgba(96,165,250,.35)','#1d4ed8',Math.max(3,G.cs*.09));q.poly.forEach((P,i)=>{const oi=q.off.findIndex(Q=>key(Q)===key(P));this.dot(g,P,G,'#1d4ed8',r*.9,oi>=0?LABELS[oi]:null);});}
    /* 힌트 */
    if((q.ty==='line'||q.ty==='point')&&st.hint>=1){q.off.forEach((P,i)=>{const M2=q.need[q.ty==='line'?i:q.poly.findIndex(Q=>key(Q)===key(P))];const tgt=q.ty==='line'?foot(P,ax.a,ax.b):q.center;g.strokeStyle='rgba(239,68,68,.55)';g.lineWidth=2;g.setLineDash([6,5]);g.beginPath();g.moveTo(this.X(G,P[0]),this.Y(G,P[1]));const m=q.ty==='line'?q.need[i]:reflP(P,q.center);g.lineTo(this.X(G,m[0]),this.Y(G,m[1]));g.stroke();g.setLineDash([]);});}
    if((q.ty==='line'||q.ty==='point')&&st.hint>=2){const miss=q.need.find(P=>!st.pts.some(Q=>key(Q)===key(P)));if(miss){g.fillStyle='rgba(245,158,11,.5)';g.beginPath();g.arc(this.X(G,miss[0]),this.Y(G,miss[1]),r*1.8,0,TAU);g.fill();}}
    if(q.ty==='center'&&st.hint>=1){const pr=q.poly;for(let i=0;i<pr.length/2;i++){const A=pr[i],B=reflP(A,q.center);g.strokeStyle='rgba(239,68,68,.5)';g.lineWidth=2;g.setLineDash([6,5]);g.beginPath();g.moveTo(this.X(G,A[0]),this.Y(G,A[1]));g.lineTo(this.X(G,B[0]),this.Y(G,B[1]));g.stroke();g.setLineDash([]);}}
    if(q.ty==='axis'&&st.hint>=2){const A=q.axis.a,B=q.axis.b;K.txt(g,q.axis.kind==='v'?'세로 방향이에요':q.axis.kind==='h'?'가로 방향이에요':'비스듬한 방향이에요',this.X(G,5),this.Y(G,.6),{size:G.cs*.7,color:'#16a34a',stroke:'#fff',lw:4,maxW:G.gs*.8});}
    /* 학생이 찍은 점 / 직선 / 중심 */
    if(q.ty==='line'||q.ty==='point'){const chk=st.chk;st.pts.forEach(P=>{const bad=chk&&chk.bad.some(Q=>key(Q)===key(P));const good=chk&&chk.good.some(Q=>key(Q)===key(P));this.dot(g,P,G,bad?'#ef4444':good?'#16a34a':PINK,r*1.1);if(bad){K.txt(g,'✕',this.X(G,P[0]),this.Y(G,P[1]),{size:r*2.6,color:'#fff'});}});
      if(chk)chk.miss.forEach(P=>{g.strokeStyle='#f59e0b';g.lineWidth=3;g.setLineDash([4,4]);g.beginPath();g.arc(this.X(G,P[0]),this.Y(G,P[1]),r*1.7,0,TAU);g.stroke();g.setLineDash([]);});
      if(rev){q.need.forEach(P=>this.dot(g,P,G,'#16a34a',r*1.1));this.poly(g,q.ty==='line'?sortAng(q.poly.map(P=>q.off.some(Q=>key(Q)===key(P))?refl(P,ax.a,ax.b):P)):q.need,G,'rgba(22,163,74,.22)','#16a34a',Math.max(3,G.cs*.09));}
      if(st.lock&&st.res==='ok'){const f=Math.min(1,st.rT/1.1);this.fold(g,G,q,f);}}
    if(q.ty==='axis'){const A=st.drag?st.drag.a:(st.ax&&st.ax.a),B=st.drag?st.drag.b:(st.ax&&st.ax.b);if(A&&B&&(A[0]!==B[0]||A[1]!==B[1])){this.fullAxis(g,A,B,G,PINK,Math.max(4,G.cs*.12));this.dot(g,A,G,PINK,r);this.dot(g,B,G,PINK,r);}
      if(st.lock&&st.res==='ok'){const f=Math.min(1,st.rT/1.1);this.fold(g,G,q,f);}}
    if(q.ty==='center'){if(st.cp){g.strokeStyle=PINK;g.lineWidth=4;const cx=this.X(G,st.cp[0]),cy=this.Y(G,st.cp[1]);g.beginPath();g.arc(cx,cy,r*1.8,0,TAU);g.stroke();g.fillStyle=PINK;g.beginPath();g.arc(cx,cy,r*.8,0,TAU);g.fill();}
      if(st.lock&&st.res==='ok'){const f=Math.min(1,st.rT/1.1);this.fold(g,G,q,f);}}
    g.restore();
    if(st.lock&&st.res==='ok')K.txt(g,{line:'접어 보면 꼭 겹쳐요!',point:'180° 돌리면 꼭 겹쳐요!',axis:'접으면 꼭 겹쳐요!',center:'180° 돌리면 꼭 겹쳐요!'}[q.ty],G.gx0+G.gs/2,G.gy0+G.gs*.06,{size:G.cs*.8,color:'#16a34a',stroke:'#fff',lw:5,maxW:G.gs*.9});},
  /* 접기·돌리기 애니메이션 */
  fold(g,G,q,f){const th=f*Math.PI;g.save();g.globalAlpha=.65;let pts;
    if(q.ty==='line'||q.ty==='axis'){const A=q.axis.a,B=q.axis.b;pts=q.poly.map(P=>{const F=foot(P,A,B);const c=Math.cos(th);return[F[0]+(P[0]-F[0])*c,F[1]+(P[1]-F[1])*c];});if(q.ty==='line')pts=q.poly.map(P=>{const F=foot(P,A,B);const c=Math.cos(th);return[F[0]+(P[0]-F[0])*c,F[1]+(P[1]-F[1])*c];});}
    else{const C=q.center;pts=q.poly.map(P=>{const dx=P[0]-C[0],dy=P[1]-C[1],c=Math.cos(th),s=Math.sin(th);return[C[0]+dx*c-dy*s,C[1]+dx*s+dy*c];});}
    this.poly(g,pts,G,'rgba(225,29,140,.35)',PINK,Math.max(3,G.cs*.08));g.restore();},
  /* 합동 퍼즐 */
  polyomino(g,pc,cx,cy,cell,fill,stroke,dashed){const n=norm(pc);const R=Math.max(...n.map(c=>c[0]))+1,C=Math.max(...n.map(c=>c[1]))+1;const ox=cx-C*cell/2,oy=cy-R*cell/2;n.forEach(([r,c])=>{g.fillStyle=fill;g.fillRect(ox+c*cell,oy+r*cell,cell,cell);g.lineWidth=Math.max(2,cell*.07);g.strokeStyle=stroke;if(dashed)g.setLineDash([cell*.2,cell*.14]);g.strokeRect(ox+c*cell,oy+r*cell,cell,cell);g.setLineDash([]);});},
  drawCong(p,g,G){const st=p.state,q=st.q,u=G.u;const gx=G.gx0,gy=G.gy0,gs=G.gs;K.card(g,gx-u*.3,gy-u*.3,gs+u*.6,gs+u*.6,u*.25,'#ffffff',{stroke:INK,lw:3,blur:u*.2,dy:u*.1});
    const cell=Math.min(gs*.4/q.m,u*2.4);const lx=gx+gs*.26,rx=gx+gs*.74,cy=gy+gs*.5;K.txt(g,'빈 자리',lx,gy+gs*.08,{size:u*.7,color:VIO,maxW:gs*.4});K.txt(g,'내 조각',rx,gy+gs*.08,{size:u*.7,color:'#f97316',maxW:gs*.4});
    this.polyomino(g,q.hole,lx,cy,cell,'#ede9fe',VIO,true);K.txt(g,'⬅',gx+gs*.5,cy,{size:u*1.2,color:INK});
    const fit=st.lock&&st.res==='ok';if(st.piece){const sp=st.spin>0?1+st.spin*.4:1;g.save();g.translate(rx,cy);g.scale(sp,sp);g.translate(-rx,-cy);this.polyomino(g,st.piece,fit?lx:rx,cy,cell,fit?'#86efac':'#fb923c','#3b0764');g.restore();}else K.txt(g,'조각을 골라요',rx,cy,{size:u*.6,color:'rgba(59,31,94,.5)',maxW:gs*.4});
    if(st.lock&&st.res==='bad'){this.polyomino(g,q.hole,rx,cy+cell*q.m*.9,cell*.6,'#86efac','#166534');K.txt(g,'정답 모양',rx,cy+cell*q.m*.9-cell*q.m*.4,{size:u*.5,color:'#166534'});}
    if(st.spin>0)st.spin-=.03;},
  /* 놀이터 */
  drawStudio(p,g,G){const st=p.state,S=st.S,u=G.u;const r=Math.max(4,G.cs*.13);g.save();this.clipGrid(g,G);
    if(S.mode==='line'&&S.axis)this.fullAxis(g,S.axis.a,S.axis.b,G,'#ef4444',Math.max(3,G.cs*.1),[G.cs*.3,G.cs*.2]);
    if(S.mode==='point'&&S.center){g.fillStyle='#f97316';g.beginPath();g.arc(this.X(G,S.center[0]),this.Y(G,S.center[1]),r*1.6,0,TAU);g.fill();g.lineWidth=3;g.strokeStyle='#fff';g.stroke();}
    if(st.drag){this.fullAxis(g,st.drag.a,st.drag.b,G,'rgba(239,68,68,.6)',Math.max(3,G.cs*.1),[G.cs*.3,G.cs*.2]);}
    const has=S.axis||S.center;const anim=S.anim>0?(1-S.anim/1.6):1;
    const mir=P=>has?this.mirror(S,P):null;
    S.strokes.forEach(s=>{const col=PAL[s.col];g.strokeStyle=col;g.lineWidth=Math.max(4,G.cs*.14);g.lineCap='round';g.lineJoin='round';g.beginPath();s.pts.forEach((P,i)=>{const x=this.X(G,P[0]),y=this.Y(G,P[1]);i?g.lineTo(x,y):g.moveTo(x,y);});g.stroke();s.pts.forEach(P=>{g.fillStyle=col;g.beginPath();g.arc(this.X(G,P[0]),this.Y(G,P[1]),r,0,TAU);g.fill();});
      if(has){const f=S.anim>0?Math.min(1,anim*1.2):1;const th=(1-f)*Math.PI;const mp=P=>{const M2=mir(P);if(S.anim<=0)return M2;if(S.mode==='line'){const F=foot(P,S.axis.a,S.axis.b);const c=Math.cos(th);return[F[0]+(P[0]-F[0])*c,F[1]+(P[1]-F[1])*c];}const C=S.center,dx=P[0]-C[0],dy=P[1]-C[1],c=Math.cos(Math.PI-th),sn=Math.sin(Math.PI-th);return[C[0]+dx*c-dy*sn,C[1]+dx*sn+dy*c];};
        g.strokeStyle=col;g.globalAlpha=.8;g.beginPath();s.pts.forEach((P,i)=>{const M2=mp(P);const x=this.X(G,M2[0]),y=this.Y(G,M2[1]);i?g.lineTo(x,y):g.moveTo(x,y);});g.stroke();s.pts.forEach(P=>{const M2=mp(P);g.fillStyle=col;g.beginPath();g.arc(this.X(G,M2[0]),this.Y(G,M2[1]),r,0,TAU);g.fill();});g.globalAlpha=1;
        if(S.guide)s.pts.forEach(P=>{const M2=mir(P);g.strokeStyle='rgba(239,68,68,.35)';g.lineWidth=1.5;g.setLineDash([5,5]);g.beginPath();g.moveTo(this.X(G,P[0]),this.Y(G,P[1]));g.lineTo(this.X(G,M2[0]),this.Y(G,M2[1]));g.stroke();g.setLineDash([]);});}});
    S.dots.forEach(d=>{const col=PAL[d.col];g.fillStyle=col;g.beginPath();g.arc(this.X(G,d.p[0]),this.Y(G,d.p[1]),r*1.5,0,TAU);g.fill();if(has){const M2=mir(d.p);g.globalAlpha=.8;g.beginPath();g.arc(this.X(G,M2[0]),this.Y(G,M2[1]),r*1.5,0,TAU);g.fill();g.globalAlpha=1;}});
    if(S.cur&&S.cur.pts.length){const L2=S.cur.pts[S.cur.pts.length-1];g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(this.X(G,L2[0]),this.Y(G,L2[1]),r*1.8,0,TAU);g.stroke();}
    g.restore();
    if(!has)K.txt(g,S.mode==='line'?'① 대칭축 긋기: 모눈의 점에서 점까지 끌어요 (또는 버튼)':'① 대칭의 중심을 눌러요',G.gx0+G.gs/2,G.gy0+G.gs*.5,{size:G.cs*.62,color:'#fff',stroke:INK,lw:5,maxW:G.gs*.92});
    else if(!S.strokes.length&&!S.dots.length)K.txt(g,'② 모눈의 점을 눌러 그려요! 반대쪽에 자동으로 그려져요',G.gx0+G.gs/2,G.gy0+G.gs*.94,{size:G.cs*.55,color:'#fff',stroke:INK,lw:5,maxW:G.gs*.92});},
};
function M_press(st,k,ms){st.pr=st.pr||{};st.pr[k]=ms||.15;}
function M_decay(st,dt){if(!st.pr)return;for(const k in st.pr){st.pr[k]-=dt;if(st.pr[k]<=0)delete st.pr[k];}}
QZ.mix(GAME,{say:false,pts0:60,pts1:40,okMs:2200,badMs:2800});
Engine.boot(GAME);
