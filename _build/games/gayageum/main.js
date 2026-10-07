/* 5~6학년 음악 · 정간보와 율명, 가야금 연주 — 정간보 가야금
   디자인: 먹물 번지는 한지 위의 가야금. 정간보를 읽고 가야금 줄을 직접 뜯어 곡을 끝까지 연주하면, 장구 장단에 맞춰 내 연주를 들려줘요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1c2a2a',JADE='#2a9d8f',SEAL='#c1272d';
const GY_YUL=/*@@YUL@@*/;
const GY_HAN=/*@@HAN@@*/;
const GY_KO=/*@@KO@@*/;
/*@@PARSE@@*/
const GY_SONGS=/*@@SONGS@@*/;
const LV={
  song_arirang:{mode:'song',song:'arirang',label:'아리랑 연주하기',desc:'정간보를 보며 아리랑 앞부분을 끝까지',tag:'5~6학년',ic:'🪕'},
  song_ex1:{mode:'song',song:'ex1',label:'연습곡 1 「달빛 걸음」',desc:'황·태·중 세 음으로 시작해요',tag:'5학년',ic:'🌙'},
  song_ex2:{mode:'song',song:'ex2',label:'연습곡 2 「물결」',desc:'다섯 음을 오르내려요',tag:'5~6학년',ic:'🌊'},
  song_ex3:{mode:'song',song:'ex3',label:'연습곡 3 「종달새」',desc:'청황까지, 나눈 정간 읽기',tag:'6학년',ic:'🐦'},
  songh_arirang:{mode:'song',song:'arirang',han:true,label:'한자 정간보로 아리랑',desc:'黃 太 仲 林 南 — 진짜 정간보처럼',tag:'6학년 도전',ic:'📜'},
  basic:{mode:'prac',label:'율명 익히기 연습',desc:'황 · 태 · 중 · 임 · 남, 한글 율명으로',tag:'5~6학년',ic:'🎐'},
  hanja:{mode:'prac',han:true,label:'한자 율명 익히기',desc:'黃 太 仲 林 南 潢',tag:'6학년 도전',ic:'🀄'},
};
const PRACTICE=[['황',63],['태',65],['중',68],['임',70],['남',72],['청황',75]];
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M3 18l42-4v20L3 30z" fill="#c9a06a" stroke="#1c2a2a" stroke-width="3" stroke-linejoin="round"/><path d="M8 21l34-3M8 24l34-2M8 27l34-1" stroke="#fbfcf8" stroke-width="1.8"/><circle cx="43" cy="24" r="2.5" fill="#c1272d"/></svg>';
const ida=w=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?'이에요':'예요';};
let FIN=0;
function paper(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#f2f4ee','#e4e8df']);g.save();g.globalAlpha=.25;for(let i=0;i<5;i++){const x=(i*271%W),y=(i*137%H);const gr=g.createRadialGradient(x,y,0,x,y,u*5);gr.addColorStop(0,'rgba(28,58,58,.25)');gr.addColorStop(1,'rgba(28,58,58,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);}g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;paper(g,W0,H0,u,T);const x0=W0*.1,w=W0*.8,y0=H0*.55,h=H0*.3;K.rr(g,x0,y0,w,h,u*.2);g.fillStyle='#c9a06a';g.fill();g.lineWidth=3;g.strokeStyle=INK;g.stroke();
    const n=6;for(let i=0;i<n;i++){const y=y0+h*(i+.5)/n;const on=Math.floor(T*2)%n===i;g.strokeStyle='#fbfcf8';g.lineWidth=2.5;g.beginPath();for(let x=0;x<=w;x+=10){const yy=y+(on?Math.sin(x/20+T*30)*Math.max(0,1-((T*2)%1)*2)*4:0);x?g.lineTo(x0+x,yy):g.moveTo(x0+x,yy);}g.stroke();}
    const cols=['황','태','중','임'];cols.forEach((c,i)=>{const x=W0*.78-i*u*1.4;K.rr(g,x,H0*.12,u*1.1,u*1.1,u*.12);g.fillStyle='#fbfcf8';g.fill();g.lineWidth=2.5;g.strokeStyle=INK;g.stroke();K.txt(g,c,x+u*.55,H0*.12+u*.55,{size:u*.7,color:Math.floor(T*2)%4===i?SEAL:INK});});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'gayageum',title:'정간보 가야금',title1:'한지 위의 가야금',title2:'정간보 가야금',emoji:LOGO,
  subtitle:'5~6학년 음악 · 정간보와 가야금 연주',
  howto:'정간보는 <b>오른쪽 줄의 위에서 아래로</b> 읽어요. 빛나는 칸의 율명과 같은 가야금 줄을 뜯어요. 곡 연주하기는 내 속도로 한 음씩 뜯어 <b>곡을 끝까지</b> 연주하면, 장단에 맞춰 내 연주를 다시 들려줘요. 연습 단계는 율명 칸을 차례로 뜯어요. (키보드: 1~9)',
  how:p=>(LV[p.levelId].label+' — '+LV[p.levelId].desc),
  theme:{c1:'#2a9d8f',c2:'#c1272d'},hero:heroScene,vignette:.04,durs:[90,120,180],levelTitle:'어떤 연주를 할까요?',
  txt:{who:'누가 연주자일까요?',dur:'연주 시간',pace:'연습 속도',seat:'번 연주자 ',go:'연주 시작!',s1:'1. 곡',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>정간보</b>는 세종 대왕이 만든 우리나라 고유의 악보예요. 칸(정간) 하나가 한 박이고, <b>율명</b>(황·태·중·임·남)으로 음의 높이를 적어요.</li>
    <li>율명은 서양의 계이름과 달라요. 황종을 E♭4로 하여 황·태·중·임·남이 오음계(5음)를 이뤄요. 아리랑도 이 다섯 음으로 불러요.</li>
    <li>정간보는 <b>오른쪽 줄 위에서 아래로</b> 읽고, <b>－</b>는 앞 음을 길게, <b>△</b>는 쉼을 나타내요.</li></ul>`,
  untimed(id){return LV[id]&&LV[id].mode==='song';},
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const L=LV[p.levelId];const top=(p.top||0)+u*.5;const pad=u*.35;const land=W>=H*1.1;const nStr=st.STR?st.STR.length:5;
    const SC={x:pad,y:top,w:W-pad*2,h:(H-top)*(land?.46:.4)};const sy=SC.y+SC.h+u*.3;const ST={x:pad,y:sy,w:W-pad*2,h:H-sy-pad};const rowH=ST.h/nStr;
    return{W,H,u,L,SC,ST,rowH,nStr,pad,land};},
  init(p){const st=p.state,L=LV[p.levelId];Object.assign(st,{T:0,started:false,pr:{},vib:{},hintStr:{},msg:'',msgT:0,okN:0,pos:0,tries:0,idleT:0,phase:'idle',notes:[],cols:[],page:0,sheets:0,tN:0,rp:null,mood:'neutral',STR:[]});
    if(L.mode==='song'){const S=GY_SONGS[L.song];st.S=S;st.P=gyParse(S.text);st.notes=st.P.notes;st.cols=st.P.cols;st.STR=[...new Map(st.P.notes.map(n=>[n.y,n.m])).entries()].sort((a,b)=>a[1]-b[1]);}
    else st.STR=PRACTICE.slice(0,L.han?6:5);},
  lab(p,y){return LV[p.levelId].han?(GY_HAN[y]||y):y;},
  start(p){const st=p.state,L=LV[p.levelId];st.started=true;st.phase='play';st.idleT=st.T;
    if(L.mode==='song')p.ask('🪕 <b>'+st.S.title+'</b>','빛나는 칸의 율명과 같은 줄을 뜯어요');else{p.ask('🪕 <b>'+L.label+'</b>','빛나는 칸의 율명을 뜯어요');this.newSheet(p);}},
  newSheet(p){const st=p.state,R=p.R;const NS=st.STR.length;const LEN=12;const seq=[];let c=R.int(0,Math.min(NS,5)-1);for(let k=0;k<LEN;k++){if(k>0){const r=R.f();const step=r<.35?1:r<.7?-1:r<.85?0:(R.f()<.5?2:-2);c=clamp(c+step,0,NS-1);if(k===LEN-1)c=0;}seq.push(c);}
    st.seq=seq;st.cols=[];st.notes=[];for(let col=0;col<3;col++){const cells=[];for(let r=0;r<4;r++){const k=col*4+r;const nt={y:st.STR[seq[k]][0],m:st.STR[seq[k]][1],at:k,dur:1,cell:[col,r],part:0,idx:seq[k]};st.notes.push(nt);cells.push({parts:[{t:'n',note:nt}]});}st.cols.push(cells);}
    st.pos=0;st.tries=0;st.sheets++;st.phase='play';st.tN=st.T;st.msg='빛나는 칸의 율명을 뜯어요';st.msgT=60;st.rp=null;},
  strOf(p,y){return p.state.STR.findIndex(s=>s[0]===y);},
  ring(p,i,when,dur,v,nong){const st=p.state;if(when==null)st.vib[i]=.9;M.play('gayageum',st.STR[i][1],when,dur||1,v||.9,{vol:M.vol(p),nong});},
  pluck(p,i){const st=p.state,L=LV[p.levelId];if(i<0||i>=st.STR.length||!st.started)return;this.ring(p,i);if(st.phase!=='play')return;st.idleT=st.T;const want=st.notes[st.pos];const G=this.geo(p);
    const cell=this.cellRect(p,want.cell);
    if(st.STR[i][0]===want.y){const first=!st.tries;want.q=first?'clean':'retry';p.hit(true,{pts:L.mode==='song'?(first?20:5):(first?20+Math.round(20*Math.max(0,1-(st.T-st.tN)/7)):10),x:cell?cell.x+cell.w/2:G.W/2,y:cell?cell.y:G.SC.y,quiet:false});st.pos++;st.tries=0;st.tN=st.T;st.okN++;
      if(st.pos>=st.notes.length)this.done(p);else{st.msg=this.lab(p,want.y)+'! 좋아요';st.msgT=1.2;this.pageTo(p);}}
    else{st.tries++;want.err=.5;p.hit(false,{pen:5,shake:false,review:'이 칸은 '+this.lab(p,want.y)+(L.han?'('+want.y+')':'')+ida(want.y)+' — 그 줄을 찾아 뜯어요',quiet:true});st.msg='이 칸은 '+this.lab(p,want.y)+(L.han?'('+want.y+')':'')+ida(want.y)+'. 그 줄을 찾아요';st.msgT=2;if(st.tries>=2||L.mode==='prac')st.hintStr[this.strOf(p,want.y)]=.9;}},
  pageTo(p){const st=p.state;if(LV[p.levelId].mode!=='song')return;const G=this.geo(p);const per=this.perPage(G);const n=st.notes[Math.min(st.pos,st.notes.length-1)];st.page=Math.floor(n.cell[0]/per);},
  perPage(G){const w=G.SC.w;return Math.max(2,Math.min(6,Math.floor(w/Math.max(54,Math.min(90,w/4)))));},
  cellRect(p,cell){const st=p.state,G=this.geo(p);const L=LV[p.levelId];const per=L.mode==='song'?this.perPage(G):3;const pg=L.mode==='song'?st.page:0;const col=cell[0]-pg*per;if(col<0||col>=per)return null;const rowsMax=Math.max(...st.cols.map(c=>c.length));const SC=G.SC;const cw=(SC.w-G.u*.6)/per;const ch=Math.min((SC.h-G.u*1.2)/rowsMax,G.u*1.9);return{x:SC.x+SC.w-G.u*.3-(col+1)*cw+3,y:SC.y+G.u*.9+cell[1]*ch,w:cw-6,h:ch-4};},
  done(p){const st=p.state,L=LV[p.levelId];st.phase='wait';
    if(L.mode==='song'){FIN++;const rank=FIN;const bonus=Engine.players.length>1?[60,40,20,10][Math.min(rank-1,3)]:40;p.hit(true,{pts:bonus,x:p.W/2,y:p.H*.3,tip:Engine.players.length>1?'🎉 '+rank+'번째로 완주!':'🎉 완주! 장단에 맞춰 내 연주를 들어 봐요',tipMs:2400});}
    else{p.hit(true,{pts:30,x:p.W/2,y:p.H*.3,tip:'🎉 한 장 완성! 내 연주를 들어 봐요',tipMs:1500});}
    const spb=L.mode==='song'?60/(st.S.bpm||96):.32;const t=M.now()+.6,dt=.6;const meter=L.mode==='song'?(st.S.meter||4):4;const beats=L.mode==='song'?st.P.beats:12;
    if(L.mode==='song')for(let b=0;b<beats;b++){const k=b%meter;const h=meter===3?(['deong','deok','kung'][k]):(['deong','kung','deok','kung'][k]);M.hit(h,t+b*spb,.3,{rev:.15,vol:M.vol(p)});}
    st.notes.forEach((n,k)=>this.ring(p,this.strOf(p,n.y),t+n.at*spb,Math.max(.5,n.dur*spb),.85,k===st.notes.length-1&&L.mode==='song'));
    st.rp={t0:st.T+dt,spb,end:st.T+dt+beats*spb+1.2};st.msg=L.mode==='song'?'🎶 내 연주 다시 듣기':'🎶 내 연주 듣기';st.msgT=60;},
  update(p,dt){const st=p.state;if(!st.started)return;st.T+=dt;M.decay(st,dt);if(st.msgT>0)st.msgT-=dt;for(const k in st.vib){st.vib[k]-=dt;if(st.vib[k]<=0)delete st.vib[k];}for(const k in st.hintStr){st.hintStr[k]-=dt;if(st.hintStr[k]<=0)delete st.hintStr[k];}st.notes.forEach(n=>{if(n.err>0)n.err-=dt;});
    const L=LV[p.levelId];
    if(st.phase==='play'){if(L.mode==='song'&&st.T-st.idleT>5){st.idleT=st.T;const w=st.notes[st.pos];if(w)st.hintStr[this.strOf(p,w.y)]=.9;}
      if(L.mode==='prac'&&st.T-st.tN>7/Math.max(.8,Math.min(1.3,p.pace))){const w=st.notes[st.pos];st.hintStr[this.strOf(p,w.y)]=.7;p.hit(false,{pen:3,shake:false,review:'이 칸은 '+this.lab(p,w.y)+ida(w.y),quiet:true});st.msg='이 칸은 '+this.lab(p,w.y)+'! 다음 칸으로 넘어가요';st.msgT=1.5;st.pos++;st.tN=st.T;if(st.pos>=st.notes.length)this.done(p);}}
    else if(st.phase==='wait'&&st.rp){const beat=(st.T-st.rp.t0)/st.rp.spb;let idx=-1;st.notes.forEach((n,k)=>{if(beat>=n.at&&beat<n.at+Math.max(.5,n.dur))idx=k;});if(idx!==st.rpIdx){st.rpIdx=idx;if(idx>=0){const n=st.notes[idx];st.rpCur=n;st.vib[this.strOf(p,n.y)]=.6;if(L.mode==='song'){const per=this.perPage(this.geo(p));st.page=Math.floor(n.cell[0]/per);}}}
      if(st.T>st.rp.end){st.rp=null;st.rpIdx=-1;if(L.mode==='song'){if(p.active&&!p.finished)Engine.finish(p);}else{this.newSheet(p);}}}},
  down(p,x,y){const G=this.geo(p),st=p.state;if(!st.started)return;const ST=G.ST;if(K.inRect(x,y,ST)){const i=Math.floor((y-ST.y)/G.rowH);this.pluck(p,i);M.press(st,'s'+i,.2);}},
  key(p,e){const n=Number(e.key);if(n>=1&&n<=p.state.STR.length){e.preventDefault&&e.preventDefault();this.pluck(p,n-1);}},
  botAct(p){const st=p.state;if(!st.started||st.phase!=='play'){return null;}const w=st.notes[st.pos];if(!w)return null;const G=this.geo(p);const i=this.strOf(p,w.y);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.ST.x+G.ST.w*.5,y:rc.top+G.ST.y+(i+.5)*G.rowH};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,L=G.L;paper(g,W,H,u,t);const SC=G.SC,ST=G.ST;if(!st.started)return;
    /* 정간보 */
    K.card(g,SC.x,SC.y,SC.w,SC.h,u*.2,'#fbfcf8',{stroke:INK,lw:3,blur:u*.15,dy:u*.08});
    K.txt(g,L.mode==='song'?st.S.title+'  ← 오른쪽 줄부터, 위에서 아래로':'정간보 연습  ← 오른쪽 줄부터, 위에서 아래로',SC.x+SC.w/2,SC.y+u*.45,{size:Math.min(u*.5,SC.w*.035),color:'#5a6a6a',maxW:SC.w*.9});
    const per=L.mode==='song'?this.perPage(G):3;const pg=L.mode==='song'?st.page:0;const cols=st.cols;
    for(let c=0;c<per;c++){const ci=pg*per+c;if(ci>=cols.length)continue;cols[ci].forEach((cell,ri)=>{const r=this.cellRect(p,[ci,ri]);if(!r)return;
      const isCur=st.phase==='play'&&st.notes[st.pos]&&st.notes[st.pos].cell[0]===ci&&st.notes[st.pos].cell[1]===ri;
      g.fillStyle=isCur?'#fff0c2':'#ffffff';K.rr(g,r.x,r.y,r.w,r.h,4);g.fill();g.lineWidth=isCur?4:2;g.strokeStyle=isCur?SEAL:'#7a8a8a';g.stroke();if(isCur)K.glow(g,r.x+r.w/2,r.y+r.h/2,r.w*.8,'#ffd166',.45+.2*Math.sin(t*8));
      const np=cell.parts.length;cell.parts.forEach((pt,k)=>{const cy=r.y+r.h*((k+.5)/np);const nt=pt.note;let txt='',col=INK;if(pt.t==='n'){txt=this.lab(p,nt.y);col=nt.q==='clean'?'#16a34a':nt.q==='retry'?'#b8860b':nt.err>0?SEAL:INK;if(st.rpCur===nt&&st.rp)col=SEAL;}else if(pt.t==='-'){txt='－';col='#7a8a8a';}else if(pt.t==='△'){txt='△';col='#7a8a8a';}else txt=pt.raw||'?';
        K.txt(g,txt,r.x+r.w/2,cy,{size:Math.min(r.h*(np>1?.42:.62),r.w*.55,u*1.3),color:col,maxW:r.w*.9});});});}
    /* 진행 표시 */
    if(st.notes.length){const f=(st.phase==='play'?st.pos:st.notes.length)/st.notes.length;K.rr(g,SC.x+u*.3,SC.y+SC.h-u*.35,SC.w-u*.6,u*.15,u*.07);g.fillStyle='rgba(28,58,58,.12)';g.fill();K.rr(g,SC.x+u*.3,SC.y+SC.h-u*.35,Math.max(u*.15,(SC.w-u*.6)*f),u*.15,u*.07);g.fillStyle=JADE;g.fill();}
    /* 가야금 */
    K.rr(g,ST.x,ST.y,ST.w,ST.h,u*.25);const wg=g.createLinearGradient(ST.x,ST.y,ST.x,ST.y+ST.h);wg.addColorStop(0,'#d7b384');wg.addColorStop(1,'#a97d4f');g.fillStyle=wg;g.fill();g.lineWidth=4;g.strokeStyle=INK;g.stroke();
    g.fillStyle='rgba(255,255,255,.12)';for(let i=0;i<8;i++)g.fillRect(ST.x+u*.3,ST.y+ST.h*(i+.3)/8,ST.w-u*.6,1.5);
    for(let i=0;i<G.nStr;i++){const y=ST.y+(i+.5)*G.rowH;const vib=st.vib[i]>0?st.vib[i]:0;const hint=st.hintStr[i]>0;const pr=st.pr['s'+i]>0;
      if(hint||pr){K.glow(g,ST.x+ST.w*.55,y,ST.w*.4,hint?'#fff3a0':'#ffffff',.5);}
      g.strokeStyle=hint?'#ffe14d':'#fffdf4';g.lineWidth=Math.max(2.5,G.rowH*.1);g.lineCap='round';g.beginPath();for(let x=0;x<=ST.w-u*1.8;x+=8){const yy=y+(vib?Math.sin(x/16+t*40)*vib*G.rowH*.22*Math.sin(Math.PI*x/(ST.w-u*1.8)):0);x?g.lineTo(ST.x+u*1.6+x,yy):g.moveTo(ST.x+u*1.6+x,yy);}g.stroke();
      const bx=ST.x+ST.w*(.5+i*.03);g.fillStyle='#5a3a1f';g.beginPath();g.moveTo(bx-G.rowH*.22,y+G.rowH*.34);g.lineTo(bx+G.rowH*.22,y+G.rowH*.34);g.lineTo(bx,y-G.rowH*.12);g.closePath();g.fill();
      K.card(g,ST.x+u*.2,y-G.rowH*.38,u*1.3,G.rowH*.76,u*.12,'#fbfcf8',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,this.lab(p,st.STR[i][0]),ST.x+u*.85,y,{size:Math.min(G.rowH*.55,u*.95),color:hint?SEAL:INK,maxW:u*1.1});K.txt(g,String(i+1),ST.x+ST.w-u*.4,y,{size:Math.min(G.rowH*.4,u*.5),color:'rgba(28,42,42,.5)'});}
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W/2,SC.y+SC.h+u*.15,{size:Math.min(u*.55,W*.035),color:'#fff',stroke:INK,lw:u*.12,maxW:W*.94});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.2,'#fbfcf8',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🪕 '+(st.okN||0)+'음 연주',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.42,color:INK,maxW:u*3.4});
  },
};
Engine.boot(GAME);
