/* 3~4학년 수학 · 나눗셈 — 나눗셈 배달 트럭
   디자인: 종이 상자(택배) 갈색 동네. 나눗셈을 맞히면 집집마다 택배가 도착하고, 빨리 맞히면 드론이 도와줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2e2a';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="14" width="28" height="22" rx="3" fill="#d9a066" stroke="#3b2e2a" stroke-width="3.2"/><path d="M32 22h8l5 7v7H32z" fill="#5c7cfa" stroke="#3b2e2a" stroke-width="3.2" stroke-linejoin="round"/><circle cx="13" cy="38" r="5" fill="#2b2f3a" stroke="#3b2e2a" stroke-width="3"/><circle cx="37" cy="38" r="5" fill="#2b2f3a" stroke="#3b2e2a" stroke-width="3"/><path d="M18 14v22" stroke="#f3d9a4" stroke-width="4"/></svg>';
/*@@GEN@@*/
/*@@ART@@*/
const T_GO=650,T_BROKE=2000;
let ctx=null,CW=300,CH=150,G=null;
const SPARKC=['#FFD84D','#FF6B6B','#4D96FF','#6BCB77','#C77DFF','#FF9F45'];
function burst(P,x,y,s,n){for(let k=0;k<(n||12);k++){const a=Math.random()*TAU,v=(70+Math.random()*100)*s;P.parts.push({type:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60*s,r:(3+Math.random()*2.5)*s,life:.8,age:0,col:SPARKC[k%SPARKC.length],rot:Math.random()*6});}}
function puff(P,x,y,s,n){for(let k=0;k<n;k++)P.parts.push({type:'dust',x:x+(Math.random()-.5)*8*s,y:y+(Math.random()-.5)*4*s,vx:-(20+Math.random()*30)*s,vy:-(4+Math.random()*10)*s,r:2.5*s,gr:8*s,life:.5,age:0});}
function carPt(P,L,pt){return[P.x+pt[0]*L.s,L.gy+pt[1]*L.s];}
function dronePt(P,L,k,now){const s=L.s;return k?[P.x+108*s,L.gy-58*s+Math.sin(now/200+2)*3*s]:[P.x+76*s,L.gy-48*s+Math.sin(now/180)*3*s];}
function nextHouse(P,L,minX){const s=L.s,sp=96*s;for(let idx=Math.floor((P.bg+minX)/sp)-1;idx<Math.floor((P.bg+minX)/sp)+8;idx++){const dx=houseGeom(idx,s).door-P.bg;if(dx>minX&&!P.done.has(idx)&&!P.aim.has(idx))return idx;}return null;}
function doorPt(P,L,idx){return[houseGeom(idx,L.s).door-P.bg,L.roadTop];}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const COL=['#F26B38','#2F80ED','#1E9E57','#9B51E0'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);ctx=g;
    K.vgrad(g,0,0,W,H,['#9fd4f5','#e8f5ff','#fff3dc']);K.clouds(g,W,H,T,.12,3,Math.min(W,H)*.2);
    const u0=Math.min(W,H)/7,roadT=H*.74,gy=H*.93,off=T*u0*2.2;
    /* 집 */
    const s=u0*.022;for(let k=-1;k<W/(96*s)+2;k++){const idx=k+Math.floor(off/(96*s)),x=houseGeom(idx,s).X-off;drawHouse(g,idx,x,roadT,Math.min(70*s,H*.3),s,((idx%3)+3)%3===0);}
    g.fillStyle='#C9CED6';g.fillRect(0,roadT,W,6);g.fillStyle='#4E5566';g.fillRect(0,roadT+6,W,H-roadT-6);g.fillStyle='rgba(255,255,255,.45)';const dg=Math.max(60,u0*1.8),dof=off%dg;for(let x=-dof;x<W;x+=dg)g.fillRect(x,(roadT+H)/2+6,dg*.3,3);
    const count=W<460?2:W<640?3:4,gap=W/count,u=Math.min(1.35,gap/130,(H-roadT)/58);
    for(let i=0;i<count;i++){const x=gap*(i+.5)+Math.sin(T*1.4+i*1.7)*5;g.save();g.translate(x,gy);g.fillStyle='rgba(0,0,0,.25)';el(g,0,0,50*u,3*u);g.fill();drawCar(g,CAR_KEYS[i],u,{now:T*1000,wheel:T*14,num:i+1,face:'normal',wind:true},COL[i]);g.restore();
      if(Math.floor(T/1.6)%count===i){drawDrone(g,x+70*u,gy-60*u+Math.sin(T*5)*2*u,u*.85,T*1000,true);}}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'m03-division-truck',title:'나눗셈 배달 트럭',title1:'택배 배달 대작전',title2:'나눗셈 배달 트럭',emoji:LOGO,
  subtitle:'3~4학년 · 나눗셈 (몫과 나머지)',
  howto:'나눗셈을 풀고 <b>확인</b>을 눌러요! 맞히면 집으로 택배가 날아가요. <b>드론 시간</b> 안에 빨리 맞히면 드론이 도와줘요. 나머지가 있는 문제는 <b>몫</b>과 <b>나머지</b>를 모두 써요 (칸을 눌러 바꿀 수 있어요).',
  how:p=>({'3-1':'<b>곱셈구구</b>로 몫 구하기 (나머지 없음)','3-2':'<b>(두·세 자리 수) ÷ (한 자리 수)</b>, 나머지','4-1':'<b>(세 자리 수) ÷ (몇십), 두 자리 수</b>','4-2':'3·4학년 나눗셈 <b>총복습</b>'}[p.levelId]),
  theme:{c1:'#d9a066',c2:'#5c7cfa'},hero:heroScene,vignette:.04,durs:[90,180,300],levelTitle:'몇 학년 몇 학기 문제를 풀까요?',
  txt:{who:'누가 배달할까요?',dur:'배달 시간',pace:'드론 시간',seat:'번 기사 ',go:'배달 출발!',s1:'1. 학기',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.keys(SEMESTERS).map(k=>({id:k,g:'3~4학년',t:SEMESTERS[k].label,d:SEMESTERS[k].desc})),
  summary:`<ul><li><b>나눗셈</b>은 똑같이 나누는 것이에요. 12 ÷ 3 = 4 는 “12를 3개씩 묶으면 4묶음”이에요.</li>
    <li>나누어떨어지지 않으면 <b>나머지</b>가 생겨요. 17 ÷ 5 = 3 ⋯ 2 (5 × 3 + 2 = 17).</li>
    <li><b>나머지는 나누는 수보다 항상 작아야</b> 해요. 나머지가 나누는 수와 같거나 크면 몫을 더 키울 수 있어요.</li>
    <li>맞게 풀었는지는 <b>검산</b>으로 확인해요: 나누는 수 × 몫 + 나머지 = 나누어지는 수.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*.3,pad=Math.max(8,u*.3),gap=Math.max(6,u*.2);const A=H-Z0-pad;const land=W>=H*1.2;const laneH=A*(land?.5:.4);
    const lane={x:0,y:Z0,w:W,h:laneH};let board,pr;
    if(land){const bw=W*.4;board={x:pad,y:Z0+laneH+gap,w:bw,h:A-laneH-gap};pr={x:pad*2+bw,y:board.y,w:W-bw-pad*3,h:board.h};}
    else{const bh=clamp(A*.15,u*2.2,u*4);board={x:pad,y:Z0+laneH+gap,w:W-pad*2,h:bh};pr={x:pad,y:board.y+bh+gap,w:W-pad*2,h:A-laneH-bh-gap*2};}
    const st=p.state,q=st.q;const other=st.field==='q'?'r':'q';const next=q&&q.hasR&&st.typed&&st.typed[other]==='';
    return{W,H,u,Z0,pad,gap,land,lane,board,keys:MK.keys(pr,Math.max(5,u*.16),{ok:next?'다음':'확인'})};},
  init(p){const st=p.state;const sem=SEMESTERS[p.levelId];
    Object.assign(st,{T:0,q:null,typed:{q:'',r:''},field:'q',boostT:sem.boostT/p.pace,fac:makeQuestionFactory(p.levelId,p.R.int(1,1e9)),msg:null,press:null,boxes:[],
      P:{kind:CAR_KEYS[p.i%4],color:p.color,spd:0,dist:0,bg:0,wheel:0,x:null,boostUntil:0,boostTier:0,boostVis:0,happyUntil:0,gaugeOut:false,puffAcc:0,lineAcc:0,popups:[],parts:[],phase:'question',phaseStart:0,droneTier:0,aim:new Set(),done:new Set(),delivered:0}});
    MK.kb((pp,k)=>this.press(pp,k));p.ask('🚚 나눗셈을 풀어 택배를 배달해요!','정답을 쓰고 <b>확인</b>을 눌러요');this.next(p);},
  next(p){const st=p.state,P=st.P;st.q=st.fac.next();st.typed={q:'',r:''};st.field='q';st.msg=null;P.phase='question';P.phaseStart=st.T*1000;P.gaugeOut=false;},
  press(p,k){const st=p.state,P=st.P;if(!p.active||P.phase!=='question')return;const T=st.typed;
    if(k==='del'){if(T[st.field]===''&&st.field==='r')st.field='q';else T[st.field]=T[st.field].slice(0,-1);}
    else if(k==='ok'){this.okPress(p);return;}
    else if(k==='sw'){if(st.q.hasR)st.field=st.field==='q'?'r':'q';}
    else{const t=T[st.field];if(t.length>=4)return;T[st.field]=t==='0'?k:t+k;}},
  okPress(p){const st=p.state,T=st.typed,q=st.q;if(!q.hasR){if(T.q!=='')this.submit(p);return;}const other=st.field==='q'?'r':'q';if(T[st.field]==='')return;if(T[other]===''){st.field=other;return;}this.submit(p);},
  setG(p){const G0=this.geo(p);CW=G0.W;CH=G0.lane.h;const skyH=CH*.26,h=CH-skyH,s=Math.min(2.1,h/74,CW/300);const base=Math.max(CW*.15,64+56*s);
    const L={top:skyH,h,gy:skyH+h*.87,roadTop:skyH+h*.44,s,base,range:0};G={n:1,boostT:p.state.boostT,skyH,lanes:[L],players:[p.state.P]};if(p.state.P.x===null)p.state.P.x=base;return L;},
  shown(q){return `${q.a} ÷ ${q.b} = ${q.q}`+(q.hasR?` ⋯ ${q.r}`:'');},
  snd(p,n){const S=p.Snd;if(!S||!S.tone)return;if(n===2){S.tone(660,.1,'square',.05);S.tone(990,.12,'square',.05,.08);S.tone(1320,.25,'square',.05,.18);}else if(n===1){S.tone(660,.1,'square',.05);S.tone(990,.18,'square',.05,.08);}},
  submit(p){const st=p.state,P=st.P,q=st.q,T=st.typed;const now=st.T*1000,L=this.setG(p);const el_=(now-P.phaseStart)/1000;
    const ok=Number(T.q)===q.q&&(!q.hasR||Number(T.r)===q.r);const ans=q.hasR?`${q.q} ⋯ ${q.r}`:`${q.q}`;
    if(ok){const tier=el_<=st.boostT*.5?2:el_<=st.boostT?1:0;const pts=scoreFor(el_,st.boostT,0);P.boostTier=tier;P.boostUntil=now+[700,1300,1900][tier];P.happyUntil=now+[900,1400,2000][tier];if(tier)P.droneTier=tier;
      P.popups.push({t:'+'+(pts+(p.streak>=2?20:0)),c:p.color,t0:now,row:0});if(tier)P.popups.push({t:tier===2?'드론 두 대 출동!':'드론 배송!',c:'#1F9D68',t0:now,row:1});
      st.msg={t:tier===2?'슈퍼 드론 배송! 🚁🚁':tier===1?'정답! 드론 배송 🚁':'정답! 배달 완료 📦',ok:1,until:now+1300};this.snd(p,tier);
      const from=tier?(()=>{const d=dronePt(P,L,0,now);return[d[0],d[1]+18*L.s];})():carPt(P,L,CARGO[P.kind]);const life=tier?.42:.55,run=CW*.26*(1+[.7,2,3.2][tier])*.5*life;
      const idx=nextHouse(P,L,Math.max(P.x+34*L.s,from[0]+20*L.s)+run);if(idx!==null){P.aim.add(idx);P.parts.push({type:'parcel',x:0,y:0,x0:from[0],y0:from[1],idx,life,age:0});}
      P.phase='go';P.phaseStart=now;p.hit(true,{pts,quiet:true});}
    else{P.boostUntil=0;P.boostVis=0;const tooBig=q.hasR&&Number(T.r)>=q.b;st.msg={t:tooBig?`나머지는 ${q.b}보다 작아야 해요! 정답 ${ans}`:`앗, 상자를 떨어뜨렸어요! 정답 ${ans}`,ok:0,until:now+2200};
      P.popups.push({t:'앗!',c:'#D32F2F',t0:now,row:0});P.phase='broken';P.phaseStart=now;
      p.hit(false,{pen:0,review:this.shown(q),tip:'정답: '+this.shown(q)+(tooBig?' (나머지는 나누는 수보다 작아요)':''),tipMs:2400});}},
  update(p,dt){const st=p.state,P=st.P;st.T+=dt;const now=st.T*1000;const L=this.setG(p);const s=L.s,C=CW*.26;let target=C;
    if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
    if(P.phase==='broken'){const f=(now-P.phaseStart)/T_BROKE;target=f<.9?0:C*.7;if(f>=1)this.next(p);}
    else{if(now<P.boostUntil){const left=(P.boostUntil-now)/1000;target=C*(1+([.7,2,3.2][P.boostTier])*Math.min(1,left/.4));}
      if(P.phase==='question'){const f=(now-P.phaseStart)/1000/st.boostT;if(f>=1&&!P.gaugeOut){P.gaugeOut=true;st.msg={t:'천천히 정확하게 풀어요',ok:2,until:now+1e9};}}
      else if(P.phase==='go'&&now-P.phaseStart>=T_GO)this.next(p);}
    const k=P.phase==='broken'?7:(target>P.spd?4:2);P.spd+=(target-P.spd)*Math.min(1,dt*k);P.dist+=P.spd*dt;P.bg+=P.spd*dt;P.wheel+=P.spd*dt/(10*s);
    const bt=now<P.boostUntil&&P.boostTier>0?1:0;P.boostVis+=(bt-P.boostVis)*Math.min(1,dt*(bt?6:1.8));
    if(P.spd>5){P.puffAcc+=dt;if(P.puffAcc>(P.boostVis>.3?.08:.3)){P.puffAcc=0;const e=carPt(P,L,EXH[P.kind]);puff(P,e[0],e[1],s*.8,1);}}
    if(P.boostVis>.3){P.lineAcc+=dt;if(P.lineAcc>.035){P.lineAcc=0;P.parts.push({type:'line',x:CW+20,y:L.top+L.h*(.15+Math.random()*.7),vx:-CW*(2.2+Math.random()),vy:0,len:(40+Math.random()*80)*s,life:1,age:0});}}
    P.parts.forEach(q=>{q.age+=dt;if(q.type==='parcel'){if(q.age>=q.life&&!q.landed){q.landed=true;P.aim.delete(q.idx);P.done.add(q.idx);P.delivered++;const d=doorPt(P,L,q.idx);burst(P,d[0],d[1]-6*s,s*.7,8);p.Snd.tone&&p.Snd.tone(1200,.1,'sine',.05);}return;}
      q.x+=(q.type==='line'?q.vx:q.vx-P.spd*(q.type==='spark'?.3:1))*dt;q.y+=q.vy*dt;if(q.type==='spark')q.vy+=240*s*dt;if(q.gr)q.r+=q.gr*dt;});
    P.parts=P.parts.filter(q=>q.age<q.life&&q.x>-200);if(P.done.size>40){const lim=Math.floor(P.bg/(96*s))-3;P.done.forEach(v=>{if(v<lim)P.done.delete(v);});}
    const tx=L.base+P.boostVis*36*s;P.x+=(tx-P.x)*Math.min(1,dt*2.2);},
  down(p,x,y){const st=p.state;if(!p.active)return;const G0=this.geo(p);const k=MK.hit(G0.keys,x,y);if(k){st.press={k,t:.12};p.Snd.tap&&p.Snd.tap();this.press(p,k);return;}
    if(st.q&&st.q.hasR&&st.P.phase==='question'){const b=st.boxes.find(b=>K.inRect(x,y,b));if(b){st.field=b.f;p.Snd.tap&&p.Snd.tap();}}},
  draw(p,g){const st=p.state,P=st.P;const G0=this.geo(p),W=G0.W,H=G0.H,u=G0.u;const now=st.T*1000;K.vgrad(g,0,0,W,H,['#f7e7c9','#ecd3a5']);
    const L=this.setG(p);ctx=g;const s=L.s;
    g.save();g.translate(0,G0.lane.y);g.beginPath();g.rect(0,0,W,G0.lane.h);g.clip();
    drawSky(P.bg);drawLane(Object.assign({},P,{name:'',i:0}),L,0);drawParts(P,L,false,now);
    let face='normal',tilt=-.03*P.boostVis,shx=0,shy=0;
    if(P.phase==='broken'){const f=(now-P.phaseStart)/T_BROKE;face=f<.18?'shock':f<.7?'dizzy':'sad';if(f<.3){shx=(Math.random()-.5)*2.4*s;shy=(Math.random()-.5)*1.6*s;}tilt=f<.15?.05*Math.sin(f/.15*Math.PI):0;}else if(now<P.happyUntil)face='happy';
    const vib=P.spd>5?Math.sin(now/35)*.5*s:0;g.fillStyle='rgba(0,0,0,.25)';el(g,P.x+2*s,L.gy,52*s,3.2*s);g.fill();
    g.save();g.translate(P.x+shx,L.gy+shy+vib);drawCar(g,P.kind,s,{now,wheel:P.wheel,num:p.i+1,face,wind:P.spd>5,tilt},P.color);g.restore();
    if(P.phase==='broken')drawDropped(P,L,now);
    if(P.boostVis>.04){g.globalAlpha=Math.min(1,P.boostVis*1.6);for(let k=0;k<(P.droneTier===2?2:1);k++){const d=dronePt(P,L,k,now);drawDrone(g,d[0],d[1],s*.85,now,k===1||P.phase!=='go');}g.globalAlpha=1;}
    drawParts(P,L,true,now);
    P.popups=P.popups.filter(o=>now-o.t0<1100);P.popups.forEach(o=>{const a=(now-o.t0)/1100,fsz=Math.min(38,14*s+8);g.globalAlpha=1-a*a;g.textAlign='left';g.font=K.font(fsz);const w=g.measureText(o.t).width;let px=P.x+(P.boostVis>.05?150:70)*s;if(px+w>CW-6)px=P.x-60*s-w;const y=L.top+L.h*.36+o.row*(fsz+2)-a*12*s;g.lineWidth=5;g.strokeStyle='#fff';g.lineJoin='round';g.strokeText(o.t,px,y);g.fillStyle=o.c;g.fillText(o.t,px,y);g.globalAlpha=1;});
    K.card(g,u*.3,u*.25,u*4.6,u*.9,u*.45,'#fff8e8',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'📦 배달 '+P.delivered+'개',u*.3+u*2.3,u*.7,{size:u*.55,color:INK,maxW:u*4.2});
    g.restore();
    /* 식 판 */
    const b=G0.board,q=st.q;K.card(g,b.x,b.y,b.w,b.h,u*.3,'#fffaf0',{stroke:INK,lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#a16207'});
    if(q&&P.phase==='question'){const f=clamp(1-(now-P.phaseStart)/1000/st.boostT,0,1);const bw=b.w-u*1.8,bh=Math.max(5,u*.18);K.txt(g,'🚁',b.x+u*.7,b.y+u*.37,{size:u*.5});K.rr(g,b.x+u*1.2,b.y+u*.28,bw,bh,bh/2);g.fillStyle='#efe3cd';g.fill();K.rr(g,b.x+u*1.2,b.y+u*.28,Math.max(bh,bw*f),bh,bh/2);g.fillStyle=f<.3?'#ef4444':f<.6?'#f59e0b':'#22c55e';g.fill();}
    st.boxes=[];
    if(q){const T=st.typed;const cx=b.x+b.w/2,cy=b.y+b.h*.57,maxW=b.w-u*.7;let fs=Math.min(u*1.7,b.h*.46);
      const lt=`${q.a} ÷ ${q.b} =`,dots='⋯';const meas=f=>{g.font=K.font(f);const l=g.measureText(lt).width,d=q.hasR?g.measureText(dots).width:0;const bq=Math.max(f*1.6,g.measureText(T.q||'몫').width+f*.6)*1,br=q.hasR?Math.max(f*1.6,g.measureText(T.r||'나머지').width+f*.6):0;return{l,d,bq,br,tot:l+f*.25+bq+(q.hasR?f*.2+d+f*.2+br:0)};};
      let m=meas(fs);for(let t=0;t<40&&m.tot>maxW;t++){fs*=.94;m=meas(fs);}
      let x=cx-m.tot/2;g.save();g.textBaseline='middle';g.fillStyle=INK;g.font=K.font(fs);g.textAlign='left';g.fillText(lt,x,cy);x+=m.l+fs*.25;
      const box=(f,w,val,ph)=>{const on=st.field===f&&P.phase==='question';K.rr(g,x,cy-fs*.62,w,fs*1.24,fs*.2);g.fillStyle=on?'#fff1c2':'#fff';g.fill();g.lineWidth=Math.max(2,fs*(on?.1:.06));g.strokeStyle=on?'#d97706':'#b89b6a';g.stroke();
        g.textAlign='center';g.font=K.font(val?fs:fs*.5);g.fillStyle=val?'#9a3412':'#c4a77d';g.fillText(val||ph,x+w/2,cy+fs*.03);g.textAlign='left';st.boxes.push({f,x,y:cy-fs*.62,w,h:fs*1.24});x+=w;};
      box('q',m.bq,T.q,'몫');if(q.hasR){x+=fs*.2;g.font=K.font(fs);g.fillStyle=INK;g.textAlign='left';g.fillText(dots,x,cy);x+=m.d+fs*.2;box('r',m.br,T.r,'나머지');}g.restore();}
    if(st.msg&&now<st.msg.until){K.txt(g,st.msg.t,b.x+b.w/2,b.y+b.h-Math.min(u*.5,b.h*.14),{size:Math.min(u*.5,b.h*.16),color:st.msg.ok===1?'#15803d':st.msg.ok===2?'#6b7280':'#dc2626',maxW:b.w*.92});}
    MK.draw(g,u,G0.keys,{face:'#fffaf0',ink:INK,bd:INK,delFace:'#ffe4d6',okFace:'#2f9e68',okInk:'#fff',sh:'#7c4a1e'},st.press,true);
  },
};
Engine.boot(GAME);
