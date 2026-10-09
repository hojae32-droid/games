/* 5~6학년 영어 · 복수형·과거형·비교급 — 유리 다리 건너기
   디자인: 밤하늘 위에 뜬 네온 유리 다리. 빈칸에 맞는 낱말이 적힌 유리판을 밟아야 해요. 틀린 판은 와장창! 8칸을 건너면 보너스! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const CY='#22d3ee',VI='#a78bfa',PK='#f472b6';
const LOGO=gkLogo('#131a35','#22d3ee','🌉');
const STEPS=8;
const LV={
  plural:{g:'5~6학년',t:'복수형 유리다리',d:'box → boxes, child → children'},
  past:{g:'5~6학년',t:'과거형 유리다리',d:'go → went, play → played'},
  compare:{g:'5~6학년',t:'비교급 유리다리',d:'big → bigger, good → better'},
};
function hero(g,W,H,T,u){const sk=g.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0b1020');sk.addColorStop(1,'#3b1a78');g.fillStyle=sk;g.fillRect(0,0,W,H);for(let i=0;i<40;i++){g.fillStyle='rgba(255,255,255,'+(.3+.4*Math.abs(Math.sin(T+i)))+')';g.fillRect((i*97)%W,(i*53)%(H*.5),2,2);}
  for(let d=5;d>=0;d--){const s=Math.pow(.72,d),y=H*.4+(H*.85-H*.4)*s,pw=W*.2*s;[-1,1].forEach(sd=>{const x=W/2+sd*pw*.65;g.fillStyle='rgba(34,211,238,.22)';g.strokeStyle=CY;g.lineWidth=2+s*2;K.rr(g,x-pw/2,y-pw*.25,pw,pw*.5,pw*.08);g.fill();g.stroke();});}
  K.emo(g,'🐸',W/2,H*.85+Math.sin(T*3)*u*.1,u*1.6);}
const DATA={
      plural:[['one box → two ____','boxes','boxs'],['one child → two ____','children','childs'],['one bus → two ____','buses','buss'],['one man → two ____','men','mans'],['one baby → two ____','babies','babys'],['one tooth → two ____','teeth','tooths'],['one foot → two ____','feet','foots'],['one city → two ____','cities','citys'],['one leaf → two ____','leaves','leafs'],['one knife → two ____','knives','knifes'],['one dish → two ____','dishes','dishs'],['one watch → two ____','watches','watchs'],['one mouse → two ____','mice','mouses'],['one woman → two ____','women','womans'],['one sheep → two ____','sheep','sheeps'],['one potato → two ____','potatoes','potatos'],['one family → two ____','families','familys'],['one dog → two ____','dogs','doges'],['one day → two ____','days','daies'],['one book → two ____','books','bookes']],
      past:[['Yesterday I ____ to school. (go)','went','goed'],['She ____ an apple. (eat)','ate','eated'],['We ____ soccer. (play)','played','plaied'],['He ____ a new bag. (buy)','bought','buyed'],['I ____ a picture. (see)','saw','seed'],['They ____ home early. (come)','came','comed'],['Mom ____ a cake. (make)','made','maked'],['I ____ my homework. (do)','did','doed'],['She ____ a letter. (write)','wrote','writed'],['He ____ hard last night. (study)','studied','studyed'],['We ____ in the pool. (swim)','swam','swimmed'],['The dog ____ fast. (run)','ran','runned'],['I ____ a cold. (have)','had','haved'],['The bus ____ . (stop)','stopped','stoped'],['She ____ the door. (open)','opened','openned'],['He ____ his hand. (take)','took','taked'],['I ____ him a gift. (give)','gave','gived'],['We ____ pizza. (like)','liked','likeed'],['They ____ the song. (sing)','sang','singed'],['I ____ a bird. (find)','found','finded']],
      compare:[['An elephant is ____ than a dog. (big)','bigger','more big'],['This book is ____ than that one. (interesting)','more interesting','interestinger'],['Tom is ____ than Jim. (tall)','taller','more tall'],['She is the ____ student. (smart)','smartest','most smart'],['This pizza is ____ than that. (good)','better','gooder'],['The weather is ____ today. (bad)','worse','badder'],['Winter is ____ than fall. (cold)','colder','more cold'],['My bag is ____ than yours. (heavy)','heavier','heavyer'],['This bag is ____ than that one. (expensive)','more expensive','expensiver'],['She is the ____ girl here. (beautiful)','most beautiful','beautifulest'],['August is the ____ month. (hot)','hottest','hotest'],['A cheetah is ____ than a horse. (fast)','faster','more fast'],['This is the ____ day of my life. (good)','best','goodest'],['He is ____ than me. (young)','younger','more young'],['Sam is the ____ boy in class. (funny)','funniest','most funny'],['Math is ____ than art for me. (difficult)','more difficult','difficulter'],['My room is ____ than hers. (small)','smaller','more small'],['It is the ____ story. (long)','longest','most long'],['Today is ____ than yesterday. (happy)','happier','more happy'],['This is the ____ movie. (bad)','worst','baddest']],
};
const GAME={
  id:'glassbridge',title:'유리 다리 건너기',title1:'네온 유리다리',title2:'건너기',emoji:LOGO,
  subtitle:'5~6학년 영어 · 맞는 낱말이 적힌 유리판 밟기',
  howto:'🌉 빈칸에 들어갈 <b>맞는 영어 낱말이 적힌 유리판</b>을 골라 밟아요. 틀린 유리판은 와장창 깨져서 개구리가 떨어지고, 잠깐 쉰 뒤 다시 도전해요! 8칸을 모두 건너면 보너스 점수!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:CY,c2:PK},hero:gkHero(hero),vignette:.06,durs:[120,180,300],levelTitle:'어떤 다리를 건널까요?',
  txt:{who:'누가 개구리일까요?',dur:'건너는 시간',pace:'생각 시간',seat:'번 개구리 ',go:'다리 건너기!',s1:'1. 다리',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>복수형</b>: 보통 -s를 붙이지만 box→boxes, baby→babies, child→children, man→men처럼 달라지는 낱말이 있어요.</li>
    <li><b>과거형</b>: 보통 -ed를 붙이지만 go→went, eat→ate, buy→bought처럼 불규칙하게 바뀌는 낱말이 있어요.</li>
    <li><b>비교급</b>: 짧은 낱말은 -er(bigger), 긴 낱말은 more(more interesting)를 써요. good→better, bad→worse는 특별해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const q={x:pad,y:top,w:W-pad*2,h:Math.min(u*3.2,H*.2)};const hz=q.y+q.h+u*.9,yb=H-u*5.2;return{W,H,u,top,pad,q,hz,yb,pw:Math.min(W*.38,(yb-hz)*1.25)};},
  init(p){const st=p.state;st.data=DATA[p.levelId];st.bag=EN.bag(st.data,()=>p.R.f());Object.assign(st,{T:0,step:0,cam:0,Q:null,sw:0,phase:'idle',t0:0,lim:9,wait:0,tries:0,fall:0,pickSide:-1,broke:-1,flash:0,fin:0,reveal:false,hop:0,hopFrom:0});this.next(p);},
  next(p){const st=p.state;st.Q=st.bag();st.sw=p.R.f()<.5?0:1;st.phase='play';st.t0=st.T;st.fall=0;st.broke=-1;st.reveal=false;st.wait=0;p.ask('🌉 맞는 유리판을 밟아요',st.step+'/'+STEPS+'칸');},
  update(p,dt){const st=p.state;st.T+=dt;st.cam+=(st.step-st.cam)*Math.min(1,dt*6);if(Math.abs(st.step-st.cam)<.004)st.cam=st.step;if(st.fall>0)st.fall+=dt;if(st.flash>0)st.flash-=dt;
    if(st.phase==='play'&&st.T-st.t0>st.lim){st.phase='wait';st.wait=1.8;st.reveal=true;p.hit(false,{pen:10,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.Q[0]+' → '+st.Q[1]});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0){if(st.fin){st.fin=0;st.step=0;st.cam=0;}this.next(p);}}},
  rowXY(G,d,side){const s=Math.pow(.72,d);const y=G.hz+(G.yb-G.hz)*s;const pw=G.pw*s;return{x:G.W/2+side*pw*.62,y,pw,ph:pw*.38,s};},
  down(p,x,y){const st=p.state,G=this.geo(p);if(st.phase!=='play'||y<G.hz)return;this.pick(p,x<G.W/2?0:1);},
  pick(p,i){const st=p.state,G=this.geo(p);const ok=i!==st.sw;const R=this.rowXY(G,0,i?1:-1);st.pickSide=i;
    if(ok){const el=st.T-st.t0;st.step++;st.phase='wait';st.wait=.95;st.reveal=true;st.hop=1;p.hit(true,{pts:EN.pts(Math.min(el,st.lim),st.lim),x:R.x,y:R.y});enSay(st.Q[1],.8);p.Snd.tone&&p.Snd.tone(700,.08,'sine',.05);
      if(st.step>=STEPS){st.fin=1;st.wait=1.8;st.flash=.5;setTimeout(()=>p.hit(true,{pts:100,x:G.W/2,y:G.hz}),500);}}
    else{st.phase='wait';st.wait=1.9;st.fall=.001;st.broke=i;st.reveal=true;p.hit(false,{pen:10,shake:false,x:R.x,y:R.y,tip:'💥 정답은 '+st.Q[1],tipMs:1500,review:st.Q[0]+' → '+st.Q[1]});}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.phase!=='play')return null;const R=this.rowXY(G,0,st.sw?-1:1);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+R.x,y:rc.top+R.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,Q=st.Q;if(!Q)return;
    const sk=g.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0b1020');sk.addColorStop(.6,'#1a1050');sk.addColorStop(1,'#3b1a78');g.fillStyle=sk;g.fillRect(0,0,W,H);
    for(let i=0;i<50;i++){g.fillStyle='rgba(255,255,255,'+(.25+.5*Math.abs(Math.sin(st.T*.8+i)))+')';g.fillRect((i*131)%W,(i*71)%(G.hz),i%7===0?3:2,i%7===0?3:2);}
    g.fillStyle='rgba(167,139,250,.2)';g.fillRect(0,G.hz-1,W,2);
    // city glow far below
    const q=G.q;K.card(g,q.x,q.y,q.w,q.h,u*.3,'#131a35',{stroke:CY,lw:3,blur:u*.5,sc:'rgba(34,211,238,.6)'});
    const parts=Q[0].split('____');const ans=st.reveal?Q[1]:'＿＿＿';const full=parts[0]+ans+(parts[1]||'');let sz=Math.min(q.h*.34,q.w/Math.max(12,full.length)*1.7);g.font=K.font(sz);const fw=g.measureText(full).width;if(fw>q.w*.92)sz*=q.w*.92/fw;
    const mid=q.y+q.h*.46;g.font=K.font(sz);g.textAlign='left';g.textBaseline='middle';const w0=g.measureText(parts[0]).width,wa=g.measureText(ans).width,w1=g.measureText(parts[1]||'').width;let x=q.x+q.w/2-(w0+wa+w1)/2;
    g.fillStyle='#e0f2ff';g.fillText(parts[0],x,mid);g.fillStyle=st.reveal?(st.broke>=0?PK:'#86efac'):CY;g.fillText(ans,x+w0,mid);g.fillStyle='#e0f2ff';g.fillText(parts[1]||'',x+w0+wa,mid);g.textAlign='center';
    if(st.phase==='play')QZ.bar(g,q.x+q.w*.05,q.y+q.h*.82,q.w*.9,Math.max(5,u*.15),Math.max(0,1-(st.T-st.t0)/st.lim),{good:CY});
    K.txt(g,st.step+' / '+STEPS+'칸',W-u*2,q.y+q.h+u*.45,{size:u*.6,color:CY,maxW:u*4});
    // bridge rows far -> near
    const cam=st.cam;const order=[];for(let r=Math.max(0,Math.floor(cam)-1);r<=STEPS;r++)order.push(r);order.sort((a,b)=>{const da=a-cam,db=b-cam;return (da<0?1e3:0)-(db<0?1e3:0)||(db-da)*(da<0||db<0?-1:1);});order.forEach(r=>{const d=r-cam;if(d>6||d<-1.3)return;const done=r<st.step;
      [-1,1].forEach((sd,si)=>{const R=this.rowXY(G,d,sd);const cur=r===st.step&&Math.abs(d)<.6;let txt=null,brk=false;
        if(cur){const side=si;txt=side===st.sw?Q[2]:Q[1];if(st.broke===side&&st.fall>0)brk=true;}
        if(done&&r>=st.step-1&&false)return;
        g.globalAlpha=d<-.5?.4:1;const x=R.x-R.pw/2,y=R.y-R.ph/2;if(brk){const f=st.fall;g.save();for(let k=0;k<6;k++){const a=k*TAU/6;g.save();g.translate(R.x+Math.cos(a)*R.pw*.18*f*2,R.y+f*f*R.pw*(.5+k*.1));g.rotate(f*(k-3)*.9);g.globalAlpha=Math.max(0,1-f*.6);g.fillStyle='rgba(244,114,182,.55)';g.beginPath();g.moveTo(-R.pw*.12,-R.ph*.2);g.lineTo(R.pw*.14,-R.ph*.1);g.lineTo(R.pw*.02,R.ph*.25);g.closePath();g.fill();g.restore();}g.restore();return;}
        const gl=g.createLinearGradient(x,y,x+R.pw,y+R.ph);gl.addColorStop(0,'rgba(34,211,238,.38)');gl.addColorStop(.5,'rgba(167,139,250,.28)');gl.addColorStop(1,'rgba(34,211,238,.38)');
        K.rr(g,x,y,R.pw,R.ph,R.pw*.07);g.fillStyle=done?'rgba(134,239,172,.35)':gl;g.fill();g.lineWidth=Math.max(1.5,3*R.s);g.strokeStyle=done?'#86efac':cur?'#e0f2ff':CY;g.shadowColor=done?'#86efac':CY;g.shadowBlur=cur?u*.6:u*.2;g.stroke();g.shadowBlur=0;
        g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=Math.max(1,2*R.s);g.beginPath();g.moveTo(x+R.pw*.1,y+R.ph*.8);g.lineTo(x+R.pw*.3,y+R.ph*.2);g.stroke();
        if(cur&&txt)K.txt(g,txt,R.x,R.y,{size:Math.min(R.ph*.46,R.pw/Math.max(4,txt.length)*1.5),color:'#fff',stroke:'rgba(11,16,32,.8)',lw:u*.1,maxW:R.pw*.9});g.globalAlpha=1;});});
    if(false){const R=this.rowXY(G,-1+(st.cam),0);const x=R.x-R.pw*.8,y=R.y-R.ph/2;K.rr(g,x,y,R.pw*1.6,R.ph,R.pw*.07);g.fillStyle='rgba(167,139,250,.35)';g.fill();g.strokeStyle=VI;g.lineWidth=3;g.stroke();}
    // frog
    const FR=this.rowXY(G,-1,0);const fx=W/2,fy=FR.y;let hy=0;if(st.hop>0){st.hop=Math.max(0,st.hop-.03);hy=-Math.sin((1-st.hop)*Math.PI)*u*1.2;}
    if(st.fall>0){const f=st.fall;g.save();g.globalAlpha=Math.max(0,1-f*.45);K.emo(g,'🐸',fx+(st.pickSide?1:-1)*(Math.pow(.72,0)*G.pw*.62),fy+f*f*u*7,u*1.9,f*3);g.restore();}
    else K.emo(g,'🐸',fx+(st.step===0||st.pickSide<0?0:(st.pickSide?1:-1)*FR.pw*.62*(1-st.hop*0)),fy-u*.1+hy+Math.sin(st.T*4)*u*.05,u*1.9);
    if(st.flash>0){g.fillStyle='rgba(224,242,255,'+st.flash*.8+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
