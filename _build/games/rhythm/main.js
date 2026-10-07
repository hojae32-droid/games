/* 3~6학년 음악 · 박자와 리듬 치기 — 리듬 히어로
   디자인: 무대 조명 아래 꼬마 드러머. 오른쪽에서 흘러오는 음표가 노란 선에 닿는 순간 큰북을 쳐요. 쉼표에서는 쉬어요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#4a1d0a';
const LV={
  slow:{label:'천천히 연습 (♩=60)',desc:'4분음표 · 8분음표 · 4분쉼표, 느린 박자',tag:'3학년',ic:'🐢',bpm:60,met:4,bank:'basic'},
  basic:{label:'4분음표와 8분음표',desc:'♩ ♫ 𝅗𝅥 와 4분쉼표 · 4/4박자',tag:'3~4학년',ic:'🥁',bpm:84,met:4,bank:'basic'},
  waltz:{label:'3/4박자 리듬',desc:'쿵짝짝, 세 박자로 흘러가요',tag:'4학년',ic:'💃',bpm:96,met:3,bank:'waltz'},
  adv:{label:'점음표와 16분음표',desc:'점4분음표, 16분음표, 8분쉼표',tag:'5~6학년',ic:'🔥',bpm:80,met:4,bank:'adv'},
  fast:{label:'빠르게 도전 (♩=108)',desc:'점음표·16분음표를 빠르게',tag:'도전',ic:'⚡',bpm:108,met:4,bank:'adv'},
};
const U={q:[[1,0,'q']],e2:[[.5,0,'e'],[.5,0,'e']],h:[[2,0,'h']],qr:[[1,1,'qr']],dq:[[1.5,0,'dq'],[.5,0,'e']],s4:[[.25,0,'s'],[.25,0,'s'],[.25,0,'s'],[.25,0,'s']],er:[[.5,1,'er'],[.5,0,'e']],es2:[[.5,0,'e'],[.25,0,'s'],[.25,0,'s']],hd:[[3,0,'hd']]};
const BANK={basic:[['q',4],['e2',3],['h',2],['qr',1.5]],waltz:[['q',4],['e2',3],['h',1.5],['qr',1],['hd',.6]],adv:[['q',3],['e2',2.5],['dq',2],['s4',1.5],['er',1.5],['es2',1.2],['h',1],['qr',1]]};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><ellipse cx="24" cy="20" rx="17" ry="8" fill="#fff7ec" stroke="#4a1d0a" stroke-width="3"/><path d="M7 20v14c0 5 8 8 17 8s17-3 17-8V20" fill="#ff5a1f" stroke="#4a1d0a" stroke-width="3"/><path d="M36 4l-10 12M12 4l10 12" stroke="#4a1d0a" stroke-width="3" stroke-linecap="round"/></svg>';
function stage(g,W,H,u,t,flash){K.vgrad(g,0,0,W,H,['#ffb36b','#ff7a3d','#d94a1a']);g.save();g.globalAlpha=.16+flash*.3;g.fillStyle='#fff';for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(W/2,-H*.1);g.lineTo(W/2+k*W*.18-W*.05,H);g.lineTo(W/2+k*W*.18+W*.05,H);g.closePath();g.fill();}g.restore();
  g.fillStyle='rgba(74,29,10,.35)';g.fillRect(0,H*.86,W,H*.14);}
function drummer(g,x,y,s,t,hit){g.save();g.translate(x,y);g.lineJoin='round';g.lineWidth=Math.max(2,s*.06);g.strokeStyle=INK;
  const bob=Math.sin(t*4)*s*.02;
  g.fillStyle='#b6804a';g.beginPath();g.ellipse(0,-s*.55+bob,s*.34,s*.32,0,0,TAU);g.fill();g.stroke();
  g.beginPath();g.arc(-s*.28,-s*.8+bob,s*.12,0,TAU);g.fill();g.stroke();g.beginPath();g.arc(s*.28,-s*.8+bob,s*.12,0,TAU);g.fill();g.stroke();
  g.fillStyle='#e7c39a';g.beginPath();g.ellipse(0,-s*.46+bob,s*.16,s*.12,0,0,TAU);g.fill();g.stroke();
  g.fillStyle=INK;g.beginPath();g.arc(-s*.12,-s*.6+bob,s*.04,0,TAU);g.fill();g.beginPath();g.arc(s*.12,-s*.6+bob,s*.04,0,TAU);g.fill();g.beginPath();g.arc(0,-s*.5+bob,s*.04,0,TAU);g.fill();
  g.fillStyle='#3a86ff';K.rr(g,-s*.3,-s*.28+bob,s*.6,s*.4,s*.1);g.fill();g.stroke();
  for(const d of[-1,1]){g.save();g.translate(d*s*.3,-s*.16+bob);g.rotate(d*(.5)+(hit&&d===(hit%2?1:-1)?-d*.9:0));g.strokeStyle='#7a4f22';g.lineWidth=Math.max(2,s*.05);g.beginPath();g.moveTo(0,0);g.lineTo(0,s*.45);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(0,s*.47,s*.06,0,TAU);g.fill();g.restore();}
  g.restore();}
function drum(g,cx,cy,r,press,col){g.save();g.translate(cx,cy+(press?r*.04:0));K.shadow&&K.shadow(g,0,r*.9,r,r*.12,.3);
  K.rr(g,-r,-r*.35,r*2,r*.9,r*.15);g.fillStyle=col||'#ff5a1f';g.fill();g.lineWidth=Math.max(3,r*.05);g.strokeStyle=INK;g.stroke();
  g.fillStyle='rgba(255,255,255,.25)';for(let i=-4;i<=4;i++){g.beginPath();g.moveTo(i*r*.22,-r*.3);g.lineTo(i*r*.22+r*.1,r*.5);g.lineTo(i*r*.22-r*.1,r*.5);g.closePath();g.fill();}
  g.beginPath();g.ellipse(0,-r*.35,r,r*.32,0,0,TAU);g.fillStyle=press?'#fff3c4':'#fff7ec';g.fill();g.stroke();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;const beat=T*1.6;const pulse=(beat%1)<.18?1:0;stage(g,W0,H0,u,T,pulse);drum(g,W0*.5,H0*.72,Math.min(W0*.2,u*1.7),pulse,'#ff5a1f');drummer(g,W0*.5,H0*.58,u*2.2,T,Math.floor(beat));
    const y=H0*.2;g.strokeStyle='rgba(74,29,10,.5)';g.lineWidth=3;g.beginPath();g.moveTo(u*.4,y);g.lineTo(W0-u*.4,y);g.stroke();[['q',0],['e',1],['e',1.5],['h',2.5],['q',4]].forEach(([k,b])=>{const x=W0*.2+((b-beat*.6)%4+4)%4*W0*.16;M.note(g,k,x,y,u*1.2,INK);});
    g.fillStyle='#ffe14d';g.fillRect(W0*.2-3,y-u*1.1,6,u*1.6);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'rhythm',title:'리듬 히어로',title1:'꼬마 드러머 무대',title2:'리듬 히어로',emoji:LOGO,
  subtitle:'3~6학년 음악 · 박자와 리듬 치기',
  howto:'음표가 오른쪽에서 흘러와요. 음표가 <b>노란 선</b>에 닿는 순간 큰북을 톡! 쳐요. (스페이스바나 화면 아무 곳도 돼요) <b>쉼표</b>에서는 쉬어요. 정확할수록 <b>딱 맞아요!</b> 점수가 커지고, 8번 연속으로 맞히면 보너스!',
  how:p=>(LV[p.levelId].label+' · ♩='+LV[p.levelId].bpm+' · '+LV[p.levelId].met+'/4박자'),
  theme:{c1:'#ff5a1f',c2:'#3a86ff'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 리듬을 칠까요?',
  txt:{who:'누가 드러머일까요?',dur:'공연 시간',pace:'빠르기 조절',seat:'번 드러머 ',go:'공연 시작!',s1:'1. 리듬',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>박</b>은 음악의 규칙적인 흐름이에요. 4분음표 한 개가 한 박이고, 8분음표는 두 개가 한 박이에요.</li>
    <li><b>4/4박자</b>는 한 마디에 4박(강 약 중강 약), <b>3/4박자</b>는 3박(강 약 약)이에요. 첫 박이 가장 세요.</li>
    <li><b>쉼표</b>에서는 소리를 내지 않고 박만 세요. 쉼표도 음표와 같은 길이를 가져요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const L=LV[p.levelId];const top=(p.top||0)+u*.4;const pad=u*.35;const land=W>=H*1.1;const laneH=Math.max(u*4,(H-top)*(land?.36:.3));const lane={x:pad,y:top+u*.9,w:W-pad*2,h:laneH};const lineX=lane.x+Math.max(u*1.2,lane.w*.16);const MET=L.met;const ppb=Math.max(60,Math.min(200,lane.w/(MET+(p.levelId==='adv'||p.levelId==='fast'?1.2:2))));
    const dy=lane.y+lane.h+u*.5;const dr=Math.min((H-dy-pad)/1.1,W*.28,u*3.6);return{W,H,u,L,top,pad,land,lane,lineX,ppb,MET,drum:{x:W/2,y:dy+dr*.55,r:dr},dy,dr};},
  init(p){const st=p.state;Object.assign(st,{T:0,clk:0,notes:[],nextBar:0,bars:0,sched:0,a0:0,streak:0,best:0,judge:'',judgeT:0,judgeC:'',flash:0,hitN:0,pr:{},okN:0,fx:[],started:false,mood:'neutral',lastTap:-9});},
  start(p){const st=p.state,L=LV[p.levelId];const spb=60/L.bpm;st.spb=spb;st.started=true;st.a0=M.now()+.35+spb*L.met;st.clk=-(.35+spb*L.met);st.sched=-spb*L.met;st.notes=[];st.nextBar=0;st.bars=0;p.ask('🥁 <b>'+L.label+'</b>',L.met+'/4박자 · ♩='+L.bpm+' · 노란 선에서 톡!');},
  makeBar(p){const R=p.R,L=LV[p.levelId],bank=BANK[L.bank];const pickUnit=room=>{const ok=bank.filter(([k])=>U[k].reduce((a,b)=>a+b[0],0)<=room);const tot=ok.reduce((a,b)=>a+b[1],0);let r=R.f()*tot;for(const[k,w]of ok){if((r-=w)<=0)return k;}return ok[0][0];};
    for(let tries=0;tries<20;tries++){let room=L.met;const out=[];while(room>0){const k=pickUnit(room);const len=U[k].reduce((a,b)=>a+b[0],0);out.push(k);room-=len;}if(!out.every(k=>U[k].every(n=>n[1])))return out;}return['q','q','q','q'].slice(0,L.met);},
  addBar(p){const st=p.state,L=LV[p.levelId];const units=this.makeBar(p);let beat=st.nextBar;units.forEach(k=>U[k].forEach(n=>{st.notes.push({beat,t:beat*st.spb,len:n[0],rest:!!n[1],kind:n[2],bar:st.bars,hit:false,missed:false});beat+=n[0];}));st.nextBar+=L.met;st.bars++;},
  schedule(p){const st=p.state,L=LV[p.levelId],spb=st.spb,MET=L.met;if(!M.lead(p))return;const until=st.clk+.5;
    while(st.sched<until){const bi=Math.round(st.sched/spb),inBar=((bi%MET)+MET)%MET,when=st.a0+st.sched;
      if(bi<0){M.hit('wood',when,.9,{hi:inBar===0});}
      else{M.hit('wood',when,inBar===0?.55:.32,{hi:inBar===0,rev:.05});
        if(MET===4){if(inBar===0||inBar===2)M.hit('kick',when,.55);if(inBar===1||inBar===3)M.hit('hat',when,.4);M.hit('hat',when+spb/2,.25);}else{if(inBar===0)M.hit('kick',when,.55);else M.hit('hat',when,.35);}
        if(inBar===0){const c=[[48,52,55],[45,48,52],[41,45,48],[43,47,50]][Math.floor(bi/MET)%4];M.chord('pad',c,when,spb*MET*.95,.55,{rev:.3});M.play('piano',c[0]-12,when,spb*MET*.9,.45,{vol:.8});}}
      st.sched+=spb;}},
  update(p,dt){const st=p.state;if(!st.started)return;st.T+=dt;st.clk+=dt;M.decay(st,dt);if(st.judgeT>0)st.judgeT-=dt;if(st.flash>0)st.flash-=dt*3;const G=this.geo(p);this.schedule(p);
    const beatNow=st.clk/st.spb;while((st.nextBar-beatNow)*G.ppb<G.lane.w*1.6)this.addBar(p);
    for(const n of st.notes){if(!n.hit&&!n.rest&&!n.missed&&st.clk-n.t>.15){n.missed=true;st.streak=0;this.judge(p,'놓쳤어요','miss');p.hit(false,{review:'박자에 맞춰 치지 못했어요 · '+LV[p.levelId].met+'/4박자 ♩='+LV[p.levelId].bpm,tip:undefined,quiet:true});}}
    st.notes=st.notes.filter(n=>st.clk-n.t<st.spb*LV[p.levelId].met*2);st.fx=st.fx.filter(f=>(f.t+=dt)<.6);},
  judge(p,txt,cls){const st=p.state;st.judge=txt;st.judgeC=cls;st.judgeT=.7;},
  tap(p){const st=p.state;if(!st.started||!p.active)return;const G=this.geo(p);M.press(st,'d',.12);M.hit('clap',null,.5,{vol:M.vol(p)*.9});st.hitN++;const t=st.clk;let best=null,bd=1;for(const n of st.notes){if(n.hit||n.rest||n.missed)continue;const d=Math.abs(n.t-t);if(d<bd){bd=d;best=n;}}
    const px=G.lineX,py=G.lane.y;
    if(best&&bd<=.075){best.hit=true;best.q='perfect';st.streak++;st.okN++;this.judge(p,'딱 맞아요!','perfect');p.hit(true,{pts:30,x:px,y:py,quiet:true});st.flash=1;for(let k=0;k<8;k++)st.fx.push({x:px,y:G.lane.y+G.lane.h*.5,a:k/8*TAU,t:0});this.combo(p);}
    else if(best&&bd<=.15){best.hit=true;best.q='good';st.streak++;st.okN++;this.judge(p,'좋아요','good');p.hit(true,{pts:15,x:px,y:py,quiet:true});this.combo(p);}
    else if(t>-.2){const inRest=st.notes.some(n=>n.rest&&t>=n.t-.05&&t<n.t+n.len*st.spb-.05);st.streak=0;this.judge(p,inRest?'쉿! 쉼표예요':'박자가 어긋났어요','off');p.hit(false,{review:inRest?'쉼표에서는 치지 않고 쉬어요':'음표가 노란 선에 닿는 순간에 쳐요',quiet:true});}},
  combo(p){const st=p.state;if(st.streak>0&&st.streak%8===0){p.hit(true,{pts:20,x:p.W/2,y:this.geo(p).lane.y,tip:'🔥 '+st.streak+'연속! +20',tipMs:900});}},
  down(p,x,y){this.tap(p);},
  key(p,e){if(e.code==='Space'||e.key==='j'||e.key==='f'){e.preventDefault&&e.preventDefault();this.tap(p);}},
  botAct(p){const st=p.state;if(!st.started)return null;const G=this.geo(p);const n=st.notes.find(n=>!n.hit&&!n.rest&&!n.missed);if(!n)return null;if(Math.abs(n.t-st.clk)<.06||(n.t-st.clk<.1&&n.t-st.clk>0)){const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.drum.x,y:rc.top+G.drum.y};}return null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,L=G.L;stage(g,W,H,u,t,Math.max(0,st.flash));const lane=G.lane;
    K.card(g,lane.x,lane.y,lane.w,lane.h,u*.3,'rgba(255,247,236,.94)',{stroke:INK,lw:4,blur:u*.2,dy:u*.1});
    const my=lane.y+lane.h*.5,sz=Math.min(lane.h*.34,G.ppb*.45);const beatNow=st.clk/(st.spb||.6);
    g.strokeStyle='rgba(74,29,10,.55)';g.lineWidth=3;g.beginPath();g.moveTo(lane.x+u*.3,my);g.lineTo(lane.x+lane.w-u*.3,my);g.stroke();
    g.save();K.rr(g,lane.x+u*.15,lane.y+u*.15,lane.w-u*.3,lane.h-u*.3,u*.25);g.clip();
    const X=b=>G.lineX+(b-beatNow)*G.ppb;
    /* 마디선과 박 번호 */
    for(let b=Math.floor(beatNow)-1;b<beatNow+lane.w/G.ppb+2;b++){const x=X(b),inBar=((b%L.met)+L.met)%L.met;if(inBar===0){g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.moveTo(x,my-sz*.9);g.lineTo(x,my+sz*.5);g.stroke();}
      if(b>=0)K.txt(g,String(inBar+1),x,my+sz*.9,{size:u*.5,color:inBar===0?'#d94a1a':'rgba(74,29,10,.5)'});}
    st.notes.forEach(n=>{const x=X(n.beat);if(x<lane.x-u||x>lane.x+lane.w+u)return;const col=n.q==='perfect'?'#16a34a':n.q==='good'?'#2f80ed':n.missed?'#dc2626':INK;g.save();if(n.hit)g.globalAlpha=.45;M.note(g,n.kind,x,my,sz,col);g.restore();
      if(!n.rest){const c=n.q==='perfect'?'#16a34a':n.q==='good'?'#2f80ed':n.missed?'#dc2626':'rgba(74,29,10,.35)';g.fillStyle=c;g.beginPath();g.arc(x,my+sz*.55,Math.max(4,G.ppb*.05),0,TAU);g.fill();}});
    g.restore();
    /* 노란 선 */
    g.fillStyle='#ffc800';g.fillRect(G.lineX-3,lane.y+u*.1,6,lane.h-u*.2);K.glow(g,G.lineX,my,u*1.6,'#ffe14d',.3+Math.max(0,st.flash)*.4);
    for(const f of st.fx){const r=u*(.5+f.t*3);g.fillStyle=`rgba(255,200,0,${1-f.t/.6})`;g.beginPath();g.arc(G.lineX+Math.cos(f.a)*r,f.y+Math.sin(f.a)*r,u*.14,0,TAU);g.fill();}
    if(st.clk<0){const c=Math.ceil(-st.clk/st.spb);if(c<=L.met)K.txt(g,String(c),G.lineX+u*3,my-sz*.2,{size:u*2.2,color:'#ff5a1f',stroke:'#fff',lw:u*.2});}
    /* 위 표시 */
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.3,'#fff7ec',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,L.met+'/4 · ♩='+L.bpm,u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.44,color:INK,maxW:u*3.3});
    if(st.judgeT>0){const jc={perfect:'#16a34a',good:'#2f80ed',miss:'#dc2626',off:'#dc2626'}[st.judgeC];K.txt(g,st.judge,G.lineX+u*3.4,lane.y-u*.1,{size:u*.9,color:jc,stroke:'#fff',lw:u*.18,maxW:u*8});}
    if(st.streak>1)K.txt(g,st.streak+'연속',lane.x+lane.w-u*1.8,lane.y-u*.1,{size:u*.7,color:'#d94a1a',stroke:'#fff',lw:u*.15,maxW:u*3});
    /* 드러머와 큰북 */
    drummer(g,Math.max(u*1.6,G.drum.x-G.drum.r*1.7),G.drum.y+G.drum.r*.45,Math.min(G.drum.r*.95,u*2),t,st.hitN);drum(g,G.drum.x,G.drum.y,G.drum.r,st.pr.d>0,'#ff5a1f');K.txt(g,'톡!',G.drum.x,G.drum.y-G.drum.r*.3,{size:G.drum.r*.5,color:'#d94a1a',maxW:G.drum.r*1.6});
  },
};
Engine.boot(GAME);
