/* 5학년 · 열과 우리 생활 — 얼음성 지키기 (단열 방패를 돌려 열을 막고, 알맞은 재료 고르기)
   디자인: 오로라 밤하늘 + 얼음 결정 + 서리 유리. 얼음성, 방패, 열 덩어리는 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 3l9 13-3 5 5 2-2 20H15L13 23l5-2-3-5z" fill="#bfe9ff" stroke="#3a8dde" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 3v38M18 21l6 5 6-5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><rect x="5" y="41" width="38" height="4" rx="2" fill="#7ab8f5"/></svg>';

/* ───────── 그림 도구 ───────── */
function flameDir(g,x,y,s,ang,t,seed){g.save();g.translate(x,y);g.rotate(ang+Math.PI/2);const sw=Math.sin(t*12+seed)*s*.08;
  const tear=(w,h,col,k)=>{g.fillStyle=col;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-w,-h*.2,-w*1.05,-h*.65,sw*k,-h);g.bezierCurveTo(w*.5,-h*.7,w*1.1,-h*.2,0,0);g.fill();};
  g.translate(0,s*.3);tear(s*.5,s*1.4,'#ff5a1f',1);tear(s*.36,s*1.1,'#ff9a1f',.7);tear(s*.2,s*.7,'#ffd23a',.4);tear(s*.1,s*.4,'#fff6c8',.2);g.restore();}
function crystal(g,x,y,w,h,col,hi){g.save();g.translate(x,y);g.fillStyle=col;g.beginPath();g.moveTo(0,-h);g.lineTo(w*.5,-h*.7);g.lineTo(w*.5,0);g.lineTo(-w*.5,0);g.lineTo(-w*.5,-h*.7);g.closePath();g.fill();
  g.fillStyle=hi;g.beginPath();g.moveTo(0,-h);g.lineTo(w*.5,-h*.7);g.lineTo(w*.1,-h*.65);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-w*.4,-h*.6,w*.12,h*.55);g.restore();}
function castle(g,x,y,s,t,glow){g.save();g.translate(x,y);
  K.glow(g,0,-s*.5,s*1.6,'#8fe3ff',.3+glow*.3);
  const body='#cfeeff',dark='#9ccbf0',hi='#ffffff';
  for(const [dx,w,h] of [[-.62,.36,.8],[.62,.36,.8]]){crystal(g,dx*s,0,w*s,h*s,dark,hi);}
  crystal(g,-.3*s,0,.5*s,1.1*s,body,hi);crystal(g,.3*s,0,.5*s,1.1*s,body,hi);crystal(g,0,0,.46*s,1.6*s,'#e4f6ff',hi);
  g.fillStyle='#7fb5e6';g.beginPath();g.moveTo(-.12*s,0);g.lineTo(-.12*s,-.3*s);g.arc(0,-.3*s,.12*s,Math.PI,0);g.lineTo(.12*s,0);g.fill();
  g.fillStyle=`rgba(255,244,190,${.6+.3*Math.sin(t*2)})`;for(const [dx,dy] of [[0,-.95],[-.3,-.6],[.3,-.6],[-.62,-.45],[.62,-.45]]){g.beginPath();g.ellipse(dx*s,dy*s,.045*s,.08*s,0,0,TAU);g.fill();}
  g.fillStyle='#fff';g.beginPath();g.moveTo(0,-1.75*s);g.lineTo(.05*s,-1.62*s);g.lineTo(-.05*s,-1.62*s);g.fill();g.restore();}
function snowflake(g,x,y,r,rot,a){g.save();g.translate(x,y);g.rotate(rot);g.strokeStyle=`rgba(255,255,255,${a})`;g.lineWidth=Math.max(1,r*.14);g.lineCap='round';for(let i=0;i<6;i++){g.rotate(Math.PI/3);g.beginPath();g.moveTo(0,0);g.lineTo(0,-r);g.moveTo(0,-r*.55);g.lineTo(r*.25,-r*.8);g.moveTo(0,-r*.55);g.lineTo(-r*.25,-r*.8);g.stroke();}g.restore();}
function aurora(g,W,H,t){g.save();g.globalCompositeOperation='screen';for(let k=0;k<3;k++){const gr=g.createLinearGradient(0,H*.05,0,H*.55);const c=[['rgba(80,255,200,.0)','rgba(80,255,200,.38)'],['rgba(120,170,255,.0)','rgba(120,170,255,.34)'],['rgba(200,140,255,.0)','rgba(200,140,255,.26)']][k];gr.addColorStop(0,c[0]);gr.addColorStop(.6,c[1]);gr.addColorStop(1,c[0]);g.fillStyle=gr;
  g.beginPath();g.moveTo(0,H*.55);for(let x=0;x<=W;x+=W/24)g.lineTo(x,H*(.18+k*.07)+Math.sin(x/W*5+t*.4+k*2)*H*.07);g.lineTo(W,H*.55);g.closePath();g.fill();}g.restore();}
function night(g,W,H,t){const sg=g.createLinearGradient(0,0,0,H);sg.addColorStop(0,'#0e1a4a');sg.addColorStop(.55,'#27408a');sg.addColorStop(1,'#6aa3d8');g.fillStyle=sg;g.fillRect(0,0,W,H);
  for(let i=0;i<50;i++){g.fillStyle=`rgba(255,255,255,${.3+.6*Math.abs(Math.sin(t*1.3+i))})`;g.fillRect(hash(i)*W,hash(i+70)*H*.55,1.6,1.6);}aurora(g,W,H,t);}
function snowfall(g,W,H,t,u,n){for(let i=0;i<n;i++){const x=((hash(i)*W+Math.sin(t*.6+i)*u*.4)%W+W)%W,y=((hash(i+30)*H+t*u*(.8+hash(i+5)))%H);g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.arc(x,y,u*(.03+hash(i+9)*.04),0,TAU);g.fill();}}
function frosted(g,str,cx,cy,s,bg,fg,maxW){g.save();g.font=K.font(s);const w=Math.min(maxW||1e9,K.mw(g,str,s)+s*1.3),h=s*1.6;K.rr(g,cx-w/2,cy-h/2,w,h,h/2);g.fillStyle=bg;g.fill();g.lineWidth=1.5;g.strokeStyle='rgba(255,255,255,.95)';g.stroke();g.restore();K.txt(g,str,cx,cy+s*.03,{size:s,color:fg,maxW:w-s*.4});}

/* 첫 화면 전체 배경: 오로라 아래 얼음성, 눈이 내려요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const u=Math.min(W,H)/11;night(g,W,H,T);
    /* 눈 언덕 */
    g.fillStyle='#e8f4ff';g.beginPath();g.moveTo(0,H);g.lineTo(0,H*.8);g.quadraticCurveTo(W*.25,H*.7,W*.5,H*.8);g.quadraticCurveTo(W*.8,H*.9,W,H*.76);g.lineTo(W,H);g.fill();
    g.fillStyle='#cfe5f8';g.beginPath();g.moveTo(0,H);g.lineTo(0,H*.9);g.quadraticCurveTo(W*.3,H*.82,W*.6,H*.92);g.quadraticCurveTo(W*.85,H*.97,W,H*.88);g.lineTo(W,H);g.fill();
    castle(g,W*.5,H*.8,Math.min(W*.13,H*.22),T,.5+.5*Math.sin(T));
    /* 날아오는 불꽃 */
    for(let k=0;k<3;k++){const ph=(T*.22+k/3)%1,a=-.5+k*1.7;const r=lerp(Math.min(W,H)*.6,Math.min(W,H)*.2,ph);flameDir(g,W*.5+Math.cos(a)*r*1.3,H*.62+Math.sin(a)*r*.6,u*.5,Math.atan2(-Math.sin(a)*.6,-Math.cos(a)*1.3),T,k);}
    snowfall(g,W,H,T,u,70);for(let i=0;i<8;i++)snowflake(g,hash(i*3)*W,hash(i*7+1)*H*.6,u*.4,T*.4+i,.5);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const HEAT_MAT=[
  ['스타이로폼','금속판','스타이로폼은 열이 잘 이동하지 않아요 (아이스박스)'],['솜','알루미늄 포일','솜 사이의 공기가 열의 이동을 막아요'],
  ['공기층이 있는 이중창','얇은 유리 한 장','두 유리 사이 공기층이 단열을 해요'],['나무판','구리판','나무는 열이 느리게 이동해요'],
  ['털실 옷감','쇠판','털실 사이의 공기가 열을 막아요'],['뽁뽁이(공기 방울 비닐)','철판','공기 방울이 단열을 해요'],
];
const HEAT_Q=[
  ['프라이팬 <b>바닥</b>을 금속으로 만드는 까닭은?','열이 잘 이동해서','열이 잘 이동하지 않아서'],['프라이팬 <b>손잡이</b>를 나무로 만드는 까닭은?','열이 잘 이동하지 않아서','열이 잘 이동해서'],
  ['난로를 켜면 방의 어디부터 따뜻해질까?','위쪽','아래쪽'],['에어컨은 어디에 다는 것이 좋을까?','높은 곳','낮은 곳'],
  ['따뜻한 물에 차가운 숟가락을 넣으면 열은?','물 → 숟가락','숟가락 → 물'],['열은 어디에서 어디로 이동할까?','온도가 높은 곳 → 낮은 곳','온도가 낮은 곳 → 높은 곳'],
  ['고체에서 열이 이동하는 방법은?','전도','대류'],['액체·기체에서 데워진 것이 위로 올라가며 열이 이동하는 방법은?','대류','전도'],
  ['물체의 온도를 정확히 재려면?','온도계를 써요','손으로 만져 봐요'],['열이 이동하지 않도록 막는 것을 무엇이라고 할까?','단열','전도'],
];
const GAME={
  id:'sci5-heat',title:'얼음성 지키기',title1:'열을 막아라!',title2:'얼음성 지키기',emoji:LOGO,
  subtitle:'5학년 · 열과 우리 생활',
  howto:'손가락을 얼음성 둘레로 돌려 <b>방패</b>를 움직여 날아오는 <b>열</b>을 막아요! 가끔 나오는 질문에 맞게 고르면 튼튼한 <b>단열 방패</b>가 되고, 틀리면 열이 새는 방패가 돼요.',
  how:'손가락을 둥글게 돌려 <b>방패</b>로 🔥 막기<br>아래 버튼으로 재료 고르기!',
  txt:{who:'누구와 함께 지킬까요?',dur:'수비 시간',seat:'번 수비대 ',go:'성 지키기 시작!'},
  theme:{c1:'#3a8dde',c2:'#ff7a59'},hero:heroScene,vignette:.08,durs:[60,90,120],
  levelTitle:'막을 열 고르기',
  levels:[
    {id:'ins',g:'5학년 · 열과 우리 생활',t:'🧊 단열 재료 고르기',d:'열이 잘 이동하지 않는 재료'},
    {id:'move',g:'5학년 · 열과 우리 생활',t:'🔥 열의 이동',d:'전도·대류, 온도와 열'},
    {id:'all',g:'5학년 · 열과 우리 생활',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
  summary:`<ul><li>열은 <b>온도가 높은 곳에서 낮은 곳으로</b> 이동해요. 물체의 온도는 온도계로 정확하게 재요.</li>
    <li><b>전도</b>: 고체에서 열이 이동하는 방법. 금속은 열이 빨리, 나무·플라스틱은 느리게 이동해요 (프라이팬 바닥은 금속, 손잡이는 나무).</li>
    <li><b>대류</b>: 액체·기체에서 데워진 것이 위로 올라가며 열이 이동해요 (난로를 켜면 위쪽부터 따뜻, 에어컨은 높은 곳에).</li>
    <li><b>단열</b>: 열의 이동을 막는 것. 스타이로폼, 솜, 털, 공기층(이중창, 뽁뽁이)이 단열을 잘해요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{ang:-Math.PI/2,good:true,orbs:[],spawnT:1,askT:2.5,melt:0,kN:0,asking:false,T:0});},
  start(p){},
  ask(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?(st.kN++%2?'move':'ins'):L;st.asking=true;
    let q,a,b,why;if(k==='ins'){const m=p.deck(HEAT_MAT,'hm');q='🛡️ 방패를 <b>단열이 잘 되는</b> 재료로 바꿔요!';a=m[0];b=m[1];why=m[2];}
    else{const m=p.deck(HEAT_Q,'hq');q='🔥 '+m[0];a=m[1];b=m[2];why=`${plain(m[0])} → ${m[1]}`;}
    p.ask(q,'아래에서 골라요 · 고르는 동안에도 방패를 움직여요');const opts=R.shuffle([a,b]);
    p.tools(opts.map(t=>({t})),(i,t)=>{if(!st.asking)return;st.asking=false;const ok=t.t===a;st.good=ok;p.ctrl.innerHTML='';
      p.hit(ok,{x:p.W/2,y:p.H*.15,tip:ok?`${why} — 튼튼한 단열 방패!`:`정답: <b>${a}</b> — 방패로 열이 새어 들어와요!`,review:k==='ins'?`단열: ${a} (${why})`:why});
      p.ask(ok?'🛡️ 튼튼한 단열 방패! 열을 막아요':'⚠️ 열이 새는 방패… 다음 문제를 기다려요','손가락을 둥글게 돌려 방패를 움직여요');st.askT=p.R.num(6,8);},{toggle:false});},
  geo(p){return{cx:p.W/2,cy:p.H*.52,Rs:Math.min(p.W,p.H)*.3};},
  update(p,dt){const st=p.state,u=p.u,G=this.geo(p);
    if(!st.asking){st.askT-=dt;if(st.askT<=0)this.ask(p);}
    st.spawnT-=dt;if(st.spawnT<=0){const a=p.Rf.num(0,6.28);const d=Math.hypot(p.W,p.H)*.55;st.orbs.push({a,r:d,sp:u*(1.5+p.t/p.dur*1.1)*p.Rf.num(.85,1.15)});st.spawnT=Math.max(.7,1.5-p.t/p.dur*.6)*p.Rf.num(.7,1.2);}
    const half=st.good?.62:.35;
    for(const o of st.orbs){const pr=o.r;o.r-=o.sp*dt;
      if(!o.done&&pr>=G.Rs&&o.r<G.Rs){let da=Math.atan2(Math.sin(o.a-st.ang),Math.cos(o.a-st.ang));
        if(Math.abs(da)<half){if(st.good||p.Rf.chance(.4)){o.done=true;o.blocked=true;p.add(10,G.cx+Math.cos(o.a)*G.Rs,G.cy+Math.sin(o.a)*G.Rs);p.Snd.tone(1200,.04,'sine',.04);p.burst(G.cx+Math.cos(o.a)*G.Rs,G.cy+Math.sin(o.a)*G.Rs,'#bfeaff',8);}}}
      if(!o.done&&o.r<u*1.1){o.done=true;st.melt=.5;p.add(-15,G.cx,G.cy-u*1.5);p.Snd.slide(400,180,.25,.05);}}
    st.orbs=st.orbs.filter(o=>!o.done);st.melt=Math.max(0,st.melt-dt);},
  draw(p,g,dt){const W=p.W,H=p.H,u=Math.min(p.u,W/8),st=p.state,G=this.geo(p);st.T+=dt;const t=st.T;
    night(g,W,H,t);
    /* 눈 덮인 땅 */
    g.fillStyle='#e8f4ff';g.beginPath();g.moveTo(0,H);g.lineTo(0,H*.86);g.quadraticCurveTo(W*.3,H*.8,W*.55,H*.87);g.quadraticCurveTo(W*.85,H*.93,W,H*.84);g.lineTo(W,H);g.fill();
    /* 방어 궤도 */
    g.save();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=Math.max(2,u*.05);g.setLineDash([u*.1,u*.18]);g.lineDashOffset=-t*u*.3;g.beginPath();g.arc(G.cx,G.cy,G.Rs,0,TAU);g.stroke();g.restore();
    castle(g,G.cx,G.cy+u*1.3,u*1.7,t,st.melt>0?0:1);
    if(st.melt>0){g.fillStyle=`rgba(255,80,60,${st.melt*.45})`;g.beginPath();g.arc(G.cx,G.cy,u*2.4,0,TAU);g.fill();g.fillStyle='#8fd8ff';for(let k=0;k<3;k++){g.beginPath();g.ellipse(G.cx+(k-1)*u*.6,G.cy+u*.2+(.5-st.melt)*u*1.5,u*.07,u*.12,0,0,TAU);g.fill();}}
    snowfall(g,W,H,t,u,40);snowflake(g,G.cx+u*1.6,G.cy-u*1.2,u*.3,t*.5,.6);snowflake(g,G.cx-u*1.8,G.cy-u*.9,u*.22,-t*.4,.5);
    /* 열 덩어리 */
    for(const o of st.orbs){const x=G.cx+Math.cos(o.a)*o.r,y=G.cy+Math.sin(o.a)*o.r;K.glow(g,x,y,u*.9,'#ff7a1a',.45);flameDir(g,x,y,u*.7,o.a+Math.PI,t,o.a*7);}
    /* 방패 */
    const half=st.good?.62:.35,a0=st.ang-half,a1=st.ang+half;g.save();g.lineCap='round';
    if(st.good){g.strokeStyle='rgba(143,227,255,.35)';g.lineWidth=u*.95;g.beginPath();g.arc(G.cx,G.cy,G.Rs,a0,a1);g.stroke();
      g.strokeStyle=p.color;g.lineWidth=u*.56;g.beginPath();g.arc(G.cx,G.cy,G.Rs,a0,a1);g.stroke();
      g.strokeStyle='#d9f3ff';g.lineWidth=u*.4;g.beginPath();g.arc(G.cx,G.cy,G.Rs,a0,a1);g.stroke();
      g.strokeStyle='#ffffff';g.lineWidth=u*.1;g.beginPath();g.arc(G.cx,G.cy,G.Rs-u*.08,a0+.05,a1-.05);g.stroke();
      g.fillStyle='rgba(255,255,255,.9)';for(let a=a0+.08;a<a1-.04;a+=.15){snowflake(g,G.cx+Math.cos(a)*(G.Rs),G.cy+Math.sin(a)*(G.Rs),u*.11,a*3,.9);}}
    else{g.strokeStyle='#7c8aa6';g.lineWidth=u*.3;g.setLineDash([u*.35,u*.2]);g.beginPath();g.arc(G.cx,G.cy,G.Rs,a0,a1);g.stroke();g.setLineDash([]);
      g.strokeStyle='rgba(255,90,70,.85)';g.lineWidth=2.5;g.setLineDash([4,6]);g.beginPath();g.arc(G.cx,G.cy,G.Rs+u*.38,a0,a1);g.stroke();}
    g.restore();
    const lx=G.cx+Math.cos(st.ang)*(G.Rs+u*.85),ly=G.cy+Math.sin(st.ang)*(G.Rs+u*.85);
    frosted(g,st.good?'🛡️ 단열 방패':'⚠️ 열이 새는 방패',K.clamp(lx,u*1.8,W-u*1.8),K.clamp(ly,u*.5,H-u*.5),u*.34,st.good?'rgba(255,255,255,.92)':'rgba(255,226,226,.95)',st.good?'#1d5fa8':'#b4261e');},
  aim(p,x,y){const G=this.geo(p);if(Math.hypot(x-G.cx,y-G.cy)<p.u*.6)return;p.state.ang=Math.atan2(y-G.cy,x-G.cx);},
  down(p,x,y){this.aim(p,x,y);},
  move(p,x,y,down,e){if(down||(e&&e.pointerType==='mouse'))this.aim(p,x,y);},
};
Engine.boot(GAME);
