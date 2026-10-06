/* 1~2학년 수학 · 여러 가지 모양과 도형 — 모양 택배 공장
   디자인: 주황색 택배 공장. 컨베이어 벨트를 타고 오는 상자를 벨트 끝에서 떨어지기 전에 알맞은 모양 상자에 넣어요. 상자가 5개 차면 트럭이 출발! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#7c2d12';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M7 16l17-8 17 8v18l-17 8-17-8z" fill="#fdba74" stroke="#7c2d12" stroke-width="3.2" stroke-linejoin="round"/><path d="M7 16l17 8 17-8M24 24v18" fill="none" stroke="#7c2d12" stroke-width="3.2" stroke-linejoin="round"/><path d="M15 12l17 8" stroke="#fde68a" stroke-width="4"/></svg>';
/*@@DATA@@*/
/* 그림(svg 글자)을 한 번만 만들어 두고 계속 써요 */
const IMGS={};
function svgImg(str,vb){const key=vb+str;if(IMGS[key])return IMGS[key];const im=new Image();const NS='xmlns="http://www.w3.org/2000/svg"';
  const full=str.trim().startsWith('<svg')?str.trim().replace('<svg ','<svg '+NS+' width="240" height="216" '):`<svg ${NS} viewBox="${vb}" width="240" height="240">${str}</svg>`;
  im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(full);IMGS[key]=im;return im;}
function drawSvg(g,str,vb,cx,cy,s){const im=svgImg(str,vb);if(im.complete&&im.naturalWidth)g.drawImage(im,cx-s/2,cy-s/2,s,s);}
function belt(g,x,y,w,h,u,t){K.rr(g,x,y,w,h,h*.45);g.fillStyle='#475569';g.fill();g.lineWidth=Math.max(3,u*.08);g.strokeStyle=INK;g.stroke();
  g.save();K.rr(g,x,y,w,h,h*.45);g.clip();g.fillStyle='#334155';const sp=u*.9,off=(t*u*1.6)%sp;for(let xx=x-sp+off;xx<x+w;xx+=sp){g.fillRect(xx,y+h*.2,u*.18,h*.6);}
  g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x,y,w,h*.18);g.restore();
  g.fillStyle='#fbbf24';for(let k=0;k<2;k++){g.beginPath();g.arc(x+h*.5+k*(w-h),y+h*.5,h*.28,0,TAU);g.fill();g.stroke();}}
function pbox(g,x,y,s,u){const lw=Math.max(3,u*.08);K.card(g,x,y,s,s,s*.12,'#e9b97e',{stroke:INK,lw,blur:0,dy:u*.1,sc:INK});g.fillStyle='#f3d9a4';g.fillRect(x+s*.43,y+lw*.5,s*.14,s-lw);
  K.card(g,x+s*.14,y+s*.2,s*.72,s*.7,s*.1,'#fffdf5',{stroke:'rgba(124,45,18,.35)',lw:2,blur:0,dy:0});}
function hazard(g,x,y,w,h){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='#facc15';g.fillRect(x,y,w,h);g.fillStyle='#1f2937';for(let k=-h;k<w+h;k+=h*1.4){g.beginPath();g.moveTo(x+k,y+h);g.lineTo(x+k+h*.7,y+h);g.lineTo(x+k+h*1.4,y);g.lineTo(x+k+h*.7,y);g.closePath();g.fill();}g.restore();}
function factory(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#cfeeff','#eaf7ff','#fff6e0']);K.glow(g,W*.9,H*.1,u*3,'#fde047',.45);
  /* 공장 벽 */
  g.fillStyle='#fed7aa';g.fillRect(0,H*.12,W,H);g.fillStyle='rgba(124,45,18,.07)';for(let x=0;x<W;x+=u*1.2)g.fillRect(x,H*.12,2,H);
  for(let i=0;i<4;i++){const wx=W*(.1+i*.24),wy=H*.18,ww=u*2.4,wh=u*1.1;K.rr(g,wx,wy,ww,wh,u*.15);g.fillStyle='#bae6fd';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();g.strokeStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(wx+ww/2,wy);g.lineTo(wx+ww/2,wy+wh);g.stroke();}
  hazard(g,0,H*.12,W,Math.max(5,u*.22));}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const SH=[['<rect x="-35" y="-30" width="70" height="60" fill="#f87171" stroke="#334155" stroke-width="4"/>'],['<path d="M0 -45 L45 32 L-45 32Z" fill="#60a5fa" stroke="#334155" stroke-width="4"/>'],['<circle r="40" fill="#34d399" stroke="#334155" stroke-width="4"/>'],['<polygon points="0,-44 42,-14 26,36 -26,36 -42,-14" fill="#fbbf24" stroke="#334155" stroke-width="4" stroke-linejoin="round"/>']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/7:Math.min(W,H)/7;factory(g,W,H,u,T);const by=H*.74;belt(g,-u,by,W+u*2,u*.9,u,T);
    const ps=Math.min(u*2.3,W*.2),sp=W/3;for(let i=0;i<5;i++){const x=((i*sp*.9+T*u*1.4)%(W+ps*2))-ps;const sh=SH[i%4];pbox(g,x,by-ps+u*.05,ps,u);drawSvg(g,sh[0],'-60 -60 120 120',x+ps/2,by-ps*.5,ps*.62);}
    const tx=((T*u*1.2)%(W+u*6))-u*3;K.emo(g,'🚚',tx,H*.3,u*2.2);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const BINC=['#fed7aa','#bae6fd','#bbf7d0','#fde68a','#e9d5ff'];
const GAME={
  id:'g02-shape-sort',title:'모양 택배 공장',title1:'택배 분류 대작전',title2:'모양 택배 공장',emoji:LOGO,
  subtitle:'1~2학년 · 여러 가지 모양과 도형',
  howto:'택배 상자가 컨베이어 벨트를 타고 와요! 끝에서 떨어지기 전에 알맞은 모양 상자를 <b>톡</b> 눌러 넣어요. 상자가 5개 차면 트럭이 부릉~ 출발해요!',
  how:p=>({'1-1':'<b>상자·둥근기둥·공</b> 모양 찾기','1-2':'<b>□ △ ○</b> 모양 찾기','2-1a':'<b>삼각형·사각형·오각형·육각형·원</b>','2-1b':'<b>꼭짓점과 변</b>의 수 세기'}[p.levelId]),
  theme:{c1:'#ea580c',c2:'#0ea5e9'},hero:heroScene,vignette:.04,durs:[60,120,180],levelTitle:'어떤 택배를 나를까요?',
  txt:{who:'누가 택배 기사가 될까요?',dur:'일하는 시간',pace:'벨트 속도 (한 상자 시간)',seat:'번 기사 ',go:'벨트 켜기!',s1:'1. 택배',s2:'2. 방법',s3:'3. 이름'},
  levels:[{id:'1-1',g:'1~2학년',t:'1학년 1학기 · 여러 가지 모양',d:'□ 상자 · 둥근기둥 · 공 모양'},{id:'1-2',g:'1~2학년',t:'1학년 2학기 · 여러 가지 모양',d:'□ · △ · ○ 모양'},{id:'2-1a',g:'1~2학년',t:'2학년 1학기 · 여러 가지 도형',d:'삼각형 · 사각형 · 오각형 · 육각형 · 원'},{id:'2-1b',g:'1~2학년',t:'2학년 1학기 · 꼭짓점과 변',d:'꼭짓점(변)이 몇 개일까요?'}],
  summary:`<ul><li>둥글거나 반듯한 <b>입체 모양</b>에는 <b>상자 모양(□), 둥근기둥 모양, 공 모양</b>이 있어요. 상자는 쌓기 쉽고, 둥근기둥은 눕히면 굴러요, 공은 어느 쪽으로든 잘 굴러요.</li>
    <li><b>평면 도형</b>은 □(네모), △(세모), ○(동그라미)로 나눌 수 있어요.</li>
    <li>변이 3개면 <b>삼각형</b>, 4개면 <b>사각형</b>, 5개면 <b>오각형</b>, 6개면 <b>육각형</b>이에요. 원은 꼭짓점도 변도 없는 둥근 도형이에요.</li>
    <li><b>꼭짓점</b>은 뾰족하게 만나는 점, <b>변</b>은 곧은 선이에요. 삼각형은 꼭짓점 3개, 변 3개!</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const Z0=(p.top||0)+u*1.2;const land=W>=H*1.2;const pad=Math.max(8,u*.3),gap=Math.max(7,u*.22);const A=H-Z0-pad;const q=p.state.q;const n=q?q.bins.length:3;
    const sh=A*(land?.54:.46);const sc={x:0,y:Z0,w:W,h:sh};const oR={x:pad,y:Z0+sh+gap,w:W-pad*2,h:A-sh-gap};const cols=(land||n<=3)?n:Math.ceil(n/2),rows=Math.ceil(n/cols);
    const cw=(oR.w-(cols-1)*gap)/cols,ch=Math.min((oR.h-(rows-1)*gap)/rows,u*4);const oy=(oR.h-(rows*ch+(rows-1)*gap))/2;const rects=[];for(let i=0;i<n;i++){const row=Math.floor(i/cols),inRow=row<rows-1?cols:n-cols*(rows-1);const c=i%cols;const rw=inRow*cw+(inRow-1)*gap;rects.push({x:oR.x+(oR.w-rw)/2+c*(cw+gap),y:oR.y+oy+row*(ch+gap),w:cw,h:ch});}
    const ps=Math.min(u*3.6,sh*.42);const beltY=sc.y+sh*.82;return{W,H,u,Z0,land,pad,gap,sc,oR,rects,ps,beltY,beltH:u*.9};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,bins:{},trucks:0,truckT:-1,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,fx:-12,badFix:false,dropT:0});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    if(L==='1-1'){const k=R.int(0,2);q.ans=k;q.bins=SOLID.map(s=>s.name);q.binIcon=SOLID.map(s=>s.icon);q.emo=R.pick(SOLID[k].items);q.art='';q.text='어떤 모양일까요?';q.reveal=SOLID[k].name;q.fall=8;}
    else if(L==='1-2'){const k=R.int(0,2);q.ans=k;q.bins=['□ 모양','△ 모양','○ 모양'];q.binIcon=[ic('rect'),ic('tri'),ic('circ')];q.art=flat(R,k);q.text='어떤 모양일까요?';q.reveal=q.bins[k];q.fall=7;}
    else if(L==='2-1a'){const ns=[3,4,5,6,0];const k=R.int(0,4);q.ans=k;q.bins=['삼각형','사각형','오각형','육각형','원'];q.binIcon=[polyIc(3),polyIc(4),polyIc(5),polyIc(6),ic('circ')];q.art=ns[k]?poly(R,ns[k]):`<circle r="${R.int(36,48)}" fill="${R.pick(COL)}" stroke="#334155" stroke-width="4"/>`;q.text='이 도형의 이름은?';q.reveal=q.bins[k];q.fall=9;}
    else{const n=R.int(3,6);const what=R.pick(['꼭짓점','변']);q.ans=n-3;q.bins=['3개','4개','5개','6개'];q.binIcon=null;q.art=poly(R,n,true);q.text=`<b>${what}</b>은 몇 개일까요?`;q.reveal=n+'개';q.fall=10;}
    q.okIdx=q.ans;q.review=strip(q.text)+' → '+q.reveal;q.speak=strip(q.text);return q;},
  qtime(q){return q.fall;},askHtml(q){return '📦 '+q.text;},askSub(q){return '벨트 끝에서 떨어지기 전에 알맞은 상자를 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.reveal;},
  onNew(p,q){const st=p.state;st.fx=-12;st.dropT=0;},
  onVerdict(p,q,ok,i,to){const st=p.state;st.fx=clamp((1-st.qt/st.qmax),0,1)*112-12;st.dropT=0;if(ok){const lab=q.bins[q.ans];st.bins[lab]=(st.bins[lab]||0)+1;if(st.bins[lab]>=5){st.bins[lab]=0;st.trucks++;st.truckT=0;p.Snd.tone&&p.Snd.tone(330,.2,'sine',.06);p.Snd.tone&&p.Snd.tone(392,.25,'sine',.06,.2);}}},
  upd(p,dt){const st=p.state;if(st.truckT>=0){st.truckT+=dt;if(st.truckT>2)st.truckT=-1;}if(st.res)st.dropT+=dt;if(!st.lock&&st.qmax>0)st.fx=clamp((1-st.qt/st.qmax),0,1)*112-12;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=G.rects.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const r=this.geo(p).rects[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;const sc=G.sc;factory(g,W,H,u,t);
    K.card(g,G.pad,(p.top||0)+u*.4,u*4.3,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🚚 '+st.trucks+'대 출발',G.pad+u*2.15,(p.top||0)+u*.8,{size:u*.5,color:INK,maxW:u*3.9});
    /* 벨트 */
    const by=G.beltY-sc.y+sc.y;belt(g,-u,G.beltY,W+u*2,G.beltH,u,t);
    /* 구멍(벨트 끝) */
    hazard(g,W-u*.9,G.beltY-u*.2,u*.9,G.beltH+u*.4);K.txt(g,'⚠️',W-u*.45,G.beltY-u*.8,{size:u*.7});
    /* 상자 */
    const ps=G.ps;let px=W*(st.fx/100)-ps/2+ps*0,py=G.beltY-ps+u*.15;let sc2=1,rot=0,al=1;
    if(st.res==='ok'){const f=clamp(st.dropT/.5,0,1);const r=G.rects[q.okIdx];const tx=r.x+r.w/2-ps/2,ty=r.y+r.h*.2;px=px+(tx-px)*f;py=py+(ty-py)*f*f;sc2=1-.7*f;al=1-f*.6;}
    else if(st.res==='bad'){if(st.pick===-1){const f=clamp(st.dropT/.7,0,1);py+=f*f*H*.4;rot=f*.8;al=1-f*.8;}else{px+=Math.sin(t*50)*u*.05*(st.dropT<.6?1:0);}}
    g.save();g.globalAlpha=al;g.translate(px+ps/2,py+ps/2);g.rotate(rot);g.scale(sc2,sc2);g.translate(-ps/2,-ps/2);pbox(g,0,0,ps,u);
    if(q.emo)K.emo(g,q.emo,ps/2,ps*.57,ps*.55);else drawSvg(g,q.art,'-60 -60 120 120',ps/2,ps*.55,ps*.66);g.restore();
    /* 트럭 */
    if(st.truckT>=0){const f=st.truckT/2;K.emo(g,'🚚',-u*2+(W+u*4)*f,sc.y+sc.h*.2,u*2);K.txt(g,'💨',-u*3.2+(W+u*4)*f,sc.y+sc.h*.2,{size:u*.9});}
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.2,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#ea580c'});}
    /* 상자 모양 단추 */
    G.rects.forEach((r,i)=>{const isAns=i===q.okIdx,picked=st.pick===i;let s2='idle';if(st.lock){if(isAns)s2='ok';else if(picked)s2='bad';else s2='dim';}
      const n=st.bins[q.bins[i]]||0;K.card(g,r.x,r.y,r.w,r.h,u*.3,s2==='ok'?'#dcfce7':s2==='bad'?'#fee2e2':BINC[i%5],{stroke:s2==='ok'?'#16a34a':s2==='bad'?'#dc2626':INK,lw:Math.max(3,u*.08),blur:0,dy:u*.1,sc:INK});
      const narrow=r.w<r.h*1.7;let tx=r.x+r.w/2,ty=r.y+r.h*.4;if(q.binIcon){if(narrow){const is=Math.min(r.h*.42,r.w*.5);drawSvg(g,q.binIcon[i],'0 0 40 36',r.x+r.w/2,r.y+r.h*.3,is);ty=r.y+r.h*.62;}else{const is=Math.min(r.h*.6,r.w*.38);drawSvg(g,q.binIcon[i],'0 0 40 36',r.x+r.w*.2,r.y+r.h*.42,is);tx=r.x+r.w*.6;}}
      K.txt(g,q.bins[i],tx,ty,{size:Math.min(u*.9,r.h*(narrow&&q.binIcon?.2:.3),r.w*.16*(narrow?1.6:1)),color:INK,maxW:r.w*(q.binIcon&&!narrow?.6:.9)});
      K.txt(g,'●'.repeat(n)+'○'.repeat(Math.max(0,5-n)),r.x+r.w/2,r.y+r.h*.8,{size:Math.min(u*.5,r.h*.18),color:'#ea580c',maxW:r.w*.8});});
  },
};
QZ.mix(GAME,{say:false,pts0:60,pts1:60,okMs:1000,badMs:2000});
Engine.boot(GAME);
