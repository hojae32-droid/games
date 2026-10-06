/* 3~4학년 수학 · 곱셈 — 곱셈 부스터 레이싱
   디자인: 밤 서킷 레이싱. 곱셈을 빨리 맞히면 부스터가 켜지고, 틀리면 자동차가 고장 나요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#14182b';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M5 30h38l-3-10H30l-6-7h-9l-4 7H8z" fill="#e8412c" stroke="#14182b" stroke-width="3.2" stroke-linejoin="round"/><circle cx="14" cy="32" r="6" fill="#2b2f3a" stroke="#14182b" stroke-width="3"/><circle cx="35" cy="32" r="6" fill="#2b2f3a" stroke="#14182b" stroke-width="3"/><path d="M2 20h6M0 25h7" stroke="#facc15" stroke-width="3" stroke-linecap="round"/></svg>';
/*@@GEN@@*/
/*@@ART@@*/
const T_GO=650,T_BROKE=2000;
let ctx=null,CW=300,CH=150,G=null;
const SPARKC=['#FFD84D','#FF6B6B','#4D96FF','#6BCB77','#C77DFF','#FF9F45'];
function burst(P,x,y,s){for(let k=0;k<12;k++){const a=Math.random()*TAU,v=(70+Math.random()*100)*s;P.parts.push({type:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60*s,r:(3+Math.random()*2.5)*s,life:.8,age:0,col:SPARKC[k%SPARKC.length],rot:Math.random()*6});}}
function puff(P,x,y,s,n,type){for(let k=0;k<n;k++)P.parts.push({type:type||'dust',x:x+(Math.random()-.5)*8*s,y:y+(Math.random()-.5)*4*s,vx:(type==='smoke'?(Math.random()-.3)*18:-(20+Math.random()*30))*s,vy:-(type==='smoke'?28+Math.random()*22:4+Math.random()*10)*s,r:(type==='smoke'?5:2.5)*s,gr:(type==='smoke'?14:8)*s,life:type==='smoke'?1.1:.5,age:0});}
function carPt(P,L,pt){return[P.x+pt[0]*L.s,L.gy+pt[1]*L.s];}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const COL=['#F26B38','#2F80ED','#1E9E57','#9B51E0'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);ctx=g;
    K.vgrad(g,0,0,W,H,['#0b1030','#1d2a63','#3b2a6b']);K.stars(g,W,H*.6,T,40,5);
    const top=H*.66,gy=H*.92;g.fillStyle='#3a4050';g.fillRect(0,top,W,H-top);const cw=18,co=(T*300)%(cw*2);for(let x=-co;x<W;x+=cw*2){g.fillStyle='#E8412C';g.fillRect(x,top,cw,6);g.fillStyle='#fff';g.fillRect(x+cw,top,cw,6);}
    g.fillStyle='rgba(255,255,255,.5)';const dg=80,dof=(T*300)%dg;for(let x=-dof;x<W;x+=dg)g.fillRect(x,(top+H)/2,34,4);
    const count=W<460?2:W<640?3:4,gap=W/count,u=Math.min(1.4,gap/128,(H-top)/50);
    for(let i=0;i<count;i++){const boost=Math.floor(T/1.3)%count===i,x=gap*(i+.5)+Math.sin(T*1.4+i*1.7)*6+(boost?8:0);g.save();g.translate(x,gy);g.fillStyle='rgba(0,0,0,.25)';el(g,0,0,48*u,3*u);g.fill();
      drawCar(g,CAR_KEYS[i],u,{now:T*1000,wheel:T*14,num:i+1,face:boost?'happy':'normal',wind:true,flame:boost?26*u:0,tilt:boost?-.03:0},COL[i]);g.restore();}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'m02-multiply-racing',title:'곱셈 부스터 레이싱',title1:'밤 서킷 곱셈 대회',title2:'곱셈 부스터 레이싱',emoji:LOGO,
  subtitle:'3~4학년 · 곱셈',
  howto:'곱셈을 풀고 <b>확인</b>을 눌러요! <b>부스터 시간</b> 안에 맞히면 자동차가 슝~ 빨라져요. 틀리면 고장이 나서 잠깐 멈춰요. 한 문제에 제한 시간은 없으니 차근차근 풀어요. 3문제 연속 정답이면 보너스!',
  how:p=>({'3-1':'<b>(두 자리 수) × (한 자리 수)</b>','3-2':'<b>세 자리 × 한 자리</b>, 두 자리 × 두 자리','4-1':'<b>(세 자리 수) × (몇십), (두 자리 수)</b>','4-2':'3·4학년 곱셈 <b>총복습</b>'}[p.levelId]),
  theme:{c1:'#e8412c',c2:'#1d2a63'},hero:heroScene,vignette:.05,durs:[90,180,300],levelTitle:'몇 학년 몇 학기 문제를 풀까요?',
  txt:{who:'누가 달릴까요?',dur:'경주 시간',pace:'부스터 시간',seat:'번 레이서 ',go:'경주 시작!',s1:'1. 학기',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.keys(SEMESTERS).map(k=>({id:k,g:'3~4학년',t:SEMESTERS[k].label,d:SEMESTERS[k].desc})),
  summary:`<ul><li><b>(몇십) × (몇)</b>은 (몇 × 몇)을 먼저 구하고 뒤에 0을 붙여요 (30 × 4 = 120).</li>
    <li><b>(두 자리 수) × (한 자리 수)</b>는 일의 자리와 십의 자리를 따로 곱해서 더해요 (23 × 4 = 20 × 4 + 3 × 4 = 92).</li>
    <li><b>(몇) × (몇십)</b>은 먼저 몇 × 몇을 하고 10배 해요 (6 × 40 = 24 → 240).</li>
    <li>곱의 일의 자리가 0인 수는 뒤에 0을 붙여서 확인해 보면 쉬워요. 곱셈은 순서를 바꿔도 값이 같아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.3,pad=Math.max(8,u*.3),gap=Math.max(6,u*.2);const A=H-Z0-pad;const land=W>=H*1.2;const laneH=A*(land?.5:.4);
    const lane={x:0,y:Z0,w:W,h:laneH};let board,pr;
    if(land){const bw=W*.4;board={x:pad,y:Z0+laneH+gap,w:bw,h:A-laneH-gap};pr={x:pad*2+bw,y:board.y,w:W-bw-pad*3,h:board.h};}
    else{const bh=clamp(A*.15,u*2.2,u*4);board={x:pad,y:Z0+laneH+gap,w:W-pad*2,h:bh};pr={x:pad,y:board.y+bh+gap,w:W-pad*2,h:A-laneH-bh-gap*2};}
    return{W,H,u,Z0,pad,gap,land,lane,board,keys:MK.keys(pr,Math.max(5,u*.16))};},
  init(p){const st=p.state;const sem=SEMESTERS[p.levelId];
    Object.assign(st,{T:0,q:null,typed:'',boostT:sem.boostT/p.pace,fac:makeQuestionFactory(p.levelId,p.R.int(1,1e9)),msg:null,press:null,
      P:{kind:CAR_KEYS[p.i%4],color:p.color,spd:0,dist:0,bg:0,wheel:0,x:null,boostUntil:0,boostTier:0,boostVis:0,happyUntil:0,gaugeOut:false,puffAcc:0,smokeAcc:0,lineAcc:0,popups:[],parts:[],phase:'question',phaseStart:0}});
    MK.kb((pp,k)=>this.press(pp,k));p.ask('🏎️ 곱셈을 풀어 부스터를 켜요!','정답을 쓰고 <b>확인</b>을 눌러요');this.next(p);},
  next(p){const st=p.state,P=st.P;st.q=st.fac.next();st.typed='';st.msg=null;P.phase='question';P.phaseStart=st.T*1000;P.gaugeOut=false;},
  press(p,k){const st=p.state,P=st.P;if(!p.active||P.phase!=='question')return;
    if(k==='del')st.typed=st.typed.slice(0,-1);else if(k==='ok'){this.submit(p);return;}else{if(st.typed.length>=6)return;st.typed=st.typed==='0'?k:st.typed+k;}},
  setG(p){const G0=this.geo(p);CW=G0.W;CH=G0.lane.h;const skyH=CH*.3,h=CH-skyH,s=Math.min(2.1,h/70,CW/300);const base=Math.max(CW*.15,64+54*s);
    const L={top:skyH,h,gy:skyH+h*.84,s,base,range:0};G={n:1,boostT:p.state.boostT,skyH,lanes:[L],players:[p.state.P]};if(p.state.P.x===null)p.state.P.x=base;return L;},
  shown(q){return q.expr.replace('@',String(q.answer));},
  snd(p,n){const S=p.Snd;if(!S||!S.tone)return;if(n===2){S.tone(660,.1,'square',.05);S.tone(990,.12,'square',.05,.08);S.tone(1320,.25,'square',.05,.18);}else if(n===1){S.tone(660,.1,'square',.05);S.tone(990,.18,'square',.05,.08);}},
  submit(p){const st=p.state,P=st.P,q=st.q;if(st.typed==='')return;const now=st.T*1000,L=this.setG(p),G0=this.geo(p);const el_=(now-P.phaseStart)/1000;
    if(Number(st.typed)===q.answer){const tier=el_<=st.boostT*.5?2:el_<=st.boostT?1:0;const pts=scoreFor(el_,st.boostT,0);P.boostTier=tier;P.boostUntil=now+[700,1300,1900][tier];P.happyUntil=now+[900,1400,2000][tier];
      P.popups.push({t:'+'+(pts+(p.streak>=2?20:0)),c:p.color,t0:now,row:0});if(tier)P.popups.push({t:tier===2?'슈퍼 부스터!':'부스터!',c:'#E8412C',t0:now,row:1});
      st.msg={t:tier===2?'슈퍼 부스터! 🚀':tier===1?'정답! 부스터 ⚡':'정답! 🎉',ok:1,until:now+1200};this.snd(p,tier);
      const f=carPt(P,L,[40,-26]);burst(P,f[0],f[1],L.s);P.phase='go';P.phaseStart=now;p.hit(true,{pts,quiet:true});}
    else{P.boostUntil=0;st.msg={t:'고장! 정답은 '+q.answer,ok:0,until:now+2000};P.phase='broken';P.phaseStart=now;const h=carPt(P,L,HOOD[P.kind]);puff(P,h[0],h[1],L.s,5,'smoke');burst(P,h[0],h[1],L.s*.6);
      p.hit(false,{pen:0,review:this.shown(q),tip:'정답: '+this.shown(q),tipMs:2200});}},
  update(p,dt){const st=p.state,P=st.P;st.T+=dt;const now=st.T*1000;const L=this.setG(p);const s=L.s,C=CW*.28;let target=C;
    if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
    if(P.phase==='broken'){const f=(now-P.phaseStart)/T_BROKE;target=f<.85?0:C*.7;P.smokeAcc+=dt;if(f<.85&&P.smokeAcc>.12){P.smokeAcc=0;const h=carPt(P,L,HOOD[P.kind]);puff(P,h[0],h[1],s,1,'smoke');}if(f>=1)this.next(p);}
    else{if(now<P.boostUntil){const left=(P.boostUntil-now)/1000;target=C*(1+([.7,2,3.2][P.boostTier])*Math.min(1,left/.4));}
      if(P.phase==='question'){const f=(now-P.phaseStart)/1000/st.boostT;if(f>=1&&!P.gaugeOut){P.gaugeOut=true;st.msg={t:'천천히 정확하게 풀어요',ok:2,until:now+1e9};}}
      else if(P.phase==='go'&&now-P.phaseStart>=T_GO)this.next(p);}
    const k=P.phase==='broken'?7:(target>P.spd?4:2);P.spd+=(target-P.spd)*Math.min(1,dt*k);P.dist+=P.spd*dt;P.bg+=P.spd*dt;P.wheel+=P.spd*dt/(10*s);
    const bt=now<P.boostUntil&&P.boostTier>0?1:0;P.boostVis+=(bt-P.boostVis)*Math.min(1,dt*(bt?6:1.8));
    if(P.spd>5){P.puffAcc+=dt;if(P.puffAcc>(P.boostVis>.3?.06:.28)){P.puffAcc=0;const e=carPt(P,L,EXH[P.kind]);puff(P,e[0],e[1],s*.8,1);}}
    if(P.boostVis>.3){P.lineAcc+=dt;if(P.lineAcc>.035){P.lineAcc=0;P.parts.push({type:'line',x:CW+20,y:L.top+L.h*(.15+Math.random()*.7),vx:-CW*(2.2+Math.random()),vy:0,len:(40+Math.random()*80)*s,life:1,age:0});}}
    P.parts.forEach(q=>{q.age+=dt;q.x+=(q.type==='line'?q.vx:q.vx-P.spd*(q.type==='spark'?.3:1))*dt;q.y+=q.vy*dt;if(q.type==='spark')q.vy+=240*s*dt;if(q.gr)q.r+=q.gr*dt;});P.parts=P.parts.filter(q=>q.age<q.life&&q.x>-200);
    const tx=L.base+P.boostVis*36*s;P.x+=(tx-P.x)*Math.min(1,dt*2.2);},
  down(p,x,y){const st=p.state;if(!p.active)return;const G0=this.geo(p);const k=MK.hit(G0.keys,x,y);if(k){st.press={k,t:.12};p.Snd.tap&&p.Snd.tap();this.press(p,k);}},
  draw(p,g){const st=p.state,P=st.P;const G0=this.geo(p),W=G0.W,H=G0.H,u=G0.u;const now=st.T*1000;K.vgrad(g,0,0,W,H,['#161b3a','#0d1128']);
    const L=this.setG(p);ctx=g;const s=L.s;
    g.save();g.translate(0,G0.lane.y);g.beginPath();g.rect(0,0,W,G0.lane.h);g.clip();
    drawSky(P.bg,now);P.name='';drawLane(Object.assign({},P,{name:'',i:0}),L,0);
    drawParts(P,false);
    let face='normal',tilt=-.035*P.boostVis,shx=0,shy=0,fl=P.boostVis*(P.boostTier===2?34:22);
    if(P.phase==='broken'){const f=(now-P.phaseStart)/T_BROKE;face=f<.18?'shock':f<.75?'dizzy':'sad';if(f<.75){shx=(Math.random()-.5)*2.4*s;shy=(Math.random()-.5)*1.6*s;}tilt=f<.15?.05*Math.sin(f/.15*Math.PI):0;}else if(now<P.happyUntil)face='happy';
    const vib=P.spd>5?Math.sin(now/35)*.5*s:0;g.fillStyle='rgba(0,0,0,.25)';el(g,P.x+2*s,L.gy,50*s,3.2*s);g.fill();
    g.save();g.translate(P.x+shx,L.gy+shy+vib);drawCar(g,P.kind,s,{now,wheel:P.wheel,num:p.i+1,face,wind:P.spd>5,flame:fl,tilt},P.color);g.restore();
    if(P.phase==='broken'){const f=(now-P.phaseStart)/T_BROKE,a=f<.85?1:Math.max(0,1-(f-.85)/.15);g.globalAlpha=a;g.textAlign='center';g.textBaseline='middle';g.font=`${Math.round(22*s)}px sans-serif`;g.save();g.translate(P.x+4*s,L.gy-66*s);g.rotate(Math.sin(now/120)*.5);K.emo(g,'🔧',0,0,22*s);g.restore();g.globalAlpha=1;g.textBaseline='alphabetic';}
    drawParts(P,true);
    P.popups=P.popups.filter(o=>now-o.t0<1100);P.popups.forEach(o=>{const a=(now-o.t0)/1100,fsz=Math.min(38,14*s+8);g.globalAlpha=1-a*a;g.textAlign='left';g.font=K.font(fsz);const w=g.measureText(o.t).width;let px=P.x+64*s;if(px+w>CW-6)px=P.x-56*s-w;const y=L.top+L.h*.34+o.row*(fsz+2)-a*12*s;g.lineWidth=5;g.strokeStyle='#fff';g.lineJoin='round';g.strokeText(o.t,px,y);g.fillStyle=o.c;g.fillText(o.t,px,y);g.globalAlpha=1;});
    /* 거리 */
    K.card(g,u*.3,u*.25,u*4.4,u*.9,u*.45,'rgba(10,14,40,.7)',{blur:0,dy:0});K.txt(g,'🏁 '+Math.floor(P.dist/10)+' m',u*.3+u*2.2,u*.7,{size:u*.55,color:'#fde047',maxW:u*4});
    g.restore();
    /* 식 판 */
    const b=G0.board,q=st.q;K.card(g,b.x,b.y,b.w,b.h,u*.3,'#fff',{stroke:'#e8412c',lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#7f1d1d'});
    if(q&&P.phase==='question'){const f=clamp(1-(now-P.phaseStart)/1000/st.boostT,0,1);const bw=b.w-u*1.8,bh=Math.max(5,u*.18);K.txt(g,'⚡',b.x+u*.7,b.y+u*.37,{size:u*.5});K.rr(g,b.x+u*1.2,b.y+u*.28,bw,bh,bh/2);g.fillStyle='#e6e8f2';g.fill();K.rr(g,b.x+u*1.2,b.y+u*.28,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f<.3?'#ef4444':f<.6?'#f59e0b':'#22c55e';g.fill();}
    if(q){MK.expr(g,q.expr,st.typed,b.x+b.w/2,b.y+b.h*.57,b.w-u*.8,b.h*.5,Math.min(u*1.8,b.h*.5),INK,{box:'#fff1ec',boxBd:'#e8412c',boxInk:'#b91c1c',ph:'#e8412c'});}
    if(st.msg&&now<st.msg.until){K.txt(g,st.msg.t,b.x+b.w/2,b.y+b.h-Math.min(u*.5,b.h*.14),{size:Math.min(u*.5,b.h*.16),color:st.msg.ok===1?'#15803d':st.msg.ok===2?'#6b7280':'#dc2626',maxW:b.w*.9});}
    MK.draw(g,u,G0.keys,{face:'#fff',ink:INK,bd:'#14182b',delFace:'#fee2e2',okFace:'#e8412c',okInk:'#fff',sh:'#7f1d1d'},st.press,st.typed!=='');
  },
};
Engine.boot(GAME);
