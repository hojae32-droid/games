/* 3학년 2학기 수학 · 원 — 컴퍼스 보물 탐험대
   디자인: 연잎이 떠 있는 연못과 보물 지도. 원의 중심·반지름·지름을 찾고, 컴퍼스로 원을 그려 두 원이 만나는 곳의 보물을 파요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0b4f48',TEAL='#0f766e',PINK='#ec4899';
const LOGO=gkLogo('#a7f3d0','#115e59','🪷');
const LV={
  a:{t:'원의 중심 · 반지름 · 지름',d:'원의 구성 요소 알기'},
  b:{t:'컴퍼스로 원 그리기',d:'반지름(지름)에 맞게 그리기'},
  h:{t:'🗺️ 보물 찾기',d:'두 원이 만나는 곳을 파요'},
  c:{t:'원을 이용한 문제',d:'여러 원 · 직사각형 속 원'},
};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):j);};
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#d9f7ee','#86efac']);for(let i=0;i<6;i++){const x=W*(.1+i*.17),y=H*(.3+.4*((i*37)%10)/10)+Math.sin(T+i)*4;g.fillStyle='#4ade80';g.beginPath();g.ellipse(x,y,u*.9,u*.4,0,.3,TAU-.3);g.fill();g.strokeStyle='#15803d';g.lineWidth=2;g.stroke();if(i%2){g.fillStyle='#f9a8d4';g.beginPath();g.arc(x,y-u*.1,u*.22,0,TAU);g.fill();}}
  const cx=W*.5,cy=H*.5,r=(T%3)/3*u*2.4;g.strokeStyle='#0f766e';g.lineWidth=3;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();g.fillStyle='#be185d';g.beginPath();g.arc(cx,cy,5,0,TAU);g.fill();g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+r,cy);g.stroke();}
const GAME={
  id:'compasspond',title:'컴퍼스 보물 탐험대',title1:'연못 보물 지도',title2:'컴퍼스 보물 탐험대',emoji:LOGO,
  subtitle:'3학년 2학기 수학 · 원',
  howto:'보물 지도를 들고 탐험을 떠나요! 연못의 <b>중심</b>을 찾고, 컴퍼스로 <b>원</b>을 그리고, <b>두 원이 만나는 곳</b>을 파서 보물을 찾아요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:TEAL,c2:PINK},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 탐험을 떠날까요?',
  txt:{who:'누가 탐험대장일까요?',dur:'탐험 시간',pace:'생각하는 시간',seat:'번 대원 ',go:'탐험 출발!',s1:'1. 탐험',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>원의 중심</b>: 원 안에서 가장 가운데에 있는 점이에요. <b>반지름</b>은 원의 중심과 원 위의 한 점을 이은 선분이에요.</li>
    <li><b>지름</b>은 원 위의 두 점을 이으면서 원의 중심을 지나는 선분이에요. 지름은 원 안에 그을 수 있는 가장 긴 선분이고, <b>지름 = 반지름 × 2</b>예요.</li>
    <li><b>컴퍼스</b>는 침을 원의 중심에 꽂고 반지름만큼 벌려서 원을 그려요.</li>
    <li>크기가 같은 원을 이어 붙이면 길이는 <b>지름 × 원의 수</b>예요.</li></ul>`,
  /* 지도는 격자 GW×GH, 오른쪽(가로 화면) 또는 아래(세로 화면)에 단추 */
  gdim(q,p){const ty=q&&q.ty;return ty==='draw'?[11,11]:ty==='hunt'||ty==='center'?[12,10]:[12,10];},
  geo(p){const W=p.W,H=p.H,u=p.u,q=p.state.q;const top=(p.top||0)+u*.3;const pad=u*.35;const[gw,gh]=this.gdim(q);const land=W>=H*1.1;let mw,mh,mx,my,panel;
    if(land){const maxW=W*.58,maxH=H-top-pad;const cs=Math.min(maxW/gw,maxH/gh);mw=cs*gw;mh=cs*gh;mx=pad;my=top+(maxH-mh)/2;panel={x:mx+mw+pad,y:top,w:W-mx-mw-pad*2,h:H-top-pad};}
    else{const maxW=W-pad*2,maxH=(H-top)*.58;const cs=Math.min(maxW/gw,maxH/gh);mw=cs*gw;mh=cs*gh;mx=(W-mw)/2;my=top;panel={x:pad,y:top+mh+u*.3,w:W-pad*2,h:H-top-mh-u*.3-pad};}
    return{W,H,u,land,gw,gh,cs:mw/gw,mx,my,mw,mh,panel,top,pad};},
  gx(G,x){return G.mx+x*G.cs;},gy(G,y){return G.my+y*G.cs;},
  toCm(G,x,y){return[(x-G.mx)/G.cs,(y-G.my)/G.cs];},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,sel:0,flag:null,r:0,rA:0,rB:0,mode:'A',dig:null,drag:false,arm:null,msg:'',msgT:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};const strip=s=>s.replace(/<[^>]+>/g,'');const fin=()=>{q.review=strip(q.text)+' → '+q.reveal;q.speak='';return q;};
    if(L==='h'){q.ty='hunt';const V=[[3,0],[0,3],[4,0],[0,4],[5,0],[0,5],[3,4],[4,3]];for(let t=0;t<500;t++){const T=[R.int(1,11),R.int(1,9)];const v1=R.pick(V).map(x=>x*R.sign()),v2=R.pick(V).map(x=>x*R.sign());const A=[T[0]+v1[0],T[1]+v1[1]],B=[T[0]+v2[0],T[1]+v2[1]];
        const inb=P=>P[0]>=0&&P[0]<=12&&P[1]>=0&&P[1]<=10;if(!inb(A)||!inb(B))continue;if(A[0]===B[0]&&A[1]===B[1])continue;const dA=Math.hypot(v1[0],v1[1]),dB=Math.hypot(v2[0],v2[1]);if(Math.hypot(A[0]-B[0],A[1]-B[1])<1.5)continue;Object.assign(q,{T,A,B,dA,dB});break;}
      if(!q.T){Object.assign(q,{T:[6,5],A:[3,5],B:[6,9],dA:3,dB:4});}
      q.text='보물은 🌳에서 <b>'+q.dA+' cm</b>, 🪨에서 <b>'+q.dB+' cm</b> 떨어져 있어요!';q.reveal='두 원이 만나는 곳을 파요';return fin();}
    if(L==='a'&&R.chance(.35)){q.ty='center';const r=R.int(2,4);q.c=[R.int(r+1,12-r-1),R.int(r+1,10-r-1)];q.r=r;q.text='연못의 <b>원의 중심</b>을 눌러 깃발을 꽂아요!';q.reveal='원의 중심은 원의 가장 가운데 점이에요';return fin();}
    if(L==='a'){const k=R.pick(['find','r2d','d2r','fact']);q.ty='find';const opt=(arr,ans)=>{const sh=R.shuffle(arr);q.labels=sh;q.okIdx=sh.indexOf(ans);};
      if(k==='find'){const w=R.pick(['지름','반지름','원의 중심']);q.w=w;q.text='<b>'+w+'</b>'+J(w,'을').slice(w.length)+' 나타내는 것은?';const lab=R.shuffle(['ㄱ','ㄴ','ㄷ']);q.lab=lab;const ans=lab[w==='지름'?0:w==='반지름'?1:2];q.reveal=w+'은(는) '+ans;opt(['ㄱ','ㄴ','ㄷ'],ans);q.kind='seg';}
      else if(k==='r2d'){const r=R.int(2,12);q.text='반지름이 <b>'+r+' cm</b>인 원의 지름은?';q.reveal='지름 = '+r+' × 2 = '+2*r+' cm';const o=gkOpts3(R,2*r,[r,r/2,2*r+2,r+2].filter(x=>Number.isInteger(x)),v=>v+' cm');q.labels=o.labels;q.okIdx=o.okIdx;q.kind='rad';q.r=r;}
      else if(k==='d2r'){const r=R.int(2,12);q.text='지름이 <b>'+2*r+' cm</b>인 원의 반지름은?';q.reveal='반지름 = '+2*r+' ÷ 2 = '+r+' cm';const o=gkOpts3(R,r,[4*r,2*r,r+1,r-1].filter(x=>x>0),v=>v+' cm');q.labels=o.labels;q.okIdx=o.okIdx;q.kind='dia';q.r=r;}
      else{const f=R.pick([['한 원에서 지름은 몇 개 그을 수 있을까요?','셀 수 없이 많아요',['1개','2개']],['원 안에 그을 수 있는 가장 긴 선분은?','지름',['반지름','원의 중심']],['한 원에서 지름은 반지름의 몇 배일까요?','2배',['3배','반(1/2)']],['한 원에서 반지름은 모두 길이가 같을까요?','같아요',['달라요','알 수 없어요']]]);q.text=f[0];q.reveal=f[1]+'!';opt([f[1],...f[2]],f[1]);q.kind='seg';q.lab=['ㄱ','ㄴ','ㄷ'];}
      return fin();}
    if(L==='b'){q.ty='draw';const r=R.int(4,10)/2;const useD=R.chance(.45)&&Number.isInteger(r);q.r=r;q.text=useD?'<b>지름이 '+q.r*2+' cm</b>인 연못을 그려요!':'<b>반지름이 '+q.r+' cm</b>인 연못을 그려요!';q.reveal='반지름 '+q.r+' cm로 그려요';q.useD=useD;return fin();}
    q.ty='calc';const k=R.pick(['row','rect','nest']);const r=R.int(2,8);
    if(k==='row'){const n=R.int(2,4);q.ans=2*r*n;q.text='크기가 같은 원 '+n+'개를 이어 붙였어요. 반지름이 <b>'+r+' cm</b>일 때 <b>선분 ㄱㄴ</b>의 길이는?';q.draw={k,n,r};q.reveal=(2*r)+' × '+n+' = '+q.ans+' cm';}
    else if(k==='rect'){const n=R.int(2,3);q.ans=2*r*n;q.text='직사각형 안에 크기가 같은 원 '+n+'개가 꼭 맞게 들어 있어요. 원의 반지름이 <b>'+r+' cm</b>일 때 직사각형의 <b>가로</b>는?';q.draw={k,n,r};q.reveal=(2*r)+' × '+n+' = '+q.ans+' cm';}
    else{const R2=r+R.int(2,5);q.ans=R2-r;q.draw={k,r,R2};q.text='큰 원의 반지름 <b>'+R2+' cm</b>, 작은 원의 반지름 <b>'+r+' cm</b>예요. 두 원의 중심이 같을 때 <b>선분 ㄱㄴ</b>의 길이는?';q.reveal=R2+' − '+r+' = '+q.ans+' cm';}
    const o=gkOpts3(R,q.ans,[q.ans+2,q.ans-2,q.ans*2,q.ans+r,Math.abs(q.ans-r)+1].filter(x=>x>0),v=>v+' cm');q.labels=o.labels;q.okIdx=o.okIdx;return fin();},
  qtime(q){return {find:20,center:25,draw:40,calc:40,hunt:90}[q.ty];},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.ty==='hunt'?'🗺️ '+q.text:q.text;},askSub(q){return {find:'알맞은 것을 눌러요',center:'연못 가운데를 눌러 깃발을 꽂고 확인!',draw:'중심에서 끌어 반지름을 맞춰요 (한 칸 = 1 cm)',calc:'알맞은 길이를 눌러요',hunt:'컴퍼스로 두 원을 그려 만나는 곳을 파요'}[q.ty];},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((55+45*frac)*(p.state.part||1))+(q.ty==='hunt'?30:0);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.part=1;st.sel=0;st.flag=null;st.r=0;st.rA=0;st.rB=0;st.mode='A';st.dig=null;st.drag=false;st.arm=null;st.msg='';st.msgT=0;st.fin=null;},
  /* 단추 */
  btns(p){const G=this.geo(p),st=p.state,q=st.q;if(!q)return[];const P=G.panel,gap=G.u*.2;let rows;
    if(q.labels)rows=[q.labels.map((t,i)=>({id:'o'+i,t,i}))];else if(q.ty==='center')rows=[[{id:'ok',t:'🚩 여기가 중심!',go:1}]];else if(q.ty==='draw')rows=[[{id:'reset',t:'↺ 다시'}],[{id:'ok',t:'🪷 연못 완성!',go:1}]];
    else rows=[[{id:'mA',t:'🌳 컴퍼스',m:'A'},{id:'mB',t:'🪨 컴퍼스',m:'B'},{id:'mD',t:'⛏️ 파기',m:'D'}],[{id:'ok',t:'💰 보물 파기!',go:1}]];
    const optMode=!!q.labels;const colsOpt=G.land?1:q.labels&&q.labels.length;let list=[];
    if(optMode){const n=q.labels.length;if(G.land){const rh=Math.min(G.u*2.2,(P.h-gap*(n-1))/n);q.labels.forEach((t,i)=>list.push({id:'o'+i,t,i,x:P.x,y:P.y+i*(rh+gap),w:P.w,h:rh}));}
      else{const bw=(P.w-gap*(n-1))/n,rh=Math.min(P.h,G.u*2.4);q.labels.forEach((t,i)=>list.push({id:'o'+i,t,i,x:P.x+i*(bw+gap),y:P.y,w:bw,h:rh}));}return list;}
    const rh=Math.min(G.u*(G.land?1.6:1.4),(P.h-gap*(rows.length-1))/rows.length);rows.forEach((row,r)=>{const w=(P.w-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:P.x+c*(w+gap),y:P.y+r*(rh+gap),w,h:rh})));});return list;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=this.btns(p).find(b=>K.inRect(x,y,b));
    if(b){if(b.i!=null){st.okFlag=b.i===q.okIdx;this.verdict(p,b.i,false);return;}p.Snd.tap&&p.Snd.tap();
      if(b.m){st.mode=b.m;return;}
      if(b.id==='reset'){st.r=0;st.arm=null;return;}
      if(b.id==='ok'){this.submit(p);}return;}
    if(!K.inRect(x,y,{x:G.mx-G.cs*.5,y:G.my-G.cs*.5,w:G.mw+G.cs,h:G.mh+G.cs}))return;st.drag=true;this.act(p,x,y);},
  move(p,x,y,down){if(p.state.drag&&down)this.act(p,x,y);},up(p){p.state.drag=false;},
  act(p,x,y){const st=p.state,q=st.q,G=this.geo(p);const[cx,cy]=this.toCm(G,x,y);
    if(q.ty==='center'){st.flag=[cx,cy];st.d=Math.hypot(cx-q.c[0],cy-q.c[1]);return;}
    if(q.ty==='draw'){const C=5.5;let r=Math.hypot(cx-C,cy-C);r=Math.min(Math.round(r*2)/2,5.5);st.r=r;st.arm=Math.atan2(cy-C,cx-C);return;}
    if(q.ty==='hunt'){if(st.mode==='D'){st.dig=[clamp(Math.round(cx),0,12),clamp(Math.round(cy),0,10)];return;}const L=st.mode==='A'?q.A:q.B;const r=Math.min(8,Math.round(Math.hypot(cx-L[0],cy-L[1])*2)/2);if(st.mode==='A')st.rA=r;else st.rB=r;st.arm={L,a:Math.atan2(cy-L[1],cx-L[0]),r};}},
  submit(p){const st=p.state,q=st.q;
    if(q.ty==='center'){if(!st.flag){st.msg='먼저 지도를 눌러 깃발을 꽂아요';st.msgT=2;return;}const d=st.d;st.okFlag=d<=.6;st.part=d<=.3?1:.7;this.verdict(p,0,false);}
    else if(q.ty==='draw'){if(!st.r){st.msg='중심에서 끌어서 원을 그려요';st.msgT=2;return;}st.okFlag=st.r===q.r;this.verdict(p,0,false);}
    else if(q.ty==='hunt'){if(!st.dig){st.msg='⛏️ 파기를 고르고 땅을 눌러요';st.msgT=2;return;}st.okFlag=Math.hypot(st.dig[0]-q.A[0],st.dig[1]-q.A[1])===q.dA&&Math.hypot(st.dig[0]-q.B[0],st.dig[1]-q.B[1])===q.dB;this.verdict(p,0,false);}},
  upd(p,dt){const st=p.state;if(st.msgT>0)st.msgT-=dt;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const bs=this.btns(p);const cl=(b)=>({k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2});
    if(q.labels)return cl(bs[q.okIdx]);
    if(q.ty==='center'){if(!st.flag){return{k:'click',x:rc.left+this.gx(G,q.c[0]),y:rc.top+this.gy(G,q.c[1])};}return cl(bs.find(b=>b.id==='ok'));}
    if(q.ty==='draw'){if(st.r!==q.r){return{k:'swipe',x:rc.left+this.gx(G,5.5),y:rc.top+this.gy(G,5.5),dx:q.r*G.cs,dy:0};}return cl(bs.find(b=>b.id==='ok'));}
    if(q.ty==='hunt'){st.dig=q.T.slice();return cl(bs.find(b=>b.id==='ok'));}return null;},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#d9f7ee','#a7f3d0']);[[.06,.3,1],[.94,.55,1.2],[.5,.96,1.4]].forEach(([a,b,s],i)=>{g.fillStyle='rgba(74,222,128,.55)';g.beginPath();g.ellipse(W*a,H*b+Math.sin(t+i)*3,u*1.3*s,u*.55*s,0,.3,TAU-.3);g.fill();});
    const gridMap=q.ty==='center'||q.ty==='draw'||q.ty==='hunt';
    K.card(g,G.mx-u*.15,G.my-u*.15,G.mw+u*.3,G.mh+u*.3,u*.3,gridMap?'#fef3c7':'#f0fdfa',{stroke:gridMap?'#a16207':'#115e59',lw:Math.max(3,u*.09),blur:u*.25,dy:u*.08});
    if(gridMap){g.strokeStyle='#d6b88a';g.lineWidth=1;for(let i=0;i<=G.gw;i++){g.beginPath();g.moveTo(this.gx(G,i),G.my);g.lineTo(this.gx(G,i),G.my+G.mh);g.stroke();}for(let i=0;i<=G.gh;i++){g.beginPath();g.moveTo(G.mx,this.gy(G,i));g.lineTo(G.mx+G.mw,this.gy(G,i));g.stroke();}
      K.txt(g,'한 칸 = 1 cm',G.mx+G.mw-u*.1,G.my+G.mh-u*.25,{size:u*.4,color:'#92400e',maxW:G.mw*.4,align:'right'});}
    const X=x=>this.gx(G,x),Y=y=>this.gy(G,y),cs=G.cs;const ring=(cx,cy,r,fill,stroke,lw)=>{g.beginPath();g.arc(X(cx),Y(cy),r*cs,0,TAU);if(fill){g.fillStyle=fill;g.fill();}g.strokeStyle=stroke;g.lineWidth=lw||Math.max(3,u*.09);g.stroke();};
    const dot=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();};
    if(q.ty==='find')this.drawFind(g,G,q,X,Y,cs,ring,dot);
    else if(q.ty==='center'){ring(q.c[0],q.c[1],q.r,'#7dd3fc','#0369a1');if(st.flag){const fx=X(st.flag[0]),fy=Y(st.flag[1]);dot(fx,fy,Math.max(3,u*.1),'#dc2626');K.emo(g,'🚩',fx+u*.4,fy-u*.35,u*.9);}if(st.lock){dot(X(q.c[0]),Y(q.c[1]),Math.max(5,u*.2),'#16a34a');}}
    else if(q.ty==='draw'){const C=5.5;dot(X(C),Y(C),Math.max(4,u*.14),'#111');if(st.r){ring(C,C,st.r,'rgba(94,234,212,.5)',TEAL);g.strokeStyle=PINK;g.lineWidth=Math.max(3,u*.09);g.beginPath();g.moveTo(X(C),Y(C));g.lineTo(X(C+st.r*Math.cos(st.arm||0)),Y(C+st.r*Math.sin(st.arm||0)));g.stroke();K.txt(g,'반지름 '+st.r+' cm',X(C),Y(C)-st.r*cs-u*.45,{size:u*.55,color:INK,stroke:'#fef3c7',lw:u*.15,maxW:G.mw*.7});}
      else K.txt(g,'가운데에서 끌어서 연못을 그려요',X(C),Y(C)+u*1.5,{size:u*.6,color:'#92400e',maxW:G.mw*.85});
      if(st.lock&&!st.okFlag){ring(C,C,q.r,null,'#16a34a',Math.max(3,u*.09));}}
    else if(q.ty==='hunt'){const[ax,ay]=q.A,[bx,by]=q.B;if(st.rA)ring(ax,ay,st.rA,'rgba(34,197,94,.14)','#16a34a');if(st.rB)ring(bx,by,st.rB,'rgba(100,116,139,.14)','#475569');
      if(st.arm){const L=st.arm.L;g.strokeStyle=PINK;g.lineWidth=Math.max(3,u*.08);g.beginPath();g.moveTo(X(L[0]),Y(L[1]));g.lineTo(X(L[0]+st.arm.r*Math.cos(st.arm.a)),Y(L[1]+st.arm.r*Math.sin(st.arm.a)));g.stroke();}
      if(st.rA)K.txt(g,st.rA+' cm',X(ax),Y(ay)-st.rA*cs-u*.3,{size:u*.5,color:'#15803d',stroke:'#fef3c7',lw:u*.14,maxW:u*3});if(st.rB)K.txt(g,st.rB+' cm',X(bx),Y(by)+st.rB*cs+u*.35,{size:u*.5,color:'#334155',stroke:'#fef3c7',lw:u*.14,maxW:u*3});
      K.emo(g,'🌳',X(ax),Y(ay),u*1.0);K.emo(g,'🪨',X(bx),Y(by),u*.9);if(st.dig)K.emo(g,'⛏️',X(st.dig[0]),Y(st.dig[1]),u*.9);
      if(st.lock)K.emo(g,st.okFlag?'💰':'❌',X(q.T[0]),Y(q.T[1]),u*1.1+Math.sin(st.rT*8)*u*.1);}
    else this.drawCalc(g,G,q,X,Y,cs,ring,dot);
    /* 결과 표시 */
    if(st.lock&&st.okFlag){K.emo(g,'🪷',G.mx+G.mw-u*.9,G.my+u*.9,u*1.2+Math.sin(st.rT*6)*u*.1);}
    /* 단추 */
    this.btns(p).forEach(b=>{let fill='#fbfffd',ink=INK;if(b.go){fill=st.lock?'#cbd5e1':PINK;ink='#fff';}
      let sel=(b.m&&st.mode===b.m);if(b.i!=null&&st.lock){fill=b.i===q.okIdx?'#bbf7d0':b.i===st.pick?'#fecaca':'#f1f5f9';}
      K.rr(g,b.x,b.y,b.w,b.h,u*.3);g.fillStyle=sel?'#99f6e4':fill;g.fill();g.lineWidth=sel?Math.max(4,u*.12):3;g.strokeStyle=sel?PINK:'#115e59';g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*.85),color:ink,maxW:b.w*.9});});
    if(st.msgT>0)K.txt(g,st.msg,G.mx+G.mw/2,G.my+G.mh/2,{size:u*.7,color:'#fff',stroke:'#be123c',lw:u*.18,maxW:G.mw*.9});
    if(!st.lock&&st.qmax>0){const bw=Math.min(G.panel.w,u*8);QZ.bar(g,G.panel.x+(G.panel.w-bw)/2,G.top-u*.25,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:TEAL});}
    K.card(g,u*.3,G.top-u*.2,u*2.6,u*.7,u*.35,'rgba(255,255,255,.95)',{stroke:'#115e59',lw:3,blur:0,dy:0});K.txt(g,'🪷 '+(st.okN||0)+'개',u*.3+u*1.3,G.top+u*.15,{size:u*.45,color:INK,maxW:u*2.3});
  },
  drawFind(g,G,q,X,Y,cs,ring,dot){const u=G.u,st=G.st;const cx=6,cy=5,r=Math.min(4.2,G.gh/2-.7);const lab=q.lab||['ㄱ','ㄴ','ㄷ'];ring(cx,cy,r,'#5eead4','#0f766e',Math.max(4,u*.12));
    const seg=(x1,y1,x2,y2,c)=>{g.strokeStyle=c;g.lineWidth=Math.max(4,u*.11);g.lineCap='round';g.beginPath();g.moveTo(X(x1),Y(y1));g.lineTo(X(x2),Y(y2));g.stroke();};const tx=(s,x,y,c)=>K.txt(g,s,X(x),Y(y),{size:u*.9,color:c,stroke:'#f0fdfa',lw:u*.18,maxW:u*1.4});
    if(q.kind==='seg'){const a=.35;seg(cx-r*Math.cos(a),cy-r*Math.sin(a),cx+r*Math.cos(a),cy+r*Math.sin(a),'#be185d');tx(lab[0],cx+r*Math.cos(a)+.55,cy+r*Math.sin(a)+.45,'#be185d');
      seg(cx,cy,cx+r*Math.cos(-2.1),cy+r*Math.sin(-2.1),'#1d4ed8');tx(lab[1],cx+r*Math.cos(-2.1)*.55-.6,cy+r*Math.sin(-2.1)*.55,'#1d4ed8');seg(cx+r*Math.cos(2.2),cy+r*Math.sin(2.2),cx+r*Math.cos(1.2),cy+r*Math.sin(1.2),'#7c3aed');dot(X(cx),Y(cy),Math.max(5,u*.18),'#111');tx(lab[2],cx+.7,cy-.55,'#111');}
    else{dot(X(cx),Y(cy),Math.max(5,u*.18),'#111');seg(cx,cy,cx+r,cy,'#1d4ed8');K.txt(g,q.kind==='rad'?q.r+' cm':'?',X(cx+r/2),Y(cy)-u*.5,{size:u*.8,color:'#1d4ed8',stroke:'#f0fdfa',lw:u*.16,maxW:u*3});
      g.setLineDash(q.kind==='dia'?[]:[u*.25,u*.2]);seg(cx-r,cy+r*.45,cx+r,cy+r*.45,'#be185d');g.setLineDash([]);K.txt(g,q.kind==='dia'?q.r*2+' cm':'?',X(cx),Y(cy+r*.45)+u*.65,{size:u*.8,color:'#be185d',stroke:'#f0fdfa',lw:u*.16,maxW:u*3});}},
  drawCalc(g,G,q,X,Y,cs,ring,dot){const u=G.u,d=q.draw;const lab=(s,x,y,c)=>K.txt(g,s,X(x),Y(y),{size:u*.8,color:c||INK,stroke:'#f0fdfa',lw:u*.16,maxW:u*3});
    if(d.k==='row'||d.k==='rect'){const n=d.n,rr=Math.min(G.gw/(2*n)*.9,3.2),w=rr*2*n,x0=(G.gw-w)/2,cy=G.gh/2;if(d.k==='rect'){g.fillStyle='#fef9c3';g.strokeStyle='#a16207';g.lineWidth=Math.max(3,u*.09);g.fillRect(X(x0),Y(cy-rr),w*cs,2*rr*cs);g.strokeRect(X(x0),Y(cy-rr),w*cs,2*rr*cs);}
      for(let k=0;k<n;k++){ring(x0+rr+k*2*rr,cy,rr,'#5eead4','#0f766e');dot(X(x0+rr+k*2*rr),Y(cy),Math.max(3,u*.1),'#111');}
      if(d.k==='row'){g.strokeStyle='#be185d';g.lineWidth=Math.max(4,u*.1);g.beginPath();g.moveTo(X(x0),Y(cy));g.lineTo(X(x0+w),Y(cy));g.stroke();lab('ㄱ',x0-.5,cy-.5,'#be185d');lab('ㄴ',x0+w+.5,cy-.5,'#be185d');}
      g.strokeStyle='#1d4ed8';g.lineWidth=Math.max(5,u*.13);g.beginPath();g.moveTo(X(x0+rr),Y(cy));g.lineTo(X(x0+2*rr),Y(cy));g.stroke();lab(d.r+' cm',x0+1.5*rr,cy-.7,'#1d4ed8');if(d.k==='rect')lab('가로 = ?',G.gw/2,cy+rr+.9);}
    else{const cx=G.gw/2,cy=G.gh/2,R0=Math.min(4.4,G.gh/2-.6),rr=R0*d.r/d.R2;ring(cx,cy,R0,'#99f6e4','#0f766e');ring(cx,cy,rr,'#5eead4','#0f766e');dot(X(cx),Y(cy),Math.max(4,u*.12),'#111');g.strokeStyle='#be185d';g.lineWidth=Math.max(5,u*.12);g.beginPath();g.moveTo(X(cx+rr),Y(cy));g.lineTo(X(cx+R0),Y(cy));g.stroke();lab('ㄱ',cx+rr,cy+.8,'#be185d');lab('ㄴ',cx+R0,cy+.8,'#be185d');lab(d.r+' cm',cx-rr*.55,cy-rr*.6-.2,'#1d4ed8');lab(d.R2+' cm',cx-R0*.6,cy-R0*.8,'#0f766e');}},
};
QZ.mix(GAME,{say:false,pts0:55,pts1:45,okMs:1700,badMs:3000});
Engine.boot(GAME);
