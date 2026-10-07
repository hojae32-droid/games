/* 3학년 사회 · 교통과 통신 · 옛날과 오늘날의 생활 — 옛날과 오늘날 선 잇기
   디자인: 시간 여행! 왼쪽은 한지 빛깔 옛날, 오른쪽은 푸른 유리 도시 오늘날. 같은 일을 하는 짝을 시간 터널 선으로 이어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#4a2f16',BLUE='#2f80ed';
const LCOL=['#F26B38','#2F80ED','#1E9E57','#9B51E0'];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="3" y="10" width="19" height="28" rx="4" fill="#d9b676" stroke="#4a2f16" stroke-width="3"/><rect x="26" y="10" width="19" height="28" rx="4" fill="#9fd0ff" stroke="#4a2f16" stroke-width="3"/><path d="M22 24h4" stroke="#4a2f16" stroke-width="3.5" stroke-linecap="round"/><circle cx="12" cy="24" r="3" fill="#4a2f16"/><circle cx="36" cy="24" r="3" fill="#2f80ed"/></svg>';
const DECKS=/*@@DECKS@@*/;
const PS=/*@@P@@*/;
const K4=4;
function bg(g,W,H,u,t){const h=W/2;const gl=g.createLinearGradient(0,0,0,H);gl.addColorStop(0,'#e7cc92');gl.addColorStop(1,'#cfa966');g.fillStyle=gl;g.fillRect(0,0,h,H);
  g.save();g.globalAlpha=.1;g.strokeStyle='#6b4a1f';g.lineWidth=1;for(let i=0;i<40;i++){const x=(i*53)%h,y=(i*97)%H;g.beginPath();g.moveTo(x,y);g.lineTo(x+u*.5,y+u*.1);g.stroke();}g.restore();
  const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#8ec8ff');gr.addColorStop(1,'#d8efff');g.fillStyle=gr;g.fillRect(h,0,h,H);
  g.save();g.globalAlpha=.25;g.fillStyle='#fff';for(let i=0;i<7;i++){const bw=u*(.6+(i%3)*.3),bh=H*(.18+((i*37)%30)/100);g.fillRect(h+((i*0.14+.04)*h)%(h-bw),H-bh,bw,bh);}g.restore();
  /* 시간 터널 가운데 줄 */
  const pg=g.createLinearGradient(h-u*.5,0,h+u*.5,0);pg.addColorStop(0,'rgba(255,255,255,0)');pg.addColorStop(.5,'rgba(255,255,255,.55)');pg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=pg;g.fillRect(h-u*.5,0,u,H);
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;g.setLineDash([u*.3,u*.3]);g.lineDashOffset=-t*u;g.beginPath();g.moveTo(h,0);g.lineTo(h,H);g.stroke();g.setLineDash([]);}
function oldCard(g,r,u,it,st,col){g.save();const R=Math.min(u*.3,r.h*.2);
  K.card(g,r.x,r.y,r.w,r.h,R,st==='done'?'#e8f9e8':'#fff3d6',{stroke:st==='bad'?'#dc2626':st==='sel'?'#2f80ed':INK,lw:Math.max(2,u*.08),blur:u*.15,dy:u*.08});
  g.setLineDash([5,5]);g.strokeStyle='rgba(120,80,30,.45)';g.lineWidth=1.5;K.rr(g,r.x+R*.5,r.y+R*.5,r.w-R,r.h-R,R*.6);g.stroke();g.setLineDash([]);
  cardBody(g,r,u,it[0],it[1],INK,false);g.fillStyle=col||INK;g.beginPath();g.arc(r.x+r.w,r.y+r.h/2,Math.max(5,u*.2),0,TAU);g.fill();g.lineWidth=2;g.strokeStyle='#fff';g.stroke();g.restore();}
function newCard(g,r,u,it,st,col){g.save();const R=Math.min(u*.4,r.h*.3);
  K.card(g,r.x,r.y,r.w,r.h,R,st==='done'?'#e8f9e8':'#cfe4ff',{stroke:st==='bad'?'#dc2626':st==='sel'?'#f59f00':'#1b4f9c',lw:Math.max(2,u*.08),blur:u*.2,dy:u*.08});
  
  cardBody(g,r,u,it[0],it[1],'#16407a',true);g.fillStyle=col||BLUE;g.beginPath();g.arc(r.x,r.y+r.h/2,Math.max(5,u*.2),0,TAU);g.fill();g.lineWidth=2;g.strokeStyle='#fff';g.stroke();g.restore();}
function cardBody(g,r,u,emo,label,ink){const tall=r.w<r.h*1.6;
  if(tall){K.emo(g,emo,r.x+r.w/2,r.y+r.h*.34,Math.min(r.h*.42,r.w*.5));QK.txt(g,label,r.x+r.w/2,r.y+r.h*.74,r.w-u*.5,r.h*.4,Math.min(u*.66,r.h*.18),ink,1.15);}
  else{K.emo(g,emo,r.x+Math.min(r.h*.55,r.w*.2),r.y+r.h/2,Math.min(r.h*.62,r.w*.2));const ex=Math.min(r.h*1.1,r.w*.4);QK.txt(g,label,r.x+ex+(r.w-ex)/2,r.y+r.h/2,r.w-ex-u*.3,r.h-u*.3,Math.min(u*.8,r.h*.28),ink,1.15);}}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const PAIRS=[['🐎','말','🚗','자동차'],['🔥','봉수','📲','재난 문자'],['🏮','호롱불','💡','전등']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;bg(g,W0,H0,u,T);const cw=Math.min(W0*.3,u*2.6),ch=Math.min(H0*.2,u*1.3);const act=Math.floor(T/1.8)%3;
    PAIRS.forEach((p,i)=>{const y=H0*(.2+i*.26);const lr={x:W0*.08,y,w:cw,h:ch},rr={x:W0*.92-cw,y:H0*(.2+((i+act+1)%3)*.26),w:cw,h:ch};
      const rr2={x:W0*.92-cw,y,w:cw,h:ch};const tgt=i===act?rr2:rr;
      oldCard(g,lr,u*.6,[p[0],p[1]],'',LCOL[i]);newCard(g,i===0?{x:W0*.92-cw,y:H0*.2+(1)*H0*.26,w:cw,h:ch}:i===1?{x:W0*.92-cw,y:H0*.2,w:cw,h:ch}:{x:W0*.92-cw,y:H0*(.2+2*.26),w:cw,h:ch},u*.6,[PAIRS[i===0?1:i===1?0:2][2],PAIRS[i===0?1:i===1?0:2][3]],'',LCOL[i===0?1:i===1?0:2]);});
    /* 이어진 선 */
    const k=(T%1.8)/1.8;const ly=H0*(.2+act*.26)+ch/2;const ry=H0*(.2+[1,0,2][act]*.26)+ch/2;g.strokeStyle=LCOL[act];g.lineWidth=u*.14;g.lineCap='round';g.beginPath();const x1=W0*.08+cw,x2=W0*.92-cw;g.moveTo(x1,ly);g.bezierCurveTo((x1+x2)/2,ly,(x1+x2)/2,ry,x1+(x2-x1)*Math.min(1,k*1.4),ly+(ry-ly)*Math.min(1,k*1.4));g.stroke();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'then-now',title:'옛날과 오늘날 선 잇기',title1:'시간 여행 선 잇기',title2:'옛날과 오늘날 선 잇기',emoji:LOGO,
  subtitle:'3학년 사회 · 교통·통신·생활 도구',
  howto:'왼쪽은 <b>옛날</b>, 오른쪽은 <b>오늘날</b>이에요. 같은 일을 하는 것끼리 손가락으로 쭉 그어 이어요. 하나를 누르고 짝을 눌러도 돼요. 네 쌍을 다 이으면 다음 판!',
  how:p=>({move:'옛날과 오늘날의 <b>교통수단</b> 잇기',talk:'옛날과 오늘날의 <b>통신 수단</b> 잇기',tool:'옛날과 오늘날의 <b>생활 도구</b> 잇기',mix:'교통·통신·생활 도구 <b>섞어서</b> 잇기'}[p.levelId]),
  theme:{c1:'#d9b676',c2:'#2f80ed'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 시간 여행을 할까요?',
  txt:{who:'누가 시간 여행자일까요?',dur:'여행 시간',pace:'생각하는 시간',seat:'번 여행자 ',go:'시간 여행 출발!',s1:'1. 여행지',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'3학년',t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>교통수단</b>이 발달하면서 먼 곳도 빠르고 편하게 갈 수 있게 되었어요 (말·가마·돛단배 → 자동차·택시·여객선·고속 열차).</li>
    <li><b>통신 수단</b>도 발달했어요. 봉수·파발 → 전화·문자·전자 우편으로 소식을 훨씬 빨리 전해요.</li>
    <li><b>생활 도구</b>가 바뀌면서 생활이 편리해졌어요. 같은 일을 하는 옛날 것과 오늘날 것을 짝지어 비교해 봐요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.35;const y0=top+u*1.2,y1=H-u*.9;const pad=u*.35;const w=Math.min(W*.4,u*10);const gap=u*.3;const h=(y1-y0-gap*(K4-1))/K4;
    const L=[],Rr=[];for(let i=0;i<K4;i++){L.push({x:pad,y:y0+i*(h+gap),w,h});Rr.push({x:W-pad-w,y:y0+i*(h+gap),w,h});}return{W,H,u,top,y0,y1,w,h,L,R:Rr};},
  init(p){const st=p.state;Object.assign(st,{T:0,round:0,pairs:[],order:[],matched:{},sel:null,drag:null,bad:{},lines:[],t0:0,msg:'',msgT:0,okN:0,mood:'neutral',win:0});this.newRound(p);},
  newRound(p){const st=p.state,R=p.R;const L=p.levelId;const pool=L==='mix'?[...PS.move,...PS.talk,...PS.tool]:PS[L];st.round++;st.pairs=QK.take(p,pool,'dk_'+L,K4);st.order=R.shuffle([0,1,2,3]);st.matched={};st.sel=null;st.drag=null;st.bad={};st.lines=[];st.t0=st.T;st.win=0;
    p.ask('🕰️ <b>옛날</b>과 <b>오늘날</b>의 짝을 이어요','같은 일을 하는 것끼리 선으로 이어요 · '+st.round+'판');st.msg='같은 일을 하는 것끼리 이어요';st.msgT=3;},
  update(p,dt){const st=p.state;st.T+=dt;if(st.msgT>0)st.msgT-=dt;if(st.win>0)st.win-=dt;for(const k in st.bad){st.bad[k]-=dt;if(st.bad[k]<=0)delete st.bad[k];}st.lines.forEach(l=>l.t+=dt);},
  hitCard(p,x,y){const G=this.geo(p),st=p.state;for(let i=0;i<K4;i++){if(K.inRect(x,y,G.L[i]))return{side:'L',id:i,pos:i};}for(let k=0;k<K4;k++){if(K.inRect(x,y,G.R[k]))return{side:'R',id:st.order[k],pos:k};}return null;},
  tryPair(p,a,b){const st=p.state,G=this.geo(p);if(a.side===b.side)return false;const l=a.side==='L'?a:b,r=a.side==='L'?b:a;if(st.matched[l.id]!==undefined)return false;
    const P=st.pairs[l.id];
    if(l.id===r.id){st.matched[l.id]=1;const el=st.T-st.t0;st.t0=st.T;st.lines.push({l:l.pos,r:r.pos,id:l.id,t:0,c:LCOL[Object.keys(st.matched).length-1]});st.mood='happy';
      const ly=G.L[l.pos].y+G.h/2,ry=G.R[r.pos].y+G.h/2;p.hit(true,{pts:40+Math.round(20*Math.max(0,1-el/12)),x:G.W/2,y:(ly+ry)/2,tip:P[1]+' → '+P[3],tipMs:900});st.msg=P[1]+' → '+P[3];st.msgT=2;
      if(Object.keys(st.matched).length===K4){st.win=1.3;st.okN++;setTimeout(()=>{if(p.active)this.newRound(p);},1300);}}
    else{st.bad[l.pos+'L']=.5;st.bad[r.pos+'R']=.5;const P2=st.pairs[l.id];p.hit(false,{review:P2[1]+' ↔ '+P2[3],tip:'짝이 아니에요. 무엇을 하는 물건인지 생각해 봐요',tipMs:1300});st.mood='oops';}
    return true;},
  down(p,x,y){const st=p.state;if(st.win>0)return;const c=this.hitCard(p,x,y);if(!c||st.matched[c.side==='L'?c.id:-1]!==undefined&&c.side==='L')return;
    if(c.side==='R'&&st.lines.some(l=>l.r===c.pos))return;
    if(st.sel&&st.sel.side!==c.side){const s=st.sel;st.sel=null;st.drag=null;this.tryPair(p,s,c);return;}
    st.sel=c;st.drag={x,y,from:c};p.Snd.tone&&p.Snd.tone(520,.05,'sine',.04);},
  move(p,x,y,down){const st=p.state;if(st.drag&&down){st.drag.x=x;st.drag.y=y;}},
  up(p,x,y){const st=p.state;const d=st.drag;st.drag=null;if(!d||st.win>0)return;const c=this.hitCard(p,x,y);if(c&&c.side!==d.from.side&&!(c.side==='R'&&st.lines.some(l=>l.r===c.pos))){st.sel=null;this.tryPair(p,d.from,c);}},
  botAct(p){const st=p.state;if(st.win>0)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(st.sel){const k=st.order.indexOf(st.sel.id);if(st.sel.side==='L'){const r=G.R[k];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};}}
    const id=[0,1,2,3].find(i=>st.matched[i]===undefined);if(id==null)return null;const r=G.L[id];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;bg(g,W,H,u,t);
    /* 위 이름표 */
    const tw=Math.min(W*.27,u*5.5);[['옛날','#c28a3c',G.L[0].x+G.w/2],['오늘날',BLUE,G.R[0].x+G.w/2]].forEach(([s,c,x])=>{K.card(g,x-tw/2,G.top,tw,u*.85,u*.42,c,{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,s,x,G.top+u*.45,{size:u*.6,color:'#fff',stroke:INK,lw:u*.1,maxW:tw*.85});});
    K.card(g,W/2-u*.95,G.top-u*.02,u*1.9,u*.9,u*.45,'#fff',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🕰️ '+st.round+'판',W/2,G.top+u*.45,{size:u*.5,color:INK,maxW:u*1.9});
    const done=i=>st.matched[i]!==undefined;
    /* 이어진 선 */
    st.lines.forEach(l=>{const a=G.L[l.l],b=G.R[l.r];const x1=a.x+a.w,y1=a.y+a.h/2,x2=b.x,y2=b.y+b.h/2,k=Math.min(1,l.t/.35);g.strokeStyle='#fff';g.lineWidth=u*.22;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.bezierCurveTo((x1+x2)/2,y1,(x1+x2)/2,y2,x2,y2);g.stroke();
      g.strokeStyle=l.c;g.lineWidth=u*.12;g.stroke();
      if(l.t<1){const tt=Math.min(1,l.t/.9),mx=(1-tt)*(1-tt)*(1-tt)*x1+3*(1-tt)*(1-tt)*tt*(x1+x2)/2+3*(1-tt)*tt*tt*(x1+x2)/2+tt*tt*tt*x2,my=(1-tt)*(1-tt)*(1-tt)*y1+3*(1-tt)*(1-tt)*tt*y1+3*(1-tt)*tt*tt*y2+tt*tt*tt*y2;K.emo(g,st.pairs[l.id][0],mx,my,u*.9);}});
    /* 드래그 중인 선 */
    if(st.drag&&st.sel){const c=st.drag.from;const r=c.side==='L'?G.L[c.pos]:G.R[c.pos];const x1=c.side==='L'?r.x+r.w:r.x,y1=r.y+r.h/2;const x2=st.drag.x,y2=st.drag.y;g.strokeStyle=c.side==='L'?'#c28a3c':BLUE;g.lineWidth=u*.12;g.lineCap='round';g.setLineDash([u*.2,u*.2]);g.beginPath();g.moveTo(x1,y1);g.bezierCurveTo((x1+x2)/2,y1,(x1+x2)/2,y2,x2,y2);g.stroke();g.setLineDash([]);}
    /* 카드 */
    for(let i=0;i<K4;i++){const P=st.pairs[i];if(!P)continue;const stt=done(i)?'done':st.bad[i+'L']?'bad':(st.sel&&st.sel.side==='L'&&st.sel.id===i)?'sel':'';const li=st.lines.find(l=>l.id===i);oldCard(g,G.L[i],u,[P[0],P[1]],stt,li?li.c:'#a9a9a9');}
    for(let k=0;k<K4;k++){const id=st.order[k],P=st.pairs[id];if(!P)continue;const dn=st.lines.find(l=>l.r===k);const stt=dn?'done':st.bad[k+'R']?'bad':(st.sel&&st.sel.side==='R'&&st.sel.id===id)?'sel':'';newCard(g,G.R[k],u,[P[2],P[3]],stt,dn?dn.c:'#a9a9a9');}
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,H-u*.45,{size:Math.min(u*.7,W*.04),color:'#fff',stroke:INK,lw:u*.14,maxW:W*.94});
    if(st.win>0)K.txt(g,'🎉 다 이었어요!',W/2,H/2,{size:Math.min(u*1.4,W*.09),color:'#fff35c',stroke:INK,lw:u*.22,maxW:W*.8});
  },
};
Engine.boot(GAME);
