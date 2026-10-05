/* 5학년 · 자원과 에너지 — 에너지 낚시 (배를 옮겨 낚싯바늘을 내려 정답 물고기 낚기)
   디자인: 수채화 바다 단면 + 밧줄·물결 장식. 물고기·배·산호는 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#2ec4d6" stroke="#0d6f86" stroke-width="3"/><path d="M4 28q5-5 10 0t10 0 10 0 10 0v14H4z" fill="#0e8aa8"/><path d="M30 8v18a5 5 0 1 1-6-4.9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M18 12h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="20" r="3" fill="#ffd166"/></svg>';
const FCOL=[['#ff9f43','#ffd9a8'],['#ffd166','#fff0bf'],['#ff6b81','#ffc2cc'],['#54c6eb','#c5eefa'],['#7bd88f','#d3f5db'],['#b388eb','#e3d1fa']];

/* ───────── 그림 도구 ───────── */
function fishShape(g,x,y,s,kind,ci,dir,t,hi){const c=FCOL[ci%FCOL.length];g.save();g.translate(x,y);g.scale(dir,1);const w=Math.sin(t*7+x*.02)*.12;
  /* 꼬리 */
  g.save();g.translate(-s*.46,0);g.rotate(w);g.fillStyle=c[0];g.beginPath();g.moveTo(s*.1,0);g.quadraticCurveTo(-s*.15,-s*.1,-s*.34,-s*.34);g.quadraticCurveTo(-s*.28,0,-s*.34,s*.34);g.quadraticCurveTo(-s*.15,s*.1,s*.1,0);g.fill();g.restore();
  const ry=kind===1?s*.4:kind===2?s*.46:s*.3,rx=kind===2?s*.46:s*.55;
  if(kind===2){g.fillStyle='#e8b04a';for(let i=0;i<9;i++){const a=i/9*TAU;g.save();g.rotate(a);g.beginPath();g.moveTo(rx*.85,-s*.05);g.lineTo(rx*1.22,0);g.lineTo(rx*.85,s*.05);g.fill();g.restore();}}
  /* 등지느러미 */
  g.fillStyle=c[0];g.beginPath();g.moveTo(-s*.15,-ry*.85);g.quadraticCurveTo(s*.05,-ry*1.55,s*.25,-ry*.85);g.fill();
  /* 몸통 */
  g.fillStyle=hi?'#fff3a8':c[0];g.beginPath();g.ellipse(0,0,rx,ry,0,0,TAU);g.fill();
  g.fillStyle=c[1];g.beginPath();g.ellipse(s*.02,ry*.38,rx*.82,ry*.55,0,0,TAU);g.fill();
  if(kind===1){g.fillStyle='rgba(255,255,255,.75)';for(const k of [-.18,.1]){g.beginPath();g.ellipse(s*k,0,s*.05,ry*.9,0,0,TAU);g.fill();}}
  if(kind===0){g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=Math.max(1.2,s*.04);g.beginPath();g.arc(s*.08,0,ry*.9,-1.1,1.1);g.stroke();}
  /* 눈 */
  g.fillStyle='#fff';g.beginPath();g.arc(s*.3,-ry*.2,s*.085,0,TAU);g.fill();g.fillStyle='#0b3a4a';g.beginPath();g.arc(s*.32,-ry*.2,s*.045,0,TAU);g.fill();
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-s*.05,-ry*.5,s*.22,s*.05,-.1,0,TAU);g.fill();g.restore();}
function boatShape(g,x,y,s,col,t){g.save();g.translate(x,y);g.rotate(Math.sin(t*1.6)*.025);
  g.fillStyle='rgba(8,70,90,.18)';g.beginPath();g.ellipse(0,s*.3,s*.78,s*.1,0,0,TAU);g.fill();
  /* 선체 */
  g.fillStyle='#a8602f';g.beginPath();g.moveTo(-s*.75,-s*.1);g.lineTo(s*.75,-s*.1);g.quadraticCurveTo(s*.62,s*.3,s*.38,s*.3);g.lineTo(-s*.38,s*.3);g.quadraticCurveTo(-s*.62,s*.3,-s*.75,-s*.1);g.fill();
  g.fillStyle='#c98349';g.fillRect(-s*.72,-s*.1,s*1.44,s*.1);g.strokeStyle='rgba(90,45,15,.4)';g.lineWidth=1.5;g.beginPath();g.moveTo(-s*.62,s*.08);g.lineTo(s*.62,s*.08);g.stroke();
  /* 선실과 깃발 */
  g.fillStyle='#fff3d8';g.fillRect(-s*.4,-s*.42,s*.42,s*.34);g.fillStyle='#8ecde0';g.fillRect(-s*.32,-s*.34,s*.14,s*.14);g.fillRect(-s*.14,-s*.34,s*.14,s*.14);
  g.fillStyle='#e0553d';g.fillRect(-s*.46,-s*.48,s*.54,s*.07);
  g.strokeStyle='#6b3a14';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(-s*.55,-s*.1);g.lineTo(-s*.55,-s*.85);g.stroke();
  g.fillStyle=col;g.beginPath();g.moveTo(-s*.55,-s*.85);g.lineTo(-s*.15,-s*.72);g.lineTo(-s*.55,-s*.58);g.fill();
  /* 낚싯대 */
  g.strokeStyle='#5a3a1c';g.lineWidth=Math.max(2,s*.05);g.lineCap='round';g.beginPath();g.moveTo(s*.2,-s*.1);g.lineTo(s*.45,-s*.9);g.stroke();g.restore();}
function turbine(g,x,y,h,t){g.save();g.strokeStyle='#ffffff';g.fillStyle='#fff';g.lineWidth=Math.max(2,h*.06);g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x,y-h);g.stroke();g.translate(x,y-h);g.rotate(t*1.4+x);for(let k=0;k<3;k++){g.rotate(2.094);g.beginPath();g.moveTo(0,0);g.lineTo(0,-h*.5);g.stroke();}g.restore();}
function coral(g,x,y,s,col){g.save();g.translate(x,y);g.fillStyle=col;g.strokeStyle=col;g.lineCap='round';g.lineWidth=s*.12;
  for(const [dx,a,l] of [[-.25,-.5,.9],[0,0,1.1],[.25,.5,.85]]){g.save();g.translate(dx*s,0);g.rotate(a);g.beginPath();g.moveTo(0,0);g.lineTo(0,-l*s);g.stroke();g.beginPath();g.arc(0,-l*s,s*.1,0,TAU);g.fill();g.restore();}g.restore();}
function kelp(g,x,y,h,t,col){g.save();g.strokeStyle=col;g.lineWidth=Math.max(4,h*.09);g.lineCap='round';g.beginPath();g.moveTo(x,y);for(let i=1;i<=6;i++)g.lineTo(x+Math.sin(t*1.2+i*.9+x)*h*.09*i/3,y-h*i/6);g.stroke();g.restore();}
function tag(g,str,cx,cy,s,maxW,hi){g.save();g.font=K.font(s);const w=Math.min(maxW,g.measureText(str).width+s*1.4);const h=s*1.55;
  g.fillStyle=hi?'#fff3a8':'rgba(255,255,255,.96)';g.strokeStyle='#0d6f86';g.lineWidth=Math.max(1.5,s*.08);
  g.beginPath();g.moveTo(cx-w/2+h*.35,cy-h/2);g.lineTo(cx+w/2,cy-h/2);g.lineTo(cx+w/2,cy+h/2);g.lineTo(cx-w/2+h*.35,cy+h/2);g.lineTo(cx-w/2,cy);g.closePath();g.fill();g.stroke();
  g.fillStyle='#0d6f86';g.beginPath();g.arc(cx-w/2+h*.38,cy,s*.1,0,TAU);g.fill();g.restore();K.txt(g,str,cx+h*.18,cy+s*.03,{size:s,color:'#0b3a4a',maxW:w-h*.9});}
function hint(g,str,cx,cy,s,col){g.save();g.font=K.font(s);const w=g.measureText(str).width+s*1.5,h=s*1.7;K.rr(g,cx-w/2,cy-h/2,w,h,h/2);g.fillStyle='rgba(255,255,255,.94)';g.fill();g.lineWidth=2;g.strokeStyle=col||'#0d6f86';g.stroke();g.restore();K.txt(g,str,cx,cy+s*.03,{size:s,color:'#0b3a4a'});}

/* 바다 단면 전체 그림: 게임과 첫 화면이 같이 써요 */
function ocean(g,W,H,u,t,o){const surf=H*(o.surf||.26);
  /* 하늘 */
  const sg=g.createLinearGradient(0,0,0,surf);sg.addColorStop(0,'#ffd9b0');sg.addColorStop(.55,'#ffeacb');sg.addColorStop(1,'#dff6f2');g.fillStyle=sg;g.fillRect(0,0,W,surf+2);
  K.glow(g,W*.86,surf*.32,u*2.6,'#ffd27a',.55);g.fillStyle='#ffd45e';g.beginPath();g.arc(W*.86,surf*.32,u*.72,0,TAU);g.fill();
  for(let i=0;i<3;i++){const cx=((i*W*.38+t*u*.35+W*.1)%(W+u*5))-u*2.5,cy=surf*(.2+.18*(i%2));g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(cx,cy,u*1.1,u*.28,0,0,TAU);g.ellipse(cx-u*.5,cy+u*.04,u*.55,u*.22,0,0,TAU);g.ellipse(cx+u*.55,cy+u*.04,u*.6,u*.2,0,0,TAU);g.fill();}
  /* 먼 섬: 풍력 발전기와 공장 */
  g.fillStyle='#8fd3a8';g.beginPath();g.moveTo(0,surf);g.quadraticCurveTo(W*.16,surf-u*1,W*.34,surf-u*.3);g.quadraticCurveTo(W*.42,surf-u*.12,W*.48,surf);g.fill();
  g.fillStyle='#6fb98d';g.beginPath();g.moveTo(W*.03,surf);g.quadraticCurveTo(W*.1,surf-u*.55,W*.2,surf);g.fill();
  turbine(g,W*.2,surf-u*.5,u*1,t);turbine(g,W*.29,surf-u*.28,u*.75,t+1);
  g.fillStyle='#9aa7b4';g.fillRect(W*.07,surf-u*.62,u*.55,u*.42);g.fillRect(W*.1,surf-u*1.05,u*.14,u*.5);g.fillStyle='rgba(255,255,255,.7)';for(let k=0;k<3;k++){g.beginPath();g.arc(W*.1+u*.07+k*u*.1,surf-u*1.2-k*u*.3-((t*u*.2)%u*.3),u*(.1+k*.05),0,TAU);g.fill();}
  /* 바다 */
  const wg=g.createLinearGradient(0,surf,0,H);wg.addColorStop(0,'#4fd0e0');wg.addColorStop(.45,'#1e9bc4');wg.addColorStop(1,'#0b4f7a');g.fillStyle=wg;
  g.beginPath();g.moveTo(-8,H);g.lineTo(-8,surf);for(let x=-8;x<=W+8;x+=8)g.lineTo(x,surf+Math.sin(x*.03+t*2)*u*.06);g.lineTo(W+8,H);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=Math.max(2,u*.06);g.beginPath();for(let x=-8;x<=W+8;x+=8)g[x<0?'moveTo':'lineTo'](x,surf+Math.sin(x*.03+t*2)*u*.06);g.stroke();
  /* 빛줄기 */
  g.save();for(let k=0;k<4;k++){const x=W*(.15+k*.25)+Math.sin(t*.4+k)*u*.4;g.fillStyle='rgba(255,255,255,.06)';g.beginPath();g.moveTo(x-u*.3,surf);g.lineTo(x+u*.3,surf);g.lineTo(x+u*1.4,H*.82);g.lineTo(x-u*.3,H*.82);g.fill();}g.restore();
  /* 모래 바닥, 산호, 해초 */
  g.fillStyle='#e6cb8f';g.beginPath();g.moveTo(0,H);g.lineTo(0,H-u*.5);for(let x=0;x<=W+8;x+=8)g.lineTo(x,H-u*.5-Math.sin(x/W*9.4)*u*.14);g.lineTo(W,H);g.closePath();g.fill();
  kelp(g,W*.06,H-u*.45,u*2.2,t,'#2f9e6a');kelp(g,W*.09,H-u*.45,u*1.6,t+1,'#3fb67c');kelp(g,W*.94,H-u*.45,u*2,t+2,'#2f9e6a');
  coral(g,W*.16,H-u*.4,u*1.1,'#ff8aa0');coral(g,W*.82,H-u*.4,u*1.3,'#ffa95c');
  g.fillStyle='#fff';g.beginPath();g.ellipse(W*.55,H-u*.42,u*.28,u*.2,0,0,TAU);g.fill();g.strokeStyle='#e7b9c6';g.lineWidth=2;g.beginPath();g.arc(W*.55,H-u*.42,u*.15,Math.PI,0);g.stroke();
  /* 물방울 */
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1.5;for(let k=0;k<9;k++){const ph=(t*.15+k*.13)%1;g.beginPath();g.arc(W*((k*.137+.07)%1)+Math.sin(t+k)*u*.15,H-ph*(H-surf),u*(.05+(k%3)*.03),0,TAU);g.stroke();}
  /* 물고기 */
  for(const f of o.fish||[]){g.save();if(f.caught)g.translate(0,0);fishShape(g,f.x,f.y,u*1.12,f.kind,f.ci,f.vx>0?1:-1,t,f.caught);g.restore();if(f.t&&!o.noTags)tag(g,f.t,f.x,f.y-u*.72,u*.36,u*3.8,f.caught);}
  /* 배와 낚싯줄 */
  const bx=o.bx,h=o.hook;boatShape(g,bx,surf-u*.28,u*1.2,o.color||'#1e88e5',t);
  const hy=h&&h.st!=='wait'?h.y:surf+u*.3;const rx=bx+u*.54,ry=surf-u*1.28;
  g.strokeStyle='rgba(20,50,70,.75)';g.lineWidth=1.6;g.beginPath();g.moveTo(rx,ry);g.quadraticCurveTo(rx+u*.15,(surf+hy)/2,bx+u*.3,hy);g.stroke();
  g.strokeStyle='#c9d4dc';g.lineWidth=Math.max(2.5,u*.07);g.lineCap='round';g.beginPath();g.moveTo(bx+u*.3,hy);g.lineTo(bx+u*.3,hy+u*.2);g.arc(bx+u*.2,hy+u*.2,u*.1,0,Math.PI*.95);g.stroke();
  g.fillStyle='#ef476f';g.beginPath();g.arc(bx+u*.3,hy-u*.1,u*.07,0,TAU);g.fill();
  return surf;}

/* 첫 화면 그림: 배가 떠 있고 바늘을 내려 물고기를 낚아요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;const fish=[];
  for(let i=0;i<9;i++)fish.push({x:hash(i)*600,y0:.4+hash(i+9)*.5,vx:(hash(i+3)>.5?1:-1)*(30+hash(i+5)*40),kind:i%3,ci:i});
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const u=Math.min(W,H)/12;
    const fs=fish.map(f=>{const sp=f.vx*(W/500);let x=(f.x+T*sp)%(W+u*4);if(x<0)x+=W+u*4;x-=u*2;return{x,y:H*(.3+f.y0*.62),vx:f.vx,kind:f.kind,ci:f.ci};});
    const cyc=T%7,bx=W*(.3+.08*Math.sin(T*.3));let hook=null;const surf=H*.3;
    if(cyc>1&&cyc<5){const p=cyc<3?(cyc-1)/2:1-(cyc-3)/2;hook={st:'down',y:surf+u*.3+p*(H*.5-surf)};}
    ocean(g,W,H,u,T,{surf:.3,fish:fs,bx,hook,color:'#ef476f',noTags:true});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const EN_FORMS=['열','전기','빛','화학','운동','위치'];
const EN_CONV=[
  ['☀️','태양 전지','빛','전기'],['💡','전등','전기','빛'],['👕','전기다리미','전기','열'],['🌀','선풍기','전기','운동'],['🌱','식물의 광합성','빛','화학'],
  ['🏞️','떨어지는 폭포의 물','위치','운동'],['🔋','건전지로 움직이는 장난감 (건전지)','화학','전기'],['🔥','장작불','화학','열'],['🌬️','풍력 발전기','운동','전기'],
  ['🏃','음식을 먹고 달리는 사람','화학','운동'],['♨️','전기난로','전기','열'],['🚗','휘발유로 달리는 자동차','화학','운동'],['🛝','미끄럼틀 위에서 내려오는 아이','위치','운동'],
];
const EN_FORM_Q=[['달리는 자동차가 가진 에너지는?','운동'],['높은 곳에 있는 물이 가진 에너지는?','위치'],['음식이나 석유에 저장된 에너지는?','화학'],
  ['전기 기구를 작동하게 하는 에너지는?','전기'],['물체의 온도를 높이는 에너지는?','열'],['주위를 밝게 비추는 에너지는?','빛']];
const EN_RES=[
  {q:'써도 다시 생기는 <b>지속 가능한 에너지</b>를 낚아요',y:['태양광','풍력','수력','지열'],n:['석탄','석유','천연가스']},
  {q:'<b>화석 연료</b>를 낚아요 (언젠가 고갈돼요)',y:['석탄','석유','천연가스'],n:['태양광','풍력','수력']},
  {q:'에너지를 <b>효율적으로</b> 쓰는 것을 낚아요',y:['LED 전등','1등급 냉장고','이중창','대중교통'],n:['백열전구','5등급 냉장고','문 열고 냉방','혼자 탄 자동차']},
];
const GAME={
  id:'sci5-energy',title:'에너지 낚시',title1:'바다 속 탐험',title2:'에너지 낚시',emoji:LOGO,
  subtitle:'5학년 · 자원과 에너지',
  howto:'바다 위 <b>물을 톡</b> 누르면 배가 그 위로 가서 <b>낚싯바늘</b>을 내려요. 헤엄치는 물고기 중 <b>정답 물고기</b>만 낚아 올려요!',
  how:'물고기 위쪽을 <b>톡</b> 눌러<br>낚싯바늘을 내려요',
  txt:{who:'누구와 함께 낚시할까요?',dur:'낚시 시간',seat:'번 낚시꾼 ',go:'낚시 시작!'},
  theme:{c1:'#0e8aa8',c2:'#ff8a3d'},hero:heroScene,vignette:.05,durs:[60,90,120],
  levelTitle:'낚을 내용 고르기',
  levels:[
    {id:'conv',g:'5학년 · 자원과 에너지',t:'🔄 에너지 전환',d:'빛 → 전기, 전기 → 열 …'},
    {id:'form',g:'5학년 · 자원과 에너지',t:'⚡ 에너지의 형태',d:'열·전기·빛·화학·운동·위치'},
    {id:'res',g:'5학년 · 자원과 에너지',t:'🌍 자원과 효율적 이용',d:'화석 연료·지속 가능한 에너지'},
    {id:'all',g:'5학년 · 자원과 에너지',t:'🌟 모두 섞기',d:'골고루 나와요'},
  ],
  summary:`<ul><li>에너지 형태: <b>열, 전기, 빛, 화학, 운동, 위치</b> 에너지</li>
    <li>에너지는 형태가 바뀌어요(<b>에너지 전환</b>): 태양 전지 빛 → 전기, 전등 전기 → 빛, 다리미 전기 → 열, 선풍기 전기 → 운동, 광합성 빛 → 화학, 폭포 위치 → 운동</li>
    <li>석탄·석유·천연가스 같은 <b>화석 연료</b>는 언젠가 고갈되고 환경을 오염시켜요. 태양광·풍력·수력처럼 <b>지속 가능한 에너지</b>를 늘려요.</li>
    <li>LED 전등, 에너지 소비 효율 1등급 제품, 이중창, 대중교통으로 에너지를 효율적으로 써요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{bx:p.W/2,tx:p.W/2,hook:null,fish:[],kN:0,T:0});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;const k=L==='all'?['conv','form','res'][st.kN++%3]:L;st.k=k;let yes=[],no=[],ask,sub,why;
    if(k==='conv'){const c=p.deck(EN_CONV,'ec');const toQ=R.chance(.6);const ans=toQ?c[3]:c[2];yes=[ans];no=R.sample(EN_FORMS.filter(f=>f!==ans),3);
      ask=toQ?`${c[0]} <b>${c[1]}</b>: ${c[2]} 에너지 → <b>?</b> 에너지`:`${c[0]} <b>${c[1]}</b>: <b>?</b> 에너지 → ${c[3]} 에너지`;sub='?에 알맞은 물고기를 낚아요';why=`${c[1]}: ${c[2]} 에너지 → ${c[3]} 에너지`;}
    else if(k==='form'){const f=p.deck(EN_FORM_Q,'ef');yes=[f[1]];no=R.sample(EN_FORMS.filter(x=>x!==f[1]),3);ask='⚡ '+f[0];sub='알맞은 에너지 물고기를 낚아요';why=`${f[0]} → ${f[1]} 에너지`;}
    else{const r=p.deck(EN_RES,'er');yes=R.sample(r.y,2);no=R.sample(r.n,3);ask='🌍 '+r.q;sub='정답 물고기가 두 마리 있어요';why=`${plain(r.q).replace(' 낚아요','').replace('를','')}: ${r.y.join(', ')}`;}
    st.ans=yes;st.why=why;st.need=yes.length;st.got=0;p.ask(ask,sub);
    const list=R.shuffle([...yes.map(t=>({t,ok:true})),...no.map(t=>({t,ok:false}))]);const top=p.H*.36,bot=p.H*.9;
    st.fish=list.map((f,i)=>Object.assign(f,{y:top+(bot-top)*(i+.5)/list.length,x:R.num(p.W*.1,p.W*.9),vx:(R.chance(.5)?1:-1)*p.u*R.num(.9,1.6),kind:R.int(0,2),ci:R.int(0,5)}));},
  update(p,dt){const st=p.state,u=p.u,W=p.W;st.bx+=(st.tx-st.bx)*Math.min(1,dt*6);
    for(const f of st.fish){if(f.caught)continue;f.x+=f.vx*dt*(1+p.t/p.dur*.5);if(f.x<u*1.2){f.x=u*1.2;f.vx=Math.abs(f.vx);}if(f.x>W-u*1.2){f.x=W-u*1.2;f.vx=-Math.abs(f.vx);}}
    const h=st.hook;if(!h)return;const surf=p.H*.26;
    if(h.st==='wait'){if(Math.abs(st.bx-st.tx)<u*.3)h.st='down';return;}
    if(h.st==='down'){h.y+=u*7*dt;h.x=st.bx;const f=st.fish.find(f=>!f.caught&&Math.abs(f.x-(h.x+u*.3))<u*1.3&&Math.abs(f.y-h.y)<u*.5);
      if(f){f.caught=true;h.f=f;h.st='up';p.Snd.tone(700,.06);}else if(h.y>p.H-u*.3){h.st='up';}}
    else if(h.st==='up'){h.y-=u*8*dt;if(h.f){h.f.x=h.x+u*.3;h.f.y=h.y+u*.5;}
      if(h.y<=surf){const f=h.f;st.hook=null;if(!f)return;
        if(f.ok){st.got++;p.hit(true,{x:h.x,y:surf-u,tip:st.why,tipMs:1800});st.fish=st.fish.filter(x=>x!==f);if(st.got>=st.need)setTimeout(()=>{if(p.active)this.round(p);},500);}
        else{p.hit(false,{x:h.x,y:surf-u,tip:`‘${f.t}’ 물고기가 아니에요! ${st.why}`,review:st.why});st.fish=st.fish.filter(x=>x!==f);}}}},
  draw(p,g,dt){const W=p.W,H=p.H,u=Math.min(p.u,W/9),st=p.state;st.T+=dt;
    ocean(g,W,H,u,st.T,{surf:.26,fish:st.fish,bx:st.bx,hook:st.hook,color:p.color});
    if(!st.hook)hint(g,'👆 물고기 위를 톡!',W/2,H*.26+u*.9,u*.34);},
  down(p,x,y){const st=p.state;if(st.hook)return;st.tx=K.clamp(x-p.u*.1,p.u*.8,p.W-p.u*.8);st.hook={st:'wait',x:st.tx,y:p.H*.26+p.u*.3};p.Snd.whoosh();},
};
Engine.boot(GAME);
