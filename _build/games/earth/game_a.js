/* 6학년 과학 · 지구의 운동 — 지구 돌리기 (종이 오려 붙인 우주 그림책)
   굵은 윤곽선 + 납작한 색 + 딱딱한 그림자. 지구를 직접 돌리고(자전), 궤도를 따라 옮기며(공전) 관측해요.
   맞힐 때마다 아래 '한 해 보드게임 길'에서 지구 말이 한 칸씩 앞으로 가요. */
const TAU=Math.PI*2,PI=Math.PI;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const easeOut=t=>1-Math.pow(1-clamp(t,0,1),3);
const easeIO=t=>{t=clamp(t,0,1);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};
const hash=n=>{n=Math.imul(n^(n>>>16),0x45d9f3b);n=Math.imul(n^(n>>>15),0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296;};
const plain=s=>String(s).replace(/<[^>]+>/g,'');
const angd=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const nearA=(a,b,tol)=>Math.abs(angd(a,b))<tol;
const INK='#1d1a4a',CREAM='#fff3d6',SUN='#ffc933',CORAL='#ff6b57',SKY='#8fd0ff',NIGHT='#2d2a8c',NIGHT2='#221f6e',OCEAN='#46a7ff',LAND='#5fd46c';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="#46a7ff" stroke="#1d1a4a" stroke-width="3"/><path d="M14 17c3-4 9-4 11 0s0 6-3 6-3 5-7 3-3-6-1-9z" fill="#5fd46c" stroke="#1d1a4a" stroke-width="2"/><path d="M29 27c4 0 6 3 4 6s-5 2-6 0 0-6 2-6z" fill="#5fd46c" stroke="#1d1a4a" stroke-width="2"/><ellipse cx="24" cy="24" rx="22" ry="7" transform="rotate(-24 24 24)" fill="none" stroke="#ff6b57" stroke-width="3.2"/><circle cx="41" cy="12" r="4.5" fill="#ffc933" stroke="#1d1a4a" stroke-width="2.4"/></svg>';

/* ───────── 때(시각) ↔ 지구 위 우리나라의 위치 ───────── */
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
const CONS=[
  {id:'leo',n:'사자자리',season:'봄',a:-PI/2},{id:'cyg',n:'백조자리',season:'여름',a:-PI},{id:'peg',n:'페가수스자리',season:'가을',a:PI/2},{id:'ori',n:'오리온자리',season:'겨울',a:0},
];
const SEASONC={'봄':'#ff9ac9','여름':'#5fd46c','가을':'#ffa940','겨울':'#8fd0ff'};
const CPAT={
  leo:{s:[[-.85,.55],[-.7,.15],[-.55,-.3],[-.3,-.62],[-.02,-.52],[.18,-.12],[.62,-.28],[.9,.12],[.3,.35]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,5]]},
  cyg:{s:[[0,-.92],[0,-.4],[0,.05],[0,.9],[-.82,-.08],[.82,-.08]],l:[[0,1],[1,2],[2,3],[4,2],[2,5]]},
  peg:{s:[[-.45,-.45],[.4,-.5],[.5,.35],[-.45,.4],[.88,.62],[-.9,.7],[.1,-.9]],l:[[0,1],[1,2],[2,3],[3,0],[2,4],[3,5],[1,6]]},
  ori:{s:[[-.55,-.85],[.55,-.78],[-.2,0],[0,.02],[.2,.04],[-.5,.88],[.5,.82],[0,-.95]],l:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]]},
};
/* ───────── 납작한 그림 도구 ───────── */
const lw0=u=>Math.max(2,u);
function sparkle(g,x,y,r,col){g.save();g.fillStyle=col||'#fff6c0';g.beginPath();g.moveTo(x,y-r);g.quadraticCurveTo(x,y,x+r,y);g.quadraticCurveTo(x,y,x,y+r);g.quadraticCurveTo(x,y,x-r,y);g.quadraticCurveTo(x,y,x,y-r);g.fill();g.restore();}
function stk(g,x,y,w,h,r,fill,sh){g.save();K.rr(g,x,y+(sh==null?5:sh),w,h,r);g.fillStyle=INK;g.fill();K.rr(g,x,y,w,h,r);g.fillStyle=fill||'#fff';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();g.restore();}
function pill(g,str,cx,cy,size,bg,fg,maxW){g.save();g.font=K.font(size);let w=Math.min(maxW||1e9,g.measureText(str).width+size*1.1);const h=size*1.55;K.rr(g,cx-w/2,cy-h/2,w,h,h/2);g.fillStyle=bg||'#fff';g.fill();g.lineWidth=Math.max(2,size*.1);g.strokeStyle=INK;g.stroke();g.restore();K.txt(g,str,cx,cy+size*.04,{size,color:fg||INK,maxW:w-size*.6});}
function drawConst(g,id,cx,cy,s,alpha,T,hi){const P=CPAT[id];g.save();g.globalAlpha=alpha;
  g.strokeStyle=hi?'#ffe27a':'#ffffff';g.lineWidth=Math.max(2,s*.045);g.lineCap='round';g.beginPath();
  P.l.forEach(([a,b])=>{g.moveTo(cx+P.s[a][0]*s,cy+P.s[a][1]*s);g.lineTo(cx+P.s[b][0]*s,cy+P.s[b][1]*s);});g.stroke();
  P.s.forEach((q,i)=>{const r=Math.max(2.4,s*(i<2?.1:.075))*(.9+.1*Math.sin((T||0)*3+i*2));g.fillStyle='#ffd84a';g.strokeStyle=INK;g.lineWidth=Math.max(1.5,r*.35);g.beginPath();g.arc(cx+q[0]*s,cy+q[1]*s,r,0,TAU);g.fill();g.stroke();});g.restore();}

/* 지구 (북극 위에서 본 모습). rot: 땅이 돌아간 각도, night: 밤 쪽 방향 */
function globe(g,x,y,R,rot,night){
  const lw=Math.max(2.5,R*.07);g.save();
  g.fillStyle=OCEAN;g.beginPath();g.arc(x,y,R,0,TAU);g.fill();
  g.save();g.beginPath();g.arc(x,y,R,0,TAU);g.clip();g.translate(x,y);g.rotate(rot);
  g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=Math.max(1.2,R*.02);for(const k of [.5,.87]){g.beginPath();g.arc(0,0,R*k,0,TAU);g.stroke();}
  g.beginPath();for(let i=0;i<12;i++){const a=i*PI/6;g.moveTo(0,0);g.lineTo(Math.cos(a)*R,Math.sin(a)*R);}g.stroke();
  const land=[[.55,.1,.4,.26,.3],[.22,-.62,.3,.18,.9],[-.3,-.52,.3,.2,-.4],[-.62,.12,.28,.34,.2],[-.2,.58,.3,.2,.5],[.12,.2,.2,.14,.1]];
  g.fillStyle=LAND;g.strokeStyle=INK;g.lineWidth=Math.max(1.6,R*.035);
  land.forEach(([a,b,rx,ry,t])=>{g.beginPath();g.ellipse(a*R,b*R,rx*R,ry*R,t,0,TAU);g.fill();g.stroke();});
  g.fillStyle='#fff';g.beginPath();g.arc(0,0,R*.15,0,TAU);g.fill();g.stroke();
  g.restore();
  if(night!=null){g.save();g.beginPath();g.arc(x,y,R,0,TAU);g.clip();g.translate(x,y);g.rotate(night);g.fillStyle='rgba(29,26,74,.58)';g.fillRect(0,-R,R*1.1,R*2);
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=Math.max(1.5,R*.03);g.setLineDash([R*.1,R*.1]);g.beginPath();g.moveTo(0,-R);g.lineTo(0,R);g.stroke();g.restore();}
  g.strokeStyle=INK;g.lineWidth=lw;g.beginPath();g.arc(x,y,R,0,TAU);g.stroke();
  g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=Math.max(2,R*.06);g.lineCap='round';g.beginPath();g.arc(x,y,R*.78,PI*1.15,PI*1.45);g.stroke();g.restore();}
/* 핀 */
function pin(g,x,y,s,col,label){g.save();g.fillStyle='rgba(29,26,74,.35)';g.beginPath();g.ellipse(x,y+s*.04,s*.34,s*.1,0,0,TAU);g.fill();g.translate(x,y);
  g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.12);g.lineJoin='round';g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-s*.62,-s*.6,-s*.52,-s*1.28,0,-s*1.28);g.bezierCurveTo(s*.52,-s*1.28,s*.62,-s*.6,0,0);g.fill();g.stroke();
  g.fillStyle='#fff';g.beginPath();g.arc(0,-s*.84,s*.2,0,TAU);g.fill();g.stroke();g.restore();
  if(label)pill(g,label,x,y-s*1.78,s*.42,'#fff',INK,s*3.6);}
/* 웃는 해 */
function sunFace(g,x,y,r,T,mood){g.save();g.translate(x,y);
  g.rotate(T*.25);g.fillStyle='#ff9f1a';g.strokeStyle=INK;g.lineWidth=Math.max(2,r*.07);g.lineJoin='round';
  for(let i=0;i<12;i++){g.save();g.rotate(i*TAU/12);g.beginPath();g.moveTo(-r*.2,-r*1.02);g.lineTo(0,-r*1.5);g.lineTo(r*.2,-r*1.02);g.closePath();g.fill();g.stroke();g.restore();}
  g.rotate(-T*.25);g.fillStyle=SUN;g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;g.beginPath();g.ellipse(-r*.32,-r*.12,r*.08,r*.12,0,0,TAU);g.ellipse(r*.32,-r*.12,r*.08,r*.12,0,0,TAU);g.fill();
  g.fillStyle='rgba(255,107,87,.55)';g.beginPath();g.arc(-r*.52,r*.16,r*.13,0,TAU);g.arc(r*.52,r*.16,r*.13,0,TAU);g.fill();
  g.strokeStyle=INK;g.lineWidth=Math.max(2,r*.07);g.lineCap='round';g.beginPath();g.arc(0,r*.08,r*.3,.15*PI,.85*PI);g.stroke();g.restore();}

/* 우리나라에서 본 하늘 (남쪽을 보고 서 있어요) */
function skyView(g,x,y,w,h,t,T,o={}){
  const alt=Math.sin((t-6)/12*PI),day=clamp((alt+.1)/.35,0,1);
  const f=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];
  const mix=(a,b,k)=>{const A=f(a),B=f(b);const hh=v=>('0'+Math.round(v).toString(16)).slice(-2);return'#'+hh(lerp(A[0],B[0],k))+hh(lerp(A[1],B[1],k))+hh(lerp(A[2],B[2],k));};
  const dusk=clamp(1-Math.abs(alt)/.28,0,1)*(alt>-.22?1:0);
  const sky=alt<=-.15?'#241f78':alt<.08?mix('#241f78','#ff9a62',(alt+.15)/.23):mix('#ff9a62','#8fd0ff',clamp((alt-.08)/.3,0,1));
  const r=Math.min(w,h)*.07;g.save();
  K.rr(g,x,y+6,w,h,r);g.fillStyle=INK;g.fill();
  K.rr(g,x,y,w,h,r);g.save();g.clip();g.fillStyle=sky;g.fillRect(x,y,w,h);
  const hz=y+h*.78;
  if(day<.9){let a=11;const rn=()=>{a=(a*16807)%2147483647;return a/2147483647;};for(let i=0;i<22;i++){const sx=x+rn()*w,sy=y+rn()*(hz-y)*.9;sparkle(g,sx,sy,2.5+rn()*4,`rgba(255,246,192,${(1-day)*(.55+.45*Math.sin(T*2+i))})`);}}
  if(alt>-.2){const u=(t-6)/12;const sx=x+lerp(w*.1,w*.9,u),sy=hz-Math.max(-.05,alt)*(hz-y)*.82,sr=Math.min(w,h)*.085;
    g.fillStyle=dusk>.25?'#ff9a4a':SUN;g.strokeStyle=INK;g.lineWidth=Math.max(2.5,sr*.14);g.beginPath();g.arc(sx,sy,sr,0,TAU);g.fill();g.stroke();
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=Math.max(2,sr*.12);g.beginPath();g.arc(sx,sy,sr*1.4,0,TAU);g.stroke();}
  else{const mx=x+w*.78,my=y+h*.2,mr=Math.min(w,h)*.07;g.fillStyle='#fff6d6';g.strokeStyle=INK;g.lineWidth=Math.max(2.5,mr*.14);g.beginPath();g.arc(mx,my,mr,0,TAU);g.fill();g.stroke();g.fillStyle=sky;g.beginPath();g.arc(mx+mr*.5,my-mr*.15,mr*.82,0,TAU);g.fill();}
  const ink=Math.max(2.5,h*.012);
  g.fillStyle=mix('#1f6f4a','#5fd46c',day);g.strokeStyle=INK;g.lineWidth=ink;g.beginPath();g.moveTo(x-5,hz+h*.03);g.quadraticCurveTo(x+w*.25,hz-h*.1,x+w*.5,hz+h*.02);g.quadraticCurveTo(x+w*.78,hz-h*.08,x+w+5,hz+h*.03);g.lineTo(x+w+5,y+h+5);g.lineTo(x-5,y+h+5);g.closePath();g.fill();g.stroke();
  const hx=x+w*.13,hy=hz+h*.1,hs=h*.085;g.fillStyle=mix('#7a4a30','#ffe0a0',day);g.fillRect(hx,hy-hs,hs*1.5,hs);g.strokeRect(hx,hy-hs,hs*1.5,hs);
  g.fillStyle=CORAL;g.beginPath();g.moveTo(hx-hs*.2,hy-hs);g.lineTo(hx+hs*.75,hy-hs*1.7);g.lineTo(hx+hs*1.7,hy-hs);g.closePath();g.fill();g.stroke();
  g.fillStyle=day<.6?'#ffe28a':'#8fd0ff';g.fillRect(hx+hs*.5,hy-hs*.75,hs*.5,hs*.45);g.strokeRect(hx+hs*.5,hy-hs*.75,hs*.5,hs*.45);
  const fs=Math.max(11,Math.min(w*.07,h*.07));[['동',.1],['남',.5],['서',.9]].forEach(([s,u])=>pill(g,s,x+w*u,y+h-fs*1.1,fs*.85,'#fff',INK));
  if(o.drawFn)o.drawFn(g,x,y,w,h,hz);g.restore();
  K.rr(g,x,y,w,h,r);g.lineWidth=5;g.strokeStyle=o.edge||INK;g.stroke();g.restore();}

/* 설정 화면 위쪽 그림: 웃는 해 둘레를 도는 지구와 별자리 배지 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000||0);last=now;T+=dt;size();
    g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    g.fillStyle=NIGHT;g.fillRect(0,0,W,H);
    /* 큰 장식 동그라미 + 반짝이 */
    g.fillStyle=NIGHT2;[[.08,.9,.2],[.62,.1,.14],[.45,.95,.1]].forEach(([a,b,c])=>{g.beginPath();g.arc(W*a,H*b,H*c,0,TAU);g.fill();});
    for(let i=0;i<46;i++){sparkle(g,hash(i*3+1)*W,hash(i*7+2)*H,2+hash(i)*4,`rgba(255,246,192,${.35+.55*Math.abs(Math.sin(T*1.6+i))})`);}
    const narrow=W<860;const s=narrow?Math.min(W*.17,H*.16):Math.min(W*.1,H*.25);
    const sx=narrow?W*.5:W*.26,sy=narrow?H*.68:H*.5,rx=s*1.5*(narrow?1.4:1.15),ry=s*1.05;
    /* 궤도 */
    g.save();g.strokeStyle='#fff';g.lineWidth=3.5;g.setLineDash([10,12]);g.lineDashOffset=-T*12;g.beginPath();g.ellipse(sx,sy,rx,ry,0,0,TAU);g.stroke();g.restore();
    /* 별자리 배지 */
    CONS.forEach((c,i)=>{const a=-PI/2-i*PI/2;const br=s*.6;const x=sx+Math.cos(a)*rx*1.5,y=sy+Math.sin(a)*Math.min(ry*1.5,H*.5-br*1.15);if(x<-br||x>W+br)return;
      g.fillStyle=NIGHT2;g.strokeStyle='#fff';g.lineWidth=3.5;g.beginPath();g.arc(x,y,br,0,TAU);g.fill();g.stroke();drawConst(g,c.id,x,y,br*.62,1,T);});
    sunFace(g,sx,sy,s*.8,T);
    const ea=-T*.4;const ex=sx+Math.cos(ea)*rx,ey=sy+Math.sin(ea)*ry;globe(g,ex,ey,s*.36,T*1.5,ea);
    };
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}

/* ───────── 공통: 화면 영역과 배경, '한 해 보드게임 길' ───────── */
const stripH=p=>clamp(p.H*.115,46,84);
const areaOf=p=>({x:0,y:0,w:p.W,h:p.H-stripH(p)});
const seasonOf=m=>m>=2&&m<=4?'봄':m>=5&&m<=7?'여름':m>=8&&m<=10?'가을':'겨울';
function bgScene(p,g,dt){const st=p.state,W=p.W,H=p.H,sh=stripH(p);
  st.T=(st.T||0)+dt;st.pulse=Math.max(0,(st.pulse||0)-dt*1.6);
  st.mo=lerp(st.mo==null?0:st.mo,p.correct,Math.min(1,dt*4));
  g.fillStyle=NIGHT;g.fillRect(0,0,W,H);
  g.fillStyle=NIGHT2;[[.1,.2,.16],[.9,.7,.2],[.55,.5,.1]].forEach(([a,b,c])=>{g.beginPath();g.arc(W*a,(H-sh)*b,Math.min(W,H)*c,0,TAU);g.fill();});
  for(let i=0;i<Math.round(W/16);i++){sparkle(g,hash(i*5+p.i)*W,hash(i*11+3)*(H-sh),1.8+hash(i*13)*3.4,`rgba(255,246,192,${.3+.6*Math.abs(Math.sin(st.T*1.5+i))})`);}
  /* 한 해 보드게임 길 */
  const y0=H-sh;g.fillStyle=CREAM;g.fillRect(0,y0,W,sh);g.fillStyle=INK;g.fillRect(0,y0,W,4);
  const pad=Math.max(10,W*.03),flag=Math.min(sh*.7,40);const tx0=pad+flag+6,tx1=W-pad;const n=12,gap=Math.max(2,sh*.05);
  const tw=Math.min(sh*.62,(tx1-tx0-gap*(n-1))/n);const ty=y0+sh*.5-tw/2+1;const stepX=(tx1-tx0-tw)/(n-1);
  const mm=st.mo,idx=((mm%12)+12)%12;
  /* 출발선 (해) */
  g.save();g.translate(pad+flag/2,y0+sh*.5);sunFace(g,0,0,flag*.36,st.T);g.restore();
  for(let m=0;m<n;m++){const x=tx0+m*stepX,done=m<=Math.floor(idx+.001)&&(p.correct>0||m===0);
    K.rr(g,x,ty+3,tw,tw,tw*.22);g.fillStyle=INK;g.fill();K.rr(g,x,ty,tw,tw,tw*.22);g.fillStyle=SEASONC[seasonOf(m)];g.fill();if(!done){g.fillStyle='rgba(255,243,214,.62)';g.fill();}g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();
    K.txt(g,String(m+1),x+tw/2,ty+tw/2+1,{size:tw*.5,color:INK});}
  /* 지구 말 */
  const ex=tx0+idx*stepX+tw/2,hop=Math.abs(Math.sin((idx%1)*PI))*tw*.5+st.pulse*tw*.2;globe(g,ex,ty-tw*.18-hop,tw*.42,st.T*2,null);
  const yr=Math.floor(mm/12);if(yr>=1)pill(g,`${yr+1}바퀴째`,W-pad-30,y0-12,clamp(sh*.2,11,15),SUN,INK);}
const intro=p=>easeOut(((p.state.T||0)-(p.state.t0||0))/.45);
function goodHit(p,pts,x,y,tip,extra){const r=p.hit(true,Object.assign({pts,x,y,tip,tipMs:2600,color:SUN},extra||{}));p.state.pulse=1;return r;}
function nextRound(p,ms){const st=p.state;st.lock=true;st.rtok=(st.rtok||0)+1;const k=st.rtok;setTimeout(()=>{if(p.active&&!p.finished&&st.rtok===k)GAME.round(p);},ms);}
