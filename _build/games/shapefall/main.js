/* 4학년 1학기 수학 · 평면도형의 이동 — 도형 이동 테트리스
   디자인: 네온이 반짝이는 블록 퍼즐. 조각이 천천히 떨어져요! 밀기·뒤집기·돌리기로 바닥의 빈 곳에 꼭 맞게 넣으면 줄이 펑! 사라져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b0a26',CY='#22d3ee';
const LOGO=gkLogo('#221f5c','#22d3ee','🧩');
const LV={
  a:{t:'밀기',d:'왼쪽 · 오른쪽으로 밀어서 넣기',spd:1.0},
  b:{t:'뒤집기',d:'왼쪽·오른쪽 / 위쪽·아래쪽 뒤집기',spd:1.25},
  c:{t:'돌리기',d:'시계 방향 · 시계 반대 방향 90°',spd:1.25},
  d:{t:'섞어서 움직이기',d:'뒤집고 돌리고 밀어서 넣기',spd:1.45},
};
const ROWS=10,COLS=8,SPAWN_C=3,N3=3;
const COL=['#ef4444','#3b82f6','#facc15','#22c55e'];
const norm=pc=>{const mr=Math.min(...pc.map(c=>c[0])),mc=Math.min(...pc.map(c=>c[1]));return pc.map(([r,c])=>[r-mr,c-mc]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);};
const key=pc=>norm(pc).map(c=>c.join(':')).sort().join('|');
const flipLR=pc=>pc.map(([r,c])=>[r,N3-1-c]),flipUD=pc=>pc.map(([r,c])=>[N3-1-r,c]),rotCW=pc=>pc.map(([r,c])=>[c,N3-1-r]),rotCCW=pc=>pc.map(([r,c])=>[N3-1-c,r]);
const OPS=[['왼쪽·오른쪽으로 뒤집기',flipLR,'↔ 좌우'],['위쪽·아래쪽으로 뒤집기',flipUD,'↕ 상하'],['시계 방향으로 90° 돌리기',rotCW,'↻ 90°'],['시계 반대 방향으로 90° 돌리기',rotCCW,'↺ 90°']];
function topRun(T){const w=Math.max(...T.map(c=>c[1]))+1;for(let c=0;c<w;c++){const rs=T.filter(x=>x[1]===c).map(x=>x[0]).sort((a,b)=>a-b);if(!rs.length||rs[0]!==0)return false;for(let k=0;k<rs.length;k++)if(rs[k]!==k)return false;}return true;}
function genPiece(R){for(let t=0;t<300;t++){const cells=[[1,1]];const s=new Set(['1,1']);const n=R.int(4,5);while(cells.length<n){const[a,b]=R.pick(cells);const[dr,dc]=R.pick([[0,1],[1,0],[0,-1],[-1,0]]);const nr=a+dr,nc=b+dc;if(nr<0||nc<0||nr>2||nc>2||s.has(nr+','+nc))continue;s.add(nr+','+nc);cells.push([nr,nc]);}
    const imgs=[cells,flipLR(cells),flipUD(cells),rotCW(cells),rotCCW(cells),rotCW(rotCW(cells)),rotCW(flipLR(cells)),rotCCW(flipLR(cells))].map(key);if(new Set(imgs).size===8)return cells;}return[[0,0],[1,0],[2,0],[2,1]];}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#14123a','#2f2b7a']);const cs=u*.8;const x0=W/2-cs*4;for(let r=0;r<8;r++)for(let c=0;c<8;c++){g.strokeStyle='rgba(129,140,248,.25)';g.strokeRect(x0+c*cs,H*.1+r*cs,cs,cs);}
  const sh=[[0,0],[1,0],[2,0],[2,1]];const ph=(T%3)/3;sh.forEach(([r,c])=>{g.fillStyle='#22d3ee';K.rr(g,x0+(3+c)*cs+2,H*.1+(r+Math.floor(ph*5))*cs+2,cs-4,cs-4,4);g.fill();});for(let c=0;c<8;c++)if(c!==4&&c!==5){g.fillStyle='#64748b';K.rr(g,x0+c*cs+2,H*.1+7*cs+2,cs-4,cs-4,4);g.fill();}}
const GAME={
  id:'shapefall',title:'도형 이동 테트리스',title1:'네온 블록 퍼즐',title2:'도형 이동 테트리스',emoji:LOGO,
  subtitle:'4학년 1학기 수학 · 평면도형의 이동',
  howto:'조각이 위에서 천천히 떨어져요! <b>밀기 · 뒤집기 · 돌리기</b> 버튼으로 조각을 움직여 바닥의 빈 곳에 꼭 맞게 넣으면 줄이 펑! 사라져요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#4f46e5',c2:'#f97316'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 움직임을 연습할까요?',
  txt:{who:'누가 도전할까요?',dur:'게임 시간',pace:'떨어지는 속도',seat:'번 도전자 ',go:'게임 시작!',s1:'1. 움직임',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'4학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>밀기</b>: 도형의 모양과 크기는 그대로, 위치만 왼쪽·오른쪽·위쪽·아래쪽으로 옮겨요.</li>
    <li><b>뒤집기</b>: 오른쪽(왼쪽)으로 뒤집으면 도형의 왼쪽과 오른쪽이 서로 바뀌고, 위쪽(아래쪽)으로 뒤집으면 위와 아래가 바뀌어요.</li>
    <li><b>돌리기</b>: 시계 방향(반대 방향)으로 90° 돌리면 도형의 위쪽이 오른쪽(왼쪽)으로 가요. 돌려도 모양과 크기는 변하지 않아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,q=p.state.q;const land=W>=H*1.1;let cs,bx,by,panel;
    if(land){const availH=H-top-pad;cs=Math.min(availH/ROWS,W*.45/COLS);bx=pad+u*.5;by=top+(availH-cs*ROWS)/2;panel={x:bx+cs*COLS+pad*2,y:top,w:W-(bx+cs*COLS+pad*3),h:H-top-pad};}
    else{const availH=(H-top)*.64;cs=Math.min(availH/ROWS,(W-pad*2)/COLS);bx=(W-cs*COLS)/2;by=top+u*.1;panel={x:pad,y:by+cs*ROWS+u*.4,w:W-pad*2,h:H-(by+cs*ROWS+u*.4)-pad};}
    const L=p.levelId;const allow={a:[],b:[0,1],c:[2,3],d:[0,1,2,3]}[L];const items=[{id:'L',t:'⬅'}].concat(allow.map(k=>({id:'op'+k,t:OPS[k][2],k}))).concat([{id:'R',t:'➡'}]);
    const gap=u*.2;const rh=Math.min(u*2.3,(panel.h-gap)/2);const list=[];const n=items.length;const cols=land&&n>4?Math.ceil(n/2):n;const rows1=Math.ceil(n/cols);const rh1=Math.min(rh,(panel.h-gap*rows1)/(rows1+1));
    items.forEach((b,i)=>{const r=Math.floor(i/cols),c=i%cols;const cnt=r===rows1-1?n-cols*r:cols;const w=(panel.w-gap*(cols-1))/cols;list.push(Object.assign({},b,{x:panel.x+c*(w+gap),y:panel.y+r*(rh1+gap),w,h:rh1}));});
    list.push({id:'drop',t:'⬇ 쏙 내리기',x:panel.x,y:panel.y+rows1*(rh1+gap),w:panel.w,h:Math.min(rh1*1.2,panel.h-rows1*(rh1+gap)),go:1});
    return{W,H,u,top,pad,land,cs,bx,by,panel,list};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,lines:0,grid:[],cells:[],pr:0,pcol:SPAWN_C,log:[],done:false,acc:-1.5,ghost:false,bump:0,okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={};for(let t=0;t<300;t++){const pc=genPiece(R);let ops;if(L==='a')ops=[];else if(L==='b')ops=[R.pick([0,1])];else if(L==='c')ops=R.pick([[2],[3],[2,2]]);else ops=R.pick([[0,2],[1,3],[2,0],[3,1],[0],[2],[3],[1,2],[0,3]]);
      let T=pc;ops.forEach(k=>T=OPS[k][1](T));T=norm(T);if(L!=='a'&&key(T)===key(norm(pc)))continue;if(!topRun(T))continue;const w=Math.max(...T.map(c=>c[1]))+1,h=Math.max(...T.map(c=>c[0]))+1;const x0=R.int(0,COLS-w);if(L==='a'&&x0===SPAWN_C+Math.min(...pc.map(c=>c[1])))continue;Object.assign(q,{pc,T,w,h,x0,ops});break;}
    if(!q.pc){const pc=[[0,0],[1,0],[2,0],[2,1]];Object.assign(q,{pc,T:norm(pc),w:2,h:3,x0:5,ops:[]});}
    const how=q.ops.map(k=>OPS[k][0]);q.text={a:'조각을 <b>밀어서</b> 빈 곳에 쏙!',b:'조각을 <b>뒤집고</b> 밀어서 쏙!',c:'조각을 <b>돌리고</b> 밀어서 쏙!',d:'<b>뒤집고 · 돌리고 · 밀어서</b> 쏙!'}[L];
    q.reveal=how.length?how.join(' → ')+' 하면 맞아요':'오른쪽·왼쪽으로 밀어서 맞춰요';q.review=q.text.replace(/<[^>]+>/g,'')+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return 60;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🧩 '+q.text;},askSub(q){return '조각이 떨어지기 전에 빈 곳 모양에 맞게 움직여요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '줄이 펑! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+50*frac);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));const tset=new Set(q.T.map(([r,c])=>(ROWS-q.h+r)+','+(q.x0+c)));for(let r=ROWS-q.h;r<ROWS;r++)for(let c=0;c<COLS;c++)if(!tset.has(r+','+c))st.grid[r][c]=5;
    st.tset=[...tset].map(k=>k.split(',').map(Number));st.cells=q.pc.map(c=>c.slice());st.pr=0;st.pcol=SPAWN_C;st.log=[];st.done=false;st.acc=-1.5;st.ghost=false;st.clear=0;},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.lines+=q.h;st.clear=1;}else st.ghost=true;},
  fits(st,cells,pr,pc){return cells.every(([r,c])=>{const rr=pr+r,cc=pc+c;return cc>=0&&cc<COLS&&rr<ROWS&&(rr<0||!st.grid[rr][cc]);});},
  logOp(st,name){const l=st.log[st.log.length-1];if(l&&l[0]===name)l[1]++;else st.log.push([name,1]);},
  move(p,dc){const st=p.state;if(st.lock||st.done)return;if(this.fits(st,st.cells,st.pr,st.pcol+dc)){st.pcol+=dc;this.logOp(st,dc>0?'오른쪽으로 밀기':'왼쪽으로 밀기');p.Snd.tap&&p.Snd.tap();}else{st.bump=.25;p.Snd.tone&&p.Snd.tone(160,.08,'sine',.05);}},
  turn(p,k){const st=p.state;if(st.lock||st.done)return;const nc=OPS[k][1](st.cells);for(const dc of[0,-1,1,-2,2]){if(this.fits(st,nc,st.pr,st.pcol+dc)){st.cells=nc;st.pcol+=dc;this.logOp(st,OPS[k][0].replace('으로 ',' ').replace('90° 돌리기','90° 돌리기'));p.Snd.tone&&p.Snd.tone(660,.06,'sine',.05);return;}}st.bump=.25;},
  land(p){const st=p.state,q=st.q;st.done=true;st.cells.forEach(([r,c])=>{const rr=st.pr+r,cc=st.pcol+c;if(rr>=0)st.grid[rr][cc]=9;});let full=true;for(let r=ROWS-q.h;r<ROWS;r++)for(let c=0;c<COLS;c++)if(!st.grid[r][c])full=false;st.okFlag=full;this.verdict(p,full?0:1,false);},
  fall(p){const st=p.state;if(st.lock||st.done)return;if(this.fits(st,st.cells,st.pr+1,st.pcol))st.pr++;else this.land(p);},
  drop(p){const st=p.state;if(st.lock||st.done)return;while(this.fits(st,st.cells,st.pr+1,st.pcol))st.pr++;p.Snd.tone&&p.Snd.tone(220,.1,'sine',.06);this.land(p);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock||st.done)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));if(!b)return;if(b.id==='L')this.move(p,-1);else if(b.id==='R')this.move(p,1);else if(b.id==='drop')this.drop(p);else this.turn(p,b.k);},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.bump>0)st.bump-=dt;if(st.clear>0&&st.lock)st.clear=Math.max(0,st.clear-dt*.8);if(st.lock||st.done)return;st.acc+=Math.min(dt,.1);if(st.acc>=LV[p.levelId].spd){st.acc=0;this.fall(p);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.done)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();st.cells=q.T.map(c=>c.slice());st.pcol=q.x0;const b=G.list.find(b=>b.id==='drop');return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,cs=G.cs;if(!q)return;
    K.vgrad(g,0,0,W,H,['#14123a','#221f5c']);g.strokeStyle='rgba(129,140,248,.12)';g.lineWidth=1;for(let x=0;x<W;x+=u*1.2){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}
    g.save();K.card(g,G.bx-u*.15,G.by-u*.15,cs*COLS+u*.3,cs*ROWS+u*.3,u*.2,'#0b0a26',{stroke:st.bump>0?'#f87171':CY,lw:Math.max(3,u*.08),blur:u*.4,dy:0,sc:st.bump>0?'rgba(248,113,113,.6)':'rgba(34,211,238,.5)'});
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){const x=G.bx+c*cs,y=G.by+r*cs;g.strokeStyle='rgba(129,140,248,.2)';g.lineWidth=1;g.strokeRect(x,y,cs,cs);const v=st.grid[r][c];if(v){const clearing=st.lock&&st.okFlag&&r>=ROWS-q.h;const a=clearing?Math.abs(Math.sin(st.rT*10)):1;g.globalAlpha=clamp(a*(clearing?1-Math.max(0,st.rT-.5):1),0,1);g.fillStyle=v===5?'#64748b':COL[p.i%4];K.rr(g,x+2,y+2,cs-4,cs-4,cs*.14);g.fill();g.fillStyle='rgba(255,255,255,.22)';K.rr(g,x+2,y+2,cs-4,cs*.3,cs*.12);g.fill();g.globalAlpha=1;}}
    if(!st.done&&!st.lock||st.done&&!st.okFlag&&false){st.cells.forEach(([r,c])=>{const rr=st.pr+r,cc=st.pcol+c;if(rr<0)return;const x=G.bx+cc*cs,y=G.by+rr*cs;g.fillStyle=COL[p.i%4];K.rr(g,x+2,y+2,cs-4,cs-4,cs*.14);g.fill();g.fillStyle='rgba(255,255,255,.3)';K.rr(g,x+2,y+2,cs-4,cs*.3,cs*.12);g.fill();});
      /* 떨어질 자리 미리 보기: 모양은 알려 주지 않고 세로 가이드만 */
      const mnc=Math.min(...st.cells.map(c=>st.pcol+c[1])),mxc=Math.max(...st.cells.map(c=>st.pcol+c[1]));g.fillStyle='rgba(34,211,238,.07)';g.fillRect(G.bx+mnc*cs,G.by,(mxc-mnc+1)*cs,cs*ROWS);}
    if(st.ghost)st.tset.forEach(([r,c])=>{g.strokeStyle='#fde047';g.setLineDash([6,5]);g.lineWidth=3;g.strokeRect(G.bx+c*cs+3,G.by+r*cs+3,cs-6,cs-6);g.setLineDash([]);});
    g.restore();
    K.card(g,G.land?G.bx:G.bx,G.by-u*.1,0,0,0,'rgba(0,0,0,0)');
    K.card(g,u*.3,G.top-u*.15,u*2.9,u*.7,u*.2,'rgba(11,10,38,.9)',{stroke:CY,lw:2,blur:0,dy:0});K.txt(g,'🧱 '+st.lines+'줄',u*.3+u*1.45,G.top+u*.2,{size:u*.45,color:'#c7f9ff',maxW:u*2.6});
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.3,u*7);QZ.bar(g,W-bw-u*.3,G.top-u*.0,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:CY});}
    G.list.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,u*.2);g.fillStyle=b.go?'#f97316':'#2f2b7a';g.fill();g.lineWidth=2;g.strokeStyle=b.go?'#fdba74':CY;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.42,u*.85),color:b.go?INK:'#e0e7ff',maxW:b.w*.9});});
    if(st.lock)K.txt(g,st.okFlag?'줄이 펑! 🎉':'앗, 안 맞아요 — 점선이 정답 자리예요',G.land?G.panel.x+G.panel.w/2:W/2,G.land?G.panel.y+G.panel.h*.8:G.by+cs*ROWS*.5,{size:u*.7,color:st.okFlag?'#bef264':'#fde047',stroke:INK,lw:u*.16,maxW:G.land?G.panel.w:W*.9});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1500,badMs:3200,noShake:true});
Engine.boot(GAME);
