/* 3~4학년 사회 · 동서남북 방위 · 8방위 — 방위 탐험대
   디자인: 보물 지도. 돌아가는 방위표를 보고 탐험가가 마을을 걸어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#4a2f12';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff7e0" stroke="#4a2f12" stroke-width="3.5"/><path d="M24 8l5 16-5 3-5-3z" fill="#dc2626" stroke="#4a2f12" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 40l5-16-5-3-5 3z" fill="#fef3c7" stroke="#4a2f12" stroke-width="2.2" stroke-linejoin="round"/><circle cx="24" cy="24" r="2.5" fill="#4a2f12"/></svg>';
const DECKS=/*@@DECKS@@*/;
const N=5;
const PLACES=[['🏫','학교'],['🏥','병원'],['📮','우체국'],['🚓','경찰서'],['🚒','소방서'],['🏛️','시청'],['📚','도서관'],['🌳','공원'],['🛒','시장'],['🚉','기차역'],['⛰️','산'],['🌾','논'],['🍎','과수원'],['🐄','목장'],['🎡','놀이공원'],['🏟️','체육관'],['🏠','우리 집'],['🍞','빵집'],['🏊','수영장'],['🗼','전망대']];
const W_DIRS=[['북',0,1],['남',0,-1],['동',1,0],['서',-1,0]];
const W_DIAG=[['북동',1,1],['남동',1,-1],['남서',-1,-1],['북서',-1,1]];
const PADK=[[-1,-1,'↖'],[0,-1,'↑'],[1,-1,'↗'],[-1,0,'←'],[0,0,''],[1,0,'→'],[-1,1,'↙'],[0,1,'↓'],[1,1,'↘']];
function parchment(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#cfe9e4','#e6f3ef','#f4e7c4']);
  g.save();g.globalAlpha=.18;g.strokeStyle='#0f766e';g.lineWidth=2;for(let k=0;k<6;k++){g.beginPath();for(let x=0;x<=W;x+=20){const y=H*(.1+k*.16)+Math.sin(x/60+t*.6+k)*8;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}g.restore();}
function rose(g,cx,cy,r,rot,d8,t){g.save();g.translate(cx,cy);const lw=Math.max(2,r*.05);
  g.beginPath();g.arc(0,0,r,0,TAU);g.fillStyle='#fffaf0';g.fill();g.lineWidth=lw*1.4;g.strokeStyle=INK;g.stroke();g.beginPath();g.arc(0,0,r*.62,0,TAU);g.fillStyle='#fdf0cf';g.fill();g.lineWidth=lw*.6;g.stroke();
  const scr=(e,n)=>{let x=e,y=-n;for(let k=0;k<rot;k++)[x,y]=[-y,x];return[x,y];};
  const [nx,ny]=scr(0,1);const ang=Math.atan2(ny,nx)+Math.PI/2;
  g.save();g.rotate(ang);g.lineJoin='round';g.lineWidth=lw;g.fillStyle='#dc2626';g.beginPath();g.moveTo(0,-r*.6);g.lineTo(r*.14,0);g.lineTo(0,-r*.06);g.lineTo(-r*.14,0);g.closePath();g.fill();g.stroke();g.fillStyle='#fffaf0';g.beginPath();g.moveTo(0,r*.6);g.lineTo(r*.14,0);g.lineTo(0,r*.06);g.lineTo(-r*.14,0);g.closePath();g.fill();g.stroke();g.restore();
  g.fillStyle=INK;g.beginPath();g.arc(0,0,r*.07,0,TAU);g.fill();
  W_DIRS.forEach(([d,e,n])=>{const[x,y]=scr(e,n);K.txt(g,d,x*r*.8,y*r*.8,{size:r*.34,color:d==='북'?'#dc2626':INK,stroke:'#fffaf0',lw:r*.08});});
  if(d8)W_DIAG.forEach(([d,e,n])=>{const[x,y]=scr(e,n);g.fillStyle=INK;g.beginPath();g.arc(x*r*.76,y*r*.76,r*.05,0,TAU);g.fill();});
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;parchment(g,W,H,u,T);
    const r=Math.min(W*.2,H*.26);rose(g,W*.5,H*.62,r,Math.floor(T/3)%4,true,T);
    const pl=['🏫','🏥','🌳','🏛️','🚉','⛰️'];pl.forEach((e,i)=>{const a=-Math.PI/2+i/6*TAU+T*.15;K.emo(g,e,W*.5+Math.cos(a)*r*1.8*(wide?1.3:1),H*.62+Math.sin(a)*r*1.5,Math.min(u*1.1,r*.6));});
    K.emo(g,'🚶',W*.5+Math.sin(T)*r*.2,H*.62-r*.15+Math.abs(Math.sin(T*4))*-4,r*.35);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'compass',title:'방위 탐험대',title1:'보물 지도 모험',title2:'방위 탐험대',emoji:LOGO,
  subtitle:'3~4학년 사회 · 동서남북 방위 · 8방위',
  howto:'🚶 <b>길 찾기</b>: 방위표를 보고 화살표로 움직여 목적지에 가요. 📍 <b>바로 옆 찾기</b>: 말한 방향 바로 옆 칸을 눌러요. 방위표가 돌아가면 북쪽이 달라지니 꼭 확인해요! 방향을 틀리면 점수가 줄어요.',
  how:p=>({d4:'<b>동서남북</b> 4방위로 길을 찾아요',d4r:'<b>돌아가는 방위표</b>로 길을 찾아요',d8:'<b>8방위</b> (북동·남동·남서·북서)'}[p.levelId]),
  theme:{c1:'#0f766e',c2:'#b45309'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 지도를 탐험할까요?',
  txt:{who:'누가 탐험할까요?',dur:'탐험 시간',pace:'한 문제 시간',seat:'번 탐험가 ',go:'탐험 출발!',s1:'1. 지도',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'3~4학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>방위</b>는 동서남북처럼 방향을 나타내는 말이에요. 방위표(나침반)에서 <b>북쪽</b>을 먼저 찾으면 나머지 방향을 알 수 있어요.</li>
    <li>북쪽을 보고 서면 <b>오른쪽이 동쪽, 왼쪽이 서쪽, 뒤가 남쪽</b>이에요. 지도는 보통 위쪽이 북쪽이지만, 방위표가 있으면 방위표를 따라요.</li>
    <li>4방위 사이의 <b>북동·남동·남서·북서</b>까지 합쳐 <b>8방위</b>라고 해요.</li>
    <li>“학교의 동쪽”처럼 기준이 되는 곳을 먼저 정하고 방위를 찾아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.15;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const d8=p.levelId==='d8';let bd,info,pd,rs;
    if(land){const S=Math.min(A,W*.42);bd={x:W*.5-S/2,y:Z0+(A-S)/2,w:S,h:S};const lw=bd.x-pad*2;info={x:pad,y:Z0,w:lw,h:A};rs=Math.min(lw*.36,A*.26);const pw=W-(bd.x+S)-pad*2;const ps=Math.min(pw,A*.5);pd={x:bd.x+S+pad+(pw-ps)/2,y:Z0+A-ps,w:ps,h:ps};}
    else{const infoH=A*.2;const S=Math.min(W-pad*2,A*.5);const padS=Math.min(A-infoH-S-gap*2,W*.5);info={x:pad,y:Z0,w:W-pad*2,h:infoH};bd={x:W/2-S/2,y:Z0+infoH+gap,w:S,h:S};const ps=Math.max(u*4,Math.min(padS,W*.5));pd={x:W/2-ps/2,y:H-pad-ps,w:ps,h:ps};rs=Math.min(infoH*.45,W*.14);}
    const cell=bd.w/N;const pk=pd.w/3;const keys=PADK.filter(k=>k[2]).map(([x,y,a])=>({x:pd.x+(x+1)*pk,y:pd.y+(y+1)*pk,w:pk,h:pk,dx:x,dy:y,a,hide:!!(x&&y&&!d8)}));
    return{W,H,u,Z0,land,pad,gap,bd,cell,info,pd,keys,rs,d8};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,grid:[],rot:0,pos:[2,2],tp:[2,2],missions:0,mis:0,banner:'',bannerT:0,shake:0,msg:'',press:null,rotAnim:0});
    this.rotOn=p.levelId!=='d4';this.newTown(p,true);p.ask('🧭 방위표를 보고 탐험해요!','화살표로 걷거나 지도를 눌러요');this.newQ(p);},
  toScreen(rot,e,n){let x=e,y=-n;for(let k=0;k<rot;k++)[x,y]=[-y,x];return[x,y];},toWorld(rot,x,y){for(let k=0;k<rot;k++)[x,y]=[y,-x];return[x,-y];},
  newTown(p,first){const st=p.state,R=p.R;const d8=p.levelId==='d8';const pool=R.shuffle(PLACES.slice()).slice(0,11);const cells=R.shuffle([...Array(N*N).keys()]).slice(0,11);st.grid=Array(N*N).fill(null);cells.forEach((c,i)=>st.grid[c]=pool[i]);
    if(this.rotOn&&!first){let r;do{r=R.int(0,3);}while(r===st.rot);st.rot=r;st.banner='🔄 방위표가 돌아갔어요! 북쪽을 확인해요';st.bannerT=1.9;}else if(this.rotOn&&first)st.rot=R.int(1,3);else if(!first){st.banner='🏘️ 새 마을에 왔어요';st.bannerT=1.4;}},
  lm(st){return st.grid.map((c,i)=>c?i:-1).filter(i=>i>=0);},
  make(p,L){const st=p.state,R=p.R;const d8=p.levelId==='d8';if(st.missions>0&&st.missions%4===0)this.newTown(p,false);st.missions++;const Lm=this.lm(st);const xy=i=>[i%N,Math.floor(i/N)];const idx=(x,y)=>y*N+x;const typeA=R.f()<.6;
    if(typeA){let tries=0,s,t,d;do{s=Lm[R.int(0,Lm.length-1)];t=Lm[R.int(0,Lm.length-1)];const a=xy(s),b=xy(t);d=[b[0]-a[0],b[1]-a[1]];tries++;}while(tries<300&&(s===t||(d8?(Math.max(Math.abs(d[0]),Math.abs(d[1]))>3||Math.abs(d[0])+Math.abs(d[1])<2):(Math.abs(d[0])+Math.abs(d[1])>4||Math.abs(d[0])+Math.abs(d[1])<2))));
      const [e,n]=this.toWorld(st.rot,d[0],d[1]);const parts=[];const ns=n>0?'북':'남',ew=e>0?'동':'서';
      if(d8&&e&&n){const k=Math.min(Math.abs(e),Math.abs(n));parts.push(`${ns}${ew}쪽으로 ${k}칸`);const re=Math.abs(e)-k,rn=Math.abs(n)-k;if(re)parts.push(`${ew}쪽으로 ${re}칸`);if(rn)parts.push(`${ns}쪽으로 ${rn}칸`);}else{if(n)parts.push(`${ns}쪽으로 ${Math.abs(n)}칸`);if(e)parts.push(`${ew}쪽으로 ${Math.abs(e)}칸`);if(R.f()<.5)parts.reverse();}
      const sp=st.grid[s],gp=st.grid[t];return{ty:'A',s,t,parts,qt:d8?24:20,sp,gp,text:`${sp[1]}에서 출발! ${parts.join(' → ')}`,okIdx:1,reveal:gp[1],review:`${sp[1]}에서 출발, ${parts.join(' → ')} → ${gp[1]}`,speak:`${sp[1]}에서 출발. ${parts.join(', ')}`};}
    const dirs=d8?W_DIRS.concat(W_DIAG):W_DIRS;const opts=[];Lm.forEach(s=>dirs.forEach(([nm,e,n])=>{const[x,y]=this.toScreen(st.rot,e,n),a=xy(s),b=[a[0]+x,a[1]+y];if(b[0]>=0&&b[0]<N&&b[1]>=0&&b[1]<N&&st.grid[idx(b[0],b[1])])opts.push([s,nm,idx(b[0],b[1])]);}));
    if(!opts.length){this.newTown(p,false);st.missions--;return this.make(p,L);}const[s,nm,t]=opts[R.int(0,opts.length-1)];const sp=st.grid[s],gp=st.grid[t];
    return{ty:'B',s,t,nm,qt:d8?14:12,sp,gp,text:`${sp[1]}의 바로 ${nm}쪽 옆 칸에 있는 곳은?`,okIdx:t,reveal:gp[1],review:`${sp[1]}의 바로 ${nm}쪽 → ${gp[1]}`,speak:`${sp[1]}의 바로 ${nm}쪽 옆 칸에 있는 곳은?`};},
  qtime(q){return q.qt;},askHtml(q){return q.ty==='A'?'🚶 길 찾기: '+q.sp[1]+'에서 출발!':'📍 바로 옆 찾기';},askSub(q){return q.ty==='A'?q.parts.join(' → ')+' — 어디에 도착할까요?':q.sp[1]+'의 바로 '+q.nm+'쪽 옆 칸을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.gp[0]+' '+q.reveal;},
  ptsOf(p,q,frac){return Math.max(25,50+Math.round(50*frac)-(p.state.mis||0)*15);},
  onNew(p,q){const st=p.state;st.mis=0;st.msg='';if(q.ty==='A'){st.pos=this.xy(q.s);st.tp=st.pos.slice();}},
  xy(i){return[i%N,Math.floor(i/N)];},
  onVerdict(p,q,ok){const st=p.state;if(q.ty==='A'&&!ok)st.tp=this.xy(q.t);st.msg=ok?q.gp[0]+' '+q.gp[1]+'에 도착! 정답이에요':'정답은 '+q.gp[0]+' '+q.gp[1]+'였어요';},
  upd(p,dt){const st=p.state;if(st.bannerT>0)st.bannerT-=dt;if(st.shake>0)st.shake-=dt;st.pos=[st.pos[0]+(st.tp[0]-st.pos[0])*Math.min(1,dt*10),st.pos[1]+(st.tp[1]-st.pos[1])*Math.min(1,dt*10)];},
  dist(a,b,d8){const dx=Math.abs(a[0]-b[0]),dy=Math.abs(a[1]-b[1]);return d8?Math.max(dx,dy):dx+dy;},
  move(p,dx,dy){const st=p.state,q=st.q;if(!q||st.lock||q.ty!=='A')return;const d8=p.levelId==='d8';if(!d8&&dx&&dy)return;const cur=st.tp,goal=this.xy(q.t);const np=[cur[0]+dx,cur[1]+dy];
    if(np[0]<0||np[0]>=N||np[1]<0||np[1]>=N||this.dist(np,goal,d8)>=this.dist(cur,goal,d8)){st.mis++;st.shake=.4;p.Snd.bad&&p.Snd.bad();st.msg='앗, 그쪽이 아니에요! 방위표를 다시 봐요';return;}
    p.Snd.tone&&p.Snd.tone(520,.05,'triangle',.03);st.tp=np;st.msg='';if(np[0]===goal[0]&&np[1]===goal[1])this.verdict(p,1,false);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.ty==='A'){const k=G.keys.find(k=>!k.hide&&K.inRect(x,y,k));if(k){st.press={k:k.a,t:.12};this.move(p,k.dx,k.dy);}return;}
    const bd=G.bd;if(K.inRect(x,y,bd)){const c=Math.floor((x-bd.x)/G.cell),r=Math.floor((y-bd.y)/G.cell);const i=r*N+c;if(i===q.t)this.verdict(p,i,false);else{st.wrongI=i;this.verdict(p,i,false);}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(q.ty==='B'){const c=[q.t%N,Math.floor(q.t/N)];return{k:'click',x:rc.left+G.bd.x+(c[0]+.5)*G.cell,y:rc.top+G.bd.y+(c[1]+.5)*G.cell};}
    const cur=st.tp,goal=this.xy(q.t);const dx=Math.sign(goal[0]-cur[0]),dy=Math.sign(goal[1]-cur[1]);const d8=p.levelId==='d8';let kk;
    if(d8&&dx&&dy)kk=G.keys.find(k=>k.dx===dx&&k.dy===dy);if(!kk)kk=G.keys.find(k=>dx?(k.dx===dx&&k.dy===0):(k.dx===0&&k.dy===dy));if(!kk)return null;return{k:'click',x:rc.left+kk.x+kk.w/2,y:rc.top+kk.y+kk.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;parchment(g,W,H,u,t);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#0f766e'});}
    /* 안내판 */
    const f=G.info;K.card(g,f.x,f.y,f.w,f.h,u*.35,'rgba(255,250,240,.92)',{stroke:INK,lw:3,blur:0,dy:4,sc:INK});
    const rr=G.rs;const rcx=G.land?f.x+f.w/2:f.x+rr*1.3,rcy=G.land?f.y+rr*1.25:f.y+f.h/2;rose(g,rcx,rcy,rr,st.rot,G.d8,t);
    const tx=G.land?f.x+u*.4:f.x+rr*2.8,tw=G.land?f.w-u*.8:f.w-rr*2.8-u*.4;const ty0=G.land?f.y+rr*2.7:f.y+u*.3;const th=G.land?f.h-rr*2.7-u*.4:f.h-u*.6;
    K.txt(g,q.ty==='A'?'🚶 길 찾기':'📍 바로 옆 찾기',tx+tw/2,ty0+th*.1,{size:Math.min(u*.7,th*.16),color:'#0f766e',maxW:tw});
    if(q.ty==='A'){QK.txt(g,q.sp[0]+' '+q.sp[1]+'에서 출발!',tx+tw/2,ty0+th*.3,tw,th*.2,Math.min(u*.8,th*.15),INK,1.1);QK.txt(g,q.parts.join('  →  '),tx+tw/2,ty0+th*.58,tw,th*.3,Math.min(u*.85,th*.16),'#b45309',1.2);K.txt(g,'어디에 도착할까요?',tx+tw/2,ty0+th*.88,{size:Math.min(u*.55,th*.1),color:'#6b5230',maxW:tw});}
    else{QK.txt(g,q.sp[0]+' '+q.sp[1]+'의 바로 '+q.nm+'쪽 옆 칸에 있는 곳은?',tx+tw/2,ty0+th*.5,tw,th*.6,Math.min(u*.9,th*.16),INK,1.25);K.txt(g,'지도에서 눌러요',tx+tw/2,ty0+th*.92,{size:Math.min(u*.55,th*.1),color:'#6b5230',maxW:tw});}
    /* 지도 */
    const bd=G.bd,c=G.cell;K.card(g,bd.x-u*.15,bd.y-u*.15,bd.w+u*.3,bd.h+u*.3,u*.3,'#fdf0cf',{stroke:INK,lw:4,blur:u*.3,dy:u*.1,sc:'rgba(60,30,0,.4)'});
    for(let i=0;i<N*N;i++){const cx=bd.x+(i%N)*c,cy=bd.y+Math.floor(i/N)*c;const pl=st.grid[i];let col=pl?'#fff7e0':'#d6ebc8';let bdc='rgba(74,47,18,.35)';if(i===q.s)bdc='#0ea5e9';
      if(st.lock&&i===q.t){col=st.res==='ok'?'#bbf7d0':'#fde68a';bdc=st.res==='ok'?'#16a34a':'#d97706';}if(st.lock&&q.ty==='B'&&i===st.wrongI&&st.res==='bad'&&i!==q.t){col='#fecaca';bdc='#dc2626';}
      K.rr(g,cx+c*.04,cy+c*.04,c*.92,c*.92,c*.14);g.fillStyle=col;g.fill();g.lineWidth=(i===q.s||(st.lock&&i===q.t))?Math.max(3,c*.06):1.5;g.strokeStyle=bdc;g.stroke();
      if(pl){K.emo(g,pl[0],cx+c/2,cy+c*.4,c*.46);K.txt(g,pl[1],cx+c/2,cy+c*.8,{size:c*.2,color:INK,maxW:c*.88});}else K.emo(g,['🌱','🌼','🌿','🌸','🍀','🌾'][(i*7)%6],cx+c/2,cy+c/2,c*.3);
      if(i===q.s)K.txt(g,'출발',cx+c*.5,cy+c*.12,{size:c*.16,color:'#0369a1'});}
    if(q.ty==='A'){const px=bd.x+(st.pos[0]+.5)*c+(st.shake>0?Math.sin(t*60)*c*.05:0),py=bd.y+(st.pos[1]+.5)*c-Math.abs(Math.sin(t*5))*c*.04;K.shadow(g,px,py+c*.3,c*.2,c*.06,.25);K.emo(g,'🚶',px,py,c*.62);}
    if(st.bannerT>0){const a=Math.min(1,st.bannerT*2);g.save();g.globalAlpha=a;K.card(g,bd.x+bd.w*.05,bd.y+bd.h*.4,bd.w*.9,bd.h*.2,u*.3,'rgba(74,47,18,.92)',{blur:0,dy:0});QK.txt(g,st.banner,bd.x+bd.w/2,bd.y+bd.h*.5,bd.w*.84,bd.h*.16,Math.min(u*.8,bd.h*.06),'#fde68a',1.1);g.restore();}
    if(st.msg)K.txt(g,st.msg,bd.x+bd.w/2,bd.y+bd.h+u*.55,{size:Math.min(u*.6,W*.04),color:st.res==='ok'?'#15803d':'#b91c1c',stroke:'#fffaf0',maxW:W*.9});
    /* 방향 단추 */
    if(q.ty==='A'){const pd=G.pd;K.card(g,pd.x-u*.1,pd.y-u*.1,pd.w+u*.2,pd.h+u*.2,u*.3,'rgba(255,250,240,.9)',{stroke:INK,lw:3,blur:0,dy:3,sc:INK});G.keys.forEach(k=>{if(k.hide)return;const dn=st.press&&st.press.k===k.a;K.card(g,k.x+u*.08,k.y+u*.08+(dn?u*.04:0),k.w-u*.16,k.h-u*.16,u*.25,dn?'#fde68a':'#fff',{stroke:INK,lw:2.5,blur:0,dy:dn?1:4,sc:INK});K.txt(g,k.a,k.x+k.w/2,k.y+k.h/2,{size:Math.min(k.h*.5,u*1.4),color:INK});});K.emo(g,'🧭',pd.x+pd.w/2,pd.y+pd.h/2,Math.min(pd.w*.25,u*1.2));}
    K.card(g,G.pad,(p.top||0)+u*.4,u*3.6,u*.8,u*.4,'rgba(255,250,240,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🧭 도착 '+(st.okN||0)+'곳',G.pad+u*1.8,(p.top||0)+u*.8,{size:u*.48,color:INK,maxW:u*3.3});
  },
};
QZ.mix(GAME,{say:true,pts0:50,pts1:50,okMs:1100,badMs:2000});
Engine.boot(GAME);
