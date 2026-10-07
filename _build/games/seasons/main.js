/* 3~5학년 사회 · 세시 풍속과 계절 생활 · 우리나라의 계절과 기후 — 계절 돌림판
   디자인: 계절 놀이공원 룰렛. 돌림판 화살표가 가리키는 계절에 따라 배경이 봄·여름·가을·겨울로 바뀌어요. 알맞은 계절에서 쿵! 멈춰요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b3a55';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff" stroke="#2b3a55" stroke-width="3.5"/><path d="M24 24V5a19 19 0 0 1 19 19z" fill="#8bd36b"/><path d="M24 24h19a19 19 0 0 1-19 19z" fill="#3ba7e8"/><path d="M24 24v19A19 19 0 0 1 5 24z" fill="#f39a3d"/><path d="M24 24H5A19 19 0 0 1 24 5z" fill="#b9d7f2"/><circle cx="24" cy="24" r="19" fill="none" stroke="#2b3a55" stroke-width="3.5"/><circle cx="24" cy="24" r="4" fill="#fff" stroke="#2b3a55" stroke-width="2.5"/></svg>';
const DECKS=/*@@DECKS@@*/;
const S=/*@@S@@*/;
const Q=/*@@Q@@*/;
const BG=[['#bdeab0','#f9d6e4'],['#8fd3ff','#d4f1ff'],['#ffd199','#ffb877'],['#dcecff','#f6fbff']];
function fall(g,W,H,t,s,u,alpha){g.save();g.globalAlpha=alpha;
  for(let i=0;i<22;i++){const sp=.25+((i*37)%10)/25,x=((i*97+t*sp*20*(s===1?0:1))%100)/100*W,y=((i*53)%100/100*H+t*u*sp*(s===1?-.4:1.2))%H;const yy=y<0?y+H:y;
    if(s===0){g.fillStyle='#ffb3c8';g.beginPath();g.ellipse(x+Math.sin(t+i)*u*.3,yy,u*.16,u*.09,t+i,0,TAU);g.fill();}
    else if(s===1){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.arc(x,yy,u*(.1+(i%4)*.05),0,TAU);g.stroke();}
    else if(s===2){g.fillStyle=['#e8590c','#f08c00','#c92a2a'][i%3];g.beginPath();g.ellipse(x+Math.sin(t*1.3+i)*u*.4,yy,u*.17,u*.1,t*1.5+i,0,TAU);g.fill();}
    else{g.fillStyle='#fff';g.beginPath();g.arc(x+Math.sin(t+i)*u*.25,yy,u*(.06+(i%3)*.03),0,TAU);g.fill();}}
  g.restore();}
function bgScene(g,W,H,u,t,s,prev,k){const draw=(si,a)=>{g.save();g.globalAlpha=a;K.vgrad(g,0,0,W,H,[BG[si][0],BG[si][1]]);
    if(si===1){K.glow(g,W*.85,H*.18,u*4,'#fff7b0',.8);g.fillStyle='#ffe066';g.beginPath();g.arc(W*.85,H*.18,u*.9,0,TAU);g.fill();}
    g.fillStyle=['#7ac96b','#43b36a','#c9822f','#ffffff'][si];g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=20)g.lineTo(x,H*.86+Math.sin(x/90+si)*u*.3);g.lineTo(W,H);g.closePath();g.fill();
    fall(g,W,H,t,si,u,1);g.restore();};
  if(prev!==s&&k<1){draw(prev,1);draw(s,k);}else draw(s,1);}
function wheelArt(g,cx,cy,R,ang,u,hi,lost,t){g.save();g.translate(cx,cy);
  K.shadow&&K.shadow(g,0,R*.1,R*.95,R*.12,.28);
  g.rotate(ang*Math.PI/180);
  for(let i=0;i<4;i++){const a0=i*Math.PI/2-Math.PI/2,a1=a0+Math.PI/2;g.beginPath();g.moveTo(0,0);g.arc(0,0,R,a0,a1);g.closePath();g.fillStyle=S[i][2];g.fill();
    if(hi===i){g.fillStyle=lost?'rgba(0,0,0,.18)':'rgba(255,255,255,.4)';g.fill();}
    g.lineWidth=Math.max(2,R*.025);g.strokeStyle='#fff';g.stroke();
    const am=(a0+a1)/2;g.save();g.rotate(am+Math.PI/2);K.emo(g,S[i][1],0,-R*.62,R*.34);K.txt(g,S[i][0],0,-R*.34,{size:R*.2,color:'#fff',stroke:INK,lw:R*.045,maxW:R*.5});g.restore();}
  g.lineWidth=Math.max(4,R*.06);g.strokeStyle=INK;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();
  for(let i=0;i<8;i++){const a=i*TAU/8-Math.PI/2+Math.PI/8*0;g.fillStyle=i%2?'#ffd43b':'#fff';g.beginPath();g.arc(Math.cos(a)*R*1.0,Math.sin(a)*R*1.0,Math.max(3,R*.035),0,TAU);g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();}
  g.restore();
  g.fillStyle='#fff';g.beginPath();g.arc(cx,cy,R*.13,0,TAU);g.fill();g.lineWidth=Math.max(3,R*.04);g.strokeStyle=INK;g.stroke();g.fillStyle='#ff6b8b';g.beginPath();g.arc(cx,cy,R*.06,0,TAU);g.fill();}
function pointer(g,cx,cy,R,bump){g.save();g.translate(cx,cy-R-R*.02);g.rotate(Math.sin(bump*30)*.25*Math.max(0,1-bump*2));const s=R*.16;g.lineJoin='round';g.fillStyle='#ff4d6d';g.strokeStyle=INK;g.lineWidth=Math.max(3,R*.035);
  g.beginPath();g.moveTo(0,s*1.5);g.lineTo(-s,-s*.5);g.quadraticCurveTo(0,-s*1.2,s,-s*.5);g.closePath();g.fill();g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(0,-s*.15,s*.3,0,TAU);g.fill();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false,ang=0;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;ang+=dt*(90+60*Math.sin(T*.7));size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;const seg=Math.floor((((360-(ang%360))+360)%360)/90)%4;bgScene(g,W0,H0,u,T,seg,seg,1);const R=Math.min(W0*.34,H0*.36);wheelArt(g,W0/2,H0*.56,R,ang,u,-1,false,T);pointer(g,W0/2,H0*.56,R,10);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'seasons',title:'계절 돌림판',title1:'계절 놀이공원 룰렛',title2:'계절 돌림판',emoji:LOGO,
  subtitle:'3~5학년 사회 · 계절과 우리 생활',
  howto:'돌림판이 빙글빙글 돌아요. 카드에 적힌 일이 어느 계절인지 생각하고, 화살표가 그 계절에 왔을 때 <b>멈춰!</b>를 눌러요. 화면 아무 곳이나 눌러도 돼요. 맞힐수록 돌림판이 빨라지고, 한가운데에 멈추면 <b>보너스</b>!',
  how:p=>({customs:'<b>세시 풍속</b>과 계절 생활의 계절 찾기',climate:'우리나라 <b>기후</b>의 계절 찾기'}[p.levelId]),
  theme:{c1:'#ff6b8b',c2:'#3ba7e8'},hero:heroScene,vignette:.03,durs:[90,150,240],levelTitle:'어떤 돌림판을 돌릴까요?',
  txt:{who:'누가 돌림판을 멈출까요?',dur:'놀이 시간',pace:'한 판 시간',seat:'번 도전자 ',go:'돌림판 출발!',s1:'1. 돌림판',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:d.tag,t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>세시 풍속</b>: 설날(떡국·세배)·단오(그네·창포물)·추석(송편·강강술래)·동지(팥죽)처럼 철마다 하는 풍속이 있어요.</li>
    <li>우리나라는 <b>사계절</b>이 뚜렷해요. 봄에는 황사와 꽃샘추위, 여름에는 장마·태풍·열대야, 가을에는 단풍과 맑은 하늘, 겨울에는 한파가 있어요.</li>
    <li>여름에는 <b>남동 계절풍</b>(덥고 습함), 겨울에는 <b>북서 계절풍</b>(춥고 건조함)이 불어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.6;const btnH=Math.min(u*1.7,H*.13);const A=H-top-btnH-u*.5;const R=Math.max(20,Math.min(W*.42,A/2-u*.5));return{W,H,u,top,btnH,R,cx:W/2,cy:top+u*.7+R,btn:{x:W/2-Math.min(W*.4,u*5),y:H-btnH-u*.25,w:Math.min(W*.8,u*10),h:btnH}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,ang:p.R.f()*360,spd:110,ph:'play',v:0,seg:0,prev:0,sk:1,bump:9,perf:false,hi:-1,flash:0});this.newQ(p);},
  make(p,L){const it=p.deck(Q[L],'dk_'+L);const a=S[it[0]];return{it,ans:a[0],okIdx:it[0],text:it[2],ic:it[1],reveal:a[1]+' '+a[0],review:it[2]+' → '+a[0],speak:it[2]};},
  qtime(){return 14;},askHtml(q){return q.ic+' '+q.text;},askSub(){return '화살표가 알맞은 계절에 오면 멈춰!';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.reveal;},goodTip(q){return '딩동! '+q.reveal+'의 모습이에요';},
  ptsOf(p,q,frac){return Math.round(50+50*frac)+(p.state.perf?10:0);},
  onNew(p,q){const st=p.state;st.ph='play';st.hi=-1;st.perf=false;},
  onVerdict(p,q,ok,i,to){const st=p.state;st.hi=i;if(ok)st.spd=Math.min(260,st.spd+14);else st.spd=Math.max(100,st.spd-10);},
  hold(p){return p.state.ph!=='play';},
  segAt(a){const top=((360-(a%360))+360)%360;return Math.floor(top/90)%4;},
  stopIt(p){const st=p.state;if(!st.q||st.lock||st.ph!=='play')return;st.ph='brake';st.v=st.spd;p.Snd.tone&&p.Snd.tone(500,.06,'square',.04);},
  down(p,x,y){this.stopIt(p);},
  upd(p,dt){const st=p.state,q=st.q;const sp=st.spd*Math.min(1.3,Math.max(.85,p.pace));st.bump+=dt;
    if(st.ph==='play')st.ang+=sp*dt;
    else if(st.ph==='brake'){st.v=Math.max(0,st.v-sp*3.2*dt);st.ang+=st.v*dt;if(st.v<=0){st.ph='done';const s=this.segAt(st.ang);const within=((((360-(st.ang%360))+360)%360)%90);st.perf=Math.abs(within-45)<=10;st.bump=0;this.verdict(p,s,false);}}
    const s=this.segAt(st.ang);if(s!==st.seg){st.prev=st.seg;st.seg=s;st.sk=0;if(st.ph==='play'||st.ph==='brake')p.Snd.tone&&p.Snd.tone(300+s*60,.03,'triangle',.02);}st.sk=Math.min(1,st.sk+dt*4);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.ph!=='play')return null;const within=((((360-(st.ang%360))+360)%360)%90);const s=this.segAt(st.ang);
    const want=q.okIdx;/* 알맞은 계절 한가운데가 가까워질 때 눌러요 */const lead=st.spd*st.spd/(2*st.spd*3.2);const target=want*90+45;const cur=((360-(st.ang%360))+360)%360;let d=(target-cur+360)%360;
    if(d>lead-6&&d<lead+6){const G=this.geo(p);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.cx,y:rc.top+G.btn.y+G.btn.h/2};}return null;},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;
    const segNow=this.segAt(st.ang);bgScene(g,W,H,u,t,segNow,st.prev,st.sk);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.14,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#3bb273'});}
    wheelArt(g,G.cx,G.cy,G.R,st.ang,u,st.lock?st.hi:-1,st.lock&&st.res==='bad',t);pointer(g,G.cx,G.cy,G.R,st.bump);
    if(st.lock&&st.res==='ok'){K.txt(g,st.perf?'🎯 한가운데! +10':'딩동!',G.cx,G.cy+G.R+u*.5,{size:u*.9,color:'#fff',stroke:INK,lw:u*.18,maxW:W*.9});}
    /* 멈춰 버튼 */
    const b=G.btn,press=st.ph!=='play';K.rr(g,b.x,b.y+(press?u*.08:0),b.w,b.h,b.h/2);g.fillStyle=press?'#b3b3b3':'#ff4d6d';g.fill();g.lineWidth=Math.max(3,u*.1);g.strokeStyle=INK;g.stroke();
    K.txt(g,press?(st.lock?(st.res==='ok'?'💮 정답':'다음 판…'):'… 멈추는 중'):'✋ 멈춰!',b.x+b.w/2,b.y+b.h/2+(press?u*.08:0),{size:Math.min(b.h*.55,u*1.1),color:'#fff',stroke:INK,lw:u*.14,maxW:b.w*.8});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.4,'rgba(255,255,255,.92)',{stroke:INK,lw:3,blur:0,dy:0});K.txt(g,'🎡 '+(st.okN||0)+'번 성공',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.4});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1300,badMs:2300});
Engine.boot(GAME);
