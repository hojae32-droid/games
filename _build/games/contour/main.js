/* 4학년 사회 · 등고선과 높낮이 · 경사 · 축척 — 등고선 깃발 꽂기
   디자인: 산악 탐험. 나무 액자 속 등고선 지도를 읽고 정상에 깃발을 꽂아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b2118';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M3 40L18 14l8 12 6-8 13 22z" fill="#8c5638" stroke="#2b2118" stroke-width="3.2" stroke-linejoin="round"/><path d="M14 22l4-8 4 8" fill="#fff" stroke="#2b2118" stroke-width="2" stroke-linejoin="round"/><path d="M32 18V5" stroke="#2b2118" stroke-width="3" stroke-linecap="round"/><path d="M32 5l9 3-9 4z" fill="#ef4444" stroke="#2b2118" stroke-width="2.2" stroke-linejoin="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const BANDS=['#8FD07A','#BFE07C','#EEDD86','#E9BE70','#D49A5C','#B27548','#8C5638'];
const LAB=['가','나','다','라'];
const KINDS={height:['high','low','band'],slope:['steep','gentle'],scale:['scale'],mix:['high','low','band','steep','gentle','scale','scale']};
/* 지형 도구 (원본 로직) */
function mkTerrain(rng){const rnd=(a,b)=>a+rng()*(b-a);const hills=[];const n=2+Math.floor(rng()*2);for(let i=0;i<n;i++)hills.push({x:rnd(.2,.8),y:rnd(.2,.8),a:rnd(.55,1),sx:rnd(.1,.22),sy:rnd(.1,.22)});
  const hf=(x,y)=>{let h=0;for(const k of hills)h+=k.a*Math.exp(-(((x-k.x)/k.sx)**2+((y-k.y)/k.sy)**2)/2);return Math.min(.999,h*.95);};
  const meters=(x,y)=>hf(x,y)*700;const band=(x,y)=>Math.min(BANDS.length-1,Math.floor(meters(x,y)/100));
  const ring=(x,y,r)=>{const set=new Set([band(x,y)]);for(let k=0;k<24;k++){const a=k/24*Math.PI*2;for(const f of[.5,1])set.add(band(Math.min(.999,Math.max(0,x+Math.cos(a)*r*f)),Math.min(.999,Math.max(0,y+Math.sin(a)*r*f))));}return set.size;};
  return{hf,meters,band,ring,stable:(x,y)=>ring(x,y,.04)===1,rnd};}
function spread(rng,n,minD,ok){const rnd=(a,b)=>a+rng()*(b-a);for(let tries=0;tries<400;tries++){const pts=[];for(let k=0;k<400&&pts.length<n;k++){const p=[rnd(.08,.92),rnd(.1,.9)];if(pts.every(o=>Math.hypot(o[0]-p[0],o[1]-p[1])>minD))pts.push(p);}if(pts.length===n&&ok(pts))return pts;}return null;}
function makeQ(kind,T,rng){const{band,ring,stable}=T;
  if(kind==='high'||kind==='low'){const pts=spread(rng,4,.22,ps=>{if(!ps.every(p=>stable(...p)))return false;const b=ps.map(p=>band(...p));const t=kind==='high'?Math.max(...b):Math.min(...b);const o=b.filter(x=>x!==t);return b.filter(x=>x===t).length===1&&new Set(b).size>=3&&o.every(x=>Math.abs(x-t)>=1);});if(!pts)return null;
    const b=pts.map(p=>band(...p)),t=kind==='high'?Math.max(...b):Math.min(...b);return{kind,pts,ans:b.indexOf(t),k:'⛰️ 높낮이',t:kind==='high'?'가장 <b>높은</b> 곳에 깃발을 꽂아요':'가장 <b>낮은</b> 곳에 깃발을 꽂아요',why:i=>`${LAB[i]}: ${b[i]*100}~${b[i]*100+100}m`};}
  if(kind==='band'){const pts=spread(rng,4,.22,ps=>{if(!ps.every(p=>stable(...p)))return false;const b=ps.map(p=>band(...p));return new Set(b).size===4;});if(!pts)return null;const b=pts.map(p=>band(...p)),ans=Math.floor(rng()*4),v=b[ans];
    return{kind,pts,ans,k:'🎨 색 읽기',t:`높이가 <b>${v*100}m~${v*100+100}m</b>인 곳은?`,why:i=>`${LAB[i]}: ${b[i]*100}~${b[i]*100+100}m`};}
  if(kind==='steep'||kind==='gentle'){const R0=kind==='steep'?.08:.1;const pts=spread(rng,4,.24,ps=>{const c=ps.map(p=>ring(p[0],p[1],R0));const srt=c.slice().sort((a,b)=>b-a);if(kind==='steep')return srt[0]>=4&&srt[1]<=srt[0]-2;return srt[3]===1&&srt[2]>=3;});if(!pts)return null;
    const s=pts.map(p=>ring(p[0],p[1],R0)),t=kind==='steep'?Math.max(...s):Math.min(...s);return{kind,pts,ans:s.indexOf(t),k:'🧗 경사',t:kind==='steep'?'경사가 가장 <b>가파른</b> 곳은? (등고선 간격을 봐요)':'경사가 가장 <b>완만한</b> 곳은? (등고선 간격을 봐요)',why:()=>kind==='steep'?'등고선 간격이 가장 좁은 곳이에요':'등고선 간격이 가장 넓은 곳이에요'};}
  if(kind==='scale'){const C=7,R=7;const unit=[250,500,1000][Math.floor(rng()*3)];const sx=1+Math.floor(rng()*2),sy=1+Math.floor(rng()*(R-2));const dists=[1,2,3,4,5,6].sort(()=>rng()-.5).slice(0,3);const pts=[[sx,sy]];const used=new Set([sx+','+sy]);
    for(const d of dists){const opts=[[sx+d,sy],[sx,sy-d],[sx,sy+d]].filter(([x,y])=>x>=0&&x<=C&&y>=0&&y<=R&&!used.has(x+','+y));if(!opts.length)return null;const o=opts[Math.floor(rng()*opts.length)];pts.push(o);used.add(o+'');}
    const ans=1+Math.floor(rng()*3),d=dists[ans-1],real=d*unit;const fmtM=m=>m>=1000?`${(m/1000).toString()}km`:`${m}m`;
    return{kind,grid:[C,R],unit,pts:pts.map(([x,y])=>[x/C*.84+.08,y/R*.84+.08]),ans,start:0,k:`📏 축척 · 한 칸 = ${fmtM(unit)}`,t:`<b>출발</b>에서 실제 거리로 <b>${fmtM(real)}</b> 떨어진 곳은?`,why:i=>`${dists[i-1]}칸 × ${fmtM(unit)} = ${fmtM(dists[i-1]*unit)}`};}}
/* 지도 그림을 따로 그려 두어요 */
function paintMap(T,w,h,grid){const s=2,cw=Math.max(8,Math.ceil(w/s)),ch=Math.max(8,Math.ceil(h/s));const cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const c=cv.getContext('2d'),img=c.createImageData(cw,ch),B=new Uint8Array(cw*ch);
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++)B[y*cw+x]=T.band(x/cw,y/ch);const rgb=BANDS.map(c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)]);
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const b=B[y*cw+x],edge=(x<cw-1&&B[y*cw+x+1]!==b)||(y<ch-1&&B[(y+1)*cw+x]!==b);const[r,g,bb]=edge?[70,46,30]:rgb[b],k=(y*cw+x)*4;img.data[k]=r;img.data[k+1]=g;img.data[k+2]=bb;img.data[k+3]=255;}
  c.putImageData(img,0,0);return cv;}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false,img=null,key='';
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);img=null;};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;K.vgrad(g,0,0,W,H,['#bfe6ff','#e6f6ff','#d6f0d0']);K.clouds(g,W,H,T,.1,3,u*1.4);
    const mw=Math.min(W*.8,u*9),mh=mw*.72,mx=W/2-mw/2,my=H*.3;if(!img){let s=7;const rng=()=>{s=(s*16807)%2147483647;return s/2147483647;};const Tr=mkTerrain(rng);img=paintMap(Tr,mw,mh);}
    K.card(g,mx-u*.3,my-u*.3,mw+u*.6,mh+u*.6,u*.3,'#8a5a2b',{stroke:INK,lw:4,blur:u*.4,dy:u*.15,sc:'rgba(0,0,0,.3)'});g.drawImage(img,mx,my,mw,mh);
    const fx=mx+mw*.5,fy=my+mh*.45;g.strokeStyle=INK;g.lineWidth=u*.1;g.beginPath();g.moveTo(fx,fy);g.lineTo(fx,fy-u*1.6);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.moveTo(fx,fy-u*1.6);g.lineTo(fx+u*1.1+Math.sin(T*5)*u*.1,fy-u*1.3);g.lineTo(fx,fy-u*.95);g.closePath();g.fill();g.stroke();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'contour',title:'등고선 깃발 꽂기',title1:'정상에 깃발을!',title2:'등고선 깃발 꽂기',emoji:LOGO,
  subtitle:'4학년 사회 · 등고선 · 경사 · 축척',
  howto:'등고선 지도를 보고 문제에 알맞은 곳의 표지판을 눌러 <b>깃발</b>을 꽂아요. 색이 진한 갈색일수록 높고, 등고선이 촘촘할수록 가팔라요. 빨리 맞힐수록 점수가 커져요!',
  how:p=>({height:'<b>색</b>으로 높은 곳·낮은 곳 읽기',slope:'<b>등고선 간격</b>으로 가파른 곳 찾기',scale:'<b>축척</b>으로 실제 거리 구하기',mix:'높낮이·경사·축척을 <b>모두</b> 섞어서'}[p.levelId]),
  theme:{c1:'#166534',c2:'#b45309'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 산을 오를까요?',
  txt:{who:'누가 오를까요?',dur:'등반 시간',pace:'한 문제 시간',seat:'번 등반가 ',go:'등반 시작!',s1:'1. 산',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'4학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>등고선</b>은 높이가 같은 곳을 이은 선이에요. 색이 진한 갈색일수록 높은 곳이고, 초록색은 낮은 곳이에요.</li>
    <li>등고선 간격이 <b>촘촘하면 경사가 가파르고</b>, <b>넓으면 완만</b>해요.</li>
    <li><b>축척</b>은 실제 거리를 지도에 줄인 비율이에요. 지도에서 2칸이고 한 칸이 500m라면 실제 거리는 2 × 500m = 1000m(1km)예요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.6;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;let mw,mh,mx,my;const lgH=u*1.5;
    if(land){mh=Math.min(A-lgH-u*1.6,W*.5*.75);mw=mh/.75;mx=W/2-mw/2;my=Z0+u*.4;}else{mw=W-pad*2-u*.6;mh=Math.min(mw*.78,A-lgH-u*2.4);mw=Math.min(mw,mh/.78);mx=W/2-mw/2;my=Z0+u*.5;}
    return{W,H,u,Z0,land,pad,gap,map:{x:mx,y:my,w:mw,h:mh},legend:{x:mx,y:my+mh+u*.55,w:mw,h:lgH},msgY:my+mh+u*.55+lgH+u*.5};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,kinds:[],img:null,imgKey:'',hintT:0});p.ask('🗺️ 등고선 지도를 읽어요','알맞은 곳의 표지판을 눌러 깃발을 꽂아요');this.newQ(p);},
  make(p,L){const st=p.state,rng=p.R.f;for(let guard=0;guard<30;guard++){if(!st.kinds.length){st.kinds=p.R.shuffle(KINDS[L].slice());}const kind=st.kinds.pop();let Q=null,T=null;for(let t=0;t<12&&!Q;t++){T=mkTerrain(rng);Q=makeQ(kind,T,rng);}if(Q){Q.T=T;Q.id=Math.random();Q.okIdx=Q.ans;Q.text=Q.t;Q.reveal=Q.why(Q.ans);Q.review=strip(Q.t)+' → '+(kind==='scale'?LAB[Q.ans-1]:LAB[Q.ans])+' ('+Q.why(Q.ans)+')';Q.speak=strip(Q.t);return Q;}}return null;},
  qtime(){return 15;},askHtml(q){return q.k+' '+q.t;},askSub(){return '알맞은 곳의 표지판을 눌러요';},
  isOk(q,i){return i===q.ans;},tipOf(q){const lab=q.kind==='scale'?LAB[q.ans-1]:LAB[q.ans];return `정답은 ${lab} — ${q.why(q.ans)}`;},goodTip(q){return '깃발 꽂기 성공! '+q.why(q.ans);},
  onNew(p,q){p.state.img=null;p.state.hintT=0;},
  upd(p,dt){const st=p.state;if(st.res==='bad')st.hintT+=dt;},
  pinPos(G,q,i){const m=G.map;return[m.x+q.pts[i][0]*m.w,m.y+q.pts[i][1]*m.h];},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const pr=Math.max(G.u*.9,G.map.w*.035);let best=-1,bd=1e9;for(let i=0;i<q.pts.length;i++){if(q.kind==='scale'&&i===q.start)continue;const[px,py]=this.pinPos(G,q,i);const d=Math.hypot(x-px,y-py);if(d<bd){bd=d;best=i;}}if(best>=0&&bd<pr*1.3){p.Snd.tap&&p.Snd.tap();this.verdict(p,best,false);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const[px,py]=this.pinPos(G,q,q.ans);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+px,y:rc.top+py};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,['#cfe8d5','#e9f4e4','#d9c9a3']);
    /* 먼 산 */g.fillStyle='rgba(22,101,52,.18)';g.beginPath();g.moveTo(0,H*.4);for(let x=0;x<=W;x+=W/12)g.lineTo(x,H*.4-Math.abs(Math.sin(x/W*7))*u*2);g.lineTo(W,H);g.lineTo(0,H);g.fill();
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#166534'});}
    const m=G.map;K.card(g,m.x-u*.3,m.y-u*.3,m.w+u*.6,m.h+u*.6,u*.3,'#8a5a2b',{stroke:INK,lw:4,blur:u*.35,dy:u*.12,sc:'rgba(0,0,0,.35)'});
    const key=Math.round(m.w)+'x'+Math.round(m.h);if(!st.img||st.imgKey!==key+q.id){st.img=paintMap(q.T,m.w,m.h);st.imgKey=key+q.id;}g.drawImage(st.img,m.x,m.y,m.w,m.h);
    if(q.kind==='scale'){g.save();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.5;const C=q.grid[0],R=q.grid[1];for(let i=0;i<=C;i++){const x=m.x+(i/C*.84+.08)*m.w;g.beginPath();g.moveTo(x,m.y);g.lineTo(x,m.y+m.h);g.stroke();}for(let j=0;j<=R;j++){const y=m.y+(j/R*.84+.08)*m.h;g.beginPath();g.moveTo(m.x,y);g.lineTo(m.x+m.w,y);g.stroke();}g.restore();}
    /* 표지판(핀) */
    const pr=Math.max(u*.8,m.w*.032);q.pts.forEach((pt,i)=>{const[px,py]=this.pinPos(G,q,i);const isStart=q.kind==='scale'&&i===q.start;const lab=q.kind==='scale'?(isStart?'출발':LAB[i-1]):LAB[i];const isAns=i===q.ans;let col=isStart?'#2563eb':'#fff',bd=INK;
      if(st.lock){if(isAns){col='#bbf7d0';bd='#16a34a';}else if(st.pick===i){col='#fecaca';bd='#dc2626';}}
      if(st.lock&&isAns&&st.res==='bad'&&Math.sin(st.hintT*8)>0)K.glow(g,px,py,pr*2.2,'#fde047',.8);
      g.fillStyle=INK;g.fillRect(px-pr*.07,py,pr*.14,pr*1.1);K.card(g,px-pr,py-pr,pr*2,pr*2,pr*.4,col,{stroke:bd,lw:Math.max(2.5,pr*.16),blur:0,dy:3,sc:INK});K.txt(g,lab,px,py,{size:pr*(isStart?.78:1.15),color:isStart?'#fff':INK,maxW:pr*1.8});
      if(st.res==='ok'&&isAns){const fy=py-pr;g.strokeStyle=INK;g.lineWidth=pr*.14;g.beginPath();g.moveTo(px,fy);g.lineTo(px,fy-pr*2.6);g.stroke();g.fillStyle='#ef4444';g.beginPath();g.moveTo(px,fy-pr*2.6);const w=Math.sin(t*8)*pr*.15;g.lineTo(px+pr*1.6+w,fy-pr*2.2);g.lineTo(px,fy-pr*1.7);g.closePath();g.fill();g.stroke();}});
    /* 범례 */
    const lg=G.legend;const cw=lg.w/BANDS.length;BANDS.forEach((c,i)=>{g.save();g.globalAlpha=q.kind==='scale'?.35:1;g.fillStyle=c;g.fillRect(lg.x+i*cw,lg.y,cw,lg.h*.5);g.strokeStyle=INK;g.lineWidth=2;g.strokeRect(lg.x+i*cw,lg.y,cw,lg.h*.5);K.txt(g,i===BANDS.length-1?`${i*100}m~`:`${i*100}`,lg.x+i*cw+cw/2,lg.y+lg.h*.8,{size:Math.min(u*.5,cw*.34),color:INK,maxW:cw*.95});g.restore();});
    if(st.lock){const lab=q.kind==='scale'?LAB[q.ans-1]:LAB[q.ans];K.txt(g,st.res==='ok'?'깃발 꽂기 성공! '+q.why(q.ans):'정답은 '+lab+' — '+q.why(q.ans),W/2,G.msgY,{size:Math.min(u*.7,W*.04),color:st.res==='ok'?'#15803d':'#b91c1c',stroke:'#fff',maxW:W*.94});}
    K.card(g,G.pad,(p.top||0)+u*.4,u*3.6,u*.8,u*.4,'rgba(255,255,255,.9)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🚩 깃발 '+(st.okN||0)+'개',G.pad+u*1.8,(p.top||0)+u*.8,{size:u*.48,color:INK,maxW:u*3.2});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1500,badMs:2400});
Engine.boot(GAME);
