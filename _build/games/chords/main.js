/* 5~6학년 음악 · 주요 3화음(Ⅰ·Ⅳ·Ⅴ)과 반주 — 화음 DJ
   디자인: 네온 DJ 부스. 화음 패드를 눌러 가락에 어울리는 반주를 붙이고, 마지막에는 내가 고른 화음으로 곡을 완성해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const CH={I:[60,64,67],IV:[65,69,72],V:[67,71,74]};
const CN={I:'도·미·솔',IV:'파·라·도',V:'솔·시·레'};
const PC={I:[0,4,7],IV:[5,9,0],V:[7,11,2]};
const KEYS=['I','IV','V'];
const PCOL={I:'#00e5ff',IV:'#ff2e93',V:'#ffd166'};
const SCALE=[60,62,64,65,67,69,71,72,74];
const BASSN={I:48,IV:53,V:55};
const BEAT=.5;
const LV={
  tone:{label:'화음 구성음 알기',desc:'오선에 쌓인 세 음을 보고 Ⅰ · Ⅳ · Ⅴ 찾기',tag:'5~6학년',ic:'🎹',time:12},
  accomp:{label:'가락에 반주 붙이기',desc:'가락을 듣고 어울리는 화음 고르기',tag:'6학년',ic:'🎧',time:14},
  ear:{label:'화음 소리 구별하기',desc:'Ⅰ 화음을 먼저 듣고, 다음 화음이 무엇인지 귀로 찾기',tag:'6학년 도전',ic:'👂',time:12},
  band:{label:'반주 밴드 (4마디 연주)',desc:'가락이 흐르는 동안 마디마다 화음 패드를 눌러 반주를 완성해요',tag:'6학년 도전',ic:'🎛️'},
};
const ROM={I:'Ⅰ',IV:'Ⅳ',V:'Ⅴ'};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#1a1033" stroke="#00e5ff" stroke-width="3"/><circle cx="24" cy="24" r="12" fill="none" stroke="#ff2e93" stroke-width="2"/><circle cx="24" cy="24" r="5" fill="#ffd166"/><path d="M38 6l-8 14" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
function melodyFor(R,X){for(let t=0;t<200;t++){const mel=[];for(let b=0;b<4;b++){const strong=b%2===0;const pool=strong?SCALE.filter(m=>PC[X].includes(m%12)):SCALE;let m=R.pick(pool);if(b>0&&Math.abs(m-mel[b-1])>7)m=pool.reduce((a,c)=>Math.abs(c-mel[b-1])<Math.abs(a-mel[b-1])?c:a);mel.push(m);}
    const score=k=>mel.reduce((s,m,i)=>s+(PC[k].includes(m%12)?(i%2===0?2:1):0),0);const sc=KEYS.map(score),best=Math.max(...sc);if(sc.filter(v=>v===best).length===1&&KEYS[sc.indexOf(best)]===X)return mel;}
  return CH[X].concat([CH[X][0]]);}
const posOf=m=>{const d=[0,2,4,5,7,9,11];const oct=Math.floor((m-60)/12),pc=((m%12)+12)%12;return oct*7+d.indexOf(pc)-2;};
function vinyl(g,x,y,r,ang,col){g.save();g.translate(x,y);K.glow(g,0,0,r*1.5,col,.25);g.fillStyle='#0b0620';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.lineWidth=2;g.strokeStyle='rgba(255,255,255,.18)';for(let k=1;k<6;k++){g.beginPath();g.arc(0,0,r*(.4+k*.1),0,TAU);g.stroke();}
  g.rotate(ang);g.fillStyle=col;g.beginPath();g.arc(0,0,r*.34,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(r*.18,0,r*.05,0,TAU);g.fill();g.fillStyle='#0b0620';g.beginPath();g.arc(0,0,r*.05,0,TAU);g.fill();
  g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.moveTo(0,0);g.arc(0,0,r,-.5,.1);g.closePath();g.fill();g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    K.vgrad(g,0,0,W0,H0,['#1a1033','#2a1b52']);const u=Math.min(W0,H0)/6;vinyl(g,W0*.3,H0*.45,Math.min(W0*.2,H0*.34),T*3,'#ff2e93');
    const n=16,bw=Math.min(W0*.025,u*.25);for(let i=0;i<n;i++){const h=(Math.abs(Math.sin(T*3+i*.7))*.7+.15)*H0*.4;g.fillStyle=i%3===0?'#00e5ff':i%3===1?'#ff2e93':'#ffd166';K.rr(g,W0*.55+i*(bw*1.5),H0*.75-h,bw,h,bw*.4);g.fill();}
    const pw=Math.min(W0*.1,u*1.3),py=H0*.82;['I','IV','V'].forEach((k,i)=>{const on=Math.floor(T*1.5)%3===i;K.rr(g,W0*.55+i*(pw*1.2),py,pw,pw*.7,u*.2);g.fillStyle=on?PCOL[k]:'rgba(255,255,255,.12)';g.fill();K.txt(g,ROM[k],W0*.55+i*(pw*1.2)+pw/2,py+pw*.35,{size:pw*.4,color:on?'#0f0a24':PCOL[k]});});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'chords',title:'화음 DJ',title1:'네온 DJ 부스',title2:'화음 DJ',emoji:LOGO,
  subtitle:'5~6학년 음악 · 주요 3화음과 반주',
  howto:'다장조의 주요 3화음이에요. <b>Ⅰ</b>=도·미·솔, <b>Ⅳ</b>=파·라·도, <b>Ⅴ</b>=솔·시·레. 문제를 보고(듣고) 알맞은 화음 패드를 눌러요. 패드를 누르면 화음 소리가 나요! 마지막 단계 「반주 밴드」에서는 가락이 흐르는 동안 마디마다 화음을 골라 반주를 완성해요.',
  how:p=>({tone:'오선에 쌓인 <b>세 음</b>으로 화음 찾기',accomp:'<b>가락</b>에 어울리는 화음 고르기',ear:'<b>귀로</b> 화음 구별하기',band:'4마디 <b>반주</b> 직접 연주하기'}[p.levelId]),
  theme:{c1:'#ff2e93',c2:'#00e5ff'},hero:heroScene,vignette:.1,durs:[120,180,300],levelTitle:'어떤 믹싱을 할까요?',
  txt:{who:'누가 DJ일까요?',dur:'공연 시간',pace:'생각하는 시간',seat:'번 DJ ',go:'공연 시작!',s1:'1. 믹싱',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'5~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li><b>화음</b>은 높이가 다른 세 개 이상의 음이 함께 울리는 소리예요. 다장조의 으뜸화음 <b>Ⅰ</b>은 도·미·솔이에요.</li>
    <li><b>주요 3화음</b>: 으뜸화음 Ⅰ(도·미·솔), 버금딸림화음 Ⅳ(파·라·도), 딸림화음 Ⅴ(솔·시·레). 간단한 노래는 이 세 화음만으로 반주할 수 있어요.</li>
    <li>가락의 <b>센 박</b>에 나오는 음이 화음의 구성음일 때 반주가 잘 어울려요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.4;const land=W>=H*1.1;const pad=u*.35;let screen,pads,deck,rep;
    if(land){const dw=Math.min(W*.3,u*7);deck={x:pad,y:top,w:dw,h:H-top-pad};const x0=pad+dw+pad;screen={x:x0,y:top,w:W-x0-pad,h:(H-top)*.52};const py=top+screen.h+u*.6;const ph=H-py-pad;const pw=(screen.w-u*.5)/3;pads=KEYS.map((k,i)=>({k,x:x0+i*(pw+u*.25),y:py,w:pw,h:ph}));rep={x:screen.x+screen.w-u*3.6,y:screen.y+screen.h-u*1.0,w:u*3.4,h:u*.85};}
    else{deck=null;screen={x:pad,y:top,w:W-pad*2,h:(H-top)*.42};const py=top+screen.h+u*.5;const ph=Math.min(H-py-pad,u*7);const pw=(W-pad*2-u*.5)/3;pads=KEYS.map((k,i)=>({k,x:pad+i*(pw+u*.25),y:py,w:pw,h:ph}));rep={x:screen.x+screen.w-u*3.6,y:screen.y+screen.h-u*1.0,w:u*3.4,h:u*.85};}
    return{W,H,u,land,screen,pads,deck,rep,pad,top};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,listen:0,hist:[],pr:{},ang:0,spin:0,eq:0,band:null,msg:'',msgT:0,tl:0});},
  make(p,L){const R=p.R;const X=R.pick(KEYS);if(L==='tone')return{X,notes:CH[X],text:'',reveal:ROM[X]+' 화음 = '+CN[X],review:'오선의 세 음 '+CN[X]+' → '+ROM[X]+' 화음',speak:''};
    if(L==='ear')return{X,text:'',reveal:ROM[X]+' 화음 ('+CN[X]+')',review:'처음 Ⅰ 다음에 들린 화음은 '+ROM[X]+' ('+CN[X]+')',speak:''};
    const mel=melodyFor(R,X);return{X,mel,text:'',reveal:ROM[X]+' 화음 ('+CN[X]+')',review:'가락 '+mel.map(m=>M.solfa(m)).join('·')+' → '+ROM[X]+' 화음 ('+CN[X]+')',speak:''};},
  qtime(){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return {tone:'🎹 이 세 음으로 된 화음은?',accomp:'🎧 이 가락에 어울리는 화음은?',ear:'👂 처음은 Ⅰ 화음, 다음 화음은?'}[this._p.levelId];},
  askSub(){return this._p.levelId==='tone'?'구성음을 보고 골라요':'잘 들어요… 그리고 패드를 눌러요';},
  isOk(q,i){return KEYS[i]===q.X;},tipOf(q){return '정답은 '+q.reveal;},goodTip(q){return '정답! '+q.reveal;},
  hold(p){return p.state.listen>0;},
  onNew(p,q){const st=p.state;this._p=p;st.listen=0;this.sound(p);},
  sound(p){const st=p.state,q=st.q,L=p.levelId;const t=M.now()+.2;let len=0;const lead=M.lead(p);
    if(L==='tone'){if(lead)M.chord('piano',q.notes,t,1.2,.7,{strum:.06});len=1.4;}
    else if(L==='ear'){if(lead){M.chord('piano',CH.I,t,.9,.7);M.play('piano',48,t,.9,.6);M.chord('piano',CH[q.X],t+1.2,1.2,.75);M.play('piano',BASSN[q.X],t+1.2,1.2,.6);}len=2.6;}
    else{if(lead)q.mel.forEach((m,i)=>{M.play('piano',m,t+i*BEAT,BEAT*.95,.85);M.hit('wood',t+i*BEAT,i===0?.4:.2,{hi:i===0});});len=.2+BEAT*4+.15;}
    st.listen=len;st.spin=len;st.tl=st.T+.2;},
  onVerdict(p,q,ok){const st=p.state;st.listen=0;st.hist.push(q.X);if(st.hist.length>8)st.hist.shift();
    if(M.lead(p)){const t=M.now()+.15;if(p.levelId==='accomp'){q.mel.forEach((m,i)=>M.play('piano',m,t+i*BEAT*.8,BEAT*.75,.8));M.chord('pad',CH[q.X],t,BEAT*3.4,.9);M.play('piano',CH[q.X][0]-24,t,BEAT*3.2,.6);}else M.chord('pad',CH[q.X],t,1.2,.9);}st.spin=1.2;},
  playChord(p,k){M.chord('piano',CH[k],null,.9,.75,{vol:M.vol(p)});M.play('piano',BASSN[k],null,.9,.55,{vol:M.vol(p)});},
  upd(p,dt){const st=p.state;M.decay(st,dt);if(st.listen>0)st.listen-=dt;if(st.spin>0){st.spin-=dt;st.ang+=dt*5;}if(st.msgT>0)st.msgT-=dt;if(p.levelId==='band')this.bandUpd(p,dt);},
  /* ───── 반주 밴드 ───── */
  start(p){const st=p.state;st.begun=true;if(p.levelId==='band'){p.ask('🎛️ <b>반주 밴드</b>','가락이 흐르는 동안 마디마다 화음 패드를 눌러요');this.bandNew(p);}else{this._p=p;this.nq0(p);}},
  bandNew(p){const st=p.state,R=p.R;const prog=R.pick([['I','IV','V','I'],['I','V','IV','I'],['I','IV','I','V'],['I','I','IV','V'],['I','V','I','IV']]);const mel=[];prog.forEach(X=>{const m=melodyFor(R,X);m.forEach(v=>mel.push(v));});
    st.band={prog,mel,phase:'wait',picks:[null,null,null,null],bar:0,t0:0,round:(st.band?st.band.round:0)+1,score:0};st.listen=0;M.gate(p,()=>{if(p.active)this.bandListen(p);});},
  bandListen(p){const st=p.state,b=st.band;b.phase='listen';b.t0=st.T+.3;const t=M.now()+.3;if(M.lead(p))b.mel.forEach((m,i)=>{M.play('piano',m,t+i*BEAT,BEAT*.95,.85);M.hit('wood',t+i*BEAT,i%4===0?.4:.2,{hi:i%4===0});});st.spin=1e9;st.msg='먼저 가락을 잘 들어요 🎧';st.msgT=60;},
  bandPlay(p){const st=p.state,b=st.band;b.phase='play';b.t0=st.T+.5;b.bar=0;const t=M.now()+.5;if(M.lead(p)){b.mel.forEach((m,i)=>{M.play('piano',m,t+i*BEAT,BEAT*.95,.7);});}st.msg='마디마다 어울리는 화음 패드를 눌러요!';st.msgT=60;},
  bandUpd(p,dt){const st=p.state,b=st.band;if(!b)return;const bar=BEAT*4;const el=st.T-b.t0;
    if(b.phase==='listen'&&el>=bar*4+.4){this.bandPlay(p);}
    else if(b.phase==='play'){const k=Math.floor(el/bar);if(k>=0&&k<4)b.bar=k;
      if(el>=bar*4+.3){b.phase='show';st.spin=1e9;let ok=0;b.picks.forEach((c,i)=>{if(c===b.prog[i])ok++;});const pts=ok*40+(ok===4?40:0);b.ok=ok;b.t0=st.T+.4;
        p.hit(ok>=3,{pts:pts||undefined,x:p.W/2,y:p.H*.3,tip:'반주 '+ok+'/4마디 정답! '+(ok===4?'완벽한 반주 +40':''),review:'정답 반주: '+b.prog.map(x=>ROM[x]).join(' · ')+' / 내가 고른 반주: '+b.picks.map(x=>x?ROM[x]:'-').join(' · '),tipMs:2600});if(ok>0)st.okN++;
        const t=M.now()+.4;if(M.lead(p)){b.mel.forEach((m,i)=>M.play('piano',m,t+i*BEAT,BEAT*.95,.8));b.picks.forEach((c,i)=>{const X=c||'I';if(c){M.chord('pad',CH[X],t+i*bar,bar*.95,.8);M.play('piano',BASSN[X]-12,t+i*bar,bar*.9,.55);}});}}}
    else if(b.phase==='show'){if(st.T-b.t0>bar*4+1.2){b.phase='wait';this.bandNewRound(p);}}},
  bandNewRound(p){const st=p.state;st.band.phase='wait';M.gate(p,()=>{if(p.active)this.bandNew(p);});},
  pad(p,k){const st=p.state;M.press(st,'p'+k,.2);this.playChord(p,k);if(p.levelId==='band'){const b=st.band;if(b&&b.phase==='play'&&b.picks[b.bar]==null)b.picks[b.bar]=k;else if(b&&b.phase==='play'){b.picks[b.bar]=k;}return;}
    const q=st.q;if(!q||st.lock||st.listen>0)return;this.verdict(p,KEYS.indexOf(k),false);},
  down(p,x,y){const G=this.geo(p),st=p.state;if(!st.begun)return;const pd=G.pads.find(r=>K.inRect(x,y,r));if(pd){this.pad(p,pd.k);return;}if(K.inRect(x,y,G.rep)&&p.levelId!=='band'&&!st.lock&&st.listen<=0&&st.q){this.sound(p);}},
  key(p,e){const m={'1':'I','2':'IV','3':'V'}[e.key];if(m){e.preventDefault&&e.preventDefault();this.pad(p,m);}},
  botAct(p){const st=p.state,G=this.geo(p);const rc=p.cv.getBoundingClientRect();if(p.levelId==='band'){const b=st.band;if(!b||b.phase!=='play')return null;const need=b.prog[b.bar];if(b.picks[b.bar]===need)return null;const r=G.pads.find(x=>x.k===need);return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};}
    const q=st.q;if(!q||st.lock||st.listen>0)return null;const r=G.pads.find(x=>x.k===q.X);return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q,L=p.levelId;K.vgrad(g,0,0,W,H,['#1a1033','#2a1b52','#1a1033']);
    const S=G.screen;
    /* 왼쪽 턴테이블 */
    if(G.deck){const d=G.deck;K.card(g,d.x,d.y,d.w,d.h,u*.3,'#241748',{stroke:'#6b4bd1',lw:2,blur:0,dy:0});vinyl(g,d.x+d.w/2,d.y+d.h*.32,Math.min(d.w*.42,d.h*.2),st.ang,st.listen>0||st.spin>0?'#ff2e93':'#6b4bd1');
      K.txt(g,'🎧 DJ',d.x+d.w/2,d.y+d.h*.62,{size:u*.9,color:'#00e5ff',maxW:d.w*.8});const hs=st.hist.slice(-8);hs.forEach((k,i)=>{const cx=d.x+d.w/2+((i%4)-1.5)*u*1.0,cy=d.y+d.h*.76+Math.floor(i/4)*u*1.0;g.fillStyle=PCOL[k];g.beginPath();g.arc(cx,cy,u*.4,0,TAU);g.fill();K.txt(g,ROM[k],cx,cy,{size:u*.5,color:'#0f0a24'});});K.txt(g,'지난 화음',d.x+d.w/2,d.y+d.h*.69,{size:u*.38,color:'#c6b8ff',maxW:d.w*.8});}
    /* 화면 */
    K.card(g,S.x,S.y,S.w,S.h,u*.3,'#0b0620',{stroke:'#00e5ff',lw:3,blur:0,dy:0});
    let gap=Math.min(S.h/9,S.w/16);if(L==='band')gap=Math.min(gap,(S.w*.74/16)*.9,S.h/11);const mid=S.y+S.h*.46;
    const eqOn=st.listen>0||(st.band&&(st.band.phase==='listen'||st.band.phase==='play'||st.band.phase==='show'));
    for(let i=0;i<16;i++){const hh=eqOn?(Math.abs(Math.sin(t*7+i*.8))*.6+.1)*S.h*.28:S.h*.03;g.fillStyle=['#00e5ff','#ff2e93','#ffd166'][i%3];g.globalAlpha=.35;K.rr(g,S.x+u*.4+i*(S.w-u*.8)/16,S.y+S.h-u*.2-hh,(S.w-u*.8)/16*.6,hh,3);g.fill();g.globalAlpha=1;}
    if(L!=='ear'&&(q||st.band)){const yOf=M.staff(g,S.x+u*.4,S.x+S.w-u*.4,mid,gap,'rgba(245,240,255,.8)');M.clef(g,S.x+u*1.7,yOf(2),gap,'#00e5ff');
      const drawNote=(m,x,col)=>{const pp=posOf(m),y=yOf(pp);g.strokeStyle='rgba(245,240,255,.8)';g.lineWidth=Math.max(1.5,gap*.07);if(pp<=-2){g.beginPath();g.moveTo(x-gap*.9,yOf(-2));g.lineTo(x+gap*.9,yOf(-2));g.stroke();}g.fillStyle=col;g.save();g.translate(x,y);g.rotate(-.38);g.beginPath();g.ellipse(0,0,gap*.7,gap*.54,0,0,TAU);g.fill();g.restore();return y;};
      if(L==='tone'&&q){const x=S.x+S.w*.55;q.notes.forEach(m=>{const y=drawNote(m,x,'#fff2c4');K.txt(g,M.solfa(m),x+gap*2.2,y,{size:gap*.8,color:'#ffd166',maxW:gap*3});});}
      else if(L==='accomp'&&q){const x0=S.x+S.w*.3,stp=S.w*.62/4;q.mel.forEach((m,i)=>{const x=x0+stp*i;const lit=st.listen>0&&Math.floor((t-st.tl)/BEAT)===i;const y=drawNote(m,x,lit?'#00e5ff':'#fff2c4');K.txt(g,M.solfa(m),x,S.y+S.h-u*.55,{size:gap*.75,color:'#c6b8ff'});});}
      else if(L==='band'&&st.band){const b=st.band;const x0=S.x+S.w*.22,stp=(S.w*.74)/16;b.mel.forEach((m,i)=>{const x=x0+stp*i;const bar=Math.floor(i/4);const cur=b.phase==='play'&&b.bar===bar;drawNote(m,x,cur?'#00e5ff':'#fff2c4');});
        for(let k=0;k<4;k++){const bx=x0+stp*(k*4)-stp*.5;g.strokeStyle='rgba(245,240,255,.6)';g.lineWidth=2;g.beginPath();g.moveTo(bx,yOf(8));g.lineTo(bx,yOf(0));g.stroke();
          const pk=b.picks[k];const shown=pk&&(b.phase==='play'||b.phase==='show');const cx=bx+stp*2,cy=S.y+S.h-u*.7;const cur=b.phase==='play'&&b.bar===k;
          K.rr(g,cx-u*.6,cy-u*.38,u*1.2,u*.76,u*.2);g.fillStyle=shown?PCOL[pk]:(cur?'rgba(255,255,255,.35)':'rgba(255,255,255,.1)');g.fill();if(cur){g.lineWidth=2;g.strokeStyle='#fff';g.stroke();}K.txt(g,shown?ROM[pk]:cur?'?':'',cx,cy,{size:u*.6,color:'#0f0a24'});
          if(b.phase==='show'){K.txt(g,b.picks[k]===b.prog[k]?'⭕':'❌',cx,cy-u*.9,{size:u*.5});}}}}
    else if(L==='ear'){const msg=st.listen>0?'👂 잘 들어요…':st.lock?'정답: '+ROM[q.X]+' 화음':'다음 화음은?';K.txt(g,msg,S.x+S.w/2,S.y+S.h*.45,{size:Math.min(u*1.2,S.w*.08),color:'#00e5ff',maxW:S.w*.8});}
    if(L==='tone'&&st.lock)K.txt(g,ROM[q.X]+' 화음 = '+CN[q.X],S.x+S.w/2,S.y+u*.6,{size:u*.7,color:'#ffd166',maxW:S.w*.9});
    /* 위쪽 표시들 */
    if(L!=='band'&&!st.lock&&st.listen<=0&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#00e5ff'});}
    if(L==='band'&&st.band){const b=st.band;K.txt(g,b.phase==='listen'?'🎧 가락을 들어요':b.phase==='play'?'🎛️ '+(b.bar+1)+'마디! 화음을 눌러요':b.phase==='show'?'🎶 내 반주 듣기  '+b.ok+'/4':'친구를 기다려요…',S.x+S.w*.6,S.y+u*.6+(G.land?0:u*.9),{size:Math.min(u*.75,S.w*.05),color:'#fff',stroke:'#07041a',lw:u*.12,maxW:S.w*.9});
      if(b.phase==='play'){const bar=BEAT*4;const f=((t-b.t0)%bar)/bar;g.fillStyle='#ff2e93';g.fillRect(S.x+S.w*.22+(S.w*.74)*(Math.floor((t-b.t0)/bar)*.25+f*.25)-2,S.y+S.h*.1,4,S.h*.7);}}
    if(L!=='band'){const rp=G.rep,can=!st.lock&&st.listen<=0&&q;K.rr(g,rp.x,rp.y,rp.w,rp.h,rp.h/2);g.fillStyle=can?'#2a1b52':'rgba(255,255,255,.08)';g.fill();g.lineWidth=2;g.strokeStyle=can?'#ff2e93':'#4a3a80';g.stroke();K.txt(g,'🔁 다시 듣기',rp.x+rp.w/2,rp.y+rp.h/2,{size:u*.44,color:can?'#fff':'#7a6ab0',maxW:rp.w*.9});}
    /* 패드 */
    G.pads.forEach(r=>{const k=r.k;const pr=st.pr['p'+k]>0;let on=false,bad=false;if(st.lock&&L!=='band'){on=q.X===k;bad=st.pick>=0&&KEYS[st.pick]===k&&q.X!==k;}
      const b=st.band;const bandOn=L==='band'&&b&&b.phase==='play'&&b.picks[b.bar]===k;
      K.rr(g,r.x,r.y+(pr?u*.1:0),r.w,r.h,u*.35);g.fillStyle=bad?'#5a1a2a':PCOL[k];g.globalAlpha=(on||pr||bandOn||!st.lock)?1:.5;g.fill();g.globalAlpha=1;if(on||pr||bandOn){K.glow(g,r.x+r.w/2,r.y+r.h/2,r.w*.9,PCOL[k],.5);}g.lineWidth=4;g.strokeStyle=on?'#fff':'#07041a';g.stroke();
      g.fillStyle='rgba(255,255,255,.25)';K.rr(g,r.x+u*.15,r.y+u*.12,r.w-u*.3,r.h*.18,u*.15);g.fill();
      K.txt(g,ROM[k],r.x+r.w/2,r.y+r.h*.42,{size:Math.min(r.h*.45,r.w*.5),color:'#0f0a24',maxW:r.w*.8});K.txt(g,CN[k],r.x+r.w/2,r.y+r.h*.8,{size:Math.min(r.h*.17,u*.7),color:'#0f0a24',maxW:r.w*.9});K.txt(g,String(KEYS.indexOf(k)+1),r.x+u*.4,r.y+u*.45,{size:u*.4,color:'rgba(15,10,36,.55)'});});
    if(st.msgT>0&&st.msg&&L==='band')K.txt(g,st.msg,W/2,H-u*.3,{size:Math.min(u*.55,W*.035),color:'#fff',stroke:'#07041a',lw:u*.12,maxW:W*.94});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.3,'rgba(36,23,72,.92)',{stroke:'#00e5ff',lw:2,blur:0,dy:0});K.txt(g,'🎛️ '+(st.okN||0)+'곡 믹싱',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.44,color:'#00e5ff',maxW:u*3.4});
  },
};
M.mix(GAME,{say:false,pts0:50,pts1:50,okMs:2300,badMs:3000});
(function(){const nq=GAME.start;GAME.nq0=function(p){const st=p.state;st.begun=true;nq.call(this,p);};
  const _s=GAME.start;GAME.start=function(p){const st=p.state;st.begun=true;if(p.levelId==='band'){p.ask('🎛️ <b>반주 밴드</b>','가락이 흐르는 동안 마디마다 화음 패드를 눌러요');this.bandNew(p);}else{this._p=p;_s.call(this,p);}};})();
Engine.boot(GAME);
