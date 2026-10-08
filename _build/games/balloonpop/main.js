/* 1~2학년 수학 · 모으기와 가르기 · 덧셈과 뺄셈 — 10 만들기 풍선 팡팡
   디자인: 파란 하늘로 둥실둥실 떠오르는 큼직한 숫자 풍선. 두 풍선을 차례로 톡, 톡 눌러 목표 수를 만들면 팡! 터져요. ⭐ 반짝 풍선은 점수 2배! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0c4a6e';
const LOGO=gkLogo('#bae6fd','#0369a1','🎈');
const BCOL=['#ef4444','#f97316','#22c55e','#3b82f6','#a855f7','#ec4899','#14b8a6'];
const J=(w,t)=>{w=String(w);const c=w.charCodeAt(w.length-1);const b=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28!==0:/[013678]/.test(w[w.length-1]);const m={'이':['이','가']}[t];return w+(b?m[0]:m[1]);};
const LV={
  '1-1':{g:'1~2학년',t:'9까지 모으기',d:'두 수를 모아 5~9 만들기'},
  '1-2a':{g:'1~2학년',t:'10 만들기',d:'더해서 10이 되는 두 수'},
  '1-2b':{g:'1~2학년',t:'10을 넘는 덧셈',d:'(몇)+(몇) = 11~18'},
  '2-1a':{g:'1~2학년',t:'두 자리 수 덧셈',d:'더해서 50~99 만들기'},
  '2-1b':{g:'1~2학년',t:'뺄셈 풍선',d:'차가 목표 수인 두 수'},
};
const RULES={
  '1-1':{T:R=>R.int(5,9),pair:(R,T)=>{const a=R.int(1,T-1);return[a,T-a];},decoy:R=>R.int(1,8),ok:(a,b,T)=>a+b===T,change:true,op:'+'},
  '1-2a':{T:()=>10,pair:R=>{const a=R.int(1,9);return[a,10-a];},decoy:R=>R.int(1,9),ok:(a,b,T)=>a+b===T,change:false,op:'+'},
  '1-2b':{T:R=>R.int(11,18),pair:(R,T)=>{const a=R.int(T-9,9);return[a,T-a];},decoy:R=>R.int(2,9),ok:(a,b,T)=>a+b===T,change:true,op:'+'},
  '2-1a':{T:R=>R.int(50,99),pair:(R,T)=>{const a=R.int(12,T-12);return[a,T-a];},decoy:(R,T)=>R.int(12,T-12),ok:(a,b,T)=>a+b===T,change:true,op:'+'},
  '2-1b':{T:R=>R.int(3,9),pair:(R,T)=>{const a=R.int(10,40);return R.chance(.5)?[a,a+T]:[a+T,a];},decoy:R=>R.int(10,48),ok:(a,b,T)=>Math.abs(a-b)===T,change:true,op:'-'},
};
function balloon(g,x,y,r,col,gold,t,sel){g.save();g.translate(x,y);const sc=sel?1.12:1;g.scale(sc,sc);if(gold)K.glow(g,0,0,r*1.7,'#fde047',.7);
  g.strokeStyle='rgba(71,85,105,.7)';g.lineWidth=Math.max(2,r*.05);g.beginPath();g.moveTo(0,r*1.12);g.quadraticCurveTo(-r*.3,r*1.5,0,r*1.8);g.quadraticCurveTo(r*.3,r*2.1,0,r*2.4);g.stroke();
  g.fillStyle=gold?'#facc15':col;g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=3;g.beginPath();g.moveTo(0,-r*1.1);g.bezierCurveTo(r*1.05,-r*1.1,r*1.2,r*.45,r*.15,r*1.02);g.lineTo(r*.18,r*1.14);g.lineTo(-r*.18,r*1.14);g.lineTo(-r*.15,r*1.02);g.bezierCurveTo(-r*1.2,r*.45,-r*1.05,-r*1.1,0,-r*1.1);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.ellipse(-r*.42,-r*.5,r*.14,r*.3,.5,0,TAU);g.fill();
  if(sel){g.strokeStyle='#fff';g.lineWidth=Math.max(4,r*.1);g.beginPath();g.moveTo(0,-r*1.1);g.bezierCurveTo(r*1.05,-r*1.1,r*1.2,r*.45,r*.15,r*1.02);g.lineTo(-r*.15,r*1.02);g.bezierCurveTo(-r*1.2,r*.45,-r*1.05,-r*1.1,0,-r*1.1);g.closePath();g.stroke();}
  K.txt(g,String(t),0,-r*.1,{size:r*(String(t).length>1?.78:1),color:'#fff',stroke:'rgba(0,0,0,.45)',lw:r*.12,maxW:r*1.5});if(gold)K.emo(g,'⭐',r*.7,-r*.9,r*.5);g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#7dd3fc','#bae6fd','#fbcfe8']);K.clouds&&K.clouds(g,W,H,T,.5,3,u*1.8);
  [[.2,.62,'7',BCOL[0]],[.36,.4,'3',BCOL[3]],[.52,.66,'10',BCOL[2]],[.68,.36,'5',BCOL[4]],[.82,.6,'5',BCOL[1]]].forEach(([x,y,t,c],i)=>balloon(g,W*x,H*y+Math.sin(T*1.5+i)*u*.25,u*1.2,c,i===2,t,false));
  g.fillStyle='#86efac';g.fillRect(0,H*.9,W,H*.1);}
const GAME={
  id:'balloonpop',title:'10 만들기 풍선 팡팡',title1:'하늘로 둥실 숫자 풍선',title2:'10 만들기 풍선 팡팡',emoji:LOGO,
  subtitle:'1~2학년 수학 · 모으기와 가르기 · 덧셈과 뺄셈',
  howto:'🎈 숫자 풍선이 둥실둥실 떠올라요! 두 풍선을 차례로 <b>톡, 톡</b> 눌러 목표 수를 만들면 <b>팡!</b> 터져요. 연속으로 맞히면 점수가 쑥쑥, ⭐ 반짝 풍선은 2배!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#0ea5e9',c2:'#f59e0b'},hero:gkHero(hero),vignette:.02,durs:[60,90,120],levelTitle:'어떤 풍선을 터뜨릴까요?',
  txt:{who:'누가 풍선을 터뜨릴까요?',dur:'게임 시간',pace:'풍선 속도',seat:'번 친구 ',go:'팡팡 시작!',s1:'1. 단원',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>모으기</b>는 두 수를 합치는 것이고, <b>가르기</b>는 한 수를 둘로 나누는 거예요. 4와 6을 모으면 10, 10은 4와 6으로 가를 수 있어요.</li>
    <li>더해서 10이 되는 짝: 1+9, 2+8, 3+7, 4+6, 5+5</li>
    <li>두 수의 차는 큰 수에서 작은 수를 뺀 거예요. 큰 수 − 작은 수 = 차</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2;const bw=clamp(Math.min(W/4.3,H/5.2),56,104);return{W,H,u,top,bw};},
  init(p){const st=p.state;Object.assign(st,{T:0,rule:RULES[p.levelId],balls:[],queue:[],sel:null,spawnT:0,hits:0,lastX:-999,fx:[],pops:[],ci:0});st.tgt=st.rule.T(p.R);this.order(p);},
  order(p){const st=p.state;p.ask(st.rule.op==='+'?'🎯 더해서 '+st.tgt+' !':'🎯 두 수의 차가 '+st.tgt+' !',st.rule.op==='+'?'두 풍선을 차례로 톡, 톡!':'큰 수 − 작은 수 = '+st.tgt);},
  refill(p){const st=p.state,R=p.R,rl=st.rule;const [a,b]=rl.pair(R,st.tgt);const gold=R.chance(.12);const batch=[{v:a,gold},{v:b}];if(R.chance(.6))batch.push({v:rl.decoy(R,st.tgt)});st.queue.push(...R.shuffle(batch));},
  spawn(p){const st=p.state,R=p.R,G=this.geo(p);if(!st.queue.length)this.refill(p);const it=st.queue.shift();const bw=G.bw;let x=bw*.6+R.f()*Math.max(1,G.W-bw*1.2);if(Math.abs(x-st.lastX)<bw*.9)x=bw*.6+((x+bw*1.3-bw*.6)%Math.max(1,G.W-bw*1.2));st.lastX=x;
    st.ci+=R.int(1,3);const rise=(p.levelId==='1-1'?9:8.5)*(p.t>40?.88:1)/Math.max(.7,p.pace);const b={x,y:G.H+bw,v:it.v,gold:it.gold,col:BCOL[st.ci%BCOL.length],spd:(G.H+bw*3)/rise,ph:R.f()*6.28,alive:true,shake:0};st.balls.push(b);},
  update(p,dt){const st=p.state,G=this.geo(p);st.T+=dt;st.spawnT-=dt;const want=p.levelId==='1-1'?.95:.85;if(st.spawnT<=0){this.spawn(p);st.spawnT=want*(st.balls.length<4?.55:1);}
    st.balls.forEach(b=>{b.y-=b.spd*dt;b.ph+=dt*1.8;if(b.shake>0)b.shake-=dt;if(b.y<-G.bw*1.7){b.alive=false;if(st.sel===b)st.sel=null;}});st.balls=st.balls.filter(b=>b.alive);
    st.fx.forEach(f=>f.t+=dt);st.fx=st.fx.filter(f=>f.t<.7);st.pops.forEach(f=>f.t+=dt);st.pops=st.pops.filter(f=>f.t<.9);},
  pos(p,b){const G=this.geo(p);return{x:b.x+Math.sin(b.ph)*6,y:b.y};},
  down(p,x,y){const st=p.state,G=this.geo(p);const r=G.bw*.5;let best=null,bd=1e9;st.balls.forEach(b=>{const c=this.pos(p,b);const dx=(x-c.x)/(r*1.1),dy=(y-c.y)/(r*1.35);const d=dx*dx+dy*dy;if(d<1&&d<bd){bd=d;best=b;}});if(!best)return;this.tap(p,best);},
  tap(p,b){const st=p.state,G=this.geo(p);if(!st.sel){st.sel=b;p.Snd.tone&&p.Snd.tone(660,.07,'sine',.05);return;}if(st.sel===b){st.sel=null;p.Snd.tap&&p.Snd.tap();return;}
    const a=st.sel;st.sel=null;const rl=st.rule,ok=rl.ok(a.v,b.v,st.tgt);const A=this.pos(p,a),B=this.pos(p,b);const mx=(A.x+B.x)/2,my=(A.y+B.y)/2;
    if(ok){[a,b].forEach(z=>{z.alive=false;const c=this.pos(p,z);st.fx.push({x:c.x,y:c.y,t:0,col:z.col});});st.pops.push({x:mx,y:my,t:0});p.hit(true,{pts:a.gold||b.gold?20:10,x:mx,y:my});p.Snd.noise&&p.Snd.noise(.09,1800,.25);st.hits++;if(rl.change&&st.hits%3===0)this.newTarget(p);}
    else{a.shake=b.shake=.4;const big=Math.max(a.v,b.v),sm=Math.min(a.v,b.v);const rv=rl.op==='+'?a.v+' + '+b.v+' = '+(a.v+b.v)+' (목표 '+st.tgt+' 아님)':big+' − '+sm+' = '+(big-sm)+' (목표 '+st.tgt+' 아님)';
      p.hit(false,{pen:2,shake:false,x:mx,y:my,tip:rv,tipMs:1500,review:(rl.op==='+'?'더해서 '+st.tgt+' 만들기: ':'차가 '+st.tgt+': ')+rv});}
    st.balls=st.balls.filter(z=>z.alive);},
  newTarget(p){const st=p.state;let T;for(let k=0;k<10;k++){T=st.rule.T(p.R);if(T!==st.tgt)break;}st.tgt=T;st.balls.forEach(b=>{b.alive=false;});st.balls=[];st.queue=[];st.sel=null;this.order(p);p.tip('🎯 새 목표 '+T+'!','good',1300);st.spawnT=.6;},
  botAct(p){const st=p.state,G=this.geo(p);const vis=st.balls.filter(b=>b.y>G.top+G.bw&&b.y<G.H-G.bw*.5);const rc=p.cv.getBoundingClientRect();const cl=b=>{const c=this.pos(p,b);return{k:'click',x:rc.left+c.x,y:rc.top+c.y};};
    if(st.sel&&st.balls.includes(st.sel)){const m=vis.find(b=>b!==st.sel&&st.rule.ok(st.sel.v,b.v,st.tgt));if(m)return cl(m);st.sel=null;}
    for(const a of vis)for(const b of vis)if(a!==b&&st.rule.ok(a.v,b.v,st.tgt))return cl(a);return null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,bw=G.bw,t=st.T;
    K.vgrad(g,0,0,W,H,['#7dd3fc','#bae6fd','#fbcfe8']);K.clouds&&K.clouds(g,W,H,t*1.5,.5,3,u*1.8);g.fillStyle='#86efac';g.fillRect(0,H-u*.5,W,u*.5);
    st.balls.forEach(b=>{const c=this.pos(p,b);const sx=b.shake>0?Math.sin(b.shake*60)*5:0;balloon(g,c.x+sx,c.y,bw*.5,b.col,b.gold,b.v,st.sel===b);});
    st.fx.forEach(f=>{const k=f.t/.7;for(let i=0;i<10;i++){const a=i/10*TAU;g.fillStyle=f.col;g.globalAlpha=1-k;g.beginPath();g.arc(f.x+Math.cos(a)*bw*.9*k,f.y+Math.sin(a)*bw*.9*k,Math.max(2,bw*.07*(1-k)),0,TAU);g.fill();}g.globalAlpha=1;});
    st.pops.forEach(f=>{const k=f.t/.9;K.txt(g,'팡!',f.x,f.y-bw*.6*k,{size:bw*.6*(1+k*.3),color:'#f59e0b',stroke:'#fff',lw:bw*.1});});
  },
};
Engine.boot(GAME);
