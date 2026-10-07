/* 1~2학년 수학 · 시각과 시간 — 시계로 떠나는 하루 여행
   디자인: 하늘색이 아침에서 밤으로 바뀌는 하루. 시계를 읽고 바늘을 돌려 맞추면 하루가 한 칸씩 흘러가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b1d8a';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="25" r="18" fill="#fffbeb" stroke="#713f12" stroke-width="3.5"/><path d="M24 25V13M24 25l8 5" stroke="#3b1d8a" stroke-width="3.5" stroke-linecap="round"/><circle cx="24" cy="25" r="2.5" fill="#dc2626"/><circle cx="10" cy="8" r="5" fill="#f59e0b" stroke="#713f12" stroke-width="2.5"/><circle cx="38" cy="8" r="5" fill="#f59e0b" stroke="#713f12" stroke-width="2.5"/></svg>';
/*@@DATA@@*/
function fmt(h,m){return m===0?`${h}시`:`${h}시 ${m}분`;}
function dur(t){if(t<=0)return '0분';const h=Math.floor(t/60),m=t%60;return (h?h+'시간':'')+(h&&m?' ':'')+(m?m+'분':'');}
function skyColors(h){if(h<9)return['#fed7aa','#bae6fd'];if(h<17)return['#38bdf8','#e0f2fe'];if(h<19)return['#fb923c','#c084fc'];return['#1e1b4b','#4c1d95'];}
/* 보기 만들기: 정답 + 오답 중에서 n개 */
function mkOpts(R,ans,cands,n){const seen=new Set([ans]);const wrong=[];R.shuffle(cands).forEach(c=>{if(c==null||/NaN|-|undefined/.test(String(c))||seen.has(c))return;seen.add(c);wrong.push(c);});const pick=wrong.slice(0,n-1);return R.shuffle([ans,...pick]).map(t=>({t,ok:t===ans}));}
function clockFace(g,cx,cy,r,h,m,o){o=o||{};g.save();g.translate(cx,cy);const lw=r*.06;
  K.shadow(g,0,r*1.02,r*.8,r*.1,.2);
  g.beginPath();g.arc(0,0,r,0,TAU);g.fillStyle='#fffbeb';g.fill();g.lineWidth=lw;g.strokeStyle='#713f12';g.stroke();
  for(let k=0;k<60;k++){const a=k*6*Math.PI/180,r1=k%5?r*.9:r*.86;g.strokeStyle='#334155';g.lineWidth=k%5?Math.max(1,r*.015):r*.03;g.beginPath();g.moveTo(r1*Math.sin(a),-r1*Math.cos(a));g.lineTo(r*.94*Math.sin(a),-r*.94*Math.cos(a));g.stroke();}
  for(let k=1;k<=12;k++){const a=(k*30-90)*Math.PI/180;K.txt(g,String(k),r*.76*Math.cos(a),r*.76*Math.sin(a),{size:r*.23,color:'#1e1b4b'});}
  const H=((h%12)*60+m)/720*TAU,M=m/60*TAU;
  g.lineCap='round';g.strokeStyle='#1e1b4b';g.lineWidth=r*.08;g.beginPath();g.moveTo(0,0);g.lineTo(r*.5*Math.sin(H),-r*.5*Math.cos(H));g.stroke();
  g.strokeStyle='#dc2626';g.lineWidth=r*.05;g.beginPath();g.moveTo(0,0);g.lineTo(r*.8*Math.sin(M),-r*.8*Math.cos(M));g.stroke();
  if(o.knob){g.fillStyle='rgba(220,38,38,.35)';g.strokeStyle='#dc2626';g.lineWidth=2;g.beginPath();g.arc(r*.8*Math.sin(M),-r*.8*Math.cos(M),r*.13,0,TAU);g.fill();g.stroke();}
  g.fillStyle='#1e1b4b';g.beginPath();g.arc(0,0,r*.06,0,TAU);g.fill();g.restore();}
function daySky(g,x,y,w,h,hr,t){const c=skyColors(hr);const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,c[0]);gr.addColorStop(1,c[1]);g.fillStyle=gr;g.fillRect(x,y,w,h);
  if(hr>=20){g.fillStyle='#fff';for(let i=0;i<24;i++){const sx=x+((i*97)%100)/100*w,sy=y+((i*53)%60)/100*h;g.globalAlpha=.4+.5*Math.abs(Math.sin(t*1.5+i));g.beginPath();g.arc(sx,sy,1+(i%3)*.8,0,TAU);g.fill();}g.globalAlpha=1;}
  const sx=x+clamp((hr-6)/15*90+5,5,95)/100*w;const sy=y+(hr<20?60-Math.sin(clamp((hr-6)/13,0,1)*Math.PI)*45:18)/100*h*.9;K.glow(g,sx,sy,h*.35,hr>=19?'#c4b5fd':'#fde047',.5);K.emo(g,hr>=19?'🌙':'☀️',sx,sy,Math.min(h*.14,60));
  if(hr>=7&&hr<19)K.clouds(g,w,h,t*.6,.2,2,h*.2);
  g.fillStyle=hr>=19?'#14532d':'#86d98f';g.beginPath();g.ellipse(x+w*.5,y+h*1.02,w*.75,h*.2,0,0,TAU);g.fill();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const hr=6+((T*1.1)%16);daySky(g,0,0,W,H,hr,T);const wide=W>H*1.25;const r=Math.min(W*.2,H*.26,wide?H*.28:W*.22);const cx=W/2,cy=H*.64;const mm=((T*40)%60)|0;clockFace(g,cx,cy,r,Math.floor(hr),mm,{});
    ['🛏️','🍳','🎒','📚','🍽️','🌙'].forEach((e,i)=>{const a=(Math.sin(T*2+i)*.5);K.emo(g,e,W*(.1+i*.16),H*.9-Math.abs(a)*r*.2,Math.min(r*.5,H*.1));});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'g03-clock',title:'시계로 떠나는 하루 여행',title1:'하루가 흘러가요',title2:'시계로 떠나는 하루 여행',emoji:LOGO,
  subtitle:'1~2학년 · 시각과 시간',
  howto:'아침에 일어나서 밤에 잠들 때까지! 시계 바늘을 돌려 맞추거나 시계를 읽으면 하루가 한 칸씩 흘러가요. 하늘 색이 바뀌는 것도 보세요 🌅☀️🌙',
  how:p=>({'1-2':'<b>몇 시, 몇 시 30분</b>을 읽고 맞춰요','2-2a':'<b>몇 시 몇 분</b> (5분 단위)','2-2b':'<b>몇 시 몇 분</b> (1분 단위), 몇 시 몇 분 전','2-2c':'<b>1시간 = 60분</b>, 걸린 시간, 오전·오후'}[p.levelId]),
  theme:{c1:'#7c3aed',c2:'#f59e0b'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 시계를 볼까요?',
  txt:{who:'누가 시계 박사가 될까요?',dur:'여행 시간',pace:'한 문제 시간',seat:'번 여행자 ',go:'여행 출발!',s1:'1. 시계',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'1-2',g:'1~2학년',t:'1학년 2학기 · 몇 시, 몇 시 30분',d:'긴바늘이 12 또는 6'},{id:'2-2a',g:'1~2학년',t:'2학년 2학기 · 몇 시 몇 분 (5분)',d:'긴바늘 숫자 × 5'},{id:'2-2b',g:'1~2학년',t:'2학년 2학기 · 몇 시 몇 분 (1분)',d:'1분 단위 · 몇 시 몇 분 전'},{id:'2-2c',g:'1~2학년',t:'2학년 2학기 · 시간 알아보기',d:'1시간 = 60분 · 걸린 시간 · 오전/오후'}],
  summary:`<ul><li>시계의 <b>짧은바늘</b>은 몇 시, <b>긴바늘</b>은 몇 분을 가리켜요. 긴바늘이 12면 “몇 시”, 6이면 “몇 시 30분”이에요.</li>
    <li>긴바늘이 숫자 1 칸을 갈 때마다 <b>5분</b>이에요 (3 → 15분, 7 → 35분). 작은 눈금 한 칸은 1분이에요.</li>
    <li><b>1시간 = 60분</b>이에요. 걸린 시간은 끝나는 시각 − 시작한 시각으로 구해요.</li>
    <li>하루는 <b>오전</b>(밤 12시부터 낮 12시까지)과 <b>오후</b>(낮 12시부터 밤 12시까지)로 나뉘고, 하루는 24시간이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.9;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const q=p.state.q;
    const sh=A*(land?.66:.62);const sc={x:0,y:Z0,w:W,h:sh};const oy=Z0+sh+gap,oh=A-sh-gap;let rects=[],set=null;
    if(q&&q.ty==='set'){const bh=Math.min(oh,u*2.6);const y=oy+(oh-bh)/2;const w=W-pad*2-gap*2;set={m:{x:pad,y,w:w*.24,h:bh},p:{x:pad+w*.24+gap,y,w:w*.24,h:bh},ok:{x:pad+w*.48+gap*2,y,w:w*.52,h:bh}};}
    else if(q&&q.opts){const n=q.opts.length;const cw=(W-pad*2-gap*(n-1))/n,ch=Math.min(oh,u*3.4);for(let i=0;i<n;i++)rects.push({x:pad+i*(cw+gap),y:oy+(oh-ch)/2,w:cw,h:ch});}
    /* 시계 위치 */
    const two=q&&q.ty==='dur';const top=sc.y+u*2.5;const ch2=sc.y+sc.h-top-u*.4;const r=Math.min(ch2*.5,two?sc.w*.2:sc.w*(land?.22:.34));const clocks=two?[{x:sc.w*.28,y:top+ch2*.5},{x:sc.w*.72,y:top+ch2*.5}]:[{x:sc.w*(land?.5:.55),y:top+ch2*.5}];
    return{W,H,u,Z0,land,pad,gap,sc,rects,set,r,clocks};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,done:[],lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,t:0,drag:false,hop:0});this.newQ(p);},
  make(p,L){const R=p.R,st=p.state,q={};const ev=DAY[(st.n)%DAY.length];q.ev=ev;const step=L==='1-2'?30:(L==='2-2a'?5:1);const h12=ev.h%12||12;
    const rt=()=>{const mm=step===30?R.pick([0,30]):R.int(0,59/step|0)*step;return[h12,mm];};
    let ty;if(L==='2-2c')ty=R.pick(['dur','conv','ampm','dur']);else if(L==='2-2b')ty=R.pick(['set','read','before','read']);else ty=R.pick(['set','read']);q.ty=ty;q.step=step;
    if(ty==='set'||ty==='read'){const[hh,mm]=rt();q.h=hh;q.m=mm;q.reveal=fmt(hh,mm);
      if(ty==='set'){q.text=`${ev.t} 시각은 <b>${fmt(hh,mm)}</b>! 시계를 맞춰요`;q.speak=`${ev.t} 시각은 ${fmt(hh,mm)}. 시계를 맞춰요`;let s;do{s=R.int(0,719);s=Math.round(s/step)*step;}while(s%720===((hh%12)*60+mm)%720);q.start=s;q.target=((hh%12)*60+mm)%720;}
      else{q.text=`${ev.t}! 지금 몇 시일까요?`;const c=[];c.push(fmt(hh===12?1:hh+1,mm));c.push(fmt(hh===1?12:hh-1,mm));if(mm%5===0&&mm>0&&mm/5<=12)c.push(fmt(hh,mm/5));c.push(fmt(hh,(mm+30)%60));if(mm>=5)c.push(fmt(hh,mm-(step===1?1:5)));c.push(fmt(mm/5|0||12,hh*5%60));q.opts=mkOpts(R,fmt(hh,mm),c,3);}}
    else if(ty==='before'){const hh=h12===1?12:h12-1;const mm=R.int(50,58);q.h=hh;q.m=mm;const nh=h12;q.text=`${ev.t}! 지금은 <b>${nh}시 □분 전</b>`;q.reveal=`${nh}시 ${60-mm}분 전`;q.opts=mkOpts(R,`${nh}시 ${60-mm}분 전`,[`${nh}시 ${mm}분 전`,`${hh}시 ${60-mm}분 전`,`${nh}시 ${60-mm+1}분 전`,`${nh}시 ${60-mm-1}분 전`],3);}
    else if(ty==='dur'){const sm=R.int(0,5)*5;const dm=R.pick([30,40,50,60,70,80,90,100,110,120]);const e=h12*60+sm+dm;q.h=h12;q.m=sm;q.h2=Math.floor(e/60)%12||12;q.m2=e%60;q.text=`${ev.ic} <b>${ev.a}</b>! 시작부터 끝까지 <b>걸린 시간</b>은?`;q.reveal=dur(dm);q.opts=mkOpts(R,dur(dm),[dur(dm+10),dur(dm-10),dur(dm+60),dm>60?dur(dm-60):dur(dm+20),`${dm}시간`],3);}
    else if(ty==='conv'){const hh=R.int(1,2),mm=R.int(1,5)*10;const t=hh*60+mm;q.h=h12;q.m=0;q.text=`${ev.ic} ${J(ev.a,'을')} <b>${dur(t)}</b> 동안 했어요. 몇 분일까요?`;q.reveal=t+'분';q.opts=mkOpts(R,t+'분',[(hh*100+mm)+'분',(hh*10+mm)+'분',(t+10)+'분',(t-10)+'분'],3);}
    else{const word=ev.h<12?'오전':'오후';q.h=h12;q.m=0;q.text=`${ev.t} 시각 <b>${h12}시</b>는 오전일까요, 오후일까요?`;q.reveal=word+' '+h12+'시';q.opts=[{t:'☀️ 오전',ok:word==='오전'},{t:'🌇 오후',ok:word==='오후'}];}
    if(q.opts)q.okIdx=q.opts.findIndex(o=>o.ok);else q.okIdx=0;q.review=strip(q.text)+' → '+q.reveal;if(!q.speak)q.speak=strip(q.text);return q;},
  qtime(q){return {set:40,read:20,before:24,dur:30,conv:26,ampm:14}[q.ty];},askHtml(q){return '🕰️ '+q.text;},askSub(q){return q.ty==='set'?'긴바늘을 돌려서 시각을 맞추고 ⏰ 눌러요':'알맞은 것을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답: '+q.reveal;},
  onNew(p,q){const st=p.state;st.t=q.ty==='set'?q.start:0;st.drag=false;},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.done.push(q.ev.t);st.hop=0;}else if(q.ty==='set')st.t=q.target;},
  upd(p,dt){const st=p.state;if(st.res==='ok')st.hop+=dt;},
  submit(p){const st=p.state,q=st.q;const t=((st.t%720)+720)%720;this.verdict(p,t===q.target?0:1,false);},
  clockAngle(p,x,y){const G=this.geo(p);const c=G.clocks[0];let a=Math.atan2(x-c.x,-(y-c.y))*180/Math.PI;if(a<0)a+=360;return a;},
  dragTo(p,x,y){const st=p.state,q=st.q;let nm=Math.round(this.clockAngle(p,x,y)/6/q.step)*q.step%60;const om=((st.t%60)+60)%60;let d=nm-om;if(d<-30)d+=60;if(d>30)d-=60;if(d){st.t+=d;p.Snd.tone&&p.Snd.tone(1200,.02,'sine',.03);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(q.ty==='set'){const S=G.set;if(K.inRect(x,y,S.m)){st.t-=60;p.Snd.tap&&p.Snd.tap();return;}if(K.inRect(x,y,S.p)){st.t+=60;p.Snd.tap&&p.Snd.tap();return;}if(K.inRect(x,y,S.ok)){this.submit(p);return;}
      const c=G.clocks[0];if(Math.hypot(x-c.x,y-c.y)<G.r*1.15){st.drag=true;this.dragTo(p,x,y);}return;}
    const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  move(p,x,y,down){const st=p.state;if(st.drag&&down&&!st.lock&&st.q.ty==='set')this.dragTo(p,x,y);},
  up(p){p.state.drag=false;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();let r;if(q.ty==='set'){st.t=q.target;r=G.set.ok;}else r=G.rects[q.okIdx];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;const ev=q.ev,sc=G.sc;K.vgrad(g,0,0,W,H,['#ede9fe','#fde68a']);daySky(g,sc.x,sc.y,sc.w,sc.h,ev.h,t);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#7c3aed'});}
    /* 하루 길 */
    const tl=DAY.length,tw=Math.min(sc.w-G.pad*2,u*1.0*tl),ts=tw/tl;DAY.forEach((d,i)=>{const x=W/2-tw/2+i*ts+ts/2;const done=st.done.includes(d.t),now=d===ev;g.save();g.globalAlpha=done?1:now?1:.45;if(now){K.card(g,x-ts*.5,sc.y+u*.05,ts,ts*1.05,ts*.3,'rgba(255,255,255,.85)',{blur:0,dy:0});}K.emo(g,d.ic,x,sc.y+ts*.55,ts*.72);if(done)K.txt(g,'✓',x+ts*.3,sc.y+ts*.95,{size:ts*.5,color:'#16a34a',stroke:'#fff'});g.restore();});
    /* 장면 이름 */
    const pw=Math.min(sc.w*.8,u*11);K.card(g,W/2-pw/2,sc.y+u*1.3,pw,u*.95,u*.45,'rgba(255,255,255,.92)',{stroke:INK,lw:2.5,blur:0,dy:3,sc:INK});K.txt(g,ev.ic+' '+ev.t,W/2,sc.y+u*1.78,{size:u*.62,color:INK,maxW:pw*.9});
    /* 시계 */
    const r=G.r;if(q.ty==='dur'){clockFace(g,G.clocks[0].x,G.clocks[0].y,r,q.h,q.m,{});clockFace(g,G.clocks[1].x,G.clocks[1].y,r,q.h2,q.m2,{});K.txt(g,'시작',G.clocks[0].x,G.clocks[0].y-r-u*.3,{size:u*.55,color:INK,stroke:'#fff'});K.txt(g,'끝',G.clocks[1].x,G.clocks[1].y-r-u*.3,{size:u*.55,color:INK,stroke:'#fff'});K.txt(g,'➜',W/2,G.clocks[0].y,{size:u*.9,color:'#fff',stroke:INK});}
    else if(q.ty==='set'){const tt=((st.t%720)+720)%720;clockFace(g,G.clocks[0].x,G.clocks[0].y,r,Math.floor(tt/60),tt%60,{knob:true});if(st.res==='bad')K.txt(g,'정답 '+q.reveal,G.clocks[0].x,G.clocks[0].y+r+u*.4,{size:u*.6,color:'#fff',stroke:INK,maxW:sc.w*.8});}
    else clockFace(g,G.clocks[0].x,G.clocks[0].y,r,q.h,q.m,{});
    /* 아이 */
    const kx=G.land?G.clocks[0].x-r-u*2:sc.x+u*1.4,ky=sc.y+sc.h-u*.9-(st.res==='ok'?Math.abs(Math.sin(st.hop*9))*u*.6*Math.max(0,1-st.hop/1.2):0);K.emo(g,st.res==='bad'?'😵':st.res==='ok'?'🥳':'🧒',kx,ky,u*1.7);
    /* 아래 단추 */
    if(q.ty==='set'){const S=G.set;[[S.m,'◀ 1시간','#fff'],[S.p,'1시간 ▶','#fff'],[S.ok,'⏰ 다 맞췄어요!',st.lock?'#cbd5e1':'#a78bfa']].forEach(([r2,tx,c],i)=>{K.card(g,r2.x,r2.y,r2.w,r2.h,r2.h*.4,c,{stroke:INK,lw:3,blur:0,dy:u*.08,sc:INK});K.txt(g,tx,r2.x+r2.w/2,r2.y+r2.h/2,{size:Math.min(r2.h*.42,u*1.1),color:i===2&&!st.lock?'#fff':INK,maxW:r2.w*.9});});}
    else G.rects.forEach((r2,i)=>{const isAns=i===q.okIdx,picked=st.pick===i;let s2='idle';if(st.lock){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}const o=q.opts[i];const m=o.t.match(/^(☀️|🌇)\s*/);QK.card(g,u,r2,m?o.t.slice(m[0].length):o.t,s2,{fill:['#fef9c3','#e0e7ff','#fce7f3'][i%3],bd:INK,ink:INK,blur:0,left:m?u*1.2:0});if(m)K.emo(g,m[1],r2.x+u*.9,r2.y+r2.h/2,Math.min(u*1.1,r2.h*.5));});
  },
};
QZ.mix(GAME,{say:true,pts0:60,pts1:60,okMs:1400,badMs:2800});
Engine.boot(GAME);
