/* 3학년 · 식물의 생활 — 꿀벌 비행 (톡톡 날갯짓으로 맞는 꽃길 통과하기)
   디자인: 꿀 색 만화 — 육각형 벌집 무늬. 꿀벌·꽃·줄기·꿀단지는 모두 직접 그린 그림이고, 맞힐수록 꿀단지가 차올라요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const INK='#4a2f0d';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M24 4l17 10v20L24 44 7 34V14z" fill="#ffd23f" stroke="#4a2f0d" stroke-width="3" stroke-linejoin="round"/><path d="M14 22h20M13 30h22" stroke="#4a2f0d" stroke-width="4"/><circle cx="19" cy="17" r="2.2" fill="#4a2f0d"/><circle cx="29" cy="17" r="2.2" fill="#4a2f0d"/></svg>';
const BEE_Q={
  live:[
    {q:'물에 <b>떠서</b> 사는 식물은?',a:'부레옥잠',w:['소나무','민들레','선인장'],t:'부레옥잠·개구리밥은 물에 떠서 살아요'},
    {q:'물에 <b>떠서</b> 사는 식물은?',a:'개구리밥',w:['단풍나무','강아지풀','검정말'],t:'개구리밥은 물 위에 떠서 살아요'},
    {q:'잎이 <b>물 위에 떠 있고</b> 뿌리는 물 밑 땅에 있는 식물은?',a:'수련',w:['선인장','갈대','소나무'],t:'수련·연꽃은 잎이 물 위에 떠 있어요'},
    {q:'<b>물속에 잠겨서</b> 사는 식물은?',a:'검정말',w:['부레옥잠','민들레','선인장'],t:'검정말·물수세미는 물속에 잠겨 살아요'},
    {q:'<b>물가</b>에 살며 줄기가 물 밖으로 높이 자라는 식물은?',a:'갈대',w:['개구리밥','검정말','선인장'],t:'갈대·부들은 물가에 살아요'},
    {q:'<b>사막</b>에 사는 식물은?',a:'선인장',w:['부레옥잠','검정말','수련'],t:'선인장은 굵은 줄기에 물을 저장해요'},
    {q:'<b>들이나 산</b>에 사는 식물은?',a:'민들레',w:['검정말','부레옥잠','수련'],t:'민들레·강아지풀·소나무는 들이나 산에서 살아요'},
    {q:'<b>들이나 산</b>에 사는 식물은?',a:'소나무',w:['개구리밥','물수세미','부들'],t:'소나무는 산에서 자라는 나무예요'},
  ],
  shape:[
    {q:'부레옥잠이 물에 뜰 수 있는 까닭은?',a:'잎자루에 공기 주머니',w:['뿌리가 아주 길어서','잎이 뾰족해서'],t:'부풀어 있는 잎자루 속 공기주머니 덕분에 떠요'},
    {q:'선인장의 <b>굵은 줄기</b>가 하는 일은?',a:'물을 저장해요',w:['햇빛을 막아요','열매를 맺어요'],t:'선인장은 굵은 줄기에 물을 저장해 가뭄을 견뎌요'},
    {q:'선인장의 <b>가시</b>는 무엇이 변한 것?',a:'잎',w:['뿌리','꽃'],t:'선인장의 가시는 잎이 변한 거예요 (물이 덜 빠져나가요)'},
    {q:'줄기가 <b>굵고 단단</b>하며 여러 해 사는 것은?',a:'나무',w:['풀'],t:'나무는 줄기가 굵고 단단해요'},
    {q:'소나무는 나무일까, 풀일까?',a:'나무',w:['풀'],t:'소나무는 나무예요'},
    {q:'강아지풀은 나무일까, 풀일까?',a:'풀',w:['나무'],t:'강아지풀은 줄기가 가는 풀이에요'},
    {q:'잎이 <b>바늘처럼 가늘고 뾰족한</b> 식물은?',a:'소나무',w:['단풍나무','토끼풀','연꽃'],t:'소나무 잎은 바늘 모양이에요'},
    {q:'잎이 <b>손바닥 모양</b>으로 갈라진 식물은?',a:'단풍나무',w:['소나무','강아지풀','부들'],t:'단풍나무 잎은 손바닥처럼 갈라져 있어요'},
    {q:'식물에서 물을 흡수하고 몸을 지탱하는 부분은?',a:'뿌리',w:['꽃','잎'],t:'뿌리는 물을 흡수하고 식물을 땅에 고정해요'},
    {q:'수련의 잎이 물에 잘 뜨는 까닭은?',a:'넓고 가벼운 잎',w:['가시가 있어서','잎이 물에 잠겨서'],t:'수련 잎은 넓고 가벼워 물 위에 떠요'},
  ],
  mimic:[
    {q:'<b>도꼬마리 열매</b>의 갈고리를 본뜬 것은?',a:'찍찍이 (벨크로)',w:['철조망','방수 옷'],t:'갈고리가 털에 걸리는 원리 → 찍찍이'},
    {q:'물에 젖지 않는 <b>연잎</b>을 본뜬 것은?',a:'물이 스며들지 않는 옷',w:['찍찍이','철조망'],t:'연잎 표면처럼 물방울이 굴러떨어지는 옷'},
    {q:'<b>단풍나무 열매</b>가 빙글빙글 도는 모양을 본뜬 것은?',a:'회전 날개 드론',w:['찍찍이','방수 페인트'],t:'단풍나무 열매처럼 돌며 천천히 내려와요'},
    {q:'<b>엉겅퀴</b>의 가시를 본뜬 것은?',a:'철조망',w:['찍찍이','방수 옷'],t:'가시로 동물을 막는 원리 → 철조망'},
  ],
};
/* ───────── 그림 도구 ───────── */
function flowerHead(g,x,y,r,c1,c2,t,glow){g.save();g.translate(x,y);if(glow)K.glow(g,0,0,r*2.2,glow,.7);g.rotate(Math.sin(t*1.5+x*.01)*.12);g.lineJoin='round';g.lineWidth=Math.max(1.8,r*.12);g.strokeStyle=INK;
  for(let i=0;i<6;i++){g.save();g.rotate(i*TAU/6);g.beginPath();g.ellipse(0,-r*.62,r*.36,r*.52,0,0,TAU);g.fillStyle=c1;g.fill();g.stroke();g.restore();}
  g.fillStyle=c2;g.beginPath();g.arc(0,0,r*.36,0,TAU);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(-r*.1,-r*.1,r*.1,0,TAU);g.fill();g.restore();}
function leafG(g,x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#4cc76a';g.strokeStyle=INK;g.lineWidth=Math.max(1.4,s*.08);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(s*.5,-s*.42,s,0);g.quadraticCurveTo(s*.5,s*.42,0,0);g.fill();g.stroke();g.strokeStyle='rgba(255,255,255,.5)';g.beginPath();g.moveTo(s*.1,0);g.lineTo(s*.8,0);g.stroke();g.restore();}
/* 꿀벌: (x,y)=가운데, s=크기 */
function bee(g,x,y,s,t,tilt,mood,col,o={}){g.save();g.translate(x,y);g.rotate(tilt);
  if(o.aura)K.glow(g,0,0,s*1.4,'#ffe27a',.55);
  /* 날개 */
  const wf=Math.abs(Math.sin(t*34))*.55+.45;g.fillStyle='rgba(255,255,255,.8)';g.strokeStyle='rgba(120,170,220,.8)';g.lineWidth=Math.max(1.4,s*.04);
  for(const d of [-1,1]){g.save();g.translate(d*s*.06,-s*.3);g.rotate(d*(-.5+(1-wf)*.8));g.beginPath();g.ellipse(0,-s*.28*wf,s*.2,s*.34*wf,0,0,TAU);g.fill();g.stroke();g.restore();}
  /* 몸통 */
  g.lineWidth=Math.max(2,s*.07);g.strokeStyle=INK;g.fillStyle='#ffcf33';g.beginPath();g.ellipse(0,0,s*.52,s*.4,0,0,TAU);g.fill();g.stroke();
  g.save();g.beginPath();g.ellipse(0,0,s*.52,s*.4,0,0,TAU);g.clip();g.fillStyle=INK;g.fillRect(-s*.32,-s*.5,s*.14,s);g.fillRect(-s*.06,-s*.5,s*.14,s);g.fillRect(s*.2,-s*.5,s*.1,s);g.fillStyle=col;g.fillRect(s*.1,-s*.5,s*.08,s);g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-s*.1,-s*.24,s*.3,s*.1,-.2,0,TAU);g.fill();g.restore();
  /* 침 */
  g.fillStyle=INK;g.beginPath();g.moveTo(-s*.5,-s*.04);g.lineTo(-s*.72,s*.02);g.lineTo(-s*.5,s*.08);g.fill();
  /* 더듬이 */
  g.strokeStyle=INK;g.lineWidth=Math.max(1.6,s*.05);g.lineCap='round';for(const d of[0,1]){g.beginPath();g.moveTo(s*(.36+d*.08),-s*.3);g.quadraticCurveTo(s*(.5+d*.12),-s*.58,s*(.62+d*.1),-s*(.5+d*.04));g.stroke();g.fillStyle=INK;g.beginPath();g.arc(s*(.62+d*.1),-s*(.5+d*.04),s*.04,0,TAU);g.fill();}
  /* 얼굴 */
  const fx=s*.28,fy=-s*.02;g.fillStyle='#fff';g.beginPath();g.arc(fx-s*.06,fy-s*.04,s*.13,0,TAU);g.arc(fx+s*.14,fy-s*.04,s*.11,0,TAU);g.fill();g.lineWidth=Math.max(1.2,s*.035);g.stroke();g.fillStyle=INK;g.strokeStyle=INK;
  if(mood==='happy'){g.lineWidth=Math.max(1.6,s*.05);g.beginPath();g.arc(fx-s*.06,fy-s*.02,s*.07,Math.PI*1.1,Math.PI*1.9);g.stroke();g.beginPath();g.arc(fx+s*.14,fy-s*.02,s*.06,Math.PI*1.1,Math.PI*1.9);g.stroke();g.fillStyle='#c0392b';g.beginPath();g.ellipse(fx+s*.04,fy+s*.16,s*.1,s*.07,0,0,Math.PI);g.fill();}
  else if(mood==='oops'){g.lineWidth=Math.max(1.4,s*.045);for(const [ex,r] of [[fx-s*.06,.07],[fx+s*.14,.06]]){g.beginPath();g.moveTo(ex-s*r,fy-s*.04-s*r);g.lineTo(ex+s*r,fy-s*.04+s*r);g.moveTo(ex+s*r,fy-s*.04-s*r);g.lineTo(ex-s*r,fy-s*.04+s*r);g.stroke();}g.beginPath();g.arc(fx+s*.04,fy+s*.22,s*.08,1.1*Math.PI,1.9*Math.PI);g.stroke();}
  else{g.beginPath();g.arc(fx-s*.04,fy-s*.03,s*.045,0,TAU);g.arc(fx+s*.15,fy-s*.03,s*.04,0,TAU);g.fill();g.lineWidth=Math.max(1.4,s*.045);g.beginPath();g.arc(fx+s*.05,fy+s*.12,s*.07,.15*Math.PI,.85*Math.PI);g.stroke();}
  g.fillStyle='rgba(255,120,120,.5)';g.beginPath();g.arc(fx-s*.12,fy+s*.1,s*.05,0,TAU);g.fill();
  g.restore();}
function jar(g,x,y,s,fill,t,pop){g.save();g.translate(x,y);if(pop)g.scale(1+pop*.15,1+pop*.15);
  g.fillStyle='rgba(255,255,255,.55)';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.06);g.lineJoin='round';
  g.beginPath();g.moveTo(-s*.28,-s*.55);g.lineTo(-s*.28,-s*.42);g.quadraticCurveTo(-s*.46,-s*.3,-s*.46,-s*.05);g.lineTo(-s*.46,s*.42);g.quadraticCurveTo(-s*.46,s*.55,-s*.32,s*.55);g.lineTo(s*.32,s*.55);g.quadraticCurveTo(s*.46,s*.55,s*.46,s*.42);g.lineTo(s*.46,-s*.05);g.quadraticCurveTo(s*.46,-s*.3,s*.28,-s*.42);g.lineTo(s*.28,-s*.55);g.closePath();g.fill();
  g.save();g.clip();const lv=-s*.45+s*.95*(1-fill);g.fillStyle='#ffb703';g.beginPath();g.moveTo(-s*.5,s*.6);g.lineTo(-s*.5,lv+s*.95*0);for(let xx=-s*.5;xx<=s*.5;xx+=s*.1)g.lineTo(xx,lv+Math.sin(xx*8+t*3)*s*.015);g.lineTo(s*.5,s*.6);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-s*.36,-s*.1,s*.08,s*.5);g.restore();
  g.stroke();g.fillStyle='#e9b36a';K.rr(g,-s*.34,-s*.7,s*.68,s*.2,s*.06);g.fill();g.stroke();
  g.fillStyle='#fff7d6';g.strokeStyle=INK;g.lineWidth=Math.max(1.4,s*.04);K.rr(g,-s*.24,s*.0,s*.48,s*.3,s*.05);g.fill();g.stroke();K.txt(g,'꿀',0,s*.15,{size:s*.24,color:INK});
  g.restore();}

/* ───────── 첫 화면 그림 ───────── */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const hex=(x,y,r,fill,line)=>{g.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}g.closePath();g.fillStyle=fill;g.fill();if(line){g.lineWidth=2;g.strokeStyle=line;g.stroke();}};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const u=Math.min(W,H)/8;K.sky(g,W,H,'#79c6f2','#fff4d6');K.glow(g,W*.8,H*.16,u*3,'#fff1a8',.7);K.glow(g,W*.8,H*.16,u,'#fff',.9);K.clouds(g,W,H,T*1.4,.12,3,u*1.8);
    g.save();[['#c9ecd0',.7,.05,.35],['#9edcb0',.82,.035,.9]].forEach(([c,yy,amp,sp],k)=>{const off=T*u*sp*.5;g.beginPath();g.moveTo(0,H);for(let x=0;x<=W+8;x+=W/40){const X=x+off;g.lineTo(x,H*yy-H*amp*(Math.sin(X/(u*3.2)+k*2)*.6+Math.sin(X/(u*7.5))*.4+1));}g.lineTo(W,H);g.closePath();g.fillStyle=c;g.fill();});g.restore();
    /* 벌집 육각형 */
    for(let k=0;k<9;k++){const x=W*(.1+hash(k)*.8),y=H*(.12+hash(k+5)*.4)+Math.sin(T+k)*u*.2;g.globalAlpha=.55;hex(x,y,u*(.4+hash(k+9)*.4),'rgba(255,205,60,.55)','rgba(255,160,0,.7)');g.globalAlpha=1;}
    /* 풀꽃 */
    for(let x=u*.4,k=0;x<W;x+=u*1.5,k++){const y=H-u*.4-(k%2)*u*.2;flowerHead(g,x,y,u*.4,['#ff7aa8','#ffd23f','#fff','#b49cff'][k%4],'#ffb703',T);}
    /* 꿀벌들 */
    for(let i=0;i<3;i++){const ph=T*.6+i*2.1;const x=W*(.25+.5*((ph*.15+i*.3)%1)),y=H*(.38+i*.14)+Math.sin(ph*3)*u*.5;bee(g,x,y,u*(1.0+i*.25),T+i,Math.cos(ph*3)*.15,'happy','#ff6b6b',{aura:i===0});}
    };
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const GAME={
  id:'sci3-bee',title:'꿀벌 비행',title1:'꽃길을 날아라',title2:'꿀벌 비행',emoji:LOGO,
  subtitle:'3학년 · 식물의 생활',
  howto:'화면을 <b>톡톡</b> 눌러 꿀벌을 날게 해요! 질문에 맞는 <b>꽃길</b>로 통과하면 점수, 꽃잎 기둥에 부딪히면 점수가 조금 깎여요.',
  how:'화면을 <b>톡톡</b> 눌러<br>맞는 꽃길로 날아가요',
  txt:{who:'누구와 날아갈까요?',dur:'비행 시간',pace:'날아가는 속도',seat:'번 꿀벌 ',go:'출발!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  theme:{c1:'#ffb703',c2:'#4cc76a'},hero:heroScene,vignette:.04,durs:[60,90,120],
  levelTitle:'어떤 꽃길로 갈까요?',
  levels:[
    {id:'live',g:'3학년 · 식물의 생활',t:'🏞️ 사는 곳과 식물',d:'물·사막·들과 산'},
    {id:'shape',g:'3학년 · 식물의 생활',t:'🌿 생김새와 특징',d:'잎·줄기·뿌리, 나무와 풀'},
    {id:'mimic',g:'3학년 · 식물의 생활',t:'💡 식물을 본뜬 물건',d:'도꼬마리 → 찍찍이'},
    {id:'all',g:'3학년 · 식물의 생활',t:'🌟 모두 섞기',d:'골고루 나와요'},
  ],
  summary:`<ul><li>물에 떠서 사는 식물: 부레옥잠, 개구리밥 · 잎이 물 위에 뜨는 식물: 수련, 연꽃 · 물속에 잠겨 사는 식물: 검정말, 물수세미 · 물가: 갈대, 부들</li>
    <li>사막의 선인장: 굵은 줄기에 물을 저장하고, 잎이 가시로 변했어요.</li><li>나무는 줄기가 굵고 단단하고, 풀은 줄기가 가늘어요.</li>
    <li>식물을 본뜬 물건: 도꼬마리 열매 → 찍찍이, 연잎 → 물이 스며들지 않는 옷, 단풍나무 열매 → 회전 날개</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{y:p.H*.5,vy:0,cols:[],cur:null,wing:0,T:0,Z0:0,honey:0,jarPop:0,mood:'neutral',moodT:0,tilt:0,started:false});this.addCol(p,p.W*1.05);},
  pickQ(p){const L=p.levelId;const pool=L==='all'?[...BEE_Q.live,...BEE_Q.shape,...BEE_Q.mimic]:BEE_Q[L];return p.deck(pool);},
  Z(p){const st=p.state,u=p.u;st.Z0=Math.max(st.Z0||0,p.top||0,u*2.6);const y0=st.Z0+u*.15,y1=p.H-u*.5;return{y0,y1,h:Math.max(120,y1-y0)};},
  addCol(p,x){const st=p.state,R=p.Rf;const q=this.pickQ(p);const wrong=p.R.pick(q.w);const top=p.R.chance(.5);const Z=this.Z(p);
    const ga=Z.h*.27,mid=Z.h*.1;const rest=Z.h-2*ga-mid;const t0=Z.y0+rest*R.num(.2,.8);
    st.cols.push({x,q,a:top?q.a:wrong,b:top?wrong:q.a,okTop:top,y1:t0,y2:t0+ga,y3:t0+ga+mid,y4:t0+2*ga+mid,done:false});
    if(!st.cur)this.focus(p);},
  focus(p){const st=p.state;const c=st.cols.find(c=>!c.done);if(c&&st.cur!==c){st.cur=c;p.ask('🐝 '+c.q.q,'맞는 꽃길로 날아가요');}},
  update(p,dt){const st=p.state,W=p.W,H=p.H,u=p.u;st.T+=dt;const Z=this.Z(p);
    st.vy+=Z.h*1.7*dt;st.y+=st.vy*dt;if(st.y<Z.y0+u*.3){st.y=Z.y0+u*.3;st.vy=Math.max(0,st.vy);}if(st.y>Z.y1-u*.2){st.y=Z.y1-u*.2;st.vy=Math.min(0,-st.vy*.3);}
    st.tilt+=((clamp(st.vy/(Z.h*1.2),-.5,.6))-st.tilt)*Math.min(1,dt*10);
    if(st.moodT>0){st.moodT-=dt;if(st.moodT<=0)st.mood='neutral';}if(st.jarPop>0)st.jarPop=Math.max(0,st.jarPop-dt*3);
    const spd=(u*2.3+p.t/p.dur*u*1.2)*p.pace;const bx=W*.26;const cw=u*1.3;
    for(const c of st.cols){c.x-=spd*dt;
      if(!c.done&&c.x<bx){c.done=true;const y=st.y;let zone=y<c.y1||y>c.y4?'wall':(y<=c.y2?'top':(y>=c.y3?'bot':'wall'));
        if(zone==='wall'){p.add(-10,bx,y-u);p.Snd.drum();p.shake();p.tip('꽃잎 기둥에 부딪혔어요! 정답: <b>'+c.q.a+'</b>','bad',2200);c.res='wall';st.mood='oops';st.moodT=1.2;
          const rv=plain(c.q.q)+' → '+c.q.a;if(p.wrong.length<40&&!p.wrong.includes(rv))p.wrong.push(rv);}
        else{const ok=(zone==='top')===c.okTop;c.res=ok?'ok':'bad';c.pickTop=zone==='top';p.hit(ok,{x:bx+u,y:y-u,tip:ok?c.q.t:`정답: <b>${c.q.a}</b> — ${c.q.t}`,review:plain(c.q.q)+' → '+c.q.a});
          st.mood=ok?'happy':'oops';st.moodT=1.2;
          if(ok){st.honey++;st.jarPop=1;if(st.honey>=5){st.honey=0;setTimeout(()=>{if(!p.active)return;p.add(50,u*1.4,st.Z0+u*2.2);p.burst(u*1.2,st.Z0+u*1.4,'#ffb703',20);p.tip('🍯 꿀단지 가득! 보너스 +50','good',1700);p.Snd.win();},250);}}}
        this.focus(p);}}
    st.cols=st.cols.filter(c=>c.x>-cw*2);
    const last=st.cols[st.cols.length-1];const gap=Math.max(W*.62,u*7.5);if(!last||last.x<W+cw-gap)this.addCol(p,(last?last.x:W)+gap);},
  draw(p,g){const W=p.W,H=p.H,u=p.u,st=p.state,t=st.T;const Z=this.Z(p);
    K.sky(g,W,H,'#79c6f2','#fff4d6');K.glow(g,W*.82,H*.14,u*3.4,'#fff1a8',.7);K.glow(g,W*.82,H*.14,u,'#ffffff',.9);
    K.clouds(g,W,H,t*1.6,.12,3,u*1.6);
    g.save();[['#c9ecd0',.68,.05,.35],['#9edcb0',.8,.035,.9]].forEach(([c,yy,amp,sp],k)=>{const off=t*u*sp;g.beginPath();g.moveTo(0,H);
      for(let x=0;x<=W+8;x+=W/40){const X=x+off;g.lineTo(x,H*yy-H*amp*(Math.sin(X/(u*3.2)+k*2)*.6+Math.sin(X/(u*7.5))*.4+1));}
      g.lineTo(W,H);g.closePath();const gr=g.createLinearGradient(0,H*(yy-amp*2),0,H);gr.addColorStop(0,K.shade(c,.1));gr.addColorStop(1,K.shade(c,-.12));g.fillStyle=gr;g.fill();});g.restore();
    /* 앞쪽 들꽃 */
    const fo=(t*u*1.4)%(u*2.2);for(let x=-fo;x<W+u;x+=u*2.2){const k=Math.round((x+t*u*1.4)/(u*2.2));const yy=H-u*.2-(k%2)*u*.18;flowerHead(g,x,yy,u*.3,['#ff7aa8','#ffd23f','#ffffff'][((k%3)+3)%3],'#ffb703',t);}
    const cw=u*1.3;
    for(const c of st.cols){const x=c.x-cw/2;
      [[c.y1,c.y2],[c.y3,c.y4]].forEach(([a,b])=>{const gr=g.createLinearGradient(c.x-cw,0,c.x+cw,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.4)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(c.x-cw,a,cw*2,b-a);});
      const stem=(y0,y1)=>{if(y1-y0<2)return;g.save();g.shadowColor='rgba(20,83,45,.3)';g.shadowBlur=u*.3;g.shadowOffsetX=u*.08;
        const gr=g.createLinearGradient(x,0,x+cw,0);gr.addColorStop(0,'#4cc76a');gr.addColorStop(.45,'#86e596');gr.addColorStop(1,'#2f9e55');K.rr(g,x,y0,cw,y1-y0,cw*.5);g.fillStyle=gr;g.fill();g.restore();
        g.lineWidth=Math.max(2,u*.06);g.strokeStyle=INK;K.rr(g,x,y0,cw,y1-y0,cw*.5);g.stroke();
        let s=0;for(let yy=y0+u*.7;yy<y1-u*.3;yy+=u*1.2){const d=(s++%2)?1:-1;leafG(g,x+cw/2+d*cw*.35,yy,u*.7,d>0?-.4:Math.PI+.4);}};
      stem(-20,c.y1);stem(c.y2,c.y3);stem(c.y4,H+20);
      /* 꽃 (구멍 가장자리) */
      const f1=['#ff7aa8','#ffd23f'];const tops=[[c.y2,f1[0]],[c.y3,f1[1]],[c.y4,f1[0]],[c.y1,f1[1]]];
      tops.forEach(([yy,cc],i)=>flowerHead(g,c.x,yy,u*.62,cc,i%2?'#ff7a1a':'#ffb703',t));
      /* 정답 이름표 */
      const colr=(isTop)=>c.done?(isTop===c.okTop?'#a8f08a':((c.res==='bad'&&c.pickTop===isTop)?'#ffb3a8':'#fffbea')):'#fffbea';
      const lo={size:u*.5,maxW:Math.min(u*4.4,W*.5),stroke:INK,lw:2.5,color:INK,r:u*.3,pad:u*.16};
      K.tag(g,c.a,c.x,(c.y1+c.y2)/2,Object.assign({fill:colr(true)},lo));K.tag(g,c.b,c.x,(c.y3+c.y4)/2,Object.assign({fill:colr(false)},lo));}
    const bx=W*.26,by=st.y;
    /* 꼬리 반짝임 */
    g.save();for(let k=1;k<7;k++){g.globalAlpha=.5-k*.06;g.fillStyle=k%2?'#fff7c2':'#ffd23f';g.beginPath();g.arc(bx-k*u*.34,by+Math.sin(t*8-k)*u*.1+k*st.vy*.012,u*(.15-k*.015),0,TAU);g.fill();}g.restore();
    bee(g,bx,by,u*1.75,t,st.tilt,st.mood,p.color,{aura:p.streak>=3});
    /* 꿀단지 */
    jar(g,u*1.3,st.Z0+u*1.7,u*1.5,st.honey/5,t,st.jarPop);
    },
  down(p){const st=p.state;st.vy=-this.Z(p).h*.62;p.Snd.tone(620,.05,'sine',.03);},
};

Engine.boot(GAME);
