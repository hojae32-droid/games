/* 5학년 · 우리 몸의 구조와 기능 — 인체 퍼즐 구조대 (기관을 끌어다 몸속 제자리에 놓기)
   디자인: 하얀 병원 + 민트 + 산호. 꼬마 환자가 표정으로 반응하고, 심전도 모니터가 맞힐수록 빨라져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="10" fill="#fff" stroke="#0f766e" stroke-width="3"/><path d="M20 12h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="#ff5d73" stroke="#0f766e" stroke-width="2.4" stroke-linejoin="round"/></svg>';
const ORG={
  뇌:{pos:[[0,.07]],f:'자극을 받아들여 해석하고 행동을 명령해요',sys:'신경계'},
  식도:{pos:[[0,.2]],f:'음식물이 위로 넘어가는 통로',sys:'소화'},
  기관:{pos:[[0,.2]],f:'코로 들어온 공기가 폐로 가는 통로',sys:'호흡'},
  폐:{pos:[[-.11,.3],[.11,.3]],f:'산소를 받아들이고 이산화 탄소를 내보내요',sys:'호흡'},
  심장:{pos:[[.05,.32]],f:'펌프처럼 뛰어 혈액을 온몸으로 보내요',sys:'순환'},
  간:{pos:[[-.08,.4]],f:'쓸개즙을 만들어 지방의 소화를 도와요',sys:'소화'},
  위:{pos:[[.08,.41]],f:'음식물을 잘게 쪼개고 소화액과 섞어요',sys:'소화'},
  작은창자:{pos:[[0,.5]],f:'음식물을 더 잘게 쪼개고 영양소를 흡수해요',sys:'소화'},
  큰창자:{pos:[[-.11,.5],[.11,.5],[0,.46]],f:'음식물 찌꺼기에서 물을 흡수해요',sys:'소화'},
  콩팥:{pos:[[-.09,.45],[.09,.45]],f:'혈액 속 노폐물을 걸러 오줌을 만들어요',sys:'배설'},
  방광:{pos:[[0,.6]],f:'오줌을 모아 두었다가 내보내요',sys:'배설'},
  뼈:{pos:[[-.24,.38],[.24,.38],[-.08,.8],[.08,.8]],f:'몸의 형태를 만들고 몸속 기관을 보호해요',sys:'운동'},
  근육:{pos:[[-.24,.32],[.24,.32],[-.08,.75],[.08,.75]],f:'길이가 줄어들거나 늘어나 뼈를 움직여요',sys:'운동'},
};
function ecgPulse(x){/* x:0~1 한 박자 */const g=(c,w,a)=>a*Math.exp(-Math.pow((x-c)/w,2));return g(.18,.04,.12)-g(.36,.012,.18)+g(.4,.014,1)-g(.44,.014,.3)+g(.66,.05,.22);}
function ecg(g,x,y,w,h,t,bpm,col){const per=60/bpm;g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='rgba(6,40,36,.92)';g.fillRect(x,y,w,h);
  g.strokeStyle='rgba(94,234,212,.12)';g.lineWidth=1;g.beginPath();for(let k=1;k<6;k++){g.moveTo(x+w*k/6,y);g.lineTo(x+w*k/6,y+h);}for(let k=1;k<3;k++){g.moveTo(x,y+h*k/3);g.lineTo(x+w,y+h*k/3);}g.stroke();
  g.strokeStyle=col;g.lineWidth=Math.max(1.8,h*.05);g.lineJoin='round';g.shadowColor=col;g.shadowBlur=h*.2;g.beginPath();
  for(let i=0;i<=w;i+=2){const tt=t-(w-i)/(w/2.6);const ph=((tt/per)%1+1)%1;const v=ecgPulse(ph);const yy=y+h*.62-v*h*.5;i?g.lineTo(x+i,yy):g.moveTo(x+i,yy);}g.stroke();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const names=['뇌','심장','폐','위','간','콩팥','작은창자','뼈'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=Math.min(W,H*(wide?1.6:.8))/9;
    K.vgrad(g,0,0,W,H,['#0f766e','#14b8a6','#5eead4']);K.dots(g,W,H,u*.8,'rgba(255,255,255,.10)');
    g.fillStyle='rgba(255,255,255,.12)';const cs=u*2;g.fillRect(W*.08,H*.5,cs,cs*.3);g.fillRect(W*.08+cs*.35,H*.5-cs*.35,cs*.3,cs);
    const bh=wide?H*.92:H*.62,bw=bh*.62,top=wide?H*.04:H*.34;
    GAME.figure(g,wide?W*.74:W/2,top,bw,bh,u,Math.sin(T*.7)>0?'happy':'neutral');
    names.forEach((n,i)=>{const a=T*.5+i*TAU/names.length;const rx=W*(wide?.22:.38),ry=H*(wide?.3:.2);const x=(wide?W*.74:W/2)+Math.cos(a)*rx*(wide?1.5:1.1),y=top+bh*.5+Math.sin(a)*ry*1.25;
      K.glow(g,x,y,u*1.1,'#ffffff',.35);GAME.drawOrgan(g,n,x,y,u*(.9+.15*Math.sin(T*2+i)));});
    ecg(g,0,H-u*1.6,W,u*1.2,T,80,'#a7f3d0');};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'sci5-body',title:'인체 퍼즐 구조대',title1:'꼬마 환자를 살려요',title2:'인체 퍼즐 구조대',emoji:LOGO,
  subtitle:'5학년 · 우리 몸의 구조와 기능',
  howto:'아래 칸의 기관 카드를 <b>끌어다 몸속 제자리에</b> 놓아요! 이름을 보고, 또는 하는 일을 보고 알맞은 기관을 찾아요.',
  how:'알맞은 기관 카드를<br><b>끌어다 몸속 제자리</b>에 놓아요',
  txt:{who:'누구와 구조할까요?',dur:'수술 시간',pace:'한 문제 시간',seat:'번 의사 ',go:'구조 시작!',s1:'1. 진료',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#14b8a6',c2:'#ff5d73'},hero:heroScene,vignette:.04,durs:[60,90,120],
  levelTitle:'어떤 진료를 할까요?',
  levels:[
    {id:'loc',g:'5학년 · 우리 몸의 구조와 기능',t:'📍 기관의 위치',d:'이름 보고 제자리에'},
    {id:'func',g:'5학년 · 우리 몸의 구조와 기능',t:'⚙️ 기관이 하는 일',d:'하는 일 보고 찾아 넣기'},
    {id:'all',g:'5학년 · 우리 몸의 구조와 기능',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
  summary:`<ul><li><b>운동</b>: 뼈는 몸을 지탱하고 보호하며, 근육이 줄어들고 늘어나 뼈를 움직여요.</li>
    <li><b>소화</b>: 입 → 식도 → 위 → 작은창자 → 큰창자 → 항문 (간·쓸개·이자가 도와요)</li>
    <li><b>순환</b>: 심장이 펌프 작용으로 혈액을 혈관을 통해 온몸으로 보내요. <b>호흡</b>: 코 → 기관 → 기관지 → 폐</li>
    <li><b>배설</b>: 콩팥이 혈액의 노폐물을 걸러 오줌을 만들고, 방광에 모았다가 내보내요.</li>
    <li>자극 → 감각 기관 → 신경 → 뇌(판단·명령) → 신경 → 운동 기관 → 반응</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{placed:[],drag:null,kN:0,T:0,mood:'neutral',moodT:0,done:0,qt:0,qmax:15,beat:0});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?(st.kN++%2?'func':'loc'):L;st.k=k;st.lock=false;st.bad=null;st.hint=null;st.timeUp=false;
    const names=Object.keys(ORG);const ans=p.deck(names,'org');st.ans=ans;
    const conf={식도:['기관'],기관:['식도'],위:['간','작은창자'],간:['위'],작은창자:['큰창자'],큰창자:['작은창자'],콩팥:['방광'],방광:['콩팥'],뼈:['근육'],근육:['뼈'],폐:['심장'],심장:['폐']};
    let pool=(conf[ans]||[]).slice();while(pool.length<3){const c=R.pick(names);if(c!==ans&&!pool.includes(c))pool.push(c);}
    st.tray=R.shuffle([ans,...pool.slice(0,3)]).map(n=>({n}));
    if(st.placed.length>=9){st.placed=[];}
    st.qmax=(k==='loc'?14:18)/p.pace;st.qt=st.qmax;
    if(k==='loc')p.ask(`🫀 <b>${ans}</b>${J(ans,'을').slice(ans.length)} 몸속 제자리에 놓아요!`,`${ORG[ans].sys} 기관`);
    else p.ask(`🫀 <b>${ORG[ans].f}</b>`,'이 일을 하는 기관을 찾아 제자리에 놓아요');},
  geo(p){const u=p.u,W=p.W,H=p.H;const Z0=Math.max(p.top||0,u*2.6);const trayH=Math.min(u*2.5,H*.2);const by=Z0+u*.15;const bh=Math.max(120,H-trayH-by-u*.35);const bw=Math.min(W*.85,bh*.62);return{bw,bh,bx:W/2,by,trayH,trayY:H-trayH,Z0};},
  pos(p,n,i){const G=this.geo(p);const q=ORG[n].pos[i||0];return[G.bx+q[0]*G.bw*1.6,G.by+q[1]*G.bh];},
  drawOrgan(g,n,x,y,s){g.save();g.translate(x,y);
    const E={뇌:'🧠',심장:'🫀',폐:'🫁',뼈:'🦴',근육:'💪'};
    const lg=(y0,y1,a,b)=>{const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,a);gr.addColorStop(1,b);return gr;};
    const hi=(hx,hy,rx,ry,r)=>{g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.ellipse(hx,hy,rx,ry,r||-.4,0,7);g.fill();};
    g.shadowColor='rgba(80,20,40,.25)';g.shadowBlur=s*.12;g.shadowOffsetY=s*.05;
    if(E[n]){g.shadowColor='transparent';K.emo(g,E[n],0,0,s);}
    else if(n==='위'){g.fillStyle=lg(-s*.3,s*.3,'#fda4af','#e11d48');g.beginPath();g.moveTo(-s*.12,-s*.38);g.bezierCurveTo(-s*.1,-s*.1,-s*.45,-s*.05,-s*.4,s*.18);g.bezierCurveTo(-s*.32,s*.42,s*.3,s*.38,s*.4,s*.05);g.bezierCurveTo(s*.45,-s*.2,s*.2,-s*.32,s*.02,-s*.2);g.lineTo(s*.02,-s*.38);g.closePath();g.fill();g.shadowColor='transparent';hi(-s*.15,s*.05,s*.12,s*.06);}
    else if(n==='간'){g.fillStyle=lg(-s*.3,s*.25,'#c2410c','#7c2d12');g.beginPath();g.moveTo(-s*.46,-s*.12);g.bezierCurveTo(-s*.3,-s*.36,s*.3,-s*.34,s*.44,-s*.16);g.bezierCurveTo(s*.3,s*.02,s*.05,s*.04,-s*.1,s*.24);g.bezierCurveTo(-s*.35,s*.2,-s*.5,s*.05,-s*.46,-s*.12);g.fill();g.shadowColor='transparent';hi(-s*.12,-s*.16,s*.16,s*.05,-.1);}
    else if(n==='작은창자'){g.lineCap='round';g.strokeStyle='#db2777';g.lineWidth=s*.15;const path=()=>{g.beginPath();for(let a=0;a<18;a+=.25){const r=s*.06+a*s*.019;g.lineTo(Math.cos(a)*r,Math.sin(a)*r*.8);}};path();g.stroke();g.shadowColor='transparent';g.strokeStyle='#f9a8d4';g.lineWidth=s*.09;path();g.stroke();}
    else if(n==='큰창자'){g.lineCap='round';g.lineJoin='round';const path=()=>{g.beginPath();g.moveTo(-s*.32,s*.38);g.lineTo(-s*.34,-s*.22);g.quadraticCurveTo(-s*.34,-s*.32,-s*.22,-s*.32);g.lineTo(s*.22,-s*.32);g.quadraticCurveTo(s*.34,-s*.32,s*.34,-s*.22);g.lineTo(s*.32,s*.3);g.quadraticCurveTo(s*.2,s*.42,s*.02,s*.36);};
      g.strokeStyle='#9333ea';g.lineWidth=s*.2;path();g.stroke();g.shadowColor='transparent';g.strokeStyle='#d8b4fe';g.lineWidth=s*.12;path();g.stroke();g.strokeStyle='rgba(147,51,234,.5)';g.lineWidth=1.5;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(k*s*.12,-s*.38);g.lineTo(k*s*.12,-s*.26);g.stroke();}}
    else if(n==='콩팥'){[-1,1].forEach(d=>{g.save();g.translate(d*s*.22,0);g.scale(d,1);g.fillStyle=lg(-s*.25,s*.25,'#f87171','#991b1b');g.beginPath();g.moveTo(0,-s*.26);g.bezierCurveTo(s*.2,-s*.28,s*.2,s*.28,0,s*.26);g.bezierCurveTo(-s*.12,s*.24,-s*.05,s*.08,-s*.1,0);g.bezierCurveTo(-s*.05,-s*.08,-s*.12,-s*.24,0,-s*.26);g.fill();g.restore();});g.shadowColor='transparent';hi(-s*.2,-s*.1,s*.04,s*.08,.2);hi(s*.24,-s*.1,s*.04,s*.08,-.2);}
    else if(n==='방광'){g.shadowColor='transparent';K.orb(g,0,0,s*.27,'#facc15');}
    else if(n==='식도'){g.lineCap='round';g.strokeStyle='#ea580c';g.lineWidth=s*.17;g.beginPath();g.moveTo(0,-s*.4);g.quadraticCurveTo(s*.05,0,0,s*.4);g.stroke();g.shadowColor='transparent';g.strokeStyle='#fdba74';g.lineWidth=s*.08;g.beginPath();g.moveTo(-s*.02,-s*.38);g.quadraticCurveTo(s*.03,0,-s*.02,s*.38);g.stroke();}
    else if(n==='기관'){g.lineCap='round';g.strokeStyle='#64748b';g.lineWidth=s*.2;g.beginPath();g.moveTo(0,-s*.4);g.lineTo(0,s*.4);g.stroke();g.shadowColor='transparent';g.strokeStyle='#e2e8f0';g.lineWidth=s*.14;g.beginPath();g.moveTo(0,-s*.38);g.lineTo(0,s*.38);g.stroke();
      g.strokeStyle='#94a3b8';g.lineWidth=Math.max(1.5,s*.03);for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-s*.07,k*s*.1);g.lineTo(s*.07,k*s*.1);g.stroke();}}
    g.restore();},
  pill(g,str,x,y,s,bg,fg){g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.1;K.card(g,x-w/2,y-s*.78,w,s*1.56,s*.78,bg,{blur:s*.5,dy:s*.12,hi:false});K.txt(g,str,x,y+s*.03,{size:s,color:fg});g.restore();return w;},
  figure(g,cx,top,bw,bh,u,m){/* 해부도 스타일의 친근한 사람 */
    const parts=(ex)=>{const F=()=>{g.fill();if(ex>0)g.stroke();};g.lineCap='round';g.lineJoin='round';
      // 다리
      [-1,1].forEach(d=>{g.lineWidth=bw*.135+ex*2;g.beginPath();g.moveTo(cx+d*bw*.11,top+bh*.6);g.lineTo(cx+d*bw*.12,top+bh*.94);g.stroke();
        g.lineWidth=ex*2;g.beginPath();g.ellipse(cx+d*bw*.15,top+bh*.965,bw*.085,bh*.022,0,0,7);F();});
      // 팔
      [-1,1].forEach(d=>{g.lineWidth=bw*.095+ex*2;g.beginPath();g.moveTo(cx+d*bw*.27,top+bh*.235);g.quadraticCurveTo(cx+d*bw*.36,top+bh*.33,cx+d*bw*.385,top+bh*.56);g.stroke();
        g.lineWidth=ex*2;g.beginPath();g.ellipse(cx+d*bw*.39,top+bh*.585,bw*.055,bh*.03,d*.15,0,7);F();});
      // 목
      g.lineWidth=ex*2;K.rr(g,cx-bw*.055,top+bh*.13,bw*.11,bh*.09,bw*.03);F();
      // 몸통
      g.beginPath();g.moveTo(cx-bw*.08,top+bh*.195);g.bezierCurveTo(cx-bw*.22,top+bh*.195,cx-bw*.3,top+bh*.2,cx-bw*.3,top+bh*.27);
      g.bezierCurveTo(cx-bw*.29,top+bh*.34,cx-bw*.22,top+bh*.4,cx-bw*.21,top+bh*.47);g.bezierCurveTo(cx-bw*.21,top+bh*.54,cx-bw*.24,top+bh*.6,cx-bw*.19,top+bh*.645);
      g.quadraticCurveTo(cx-bw*.08,top+bh*.67,cx,top+bh*.645);g.quadraticCurveTo(cx+bw*.08,top+bh*.67,cx+bw*.19,top+bh*.645);g.bezierCurveTo(cx+bw*.24,top+bh*.6,cx+bw*.21,top+bh*.54,cx+bw*.21,top+bh*.47);
      g.bezierCurveTo(cx+bw*.22,top+bh*.4,cx+bw*.29,top+bh*.34,cx+bw*.3,top+bh*.27);g.bezierCurveTo(cx+bw*.3,top+bh*.2,cx+bw*.22,top+bh*.195,cx+bw*.08,top+bh*.195);g.closePath();F();
      // 머리
      g.beginPath();g.ellipse(cx,top+bh*.085,bh*.074,bh*.08,0,0,7);F();};
    // 바닥 그림자 + 뒤 빛
    K.shadow(g,cx,top+bh*.985,bw*.42,bh*.02,.18);K.glow(g,cx,top+bh*.42,bh*.5,'#ffffff',.7);
    g.save();g.shadowColor='rgba(120,60,60,.22)';g.shadowBlur=u*.5;g.shadowOffsetY=u*.15;g.fillStyle='#e9a985';g.strokeStyle='#e9a985';parts(Math.max(2,u*.06));g.restore();
    const gr=g.createRadialGradient(cx-bw*.08,top+bh*.3,bh*.05,cx,top+bh*.45,bh*.6);gr.addColorStop(0,'#ffe9dc');gr.addColorStop(.55,'#fcd5bd');gr.addColorStop(1,'#f3b996');
    g.save();g.fillStyle=gr;g.strokeStyle=gr;parts(0);g.restore();
    // 몸속(가슴·배) 은은한 영역
    g.save();const cav=g.createRadialGradient(cx,top+bh*.42,bw*.05,cx,top+bh*.42,bw*.32);cav.addColorStop(0,'rgba(255,255,255,.4)');cav.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=cav;g.beginPath();g.ellipse(cx,top+bh*.42,bw*.2,bh*.2,0,0,7);g.fill();
    // 가운데 선 · 갈비 느낌
    g.strokeStyle='rgba(214,140,110,.22)';g.lineWidth=Math.max(1.5,u*.04);g.lineCap='round';g.beginPath();g.moveTo(cx,top+bh*.24);g.lineTo(cx,top+bh*.6);g.stroke();
    // 얼굴
    const hy=top+bh*.085,hr=bh*.074;g.fillStyle='#7c4a2d';g.beginPath();g.ellipse(cx,hy-hr*.45,hr*1.02,hr*.62,0,Math.PI,0);g.quadraticCurveTo(cx+hr*.4,hy-hr*.6,cx,hy-hr*.55);g.quadraticCurveTo(cx-hr*.6,hy-hr*.5,cx-hr*1.02,hy-hr*.45);g.fill();
    g.fillStyle='#4b2e1e';g.strokeStyle='#4b2e1e';g.lineCap='round';if(m==='happy'){g.lineWidth=Math.max(1.6,hr*.1);[-1,1].forEach(d=>{g.beginPath();g.arc(cx+d*hr*.36,hy+hr*.14,hr*.13,Math.PI*1.1,Math.PI*1.9);g.stroke();});}else if(m==='ouch'){g.lineWidth=Math.max(1.6,hr*.1);[-1,1].forEach(d=>{const ex=cx+d*hr*.36,ey=hy+hr*.08;g.beginPath();g.moveTo(ex-d*hr*.12,ey-hr*.1);g.lineTo(ex+d*hr*.1,ey);g.lineTo(ex-d*hr*.12,ey+hr*.1);g.stroke();});}else{[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*hr*.36,hy+hr*.08,hr*.09,hr*.12,0,0,7);g.fill();});}
    g.fillStyle='rgba(244,114,182,.35)';[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*hr*.6,hy+hr*.35,hr*.16,hr*.1,0,0,7);g.fill();});
    g.strokeStyle='#b4533a';g.lineWidth=Math.max(1.5,hr*.08);g.beginPath();if(m==='happy'){g.fillStyle='#c0392b';g.arc(cx,hy+hr*.26,hr*.3,0,Math.PI);g.fill();}else if(m==='ouch'){g.arc(cx,hy+hr*.5,hr*.2,Math.PI*1.15,Math.PI*1.85);g.stroke();}else{g.arc(cx,hy+hr*.28,hr*.25,.3,Math.PI-.3);g.stroke();}
    g.restore();},
  trayRects(p){const st=p.state,G=this.geo(p),u=p.u;const n=st.tray.length;const w=(p.W-u*.3*(n+1))/n;return st.tray.map((t,i)=>({t,x:u*.3+i*(w+u*.3),y:G.trayY+u*.15,w,h:G.trayH-u*.3}));},
  update(p,dt){const st=p.state;st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.beat>0)st.beat=Math.max(0,st.beat-dt*2);
    if(!st.lock&&!st.timeUp&&st.qt>0){st.qt-=dt;if(st.qt<=0){st.timeUp=true;st.lock=true;st.drag=null;const [hx,hy]=this.pos(p,st.ans,0);st.hint=[hx,hy];st.mood='ouch';st.moodT=1.6;
        p.hit(false,{pen:20,x:hx,y:hy-p.u,tip:`시간이 다 됐어요! ${st.ans}${J(st.ans,'은').slice(st.ans.length)} 초록 점선 자리예요`,review:`${st.ans}의 위치: ${ORG[st.ans].sys} 기관 — ${ORG[st.ans].f}`,tipMs:2600});
        setTimeout(()=>{if(p.active)this.round(p);},2000);}}},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),t=st.T;
    const cx=G.bx,top=G.by,bw=G.bw,bh=G.bh;
    K.layer(p,'bg',g=>{
      K.vgrad(g,0,0,W,G.trayY,['#d9f5f0','#eefaf8','#fdf0f3']);K.dots(g,W,G.trayY,u*.6,'rgba(20,184,166,.10)');
      const pw=Math.min(W-u*.4,bw*1.25+u*1.4),px=cx-pw/2,py=top-u*.1,ph=Math.min(G.trayY-py-u*.15,bh+u*.1);
      K.card(g,px,py,pw,ph,u*.45,'rgba(255,255,255,.82)',{blur:u*.6,dy:u*.18,stroke:'rgba(15,118,110,.22)',lw:2});
      g.save();K.rr(g,px,py,pw,ph,u*.45);g.clip();K.grid(g,W,H,u*.5,'rgba(20,184,166,.08)');g.restore();
      /* 병원 십자 */
      g.fillStyle='rgba(255,93,115,.14)';const cs=u*1.2;g.fillRect(u*.5,G.Z0+u*.3+cs*.35,cs,cs*.3);g.fillRect(u*.5+cs*.35,G.Z0+u*.3,cs*.3,cs);
      this.figure(g,cx,top,bw,bh,u,'neutral');
      const ls=Math.max(u*.24,Math.min(u*.3,bw*.06));
      this.pill(g,'몸의 오른쪽',cx-bw*.38,top+bh*.1,ls,'#ffe4e6','#be123c');this.pill(g,'몸의 왼쪽',cx+bw*.38,top+bh*.1,ls,'#e0e7ff','#3730a3');
    },G.Z0+'/'+Math.round(G.trayY));
    /* 환자 표정 (얼굴만 다시 그림) */
    if(st.mood!=='neutral'){const hy=top+bh*.085,hr=bh*.074;g.save();g.fillStyle='#fcd5bd';g.beginPath();g.ellipse(cx,hy+hr*.2,hr*.8,hr*.7,0,0,TAU);g.fill();g.restore();
      g.save();g.fillStyle='#4b2e1e';g.strokeStyle='#4b2e1e';g.lineCap='round';g.lineWidth=Math.max(1.6,hr*.1);
      if(st.mood==='happy'){[-1,1].forEach(d=>{g.beginPath();g.arc(cx+d*hr*.36,hy+hr*.14,hr*.13,Math.PI*1.1,Math.PI*1.9);g.stroke();});g.fillStyle='#c0392b';g.beginPath();g.arc(cx,hy+hr*.26,hr*.3,0,Math.PI);g.fill();g.fillStyle='rgba(244,114,182,.5)';[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*hr*.6,hy+hr*.35,hr*.16,hr*.1,0,0,TAU);g.fill();});}
      else{[-1,1].forEach(d=>{const ex=cx+d*hr*.36,ey=hy+hr*.08;g.beginPath();g.moveTo(ex-d*hr*.12,ey-hr*.1);g.lineTo(ex+d*hr*.1,ey);g.lineTo(ex-d*hr*.12,ey+hr*.1);g.stroke();});g.strokeStyle='#b4533a';g.beginPath();g.arc(cx,hy+hr*.55,hr*.2,Math.PI*1.15,Math.PI*1.85);g.stroke();g.fillStyle='#8fd8ff';g.beginPath();g.ellipse(cx+hr*.9,hy-hr*.3+((t*3)%1)*hr*.3,hr*.08,hr*.12,0,0,TAU);g.fill();}
      g.restore();
      g.save();g.fillStyle='#7c4a2d';g.beginPath();g.ellipse(cx,hy-hr*.45,hr*1.02,hr*.62,0,Math.PI,0);g.fill();g.restore();}
    for(const pl of st.placed){const [x,y]=this.pos(p,pl.n,pl.i);const pop=pl.t0!=null?clamp(1-(t-pl.t0)*2.5,0,1):0;K.glow(g,x,y,u*(.8+pop*.5),'#ffffff',.6+pop*.3);this.drawOrgan(g,pl.n,x,y,u*(1.1+pop*.25));}
    if(st.bad){const a=st.bad;K.glow(g,a.x,a.y,u*1.1,'#ef4444',.35);g.save();g.strokeStyle='#ef4444';g.lineWidth=3;g.beginPath();g.arc(a.x,a.y,u*.7,0,7);g.stroke();g.restore();}
    if(st.hint){const [x,y]=st.hint;const pu=1+.08*Math.sin(t*8);K.glow(g,x,y,u*1.2,'#22c55e',.35);g.save();g.strokeStyle='#16a34a';g.setLineDash([u*.15,u*.1]);g.lineWidth=3;g.beginPath();g.arc(x,y,u*.8*pu,0,7);g.stroke();g.restore();}
    /* 심전도 모니터 + 구조 현황 */
    const mw=Math.min(u*4.2,W*.34),mh=u*1.25,mx=W-mw-u*.3,my=G.Z0+u*.2;const bpm=70+Math.min(60,p.streak*9)+st.beat*40;
    g.save();g.shadowColor='rgba(0,40,36,.35)';g.shadowBlur=u*.3;K.rr(g,mx-u*.08,my-u*.08,mw+u*.16,mh+u*.16,u*.2);g.fillStyle='#0f766e';g.fill();g.restore();ecg(g,mx,my,mw,mh,t,bpm,'#5eead4');
    K.txt(g,Math.round(bpm)+' bpm',mx+mw-u*.12,my+u*.28,{size:u*.3,color:'#99f6e4',align:'right'});
    this.pill(g,`🏥 구조 ${st.placed.length}/9`,u*1.9,G.Z0+u*1.2+u*.55,u*.3,'rgba(255,255,255,.95)','#0f766e');
    /* 한 문제 시간 */
    if(!st.lock&&st.qt>0){const f=clamp(st.qt/st.qmax,0,1);const bw2=Math.min(W*.8,u*12),bh2=Math.max(6,u*.2),bx2=W/2-bw2/2,by2=G.Z0-u*.02;K.rr(g,bx2,by2,bw2,bh2,bh2/2);g.fillStyle='rgba(15,118,110,.25)';g.fill();K.rr(g,bx2,by2,Math.max(bh2,bw2*f),bh2,bh2/2);g.fillStyle=f>.4?'#14b8a6':(f>.2?'#ffb703':'#ff5d73');g.fill();}
    /* 쟁반 */
    K.vgrad(g,0,G.trayY,W,H-G.trayY,['#bfece6','#8fd9d0']);g.fillStyle='rgba(255,255,255,.8)';g.fillRect(0,G.trayY,W,3);
    for(const r of this.trayRects(p)){if(st.drag&&st.drag.t===r.t)continue;K.card(g,r.x,r.y,r.w,r.h,u*.3,'#ffffff',{blur:u*.3,dy:u*.1,stroke:'rgba(15,118,110,.3)',lw:2});
      this.drawOrgan(g,r.t.n,r.x+r.w/2,r.y+r.h*.4,Math.min(r.h*.55,u*1.1));K.txt(g,r.t.n,r.x+r.w/2,r.y+r.h*.82,{size:Math.min(u*.42,r.h*.2),maxW:r.w*.9,color:'#0f4c4a'});}
    if(st.drag){const d=st.drag;K.shadow(g,d.x,d.y+u*1.4,u*.9,u*.18,.2);K.card(g,d.x-u*1.1,d.y-u*1.1,u*2.2,u*2.2,u*.4,'rgba(255,255,255,.96)',{blur:u*.6,dy:u*.25,stroke:K.rgba('#14b8a6',.7),lw:2});this.drawOrgan(g,d.t.n,d.x,d.y-u*.15,u*1.2);K.txt(g,d.t.n,d.x,d.y+u*.75,{size:u*.38,color:'#0f4c4a'});}},
  down(p,x,y){const st=p.state;if(st.lock)return;const r=this.trayRects(p).find(r=>K.inRect(x,y,r));if(r){st.drag={t:r.t,x,y};p.Snd.tap();}},
  move(p,x,y,down){const st=p.state;if(st.drag&&down){st.drag.x=x;st.drag.y=y;}},
  up(p,x,y){const st=p.state,u=p.u;const d=st.drag;if(!d)return;st.drag=null;const G=this.geo(p);if(y>G.trayY)return;
    const n=d.t.n,ok=n===st.ans;
    const cands=ORG[st.ans].pos.map((q,i)=>[...this.pos(p,st.ans,i),i]);let best=cands[0],bd=1e9;cands.forEach(c=>{const dd=Math.hypot(c[0]-x,c[1]-y);if(dd<bd){bd=dd;best=c;}});
    if(!ok){p.hit(false,{x,y:y-u,tip:st.k==='func'?`${n}${J(n,'은').slice(n.length)} ‘${ORG[n].f}’ — 찾는 기관은 <b>${st.ans}</b>${IEYO(st.ans)}`:`그건 <b>${n}</b>! ${st.ans}${J(st.ans,'을').slice(st.ans.length)} 찾아요`,review:`${st.ans}: ${ORG[st.ans].f}`});st.bad={x,y};st.mood='ouch';st.moodT=1;setTimeout(()=>{st.bad=null;},700);return;}
    if(bd>u*1.3){st.hint=[best[0],best[1]];p.add(-10,x,y-u);p.Snd.bad();p.tip(`${st.ans}${J(st.ans,'은').slice(st.ans.length)} 초록 점선 쪽에 있어요!`,'bad',1500);setTimeout(()=>{st.hint=null;},1500);
      const rv=`${st.ans}의 위치: ${ORG[st.ans].sys} 기관 — ${ORG[st.ans].f}`;if(!p.wrong.includes(rv))p.wrong.push(rv);return;}
    st.lock=true;st.placed.push({n,i:best[2],t0:st.T});st.mood='happy';st.moodT=1.2;st.beat=1;p.hit(true,{x:best[0],y:best[1]-u,tip:`${n}: ${ORG[n].f}`});
    if(st.placed.length>=9){setTimeout(()=>{if(!p.active)return;p.add(50,p.W/2,p.H*.4);p.burst(p.W/2,p.H*.4,'#5eead4',22);p.tip('🏥 구조 성공! 모든 기관을 제자리에 — 보너스 +50','good',1800);p.Snd.win();},400);}
    setTimeout(()=>{if(p.active)this.round(p);},st.placed.length>=9?1300:650);},
};

Engine.boot(GAME);
