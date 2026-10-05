/* 5학년 · 혼합물의 분리 — 분리 공장 (컨베이어 위 혼합물을 알맞은 기계로 보내기)
   디자인: 푸른 설계도 + 밝은 공장. 기계·상자·알갱이·분리봇은 모두 직접 그린 그림이고, 기계를 직접 톡 눌러도 돼요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#0f2f6b';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="#ff8a00" stroke="#0f2f6b" stroke-width="3"/><circle cx="24" cy="24" r="4.5" fill="#fff" stroke="#0f2f6b" stroke-width="2.5"/><g stroke="#0f2f6b" stroke-width="3" stroke-linecap="round"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/></g></svg>';

const SEP={
  자석:{e:'🧲',c:'#e5383b'},체:{e:'🥅',c:'#f59e0b'},거름:{e:'☕',c:'#0ea5e9'},증발:{e:'🔥',c:'#a855f7'},
};
/* 알갱이 모양: k=모양, c=색, n=개수, s=크기(상자 칸 폭 비율) */
const VZ={
  '철 구슬 + 플라스틱 구슬':{a:{k:'ball',c:'#8793a8',n:5,s:.1},b:{k:'ball',c:'#ef5b5b',n:5,s:.1}},
  '클립 + 모래':{a:{k:'clip',c:'#8793a8',n:4,s:.14},b:{k:'dot',c:'#e3c27a',n:14,s:.04}},
  '철 캔 + 알루미늄 캔':{a:{k:'can',c:'#6b7689',n:3,s:.14},b:{k:'can',c:'#dfe5ee',n:3,s:.14}},
  '쇳가루 + 소금':{a:{k:'dot',c:'#2b3140',n:12,s:.035},b:{k:'dot',c:'#ffffff',n:12,s:.04}},
  '콩 + 좁쌀':{a:{k:'bean',c:'#8a5a2b',n:4,s:.12},b:{k:'dot',c:'#f2d24b',n:14,s:.035}},
  '자갈 + 모래':{a:{k:'rock',c:'#8f98a5',n:4,s:.12},b:{k:'dot',c:'#e3c27a',n:14,s:.04}},
  '팥 + 좁쌀':{a:{k:'bean',c:'#8a2f2f',n:4,s:.1},b:{k:'dot',c:'#f2d24b',n:14,s:.035}},
  '밀가루 + 덩어리':{a:{k:'lump',c:'#f3ead6',n:3,s:.12},b:{k:'dot',c:'#ffffff',n:14,s:.03}},
  '모래 + 물 (흙탕물)':{liq:'#c9a46a',a:{k:'dot',c:'#8a6a3a',n:12,s:.04},b:null},
  '분필 가루 + 물':{liq:'#e8eef5',a:{k:'dot',c:'#ffffff',n:12,s:.04},b:null},
  '녹차 잎 + 우린 물':{liq:'#b5c95a',a:{k:'leaf',c:'#3f8a3f',n:5,s:.1},b:null},
  '커피 가루 + 물':{liq:'#7a5230',a:{k:'dot',c:'#3a2412',n:12,s:.04},b:null},
  '소금물 → 소금':{liq:'#a8d8f2',a:{k:'spark',c:'#ffffff',n:6,s:.07},b:null},
  '바닷물 → 천일염':{liq:'#4aa6dc',a:{k:'spark',c:'#ffffff',n:6,s:.07},b:null},
  '백반 녹인 물 → 백반':{liq:'#cfd7f5',a:{k:'spark',c:'#ffffff',n:6,s:.07},b:null},
};
const SEP_ITEMS=[
  ['철 구슬 + 플라스틱 구슬','자석','철 구슬만 자석에 붙어요'],['클립 + 모래','자석','철 클립이 자석에 붙어요'],['철 캔 + 알루미늄 캔','자석','철 캔만 자석에 붙어요'],['쇳가루 + 소금','자석','쇳가루가 자석에 붙어요'],
  ['콩 + 좁쌀','체','알갱이 크기가 달라 체로 나눠요'],['자갈 + 모래','체','알갱이 크기가 달라요'],['팥 + 좁쌀','체','팥이 체 위에 남아요'],['밀가루 + 덩어리','체','고운 가루만 체를 빠져나가요'],
  ['모래 + 물 (흙탕물)','거름','모래는 녹지 않아 거름종이에 걸러져요'],['분필 가루 + 물','거름','녹지 않는 분필 가루가 걸러져요'],['녹차 잎 + 우린 물','거름','찻잎이 걸러져요'],['커피 가루 + 물','거름','커피 가루가 거름종이에 남아요'],
  ['소금물 → 소금','증발','물이 증발하면 소금이 남아요'],['바닷물 → 천일염','증발','염전에서 바닷물을 증발시켜요'],['백반 녹인 물 → 백반','증발','물을 증발시켜 백반을 얻어요'],
];
const MIX=[['🍙','김밥',true],['🍧','팥빙수',true],['🍚','잡곡밥',true],['🥗','과일 샐러드',true],['🟤','흙탕물',true],['🧂','소금물',true],['🥜','땅콩 + 아몬드',true],
  ['💧','물',false],['🧂','소금',false],['🍬','설탕',false],['⚪','철 구슬',false],['🧊','얼음',false]];

/* ───────── 그림 도구 ───────── */
function part(g,k,x,y,s,c,rot){g.save();g.translate(x,y);if(rot)g.rotate(rot);g.fillStyle=c;g.strokeStyle='rgba(15,47,107,.55)';g.lineWidth=Math.max(1,s*.12);
  if(k==='ball'){g.beginPath();g.arc(0,0,s,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.arc(-s*.3,-s*.3,s*.3,0,TAU);g.fill();}
  else if(k==='dot'||k==='spark'&&false){g.beginPath();g.arc(0,0,Math.max(1.2,s*.55),0,TAU);g.fill();}
  else if(k==='spark'){g.beginPath();g.moveTo(0,-s);g.lineTo(s*.28,-s*.28);g.lineTo(s,0);g.lineTo(s*.28,s*.28);g.lineTo(0,s);g.lineTo(-s*.28,s*.28);g.lineTo(-s,0);g.lineTo(-s*.28,-s*.28);g.closePath();g.fill();g.stroke();}
  else if(k==='clip'){g.lineWidth=Math.max(1.4,s*.2);g.strokeStyle=c;g.lineCap='round';g.beginPath();K.rr(g,-s*.5,-s*.9,s,s*1.8,s*.5);g.stroke();K.rr(g,-s*.22,-s*.5,s*.44,s*1.1,s*.22);g.stroke();}
  else if(k==='can'){K.rr(g,-s*.6,-s*.8,s*1.2,s*1.6,s*.2);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.55)';g.fillRect(-s*.4,-s*.55,s*.2,s*1.1);g.fillStyle='rgba(15,47,107,.25)';g.fillRect(-s*.6,-s*.1,s*1.2,s*.25);}
  else if(k==='bean'){g.beginPath();g.ellipse(0,0,s,s*.66,0,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-s*.3,-s*.2,s*.3,s*.14,-.3,0,TAU);g.fill();}
  else if(k==='rock'){g.beginPath();g.moveTo(-s,s*.3);g.lineTo(-s*.6,-s*.7);g.lineTo(s*.3,-s*.8);g.lineTo(s,-s*.1);g.lineTo(s*.6,s*.7);g.lineTo(-s*.4,s*.8);g.closePath();g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.moveTo(-s*.5,-s*.5);g.lineTo(s*.2,-s*.6);g.lineTo(-s*.1,-s*.1);g.closePath();g.fill();}
  else if(k==='lump'){g.beginPath();g.arc(0,0,s,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(190,170,130,.5)';g.beginPath();g.arc(s*.25,s*.2,s*.3,0,TAU);g.arc(-s*.3,-s*.15,s*.2,0,TAU);g.fill();}
  else if(k==='leaf'){g.beginPath();g.ellipse(0,0,s,s*.5,0,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(-s*.8,0);g.lineTo(s*.8,0);g.stroke();}
  g.restore();}
/* 상자 속 알갱이: win=보이는 창 사각형, off=기계가 처리하는 중 움직임 */
function fillParts(g,win,viz,seed,tt,mi){const{x,y,w,h}=win;
  [['a',viz.a],['b',viz.b]].forEach(([gk,gr])=>{if(!gr)return;for(let i=0;i<gr.n;i++){
    let px=x+w*(.12+.76*hash(seed*31+i*7+(gk==='a'?1:5))),py=y+h*(viz.liq?.5+.4*hash(seed*17+i*3+(gk==='a'?2:9)):.45+.5*hash(seed*17+i*3+(gk==='a'?2:9)));
    if(tt!=null){const e=clamp(tt,0,1);
      if(mi===0&&gk==='a'&&gr.c!=='#ef5b5b')py=lerp(py,y-h*.9,e);               /* 자석: 철이 위로 */
      else if(mi===0&&gk==='b'&&viz.b&&viz.a.k!=='dust'){}
      if(mi===1&&gk==='b')py=lerp(py,y+h*1.6,e);                                 /* 체: 작은 알갱이는 아래로 */
      if(mi===2&&viz.liq)py=lerp(py,py,0);
      if(mi===3&&viz.liq)px+=0;}
    part(g,gr.k,px,py,Math.max(1.6,w*gr.s),gr.c,gr.k==='clip'||gr.k==='leaf'||gr.k==='bean'?hash(seed+i)*3:0);}});}
function crate(g,x,y,bw,bh,b,u,t,mi,tt){/* (x,y)=상자 가운데 아래쪽 */
  const L=x-bw/2,T=y-bh;g.save();
  K.card(g,L,T,bw,bh,u*.22,b.gold?'#fff4c2':'#eaf1fb',{blur:u*.3,dy:u*.1,stroke:INK,lw:Math.max(2,u*.06),hi:false});
  g.save();K.rr(g,L,T,bw,bh,u*.22);g.clip();g.fillStyle=b.gold?'#ffb703':'#2f6fd6';g.fillRect(L,T,bw,bh*.14);
  g.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<5;k++)g.fillRect(L+bw*(.08+k*.2),T+bh*.04,bw*.1,bh*.06);g.restore();
  const wx=L+bw*.1,wy=T+bh*.19,ww=bw*.8,wh=bh*.44;
  if(b.e){K.rr(g,wx,wy,ww,wh,u*.12);g.fillStyle='#fff';g.fill();g.lineWidth=1.5;g.strokeStyle='rgba(15,47,107,.25)';g.stroke();K.emo(g,b.e,wx+ww/2,wy+wh/2+wh*.02,Math.min(wh*.95,ww*.5));}
  else{const viz=b.viz||VZ[b.t]||{a:{k:'dot',c:'#999',n:8,s:.04},b:null};
    g.save();K.rr(g,wx,wy,ww,wh,u*.12);g.fillStyle='#fff';g.fill();g.clip();
    if(viz.liq){const ly=wy+wh*.32;K.vgrad(g,wx,ly,ww,wh,[K.rgba(viz.liq,.85),viz.liq]);g.fillStyle='rgba(255,255,255,.45)';g.fillRect(wx,ly,ww,Math.max(1.5,wh*.04));
      const wob=Math.sin(t*5+b.id)*wh*.02;g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.ellipse(wx+ww*.3,ly+wob+wh*.1,ww*.1,wh*.04,0,0,TAU);g.fill();}
    else{g.fillStyle='#dbe6f6';g.fillRect(wx,wy+wh*.78,ww,wh*.22);}
    fillParts(g,{x:wx,y:wy,w:ww,h:wh},viz,b.id+1,tt,mi);g.restore();
    g.lineWidth=1.5;g.strokeStyle='rgba(15,47,107,.3)';K.rr(g,wx,wy,ww,wh,u*.12);g.stroke();}
  const ly=T+bh*.65,lh=bh*.33;
  K.tag(g,b.t,x,ly+lh/2,{size:u*.4,maxW:bw*.94,pad:u*.06,fill:'rgba(255,255,255,0)',stroke:'rgba(255,255,255,0)',maxLines:2,color:INK});
  if(b.gold){g.fillStyle='#ffb703';g.beginPath();const sx=L+bw-u*.3,sy=T+u*.1;for(let k=0;k<10;k++){const r=k%2?u*.12:u*.3,a=-Math.PI/2+k*Math.PI/5;g.lineTo(sx+Math.cos(a)*r,sy+Math.sin(a)*r);}g.closePath();g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();}
  g.restore();}
/* 기계 */
function machine(g,k,x,y,w,h,u,t,act,glow,lit){/* act: 0~1 작동 중 / glow: 정답 깜박임 / lit: 눌린 색 */
  const c=SEP[k].c;const sh=act>0?Math.sin(t*40)*u*.03*act:0;g.save();g.translate(x+sh,y);
  if(glow>0)K.glow(g,0,h*.5,w*.9,c,.5*glow);
  K.card(g,-w/2,0,w,h,u*.22,'#f6f9ff',{blur:u*.3,dy:u*.12,stroke:INK,lw:Math.max(2,u*.06),hi:false});
  g.save();K.rr(g,-w/2,0,w,h,u*.22);g.clip();g.fillStyle=c;g.fillRect(-w/2,0,w,h*.2);g.fillStyle='rgba(255,255,255,.3)';g.fillRect(-w/2,0,w,h*.06);g.restore();
  /* 알림등 */
  g.fillStyle=lit==='ok'?'#2fbf71':lit==='bad'?'#e5383b':'rgba(255,255,255,.7)';g.beginPath();g.arc(w/2-u*.3,h*.1,u*.11,0,TAU);g.fill();g.lineWidth=1.5;g.strokeStyle=INK;g.stroke();
  const cx=0,cy=h*.5,s=Math.min(w*.4,h*.28);g.lineCap='round';g.lineJoin='round';
  if(k==='자석'){g.lineWidth=s*.5;g.strokeStyle='#e5383b';g.beginPath();g.arc(cx,cy-s*.1,s*.78,Math.PI,0,false);g.lineTo(cx+s*.78,cy+s*.7);g.moveTo(cx-s*.78,cy-s*.1);g.lineTo(cx-s*.78,cy+s*.7);g.stroke();
    g.strokeStyle='#fff';g.lineWidth=s*.52;g.beginPath();g.moveTo(cx-s*.78,cy+s*.5);g.lineTo(cx-s*.78,cy+s*.72);g.moveTo(cx+s*.78,cy+s*.5);g.lineTo(cx+s*.78,cy+s*.72);g.stroke();
    g.strokeStyle='rgba(229,56,59,.5)';g.lineWidth=Math.max(1.5,s*.08);const pu=Math.sin(t*6)*.5+.5;for(let i=0;i<2;i++){g.beginPath();g.arc(cx,cy+s*.75,s*(.5+i*.3+pu*.15),Math.PI*1.1,Math.PI*1.9);g.stroke();}}
  else if(k==='체'){g.lineWidth=s*.16;g.strokeStyle='#8a5a1a';g.fillStyle='rgba(245,158,11,.18)';g.beginPath();g.arc(cx,cy,s*.86,0,TAU);g.fill();g.stroke();
    g.lineWidth=Math.max(1.2,s*.07);g.strokeStyle='#b97a14';g.save();g.beginPath();g.arc(cx,cy,s*.8,0,TAU);g.clip();g.beginPath();for(let i=-4;i<=4;i++){g.moveTo(cx+i*s*.22,cy-s);g.lineTo(cx+i*s*.22,cy+s);g.moveTo(cx-s,cy+i*s*.22);g.lineTo(cx+s,cy+i*s*.22);}g.stroke();g.restore();
    g.fillStyle='#b97a14';for(let i=0;i<3;i++){const q=((t*1.4+i/3)%1);g.beginPath();g.arc(cx+(i-1)*s*.5,cy+s*.9+q*s*.6,Math.max(1.6,s*.08),0,TAU);g.fill();}}
  else if(k==='거름'){g.fillStyle='#e8f6ff';g.strokeStyle=INK;g.lineWidth=Math.max(1.8,s*.1);g.beginPath();g.moveTo(cx-s*.85,cy-s*.7);g.lineTo(cx+s*.85,cy-s*.7);g.lineTo(cx+s*.12,cy+s*.2);g.lineTo(cx+s*.12,cy+s*.5);g.lineTo(cx-s*.12,cy+s*.5);g.lineTo(cx-s*.12,cy+s*.2);g.closePath();g.fill();g.stroke();
    g.fillStyle='#fff6d8';g.beginPath();g.moveTo(cx-s*.6,cy-s*.66);g.lineTo(cx+s*.6,cy-s*.66);g.lineTo(cx+s*.08,cy+s*.05);g.lineTo(cx-s*.08,cy+s*.05);g.closePath();g.fill();
    g.fillStyle='#38bdf8';for(let i=0;i<2;i++){const q=((t*1.6+i/2)%1);g.beginPath();g.arc(cx,cy+s*.6+q*s*.5,Math.max(1.6,s*.08),0,TAU);g.fill();}}
  else{g.fillStyle='#e8e0f3';g.strokeStyle=INK;g.lineWidth=Math.max(1.8,s*.1);g.beginPath();g.ellipse(cx,cy-s*.1,s*.85,s*.3,0,0,Math.PI);g.fill();g.stroke();g.beginPath();g.ellipse(cx,cy-s*.1,s*.85,s*.18,0,0,TAU);g.fillStyle='#f6f1ff';g.fill();g.stroke();
    g.strokeStyle='rgba(168,85,247,.7)';g.lineWidth=Math.max(1.6,s*.1);for(let i=-1;i<=1;i++){g.beginPath();for(let q=0;q<=6;q++){const yy=cy-s*.35-q*s*.16,xx=cx+i*s*.4+Math.sin(t*3+q*.9+i)*s*.1;q?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}
    flameF(g,cx,cy+s*.65,s*.7,t);}
  /* 이름표 */
  K.txt(g,k,0,h*.88,{size:Math.max(12,u*.5),color:INK,maxW:w*.88});
  g.restore();}
function flameF(g,x,y,s,t){g.save();g.translate(x,y);const f=1+Math.sin(t*12)*.07;g.scale(f,1/f*(1+Math.sin(t*9)*.05));
  g.fillStyle='#ff8a00';g.beginPath();g.moveTo(0,-s*.9);g.quadraticCurveTo(s*.6,-s*.2,s*.32,s*.28);g.quadraticCurveTo(0,s*.5,-s*.32,s*.28);g.quadraticCurveTo(-s*.6,-s*.2,0,-s*.9);g.fill();
  g.fillStyle='#ffd23f';g.beginPath();g.moveTo(0,-s*.45);g.quadraticCurveTo(s*.3,-s*.05,s*.14,s*.25);g.quadraticCurveTo(0,s*.34,-s*.14,s*.25);g.quadraticCurveTo(-s*.3,-s*.05,0,-s*.45);g.fill();g.restore();}
/* 분리봇 */
function robot(g,x,y,s,t,mood,streak){g.save();g.translate(x,y);const bob=Math.sin(t*3)*s*.03,hop=mood==='happy'?-Math.abs(Math.sin(t*11))*s*.12:0;g.translate(0,bob+hop);
  if(mood==='oops')g.rotate(Math.sin(t*30)*.08);
  K.shadow(g,0,s*.02-bob-hop,s*.42,s*.07,.25);
  g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;g.lineJoin='round';
  /* 팔 */
  g.fillStyle='#9db6e0';const arm=(d)=>{g.save();g.translate(d*s*.43,-s*.34);g.rotate(d*(mood==='happy'?-2.2+Math.sin(t*14)*.35:.5));K.rr(g,-s*.07,0,s*.14,s*.3,s*.07);g.fill();g.stroke();g.restore();};arm(-1);arm(1);
  /* 몸 */
  K.rr(g,-s*.34,-s*.5,s*.68,s*.5,s*.14);const bg=g.createLinearGradient(0,-s*.5,0,0);bg.addColorStop(0,'#cfe0ff');bg.addColorStop(1,'#8fb0ee');g.fillStyle=bg;g.fill();g.stroke();
  g.fillStyle='#fff';K.rr(g,-s*.2,-s*.38,s*.4,s*.22,s*.05);g.fill();g.stroke();
  K.txt(g,streak>=3?'×'+streak:'♥',0,-s*.27,{size:s*.19,color:streak>=3?'#e8590c':'#e5383b',font:'Bagel Fat One'});
  /* 머리 */
  g.save();g.translate(0,-s*.62);K.rr(g,-s*.4,-s*.4,s*.8,s*.62,s*.18);const hg=g.createLinearGradient(0,-s*.4,0,s*.2);hg.addColorStop(0,'#e8f0ff');hg.addColorStop(1,'#a9c3f2');g.fillStyle=hg;g.fill();g.stroke();
  K.rr(g,-s*.3,-s*.3,s*.6,s*.42,s*.1);g.fillStyle='#0f2f6b';g.fill();
  g.strokeStyle='#7ee0ff';g.fillStyle='#7ee0ff';g.lineWidth=Math.max(2,s*.055);g.lineCap='round';
  const ey=-s*.12,ex=s*.12;
  if(mood==='happy'){g.beginPath();g.arc(-ex,ey+s*.03,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();g.beginPath();g.arc(ex,ey+s*.03,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();g.beginPath();g.arc(0,ey+s*.08,s*.1,.15*Math.PI,.85*Math.PI);g.stroke();}
  else if(mood==='star'){for(const d of[-1,1]){g.save();g.translate(d*ex,ey);g.rotate(t*3);g.fillStyle='#ffd23f';g.beginPath();for(let k=0;k<10;k++){const r=k%2?s*.04:s*.1,a=k*Math.PI/5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.restore();}g.beginPath();g.arc(0,ey+s*.06,s*.1,.1*Math.PI,.9*Math.PI);g.stroke();}
  else if(mood==='oops'){g.strokeStyle='#ff8a8a';for(const d of[-1,1]){g.beginPath();g.moveTo(d*ex-s*.06,ey-s*.06);g.lineTo(d*ex+s*.06,ey+s*.06);g.moveTo(d*ex+s*.06,ey-s*.06);g.lineTo(d*ex-s*.06,ey+s*.06);g.stroke();}g.beginPath();g.arc(0,ey+s*.16,s*.09,1.15*Math.PI,1.85*Math.PI);g.stroke();}
  else if(mood==='worry'){g.beginPath();g.arc(-ex,ey,s*.075,0,TAU);g.arc(ex,ey,s*.075,0,TAU);g.fill();g.beginPath();g.moveTo(-ex-s*.1,ey-s*.14);g.lineTo(-ex+s*.08,ey-s*.1);g.moveTo(ex+s*.1,ey-s*.14);g.lineTo(ex-s*.08,ey-s*.1);g.stroke();g.beginPath();g.ellipse(0,ey+s*.13,s*.05,s*.035,0,0,TAU);g.stroke();
    g.fillStyle='#8fe3ff';g.beginPath();g.ellipse(s*.36,-s*.28+((t*2)%1)*s*.1,s*.04,s*.06,0,0,TAU);g.fill();}
  else{const bl=(t%3.2)<.12;if(bl){g.beginPath();g.moveTo(-ex-s*.06,ey);g.lineTo(-ex+s*.06,ey);g.moveTo(ex-s*.06,ey);g.lineTo(ex+s*.06,ey);g.stroke();}else{g.beginPath();g.arc(-ex,ey,s*.065,0,TAU);g.arc(ex,ey,s*.065,0,TAU);g.fill();}g.beginPath();g.moveTo(-s*.06,ey+s*.12);g.lineTo(s*.06,ey+s*.12);g.stroke();}
  g.restore();
  /* 안테나 */
  g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.045);g.beginPath();g.moveTo(0,-s*1.02);g.lineTo(0,-s*1.14);g.stroke();g.fillStyle=Math.sin(t*6)>0?'#ff8a00':'#ffd23f';g.beginPath();g.arc(0,-s*1.17,s*.06,0,TAU);g.fill();g.stroke();
  g.restore();}
/* 배경 */
function factoryBG(g,W,H,u,Z,belt,mixMode){
  K.vgrad(g,0,0,W,H,['#cddcf0','#b5c8e2','#93aacb']);
  /* 타일 벽 */
  g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1;g.beginPath();for(let x=0;x<W;x+=u*1.2){g.moveTo(x,0);g.lineTo(x,belt+u*2);}for(let y=u*.8;y<belt+u*2;y+=u*1.2){g.moveTo(0,y);g.lineTo(W,y);}g.stroke();
  /* 높은 창 */
  const nw=Math.max(2,Math.round(W/(u*3))),ww=W/nw,wy=Z.y0*.25,wh=Math.min(Z.h*.1,u*1.1);
  /* 천장 파이프 */
  g.fillStyle='#7f93b3';g.fillRect(0,Z.y0*.02+2,W,u*.22);g.fillStyle='rgba(255,255,255,.4)';g.fillRect(0,Z.y0*.02+2,W,u*.06);
  for(let x=u*1.6;x<W;x+=u*4)K.rr(g,x-u*.18,Z.y0*.02-1,u*.36,u*.34,u*.06),g.fillStyle='#5f7396',g.fill();
  /* 바닥 */
  const fl=belt+u*1.35;K.vgrad(g,0,fl,W,H-fl,['#7487a8','#506385']);
  g.fillStyle='#ffcc33';const hz=Math.max(5,u*.16);g.fillRect(0,fl,W,hz);g.fillStyle='#1f2a44';for(let x=-u;x<W;x+=u*.7){g.beginPath();g.moveTo(x,fl);g.lineTo(x+u*.35,fl);g.lineTo(x+u*.1,fl+hz);g.lineTo(x-u*.25,fl+hz);g.fill();}
  g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=2;g.beginPath();for(let x=-H;x<W;x+=u*1.1){g.moveTo(x,H);g.lineTo(x+(H-fl),fl);}g.stroke();
  /* 벨트 다리 */
  g.fillStyle='#3d4d6e';for(let x=u*1.4;x<W;x+=u*3.2)K.rr(g,x-u*.1,belt+u*.5,u*.2,fl-belt-u*.5+u*.1,u*.04),g.fill();}

/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const items=[['철 구슬 + 플라스틱 구슬','자석'],['소금물 → 소금','증발'],['콩 + 좁쌀','체'],['커피 가루 + 물','거름']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?Math.min(W/9,H/4.4):Math.min(W,H)/9,by=wide?H*.86:H*.72;
    const gear=(x,y,r,rot,c)=>{g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=c;g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=2;g.beginPath();const n=10;for(let i=0;i<n*2;i++){const a=i*Math.PI/n,rr=i%2?r*.82:r;g.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}g.closePath();g.fill();g.stroke();g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.arc(0,0,r*.35,0,TAU);g.fill();g.restore();};
    if(wide){gear(W*.06,H*.4,u*1.2,T*.5,'rgba(255,138,0,.35)');gear(W*.94,H*.4,u*1.2,-T*.45,'rgba(255,255,255,.16)');}
    else{gear(W*.1,H*.5,u*1.5,T*.5,'rgba(255,138,0,.35)');gear(W*.1+u*2.45,H*.5+u*.7,u*1,-T*.75,'rgba(255,255,255,.15)');gear(W*.9,H*.46,u*1.3,-T*.45,'rgba(255,255,255,.14)');gear(W*.9-u*2.1,H*.46+u*.8,u*.8,T*.9,'rgba(255,138,0,.3)');
      const ks=Object.keys(SEP);const mw=Math.min(u*1.9,W/4.4),mh=mw*1.15;
      ks.forEach((k,i)=>{const x=W*(i+.5)/4;machine(g,k,x,by-u*2.4-mh,mw,mh,u*.8,T+i,0,0,'');g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x-u*.05,by-u*2.4,u*.1,u*1.1);});}
    g.fillStyle='#233a6e';K.rr(g,-10,by,W+20,u*.55,u*.27);g.fill();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.setLineDash([u*.3,u*.25]);g.lineDashOffset=-T*u*2.2;g.beginPath();g.moveTo(0,by+u*.27);g.lineTo(W,by+u*.27);g.stroke();g.setLineDash([]);
    const bw=Math.min(u*3.1,W*.3)*(wide?.75:1),bh=u*(wide?1.3:1.9);const gap=W/3;
    if(H>=140)for(let k=0;k<4;k++){const x=((k*gap+T*u*1.4)%(gap*4))-gap*.6;const it=items[k%4];crate(g,x,by,bw,bh,{t:it[0],id:k*3+2,viz:VZ[it[0]]},u,T);}
    /* 분리봇 */
    if(wide)robot(g,W*.86,H*.99,u*1.7,T,Math.sin(T*.8)>.3?'happy':'idle',0);else robot(g,W*.5,H*.97,u*2.1,T,Math.sin(T*.8)>.3?'happy':'idle',0);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const GAME={
  id:'sci5-separate',title:'분리 공장',title1:'혼합물 분리 라인',title2:'분리 공장',emoji:LOGO,
  subtitle:'5학년 · 혼합물의 분리',
  howto:'컨베이어 벨트로 혼합물이 들어와요! 상자가 끝에 닿기 전에 알맞은 <b>분리 기계</b>를 눌러요.',
  how:'상자가 끝에 닿기 전에<br>알맞은 <b>기계</b>를 톡! (아래 버튼도 돼요)',
  txt:{who:'누구와 일할까요?',dur:'근무 시간',pace:'벨트 속도',seat:'번 작업자 ',go:'공장 가동!',s1:'1. 작업',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#ff8a00',c2:'#2f6fd6'},hero:heroScene,vignette:.05,durs:[60,90,120],
  levelTitle:'어떤 작업을 할까요?',
  levels:[
    {id:'sep',g:'5학년 · 혼합물의 분리',t:'⚙️ 분리 방법 고르기',d:'자석·체·거름·증발'},
    {id:'mix',g:'5학년 · 혼합물의 분리',t:'🍙 혼합물 찾기',d:'두 가지 이상 섞였나요?'},
    {id:'all',g:'5학년 · 혼합물의 분리',t:'🌟 모두 섞기',d:'번갈아 나와요'},
  ],
  summary:`<ul><li><b>혼합물</b>: 두 가지 이상의 물질이 섞여 있는 것 (김밥, 팥빙수, 잡곡, 흙탕물, 소금물)</li>
    <li>알갱이 크기가 다르면 <b>체</b> · 철이 섞여 있으면 <b>자석</b> · 물에 녹지 않는 물질은 <b>거름</b>(거름종이, 깔때기) · 물에 녹아 있는 물질은 <b>증발</b>로 분리해요.</li>
    <li>소금과 모래의 혼합물: 물에 녹이기 → 거르기(모래) → 증발시키기(소금)</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{boxes:[],spawnT:.2,kN:0,cnt:0,nid:0,mood:'idle',moodT:0,reveal:null,act:{},lit:null,k:'sep'});this.useSet(p);},
  useSet(p){const st=p.state,L=p.levelId;st.k=L==='all'?(st.kN++%2?'mix':'sep'):L;st.cnt=0;st.boxes.forEach(b=>b.leave=true);
    if(st.k==='sep'){p.ask('🏭 혼합물을 알맞은 <b>분리 기계</b>로!','상자가 끝에 닿기 전에 기계를 톡');
      p.tools(Object.entries(SEP).map(([k,v])=>({e:v.e,t:k,k})),(i,t)=>this.send(p,t.k),{toggle:false});}
    else{p.ask('🍙 <b>혼합물</b>일까요?','두 가지 이상의 물질이 섞였나요?');p.tools([{e:'✅',t:'혼합물',k:true},{e:'❌',t:'혼합물 아님',k:false}],(i,t)=>this.send(p,t.k),{toggle:false});}},
  spawn(p){const st=p.state,R=p.Rf;let b;
    if(st.k==='sep'){const it=p.deck(SEP_ITEMS,'sep');b={t:it[0],ans:it[1],why:it[2],gold:R.chance(.12)};}else{const it=p.deck(MIX,'mix');b={e:it[0],t:it[1],ans:it[2],why:it[2]?'여러 물질이 섞여 있어요':'한 가지 물질이에요',gold:R.chance(.1)};}
    b.id=st.nid++;b.x=-p.u*2.2;b.age=0;st.boxes.push(b);st.cnt++;if(p.levelId==='all'&&st.cnt>=8)setTimeout(()=>{if(p.active)this.useSet(p);},50);
    st.spawnT=Math.max(1.2,2.6/p.pace);},
  Z(p){const y0=p.top||0,y1=p.H-(p.bot||0);return{y0,y1,h:Math.max(60,y1-y0)};},
  belt(p){const Z=this.Z(p);return Z.y0+Z.h*.7;},
  crateSize(p){const u=p.u,Z=this.Z(p);return{bw:Math.min(u*3.7,p.W*.46),bh:Math.min(u*2.5,Z.h*.27)};},
  machGeo(p,mixMode){const Z=this.Z(p),u=p.u,W=p.W;if(mixMode){const mw=Math.min(W*.4,u*4.2),mh=Math.min(Z.h*.34,mw*.8);return{y:Z.y0+Z.h*.03,mw,mh,xs:[W*.27,W*.73]};}
    const mw=Math.min(W/4*.86,u*2.7),mh=Math.min(Z.h*.34,mw*1.2);return{y:Z.y0+Z.h*.03,mw,mh,xs:[0,1,2,3].map(i=>W*(i+.5)/4)};},
  front(p){const st=p.state;return st.boxes.filter(b=>!b.done&&!b.leave).sort((a,b)=>b.x-a.x)[0];},
  send(p,choice){const st=p.state,u=p.u;const b=this.front(p);if(!b)return;b.done=true;b.choice=choice;b.t0=p.t;const ok=choice===b.ans;b.ok=ok;
    const frac=clamp(b.x/(p.W*.85),0,1);let pts=Math.round(140-frac*60);if(b.gold)pts*=2;
    const label=st.k==='sep'?b.ans:(b.ans?'혼합물':'혼합물이 아님');
    const mg=this.machGeo(p,st.k==='mix'),mi=st.k==='sep'?Object.keys(SEP).indexOf(choice):(choice?0:1);b.mi=mi;b.mx=mg.xs[mi];b.my=mg.y+mg.mh*.55;
    st.act[mi]={t:p.t,ok};st.lit={mi,ok,t:p.t};
    p.hit(ok,{pts,x:b.mx,y:mg.y+mg.mh+u*.2,tip:ok?(b.gold?'⭐ 황금 상자! 점수 2배 · ':'')+b.why:`${b.t} → <b>${label}</b> (${b.why})`,review:`${b.t} → ${label} (${b.why})`});
    st.mood=ok?(p.streak>=5?'star':'happy'):'oops';st.moodT=1.1;
    if(p.streak>=3&&ok)p.float(p.W*.18,this.belt(p)+u*1.3,'콤보 ×'+p.streak+'!','#ff8a00',u*.7);
    if(!ok){st.reveal={mi:st.k==='sep'?Object.keys(SEP).indexOf(b.ans):(b.ans?0:1),t:p.t};}},
  update(p,dt){const st=p.state,u=p.u;const cs=this.crateSize(p);
    st.spawnT-=dt;const live=st.boxes.filter(b=>!b.done&&!b.leave);const lastX=live.length?Math.min(...live.map(b=>b.x)):1e9;
    if(st.spawnT<=0&&live.length<3&&lastX>cs.bw*1.08-cs.bw*.3)this.spawn(p);
    const sp=u*(1.5+p.t/p.dur*.9)*p.pace;
    for(const b of st.boxes){b.age+=dt;if(b.done){continue;}b.x+=sp*dt*(b.leave?4:1);
      if(!b.leave&&b.x>p.W+cs.bw*.1-u*.6){b.done=true;b.miss=true;b.t0=p.t;const label=st.k==='sep'?b.ans:(b.ans?'혼합물':'혼합물이 아님');const mg=this.machGeo(p,st.k==='mix');
        p.hit(false,{pen:15,x:p.W-u*2,y:this.belt(p)-u*2,tip:`늦었어요! ${b.t} → <b>${label}</b>`,review:`${b.t} → ${label} (${b.why})`});
        st.reveal={mi:st.k==='sep'?Object.keys(SEP).indexOf(b.ans):(b.ans?0:1),t:p.t};st.mood='oops';st.moodT=1.1;}}
    st.boxes=st.boxes.filter(b=>!(b.done&&p.t-b.t0>1.25)&&b.x<p.W+u*4);
    if(st.moodT>0)st.moodT-=dt;
    const f=this.front(p);st.worry=!!(f&&f.x>p.W*.72);},
  draw(p,g,dt){const W=p.W,H=p.H,u=p.u,st=p.state,Z=this.Z(p),by=this.belt(p),mix=st.k==='mix';const cs=this.crateSize(p),t=p.t+(p.active?0:0);const tm=performance.now()/1000;
    K.layer(p,'bg',g2=>factoryBG(g2,W,H,u,Z,by,mix),(p.top||0)+'/'+(p.bot||0));
    /* 기계 */
    const mg=this.machGeo(p,mix);
    if(!mix){const ks=Object.keys(SEP);ks.forEach((k,i)=>{const a=st.act[i];const tt=a?p.t-a.t:9;const act=tt<1?1-tt:0;const rv=st.reveal&&st.reveal.mi===i&&p.t-st.reveal.t<1.4?Math.abs(Math.sin((p.t-st.reveal.t)*7)):0;
        g.fillStyle='#8da1c2';g.fillRect(mg.xs[i]-u*.09,mg.y+mg.mh,u*.18,by-cs.bh-(mg.y+mg.mh)+u*.1);
        machine(g,k,mg.xs[i],mg.y,mg.mw,mg.mh,u,tm,act,Math.max(rv,tt<.9?.7:0),tt<1.2?(a.ok?'ok':'bad'):'');
        if(tt<1&&tt>.3&&a.ok)this.fx(p,g,i,mg.xs[i],mg.y+mg.mh,tt,u,tm);});}
    else{[['혼합물','#2fbf71'],['혼합물 아님','#8895ad']].forEach(([n,c],i)=>{const a=st.act[i];const tt=a?p.t-a.t:9;const x=mg.xs[i];const rv=st.reveal&&st.reveal.mi===i&&p.t-st.reveal.t<1.4?Math.abs(Math.sin((p.t-st.reveal.t)*7)):0;
        g.save();g.translate(x+(tt<.4?Math.sin(tm*40)*u*.04:0),mg.y);if(rv>0||tt<.9)K.glow(g,0,mg.mh*.5,mg.mw*.9,c,.45*Math.max(rv,tt<.9?.8:0));
        K.card(g,-mg.mw/2,0,mg.mw,mg.mh,u*.24,'#f6f9ff',{blur:u*.3,dy:u*.12,stroke:INK,lw:Math.max(2,u*.06),hi:false});g.save();K.rr(g,-mg.mw/2,0,mg.mw,mg.mh,u*.24);g.clip();g.fillStyle=c;g.fillRect(-mg.mw/2,0,mg.mw,mg.mh*.24);g.restore();
        K.txt(g,n,0,mg.mh*.12,{size:Math.max(13,u*.5),color:'#fff',font:'Bagel Fat One',maxW:mg.mw*.9});
        if(i===0){/* 믹서통 */g.fillStyle='#e5eefc';g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.06);g.beginPath();g.moveTo(-mg.mw*.22,mg.mh*.36);g.lineTo(mg.mw*.22,mg.mh*.36);g.lineTo(mg.mw*.15,mg.mh*.8);g.lineTo(-mg.mw*.15,mg.mh*.8);g.closePath();g.fill();g.stroke();
          for(let k=0;k<5;k++)part(g,'dot',Math.sin(tm*3+k*2)*mg.mw*.1,mg.mh*(.5+.06*k),Math.max(2.4,u*.12),['#ef5b5b','#f2d24b','#3fae5f','#a855f7','#38bdf8'][k]);}
        else{/* 한 가지 물질: 둥근 병 */g.fillStyle='#e8f6ff';g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.06);K.rr(g,-mg.mw*.15,mg.mh*.36,mg.mw*.3,mg.mh*.44,u*.14);g.fill();g.stroke();g.fillStyle='#7ccbf0';K.rr(g,-mg.mw*.12,mg.mh*.52,mg.mw*.24,mg.mh*.25,u*.1);g.fill();}
        g.fillStyle=tt<1.2?(a.ok?'#2fbf71':'#e5383b'):'rgba(255,255,255,.7)';g.beginPath();g.arc(mg.mw/2-u*.3,mg.mh*.12,u*.1,0,TAU);g.fill();g.lineWidth=1.5;g.strokeStyle=INK;g.stroke();g.restore();
        g.fillStyle='#8da1c2';g.fillRect(x-u*.09,mg.y+mg.mh,u*.18,by-cs.bh-(mg.y+mg.mh)+u*.1);});}
    /* 벨트 */
    const bt=by,bh2=u*.55;K.card(g,-u*.2,bt-u*.04,W+u*.4,bh2+u*.1,bh2*.5,'#1f3560',{blur:u*.3,dy:u*.1,hi:false});
    g.save();K.rr(g,0,bt,W,bh2,bh2*.45);g.clip();K.vgrad(g,0,bt,W,bh2,['#3d5b97','#223a6b']);
    const off=(tm*u*(1.5+p.t/p.dur*.9)*p.pace)%(u*.8);g.fillStyle='rgba(255,255,255,.16)';for(let x=-u-off+u*.8;x<W+u;x+=u*.8){g.beginPath();g.moveTo(x,bt);g.lineTo(x+u*.25,bt);g.lineTo(x+u*.1,bt+bh2);g.lineTo(x-u*.15,bt+bh2);g.fill();}
    g.fillStyle='rgba(255,255,255,.4)';g.fillRect(0,bt,W,2);g.restore();
    for(let x=u*.6;x<W;x+=u*1.6){const rot=tm*3;g.save();g.translate(x,bt+bh2*.5);g.fillStyle='#9db6e0';g.beginPath();g.arc(0,0,bh2*.28,0,TAU);g.fill();g.strokeStyle='#e8f0ff';g.lineWidth=1.5;g.beginPath();g.moveTo(Math.cos(rot)*bh2*.22,Math.sin(rot)*bh2*.22);g.lineTo(-Math.cos(rot)*bh2*.22,-Math.sin(rot)*bh2*.22);g.stroke();g.restore();}
    /* 끝: 떨어지는 곳 */
    const ex=W-u*.9;g.save();g.fillStyle='rgba(229,56,59,.25)';for(let y=by-cs.bh;y<by;y+=u*.5){g.beginPath();g.moveTo(ex,y);g.lineTo(W,y+u*.5);g.lineTo(W,y+u*.8);g.lineTo(ex,y+u*.3);g.fill();}g.restore();
    g.fillStyle='rgba(229,56,59,.8)';g.fillRect(ex,by-cs.bh-u*.05,Math.max(2,u*.05),cs.bh+u*.55);
    /* 상자 */
    const fr=this.front(p);
    for(const b of st.boxes){const tt=b.done?p.t-b.t0:0;g.save();
      if(!b.done){if(b===fr)K.glow(g,b.x,by-cs.bh/2,cs.bw*.8,'#ffb703',.38+.12*Math.sin(tm*6));K.shadow(g,b.x,by+u*.05,cs.bw*.45,u*.07,.25);crate(g,b.x,by,cs.bw,cs.bh,b,u,tm);}
      else if(b.miss){const e=tt;g.globalAlpha=clamp(1-e/1.1,0,1);g.translate(e*u*1.2,e*e*u*7);g.rotate(e*1.4);crate(g,b.x,by,cs.bw,cs.bh,b,u,tm);}
      else{const e=clamp(tt/.4,0,1);const ee=e*e*(3-2*e);const x=lerp(b.x,b.mx,ee),yb=lerp(by,b.my+cs.bh*.35,ee)-Math.sin(ee*Math.PI)*u*1.2;const sc=lerp(1,.38,ee);
        if(tt<.5){g.translate(x,yb);g.scale(sc,sc);g.translate(-x,-yb);crate(g,x,yb,cs.bw,cs.bh,b,u,tm);}
        else if(!b.ok&&tt<1.2){const f=tt-.5;g.globalAlpha=clamp(1-f/.7,0,1);const xx=b.mx+f*u*3,yy=by-cs.bh*.5+f*f*u*5;g.translate(xx,yy);g.rotate(f*3);g.scale(.45,.45);crate(g,0,0,cs.bw,cs.bh,b,u,tm);}}
      g.restore();}
    /* 가리키는 화살표 */
    if(fr){const ax=clamp(fr.x,u,W-u),ay=by-cs.bh-u*.35+Math.sin(tm*5)*u*.08;g.fillStyle='#ff8a00';g.strokeStyle=INK;g.lineWidth=Math.max(2,u*.05);g.beginPath();g.moveTo(ax-u*.28,ay-u*.28);g.lineTo(ax+u*.28,ay-u*.28);g.lineTo(ax,ay+u*.04);g.closePath();g.fill();g.stroke();}
    /* 분리봇 */
    const mood=st.moodT>0?st.mood:(st.worry?'worry':'idle');robot(g,Math.max(u*1.3,W*.1),Z.y1-u*.05,Math.min(u*2.1,(Z.y1-by-u*.9)),tm,mood,p.streak);},
  fx(p,g,i,x,y,tt,u,tm){/* 분리가 되는 모습 */
    const e=clamp((tt-.3)/.7,0,1);g.save();
    if(i===0){g.strokeStyle='rgba(229,56,59,.7)';g.lineWidth=Math.max(2,u*.06);for(let k=0;k<3;k++){g.beginPath();g.arc(x,y+u*.2,u*(.5+k*.4+e*.3),Math.PI*.15,Math.PI*.85);g.stroke();}
      for(let k=0;k<5;k++)part(g,'ball',x+(k-2)*u*.28,y+u*(1.2-e*1.1)+Math.sin(k)*u*.1,u*.11,'#8793a8');}
    else if(i===1){for(let k=0;k<8;k++){const q=(e*1.2+k/8)%1;part(g,'dot',x+(k%4-1.5)*u*.34,y+q*u*1.8,u*.14,'#f2d24b');}}
    else if(i===2){g.fillStyle='rgba(56,189,248,.85)';for(let k=0;k<5;k++){const q=(e*1.5+k/5)%1;g.beginPath();g.arc(x+Math.sin(k*2)*u*.14,y+q*u*1.6,u*.08,0,TAU);g.fill();}}
    else{g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=Math.max(2,u*.1);g.lineCap='round';for(let k=-1;k<=1;k++){g.beginPath();for(let q=0;q<=6;q++){const yy=y+u*.1-q*u*.0-q*u*.0;}}
      for(let k=-1;k<=1;k++){g.beginPath();for(let q=0;q<=8;q++){const yy=y-u*.2+q*u*.18*e+q*0,xx=x+k*u*.45+Math.sin(tm*5+q+k)*u*.12;q?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}}
    g.restore();},
  down(p,x,y){const st=p.state;if(!p.active||!st.boxes)return;const mix=st.k==='mix',mg=this.machGeo(p,mix);if(y<mg.y-p.u*.3||y>mg.y+mg.mh+p.u*.8)return;
    const i=mg.xs.findIndex(mx=>Math.abs(x-mx)<mg.mw*.62);if(i<0)return;if(mix)this.send(p,i===0);else this.send(p,Object.keys(SEP)[i]);},
};

Engine.boot(GAME);
