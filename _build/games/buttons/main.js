/* 2학년 수학 · 분류하기 · 표와 그래프 — 단추 정리 로봇
   디자인: 바느질 상자 속 단추 공방. 방바닥에 와르르 쏟아진 단추를 끌어서 알맞은 상자에 넣으면 로봇이 표와 ○ 그래프를 만들어 줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#134e4a',TEAL='#0d9488',ROSE='#f43f5e';
const LOGO=gkLogo('#ccfbf1','#115e59','🤖');
const COLS=[{n:'빨간색',c:'#ef4444'},{n:'파란색',c:'#3b82f6'},{n:'노란색',c:'#facc15'},{n:'초록색',c:'#22c55e'}];
const SH=['동그라미','네모','세모'];
const ANAME={c:'색깔',s:'모양',h:'구멍의 수'};
const LV={
  '2-1a':{t:'분류 기준',d:'기준에 따라 정리하기'},
  '2-1b':{t:'분류하여 세기',d:'정리하고 세어 보기'},
  '2-2a':{t:'표로 나타내기',d:'정리하고 표 완성하기'},
  '2-2b':{t:'그래프로 나타내기',d:'정리하면 ○ 그래프가 쌓여요'},
};
const valsOf=a=>a==='c'?[0,1,2,3]:a==='s'?[0,1,2]:[2,4];
const nameOf=(a,v)=>a==='c'?COLS[v].n:a==='s'?SH[v]:'구멍 '+v+'개';
function btnArt(g,it,x,y,r,a){g.save();g.translate(x,y);if(a!=null)g.globalAlpha=a;g.lineWidth=Math.max(1.5,r*.12);g.strokeStyle='#334155';g.lineJoin='round';g.fillStyle=COLS[it.c].c;g.beginPath();
  if(it.s===0)g.arc(0,0,r,0,TAU);else if(it.s===1)K.rr(g,-r*.9,-r*.9,r*1.8,r*1.8,r*.25);else{g.moveTo(0,-r);g.lineTo(r*1.05,r*.8);g.lineTo(-r*1.05,r*.8);g.closePath();}
  g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(-r*.4,-r*.4,r*.18,0,TAU);g.fill();
  const cy=it.s===2?r*.25:0;const hs=it.h===2?[[-.28,0],[.28,0]]:[[-.28,-.25],[.28,-.25],[-.28,.25],[.28,.25]];g.fillStyle='#fff';g.lineWidth=Math.max(1,r*.07);hs.forEach(h=>{g.beginPath();g.arc(h[0]*r,cy+h[1]*r,r*.14,0,TAU);g.fill();g.stroke();});
  g.strokeStyle='rgba(51,65,85,.45)';g.lineWidth=Math.max(1,r*.05);g.setLineDash([r*.15,r*.12]);g.beginPath();if(it.s===0)g.arc(0,0,r*.75,0,TAU);else g.arc(0,cy*.5,r*.62,0,TAU);g.stroke();g.restore();}
function robot(g,x,y,s,mood,t){g.save();g.translate(x,y);const bob=mood==='happy'?Math.abs(Math.sin(t*7))*-s*.12:Math.sin(t*2)*s*.02;g.translate(0,bob);g.lineWidth=Math.max(2,s*.05);g.strokeStyle=INK;g.lineJoin='round';
  g.fillStyle='#5eead4';K.rr(g,-s*.4,-s*.1,s*.8,s*.7,s*.14);g.fill();g.stroke();g.fillStyle='#fff';K.rr(g,-s*.24,s*.1,s*.48,s*.3,s*.06);g.fill();g.stroke();g.fillStyle=ROSE;g.beginPath();g.arc(-s*.1,s*.25,s*.05,0,TAU);g.arc(s*.1,s*.25,s*.05,0,TAU);g.fill();
  g.fillStyle='#99f6e4';K.rr(g,-s*.38,-s*.78,s*.76,s*.62,s*.16);g.fill();g.stroke();g.beginPath();g.moveTo(0,-s*.78);g.lineTo(0,-s*.95);g.stroke();g.fillStyle=ROSE;g.beginPath();g.arc(0,-s*.98,s*.06,0,TAU);g.fill();g.stroke();
  g.fillStyle='#fff';[-1,1].forEach(d=>{g.beginPath();g.arc(d*s*.15,-s*.5,s*.1,0,TAU);g.fill();g.stroke();g.fillStyle=INK;g.beginPath();g.arc(d*s*.15,-s*.5,s*.04,0,TAU);g.fill();g.fillStyle='#fff';});
  g.strokeStyle=INK;g.beginPath();if(mood==='happy')g.arc(0,-s*.34,s*.1,.1,Math.PI-.1);else if(mood==='oops'){g.arc(0,-s*.28,s*.08,Math.PI+.2,TAU-.2);}else{g.moveTo(-s*.08,-s*.3);g.lineTo(s*.08,-s*.3);}g.stroke();
  g.fillStyle='#5eead4';[-1,1].forEach(d=>{K.rr(g,d*s*.5-s*.07,-s*.05,s*.14,s*.4,s*.07);g.fill();g.stroke();});g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fff1c9','#fde68a']);g.fillStyle='#d6a77a';g.fillRect(0,H*.62,W,H*.38);
  const its=[{c:0,s:0,h:2},{c:1,s:1,h:4},{c:2,s:2,h:2},{c:3,s:0,h:4},{c:0,s:1,h:2},{c:1,s:2,h:4},{c:2,s:0,h:2}];its.forEach((it,i)=>{const x=W*(.12+i*.12),y=H*(.72+.06*Math.sin(T*2+i)) ;btnArt(g,it,x,y,u*.55);});
  robot(g,W*.5,H*.45,u*1.8,'happy',T);}
const GAME={
  id:'buttons',title:'단추 정리 로봇',title1:'바느질 상자 단추 공방',title2:'단추 정리 로봇',emoji:LOGO,
  subtitle:'2학년 수학 · 분류하기 · 표와 그래프',
  howto:'방바닥에 단추가 와르르! 단추를 <b>끌어서</b> 알맞은 상자에 넣어 정리해요. (눌러서 고른 다음 상자를 눌러도 돼요) 정리하면 로봇이 <b>표와 그래프</b>를 만들어 줘요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:TEAL,c2:ROSE},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 정리를 할까요?',
  txt:{who:'누가 정리 로봇일까요?',dur:'정리 시간',pace:'생각하는 시간',seat:'번 로봇 ',go:'정리 시작!',s1:'1. 정리',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'2학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>분류</b>: 기준을 정해 같은 것끼리 모아요. 분류 기준은 누가 해도 결과가 같아야 해요(색깔·모양·구멍의 수 등). '예쁜 것'처럼 사람마다 다른 기준은 알맞지 않아요.</li>
    <li><b>분류하여 세기</b>: 분류한 다음 각각의 수를 세어요. 빠뜨리거나 두 번 세지 않게 표시하며 세요.</li>
    <li><b>표</b>: 분류한 결과를 수로 적어요. 합계는 모든 수를 더한 값이에요.</li>
    <li><b>그래프</b>: 수만큼 ○를 쌓아서 나타내요. ○가 가장 높은 것이 가장 많은 것이에요.</li></ul>`,
  geo(p){const q=p.state.q;const n=q&&q.labels?q.labels.length:3;const G=gkGeo(p,n,n>3?2:n,2.2);G.by+=G.u*.6;G.bh-=G.u*.6;const gap=G.u*.3;const sorting=q&&q.sort&&p.state.ph==='sort';
    const boxH=q&&q.vals?(G.bh*(q.ty==='crit'||q.ty==='group'?0:(q.sort?.46:.0))):0;G.boxH=boxH;G.fl={x:G.bx,y:G.by+boxH+(boxH?gap:0),w:G.bw,h:G.bh-boxH-(boxH?gap:0)};return G;},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,ph:'sort',miss:0,sel:-1,drag:null,msg:'',msgT:0,done:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};const n=R.int(L==='2-1a'?8:9,L==='2-1a'?10:14);const items=[];for(let k=0;k<n;k++)items.push({c:R.int(0,3),s:R.int(0,2),h:R.pick([2,4])});q.items=items;
    const attr=R.pick(['c','s','h']);const cnt=(a,v)=>items.filter(it=>it[a]===v).length;const A=ANAME;
    const numOpts=ans=>{const o=gkOpts3(R,ans,[ans+1,ans-1,ans+2,ans-2,ans+3].filter(x=>x>=0),v=>v+'개');q.labels=o.labels;q.okIdx=o.okIdx;};
    const txtOpts=(arr,right)=>{const sh=R.shuffle(arr);q.labels=sh;q.okIdx=sh.indexOf(right);};
    if(L==='2-1a'){if(R.chance(.5)){q.ty='sortonly';q.attr=attr;q.text='<b>'+A[attr]+'</b>에 따라 정리해요!';q.reveal='모두 알맞은 상자에 넣었어요';}
      else if(R.chance(.5)){q.ty='crit';const good=R.pick(['색깔','모양','구멍의 수']);const bad=R.sample(['예쁜 것과 예쁘지 않은 것','좋아하는 것과 싫어하는 것','멋진 것과 멋지지 않은 것','귀여운 것과 귀엽지 않은 것'],2);q.text='분류 기준으로 <b>알맞은 것</b>은? <small>누가 분류해도 결과가 같아야 해요</small>';q.reveal=good+'은(는) 누가 분류해도 결과가 같아요';txtOpts([good,...bad],good);}
      else{q.ty='group';q.attr=attr;q.text='로봇은 무엇을 기준으로 나누었을까요?';const an=A[attr];q.reveal=an+'에 따라 나누었어요';txtOpts(['색깔','모양','구멍의 수'],an);}}
    else if(L==='2-1b'){q.ty='count';q.attr=attr;const v=R.pick(valsOf(attr).filter(x=>cnt(attr,x)>0));q.ans=cnt(attr,v);q.text=attr==='h'?'구멍이 <b>'+v+'개</b>인 단추는 몇 개일까요?':'<b>'+nameOf(attr,v)+' 단추</b>는 몇 개일까요?';q.reveal=q.ans+'개';numOpts(q.ans);
      if(R.chance(.3)){const vs=valsOf(attr);const cs=vs.map(x=>cnt(attr,x));const mx=Math.max(...cs);if(cs.filter(x=>x===mx).length===1){const w=vs[cs.indexOf(mx)];q.ty='most';q.text=A[attr]+'별로 세었을 때 <b>가장 많은 것</b>은?';q.reveal=nameOf(attr,w)+'이(가) '+mx+'개로 가장 많아요';const arr=vs.map(x=>nameOf(attr,x));q.labels=R.shuffle(arr).slice(0,3);if(!q.labels.includes(nameOf(attr,w)))q.labels[0]=nameOf(attr,w);q.labels=R.shuffle(q.labels);q.okIdx=q.labels.indexOf(nameOf(attr,w));}}}
    else{const a=R.pick(['c','s']);const vs=valsOf(a);const cs=vs.map(x=>cnt(a,x));q.attr=a;q.vs=vs;q.cs=cs;q.names=vs.map(v=>nameOf(a,v));
      if(L==='2-2a'){q.ty='table';const miss=R.int(0,vs.length);q.miss=miss;q.ans=miss===vs.length?n:cs[miss];q.text=miss===vs.length?'표의 <b>합계</b>는 몇 개일까요?':'표에서 <b>'+q.names[miss]+'</b> 칸에 들어갈 수는?';q.reveal=q.ans+'개';numOpts(q.ans);}
      else{q.ty='graph';const k=R.pick(['most','least','diff','read']);const mx=Math.max(...cs),mn=Math.min(...cs);
        if(k==='most'&&cs.filter(x=>x===mx).length===1){q.text='그래프에서 <b>가장 많은 것</b>은?';const r=q.names[cs.indexOf(mx)];q.reveal=r+'이(가) 가장 높아요';let o=R.shuffle(q.names).slice(0,3);if(!o.includes(r))o[0]=r;txtOpts(o,r);}
        else if(k==='least'&&cs.filter(x=>x===mn).length===1){q.text='그래프에서 <b>가장 적은 것</b>은?';const r=q.names[cs.indexOf(mn)];q.reveal=r+'이(가) 가장 낮아요';let o=R.shuffle(q.names).slice(0,3);if(!o.includes(r))o[0]=r;txtOpts(o,r);}
        else if(k==='diff'){const[x,y]=R.sample([...vs.keys()],2);const hi=cs[x]>=cs[y]?x:y,lo=hi===x?y:x;q.ans=cs[hi]-cs[lo];q.text='<b>'+q.names[hi]+'</b>은 <b>'+q.names[lo]+'</b>보다 몇 개 더 많을까요?';q.reveal=cs[hi]+' − '+cs[lo]+' = '+q.ans+'개';numOpts(q.ans);}
        else{const x=R.int(0,vs.length-1);q.ans=cs[x];q.text='<b>'+q.names[x]+'</b>은 몇 개일까요?';q.reveal=q.ans+'개';numOpts(q.ans);}}}
    q.sort=['sortonly','count','most','table','graph'].includes(q.ty);q.vals=valsOf(q.attr||attr);q.sa=q.attr||attr;
    /* 바닥에 흩어 놓을 자리 */
    const cols=Math.ceil(Math.sqrt(n*1.7)),rows=Math.ceil(n/cols);const cells=R.shuffle([...Array(cols*rows).keys()]).slice(0,n);q.pos=cells.map(c=>[((c%cols)+.5+(R.f()-.5)*.35)/cols,((Math.floor(c/cols))+.5+(R.f()-.5)*.35)/rows]);
    q.review=q.text.replace(/<[^>]+>/g,'')+' → '+q.reveal;q.speak=q.text.replace(/<[^>]+>/g,'');return q;},
  qtime(q){return q.sort?(q.ty==='sortonly'?40:50):20;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.sort?'🤖 <b>'+ANAME[q.sa]+'</b>에 따라 상자에 정리해요!':q.text;},askSub(q){return q.sort?'단추를 끌어서 알맞은 상자에 넣어요':'알맞은 답을 눌러요';},
  isOk(q,i){return q.ty==='sortonly'?true:i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return q.ty==='sortonly'?'깨끗하게 정리했어요!':'딩동댕! '+q.reveal;},
  ptsOf(p,q,frac){return Math.max(25,Math.round(55+45*frac)-8*p.state.miss);},
  onNew(p,q){const st=p.state;st.ph=q.sort?'sort':'answer';st.miss=0;st.sel=-1;st.drag=null;st.msg='';st.placed=q.items.map(()=>-1);st.left=q.sort?q.items.length:0;st.items=q.items.map((it,k)=>({k,x:q.pos[k][0],y:q.pos[k][1],fly:0}));if(!q.sort)p.ask(q.text,'알맞은 답을 눌러요');},
  onVerdict(p,q,ok){},
  fl(p,G,k){const q=p.state.q;const f=G.fl;return[f.x+p.state.items[k].x*f.w,f.y+p.state.items[k].y*f.h];},
  rad(G,q){return clamp(Math.min(G.fl.w,G.fl.h)/(Math.sqrt(q.items.length)*2.7),G.u*.45,G.u*1.15);},
  boxes(G,q){const n=q.vals.length,gap=G.u*.3,w=(G.bw-gap*(n-1))/n;return q.vals.map((v,i)=>({x:G.bx+i*(w+gap),y:G.by,w,h:G.boxH,v}));},
  drop(p,k,bi){const st=p.state,q=st.q;const v=q.vals[bi];const it=q.items[k];if(st.placed[k]>=0||st.lock)return;
    if(it[q.sa]===v){st.placed[k]=bi;st.left--;p.Snd.tone&&p.Snd.tone(600+st.left*15,.08,'sine',.05);st.sel=-1;if(!st.left){st.mood='happy';st.mT=1.5;if(q.ty==='sortonly'){this.verdict(p,0,false);}else{st.ph='answer';p.ask(q.text,'알맞은 답을 눌러요');}}}
    else{st.miss++;st.msg='🤖 삐빅! '+nameOf(q.sa,it[q.sa])+' 상자에 넣어야 해요';st.msgT=2.5;st.mood='oops';st.mT=1;st.sel=-1;p.Snd.tone&&p.Snd.tone(180,.2,'sine',.06);}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    if(st.ph==='answer'){const i=gkHit(G.list,x,y);if(i>=0)this.verdict(p,i,false);return;}
    const r=this.rad(G,q);const bs=this.boxes(G,q);
    for(let k=q.items.length-1;k>=0;k--){if(st.placed[k]>=0)continue;const[ix,iy]=this.fl(p,G,k);if(Math.hypot(x-ix,y-iy)<r*1.25){st.drag={k,x,y,sx:x,sy:y,mv:false};return;}}
    if(st.sel>=0){const bi=gkHit(bs,x,y);if(bi>=0)this.drop(p,st.sel,bi);}},
  move(p,x,y,down){const d=p.state.drag;if(!d)return;d.x=x;d.y=y;if(Math.hypot(x-d.sx,y-d.sy)>8)d.mv=true;},
  up(p,x,y){const st=p.state,d=st.drag;if(!d)return;st.drag=null;const q=st.q;if(!q||st.lock)return;const G=this.geo(p);if(!d.mv){st.sel=d.k;p.Snd.tap&&p.Snd.tap();return;}const bi=gkHit(this.boxes(G,q),x,y);if(bi>=0)this.drop(p,d.k,bi);},
  upd(p,dt){const st=p.state;if(st.msgT>0)st.msgT-=dt;},
  hold(p){return false;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(st.ph==='answer'){const r=G.list[q.okIdx];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};}
    const k=st.placed.findIndex(v=>v<0);if(k<0)return null;const[ix,iy]=this.fl(p,G,k);const bs=this.boxes(G,q);const b=bs[q.vals.indexOf(q.items[k][q.sa])];return{k:'swipe',x:rc.left+ix,y:rc.top+iy,dx:b.x+b.w/2-ix,dy:b.y+b.h/2-iy};},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#fff1c9','#fde68a']);g.fillStyle='rgba(13,148,136,.08)';for(let i=0;i<20;i++)g.fillRect((i*83)%W,G.top+(i*61)%(H*.5),u*.2,u*.2);
    const ph=st.ph;
    /* 바닥 */
    const f=G.fl;K.card(g,f.x,f.y,f.w,f.h,u*.4,'#e7c9a0',{stroke:'#a16207',lw:Math.max(3,u*.08),blur:u*.25,dy:u*.08});g.strokeStyle='rgba(120,70,20,.2)';g.lineWidth=2;for(let i=1;i<6;i++){g.beginPath();g.moveTo(f.x+i*f.w/6,f.y+u*.1);g.lineTo(f.x+i*f.w/6,f.y+f.h-u*.1);g.stroke();}
    if(q.sort){const bs=this.boxes(G,q);const r=this.rad(G,q);
      bs.forEach((b,i)=>{const col=q.sa==='c'?COLS[b.v].c:'#fff7e0';K.card(g,b.x,b.y,b.w,b.h,u*.35,col==='#fff7e0'?col:col+'55',{stroke:q.sa==='c'?COLS[b.v].c:'#0f766e',lw:Math.max(3,u*.09),blur:u*.2,dy:u*.06});
        g.fillStyle='#0f766e';K.rr(g,b.x+b.w*.12,b.y-u*.02,b.w*.76,u*.8,u*.25);g.fill();K.txt(g,nameOf(q.sa,b.v),b.x+b.w/2,b.y+u*.38,{size:Math.min(u*.6,b.w*.14),color:'#fff',maxW:b.w*.7});
        const mem=[];st.placed.forEach((pb,k)=>{if(pb===i)mem.push(k);});const ms=Math.min(u*.55,(b.w-u*.4)/Math.max(3,Math.min(5,mem.length))/2.1,(b.h-u*1.3)/(Math.ceil(mem.length/4)+.5)/2.1);const cols=Math.max(1,Math.floor((b.w-u*.4)/(ms*2.2)));
        mem.forEach((k,j)=>{const cx=b.x+b.w/2-((Math.min(cols,mem.length)-1)*ms*2.2)/2+(j%cols)*ms*2.2,cy=b.y+u*1.2+ms+Math.floor(j/cols)*ms*2.2;btnArt(g,q.items[k],cx,cy,ms);});});
      if(ph==='sort'){q.items.forEach((it,k)=>{if(st.placed[k]>=0)return;let[ix,iy]=this.fl(p,G,k);const d=st.drag&&st.drag.k===k;if(d){ix=st.drag.x;iy=st.drag.y;}
        if(st.sel===k){g.fillStyle='rgba(250,204,21,.45)';g.beginPath();g.arc(ix,iy,r*1.4,0,TAU);g.fill();}
        g.save();if(!d){g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(ix+r*.1,iy+r*.9,r*.8,r*.2,0,0,TAU);g.fill();}btnArt(g,it,ix,iy-(d?r*.2:0),r*(d?1.15:1));g.restore();});}
      else if(q.ty==='table')this.drawTable(g,f,q,u);else if(q.ty==='graph')this.drawGraph(g,f,q,u);else if(q.ty==='count'||q.ty==='most'){K.txt(g,'상자 속 단추를 잘 세어 봐요',f.x+f.w/2,f.y+f.h/2,{size:u*.7,color:'#7c4a1e',maxW:f.w*.8});}}
    else if(q.ty==='group'){const gs=q.vals.filter(v=>q.items.some(it=>it[q.sa]===v));const n=gs.length,gap=u*.3,w=(f.w-u*.6-gap*(n-1))/n;gs.forEach((v,i)=>{const x=f.x+u*.3+i*(w+gap),y=f.y+u*.3,h=f.h-u*.6;K.card(g,x,y,w,h,u*.3,'#fffdf5',{stroke:'#0f766e',lw:3,blur:0,dy:0});const mem=q.items.filter(it=>it[q.sa]===v);const cols=Math.max(1,Math.floor(w/(u*1.1)));const ms=Math.min(u*.5,w/cols/2.2);mem.forEach((it,j)=>btnArt(g,it,x+w/2-((Math.min(cols,mem.length)-1)*ms*2.2)/2+(j%cols)*ms*2.2,y+ms*1.5+Math.floor(j/cols)*ms*2.3,ms));});}
    else{const cols=Math.ceil(Math.sqrt(q.items.length*1.8)),ms=Math.min(f.w/cols/2.3,f.h/Math.ceil(q.items.length/cols)/2.3,u*.9);q.items.forEach((it,j)=>btnArt(g,it,f.x+f.w/2-((cols-1)*ms*2.3)/2+(j%cols)*ms*2.3,f.y+f.h/2-(Math.ceil(q.items.length/cols)-1)*ms*1.15+Math.floor(j/cols)*ms*2.3,ms));K.txt(g,'단추들을 잘 살펴봐요',f.x+f.w/2,f.y+u*.45,{size:u*.6,color:'#7c4a1e',maxW:f.w*.8});}
    /* 로봇 + 말풍선 */
    if(ph==='sort'||st.msgT>0){const rs=Math.min(u*1.8,G.oh*.55);robot(g,G.bx+rs*.8,G.oy+G.oh*.62,rs,st.mood,t);}
    if(ph==='sort'||st.msgT>0){const m=st.msgT>0?st.msg:(st.left?'단추를 끌어서 상자에 넣어요 · '+st.left+'개 남았어요':'');if(m){const bw=Math.min(W*.6,u*16),bh=Math.min(u*1.5,G.oh);K.card(g,G.bx+(G.bw-bw)/2,G.oy+(G.oh-bh)/2,bw,bh,u*.4,'#fffdf5',{stroke:'#0f766e',lw:3,blur:0,dy:0});K.txt(g,m,W/2,G.oy+G.oh/2,{size:u*.6,color:st.msgT>0?'#be123c':INK,maxW:bw*.92});}}
    if(ph==='answer')G.list.forEach((r,i)=>{let s='idle';if(st.lock)s=i===q.okIdx?'ok':(i===st.pick?'bad':'dim');QK.card(g,u,r,q.labels[i],s,{fill:'#fffdf5',bd:'#0f766e',ink:INK,rad:u*.4,blur:0});});
    if(st.qmax>0&&!st.lock){const bw=Math.min(W*.4,u*8);QZ.bar(g,W-bw-u*.3,G.top+u*.0,bw,Math.max(6,u*.18),st.qt/st.qmax,{good:TEAL});}
    K.card(g,u*.3,G.top-u*.15,u*2.8,u*.7,u*.35,'rgba(255,253,245,.95)',{stroke:'#0f766e',lw:3,blur:0,dy:0});K.txt(g,'🧵 '+(st.okN||0)+'번 정리',u*.3+u*1.4,G.top+u*.2,{size:u*.42,color:INK,maxW:u*2.5});
  },
  drawTable(g,f,q,u){const n=q.vs.length+2,cs=Math.min(f.w/(n+.5),f.h/4.2),w=cs*n,x0=f.x+(f.w-w)/2,y0=f.y+(f.h-cs*2)/2;const head=[ANAME[q.attr].slice(0,2)].concat(q.names).concat(['합계']);const row=['수(개)'].concat(q.cs.map((c,j)=>j===q.miss?'?':c)).concat([q.miss===q.vs.length?'?':q.items.length]);
    for(let c=0;c<n;c++)[head,row].forEach((arr,r)=>{const x=x0+c*cs,y=y0+r*cs;const qm=arr[c]==='?';g.fillStyle=qm?'#fde68a':(r===0||c===0)?'#ccfbf1':'#fff';g.fillRect(x,y,cs,cs);g.strokeStyle='#115e59';g.lineWidth=Math.max(2,u*.06);g.strokeRect(x,y,cs,cs);K.txt(g,String(arr[c]),x+cs/2,y+cs/2,{size:Math.min(cs*.34,u*.8),color:qm?ROSE:INK,maxW:cs*.92});});},
  drawGraph(g,f,q,u){const mx=Math.max(...q.cs,1),n=q.vs.length,cw=Math.min(f.w/(n+1.2),u*3),ch=Math.min((f.h-u*1.6)/(mx+.3),cw*.7),x0=f.x+(f.w-cw*n)/2,y1=f.y+f.h-u*1.1;
    q.cs.forEach((c,j)=>{const x=x0+j*cw;K.txt(g,q.names[j],x+cw/2,y1+u*.5,{size:Math.min(u*.55,cw*.2),color:INK,maxW:cw*.95});for(let r=0;r<mx;r++){const cy=y1-(r+.5)*ch;g.strokeStyle='rgba(17,94,89,.2)';g.lineWidth=2;g.strokeRect(x+cw*.1,cy-ch*.5,cw*.8,ch);if(r<c){g.fillStyle=q.sa==='c'?COLS[q.vs[j]].c:TEAL;g.beginPath();g.arc(x+cw/2,cy,Math.min(ch,cw)*.32,0,TAU);g.fill();g.strokeStyle='#334155';g.lineWidth=2;g.stroke();}}});
    g.strokeStyle='#115e59';g.lineWidth=Math.max(3,u*.08);g.beginPath();g.moveTo(x0,y1);g.lineTo(x0+cw*n,y1);g.stroke();},
};
QZ.mix(GAME,{say:true,pts0:55,pts1:45,okMs:1700,badMs:3000});
Engine.boot(GAME);
