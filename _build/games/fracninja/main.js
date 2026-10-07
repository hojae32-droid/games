/* 3~4학년 수학 · 분수와 소수 · 분수의 덧셈과 뺄셈 — 분수 닌자
   디자인: 햇살 가득한 과일 시장. 과일이 휙휙 날아올라요! 위의 주문과 같은 수가 적힌 과일만 손가락으로 쓱~ 그어서 베어요. 틀린 과일을 베면 점수가 깎여요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5b2a0e',PUR='#7c3aed';
const LOGO=gkLogo('#ffedd5','#7c2d12','🥷');
const FRUITS=['🍉','🍊','🍎','🍑','🍋','🍐','🥝','🍈'];
const LV={
  '3-1a':{t:'분수 그림',d:'색칠한 부분을 분수로'},
  '3-1b':{t:'소수',d:'0.1이 몇 개 · 분수와 소수'},
  '3-2a':{t:'분수만큼은 얼마',d:'12의 3/4은?'},
  '3-2b':{t:'가분수와 대분수',d:'서로 바꾸기'},
  '4-2':{t:'분수의 덧셈과 뺄셈',d:'분모가 같은 분수'},
};
const J=(w,t)=>{w=String(w);const c=w.charCodeAt(w.length-1);const b=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28!==0:/[013678]/.test(w[w.length-1]);const m={'은':['은','는'],'이':['이','가'],'을':['을','를'],'과':['과','와']}[t];return w+(b?m[0]:m[1]);};
/* 분수 HTML (주문 안내) */
const F=(a,b,c)=>{const fr=(n,d)=>'<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.05;margin:0 .12em;font-size:.82em"><i style="font-style:normal;border-bottom:.09em solid currentColor;padding:0 .15em">'+n+'</i><i style="font-style:normal;padding:0 .15em">'+d+'</i></span>';return c==null?fr(a,b):a+fr(b,c);};
const FT=(a,b,c)=>c==null?a+'/'+b:a+' '+b+'/'+c;
const ds=x=>x%10?(x/10).toFixed(1):String(x/10);
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fff3d6','#fed7aa']);g.fillStyle='#fb923c';for(let i=0;i<9;i++){g.beginPath();g.arc(W*(i+.5)/9,H*.08,W/18,0,Math.PI);g.fill();}
  for(let i=0;i<4;i++){const s=(T*.6+i*.25)%1,x=W*(.2+i*.2),y=H*(.9-Math.sin(s*Math.PI)*.6);K.emo(g,FRUITS[i],x,y,u*1.2,s*6);K.card(g,x-u*.6,y-u*.35,u*1.2,u*.7,u*.2,'#fff',{stroke:'#5b2a0e',lw:2,blur:0,dy:0});K.txt(g,['1/2','3/4','0.5','2/3'][i],x,y,{size:u*.5,color:'#5b2a0e',maxW:u*1.1});}}
const GAME={
  id:'fracninja',title:'분수 닌자',title1:'햇살 과일 시장',title2:'분수 닌자',emoji:LOGO,
  subtitle:'3~4학년 수학 · 분수와 소수 · 분수의 덧셈과 뺄셈',
  howto:'과일이 휙휙 날아올라요! 위의 <b>주문과 같은 수</b>가 적힌 과일만 손가락으로 <b>쓱~ 그어서</b> 베어요. 틀린 과일을 베면 점수가 깎여요. 4개를 베면 주문이 바뀌어요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:PUR,c2:'#f59e0b'},hero:gkHero(hero),vignette:.03,durs:[90,120,180],levelTitle:'어떤 수련을 할까요?',
  txt:{who:'누가 닌자일까요?',dur:'수련 시간',pace:'과일 속도',seat:'번 닌자 ',go:'수련 시작!',s1:'1. 수련',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~4학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>분수</b>: 전체를 똑같이 나눈 것 중의 일부예요. 전체를 똑같이 4로 나눈 것 중의 3은 3/4이에요.</li>
    <li><b>소수</b>: 0.1은 1/10이에요. 0.1이 7개이면 0.7이에요.</li>
    <li><b>분수만큼은 얼마</b>: 12의 3/4은 12를 4로 나눈 3씩 3묶음이라 9예요.</li>
    <li><b>가분수</b>는 분자가 분모와 같거나 더 큰 분수, <b>대분수</b>는 자연수와 진분수로 이루어진 분수예요. 7/3 = 2와 1/3</li>
    <li>분모가 같은 분수의 덧셈과 뺄셈은 분모는 그대로 두고 분자끼리 계산해요.</li></ul>`,
  init(p){const st=p.state;Object.assign(st,{T:0,fruits:[],bits:[],trails:{},spawnT:.4,inOrder:0,oid:0,ord:null,mood:'neutral',mT:0,r:40});this.res(p);this.newOrder(p,true);},
  resize(p){this.res(p);},
  res(p){const st=p.state;st.r=Math.max(34,Math.min(72,Math.min(p.W*.14,p.H*.1)));},
  /* ── 값 표현 ── */
  html(v){if(v.t==='f')return F(v.n,v.d);if(v.t==='m')return F(v.w,v.n,v.d);if(v.t==='n')return v.s;if(v.t==='pie')return '그림 '+F(v.n,v.d);if(v.t==='e')return v.p.map(x=>typeof x==='string'?' '+x+' ':this.html(x)).join('');return '';},
  plain(v){if(v.t==='f')return FT(v.n,v.d);if(v.t==='m')return FT(v.w,v.n,v.d);if(v.t==='n')return v.s;if(v.t==='pie')return '그림 '+FT(v.n,v.d);if(v.t==='e')return v.p.map(x=>typeof x==='string'?' '+x+' ':this.plain(x)).join('');return '';},
  tokens(v){if(v.t==='e')return v.p.map(x=>typeof x==='string'?{s:x}:x);if(v.t==='n')return[{s:v.s}];return[v];},
  tok(g,k,x,cy,fs,draw){if(k.s!=null){g.font=K.font(fs);const w=g.measureText(k.s).width;if(draw)g.fillText(k.s,x+w/2,cy);return w+fs*.12;}
    const f2=fs*.72;g.font=K.font(f2);let x0=x,ww=0;if(k.t==='m'){g.font=K.font(fs);const w=g.measureText(String(k.w)).width;if(draw)g.fillText(String(k.w),x+w/2,cy);x0+=w+fs*.06;ww+=w+fs*.06;g.font=K.font(f2);}
    const nw=Math.max(g.measureText(String(k.n)).width,g.measureText(String(k.d)).width)+fs*.18;if(draw){g.fillText(String(k.n),x0+nw/2,cy-f2*.55);g.fillText(String(k.d),x0+nw/2,cy+f2*.62);g.fillRect(x0,cy-fs*.04,nw,Math.max(2,fs*.07));}return ww+nw+fs*.1;},
  label(g,v,cx,cy,fs){const ks=this.tokens(v);let w=0;ks.forEach(k=>w+=this.tok(g,k,0,0,fs,false));const hh=(v.t==='n'||ks.every(k=>k.s!=null))?fs*1.25:fs*1.9;
    g.fillStyle='rgba(255,255,255,.95)';g.strokeStyle='#1e1b4b';g.lineWidth=3;K.rr(g,cx-w/2-fs*.32,cy-hh/2,w+fs*.64,hh,fs*.4);g.fill();g.stroke();g.fillStyle='#1e1b4b';g.textAlign='center';g.textBaseline='middle';let x=cx-w/2;ks.forEach(k=>x+=this.tok(g,k,x,cy+1,fs,true));},
  pie(g,v,cx,cy,r){g.save();g.beginPath();g.arc(cx,cy,r,0,7);g.fillStyle='#fb923c';g.fill();g.beginPath();g.arc(cx,cy,r*.86,0,7);g.fillStyle='#fff7ed';g.fill();
    for(let k=0;k<v.d;k++){const a0=-Math.PI/2+k/v.d*Math.PI*2,a1=a0+Math.PI*2/v.d;g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,r*.82,a0,a1);g.closePath();g.fillStyle=k<v.n?'#f97316':'#ffedd5';g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(2,r*.07);g.stroke();}g.restore();},
  /* ── 주문 ── */
  makeOrder(p){const R=p.R,L=p.levelId,o={good:[],bad:[]};const f=(n,d)=>({t:'f',n,d}),m=(w,n,d)=>({t:'m',w,n,d});
    if(L==='3-1a'){const d=R.pick([2,3,4,5,6,8]);const n=R.int(1,d-1);o.text='🎯 '+F(n,d)+' 만큼 색칠된 과일!';o.sub='전체를 똑같이 '+d+'칸으로 나눈 것 중의 '+n+'칸';o.ans=FT(n,d);o.good=[{t:'pie',n,d}];const bads=[];if(d-n!==n)bads.push({t:'pie',n:d-n,d});[d+1,d-1,d+2].forEach(dd=>{if(dd>n&&dd>=2&&dd<=10&&dd!==d)bads.push({t:'pie',n,d:dd});});if(n+1<d)bads.push({t:'pie',n:n+1,d});if(n>1)bads.push({t:'pie',n:n-1,d});o.bad=bads;o.isPie=true;}
    else if(L==='3-1b'){const v=R.int(1,29);let kind=R.int(0,2);if(kind===1&&v>=10)kind=0;if(kind===2&&(v<10||v%10===0))kind=0;
      o.text=kind===0?'🎯 0.1이 <b>'+v+'</b>개인 수!':kind===1?'🎯 '+F(v,10)+' → 소수로!':'🎯 '+Math.floor(v/10)+J(String(Math.floor(v/10)),'과').slice(-1)+' 0.'+(v%10)+'만큼인 수!';o.sub='';o.ans=ds(v);o.good=[{t:'n',s:ds(v)}];
      const bads=new Set([v+1,v-1,v+10,v-10,v<30?v*10:v+2,(v%10)*10+Math.floor(v/10)].filter(x=>x>0&&x!==v));o.bad=[...bads].map(x=>({t:'n',s:ds(x)}));}
    else if(L==='3-2a'){const d=R.pick([2,3,4,5,6]);const n=R.int(1,d-1);const k=R.int(2,d<=3?8:5);const W=d*k;const ans=k*n;o.text='🎯 <b>'+W+'</b>의 '+F(n,d)+' 만큼은?';o.sub='';o.ans=W+'의 '+FT(n,d)+' = '+ans;o.good=[{t:'n',s:String(ans)}];const bads=new Set([k,W-ans,ans+k,ans-k,ans+1,W+n].filter(x=>x>0&&x!==ans));o.bad=[...bads].map(x=>({t:'n',s:String(x)}));}
    else if(L==='3-2b'){const d=R.int(3,9),w=R.int(1,3),n=R.int(1,d-1),imp=w*d+n,n2=n+1<d?n+1:n-1;o.sub='';
      if(R.chance(.5)){o.text='🎯 '+F(imp,d)+' → 대분수로 바꾸면?';o.ans=FT(imp,d)+' = '+FT(w,n,d);o.good=[m(w,n,d)];o.bad=[m(w+1,n,d),n2>0?m(w,n2,d):null,n<d&&w<d&&n!==w?m(n,w,d):null,m(w,n,d+1)].filter(Boolean);}
      else{o.text='🎯 '+F(w,n,d)+' → 가분수로 바꾸면?';o.ans=FT(w,n,d)+' = '+FT(imp,d);o.good=[f(imp,d)];o.bad=[f(imp+1,d),f(imp-1,d),f(w+n,d),f(n*d+w,d),f(w*n,d)].filter(x=>x.n!==imp&&x.n>x.d);}}
    else{const d=R.int(4,12),t=R.int(2,d-1);o.text='🎯 계산하면 '+F(t,d)+' 인 식!';o.sub='';o.ans=FT(t,d);const mk=val=>{if(R.chance(.55)){const a=R.int(1,val-1);return{t:'e',p:[f(a,d),'+',f(val-a,d)]};}const b=R.int(1,d-val);return{t:'e',p:[f(val+b,d),'−',f(b,d)]};};
      o.good=[mk(t),mk(t),mk(t)];const bads=[];for(let k=0;k<7;k++){let v=t+R.pick([-2,-1,1,2]);if(v<2)v=t+1;if(v>d)v=t-1;if(v===t)v=t+1;bads.push(mk(v));}o.bad=bads;}
    return o;},
  val(v){if(v.t==='f')return v.n/v.d;if(v.t==='m')return v.w+v.n/v.d;if(v.t==='n')return Number(v.s);if(v.t==='pie')return v.n/v.d+(v.d/1000);if(v.t==='e'){const a=this.val(v.p[0]),b=this.val(v.p[2]);return v.p[1]==='+'?a+b:a-b;}},
  ok(o,v){if(o.isPie)return o.good.some(g=>g.n===v.n&&g.d===v.d);const a=this.val(v);return o.good.some(g=>Math.abs(this.val(g)-a)<1e-9);},
  newOrder(p,first){const st=p.state;st.ord=this.makeOrder(p);st.oid++;st.inOrder=0;p.ask(st.ord.text,st.ord.sub);st.fruits.forEach(fr=>{if(!fr.cut)fr.fade=true;});if(!first){p.float(p.W/2,(p.top||0)+p.u*1.5,'📜 새 주문!','#7c3aed',p.u*1.1);p.Snd.bell(880,0,.05);p.Snd.bell(1320,.1,.05);}st.spawnT=Math.min(st.spawnT,.5);},
  spawnWave(p){const st=p.state,R=p.R,o=st.ord,H=p.H,W=p.W;const n=R.pick([2,2,3,3,4]);const okIdx=R.chance(.85)?R.int(0,n-1):-1;const used=new Set();
    for(let k=0;k<n;k++){const wantOk=k===okIdx||R.chance(.12);let v;if(wantOk)v=R.pick(o.good);else{let tries=0;do{v=R.pick(o.bad);tries++;}while(used.has(JSON.stringify(v))&&tries<6);}
      used.add(JSON.stringify(v));const r=st.r*(v.t==='e'?1.08:1);const x=R.f()*(W*.72)+W*.14;const y0=H+r;const apex=(.34+R.f()*.22)*H;const gr=(y0-apex)/.78;const vy=-gr*1.25;const tx=W*.15+R.f()*W*.7;
      st.fruits.push({v,ok:this.ok(o,v),x,y:y0,vx:(tx-x)/2.5,vy,g:gr,r,rot:(R.f()-.5),spin:(R.f()-.5)*3,emoji:R.pick(FRUITS),delay:k*.22,oid:st.oid});}},
  update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}
    st.spawnT-=dt;if(st.spawnT<=0){this.spawnWave(p);st.spawnT=Math.max(1.25,1.75-p.t*.006)/Math.sqrt(p.pace);}
    st.fruits.forEach(f=>{if(f.delay>0){f.delay-=dt;return;}f.vy+=f.g*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.rot+=f.spin*dt*.3;if(f.fade)f.alpha=(f.alpha==null?1:f.alpha)-dt*3;});
    st.fruits=st.fruits.filter(f=>!(f.y>p.H+f.r*2&&f.vy>0)&&!(f.alpha!=null&&f.alpha<=0)&&!f.cut);
    st.bits.forEach(b=>{b.vy+=b.g*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;b.rot+=b.spin*dt;});st.bits=st.bits.filter(b=>b.life>0);
    const now=performance.now();Object.values(st.trails).forEach(tr=>{while(tr.length&&now-tr[0].t>160)tr.shift();});},
  cut(p,x1,y1,x2,y2){const st=p.state;const L=Math.hypot(x2-x1,y2-y1);if(L<3)return;
    st.fruits.forEach(f=>{if(f.cut||f.fade||f.delay>0)return;const t=clamp(((f.x-x1)*(x2-x1)+(f.y-y1)*(y2-y1))/(L*L),0,1);const dx=x1+t*(x2-x1)-f.x,dy=y1+t*(y2-y1)-f.y;if(Math.hypot(dx,dy)<f.r*.9){f.cut=true;this.slice(p,f,Math.atan2(y2-y1,x2-x1));}});},
  slice(p,f,ang){const st=p.state,o=st.ord;const nx=-Math.sin(ang),ny=Math.cos(ang);
    [1,-1].forEach(s=>st.bits.push({half:s,f,x:f.x,y:f.y,vx:f.vx*.4+nx*s*90,vy:Math.min(f.vy,0)*.3+ny*s*90-60,g:f.g,rot:0,spin:s*2.5,ang,life:1.1}));
    for(let k=0;k<10;k++){const a=Math.random()*6.28,sp=60+Math.random()*160;st.bits.push({drop:true,col:f.ok?'#fde047':'#f87171',x:f.x,y:f.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-80,g:f.g,life:.7,rot:0,spin:0});}
    p.Snd.noise&&p.Snd.noise(.12,2600,.22);
    if(f.ok){p.hit(true,{pts:50,x:f.x,y:f.y-f.r});p.Snd.bell(1047,.03,.06);st.mood='happy';st.mT=.8;st.inOrder++;if(st.inOrder>=4)setTimeout(()=>{if(p.active&&!p.finished)this.newOrder(p);},350);}
    else{st.mood='oops';st.mT=.9;const want=o.text.replace(/<[^>]+>/g,'').replace(/^🎯\s*/,'');let cutS=this.plain(f.v);if(f.v.t==='e'){const d=f.v.p[0].d;cutS+=' = '+FT(Math.round(this.val(f.v)*d),d);}
      p.hit(false,{pen:25,shake:false,x:f.x,y:f.y-f.r,review:'주문 「'+want.trim()+'」 · 벤 과일 '+cutS+' · 정답 '+o.ans,tip:'앗! 그 과일은 주문과 달라요',tipMs:1400});}},
  down(p,x,y,e){const st=p.state;st.trails[e.pointerId]=[{x,y,t:performance.now()}];},
  move(p,x,y,down,e){const st=p.state;const tr=st.trails[e.pointerId];if(!tr||!down)return;const last=tr[tr.length-1];tr.push({x,y,t:performance.now()});if(tr.length>14)tr.shift();this.cut(p,last.x,last.y,x,y);},
  up(p,x,y,d,e){delete p.state.trails[e.pointerId];},
  botAct(p){const st=p.state;const f=st.fruits.find(f=>f.ok&&!f.cut&&!f.fade&&f.delay<=0&&f.y<p.H*.9&&f.y>p.H*.2);if(!f)return null;const rc=p.cv.getBoundingClientRect();return{k:'swipe',x:rc.left+f.x-f.r,y:rc.top+f.y,dx:f.r*2,dy:0};},
  draw(p,g){const st=p.state,W=p.W,H=p.H,u=p.u,t=st.T;
    K.vgrad(g,0,0,W,H,['#fff3d6','#fed7aa']);const ty0=p.top||u*2.6;g.fillStyle='#fdba74';g.fillRect(0,H*.85,W,H*.15);g.fillStyle='#fb923c';for(let i=0;i<12;i++){g.beginPath();g.arc(W*(i+.5)/12,ty0*.9,W/24,0,Math.PI);g.fill();}
    g.strokeStyle='rgba(124,45,18,.12)';g.lineWidth=2;for(let i=0;i<8;i++){g.beginPath();g.moveTo(0,H*.85+i*u*.4);g.lineTo(W,H*.85+i*u*.4);g.stroke();}
    const EM='"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';const fs=Math.max(15,st.r*.42);
    const drawFruit=f=>{g.save();g.translate(f.x,f.y);if(f.v.t==='pie'){g.rotate(f.rot*.2);this.pie(g,f.v,0,0,f.r);}else{g.save();g.rotate(f.rot);K.emo(g,f.emoji,0,f.r*.08,f.r*1.9);g.restore();this.label(g,f.v,0,0,f.v.t==='n'?fs*1.15:fs);}g.restore();};
    st.fruits.forEach(f=>{if(f.delay>0)return;g.globalAlpha=f.alpha==null?1:Math.max(0,f.alpha);drawFruit(f);g.globalAlpha=1;});
    st.bits.forEach(b=>{g.globalAlpha=clamp(b.life*1.5,0,1);if(b.drop){g.fillStyle=b.col;g.beginPath();g.arc(b.x,b.y,4,0,7);g.fill();}
      else{g.save();g.translate(b.x,b.y);g.rotate(b.ang);g.beginPath();g.rect(-b.f.r*1.4,b.half>0?0:-b.f.r*1.4,b.f.r*2.8,b.f.r*1.4);g.clip();g.rotate(-b.ang+b.rot);drawFruit(Object.assign({},b.f,{x:0,y:0}));g.restore();if(!b.f.ok&&b.half>0){K.txt(g,'✖',b.x,b.y,{size:b.f.r,color:'#ef4444',maxW:b.f.r*2});}}g.globalAlpha=1;});
    Object.values(st.trails).forEach(tr=>{if(tr.length<2)return;g.lineCap='round';g.lineJoin='round';for(let k=1;k<tr.length;k++){const w=k/tr.length;g.strokeStyle='rgba(124,58,237,'+(.25+.7*w)+')';g.lineWidth=2+9*w;g.beginPath();g.moveTo(tr[k-1].x,tr[k-1].y);g.lineTo(tr[k].x,tr[k].y);g.stroke();g.strokeStyle='rgba(255,255,255,'+(.2+.6*w)+')';g.lineWidth=1+3*w;g.stroke();}});
    /* 닌자 + 주문 진행 */
    K.emo(g,st.mood==='oops'?'🥷':'🥷',u*1.2,H-u*1.2,u*1.7+(st.mood==='happy'?Math.sin(t*20)*u*.1:0));
    const pr=u*.22;for(let i=0;i<4;i++){const x=W/2+(i-1.5)*pr*2.8;g.beginPath();g.arc(x,(p.top||u*2.6)+u*.45,pr,0,TAU);g.fillStyle=i<st.inOrder?'#facc15':'rgba(0,0,0,.35)';g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(1.5,u*.05);g.stroke();}
    K.txt(g,'✋ 손가락(마우스)을 누른 채 과일 위로 쓱~',W/2,H-u*.5,{size:u*.45,color:'rgba(91,42,14,.55)',maxW:W*.8});
  },
};
Engine.boot(GAME);
