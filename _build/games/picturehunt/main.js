/* 3~4학년 영어 · 낱말 찾기 — 그림 속 낱말 찾기
   디자인: 해 뜨는 사파리 초원. 이리저리 튀어다니는 그림 중에서 영어 낱말에 맞는 것을 쌍안경으로 찾듯 톡! 눌러요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#4b2e12',TEAL='#2a9d8f',CORAL='#e76f51';
const LOGO=gkLogo('#fffdf5','#2a9d8f','🔍');
const LV={
  '3':{g:'3~4학년',t:'3학년 낱말 찾기',d:'영어 낱말과 우리말 뜻을 보고 그림 찾기'},
  '4':{g:'3~4학년',t:'4학년 낱말 찾기',d:'영어 낱말만 보고 그림 찾기 · 더 빨라요'},
};
function hero(g,W,H,T,u){const sk=g.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#9bd7ee');sk.addColorStop(.55,'#fde9b8');sk.addColorStop(1,'#e9c46a');g.fillStyle=sk;g.fillRect(0,0,W,H);
  g.fillStyle='#ffd166';g.beginPath();g.arc(W*.8,H*.22,u*1.5,0,TAU);g.fill();g.fillStyle='#d4a24c';g.fillRect(0,H*.78,W,H*.22);
  ['🦁','🐘','🦒','🐒','🦓'].forEach((e,i)=>K.emo(g,e,W*(.12+i*.19),H*.6+Math.sin(T*2+i*1.3)*u*.35,u*1.5));K.emo(g,'🔍',W*.5+Math.cos(T)*W*.2,H*.35+Math.sin(T*1.3)*u*.3,u*1.6);}
const GAME={
  id:'picturehunt',title:'그림 속 낱말 찾기',title1:'사파리 낱말',title2:'그림 찾기 탐험',emoji:LOGO,
  subtitle:'3~4학년 영어 · 영어 낱말에 맞는 그림 찾기',
  howto:'🔍 위에 나온 <b>영어 낱말</b>에 맞는 그림을 이리저리 뛰어다니는 그림들 속에서 찾아 눌러요. 3학년은 우리말 뜻이 함께 나오고, 4학년은 영어 낱말만 나와요. 빨리 찾을수록 점수가 커요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:TEAL,c2:CORAL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 탐험을 떠날까요?',
  txt:{who:'누가 탐험가일까요?',dur:'탐험 시간',pace:'그림 속도',seat:'번 탐험가 ',go:'탐험 출발!',s1:'1. 탐험',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>영어 낱말을 보면 머릿속에 <b>그림</b>을 떠올려 보세요. 그림과 낱말을 함께 기억하면 오래 남아요.</li>
    <li>모양이 비슷한 그림은 낱말의 <b>첫 글자</b>로 구별해 보세요.</li>
    <li>찾은 낱말은 소리 내어 읽어 봐요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const q={x:pad,y:top,w:W-pad*2,h:Math.min(u*3,H*.2)};const ar={x:pad,y:q.y+q.h+u*.3,w:W-pad*2,h:H-q.y-q.h-u*.3-pad};return{W,H,u,top,pad,q,ar};},
  init(p){const st=p.state;st.list=EN.words(p.levelId,{pic:1,alpha:1,max:9});st.bag=EN.bag(st.list,()=>p.R.f());Object.assign(st,{T:0,items:[],t0:0,tries:0,phase:'idle',wait:0,tg:null,popped:[]});this.next(p);},
  next(p){const st=p.state,G=this.geo(p),R=p.R;const T=st.bag();st.tg=T;const n=G.W<520?8:11;const pool=EN.shuffle(st.list.filter(w=>w.p!==T.p&&w.e!==T.e),()=>R.f());const its=[T];const seen=new Set([T.p]);for(const w of pool){if(its.length>=n)break;if(seen.has(w.p))continue;seen.add(w.p);its.push(w);}
    const ar=G.ar;const r=clamp(Math.sqrt(ar.w*ar.h/n)*.3,G.u*.9,G.u*2.4);const sp=ar.w*(p.levelId==='3'?.1:.16);
    st.items=EN.shuffle(its,()=>R.f()).map(w=>{const a=R.f()*TAU;return{w,x:ar.x+r+R.f()*(ar.w-r*2),y:ar.y+r+R.f()*(ar.h-r*2),vx:Math.cos(a)*sp*(.6+R.f()*.7),vy:Math.sin(a)*sp*(.6+R.f()*.7),r,ph:R.f()*TAU,dead:0,yes:0};});
    st.phase='play';st.t0=st.T;st.tries=0;st.wait=0;p.ask('🔍 Find the  '+T.e+(p.levelId==='3'?'  ('+T.k+')':''),'맞는 그림을 눌러요');enSay(T.e,.8);},
  update(p,dt){const st=p.state,G=this.geo(p),ar=G.ar;st.T+=dt;
    st.items.forEach(it=>{if(it.dead>0)it.dead-=dt;if(it.yes>0)it.yes+=dt;if(st.phase==='play'||it.yes===0){it.x+=it.vx*dt*p.pace;it.y+=it.vy*dt*p.pace;}
      if(it.x<ar.x+it.r){it.x=ar.x+it.r;it.vx=Math.abs(it.vx);}if(it.x>ar.x+ar.w-it.r){it.x=ar.x+ar.w-it.r;it.vx=-Math.abs(it.vx);}
      if(it.y<ar.y+it.r){it.y=ar.y+it.r;it.vy=Math.abs(it.vy);}if(it.y>ar.y+ar.h-it.r){it.y=ar.y+ar.h-it.r;it.vy=-Math.abs(it.vy);}});
    const A=st.items;for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++){const a=A[i],b=A[j];let dx=b.x-a.x,dy=b.y-a.y;const d=Math.hypot(dx,dy)||.01,m=a.r+b.r;if(d<m){dx/=d;dy/=d;const o=(m-d)/2;a.x-=dx*o;a.y-=dy*o;b.x+=dx*o;b.y+=dy*o;const rv=(b.vx-a.vx)*dx+(b.vy-a.vy)*dy;if(rv<0){a.vx+=rv*dx;a.vy+=rv*dy;b.vx-=rv*dx;b.vy-=rv*dy;}}}
    if(st.phase==='play'&&st.T-st.t0>14){st.phase='wait';st.wait=1.2;p.hit(false,{pen:5,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.tg.e+' = '+st.tg.k});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.next(p);}},
  down(p,x,y){const st=p.state;if(st.phase!=='play')return;let hit=null;for(const it of st.items){if(it.dead>0||it.w.p==='')continue;const d=Math.hypot(x-it.x,y-it.y);if(d<=it.r*1.05&&(!hit||d<hit.d))hit={it,d};}if(!hit)return;const it=hit.it;
    if(it.w.e===st.tg.e){st.phase='wait';st.wait=.8;it.yes=.001;const el=st.T-st.t0;p.hit(true,{pts:st.tries?60:EN.pts(Math.min(el,10),10),x:it.x,y:it.y});enSay(st.tg.e,.8);}
    else{it.dead=1;st.tries++;p.hit(false,{pen:5,shake:false,x:it.x,y:it.y,tip:'이건 '+it.w.e,tipMs:900,review:st.tg.e+' = '+st.tg.k+' (헷갈린 그림: '+it.w.e+')'});}},
  botAct(p){const st=p.state;if(st.phase!=='play')return null;const it=st.items.find(i=>i.w.e===st.tg.e);if(!it)return null;const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+it.x,y:rc.top+it.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,ar=G.ar;if(!st.tg)return;
    const sk=g.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#9bd7ee');sk.addColorStop(.35,'#fde9b8');sk.addColorStop(1,'#e9c46a');g.fillStyle=sk;g.fillRect(0,0,W,H);
    g.fillStyle='#ffd166';g.beginPath();g.arc(W*.88,G.top+u*1.6,u*1.2,0,TAU);g.fill();K.clouds&&K.clouds(g,W,H*.25,st.T,u);
    g.fillStyle='#d4a24c';g.fillRect(0,H*.88,W,H*.12);g.fillStyle='#8aa832';for(let i=0;i<Math.ceil(W/(u*.9));i++){const x=i*u*.9,h=u*(.4+.25*Math.sin(i*2.7));g.beginPath();g.moveTo(x,H*.88);g.lineTo(x+u*.2,H*.88-h);g.lineTo(x+u*.45,H*.88);g.fill();}
    const q=G.q;K.card(g,q.x,q.y,q.w,q.h,u*.25,'#fffdf5',{stroke:'#4b2e12',lw:4,blur:0,dy:u*.08,sc:'#9c6b2f'});
    K.txt(g,'Find the',q.x+q.w*.12,q.y+q.h*.35,{size:Math.min(q.h*.28,u*.8),color:'#9c6b2f',maxW:q.w*.2});
    K.txt(g,st.tg.e,q.x+q.w/2,q.y+q.h*(p.levelId==='3'?.42:.5),{size:Math.min(q.h*.6,q.w/Math.max(4,st.tg.e.length)*1.5),color:TEAL,stroke:'#fff',lw:u*.1,maxW:q.w*.6});
    if(p.levelId==='3')K.txt(g,st.tg.k,q.x+q.w/2,q.y+q.h*.82,{size:q.h*.22,color:CORAL,maxW:q.w*.6});
    if(st.phase==='play')QZ.bar(g,q.x,q.y+q.h+u*.04,q.w,Math.max(4,u*.12),Math.max(0,1-(st.T-st.t0)/14),{good:TEAL});
    st.items.forEach(it=>{const bob=Math.sin(st.T*3+it.ph)*it.r*.06;g.save();g.globalAlpha=it.dead>0?.25:1;
      g.fillStyle='rgba(75,46,18,.15)';g.beginPath();g.ellipse(it.x,it.y+it.r*.9,it.r*.7,it.r*.18,0,0,TAU);g.fill();
      if(it.yes>0){g.fillStyle='rgba(42,157,143,'+Math.max(0,.5-it.yes*.5)+')';g.beginPath();g.arc(it.x,it.y,it.r*(1+it.yes*1.2),0,TAU);g.fill();g.strokeStyle=TEAL;g.lineWidth=5;g.beginPath();g.arc(it.x,it.y,it.r*1.1,0,TAU);g.stroke();}
      g.fillStyle='rgba(255,253,245,.92)';g.strokeStyle='#9c6b2f';g.lineWidth=Math.max(2,it.r*.06);g.beginPath();g.arc(it.x,it.y+bob,it.r*1.02,0,TAU);g.fill();g.stroke();
      K.emo(g,it.w.p,it.x,it.y+bob,it.r*1.2*(it.yes>0?1.15:1));g.restore();});
  },
};
Engine.boot(GAME);
