/* 3~6학년 음악 · 오선과 계이름 읽기 — 음표 유성우
   디자인: 별빛 밤하늘. 오선 위로 날아오는 음표 별똥별의 계이름을 눌러 빛으로 바꿔요. 점점 빨라져요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const DIA=[0,2,4,5,7,9,11],NAMES=['도','레','미','파','솔','라','시'];
const KCOL=['#ff5a5f','#ff9f1c','#ffd23f','#3bceac','#4dabf7','#7b5cff','#e64980'];
const LV={
  basic:{label:'도부터 높은 도까지',desc:'높은음자리표 오선, 덧줄 도 포함',tag:'3~4학년',ic:'🎼',range:[-2,5],base:30,key:'C'},
  wide:{label:'낮은 솔부터 높은 솔까지',desc:'덧줄 위아래까지 넓게 읽어요',tag:'5~6학년',ic:'🚀',range:[-5,9],base:28,key:'C'},
  speed:{label:'스피드 도전',desc:'도~높은 도 음표가 점점 빨리 날아와요',tag:'도전',ic:'⚡',range:[-2,5],base:44,key:'C'},
  keyG:{label:'사장조 읽기',desc:'♯ 1개 · 솔 자리가 도',tag:'5~6학년',ic:'♯',range:[-2,5],base:30,key:'G'},
  keyF:{label:'바장조 읽기',desc:'♭ 1개 · 파 자리가 도',tag:'5~6학년',ic:'♭',range:[-2,5],base:30,key:'F'},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 16h40M4 22h40M4 28h40M4 34h40M4 40h40" stroke="#ffd166" stroke-width="2"/><path d="M10 6L44 20" stroke="#7b5cff" stroke-width="3" stroke-linecap="round"/><ellipse cx="22" cy="28" rx="6" ry="4.5" transform="rotate(-22 22 28)" fill="#ffd166"/><path d="M27 27V10" stroke="#ffd166" stroke-width="3"/></svg>';
function night(g,W,H,t){K.vgrad(g,0,0,W,H,['#0e0828','#241a5e','#3a2a85']);for(let i=0;i<60;i++){const x=(i*7919%1000)/1000*W,y=(i*104729%997)/997*H;g.fillStyle=`rgba(255,255,255,${.25+.5*Math.abs(Math.sin(t*.9+i))})`;g.fillRect(x,y,1+(i%3)*.7,1+(i%3)*.7);}}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    night(g,W0,H0,T);const gap=Math.min(H0/9,W0/16),mid=H0*.5;const yOf=M.staff(g,W0*.05,W0*.95,mid,gap,'rgba(255,242,196,.7)');M.clef(g,W0*.1,yOf(2),gap,'#ffd166');
    for(let i=0;i<5;i++){const p=[0,2,4,1,3][i];const x=W0*.9-((T*gap*3+i*gap*5)%(W0*.78));const y=yOf(p);K.glow(g,x,y,gap*1.6,'#ffd166',.5);g.fillStyle='#ffd166';g.save();g.translate(x,y);g.rotate(-.38);g.beginPath();g.ellipse(0,0,gap*.7,gap*.54,0,0,TAU);g.fill();g.restore();g.strokeStyle='#ffd166';g.lineWidth=2.5;g.beginPath();g.moveTo(x+gap*.62,y);g.lineTo(x+gap*.62,y-gap*3);g.stroke();
      g.strokeStyle='rgba(255,209,102,.3)';g.lineWidth=3;g.beginPath();g.moveTo(x+gap*.3,y);g.lineTo(x+gap*4,y-gap*.2);g.stroke();}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'staff',title:'음표 유성우',title1:'별빛 악보 놀이',title2:'음표 유성우',emoji:LOGO,
  subtitle:'3~6학년 음악 · 오선 위 계이름 읽기',
  howto:'오선 위로 음표 별똥별이 날아와요. <b>맨 앞 음표</b>의 계이름 버튼을 눌러 빛으로 바꿔요! 음표가 높은음자리표에 닿기 전에 맞혀요. 시간이 갈수록 빨라지고, 틀리면 1.5초 동안 쉬어요. (키보드: 1~7)',
  how:p=>({basic:'<b>도~높은 도</b> 음표 읽기',wide:'<b>낮은 솔~높은 솔</b> 넓게 읽기',speed:'<b>스피드</b>로 빠르게 읽기',keyG:'<b>사장조</b>(♯ 1개)로 읽기',keyF:'<b>바장조</b>(♭ 1개)로 읽기'}[p.levelId]),
  theme:{c1:'#7b5cff',c2:'#ffd166'},hero:heroScene,vignette:.08,durs:[60,120,180],levelTitle:'어떤 별을 잡을까요?',
  txt:{who:'누가 별지기일까요?',dur:'관측 시간',pace:'별똥별 속도',seat:'번 별지기 ',go:'별 잡기 시작!',s1:'1. 별자리',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>높은음자리표</b>는 오선의 둘째 줄이 <b>솔</b>이라는 표예요. 줄과 칸에 따라 음 이름이 정해져요: 아래부터 미·솔·시·레·파(줄), 파·라·도·미(칸).</li>
    <li>오선 아래 첫 칸은 파, 그 아래 <b>덧줄 위의 음표</b>는 도예요. 오선 위의 덧줄은 <b>높은 라</b>예요.</li>
    <li><b>조표</b>: ♯이 하나면 사장조(솔이 도), ♭이 하나면 바장조(파가 도). 조에 따라 도의 자리가 달라져요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const L=LV[p.levelId];const top=(p.top||0)+u*.4;const keysH=Math.min(u*3.2,H*.2);const ky=H-keysH-u*.3;const skyH=ky-top-u*.2;const wide=p.levelId==='wide';
    const gap=Math.max(8,Math.min(skyH/(wide?13:10.5),W/14));const mid=top+skyH*(wide?.47:.48);const clefX=Math.max(gap*3.2,W*.08);const kw=(W-u*.6)/7;const keys=NAMES.map((n,i)=>({x:u*.3+i*kw,y:ky,w:kw-u*.12,h:keysH}));
    return{W,H,u,L,top,skyH,gap,mid,clefX,ky,keys,wide};},
  init(p){const st=p.state;Object.assign(st,{T:0,notes:[],spawnAcc:0,el:0,lockT:0,hits:0,miss:0,streak:0,lastPos:null,fx:[],msg:'',msgT:0,star:0,pr:{},mood:'neutral',okN:0,last:null});},
  KEY(p){return LV[p.levelId].key;},
  posToMidi(p,k){const KEY=this.KEY(p);const d=k+2;const oct=Math.floor(d/7),i=((d%7)+7)%7;return 60+oct*12+DIA[i]+(KEY==='G'&&i===3?1:0)-(KEY==='F'&&i===6?1:0);},
  posName(p,k){const TON={C:0,G:4,F:3}[this.KEY(p)];return NAMES[((((k+2)-TON)%7)+7)%7];},
  yOf(G,k){return G.mid+(4-k)*G.gap/2;},
  spawn(p){const st=p.state,G=this.geo(p),R=p.R,rg=G.L.range;let k;do{k=R.int(rg[0],rg[1]);}while(k===st.lastPos&&R.f()<.8);st.lastPos=k;st.notes.push({k,x:G.W+G.gap*2,alive:true,t:0});},
  front(p){return p.state.notes.find(n=>n.alive);},
  update(p,dt){const st=p.state,G=this.geo(p);st.T+=dt;st.el+=dt;M.decay(st,dt);if(st.msgT>0)st.msgT-=dt;if(st.lockT>0)st.lockT-=dt;
    const speed=G.L.base*Math.max(.8,Math.min(1.3,p.pace))*(1+Math.min(1.4,st.el/70))*(1+Math.min(.3,st.hits*.01));const v=speed/50*G.gap*2.2;
    st.spawnAcc-=dt;const tail=st.notes.length?st.notes[st.notes.length-1].x:-1e9;if(G.W+G.gap*2-tail>=G.gap*5.2&&st.spawnAcc<=0){this.spawn(p);st.spawnAcc=.2;}
    st.notes.forEach(n=>{n.t+=dt;if(n.alive)n.x-=v*dt;});
    const fr=this.front(p);if(fr&&fr.x<G.clefX+G.gap*2.2){fr.alive=false;fr.lost=true;st.streak=0;M.play('musicbox',this.posToMidi(p,fr.k)+12,null,.4,.35,{vol:.4});st.mood='oops';st.msg='놓쳤어요! 그 음은 '+this.posName(p,fr.k);st.msgT=1.6;
      p.hit(false,{pen:15,shake:false,review:'오선의 이 음표는 '+this.posName(p,fr.k)+' ('+(LV[p.levelId].key==='C'?'다장조':LV[p.levelId].key==='G'?'사장조':'바장조')+')',tip:st.msg,tipMs:1300,quiet:false});}
    st.notes=st.notes.filter(n=>n.alive||n.t<999&&(n.gone==null||n.gone<.5));st.notes.forEach(n=>{if(!n.alive)n.gone=(n.gone||0)+dt;});
    st.fx=st.fx.filter(f=>(f.t+=dt)<.7);},
  press(p,i){const st=p.state,G=this.geo(p);M.press(st,'k'+i,.15);if(!p.active||st.lockT>0)return;const n=this.front(p);if(!n)return;const ok=this.posName(p,n.k)===NAMES[i];
    if(ok){n.alive=false;n.hit=true;st.hits++;st.okN++;st.streak++;st.star=(st.star+1)%8;M.play('musicbox',this.posToMidi(p,n.k)+12,null,.6,.75,{vol:M.vol(p)});for(let k=0;k<10;k++)st.fx.push({x:n.x,y:this.yOf(G,n.k),a:k/10*TAU,t:0,c:k%3});
      const left=Math.max(0,(n.x-G.clefX)/(G.W-G.clefX));p.hit(true,{pts:20+Math.round(30*left),x:n.x,y:this.yOf(G,n.k)-G.gap*1.2,tip:this.posName(p,n.k)+'! 딩동',tipMs:600,quiet:false});st.msg=NAMES[i]+'! 딩동';st.msgT=1;st.mood='happy';
      if(st.star===0){p.hit(true,{pts:30,x:G.W/2,y:G.top+G.skyH*.3,tip:'⭐ 별자리 완성! +30',tipMs:1400});}}
    else{st.lockT=1.5;st.mood='oops';n.shake=.4;M.play('pad',45,null,.25,.6,{vol:.5});st.streak=0;st.msg='이 음은 '+NAMES[i]+'가 아니에요';st.msgT=1.6;p.hit(false,{pen:15,shake:false,review:'이 음표의 이름은 '+this.posName(p,n.k),tip:st.msg,tipMs:1100,quiet:false});}},
  down(p,x,y){const G=this.geo(p);const i=G.keys.findIndex(k=>K.inRect(x,y,k));if(i>=0)this.press(p,i);},
  key(p,e){const m={c:0,d:1,e:2,f:3,g:4,a:5,b:6,1:0,2:1,3:2,4:3,5:4,6:5,7:6}[String(e.key).toLowerCase()];if(m!=null){e.preventDefault&&e.preventDefault();this.press(p,m);}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.lockT>0)return null;const n=this.front(p);if(!n||n.x>G.W*.85)return null;const i=NAMES.indexOf(this.posName(p,n.k));const k=G.keys[i];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+k.x+k.w/2,y:rc.top+k.y+k.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;night(g,W,H,t);const gap=G.gap;const KEY=this.KEY(p);
    const yOf=M.staff(g,u*.3,W-u*.3,G.mid,gap,'rgba(255,242,196,.75)',Math.max(1.5,gap*.07));M.clef(g,G.clefX,yOf(2),gap,'#ffd166');
    const ksx=G.clefX+gap*1.9;if(KEY==='G')K.txt(g,'♯',ksx,yOf(8),{size:gap*2.2,color:'#ffd166'});if(KEY==='F')K.txt(g,'♭',ksx,yOf(4)-gap*.35,{size:gap*2.2,color:'#ffd166'});
    K.txt(g,{C:'다장조',G:'사장조 · 솔 자리가 도',F:'바장조 · 파 자리가 도'}[KEY],W-u*.4,G.top+u*1.55,{size:u*.5,color:'#b9acff',align:'right',maxW:W*.7});
    /* 맞히는 선 */
    const zx=G.clefX+gap*2.6;K.rr(g,zx,yOf(9),gap*1.6,yOf(-1)-yOf(9),gap*.5);g.fillStyle='rgba(123,92,255,.18)';g.fill();g.setLineDash([6,6]);g.lineWidth=2;g.strokeStyle='rgba(255,209,102,.6)';g.stroke();g.setLineDash([]);
    const fr=this.front(p);
    st.notes.forEach(n=>{const y=yOf(n.k),r=gap*.58;g.save();let a=1;if(!n.alive)a=Math.max(0,1-(n.gone||0)*2);g.globalAlpha=a;let x=n.x+(n.shake>0?Math.sin(t*60)*3:0);
      const col=n.lost?'#ff6b6b':n.hit?'#7cf5ff':n===fr?'#ffffff':'#ffd166';const isF=n===fr&&n.alive;
      K.glow(g,x,y,r*(isF?3.4:2.4),isF?'#fff7c2':'#ffd166',isF?.6:.35);
      g.strokeStyle='rgba(255,209,102,.35)';g.lineWidth=gap*.14;g.lineCap='round';g.beginPath();g.moveTo(x+r*1.2,y);g.lineTo(x+r*5,y-gap*.2);g.stroke();
      g.strokeStyle='rgba(255,242,196,.85)';g.lineWidth=Math.max(1.8,gap*.09);
      if(n.k<=-2)for(let k=-2;k>=n.k;k-=2){const yy=yOf(k);g.beginPath();g.moveTo(x-r*1.7,yy);g.lineTo(x+r*1.7,yy);g.stroke();}
      if(n.k>=10)for(let k=10;k<=n.k;k+=2){const yy=yOf(k);g.beginPath();g.moveTo(x-r*1.7,yy);g.lineTo(x+r*1.7,yy);g.stroke();}
      g.fillStyle=col;g.translate(x,y);g.rotate(-.38);g.beginPath();g.ellipse(0,0,r*1.22,r*.92,0,0,TAU);g.fill();g.rotate(.38);
      g.strokeStyle=col;g.lineWidth=Math.max(2,gap*.12);g.beginPath();if(n.k<4){g.moveTo(r*1.08,-2);g.lineTo(r*1.08,-gap*3.4);}else{g.moveTo(-r*1.08,2);g.lineTo(-r*1.08,gap*3.4);}g.stroke();g.restore();});
    for(const f of st.fx){const rr=gap*(.8+f.t*4);g.fillStyle=['#ffe14d','#7cf5ff','#ff8fd8'][f.c];g.globalAlpha=1-f.t/.7;g.beginPath();g.arc(f.x+Math.cos(f.a)*rr,f.y+Math.sin(f.a)*rr,gap*.2,0,TAU);g.fill();g.globalAlpha=1;}
    /* 별자리 진행: 8개를 모으면 완성 */
    const sx=u*.5,sy=G.top+u*.9;K.card(g,u*.3,(p.top||0)+u*.5,u*4.6,u*.8,u*.3,'rgba(36,26,94,.9)',{stroke:'#7b5cff',lw:2,blur:0,dy:0});
    for(let i=0;i<8;i++){const lit=i<st.star;K.txt(g,lit?'★':'☆',u*.65+i*u*.5,(p.top||0)+u*.9,{size:u*.5,color:lit?'#ffd166':'rgba(255,255,255,.4)'});}
    if(st.streak>2)K.txt(g,st.streak+'연속!',W-u*1.5,G.top+u*1.1,{size:u*.7,color:'#ff8fd8',stroke:'#05031a',lw:u*.12,maxW:u*3});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,G.mid+gap*5.6<G.ky-u*.3?G.mid+gap*5.6:G.ky-u*.4,{size:Math.min(u*.7,W*.04),color:'#fff',stroke:'#05031a',lw:u*.14,maxW:W*.94});
    if(st.lockT>0){K.txt(g,'⏳ '+st.lockT.toFixed(1)+'초 쉬어요',W/2,G.ky-u*.45,{size:u*.55,color:'#ff8fd8',maxW:W*.6});}
    /* 계이름 버튼 */
    G.keys.forEach((k,i)=>{const pr=st.pr['k'+i]>0,lock=st.lockT>0;K.rr(g,k.x,k.y+(pr?u*.08:0),k.w,k.h,u*.3);g.fillStyle=lock?'#4a3f8f':KCOL[i];g.fill();g.lineWidth=3;g.strokeStyle='#05031a';g.stroke();g.fillStyle='rgba(255,255,255,.28)';K.rr(g,k.x+u*.1,k.y+u*.08,k.w-u*.2,k.h*.25,u*.15);g.fill();
      K.txt(g,NAMES[i],k.x+k.w/2,k.y+k.h*.52+(pr?u*.08:0),{size:Math.min(k.h*.5,k.w*.62),color:'#fff',stroke:'#05031a',lw:u*.12,maxW:k.w*.9});K.txt(g,String(i+1),k.x+k.w/2,k.y+k.h*.88,{size:u*.35,color:'rgba(255,255,255,.7)'});});
  },
};
Engine.boot(GAME);
