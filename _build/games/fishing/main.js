/* 5~6학년 사회 · 국토와 생활 · 인권과 법 · 우리 경제 — 개념 낚시
   디자인: 노을 지는 항구 낚시 대회. 뜻풀이를 읽고 알맞은 낱말 물고기를 낚아요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#7c2d12';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M10 8v14a8 8 0 0 0 16 0" fill="none" stroke="#7c2d12" stroke-width="3.5" stroke-linecap="round"/><path d="M10 8h-4" stroke="#7c2d12" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="32" cy="34" rx="11" ry="7" fill="#fb923c" stroke="#7c2d12" stroke-width="3"/><path d="M42 34l5-5v10z" fill="#fb923c" stroke="#7c2d12" stroke-width="2.5" stroke-linejoin="round"/><circle cx="27" cy="32" r="1.8" fill="#7c2d12"/></svg>';
const DECKS=/*@@DECKS@@*/;
const W=/*@@Q@@*/;
const FISH=['#FF8A3D','#FFC93C','#5ED3F3','#FF6FA3','#9BE15D','#B49CFF'];
const NF=4;
function sea(g,W0,H0,u,t,wl){K.vgrad(g,0,0,W0,wl,['#ff9a62','#ffd08a','#fff0c9']);K.glow(g,W0*.8,wl-u*.5,u*4,'#fff3b0',.7);g.fillStyle='#fde68a';g.beginPath();g.arc(W0*.8,wl-u*.4,u*1.1,0,TAU);g.fill();
  K.clouds(g,W0,wl*1.4,t*.5,.12,2,u*1.6);
  K.vgrad(g,0,wl,W0,H0-wl,['#1fa5c4','#0f6f9a','#0a3d66']);
  g.save();g.globalAlpha=.25;g.strokeStyle='#fff';g.lineWidth=2;for(let k=0;k<4;k++){g.beginPath();for(let x=0;x<=W0;x+=14){const y=wl+u*.15+k*u*1.1+Math.sin(x/50+t*1.2+k)*u*.1;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}g.restore();
  for(let i=0;i<8;i++){const x=(i*211)%W0,y=H0-((t*u*.6+i*83)%(H0-wl));g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.5;g.beginPath();g.arc(x,y+wl*0,u*(.1+(i%3)*.05),0,TAU);g.stroke();}
  K.emo(g,'🌿',W0*.06,H0-u*.5,u*1.3);K.emo(g,'🪸',W0*.9,H0-u*.5,u*1.5);K.emo(g,'🌿',W0*.5,H0-u*.4,u*1.1);}
function fishArt(g,x,y,w,h,col,dir,t,text,u,o){o=o||{};g.save();g.translate(x,y);g.scale(dir<0?-1:1,1);if(o.rot)g.rotate(o.rot);
  const lw=Math.max(2.5,u*.08);const wag=Math.sin(t*8+x*.02)*h*.12;
  if(o.glow)K.glow(g,0,0,w*.9,'#fde047',.8);
  g.fillStyle=col;g.strokeStyle=INK;g.lineWidth=lw;g.lineJoin='round';
  g.beginPath();g.moveTo(-w*.42,0);g.lineTo(-w*.62,-h*.45+wag);g.lineTo(-w*.62,h*.45+wag);g.closePath();g.fill();g.stroke();
  g.beginPath();g.ellipse(w*.04,0,w*.46,h*.5,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.3)';g.beginPath();g.ellipse(w*.04,-h*.22,w*.34,h*.14,0,0,TAU);g.fill();
  g.fillStyle=K.shade(col,-.2);g.beginPath();g.moveTo(-w*.05,-h*.48);g.quadraticCurveTo(w*.1,-h*.82+wag,w*.22,-h*.46);g.closePath();g.fill();g.stroke();
  g.restore();
  /* 글자는 뒤집지 않아요 */
  K.txt(g,text,x+(dir<0?w*.0:w*.0),y+h*.02,{size:Math.min(h*.36,u*1.15),color:'#fff',stroke:INK,lw:Math.max(3,h*.09),maxW:w*.78});
  g.save();g.translate(x,y);g.scale(dir<0?-1:1,1);g.fillStyle='#fff';g.beginPath();g.arc(w*.32,-h*.12,h*.1,0,TAU);g.fill();g.fillStyle=INK;g.beginPath();g.arc(w*.34,-h*.12,h*.05,0,TAU);g.fill();g.restore();}
function boatArt(g,x,y,s,t){g.save();g.translate(x,y+Math.sin(t*2)*s*.03);g.rotate(Math.sin(t*1.7)*.03);const lw=Math.max(2.5,s*.05);g.strokeStyle=INK;g.lineWidth=lw;g.lineJoin='round';
  g.fillStyle='#fff';g.beginPath();g.moveTo(0,-s*1.1);g.lineTo(s*.55,-s*.2);g.lineTo(0,-s*.2);g.closePath();g.fill();g.stroke();g.fillStyle='#f97316';g.beginPath();g.moveTo(-s*.08,-s*.95);g.lineTo(-s*.5,-s*.2);g.lineTo(-s*.08,-s*.2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#9a3412';g.beginPath();g.moveTo(-s*.7,-s*.18);g.lineTo(s*.7,-s*.18);g.lineTo(s*.5,s*.18);g.lineTo(-s*.5,s*.18);g.closePath();g.fill();g.stroke();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const WS=['독도','헌법','수출','희소성','갯벌'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const wide=W0>H0*1.25;const u=wide?H0/7:Math.min(W0,H0)/7;const wl=H0*.38;sea(g,W0,H0,u,T,wl);const bx=W0*(.3+.1*Math.sin(T*.5));boatArt(g,bx,wl-u*.1,u*1.3,T);
    const d=(Math.sin(T*.8)*.5+.5);g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(bx+u*.3,wl-u*1.1);g.lineTo(bx+u*.3,wl+d*(H0-wl)*.6);g.stroke();
    WS.forEach((w,i)=>{const fx=((T*u*(.5+i*.15)+i*W0*.27)%(W0+u*5))-u*2.5;fishArt(g,fx,wl+u*1.3+i*(H0-wl-u*2)/5,u*2.6,u*1.2,FISH[i%6],1,T,w,u);});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'fishing',title:'개념 낚시',title1:'노을 항구 낚시 대회',title2:'개념 낚시',emoji:LOGO,
  subtitle:'5~6학년 사회 · 국토 · 인권과 법 · 경제',
  howto:'위쪽 뜻풀이를 읽고 알맞은 낱말 물고기를 낚아요. 물 위를 누르면 배가 그쪽으로 가서 <b>낚싯바늘</b>을 내려요. 물고기가 지나갈 때를 노려요! 틀린 물고기를 낚으면 그 물고기의 뜻이 나타나요.',
  how:p=>({geo:'<b>국토</b>와 우리 생활 낱말',law:'<b>인권과 법</b> 낱말',econ:'<b>우리 경제</b> 낱말'}[p.levelId]),
  theme:{c1:'#f97316',c2:'#0ea5e9'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 바다에서 낚을까요?',
  txt:{who:'누가 낚시꾼일까요?',dur:'낚시 시간',pace:'한 문제 시간',seat:'번 낚시꾼 ',go:'낚시 출발!',s1:'1. 바다',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'5~6학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li>뜻풀이를 정확히 읽으면 낱말을 알 수 있어요. 낱말의 뜻을 <b>내 말로 설명</b>해 보면 더 오래 기억나요.</li>
    <li><b>국토</b>: 독도(가장 동쪽), 마라도(가장 남쪽), 백두산(가장 높은 산), 압록강·낙동강, 갯벌·장마 같은 자연환경 낱말이 나와요.</li>
    <li><b>인권과 법</b>: 인권·헌법·법·재판·차별 같은 낱말은 서로 이어져 있어요.</li>
    <li><b>경제</b>: 생산·소비, 수출·수입·무역, 희소성처럼 짝으로 기억하면 쉬워요.</li></ul>`,
  geo(p){const W0=p.W,H0=p.H,u=p.u;const Z0=(p.top||0)+u*.4;const A=H0-Z0;const wl=Z0+A*.2;return{W:W0,H:H0,u,Z0,wl,sh:H0-wl};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,F:[],bx:.5,tx:.5,hk:null,msg:'',msgT:0,okFish:null});this.newQ(p);},
  make(p,L){const R=p.R;const w=p.deck(W[L],'dk_'+L);const others=R.shuffle(W[L].filter(x=>x!==w)).slice(0,NF-1);const words=R.shuffle([w,...others]);
    const F=words.map((wd,i)=>({w:wd,x:R.f(),y:.2+i*(.72/NF)+R.f()*.06,v:(R.f()<.5?1:-1)*(.045+R.f()*.05),col:FISH[Math.floor(R.f()*FISH.length)],caught:false,gone:false}));F.forEach(f=>f.dir=f.v>0?1:-1);
    return{w,F,text:w[1],ans:w[0],okIdx:0,reveal:w[0],review:w[1]+' → '+w[0],speak:w[1]};},
  qtime(){return 16;},askHtml(q){return '🎣 '+q.text;},askSub(){return '이 뜻을 가진 낱말 물고기를 낚아요';},
  isOk(q,i){return i===0;},tipOf(q){return '정답은 '+q.ans;},goodTip(q){return '월척! '+q.ans;},
  onNew(p,q){const st=p.state;st.F=q.F;st.hk=null;st.msg='';st.okFish=null;},
  onVerdict(p,q,ok,i,to){const st=p.state;if(to){st.msg='시간 끝! 정답은 '+q.ans;st.msgT=2;}else if(ok){st.msg='월척! '+q.ans;st.msgT=2;}},
  hold(p){return false;},
  cast(p,x){const st=p.state;if(st.lock||st.hk||!st.q)return;st.tx=clamp(x,.06,.94);st.hk={st:'move',d:0,fish:null};},
  down(p,x,y){const st=p.state;const G=this.geo(p);if(y<G.wl-G.u*.3)return;this.cast(p,x/G.W);},
  upd(p,dt){const st=p.state,G=this.geo(p);const ww=G.W,wh=G.sh;const q=st.q;if(!q)return;st.msgT-=dt;const t=st.T;
    st.F.forEach(f=>{if(f.caught||f.gone)return;f.x+=f.v*dt;if(f.x>1.12)f.x=-.12;if(f.x<-.12)f.x=1.12;});
    const fw=Math.min(G.u*3.6,ww*.34),fh=fw*.46;const hk=st.hk;
    if(hk){if(hk.st==='move'){st.bx+=(st.tx-st.bx)*Math.min(1,dt*9);if(Math.abs(st.tx-st.bx)<.01){st.bx=st.tx;hk.st='down';p.Snd.tone&&p.Snd.tone(300,.15,'sine',.04);}}
      else if(hk.st==='down'){hk.d+=dt*1.25;const hy=hk.d*wh,hx=st.bx*ww;for(const f of st.F){if(f.caught||f.gone)continue;const fx=f.x*ww,fy=f.y*wh;if(Math.abs(hx-fx)<fw*.5&&Math.abs(hy-fy)<fh*.5+6){f.caught=true;hk.fish=f;hk.st='up';p.Snd.tone&&p.Snd.tone(700,.1,'sine',.05);break;}}if(hk.d>=.96&&hk.st==='down')hk.st='up';}
      else if(hk.st==='up'){hk.d-=dt*(hk.fish?1.6:2.2);if(hk.fish){hk.fish.x=st.bx;hk.fish.y=hk.d+.05;}
        if(hk.d<=0){const f=hk.fish;st.hk=null;if(f){if(!st.lock){if(f===st.F.find(x=>x.w===q.w)){f.gone=true;st.okFish=f;this.verdict(p,0,false);}else{st.msg=f.w[0]+': '+f.w[1];st.msgT=2.6;p.hit(false,{review:q.review,tip:f.w[0]+' — '+f.w[1],tipMs:2600});f.caught=false;f.x=p.R.f()<.5?-.12:1.12;f.y=.2+p.R.f()*.7;}}else f.caught=false;}}}
    }else st.bx+=(st.tx-st.bx)*Math.min(1,dt*6);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.hk)return null;const G=this.geo(p);const f=st.F.find(x=>x.w===q.w);if(!f||f.gone)return null;const rc=p.cv.getBoundingClientRect();
    /* 물고기가 올 위치를 미리 계산해서 던져요 */const tt=(.04+f.y*.6)/1.25+.25;const fx=clamp(f.x+f.v*tt,.08,.92);return{k:'click',x:rc.left+fx*G.W,y:rc.top+G.wl+G.sh*.3};},
  draw(p,g){const st=p.state,G=this.geo(p),W0=G.W,H0=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;sea(g,W0,H0,u,t,G.wl);const ww=W0,wh=G.sh;
    if(!st.lock&&st.qmax>0){const bw=Math.min(W0*.5,u*10);QZ.bar(g,W0/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#f97316'});}
    const bx=st.bx*ww;boatArt(g,bx,G.wl-u*.1,u*1.5,t);
    const hk=st.hk;const d=hk?Math.max(0,hk.d):0;const hy=G.wl+d*wh;g.strokeStyle='#fff';g.lineWidth=Math.max(2,u*.05);g.beginPath();g.moveTo(bx+u*.35,G.wl-u*1.3);g.lineTo(bx+u*.35,G.wl);g.lineTo(bx,G.wl);if(hk&&hk.st!=='move')g.lineTo(bx,hy);g.stroke();
    if(hk&&hk.st!=='move'){g.strokeStyle='#e5e7eb';g.lineWidth=Math.max(3,u*.1);g.beginPath();g.arc(bx-u*.12,hy+u*.05,u*.16,Math.PI*1.9,Math.PI*1.0,true);g.stroke();}
    const fw=Math.min(u*3.6,ww*.34),fh=fw*.46;
    st.F.forEach(f=>{if(f.gone&&!(st.okFish===f&&st.rT<1))return;let fx=f.x*ww,fy=G.wl+f.y*wh+Math.sin(t*2+f.y*20)*4;let rot=0,glow=false;if(f.caught){rot=-1.1;fx=bx;fy=G.wl+(f.y)*wh;glow=true;}
      if(st.lock&&!f.caught&&f.w===q.w&&st.res==='bad')glow=true;if(f.gone){fy-=st.rT*u*2;}g.save();if(f.gone)g.globalAlpha=Math.max(0,1-st.rT);fishArt(g,fx,fy,fw,fh,f.col,f.dir,t,f.w[0],u,{rot,glow});g.restore();});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W0/2,H0-u*.8,{size:Math.min(u*.8,W0*.045),color:st.res==='ok'?'#fef08a':'#fff',stroke:INK,lw:u*.15,maxW:W0*.94});
    if(st.res==='ok')for(let k=0;k<8;k++){const a=k/8*TAU+t*3;K.txt(g,'✨',bx+Math.cos(a)*u*1.5,G.wl+u*1.5+Math.sin(a)*u,{size:u*.5,alpha:Math.max(0,1-st.rT)});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.4,'rgba(255,255,255,.9)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🐟 월척 '+(st.okN||0)+'마리',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.4});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1500,badMs:2000});
Engine.boot(GAME);
