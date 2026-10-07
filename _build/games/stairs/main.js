/* 4~6학년 사회 · 우리 지역의 일 · 법과 정치 · 경제의 과정 — 한 칸씩 계단 오르기
   디자인: 구름 위 성으로 가는 무지개 계단. 일이 일어나는 순서대로 카드를 눌러 한 칸씩 올라가요. 순서가 틀리면 미끌! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2f6b';
const COLORS=['#FF8A65','#FFB74D','#FFD54F','#AED581','#4FC3F7','#9575CD'];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 42h10V32h10V22h10V12h10v30z" fill="#9575cd" stroke="#3b2f6b" stroke-width="3" stroke-linejoin="round"/><path d="M34 12V4l8 3-8 3" fill="#ff5fa2" stroke="#3b2f6b" stroke-width="2.5" stroke-linejoin="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const PR=/*@@PR@@*/;
function skyBg(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#9fd2ff','#d9ccff','#ffd9ec']);K.clouds(g,W,H*.5,t*.5,.12,3,u*1.8);}
function critter(g,x,y,s,mood,t,hop){g.save();g.translate(x,y-Math.abs(Math.sin(hop*Math.PI))*s*.6);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  K.shadow&&K.shadow(g,0,s*.02,s*.35,s*.06,.25);
  g.fillStyle='#fff';for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.2,-s*1.12,s*.1,s*.3,d*.18,0,TAU);g.fill();g.stroke();g.fillStyle='#ffc2dd';g.beginPath();g.ellipse(d*s*.2,-s*1.1,s*.045,s*.2,d*.18,0,TAU);g.fill();g.fillStyle='#fff';}
  g.beginPath();g.ellipse(0,-s*.42,s*.4,s*.44,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;for(const d of[-1,1]){if(mood==='oops'){g.beginPath();g.moveTo(d*s*.14-s*.05,-s*.58-s*.05);g.lineTo(d*s*.14+s*.05,-s*.58+s*.05);g.moveTo(d*s*.14+s*.05,-s*.58-s*.05);g.lineTo(d*s*.14-s*.05,-s*.58+s*.05);g.stroke();}else{g.beginPath();g.arc(d*s*.14,-s*.56,s*.05,0,TAU);g.fill();}}
  g.fillStyle='#ffa6c9';g.beginPath();g.ellipse(0,-s*.46,s*.05,s*.035,0,0,TAU);g.fill();
  g.beginPath();if(mood==='oops'){g.arc(0,-s*.32,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();}else{g.arc(0,-s*.4,s*.09,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='#7c5cff';g.beginPath();g.ellipse(0,-s*.06,s*.3,s*.12,0,0,TAU);g.fill();g.stroke();
  g.restore();}
function castle(g,x,y,s){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.04);g.strokeStyle=INK;
  const blk=(bx,by,w,h,c)=>{g.fillStyle=c;g.fillRect(bx,by,w,h);g.strokeRect(bx,by,w,h);};
  blk(-s*.5,-s*.55,s,s*.55,'#fff1f7');blk(-s*.62,-s*.9,s*.3,s*.9,'#ffe0ef');blk(s*.32,-s*.9,s*.3,s*.9,'#ffe0ef');
  for(const bx of[-s*.62,s*.32]){g.fillStyle='#ff5fa2';g.beginPath();g.moveTo(bx-s*.04,-s*.9);g.lineTo(bx+s*.15,-s*1.25);g.lineTo(bx+s*.34,-s*.9);g.closePath();g.fill();g.stroke();}
  g.fillStyle='#7c5cff';g.beginPath();g.arc(0,-s*.12,s*.14,Math.PI,0);g.lineTo(s*.14,0);g.lineTo(-s*.14,0);g.closePath();g.fill();g.stroke();
  g.restore();}
function flagArt(g,x,y,s,up,t){g.save();g.translate(x,y);g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.07);g.beginPath();g.moveTo(0,0);g.lineTo(0,-s*1.1);g.stroke();
  const fy=up?-s*1.1:-s*.35;g.fillStyle='#ff4d6d';g.beginPath();g.moveTo(0,fy);for(let i=0;i<=8;i++)g.lineTo(i*s*.075,fy+Math.sin(t*5+i)*s*.04);g.lineTo(s*.6,fy+s*.3);for(let i=8;i>=0;i--)g.lineTo(i*s*.075,fy+s*.3+Math.sin(t*5+i)*s*.04);g.closePath();g.fill();g.stroke();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;skyBg(g,W0,H0,u,T);const n=5,sw=Math.min(W0*.12,u*1.3);const x0=W0/2-sw*n/2,yb=H0*.88,dh=Math.min(H0*.12,u*.9);
    for(let i=0;i<n;i++){const yt=yb-(i+1)*dh;g.fillStyle=COLORS[i];K.rr(g,x0+i*sw,yt,sw*1.1,yb-yt,u*.1);g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();}
    const k=(T*.8)%(n+1.5),idx=Math.min(n-1,Math.floor(k)),f=k-Math.floor(k);castle(g,x0+n*sw+u*.4,yb-n*dh,u*1.1);critter(g,x0+idx*sw+sw*.5,yb-(idx+1)*dh,u*.9,'happy',T,Math.min(1,f*2));flagArt(g,x0+(n-1)*sw+sw*.7,yb-n*dh,u*.7,k>n,T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'stairs',title:'한 칸씩 계단 오르기',title1:'구름 위 성으로!',title2:'한 칸씩 계단 오르기',emoji:LOGO,
  subtitle:'4~6학년 사회 · 일이 일어나는 순서',
  howto:'아래 카드 중에서 <b>가장 먼저 일어나는 일</b>부터 차례대로 눌러요. 맞으면 토끼가 한 칸씩 계단을 올라가요. 꼭대기에 닿으면 깃발과 보너스! 틀리면 미끌!',
  how:p=>({local:'<b>우리 지역</b>의 일을 순서대로',politics:'<b>법과 정치</b>의 과정을 순서대로',econ:'<b>경제</b>의 과정을 순서대로'}[p.levelId]),
  theme:{c1:'#7c5cff',c2:'#ff5fa2'},hero:heroScene,vignette:.03,durs:[90,150,240],levelTitle:'어떤 계단을 오를까요?',
  txt:{who:'누가 오를까요?',dur:'등산 시간',pace:'생각하는 시간',seat:'번 등산가 ',go:'계단 오르기 시작!',s1:'1. 계단',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'4~6학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>문제 해결 과정</b>: 문제 확인 → 원인 살펴보기 → 해결 방안 찾기 → 결정하기 → 실천하기 순서로 해요.</li>
    <li><b>법이 만들어지는 과정</b>: 법률안 제출 → 위원회 심사 → 본회의 의결 → 정부로 보내기 → 대통령 공포예요.</li>
    <li><b>우리나라 산업 발전</b>: 경공업 → 중화학 공업 → 자동차·전자 → 반도체·정보 통신 → 첨단 산업 순서로 발전했어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const n=st.P?st.P[1].length:5;const top=(p.top||0)+u*.4;const land=W>=H*1.1;const pad=u*.35;
    let sc,cr;if(land){sc={x:pad,y:top,w:W*.5-pad,h:H-top-pad};cr={x:W*.52,y:top+u*.2,w:W*.48-pad,h:H-top-pad-u*.2};}
    else{const sh=Math.min(H*.4,W*1.05);sc={x:pad,y:top,w:W-pad*2,h:sh};cr={x:pad,y:top+sh+u*.3,w:W-pad*2,h:H-top-sh-u*.3-pad};}
    const gap=u*.22;const ch=(cr.h-gap*(n-1))/n;const cards=[];for(let i=0;i<n;i++)cards.push({x:cr.x,y:cr.y+i*(ch+gap),w:cr.w,h:ch});
    return{W,H,u,land,sc,cards,n};},
  init(p){const st=p.state;Object.assign(st,{T:0,P:null,run:0,lvl:0,order:[],used:[],bad:{},t0:0,win:0,mood:'neutral',mT:0,hx:0,hy:0,hop:1,fromX:0,fromY:0,msg:'',msgT:0,okN:0,slip:0,wrongRun:0});this.newRun(p);},
  newRun(p){const st=p.state,R=p.R;const L=p.levelId;const P=p.deck(PR[L],'dk_'+L);st.P=P;st.run++;st.lvl=0;const n=P[1].length;st.order=R.shuffle(P[1].map((s,i)=>i));st.used=[];st.bad={};st.t0=st.T;st.win=0;st.wrongRun=0;st.hop=1;
    const G=this.geo(p);const pos=this.stepPos(G,0,n);st.hx=st.fromX=pos.x;st.hy=st.fromY=pos.y;
    p.ask('🪜 <b>'+P[0]+'</b>','먼저 일어나는 일부터 차례대로 눌러요');st.msg='맨 처음에 하는 일은?';st.msgT=60;},
  /* k칸 올라간 토끼의 위치 */
  stepPos(G,k,n){const S=G.sc;const bottom=S.y+S.h*.94,sw=S.w*.68/n;const dh=Math.min(S.h*.72/n,sw*1.1);
    if(k===0)return{x:S.x+S.w*.05,y:bottom,sw,dh,bottom};const i=k-1;return{x:S.x+S.w*.14+i*sw+sw*.5,y:bottom-(i+1)*dh,sw,dh,bottom};},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.msgT>0)st.msgT-=dt;if(st.win>0){st.win-=dt;}
    for(const k in st.bad){st.bad[k]-=dt;if(st.bad[k]<=0)delete st.bad[k];}
    if(st.hop<1)st.hop=Math.min(1,st.hop+dt*3);st.slip=Math.max(0,st.slip-dt);},
  down(p,x,y){const st=p.state,P=st.P;if(!P||st.win>0)return;const G=this.geo(p);const k=G.cards.findIndex(r=>K.inRect(x,y,r));if(k<0)return;const i=st.order[k];if(st.used.includes(i))return;const r=G.cards[k];
    const n=P[1].length;
    if(i===st.lvl){st.used.push(i);st.lvl++;const el=st.T-st.t0;st.t0=st.T;const from=this.stepPos(G,st.lvl-1,n),to=this.stepPos(G,st.lvl,n);st.fromX=from.x;st.fromY=from.y;st.hx=to.x;st.hy=to.y;st.hop=0;st.mood='happy';st.mT=.8;
      p.hit(true,{pts:30+Math.round(20*Math.max(0,1-el/8)),x:r.x+r.w/2,y:r.y,tip:(st.lvl===n?null:undefined),quiet:false});p.Snd.step&&p.Snd.step();
      st.msg=st.lvl===n?'🚩 꼭대기 도착! 보너스 +30':['좋아요! 다음은?','한 칸 더!','그다음은?'][st.lvl%3];st.msgT=60;
      if(st.lvl===n){st.okN++;st.win=1.8;p.Snd.bell&&p.Snd.bell(880,0,.08);setTimeout(()=>{if(p.active)p.hit(true,{pts:30,x:p.W/2,y:G.sc.y+G.sc.h*.2,tip:'🚩 꼭대기 도착! '+P[0],tipMs:1300,review:undefined});},300);setTimeout(()=>{if(p.active)this.newRun(p);},1900);}}
    else{st.bad[k]=.5;st.slip=.5;st.mood='oops';st.mT=.9;st.wrongRun++;st.msg='미끌! 그보다 먼저 하는 일이 있어요';st.msgT=2;
      p.hit(false,{review:P[0]+': '+P[1].map((s,j)=>(j+1)+'. '+s).join(' → '),tip:'미끌! 먼저 하는 일이 있어요',tipMs:1400});}},
  botAct(p){const st=p.state,P=st.P;if(!P||st.win>0)return null;const G=this.geo(p);const k=st.order.indexOf(st.lvl);if(k<0)return null;const r=G.cards[k];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,P=st.P;if(!P)return;skyBg(g,W,H,u,t);const n=P[1].length,S=G.sc;
    /* 계단 */
    const pos0=this.stepPos(G,0,n);const sw=pos0.sw,dh=pos0.dh,bottom=pos0.bottom;
    castle(g,S.x+S.w*.14+n*sw+sw*.05,bottom-n*dh,Math.min(S.w*.2,u*2.2));
    for(let i=0;i<n;i++){const x0=S.x+S.w*.14+i*sw,yt=bottom-(i+1)*dh;const on=st.used.includes(i);
      K.rr(g,x0,yt,sw*1.08,bottom-yt+u*.3,u*.15);g.fillStyle=on?COLORS[i%6]:K.shade?K.shade(COLORS[i%6],.2):COLORS[i%6];g.globalAlpha=on?1:.55;g.fill();g.globalAlpha=1;g.lineWidth=Math.max(2,u*.07);g.strokeStyle=INK;g.stroke();
      g.fillStyle='rgba(255,255,255,.55)';K.rr(g,x0+sw*.06,yt+u*.06,sw*.96,Math.min(u*.22,dh*.25),u*.1);g.fill();
      if(on)QK.txt(g,P[1][i],x0+sw*.54,yt+dh*.55+Math.max(0,(bottom-yt-dh)*.15),sw*.88,Math.max(dh*.9,(bottom-yt)*.5),Math.min(u*.55,sw*.2),INK,1.1);
      else K.txt(g,String(i+1),x0+sw*.5,yt+dh*.45,{size:Math.min(u*.8,dh*.6),color:'rgba(59,47,107,.6)',maxW:sw*.6});}
    flagArt(g,S.x+S.w*.14+(n-1)*sw+sw*.78,bottom-n*dh,Math.min(u*.8,dh*1.2),st.lvl===n,t);
    /* 토끼 */
    const k=Math.min(1,st.hop);const e=k*k*(3-2*k);const cur=this.stepPos(G,st.lvl,n);let hx=st.fromX+(cur.x-st.fromX)*e,hy=st.fromY+(cur.y-st.fromY)*e;if(st.hop>=1){hx=cur.x;hy=cur.y;}let rot=0;if(st.slip>0){hx-=Math.sin(st.slip*12)*u*.15;}
    critter(g,hx,hy,Math.min(u*1.3,dh*1.4),st.mood,t,st.hop<1?st.hop:0);
    if(st.win>0)for(let i=0;i<10;i++){const a=i/10*TAU+t*2,r=u*(1.2+(1.8-st.win)*1.2);K.txt(g,'✨',hx+Math.cos(a)*r,hy-u+Math.sin(a)*r*.6,{size:u*.5,alpha:Math.min(1,st.win)});}
    /* 카드 */
    G.cards.forEach((r,kk)=>{const i=st.order[kk];if(i==null)return;const used=st.used.includes(i);const bad=st.bad[kk];
      if(used){g.save();g.globalAlpha=.5;K.rr(g,r.x,r.y,r.w,r.h,Math.min(u*.3,r.h*.3));g.fillStyle='rgba(255,255,255,.4)';g.fill();g.setLineDash([8,6]);g.lineWidth=2;g.strokeStyle='rgba(91,70,184,.5)';g.stroke();g.setLineDash([]);K.txt(g,'✔ '+(st.used.indexOf(i)+1)+'단계',r.x+r.w/2,r.y+r.h/2,{size:Math.min(r.h*.4,u*.7),color:'#5b46b8',maxW:r.w*.8});g.restore();}
      else QK.card(g,u,r,P[1][i],bad?'bad':'idle',{bd:'#5b46b8',ink:INK,left:0});});
    /* 안내 문구 */
    if(st.msgT>0&&st.msg){const my=G.land?G.sc.y+G.sc.h*.06:G.sc.y+G.sc.h+u*.05;K.txt(g,st.msg,G.land?G.sc.x+G.sc.w/2:G.sc.x+G.sc.w*.4,G.land?G.sc.y+u*.6:G.sc.y+u*1.6,{size:Math.min(u*.7,W*.04),color:'#fff',stroke:INK,lw:u*.14,maxW:G.land?G.sc.w*.95:G.sc.w*.72});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🚩 '+(st.okN||0)+'번 정상',u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.3});
  },
};
Engine.boot(GAME);
