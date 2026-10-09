/* 3~4학년 영어 · 알파벳 — 알파벳 풍선 팡
   디자인: 빨강·하양 줄무늬 서커스 천막 위로 떠오르는 알록달록 풍선. 문제에 맞는 알파벳 풍선만 톡! 터뜨려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#4a1a12',RED='#e11d48',BLUE='#2563eb';
const LOGO=gkLogo('#fffaf0','#7f1d1d','🔤');
const L26='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const COLORS=['#FF5C8A','#FF9F1C','#2EC4B6','#7C5CFF','#3A86FF','#F15BB5','#06A77D'];
const LOOK=[['b','d'],['p','q'],['m','n'],['u','v'],['i','j'],['c','e'],['f','t'],['g','q'],['h','n'],['o','a']];
const LV={
  order:{g:'3~4학년',t:'ABC 순서 풍선',d:'A B ? — 다음 알파벳'},
  pair:{g:'3~4학년',t:'작은 글자 ↔ 큰 글자',d:'소문자와 짝인 대문자'},
  missing:{g:'3~4학년',t:'빠진 글자 풍선',d:'그림 낱말의 빠진 글자'},
};
function balloon(g,x,y,r,col,t,sc){g.save();g.translate(x,y);g.scale(sc||1,sc||1);g.strokeStyle='rgba(60,40,40,.6)';g.lineWidth=Math.max(2,r*.05);g.beginPath();g.moveTo(0,r*1.1);g.quadraticCurveTo(-r*.3,r*1.5,0,r*1.8);g.quadraticCurveTo(r*.3,r*2.1,0,r*2.4);g.stroke();
  g.fillStyle=col;g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=3;g.beginPath();g.moveTo(0,-r*1.1);g.bezierCurveTo(r*1.05,-r*1.1,r*1.2,r*.45,r*.15,r*1.02);g.lineTo(r*.18,r*1.14);g.lineTo(-r*.18,r*1.14);g.lineTo(-r*.15,r*1.02);g.bezierCurveTo(-r*1.2,r*.45,-r*1.05,-r*1.1,0,-r*1.1);g.closePath();g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.ellipse(-r*.42,-r*.5,r*.14,r*.3,.5,0,TAU);g.fill();K.txt(g,t,0,-r*.1,{size:r*1.05,color:'#fff',stroke:'rgba(0,0,0,.45)',lw:r*.14,maxW:r*1.5});g.restore();}
function hero(g,W,H,T,u){g.fillStyle='#fff';g.fillRect(0,0,W,H);for(let i=0;i<10;i++){g.fillStyle=i%2?'#fff':'#e11d48';g.beginPath();g.moveTo(W/2,H*.02);g.lineTo(W*i/10,H*.34);g.lineTo(W*(i+1)/10,H*.34);g.fill();}
  ['A','B','C','D','E'].forEach((c,i)=>balloon(g,W*(.14+i*.18),H*.66+Math.sin(T*1.6+i)*u*.3,u*1.2,COLORS[i],c));g.fillStyle='#fde68a';g.fillRect(0,H*.92,W,H*.08);}
const GAME={
  id:'alphabetpop',title:'알파벳 풍선 팡',title1:'서커스 천막 풍선',title2:'알파벳 풍선 팡',emoji:LOGO,
  subtitle:'3~4학년 영어 · 알파벳 · 대문자와 소문자',
  howto:'🎈 하늘로 올라가는 풍선 중에서 <b>문제에 맞는 알파벳</b>을 눌러 터뜨려요! 틀린 풍선을 누르면 감점이에요. 빠르게 터뜨릴수록 점수가 커요. 알파벳 소리를 들으려면 소리를 켜 두세요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:'#facc15'},hero:gkHero(hero),vignette:.02,durs:[90,120,180],levelTitle:'어떤 풍선을 터뜨릴까요?',
  txt:{who:'누가 풍선을 터뜨릴까요?',dur:'공연 시간',pace:'풍선 속도',seat:'번 친구 ',go:'팡팡 시작!',s1:'1. 문제',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>알파벳은 A부터 Z까지 <b>26개</b>예요. 순서를 알면 사전도 쉽게 찾을 수 있어요.</li>
    <li>알파벳에는 <b>대문자(A B C)</b>와 <b>소문자(a b c)</b>가 있어요. b와 d, p와 q처럼 닮은 글자는 방향을 잘 봐요.</li>
    <li>낱말에서 빠진 글자는 소리 내어 읽어 보면 쉽게 찾을 수 있어요. 예) c_t → cat</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2;const r=clamp(Math.min(W*.075,H*.065),u*.7,u*1.5);return{W,H,u,top,r,bot:H-u*.5};},
  init(p){const st=p.state,R=p.R;Object.assign(st,{T:0,bs:[],spawnAt:0,cool:0,T0:null,nid:0,wl:null,flash:0});st.wl=EN.words('3',{pic:1,alpha:1,min:3,max:5}).concat(EN.words('4',{pic:1,alpha:1,min:3,max:5}));this.mk(p);},
  mk(p){const st=p.state,R=p.R,deck=p.levelId;let T;
    if(deck==='order'){const k=R.int(0,23);const pre=[];if(k>=1)pre.push(L26[k-1]);pre.push(L26[k]);T={ans:L26[k+1],html:pre.join(' ')+' ?',e:'',hint:'다음에 올 알파벳은?',pool:()=>L26[R.int(0,25)],near:[L26[k],L26[k+2]||L26[0],L26[k-1]||L26[1]],say:null};}
    else if(deck==='pair'){const c=R.pick(L26.split(''));const lk=LOOK.find(x=>x.includes(c.toLowerCase()));T={ans:c,html:c.toLowerCase()+' = ?',e:'',hint:'짝이 되는 큰 글자는?',pool:()=>L26[R.int(0,25)],near:lk?lk.map(x=>x.toUpperCase()).filter(x=>x!==c):[],say:c.toLowerCase()};}
    else{if(!st.bag)st.bag=EN.bag(st.wl,()=>R.f());const w=st.bag();const i=R.int(0,w.e.length-1);const a=w.e[i];T={ans:a,html:w.e.split('').map((c,j)=>j===i?'_':c).join(' '),e:w.p,hint:'빠진 글자는? ('+w.k+')',pool:()=>L26[R.int(0,25)].toLowerCase(),near:[],say:w.e};}
    T.t0=st.T;st.T0=T;st.bs=[];st.spawnAt=0;p.ask('🔤 '+T.html,T.hint);if(T.say)enSay(T.say);},
  update(p,dt){const st=p.state,R=p.R,G=this.geo(p);st.T+=dt;if(st.flash>0)st.flash-=dt;const T=st.T0;if(!T)return;const ramp=1+Math.min(.5,st.T/150);
    st.bs.forEach(b=>{if(b.dead){b.pop+=dt;return;}b.y+=b.v*ramp*dt*Math.min(1.2,p.pace);b.ph+=dt*2;});st.bs=st.bs.filter(b=>!(b.pop>.3)&&b.y<112);
    const n=G.W<420?5:7;const alive=st.bs.filter(b=>!b.dead);
    if(st.T>st.spawnAt&&alive.length<n){this.spawn(p);st.spawnAt=st.T+(G.W<420?.9:.65);}else if(!alive.some(b=>b.ch===T.ans)&&st.T>st.cool){this.spawn(p);st.cool=st.T+.3;}},
  spawn(p){const st=p.state,R=p.R,T=st.T0;let ch;const has=st.bs.some(b=>b.ch===T.ans&&!b.dead);
    if(!has)ch=T.ans;else{const taken=new Set(st.bs.map(b=>b.ch));const cand=(R.chance(.5)?T.near:[]).concat([T.pool(),T.pool(),T.pool()]).filter(c=>c&&c!==T.ans&&!taken.has(c));ch=cand[0]||T.pool();if(ch===T.ans)ch=T.near[0]||'X';}
    st.bs.push({ch,x:12+R.f()*76,y:0,v:11+R.f()*5,ph:R.f()*6,dead:false,pop:0,col:COLORS[st.nid++%COLORS.length]});},
  pos(G,b){return{x:G.W*b.x/100+Math.sin(b.ph)*G.r*.15,y:G.bot-(b.y/100)*(G.bot-G.top+G.r*2)+G.r*1.2};},
  down(p,x,y){const st=p.state,G=this.geo(p),T=st.T0;if(!T)return;let best=null,bd=1e9;st.bs.forEach(b=>{if(b.dead)return;const c=this.pos(G,b);const dx=(x-c.x)/(G.r*1.1),dy=(y-c.y)/(G.r*1.3);const d=dx*dx+dy*dy;if(d<1&&d<bd){bd=d;best=b;}});if(!best)return;const c=this.pos(G,best);
    if(best.ch===T.ans){best.dead=true;const el=st.T-T.t0;p.hit(true,{pts:EN.pts(Math.min(el,9),9),x:c.x,y:c.y});st.flash=.2;enSay(T.ans.length===1&&T.say===null?T.ans:T.say||T.ans);setTimeout(()=>{if(p.active&&!p.finished)this.mk(p);},260);}
    else{p.hit(false,{pen:10,shake:false,x:c.x,y:c.y,tip:'다시 찾아봐요',tipMs:800,review:T.html+' → 정답 '+T.ans+' ('+T.hint+')'});best.shake=.3;}},
  botAct(p){const st=p.state,G=this.geo(p),T=st.T0;if(!T)return null;const b=st.bs.find(b=>b.ch===T.ans&&!b.dead&&b.y>8&&b.y<90);if(!b)return null;const c=this.pos(G,b);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+c.x,y:rc.top+c.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,T=st.T0;if(!T)return;
    K.vgrad(g,0,0,W,H,['#bfe6ff','#fff4d6']);for(let i=0;i<12;i++){g.fillStyle=i%2?'#fff':'#ffd1d9';g.beginPath();g.moveTo(W*i/12,0);g.lineTo(W*(i+.5)/12,G.top+u*.3);g.lineTo(W*(i+1)/12,0);g.fill();}
    g.fillStyle='#fde68a';g.fillRect(0,H-u*.5,W,u*.5);
    st.bs.forEach(b=>{const c=this.pos(G,b);if(b.dead){const k=b.pop/.3;g.globalAlpha=Math.max(0,1-k);balloon(g,c.x,c.y,G.r*(1+k*.6),b.col,b.ch);g.globalAlpha=1;for(let i=0;i<8;i++){const a=i/8*TAU;g.fillStyle=b.col;g.beginPath();g.arc(c.x+Math.cos(a)*G.r*k*2,c.y+Math.sin(a)*G.r*k*2,Math.max(1,G.r*.12*(1-k)),0,TAU);g.fill();}return;}balloon(g,c.x,c.y,G.r,b.col,b.ch,b.shake>0?1.1:1);if(b.shake>0)b.shake-=.016;});
    const w=Math.min(W*.7,u*13);K.card(g,W/2-w/2,G.top+u*.1,w,u*1.9,u*.4,'rgba(255,255,255,.95)',{stroke:RED,lw:4,blur:0,dy:u*.06,sc:'#7f1d1d'});
    if(T.e)K.txt(g,T.e,W/2-w*.38,G.top+u*1.05,{size:u*1.3});K.txt(g,T.html,W/2+(T.e?w*.08:0),G.top+u*1.05,{size:Math.min(u*1.3,w/Math.max(6,T.html.length)*1.6),color:INK,maxW:w*(T.e?.62:.9)});
    if(st.flash>0){g.fillStyle='rgba(255,255,255,'+st.flash+')';g.fillRect(0,0,W,H);}
  },
};
Engine.boot(GAME);
