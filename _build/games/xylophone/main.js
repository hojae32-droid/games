/* 3~6학년 음악 · 가락 듣고 따라 연주하기 — 메아리 실로폰
   디자인: 숲속 음악회. 토끼 선생님이 실로폰을 치면 잘 듣고 똑같이 따라 쳐요. 쳐서 소리 내는 진짜 연주 활동! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2f4a1e';
const KEYS=[60,62,64,65,67,69,71,72];
const COL=['#FF5A5F','#FF9F1C','#FFD23F','#3BCEAC','#0EAD69','#3A86FF','#8338EC','#FF5A5F'];
const NAMES=['도','레','미','파','솔','라','시','도′'];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="30" width="40" height="4" rx="2" fill="#7a4f22"/><rect x="7" y="8" width="6" height="26" rx="2" fill="#FF5A5F" stroke="#2f4a1e" stroke-width="2"/><rect x="16" y="12" width="6" height="22" rx="2" fill="#FFD23F" stroke="#2f4a1e" stroke-width="2"/><rect x="25" y="16" width="6" height="18" rx="2" fill="#3BCEAC" stroke="#2f4a1e" stroke-width="2"/><rect x="34" y="20" width="6" height="14" rx="2" fill="#3A86FF" stroke="#2f4a1e" stroke-width="2"/></svg>';
const LV={
  sml:{label:'솔·미·라 메아리',desc:'세 음으로 된 짧은 가락 · 빛을 보며 따라 쳐요',tag:'3학년',ic:'🌱',use:[2,4,5],base:3,max:6,time:14,light:true},
  penta:{label:'도레미솔라 메아리',desc:'다섯 음 가락 · 빛을 보며 따라 쳐요',tag:'4학년',ic:'🌈',use:[0,1,2,4,5],base:4,max:7,time:16,light:true},
  ear:{label:'귀로만 듣고 따라 치기',desc:'빛 없이 소리만 듣고 도~높은 도까지',tag:'5~6학년',ic:'👂',use:[0,1,2,3,4,5,6,7],base:4,max:7,time:18},
  read:{label:'계이름 보고 치기',desc:'소리 없이 계이름 악보를 읽고 쳐요',tag:'3~6학년',ic:'📖',use:[0,1,2,3,4,5,6,7],base:5,max:8,time:20,silent:true},
};
const BEAT=.42;
function meadow(g,W,H,u,t){K.vgrad(g,0,0,W,H*.62,['#aee3ff','#dff5ff']);K.clouds(g,W,H*.3,t*.4,.12,3,u*1.7);K.glow(g,W*.88,H*.1,u*3,'#fff6b0',.7);g.fillStyle='#ffe066';g.beginPath();g.arc(W*.88,H*.1,u*.8,0,TAU);g.fill();
  g.fillStyle='#a5da82';g.beginPath();g.moveTo(0,H*.5);for(let x=0;x<=W;x+=20)g.lineTo(x,H*.46+Math.sin(x/110)*u*.5);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();
  g.fillStyle='#8fcb6a';g.beginPath();g.moveTo(0,H*.62);for(let x=0;x<=W;x+=20)g.lineTo(x,H*.6+Math.sin(x/70+2)*u*.3);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();}
function bunny(g,x,y,s,mood,t,swing){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  g.fillStyle='#fff';for(const d of[-1,1]){g.save();g.translate(d*s*.2,-s*1.08);g.rotate(d*.15+Math.sin(t*3+d)*.04);g.beginPath();g.ellipse(0,0,s*.1,s*.3,0,0,TAU);g.fill();g.stroke();g.fillStyle='#ffc2dd';g.beginPath();g.ellipse(0,s*.02,s*.045,s*.2,0,0,TAU);g.fill();g.restore();g.fillStyle='#fff';}
  g.beginPath();g.ellipse(0,-s*.42,s*.4,s*.42,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;for(const d of[-1,1]){if(mood==='oops'){g.beginPath();g.moveTo(d*s*.14-s*.05,-s*.58-s*.05);g.lineTo(d*s*.14+s*.05,-s*.58+s*.05);g.moveTo(d*s*.14+s*.05,-s*.58-s*.05);g.lineTo(d*s*.14-s*.05,-s*.58+s*.05);g.stroke();}else{g.beginPath();g.arc(d*s*.14,-s*.56,s*.05,0,TAU);g.fill();}}
  g.fillStyle='#ffa6c9';g.beginPath();g.ellipse(0,-s*.46,s*.05,s*.035,0,0,TAU);g.fill();g.beginPath();if(mood==='oops'){g.arc(0,-s*.3,s*.07,Math.PI*1.1,Math.PI*1.9);}else{g.arc(0,-s*.4,s*.1,.1*Math.PI,.9*Math.PI);}g.stroke();
  g.fillStyle='#ff7a3d';K.rr(g,-s*.26,-s*.04,s*.52,s*.38,s*.1);g.fill();g.stroke();
  /* 채 두 개 */
  for(const d of[-1,1]){g.save();g.translate(d*s*.3,s*.02);g.rotate(d*(.5+Math.sin(t*14+d)*.4*swing));g.strokeStyle='#7a4f22';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(0,0);g.lineTo(0,s*.5);g.stroke();g.fillStyle='#ff5a5f';g.beginPath();g.arc(0,s*.52,s*.07,0,TAU);g.fill();g.restore();}
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;meadow(g,W0,H0,u,T);const n=8,bw=Math.min(W0*.09,u*.9),gap=bw*.15,x0=W0/2-(n*(bw+gap))/2,yb=H0*.82;const lit=Math.floor(T*3)%12;
    for(let i=0;i<n;i++){const h=u*(3-i*.22);const on=lit===i||lit===11-i&&lit>7;K.rr(g,x0+i*(bw+gap),yb-h,bw,h,bw*.2);g.fillStyle=COL[i];g.fill();if(on){g.fillStyle='rgba(255,255,255,.55)';g.fill();}g.lineWidth=2;g.strokeStyle=INK;g.stroke();}
    bunny(g,x0-u*1.1,yb,u*1.5,'happy',T,1);[0,1,2].forEach(k=>{const a=((T*.7+k*.33)%1);K.txt(g,['♪','♫','♬'][k],x0+n*(bw+gap)*(.2+k*.3),yb-u*3.4-a*u,{size:u*.7,color:COL[(k*2)%8],alpha:1-a});});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'xylophone',title:'메아리 실로폰',title1:'숲속 음악회',title2:'메아리 실로폰',emoji:LOGO,
  subtitle:'3~6학년 음악 · 듣고 따라 연주하기',
  howto:'토끼 선생님이 실로폰으로 가락을 들려줘요. <b>잘 듣고 똑같은 순서로</b> 내 실로폰을 쳐요! 성공할 때마다 가락이 점점 길어져요. 모두 함께 듣고 동시에 쳐요. (키보드: A S D F G H J K)',
  how:p=>({sml:'<b>솔·미·라</b> 세 음 가락을 따라 쳐요',penta:'<b>도레미솔라</b> 다섯 음 가락을 따라 쳐요',ear:'<b>소리만 듣고</b> 도~높은 도를 따라 쳐요',read:'<b>계이름을 읽고</b> 소리 없이 쳐요'}[p.levelId]),
  theme:{c1:'#34a853',c2:'#ff7a3d'},hero:heroScene,vignette:.03,durs:[120,180,300],levelTitle:'어떤 메아리를 칠까요?',
  txt:{who:'누가 연주자일까요?',dur:'연주 시간',pace:'생각하는 시간',seat:'번 연주자 ',go:'연주 시작!',s1:'1. 메아리',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>계이름</b>은 음의 이름이에요: 도·레·미·파·솔·라·시·도. 낮은 도에서 높은 도까지 <b>한 옥타브</b>예요.</li>
    <li>가락을 <b>기억해서 따라 하기</b>는 음악을 듣는 귀를 키워 줘요. 처음엔 빛을 보고, 나중엔 귀로만 해 봐요.</li>
    <li>가락은 음이 <b>올라가고 내려가는 모양</b>이에요. 오른쪽으로 갈수록 높은 소리가 나는 실로폰으로 느껴 봐요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.3;const land=W>=H*1.1;const stageH=Math.max(u*4,(H-top)*(land?.44:.4));const ky=top+stageH+u*.2;const kh=H-ky-u*.35;const n=8,pad=u*.4;const bw=(W-pad*2)/n;
    const bars=[];for(let i=0;i<n;i++){const hh=kh*(1-i*.055);bars.push({x:pad+i*bw+bw*.07,y:ky+kh-hh,w:bw*.86,h:hh});}
    return{W,H,u,top,land,stageH,ky,kh,bars,bunny:{x:land?W*.13:W*.16,y:top+stageH*.9,s:Math.min(stageH*.5,u*3)},slotsY:top+u*2.7,rep:{x:W-pad-u*3.6,y:top+stageH-u*1.75,w:u*3.6,h:u*.9}};},
  init(p){const st=p.state;Object.assign(st,{T:0,round:0,seq:[],pos:0,phase:'idle',tl:null,listen:0,tLeft:0,tMax:0,rep:0,flash:{},teach:-1,okN:0,streak:0,mood:'neutral',mT:0,msg:'',msgT:0,pr:{},res:'',spark:[],t0:0});
    p.ask('🎼 <b>메아리 실로폰</b>','선생님 가락을 잘 듣고 똑같이 쳐요');},
  start(p){this.newRound(p);},
  lv(p){return LV[p.levelId];},
  next(p){const self=this;const st=p.state;st.phase='wait';M.gate(p,()=>{if(!p.active)return;self.newRound(p);});},
  newRound(p){const st=p.state,L=this.lv(p),R=p.R;st.round++;const n=Math.min(L.base+Math.floor((st.round-1)/3),L.max);const use=L.use,seq=[];let prev=-1;
    for(let k=0;k<n;k++){let c;do{c=R.pick(use);}while(use.length>2&&c===prev&&R.f()<.7);if(prev>=0&&Math.abs(c-prev)>4&&R.f()<.7){c=use.reduce((a,b)=>Math.abs(b-prev)<Math.abs(a-prev)&&b!==prev?b:a,use[0]);}seq.push(c);prev=c;}
    if(p.levelId==='ear')seq[0]=R.pick([0,2,4]);
    st.seq=seq;st.pos=0;st.rep=0;st.res='';st.flash={};st.mood='neutral';st.msg=L.silent?'계이름을 차례대로 쳐요':'선생님이 연주하는 중…';st.msgT=60;
    p.ask('🎼 <b>'+n+'음 메아리</b>',L.silent?'소리 없이 읽고 쳐요':'잘 듣고 똑같이 쳐요');
    st.tMax=L.time/Math.max(.8,Math.min(1.3,p.pace));st.tLeft=st.tMax;this.teach(p);},
  teach(p){const st=p.state,L=this.lv(p);if(L.silent){st.phase='play';st.listen=0;st.t0=st.T;st.tl=null;return;}
    st.phase='listen';const t=M.now()+.25;if(M.lead(p))st.seq.forEach((i,k)=>M.play('xylo',KEYS[i],t+k*BEAT,BEAT,.9));st.tl={t0:st.T+.25};st.listen=.25+st.seq.length*BEAT+.15;},
  update(p,dt){const st=p.state;st.T+=dt;M.check();M.decay(st,dt);if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.msgT>0)st.msgT-=dt;
    st.spark=st.spark.filter(s=>(s.t+=dt)<1);
    for(const k in st.flash){st.flash[k]-=dt;if(st.flash[k]<=0)delete st.flash[k];}
    if(st.phase==='listen'){st.listen-=dt;if(st.tl){const k=Math.floor((st.T-st.tl.t0)/BEAT);st.teach=k>=0&&k<st.seq.length?k:-1;if(k>=0&&k<st.seq.length&&st.tl.last!==k){st.tl.last=k;const i=st.seq[k];st.flash['t'+i]=BEAT*.8;}}
      if(st.listen<=0){st.phase='play';st.teach=-1;st.msg=this.lv(p).silent?'계이름을 차례대로 쳐요':'이제 내 차례! 똑같이 쳐 봐요';st.msgT=60;}}
    else if(st.phase==='play'){st.tLeft-=dt;if(st.tLeft<=0)this.fail(p,-1);}},
  tap(p,i){const st=p.state,L=this.lv(p);if(!L.use.includes(i))return;M.play('xylo',KEYS[i],null,.4,.85,{vol:M.vol(p)});st.flash['h'+i]=.18;
    const G=this.geo(p);const b=G.bars[i];for(let k=0;k<3;k++)st.spark.push({x:b.x+b.w/2,y:b.y,i,t:0,a:(Math.random()-.5)*1.6});
    if(st.phase!=='play')return;const want=st.seq[st.pos];
    if(i===want){st.pos++;if(st.pos>=st.seq.length)this.win(p);}else this.fail(p,i);},
  win(p){const st=p.state;st.phase='done';st.res='ok';const el=st.tMax-st.tLeft,Ln=st.seq.length;const pts=30+Ln*8+Math.round(30*Math.max(0,1-el/(Ln*1.6)))-st.rep*5;st.okN++;st.streak++;st.mood='happy';st.mT=1.5;st.msg='완벽해요! 메아리 성공 🎉';st.msgT=3;
    p.hit(true,{pts:Math.max(20,pts),x:p.W/2,y:this.geo(p).slotsY,tip:'메아리 성공! '+Ln+'음',tipMs:1200});for(let k=0;k<14;k++)st.spark.push({x:p.W*(.2+Math.random()*.6),y:this.geo(p).slotsY,i:k%8,t:0,a:(Math.random()-.5)*3});
    setTimeout(()=>{if(p.active)this.next(p);},1700);},
  fail(p,i){const st=p.state;st.phase='done';st.res='bad';st.streak=0;st.mood='oops';st.mT=1.6;const want=st.seq[st.pos];if(i>=0)st.flash['b'+i]=.6;
    st.msg=i<0?'시간이 다 됐어요':'앗, '+(st.pos+1)+'번째 음은 '+NAMES[want]+'였어요';st.msgT=3;
    p.hit(false,{review:'가락: '+st.seq.map(k=>NAMES[k]).join(' - '),tip:st.msg+' · '+st.seq.map(k=>NAMES[k]).join(' '),tipMs:2600});
    setTimeout(()=>{if(p.active)this.next(p);},2400);},
  replay(p){const st=p.state;if(st.phase!=='play'||st.rep>=2||this.lv(p).silent)return;st.rep++;st.msg='한 번 더 들어요';st.msgT=3;this.teach(p);},
  down(p,x,y){const st=p.state;const G=this.geo(p);if(K.inRect(x,y,G.rep)){this.replay(p);return;}for(let i=G.bars.length-1;i>=0;i--){if(K.inRect(x,y,G.bars[i])){M.press(st,'k'+i,.12);this.tap(p,i);return;}}},
  key(p,e){const map={a:0,s:1,d:2,f:3,g:4,h:5,j:6,k:7,1:0,2:1,3:2,4:3,5:4,6:5,7:6,8:7};if(e.key in map){e.preventDefault&&e.preventDefault();this.tap(p,map[e.key]);}},
  botAct(p){const st=p.state;if(st.phase!=='play')return null;const G=this.geo(p);const b=G.bars[st.seq[st.pos]];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h*.6};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,L=this.lv(p);meadow(g,W,H,u,t);
    /* 무대와 토끼 선생님 */
    const sy=G.top+G.stageH;K.rr(g,u*.3,sy-u*.55,W-u*.6,u*.5,u*.2);g.fillStyle='#b9824a';g.fill();g.lineWidth=3;g.strokeStyle='#7a4f22';g.stroke();
    const bn=G.bunny;bunny(g,bn.x,bn.y,bn.s,st.mood,t,st.phase==='listen'?1:0);
    /* 말풍선 */
    const bx=bn.x+bn.s*.7,by=G.top+u*1.3,bw=Math.min(W*.34,u*8),bh=u*1.1;K.card(g,bx,by,bw,bh,u*.4,'#fff',{stroke:INK,lw:3,blur:0,dy:0});
    const bt=st.phase==='listen'?(st.teach>=0?NAMES[st.seq[st.teach]]:'🎵 잘 들어요'):st.phase==='play'?'🙌 이제 내 차례!':st.phase==='wait'?'친구를 기다려요…':'🎼';
    K.txt(g,L.silent&&st.phase==='play'?'📖 읽고 쳐요':st.phase==='listen'&&L.light&&st.teach>=0?NAMES[st.seq[st.teach]]:bt,bx+bw/2,by+bh/2,{size:u*.62,color:INK,maxW:bw*.9});
    /* 따라 친 가락 칸 */
    const n=st.seq.length||4;const sw=Math.min(u*1.25,(W-u*1.2)/Math.max(n,4)),gx=bn.x+bn.s*.8+(W-(bn.x+bn.s*.8)-n*sw)/2,gy=G.slotsY;
    for(let k=0;k<n;k++){const x=gx+k*sw+sw*.5,r=sw*.42;const done=k<st.pos||st.res==='ok';const show=done||L.silent||st.res==='bad'||(p.levelId==='ear'&&k===0);const c=st.seq[k]!=null?COL[st.seq[k]]:'#ddd';
      g.fillStyle=show?c:'rgba(255,255,255,.7)';g.beginPath();g.arc(x,gy+sw*.3,r,0,TAU);g.fill();g.lineWidth=3;g.strokeStyle=k===st.pos&&st.phase==='play'?'#ff7a3d':INK;g.stroke();
      K.txt(g,show&&st.seq[k]!=null?NAMES[st.seq[k]]:'?',x,gy+sw*.3+1,{size:r*1.05,color:show?'#fff':INK,stroke:show?INK:null,lw:3,maxW:r*1.7});}
    /* 시간 막대 */
    if(st.phase==='play'&&st.tMax>0){const tw=Math.min(W*.5,u*10);QZ.bar(g,W/2-tw/2,(p.top||0)+u*.12,tw,Math.max(5,u*.2),st.tLeft/st.tMax,{good:'#34a853'});}
    /* 다시 듣기 */
    if(!L.silent){const r=G.rep,can=st.phase==='play'&&st.rep<2;K.rr(g,r.x,r.y+u*.1,r.w,r.h,r.h/2);g.fillStyle=can?'#fff':'rgba(255,255,255,.5)';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();K.txt(g,'🔁 다시 듣기 '+(2-st.rep),r.x+r.w/2,r.y+u*.1+r.h/2,{size:u*.46,color:can?INK:'#8a8a8a',maxW:r.w*.9});}
    /* 실로폰 */
    const ky=G.ky,kh=G.kh;g.fillStyle='#7a4f22';K.rr(g,u*.3,ky+kh*.18,W-u*.6,u*.22,u*.1);g.fill();K.rr(g,u*.3,ky+kh*.76,W-u*.6,u*.22,u*.1);g.fill();
    G.bars.forEach((b,i)=>{const usable=L.use.includes(i);const pr=(st.pr['k'+i]>0)||st.flash['h'+i]>0;const teach=st.flash['t'+i]>0;const bad=st.flash['b'+i]>0;const dy=pr?u*.06:0;
      g.save();g.globalAlpha=usable?1:.28;K.rr(g,b.x,b.y+dy,b.w,b.h,b.w*.16);g.fillStyle=bad?'#444':COL[i];g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
      g.fillStyle='rgba(255,255,255,.28)';K.rr(g,b.x+b.w*.12,b.y+dy+b.h*.04,b.w*.2,b.h*.9,b.w*.08);g.fill();
      if(teach||pr){g.fillStyle=teach?'rgba(255,255,255,.7)':'rgba(255,255,255,.4)';K.rr(g,b.x,b.y+dy,b.w,b.h,b.w*.16);g.fill();if(teach)K.glow(g,b.x+b.w/2,b.y+b.h*.2,b.w*1.4,'#fff7a8',.9);}
      g.fillStyle=INK;g.beginPath();g.arc(b.x+b.w/2,b.y+dy+b.h*.2,b.w*.07,0,TAU);g.fill();g.beginPath();g.arc(b.x+b.w/2,b.y+dy+b.h*.8,b.w*.07,0,TAU);g.fill();
      K.txt(g,NAMES[i],b.x+b.w/2,b.y+dy+b.h*.5,{size:Math.min(b.w*.5,u*.9),color:'#fff',stroke:INK,lw:3,maxW:b.w*.9});g.restore();});
    for(const s of st.spark){const b=G.bars[s.i%8];const k=s.t;K.txt(g,['♪','♫','♬'][s.i%3],s.x+s.a*u*k*1.5,s.y-k*u*2.5,{size:u*.6,color:COL[s.i%8],alpha:1-k});}
    /* 위 표시 */
    K.card(g,u*.3,(p.top||0)+u*.5,u*4.2,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🎼 '+(st.streak||0)+'번 연속',u*.3+u*2.1,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.8});
    if(st.msgT>0&&st.msg&&st.phase!=='listen')K.txt(g,st.msg,W/2,G.ky-u*.35,{size:Math.min(u*.65,W*.04),color:'#fff',stroke:INK,lw:u*.14,maxW:W*.94});
  },
};
Engine.boot(GAME);
