/* 3학년 1학기 수학 · 길이와 시간 — 기차 운행 관리자
   디자인: 밤의 기차역 관제실. 전광판의 시각과 시간, 거리를 계산해서 다이얼을 돌려 맞추고 출발 신호! 맞으면 기차가 제시간에 도착해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#0f2238',AMB='#fbbf24';
const LOGO=gkLogo('#274a75','#fbbf24','🚆');
const LV={
  a:{t:'1분 = 60초',d:'정차 시간 분 ↔ 초 바꾸기',time:40},
  b:{t:'시간의 덧셈',d:'출발 시각 + 걸린 시간 = 도착 시각',time:55},
  c:{t:'시간의 뺄셈',d:'도착 시각 − 출발 시각 = 걸린 시간',time:55},
  d:{t:'km · m · cm · mm',d:'기찻길 거리 계산하기',time:50},
};
const STA=['서울','대전','부산','광주','대구','강릉','전주','목포','여수','포항','춘천','청주'];
const F=(label,min,max,steps)=>({label,min,max,steps});
function trainArt(g,x,y,s,col,t,smoke){g.save();g.translate(x,y);g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;g.lineJoin='round';
  for(let c=0;c<2;c++){const cx=-s*(1.55+c*1.5);g.fillStyle=c?'#38bdf8':'#fb7185';K.rr(g,cx,-s*.75,s*1.4,s*.8,s*.12);g.fill();g.stroke();g.fillStyle='#fff';for(let w=0;w<3;w++){K.rr(g,cx+s*.15+w*s*.4,-s*.62,s*.3,s*.3,s*.06);g.fill();g.stroke();}g.fillStyle='#334155';g.beginPath();g.arc(cx+s*.3,s*.08,s*.12,0,TAU);g.arc(cx+s*1.1,s*.08,s*.12,0,TAU);g.fill();}
  g.fillStyle=col;K.rr(g,-s*.05,-s*.85,s*1.1,s*.9,s*.14);g.fill();g.stroke();g.fillStyle='#fff';K.rr(g,s*.1,-s*.7,s*.4,s*.35,s*.06);g.fill();g.stroke();g.fillStyle=AMB;g.beginPath();g.arc(s*1.0,-s*.3,s*.1,0,TAU);g.fill();g.stroke();
  g.fillStyle='#334155';g.beginPath();g.arc(s*.25,s*.08,s*.14,0,TAU);g.arc(s*.8,s*.08,s*.14,0,TAU);g.fill();
  if(smoke){for(let i=0;i<3;i++){const k=((t*.8+i/3)%1);g.fillStyle='rgba(226,232,240,'+(.8-k*.8)+')';g.beginPath();g.arc(s*.3-k*s*.8,-s*1.0-k*s*.9,s*(.15+k*.25),0,TAU);g.fill();}}g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#16304f','#315b8e']);for(let i=0;i<20;i++){g.fillStyle='rgba(255,233,168,'+(.4+.4*Math.sin(T*2+i))+')';g.beginPath();g.arc((i*97)%100/100*W,(i*37)%100/100*H*.5,2,0,TAU);g.fill();}
  g.fillStyle='#0f2238';g.fillRect(0,H*.78,W,H*.22);g.fillStyle='#64748b';g.fillRect(0,H*.78,W,u*.12);for(let x=((-T*80)%(u*.8));x<W;x+=u*.8)g.fillRect(x,H*.8,u*.3,u*.1);
  trainArt(g,((T*120)%(W+u*8))-u*3,H*.76,u*1.2,'#f59e0b',T,true);}
const GAME={
  id:'trainhub',title:'기차 운행 관리자',title1:'밤의 기차역 관제실',title2:'기차 운행 관리자',emoji:LOGO,
  subtitle:'3학년 1학기 수학 · 길이와 시간',
  howto:'나는 기차역 관제사! 시각과 시간, 거리를 계산해서 <b>다이얼</b>을 돌려 맞추고 <b>출발 신호</b>를 보내요. 맞으면 기차가 제시간에 도착하고, 틀리면 기차가 늦어서 승객들이 화가 나요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#f59e0b',c2:'#1d4ed8'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 업무를 할까요?',
  txt:{who:'누가 관제사일까요?',dur:'근무 시간',pace:'계산 시간',seat:'번 관제사 ',go:'근무 시작!',s1:'1. 업무',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3학년 1학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>1분 = 60초</b>, <b>1시간 = 60분</b>이에요. 초를 분으로 바꿀 때는 60씩 묶어요.</li>
    <li><b>시각 + 시간 = 시각</b>: 분끼리 더해서 60분이 넘으면 1시간으로 올려요.</li>
    <li><b>시각 − 시각 = 시간</b>(걸린 시간): 같은 단위끼리 빼고, 모자라면 1시간을 60분으로 받아 내려요.</li>
    <li><b>1 km = 1000 m</b>, <b>1 cm = 10 mm</b>. 거리를 더하고 뺄 때는 km는 km끼리, m는 m끼리 계산해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2;const q=p.state.q;const n=q?q.fields.length:2;const pad=u*.35;
    const rowU=Math.min(u,(H-top)/14);const ctrlH=Math.min((H-top)*.5,rowU*(q&&q.fields.some(f=>f.steps.length>2)?7.6:7.2));const cy=H-pad-ctrlH;const panel={x:pad,y:cy,w:W-pad*2,h:ctrlH};
    const goH=Math.min(rowU*1.6,ctrlH*.26),dh=ctrlH-goH-pad*.5;const gap=u*.3;const cols=n;const cw=(panel.w-gap*(cols-1))/cols;
    const dials=[],btns=[];(q?q.fields:[]).forEach((f,k)=>{const x=panel.x+k*(cw+gap);const lh=dh*.16,bh=dh*.26,vh=dh*.32;const sw=(cw-gap*.4*(f.steps.length-1))/f.steps.length;
      const up=f.steps.map((s,j)=>({x:x+j*(sw+gap*.4),y:panel.y+lh,w:sw,h:bh,k,d:s,t:'+'+s}));const dn=f.steps.map((s,j)=>({x:x+j*(sw+gap*.4),y:panel.y+lh+bh+vh,w:sw,h:bh,k,d:-s,t:'−'+s}));btns.push(...up,...dn);dials.push({x,y:panel.y,w:cw,lh,bh,vh,f});});
    const go={x:panel.x,y:panel.y+dh+pad*.5,w:panel.w,h:goH};
    return{W,H,u,top,pad,panel,dials,btns,go,sc:{x:pad,y:top,w:W-pad*2,h:cy-top-pad*.7}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,happy:0,vals:[]});this.newQ(p);},
  make(p,L){const R=p.R,q={};const st=R.pick(STA),en=R.pick(STA.filter(x=>x!==st));q.st=st;q.en=en;
    const clk=(h,m,s)=>h+'시 '+m+'분'+(s!=null?' '+s+'초':'');
    if(L==='a'){if(R.chance(.5)){const m=R.int(1,6),s=R.int(1,59);q.fields=[F('분',0,9,[1]),F('초',0,59,[10,1])];q.ans=[m,s];q.text=st+'역 정차 시간 <b>'+(m*60+s)+'초</b>! 몇 분 몇 초로 안내할까요?';q.reveal=m+'분 '+s+'초';q.board=[['정차',(m*60+s)+'초']];}
      else{const m=R.int(1,5),s=R.int(1,59);q.fields=[F('초',0,599,[100,10,1])];q.ans=[m*60+s];q.text=st+'역 정차 시간 <b>'+m+'분 '+s+'초</b>는 모두 몇 초?';q.reveal=(m*60+s)+'초';q.board=[['정차',m+'분 '+s+'초']];}}
    else if(L==='b'){const sec=R.chance(.5);const dh=R.int(6,9),dm=R.int(5,55),ds=sec?R.int(5,55):0;const uh=R.int(0,2),um=R.int(10,55),us=sec?R.int(10,55):0;const t=(dh*3600+dm*60+ds)+(uh*3600+um*60+us);const ah=Math.floor(t/3600),am=Math.floor(t%3600/60),as=t%60;
      q.fields=sec?[F('시',1,12,[1]),F('분',0,59,[10,1]),F('초',0,59,[10,1])]:[F('시',1,12,[1]),F('분',0,59,[10,1])];q.ans=sec?[ah,am,as]:[ah,am];
      q.board=[['출발',clk(dh,dm,sec?ds:null)],['걸린 시간',(uh?uh+'시간 ':'')+um+'분'+(sec?' '+us+'초':'')],['도착','?']];q.text='<b>'+en+'역 도착 시각</b>을 맞춰요!';q.reveal=clk(ah,am,sec?as:null);}
    else if(L==='c'){const sec=R.chance(.5);const dh=R.int(6,9),dm=R.int(10,55),ds=sec?R.int(10,55):0;const uh=R.int(0,2),um=R.int(5,55),us=sec?R.int(5,55):0;const a=(dh*3600+dm*60+ds)+(uh*3600+um*60+us);const ah=Math.floor(a/3600),am=Math.floor(a%3600/60),as=a%60;
      q.fields=sec?[F('시간',0,5,[1]),F('분',0,59,[10,1]),F('초',0,59,[10,1])]:[F('시간',0,5,[1]),F('분',0,59,[10,1])];q.ans=sec?[uh,um,us]:[uh,um];
      q.board=[['출발',clk(dh,dm,sec?ds:null)],['도착',clk(ah,am,sec?as:null)],['걸린 시간','?']];q.text='기차가 달리는 데 <b>걸린 시간</b>을 맞춰요!';q.reveal=(uh?uh+'시간 ':'')+um+'분'+(sec?' '+us+'초':'');}
    else{const k=R.pick(['add','sub','conv','mm']);const km=x=>Math.floor(x/1000)+' km '+(x%1000)+' m';
      if(k==='mm'){const c=R.int(2,30),m=R.int(1,9);q.fields=[F('mm',0,400,[100,10,1])];q.ans=[c*10+m];q.text='기차표 길이 <b>'+c+' cm '+m+' mm</b>는 몇 mm?';q.reveal=(c*10+m)+' mm';q.board=[['기차표','🎫 '+c+' cm '+m+' mm']];}
      else if(k==='conv'){const x=R.int(1001,9999);q.fields=[F('km',0,20,[1]),F('m',0,999,[100,10,1])];q.ans=[Math.floor(x/1000),x%1000];q.text=st+'역에서 '+en+'역까지 <b>'+x+' m</b>! 몇 km 몇 m?';q.reveal=km(x);q.board=[['거리',x+' m']];}
      else{const a=R.int(1,5)*1000+R.int(100,900),b=R.int(1,3)*1000+R.int(100,900);const add=k==='add';const big=Math.max(a,b),sm=Math.min(a,b);const t=add?a+b:big-sm;q.fields=[F('km',0,20,[1]),F('m',0,999,[100,10,1])];q.ans=[Math.floor(t/1000),t%1000];
        q.board=add?[[st+'→중간역',km(a)],['중간역→'+en,km(b)],['모두','?']]:[['전체',km(big)],['달린 거리',km(sm)],['남은 거리','?']];q.text=add?'<b>전체 거리</b>를 맞춰요!':'<b>남은 거리</b>를 맞춰요!';q.reveal=km(t);}}
    q.okIdx=0;q.review=q.text.replace(/<[^>]+>/g,'')+' ['+q.board.filter(r=>r[1]!=='?').map(r=>r.join(' ')).join(', ')+'] → '+q.reveal;q.speak='';return q;},
  qtime(q){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '🚦 '+q.text;},askSub(){return '다이얼의 + − 버튼으로 맞추고 출발 신호!';},
  isOk(q,i){return i===0;},tipOf(q){return '정답: '+q.reveal;},goodTip(q){return '제시간에 출발! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(60+50*frac);},
  onNew(p,q){const st=p.state;st.vals=q.fields.map(f=>f.min);st.run=0;},
  onVerdict(p,q,ok){const st=p.state;st.run=0;if(ok)st.happy++;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);if(K.inRect(x,y,G.go)){const ok=q.ans.every((v,k)=>v===st.vals[k]);this.verdict(p,ok?0:1,false);return;}
    const b=G.btns.find(b=>K.inRect(x,y,b));if(b){const f=q.fields[b.k];st.vals[b.k]=clamp(st.vals[b.k]+b.d,f.min,f.max);p.Snd.tap&&p.Snd.tap();st.bump={k:b.k,t:0};}},
  upd(p,dt){const st=p.state;if(st.lock)st.run+=dt;if(st.bump){st.bump.t+=dt;if(st.bump.t>.25)st.bump=null;}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;st.vals=q.ans.slice();const G=this.geo(p);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.go.x+G.go.w/2,y:rc.top+G.go.y+G.go.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#16304f','#24507f']);for(let i=0;i<24;i++){g.fillStyle='rgba(255,233,168,'+(.3+.4*Math.sin(t*2+i))+')';g.beginPath();g.arc((i*97)%100/100*W,G.top+(i*37)%100/100*G.sc.h*.5,1.8,0,TAU);g.fill();}
    const S=G.sc;
    /* 전광판 */
    const bw=Math.min(S.w*.58,u*17),bh=Math.min(S.h*.62,u*(1.2+q.board.length*1.15));const bx=S.x+(S.w-bw)/2,by=S.y+u*.1;K.card(g,bx,by,bw,bh,u*.2,'#0b1220',{stroke:'#fbbf24',lw:Math.max(3,u*.08),blur:u*.3,dy:u*.08});
    K.txt(g,'🚉 '+q.st+'역 → '+q.en+'역',bx+bw/2,by+u*.75,{size:Math.min(u*.8,bh*.2),color:'#fbbf24',maxW:bw*.92});
    const rh=(bh-u*1.4)/q.board.length;q.board.forEach((r,i)=>{const y=by+u*1.3+i*rh+rh/2;g.fillStyle='rgba(251,191,36,.08)';g.fillRect(bx+u*.3,y-rh*.45,bw-u*.6,rh*.9);K.txt(g,r[0],bx+u*.5+bw*.12,y,{size:Math.min(rh*.5,u*.75),color:'#93c5fd',maxW:bw*.3,align:'center'});
      const qm=r[1]==='?';K.txt(g,qm?'?':r[1],bx+bw*.68,y,{size:Math.min(rh*.58,u*.9),color:qm?'#fb7185':'#fde68a',maxW:bw*.55});});
    /* 선로 */
    const ty0=by+bh+(S.y+S.h-by-bh)*.62;const x0=S.x+u*2.2,x1=S.x+S.w-u*2.2;g.fillStyle='#0b1220';g.fillRect(S.x,ty0,S.w,u*.25);g.fillStyle='#64748b';g.fillRect(S.x,ty0,S.w,u*.08);for(let x=S.x;x<S.x+S.w;x+=u*.7){g.fillStyle='#78350f';g.fillRect(x,ty0+u*.08,u*.3,u*.2);}
    [[x0,q.st],[x1,q.en]].forEach(([x,nm],i)=>{g.fillStyle=i?'#fcd34d':'#fda4af';K.rr(g,x-u*1.0,ty0-u*1.5,u*2,u*1.5,u*.15);g.fill();g.fillStyle='#0b1220';g.beginPath();g.moveTo(x-u*1.15,ty0-u*1.5);g.lineTo(x,ty0-u*2.1);g.lineTo(x+u*1.15,ty0-u*1.5);g.closePath();g.fill();K.txt(g,nm+'역',x,ty0-u*.75,{size:u*.5,color:'#0b1220',maxW:u*1.8});});
    const ts=Math.min(u*.9,(x1-x0)/6);const tA=x0+u*1.2+3.2*ts,tB=x1-u*1.2-1.2*ts;let tx=tA;let late=false;
    if(st.lock){if(st.res==='ok'){const k=clamp(st.run/1.3,0,1);tx=tA+(tB-tA)*k*k*(3-2*k);}else{const k=clamp(st.run/1.0,0,1);tx=tA+(tB-tA)*.3*(1-Math.pow(1-k,2));late=true;}}
    trainArt(g,tx,ty0,ts,'#f59e0b',t,st.lock&&st.res==='ok'||!st.lock);
    if(late){K.txt(g,'🚨 열차가 늦어요!',W/2,ty0-u*2.1,{size:u*.8,color:'#fecaca',stroke:'#7f1d1d',lw:u*.18,maxW:W*.8});K.txt(g,'😠😠😠',tx-ts,ty0-ts*1.4,{size:u*.6,color:'#fff',maxW:u*5});}
    else if(st.lock)K.txt(g,'🎉 제시간 도착!',W/2,ty0-u*2.1,{size:u*.8,color:'#bbf7d0',stroke:'#14532d',lw:u*.18,maxW:W*.8});
    K.card(g,S.x,S.y,u*3.2,u*.8,u*.2,'rgba(15,34,56,.92)',{stroke:AMB,lw:3,blur:0,dy:0});K.txt(g,'😊 '+st.happy+'명',S.x+u*1.6,S.y+u*.4,{size:u*.5,color:'#ffe9a8',maxW:u*2.9});
    if(!st.lock&&st.qmax>0){QZ.bar(g,S.x,S.y+u*.95,u*3.2,Math.max(6,u*.2),st.qt/st.qmax,{good:AMB});}
    /* 다이얼 */
    G.dials.forEach((d,k)=>{K.txt(g,d.f.label,d.x+d.w/2,d.y+d.lh/2,{size:Math.min(u*.6,d.lh*.8),color:'#93c5fd',maxW:d.w});
      const vy=d.y+d.lh+d.bh;const bump=st.bump&&st.bump.k===k?1+.2*Math.sin(st.bump.t/.25*Math.PI):1;K.card(g,d.x,vy+d.vh*.05,d.w,d.vh*.9,u*.2,'#0b1220',{stroke:'#fbbf24',lw:3,blur:0,dy:0});K.txt(g,String(st.vals[k]),d.x+d.w/2,vy+d.vh/2,{size:Math.min(d.vh*.7,u*1.7)*bump,color:'#fde68a',maxW:d.w*.9});});
    G.btns.forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,u*.2);g.fillStyle=b.d>0?'#2f6f4f':'#7f3b3b';g.fill();g.lineWidth=3;g.strokeStyle='#0b1220';g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.5,u*.85),color:'#fff',maxW:b.w*.9});});
    const gb=G.go;K.rr(g,gb.x,gb.y,gb.w,gb.h,u*.25);g.fillStyle=st.lock?'#64748b':'#22c55e';g.fill();g.lineWidth=3;g.strokeStyle='#0b1220';g.stroke();K.txt(g,'🚦 출발 신호!',gb.x+gb.w/2,gb.y+gb.h/2,{size:Math.min(gb.h*.55,u*1.1),color:'#0b1220',maxW:gb.w*.8});
  },
};
QZ.mix(GAME,{say:false,pts0:60,pts1:50,okMs:2200,badMs:3600});
Engine.boot(GAME);
