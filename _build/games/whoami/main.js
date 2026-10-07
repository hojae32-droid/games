/* 5학년 사회 · 우리 역사의 인물 — 역사 인물 수사 보드
   디자인: 탐정 사무소 코르크 보드. 힌트 쪽지가 하나씩 붙고 빨간 실로 이어져요. 적은 힌트로 인물을 맞히면 고득점! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3a2512',RED='#d62828';
const NOTE=['#fff4b8','#ffd6e0','#cdeefd'];
const HINT=4.2,EXTRA=7,PTS=[100,75,50];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="34" rx="3" fill="#c99a5f" stroke="#3a2512" stroke-width="3.5"/><rect x="10" y="11" width="13" height="16" fill="#fff" stroke="#3a2512" stroke-width="2"/><circle cx="16.5" cy="17" r="3" fill="#3a2512"/><path d="M11 27c1-5 11-5 12 0z" fill="#3a2512"/><rect x="27" y="12" width="12" height="7" fill="#fff4b8" stroke="#3a2512" stroke-width="1.8"/><rect x="27" y="22" width="12" height="7" fill="#ffd6e0" stroke="#3a2512" stroke-width="1.8"/><path d="M17 11L33 12M17 11L33 22" stroke="#d62828" stroke-width="2"/><circle cx="17" cy="11" r="2.4" fill="#d62828"/></svg>';
const DECKS=/*@@DECKS@@*/;
const DATA0=/*@@D@@*/;
const DATA=Object.assign({},DATA0,{all:[...DATA0.ancient,...DATA0.joseon,...DATA0.modern]});
function cork(g,x,y,w,h,u){K.rr(g,x-u*.2,y-u*.2,w+u*.4,h+u*.4,u*.18);g.fillStyle='#7a4f22';g.fill();K.rr(g,x,y,w,h,u*.1);const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,'#d9a766');gr.addColorStop(1,'#c18a4c');g.fillStyle=gr;g.fill();
  g.save();K.rr(g,x,y,w,h,u*.1);g.clip();for(let i=0;i<90;i++){g.fillStyle=i%3?'rgba(110,70,30,.28)':'rgba(255,235,190,.3)';g.beginPath();g.arc(x+((i*137)%1000)/1000*w,y+((i*251)%1000)/1000*h,1+(i%3),0,TAU);g.fill();}g.restore();}
function pin(g,x,y,r,col){g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.arc(x+r*.3,y+r*.4,r,0,TAU);g.fill();g.fillStyle=col||RED;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(x-r*.3,y-r*.3,r*.35,0,TAU);g.fill();}
function polaroid(g,x,y,w,h,u,face,state,t,name){g.save();g.translate(x+w/2,y+h/2);g.rotate(-.04);g.translate(-w/2,-h/2);K.card(g,0,0,w,h,u*.05,'#fffdf3',{stroke:'#c9bda0',lw:2,blur:u*.2,dy:u*.1});
  const m=w*.08;g.fillStyle=state==='ok'?'#d8f3dc':state==='bad'?'#ffe0e0':'#8a8a8a';g.fillRect(m,m,w-m*2,h*.72);
  if(face){K.emo(g,face,w/2,m+h*.36,Math.min(w*.62,h*.5));}
  else{g.fillStyle='#3d3d3d';g.beginPath();g.arc(w/2,m+h*.26,w*.17,0,TAU);g.fill();g.beginPath();g.ellipse(w/2,m+h*.62,w*.3,h*.22,0,Math.PI,TAU);g.fill();K.txt(g,'?',w/2,m+h*.36,{size:w*.3,color:'rgba(255,255,255,.75)'});}
  K.txt(g,name,w/2,h*.89,{size:Math.min(w*.16,u*.8),color:state==='bad'?'#a00':INK,maxW:w*.86});g.restore();}
function note(g,x,y,w,h,u,col,text,open,idx,tapeCol){const sc=.2+.8*Math.min(1,open);if(open<=0.01){g.save();g.globalAlpha=.45;g.translate(x+w/2,y+h/2);g.rotate((idx-1)*.03);K.rr(g,-w/2,-h/2,w,h,u*.05);g.fillStyle='rgba(255,255,255,.18)';g.fill();g.setLineDash([8,6]);g.lineWidth=2;g.strokeStyle='rgba(58,37,18,.5)';g.stroke();g.setLineDash([]);K.txt(g,'🔒 힌트 '+(idx+1),0,0,{size:Math.min(h*.3,u*.8),color:'rgba(58,37,18,.6)',maxW:w*.8});g.restore();return;}
  g.save();g.translate(x+w/2,y+h/2);g.rotate((idx-1)*.03*(1+(1-Math.min(1,open))*6));g.scale(sc,sc);g.translate(-w/2,-h/2);K.card(g,0,0,w,h,u*.05,col,{stroke:'rgba(0,0,0,.18)',lw:1.5,blur:u*.2,dy:u*.1});
  g.fillStyle='rgba(214,40,40,.85)';g.fillRect(w*.04,h*.08,Math.min(u*2,w*.26),h*.2);K.txt(g,'힌트 '+(idx+1),w*.04+Math.min(u*2,w*.26)/2,h*.18,{size:Math.min(h*.15,u*.55),color:'#fff',maxW:Math.min(u*2,w*.26)*.9});
  QK.txt(g,text,w/2,h*.62,w*.9,h*.62,Math.min(u*.74,h*.22),INK,1.2);g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const HS=['세종 대왕이 만든 글자는?','측우기와 관련 있어요','집현전을 세웠어요'];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;cork(g,u*.2,u*.2,W0-u*.4,H0-u*.4,u*.5);const k=Math.floor(T/1.3)%5;const pw=Math.min(W0*.3,u*2.6),ph=pw*1.25;const px=W0*.1,py=H0*.22;
    const nw=Math.min(W0*.45,u*4),nh=Math.min(H0*.2,u*1.3);const nx=W0*.5;
    for(let i=0;i<3;i++){const ny=H0*.2+i*(nh+u*.25);if(k>i){g.strokeStyle='#d62828';g.lineWidth=3;g.beginPath();g.moveTo(px+pw*.5,py);g.lineTo(nx+nw*.05,ny+nh*.1);g.stroke();}
      note(g,nx,ny,nw,nh,u*.7,NOTE[i],HS[i],k>i?Math.min(1,(T%1.3)*4+(k>i+1?1:0)):0,i);}
    polaroid(g,px,py,pw,ph,u*.8,k>=4?'✍️':null,k>=4?'ok':'',T,k>=4?'세종 대왕':'누구일까요?');pin(g,px+pw*.5,py,u*.14,RED);
    K.emo(g,'🔍',W0*.2+Math.cos(T)*u*.5,H0*.82+Math.sin(T*1.3)*u*.2,u*1.2,Math.sin(T)*.3);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'whoami',title:'역사 인물 수사 보드',title1:'탐정 사무소 수사 보드',title2:'역사 인물 수사 보드',emoji:LOGO,
  subtitle:'5학년 사회 · 우리 역사의 인물',
  howto:'수사 보드에 <b>힌트 쪽지</b>가 하나씩 붙어요. 누구인지 알겠으면 아래에서 <b>바로</b> 골라요! 힌트 1개에 맞히면 100점, 2개 75점, 3개 50점. 틀리면 그 인물은 놓쳐요.',
  how:p=>({ancient:'<b>고조선 ~ 고려</b>의 인물 찾기',joseon:'<b>조선</b>의 인물 찾기',modern:'<b>근현대</b>의 인물 찾기',all:'<b>모든 시대</b>의 인물 섞어서 찾기'}[p.levelId]),
  theme:{c1:'#d62828',c2:'#c99a5f'},hero:heroScene,vignette:.06,durs:[90,150,240],levelTitle:'어느 시대 인물을 수사할까요?',
  txt:{who:'누가 탐정일까요?',dur:'수사 시간',pace:'힌트 속도',seat:'번 탐정 ',go:'수사 시작!',s1:'1. 시대',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'5학년',t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>삼국</b>: 고구려(주몽·광개토대왕·장수왕·을지문덕), 백제(온조·근초고왕·계백), 신라(박혁거세·진흥왕·김유신·김춘추)의 인물이 있어요.</li>
    <li><b>고려·조선</b>: 왕건(고려 건국)·서희(담판)·강감찬(귀주 대첩) → 이성계·세종 대왕(훈민정음)·이순신(거북선)·허준(동의보감)·정약용(거중기)·김정호(대동여지도)</li>
    <li><b>근현대</b>: 전봉준(동학 농민 운동)·안중근·유관순(3·1 운동)·김구(임시 정부)·윤동주 등 나라를 되찾으려 한 분들이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.6;const pad=u*.35;const land=W>=H*1.15;let B,O;
    if(land){B={x:pad,y:top,w:W*.6-pad,h:H-top-pad};O={x:W*.6+pad*.5,y:top+u*.3,w:W*.4-pad*1.5,h:H-top-pad-u*.3,cols:1};}
    else{const bh=(H-top-pad)*.6;B={x:pad,y:top,w:W-pad*2,h:bh};O={x:pad,y:top+bh+u*.3,w:W-pad*2,h:H-top-pad-bh-u*.3,cols:2};}
    const gap=u*.25,rows=Math.ceil(4/O.cols);const ow=(O.w-gap*(O.cols-1))/O.cols,oh=(O.h-gap*(rows-1))/rows;const opts=[];for(let i=0;i<4;i++){const c=i%O.cols,r=Math.floor(i/O.cols);opts.push({x:O.x+c*(ow+gap),y:O.y+r*(oh+gap),w:ow,h:oh});}
    const m=u*.5;const pw=B.w*(land?.3:.32);const pol={x:B.x+B.w*.05,y:B.y+B.h*(land?.12:.1),w:pw,h:Math.min(pw*1.25,B.h*.7)};const nx=B.x+B.w*(land?.42:.38),nw=B.w*(land?.54:.58);const nh=(B.h-m*1.6-u*.3*2)/3;const notes=[0,1,2].map(i=>({x:nx,y:B.y+m*.8+i*(nh+u*.3),w:nw,h:nh}));
    return{W,H,u,land,B,opts,pol,notes};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,shown:1,op:[0,0,0]});this.newQ(p);},
  make(p,L){const R=p.R;const P=DATA[L];const per=p.deck(P,'dk_'+L);const others=R.shuffle(P.filter(x=>x!==per)).slice(0,3);const ch=R.shuffle([per,...others]);const hs=R.shuffle(per[2].slice());const h=[hs[0],hs[1],R.pick(per[3])];
    return{per,ch,h,okIdx:ch.indexOf(per),text:'',ans:per[0],reveal:per[0]+' — '+h[2],review:per[0]+': '+h.join(' / '),speak:''};},
  qtime(){return 2*HINT+EXTRA;},askHtml(){return '🕵️ 이 인물은 누구일까요?';},askSub(){return '힌트가 하나씩 붙어요 · 적은 힌트로 맞힐수록 점수가 커요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.ans;},goodTip(q){return '검거 완료! '+q.ans;},
  ptsOf(p,q,frac){return PTS[Math.max(0,Math.min(2,p.state.shown-1))];},
  onNew(p,q){const st=p.state;st.shown=1;st.op=[0,0,0];p.Snd.tone&&p.Snd.tone(520,.04,'sine',.03);},
  onVerdict(p,q,ok){const st=p.state;st.shown=3;},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;const sp=Math.max(.8,Math.min(1.3,p.pace));if(!st.lock){const el=st.qmax-st.qt;while(st.shown<3&&el>=st.shown*HINT/sp){st.shown++;p.Snd.tone&&p.Snd.tone(600,.05,'triangle',.03);}}
    for(let i=0;i<3;i++){const tg=i<st.shown?1:0;st.op[i]+=(tg-st.op[i])*Math.min(1,dt*7);if(Math.abs(tg-st.op[i])<.01)st.op[i]=tg;}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=G.opts.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;if(st.shown<1)return null;const G=this.geo(p);const r=G.opts[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,['#b98649','#c99a5f','#b98649']);
    const B=G.B;cork(g,B.x,B.y,B.w,B.h,u);
    const pol=G.pol;const pst=st.lock?(st.res==='ok'?'ok':'bad'):'';
    /* 빨간 실 */
    g.strokeStyle='#d62828';g.lineWidth=Math.max(2,u*.06);g.lineCap='round';G.notes.forEach((n,i)=>{if(st.op[i]<.5)return;g.beginPath();g.moveTo(pol.x+pol.w*.5,pol.y+u*.1);g.quadraticCurveTo((pol.x+n.x)/2,Math.max(pol.y,n.y)+u*.5,n.x+n.w*.06,n.y+n.h*.1);g.stroke();});
    G.notes.forEach((n,i)=>{note(g,n.x,n.y,n.w,n.h,u,NOTE[i],q.h[i],st.op[i],i);if(st.op[i]>.5)pin(g,n.x+n.w*.06,n.y+n.h*.1,u*.14,i===1?'#1d6fb8':RED);});
    polaroid(g,pol.x,pol.y,pol.w,pol.h,u,st.lock?q.per[1]:null,pst,t,st.lock?q.ans:'누구일까요?');pin(g,pol.x+pol.w*.5,pol.y+u*.1,u*.16,RED);
    if(st.lock){g.save();g.translate(pol.x+pol.w*.5,pol.y+pol.h*.45);g.rotate(-.35);const s=Math.min(1,st.rT/.2);g.globalAlpha=Math.min(1,s*1.6);const sc=1+(1-s)*1.3;g.scale(sc,sc);const col=st.res==='ok'?'#16a34a':RED;g.strokeStyle=col;g.lineWidth=u*.12;const sw=pol.w*.9;K.rr(g,-sw/2,-u*.55,sw,u*1.1,u*.12);g.stroke();K.txt(g,st.res==='ok'?'검거 완료!':'놓쳤다!',0,0,{size:Math.min(u*.8,sw*.18),color:col,maxW:sw*.9});g.restore();}
    /* 지금 맞히면 */
    const cw=Math.max(pol.w*1.1,u*3.6),cx0=pol.x-u*.1,cy0=Math.min(pol.y+pol.h+u*.35,B.y+B.h-u*.95);K.card(g,cx0,cy0,cw,u*.75,u*.1,'#fffdf3',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,st.lock?'힌트 '+Math.min(3,st.shown)+'개 사용':'지금 맞히면 '+PTS[st.shown-1]+'점',cx0+cw/2,cy0+u*.38,{size:u*.46,color:RED,maxW:cw*.92});
    /* 시간 막대 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.14,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#f4d58d'});}
    /* 용의자 카드(보기) */
    G.opts.forEach((r,i)=>{let s='idle';if(st.lock){if(i===q.okIdx)s='ok';else if(i===st.pick)s='bad';else s='dim';}QK.card(g,u,r,q.ch[i][0],s,{bd:INK,ink:INK,fill:'#fffdf3',left:u*.1});});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1700,badMs:2500});
Engine.boot(GAME);
