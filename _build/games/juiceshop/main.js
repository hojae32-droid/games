/* 6학년 수학 · 비와 비율 · 백분율 · 비례식 · 비례배분 — 과일 주스 가게
   디자인: 분홍 줄무늬 주스 바. 손님의 주문 비율에 맞게 컵에 원액과 우유를 꾹 눌러 따라 만들어요. 딱 맞으면 맛있는 주스! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#7a1f3d',LIM='#65a30d';
const LOGO=gkLogo('#fff1f2','#9f1239','🧃');
const CAP=500;
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const J=(w,t)=>{w=String(w);const c=w.charCodeAt(w.length-1);const b=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28!==0:/[013678]/.test(w[w.length-1]);const m={'은':['은','는'],'이':['이','가'],'을':['을','를'],'으로':['으로','로']}[t];const jong=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28:-1;if(t==='으로')return w+((/[2]/.test(w[w.length-1])?'':'')||'')+(b&&!(jong===8)?'으로':'로');return w+(b?m[0]:m[1]);};
const FR=[{n:'딸기',ic:'🍓',c:'#f43f5e'},{n:'키위',ic:'🥝',c:'#65a30d'},{n:'오렌지',ic:'🍊',c:'#f97316'},{n:'포도',ic:'🍇',c:'#7c3aed'},{n:'바나나',ic:'🍌',c:'#eab308'},{n:'망고',ic:'🥭',c:'#f59e0b'}];
const LV={
  a:{g:'6학년 1학기',t:'비와 비율',d:'a : b 주스 · ~에 대한 비 · 비율'},
  b:{g:'6학년 1학기',t:'백분율',d:'원액 몇 % 주스 만들기'},
  c:{g:'6학년 2학기',t:'비례식',d:'들어 있는 양에 맞춰 붓기'},
  d:{g:'6학년 2학기',t:'비례배분',d:'전체를 비로 나누어 만들기'},
};
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#ffe4e6','#fecdd3']);
  [[.25,'#f43f5e',.6],[.5,'#65a30d',.4],[.75,'#f97316',.75]].forEach(([x,c,f],i)=>{const cw=u*2.2,ch=u*4;const cx=W*x-cw/2,cy=H*.78-ch;g.fillStyle='rgba(255,255,255,.8)';K.rr(g,cx,cy,cw,ch,u*.25);g.fill();g.save();K.rr(g,cx,cy,cw,ch,u*.25);g.clip();const lv=f+Math.sin(T*1.5+i)*.05;g.fillStyle=c;g.fillRect(cx,cy+ch*(1-lv*.7),cw,ch);g.fillStyle='#fff7f7';g.fillRect(cx,cy+ch*(1-lv),cw,ch*.3*lv);g.restore();g.strokeStyle='#9f1239';g.lineWidth=4;K.rr(g,cx,cy,cw,ch,u*.25);g.stroke();K.emo(g,['🍓','🥝','🍊'][i],W*x,cy-u*.7,u*1.1+Math.sin(T*3+i)*u*.06);});}
const GAME={
  id:'juiceshop',title:'과일 주스 가게',title1:'분홍 줄무늬 주스 바',title2:'과일 주스 가게',emoji:LOGO,
  subtitle:'6학년 수학 · 비와 비율 · 비례식과 비례배분',
  howto:'🧃 손님이 원하는 주스를 <b>컵에 직접</b> 만들어요! 버튼을 <b>꾹</b> 누르면 원액과 우유가 따라져요. 주문한 비율에 딱 맞게 만들어 <b>손님께 드리기</b>! 잘못 만들면 맛이 이상해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#e11d48',c2:LIM},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 주문을 받을까요?',
  txt:{who:'누가 주스를 만들까요?',dur:'영업 시간',pace:'손님의 인내심',seat:'번 점원 ',go:'영업 시작!',s1:'1. 주문',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>비</b> a : b는 두 수를 나눗셈으로 비교한 것이고, <b>비율</b>은 (비교하는 양) ÷ (기준량)이에요.</li>
    <li><b>백분율</b>은 기준량을 100으로 볼 때의 비율이에요. 전체 400 mL에 원액이 25%이면 원액은 100 mL.</li>
    <li><b>비례식</b>은 비율이 같은 두 비를 =로 나타낸 식이에요. 3 : 2 = 150 : □ 이면 □ = 100.</li>
    <li><b>비례배분</b>은 전체를 주어진 비로 나누는 것이에요. 300 mL를 2 : 3으로 나누면 120 mL와 180 mL.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.25,q=p.state.q;const fx=q?q.fixed||[0,0]:[0,0];
    const pourB=[];if(!fx[0])pourB.push('pf');if(!fx[1])pourB.push('pm');const fine=[];if(!fx[0])fine.push('f-','f+');if(!fx[1])fine.push('m-','m+');
    const oh=Math.min(u*1.9,H*.11);const rows=[];const ctrlH=oh*3+gap*3;const sc={x:pad,y:top,w:W-pad*2,h:H-top-pad-ctrlH};const y0=H-pad-ctrlH;
    const btns=[];const mk=(ids,row)=>{const w=(W-pad*2-gap*(ids.length-1))/ids.length;ids.forEach((id,i)=>btns.push({id,x:pad+i*(w+gap),y:y0+row*(oh+gap),w,h:oh}));};
    mk(pourB,0);mk(fine,1);btns.push({id:'go',x:pad,y:y0+2*(oh+gap),w:W-pad*2,h:oh,go:1});
    return{W,H,u,top,pad,sc,btns,two:q&&q.two};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,f:0,m:0,pour:null,okFlag:false,made:''});this.newQ(p);},
  make(p,L){const R=p.R,fr=R.pick(FR);const q={fr,two:false};let a,b;do{a=R.int(1,5);b=R.int(1,6);}while(a===b);const F=fr.n;const ms=k=>[10,20,30,40,50,60,80,100].filter(m=>k*m<=CAP);
    if(L==='a'){const k=R.pick(['ratio','ratio','about','rate']);
      if(k==='ratio'){q.ratio=[a,b];q.order=F+' : 우유 = <b>'+a+' : '+b+'</b> 로 주세요!';q.reveal='예: '+F+' '+a*50+' mL, 우유 '+b*50+' mL ('+a+' : '+b+')';}
      else if(k==='about'){q.ratio=[a,b];q.order='<b>우유에 대한 '+F+'</b>의 비가 <b>'+a+' : '+b+'</b>인 주스!';q.reveal=F+' : 우유 = '+a+' : '+b+' (기준량은 우유)';}
      else{const d=R.pick([2,4,5]);const n=R.int(1,d-1);q.ratio=[n,d];const v=+(n/d).toFixed(2);q.order='우유에 대한 '+F+'의 <b>비율이 '+v+'</b>인 주스!';q.reveal=F+' ÷ 우유 = '+v+' (예: '+F+' '+n*50+' mL, 우유 '+d*50+' mL)';}
      q.price=40;}
    else if(L==='b'){if(R.chance(.6)){const tot=R.pick([200,300,400,500]);const pc=R.pick([10,20,25,30,40,50,60,75,80].filter(x=>(tot*x/100)%10===0));const f=tot*pc/100;q.need=[f,tot-f];q.order='전체 <b>'+tot+' mL</b>, '+F+' 원액이 <b>'+pc+'%</b>인 주스!';q.reveal=F+' '+f+' mL + 우유 '+(tot-f)+' mL';}
      else{const pc=R.pick([20,25,40,50]);const tot=R.pick([200,300,400,500].filter(t=>(t*pc/100)%10===0));const f=tot*pc/100;q.fixed=[f,0];q.need=[f,tot-f];q.order=F+' 원액 <b>'+f+' mL</b>가 들어 있어요. 원액이 <b>'+pc+'%</b>가 되게 우유를 부어요!';q.reveal='전체 '+tot+' mL → 우유 '+(tot-f)+' mL';}
      q.price=45;}
    else if(L==='c'){const m=R.pick(ms(a+b));q.need=[a*m,b*m];
      if(R.chance(.5)){q.fixed=[a*m,0];q.order=F+' : 우유 = <b>'+a+' : '+b+'</b>. '+F+' <b>'+a*m+' mL</b>는 넣었어요. 우유는?';q.reveal=a+' : '+b+' = '+a*m+' : □ → 우유 '+b*m+' mL';}
      else{q.fixed=[0,b*m];q.order=F+' : 우유 = <b>'+a+' : '+b+'</b>. 우유 <b>'+b*m+' mL</b>는 넣었어요. '+F+'는?';q.reveal=a+' : '+b+' = □ : '+b*m+' → '+F+' '+a*m+' mL';}
      q.price=45;}
    else{if(R.chance(.5)){const m=R.pick(ms(a+b));q.need=[a*m,b*m];q.order='주스 <b>'+(a+b)*m+' mL</b>, '+F+' : 우유 = <b>'+a+' : '+b+'</b> 로 만들어요!';q.reveal=(a+b)*m+' × '+a+'/'+(a+b)+' = '+a*m+', × '+b+'/'+(a+b)+' = '+b*m;}
      else{q.two=true;const m=R.pick([20,30,40,50,60,80,100].filter(x=>Math.max(a,b)*x<=CAP));q.need=[a*m,b*m];q.order=F+' 주스 <b>'+(a+b)*m+' mL</b>를 언니 컵 : 동생 컵 = <b>'+a+' : '+b+'</b> 로 나눠 주세요!';q.reveal='언니 '+a*m+' mL, 동생 '+b*m+' mL';}
      q.price=50;}
    q.text='🥤 버튼을 <b>꾹</b> 눌러 주문대로 만들어요';q.review=strip(q.order)+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.price;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.order;},askSub(q){return '버튼을 꾹 눌러 따라요 · ±10으로 맞춰요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return '정답: '+q.reveal+(this._p&&this._p.state.made?' (만든 것: '+this._p.state.made+')':'');},goodTip(q){return '맛있대요! 🧃';},
  ptsOf(p,q,frac){return Math.round(60+50*frac);},
  onNew(p,q){const st=p.state;const fx=q.fixed||[0,0];st.f=fx[0];st.m=fx[1];st.pour=null;st.okFlag=false;st.made='';},
  room(st,q,key){return q.two?CAP-st[key]:CAP-st.f-st.m;},
  upd(p,dt){const st=p.state,q=st.q;if(!q||st.lock||!st.pour)return;const key=st.pour==='pf'?'f':'m';const r=this.room(st,q,key);st[key]+=Math.min(r,150*dt);},
  release(p){const st=p.state,q=st.q;if(!st.pour||!q)return;const key=st.pour==='pf'?'f':'m';st.pour=null;st[key]=Math.round(st[key]/10)*10;while(this.room(st,q,key)<0)st[key]-=10;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));if(!b)return;
    if(b.id==='pf'||b.id==='pm'){st.pour=b.id;p.Snd.tone&&p.Snd.tone(440,.06,'sine',.03);return;}
    if(b.id==='go'){const ok=q.ratio?st.f>0&&st.m>0&&st.f*q.ratio[1]===st.m*q.ratio[0]:st.f===q.need[0]&&st.m===q.need[1];st.okFlag=ok;st.made=q.two?'언니 '+Math.round(st.f)+' mL, 동생 '+Math.round(st.m)+' mL':q.fr.n+' '+Math.round(st.f)+' mL + 우유 '+Math.round(st.m)+' mL';this.verdict(p,0,false);return;}
    const key=b.id[0],d=b.id[1]==='+'?10:-10;const old=st[key];st[key]=Math.max(0,old+d);if(this.room(st,q,key)<0)st[key]=old;p.Snd.tap&&p.Snd.tap();},
  up(p){this.release(p);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;if(q.ratio){const k=Math.max(1,Math.floor(Math.min(CAP/(q.ratio[0]+q.ratio[1]),100)/10)*10);st.f=q.ratio[0]*Math.min(k,50);st.m=q.ratio[1]*Math.min(k,50);}else{st.f=q.need[0];st.m=q.need[1];}const G=this.geo(p),b=G.btns.find(b=>b.id==='go');const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  cup(g,x,y,w,h,f,m,col,u,lab){g.fillStyle='rgba(255,255,255,.7)';K.rr(g,x,y,w,h,u*.25);g.fill();g.save();K.rr(g,x,y,w,h,u*.25);g.clip();const fh=h*f/CAP,mh=h*m/CAP;g.fillStyle=col;g.fillRect(x,y+h-fh,w,fh);if(m>0){g.fillStyle='#fff6f6';g.fillRect(x,y+h-fh-mh,w,mh);g.fillStyle='rgba(0,0,0,.05)';g.fillRect(x,y+h-fh-mh,w,mh);}g.restore();
    g.strokeStyle='#9f1239';g.lineWidth=Math.max(3,u*.09);K.rr(g,x,y,w,h,u*.25);g.stroke();
    for(let k=1;k<10;k++){const ty=y+h-h*k/10;g.beginPath();g.moveTo(x+w,ty);g.lineTo(x+w-(k%2?w*.12:w*.22),ty);g.strokeStyle='#9f1239';g.lineWidth=2;g.stroke();if(k%2===0)K.txt(g,String(k*50),x+w+u*.1,ty,{size:u*.32,color:'#9f1239',align:'left'});}
    if(lab)K.txt(g,lab,x+w/2,y+h+u*.4,{size:u*.5,color:INK});},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,S=G.sc;if(!q)return;
    g.fillStyle='#fff1f2';g.fillRect(0,0,W,H);for(let i=0;i<Math.ceil(W/(u*1.8));i++){g.fillStyle=i%2?'rgba(244,63,94,.07)':'rgba(255,255,255,0)';g.fillRect(i*u*1.8,0,u*1.8,H);}
    K.card(g,S.x,S.y,S.w,S.h,u*.35,'#ffe4e6',{stroke:'#9f1239',lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#be123c'});
    const ch=Math.min(S.h-u*1.9,u*8);const cw=Math.min(u*3.4,S.w*.26);const cy=S.y+u*.5;
    if(q.two){const gap=u*1.8;const x1=S.x+S.w/2-cw-gap/2,x2=S.x+S.w/2+gap/2;this.cup(g,x1,cy,cw,ch,st.f,0,q.fr.c,u,'언니 컵');this.cup(g,x2,cy,cw,ch,st.m,0,q.fr.c,u,'동생 컵');
      K.txt(g,'언니 '+Math.round(st.f)+' mL',x1+cw/2,cy+ch+u*1.1,{size:u*.5,color:INK});K.txt(g,'동생 '+Math.round(st.m)+' mL',x2+cw/2,cy+ch+u*1.1,{size:u*.5,color:INK});}
    else{const x=S.x+S.w/2-cw/2;this.cup(g,x,cy,cw,ch,st.f,st.m,q.fr.c,u,'');K.txt(g,q.fr.ic+' '+Math.round(st.f)+' mL',S.x+S.w*.18,cy+ch*.35,{size:u*.6,color:INK,maxW:S.w*.3});K.txt(g,'🥛 '+Math.round(st.m)+' mL',S.x+S.w*.82,cy+ch*.35,{size:u*.6,color:INK,maxW:S.w*.3});}
    K.emo(g,q.two?'👭':'🙋',S.x+S.w*.1,S.y+S.h*.8,u*1.6);
    if(st.lock){const ok=st.okFlag;K.txt(g,ok?'음~ 딱 제가 원하던 맛이에요! 🧃':'으엑, 맛이 이상해요… 정답: '+q.reveal,S.x+S.w/2,S.y+S.h-u*.45,{size:u*.5,color:ok?'#3f6212':'#be123c',maxW:S.w*.92,stroke:'#fff',lw:u*.12});}
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*.4,S.y+S.h-u*.3,S.w-u*.8,Math.max(6,u*.16),st.qt/st.qmax,{good:LIM});
    const L1=q.two?'언니 컵':q.fr.ic,L2=q.two?'동생 컵':'🥛';
    G.btns.forEach(b=>{let t,bg='#fff',ink=INK,bd='#9f1239';if(b.id==='pf'){t=L1+' 꾹 따르기';bg=q.fr.c+'55';}else if(b.id==='pm'){t=L2+' 꾹 따르기';bg='#fde7ea';}else if(b.id==='go'){t='🥤 손님께 드리기';bg=LIM;ink='#fff';}else{t=(b.id[0]==='f'?L1:L2)+' '+(b.id[1]==='+'?'+10':'−10');}
      const hold=(b.id==='pf'||b.id==='pm')&&st.pour===b.id;K.rr(g,b.x,b.y+(hold?u*.05:0),b.w,b.h,u*.25);g.fillStyle=hold?'#fecdd3':bg;g.fill();g.lineWidth=3;g.strokeStyle=bd;g.stroke();K.txt(g,t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.4,u*.8),color:ink,maxW:b.w*.94});});
  },
};
QZ.mix(GAME,{say:false,pts0:60,pts1:50,okMs:1700,badMs:3400});
Engine.boot(GAME);
