/* 4~6학년 음악 · 셈여림과 빠르기 — 꼬마 지휘자
   디자인: 별빛 연주회 지휘대. 지휘봉을 위아래로 움직여 셈여림을 지휘하고, 박을 저어 빠르기를 지휘해요. 내가 지휘한 대로 곡이 연주돼요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/*@@PRE@@*/
const MEL=/*@@MEL@@*/;
const BASS=/*@@BASS@@*/;
const DYN=/*@@DYN@@*/;
const TEMPO=/*@@TEMPO@@*/;
const GOLD='#ffd166',PINK='#ef476f';
MX_SONGS.mary.title='메리의 어린 양';
Object.assign(MX_SONGS,{
  nabiya:{title:'나비야',sub:'독일 민요 · 8마디',bpm:108,m:4,n:'G4:1 E4:1 E4:2 F4:1 D4:1 D4:2 C4:1 D4:1 E4:1 F4:1 G4:1 G4:1 G4:2'},
  school:{title:'학교종',sub:'김메리 작곡 · 8마디',bpm:112,m:4,n:'G4:1 G4:1 A4:1 A4:1 G4:1 G4:1 E4:2 G4:1 G4:1 E4:1 E4:1 D4:3 R:1 G4:1 G4:1 A4:1 A4:1 G4:1 G4:1 E4:2 G4:1 E4:1 D4:1 E4:1 C4:3 R:1'},
  macdonald:{title:'올드 맥도날드',sub:'미국 민요 · 8마디',bpm:104,m:4,n:'C4:1 C4:1 C4:1 G3:1 A3:1 A3:1 G3:2 E4:1 E4:1 D4:1 D4:1 C4:3 R:1 G3:1 C4:1 C4:1 C4:1 G3:1 A3:1 A3:1 G3:2 E4:1 E4:1 D4:1 D4:1 C4:4'},
  silent:{title:'고요한 밤',sub:'그루버 · 3박자',bpm:76,m:3,n:'G4:1.5 A4:.5 G4:1 E4:3 G4:1.5 A4:.5 G4:1 E4:3 D5:2 D5:1 B4:3 C5:2 C5:1 G4:3'},
  arirang:{title:'아리랑',sub:'우리 민요 · 3박자',bpm:84,m:3,n:'G4:1.5 A4:.5 G4:.5 A4:.5 C5:1.5 D5:.5 C5:.5 D5:.5 E5:.5 D5:.5 C5:.5 A4:.5 G4:.5 A4:.5 C5:3'},
  london:{title:'런던 다리',sub:'영국 민요 · 8마디',bpm:104,m:4,n:'G4:1.5 A4:.5 G4:1 F4:1 E4:1 F4:1 G4:2 D4:1 E4:1 F4:2 E4:1 F4:1 G4:2'},
  elise:{title:'엘리제를 위하여',sub:'베토벤 · 앞부분',bpm:116,m:3,n:'E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1.5 C4:.5 E4:.5 A4:.5 B4:1.5 E4:.5 G#4:.5 B4:.5 C5:1.5 R:.5 E4:.5 E5:.5 D#5:.5 E5:.5 D#5:.5 E5:.5 B4:.5 D5:.5 C5:.5 A4:1.5 C4:.5 E4:.5 A4:.5 B4:1.5 E4:.5 C5:.5 B4:.5 A4:3'},
  birthday:{title:'생일 축하 노래',sub:'전통 노래 · 8마디',bpm:100,m:3,n:'G4:.75 G4:.25 A4:1 G4:1 C5:1 B4:2 G4:.75 G4:.25 A4:1 G4:1 D5:1 C5:2 G4:.75 G4:.25 G5:1 E5:1 C5:1 B4:1 A4:1 F5:.75 F5:.25 E5:1 C5:1 D5:1 C5:3'},
});
Object.values(MX_SONGS).forEach(s=>{if(!s.ev){const p=mxParse(s.n);s.ev=p.ev;s.total=p.total;}});
const SHORT={mary:'🐑 메리의 어린 양',twinkle:'⭐ 작은 별',nabiya:'🦋 나비야',school:'🔔 학교종',macdonald:'🐄 올드 맥도날드',jingle:'🛎️ 징글벨',ode:'🎼 환희의 송가',silent:'🌙 고요한 밤',arirang:'🏔️ 아리랑',london:'🌉 런던 다리',elise:'🎹 엘리제를 위하여',birthday:'🎂 생일 축하 노래'};
const LV={};
['mary','nabiya','school','twinkle','macdonald','london','jingle','silent','birthday','arirang','ode','elise'].forEach(k=>{LV['dyn_'+k]={mode:'dyn',song:k,label:'셈여림 지휘 · '+MX_SONGS[k].title,desc:MX_SONGS[k].sub,tag:'',ic:'',short:SHORT[k],grp:'🎚️ 셈여림 지휘 (곡을 골라요)'};});
['mary','nabiya','school','twinkle'].forEach(k=>{LV['tempo_'+k]={mode:'tempo',song:k,label:'빠르기 지휘 · '+MX_SONGS[k].title,desc:MX_SONGS[k].sub,tag:'',ic:'',short:SHORT[k],grp:'🥢 빠르기 지휘 · 👂 듣기'};});
LV.listen={mode:'listen',label:'듣고 맞히기',desc:'연주를 듣고 셈여림·빠르기 찾기',tag:'4~6학년',ic:'👂',short:'👂 듣고 맞히기',grp:'🥢 빠르기 지휘 · 👂 듣기'};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M10 40L36 10" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/><circle cx="38" cy="8" r="4" fill="#ef476f"/><path d="M6 44h36" stroke="#fff4d6" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="30" r="3" fill="#fff4d6"/><circle cx="24" cy="36" r="3" fill="#fff4d6"/></svg>';
const AN=[['#c68642','🎻'],['#f5f0e6','🎺'],['#e8913a','🥁'],['#3a3a3a','🎹'],['#ffb3c1','🎻'],['#9ad1ff','🎺']];
function critter(g,x,y,s,col,i,bob){g.save();g.translate(x,y-bob);g.lineJoin='round';g.lineWidth=Math.max(2,s*.07);g.strokeStyle='#08081a';g.fillStyle=col;
  for(const d of[-1,1]){g.beginPath();if(i%3===0){g.ellipse(d*s*.3,-s*.62,s*.12,s*.2,d*.2,0,TAU);}else if(i%3===1){g.arc(d*s*.32,-s*.55,s*.14,0,TAU);}else{g.moveTo(d*s*.15,-s*.5);g.lineTo(d*s*.36,-s*.8);g.lineTo(d*s*.42,-s*.42);g.closePath();}g.fill();g.stroke();}
  g.beginPath();g.arc(0,-s*.3,s*.42,0,TAU);g.fill();g.stroke();g.fillStyle='#08081a';g.beginPath();g.arc(-s*.15,-s*.35,s*.05,0,TAU);g.fill();g.beginPath();g.arc(s*.15,-s*.35,s*.05,0,TAU);g.fill();g.beginPath();g.arc(0,-s*.22,s*.1,.1*Math.PI,.9*Math.PI);g.stroke();
  g.fillStyle=i%2?'#ef476f':'#118ab2';K.rr(g,-s*.3,s*.1,s*.6,s*.38,s*.1);g.fill();g.stroke();g.restore();K.emo(g,AN[i][1],x,y-bob+s*.3,s*.5);}
function stage(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#1b1a2e','#2b2950','#1b1a2e']);for(let i=0;i<40;i++){g.fillStyle=`rgba(255,255,255,${.2+.3*Math.abs(Math.sin(t*.8+i))})`;g.fillRect((i*7919%1000)/1000*W,(i*104729%997)/997*H*.6,1.5,1.5);}}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    stage(g,W0,H0,0,T);const u=Math.min(W0,H0)/6;const lvl=.5+.5*Math.sin(T*.8);const bt=Math.abs(Math.sin(T*3.3));AN.forEach((a,i)=>{critter(g,W0*(.12+i*.15),H0*.5,u*1.1,a[0],i,bt*u*.25*lvl);});
    const a=Math.sin(T*3.3)*.5;g.save();g.translate(W0*.5,H0*.88);g.rotate(a);g.strokeStyle='#fff4d6';g.lineWidth=u*.1;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,-u*1.7);g.stroke();g.fillStyle=PINK;g.beginPath();g.arc(0,-u*1.75,u*.14,0,TAU);g.fill();g.restore();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'maestro',title:'꼬마 지휘자',title1:'별빛 연주회 지휘대',title2:'꼬마 지휘자',emoji:LOGO,
  subtitle:'4~6학년 음악 · 셈여림과 빠르기',
  howto:'🎚️ <b>셈여림</b>: 곡이 흐르는 동안 악보의 pp~ff, 점점 세게·여리게를 보고 지휘봉을 <b>위아래로 끌어</b> 소리 크기를 지휘해요. 곡이 끝나면 게임도 끝나요.<br>🥢 <b>빠르기</b>: 구간마다 바뀌는 빠르기말에 맞춰 <b>박마다 톡톡!</b> 내가 친 박대로 곡이 연주돼요.<br>👂 <b>듣고 맞히기</b>: 연주를 듣고 골라요.',
  how:p=>(LV[p.levelId].label+' — '+LV[p.levelId].desc),
  theme:{c1:'#ef476f',c2:'#ffd166'},hero:heroScene,vignette:.1,durs:[90,120,180],levelTitle:'어떤 곡을 지휘할까요?',
  txt:{who:'누가 지휘자일까요?',dur:'연주회 시간',pace:'생각하는 시간',seat:'번 지휘자 ',go:'지휘 시작!',s1:'1. 곡',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.grp,t:v.short,d:''})),
  untimed(id){return LV[id]&&LV[id].mode!=='listen';},
  summary:`<ul><li><b>셈여림</b>은 소리의 세기예요: pp(아주 여리게) p(여리게) mp(조금 여리게) mf(조금 세게) f(세게) ff(아주 세게). 점점 세게는 <b>cresc.</b>, 점점 여리게는 <b>decresc.</b>예요.</li>
    <li><b>빠르기말</b>: Adagio(느리게) · Andante(걷는 빠르기로) · Moderato(보통 빠르기로) · Allegro(빠르게). 숫자가 클수록 빨라요(♩=박의 개수).</li>
    <li>지휘자는 지휘봉으로 <b>박</b>을 저어 연주의 빠르기와 세기를 모두에게 알려 줘요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const L=LV[p.levelId];const top=(p.top||0)+u*.5;const pad=u*.35;const land=W>=H*1.1;let band,track,meter,card;
    if(land){const rw=Math.min(W*.3,u*8);meter={x:W-pad-rw,y:top,w:rw,h:H-top-pad};band={x:pad,y:top,w:W-rw-pad*3,h:(H-top)*.46};track={x:pad,y:top+band.h+u*.3,w:W-rw-pad*3,h:H-top-band.h-u*.3-pad};}
    else{const rw=Math.min(W*.42,u*9);band={x:pad,y:top,w:W-pad*2,h:(H-top)*.24};track={x:pad,y:top+band.h+u*.25,w:W-pad*2,h:(H-top)*.17};meter={x:W-pad-rw,y:track.y+track.h+u*.3,w:rw,h:H-(track.y+track.h+u*.3)-pad};}
    let opts=[],rep2=null;if(L.mode==='listen'){const tr=track,mm=meter;const ox=land?mm.x:pad,oy=land?mm.y:tr.y+u*2.2,ow=land?mm.w:W-pad*2,oh=land?mm.h-u*1.5:H-oy-pad-u*1.3;const gap=u*.25,oh1=(oh-gap*3)/4;for(let i=0;i<4;i++)opts.push({x:ox,y:oy+i*(oh1+gap),w:ow,h:oh1});rep2={x:ox,y:oy+oh+gap*.5,w:ow,h:u*1.0};}
    return{W,H,u,L,land,band,track,meter,pad,top,opts,rep2};},
  init(p){const st=p.state,L=LV[p.levelId];Object.assign(st,{T:0,clk:0,started:false,pr:{},msg:'',msgT:0,okN:0,ended:false,level:.4,beatBounce:0,amp:0,q:null,n:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,listen:0});
    if(L.mode==='listen')this.newQ(p);},
  /* ===== 시작 ===== */
  start(p){const st=p.state,L=LV[p.levelId];st.begun=true;st.started=true;if(L.mode==='listen'){this._p=p;this.nq0(p);return;}
    const S=MX_SONGS[L.song];st.S=S;st.spb=60/S.bpm;st.SEGB=S.m*2;st.NSEG=Math.ceil(S.total/st.SEGB);st.CH=mxChords(S);st.endT=S.total*st.spb;
    if(L.mode==='dyn'){const R=p.R;st.segs=[];for(let i=0;i<st.NSEG;i++)st.segs.push(this.makeSeg(R,i?st.segs[i-1].b:null));st.grp=M.ok()?MUS.group(.06+st.level*.94):null;st.solo=Engine.players.length===1;const lead=.4+st.spb*4;st.a0=M.now()+lead;st.clk=-lead;st.ei=0;st.schedK=-4;st.lastSeg=-1;st.samples=[];st.lastBeat=-99;
      p.ask('🎚️ <b>'+L.label.split('·')[1].trim()+'</b>','지휘봉을 위아래로 끌어 악보의 셈여림을 지휘해요');}
    else{const TB=Math.ceil(S.total),NS=Math.ceil(TB/st.SEGB);st.TB=TB;st.NS=NS;st.byBeat=[];S.ev.forEach(e=>{const b=Math.floor(e.at+1e-6);(st.byBeat[b]=st.byBeat[b]||[]).push(e);});const R=p.R;st.plan=[];for(let i=0;i<NS;i++){let t;do{t=R.pick(TEMPO);}while(i&&t===st.plan[i-1]);if(!i&&(t===TEMPO[0]||t===TEMPO[3]))t=TEMPO[1+R.int(0,1)];st.plan.push(t);}
      st.beat=0;st.sec=0;st.taps=[];st.secTaps=[];st.bpm=0;st.show=0;st.solo=Engine.players.length===1;p.ask('🥢 <b>'+L.label.split('·')[1].trim()+'</b>','구간마다 바뀌는 빠르기말에 맞춰 박마다 톡톡!');this.tempoShow(p);}},
  makeSeg(R,prev){const r=R.f();if(r<.28&&prev!=null){const up=prev<.5;const i0=DYN.findIndex(d=>d[3]>=prev);const tgt=up?DYN[Math.min(5,i0+3)][3]:DYN[Math.max(0,i0-3)][3];return{h:true,a:prev,b:tgt,label:up?'cresc.':'decresc.',ko:up?'점점 세게':'점점 여리게'};}
    let d;do{d=DYN[R.int(0,5)];}while(prev!=null&&Math.abs(d[3]-prev)<.1);return{h:false,a:d[3],b:d[3],label:d[0],ko:d[2]};},
  target(p,t){const st=p.state;if(!isFinite(t))t=0;const k=Math.min(st.NSEG-1,Math.max(0,Math.floor(t/(st.SEGB*st.spb))));const s=st.segs[k];const f=Math.max(0,Math.min(1,(t-k*st.SEGB*st.spb)/(st.SEGB*st.spb)));return s.a+(s.b-s.a)*f;},
  setLevel(p,v){const st=p.state;st.level=clamp(v,0,1);if(st.solo&&st.grp)st.grp.set(.06+st.level*.94);},
  /* ===== 매 프레임 ===== */
  upd(p,dt){const st=p.state,L=LV[p.levelId];this._p=p;if(L.mode==='listen'){if(st.listen>0)st.listen-=dt;M.decay(st,dt);st.amp=Math.max(0,st.amp-dt*3);return;}
    if(!st.started)return;st.clk+=dt;M.decay(st,dt);if(st.msgT>0)st.msgT-=dt;st.amp=Math.max(0,st.amp-dt*2.5);
    if(L.mode==='dyn')this.dynUpd(p,dt);else if(L.mode==='tempo'){st.show+=dt;}},
  dynUpd(p,dt){const st=p.state,S=st.S;const t=st.clk;if(st.ended)return;
    if(M.lead(p)){const lim=t+.4;while(st.ei<S.ev.length&&S.ev[st.ei].at*st.spb<lim){const e=S.ev[st.ei++],when=st.a0+e.at*st.spb,v=st.solo?1:(.06+this.target(p,e.at*st.spb)*.94);M.play('piano',e.m,when,Math.max(.25,e.dur*st.spb*.95),.8,{group:st.grp,vol:v});}
      while(st.schedK*st.spb<lim&&st.schedK<Math.ceil(S.total)){const k=st.schedK,when=st.a0+k*st.spb;if(k<0){M.hit('wood',when,.6,{hi:k===-4});}else{const v=st.solo?1:(.06+this.target(p,k*st.spb)*.94);
        if(k%S.m===0){const c=st.CH[Math.floor(k/S.m)];if(c){M.play('piano',c[0]-12,when,st.spb*S.m*.9,.55,{group:st.grp,vol:v});c[1].forEach(pc=>{let m=60+((pc+120)%12);if(m>67)m-=12;M.play('pad',m-12,when,st.spb*S.m*.95,.35,{group:st.grp,vol:v});});M.hit('kick',when,.35,{group:st.grp,vol:v});}}else M.hit('hat',when,.15,{group:st.grp,vol:v});}st.schedK++;}}
    const seg=Math.min(st.NSEG-1,Math.floor(t/(st.SEGB*st.spb)));if(seg!==st.lastSeg&&t>=0){this.evalSeg(p,st.lastSeg);st.lastSeg=seg;st.samples=[];}
    if(t>=0){const tg=this.target(p,t),ok=Math.abs(st.level-tg)<=.13;st.samples.push(ok);st.okNow=ok;const beat=Math.floor(t/st.spb);if(beat!==st.lastBeat){st.lastBeat=beat;st.amp=st.solo?st.level:tg;}}
    if(t>=st.endT+.5){st.ended=true;this.evalSeg(p,st.lastSeg);st.msg='🎼 '+S.title+' 지휘 끝!';st.msgT=5;setTimeout(()=>{if(p.active&&!p.finished)Engine.finish(p);},1800);}},
  evalSeg(p,i){const st=p.state;if(i<0||!st.samples.length)return;const ok=st.samples.filter(x=>x).length/st.samples.length;st.segs[i].res=ok;const G=this.geo(p);
    if(ok>=.6){p.hit(true,{pts:Math.round(30+70*ok),x:G.meter.x,y:G.meter.y+G.meter.h*.3,tip:st.segs[i].ko+' 지휘 성공! ('+Math.round(ok*100)+'%)',tipMs:1100});}
    else p.hit(false,{pen:10,shake:false,review:st.segs[i].label+' = '+st.segs[i].ko+' (지휘봉 높이를 맞춰 보세요)',tip:st.segs[i].label+' = '+st.segs[i].ko+' ('+Math.round(ok*100)+'%)',tipMs:1400});},
  /* ===== 빠르기 ===== */
  tempoShow(p){const st=p.state;st.show=0;const c=st.plan[st.sec];st.msg="'"+c[2]+"' 빠르기로 박을 저어요";st.msgT=5;},
  tempoTap(p){const st=p.state;if(!st.started||st.ended||!p.active)return;M.press(st,'baton',.15);const now=performance.now();st.taps.push(now);st.secTaps.push(now);if(st.taps.length>7)st.taps.shift();
    const last=st.taps.length>1?now-st.taps[st.taps.length-2]:60000/st.plan[st.sec][5];const ivs=Math.max(.25,Math.min(1.3,last/1000));const vol=st.solo?.9:.45;const S=st.S;
    if(st.solo){(st.byBeat[st.beat]||[]).forEach(e=>M.play('piano',e.m,M.now()+(e.at-st.beat)*ivs,Math.max(.2,e.dur*ivs*.95),.8,{vol}));if(st.beat%S.m===0){const c=st.CH[Math.floor(st.beat/S.m)];if(c)M.play('piano',c[0]-12,null,ivs*S.m*.9,.5,{vol:.7});}}else M.hit('wood',null,.6,{vol});
    st.amp=.7;
    if(st.taps.length>=3){const iv=[];for(let i=1;i<st.taps.length;i++)iv.push(st.taps[i]-st.taps[i-1]);const avg=iv.reduce((a,b)=>a+b,0)/iv.length;st.bpm=60000/avg;st.dev=Math.sqrt(iv.reduce((a,b)=>a+(b-avg)**2,0)/iv.length)/avg;}
    st.beat++;
    if(st.beat>=st.TB){st.ended=true;this.tempoEval(p);st.msg='🎼 '+S.title+' 지휘 끝!';st.msgT=5;setTimeout(()=>{if(p.active&&!p.finished)Engine.finish(p);},1800);return;}
    if(st.beat%st.SEGB===0){this.tempoEval(p);st.sec++;st.secTaps=[];setTimeout(()=>{if(p.active)this.tempoShow(p);},600);}},
  tempoEval(p){const st=p.state;const c=st.plan[st.sec],iv=[];for(let i=2;i<st.secTaps.length;i++)iv.push(st.secTaps[i]-st.secTaps[i-1]);const G=this.geo(p);
    if(iv.length<2){p.hit(false,{pen:10,shake:false,tip:'박을 더 저어 봐요',tipMs:1200,review:c[0]+'('+c[2]+') 구간: 박을 계속 저어야 해요'});return;}
    const avg=iv.reduce((a,b)=>a+b,0)/iv.length,bpm=60000/avg,dev=Math.sqrt(iv.reduce((a,b)=>a+(b-avg)**2,0)/iv.length)/avg;const lo=c[3]*.94,hi=c[4]*1.06,mid=(c[3]+c[4])/2,half=(c[4]-c[3])/2+4;
    if(bpm>=lo&&bpm<=hi&&dev<.22){const pts=Math.round(55+45*Math.max(0,1-Math.abs(bpm-mid)/half)*(1-dev*2));p.hit(true,{pts,x:p.W/2,y:G.track.y,tip:c[0]+'('+c[2]+') 딱 맞았어요! ♩='+Math.round(bpm),tipMs:1500});st.okN++;}
    else p.hit(false,{pen:10,shake:false,review:c[0]+'('+c[2]+')은 ♩='+c[3]+'~'+c[4]+' 정도예요',tip:c[0]+'은 ♩='+c[3]+'~'+c[4]+' 정도예요. (내 박 ♩='+Math.round(bpm)+')',tipMs:2200});},
  /* ===== 듣고 맞히기 ===== */
  make(p,L){const R=p.R;if(R.f()<.5){const T=TEMPO[R.pick([0,3,1,2])];return{type:'t',ans:T[0],bpm:T[5],a:.55,opts:TEMPO.map(t=>({k:t[0],l:t[0],s:t[2]})),text:'',reveal:T[0]+' ('+T[2]+')',review:'연주의 빠르기는 '+T[0]+' ('+T[2]+', ♩='+T[3]+'~'+T[4]+')',speak:''};}
    const kind=R.f();if(kind<.35){const up=R.f()<.5;return{type:'d',ans:up?'cresc.':'decresc.',bpm:100,a:up?.12:.95,b:up?.95:.12,opts:[{k:'cresc.',l:'cresc.',s:'점점 세게'},{k:'decresc.',l:'decresc.',s:'점점 여리게'},{k:'p',l:'p',s:'여리게'},{k:'f',l:'f',s:'세게'}],text:'',reveal:(up?'cresc. (점점 세게)':'decresc. (점점 여리게)'),review:'소리가 '+(up?'점점 커졌어요: cresc.':'점점 작아졌어요: decresc.'),speak:''};}
    const d=R.pick([DYN[1],DYN[4],DYN[0],DYN[5]]);return{type:'d',ans:d[0],bpm:100,a:d[3],opts:[DYN[0],DYN[1],DYN[4],DYN[5]].map(x=>({k:x[0],l:x[0],s:x[2]})),text:'',reveal:d[0]+' ('+d[2]+')',review:'연주의 셈여림은 '+d[0]+' ('+d[2]+')',speak:''};},
  qtime(){return 12;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.type==='t'?'👂 이 연주의 빠르기는?':'👂 이 연주의 셈여림은?';},askSub(){return '잘 듣고 골라요';},
  isOk(q,i){return q.opts[i].k===q.ans;},tipOf(q){return '정답은 '+q.reveal;},goodTip(q){return '정답! '+q.reveal;},hold(p){return p.state.listen>0;},
  onNew(p,q){const st=p.state;this._p=p;st.listen=0;const t=M.now()+.25,spb=60/q.bpm,n=8;if(M.lead(p))for(let k=0;k<n;k++){let lv=q.a;if(q.b!=null)lv=q.a+(q.b-q.a)*k/(n-1);const v=.05+lv*.95,when=t+k*spb;const m=MEL[k%MEL.length];if(m)M.play('piano',m+12,when,spb*.9,.8,{vol:v});if(k%2===0)M.play('pad',BASS[k/2]+12,when,spb*1.9,.8,{vol:v});if(k%4===0)M.hit('kick',when,.4,{vol:v});}
    st.listen=.25+n*spb+.3;st.tl=st.T+.25;st.spb2=spb;st.q0=q;},
  onVerdict(p,q,ok){p.state.listen=0;},
  /* ===== 입력 ===== */
  down(p,x,y){const st=p.state,G=this.geo(p),L=LV[p.levelId];
    if(L.mode==='listen'){const q=st.q;if(!q)return;if(K.inRect(x,y,G.rep2)){if(!st.lock&&st.listen<=0)this.onNew(p,q);return;}if(st.lock||st.listen>0)return;const i=G.opts.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);return;}
    if(L.mode==='dyn'){if(K.inRect(x,y,G.meter)){st.drag=true;this.dragTo(p,y);}return;}
    if(L.mode==='tempo'){this.tempoTap(p);}},
  move(p,x,y,down){const st=p.state;if(LV[p.levelId].mode==='dyn'&&st.drag&&down)this.dragTo(p,y);},
  up(p){p.state.drag=false;},
  dragTo(p,y){const G=this.geo(p);const m=G.meter;const top=m.y+m.h*.1,bot=m.y+m.h*.92;this.setLevel(p,1-(y-top)/(bot-top));},
  key(p,e){const L=LV[p.levelId],st=p.state;if(L.mode==='dyn'){if(e.key==='ArrowUp'){e.preventDefault&&e.preventDefault();this.setLevel(p,st.level+.06);}else if(e.key==='ArrowDown'){e.preventDefault&&e.preventDefault();this.setLevel(p,st.level-.06);}}
    else if(L.mode==='tempo'){if(e.code==='Space'||e.key==='Enter'){e.preventDefault&&e.preventDefault();this.tempoTap(p);}}else{const n=Number(e.key);if(st.q&&!st.lock&&st.listen<=0&&n>=1&&n<=4)this.verdict(p,n-1,false);}},
  botAct(p){const st=p.state,L=LV[p.levelId],G=this.geo(p);const rc=p.cv.getBoundingClientRect();
    if(L.mode==='listen'){const q=st.q;if(!q||st.lock||st.listen>0)return null;const i=q.opts.findIndex(o=>o.k===q.ans);const r=G.opts[i];return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};}
    if(L.mode==='dyn'){if(!st.started||st.ended)return null;const tg=this.target(p,st.clk+.1);const m=G.meter;const top=m.y+m.h*.1,bot=m.y+m.h*.92;return{k:'click',x:rc.left+m.x+m.w*.5,y:rc.top+top+(1-tg)*(bot-top)};}
    if(!st.started||st.ended)return null;const c=st.plan[st.sec];if(!st.lastBotT||performance.now()-st.lastBotT>=60000/c[5]-8){st.lastBotT=performance.now();return{k:'click',x:rc.left+G.W/2,y:rc.top+G.H*.8};}return null;},
  /* ===== 그리기 ===== */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T||st.clk,L=G.L;stage(g,W,H,u,Math.abs(st.clk));
    const b=G.band;K.card(g,b.x,b.y,b.w,b.h,u*.3,'rgba(255,255,255,.06)',{stroke:'rgba(255,209,102,.4)',lw:2,blur:0,dy:0});
    const amp=st.amp||0;const n=6,sw=b.w/n;const bt=Math.abs(Math.sin(Math.max(0,st.clk)*Math.PI/(st.spb||.6)));AN.forEach((a,i)=>{critter(g,b.x+sw*(i+.5),b.y+b.h*.8,Math.min(sw*.75,b.h*.36),a[0],i,bt*amp*u*.5*(1+(i%2)*.2));});
    if(L.mode==='dyn')this.drawDyn(p,g,G);else if(L.mode==='tempo')this.drawTempo(p,g,G);else this.drawListen(p,g,G);
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.3,'rgba(43,41,80,.92)',{stroke:GOLD,lw:2,blur:0,dy:0});K.txt(g,'🪄 '+(st.okN||0)+'구간 성공',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.42,color:GOLD,maxW:u*3.4});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,G.band.x+G.band.w/2,G.band.y+G.band.h*.18,{size:Math.min(u*.65,W*.04),color:'#fff',stroke:'#08081a',lw:u*.14,maxW:G.band.w*.94});},
  drawDyn(p,g,G){const st=p.state,u=G.u,W=G.W;const m=G.meter,tr=G.track;if(!st.segs)return;const t=st.clk;
    /* 악보 칸 */
    K.card(g,tr.x,tr.y,tr.w,tr.h,u*.3,'rgba(255,255,255,.07)',{stroke:'rgba(255,209,102,.4)',lw:2,blur:0,dy:0});g.save();K.rr(g,tr.x,tr.y,tr.w,tr.h,u*.3);g.clip();const cw=tr.w/3.2;const cur=Math.max(0,t)/(st.SEGB*st.spb);
    st.segs.forEach((s,i)=>{const x=tr.x+(i-cur)*cw+cw*.2;if(x>tr.x+tr.w||x+cw<tr.x)return;const isCur=Math.floor(cur)===i&&t>=0;K.rr(g,x+4,tr.y+u*.2,cw-8,tr.h-u*.4,u*.2);g.fillStyle=isCur?'rgba(255,209,102,.28)':'rgba(255,255,255,.08)';g.fill();g.lineWidth=isCur?4:2;g.strokeStyle=isCur?GOLD:'rgba(255,255,255,.25)';g.stroke();
      if(s.h){g.strokeStyle=GOLD;g.lineWidth=4;g.lineCap='round';g.beginPath();if(s.b>s.a){g.moveTo(x+cw*.15,tr.y+tr.h*.5);g.lineTo(x+cw*.85,tr.y+tr.h*.28);g.moveTo(x+cw*.15,tr.y+tr.h*.5);g.lineTo(x+cw*.85,tr.y+tr.h*.72);}else{g.moveTo(x+cw*.15,tr.y+tr.h*.28);g.lineTo(x+cw*.85,tr.y+tr.h*.5);g.moveTo(x+cw*.15,tr.y+tr.h*.72);g.lineTo(x+cw*.85,tr.y+tr.h*.5);}g.stroke();}
      K.txt(g,s.label,x+cw/2,tr.y+tr.h*.4,{size:Math.min(tr.h*.3,u*1.3),color:GOLD,maxW:cw*.8});K.txt(g,s.ko,x+cw/2,tr.y+tr.h*.72,{size:Math.min(tr.h*.15,u*.6),color:'#fff4d6',maxW:cw*.85});
      if(s.res!=null)K.txt(g,s.res>=.6?'⭕':'❌',x+cw-u*.5,tr.y+u*.55,{size:u*.55});});g.restore();
    /* 지휘봉 막대 */
    K.card(g,m.x,m.y,m.w,m.h,u*.3,'rgba(255,255,255,.07)',{stroke:'rgba(255,209,102,.4)',lw:2,blur:0,dy:0});const top=m.y+m.h*.1,bot=m.y+m.h*.92;const tx=m.x+m.w*.34,tw=m.w*.3;
    DYN.slice().reverse().forEach((d,i)=>{const yy=top+(1-d[3])*(bot-top);K.txt(g,d[0],m.x+m.w*.14,yy,{size:Math.min(u*.6,m.h*.05),color:'rgba(255,244,214,.75)',maxW:m.w*.2});g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=1;g.beginPath();g.moveTo(m.x+m.w*.26,yy);g.lineTo(m.x+m.w*.9,yy);g.stroke();});
    const tg=t>=0?this.target(p,t):st.segs[0].a;const ty=top+(1-tg)*(bot-top),zh=(bot-top)*.13;K.rr(g,tx-u*.2,ty-zh,tw+u*.4,zh*2,u*.2);g.fillStyle='rgba(94,231,255,.28)';g.fill();g.setLineDash([6,5]);g.lineWidth=3;g.strokeStyle='#5ee7ff';g.stroke();g.setLineDash([]);
    const ly=top+(1-st.level)*(bot-top);K.rr(g,tx,ly,tw,bot-ly,u*.2);g.fillStyle=st.okNow?'rgba(155,245,155,.55)':'rgba(239,71,111,.5)';g.fill();
    g.fillStyle=st.okNow?'#9bf59b':PINK;g.beginPath();g.arc(tx+tw/2,ly,u*.55,0,TAU);g.fill();g.lineWidth=3;g.strokeStyle='#fff4d6';g.stroke();K.emo(g,'🪄',tx+tw/2,ly,u*.7);
    K.txt(g,'지휘봉을 위아래로',m.x+m.w/2,m.y+u*.4,{size:u*.42,color:'#c9c4ff',maxW:m.w*.9});
    if(st.clk<0){const c=Math.ceil(-st.clk/st.spb);K.txt(g,String(Math.min(4,c)),G.track.x+G.track.w/2,G.band.y+G.band.h*.45,{size:u*2.6,color:'rgba(255,209,102,.85)'});}},
  drawTempo(p,g,G){const st=p.state,u=G.u,W=G.W,H=G.H;if(!st.plan)return;const c=st.plan[Math.min(st.sec,st.plan.length-1)];const tr=G.track;const mm=G.meter;
    /* 빠르기말 카드 */
    const cx=G.land?tr.x:tr.x,cw=G.land?tr.w:tr.w,ch=Math.min(tr.h,u*5);const pop=1+Math.max(0,.5-st.show)*.25;g.save();g.translate(cx+cw/2,tr.y+ch/2);g.scale(pop,pop);K.card(g,-cw/2,-ch/2,cw,ch,u*.3,'rgba(255,209,102,.18)',{stroke:GOLD,lw:3,blur:0,dy:0});K.txt(g,c[0],0,-ch*.18,{size:Math.min(ch*.4,u*2.2),color:GOLD,maxW:cw*.8});K.txt(g,c[1]+' · '+c[2]+' (♩='+c[3]+'~'+c[4]+')',0,ch*.22,{size:Math.min(ch*.16,u*.75),color:'#fff4d6',maxW:cw*.92});g.restore();
    const prog=((st.beat%st.SEGB)/st.SEGB);K.rr(g,cx+cw*.1,tr.y+ch+u*.15,cw*.8,u*.2,u*.1);g.fillStyle='rgba(255,255,255,.15)';g.fill();K.rr(g,cx+cw*.1,tr.y+ch+u*.15,Math.max(u*.2,cw*.8*prog),u*.2,u*.1);g.fillStyle=GOLD;g.fill();
    /* 바늘 */
    const sx=G.land?mm.x:G.pad,sw=G.land?mm.w:W-G.pad*2,sy=G.land?mm.y+u*.8:tr.y+ch+u*.9,sh=u*1.6;K.card(g,sx,sy,sw,sh+u*1.2,u*.3,'rgba(255,255,255,.07)',{stroke:'rgba(255,209,102,.4)',lw:2,blur:0,dy:0});
    TEMPO.forEach(t=>{const x0=sx+sw*.06+(t[3]-50)/120*sw*.88,w0=(t[4]-t[3])/120*sw*.88;K.rr(g,x0,sy+u*.3,w0,sh,u*.15);g.fillStyle=t===c?'rgba(255,209,102,.4)':'rgba(255,255,255,.1)';g.fill();K.txt(g,t[1],x0+w0/2,sy+u*.3+sh/2,{size:Math.min(u*.42,w0*.18),color:t===c?GOLD:'#c9c4ff',maxW:w0*.95});});
    if(st.bpm){const nx=sx+sw*.06+clamp((st.bpm-50)/120,0,1)*sw*.88;const okN=st.bpm>=c[3]&&st.bpm<=c[4]&&(st.dev||0)<.15;g.strokeStyle=okN?'#9bf59b':PINK;g.lineWidth=5;g.beginPath();g.moveTo(nx,sy+u*.1);g.lineTo(nx,sy+sh+u*.5);g.stroke();K.txt(g,'♩ = '+Math.round(st.bpm),sx+sw/2,sy+sh+u*.9,{size:u*.6,color:okN?'#9bf59b':'#fff4d6',maxW:sw*.8});}else K.txt(g,'♩ = ?',sx+sw/2,sy+sh+u*.9,{size:u*.6,color:'#c9c4ff'});
    /* 박 버튼 */
    const br=Math.min(W*.2,u*3);const bx=G.land?tr.x+tr.w/2:W/2,by=H-G.pad-br*1.0;const pr=st.pr.baton>0;g.fillStyle=pr?'#ff8fa8':PINK;g.beginPath();g.arc(bx,by+(pr?u*.08:0),br,0,TAU);g.fill();g.lineWidth=5;g.strokeStyle='#fff4d6';g.stroke();K.emo(g,'🪄',bx,by-br*.2,br*.8);K.txt(g,'박마다 톡!',bx,by+br*.55,{size:br*.28,color:'#fff',maxW:br*1.7});},
  drawListen(p,g,G){const st=p.state,u=G.u,q=st.q;if(!q)return;const tr=G.track;K.txt(g,q.type==='t'?'👂 빠르기는?':'👂 셈여림은?',tr.x+tr.w/2,tr.y+u*.5,{size:u*.8,color:GOLD,maxW:tr.w*.9});
    if(!st.lock&&st.listen<=0&&st.qmax>0){const bw=Math.min(tr.w*.7,u*10);QZ.bar(g,tr.x+tr.w/2-bw/2,tr.y+u*1.0,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:GOLD});}
    if(st.listen>0)K.txt(g,'🎧 잘 들어요…',tr.x+tr.w/2,tr.y+u*1.8,{size:u*.6,color:'#fff4d6'});
    G.opts.forEach((r,i)=>{let s='idle';if(st.lock){if(q.opts[i].k===q.ans)s='ok';else if(i===st.pick)s='bad';else s='dim';}g.save();g.globalAlpha=s==='dim'?.5:1;K.card(g,r.x,r.y,r.w,r.h,u*.25,s==='ok'?'#1f6b3a':s==='bad'?'#7a1d33':'#2b2950',{stroke:s==='ok'?'#9bf59b':s==='bad'?'#ff6b8b':GOLD,lw:3,blur:0,dy:0});K.txt(g,q.opts[i].l,r.x+r.w*.3,r.y+r.h/2,{size:Math.min(r.h*.4,u*1.1),color:GOLD,maxW:r.w*.5});K.txt(g,q.opts[i].s,r.x+r.w*.72,r.y+r.h/2,{size:Math.min(r.h*.28,u*.7),color:'#fff4d6',maxW:r.w*.4});g.restore();});
    const rp=G.rep2,can=!st.lock&&st.listen<=0;K.rr(g,rp.x,rp.y,rp.w,rp.h,rp.h/2);g.fillStyle=can?'#2b2950':'rgba(255,255,255,.08)';g.fill();g.lineWidth=2;g.strokeStyle=can?PINK:'#4a4a7a';g.stroke();K.txt(g,'🔁 다시 듣기',rp.x+rp.w/2,rp.y+rp.h/2,{size:u*.45,color:can?'#fff':'#7a7aa8',maxW:rp.w*.9});},
};
M.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1800,badMs:2600});
(function(){const nq=GAME.start;GAME.nq0=function(p){p.state.begun=true;nq.call(this,p);};const orig=GAME.start;GAME.start=function(p){const L=LV[p.levelId];p.state.begun=true;if(L.mode==='listen'){this._p=p;orig.call(this,p);}else this.startConduct(p);};})();
GAME.startConduct=function(p){const st=p.state,L=LV[p.levelId];st.started=true;const S=MX_SONGS[L.song];st.S=S;st.spb=60/S.bpm;st.SEGB=S.m*2;st.NSEG=Math.ceil(S.total/st.SEGB);st.CH=mxChords(S);st.endT=S.total*st.spb;st.solo=Engine.players.length===1;
  if(L.mode==='dyn'){const R=p.R;st.segs=[];for(let i=0;i<st.NSEG;i++)st.segs.push(this.makeSeg(R,i?st.segs[i-1].b:null));st.grp=M.ok()?MUS.group(.06+st.level*.94):null;const lead=.4+st.spb*4;st.a0=M.now()+lead;st.clk=-lead;st.ei=0;st.schedK=-4;st.lastSeg=-1;st.samples=[];st.lastBeat=-99;p.ask('🎚️ <b>'+L.label.split('·')[1].trim()+'</b>','지휘봉을 위아래로 끌어 악보의 셈여림을 지휘해요');}
  else{const TB=Math.ceil(S.total),NS=Math.ceil(TB/st.SEGB);st.TB=TB;st.NS=NS;st.byBeat=[];S.ev.forEach(e=>{const b=Math.floor(e.at+1e-6);(st.byBeat[b]=st.byBeat[b]||[]).push(e);});const R=p.R;st.plan=[];for(let i=0;i<NS;i++){let t;do{t=R.pick(TEMPO);}while(i&&t===st.plan[i-1]);if(!i&&(t===TEMPO[0]||t===TEMPO[3]))t=TEMPO[1+R.int(0,1)];st.plan.push(t);}
    st.beat=0;st.sec=0;st.taps=[];st.secTaps=[];st.bpm=0;st.show=0;p.ask('🥢 <b>'+L.label.split('·')[1].trim()+'</b>','구간마다 바뀌는 빠르기말에 맞춰 박마다 톡톡!');this.tempoShow(p);}};
Engine.boot(GAME);
