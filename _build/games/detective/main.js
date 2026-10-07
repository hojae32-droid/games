/* 3~4학년 수학 · 평면도형·삼각형·사각형·다각형 — 도형 탐정 사무소
   디자인: 사건 기록 파일과 노란 수사선이 있는 탐정 사무소. 질문 카드로 목격자에게 물어보고, 아닌 도형에 ❌를 쳐서 범인 도형을 체포해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1f2a37',YEL='#eab308',RED='#dc2626';
const LOGO=gkLogo('#fbf6e6','#1f2a37','🕵️');
const LV={
  '3-1':{g:'3학년 1학기',t:'평면도형',d:'선분 · 반직선 · 직선 · 각 · 직사각형 · 정사각형'},
  '4-2a':{g:'4학년 2학기',t:'삼각형',d:'이등변 · 정 · 예각 · 직각 · 둔각삼각형'},
  '4-2b':{g:'4학년 2학기',t:'사각형',d:'사다리꼴 · 평행사변형 · 마름모'},
  '4-2c':{g:'4학년 2학기',t:'다각형',d:'정다각형 · 대각선'},
};
const has=(s,k)=>s.tk.includes(k);
const QQ={closed:'선분으로 둘러싸여 있나요?',line:'곧은 선 한 개로만 되어 있나요?',ang:'두 반직선이 만나서 생긴 각인가요?',e2:'곧은 선의 양쪽 끝에 끝점이 있나요?',e1:'곧은 선의 한쪽 끝에만 끝점이 있나요?',hasR:'직각이 있나요?',s3:'변이 3개인가요?',s4:'변이 4개인가요?',r4:'네 각이 모두 직각인가요?',eq4:'네 변의 길이가 모두 같나요?',
  iso:'길이가 같은 변이 2개 이상 있나요?',equi:'세 변의 길이가 모두 같나요?',acute:'세 각이 모두 예각인가요?',right:'직각이 있나요?',obtuse:'둔각이 있나요?',par1:'평행한 변이 있나요?',par2:'평행한 변이 두 쌍인가요?',
  n4:'변이 4개인가요?',n5:'변이 5개인가요?',n6:'변이 6개인가요?',n7:'변이 7개인가요?',n8:'변이 8개인가요?',ge6:'변이 6개 이상인가요?',reg:'정다각형인가요?',d2:'대각선이 2개인가요?',d5:'대각선이 5개인가요?',d9:'대각선이 9개인가요?',d14:'대각선이 14개인가요?',d20:'대각선이 20개인가요?'};
const QKEYS={'3-1':['closed','line','ang','e2','e1','hasR','s3','s4','r4','eq4'],'4-2a':['iso','equi','acute','right','obtuse'],'4-2b':['par1','par2','r4','eq4'],'4-2c':['n4','n5','n6','n7','n8','ge6','reg','d2','d5','d9','d14','d20']};
const P=(pts,o)=>Object.assign({pts},o||{});
const CAT={
  '3-1':[{name:'선분',tk:['line','e2'],d:{line:[[10,50],[90,50]],ends:[1,1]}},{name:'반직선',tk:['line','e1','inf'],d:{line:[[10,50],[90,50]],ends:[1,0],arrow:[0,1]}},{name:'직선',tk:['line','e0','inf'],d:{line:[[8,50],[92,50]],ends:[0,0],arrow:[1,1]}},
    {name:'각',tk:['ang','noR'],d:{angle:[[20,75],[90,75],[70,20]]}},{name:'직각',tk:['ang','hasR','r1'],d:{angle:[[25,78],[90,78],[25,15]],rt:true}},{name:'직각삼각형',tk:['closed','s3','hasR','r1'],d:P([[20,80],[85,80],[20,20]],{rights:[0]})},
    {name:'삼각형',tk:['closed','s3','noR'],d:P([[15,80],[88,80],[55,18]])},{name:'직사각형',tk:['closed','s4','hasR','r4','neq4'],d:P([[10,30],[90,30],[90,72],[10,72]],{rights:[0,1,2,3]})},
    {name:'정사각형',tk:['closed','s4','hasR','r4','eq4'],d:P([[20,15],[82,15],[82,77],[20,77]],{rights:[0,1,2,3],ticks:[1,1,1,1]})},{name:'사각형',tk:['closed','s4','noR','neq4'],d:P([[15,75],[85,82],[75,20],[30,30]])}],
  '4-2a':[{name:'정삼각형',tk:['iso','equi','acute'],d:P([[15,80],[85,80],[50,19]],{ticks:[1,1,1]})},{name:'이등변삼각형(예각)',tk:['iso','nequi','acute'],d:P([[25,85],[75,85],[50,10]],{ticks:[0,1,1]})},{name:'직각이등변삼각형',tk:['iso','nequi','right'],d:P([[20,82],[80,82],[20,22]],{ticks:[1,0,1],rights:[0]})},
    {name:'둔각이등변삼각형',tk:['iso','nequi','obtuse'],d:P([[8,70],[92,70],[50,45]],{ticks:[0,1,1]})},{name:'예각삼각형',tk:['diff3','nequi','acute'],d:P([[12,80],[90,80],[38,18]])},{name:'직각삼각형',tk:['diff3','nequi','right'],d:P([[15,80],[90,80],[15,35]],{rights:[0]})},{name:'둔각삼각형',tk:['diff3','nequi','obtuse'],d:P([[8,78],[60,78],[92,30]])}],
  '4-2b':[{name:'사각형(평행한 변 없음)',tk:['nopar','s4'],d:P([[12,78],[88,85],[70,18],[30,35]])},{name:'사다리꼴',tk:['s4','par1','par1only'],d:P([[8,78],[92,78],[68,25],[30,25]],{par:[1,0,1,0]})},{name:'평행사변형',tk:['s4','par1','par2','opp','noR','neq4'],d:P([[5,75],[70,75],[95,25],[30,25]],{par:[1,2,1,2],ticks:[1,2,1,2]})},
    {name:'마름모',tk:['s4','par1','par2','opp','noR','eq4'],d:P([[50,8],[88,50],[50,92],[12,50]],{ticks:[1,1,1,1]})},{name:'직사각형',tk:['s4','par1','par2','opp','r4','neq4'],d:P([[8,28],[92,28],[92,72],[8,72]],{rights:[0,1,2,3],ticks:[1,2,1,2]})},{name:'정사각형',tk:['s4','par1','par2','opp','r4','eq4'],d:P([[18,15],[82,15],[82,79],[18,79]],{rights:[0,1,2,3],ticks:[1,1,1,1]})}],
  '4-2c':[{name:'정사각형',tk:['d2','poly','n4','reg'],reg:4},{name:'정오각형',tk:['d5','poly','n5','reg'],reg:5},{name:'오각형',tk:['d5','poly','n5','nreg'],irr:5},{name:'정육각형',tk:['d9','poly','n6','ge6','reg'],reg:6},{name:'육각형',tk:['d9','poly','n6','ge6','nreg'],irr:6},
    {name:'칠각형',tk:['d14','poly','n7','ge6','nreg'],irr:7},{name:'정팔각형',tk:['d20','poly','n8','ge6','reg'],reg:8},{name:'팔각형',tk:['d20','poly','n8','ge6','nreg'],irr:8}],
};
CAT['4-2c'].forEach(it=>{const n=it.reg||it.irr;const pts=[];for(let k=0;k<n;k++){const a=-Math.PI/2+(n%2===0?Math.PI/n:0)+k*2*Math.PI/n+(it.irr?((k*7)%5-2)*.12:0);const r=it.irr?36+((k*13)%5)*3:40;pts.push([50+r*Math.cos(a),52+r*Math.sin(a)]);}it.d=P(pts,it.reg?{ticks:Array(n).fill(1)}:{});});
/* 도형 그림 (0~100 좌표를 정사각형 칸에 맞춰요) */
function shapeArt(g,d,x,y,s){const X=v=>x+v*s/100,Y=v=>y+v*s/100;g.save();g.lineCap='round';g.lineJoin='round';const lw=Math.max(2,s*.035);g.strokeStyle=INK;g.lineWidth=lw;
  if(d.line){const[a,b]=d.line;g.beginPath();g.moveTo(X(a[0]),Y(a[1]));g.lineTo(X(b[0]),Y(b[1]));g.stroke();d.ends.forEach((e,k)=>{if(e){g.fillStyle=INK;g.beginPath();g.arc(X(d.line[k][0]),Y(d.line[k][1]),s*.05,0,TAU);g.fill();}});
    (d.arrow||[]).forEach((e,k)=>{if(e){const px=d.line[k][0],py=d.line[k][1],dir=k?1:-1;g.beginPath();g.moveTo(X(px-dir*8),Y(py-6));g.lineTo(X(px+dir*2),Y(py));g.lineTo(X(px-dir*8),Y(py+6));g.stroke();}});}
  else if(d.angle){const[v,a,b]=d.angle;g.beginPath();g.moveTo(X(a[0]),Y(a[1]));g.lineTo(X(v[0]),Y(v[1]));g.lineTo(X(b[0]),Y(b[1]));g.stroke();g.fillStyle=INK;g.beginPath();g.arc(X(v[0]),Y(v[1]),s*.04,0,TAU);g.fill();if(d.rt){g.strokeStyle=RED;g.lineWidth=lw*.7;g.beginPath();g.moveTo(X(v[0]+12),Y(v[1]));g.lineTo(X(v[0]+12),Y(v[1]-12));g.lineTo(X(v[0]),Y(v[1]-12));g.stroke();}}
  else{const pts=d.pts,n=pts.length;g.beginPath();pts.forEach((q,i)=>i?g.lineTo(X(q[0]),Y(q[1])):g.moveTo(X(q[0]),Y(q[1])));g.closePath();g.fillStyle='#fde68a';g.fill();g.stroke();
    (d.rights||[]).forEach(k=>{const v=pts[k],a=pts[(k+1)%n],b=pts[(k+n-1)%n];const u=p1=>{const dx=p1[0]-v[0],dy=p1[1]-v[1],l=Math.hypot(dx,dy);return[dx/l*9,dy/l*9];};const[ax,ay]=u(a),[bx,by]=u(b);g.strokeStyle=RED;g.lineWidth=lw*.7;g.beginPath();g.moveTo(X(v[0]+ax),Y(v[1]+ay));g.lineTo(X(v[0]+ax+bx),Y(v[1]+ay+by));g.lineTo(X(v[0]+bx),Y(v[1]+by));g.stroke();});
    (d.ticks||[]).forEach((t,k)=>{if(!t)return;const a=pts[k],b=pts[(k+1)%n];const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);const nx=-dy/l*5,ny=dx/l*5,tx=dx/l*2.6,ty=dy/l*2.6;g.strokeStyle='#2563eb';g.lineWidth=lw*.7;for(let j=0;j<t;j++){const off=(j-(t-1)/2);g.beginPath();g.moveTo(X(mx+off*tx*1.4-nx),Y(my+off*ty*1.4-ny));g.lineTo(X(mx+off*tx*1.4+nx),Y(my+off*ty*1.4+ny));g.stroke();}});
    (d.par||[]).forEach((gg,k)=>{if(!gg)return;const a=pts[k],b=pts[(k+1)%n];const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);const ux=dx/l,uy=dy/l;const mx=a[0]+dx*.3,my=a[1]+dy*.3;g.strokeStyle='#059669';g.lineWidth=lw*.7;for(let j=0;j<gg;j++){const cx=mx+ux*j*5,cy=my+uy*j*5;g.beginPath();g.moveTo(X(cx-ux*4-uy*4),Y(cy-uy*4+ux*4));g.lineTo(X(cx),Y(cy));g.lineTo(X(cx-ux*4+uy*4),Y(cy-uy*4-ux*4));g.stroke();}});}
  g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#cfd6de','#94a3b8']);const sh=[CAT['4-2b'][3].d,CAT['4-2a'][0].d,CAT['4-2c'][3].d];sh.forEach((d,i)=>{const s=Math.min(W*.22,H*.5);K.card(g,W*(.1+i*.3),H*.2,s,s,u*.2,'#fbf6e6',{stroke:INK,lw:3,blur:0,dy:0});shapeArt(g,d,W*(.1+i*.3)+s*.05,H*.2+s*.05,s*.9);});
  const mx=W*.5+Math.sin(T)*W*.3,my=H*.55;g.strokeStyle='#1f2a37';g.lineWidth=u*.14;g.beginPath();g.arc(mx,my,u*.9,0,TAU);g.stroke();g.beginPath();g.moveTo(mx+u*.64,my+u*.64);g.lineTo(mx+u*1.5,my+u*1.5);g.stroke();g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.arc(mx,my,u*.9,0,TAU);g.fill();}
const GAME={
  id:'detective',title:'도형 탐정 사무소',title1:'사건 파일 속 수사 노트',title2:'도형 탐정 사무소',emoji:LOGO,
  subtitle:'3~4학년 수학 · 평면도형 · 삼각형 · 사각형 · 다각형',
  howto:'용의자 도형 중에 <b>범인</b>이 숨어 있어요! <b>질문 카드</b>를 골라 목격자에게 물어보고, 아닌 도형을 눌러 <b>❌</b>표 하세요. 한 명만 남으면 <b>🚨 체포!</b> 질문을 적게 쓸수록 점수가 높아요. 범인에게 ❌를 치면 놓쳐요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#334155',c2:YEL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 사건을 맡을까요?',
  txt:{who:'누가 탐정일까요?',dur:'수사 시간',pace:'생각하는 시간',seat:'번 탐정 ',go:'수사 시작!',s1:'1. 사건',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>선분</b>은 두 점을 곧게 이은 선, <b>반직선</b>은 한 점에서 한쪽으로 끝없이 늘인 곧은 선, <b>직선</b>은 양쪽으로 끝없이 늘인 곧은 선이에요. <b>각</b>은 한 점에서 만나는 두 반직선이에요.</li>
    <li><b>이등변삼각형</b>은 두 변의 길이가 같고, <b>정삼각형</b>은 세 변의 길이가 같아요. 각의 크기로는 예각·직각·둔각삼각형으로 나눠요.</li>
    <li><b>사다리꼴</b>은 평행한 변이 한 쌍 이상, <b>평행사변형</b>은 두 쌍, <b>마름모</b>는 네 변의 길이가 같은 평행사변형이에요.</li>
    <li><b>정다각형</b>은 변의 길이와 각의 크기가 모두 같은 다각형이에요. <b>대각선</b>은 이웃하지 않는 두 꼭짓점을 이은 선분이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,q=p.state.q;const avail=H-top-pad;const land=W>=H*1.1;const gap=u*.25;const n=q?q.sus.length:5,nq=q?q.cards.length:5;
    const bubH=Math.min(u*2.3,avail*.15),btnH=Math.min(u*1.6,avail*.1);const qCols=land?3:2,qRows=Math.ceil(nq/qCols);const qH=Math.min(qRows*u*1.75+(qRows-1)*gap,avail*.3);const lineH=avail-bubH-btnH-qH-gap*3;
    const cols=land?n:3,rows=Math.ceil(n/cols);const sus=QK.grid(W,top+bubH+gap,top+bubH+gap+lineH,n,cols,pad,gap);
    const cards=QK.grid(W,top+bubH+gap*2+lineH,top+bubH+gap*2+lineH+qH,nq,qCols,pad,gap);const arrest={x:pad,y:H-pad-btnH,w:W-pad*2,h:btnH};
    return{W,H,u,top,pad,bub:{x:pad,y:top,w:W-pad*2,h:bubH},sus,cards,arrest,land};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,caught:0,marks:[],log:[],asked:0,say:'',okFlag:false,used:{}});this.newQ(p);},
  make(p,L){const R=p.R,cat=CAT[L],keys=QKEYS[L];let q0=null;
    for(let t=0;t<80&&!q0;t++){const target=R.pick(cat);const sus=R.shuffle([target,...R.shuffle(cat.filter(x=>x!==target)).slice(0,R.int(4,5))]);const split=keys.filter(k=>{const y=sus.filter(s=>has(s,k)).length;return y>0&&y<sus.length;});const cards=R.shuffle(split).slice(0,6);
      if(!sus.every(s=>s===target||cards.some(k=>has(s,k)!==has(target,k))))continue;let S=sus.slice(),min=0;const used=new Set();while(S.length>1){let best=null,bs=99;for(const k of cards){if(used.has(k))continue;const left=S.filter(s=>has(s,k)===has(target,k)).length;if(left<bs){bs=left;best=k;}}used.add(best);min++;S=S.filter(s=>has(s,best)===has(target,best));}q0={target,sus,cards,min};}
    if(!q0){const target=cat[0];q0={target,sus:cat.slice(0,5),cards:keys.slice(0,4),min:2};}
    const q=Object.assign({},q0);q.text='❓ 질문하고 → 아닌 도형 <b>❌</b> → 🚨 체포';q.reveal='범인은 '+q.target.name;q.review='범인 '+q.target.name+' · 단서: '+q.cards.map(k=>QQ[k]+' '+(has(q.target,k)?'예':'아니요')).join(', ');q.speak='';return q;},
  qtime(q){return 75;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(){return '질문 카드를 눌러 물어봐요';},
  isOk(q,i,p){return q.sus[i]===q.target;},tipOf(q){return q.reveal+(this._p&&this._p.state.marks[this._p.state.q.sus.indexOf(q.target)]?' (범인에게 ❌를 쳤어요)':'');},goodTip(q){return '체포 성공! '+q.target.name;},
  ptsOf(p,q,frac){const st=p.state;return Math.round((55+50*frac)*Math.max(.4,Math.min(1,1-.15*(st.asked-q.min))));},
  onNew(p,q){const st=p.state;st.marks=q.sus.map(()=>false);st.log=[];st.asked=0;st.say='어떤 질문을 할까요?';st.used={};},
  onVerdict(p,q,ok,i){if(ok)p.state.caught++;},
  left(st){return st.marks.map((m,j)=>m?-1:j).filter(j=>j>=0);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    const j=gkHit(G.sus,x,y);if(j>=0){st.marks[j]=!st.marks[j];p.Snd.tap&&p.Snd.tap();return;}
    const c=gkHit(G.cards,x,y);if(c>=0){const k=q.cards[c];if(st.used[k]!=null)return;const yes=has(q.target,k);st.used[k]=yes;st.log.push([k,yes]);st.asked++;st.say=QQ[k]+'  '+(yes?'네, 맞아요!':'아니요!');p.Snd.tone&&p.Snd.tone(yes?760:330,.12,'sine',.06);return;}
    if(K.inRect(x,y,G.arrest)){const L=this.left(st);if(L.length!==1){p.Snd.bad&&p.Snd.bad();return;}this.verdict(p,L[0],false);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    const bad=q.sus.findIndex((s,j)=>!st.marks[j]&&st.log.some(([k,y])=>has(s,k)!==y));if(bad>=0)return cl(G.sus[bad]);
    if(this.left(st).length>1){const c=q.cards.findIndex(k=>st.used[k]==null);if(c>=0)return cl(G.cards[c]);}return cl(G.arrest);},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#d8dde3','#b6bfca']);g.fillStyle='rgba(234,179,8,.9)';g.fillRect(0,G.top-u*.1,W,u*.12);
    /* 목격자 + 말풍선 */
    const B=G.bub;K.emo(g,'👮',B.x+B.h*.5,B.y+B.h*.5,B.h*.85);K.card(g,B.x+B.h*1.1,B.y+B.h*.08,B.w-B.h*1.1-u*3.4,B.h*.84,u*.3,'#fffdf5',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,st.say,B.x+B.h*1.1+(B.w-B.h*1.1-u*3.4)/2,B.y+B.h*.5,{size:Math.min(u*.8,B.h*.38),color:INK,maxW:B.w-B.h*1.1-u*3.8});
    K.card(g,B.x+B.w-u*3.2,B.y+B.h*.2,u*3.2,B.h*.6,u*.25,'#fbf6e6',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🗂️ '+st.asked+'장',B.x+B.w-u*1.6,B.y+B.h*.5,{size:u*.55,color:INK,maxW:u*2.8});
    /* 용의자 */
    const LT='ㄱㄴㄷㄹㅁㅂ';G.sus.forEach((r,j)=>{const s=q.sus[j];const m=st.marks[j];const isT=s===q.target;let fill='#fffdf5';if(st.lock){if(isT)fill='#bbf7d0';else if(st.pick===j)fill='#fecaca';}
      K.card(g,r.x,r.y,r.w,r.h,u*.25,fill,{stroke:INK,lw:3,blur:u*.15,dy:u*.06});const side=Math.min(r.w*.82,r.h*.78);g.save();g.globalAlpha=m?.35:1;shapeArt(g,s.d,r.x+(r.w-side)/2,r.y+r.h*.06,side);g.restore();
      K.txt(g,LT[j],r.x+u*.5,r.y+u*.5,{size:u*.7,color:INK,maxW:u*.9});if(st.lock)K.txt(g,s.name,r.x+r.w/2,r.y+r.h-u*.45,{size:Math.min(u*.5,r.w*.11),color:INK,maxW:r.w*.94});
      if(m){g.strokeStyle=RED;g.lineWidth=Math.max(5,u*.2);g.lineCap='round';const cx=r.x+r.w/2,cy=r.y+r.h*.45,d=side*.35;g.beginPath();g.moveTo(cx-d,cy-d);g.lineTo(cx+d,cy+d);g.moveTo(cx+d,cy-d);g.lineTo(cx-d,cy+d);g.stroke();}
      if(st.lock&&isT){K.txt(g,st.okFlag?'🚨 체포!':'💨 범인!',r.x+r.w/2,r.y+u*.45,{size:u*.55,color:'#14532d',maxW:r.w*.9});}});
    /* 질문 카드 */
    G.cards.forEach((r,c)=>{const k=q.cards[c];const used=st.used[k];const fill=used==null?'#fffdf5':used?'#dcfce7':'#fee2e2';K.rr(g,r.x,r.y,r.w,r.h,u*.2);g.fillStyle=fill;g.fill();g.lineWidth=3;g.strokeStyle=used==null?INK:used?'#16a34a':'#dc2626';g.stroke();
      QK.txt(g,(used==null?'❓ ':used?'⭕ ':'✖️ ')+QQ[k],r.x+r.w/2,r.y+r.h/2,r.w-u*.5,r.h-u*.25,Math.min(u*.72,r.h*.34),INK,1.2);});
    /* 체포 */
    const A=G.arrest,n=this.left(st).length;K.rr(g,A.x,A.y,A.w,A.h,u*.25);g.fillStyle=n===1&&!st.lock?RED:'#94a3b8';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
    K.txt(g,n===1?'🚨 '+LT[this.left(st)[0]]+' 체포!':n===0?'🚨 한 명은 남겨요':'🚨 체포! (용의자 '+n+'명)',A.x+A.w/2,A.y+A.h/2,{size:Math.min(A.h*.5,u*1),color:'#fff',maxW:A.w*.9});
    if(!st.lock&&st.qmax>0){QZ.bar(g,G.pad,G.top-u*.0,Math.min(W*.3,u*7),Math.max(5,u*.15),st.qt/st.qmax,{good:YEL});}
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1900,badMs:3600});
Engine.boot(GAME);
