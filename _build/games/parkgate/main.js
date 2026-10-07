/* 5학년 2학기 수학 · 수의 범위와 어림하기 — 놀이공원 운영 대작전
   디자인: 전구가 반짝이는 놀이공원. 놀이기구 입구에서 손님을 안내하고, 안내판의 범위를 수직선에 그리고, 전광판 수를 올림·버림·반올림하고, 버스·관람차 수를 정해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5b1a46',PK='#db2777',BL='#2563eb';
const LOGO=gkLogo('#fce7f3','#831843','🎢');
const LV={
  a:{t:'이상 · 이하 · 초과 · 미만',d:'입구 안내 · 수직선에 범위 그리기'},
  b:{t:'올림 · 버림 · 반올림',d:'자리 콕 → 올릴까 버릴까'},
  c:{t:'생활 속 어림',d:'버스 · 관람차 · 선물 상자 · 지폐'},
};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return w+(j==='을'?'를':'가');const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):(b?'가':'이'));};
const GUEST=['🧒','👦','👧','🧑','👩','👨','🧓','👱','🧑‍🦱','👩‍🦰'];
const RIDES=[{name:'롤러코스터',what:'키',u:'cm',lo:26,hi:28,step:5,ic:'🎢'},{name:'바이킹',what:'키',u:'cm',lo:24,hi:27,step:5,ic:'🏴‍☠️'},{name:'회전목마',what:'나이',u:'살',lo:3,hi:8,step:1,ic:'🎠'},{name:'범퍼카',what:'키',u:'cm',lo:24,hi:28,step:5,ic:'🚗'},{name:'자이로드롭',what:'키',u:'cm',lo:27,hi:30,step:5,ic:'🗼'},{name:'어린이 기차',what:'나이',u:'살',lo:4,hi:9,step:1,ic:'🚂'}];
const SIGNS=[{t:'어린이 요금: 나이',u:'살',s0:3,d:1,ic:'🎟️'},{t:'청룡열차: 키',u:'cm',s0:100,d:5,ic:'🎢'},{t:'유모차 대여: 몸무게',u:'kg',s0:5,d:1,ic:'👶'},{t:'물놀이장: 키',u:'cm',s0:90,d:5,ic:'🌊'}];
const LIFE=[{kind:'ceil',u:'대',ic:'🚌',per:[30,40,45],n:[95,300],who:'명이',who2:'좌석',cu:'',need:'',go:'🚌 출발!',have:n=>'🧑‍🎓 학생 '+n+'명',text:(n,c)=>'학생 <b>'+n+'명</b>이 <b>'+c+'인승 버스</b>를 타요. 버스는 <b>최소</b> 몇 대?'},
  {kind:'ceil',u:'칸',ic:'🎡',per:[4,6,8],n:[25,90],who:'명이',who2:'자리',cu:'',need:'',go:'🎡 출발!',have:n=>'👨‍👩‍👧 손님 '+n+'명',text:(n,c)=>'관람차 한 칸에 <b>'+c+'명</b>씩 타요. 손님 <b>'+n+'명</b>이 모두 타려면 <b>최소</b> 몇 칸?'},
  {kind:'floor',u:'상자',ic:'🎁',per:[6,8,10,12],n:[40,150],who:'',who2:'',cu:'개',need:'사탕',go:'🎁 포장 완료!',have:n=>'🍬 사탕 '+n+'개',text:(n,c)=>'사탕 <b>'+n+'개</b>를 한 상자에 <b>'+c+'개</b>씩 담아 팔아요. 팔 수 있는 상자는 <b>최대</b> 몇 상자?'},
  {kind:'floor',u:'장',ic:'💵',per:[1000],n:[2050,9950],who:'',who2:'',cu:'원',need:'동전',go:'💵 바꾸기!',have:n=>'🪙 동전 '+gkComma(n)+'원',text:(n,c)=>'동전 <b>'+gkComma(n)+'원</b>을 1000원짜리 지폐로 바꾸면 <b>최대</b> 몇 장?'}];
const inR=(v,q)=>(!q.lo||(q.lo[1]==='이상'?v>=q.lo[0]:v>q.lo[0]))&&(!q.hi||(q.hi[1]==='이하'?v<=q.hi[0]:v<q.hi[0]));
const rText=(q,u)=>{const s=e=>e[0]+(u==='살'?'':' ')+u+' '+e[1];return q.lo&&q.hi?s(q.lo)+' '+s(q.hi):s(q.lo||q.hi);};
function roundStr(ds,ti,up){const a=ds.slice();for(let k=ti+1;k<a.length;k++)if(a[k]!=='.')a[k]='0';if(up){let k=ti;while(k>=0){if(a[k]==='.'){k--;continue;}if(a[k]==='9'){a[k]='0';k--;}else{a[k]=String(+a[k]+1);break;}}if(k<0)a.unshift('1');}
  let s=a.join('');if(s.includes('.')){const[i,f]=s.split('.');const keep=ds.indexOf('.')<ti?ti-ds.indexOf('.'):0;return keep?i+'.'+f.slice(0,keep):i;}return gkComma(s);}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#ffe3f1','#fbcfe8']);for(let i=0;i<14;i++){const x=W*(i+.5)/14;g.fillStyle=['#ef4444','#facc15','#22c55e','#3b82f6'][i%4];g.globalAlpha=.5+.5*Math.sin(T*4+i);g.beginPath();g.arc(x,H*.1+Math.sin(i)*6,u*.18,0,TAU);g.fill();}g.globalAlpha=1;
  const cx=W/2,cy=H*.55,R=Math.min(W,H)*.32;g.strokeStyle='#831843';g.lineWidth=u*.14;g.beginPath();g.arc(cx,cy,R,0,TAU);g.stroke();for(let i=0;i<8;i++){const a=T*.6+i*TAU/8;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);g.stroke();K.card(g,cx+Math.cos(a)*R-u*.35,cy+Math.sin(a)*R-u*.3,u*.7,u*.6,u*.15,['#f472b6','#60a5fa','#facc15','#4ade80'][i%4],{stroke:'#831843',lw:3,blur:0,dy:0});}}
const GAME={
  id:'parkgate',title:'놀이공원 운영 대작전',title1:'반짝반짝 놀이공원',title2:'놀이공원 운영 대작전',emoji:LOGO,
  subtitle:'5학년 2학기 수학 · 수의 범위와 어림하기',
  howto:'오늘은 내가 놀이공원 직원! 놀이기구 입구에서 손님을 <b>탑승 / 다음에</b>로 안내하고, 안내판의 범위를 <b>수직선에 직접</b> 그려요. 전광판 수를 <b>자리 콕 → 올릴까 버릴까</b>로 어림하고, 버스·관람차 수도 정해요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:PK,c2:BL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 일을 맡을까요?',
  txt:{who:'누가 직원일까요?',dur:'영업 시간',pace:'생각하는 시간',seat:'번 직원 ',go:'영업 시작!',s1:'1. 업무',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>이상·이하</b>는 경계의 수를 <b>포함</b>하고(수직선에 ●), <b>초과·미만</b>은 경계의 수를 <b>포함하지 않아요</b>(수직선에 ○).</li>
    <li><b>올림</b>은 구하려는 자리 아래 수를 올려서, <b>버림</b>은 버려서, <b>반올림</b>은 바로 아래 자리가 0~4면 버리고 5~9면 올려서 나타내요.</li>
    <li>생활 속 어림: 사람을 태울 버스·관람차 수는 모자라면 안 되니 <b>올림</b>, 상자나 지폐처럼 꽉 채워야 하는 것은 <b>버림</b>으로 구해요.</li></ul>`,
  rowsFor(p){const st=p.state,q=st.q;if(!q)return[];if(q.ty==='gate')return[[{id:'yes',t:'⭕ 탑승!'},{id:'no',t:'❌ 다음에'}]];if(q.ty==='build')return[[{id:'ok',t:'📌 안내판 완성!',go:1}]];
    if(q.ty==='round')return st.step===1?[[{id:'dn',t:'⬇ 그대로 두고 아래는 0'},{id:'up',t:'⬆ 1 올리고 아래는 0'}]]:[];return[[{id:'m10',t:'−10'},{id:'m1',t:'−1'},{id:'p1',t:'+1'},{id:'p10',t:'+10'}],[{id:'ok',t:q.t.go,go:1}]];},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,q=p.state.q;const rows=this.rowsFor(p);const gap=u*.2;const rh=Math.min(u*1.8,(H-top)*.11);const ph=rows.length?rows.length*rh+(rows.length-1)*gap:0;const oy=H-pad-ph;const list=[];
    rows.forEach((row,r)=>{const w=(W-pad*2-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:pad+c*(w+gap),y:oy+r*(rh+gap),w,h:rh})));});return{W,H,u,top,pad,list,S:{x:pad,y:top,w:W-pad*2,h:(rows.length?oy-u*.3:H-pad)-top}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,happy:0,k:0,got:[],busy:0,anim:null,L:null,R:null,step:0,dpick:-1,c:1,okFlag:false,part:1,outs:[]});this.newQ(p);},
  make(p,L){const R=p.R,q={};const strip=s=>s.replace(/<[^>]+>/g,'');
    if(L==='a'){const W=['이상','이하','초과','미만'];
      if(R.chance(.6)){const ride=R.pick(RIDES);q.ty='gate';q.ride=ride;const two=R.chance(.4),st=ride.step;const a=R.int(ride.lo,ride.hi)*st;q.lo=null;q.hi=null;
        if(two){q.lo=[a,R.pick(['이상','초과'])];q.hi=[a+R.int(2,4)*st,R.pick(['이하','미만'])];}else{const w=R.pick(W);if(w==='이상'||w==='초과')q.lo=[a,w];else q.hi=[a,w];}
        const bnd=[q.lo&&q.lo[0],q.hi&&q.hi[0]].filter(x=>x!=null);const vs=new Set();vs.add(R.pick(bnd));while(vs.size<5){const b=R.pick(bnd);vs.add(b+R.pick([-2,-1,1,2,3])*(st>1?R.pick([1,2]):1));}
        q.vs=R.shuffle([...vs]);q.oks=q.vs.map(v=>inR(v,q));q.rule=rText(q,ride.u);q.text='<b>'+ride.name+'</b>: '+ride.what+' <b>'+q.rule+'</b>인 손님만 탈 수 있어요!';q.reveal=q.vs.map((v,k)=>v+ride.u+' '+(q.oks[k]?'⭕':'❌')).join(', ');}
      else{const c=R.pick(SIGNS);q.ty='build';q.c=c;const n=11;q.s=c.s0+R.int(0,3)*c.d;q.d=c.d;q.n=n;const pi=R.int(2,n-4);const a=q.s+pi*q.d;const k=R.pick(['one','one','two']);
        if(k==='two'){const pj=pi+R.int(2,Math.min(5,n-2-pi));q.lo=[a,R.pick(['이상','초과'])];q.hi=[q.s+pj*q.d,R.pick(['이하','미만'])];}else{const w=R.pick(W);if(w==='이상'||w==='초과')q.lo=[a,w];else q.hi=[a,w];}
        q.rule=rText(q,c.u);q.text='안내판 <b>“'+c.t+' '+q.rule+'”</b>을(를) 수직선에 그려요! (눈금 콕 = 끝점 옮기기, 끝점 콕 = ●/○ 바꾸기)';q.reveal=q.rule+' (이상·이하 ●, 초과·미만 ○)';}}
    else if(L==='b'){q.ty='round';const m=R.pick(['올림','버림','반올림']);q.m=m;
      if(R.chance(.7)){let n;const pl=R.pick([['십',1],['백',2],['천',3]]);do{n=String(R.int(10001,99999));}while(/^0+$/.test(n.slice(-pl[1])));q.ds=n.split('');q.ti=q.ds.length-1-pl[1];q.place=pl[0]+'의 자리';q.n=n;q.ctx=R.pick(['입장객 수','오늘 판 솜사탕 수','주차장 자동차 수']);q.u=q.ctx==='입장객 수'?'명':q.ctx==='오늘 판 솜사탕 수'?'개':'대';q.text=q.ctx+' <b>'+J(gkComma(n)+q.u,'을')+'</b> <b>'+m+'</b>하여 <b>'+q.place+'</b>까지!';}
      else{let n;do{n=(R.int(101,999)/100).toFixed(2);}while(n.endsWith('0'));const pl=R.pick([['일의 자리',2],['소수 첫째 자리',0]]);q.ds=n.split('');q.ti=pl[1]===2?0:2;q.place=pl[0];q.n=n;q.u=' kg';q.ctx='솜사탕 기계 설탕 무게';q.text='설탕 <b>'+n+' kg</b>을 <b>'+m+'</b>하여 <b>'+q.place+'</b>까지!';}
      const lower=q.ds.slice(q.ti+1).filter(c=>c!=='.');const up=m==='올림'?lower.some(c=>c!=='0'):m==='버림'?false:Number(lower[0])>=5;q.up=up;q.res=roundStr(q.ds,q.ti,up);q.reveal=q.place+' 아래 '+(m==='반올림'?'첫 숫자 '+lower[0]+' → '+(up?'올림':'버림'):m)+' → '+q.res;}
    else{const t=R.pick(LIFE);q.ty='life';q.t=t;q.per=R.pick(t.per);q.n=R.int(t.n[0],t.n[1]);if(q.n%q.per===0)q.n+=R.int(1,q.per-1);q.ans=t.kind==='ceil'?Math.ceil(q.n/q.per):Math.floor(q.n/q.per);q.text=t.text(q.n,q.per);q.reveal=q.ans+t.u+' ('+(t.kind==='ceil'?'올림':'버림')+')';}
    q.review=strip(q.text)+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return {gate:35,build:50,round:40,life:45}[q.ty];},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🎪 '+q.text;},askSub(q){return {gate:'손님을 한 명씩 안내해요',build:'수직선에서 끝점을 옮겨요',round:'① 자리 숫자를 콕!',life:'수를 맞춰 확인해요'}[q.ty];},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '손님 만족! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((55+50*frac)*(p.state.part||1));},
  onNew(p,q){const st=p.state;st.okFlag=false;st.part=1;st.k=0;st.got=[];st.busy=0;st.anim=null;st.step=0;st.dpick=-1;st.c=1;st.outs=[];if(q.ty==='build'){st.L={p:0,f:true};st.R={p:q.n-1,f:true};}},
  onVerdict(p,q,ok){if(ok)p.state.happy++;},
  /* 수직선 */
  nlGeo(G,q){const S=G.S,u=G.u;const x0=S.x+u*1.6,x1=S.x+S.w-u*1.6,n=q.n;return{x0,x1,n,y:S.y+S.h*.55,X:k=>k<0?S.x+u*.6:k>=n?S.x+S.w-u*.6:x0+k*(x1-x0)/(n-1)};},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));
    if(b){p.Snd.tap&&p.Snd.tap();
      if(q.ty==='gate'){if(st.busy>0||st.k>=q.vs.length)return;const yes=b.id==='yes';const right=yes===q.oks[st.k];st.got.push(yes);st.outs.push(right);st.anim={yes,t:0};st.busy=.45;p.Snd.tone&&p.Snd.tone(right?700:200,.12,'sine',.06);if(yes)st.seats=(st.seats||0)+1;st.k++;return;}
      if(b.id==='ok'){if(q.ty==='build'){const want=(e,def)=>e?{p:(e[0]-q.s)/q.d,f:e[1]==='이상'||e[1]==='이하'}:def;const WL=want(q.lo,{p:-1}),WR=want(q.hi,{p:q.n});const eq=(a,c)=>a.p===c.p&&(a.p<0||a.p>=q.n||a.f===c.f);st.okFlag=eq(st.L,WL)&&eq(st.R,WR);this.verdict(p,0,false);}
        else{st.okFlag=st.c===q.ans;this.verdict(p,0,false);}return;}
      if(q.ty==='round'){const up=b.id==='up';st.okFlag=up===q.up;st.resTxt=roundStr(q.ds,q.ti,up);this.verdict(p,0,false);return;}
      if(q.ty==='life'){const d={m10:-10,m1:-1,p1:1,p10:10}[b.id];st.c=clamp(st.c+d,0,999);}return;}
    if(q.ty==='build'){const N=this.nlGeo(G,q);let best=-2,bd=1e9;for(let k=-1;k<=q.n;k++){const d=Math.abs(x-N.X(k));if(d<bd){bd=d;best=k;}}const pos=best;
      if(pos===st.L.p&&pos>=0&&pos<q.n)st.L.f=!st.L.f;else if(pos===st.R.p&&pos>=0&&pos<q.n)st.R.f=!st.R.f;else if(pos<0)st.L.p=-1;else if(pos>=q.n)st.R.p=q.n;
      else{const dl=Math.abs(pos-st.L.p),dr=Math.abs(pos-st.R.p);if(pos<st.L.p||(pos<st.R.p&&dl<=dr))st.L.p=pos;else st.R.p=pos;}if(st.L.p>st.R.p){const t=st.L;st.L=st.R;st.R=t;}p.Snd.tap&&p.Snd.tap();return;}
    if(q.ty==='round'&&st.step===0){const R=this.digitRects(G,q);const i=R.findIndex(r=>r&&K.inRect(x,y,r));if(i<0)return;st.dpick=i;p.Snd.tap&&p.Snd.tap();if(i!==q.ti){st.okFlag=false;st.wrongDigit=true;this.verdict(p,0,false);return;}st.step=1;p.ask(q.text,'② '+q.m+': 아래 자리를 보고 올릴까요, 버릴까요?');}},
  digitRects(G,q){const S=G.S,u=G.u;const n=q.ds.length;const dw=Math.min(u*2.3,(S.w-u*2)/(n+1.5));const tw=n*dw+dw*1.3;let x=S.x+(S.w-tw)/2;const y=S.y+S.h*.42,h=dw*1.4;return q.ds.map((d,k)=>{const r=d==='.'?null:{x,y,w:dw*.92,h};x+=d==='.'?dw*.5:dw;return r;});},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.busy>0){st.busy-=dt;if(st.anim)st.anim.t+=dt;if(st.busy<=0){st.busy=0;st.anim=null;if(q.ty==='gate'&&st.k>=q.vs.length&&!st.lock){const c=st.got.filter((g,k)=>g===q.oks[k]).length;st.part=c/5;st.okFlag=c>=4;st.cnt=c;this.verdict(p,0,false);}}}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(q.ty==='gate'){if(st.busy>0||st.k>=q.vs.length)return null;return cl(G.list.find(b=>b.id===(q.oks[st.k]?'yes':'no')));}
    if(q.ty==='build'){const want=(e,def)=>e?{p:(e[0]-q.s)/q.d,f:e[1]==='이상'||e[1]==='이하'}:def;st.L=want(q.lo,{p:-1});st.R=want(q.hi,{p:q.n});if(st.L.f==null)st.L.f=true;if(st.R.f==null)st.R.f=true;return cl(G.list.find(b=>b.id==='ok'));}
    if(q.ty==='round'){if(st.step===0){const r=this.digitRects(G,q)[q.ti];return cl(r);}return cl(G.list.find(b=>b.id===(q.up?'up':'dn')));}
    st.c=q.ans;return cl(G.list.find(b=>b.id==='ok'));},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T,S=G.S;if(!q)return;
    K.vgrad(g,0,0,W,H,['#ffe3f1','#fbcfe8']);for(let i=0;i<20;i++){g.fillStyle=['#ef4444','#facc15','#22c55e','#3b82f6'][i%4];g.globalAlpha=.4+.5*Math.sin(t*4+i);g.beginPath();g.arc(W*(i+.5)/20,G.top+u*.0+Math.sin(i*1.3)*3,u*.12,0,TAU);g.fill();}g.globalAlpha=1;
    const sgn=q.ty==='gate'?q.ride.ic+' '+q.ride.name+' · '+q.ride.what+' '+q.rule:q.ty==='build'?q.c.ic+' '+q.c.t+' '+q.rule:'';
    if(sgn){K.card(g,S.x+S.w*.1,S.y+u*.3,S.w*.8,u*1.5,u*.25,'#fff7fb',{stroke:'#831843',lw:4,blur:u*.2,dy:u*.06});K.txt(g,sgn,S.x+S.w/2,S.y+u*1.05,{size:Math.min(u*.9,u*1.5*.45),color:'#831843',maxW:S.w*.76});}
    K.card(g,u*.3,S.y-u*.1,u*2.9,u*.7,u*.3,'rgba(255,255,255,.95)',{stroke:'#831843',lw:3,blur:0,dy:0});K.txt(g,'😊 '+st.happy+'명 만족',u*.3+u*1.45,S.y+u*.25,{size:u*.4,color:INK,maxW:u*2.6});
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+S.w-Math.min(u*7,S.w*.3),S.y+u*.05,Math.min(u*7,S.w*.3),Math.max(5,u*.16),st.qt/st.qmax,{good:BL});
    if(q.ty==='gate')this.drawGate(g,G,q,st,u,t);else if(q.ty==='build')this.drawBuild(g,G,q,st,u);else if(q.ty==='round')this.drawRound(g,G,q,st,u);else this.drawLife(g,G,q,st,u,t);
    G.list.forEach(b=>{let fill='#fffdfd',ink=INK,line='#831843';if(b.go){fill=PK;ink='#fff';}if(b.id==='yes'){fill='#bbf7d0';}if(b.id==='no'){fill='#fecaca';}K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=st.lock?'#e2e8f0':fill;g.fill();g.lineWidth=3;g.strokeStyle=line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*1),color:ink,maxW:b.w*.92});});
    if(st.lock)K.txt(g,st.okFlag?'🎉 손님 만족!':'😣 앗, 실수!',S.x+S.w/2,S.y+S.h*.93,{size:u*.9,color:st.okFlag?'#15803d':'#b91c1c',stroke:'#fff',lw:u*.2,maxW:S.w*.8});
  },
  drawGate(g,G,q,st,u,t){const S=G.S;const ry=S.y+S.h*.52;K.emo(g,q.ride.ic,S.x+S.w*.82,ry,Math.min(S.h*.35,u*4));
    const seats=st.seats||0;K.txt(g,'🙂'.repeat(Math.min(seats,8)),S.x+S.w*.82,ry+Math.min(S.h*.2,u*2.4),{size:u*.5,color:INK,maxW:S.w*.25});
    const cx=S.x+S.w*.4,cy=ry;if(st.k<q.vs.length||st.anim){const idx=st.anim?st.k-1:st.k;if(idx<q.vs.length){let ox=0,oy=0,al=1;if(st.anim){const k=clamp(st.anim.t/.45,0,1);ox=st.anim.yes?k*S.w*.4:-k*S.w*.15;oy=st.anim.yes?0:k*u*2;al=1-k*.7;}g.save();g.globalAlpha=al;K.card(g,cx-u*2.2+ox,cy-u*2.2+oy,u*4.4,u*4.4,u*.4,'#fffdfd',{stroke:'#831843',lw:4,blur:u*.2,dy:u*.06});K.emo(g,GUEST[(idx+q.vs[0])%GUEST.length],cx+ox,cy-u*.5+oy,u*2.2);K.txt(g,q.vs[idx]+' '+q.ride.u,cx+ox,cy+u*1.5+oy,{size:u*.9,color:INK,maxW:u*4});g.restore();}}
    q.vs.slice(st.k+(st.anim?0:1)).forEach((v,k)=>K.emo(g,GUEST[(st.k+1+k+q.vs[0])%GUEST.length],S.x+u*1.2+k*u*1.1,S.y+S.h*.88,u*.9));
    st.outs.forEach((r,k)=>K.emo(g,r?'👍':'😵',S.x+S.w*.6+k*u*.9,S.y+S.h*.88,u*.8));},
  drawBuild(g,G,q,st,u){const S=G.S,N=this.nlGeo(G,q),n=q.n;g.strokeStyle='#334155';g.lineWidth=Math.max(3,u*.08);g.beginPath();g.moveTo(S.x+u*.3,N.y);g.lineTo(S.x+S.w-u*.3,N.y);g.stroke();
    [[S.x+u*.3+u*.4,-1],[S.x+S.w-u*.3-u*.4,1]].forEach(([x,d])=>{g.beginPath();g.moveTo(x-d*u*.4,N.y-u*.3);g.lineTo(x+d*u*.2,N.y);g.lineTo(x-d*u*.4,N.y+u*.3);g.stroke();});
    for(let k=0;k<n;k++){g.beginPath();g.moveTo(N.X(k),N.y-u*.3);g.lineTo(N.X(k),N.y+u*.3);g.stroke();K.txt(g,String(q.s+k*q.d),N.X(k),N.y+u*.95,{size:Math.min(u*.65,(N.x1-N.x0)/n*.38),color:INK,maxW:(N.x1-N.x0)/n*.95});}
    const L=st.L,R=st.R;g.strokeStyle=PK;g.lineWidth=Math.max(6,u*.2);g.lineCap='round';g.beginPath();g.moveTo(N.X(L.p),N.y-u*1.0);g.lineTo(N.X(R.p),N.y-u*1.0);g.stroke();
    const end=(E,left)=>{const x=N.X(E.p);if(E.p<0||E.p>=n){g.lineWidth=Math.max(4,u*.12);g.beginPath();g.moveTo(x+(left?u*.5:-u*.5),N.y-u*1.4);g.lineTo(x,N.y-u*1.0);g.lineTo(x+(left?u*.5:-u*.5),N.y-u*.6);g.stroke();}else{g.fillStyle=E.f?PK:'#fff';g.strokeStyle=PK;g.lineWidth=Math.max(3,u*.1);g.beginPath();g.arc(x,N.y-u*1.0,u*.4,0,TAU);g.fill();g.stroke();g.setLineDash([u*.1,u*.1]);g.lineWidth=2;g.beginPath();g.moveTo(x,N.y-u*.6);g.lineTo(x,N.y);g.stroke();g.setLineDash([]);}};end(L,true);end(R,false);
    K.txt(g,'눈금을 눌러 끝점을 옮기고, 끝점을 누르면 ●/○가 바뀌어요',S.x+S.w/2,N.y+u*2.2,{size:u*.55,color:'#9d174d',maxW:S.w*.9});
    if(st.lock&&!st.okFlag){const want=(e,def)=>e?{p:(e[0]-q.s)/q.d,f:e[1]==='이상'||e[1]==='이하'}:def;const WL=want(q.lo,{p:-1}),WR=want(q.hi,{p:q.n});g.strokeStyle='#16a34a';g.lineWidth=Math.max(4,u*.12);g.setLineDash([u*.2,u*.14]);g.beginPath();g.moveTo(N.X(WL.p),N.y-u*1.8);g.lineTo(N.X(WR.p),N.y-u*1.8);g.stroke();g.setLineDash([]);K.txt(g,'정답 범위',N.X((WL.p+WR.p)/2),N.y-u*2.3,{size:u*.5,color:'#15803d',maxW:u*5});}},
  drawRound(g,G,q,st,u){const S=G.S;K.card(g,S.x+S.w*.05,S.y+S.h*.28,S.w*.9,S.h*.5,u*.3,'#1f0a1a',{stroke:'#f472b6',lw:4,blur:u*.3,dy:0,sc:'rgba(244,114,182,.5)'});K.txt(g,'📟 '+q.ctx,S.x+S.w/2,S.y+S.h*.34,{size:u*.6,color:'#fbcfe8',maxW:S.w*.8});
    const R=this.digitRects(G,q);R.forEach((r,k)=>{const d=q.ds[k];if(!r){const prev=R[k-1]||R[k+1];K.txt(g,'.',(prev?prev.x:S.x)+(R[k+1]?R[k+1].x-(prev?prev.x:0):0)/2-(R[k+1]?0:0),S.y+S.h*.42+prev.h*.7,{size:u*1.2,color:'#fde68a',maxW:u*.8});return;}
      const pick=st.dpick===k,low=st.step===1&&k>q.ti;const bad=pick&&k!==q.ti;K.rr(g,r.x,r.y,r.w,r.h,u*.2);g.fillStyle=bad?'#fecaca':pick?'#fde68a':low?'#3b1a35':'#4a1d44';g.fill();g.lineWidth=pick?5:2;g.strokeStyle=pick?(bad?'#dc2626':'#facc15'):'#f9a8d4';g.stroke();K.txt(g,d,r.x+r.w/2,r.y+r.h/2,{size:r.h*.6,color:low?'#a78bfa':'#fff',maxW:r.w});});
    const last=R.filter(Boolean).slice(-1)[0];if(last)K.txt(g,q.u,last.x+last.w+u*1.0,last.y+last.h/2,{size:u*.7,color:'#fbcfe8',maxW:u*2.4});
    K.txt(g,st.lock&&st.resTxt?'→ '+st.resTxt+q.u:(st.step===0?'① '+q.place+' 숫자를 콕!':'② '+q.m+'할까요?'),S.x+S.w/2,S.y+S.h*.7,{size:u*.8,color:'#fde68a',maxW:S.w*.8});},
  drawLife(g,G,q,st,u,t){const S=G.S,tt=q.t;K.card(g,S.x+S.w*.08,S.y+u*.4,S.w*.84,u*1.3,u*.25,'#fffdfd',{stroke:'#831843',lw:3,blur:0,dy:0});K.txt(g,tt.have(tt.cu==='원'?q.n:q.n),S.x+S.w/2,S.y+u*1.05,{size:Math.min(u*.85,u*1.3*.5),color:INK,maxW:S.w*.78});
    const n=st.c;const cy=S.y+S.h*.5;if(n<=14){const sz=Math.min(u*2,(S.w*.9)/Math.max(n,1),S.h*.3);for(let i=0;i<n;i++)K.emo(g,tt.ic,S.x+S.w/2-(n-1)*sz*.55+i*sz*1.1,cy,sz);}else{K.emo(g,tt.ic,S.x+S.w/2-u*1.5,cy,u*2.4);K.txt(g,'× '+n,S.x+S.w/2+u*1.2,cy,{size:u*1.3,color:INK,maxW:u*5});}
    K.txt(g,n+tt.u,S.x+S.w/2,cy+Math.min(S.h*.2,u*2.2),{size:u*1.1,color:PK,maxW:S.w*.5});const cap=n*q.per;
    const msg=tt.kind==='ceil'?(cap<q.n?'😢 아직 '+(q.n-cap)+tt.who+' 남아요':tt.who2+' '+gkComma(cap)+tt.cu+' 준비 (모두 '+gkComma(q.n)+tt.cu+')'):(cap>q.n?'⚠️ '+tt.need+' '+gkComma(cap)+tt.cu+' 필요… 가진 건 '+gkComma(q.n)+tt.cu:tt.need+' '+gkComma(cap)+tt.cu+' 사용');
    K.txt(g,msg.replace('아직 ','아직 ').replace(tt.who2+' ',tt.who2?tt.who2+' ':''),S.x+S.w/2,S.y+S.h*.86,{size:Math.min(u*.65,S.h*.07),color:cap<q.n&&tt.kind==='ceil'||cap>q.n&&tt.kind==='floor'?'#b91c1c':'#15803d',maxW:S.w*.9});},
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1800,badMs:3500});
Engine.boot(GAME);
