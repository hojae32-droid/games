/* 5학년 1학기 수학 · 다각형의 둘레와 넓이 — 진짜 땅따먹기
   디자인: 측량 지도와 땅 문서. 땅 문서에 적힌 조건대로 모눈 지도 위에 직접 땅을 그려요. 조건에 맞으면 그 땅이 내 땅! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2c3b17',GRN='#15803d',GOLD='#ca8a04';
const LOGO=gkLogo('#fdfbec','#365314','🗺️');
const LV={
  a:{t:'둘레',d:'둘레가 ○ m인 땅 그리기 · 둘레 구하기'},
  b:{t:'직사각형 · 정사각형의 넓이',d:'넓이가 ○ m²인 땅 그리기 · 단위'},
  c:{t:'평행사변형 · 삼각형의 넓이',d:'꼭짓점 찍어 땅 그리기 · 넓이 구하기'},
  d:{t:'마름모 · 사다리꼴의 넓이',d:'꼭짓점 찍어 땅 그리기 · 넓이 구하기'},
};
const GW=12,GH=8;
const area=P=>{let s=0;for(let k=0;k<P.length;k++){const a=P[k],b=P[(k+1)%P.length];s+=a[0]*b[1]-b[0]*a[1];}return s/2;};
const d2s=(a,b)=>(a[0]-b[0])**2+(a[1]-b[1])**2;
const crs=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
function convex(P){const n=P.length;let sg=0;for(let k=0;k<n;k++){const c=crs(P[k],P[(k+1)%n],P[(k+2)%n]);if(c===0)return false;if(sg&&Math.sign(c)!==sg)return false;sg=Math.sign(c);}return true;}
const isPar=P=>P.length===4&&convex(P)&&P[1][0]-P[0][0]===P[2][0]-P[3][0]&&P[1][1]-P[0][1]===P[2][1]-P[3][1];
function isTz(P){if(P.length!==4||!convex(P))return false;const par=(a,b,c,d)=>(b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0])===0;return par(P[0],P[1],P[3],P[2])||par(P[1],P[2],P[0],P[3]);}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#e8efd0','#c7dba0']);const cs=u*.9,x0=W/2-cs*5,y0=H*.15;g.strokeStyle='rgba(54,83,20,.35)';g.lineWidth=1;for(let i=0;i<=10;i++){g.beginPath();g.moveTo(x0+i*cs,y0);g.lineTo(x0+i*cs,y0+cs*6);g.stroke();}for(let j=0;j<=6;j++){g.beginPath();g.moveTo(x0,y0+j*cs);g.lineTo(x0+10*cs,y0+j*cs);g.stroke();}
  const k=Math.min(1,(T%4)/2.5);g.fillStyle='rgba(250,204,21,.7)';g.strokeStyle='#92400e';g.lineWidth=3;g.fillRect(x0+cs*2,y0+cs,cs*6*k,cs*4);g.strokeRect(x0+cs*2,y0+cs,cs*6*k,cs*4);K.emo(g,'🚩',x0+cs*2+cs*6*k,y0+cs*.8,u*.9);}
const GAME={
  id:'landgrab',title:'진짜 땅따먹기',title1:'측량 지도와 땅 문서',title2:'진짜 땅따먹기',emoji:LOGO,
  subtitle:'5학년 1학기 수학 · 다각형의 둘레와 넓이',
  howto:'땅 문서에 적힌 조건대로 모눈 지도 위에 <b>직접 땅을 그려요!</b> 직사각형은 한 꼭짓점에서 맞은편 꼭짓점까지 <b>끌거나 두 번 콕콕</b>, 삼각형·평행사변형·마름모·사다리꼴은 <b>꼭짓점을 차례로 콕콕</b> 찍어요. 조건에 맞으면 그 땅이 내 땅!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:GRN,c2:GOLD},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 땅을 차지할까요?',
  txt:{who:'누가 땅 주인일까요?',dur:'측량 시간',pace:'생각하는 시간',seat:'번 측량사 ',go:'측량 시작!',s1:'1. 땅',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>둘레</b>: 도형의 가장자리를 한 바퀴 돈 길이예요. 직사각형의 둘레 = (가로 + 세로) × 2, 정사각형의 둘레 = 한 변 × 4</li>
    <li><b>넓이</b>: 직사각형 = 가로 × 세로, 정사각형 = 한 변 × 한 변. 1 m² = 10000 cm²</li>
    <li><b>평행사변형</b>의 넓이 = 밑변 × 높이, <b>삼각형</b>의 넓이 = 밑변 × 높이 ÷ 2</li>
    <li><b>마름모</b>의 넓이 = 한 대각선 × 다른 대각선 ÷ 2, <b>사다리꼴</b>의 넓이 = (윗변 + 아랫변) × 높이 ÷ 2</li></ul>`,
  rowsFor(p){const q=p.state.q;if(!q)return[];if(q.draw)return[[{id:'undo',t:'↩ 다시 그리기'}],[{id:'ok',t:'🚩 내 땅!',go:1}]];const r=[[1,2,3],[4,5,6],[7,8,9]].map(a=>a.map(n=>({id:'n'+n,t:String(n)})));r.push([{id:'bs',t:'⌫'},{id:'n0',t:'0'},{id:'go',t:'🚩',go:1}]);return r;},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,land=W>=H*1.1;const rows=this.rowsFor(p);const gap=u*.2;let m,panel;
    if(land){const cs=Math.min((H-top-pad-u*1.2)/GH,W*.6/GW);m={cs,x:pad,y:top+u*1.2};panel={x:pad*2+cs*GW,y:top+u*1.2,w:W-cs*GW-pad*3,h:H-top-pad-u*1.2};}
    else{const rh0=Math.min(u*1.5,(H-top)*.085);const ph=Math.min((H-top)*.46,rows.length*rh0+(rows.length-1)*gap+u*1.3);const cs=Math.min((W-pad*2)/GW,(H-top-pad-ph-u*1.6)/GH);m={cs,x:(W-cs*GW)/2,y:top+u*1.2};panel={x:pad,y:H-pad-ph,w:W-pad*2,h:ph};}
    const rh=Math.min(u*1.7,(panel.h-u*.8-gap*(rows.length-1))/Math.max(1,rows.length));const list=[];const y0=panel.y+(panel.h-(rows.length*rh+(rows.length-1)*gap));
    rows.forEach((row,r)=>{const w=(panel.w-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:panel.x+c*(w+gap),y:y0+r*(rh+gap),w,h:rh})));});
    return{W,H,u,top,pad,land,m,panel,list};},
  X(G,x){return G.m.x+x*G.m.cs;},Y(G,y){return G.m.y+y*G.m.cs;},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,land:0,pts:[],done:false,hover:null,down:null,np:'',okFlag:false,msg:'',got:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};const strip=s=>s.replace(/<[^>]+>/g,'');const sh=(t,P,lab)=>{q.show={t,P,lab};};const N=gkComma;let k;
    if(L==='a'){k=R.pick(['rectP','rectP','sqP','num','num']);
      if(k==='rectP'){const w=R.int(2,10),h=R.int(1,Math.min(7,w));q.draw='rect';q.P=2*(w+h);q.text='<b>둘레가 '+q.P+' m</b>인 직사각형 땅을 그려요!';q.chk=(w2,h2)=>2*(w2+h2)===q.P;q.sol=[[1,1],[1+w,1+h]];q.reveal='예: 가로 '+w+' m, 세로 '+h+' m ('+w+'+'+h+')×2='+q.P;}
      else if(k==='sqP'){const a=R.int(2,7);q.draw='rect';q.P=4*a;q.text='<b>둘레가 '+q.P+' m</b>인 <b>정사각형</b> 땅을 그려요!';q.chk=(w2,h2)=>w2===h2&&4*w2===q.P;q.sol=[[1,1],[1+a,1+a]];q.reveal='한 변 '+a+' m ('+a+'×4='+q.P+')';}
      else{const t=R.pick(['rect','par','rh']);if(t==='rect'){const w=R.int(3,10),h=R.int(2,6);sh('rect',[[1,1],[1+w,1],[1+w,1+h],[1,1+h]],[[0,w+' m'],[1,h+' m']]);q.ans=2*(w+h);q.what='직사각형 땅';}
        else if(t==='par'){const b=R.int(4,7);sh('par',[[1,5],[1+b,5],[4+b,1],[4,1]],[[0,b+' m'],[3,'5 m']]);q.ans=2*(b+5);q.what='평행사변형 땅';}else{sh('rh',[[2,4],[5,0],[8,4],[5,8]],[[0,'5 m']]);q.ans=20;q.what='마름모 땅';}
        q.text='<b>'+q.what+'</b>에 울타리를 쳐요. <b>둘레</b>는 몇 m?';q.unit='m';q.reveal=q.ans+' m';}}
    else if(L==='b'){k=R.pick(['rectA','rectA','rectAw','sqA','num','conv']);
      if(k==='rectA'){let w,h;do{w=R.int(2,10);h=R.int(2,7);}while(w*h<8);q.draw='rect';q.A=w*h;q.text='<b>넓이가 '+q.A+' m²</b>인 직사각형 땅을 그려요!';q.chk=(a,b)=>a*b===q.A;q.sol=[[1,1],[1+w,1+h]];q.reveal='예: 가로 '+w+' m × 세로 '+h+' m = '+q.A+' m²';}
      else if(k==='rectAw'){const w=R.int(3,10),h=R.int(2,7);q.draw='rect';q.A=w*h;q.text='<b>가로 '+w+' m</b>, <b>넓이 '+q.A+' m²</b>인 직사각형 땅을 그려요!';q.chk=(a,b)=>a===w&&a*b===q.A;q.sol=[[1,1],[1+w,1+h]];q.reveal='세로 = '+q.A+' ÷ '+w+' = '+h+' m';}
      else if(k==='sqA'){const a=R.int(2,7);q.draw='rect';q.A=a*a;q.text='<b>넓이가 '+q.A+' m²</b>인 <b>정사각형</b> 땅을 그려요!';q.chk=(x,y)=>x===y&&x*y===q.A;q.sol=[[1,1],[1+a,1+a]];q.reveal='한 변 '+a+' m ('+a+'×'+a+'='+q.A+')';}
      else if(k==='num'){const w=R.int(3,10),h=R.int(2,7);sh('rect',[[1,1],[1+w,1],[1+w,1+h],[1,1+h]],[[0,w+' m'],[1,h+' m']]);q.ans=w*h;q.unit='m²';q.text='이 땅의 <b>넓이</b>는 몇 m²?';q.reveal=q.ans+' m²';}
      else{const a=R.int(2,9);if(R.chance(.5)){q.text='<b>'+a+' m²</b>는 몇 cm²일까요? (1 m = 100 cm)';q.ans=a*10000;q.unit='cm²';}else{q.text='<b>'+N(a*10000)+' cm²</b>는 몇 m²일까요? (1 m² = 10000 cm²)';q.ans=a;q.unit='m²';}sh('rect',[[3,1],[9,1],[9,7],[3,7]],[[0,'1 m = 100 cm'],[1,'']]);q.reveal=N(q.ans)+' '+q.unit;}}
    else if(L==='c'){k=R.pick(['tri','tri','par','num','num']);
      if(k==='tri'){const b=R.pick([2,3,4,4,5,6,6,8]),h=R.pick([2,3,4,5,6].filter(x=>(b*x)%2===0));q.draw='poly';q.n=3;q.A=b*h/2;q.text='<b>넓이가 '+q.A+' m²</b>인 <b>삼각형</b> 땅을 그려요! (꼭짓점 3개)';q.chk=P=>Math.abs(area(P))===q.A;q.sol=[[1,1+h],[1+b,1+h],[2,1]];q.reveal='예: 밑변 '+b+' m, 높이 '+h+' m → '+b+'×'+h+'÷2='+q.A;}
      else if(k==='par'){const b=R.int(2,6),h=R.int(2,5);q.draw='poly';q.n=4;q.A=b*h;q.text='<b>넓이가 '+q.A+' m²</b>인 <b>평행사변형</b> 땅을 그려요! (꼭짓점 4개)';q.chk=P=>isPar(P)&&Math.abs(area(P))===q.A;q.sol=[[1,1+h],[1+b,1+h],[3+b,1],[3,1]];q.reveal='예: 밑변 '+b+' m, 높이 '+h+' m → '+b+'×'+h+'='+q.A;}
      else{if(R.chance(.5)){const b=R.int(3,7),h=R.int(2,6),s=R.int(1,3);sh('par',[[1,1+h],[1+b,1+h],[1+b+s,1],[1+s,1]],[[0,b+' m'],['h',h+' m']]);q.ans=b*h;q.what='평행사변형';}else{let b=R.int(3,9),h=R.int(2,7);if((b*h)%2)b++;const s=R.int(0,b);sh('tri',[[1,1+h],[1+b,1+h],[1+s,1]],[[0,b+' m'],['h',h+' m']]);q.ans=b*h/2;q.what='삼각형';}
        q.unit='m²';q.text='이 <b>'+q.what+'</b> 땅의 넓이는 몇 m²?';q.reveal=q.ans+' m²';}}
    else{k=R.pick(['rh','tz','tz','num','num']);
      if(k==='rh'){const a=R.int(1,4),c=R.int(1,4);const d1=2*a,d2=2*c;q.draw='poly';q.n=4;q.A=d1*d2/2;q.text='<b>넓이가 '+q.A+' m²</b>인 <b>마름모</b> 땅을 그려요! (꼭짓점 4개)';q.chk=P=>isPar(P)&&d2s(P[0],P[1])===d2s(P[1],P[2])&&Math.abs(area(P))===q.A;q.sol=[[5-a,4],[5,4-c],[5+a,4],[5,4+c]];q.reveal='예: 대각선 '+d1+' m, '+d2+' m → '+d1+'×'+d2+'÷2='+q.A;}
      else if(k==='tz'){let a=R.int(1,4),b=a+R.int(1,5),h=R.int(2,5);if(((a+b)*h)%2)h=h===5?4:h+1;q.draw='poly';q.n=4;q.A=(a+b)*h/2;q.text='<b>넓이가 '+q.A+' m²</b>인 <b>사다리꼴</b> 땅을 그려요! (꼭짓점 4개)';q.chk=P=>isTz(P)&&Math.abs(area(P))===q.A;q.sol=[[1,1+h],[1+b,1+h],[2+a,1],[2,1]];q.reveal='예: 윗변 '+a+' m, 아랫변 '+b+' m, 높이 '+h+' m → ('+a+'+'+b+')×'+h+'÷2='+q.A;}
      else{if(R.chance(.5)){const a=R.int(1,5),c=R.int(1,4);sh('rh',[[6-a,4],[6,4-c],[6+a,4],[6,4+c]],[['d1',2*a+' m'],['d2',2*c+' m']]);q.ans=2*a*c;q.what='마름모';}
        else{let a=R.int(2,5),b=a+R.int(1,5),h=R.int(2,6);if(((a+b)*h)%2)h=h===6?5:h+1;const s=R.int(0,b-a);sh('tz',[[1,1+h],[1+b,1+h],[1+s+a,1],[1+s,1]],[[2,a+' m'],[0,b+' m'],['h',h+' m']]);q.ans=(a+b)*h/2;q.what='사다리꼴';}
        q.unit='m²';q.text='이 <b>'+q.what+'</b> 땅의 넓이는 몇 m²?';q.reveal=q.ans+' m²';}}
    q.review=strip(q.text)+(q.show&&q.show.lab?' ['+q.show.lab.map(l=>l[1]).filter(Boolean).join(', ')+']':'')+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.draw?60:45;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '📜 '+q.text;},askSub(q){return q.draw==='rect'?'모눈의 점에서 점까지 끌거나 두 점을 콕콕':q.draw?'꼭짓점을 차례로 콕콕 (모눈의 점)':'숫자를 눌러 답을 써요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return (this._p&&this._p.state.msg?this._p.state.msg+' → ':'')+q.reveal;},goodTip(q){return '땅 차지! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+55*frac)+(q.draw?15:0);},
  onNew(p,q){const st=p.state;st.pts=[];st.done=false;st.hover=null;st.down=null;st.np='';st.okFlag=false;st.msg='';st.got=0;},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.land+=q.draw?st.got:(q.show?Math.abs(area(q.show.P)):0);}},
  tapV(p,x,y){const st=p.state,q=st.q;if(st.lock)return;x=clamp(x,0,GW);y=clamp(y,0,GH);if(st.done){st.pts=[];st.done=false;}
    if(st.pts.some(v=>v[0]===x&&v[1]===y)){if(q.draw==='poly'&&st.pts.length>=3&&st.pts[0][0]===x&&st.pts[0][1]===y&&st.pts.length===q.n){st.done=true;}else return;}else st.pts.push([x,y]);p.Snd.tap&&p.Snd.tap();
    if(q.draw==='rect'&&st.pts.length===2){const[a,b]=st.pts;if(a[0]===b[0]||a[1]===b[1])st.pts=[b];else st.done=true;}if(q.draw==='poly'&&st.pts.length===q.n)st.done=true;},
  lat(p,x,y){const G=this.geo(p);return[Math.round((x-G.m.x)/G.m.cs),Math.round((y-G.m.y)/G.m.cs)];},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.list.find(b=>K.inRect(x,y,b));
    if(b){p.Snd.tap&&p.Snd.tap();if(b.id==='undo'){st.pts=[];st.done=false;return;}
      if(b.id==='ok'){if(!st.done){p.Snd.bad&&p.Snd.bad();return;}const P=st.pts;let good;if(q.draw==='rect'){const w=Math.abs(P[0][0]-P[1][0]),h=Math.abs(P[0][1]-P[1][1]);good=q.chk(w,h);st.got=w*h;st.msg='내가 그린 땅: 가로 '+w+' m, 세로 '+h+' m (둘레 '+2*(w+h)+' m, 넓이 '+w*h+' m²)';}else{good=q.chk(P);st.got=Math.abs(area(P));st.msg='내가 그린 땅의 넓이: '+st.got+' m²';}st.okFlag=good;this.verdict(p,0,false);return;}
      if(b.id[0]==='n'&&b.id.length===2){if(st.np.length<6)st.np+=b.id[1];return;}if(b.id==='bs'){st.np=st.np.slice(0,-1);return;}if(b.id==='go'){if(st.np==='')return;st.okFlag=Number(st.np)===q.ans;this.verdict(p,0,false);}return;}
    if(!q.draw)return;if(x<G.m.x-G.m.cs*.5||x>G.m.x+GW*G.m.cs+G.m.cs*.5||y<G.m.y-G.m.cs*.5||y>G.m.y+GH*G.m.cs+G.m.cs*.5)return;const v=this.lat(p,x,y);st.down=v;if(q.draw==='rect'&&(st.pts.length!==1||st.done)){st.pts=[];st.done=false;}this.tapV(p,v[0],v[1]);},
  move(p,x,y,dn){const st=p.state,q=st.q;if(!st.down||!q||q.draw!=='rect'||st.lock)return;const v=this.lat(p,x,y);if(v[0]===st.down[0]&&v[1]===st.down[1])return;st.hover=v;},
  up(p,x,y){const st=p.state,q=st.q;if(!st.down)return;const d=st.down;st.down=null;st.hover=null;if(!q||q.draw!=='rect'||st.lock)return;const v=this.lat(p,x,y);if((v[0]!==d[0]||v[1]!==d[1])&&st.pts.length===1)this.tapV(p,v[0],v[1]);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(!q.draw){st.np=String(q.ans);return cl(G.list.find(b=>b.id==='go'));}
    if(!st.done){const k=st.pts.length;const v=q.sol[k];if(v)return{k:'click',x:rc.left+this.X(G,v[0]),y:rc.top+this.Y(G,v[1])};}
    return cl(G.list.find(b=>b.id==='ok'));},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;const m=G.m,cs=m.cs,X=x=>this.X(G,x),Y=y=>this.Y(G,y);
    K.vgrad(g,0,0,W,H,['#e8efd0','#cfe0a8']);
    /* 땅 문서 */
    K.card(g,G.pad,G.top-u*.1,G.land?cs*GW:W-G.pad*2,u*1.1,u*.2,'#fdfbec',{stroke:'#365314',lw:3,blur:0,dy:0});K.txt(g,'📜 땅 문서',G.pad+u*1.9,G.top+u*.45,{size:u*.6,color:'#365314',maxW:u*3.4});K.txt(g,'🚩 내 땅 '+st.land+' m²',G.pad+(G.land?cs*GW:W-G.pad*2)-u*3.4,G.top+u*.45,{size:u*.6,color:GRN,maxW:u*6});
    if(q.draw){const live=q.draw==='rect'&&st.pts.length===2?'가로 '+Math.abs(st.pts[0][0]-st.pts[1][0])+' m · 세로 '+Math.abs(st.pts[0][1]-st.pts[1][1])+' m':q.draw==='poly'?'꼭짓점 '+st.pts.length+'/'+q.n:'';K.txt(g,live,G.pad+(G.land?cs*GW:W-G.pad*2)/2+u*1.5,G.top+u*.45,{size:u*.5,color:'#713f12',maxW:cs*GW*.35});}
    /* 지도 */
    K.card(g,m.x-u*.2,m.y-u*.2,cs*GW+u*.4,cs*GH+u*.4,u*.2,'#bbf7d0',{stroke:'#365314',lw:Math.max(3,u*.08),blur:u*.25,dy:u*.06});g.strokeStyle='rgba(22,163,74,.4)';g.lineWidth=1;for(let i=0;i<=GW;i++){g.beginPath();g.moveTo(X(i),Y(0));g.lineTo(X(i),Y(GH));g.stroke();}for(let j=0;j<=GH;j++){g.beginPath();g.moveTo(X(0),Y(j));g.lineTo(X(GW),Y(j));g.stroke();}
    if(q.draw)for(let i=0;i<=GW;i++)for(let j=0;j<=GH;j++){g.fillStyle='rgba(54,83,20,.35)';g.beginPath();g.arc(X(i),Y(j),Math.max(1.5,cs*.045),0,TAU);g.fill();}
    const T=(x,y,s)=>K.txt(g,s,x,y,{size:Math.min(u*.65,cs*.55),color:'#1e293b',stroke:'#fff',lw:Math.max(3,u*.1),maxW:cs*3});
    if(q.show){const P=q.show.P.map(v=>[X(v[0]),Y(v[1])]);g.beginPath();P.forEach((v,i)=>i?g.lineTo(v[0],v[1]):g.moveTo(v[0],v[1]));g.closePath();g.fillStyle=st.lock&&st.okFlag?'rgba(250,204,21,.9)':'rgba(253,230,138,.9)';g.fill();g.strokeStyle='#92400e';g.lineWidth=Math.max(3,u*.09);g.lineJoin='round';g.stroke();const n=P.length;
      q.show.lab.forEach(([k,s])=>{if(!s)return;if(k==='h'){const top=Math.min(...P.map(v=>v[1])),bot=Math.max(...P.map(v=>v[1]));const tp=P.find(v=>v[1]===top);g.strokeStyle='#dc2626';g.lineWidth=Math.max(2.5,u*.07);g.setLineDash([u*.2,u*.14]);g.beginPath();g.moveTo(tp[0],top);g.lineTo(tp[0],bot);g.stroke();g.setLineDash([]);g.beginPath();g.moveTo(tp[0],bot-cs*.35);g.lineTo(tp[0]+cs*.35,bot-cs*.35);g.lineTo(tp[0]+cs*.35,bot);g.stroke();T(tp[0]+(tp[0]>X(GW/2)?-cs*.9:cs*.9),(top+bot)/2,s);}
        else if(k==='d1'||k==='d2'){const a=k==='d1'?P[0]:P[1],b=k==='d1'?P[2]:P[3];g.strokeStyle='#2563eb';g.lineWidth=Math.max(2.5,u*.07);g.setLineDash([u*.2,u*.14]);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.setLineDash([]);T(k==='d1'?(a[0]+b[0])/2-cs*.9:a[0]+cs*.9,k==='d1'?a[1]-cs*.3:a[1]*.3+b[1]*.7,s);}
        else{const a=P[k],b=P[(k+1)%n];const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;const cx=P.reduce((s2,v)=>s2+v[0],0)/n,cy=P.reduce((s2,v)=>s2+v[1],0)/n;const dx=mx-cx,dy=my-cy,l=Math.hypot(dx,dy)||1;T(mx+dx/l*cs*.7,my+dy/l*cs*.7,s);}});}
    if(q.draw){const P=st.pts.map(v=>[X(v[0]),Y(v[1])]);
      if(q.draw==='rect'&&(P.length===2||(P.length===1&&st.hover))){const b=P.length===2?P[1]:[X(st.hover[0]),Y(st.hover[1])];const a=P[0];g.fillStyle='rgba(250,204,21,.7)';g.strokeStyle='#92400e';g.lineWidth=Math.max(3,u*.09);g.fillRect(Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.abs(a[0]-b[0]),Math.abs(a[1]-b[1]));g.strokeRect(Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.abs(a[0]-b[0]),Math.abs(a[1]-b[1]));}
      else if(P.length>=2){g.beginPath();P.forEach((v,i)=>i?g.lineTo(v[0],v[1]):g.moveTo(v[0],v[1]));if(st.done){g.closePath();g.fillStyle='rgba(250,204,21,.7)';g.fill();g.setLineDash([]);}else g.setLineDash([u*.15,u*.12]);g.strokeStyle='#92400e';g.lineWidth=Math.max(3,u*.09);g.lineJoin='round';g.stroke();g.setLineDash([]);}
      P.forEach((v,k)=>{g.fillStyle=k?'#f59e0b':'#dc2626';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(v[0],v[1],Math.max(5,cs*.2),0,TAU);g.fill();g.stroke();});
      if(st.lock&&!st.okFlag&&q.sol){const sp=q.sol.map(v=>[X(v[0]),Y(v[1])]);g.strokeStyle='#16a34a';g.setLineDash([u*.2,u*.14]);g.lineWidth=Math.max(3,u*.08);g.beginPath();sp.forEach((v,i)=>i?g.lineTo(v[0],v[1]):g.moveTo(v[0],v[1]));g.closePath();g.stroke();g.setLineDash([]);}
      K.txt(g,'한 칸 = 1 m',X(GW)-u*.2,Y(GH)-u*.3,{size:u*.42,color:'#166534',maxW:cs*4,align:'right'});}
    if(st.lock&&st.okFlag)K.emo(g,'🚩',X(GW/2),Y(GH/2)-cs*.2,u*1.7+Math.sin(st.rT*7)*u*.1);
    /* 조작판 */
    const P0=G.panel;if(!q.draw){K.card(g,P0.x,P0.y,P0.w,u*1.1,u*.2,'#fdfbec',{stroke:'#365314',lw:3,blur:0,dy:0});K.txt(g,(st.np?gkComma(st.np):'?')+' '+(q.unit||''),P0.x+P0.w/2,P0.y+u*.55,{size:u*.8,color:INK,maxW:P0.w*.9});}
    G.list.forEach(b=>{let fill='#fdfbec',ink=INK,line='#365314';if(b.go){fill=st.lock?'#cbd5e1':GOLD;ink='#fff';}K.rr(g,b.x,b.y,b.w,b.h,u*.22);g.fillStyle=fill;g.fill();g.lineWidth=3;g.strokeStyle=line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*1),color:ink,maxW:b.w*.9});});
    if(!st.lock&&st.qmax>0)QZ.bar(g,G.pad,G.top-u*.3,Math.min(W*.4,u*8),Math.max(5,u*.15),st.qt/st.qmax,{good:GRN});
    if(st.lock&&!st.okFlag&&st.msg)K.txt(g,st.msg,P0.x+P0.w/2,P0.y+P0.h*.35,{size:Math.min(u*.55,P0.w*.06),color:'#b91c1c',maxW:P0.w*.95});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:55,okMs:1800,badMs:3800});
Engine.boot(GAME);
