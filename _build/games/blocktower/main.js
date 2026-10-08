/* 6학년 2학기 수학 · 공간과 입체 — 쌓기나무 건축가
   디자인: 모눈 설계도 위의 건축 현장. 3D 쌓기나무 건물을 손가락으로 끌어 돌려 보며 개수를 세고, 앞·옆·위에서 본 모양을 비교해 설계도대로 쌓아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2a05',BLUE='#0284c7',ORG='#b45309';
const LOGO=gkLogo('#ffe08a','#78350f','🧱');
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const LV={
  a:{t:'쌓기나무 개수',d:'돌려 보며 세기 · 위에서 본 수로 세기'},
  b:{t:'앞·옆에서 본 모양',d:'알맞은 모양 고르기'},
  c:{t:'층별로 나타내기',d:'1층 · 2층 · 3층에 몇 개?'},
  d:{t:'설계도대로 쌓기',d:'위·앞·옆 모양에 맞게 직접 쌓기'},
};
const key=v=>v.join(',');
const frontV=h=>[0,1,2].map(c=>Math.max(...h.map(r=>r[c])));
const sideV=h=>[0,1,2].map(r=>Math.max(...h[r]));
const D2R=Math.PI/180;
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fff7d6','#ffe08a']);g.strokeStyle='rgba(180,83,9,.2)';g.lineWidth=1;for(let x=0;x<W;x+=u*.8){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=u*.8){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
  const h=[[2,1,0],[3,2,1],[1,0,0]];GAME.cubes(g,W/2,H*.62,Math.min(W*.12,H*.16),h,T*50,24,0);K.emo(g,'🏗️',W*.2,H*.28,u*1.6);K.emo(g,'👷',W*.8,H*.3,u*1.4);}
const GAME={
  id:'blocktower',title:'쌓기나무 건축가',title1:'모눈 설계도 건축 현장',title2:'쌓기나무 건축가',emoji:LOGO,
  subtitle:'6학년 2학기 수학 · 공간과 입체 · 쌓기나무',
  howto:'🧱 3D 쌓기나무 건물을 <b>손가락으로 끌어 빙글빙글 돌려</b> 보며 살펴봐요! 개수를 세고, 앞·옆에서 본 모양을 고르고, 설계도대로 <b>직접 쌓아</b> 완공해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:ORG,c2:BLUE},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 공사를 할까요?',
  txt:{who:'누가 건축가일까요?',dur:'공사 시간',pace:'생각하는 시간',seat:'번 건축가 ',go:'공사 시작!',s1:'1. 공사',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'6학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li>쌓기나무의 개수는 <b>위에서 본 모양에 층수를 쓴 그림</b>의 수를 모두 더해서 구해요. (보이지 않는 아래 칸도 꽉 차 있어요)</li>
    <li><b>앞</b>에서 본 모양은 각 줄에서 가장 높은 층을, <b>옆</b>에서 본 모양은 각 줄(앞→뒤)에서 가장 높은 층을 나타내요.</li>
    <li><b>층별 모양</b>은 1층, 2층, 3층에 쌓인 쌓기나무를 따로 나타내는 거예요. 1층에는 모든 줄이, 위층일수록 적게 있어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3,q=p.state.q;const ty=q?q.ty:'count';const land=W>=H*1.1;const avH=H-top-pad;
    const build=ty==='build';const opts=q&&q.opts?q.opts.length:0;
    const chB=build?u*1.35*3+gap*3+u*1.4:(ty==='view'?u*3.2:u*2.1);
    const hasViews=build;const hasTop=(ty==='count'&&q&&q.nums)||ty==='floor';
    let V,Rg;const btns=[],views=[];
    if(land){const vw=W*.55-pad;V={x:pad,y:top,w:vw,h:avH};Rg={x:pad*2+vw,y:top,w:W-vw-pad*3,h:avH};}
    else{const vh=build?avH*.36:avH-chB-gap-(hasTop?0:0);V={x:pad,y:top,w:W-pad*2,h:build?avH*.36:avH-chB-gap};Rg={x:pad,y:top+V.h+gap,w:W-pad*2,h:avH-V.h-gap};}
    const cy0=Rg.y+Rg.h-chB;
    if(opts){const w=(Rg.w-gap*(opts-1))/opts;for(let i=0;i<opts;i++)btns.push({id:'o'+i,i,x:Rg.x+i*(w+gap),y:cy0,w,h:chB});}
    if(build){const cs=Math.min((Rg.w-gap*2)/3,u*1.35*1.6);const gx=Rg.x+(Rg.w-(cs*3+gap*2))/2;const ch=(chB-u*1.4-gap*3)/3;for(let r=2;r>=0;r--)for(let c=0;c<3;c++)btns.push({id:'g'+r+c,r,c,x:gx+c*(cs+gap),y:cy0+(2-r)*(ch+gap),w:cs,h:ch});btns.push({id:'go',t:'🏗️ 완공!',x:Rg.x,y:cy0+chB-u*1.4,w:Rg.w,h:u*1.4,go:1});
      const vh2=Rg.h-chB-gap-u*.6;const vw=(Rg.w-gap*2)/3;for(let i=0;i<3;i++)views.push({x:Rg.x+i*(vw+gap),y:Rg.y,w:vw,h:Math.max(u*2,vh2)});}
    const rb=[];if(ty!=='view'){const bw=Math.min(u*2.2,(V.w-gap*3)/4);['앞','옆','위','↺'].forEach((t,i)=>rb.push({id:'r'+i,t,x:V.x+V.w-(4-i)*(bw+gap/2)-gap/2,y:V.y+V.h-u*1.1-gap/2,w:bw,h:u*1.1}));}
    return{W,H,u,top,pad,V,Rg,btns,views,rb,land,hasTop};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false,yaw:-32,pit:24,tw:null,drag:null});this.newQ(p);},
  make(p,L){const R=p.R,q={};const n=3;let h;
    for(let t=0;t<100;t++){h=[];for(let r=0;r<n;r++){h.push([]);for(let c=0;c<n;c++)h[r].push(R.chance(.72)?R.int(1,3):0);}const tot=h.flat().reduce((a,b)=>a+b,0);if(tot>=5&&tot<=14&&h.flat().filter(x=>x).length>=4&&h[0].some(x=>x))break;}
    q.h=h;q.tot=h.flat().reduce((a,b)=>a+b,0);const topS=h.slice().reverse().map(r=>r.join('')).join('/');
    const numOpts=(ans,fmt)=>{const o=gkOpts3(R,ans,[ans+1,ans-1,ans+2,ans-2,ans+3].filter(x=>x>0),fmt);q.opts=o.labels;q.okIdx=o.okIdx;};
    if(L==='a'){q.ty='count';q.nums=R.chance(.4);q.text=q.nums?'🧱 쌓기나무는 <b>모두 몇 개</b>일까요?':'🧱 건물을 <b>돌려 보며</b> 쌓기나무가 <b>모두 몇 개</b>인지 세어요!';q.sub=q.nums?'위에서 본 모양의 수를 모두 더해요':'보이지 않는 아래칸도 꽉 차 있어요';q.reveal=q.tot+'개';numOpts(q.tot,x=>x+'개');}
    else if(L==='b'){q.ty='view';const side=R.chance(.5);q.side=side;const right=side?sideV(h):frontV(h);const k=key(right);
      const cands=[side?frontV(h):sideV(h),right.slice().reverse(),right.map((x,j)=>j===R.int(0,2)?Math.max(1,(x%3)+1):x),right.map(x=>Math.max(1,x-1)),right.map(x=>Math.min(3,x+1))].filter(v=>key(v)!==k);
      const uniq=[];cands.forEach(v=>{if(!uniq.some(u=>key(u)===key(v)))uniq.push(v);});const all=R.shuffle([right,...uniq.slice(0,2)]);q.shapes=all;q.opts=all.map(v=>'');q.okIdx=all.findIndex(v=>key(v)===k);
      q.text='🧱 <b>'+(side?'오른쪽 옆':'앞')+'</b>에서 본 모양은?';q.sub='';q.reveal=right.join(', ')+'층 높이';}
    else if(L==='c'){q.ty='floor';const fl=R.int(1,Math.max(...h.flat()));q.fl=fl;q.ans=h.flat().filter(x=>x>=fl).length;q.text='🧱 <b>'+fl+'층</b>에 있는 쌓기나무는 몇 개일까요?';q.sub='노랗게 칠한 층을 세어요';q.reveal=q.ans+'개';numOpts(q.ans,x=>x+'개');}
    else{q.ty='build';q.text='🏗️ 설계도의 <b>위 · 앞 · 옆</b> 모양과 같게 쌓아요!';q.sub='칸을 누를 때마다 한 층씩 (3층 다음은 0)';q.reveal='설계도와 같은 모양';}
    q.review=strip(q.text)+' [위에서 본 수 '+topS+'] → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.ty==='build'?90:q.ty==='count'?40:30;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.sub;},
  isOk(q,i,p){return q.opts?i===q.okIdx:!!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '완공! 정답 '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+50*frac);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.u=[[0,0,0],[0,0,0],[0,0,0]];st.yaw=-32;st.pit=24;st.tw=null;},
  upd(p,dt){const st=p.state;if(st.tw){st.tw.t+=dt/.5;const k=Math.min(1,st.tw.t),e=1-Math.pow(1-k,3);st.yaw=st.tw.y0+(st.tw.y1-st.tw.y0)*e;st.pit=st.tw.p0+(st.tw.p1-st.tw.p0)*e;if(k>=1)st.tw=null;}},
  down(p,x,y,e){const st=p.state,q=st.q;if(!q)return;const G=this.geo(p);
    if(!st.lock){const b=G.btns.find(b=>K.inRect(x,y,b));if(b){if(b.id[0]==='o'){this.verdict(p,b.i,false);return;}
      if(b.id==='go'){const u=st.u,h=q.h;const ok=key(frontV(u))===key(frontV(h))&&key(sideV(u))===key(sideV(h))&&u.every((row,r)=>row.every((v,c)=>!!v===!!h[r][c]));st.okFlag=ok;this.verdict(p,0,false);return;}
      if(b.id[0]==='g'){st.u[b.r][b.c]=(st.u[b.r][b.c]+1)%4;p.Snd.tone&&p.Snd.tone(300+st.u[b.r][b.c]*120,.08,'sine',.05);return;}}}
    const rb=G.rb.find(b=>K.inRect(x,y,b));if(rb){const k=+rb.id[1];const t=[[0,0],[-90,0],[0,90],[-32,24]][k];st.tw={t:0,y0:st.yaw,p0:st.pit,y1:t[0],p1:t[1]};p.Snd.tap&&p.Snd.tap();return;}
    if(K.inRect(x,y,G.V)){st.drag={x,y,yaw:st.yaw,pit:st.pit};st.tw=null;}},
  move(p,x,y){const st=p.state;if(!st.drag)return;st.yaw=st.drag.yaw+(x-st.drag.x)*.6;st.pit=clamp(st.drag.pit+(y-st.drag.y)*.6,-10,90);},
  up(p){p.state.drag=null;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const bc=b=>({k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2});
    if(q.ty==='build'){st.u=q.h.map(r=>r.slice());return bc(G.btns.find(b=>b.id==='go'));}return bc(G.btns[q.okIdx]);},
  /* 3D: h = 3×3 높이, (cx,cy) 화면 중심, S = 한 칸 크기, yaw/pit(도) */
  cubes(g,cx,cy,S,h,yaw,pit,hiFloor,ghost){const cy_=Math.cos(yaw*D2R),sy=Math.sin(yaw*D2R),cp=Math.cos(pit*D2R),sp=Math.sin(pit*D2R);
    const rot=(x,y,z)=>{const x1=x*cy_+z*sy,z1=-x*sy+z*cy_;const y2=y*cp-z1*sp,z2=y*sp+z1*cp;return{x:cx+x1*S,y:cy-(y2-1.2)*S,z:z2};};
    /* 바닥 */
    const fl=[[-1.5,0,-1.5],[1.5,0,-1.5],[1.5,0,1.5],[-1.5,0,1.5]].map(a=>rot(...a));g.beginPath();fl.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.closePath();g.fillStyle='rgba(120,80,20,.18)';g.fill();g.strokeStyle='rgba(120,80,20,.6)';g.lineWidth=2;g.stroke();
    for(let i=1;i<3;i++){[[-1.5+i,0,-1.5,-1.5+i,0,1.5],[-1.5,0,-1.5+i,1.5,0,-1.5+i]].forEach(a=>{const A=rot(a[0],a[1],a[2]),B=rot(a[3],a[4],a[5]);g.beginPath();g.moveTo(A.x,A.y);g.lineTo(B.x,B.y);g.strokeStyle='rgba(120,80,20,.3)';g.lineWidth=1;g.stroke();});}
    const list=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)for(let z=0;z<h[r][c];z++){const ctr=rot(c-1,z+.5,1-r);list.push({r,c,z,d:ctr.z});}
    list.sort((a,b)=>a.d-b.d);
    const faces=[{n:[0,0,1],v:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],col:'#60a5fa'},{n:[1,0,0],v:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],col:'#2563eb'},{n:[-1,0,0],v:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],col:'#3b82f6'},{n:[0,0,-1],v:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],col:'#1d4ed8'},{n:[0,1,0],v:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],col:'#bfdbfe'}];
    list.forEach(o=>{const hi=hiFloor&&o.z===hiFloor-1;faces.forEach(f=>{const nx=f.n[0]*cy_+f.n[2]*sy,nz0=-f.n[0]*sy+f.n[2]*cy_;const nz=f.n[1]*sp+nz0*cp;if(nz<=0.001)return;
      g.beginPath();f.v.forEach((v,i)=>{const P=rot(o.c-1.5+v[0],o.z+v[1],(1-o.r)-.5+v[2]);i?g.lineTo(P.x,P.y):g.moveTo(P.x,P.y);});g.closePath();
      g.fillStyle=hi?(f.n[1]?'#fef08a':'#facc15'):ghost?'rgba(180,180,180,.5)':f.col;g.fill();g.strokeStyle='#0c2a5a';g.lineWidth=Math.max(1.5,S*.04);g.stroke();});});},
  viewShape(g,v,x,y,w,h,u,col){const n=v.length,mh=3;const cs=Math.min(w/n,h/mh)*.9;const x0=x+(w-cs*n)/2,y0=y+(h-cs*mh)/2;v.forEach((a,c)=>{for(let z=0;z<a;z++){g.fillStyle=col||'#7dd3fc';g.fillRect(x0+c*cs,y0+(mh-1-z)*cs,cs,cs);g.strokeStyle='#0c4a6e';g.lineWidth=Math.max(1.5,cs*.05);g.strokeRect(x0+c*cs,y0+(mh-1-z)*cs,cs,cs);}});g.fillStyle='#334155';g.fillRect(x0,y0+mh*cs,cs*n,2);},
  topShape(g,h,x,y,size,num,u){const cs=size/3;for(let r=2;r>=0;r--)for(let c=0;c<3;c++){const yy=y+(2-r)*cs,v=h[r][c];g.fillStyle=v?'#fde68a':'#f8fafc';g.fillRect(x+c*cs,yy,cs,cs);g.strokeStyle=v?'#78350f':'#cbd5e1';g.lineWidth=2;g.strokeRect(x+c*cs,yy,cs,cs);if(num&&v)K.txt(g,String(v),x+c*cs+cs/2,yy+cs/2,{size:cs*.6,color:INK});}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,V=G.V;if(!q)return;
    g.fillStyle='#fff7d6';g.fillRect(0,0,W,H);g.strokeStyle='rgba(180,83,9,.12)';g.lineWidth=1;for(let x=0;x<W;x+=u*.8){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=0;y<H;y+=u*.8){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
    K.card(g,V.x,V.y,V.w,V.h,u*.3,'#fffdf0',{stroke:'#78350f',lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#4a3306'});
    const ty=q.ty;const hh=ty==='build'?st.u:q.h;const S=Math.min(V.w/5.6,V.h/5.4);
    if(ty==='view'){/* 정면 / 옆 안내 */const side=q.side;const fakeYaw=side?-90:0;g.save();K.rr(g,V.x,V.y,V.w,V.h,u*.3);g.clip();this.cubes(g,V.x+V.w/2,V.y+V.h*.58,S,q.h,st.yaw,st.pit,0);g.restore();K.txt(g,'👆 끌어서 돌려 봐요',V.x+V.w/2,V.y+u*.5,{size:u*.4,color:'#92400e'});
      K.txt(g,side?'오른쪽 옆에서 본 모양':'앞에서 본 모양',V.x+V.w/2,V.y+V.h-u*.5,{size:u*.5,color:BLUE,maxW:V.w*.9});}
    else{g.save();K.rr(g,V.x,V.y,V.w,V.h,u*.3);g.clip();this.cubes(g,V.x+V.w/2,V.y+V.h*.56,S,hh,st.yaw,st.pit,ty==='floor'?q.fl:0);g.restore();K.txt(g,'👆 끌어서 돌려 봐요',V.x+u*2,V.y+u*.5,{size:u*.4,color:'#92400e'});
      G.rb.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,u*.2);g.fillStyle='#ffe08a';g.fill();g.lineWidth=2;g.strokeStyle='#78350f';g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:b.h*.5,color:INK});});}
    if(G.hasTop){const sz=Math.min(u*3.4,V.w*.3);K.card(g,V.x+u*.3,V.y+u*.9,sz+u*.3,sz+u*.9,u*.2,'#fff',{stroke:'#78350f',lw:2,blur:0,dy:0});this.topShape(g,q.h,V.x+u*.45,V.y+u*1.4,sz,true,u);K.txt(g,'위에서 본 모양',V.x+u*.45+sz/2,V.y+u*1.15,{size:u*.32,color:INK,maxW:sz});}
    if(ty==='build'){G.views.forEach((v,i)=>{K.card(g,v.x,v.y,v.w,v.h,u*.2,'#fff',{stroke:'#78350f',lw:2,blur:0,dy:0});const lab=['위','앞','옆'][i];K.txt(g,lab,v.x+v.w/2,v.y+u*.4,{size:u*.5,color:BLUE});const ix=v.x+u*.2,iy=v.y+u*.8,iw=v.w-u*.4,ih=v.h-u*1.0;
        if(i===0)this.topShape(g,q.h.map(r=>r.map(x=>x?1:0)),ix+(iw-Math.min(iw,ih))/2,iy,Math.min(iw,ih),false,u);else this.viewShape(g,i===1?frontV(q.h):sideV(q.h),ix,iy,iw,ih,u);});}
    G.btns.forEach(b=>{const isO=b.id[0]==='o',isG=b.id.length===3&&b.id[0]==='g';let bg='#fff',ink=INK;if(isO&&st.lock){if(b.i===q.okIdx)bg='#bbf7d0';else if(b.i===st.pick)bg='#fecaca';else bg='#f1f5f9';}
      if(b.go){bg=BLUE;ink='#fff';}if(isG){bg=st.u[b.r][b.c]?'#bae6fd':'#fff';}
      K.rr(g,b.x,b.y,b.w,b.h,u*.2);g.fillStyle=bg;g.fill();g.lineWidth=3;g.strokeStyle='#78350f';g.stroke();
      if(isO){if(q.shapes)this.viewShape(g,q.shapes[b.i],b.x+u*.2,b.y+u*.2,b.w-u*.4,b.h-u*.4,u);else K.txt(g,q.opts[b.i],b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*.95),color:ink,maxW:b.w*.9});}
      else if(isG)K.txt(g,String(st.u[b.r][b.c]),b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.6,u*.9),color:INK});else K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*.9),color:ink,maxW:b.w*.9});});
    if(ty==='build'){K.txt(g,'바닥 칸 (윗줄 = 뒤, 아랫줄 = 앞)',G.Rg.x+G.Rg.w/2,G.btns[0].y-u*.3,{size:u*.35,color:'#92400e',maxW:G.Rg.w});}
    if(!st.lock&&st.qmax>0)QZ.bar(g,V.x+u*.3,V.y+u*.12,V.w-u*.6,Math.max(5,u*.12),st.qt/st.qmax,{good:BLUE});
    if(st.lock)K.txt(g,st.res==='ok'?'완공! 🎉':'정답: '+q.reveal,V.x+V.w/2,V.y+V.h*.18,{size:u*.8,color:st.res==='ok'?'#15803d':'#b91c1c',stroke:'#fff',lw:u*.16,maxW:V.w*.95});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1600,badMs:3200});
Engine.boot(GAME);
