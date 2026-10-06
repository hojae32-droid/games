/* 3학년 · 생물의 한살이 — 한살이 탑 쌓기 (흔들리는 카드가 알맞은 단계일 때 톡 떨어뜨려 차례대로 쌓기)
   디자인: 색연필 그림책. 알·애벌레·번데기·올챙이·싹·꽃 같은 단계 그림과 건축가 곰은 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const INK='#4b3a7a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="8" y="30" width="32" height="10" rx="3" fill="#ffd36b" stroke="#4b3a7a" stroke-width="3"/><rect x="12" y="19" width="24" height="10" rx="3" fill="#cfc4ff" stroke="#4b3a7a" stroke-width="3"/><rect x="16" y="8" width="16" height="10" rx="3" fill="#ff8fa3" stroke="#4b3a7a" stroke-width="3"/></svg>';
const LIFE={
  animal:[
    {n:'배추흰나비',e:'🦋',s:[['알','🥚'],['애벌레','🐛'],['번데기',''],['어른벌레','🦋']],x:['올챙이','병아리','새끼'],
      bq:'배추흰나비처럼 <b>번데기</b> 단계가 있는 한살이는?',ba:'완전 탈바꿈',bw:'불완전 탈바꿈'},
    {n:'장수풍뎅이',e:'🪲',s:[['알','🥚'],['애벌레','🐛'],['번데기',''],['어른벌레','🪲']],x:['올챙이','병아리','새끼'],
      bq:'장수풍뎅이의 한살이는?',ba:'완전 탈바꿈',bw:'불완전 탈바꿈'},
    {n:'메뚜기',e:'🦗',s:[['알','🥚'],['애벌레',''],['어른벌레','🦗']],x:['번데기','올챙이','병아리'],
      bq:'메뚜기처럼 <b>번데기 단계가 없는</b> 한살이는?',ba:'불완전 탈바꿈',bw:'완전 탈바꿈'},
    {n:'잠자리',e:'',s:[['알','🥚'],['애벌레 (물속)',''],['어른벌레','']],x:['번데기','올챙이','병아리'],
      bq:'잠자리의 한살이는?',ba:'불완전 탈바꿈',bw:'완전 탈바꿈'},
    {n:'개구리',e:'🐸',s:[['알','🥚'],['올챙이',''],['뒷다리가 나온 올챙이',''],['앞다리가 나온 올챙이',''],['개구리','🐸']],x:['번데기','애벌레','병아리'],
      bq:'올챙이에게 어느 다리가 <b>먼저</b> 나올까요?',ba:'뒷다리',bw:'앞다리'},
    {n:'닭',e:'🐔',s:[['알','🥚'],['병아리','🐤'],['큰 닭','🐔']],x:['번데기','올챙이','애벌레'],
      bq:'닭은 어떻게 태어날까요?',ba:'알에서 태어나요',bw:'새끼로 태어나요'},
    {n:'개',e:'🐕',s:[['새끼','🐶'],['다 자란 개','🐕']],x:['알','번데기','올챙이'],
      bq:'개는 어떻게 태어날까요?',ba:'새끼로 태어나요',bw:'알에서 태어나요'},
  ],
  plant:[
    {n:'강낭콩',e:'🫘',s:[['씨','🫘'],['싹이 터요','🌱'],['잎과 줄기가 자라요','🌿'],['꽃이 피어요','🌸'],['꼬투리(열매)가 생겨요','🫛']],x:['번데기','올챙이','잎이 떨어져요'],
      bq:'강낭콩처럼 한 해 동안 한살이를 마치고 죽는 식물은?',ba:'한해살이 식물',bw:'여러해살이 식물'},
    {n:'벼',e:'🌾',s:[['볍씨','🌾'],['싹이 터요','🌱'],['잎과 줄기가 자라요','🌿'],['꽃이 피어요','💮'],['이삭(열매)이 익어요','🌾']],x:['번데기','애벌레','뿌리만 자라요'],
      bq:'벼는 어떤 식물일까요?',ba:'한해살이 식물',bw:'여러해살이 식물'},
    {n:'사과나무',e:'🍎',s:[['씨','🟤'],['싹이 터요','🌱'],['줄기가 굵어지며 자라요','🌳'],['꽃이 피어요','🌸'],['열매가 열려요','🍎']],x:['번데기','올챙이','병아리'],
      bq:'사과나무처럼 여러 해 동안 살면서 꽃과 열매를 맺는 식물은?',ba:'여러해살이 식물',bw:'한해살이 식물'},
    {n:'씨가 싹트는 조건',e:'💧',quiz:true,bq:'씨가 싹트려면 무엇이 필요할까요?',ba:'물과 알맞은 온도',bw:'흙과 비료'},
    {n:'식물이 자라는 조건',e:'☀️',quiz:true,bq:'식물이 잘 자라려면 무엇이 필요할까요?',ba:'물·빛·알맞은 온도',bw:'어둠과 차가운 곳'},
  ],
};
/* 단계 그림: label로 알맞은 그림을 골라 그려요. 없으면 fallback 이모지 */
function stageIcon(g,label,emo,x,y,s,t){const L=String(label);g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(1.6,s*.06);g.strokeStyle=INK;
  const eye=(ex,ey,r)=>{g.fillStyle=INK;g.beginPath();g.arc(ex,ey,r,0,TAU);g.fill();};
  if(/^알$/.test(L)){g.fillStyle='#fff8ea';g.beginPath();g.ellipse(0,s*.04,s*.3,s*.4,0,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,170,120,.5)';for(const [dx,dy] of [[-.1,-.1],[.1,.1],[-.05,.2]]){g.beginPath();g.arc(dx*s,dy*s,s*.05,0,TAU);g.fill();}g.fillStyle='rgba(255,255,255,.8)';g.beginPath();g.ellipse(-s*.1,-s*.18,s*.06,s*.1,-.4,0,TAU);g.fill();}
  else if(/^애벌레/.test(L)){for(let i=3;i>=0;i--){g.fillStyle=i%2?'#8fdc6a':'#6cc24a';g.beginPath();g.arc(-s*.3+i*s*.2,Math.sin(t*4+i)*s*.03+s*.05,s*.16,0,TAU);g.fill();g.stroke();}eye(s*.33,-s*.0,s*.025);eye(s*.4,0,s*.025);g.beginPath();g.moveTo(s*.38,s*.06);g.quadraticCurveTo(s*.4,s*.1,s*.43,s*.06);g.stroke();g.beginPath();g.moveTo(s*.38,-s*.14);g.lineTo(s*.42,-s*.26);g.stroke();}
  else if(/^번데기/.test(L)){g.strokeStyle='#8a6a3a';g.beginPath();g.moveTo(0,-s*.42);g.lineTo(0,-s*.3);g.stroke();g.strokeStyle=INK;g.fillStyle='#c8e29a';g.beginPath();g.ellipse(0,s*.05,s*.2,s*.34,0,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(75,58,122,.4)';for(let i=-1;i<=2;i++){g.beginPath();g.moveTo(-s*.18,s*.05+i*s*.1);g.quadraticCurveTo(0,s*.1+i*s*.1,s*.18,s*.05+i*s*.1);g.stroke();}}
  else if(/올챙이/.test(L)){g.fillStyle='#4a5a4a';g.beginPath();g.ellipse(-s*.1,0,s*.22,s*.17,0,0,TAU);g.fill();g.stroke();g.beginPath();g.moveTo(s*.1,0);g.quadraticCurveTo(s*.3,-s*.12,s*.42,s*.04);g.quadraticCurveTo(s*.3,s*.14,s*.1,s*.04);g.fill();g.stroke();eye(-s*.2,-s*.04,s*.03);
    g.strokeStyle='#4a5a4a';g.lineWidth=Math.max(2,s*.07);if(/뒷다리/.test(L)||/앞다리/.test(L)){g.beginPath();g.moveTo(s*.06,s*.08);g.lineTo(s*.14,s*.24);g.moveTo(s*.1,s*.06);g.lineTo(s*.2,s*.2);g.stroke();}if(/앞다리/.test(L)){g.beginPath();g.moveTo(-s*.2,s*.1);g.lineTo(-s*.28,s*.24);g.stroke();}}
  else if(/^씨$|볍씨/.test(L)){g.fillStyle=/볍씨/.test(L)?'#e8d68a':'#a0522d';g.beginPath();g.ellipse(0,0,s*.2,s*.3,.5,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.ellipse(-s*.06,-s*.08,s*.04,s*.1,.5,0,TAU);g.fill();}
  else if(/싹/.test(L)){g.strokeStyle='#4aa35a';g.lineWidth=Math.max(2.5,s*.08);g.beginPath();g.moveTo(0,s*.34);g.lineTo(0,-s*.05);g.stroke();g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.06);g.fillStyle='#7ed87e';for(const d of[-1,1]){g.beginPath();g.moveTo(0,-s*.05);g.quadraticCurveTo(d*s*.32,-s*.34,d*s*.38,-s*.06);g.quadraticCurveTo(d*s*.2,s*.08,0,-s*.05);g.fill();g.stroke();}g.fillStyle='#8a5a2b';g.fillRect(-s*.3,s*.32,s*.6,s*.1);}
  else if(/잎|줄기/.test(L)){g.strokeStyle='#3f9a4f';g.lineWidth=Math.max(3,s*.09);g.beginPath();g.moveTo(0,s*.38);g.lineTo(0,-s*.3);g.stroke();g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.06);g.fillStyle='#6fd36f';for(const [dy,d] of [[.15,-1],[.0,1],[-.15,-1]]){g.beginPath();g.moveTo(0,dy*s);g.quadraticCurveTo(d*s*.3,(dy-.2)*s,d*s*.4,(dy-.02)*s);g.quadraticCurveTo(d*s*.2,(dy+.1)*s,0,dy*s);g.fill();g.stroke();}}
  else if(/꽃/.test(L)){g.strokeStyle='#3f9a4f';g.lineWidth=Math.max(3,s*.08);g.beginPath();g.moveTo(0,s*.4);g.lineTo(0,s*.05);g.stroke();g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.06);g.fillStyle='#ff8fb8';for(let i=0;i<6;i++){g.save();g.translate(0,-s*.12);g.rotate(i*TAU/6);g.beginPath();g.ellipse(0,-s*.17,s*.1,s*.14,0,0,TAU);g.fill();g.stroke();g.restore();}g.fillStyle='#ffd36b';g.beginPath();g.arc(0,-s*.12,s*.09,0,TAU);g.fill();g.stroke();}
  else if(/열매|꼬투리|이삭/.test(L)){if(/이삭/.test(L)){g.strokeStyle='#c9a227';g.lineWidth=Math.max(2,s*.06);g.beginPath();g.moveTo(-s*.2,s*.35);g.quadraticCurveTo(0,-s*.1,s*.28,-s*.3);g.stroke();g.fillStyle='#f3d96a';for(let i=0;i<6;i++){const f=i/5;g.beginPath();g.ellipse(-s*.2+f*s*.46+(i%2?s*.07:-s*.05),s*.3-f*s*.6,s*.07,s*.13,.6,0,TAU);g.fill();g.stroke();}}
    else if(/꼬투리/.test(L)){g.fillStyle='#8fd15a';g.beginPath();g.moveTo(-s*.32,s*.2);g.quadraticCurveTo(0,-s*.35,s*.34,-s*.12);g.quadraticCurveTo(0,s*.25,-s*.32,s*.2);g.fill();g.stroke();g.fillStyle='rgba(60,120,40,.45)';for(let i=0;i<3;i++){g.beginPath();g.arc(-s*.15+i*s*.17,s*.0-i*s*.02,s*.06,0,TAU);g.fill();}}
    else{g.fillStyle='#ff6b6b';g.beginPath();g.arc(0,s*.05,s*.28,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(-s*.1,-s*.05,s*.07,s*.1,-.5,0,TAU);g.fill();g.strokeStyle='#8a5a2b';g.beginPath();g.moveTo(0,-s*.2);g.lineTo(s*.04,-s*.38);g.stroke();g.fillStyle='#6fd36f';g.strokeStyle=INK;g.beginPath();g.ellipse(s*.12,-s*.3,s*.1,s*.05,-.4,0,TAU);g.fill();g.stroke();}}
  else if(/어른벌레/.test(L)&&!emo){/* 잠자리 */g.fillStyle='#3b8f9c';K.rr(g,-s*.3,-s*.04,s*.6,s*.08,s*.04);g.fill();g.stroke();g.fillStyle='rgba(180,230,255,.7)';for(const [dx,dy] of [[.0,-.2],[.0,.2]])for(const d of[-1,1]){g.beginPath();g.ellipse(d*s*.04-s*.04,dy*s,s*.2,s*.07,d*.2,0,TAU);g.fill();g.stroke();}g.fillStyle='#e8542a';g.beginPath();g.arc(s*.3,0,s*.07,0,TAU);g.fill();g.stroke();}
  else if(/^애벌레 \(물속\)/.test(L)){g.fillStyle='#8a7a5a';g.beginPath();g.ellipse(0,0,s*.3,s*.12,0,0,TAU);g.fill();g.stroke();for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(i*s*.12,s*.08);g.lineTo(i*s*.12-s*.04,s*.22);g.stroke();}}
  else if(emo){K.emo(g,emo,0,0,s*.9);}
  else{g.fillStyle='#ffd36b';g.beginPath();for(let i=0;i<10;i++){const r=i%2?s*.14:s*.3,a=-Math.PI/2+i*Math.PI/5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.stroke();}
  g.restore();}
/* 건축가 곰 */
function builder(g,x,y,s,t,mood){g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;const bob=mood==='cheer'?-Math.abs(Math.sin(t*10))*s*.12:0;g.translate(0,bob);K.shadow(g,0,-bob,s*.3,s*.06,.22);
  g.fillStyle='#b9824f';K.rr(g,-s*.22,-s*.56,s*.44,s*.5,s*.14);g.fill();g.stroke();g.fillStyle='#ffd36b';K.rr(g,-s*.2,-s*.38,s*.4,s*.1,s*.04);g.fill();g.stroke();
  for(const d of[-1,1]){g.save();g.translate(d*s*.22,-s*.46);g.rotate(mood==='cheer'?d*(-2.4+Math.sin(t*12)*.3):d*.5);g.fillStyle='#b9824f';K.rr(g,-s*.05,0,s*.1,s*.26,s*.05);g.fill();g.stroke();g.restore();}
  g.translate(0,-s*.76);for(const d of[-1,1]){g.fillStyle='#b9824f';g.beginPath();g.arc(d*s*.2,-s*.12,s*.08,0,TAU);g.fill();g.stroke();}
  g.fillStyle='#b9824f';g.beginPath();g.arc(0,0,s*.26,0,TAU);g.fill();g.stroke();g.fillStyle='#e8c9a0';g.beginPath();g.ellipse(0,s*.08,s*.12,s*.09,0,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.ellipse(0,s*.04,s*.04,s*.03,0,0,TAU);g.fill();
  g.fillStyle='#ffcc33';g.beginPath();g.arc(0,-s*.1,s*.24,Math.PI*1.05,Math.PI*1.95);g.closePath();g.fill();g.stroke();g.fillRect(-s*.26,-s*.1,s*.52,s*.05);
  g.strokeStyle=INK;g.fillStyle=INK;g.lineWidth=Math.max(1.6,s*.04);
  if(mood==='cheer'){for(const d of[-1,1]){g.beginPath();g.arc(d*s*.11,-s*.02,s*.04,Math.PI*1.1,Math.PI*1.9);g.stroke();}}
  else if(mood==='oops'){for(const d of[-1,1]){g.beginPath();g.moveTo(d*s*.11-s*.035,-s*.05);g.lineTo(d*s*.11+s*.035,s*.01);g.moveTo(d*s*.11+s*.035,-s*.05);g.lineTo(d*s*.11-s*.035,s*.01);g.stroke();}}
  else{for(const d of[-1,1]){g.beginPath();g.arc(d*s*.11,-s*.02,s*.03,0,TAU);g.fill();}}
  g.restore();}
/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const stages=[['알',''],['애벌레',''],['번데기',''],['어른벌레','🦋']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/6:Math.min(W,H)/7;K.sky(g,W,H,'#b9b2f5','#ffe9cf');K.clouds(g,W,H,T,.2,3,u*1.4);K.hills(g,W,H,H*.7,'#c8e6b8','#a6d99a');K.ground(g,H*.86,W,H,'#8fd27c','#c3eeaa');
    const n=Math.min(4,1+Math.floor((T/1.4)%5));const bw=Math.min(W*.5,u*3.4),bh=u*.9,cx=wide?W*.78:W/2;
    for(let i=0;i<n;i++){const y=H*.86-i*bh-bh/2;K.card(g,cx-bw/2,y-bh/2,bw,bh*.94,bh*.28,'#ffffff',{blur:bh*.2,dy:bh*.06,stroke:'#a78bfa',lw:2,hi:false});stageIcon(g,stages[i][0],stages[i][1],cx-bw/2+bh*.55,y,bh*.8,T);K.txt(g,stages[i][0],cx+bh*.25,y,{size:bh*.42,color:INK,maxW:bw-bh*1.4});}
    builder(g,cx-bw/2-u*1.1,H*.86,u*1.6,T,n>=4?'cheer':'neutral');};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'sci3-lifecycle',title:'한살이 탑 쌓기',title1:'알에서 어른까지',title2:'한살이 탑 쌓기',emoji:LOGO,
  subtitle:'3학년 · 생물의 한살이',
  howto:'흔들리는 카드의 이름이 <b>다음 단계</b>로 바뀌었을 때, 탑 위에 맞춰 <b>톡</b> 떨어뜨려요! 한살이를 끝까지 쌓으면 보너스 문제가 나와요.',
  how:'카드 이름이 <b>다음 단계</b>일 때<br>탑 위에 맞춰 <b>톡!</b>',
  theme:{c1:'#e8541a',c2:'#2563eb'},hero:heroScene,vignette:.05,durs:[60,90,120],levelTitle:'무엇의 한살이를 쌓을까요?',
  txt:{who:'누구와 쌓을까요?',dur:'공사 시간',pace:'크레인 속도',seat:'번 건축가 ',go:'탑 쌓기 시작!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  levels:[
    {id:'animal',g:'3학년 · 생물의 한살이',t:'🐛 동물의 한살이',d:'완전·불완전 탈바꿈'},
    {id:'plant',g:'3학년 · 생물의 한살이',t:'🌱 식물의 한살이',d:'한해살이·여러해살이'},
    {id:'all',g:'3학년 · 생물의 한살이',t:'🌟 모두 섞기',d:'동물과 식물'},
  ],
  summary:`<ul><li><b>완전 탈바꿈</b>: 알 → 애벌레 → 번데기 → 어른벌레 (배추흰나비, 장수풍뎅이)</li><li><b>불완전 탈바꿈</b>: 알 → 애벌레 → 어른벌레, 번데기가 없어요 (메뚜기, 잠자리)</li>
    <li>개구리: 알 → 올챙이 → 뒷다리 → 앞다리 → 개구리 · 닭: 알 → 병아리 → 큰 닭 · 개는 새끼로 태어나요</li>
    <li>식물: 씨 → 싹 → 잎과 줄기 → 꽃 → 열매(씨) · 한해살이(강낭콩, 벼) / 여러해살이(사과나무, 감나무)</li><li>씨가 싹틀 때는 물과 알맞은 온도, 식물이 자랄 때는 물·빛·알맞은 온도가 필요해요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{tower:[],falling:null,swing:0,lblT:0,lblI:0,T:0,mood:'neutral',moodT:0});this.newLife(p);},
  newLife(p){const st=p.state,L=p.levelId;const pool=L==='all'?[...LIFE.animal,...LIFE.plant]:LIFE[L];
    const o=p.deck(pool,'life');st.org=o;st.tower=[];st.step=0;st.bonus=null;
    if(o.quiz){this.bonusQ(p);return;}this.prepCard(p);},
  prepCard(p){const st=p.state,o=st.org,R=p.Rf;const right=o.s[st.step][0];
    const wrongs=[];o.s.forEach((s,i)=>{if(i!==st.step&&i>st.step-1)wrongs.push(s[0]);});o.x.forEach(x=>wrongs.push(x));
    const ws=R.sample([...new Set(wrongs.filter(w=>w!==right))],2);st.cands=R.shuffle([right,...ws]);st.lblI=0;st.lblT=0;
    st.card={dx:0};
    p.ask(`${o.e} <b>${o.n}</b>의 한살이 ${st.step===0?'첫 단계':st.step+1+'번째 단계'}는?`,st.step?`지금 맨 위: ${o.s[st.step-1][0]}`:'처음은 무엇일까요?');},
  bonusQ(p){const st=p.state,o=st.org;st.bonus=true;const opts=p.R.shuffle([o.ba,o.bw]);
    p.ask((o.quiz?'':'🎉 탑 완성! ')+o.bq,'알맞은 답을 눌러요');
    p.tools(opts.map(t=>({t})),(k,t)=>{if(!st.bonus)return;st.bonus=false;const ok=t.t===o.ba;st.mood=ok?'cheer':'oops';st.moodT=1.4;
      p.hit(ok,{x:p.W/2,y:p.H*.3,tip:ok?`정답: ${o.ba}`:`정답: <b>${o.ba}</b>`,review:plain(o.bq)+' → '+o.ba});p.ctrl.innerHTML='';
      setTimeout(()=>{if(p.active){st.collapse=1;setTimeout(()=>{if(p.active){st.collapse=0;this.newLife(p);}},500);}},800);},{toggle:false});},
  geo(p){const u=p.u,W=p.W,H=p.H;const Z0=Math.max(p.top||0,u*2.6);const bh=Math.min(u*1.05,H*.1);const base=H-(p.bot||0)-bh*.6-u*.3;return{bw:Math.min(W*.62,u*5.6),bh,base,hookY:Z0+u*1.1,Z0};},
  card(p,g,x,y,label,emo,ok,rot){const G=this.geo(p),t=p.state.T;g.save();g.translate(x,y);g.rotate(rot||0);
    const fill=ok===true?'#dcfce7':ok===false?'#fee2e2':'#fffdf6',acc=ok===true?'#4ade80':ok===false?'#f87171':'#8b6bea';const r=G.bh*.3;
    K.card(g,-G.bw/2,-G.bh/2,G.bw,G.bh*.96,r,fill,{blur:G.bh*.3,dy:G.bh*.1,stroke:INK,lw:2,hi:false});
    g.save();K.rr(g,-G.bw/2,-G.bh/2,G.bw,G.bh*.96,r);g.clip();g.fillStyle=acc;g.fillRect(-G.bw/2,-G.bh/2,G.bh*.12,G.bh);g.restore();
    const ex=-G.bw/2+G.bh*.62;g.fillStyle=K.rgba(acc,.18);g.beginPath();g.arc(ex,0,G.bh*.38,0,TAU);g.fill();stageIcon(g,label,emo,ex,0,G.bh*.8,t);
    K.txt(g,label,G.bh*.3,G.bh*.01,{size:G.bh*.42,maxW:G.bw-G.bh*1.6,color:INK});g.restore();},
  update(p,dt){const st=p.state,G=this.geo(p);st.T+=dt;if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.bonus||!st.card)return;
    st.swing+=dt*(1.6+p.t/p.dur*1.1)*p.pace;st.lblT+=dt;const per=Math.max(.75,1.25-p.t/p.dur*.4)/p.pace;if(st.lblT>per&&!st.falling){st.lblT=0;st.lblI=(st.lblI+1)%st.cands.length;p.Snd.tone(1000,.03,'sine',.02);}
    const f=st.falling;if(f){f.vy+=p.H*2.5*dt;f.y+=f.vy*dt;if(f.out){f.x+=f.vx*dt;f.rot+=f.vr*dt;if(f.y>p.H+G.bh*2)st.falling=null;return;}
      const topY=G.base-st.tower.length*G.bh-G.bh/2;
      if(f.y>=topY){const right=st.org.s[st.step][0];const under=st.tower.length?st.tower[st.tower.length-1].x:p.W/2;const dx=f.x-under;
        if(f.label!==right){f.out=true;f.vx=(dx>=0?1:-1)*p.u*3;f.vr=(dx>=0?1:-1)*3;f.vy=-p.H*.5;st.mood='oops';st.moodT=1.2;
          p.hit(false,{x:f.x,y:topY-G.bh,tip:`${st.org.n}: ${st.step?st.org.s[st.step-1][0]+' 다음은':'처음은'} <b>${right}</b>`,review:`${st.org.n}의 한살이: ${st.org.s.map(s=>s[0]).join(' → ')}`});return;}
        if(Math.abs(dx)>G.bw*.7){f.out=true;f.vx=(dx>=0?1:-1)*p.u*3;f.vr=(dx>=0?1:-1)*3;f.vy=-p.H*.3;st.mood='oops';st.moodT=1;p.add(-10,f.x,topY-G.bh);p.Snd.drum();p.tip('탑 위에 잘 맞춰서 떨어뜨려요!','bad',1500);return;}
        st.tower.push({x:f.x,label:f.label,emo:st.org.s[st.step][1]});st.falling=null;p.Snd.drum();
        const perfect=Math.abs(dx)<G.bw*.12;st.mood='cheer';st.moodT=1;p.hit(true,{x:f.x,y:topY-G.bh});if(perfect&&st.tower.length>1)p.add(30,f.x+G.bw*.4,topY-G.bh*1.5);
        st.step++;if(st.step>=st.org.s.length){st.card=null;p.burst(p.W/2,G.base-st.tower.length*G.bh,'#ffd36b',24);setTimeout(()=>{if(p.active)this.bonusQ(p);},500);}else this.prepCard(p);}}},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,G=this.geo(p),t=st.T;
    K.sky(g,W,H,'#b9b2f5','#ffe9cf');K.glow(g,W*.18,H*.2,u*3,'#fff1c2',.6);K.clouds(g,W,H,t,.22,3,u*1.4);
    K.hills(g,W,H,G.base-u*1.6,'#c8e6b8','#a6d99a');
    [[.1,1],[.9,.85]].forEach(([fx,s])=>{const x=W*fx;K.shadow(g,x,G.base,u*.5*s,u*.1,.15);g.fillStyle='#8a5a2b';g.fillRect(x-u*.07*s,G.base-u*.9*s,u*.14*s,u*.9*s);g.fillStyle='#43b45a';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.arc(x,G.base-u*1.1*s,u*.5*s,0,TAU);g.fill();g.stroke();});
    K.ground(g,G.base,W,H,'#8fd27c','#c3eeaa');
    K.shadow(g,W/2,G.base+u*.12,G.bw*.68,u*.12,.25);K.card(g,W/2-G.bw*.62,G.base-u*.12,G.bw*1.24,u*.3,u*.12,'#a8a29e',{blur:u*.2,dy:u*.06,stroke:INK,lw:2});
    st.tower.forEach((b,i)=>this.card(p,g,b.x+(st.collapse?(Math.random()-.5)*u:0),G.base-i*G.bh-G.bh/2,b.label,b.emo,undefined,st.collapse?(Math.random()-.5)*.3:0));
    builder(g,Math.max(u*1.1,W/2-G.bw*.95),G.base+u*.2,u*1.7,t,st.mood);
    if(st.org&&!st.org.quiz){const s=u*.32,ly=Math.min(H-s*1.05,G.base+u*.62);
      const pl=(str,x,al)=>{g.save();g.font=K.font(s);const w=K.mw(g,str,s)+s*1.2;const x0=al==='left'?x:x-w;K.card(g,x0,ly-s*.8,w,s*1.6,s*.8,'rgba(255,253,246,.95)',{blur:s*.5,dy:s*.12,hi:false,stroke:INK,lw:1.5});K.txt(g,str,x0+w/2,ly+s*.03,{size:s,color:INK});g.restore();};
      pl(`${st.org.e} ${st.org.n}`,u*.25,'left');pl(`${st.tower.length}/${st.org.s.length}`,W-u*.25,'right');}
    /* 크레인 */
    g.save();K.vgrad(g,0,G.Z0-u*.5,W,u*.22,['#fcd34d','#f59e0b']);g.restore();
    if(st.card&&!st.bonus){const sx=W/2+Math.sin(st.swing)*(W/2-G.bw*.55);st.card.x=sx;
      g.save();g.lineCap='round';g.strokeStyle='#64748b';g.lineWidth=3.5;g.beginPath();g.moveTo(W/2,G.Z0-u*.4);g.lineTo(sx,G.hookY-G.bh/2-u*.12);g.stroke();g.restore();
      K.orb(g,W/2,G.Z0-u*.35,u*.2,'#94a3b8');K.orb(g,sx,G.hookY-G.bh/2-u*.1,u*.13,'#f59e0b');
      if(!st.falling){const lbl=st.cands[st.lblI];const emo=(st.org.s.find(s=>s[0]===lbl)||[])[1];
        const ty=G.base-st.tower.length*G.bh;g.save();g.setLineDash([4,7]);g.lineWidth=2;g.strokeStyle='rgba(124,58,237,.4)';g.beginPath();g.moveTo(sx,G.hookY+G.bh/2);g.lineTo(sx,ty);g.stroke();g.restore();
        K.shadow(g,sx,ty,G.bw*.3,u*.08,.15);this.card(p,g,sx,G.hookY,lbl,emo);}}
    if(st.falling){const f=st.falling;const emo=(st.org.s.find(s=>s[0]===f.label)||[])[1];this.card(p,g,f.x,f.y,f.label,emo,f.out?false:undefined,f.rot);}},
  down(p){const st=p.state;if(st.bonus||!st.card||st.falling)return;
    st.falling={x:st.card.x,y:this.geo(p).hookY,vy:0,label:st.cands[st.lblI],rot:0};p.Snd.whoosh();},
};

Engine.boot(GAME);
