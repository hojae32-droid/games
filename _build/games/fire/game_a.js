/* 6학년 · 물질의 연소 — 꼬마 소방관 (불의 종류에 맞는 끄는 방법을 골라 불 끄기)
   디자인: 긴급 출동 포스터 — 어두운 밤 도시 + 경광등 빨강·노랑 + 사선 경고띠. 불과 불난 물건은 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 3c3 7 11 11 11 22a11 11 0 0 1-22 0c0-5 3-7 4-11 2 3 3 4 5 4-1-6 0-11 2-15z" fill="#ff5a3d" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 20c2 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 1 1 2 2 3 2z" fill="#ffd400"/><rect x="6" y="40" width="36" height="5" rx="2" fill="#ffd400" stroke="#111" stroke-width="2"/></svg>';

/* ───────── 그림 도구 ───────── */
function flame(g,x,y,s,t,seed,dim){g.save();g.translate(x,y);const sw=Math.sin(t*9+seed)*s*.06,gr=1+Math.sin(t*13+seed*2)*.05;
  const tear=(w,h,col,k)=>{g.fillStyle=col;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-w,-h*.2,-w*1.05,-h*.65,sw*k,-h*gr);g.bezierCurveTo(w*.5,-h*.7,w*1.1,-h*.2,0,0);g.fill();};
  tear(s*.5,s*1.35,dim?'#c0481f':'#ff5a1f',1);tear(s*.36,s*1.05,dim?'#d98a20':'#ff9a1f',.7);tear(s*.2,s*.7,'#ffd23a',.4);tear(s*.1,s*.4,'#fff6c8',.2);
  g.restore();}
function smoke(g,x,y,s,t,a){g.save();g.fillStyle=`rgba(180,185,200,${a})`;for(let k=0;k<4;k++){const ph=(t*.55+k/4)%1;g.beginPath();g.arc(x+Math.sin(ph*6+k)*s*.4,y-ph*s*1.8,s*(.22+ph*.38),0,TAU);g.fill();}g.restore();}
function spark(g,x,y,s,t){g.save();g.strokeStyle='#fff7a8';g.lineWidth=Math.max(2,s*.07);g.lineCap='round';for(let k=0;k<5;k++){const a=k*1.26+t*3;const r=s*(.3+.2*Math.sin(t*10+k));g.beginPath();g.moveTo(x+Math.cos(a)*r*.5,y+Math.sin(a)*r*.5);g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);g.stroke();}g.restore();}
/* 불난 물건 그림: 중심 (0,0), 크기 s */
const SRC={
  pan(g,s){g.fillStyle='#3a3f4b';g.beginPath();g.ellipse(0,s*.18,s*.62,s*.2,0,0,TAU);g.fill();g.fillStyle='#4b5160';g.beginPath();g.ellipse(0,s*.1,s*.58,s*.17,0,0,TAU);g.fill();g.fillStyle='#e2a93a';g.beginPath();g.ellipse(0,s*.1,s*.46,s*.11,0,0,TAU);g.fill();
    g.fillStyle='#2a2e38';g.fillRect(s*.55,s*.04,s*.6,s*.11);},
  outlet(g,s){g.fillStyle='#e9edf3';g.beginPath();K.rr(g,-s*.42,-s*.42,s*.84,s*.84,s*.12);g.fill();g.fillStyle='#2a3140';for(const dx of [-.14,.14]){K.rr(g,dx*s-s*.04,-s*.2,s*.08,s*.2,s*.03);g.fill();}g.beginPath();g.arc(0,s*.2,s*.06,0,TAU);g.fill();
    g.strokeStyle='#2a3140';g.lineWidth=s*.05;g.beginPath();g.moveTo(s*.42,s*.2);g.quadraticCurveTo(s*.7,s*.4,s*.55,s*.62);g.stroke();},
  box(g,s){g.fillStyle='#c98a4b';g.fillRect(-s*.5,-s*.3,s,s*.7);g.fillStyle='#e0a766';g.beginPath();g.moveTo(-s*.5,-s*.3);g.lineTo(-s*.32,-s*.5);g.lineTo(s*.68,-s*.5);g.lineTo(s*.5,-s*.3);g.fill();g.fillStyle='#a96f38';g.beginPath();g.moveTo(s*.5,-s*.3);g.lineTo(s*.68,-s*.5);g.lineTo(s*.68,s*.2);g.lineTo(s*.5,s*.4);g.fill();g.fillStyle='#f0d9a8';g.fillRect(-s*.1,-s*.3,s*.2,s*.7);},
  candle(g,s){g.fillStyle='#fff3d6';K.rr(g,-s*.14,-s*.15,s*.28,s*.7,s*.05);g.fill();g.fillStyle='#e8d4a8';g.fillRect(s*.04,-s*.15,s*.1,s*.7);g.fillStyle='#2a2a2a';g.fillRect(-s*.02,-s*.28,s*.04,s*.14);g.fillStyle='#8a5a2a';g.beginPath();g.ellipse(0,s*.55,s*.32,s*.08,0,0,TAU);g.fill();},
  stove(g,s){g.fillStyle='#d8dde6';K.rr(g,-s*.55,-s*.1,s*1.1,s*.55,s*.08);g.fill();g.fillStyle='#2a3140';for(const dx of [-.28,.28]){g.beginPath();g.ellipse(dx*s,-s*.08,s*.2,s*.07,0,0,TAU);g.fill();}g.fillStyle='#8a93a5';for(const dx of [-.3,0,.3]){g.beginPath();g.arc(dx*s,s*.32,s*.06,0,TAU);g.fill();}},
  forest(g,s){for(const [dx,h,c] of [[-.38,1,'#2f7d3f'],[.38,1.1,'#26703a'],[0,1.25,'#3a8f4a']]){g.fillStyle='#6b4423';g.fillRect(dx*s-s*.04,s*.15,s*.08,s*.28);g.fillStyle=c;for(let k=0;k<3;k++){g.beginPath();g.moveTo(dx*s,-s*(.55*h)+k*s*.2);g.lineTo(dx*s-s*(.26+k*.06),-s*.05*h+k*s*.18);g.lineTo(dx*s+s*(.26+k*.06),-s*.05*h+k*s*.18);g.fill();}}},
  lamp(g,s){g.fillStyle='rgba(190,225,245,.85)';g.beginPath();g.ellipse(0,s*.12,s*.36,s*.32,0,0,TAU);g.fill();g.fillStyle='#e9a23a';g.beginPath();g.ellipse(0,s*.2,s*.26,s*.16,0,0,TAU);g.fill();g.fillStyle='#8a93a5';g.fillRect(-s*.1,-s*.32,s*.2,s*.2);g.fillStyle='#fff';g.fillRect(-s*.02,-s*.42,s*.04,s*.12);},
  camp(g,s){g.fillStyle='#6b4423';for(const a of [-.5,.5]){g.save();g.rotate(a);g.fillRect(-s*.5,s*.1,s,s*.14);g.restore();}g.fillStyle='#8a8f99';for(let k=-2;k<=2;k++){g.beginPath();g.arc(k*s*.22,s*.4,s*.09,0,TAU);g.fill();}},
};
const SRCMAP={'🍳':'pan','🔌':'outlet','📦':'box','🕯️':'candle','♨️':'stove','🌲':'forest','🧪':'lamp','🔥':'camp'};
function srcIcon(g,e,x,y,s){g.save();g.translate(x,y);SRC[SRCMAP[e]||'box'](g,s);g.restore();}
function pill(g,str,cx,cy,s,bg,fg,maxW){g.save();g.font=K.font(s);const w=Math.min(maxW||1e9,K.mw(g,str,s)+s*1.3);const h=s*1.6;K.rr(g,cx-w/2,cy-h/2,w,h,s*.28);g.fillStyle=bg;g.fill();g.lineWidth=Math.max(2,s*.1);g.strokeStyle='#000';g.stroke();g.restore();K.txt(g,str,cx,cy+s*.03,{size:s,color:fg,maxW:w-s*.5});return w;}
function hazard(g,x,y,w,h,t){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='#111';g.fillRect(x,y,w,h);g.fillStyle='#ffd400';const st=h*1.2;for(let i=-3;i<w/st+3;i++){g.beginPath();g.moveTo(x+i*st*2+(t||0)%(st*2),y+h);g.lineTo(x+i*st*2+st+(t||0)%(st*2),y+h);g.lineTo(x+i*st*2+st+h+(t||0)%(st*2),y);g.lineTo(x+i*st*2+h+(t||0)%(st*2),y);g.fill();}g.restore();}

/* 방 단면 */
function room(g,kind,x,y,w,h,u,dim){g.save();K.rr(g,x,y,w,h,u*.18);g.clip();const fl=y+h*.7;
  if(kind==='forest'){g.fillStyle='#8fd0f2';g.fillRect(x,y,w,h);g.fillStyle='#fff';g.beginPath();g.ellipse(x+w*.7,y+h*.2,w*.12,h*.06,0,0,TAU);g.fill();g.fillStyle='#78bf6a';g.beginPath();g.ellipse(x+w*.25,fl,w*.5,h*.26,0,0,TAU);g.ellipse(x+w*.85,fl,w*.4,h*.22,0,0,TAU);g.fill();g.fillStyle='#5aa356';g.fillRect(x,fl,w,h);}
  else{const wall={kit:'#ffe7bd',room:'#f7c9d1',lab:'#cfe5f7',idle:'#d8d1f2'}[kind];g.fillStyle=wall;g.fillRect(x,y,w,h);
    const ww=w*.26,wh=h*.3,wx=x+w*.08,wy=y+h*.12;g.fillStyle='#fff';g.fillRect(wx,wy,ww,wh);g.fillStyle='#8ccbf2';g.fillRect(wx+3,wy+3,ww-6,wh-6);g.fillStyle='#fff';g.fillRect(wx+ww/2-1.5,wy,3,wh);g.fillRect(wx,wy+wh/2-1.5,ww,3);
    if(kind==='kit'){g.fillStyle='#b97d4a';g.fillRect(x+w*.55,y+h*.05,w*.45,h*.13);g.fillStyle='#d9a066';g.fillRect(x+w*.58,y+h*.08,w*.12,h*.07);}
    if(kind==='room'){g.fillStyle='#fff';g.fillRect(x+w*.72,y+h*.14,w*.16,h*.2);g.fillStyle='#e7b9d6';g.fillRect(x+w*.73,y+h*.155,w*.14,h*.17);}
    if(kind==='lab'){g.fillStyle='#fff';g.fillRect(x+w*.62,y+h*.12,w*.3,h*.2);g.fillStyle='#6fb2e6';g.fillRect(x+w*.65,y+h*.16,w*.07,h*.12);g.fillStyle='#e0a14a';g.fillRect(x+w*.76,y+h*.2,w*.07,h*.08);}
    if(kind==='idle'){g.fillStyle='#8a78c8';K.rr(g,x+w*.4,fl-h*.2,w*.4,h*.2,h*.04);g.fill();g.fillStyle='#6fb36f';g.beginPath();g.ellipse(x+w*.88,fl-h*.12,w*.05,h*.12,0,0,TAU);g.fill();}
    const fc={kit:['#ffffff','#cdbda2'],lab:['#f4f7fb','#aebccc'],room:['#d9a066','#a8743f'],idle:['#d9a066','#a8743f']}[kind];g.fillStyle=fc[1];g.fillRect(x,fl,w,h);g.fillStyle=fc[0];g.fillRect(x,fl,w,Math.max(3,h*.05));}
  if(dim){g.fillStyle='rgba(20,22,40,.18)';g.fillRect(x,y,w,h);}g.restore();}

/* 밤 도시 배경 */
function city(g,W,H,u,t){const sg=g.createLinearGradient(0,0,0,H);sg.addColorStop(0,'#10131f');sg.addColorStop(.6,'#1d2236');sg.addColorStop(1,'#2a2f45');g.fillStyle=sg;g.fillRect(0,0,W,H);
  for(let i=0;i<30;i++){g.fillStyle=`rgba(255,246,200,${.25+.4*Math.abs(Math.sin(t+i))})`;g.fillRect(hash(i)*W,hash(i+50)*H*.5,2,2);}
  let x=-u*.3,k=0;while(x<W){const bw=u*(1.3+hash(k)*1.2),bh=H*(.3+hash(k+9)*.34);g.fillStyle=k%2?'#171b2b':'#1c2134';g.fillRect(x,H*.88-bh,bw,bh+H);
    for(let yy=H*.88-bh+u*.25;yy<H*.84;yy+=u*.5)for(let xx=x+u*.2;xx<x+bw-u*.2;xx+=u*.4){if(hash(k*31+xx*.7+yy*1.3)>.55){g.fillStyle=hash(xx+yy)>.5?'rgba(255,214,120,.55)':'rgba(255,214,120,.25)';g.fillRect(xx,yy,u*.16,u*.22);}}x+=bw+u*.1;k++;}
  g.fillStyle='#0c0e16';g.fillRect(0,H*.88,W,H);g.fillStyle='#ffd400';for(let xx=u*.3;xx<W;xx+=u*1.6)g.fillRect(xx,H*.94,u*.8,u*.07);}

/* 첫 화면: 소방차가 불난 건물에 물을 뿌려요 */
function truck(g,x,y,s,t){g.save();g.translate(x,y);g.fillStyle='#d92b24';K.rr(g,-s*.9,-s*.5,s*1.45,s*.62,s*.06);g.fill();g.fillRect(s*.45,-s*.62,s*.75,s*.74);g.fillStyle='#9fd3f0';g.fillRect(s*.58,-s*.54,s*.5,s*.3);g.fillStyle='#fff';g.fillRect(-s*.9,-s*.18,s*1.45,s*.07);
  g.strokeStyle='#e5e9f0';g.lineWidth=s*.05;g.beginPath();g.moveTo(-s*.8,-s*.58);g.lineTo(s*.3,-s*.78);g.stroke();for(let k=0;k<6;k++){g.beginPath();g.moveTo(-s*.78+k*s*.18,-s*.57-k*s*.033);g.lineTo(-s*.78+k*s*.18+s*.02,-s*.5);g.stroke();}
  g.fillStyle=Math.sin(t*10)>0?'#ff3b30':'#2f7bff';g.fillRect(s*.62,-s*.7,s*.2,s*.08);g.fillStyle=Math.sin(t*10)>0?'#2f7bff':'#ff3b30';g.fillRect(s*.88,-s*.7,s*.2,s*.08);
  g.fillStyle='#111';for(const dx of [-.5,.1,.85]){g.beginPath();g.arc(dx*s,s*.15,s*.17,0,TAU);g.fill();g.fillStyle='#8a93a5';g.beginPath();g.arc(dx*s,s*.15,s*.07,0,TAU);g.fill();g.fillStyle='#111';}g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const u=Math.min(W,H)/11;city(g,W,H,u,T);
    /* 불난 건물 */
    const bx=W*.58,bw=W*.34,bh=H*.52,by=H*.88-bh;g.fillStyle='#2a3048';g.fillRect(bx,by,bw,bh);g.fillStyle='#343b58';g.fillRect(bx-u*.15,by-u*.2,bw+u*.3,u*.24);
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){const wx=bx+bw*(.1+c*.22),wy=by+bh*(.1+r*.22),on=(r+c)%3===0;g.fillStyle=on?'#ff8a2a':'#ffd98a';g.fillRect(wx,wy,bw*.14,bh*.14);if(on)flame(g,wx+bw*.07,wy+bh*.14,u*.9,T,r*4+c);}
    flame(g,bx+bw*.5,by-u*.1,u*1.8,T,3);smoke(g,bx+bw*.5,by-u*1.3,u*1.2,T,.35);
    /* 소방차와 물줄기 */
    const tx=W*.2;truck(g,tx,H*.88-u*.4,u*1.9,T);g.strokeStyle='rgba(140,210,255,.9)';g.lineWidth=u*.14;g.lineCap='round';g.setLineDash([u*.2,u*.25]);g.lineDashOffset=-T*u*3;
    g.beginPath();g.moveTo(tx+u*1.5,H*.88-u*1.9);g.quadraticCurveTo(W*.42,by-u*2.2,bx+bw*.12,by+bh*.25);g.stroke();g.setLineDash([]);
    for(let k=0;k<6;k++){const ph=(T*1.5+k/6)%1;g.fillStyle='rgba(180,225,255,.8)';g.beginPath();g.arc(bx+bw*.12+Math.sin(k+T*5)*u*.5,by+bh*.25+ph*u*1.4,u*.07,0,TAU);g.fill();}
    /* 경광등 번쩍 */
    g.fillStyle=Math.sin(T*10)>0?'rgba(255,50,40,.08)':'rgba(40,110,255,.08)';g.fillRect(0,0,W,H);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const FTOOLS=[{k:'water',e:'💧',t:'물 뿌리기',how:'온도를 발화점 아래로 낮춰요'},{k:'ext',e:'🧯',t:'소화기',how:'산소를 막고 온도를 낮춰요'},{k:'cover',e:'🧺',t:'덮기',how:'모래·뚜껑·젖은 담요로 산소를 막아요'},{k:'cut',e:'✂️',t:'탈 물질 없애기',how:'탈 물질을 없애요'}];
const FIRES=[
  {e:'🍳',n:'프라이팬 기름 불',ok:['ext','cover'],bad:{water:'기름 불에 물을 부으면 기름이 튀어 불이 더 커져요!',cut:'이미 불붙은 기름은 덮어서 산소를 막아요'}},
  {e:'🔌',n:'전기 콘센트 불',ok:['ext'],bad:{water:'전기 불에 물을 뿌리면 감전될 수 있어요!',cover:'전기 불은 소화기로 꺼요',cut:'전기 불은 소화기로 꺼요'}},
  {e:'📦',n:'종이 상자 불',ok:['water','ext','cover'],bad:{cut:'이미 타고 있어요 — 물·소화기로 꺼요'}},
  {e:'🕯️',n:'촛불',ok:['cut','cover','water'],bad:{ext:'작은 촛불은 심지를 자르거나 덮어서 꺼요'}},
  {e:'♨️',n:'가스레인지 불',ok:['cut'],bad:{water:'가스 밸브를 잠가 탈 물질(가스)을 없애요',cover:'가스 밸브를 잠가 탈 물질(가스)을 없애요',ext:'가스 밸브를 잠가 탈 물질(가스)을 없애요'}},
  {e:'🌲',n:'산불',ok:['cut','water'],bad:{cover:'산불은 주변 나무를 베어 내거나 물을 뿌려요',ext:'산불은 주변 나무를 베어 내거나 물을 뿌려요'}},
  {e:'🧪',n:'알코올램프 불',ok:['cover'],bad:{water:'알코올램프는 뚜껑을 덮어 산소를 막아 꺼요',cut:'알코올램프는 뚜껑을 덮어 꺼요',ext:'알코올램프는 뚜껑을 덮어 꺼요'}},
  {e:'🔥',n:'모닥불',ok:['water','cover'],bad:{ext:'모닥불은 물이나 흙(모래)으로 덮어 꺼요',cut:'모닥불은 물이나 흙(모래)으로 덮어 꺼요'}},
];
const BURN_Q=[
  ['물질이 탈 때 필요한 조건이 <b>아닌</b> 것은?','이산화 탄소','산소'],['물질이 타려면 온도가 어떠해야 할까?','발화점 이상','어는점 이하'],
  ['초가 탈 때 생기는 물질은?','물과 이산화 탄소','산소와 질소'],['초가 탄 뒤 석회수를 넣고 흔들면?','뿌옇게 흐려져요','파랗게 변해요'],
  ['초가 탄 뒤 푸른색 염화 코발트 종이를 대면?','붉게 변해요 (물이 생김)','그대로예요'],['촛불을 큰 병으로 덮으면 더 오래 타는 까닭은?','산소가 더 많아서','병이 따뜻해서'],
  ['불이 나면 몸을 어떻게 할까?','젖은 수건으로 코·입 막고 낮은 자세','높이 서서 빨리 뛰기'],['불이 났을 때 건물에서 나가는 길은?','계단','엘리베이터'],
  ['연소란?','물질이 산소와 빠르게 반응해 빛과 열을 내는 것','물질이 물에 녹는 것'],['불을 끄는 방법의 공통점은?','연소 조건을 하나 이상 없애요','산소를 더 넣어요'],
];
const GAME={
  id:'sci6-fire',title:'꼬마 소방관',title1:'긴급 출동!',title2:'꼬마 소방관',emoji:LOGO,
  subtitle:'6학년 · 물질의 연소',
  howto:'여기저기 불이 나요! 아래에서 <b>끄는 방법</b>을 고른 뒤 불을 <b>톡</b> 눌러요. 불의 종류에 맞는 방법이어야 꺼져요 — 기름 불에 물은 위험해요!',
  how:'아래에서 <b>끄는 방법</b>을 고르고<br>불을 <b>톡!</b>',
  txt:{who:'누구와 출동할까요?',dur:'출동 시간',seat:'번 대원 ',go:'출동!'},
  theme:{c1:'#e5322d',c2:'#ffd400'},hero:heroScene,vignette:.12,durs:[60,90,120],
  levelTitle:'출동할 현장 고르기',
  levels:[
    {id:'fight',g:'6학년 · 물질의 연소',t:'🧯 불 끄는 방법',d:'탈 물질·산소·온도 없애기'},
    {id:'cond',g:'6학년 · 물질의 연소',t:'🕯️ 연소의 조건과 생성물',d:'발화점·산소·석회수'},
    {id:'all',g:'6학년 · 물질의 연소',t:'🌟 모두 섞기',d:'불 끄기와 문제가 번갈아'},
  ],
  summary:`<ul><li><b>연소</b>: 물질이 산소와 빠르게 반응해 빛과 열을 내는 현상. 조건: <b>탈 물질, 산소, 발화점 이상의 온도</b></li>
    <li>초가 타면 <b>물</b>(푸른색 염화 코발트 종이 → 붉은색)과 <b>이산화 탄소</b>(석회수 → 뿌옇게)가 생겨요.</li>
    <li>불 끄기: 연소 조건을 하나 이상 없애요 — 탈 물질 없애기(가스 밸브 잠그기, 심지 자르기), 산소 막기(모래·뚜껑·소화기), 온도 낮추기(물)</li>
    <li>기름 불·전기 불에는 물을 뿌리면 위험해요. 불이 나면 젖은 수건으로 코와 입을 막고 낮은 자세로 계단을 이용해 대피하고 119에 신고해요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{fires:[],tool:null,spawnT:.3,kN:0,mode:null,cnt:0,T:0});this.setMode(p,p.levelId==='cond'?'quiz':'fight');},
  setMode(p,m){const st=p.state;st.mode=m;st.cnt=0;
    if(m==='fight'){st.tool=null;p.ask('🧑‍🚒 끄는 방법을 고르고 불을 <b>톡!</b>','불의 종류에 맞는 방법이어야 꺼져요');
      p.tools(FTOOLS.map(t=>({e:t.e,t:t.t,k:t.k})),(i,t)=>{st.tool=t.k;});}
    else this.quiz(p);},
  quiz(p){const st=p.state,R=p.R;const q=p.deck(BURN_Q,'bq');st.qLock=false;p.ask('🕯️ '+q[0],'알맞은 답을 골라요');
    p.tools(R.shuffle([q[1],q[2]]).map(t=>({t})),(i,t)=>{if(st.qLock)return;st.qLock=true;const ok=t.t===q[1];p.hit(ok,{x:p.W/2,y:p.H*.3,tip:ok?`정답: ${q[1]}`:`정답: <b>${q[1]}</b>`,review:`${plain(q[0])} → ${q[1]}`});
      setTimeout(()=>{if(!p.active)return;st.cnt++;if(p.levelId==='all'&&st.cnt>=2)this.setMode(p,'fight');else this.quiz(p);},ok?800:1500);},{toggle:false});},
  spots(p){const W=p.W,H=p.H;const land=W>H;const cols=land?3:2,rows=land?2:3;const out=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)out.push([W*(c+.5)/cols,H*(.12+.8*(r+.55)/rows)]);return out;},
  update(p,dt){const st=p.state;if(st.mode!=='fight'){st.fires=[];return;}const sp=this.spots(p);
    st.spawnT-=dt;if(st.spawnT<=0&&st.fires.length<Math.min(3,sp.length-1)){const used=st.fires.map(f=>f.s);const free=sp.map((_,i)=>i).filter(i=>!used.includes(i));
      const s=p.Rf.pick(free);st.fires.push({s,f:p.deck(FIRES,'fi'),g:.25,out:0});st.spawnT=p.Rf.num(1.2,2.2);}
    for(const f of st.fires){if(f.out){f.out+=dt;continue;}f.g+=dt*(.09+p.t/p.dur*.06);
      if(f.g>=1){f.out=.01;f.big=true;p.add(-20,sp[f.s][0],sp[f.s][1]-p.u);p.Snd.boom();p.tip(`${f.f.n}이 너무 커졌어요! 빨리 꺼요`,'bad',1500);}}
    st.fires=st.fires.filter(f=>!(f.out>.8));
    if(p.levelId==='all'&&st.cnt>=6){this.setMode(p,'quiz');}},
  SC:{'🍳':'kit','♨️':'kit','🔌':'room','📦':'room','🕯️':'room','🧪':'lab','🌲':'forest','🔥':'forest'},
  cell(p){const u=p.u,land=p.W>p.H,cols=land?3:2,rows=land?2:3;return{w:Math.min(u*5.2,p.W/cols*.94),h:Math.min(u*3.9,p.H*.84/rows*.94)};},
  quizScene(p,g){const W=p.W,H=p.H,u=Math.min(p.u,W/8),t=p.state.T;
    g.fillStyle='#15171f';g.fillRect(0,0,W,H);hazard(g,0,0,W,u*.3,t*u*.6);
    const ty=H*.74;g.fillStyle='#3a2a20';g.fillRect(0,ty,W,H);g.fillStyle='#5c4132';g.fillRect(0,ty,W,u*.12);
    const cx=W/2,fl=1+Math.sin(t*9)*.05;
    g.fillStyle='#2a2e3a';g.fillRect(W*.06,H*.2,W*.88,u*.14);
    const cy=ty-u*1.5,R=Math.min(W*.34,H*.3,u*3.4),pts=[[cx,cy-R,'🪵 탈 물질'],[cx-R*1.1,cy+R*.45,'💨 산소'],[cx+R*1.1,cy+R*.45,'🌡️ 발화점 이상']];
    g.save();g.strokeStyle='#ffd400';g.lineWidth=Math.max(3,u*.07);g.setLineDash([u*.2,u*.16]);g.lineDashOffset=-t*u*.6;g.beginPath();pts.forEach(([x,y],i)=>g[i?'lineTo':'moveTo'](x,y));g.closePath();g.stroke();g.restore();
    g.fillStyle='rgba(255,170,60,.18)';g.beginPath();g.arc(cx,ty-u*2.2,u*3.2*fl,0,TAU);g.fill();
    g.save();g.translate(cx,ty-u*.2);SRC.candle(g,u*3);g.restore();flame(g,cx,ty-u*2.45,u*1.5*fl,t,1);
    pts.forEach(([x,y,s])=>pill(g,s,clamp(x,u*2.4,W-u*2.4),y,Math.max(u*.5,16),'#ffd400','#111'));
    pill(g,'🔥 연소의 세 가지 조건',cx,cy-R-u*.95,Math.max(u*.46,16),'#e5322d','#fff');},
  draw(p,g,dt){const W=p.W,H=p.H,u=Math.min(p.u,W/7),st=p.state;st.T+=dt;const t=st.T;
    if(st.mode!=='fight'){this.quizScene(p,g);return;}
    city(g,W,H,u,t);
    const sp=this.spots(p),C=this.cell(p);const at={};for(const f of st.fires)at[f.s]=f;
    sp.forEach(([x,y],i)=>{const f=at[i];const cx=x-C.w/2,cy=y-C.h*.55;
      g.fillStyle='#000';K.rr(g,cx+u*.08,cy+u*.1,C.w,C.h,u*.24);g.fill();
      K.rr(g,cx,cy,C.w,C.h,u*.24);g.fillStyle='#1a1d27';g.fill();g.lineWidth=u*.1;g.strokeStyle=f&&!f.out?(f.g>.6?'#ff3b30':'#ffd400'):'#4a4f5e';g.stroke();
      room(g,f?(this.SC[f.f.e]||'room'):'idle',cx+u*.14,cy+u*.14,C.w-u*.28,C.h-u*.28,u,!f);});
    for(const f of st.fires){const [x,y]=sp[f.s];const a=f.out?Math.max(0,1-f.out/.8):1;g.globalAlpha=a;const cy=y-C.h*.55;
      srcIcon(g,f.f.e,x,y+u*.5,u*1.1);
      if(!f.out||f.big){const s=u*(.7+f.g*1.3);flame(g,x,y+u*.2,s,t,f.s*3);if(f.g>.6)smoke(g,x,y-u*.5,u*1.1,t,.35*(f.g-.5)*2);if(f.g>.85)spark(g,x+u*.7,y-u*.6,u*.8,t);}
      else{smoke(g,x,y,u,t,.5);}
      const bw=Math.min(u*2.6,C.w*.7),bx=x-bw/2,by=cy+C.h-u*.46,bh=Math.max(6,u*.2);
      g.fillStyle='#000';K.rr(g,bx-2,by-2,bw+4,bh+4,bh/2);g.fill();
      hazard(g,bx,by,Math.max(bh,bw*Math.min(1,f.g)),bh,t*u*.5);
      pill(g,f.f.n,x,cy+u*.42,Math.max(u*.5,17),'#ffd400','#111',C.w*.96);g.globalAlpha=1;}
    if(!st.tool){g.globalAlpha=.75+.25*Math.sin(t*5);pill(g,'⬇ 먼저 끄는 방법을 골라요',W/2,H-u*.5,Math.max(u*.46,16),'#e5322d','#fff');g.globalAlpha=1;}},
  down(p,x,y){const st=p.state,u=p.u;if(st.mode!=='fight')return;const sp=this.spots(p);
    const f=st.fires.find(f=>!f.out&&Math.abs(x-sp[f.s][0])<u*1.7&&Math.abs(y-sp[f.s][1])<u*1.5);if(!f)return;
    if(!st.tool){p.tip('아래에서 <b>끄는 방법</b>을 먼저 골라요!','bad',1300);p.Snd.bad();return;}
    const tool=FTOOLS.find(t=>t.k===st.tool);const [fx,fy]=sp[f.s];
    if(f.f.ok.includes(st.tool)){f.out=.01;st.cnt++;p.burst(fx,fy-u*.3,'#7dd3fc',14);p.Snd.noise(.35,900,.2);
      p.hit(true,{x:fx,y:fy-u*1.2,tip:`${tool.t}: ${tool.how}`,tipMs:1500});}
    else{f.g=Math.min(.98,f.g+.2);p.hit(false,{x:fx,y:fy-u*1.2,tip:f.f.bad[st.tool]||'다른 방법을 써 봐요',review:`${f.f.n} → ${f.f.ok.map(k=>FTOOLS.find(t=>t.k===k).t).join(' 또는 ')} (${f.f.bad[st.tool]||''})`});}},
};
Engine.boot(GAME);
