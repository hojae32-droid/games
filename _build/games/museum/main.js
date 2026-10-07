/* 4~6학년 사회 · 우리 문화유산 · 세계 유산 · 무형 유산 — 한밤의 박물관
   디자인: 불 꺼진 박물관에서 손전등으로 액자를 비춰요. 유물 액자와 설명 액자의 짝을 찾아 전시실을 채워요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b1020',GOLD='#d4a537',WINE='#9b1c31';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 18L24 6l20 12z" fill="#d4a537" stroke="#2b1020" stroke-width="3" stroke-linejoin="round"/><path d="M9 21v16M19 21v16M29 21v16M39 21v16" stroke="#fbe9c0" stroke-width="5"/><rect x="4" y="38" width="40" height="6" rx="1" fill="#9b1c31" stroke="#2b1020" stroke-width="3"/></svg>';
const DECKS=/*@@DECKS@@*/;
const DATA=/*@@DATA@@*/;
const NP=6;
function wall(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#2b0f1f','#3a1428','#1b0912']);
  g.save();g.strokeStyle='rgba(246,196,83,.06)';g.lineWidth=2;for(let x=-H;x<W;x+=u*1.4){g.beginPath();g.moveTo(x,0);g.lineTo(x+H,H);g.stroke();}g.restore();
  g.fillStyle='#120610';g.fillRect(0,H-u*.18,W,u*.18);}
function frameBox(g,x,y,w,h,u,lit,state){const lw=Math.max(3,u*.12);
  K.rr(g,x,y,w,h,u*.08);g.fillStyle=state==='ok'?'#c9921f':(lit?'#d4a537':'#8a6a22');g.fill();
  K.rr(g,x+lw,y+lw,w-lw*2,h-lw*2,u*.04);g.fillStyle='#4b1a2b';g.fill();
  g.strokeStyle='rgba(255,240,190,.55)';g.lineWidth=Math.max(1,u*.03);K.rr(g,x+lw*.45,y+lw*.45,w-lw*.9,h-lw*.9,u*.06);g.stroke();}
function backFace(g,x,y,w,h,u,t,k){frameBox(g,x,y,w,h,u,false);const lw=Math.max(3,u*.12);
  g.save();K.rr(g,x+lw,y+lw,w-lw*2,h-lw*2,u*.04);g.clip();const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,'#3b1630');gr.addColorStop(1,'#1c0a18');g.fillStyle=gr;g.fillRect(x,y,w,h);
  /* 돌기둥 무늬 */
  const cx=x+w/2,cy=y+h/2,s=Math.min(w,h)*.3;g.fillStyle='rgba(212,165,55,.55)';g.beginPath();g.moveTo(cx-s,cy-s*.35);g.lineTo(cx,cy-s);g.lineTo(cx+s,cy-s*.35);g.closePath();g.fill();
  for(let i=-1;i<=1;i++)g.fillRect(cx+i*s*.62-s*.1,cy-s*.25,s*.2,s*.8);g.fillRect(cx-s,cy+s*.6,s*2,s*.14);
  g.fillStyle='rgba(255,230,160,'+(.35+.2*Math.sin(t*2+k))+')';K.txt(g,'?',cx,y+h*.2,{size:Math.min(w,h)*.2,color:'rgba(255,230,160,.7)'});
  g.restore();}
function frontFace(g,x,y,w,h,u,card,state,t){frameBox(g,x,y,w,h,u,true,state);const lw=Math.max(3,u*.12);
  g.save();K.rr(g,x+lw,y+lw,w-lw*2,h-lw*2,u*.04);g.clip();
  const bg=card.t==='a'?['#fff3d0','#f6dca0']:['#fdf6e3','#efe0bd'];const gr=g.createLinearGradient(x,y,x,y+h);gr.addColorStop(0,bg[0]);gr.addColorStop(1,bg[1]);g.fillStyle=gr;g.fillRect(x,y,w,h);
  if(state==='ok'){g.fillStyle='rgba(255,230,120,.28)';g.fillRect(x,y,w,h);}
  if(card.t==='a'){K.emo(g,card.it[0],x+w/2,y+h*.36,Math.min(w*.6,h*.42));
    const py=y+h*.66,ph=h*.26;K.rr(g,x+w*.12,py,w*.76,ph,ph*.2);g.fillStyle='#2b1020';g.fill();g.strokeStyle='#d4a537';g.lineWidth=Math.max(1.5,u*.04);g.stroke();
    QK.txt(g,card.it[1],x+w/2,py+ph/2,w*.7,ph*.86,Math.min(ph*.5,u*.8),'#ffe9a8',1.1);}
  else{QK.txt(g,card.it[2],x+w/2,y+h/2,w-lw*2-u*.4,h-lw*2-u*.4,Math.min(u*.72,h*.2),'#3a1628',1.3);}
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const ITEMS=[['🔭','첨성대'],['✍️','훈민정음'],['🐢','거북선'],['🏺','청자']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const wide=W0>H0*1.25;const u=wide?H0/7:Math.min(W0,H0)/6.5;wall(g,W0,H0,u,T);
    const n=wide?4:2,cw=wide?Math.min(u*2.2,W0*.2):Math.min(u*2.4,W0*.3),ch=cw*1.25;const gap=u*.4;const x0=W0/2-(n*cw+(n-1)*gap)/2;const rows=wide?1:2;
    const lit=Math.floor(T/1.6)%4;
    for(let i=0;i<4;i++){const c=i%n,r=Math.floor(i/n);if(r>=rows)continue;const x=x0+c*(cw+gap),y=H0*(wide?.28:.12)+r*(ch+gap);const on=i===lit;
      if(on){const gl=g.createRadialGradient(x+cw/2,y+ch*.4,u*.2,x+cw/2,y+ch*.5,cw*1.3);gl.addColorStop(0,'rgba(255,230,150,.42)');gl.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=gl;g.fillRect(x-cw,y-ch*.5,cw*3,ch*2);}
      if(on)frontFace(g,x,y,cw,ch,u*.6,{t:'a',it:[ITEMS[i][0],ITEMS[i][1]]},'',T);else backFace(g,x,y,cw,ch,u*.6,T,i);}
    K.emo(g,'🔦',W0*(wide?.12:.16),H0*.84,u*1.3,Math.sin(T*1.5)*.3);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'museum',title:'한밤의 박물관',title1:'불 꺼진 전시실 탐험',title2:'한밤의 박물관',emoji:LOGO,
  subtitle:'4~6학년 사회 · 우리 문화유산',
  howto:'불 꺼진 박물관! 액자를 <b>두 개씩</b> 눌러 열어 보세요. 문화유산 액자와 알맞은 <b>설명 액자</b>가 짝이에요. 짝을 찾으면 환하게 불이 켜지고, 여섯 짝을 다 찾으면 다음 전시실로! 어디에 뭐가 있는지 기억해 두세요.',
  how:p=>({treasure:'<b>우리 문화유산</b>의 이름과 설명 짝 찾기',world:'<b>우리나라 세계 유산</b>의 짝 찾기',living:'<b>무형 유산</b>의 이름과 설명 짝 찾기'}[p.levelId]),
  theme:{c1:'#9b1c31',c2:'#d4a537'},hero:heroScene,vignette:.1,durs:[90,150,240],levelTitle:'어느 전시실로 갈까요?',
  txt:{who:'누가 관람객일까요?',dur:'관람 시간',pace:'틀렸을 때 보여 주는 시간',seat:'번 관람객 ',go:'전시실 입장!',s1:'1. 전시실',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:d.tag,t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>문화유산</b>은 조상들이 남겨 준 소중한 유물과 문화예요. 첨성대·훈민정음·측우기·거북선·직지처럼 우리 조상의 지혜가 담겨 있어요.</li>
    <li><b>세계 유산</b>은 유네스코가 인류 모두를 위해 보호하기로 한 곳이에요. 석굴암과 불국사, 종묘, 수원 화성, 한국의 갯벌 등이 있어요.</li>
    <li><b>무형 유산</b>은 눈에 보이지 않지만 이어져 오는 노래·춤·놀이·생활 문화예요. 판소리, 강강술래, 아리랑, 김장 문화가 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.35;const botH=u*1.1;const land=W>=H*1.1;const cols=land?4:3;return{W,H,u,top,land,cols,y0:top+u*.9,y1:H-botH};},
  rects(p){const G=this.geo(p);return QK.grid(G.W,G.y0,G.y1,NP*2,G.cols,G.u*.35,G.u*.3);},
  init(p){const st=p.state;Object.assign(st,{T:0,room:0,cards:[],open:[],done:new Set(),busy:false,fl:[],sparks:[],found:0,total:0,t0:0,msg:'',msgT:0,lx:.5,ly:.5,lit:.5,mood:'neutral',mT:0,vis:[]});this.newRoom(p);},
  newRoom(p){const st=p.state,R=p.R;const data=DATA[p.levelId]||DATA.treasure;st.room++;const items=QK.take(p,data,'dk_'+p.levelId,NP);
    const cards=[];items.forEach((it,i)=>{cards.push({id:i,t:'a',it});cards.push({id:i,t:'b',it});});st.cards=R.shuffle(cards);st.open=[];st.done=new Set();st.found=0;st.busy=false;st.fl=st.cards.map(()=>({f:0,tgt:0}));st.t0=st.T;
    p.ask('🔦 <b>제'+st.room+'전시실</b> 짝을 찾아요','액자를 두 개씩 열어 봐요');st.msg='액자를 두 개씩 열어 짝을 찾아요';st.msgT=3;},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.msgT>0)st.msgT-=dt;
    for(const c of st.fl){c.f+=(c.tgt-c.f)*Math.min(1,dt*10);if(Math.abs(c.tgt-c.f)<.01)c.f=c.tgt;}
    st.lx+=(st.tlx-st.lx)*Math.min(1,dt*6)||0;st.ly+=(st.tly-st.ly)*Math.min(1,dt*6)||0;
    st.sparks=st.sparks.filter(s=>(s.t+=dt)<.9);},
  down(p,x,y){const st=p.state;if(st.busy)return;const rs=this.rects(p);const k=rs.findIndex(r=>K.inRect(x,y,r));if(k<0||st.done.has(k)||st.open.includes(k))return;
    st.fl[k].tgt=1;st.open.push(k);st.tlx=(rs[k].x+rs[k].w/2)/p.W;st.tly=(rs[k].y+rs[k].h/2)/p.H;p.Snd.tone(600,.05,'sine',.04);
    if(st.open.length<2)return;
    const [a,b]=st.open;const A=st.cards[a],B=st.cards[b];st.busy=true;
    if(A.id===B.id&&A.t!==B.t){setTimeout(()=>{st.done.add(a);st.done.add(b);st.open=[];st.busy=false;st.found++;st.total++;st.mood='happy';st.mT=1.2;st.msg='✨ '+A.it[1]+' 전시 완료!';st.msgT=2;
        const el=st.T-st.t0;st.t0=st.T;const r1=rs[a],r2=rs[b];st.sparks.push({x:r1.x+r1.w/2,y:r1.y+r1.h/2,t:0},{x:r2.x+r2.w/2,y:r2.y+r2.h/2,t:0});
        p.hit(true,{pts:40+Math.round(30*Math.max(0,1-el/10)),x:(r1.x+r2.x+r2.w)/2,y:r1.y,tip:A.it[1]+' — '+A.it[2],tipMs:1100,quiet:false});
        if(st.found===NP){st.busy=true;setTimeout(()=>{if(p.active)p.hit(true,{pts:60,x:p.W/2,y:this.geo(p).y0,tip:'🎉 전시실 완성! 다음 전시실로',tipMs:1400});},300);setTimeout(()=>{if(p.active)this.newRoom(p);},1800);}},300);}
    else{const rev=[A,B].map(c=>c.it[1]+' — '+c.it[2]).join('\n');p.hit(false,{review:rev,tip:'짝이 아니에요. 자리를 기억해 둬요!',tipMs:1100});st.mood='oops';st.mT=.9;setTimeout(()=>{st.fl[a].tgt=0;st.fl[b].tgt=0;st.open=[];st.busy=false;},(850+0)/Math.max(.8,p.pace)*1);}},
  botAct(p){const st=p.state;if(st.busy||!st.cards.length)return null;const rs=this.rects(p);let k;
    if(st.open.length===1){const a=st.cards[st.open[0]];k=st.cards.findIndex((c,j)=>c.id===a.id&&c.t!==a.t);}
    else k=st.cards.findIndex((c,j)=>!st.done.has(j)&&!st.open.includes(j));
    if(k<0)return null;const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+rs[k].x+rs[k].w/2,y:rc.top+rs[k].y+rs[k].h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;wall(g,W,H,u,t);
    const rs=this.rects(p);
    /* 불 켜진 액자 아래쪽으로 퍼지는 빛 */
    rs.forEach((r,k)=>{if(st.done.has(k)){const gl=g.createRadialGradient(r.x+r.w/2,r.y+r.h*.4,u*.2,r.x+r.w/2,r.y+r.h*.5,r.w*1.1);gl.addColorStop(0,'rgba(255,225,140,.28)');gl.addColorStop(1,'rgba(255,225,140,0)');g.fillStyle=gl;g.fillRect(r.x-r.w,r.y-r.h*.5,r.w*3,r.h*2);}});
    rs.forEach((r,k)=>{const c=st.cards[k],f=st.fl[k];if(!c)return;const sx=Math.abs(Math.cos(f.f*Math.PI));const done=st.done.has(k);g.save();g.translate(r.x+r.w/2,r.y+r.h/2);g.scale(Math.max(.03,sx),1);g.translate(-r.w/2,-r.h/2);
      if(f.f<.5)backFace(g,0,0,r.w,r.h,u,t,k);else frontFace(g,0,0,r.w,r.h,u,c,done?'ok':'',t);g.restore();});
    for(const s of st.sparks)for(let i=0;i<7;i++){const a=i*TAU/7,rr=u*(.3+s.t*1.5);g.fillStyle=`rgba(255,224,120,${1-s.t/.9})`;g.beginPath();g.arc(s.x+Math.cos(a)*rr,s.y+Math.sin(a)*rr,u*.09,0,TAU);g.fill();}
    /* 손전등: 가장 최근에 연 액자 주변만 환하고 나머지는 어둡게 */
    const lx=(st.lx||.5)*W,ly=(st.ly||.5)*H;const vg=g.createRadialGradient(lx,ly,u*2,lx,ly,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(8,2,8,.5)');g.fillStyle=vg;g.fillRect(0,G.top,W,H-G.top);
    /* 위쪽 안내와 전시 현황 */
    const sw=Math.min(W*.92,u*17);K.card(g,W/2-sw/2,G.top,sw,u*.75,u*.1,'rgba(34,12,26,.92)',{stroke:GOLD,lw:2,blur:0,dy:0});
    K.txt(g,st.msgT>0?st.msg:'🔦 제'+st.room+'전시실 · 남은 짝 '+(NP-st.found),W/2-u*1.2,G.top+u*.38,{size:u*.42,color:'#fbe9c0',maxW:sw-u*3.4});
    for(let i=0;i<NP;i++){const x=W/2+sw/2-u*.4-(NP-1-i)*u*.4,y=G.top+u*.38;g.fillStyle=i<st.found?'#f6c453':'rgba(255,255,255,.2)';g.beginPath();g.arc(x,y,u*.13,0,TAU);g.fill();}
    /* 아래: 지금까지 전시한 유물 */
    K.txt(g,'🏛️ 전시한 유물 '+st.total+'점',W/2,H-u*.5,{size:Math.min(u*.5,W*.045),color:'#f6c453',stroke:'#12060d',lw:u*.1,maxW:W*.9});
  },
};
Engine.boot(GAME);
