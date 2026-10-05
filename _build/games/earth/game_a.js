/* 6학년 과학 · 지구의 운동 — 지구 돌리기 (우주 관측소)
   지구를 직접 돌리고(자전), 궤도를 따라 옮기며(공전) 낮과 밤, 별의 움직임, 계절별 별자리를 관측해요.
   맞힐 때마다 아래 '한 해 여행' 길에서 지구가 한 달씩 앞으로 가요. */
const TAU=Math.PI*2,PI=Math.PI;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const easeOut=t=>1-Math.pow(1-clamp(t,0,1),3);
const easeIO=t=>{t=clamp(t,0,1);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const angd=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));      /* 각도 차이(−π~π) */
const nearA=(a,b,tol)=>Math.abs(angd(a,b))<tol;
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="none" stroke="#8f7dff" stroke-width="2" stroke-dasharray="3 4"/><circle cx="24" cy="24" r="13" fill="#2f7bff"/><path d="M17 17c3-3 8-3 10 0s0 6-3 6-3 4-6 3-4-6-1-9z" fill="#4cd37a"/><path d="M29 27c3 0 5 2 4 5s-4 3-5 1 0-6 1-6z" fill="#4cd37a"/><path d="M24 11a13 13 0 0 1 0 26c4-4 4-22 0-26z" fill="#0a0820" opacity=".38"/><circle cx="40" cy="12" r="4.5" fill="#ffb347"/><circle cx="40" cy="12" r="7" fill="#ffb347" opacity=".25"/></svg>';

/* ───────── 때(시각) ↔ 지구 위 우리나라의 위치 ─────────
   북극 위에서 본 지구, 태양은 왼쪽. 정오 = 우리나라가 태양을 향한 왼쪽(π), 자정 = 오른쪽(0).
   지구는 시계 반대 방향으로 돌아요 → 시각이 늘수록 각도는 줄어요 */
const TIMES=[
  {t:0,n:'한밤중(자정)',note:'태양의 반대쪽이라 가장 어두워요'},
  {t:3,n:'새벽 3시',note:'아직 태양이 안 보이는 깊은 밤이에요'},
  {t:6,n:'해 뜰 무렵',note:'밤에서 낮으로 들어가는 곳이에요'},
  {t:9,n:'오전 9시',note:'해가 동쪽 하늘에 떠올랐어요'},
  {t:12,n:'정오(한낮)',note:'태양을 정면으로 마주 봐요'},
  {t:15,n:'오후 3시',note:'해가 서쪽으로 기울고 있어요'},
  {t:18,n:'해 질 무렵',note:'낮에서 밤으로 들어가는 곳이에요'},
  {t:21,n:'밤 9시',note:'해가 지고 어두워졌어요'},
];
const thetaOf=t=>PI+(12-t)*PI/12;
const hourOf=th=>(((12+(PI-th)*12/PI)%24)+24)%24;
const CONS=[   /* 한밤중 남쪽 하늘의 대표 별자리: 지구 위치 각도 a */
  {id:'leo',n:'사자자리',season:'봄',a:-PI/2},{id:'cyg',n:'백조자리',season:'여름',a:-PI},{id:'peg',n:'페가수스자리',season:'가을',a:PI/2},{id:'ori',n:'오리온자리',season:'겨울',a:0},
];
const SEASONC={'봄':'#7ee08a','여름':'#ff7a6b','가을':'#ffb347','겨울':'#8fd0ff'};
/* 별자리 모양(−1~1 좌표) */
const CPAT={
  leo:{s:[[-.85,.55],[-.7,.15],[-.55,-.3],[-.3,-.62],[-.02,-.52],[.18,-.12],[.62,-.28],[.9,.12],[.3,.35]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,5]]},
  cyg:{s:[[0,-.92],[0,-.4],[0,.05],[0,.9],[-.82,-.08],[.82,-.08]],l:[[0,1],[1,2],[2,3],[4,2],[2,5]]},
  peg:{s:[[-.45,-.45],[.4,-.5],[.5,.35],[-.45,.4],[.88,.62],[-.9,.7],[.1,-.9]],l:[[0,1],[1,2],[2,3],[3,0],[2,4],[3,5],[1,6]]},
  ori:{s:[[-.55,-.85],[.55,-.78],[-.2,0],[0,.02],[.2,.04],[-.5,.88],[.5,.82],[0,-.95]],l:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]]},
};
function drawConst(g,id,cx,cy,s,alpha,T,tint){const P=CPAT[id];g.save();g.globalAlpha=alpha;
  g.strokeStyle=tint||'rgba(170,200,255,.75)';g.lineWidth=Math.max(1.2,s*.025);g.lineCap='round';g.beginPath();
  P.l.forEach(([a,b])=>{g.moveTo(cx+P.s[a][0]*s,cy+P.s[a][1]*s);g.lineTo(cx+P.s[b][0]*s,cy+P.s[b][1]*s);});g.stroke();
  P.s.forEach((q,i)=>{const r=Math.max(1.8,s*(i<2?.075:.055))*(.85+.15*Math.sin((T||0)*3+i*2));K.glow(g,cx+q[0]*s,cy+q[1]*s,r*3.4,'#cfe3ff',.5);g.fillStyle='#fff';g.beginPath();g.arc(cx+q[0]*s,cy+q[1]*s,r,0,TAU);g.fill();});g.restore();}

/* ───────── 지구 (북극 위에서 본 모습) ─────────
   rot: 땅이 돌아간 각도, night: 밤 쪽 방향(0이면 오른쪽이 밤) */
function globe(g,x,y,R,rot,night,o={}){
  g.save();K.glow(g,x,y,R*1.45,'#5ec8ff',.32);
  const oc=g.createRadialGradient(x-R*.35,y-R*.35,R*.1,x,y,R);oc.addColorStop(0,'#69bbff');oc.addColorStop(.7,'#2463d6');oc.addColorStop(1,'#14378a');
  g.fillStyle=oc;g.beginPath();g.arc(x,y,R,0,TAU);g.fill();
  g.save();g.beginPath();g.arc(x,y,R,0,TAU);g.clip();g.translate(x,y);g.rotate(rot);
  /* 위도·경도 선 */
  g.strokeStyle='rgba(255,255,255,.14)';g.lineWidth=Math.max(1,R*.012);for(const k of [.5,.87]){g.beginPath();g.arc(0,0,R*k,0,TAU);g.stroke();}
  g.beginPath();for(let i=0;i<12;i++){const a=i*PI/6;g.moveTo(0,0);g.lineTo(Math.cos(a)*R,Math.sin(a)*R);}g.stroke();
  const land=[[.55,.1,.4,.26,.3],[.22,-.62,.3,.18,.9],[-.3,-.52,.3,.2,-.4],[-.62,.12,.28,.34,.2],[-.2,.58,.3,.2,.5],[.12,.2,.2,.14,.1]];
  land.forEach(([a,b,rx,ry,t])=>{const gr=g.createLinearGradient(a*R,(b-ry)*R,a*R,(b+ry)*R);gr.addColorStop(0,'#86e592');gr.addColorStop(1,'#2f9e57');g.fillStyle=gr;
    g.beginPath();g.ellipse(a*R,b*R,rx*R,ry*R,t,0,TAU);g.ellipse((a+rx*.45)*R,(b+ry*.5)*R,rx*.6*R,ry*.7*R,t+.6,0,TAU);g.fill();});
  g.fillStyle='#f4fbff';g.beginPath();g.arc(0,0,R*.14,0,TAU);g.fill();   /* 북극 얼음 */
  g.restore();
  if(night!=null){g.save();g.beginPath();g.arc(x,y,R,0,TAU);g.clip();g.translate(x,y);g.rotate(night);
    const sh=g.createLinearGradient(-R*.05,0,R*.16,0);sh.addColorStop(0,'rgba(4,6,30,0)');sh.addColorStop(1,'rgba(4,6,30,.78)');g.fillStyle=sh;g.fillRect(-R*.05,-R,R*1.1,R*2);g.restore();}
  g.strokeStyle='rgba(160,225,255,.75)';g.lineWidth=Math.max(2,R*.025);g.beginPath();g.arc(x,y,R,0,TAU);g.stroke();
  g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.ellipse(x-R*.4,y-R*.46,R*.4,R*.2,-.6,0,TAU);g.fill();g.restore();}
/* 핀 (우리나라 / 반대편) */
function pin(g,x,y,s,col,label){g.save();K.shadow(g,x,y+s*.05,s*.32,s*.1,.4);g.translate(x,y);
  g.fillStyle=col;g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,s*.1);g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-s*.6,-s*.6,-s*.5,-s*1.25,0,-s*1.25);g.bezierCurveTo(s*.5,-s*1.25,s*.6,-s*.6,0,0);g.fill();g.stroke();
  g.fillStyle='#fff';g.beginPath();g.arc(0,-s*.82,s*.2,0,TAU);g.fill();g.restore();
  if(label)K.txt(g,label,x,y-s*1.5,{size:s*.46,color:'#fff',stroke:'rgba(8,6,32,.85)',lw:Math.max(3,s*.12),maxW:s*3.2});}

/* ───────── 우리나라에서 본 하늘 (남쪽을 보고 서 있어요) ───────── */
function skyView(g,x,y,w,h,t,T,o={}){
  const alt=Math.sin((t-6)/12*PI);                 /* 태양 고도(−1~1) */
  const day=clamp((alt+.12)/.4,0,1);
  const mix=(a,b,k)=>{const f=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const A=f(a),B=f(b);const h=v=>('0'+Math.round(v).toString(16)).slice(-2);return'#'+h(lerp(A[0],B[0],k))+h(lerp(A[1],B[1],k))+h(lerp(A[2],B[2],k));};
  const dusk=clamp(1-Math.abs(alt)/.3,0,1)*(alt>-.25?1:0);
  g.save();K.rr(g,x,y,w,h,Math.min(w,h)*.06);g.clip();
  const hz=y+h*.78;
  const top=mix(mix('#040720','#10206e',clamp((alt+.4)*2,0,1)),'#2f86ff',day),bot=mix(mix('#0b1240','#2a2f86',clamp((alt+.4)*2,0,1)),dusk>0?mix('#bfe4ff','#ffb06a',dusk):'#c8e8ff',day);
  const gr=g.createLinearGradient(0,y,0,hz);gr.addColorStop(0,top);gr.addColorStop(1,bot);g.fillStyle=gr;g.fillRect(x,y,w,h);
  if(day<.95){g.save();g.globalAlpha=1-day;let a=7+Math.round(t);const r=()=>{a=(a*16807)%2147483647;return a/2147483647;};a=11;
    for(let i=0;i<46;i++){const sx=x+r()*w,sy=y+r()*(hz-y)*.95,sz=.6+r()*1.4;g.globalAlpha=(1-day)*(.4+.6*Math.abs(Math.sin(T*1.5+i)));g.fillStyle='#fff';g.fillRect(sx,sy,sz,sz);}g.restore();}
  if(alt>-.2){const u=(t-6)/12;const sx=x+lerp(w*.1,w*.9,u),sy=hz-Math.max(-.04,alt)*(hz-y)*.82;const sr=Math.min(w,h)*.07;
    K.glow(g,sx,sy,sr*(3+dusk*2),dusk>.2?'#ff9a4a':'#ffe9a0',.55);g.fillStyle=dusk>.2?'#ffb05a':'#fff3b0';g.beginPath();g.arc(sx,sy,sr,0,TAU);g.fill();}
  /* 땅 */
  g.fillStyle=mix('#04060f','#2f7a45',day);g.beginPath();g.moveTo(x,hz);for(let i=0;i<=20;i++)g.lineTo(x+w*i/20,hz-Math.sin(i*.9+1)*h*.012-h*.012);g.lineTo(x+w,y+h);g.lineTo(x,y+h);g.closePath();g.fill();
  g.fillStyle=mix('#02030a','#1d5a31',day);g.beginPath();g.moveTo(x,hz+h*.05);g.quadraticCurveTo(x+w*.3,hz-h*.06,x+w*.55,hz+h*.06);g.quadraticCurveTo(x+w*.8,hz-h*.03,x+w,hz+h*.07);g.lineTo(x+w,y+h);g.lineTo(x,y+h);g.closePath();g.fill();
  /* 집 */
  const hx=x+w*.14,hy=hz+h*.08,hs=h*.08;g.fillStyle=mix('#05070f','#8a5a3a',day);g.fillRect(hx,hy-hs,hs*1.4,hs);g.fillStyle=mix('#03040a','#b04a3a',day);g.beginPath();g.moveTo(hx-hs*.15,hy-hs);g.lineTo(hx+hs*.7,hy-hs*1.6);g.lineTo(hx+hs*1.55,hy-hs);g.fill();
  if(day<.6){g.fillStyle='#ffe28a';g.fillRect(hx+hs*.45,hy-hs*.7,hs*.5,hs*.45);}
  /* 방위 */
  const fs=Math.max(10,Math.min(w*.07,h*.07));[['동',.1],['남',.5],['서',.9]].forEach(([s,u])=>K.txt(g,s,x+w*u,y+h-fs*.9,{size:fs,color:'rgba(255,255,255,.85)',stroke:'rgba(0,0,0,.5)',lw:3}));
  if(o.drawFn)o.drawFn(g,x,y,w,h,hz);
  g.restore();
  K.rr(g,x,y,w,h,Math.min(w,h)*.06);g.lineWidth=3;g.strokeStyle=o.edge||'rgba(170,150,255,.65)';g.stroke();}

/* 설정 화면 왼쪽 그림: 태양 둘레를 도는 지구와 별자리, 자전하는 큰 지구 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    K.vgrad(g,0,0,W,H,['#03020d','#0a0724','#160f3d']);
    K.stars(g,W,H,T,Math.round(W/6),5,'#e8e2ff');
    const cx=W*.5,cy=H*.6,OR=Math.min(W*.19,H*.17);
    /* 태양 */
    const sp=1+Math.sin(T*1.5)*.03;K.glow(g,cx,cy,OR*.9*sp,'#ff9a3d',.45);K.glow(g,cx,cy,OR*.4,'#ffe08a',.9);g.fillStyle='#fff1b8';g.beginPath();g.arc(cx,cy,OR*.16,0,TAU);g.fill();
    /* 궤도와 별자리 */
    g.save();g.strokeStyle='rgba(170,150,255,.4)';g.lineWidth=2;g.setLineDash([6,9]);g.lineDashOffset=-T*10;g.beginPath();g.ellipse(cx,cy,OR*1.9,OR*1.15,0,0,TAU);g.stroke();g.restore();
    CONS.forEach((c,i)=>{const a=-PI/2-i*PI/2;const x=cx+Math.cos(a)*OR*2.3,y=cy+Math.sin(a)*OR*1.8;drawConst(g,c.id,x,y,OR*.34,.9,T);});
    /* 공전하는 지구 */
    const ea=-T*.35;const ex=cx+Math.cos(ea)*OR*1.9,ey=cy+Math.sin(ea)*OR*1.15;
    globe(g,ex,ey,OR*.2,T*1.2,ea);
    /* 자전하는 큰 지구는 위쪽에 */
    K.vignette(g,W,H,.35);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 공통: 화면 영역과 우주 배경, '한 해 여행' 길 ───────── */
const stripH=p=>clamp(p.H*.115,40,84);
const areaOf=p=>({x:0,y:0,w:p.W,h:p.H-stripH(p)});
function bgScene(p,g,dt){const st=p.state,W=p.W,H=p.H,sh=stripH(p);
  st.T=(st.T||0)+dt;st.pulse=Math.max(0,(st.pulse||0)-dt*1.6);
  const target=p.correct;st.mo=lerp(st.mo==null?0:st.mo,target,Math.min(1,dt*3));
  K.vgrad(g,0,0,W,H,['#06041a','#0e0a30','#171044']);K.stars(g,W,H-sh,st.T,Math.round(W/9),p.i*3+2,'#e8e2ff');
  /* 한 해 여행 */
  const y0=H-sh;g.fillStyle='rgba(4,3,16,.88)';g.fillRect(0,y0,W,sh);g.fillStyle='rgba(150,130,255,.3)';g.fillRect(0,y0,W,2);
  const tx0=W*.12,tx1=W*.94,ty=y0+sh*.42;const mm=st.mo;const idx=((mm%12)+12)%12;
  g.strokeStyle='rgba(170,150,255,.35)';g.lineWidth=2;g.setLineDash([5,6]);g.beginPath();g.moveTo(tx0,ty);g.lineTo(tx1,ty);g.stroke();g.setLineDash([]);
  K.glow(g,W*.05,ty,sh*.8,'#ff9a3d',.4+st.pulse*.3);g.fillStyle='#ffd27a';g.beginPath();g.arc(W*.05,ty,sh*.17,0,TAU);g.fill();
  const seasonOf=m=>m>=2&&m<=4?'봄':m>=5&&m<=7?'여름':m>=8&&m<=10?'가을':'겨울';
  for(let m=0;m<12;m++){const x=lerp(tx0,tx1,m/11),sc=SEASONC[seasonOf(m)];g.fillStyle=m<=Math.floor(idx)?sc:'rgba(150,130,255,.35)';g.beginPath();g.arc(x,ty,Math.max(2.5,sh*.06),0,TAU);g.fill();
    if((tx1-tx0)/11>40||m%3===2)K.txt(g,(m+1)+'월',x,y0+sh*.82,{size:clamp(sh*.2,9,13),color:m===Math.floor(idx)?'#fff':'rgba(200,190,255,.6)'});}
  const ex=lerp(tx0,tx1,idx/11);globe(g,ex,ty,clamp(sh*.2,8,16),T0(st),0);
  const yr=Math.floor(mm/12)+1;const fs=clamp(sh*.22,10,14);const lab=p.correct>=12?`${yr}년째 · ${(Math.floor(idx)+1)}월`:`${Math.floor(idx)+1}월`;
  K.txt(g,lab,W*.05,y0+sh*.82,{size:fs,color:'#ffd27a'});}
const T0=st=>(st.T||0)*3;
const intro=p=>easeOut(((p.state.T||0)-(p.state.t0||0))/.45);
function goodHit(p,pts,x,y,tip,extra){const r=p.hit(true,Object.assign({pts,x,y,tip,tipMs:2600,color:'#ffd27a'},extra||{}));p.state.pulse=1;return r;}
function nextRound(p,ms){const st=p.state;st.lock=true;st.rtok=(st.rtok||0)+1;const k=st.rtok;setTimeout(()=>{if(p.active&&!p.finished&&st.rtok===k)GAME.round(p);},ms);}
