/* 3~6학년 미술 · 다양한 표현 기법 — 기법 갤러리 레일
   디자인: 천장 레일에 작품이 줄줄이 매달려 흘러가는 현대 미술관. 위에 나온 표현 기법으로 만든 작품이 지나갈 때 콕 눌러요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1f2d3d',BL='#2b6cb0',OR='#e8590c';
const LOGO=gkLogo('#fbfdff','#1a365d','🖌️');
const LV={
  basic:{t:'표현 기법 기초',d:'데칼코마니 · 스크래치 · 모자이크 · 점묘 · 콜라주'},
  adv:{t:'표현 기법 더하기',d:'마블링 · 번지기 · 프로타주 · 판화 · 스텐실'},
  all:{t:'모든 기법 도전',d:'10가지 기법이 섞여 나와요'},
};
let RNG=Math.random;const R=()=>RNG();
/*@@DATA@@*/
function artCanvas(name){const c=canvas(),x=c.getContext('2d');GEN[name](x);return c;}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#e7edf3','#cbd5e1']);g.fillStyle='#94a3b8';g.fillRect(0,H*.12,W,u*.2);const names=['#E63946','#2A9D8F','#7209B7','#FFB703','#4361EE'];for(let i=0;i<5;i++){const x=((i*W*.26-T*W*.1)%(W*1.3)+W*1.3)%(W*1.3)-W*.15,w=W*.2;g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(x+w/2,H*.14);g.lineTo(x+w/2,H*.26);g.stroke();K.card(g,x,H*.26,w,w,u*.1,'#fff',{stroke:'#1a365d',lw:3,blur:u*.1,dy:u*.05});g.fillStyle=names[i];g.beginPath();g.arc(x+w/2,H*.26+w/2,w*.25,0,TAU);g.fill();}}
const GAME={
  id:'railgallery',title:'기법 갤러리 레일',title1:'미술관 천장 레일',title2:'기법 갤러리 레일',emoji:LOGO,
  subtitle:'3~6학년 미술 · 다양한 표현 기법',
  howto:'미술관 레일 위로 작품이 흘러가요. 위에 나온 <b>표현 기법으로 만든 작품</b>이 지나갈 때 콕 눌러요! 다른 작품을 누르면 점수가 깎여요. 놓치지 말고 빨리 찾을수록 점수가 커요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:BL,c2:OR},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 기법을 살펴볼까요?',
  txt:{who:'누가 관람객일까요?',dur:'관람 시간',pace:'레일 속도',seat:'번 관람객 ',go:'관람 시작!',s1:'1. 기법',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>데칼코마니</b>: 종이를 접었다 펴서 양쪽이 똑같은 무늬를 만들어요. <b>스크래치</b>: 검은 칠을 긁어 아래 색이 드러나게 해요. <b>모자이크</b>: 작은 조각을 붙여 그림을 만들어요. <b>점묘</b>: 작은 점을 찍어 표현해요. <b>콜라주</b>: 여러 종이·재료를 오려 붙여요.</li>
    <li><b>마블링</b>: 물 위에 뜬 물감 무늬를 종이에 찍어 내요. <b>번지기</b>: 젖은 종이에 물감이 퍼지게 해요. <b>프로타주</b>: 물체 위에 종이를 대고 문질러 무늬를 옮겨요. <b>판화</b>: 판에 새겨 찍어 내요. <b>스텐실</b>: 구멍 뚫린 판 위로 물감을 칠해 모양을 찍어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4;const fw=Math.min(u*6.5,H*.32,W*.42);const railY=top+u*2.2;return{W,H,u,top,pad,fw,railY,fy:railY+u*1.4,msgY:H-pad-u*1.2};},
  init(p){const st=p.state;Object.assign(st,{T:0,frames:[],target:null,since:0,bagT:[],speed:.17,tgtT:0,msg:'',msgT:0,cache:null,hits:0,missT:0});RNG=()=>p.R.f();this.build(p);this.nextTarget(p);},
  build(p){const st=p.state;const set=SET[p.levelId];st.set=set;st.cache={};set.forEach(n=>{st.cache[n]=[artCanvas(n),artCanvas(n),artCanvas(n)];});},
  nextTarget(p){const st=p.state;if(!st.bagT.length)st.bagT=p.R.shuffle(st.set.slice());let t=st.bagT.pop();if(t===st.target&&st.bagT.length)t=st.bagT.pop();st.target=t;st.since=0;st.tgtT=st.T;p.ask('🔍 이 기법의 작품을 찾아요: <b>'+t+'</b>','레일 위를 지나는 작품을 콕!');},
  spawn(p){const st=p.state;const set=st.set;let name;if(st.since>=1||(!st.frames.some(f=>f.name===st.target&&!f.done)&&p.R.f()<.45)){name=st.target;st.since=0;}else{do{name=p.R.pick(set);}while(name===st.target);st.since++;}
    const f={name,img:p.R.pick(st.cache[name]),x:1.05,done:false,res:null,t:0};st.frames.push(f);return f;},
  tap(p,f,x,y){const st=p.state;if(f.done)return;if(f.name===st.target){f.done=true;f.res='right';const el=st.T-st.tgtT;p.hit(true,{pts:50+Math.round(50*Math.max(0,1-el/8)),x,y});st.msg=st.target+': '+DESC[st.target];st.msgT=2.2;st.speed=Math.min(.26,st.speed+.004);st.hits++;setTimeout(()=>{if(p.active&&!p.finished)this.nextTarget(p);},700);}
    else{f.res='wrong';f.t=.4;p.hit(false,{pen:20,shake:false,x,y,review:"'"+st.target+"' 작품을 찾는데 '"+f.name+"' 작품을 눌렀어요 ("+DESC[f.name]+')',tip:"그건 '"+f.name+"' 작품이에요",tipMs:1300});}},
  down(p,x,y){const st=p.state;const G=this.geo(p);for(let i=st.frames.length-1;i>=0;i--){const f=st.frames[i];const fx=f.x*G.W;if(x>=fx&&x<=fx+G.fw&&y>=G.fy&&y<=G.fy+G.fw+G.u*1.3){this.tap(p,f,x,y);return;}}},
  update(p,dt){const st=p.state;st.T+=dt;if(st.msgT>0)st.msgT-=dt;const G=this.geo(p);const spd=st.speed*Math.sqrt(p.pace);
    st.frames.forEach(f=>{f.x-=spd*dt;if(f.t>0)f.t-=dt;});const fwN=G.fw/G.W;const last=st.frames[st.frames.length-1];
    if(!last||last.x+fwN+.06<1.02){const nf=this.spawn(p);if(last)nf.x=Math.max(1.02,last.x+fwN+.06);}
    st.frames=st.frames.filter(f=>{if(f.x<-fwN-.05){if(f.name===st.target&&!f.done){p.hit(false,{pen:10,shake:false,quiet:true,review:"'"+st.target+"' 작품을 놓쳤어요 ("+DESC[st.target]+')',tip:"'"+st.target+"' 작품을 놓쳤어요",tipMs:1400});st.msg=st.target+': '+DESC[st.target];st.msgT=2;f.done=true;setTimeout(()=>{if(p.active&&!p.finished)this.nextTarget(p);},500);}return false;}return true;});},
  botAct(p){const st=p.state;const G=this.geo(p);const f=st.frames.find(f=>f.name===st.target&&!f.done&&f.x*G.W>G.W*.05&&f.x*G.W+G.fw<G.W*.95);if(!f)return null;const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+f.x*G.W+G.fw/2,y:rc.top+G.fy+G.fw/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;K.vgrad(g,0,0,W,H,['#eef2f7','#d3dbe6']);g.fillStyle='#e2e8f0';g.fillRect(0,H*.78,W,H*.22);g.fillStyle='rgba(148,163,184,.35)';g.fillRect(0,H*.78,W,u*.15);
    g.fillStyle='#94a3b8';g.fillRect(0,G.railY-u*.2,W,u*.35);g.fillStyle='#64748b';g.fillRect(0,G.railY+u*.15,W,u*.08);
    for(let x=((-t*30)%80);x<W;x+=80){g.fillStyle='rgba(30,45,61,.2)';g.fillRect(x,G.railY-u*.12,18,u*.18);}
    const cx=W/2;const gr=g.createRadialGradient(cx,G.railY,10,cx,H*.6,W*.5);gr.addColorStop(0,'rgba(255,230,160,.35)');gr.addColorStop(1,'rgba(255,230,160,0)');g.fillStyle=gr;g.fillRect(0,G.railY,W,H);
    st.frames.forEach(f=>{const fx=f.x*W;const sw=f.res==='wrong'&&f.t>0?Math.sin(f.t*60)*4:0;const bob=Math.sin(t*2+fx*.01)*2;g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(fx+G.fw*.25,G.railY+u*.2);g.lineTo(fx+G.fw*.25+sw,G.fy+bob);g.moveTo(fx+G.fw*.75,G.railY+u*.2);g.lineTo(fx+G.fw*.75+sw,G.fy+bob);g.stroke();
      const right=f.res==='right',wrong=f.res==='wrong';g.save();g.translate(sw,bob);K.card(g,fx,G.fy,G.fw,G.fw,u*.1,right?'#bbf7d0':wrong?'#fecaca':'#fff',{stroke:right?'#16a34a':wrong?'#dc2626':'#1a365d',lw:right?6:3,blur:u*.25,dy:u*.12});const m=G.fw*.06;g.drawImage(f.img,fx+m,G.fy+m,G.fw-2*m,G.fw-2*m);
      if(f.res){K.card(g,fx+G.fw*.1,G.fy+G.fw+u*.2,G.fw*.8,u*.8,u*.1,'#fff',{stroke:'#1a365d',lw:2,blur:0,dy:0});K.txt(g,f.name,fx+G.fw/2,G.fy+G.fw+u*.6,{size:Math.min(u*.55,G.fw*.13),color:INK,maxW:G.fw*.74});}g.restore();});
    K.card(g,W/2-Math.min(W*.4,u*10),G.top-u*.2,Math.min(W*.8,u*20),u*1.4,u*.2,'#fbfdff',{stroke:'#1a365d',lw:3,blur:0,dy:0});K.txt(g,'🔍 찾을 기법: '+st.target,W/2,G.top+u*.5,{size:Math.min(u*.9,u*1.4*.5),color:BL,maxW:Math.min(W*.76,u*19)});
    if(st.msgT>0)K.txt(g,st.msg,W/2,G.msgY,{size:u*.6,color:INK,maxW:W*.9});else K.txt(g,'레일을 지나는 작품 중 위의 기법으로 만든 작품을 콕!',W/2,G.msgY,{size:u*.5,color:'rgba(31,45,61,.6)',maxW:W*.9});
  },
};
Engine.boot(GAME);
