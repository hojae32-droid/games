/* 6학년 · 계절의 변화 — 태양 고도 조종사 (태양을 끌어 그림자 길이와 계절 고도 맞추기)
   디자인: 레트로 항공 포스터 + 계기판 — 선버스트 하늘, 놋쇠 명찰, 고도계. 태양·막대·복엽기·지구는 모두 직접 그린 그림이에요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const NAVY='#10375c',TEAL='#12a4a4',ORANGE='#f26b21',CREAM='#fff7e0',GOLD='#e8a63a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#fff7e0" stroke="#10375c" stroke-width="3"/><circle cx="24" cy="24" r="9" fill="#f26b21" stroke="#10375c" stroke-width="2.4"/><g stroke="#10375c" stroke-width="3" stroke-linecap="round"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/></g></svg>';
const mixc=(a,b,t)=>{const f=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const A=f(a),B=f(b);const h=v=>('0'+Math.round(v).toString(16)).slice(-2);return'#'+h(lerp(A[0],B[0],t))+h(lerp(A[1],B[1],t))+h(lerp(A[2],B[2],t));};

/* ───────── 그림 도구 ───────── */
function sunDisc(g,x,y,r,t,rays){g.save();g.translate(x,y);
  if(rays){g.save();g.rotate(t*.06);for(let i=0;i<24;i++){g.rotate(TAU/24);g.fillStyle=i%2?'rgba(255,214,120,.22)':'rgba(255,214,120,.1)';g.beginPath();g.moveTo(0,0);g.lineTo(-r*.2,-r*14);g.lineTo(r*.2,-r*14);g.fill();}g.restore();}
  g.fillStyle='rgba(255,196,90,.35)';g.beginPath();g.arc(0,0,r*1.7,0,TAU);g.fill();g.fillStyle='rgba(255,196,90,.5)';g.beginPath();g.arc(0,0,r*1.35,0,TAU);g.fill();
  g.fillStyle='#ffc93c';g.strokeStyle=NAVY;g.lineWidth=Math.max(2.5,r*.1);g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.stroke();g.fillStyle='#ffe58a';g.beginPath();g.arc(-r*.2,-r*.2,r*.55,0,TAU);g.fill();g.restore();}
function cloud(g,x,y,s,col){g.fillStyle=col||'#ffffff';g.beginPath();g.ellipse(x,y,s,s*.3,0,0,TAU);g.ellipse(x-s*.5,y+s*.05,s*.55,s*.24,0,0,TAU);g.ellipse(x+s*.55,y+s*.05,s*.6,s*.22,0,0,TAU);g.ellipse(x-s*.15,y-s*.18,s*.4,s*.26,0,0,TAU);g.fill();}
function biplane(g,x,y,s,t){g.save();g.translate(x,y);g.rotate(Math.sin(t*2)*.04);g.fillStyle=NAVY;g.beginPath();g.ellipse(0,0,s*.55,s*.14,0,0,TAU);g.fill();
  g.fillStyle='#d6342b';g.fillRect(-s*.45,-s*.25,s*.9,s*.07);g.fillRect(-s*.45,s*.12,s*.9,s*.07);g.strokeStyle=NAVY;g.lineWidth=Math.max(1.5,s*.04);g.beginPath();g.moveTo(-s*.2,-s*.2);g.lineTo(-s*.2,s*.15);g.moveTo(s*.2,-s*.2);g.lineTo(s*.2,s*.15);g.stroke();
  g.fillStyle=NAVY;g.beginPath();g.moveTo(-s*.55,0);g.lineTo(-s*.78,-s*.22);g.lineTo(-s*.64,0);g.fill();
  g.strokeStyle='#fff';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(s*.6,-s*.22*Math.sin(t*40));g.lineTo(s*.6,s*.22*Math.sin(t*40));g.stroke();
  g.fillStyle='#fff7e0';g.beginPath();g.arc(s*.05,-s*.12,s*.09,0,TAU);g.fill();g.restore();}
function brass(g,str,cx,cy,s,maxW,bg){g.save();g.font=K.font(s);const w=Math.min(maxW||1e9,K.mw(g,str,s)+s*1.5),h=s*1.65;K.rr(g,cx-w/2,cy-h/2+s*.12,w,h,s*.3);g.fillStyle='rgba(16,55,92,.35)';g.fill();
  K.rr(g,cx-w/2,cy-h/2,w,h,s*.3);g.fillStyle=bg||CREAM;g.fill();g.lineWidth=Math.max(2,s*.1);g.strokeStyle=NAVY;g.stroke();
  g.strokeStyle=GOLD;g.lineWidth=Math.max(1,s*.05);K.rr(g,cx-w/2+s*.18,cy-h/2+s*.18,w-s*.36,h-s*.36,s*.2);g.stroke();g.restore();K.txt(g,str,cx,cy+s*.03,{size:s,color:NAVY,maxW:w-s*.9,font:'IBM Plex Sans KR'});}
function earthIcon(g,x,y,r,tilt){g.save();g.translate(x,y);g.rotate(tilt);g.fillStyle='#3d9be9';g.strokeStyle=NAVY;g.lineWidth=Math.max(2,r*.12);g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.stroke();
  g.save();g.beginPath();g.arc(0,0,r*.95,0,TAU);g.clip();g.fillStyle='#5fd46c';g.beginPath();g.ellipse(-r*.3,-r*.2,r*.4,r*.3,.4,0,TAU);g.ellipse(r*.35,r*.3,r*.3,r*.4,-.3,0,TAU);g.fill();g.restore();
  g.strokeStyle=CREAM;g.lineWidth=Math.max(2,r*.1);g.lineCap='round';g.beginPath();g.moveTo(0,-r*1.5);g.lineTo(0,r*1.5);g.stroke();g.fillStyle=ORANGE;g.beginPath();g.arc(0,-r*1.5,r*.12,0,TAU);g.fill();g.restore();}
function skyColors(t){return[mixc('#e8744e','#3d9be9',t),mixc('#ffb27a','#8fd0ff',t),mixc('#ffe0b0','#e6f6ff',t)];}

/* 첫 화면 그림 창: 태양이 하늘 길을 따라 오르내리고 막대 그림자가 길어졌다 짧아져요 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);const u=Math.min(W,H)/7;
    const alt=48+36*Math.sin(T*.5),a=alt*Math.PI/180,tt=clamp((alt-8)/70,0,1);const gy=H*.82,sc=skyColors(tt);
    const sg=g.createLinearGradient(0,0,0,gy);sg.addColorStop(0,sc[0]);sg.addColorStop(.6,sc[1]);sg.addColorStop(1,sc[2]);g.fillStyle=sg;g.fillRect(0,0,W,gy);
    const R=Math.min(W*.4,gy*.9),ox=W*.62;const sx=ox-Math.cos(a)*R,sy=gy-Math.sin(a)*R;sunDisc(g,sx,sy,u*.8,T,true);
    for(let i=0;i<4;i++)cloud(g,((i*W*.3+T*u*.4)%(W+u*5))-u*2.5,H*(.2+.12*(i%2)),u*.9,'rgba(255,255,255,.92)');
    biplane(g,((T*u*1.2)%(W+u*6))-u*3,H*.16+Math.sin(T)*u*.2,u*1.1,T);
    g.fillStyle=mixc('#7fcf6a','#4eb06a',tt);g.beginPath();g.moveTo(0,gy);for(let x=0;x<=W;x+=W/20)g.lineTo(x,gy-u*(.4+.3*Math.sin(x/W*6+1)));g.lineTo(W,H);g.lineTo(0,H);g.fill();
    g.fillStyle=mixc('#e8d3a0','#d6bb88',.5);g.fillRect(0,gy,W,H-gy);
    const stick=u*1.4,len=stick/Math.tan(a);g.fillStyle='rgba(16,55,92,.4)';g.beginPath();g.moveTo(ox,gy);g.lineTo(ox+len,gy);g.lineTo(ox+len,gy+u*.14);g.lineTo(ox,gy+u*.18);g.fill();
    g.fillStyle='#b97a3c';g.strokeStyle=NAVY;g.lineWidth=2.5;g.fillRect(ox-u*.07,gy-stick,u*.14,stick);g.strokeRect(ox-u*.07,gy-stick,u*.14,stick);g.fillStyle=ORANGE;g.beginPath();g.arc(ox,gy-stick,u*.13,0,TAU);g.fill();g.stroke();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 게임 내용 ───────── */
const SEASON_ALT=[['여름',76,'여름에는 태양 남중 고도가 높아요'],['겨울',29,'겨울에는 태양 남중 고도가 낮아요'],['봄·가을',52,'봄·가을은 여름과 겨울의 중간이에요']];
const SEASON_Q=[
  ['하루 중 태양 고도가 가장 높은 때는?','낮 12시 30분 무렵','아침 9시 무렵'],['하루 중 기온이 가장 높은 때는?','오후 2시 30분 무렵','낮 12시 30분 무렵'],
  ['태양 고도가 높아지면 그림자 길이는?','짧아져요','길어져요'],['여름의 낮 길이는?','길어요','짧아요'],
  ['계절이 변하는 까닭은?','자전축이 기울어진 채 공전해서','태양과 가까워졌다 멀어져서'],['태양 고도가 높을수록 같은 면적이 받는 태양 에너지는?','많아요','적어요'],
  ['겨울에 기온이 낮은 까닭은?','태양 남중 고도가 낮아서','태양이 꺼져 가서'],['태양 고도란?','태양이 지표면과 이루는 각','태양까지의 거리'],
  ['자전축이 기울어지지 않은 채 공전한다면?','계절 변화가 생기지 않아요','계절 변화가 더 커져요'],
];
const GAME={
  id:'sci6-season',title:'태양 고도 조종사',title1:'비행 학교',title2:'태양 고도 조종사',emoji:LOGO,
  subtitle:'6학년 · 계절의 변화',
  howto:'하늘의 <b>태양을 끌어</b> 높이(태양 고도)를 바꿔요. 태양이 높을수록 그림자가 짧아져요! 그림자 끝을 깃발에 맞추거나, 계절에 맞는 태양 높이를 찾아요.',
  how:'<b>태양을 끌어</b> 높이를 바꾸고<br>손을 떼면 확인!',
  txt:{who:'누구와 함께 비행할까요?',dur:'비행 시간',seat:'번 조종사 ',go:'이륙!'},
  theme:{c1:'#f26b21',c2:'#12a4a4'},hero:heroScene,vignette:.06,durs:[60,90,120],
  levelTitle:'비행 훈련 고르기',
  levels:[
    {id:'shadow',g:'6학년 · 계절의 변화',t:'📏 태양 고도와 그림자',d:'높을수록 그림자가 짧아요'},
    {id:'season',g:'6학년 · 계절의 변화',t:'🌞 계절별 태양 높이',d:'여름은 높고 겨울은 낮아요'},
    {id:'all',g:'6학년 · 계절의 변화',t:'🌟 모두 섞기',d:'문제도 섞여요'},
  ],
  summary:`<ul><li><b>태양 고도</b>: 태양이 지표면과 이루는 각. 하루 중 낮 12시 30분 무렵 가장 높고, 이때 그림자가 가장 짧아요. 기온은 오후 2시 30분 무렵 가장 높아요.</li>
    <li>태양 고도가 높을수록 그림자는 짧고, 같은 면적에 받는 태양 에너지가 많아 기온이 높아요.</li>
    <li>여름: 태양 남중 고도가 높고, 낮이 길고, 기온이 높아요 · 겨울: 남중 고도가 낮고, 낮이 짧고, 기온이 낮아요.</li>
    <li>계절이 변하는 까닭: 지구의 <b>자전축이 기울어진 채</b> 태양 둘레를 공전하기 때문이에요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{alt:40,kN:0,drag:false,T:0});this.round(p);},
  round(p){const st=p.state,L=p.levelId,R=p.R;let k=L==='all'?['shadow','season','quiz'][st.kN++%3]:L;if(L!=='all'&&R.chance(.25))k='quiz';st.k=k;st.lock=false;p.ctrl.innerHTML='';st.res=null;
    if(k==='shadow'){const G=this.geo(p);const mn=Math.ceil(Math.atan(G.stick/Math.max(1,p.W-G.ox-p.u*.6))*180/Math.PI);const want=R.int(Math.max(20,mn),70);st.want=want;st.alt=want>45?R.int(15,30):R.int(60,80);p.ask('📏 태양을 끌어 <b>그림자 끝</b>을 🚩 깃발에 맞춰요!',want>45?'그림자가 짧아지려면 태양을 높이!':'그림자가 길어지려면 태양을 낮게!');}
    else if(k==='season'){const s=p.deck(SEASON_ALT,'sa');st.tg=s;st.alt=s[1]>50?R.int(15,30):R.int(60,80);if(s[0]==='봄·가을')st.alt=R.pick([20,82]);p.ask(`🌞 우리나라 <b>${s[0]}</b> 낮 12시 30분 무렵의 태양 높이로!`,'태양을 끌어 높이를 맞춰요');}
    else{const q=p.deck(SEASON_Q,'sq');p.ask('☀️ '+q[0],'알맞은 답을 골라요');
      p.tools(R.shuffle([q[1],q[2]]).map(t=>({t})),(i,t)=>{if(st.lock)return;st.lock=true;const ok=t.t===q[1];p.hit(ok,{x:p.W/2,y:p.H*.25,tip:ok?`정답: ${q[1]}`:`정답: <b>${q[1]}</b>`,review:`${plain(q[0])} → ${q[1]}`});setTimeout(()=>{if(p.active)this.round(p);},ok?800:1500);},{toggle:false});}},
  geo(p){const W=p.W,H=p.H,u=Math.min(p.u,W/8);const gy=H*.78;const sx=W*.58;const R=Math.min(W*.5,H*.62);const stick=Math.min(u*1.6,H*.16);return{gy,sx,R,stick,ox:sx,u};},
  shadowLen(p,alt){const G=this.geo(p);return G.stick/Math.tan(alt*Math.PI/180);},
  quizScene(p,g){const W=p.W,H=p.H,u=Math.min(p.u,W/8),t=p.state.T;
    const sg=g.createLinearGradient(0,0,0,H);sg.addColorStop(0,'#10375c');sg.addColorStop(1,'#2a6fa8');g.fillStyle=sg;g.fillRect(0,0,W,H);
    for(let i=0;i<40;i++){g.fillStyle=`rgba(255,247,224,${.3+.6*Math.abs(Math.sin(t*1.3+i))})`;g.fillRect(hash(i)*W,hash(i+60)*H,2,2);}
    const cx=W/2,cy=H*.5,rx=Math.min(W*.4,H*.62),ry=Math.min(H*.3,rx*(W<H?.95:.5));
    g.save();g.strokeStyle='rgba(255,247,224,.6)';g.lineWidth=3;g.setLineDash([u*.14,u*.2]);g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,TAU);g.stroke();g.restore();
    sunDisc(g,cx,cy,u*.9,t,false);
    const S=[['여름',Math.PI],['가을',Math.PI/2],['겨울',0],['봄',-Math.PI/2]];
    S.forEach(([n,a])=>{const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;const er=u*.55;earthIcon(g,x,y,er,.41);brass(g,n,x,y+er*1.9*(Math.sin(a)<0?-1:1)+(Math.sin(a)===0?er*.1:0),u*.36,u*3);});},
  draw(p,g,dt){const W=p.W,H=p.H,u=Math.min(p.u,W/8),st=p.state,G=this.geo(p);st.T+=dt;const T=st.T;
    if(st.k==='quiz'){this.quizScene(p,g);return;}
    const tt=K.clamp((st.alt-8)/70,0,1),sc=skyColors(tt);
    const sg=g.createLinearGradient(0,0,0,G.gy);sg.addColorStop(0,sc[0]);sg.addColorStop(.6,sc[1]);sg.addColorStop(1,sc[2]);g.fillStyle=sg;g.fillRect(0,0,W,G.gy+2);
    const a=st.alt*Math.PI/180;const sunX=G.ox-Math.cos(a)*G.R,sunY=G.gy-Math.sin(a)*G.R;
    g.save();g.beginPath();g.rect(0,0,W,G.gy);g.clip();sunDisc(g,sunX,sunY,u*.85,T,true);g.restore();
    for(let i=0;i<4;i++)cloud(g,((i*W*.3+T*u*.35)%(W+u*5))-u*2.5,H*(.12+.1*(i%2)),u*.9,'rgba(255,255,255,.92)');
    biplane(g,((T*u*.9)%(W+u*6))-u*3,H*.07+Math.sin(T*.8)*u*.2,u,T);
    /* 먼 산, 언덕, 운동장 */
    g.fillStyle=mixc('#c9a2c2','#a9c8e6',tt);g.beginPath();g.moveTo(0,G.gy);for(let x=0;x<=W;x+=W/24)g.lineTo(x,G.gy-u*(.9+.7*Math.sin(x/W*7+1)*Math.sin(x/W*3)));g.lineTo(W,G.gy);g.fill();
    g.fillStyle=mixc('#82cf72','#56b36e',tt);g.beginPath();g.moveTo(0,G.gy);for(let x=0;x<=W;x+=W/16)g.lineTo(x,G.gy-u*(.35+.25*Math.sin(x/W*5)));g.lineTo(W,H);g.lineTo(0,H);g.fill();
    g.fillStyle='#e8d3a0';g.fillRect(0,G.gy,W,H-G.gy);g.fillStyle='#d6bb88';g.fillRect(0,G.gy+u*.55,W,H);g.fillStyle=NAVY;g.fillRect(0,G.gy,W,Math.max(2,u*.05));
    /* 하늘 길 */
    g.save();g.strokeStyle='rgba(255,247,224,.85)';g.lineWidth=Math.max(2.5,u*.06);g.setLineDash([u*.12,u*.16]);g.beginPath();g.arc(G.ox,G.gy,G.R,Math.PI,Math.PI*1.5);g.stroke();g.restore();
    const L=this.shadowLen(p,st.alt);const tipX=G.ox+L;
    g.save();g.strokeStyle='rgba(255,201,60,.9)';g.lineWidth=Math.max(2,u*.05);g.setLineDash([u*.14,u*.1]);g.beginPath();g.moveTo(sunX,sunY);g.lineTo(tipX,G.gy);g.stroke();g.restore();
    /* 각도 부채꼴 */
    g.save();g.fillStyle='rgba(242,107,33,.3)';g.beginPath();g.moveTo(G.ox,G.gy);g.arc(G.ox,G.gy,u*1.1,Math.PI,Math.PI+a);g.closePath();g.fill();
    g.strokeStyle=ORANGE;g.lineWidth=Math.max(3,u*.07);g.beginPath();g.arc(G.ox,G.gy,u*1.1,Math.PI,Math.PI+a);g.stroke();
    g.beginPath();g.moveTo(G.ox,G.gy);g.lineTo(G.ox-Math.cos(a)*u*2.2,G.gy-Math.sin(a)*u*2.2);g.stroke();g.restore();
    brass(g,`태양 고도 ${Math.round(st.alt)}°`,Math.max(u*2,G.ox-u*2.8),G.gy+u*.85,u*.34,u*5);
    /* 그림자와 막대 */
    g.save();const ex=Math.min(tipX,W+u);g.fillStyle='rgba(16,55,92,.45)';g.beginPath();g.moveTo(G.ox,G.gy);g.lineTo(ex,G.gy);g.lineTo(ex,G.gy+u*.12);g.lineTo(G.ox,G.gy+u*.24);g.closePath();g.fill();g.restore();
    if(tipX<W)brass(g,'그림자',(G.ox+tipX)/2,G.gy+u*.55,u*.24,u*3);
    const sw=Math.max(6,u*.17);g.fillStyle='#b97a3c';g.strokeStyle=NAVY;g.lineWidth=3;g.fillRect(G.ox-sw/2,G.gy-G.stick,sw,G.stick);g.strokeRect(G.ox-sw/2,G.gy-G.stick,sw,G.stick);g.fillStyle=ORANGE;g.beginPath();g.arc(G.ox,G.gy-G.stick,sw*.65,0,TAU);g.fill();g.stroke();
    if(st.k==='shadow'){const fx=G.ox+this.shadowLen(p,st.want);const vx=Math.min(fx,W-u*.3);
      g.save();g.strokeStyle='#d6342b';g.lineWidth=2.5;g.setLineDash([4,4]);g.beginPath();g.moveTo(fx,G.gy-u*.7);g.lineTo(fx,G.gy+u*.4);g.stroke();g.restore();
      g.strokeStyle=NAVY;g.lineWidth=3;g.beginPath();g.moveTo(vx,G.gy+u*.1);g.lineTo(vx,G.gy-u*.95);g.stroke();g.fillStyle='#d6342b';g.beginPath();g.moveTo(vx,G.gy-u*.95);g.lineTo(vx+u*.6,G.gy-u*.78);g.lineTo(vx,G.gy-u*.6);g.closePath();g.fill();g.stroke();}
    if(st.k==='season')brass(g,'⬅ 남쪽',u*1.4,G.gy+u*1.45,u*.3,u*3);
    /* 고도계 */
    const dr=Math.min(u*1.3,H*.11),dx=u*1.7,dy=u*1.7;g.save();g.fillStyle=GOLD;g.strokeStyle=NAVY;g.lineWidth=3;g.beginPath();g.arc(dx,dy,dr*1.12,0,TAU);g.fill();g.stroke();g.fillStyle=CREAM;g.beginPath();g.arc(dx,dy,dr,0,TAU);g.fill();
    g.strokeStyle=NAVY;g.lineWidth=2;for(let d=0;d<=90;d+=10){const aa=Math.PI+d*Math.PI/180/2*1;g.beginPath();g.moveTo(dx-Math.cos(d*Math.PI/180)*dr*.78,dy-Math.sin(d*Math.PI/180)*dr*.78);g.lineTo(dx-Math.cos(d*Math.PI/180)*dr*.95,dy-Math.sin(d*Math.PI/180)*dr*.95);g.stroke();}
    g.strokeStyle=ORANGE;g.lineWidth=Math.max(3,dr*.08);g.lineCap='round';g.beginPath();g.moveTo(dx,dy);g.lineTo(dx-Math.cos(a)*dr*.8,dy-Math.sin(a)*dr*.8);g.stroke();g.fillStyle=NAVY;g.beginPath();g.arc(dx,dy,dr*.1,0,TAU);g.fill();g.restore();
    K.txt(g,Math.round(st.alt)+'°',dx,dy+dr*.55,{size:dr*.4,color:NAVY});
    /* 끌 수 있는 태양 표시 */
    if(!st.drag&&!st.lock){g.save();g.strokeStyle=CREAM;g.lineWidth=Math.max(3,u*.06);g.setLineDash([u*.15,u*.1]);g.lineDashOffset=-T*u*.6;g.beginPath();g.arc(sunX,sunY,u*1.15+Math.sin(T*5)*u*.08,0,TAU);g.stroke();g.restore();}
    if(st.res)brass(g,st.res,W/2,H*.1,u*.44,W*.9,'#ffe58a');},
  down(p,x,y){const st=p.state;if(st.lock||st.k==='quiz')return;const G=this.geo(p);const a=st.alt*Math.PI/180;const sx=G.ox-Math.cos(a)*G.R,sy=G.gy-Math.sin(a)*G.R;
    if(Math.hypot(x-sx,y-sy)<p.u*1.6){st.drag=true;this.move(p,x,y,true);}},
  move(p,x,y,down){const st=p.state;if(!st.drag||!down)return;const G=this.geo(p);let a=Math.atan2(G.gy-y,G.ox-x)*180/Math.PI;st.alt=K.clamp(a,8,88);},
  up(p){const st=p.state;if(!st.drag)return;st.drag=false;st.lock=true;
    if(st.k==='shadow'){const G=this.geo(p);const d=Math.abs(this.shadowLen(p,st.alt)-this.shadowLen(p,st.want));const ok=d<p.u*.45;
      p.hit(ok,{x:p.W/2,y:p.H*.2,tip:ok?'그림자 끝이 깃발에 딱! 태양이 높을수록 그림자는 짧아요':'조금 더 맞춰 봐요 — 태양이 높을수록 그림자가 짧아요',review:'태양 고도가 높을수록 그림자 길이는 짧아요',pen:10});
      if(ok)setTimeout(()=>{if(p.active)this.round(p);},800);else setTimeout(()=>{st.lock=false;},400);}
    else{const s=st.tg;const ok=Math.abs(st.alt-s[1])<=9;st.res=ok?`${s[0]} 남중 고도 약 ${s[1]}°`:'';
      p.hit(ok,{x:p.W/2,y:p.H*.2,tip:ok?s[2]:`${s[0]}의 태양 높이와 달라요 — ${s[2]}`,review:`${s[0]} 태양 남중 고도: ${s[2]} (서울 약 ${s[1]}°)`,pen:15});
      if(ok)setTimeout(()=>{if(p.active)this.round(p);},1000);else setTimeout(()=>{st.lock=false;},500);}},
};
Engine.boot(GAME);
