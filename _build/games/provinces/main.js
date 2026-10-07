/* 4~5학년 사회 · 우리 지역의 모습 · 시·도 — 우리나라 시·도 탐험
   디자인: 보드게임 판. 육각 타일로 만든 대한민국 지도에서 설명에 맞는 시·도를 찾아 내 색깔로 칠해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1f3b4d';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4l17 10v20L24 44 7 34V14z" fill="#12a594" stroke="#1f3b4d" stroke-width="3" stroke-linejoin="round"/><path d="M24 14l8 5v10l-8 5-8-5V19z" fill="#ffd43b" stroke="#1f3b4d" stroke-width="2.5" stroke-linejoin="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const R=/*@@R@@*/;
const FULL=/*@@FULL@@*/;
const KEYS=Object.keys(R);
const GN={cap:'수도권',gw:'강원권',cc:'충청권',jl:'전라권',gs:'경상권',jj:'제주도'};
const GC={cap:'#ffb4a2',gw:'#b7e4c7',cc:'#ffe08a',jl:'#ffc8dd',gs:'#bde0fe',jj:'#d0bfff'};
const SQ=Math.sqrt(3),HH=10;
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
/* 타일(헥사곤) 목록과 시·도 경계선 */
const TILES=[];const OWN={};
KEYS.forEach(k=>R[k].t.forEach(([x,y,s])=>{TILES.push({k,x:x*SQ*HH,y:y*1.5*HH,r:(s||1)*HH,s:!!s});if(!s)OWN[x+','+y]=k;}));
const NB=[[1,0],[.5,1],[-.5,1],[-1,0],[-.5,-1],[.5,-1]];
const EDGES=[];
KEYS.forEach(k=>{const r=R[k];let sx=0,sy=0,cnt=0;
  r.t.forEach(([x,y,s])=>{const cx=x*SQ*HH,cy=y*1.5*HH,rr=(s||1)*HH;
    for(let e=0;e<6;e++){const nb=OWN[(x+NB[e][0])+','+(y+NB[e][1])];if(!s&&nb===k)continue;const a1=Math.PI/180*(60*e-30),a2=Math.PI/180*(60*e+30);EDGES.push([cx+rr*Math.cos(a1),cy+rr*Math.sin(a1),cx+rr*Math.cos(a2),cy+rr*Math.sin(a2)]);}
    if(!s){sx+=cx;sy+=cy;cnt++;}});
  r.cx=sx/cnt;r.cy=sy/cnt;if(r.lt!=null){r.cx=r.t[r.lt][0]*SQ*HH;r.cy=r.t[r.lt][1]*1.5*HH;}});
const VB={x:-24,y:-13,w:134,h:146};
function hex(g,cx,cy,r){g.beginPath();for(let k=0;k<6;k++){const a=Math.PI/180*(60*k-30);const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);k?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();}
function sea(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#5ec8d8','#2fa4c4','#1d7fa8']);g.save();g.globalAlpha=.22;g.strokeStyle='#fff';g.lineWidth=2;
  for(let k=0;k<9;k++){g.beginPath();for(let x=0;x<=W;x+=14){const y=H*(.08+k*.11)+Math.sin(x/60+t*.9+k*1.7)*u*.12;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;sea(g,W0,H0,u,T);const s=Math.min(W0/VB.w*.9,H0/VB.h*.95);const ox=W0/2-(VB.x+VB.w/2)*s,oy=H0/2-(VB.y+VB.h/2)*s;const lit=Math.floor(T/.5)%KEYS.length;
    TILES.forEach(tl=>{const on=tl.k===KEYS[lit];const cx=ox+tl.x*s,cy=oy+tl.y*s,r=tl.r*s*.97;g.save();hex(g,cx,cy+r*.12,r);g.fillStyle='rgba(0,40,60,.35)';g.fill();hex(g,cx,cy-(on?r*.1:0),r);g.fillStyle=on?'#ffd43b':GC[R[tl.k].g];g.fill();g.lineWidth=1.5;g.strokeStyle='rgba(255,255,255,.75)';g.stroke();g.restore();});
    K.emo(g,'⛵',W0*.1,H0*.78,u*.9,Math.sin(T)*.1);K.emo(g,'🧭',W0*.9,H0*.2,u*.9,T*.5);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'provinces',title:'우리나라 시·도 탐험',title1:'보드게임 지도 여행',title2:'우리나라 시·도 탐험',emoji:LOGO,
  subtitle:'4~5학년 사회 · 우리나라 시·도',
  howto:'육각 타일 지도에서 설명에 맞는 시·도를 눌러요. 맞히면 <b>내 색깔</b>로 칠해지고, 17개 시·도를 모두 칠하면 지도 완성! 시간이 지나면 지역 힌트가 나와요.',
  how:p=>({feat:'<b>특징</b>을 보고 시·도 찾기 (이름이 적힌 지도)',loc:'<b>이름 없는 지도</b>에서 시·도 위치 찾기',goods:'<b>특산물·산업</b>을 보고 시·도 찾기',hard:'<b>도전!</b> 이름 없는 지도에서 특징만 보고 찾기'}[p.levelId]),
  theme:{c1:'#12a594',c2:'#e8590c'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 탐험을 할까요?',
  txt:{who:'누가 탐험가일까요?',dur:'탐험 시간',pace:'한 곳 찾는 시간',seat:'번 탐험가 ',go:'탐험 출발!',s1:'1. 탐험',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:d.tag.replace(' 도전',''),t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li>우리나라는 <b>특별시·광역시·특별자치시·도</b> 모두 17개의 시·도로 나뉘어요.</li>
    <li>수도권(서울·인천·경기), 강원권, 충청권(충북·충남·대전·세종), 전라권(전북·전남·광주), 경상권(경북·경남·대구·울산·부산), 제주도로 나누어 기억하면 쉬워요.</li>
    <li>지역마다 <b>특산물과 산업, 이름난 곳</b>이 달라요. 지도를 보며 위치와 특징을 함께 외워요.</li></ul>`,
  labels(L){return L==='feat'||L==='goods';},
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.4;const A=H-top-u*.25;const s=Math.min((W-u*.4)/VB.w,A/VB.h);const mw=VB.w*s,mh=VB.h*s;const ox=W/2-mw/2-VB.x*s,oy=top+(A-mh)/2-VB.y*s;return{W,H,u,top,A,s,ox,oy,mw,mh,side:W/2-mw/2};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,done:{},nDone:0,wrongK:null,sparks:[],msg:'',msgT:0,hint:false,bannerT:0});this.newQ(p);},
  make(p,L){const R0=p.R;const k=p.deck(KEYS,'dk_'+L);const r=R[k];let text,sub;
    if(L==='loc'){text='📍 <b>'+FULL[k]+'</b>'+jo(FULL[k],'을','를')+' 지도에서 찾아요';}
    else if(L==='goods'){text='🍊 <b>'+r.p+'</b><br>어느 시·도일까요?';}
    else{const clue=R0.pick(r.c);text='🔎 <b>'+clue+'</b>'+jo(clue,'은','는')+' 어디일까요?';}
    return{k,L,okIdx:KEYS.indexOf(k),text,ans:FULL[k],reveal:FULL[k]+' ('+GN[r.g]+')',review:(L==='goods'?r.p:L==='loc'?FULL[k]:r.c[0])+' → '+FULL[k],speak:FULL[k]};},
  qtime(q){return q.L==='loc'?10:14;},askHtml(q){return q.text;},askSub(q){return q.L==='loc'?'이름 없는 지도에서 찾아요':'지도에서 알맞은 곳을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.reveal;},goodTip(q){return '정답! '+FULL[q.k];},
  onNew(p,q){const st=p.state;st.hint=false;st.wrongK=null;st.msg='';},
  onVerdict(p,q,ok,i){const st=p.state;if(ok){if(!st.done[q.k]){st.done[q.k]=1;st.nDone++;}const r=R[q.k];for(let n=0;n<10;n++)st.sparks.push({x:r.cx,y:r.cy,a:n/10*TAU,t:0});st.msg='정답! '+FULL[q.k];st.msgT=1.6;
      if(st.nDone>=KEYS.length){st.bannerT=1.8;setTimeout(()=>{st.done={};st.nDone=0;},1800);}}
    else{st.wrongK=i>=0?KEYS[i]:null;st.msg=(i>=0?'거기는 '+R[KEYS[i]].n+'! ':'시간 끝! ')+'정답은 '+FULL[q.k];st.msgT=2.6;}},
  upd(p,dt){const st=p.state,q=st.q;st.sparks=st.sparks.filter(s=>(s.t+=dt)<.8);if(st.msgT>0)st.msgT-=dt;if(st.bannerT>0)st.bannerT-=dt;
    if(q&&!st.lock&&!st.hint&&st.qmax-st.qt>st.qmax*.55){st.hint=true;st.msg='💡 힌트: '+GN[R[q.k].g]+'에 있어요';st.msgT=5;}},
  tileAt(p,x,y){const G=this.geo(p);let best=null,bd=1e9;for(const t of TILES){const cx=G.ox+t.x*G.s,cy=G.oy+t.y*G.s,r=t.r*G.s;const d=Math.hypot(x-cx,y-cy);if(d<r*.98&&d<bd){bd=d;best=t;}}return best;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const t=this.tileAt(p,x,y);if(!t)return;this.verdict(p,KEYS.indexOf(t.k),false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=R[q.k];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.ox+r.cx*G.s,y:rc.top+G.oy+r.cy*G.s};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;sea(g,W,H,u,t);
    const s=G.s,X=x=>G.ox+x*s,Y=y=>G.oy+y*s;const labels=this.labels(q.L);
    /* 바다 이름과 작은 배 */
    [['동해',6*SQ*HH,4*1.5*HH],['서해',-1.15*SQ*HH,4.6*1.5*HH],['남해',3.4*SQ*HH,7.7*1.5*HH]].forEach(([n,x,y])=>K.txt(g,n,X(x),Y(y),{size:Math.max(11,s*5.2),color:'rgba(255,255,255,.65)',maxW:s*20}));
    K.emo(g,'⛵',G.side*.5+u*.3,H*.75+Math.sin(t)*3,Math.min(u*1.1,G.side*.8||u));K.emo(g,'🐋',W-G.side*.5-u*.3,H*.3+Math.sin(t*.8)*4,Math.min(u*1.1,G.side*.8||u));
    /* 타일 */
    const tilesSorted=TILES;const pulse=.5+.5*Math.sin(t*7);
    tilesSorted.forEach(tl=>{const r=R[tl.k];const cx=X(tl.x),cy=Y(tl.y),rad=tl.r*s*.97;const mine=st.done[tl.k];const isAns=st.lock&&tl.k===q.k;const isWrong=st.lock&&st.res==='bad'&&tl.k===st.wrongK;
      hex(g,cx,cy+rad*.14,rad);g.fillStyle='rgba(0,40,60,.38)';g.fill();
      hex(g,cx,cy,rad);let fill=mine?p.color:GC[r.g];if(isWrong)fill='#ff6b6b';if(isAns)fill=st.res==='ok'?p.color:(pulse>.5?'#ffe066':'#ffd43b');g.fillStyle=fill;g.fill();
      if(mine||isAns){g.fillStyle='rgba(255,255,255,.2)';hex(g,cx,cy-rad*.2,rad*.7);g.fill();}
      g.lineWidth=Math.max(1,s*.12);g.strokeStyle='rgba(255,255,255,.55)';hex(g,cx,cy,rad);g.stroke();});
    g.strokeStyle='#1f3b4d';g.lineWidth=Math.max(2.6,s*.5);g.lineCap='round';g.beginPath();EDGES.forEach(e=>{g.moveTo(X(e[0]),Y(e[1]));g.lineTo(X(e[2]),Y(e[3]));});g.stroke();
    /* 이름표 */
    KEYS.forEach(k=>{const r=R[k];const show=labels||st.done[k]||(st.lock&&(k===q.k||k===st.wrongK));if(!show)return;const mineOrAns=st.done[k]||(st.lock&&k===q.k);
      K.txt(g,r.n,X(r.cx),Y(r.cy)+s*.4,{size:Math.max(10,s*(r.n.length>2?5.2:6.2)),color:mineOrAns?'#fff':INK,stroke:mineOrAns?INK:'rgba(255,255,255,.85)',lw:Math.max(2,s*.9),maxW:s*(r.t.length>1?15:12)});});
    K.txt(g,'울릉도·독도',X(5.75*SQ*HH),Y(1.8*1.5*HH)+s*9.5,{size:Math.max(9,s*3.6),color:'#fff',stroke:'rgba(0,50,70,.6)',lw:2,maxW:s*18});
    for(const sp of st.sparks){const rr=s*(3+sp.t*26);g.fillStyle=`rgba(255,215,60,${1-sp.t/.8})`;g.beginPath();g.arc(X(sp.x)+Math.cos(sp.a)*rr,Y(sp.y)+Math.sin(sp.a)*rr,Math.max(2,s*1.2),0,TAU);g.fill();}
    /* 위쪽 시간 막대와 진행 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.14,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#ffd43b'});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*4,u*.8,u*.4,'#fff',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🗺️ '+st.nDone+' / '+KEYS.length,u*.3+u*2,(p.top||0)+u*.9,{size:u*.5,color:INK,maxW:u*3.5});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,H-u*.5,{size:Math.min(u*.8,W*.05),color:'#fff',stroke:INK,lw:u*.16,maxW:W*.94});
    if(st.bannerT>0)K.txt(g,'🎉 지도 완성!',W/2,H*.5,{size:Math.min(u*1.6,W*.1),color:'#ffd43b',stroke:INK,lw:u*.25,maxW:W*.9});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:900,badMs:2000});
Engine.boot(GAME);
