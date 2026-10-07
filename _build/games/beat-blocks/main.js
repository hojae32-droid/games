/* 3~6학년 음악 · 박자와 음표·쉼표의 길이 — 박자 블록
   디자인: 장난감 블록 공장. 음표 블록의 길이가 곧 박자! 마디의 빈칸에 길이가 꼭 맞는 블록을 끼워 마디를 완성하고, 내가 만든 리듬을 연주해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1b2a49';
const D=M.DUR;
const BC={w:'#e63946',wr:'#9aa5b1',h:'#f4a261',hr:'#9aa5b1',hd:'#f6c445',q:'#2a9d8f',qr:'#9aa5b1',dq:'#e76f51',e:'#1d6fd1',er:'#9aa5b1',s:'#8e44ad'};
const SETS={
  basic:{metres:[[2,4],[3,4],[4,4],[4,4]],kinds:['w','h','q','e','hd'],opts:['w','hd','h','q','e']},
  rest:{metres:[[2,4],[3,4],[4,4],[4,4]],kinds:['h','q','e','hr','qr','er','hd'],opts:['h','q','e','hr','qr','er','hd']},
  adv:{metres:[[3,4],[4,4],[4,4],[6,8],[6,8]],kinds:['h','hd','q','dq','e','s','qr','er'],opts:['hd','h','dq','q','e','s','qr','er']},
};
const LV={
  basic:{label:'음표로 마디 채우기',desc:'2/4 · 3/4 · 4/4박자, 온·2분·4분·8분음표',tag:'3~4학년',ic:'🧱'},
  rest:{label:'쉼표도 함께',desc:'2분쉼표 · 4분쉼표 · 8분쉼표가 섞여요',tag:'4~5학년',ic:'🤫'},
  adv:{label:'점음표와 16분음표',desc:'점2분·점4분·16분음표, 6/8박자',tag:'5~6학년',ic:'🧩'},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="3" y="22" width="18" height="16" rx="3" fill="#e63946" stroke="#1b2a49" stroke-width="3"/><rect x="21" y="22" width="12" height="16" rx="3" fill="#1d6fd1" stroke="#1b2a49" stroke-width="3"/><rect x="33" y="22" width="12" height="16" rx="3" fill="#f6c445" stroke="#1b2a49" stroke-width="3"/><circle cx="12" cy="19" r="3" fill="#e63946" stroke="#1b2a49" stroke-width="2"/><circle cx="27" cy="19" r="3" fill="#1d6fd1" stroke="#1b2a49" stroke-width="2"/><circle cx="39" cy="19" r="3" fill="#f6c445" stroke="#1b2a49" stroke-width="2"/></svg>';
function brick(g,x,y,w,h,kind,u,o){o=o||{};const col=o.col||BC[kind];g.save();
  if(o.shadow!==false){K.rr(g,x,y+u*.12,w,h,u*.25);g.fillStyle='rgba(27,42,73,.35)';g.fill();}
  K.rr(g,x,y,w,h,u*.25);g.fillStyle=col;g.fill();g.lineWidth=Math.max(3,u*.1);g.strokeStyle=o.line||INK;g.stroke();
  g.fillStyle='rgba(255,255,255,.28)';K.rr(g,x+u*.12,y+u*.1,w-u*.24,h*.22,u*.12);g.fill();
  const ns=Math.max(1,Math.round(w/(u*1.5)));for(let i=0;i<ns;i++){const cx=x+w*(i+.5)/ns;g.fillStyle=col;g.beginPath();g.ellipse(cx,y-u*.02,Math.min(u*.4,w/ns*.3),u*.16,0,0,TAU);g.fill();g.lineWidth=Math.max(2,u*.07);g.strokeStyle=o.line||INK;g.stroke();}
  const isRest=kind.endsWith('r');M.note(g,kind,x+w*(w>u*2.4?.38:.4),y+h*.7,Math.min(h*.8,u*2.6,w*2.0),isRest?'#fff':'#fff');
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    g.fillStyle='#ffe27a';g.fillRect(0,0,W0,H0);const u=Math.min(W0,H0)/6;const kinds=['q','q','h','e','e','q'];const durs=[1,1,2,.5,.5,1];const rail=Math.min(W0*.84,u*10);let x=W0/2-rail/2;const tot=6;const y=H0*.5;const ph=(T*.7)%2;
    K.rr(g,x-u*.3,y-u*1.0,rail+u*.6,u*2.4,u*.3);g.fillStyle='rgba(255,255,255,.7)';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
    kinds.forEach((k,i)=>{const w=durs[i]/tot*rail;const drop=clamp(1-(T*1.6-i*.5)%4,0,1);if(T*1.6%4>i*.5||true){brick(g,x+1,y-u*.7-(ph<1?drop*u*.8:0),w-3,u*1.6,k,u*.6);}x+=w;});
    K.txt(g,'4',W0/2-rail/2-u*.9,y-u*.1,{size:u*1.2,color:INK});K.txt(g,'4',W0/2-rail/2-u*.9,y+u*.7,{size:u*1.2,color:INK});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'beat-blocks',title:'박자 블록',title1:'블록 공장 리듬 만들기',title2:'박자 블록',emoji:LOGO,
  subtitle:'3~6학년 음악 · 박자와 음표·쉼표의 길이',
  howto:'마디의 <b>?</b> 빈칸에 길이가 꼭 맞는 음표(쉼표) 블록을 골라요. 블록은 <b>길이가 곧 박자</b>예요! 박자표만큼 딱 채워야 해요. 마디가 완성되면 내가 만든 리듬이 연주돼요.',
  how:p=>({basic:'<b>음표</b> 블록으로 마디 채우기',rest:'<b>쉼표</b>도 함께 마디 채우기',adv:'<b>점음표·16분음표</b>, 6/8박자'}[p.levelId]),
  theme:{c1:'#e63946',c2:'#1d6fd1'},hero:heroScene,vignette:.03,durs:[90,120,180],levelTitle:'어떤 블록으로 만들까요?',
  txt:{who:'누가 블록 장인일까요?',dur:'작업 시간',pace:'생각하는 시간',seat:'번 장인 ',go:'블록 쌓기 시작!',s1:'1. 블록',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>박자표</b>(4/4)의 위 숫자는 한 마디의 박 수, 아래 숫자는 <b>4분음표를 한 박</b>으로 센다는 뜻이에요.</li>
    <li>음표의 길이: 온음표 4박 · 점2분음표 3박 · 2분음표 2박 · 4분음표 1박 · 8분음표 ½박 · 16분음표 ¼박. 점이 붙으면 길이가 절반만큼 더 늘어나요.</li>
    <li><b>쉼표</b>는 소리를 내지 않고 쉬는 길이예요. 같은 이름의 음표와 길이가 같아요 (4분쉼표 = 1박).</li>
    <li>6/8박자는 8분음표 한 개를 한 박으로 세고, 점4분음표(8분음표 3개)가 큰 한 박이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const q=st.q;const top=(p.top||0)+u*.4;const land=W>=H*1.1;const pad=u*.4;const sigW=u*1.8;const rx=pad+sigW,rw=W-rx-pad;const mh=Math.min(u*3.4,(H-top)*.2);const ry=top+u*1.1;
    const n=4;const oy=ry+mh+u*2.4;let opts=[];const cols=land?4:2,rows=land?1:2;const gap=u*.3;const ow=(W-pad*2-gap*(cols-1))/cols;const oh=Math.min((H-oy-u*.9-gap*(rows-1))/rows,u*5);for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);opts.push({x:pad+c*(ow+gap),y:oy+r*(oh+gap),w:ow,h:oh});}
    return{W,H,u,top,land,rx,rw,ry,mh,sigW,pad,opts};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,playT:-1,playI:-1});this.newQ(p);},
  fill(R,T,kinds,G){for(let tries=0;tries<300;tries++){const out=[];let t=0,ok=true;while(t<T-1e-9){const room=T-t,pos=t%G;let cand=kinds.filter(k=>{const d=D[k];if(d>room+1e-9)return false;if(d>=G-1e-9)return pos<1e-9&&Math.abs((d/G)-Math.round(d/G))<1e-9||pos<1e-9&&G===1;return pos+d<=G+1e-9;});
      if(G===1.5)cand=cand.filter(k=>k!=='h'&&k!=='hd'&&k!=='qr');if(!cand.length){ok=false;break;}
      const w=cand.map(k=>({w:4,wr:4,hd:2,h:3,hr:1.5,q:5,qr:2,dq:3,e:3,er:1.5,s:1.4}[k]||1));let r=R.f()*w.reduce((a,b)=>a+b,0),k=cand[0];for(let i=0;i<cand.length;i++){if((r-=w[i])<=0){k=cand[i];break;}}
      if(k==='s'){if(room<.5-1e-9||pos+.5>G+1e-9)continue;out.push('s','s');t+=.5;continue;}out.push(k);t+=D[k];}
      if(ok&&out.length>=2&&!out.every(k=>k.endsWith('r')))return out;}
    return G===1.5?['dq','dq']:['q','q','q','q'].slice(0,Math.round(T));},
  make(p,L){const R=p.R,S=SETS[L];const met=R.pick(S.metres),T=met[0]*4/met[1];const G=met[1]===8?1.5:1;const kinds=G===1.5?['dq','q','e','er']:S.kinds.filter(k=>D[k]<=T);const notes=this.fill(R,T,kinds,G);
    let gi;do{gi=R.int(0,notes.length-1);}while(notes[gi]==='s'&&R.f()<.8);const ans=notes[gi],dur=D[ans];let pool=R.shuffle(S.opts.filter(k=>Math.abs(D[k]-dur)>1e-9&&D[k]<=T+1));const opts=R.shuffle([ans,...pool.slice(0,3)]);
    const fmt=(d)=>met[1]===8?'8분음표 '+d*2+'개 길이':d>=1?(d+'박').replace('1.5','1½').replace('.5','½'):(d===.5?'½박':'¼박');
    return{met,T,notes,gi,ans,opts,okIdx:opts.indexOf(ans),text:'',reveal:M.KNAME[ans]+'는 '+fmt(dur),review:M.KNAME[ans]+'('+fmt(dur)+') — '+met[0]+'/'+met[1]+'박자 마디',speak:'',fmt};},
  qtime(){return 16;},askHtml(q){return '🧱 '+q.met[0]+'/'+q.met[1]+'박자 · 빈칸에 꼭 맞는 블록은?';},askSub(q){return '한 마디는 '+(q.met[1]===8?'8분음표 '+q.met[0]+'개':'4분음표 '+q.T+'개')+' 길이예요';},
  isOk(q,i){const k=q.opts[i];return k===q.ans||(Math.abs(D[k]-D[q.ans])<1e-9&&k.endsWith('r')===q.ans.endsWith('r'));},tipOf(q){return q.reveal;},goodTip(q){return '딱 맞아요! '+q.reveal;},
  onVerdict(p,q,ok,i){const st=p.state;st.chosen=i>=0?q.opts[i]:null;if(ok){const spb=q.met[1]===8?.33:.5;const t=M.now()+.2;let tt=0;q.notes.forEach(k=>{if(!k.endsWith('r'))M.hit('wood',t+tt*spb,.7,{vol:M.vol(p),hi:tt%1===0});tt+=D[k];});for(let b=0;b<q.T;b+=(q.met[1]===8?1.5:1))M.hit('hat',t+b*spb,.25,{vol:M.vol(p)*.6});st.playT=st.T+.2;st.spb=spb;}},
  onNew(p,q){const st=p.state;st.chosen=null;st.playT=-1;st.playI=-1;},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;if(st.playT>=0){const beat=(st.T-st.playT)/st.spb;let acc=0,idx=-1;q.notes.forEach((k,i)=>{if(beat>=acc&&beat<acc+D[k])idx=i;acc+=D[k];});st.playI=idx;}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=G.opts.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  key(p,e){const n=Number(e.key);const st=p.state;if(st.q&&!st.lock&&n>=1&&n<=4)this.verdict(p,n-1,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.opts[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,['#ffe27a','#ffd23f']);
    /* 마디 레일 */
    const T=q.T,sc=G.rw/T;const ry=G.ry,mh=G.mh;K.rr(g,G.rx-u*.25,ry-u*.7,G.rw+u*.5,mh+u*1.7,u*.3);g.fillStyle='rgba(255,255,255,.75)';g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke();
    K.txt(g,String(q.met[0]),G.rx-G.sigW*.45,ry+mh*.2,{size:Math.min(u*1.6,mh*.5),color:INK});K.txt(g,String(q.met[1]),G.rx-G.sigW*.45,ry+mh*.72,{size:Math.min(u*1.6,mh*.5),color:INK});
    const gapOn=!st.lock;let x=G.rx;const cw=q.met[1]===8?T/q.met[0]*0+1:1;
    /* 박 눈금 */
    const unit=q.met[1]===8?.5:1,bn=q.met[1]===8?q.met[0]:q.T;
    for(let b=0;b<=bn;b++){const bx=G.rx+b*unit*sc;g.strokeStyle='rgba(27,42,73,.3)';g.lineWidth=2;g.setLineDash([4,5]);g.beginPath();g.moveTo(bx,ry-u*.5);g.lineTo(bx,ry+mh+u*.9);g.stroke();g.setLineDash([]);if(b<bn)K.txt(g,String(b+1),bx+unit*sc/2,ry+mh+u*.62,{size:u*.55,color:'rgba(27,42,73,.7)'});}
    q.notes.forEach((k,i)=>{const w=D[k]*sc;const isGap=i===q.gi;const playing=st.playI===i;
      if(isGap&&!st.lock){const pul=.5+.5*Math.sin(t*5);K.rr(g,x+3,ry,w-6,mh,u*.25);g.fillStyle=`rgba(230,57,70,${.12+.12*pul})`;g.fill();g.setLineDash([u*.25,u*.2]);g.lineWidth=4;g.strokeStyle='#e63946';g.stroke();g.setLineDash([]);K.txt(g,'?',x+w/2,ry+mh/2,{size:Math.min(mh*.6,w*.7),color:'#e63946'});}
      else if(isGap){const ch=st.chosen||q.ans,cw2=D[ch]*sc;const ok=st.res==='ok';
        if(!ok){K.rr(g,x+3,ry,w-6,mh,u*.25);g.setLineDash([u*.25,u*.2]);g.lineWidth=3;g.strokeStyle='rgba(230,57,70,.6)';g.stroke();g.setLineDash([]);}
        brick(g,x+3,ry,Math.max(8,cw2-6),mh,ch,u,{line:ok?INK:'#e63946'});
        if(!ok){K.txt(g,cw2>w?'넘쳐요!':'모자라요!',x+w/2,ry-u*.45,{size:u*.6,color:'#e63946',stroke:'#fff',lw:u*.15,maxW:u*4});}}
      else{g.save();if(playing){g.translate(0,-u*.25);}brick(g,x+3,ry,w-6,mh,k,u);g.restore();}
      x+=w;});
    if(st.lock&&st.res==='ok'){K.txt(g,'🎶 내가 만든 리듬!',W/2,ry-u*.55,{size:u*.7,color:INK,maxW:W*.8});}
    /* 시간 막대 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.14,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#2a9d8f'});}
    /* 보기 블록 */
    const maxD=Math.max(...q.opts.map(k=>D[k]));
    G.opts.forEach((r,i)=>{const k=q.opts[i];let s='idle';if(st.lock){if(i===q.okIdx)s='ok';else if(i===st.pick)s='bad';else s='dim';}
      g.save();g.globalAlpha=s==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,u*.3,s==='ok'?'#dcfce7':s==='bad'?'#fee2e2':'#ffffff',{stroke:s==='ok'?'#16a34a':s==='bad'?'#dc2626':INK,lw:4,blur:0,dy:0});
      const bwid=Math.max(u*1.3,(r.w-u*.8)*(D[k]/maxD)),bh=Math.min(r.h*.5,u*2.6);brick(g,r.x+(r.w-bwid)/2,r.y+r.h*.18,bwid,bh,k,u*.8);
      K.txt(g,M.KNAME[k],r.x+r.w/2,r.y+r.h*.82,{size:Math.min(r.h*.17,u*.8),color:INK,maxW:r.w*.9});K.txt(g,String(i+1),r.x+u*.4,r.y+u*.45,{size:u*.5,color:'rgba(27,42,73,.45)'});g.restore();});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.2,'#fff',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🧱 '+(st.okN||0)+'마디 완성',u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.44,color:INK,maxW:u*3.3});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:2100,badMs:2700});
Engine.boot(GAME);
