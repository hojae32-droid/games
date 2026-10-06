/* 5~6학년 수학 · 약수와 배수 · 공약수와 최대공약수 · 공배수와 최소공배수 — 약수·배수 크레인
   디자인: 보랏빛 오락실 뽑기 기계. 정답 인형을 뽑아 출구로 보내요. 틀린 인형은 감점! 황금 인형은 보너스 문제. */
const TAU=Math.PI*2;
const INK='#2a1440';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="6" fill="#3d1c80" stroke="#ffd23f" stroke-width="3"/><path d="M24 6v16M17 22h14l-3 8M17 22l3 8" stroke="#ffd23f" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="36" r="5" fill="#ff4f9a"/></svg>';
let NOWS=0;
/*@@ART@@*/
function newClaw(){return {x:HOME_X,rope:ROPE_MIN,arm:.6,state:'idle',held:null,contact:null,slipAt:null,sway:0,posT:POS_TIME,readyAt:0,dropT:null,waitT:0};}
const STAGE_ID=['s0','s1','s2','s3','all'];
function speedBonus(t){if(t==null)return 0;if(t<=4)return 50;if(t<=8)return 30;if(t<=12)return 10;return 0;}
const DEX_KEY='yakbae_crane_dex_v1';
let dex={};try{dex=JSON.parse(localStorage.getItem(DEX_KEY)||'{}')||{};}catch(e){dex={};}
function dexAdd(id){const isNew=!dex[id];dex[id]=(dex[id]||0)+1;try{localStorage.setItem(DEX_KEY,JSON.stringify(dex));}catch(e){}return isNew;}
function roundsOf(lv){if(lv==='all'){const o=[];for(let s=0;s<4;s++)for(const r of[1,2])o.push({s,r});return o;}const s=+lv[1];return[0,1,2].map(r=>({s,r}));}
/* 첫 화면 그림: 뽑기 기계 속 인형들 */
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const dolls=[...Array(10)].map((_,i)=>({x:60+i*62+(i%2)*14,y:FLOOR_Y-34-(i%3)*8,r:30,v:[6,12,18,4,9,24,8,16,3,36][i],type:DOLL_TYPES[i%DOLL_TYPES.length],glow:false}));
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;NOWS=T;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);ctx=g;
    const wide=W0>H0*1.25;const sc=Math.min(W0*.94/720,H0*(wide?.62:.52)/520);const mx=(W0-720*sc)/2,my=H0-520*sc-H0*.04;
    g.save();g.translate(mx,my);g.scale(sc,sc);g.beginPath();rr(0,0,W,H,16);g.clip();drawBackground(T);dolls.forEach((d,i)=>{d.glow=i===Math.floor(T/2)%10;drawDoll(d);});drawDivider();
    const ph=(T%5)/5,tgt=dolls[Math.floor(T/5)%10];const cx=ph<.25?HOME_X+(tgt.x-HOME_X)*(ph/.25):ph<.9?tgt.x:tgt.x;const rope=ph<.25?ROPE_MIN:ph<.45?ROPE_MIN+(tgt.y-RAIL_Y-90)*((ph-.25)/.2):ph<.55?tgt.y-RAIL_Y-90:ROPE_MIN+(tgt.y-RAIL_Y-90)*(1-(ph-.55)/.3);
    const c={x:cx,rope:Math.max(ROPE_MIN,rope),arm:ph<.45?1:ph<.55?.2:.2,state:'idle',sway:0};drawClaw(c);drawGlass();g.restore();
    g.save();g.lineWidth=Math.max(3,sc*5);g.strokeStyle='#ffd23f';K.rr(g,mx,my,720*sc,520*sc,16*sc);g.stroke();g.restore();};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'m04-factor-crane',title:'약수·배수 크레인',title1:'오락실 인형 뽑기',title2:'약수·배수 크레인',emoji:LOGO,
  subtitle:'5~6학년 · 약수와 배수 · 공약수 · 공배수',
  howto:'<b>◀ ▶</b>로 크레인을 움직이고 <b>뽑기!</b>를 눌러요. 인형 한가운데를 노려야 단단히 잡혀요. 정답 인형을 모두 뽑으면 미션 성공! 틀린 인형을 뽑으면 감점이에요. <b>황금 인형</b>은 보너스 문제를 맞히면 남은 정답 점수가 2배! 키보드는 ←→ 와 스페이스(혼자 할 때)를 쓸 수 있어요.',
  how:p=>({s0:'<b>약수</b> 인형을 모두 뽑아요 (짝꿍 약수는 보너스)',s1:'<b>배수</b> 인형을 모두 뽑아요',s2:'<b>공약수</b>와 <b>최대공약수</b> 인형을 뽑아요',s3:'<b>공배수</b>와 <b>최소공배수</b> 인형을 뽑아요',all:'1~4단계를 이어서 도전해요'}[p.levelId]),
  theme:{c1:'#ff4f9a',c2:'#3d1c80'},hero:heroScene,vignette:.05,durs:[240,360,600],levelTitle:'어떤 인형을 뽑을까요?',
  txt:{who:'누가 뽑기 왕이 될까요?',dur:'게임 시간',pace:'뽑기 시간',seat:'번 기계 ',go:'코인 넣고 시작!',s1:'1. 단계',s2:'2. 방법',s3:'3. 이름'},
  levels:[...STAGES.map((st,i)=>({id:'s'+i,g:'5~6학년',t:st.icon+' '+st.title,d:st.rounds.join(' · ')})),{id:'all',g:'5~6학년',t:'🏆 전체 도전',d:'1~4단계 이어서 도전'}],
  summary:`<ul><li><b>약수</b>는 어떤 수를 나누어떨어지게 하는 수예요 (12의 약수: 1, 2, 3, 4, 6, 12). 약수는 짝꿍끼리 곱하면 원래 수가 돼요 (3 × 4 = 12).</li>
    <li><b>배수</b>는 어떤 수를 1배, 2배, 3배… 한 수예요 (4의 배수: 4, 8, 12, 16…).</li>
    <li><b>공약수</b>는 두 수의 공통인 약수, 그중 가장 큰 수가 <b>최대공약수</b>예요. 공약수는 모두 최대공약수의 약수예요.</li>
    <li><b>공배수</b>는 두 수의 공통인 배수, 그중 가장 작은 수가 <b>최소공배수</b>예요 (4와 6의 최소공배수 12).</li></ul>`,
  geo(p){const W0=p.W,H0=p.H,u=p.u;const Z0=(p.top||0)+u*.3,pad=Math.max(8,u*.3),gap=Math.max(6,u*.22);const A=H0-Z0-pad;const land=W0>=H0*1.2;let M,box,ctl;
    if(land){let h=A,w=h*720/520;if(w>W0*.62){w=W0*.62;h=w*520/720;}M={x:pad,y:Z0,w,h};const rx=M.x+M.w+gap,rw=W0-rx-pad;const ch=clamp(A*.4,u*3,u*6);ctl={x:rx,y:Z0+A-ch,w:rw,h:ch};box={x:rx,y:Z0,w:rw,h:A-ch-gap};}
    else{const w=W0-pad*2,h=w*520/720;M={x:pad,y:Z0,w,h};const rest=A-h-gap*2;const ch=Math.min(u*4,rest*.4);const bh=rest-ch;box={x:pad,y:M.y+h+gap,w,h:bh};ctl={x:pad,y:box.y+bh+gap,w,h:Math.max(u*2,ch)};}
    const sc=M.w/720;const bw=ctl.w;const bh=Math.min(ctl.h,u*4.2);const by=ctl.y+ctl.h-bh;
    const btn={l:{x:ctl.x,y:by,w:bw*.27,h:bh},d:{x:ctl.x+bw*.27+gap,y:by,w:bw*.46-gap*2,h:bh},r:{x:ctl.x+bw*.73,y:by,w:bw*.27,h:bh}};
    return{W:W0,H:H0,u,Z0,pad,gap,land,M,sc,box,ctl,btn,dex:{x:box.x+u*.2,y:box.y+u*.2,w:u*3.4,h:u*.85}};},
  init(p){const st=p.state;const lv=p.levelId;Object.assign(st,{T:0,p,lv,rounds:roundsOf(lv),ri:-1,lastStage:-1,posTime:15/p.pace,claw:newClaw(),dolls:[],floats:[],dir:0,coins:0,turn:null,done:true,quizOpen:false,quiz:null,res:null,banner:null,feed:null,press:null,hold:{},dexOpen:false,P:null});
    this.nextRound(p);this.keys(p);},
  keys(p){if(window.__crKb||p.n!==1)return;window.__crKb=1;const E=window.Engine;const L=['ArrowLeft','KeyA'],R=['ArrowRight','KeyD'],D=['Space','ArrowDown','KeyS','Enter'];
    window.addEventListener('keydown',e=>{const pp=E.players&&E.players[0];if(!pp||E.over||!pp.active||E.players.length!==1)return;const st=pp.state;if(st.dexOpen||st.quizOpen)return;if(L.includes(e.code)){st.dir=-1;e.preventDefault();}else if(R.includes(e.code)){st.dir=1;e.preventDefault();}else if(D.includes(e.code)){e.preventDefault();if(!e.repeat)GAME.startDrop(st);}});
    window.addEventListener('keyup',e=>{const pp=E.players&&E.players[0];if(!pp)return;const st=pp.state;if(L.includes(e.code)&&st.dir===-1)st.dir=0;if(R.includes(e.code)&&st.dir===1)st.dir=0;});},
  nextRound(p){const st=p.state;st.ri=(st.ri+1)%st.rounds.length;const R=st.rounds[st.ri];const _mr=Math.random;Math.random=p.R.f;let P;try{P=makeProblem(R.s,R.r);if(!P.finale&&Math.random()<.35){P.golden=true;P.coins+=1;}}finally{Math.random=_mr;}
    st.R=R;st.P=P;st.turn={collected:[],grabbedVals:[],gained:0,success:false,pendingPartner:null,double:false};st.coins=P.coins;st.done=false;st.quizOpen=false;st.quiz=null;st.res=null;st.dir=0;st.floats=[];st.claw=newClaw();st.feed=null;
    if(R.s!==st.lastStage){st.lastStage=R.s;st.banner={t:STAGES[R.s].icon+' STAGE '+(R.s+1)+' · '+STAGES[R.s].title,until:st.T+2.2};}
    spawnDollsS(st,P);this.setReady(st);p.ask('🪙 '+P.mission,P.sub);},
  setReady(m){const c=m.claw;c.state='ready';c.posT=m.posTime;c.readyAt=m.T;c.arm=.6;},
  startDrop(m){const c=m.claw;if(!m.p.active||c.state!=='ready'||m.quizOpen||m.dexOpen||m.done)return;m.coins--;c.dropT=m.T-c.readyAt;c.state='drop';c.arm=1;m.dir=0;m.p.Snd.tone&&m.p.Snd.tone(330,.5,'sawtooth',.02);},
  fb(m,t,cls){m.feed={t,cls:cls||'',until:m.T+6};},
  addFloat(m,x,y,text,color){m.floats.push({x,y,text,color,life:1.3});},
  updateClaw(m,dt){if(m.quizOpen||m.dexOpen||m.done)return;const p=m.p;const c=m.claw,st=c.state;let swayT=0;if(st==='ready'&&m.dir)swayT=-m.dir*7;if(st==='return')swayT=HOME_X<c.x?7:-7;c.sway+=(swayT-c.sway)*Math.min(1,dt*6);
    if(st==='ready'){if(m.turn.success){this.endMachine(m,true);return;}c.x=clamp(c.x+m.dir*230*dt,MIN_X,MAX_X);c.posT-=dt;if(c.posT<=0){c.posT=0;this.startDrop(m);}}
    else if(st==='drop'){c.rope+=250*dt;const gy=RAIL_Y+c.rope+30;let hit=null,best=1e9;for(const d of m.dolls){if(d.gone||d.held)continue;const dx=c.x-d.x;if(Math.abs(dx)<d.r*.97){const surf=d.y-Math.sqrt(d.r*d.r-dx*dx);if(gy>=surf&&surf<best){best=surf;hit=d;}}}
      const floor=c.x>=DIV_X+10?FLOOR_Y-16:H-40;if(hit||gy>=floor){c.contact=hit;c.state='close';p.Snd.tone&&p.Snd.tone(190,.09,'square',.04);}}
    else if(st==='close'){c.arm-=dt/.35;if(c.arm<=0){c.arm=0;this.resolveGrip(m);c.state='lift';}}
    else if(st==='lift'){c.rope-=190*dt;if(c.held&&c.slipAt!=null&&c.rope<=c.slipAt){const d=c.held;d.held=false;d.vx=(Math.random()-.5)*90;d.vy=0;c.held=null;c.slipAt=null;this.addFloat(m,c.x,RAIL_Y+c.rope+70,'미끄러졌다!','#ffd23f');this.fb(m,'앗, 미끄러졌어요! 인형 한가운데를 노려 보세요.','');p.Snd.tone&&p.Snd.tone(520,.12,'triangle',.05);}if(c.rope<=ROPE_MIN){c.rope=ROPE_MIN;c.state='return';}}
    else if(st==='return'){const dx=HOME_X-c.x,step=230*dt;if(Math.abs(dx)<=step){c.x=HOME_X;c.state='open';}else c.x+=Math.sign(dx)*step;}
    else if(st==='open'){c.arm+=dt/.3;if(c.arm>=.5&&c.held){const d=c.held;d.held=false;d.vx=0;d.vy=40;c.held=null;}if(c.arm>=1){c.arm=1;c.state='wait';c.waitT=0;}}
    else if(st==='wait'){c.waitT+=dt;const falling=m.dolls.some(d=>!d.gone&&d.x<DIV_X);if(!falling&&c.waitT>.5)this.finishAttempt(m);}},
  resolveGrip(m){const c=m.claw,d=c.contact;c.contact=null;if(!d||d.gone){this.fb(m,'빈손이에요! 인형 바로 위에서 뽑기 버튼을 눌러 보세요.','');return;}const off=Math.abs(c.x-d.x)/d.r;
    if(off<.45)grabDollS(m,d,null);else if(off<.75)grabDollS(m,d,ROPE_MIN+(c.rope-ROPE_MIN)*(.3+Math.random()*.4));else{d.vx=(d.x>c.x?1:-1)*150;d.vy=-60;this.addFloat(m,c.x,RAIL_Y+c.rope+60,'빗나감!','#ffd23f');this.fb(m,'앗, 빗나갔어요! 인형 한가운데를 노려 보세요.','');}},
  finishAttempt(m){m.claw.arm=.6;if(m.turn.success){this.endMachine(m,true);return;}if(m.coins<=0){this.endMachine(m,false);return;}this.setReady(m);},
  judge(m,d){d.gone=true;if(!m.turn)return;const P=m.P,p=m.p,v=d.v,T=m.turn;
    if(d.gold){if(dexAdd('gold'))this.addFloat(m,HOME_X,DIV_TOP-95,'도감 NEW!','#ffd23f');this.addFloat(m,HOME_X,DIV_TOP-50,'황금 인형!','#ffd23f');p.Snd.tone&&p.Snd.tone(1319,.3,'square',.05);this.openGoldQuiz(m);return;}
    if(P.kind==='venn')T.grabbedVals.push(v);
    if(P.targets.includes(v)&&!T.collected.includes(v)){const sb=speedBonus(d.grabSpeed);let pts=(P.finale?200:100)+sb,extra='';if(sb)extra+=`  ⚡ 빠른 뽑기 +${sb}`;
      if(P.kind==='factor'){if(T.pendingPartner===v){pts+=50;extra+='  🤝 짝꿍 보너스 +50';}m.dolls.forEach(x=>x.glow=false);const partner=P.n/v;T.pendingPartner=null;if(partner!==v&&!T.collected.includes(partner)){const pd=m.dolls.find(x=>x.v===partner&&!x.gone);if(pd){pd.glow=true;T.pendingPartner=partner;}}}
      if(T.double){pts*=2;extra+='  🌟 ×2';}T.collected.push(v);T.gained+=pts;this.addFloat(m,HOME_X,DIV_TOP-50,'+'+pts,'#3ee08a');if(dexAdd(d.type.id))this.addFloat(m,HOME_X,DIV_TOP-95,'도감 NEW!','#ffd23f');
      this.fb(m,'⭕ '+P.right(v)+extra,'good');p.hit(true,{pts,quiet:true});if(T.collected.length>=P.targets.length)T.success=true;}
    else{if(P.kind==='factor'){T.pendingPartner=null;m.dolls.forEach(x=>x.glow=false);}const pen=P.finale?80:50;T.gained-=Math.min(pen,p.score);this.addFloat(m,HOME_X,DIV_TOP-50,'−'+pen,'#ff5a6a');this.fb(m,'❌ '+P.wrong(v)+`  (−${pen}점)`,'bad');
      p.hit(false,{pen,quiet:true,review:strip(P.mission)+' → '+P.wrong(v)});}},
  openGoldQuiz(m){const Q=makeQuiz(m.R.s);m.quizOpen=true;m.quiz={kind:'gold',q:Q.q,opts:Q.opts,ans:Q.ans,sel:-1,msg:'',sub:'맞히면 남은 정답 인형 점수 2배!',tag:'🌟 황금 인형 보너스 문제',t0:m.T};},
  answerQuiz(m,i){const Z=m.quiz;if(!Z||Z.sel>=0)return;Z.sel=i;const ok=Z.opts[i]===Z.ans,p=m.p;
    if(Z.kind==='gold'){if(ok){m.turn.double=true;Z.msg='정답! 🌟 남은 정답 인형 점수가 2배!';p.Snd.win&&p.Snd.win();this.fb(m,'🌟 황금 부스터 발동! 남은 정답 인형 점수 2배','good');}else{Z.msg='아쉬워요. 정답은 '+Z.ans+'이에요.';p.Snd.bad&&p.Snd.bad();this.fb(m,'황금 인형 문제 정답은 '+Z.ans+'이에요. 계속 뽑아 보세요!','');p.hit(false,{pen:0,quiet:true,review:strip(Z.q)+' → '+Z.ans});}
      Z.until=m.T+1.5;}
    else{if(ok){m.turn.gained+=50;p.add(50);Z.msg='정답! 발견 보너스 +50';p.Snd.ok&&p.Snd.ok();}else{Z.msg='최대공약수 '+m.P.g+'의 약수 '+Z.ans+'는 공약수와 똑같아요!';p.Snd.bad&&p.Snd.bad();p.hit(false,{pen:0,quiet:true,review:'공약수는 최대공약수의 약수예요 → '+Z.ans});}Z.until=m.T+2.4;}},
  discovery(m){const P=m.P;const correct=P.common.slice().sort((a,b)=>a-b);const key=a=>a.join(', ');const cands=[];const mids=correct.filter(x=>x!==1&&x!==P.g);
    cands.push(mids.length?correct.filter(x=>x!==mids[mids.length-1]):correct.filter(x=>x!==P.g).concat([P.g*2]).sort((a,b)=>a-b));const extra=P.onlyOne.filter(x=>x<P.g*3).sort((a,b)=>a-b)[0];if(extra)cands.push([...correct,extra].sort((a,b)=>a-b));
    cands.push(divisors(P.a));cands.push(divisors(P.b));cands.push([1,P.g]);const seen=new Set([key(correct)]),wrongs=[];for(const c of cands){const k=key(c);if(!seen.has(k)){seen.add(k);wrongs.push(c);}if(wrongs.length>=3)break;}
    const opts=shuffle([correct,...wrongs]).map(key);m.quizOpen=true;m.quiz={kind:'disc',q:`최대공약수 ${P.g}의 약수를 모두 고르면?`,opts,ans:key(correct),sel:-1,msg:'',sub:'맞히면 발견 보너스 +50!',tag:'💡 발견 질문',t0:m.T};},
  endMachine(m,success){if(m.done)return;m.done=true;m.claw.state='done';m.dir=0;const T=m.turn,P=m.P,p=m.p;let bonus=0;if(success&&m.coins>0){bonus=m.coins*20;p.add(bonus);T.gained+=bonus;}
    if(success)p.Snd.win&&p.Snd.win();else{const t=strip(answerLine(P));if(!p.wrong.includes(t)&&p.wrong.length<40)p.wrong.push(t);}
    m.res={ok:success,t0:m.T,bonus,gain:T.gained,line:answerLine(P),show:m.T+(success?.6:.8)};if(P.kind==='venn'){m.afterDisc=true;}},
  update(p,dt){const m=p.state;m.T+=dt;NOWS=m.T;if(m.press){m.press.t-=dt;if(m.press.t<=0)m.press=null;}
    if(m.quiz&&m.quiz.until&&m.T>=m.quiz.until){const k=m.quiz.kind;m.quiz=null;m.quizOpen=false;m.claw.readyAt+=0;if(k==='disc'){m.discDone=true;}}
    if(m.res&&!m.res.go&&m.T>=m.res.show&&m.afterDisc&&!m.quizOpen&&!m.discDone&&m.P.kind==='venn'){m.afterDisc=false;this.discovery(m);m.res.go=m.T+99;}
    if(m.res&&m.T>=m.res.show+(m.res.ok?1.7:2.2)&&!m.quizOpen&&!(m.P.kind==='venn'&&!m.discDone)){m.discDone=false;m.afterDisc=false;this.nextRound(p);return;}
    if(m.dexOpen)return;const h=dt/2;for(const mm of[0]){this.updateClaw(m,dt);if(!m.quizOpen||true){stepPhysics(m,h);stepPhysics(m,h);}}
    m.floats=m.floats.filter(f=>(f.life-=dt)>0);m.floats.forEach(f=>{f.y-=34*dt;});},
  down(p,x,y,e){const m=p.state;if(!p.active)return;const G0=this.geo(p);const id=e&&e.pointerId!=null?e.pointerId:0;
    if(m.dexOpen){m.dexOpen=false;return;}
    if(K.inRect(x,y,G0.dex)){m.dexOpen=true;m.dir=0;return;}
    if(m.quizOpen&&m.quiz){const z=this.quizRects(p);const i=z.findIndex(r=>K.inRect(x,y,r));if(i>=0)(m.quiz.kind==='gold'||m.quiz.kind==='disc')&&this.answerQuiz(m,i);return;}
    if(K.inRect(x,y,G0.btn.l)){m.dir=-1;m.hold[id]=-1;return;}if(K.inRect(x,y,G0.btn.r)){m.dir=1;m.hold[id]=1;return;}
    if(K.inRect(x,y,G0.btn.d)){m.press={t:.15};this.startDrop(m);return;}},
  up(p,x,y,d,e){const m=p.state;const id=e&&e.pointerId!=null?e.pointerId:0;if(m.hold[id]!=null){if(m.dir===m.hold[id])m.dir=0;delete m.hold[id];}},
  quizRects(p){const G0=this.geo(p),M=G0.M,Z=p.state.quiz;if(!Z)return[];const n=Z.opts.length;const cols=Z.kind==='disc'?1:2,rows=Math.ceil(n/cols);const x0=M.x+M.w*.08,w0=M.w*.84,top=M.y+M.h*.42,bh=(M.y+M.h*.94-top);const gap=G0.gap;const w=(w0-(cols-1)*gap)/cols,h=(bh-(rows-1)*gap)/rows;
    return Z.opts.map((o,i)=>({x:x0+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}));},
  /* 진행 칸 그리기 */
  chip(g,x,y,w,h,txt,kind){const col={q:['#3b2476','#7c5fc7','#9d8bd8'],ok:['#14532d','#3ee08a','#d9ffe9'],miss:['#7f1d1d','#ff5a6a','#ffe1e4'],ghost:['#2b1b4f','#5b4a8c','#b8a8e0']}[kind||'q'];K.rr(g,x,y,w,h,h*.3);g.fillStyle=col[0];g.fill();g.lineWidth=Math.max(1.5,h*.07);g.strokeStyle=col[1];g.stroke();K.txt(g,txt,x+w/2,y+h/2+h*.03,{size:h*.6,color:col[2],maxW:w*.9});},
  progress(p,g){const m=p.state,G0=this.geo(p),b=G0.box,u=G0.u,P=m.P,T=m.turn;if(!P||!T)return;K.card(g,b.x,b.y,b.w,b.h,u*.25,'rgba(35,16,80,.92)',{stroke:'#7c5fc7',lw:2,blur:0,dy:u*.06,sc:'#000'});
    const t=[...P.targets].sort((a,c)=>a-c),got=[...T.collected].sort((a,c)=>a-c);const rev=m.res&&!m.res.ok;const inner={x:b.x+u*.3,y:b.y+u*.3,w:b.w-u*.6,h:b.h-u*.6};
    K.txt(g,P.slotLabel,inner.x+u*3.7,inner.y+u*.3,{size:Math.min(u*.5,inner.h*.14),color:'#ffd23f',maxW:inner.w-u*3.9,align:'left'});
    /* 도감 단추 */
    const dr=G0.dex;K.card(g,dr.x,dr.y,dr.w,dr.h,dr.h/2,'#30186a',{stroke:'#ffd23f',lw:1.5,blur:0,dy:0});K.txt(g,'📘 도감 '+DEX_LIST.filter(T0=>dex[T0.id]).length+'/'+DEX_LIST.length,dr.x+dr.w/2,dr.y+dr.h/2,{size:dr.h*.55,color:'#fff',maxW:dr.w*.92});
    const ay=inner.y+Math.min(u*.8,inner.h*.2),ah=inner.y+inner.h-ay;
    const feedH=Math.min(ah*.36,u*1.9);const gridH=ah-feedH;
    if(P.kind==='factor'){const n=P.pairs.length;const cell=x=>got.includes(x)?'ok':(rev?'miss':'q');const cols=Math.max(1,Math.min(n,Math.floor(inner.w/(u*4.6))||1));const rows=Math.ceil(n/cols);const pw=inner.w/cols,ph=Math.min(gridH/rows,u*1.5);const ch=Math.min(ph*.8,u*1.5);const cw=Math.min((pw-u*.6)/2.2,u*2.2);
      P.pairs.forEach(([x,y],i)=>{const c=i%cols,r=Math.floor(i/cols);const cx=inner.x+c*pw+pw/2,cy=ay+r*ph+ph/2;const done=got.includes(x)&&got.includes(y);this.chip(g,cx-cw-u*.15,cy-ch/2,cw,ch,got.includes(x)||rev?x:'?',cell(x));K.txt(g,'×',cx,cy,{size:ch*.6,color:'#c7b3ea'});this.chip(g,cx+u*.15,cy-ch/2,cw,ch,got.includes(y)||rev?y:'?',cell(y));if(done){K.txt(g,'✨',cx,cy-ch*.62,{size:ch*.5});}});}
    else if(P.kind==='venn'){const gr=T.grabbedVals;const onlyA=P.da.filter(x=>!P.common.includes(x)),onlyB=P.db.filter(x=>!P.common.includes(x));const cw3=inner.w/3;const cy=ay+gridH*.5;const R0=Math.min(gridH*.5,cw3*.85);
      g.save();g.globalAlpha=.35;g.fillStyle='#4fb6ff';g.beginPath();g.arc(inner.x+cw3,cy,R0,0,TAU);g.fill();g.fillStyle='#ff4f9a';g.beginPath();g.arc(inner.x+cw3*2,cy,R0,0,TAU);g.fill();g.restore();
      const col=(list,cx,lab,ghostOk)=>{K.txt(g,lab,cx,ay+gridH*.08,{size:Math.min(u*.4,gridH*.12),color:'#e9dcff',maxW:cw3*.95});const arr=list.filter(x=>gr.includes(x)||(rev&&ghostOk));const cs=Math.min(u*.9,gridH*.2,cw3/2.6);arr.sort((a,c)=>a-c).forEach((x,i)=>{const c=i%2,r=Math.floor(i/2);this.chip(g,cx-cs*1.15+c*cs*1.2,ay+gridH*.2+r*cs*1.05,cs*1.1,cs,x,gr.includes(x)?'ghost':'miss');});};
      col(onlyA,inner.x+cw3*.5,P.a+'의 약수만',false);col(onlyB,inner.x+cw3*2.5,P.b+'의 약수만',false);
      K.txt(g,'둘 다(공약수)',inner.x+cw3*1.5,ay+gridH*.08,{size:Math.min(u*.4,gridH*.12),color:'#fff',maxW:cw3*.95});const cs=Math.min(u*.9,gridH*.2,cw3/2.6);t.forEach((x,i)=>{const c=i%2,r=Math.floor(i/2);const k=got.includes(x)?'ok':(rev?'miss':'q');this.chip(g,inner.x+cw3*1.5-cs*1.15+c*cs*1.2,ay+gridH*.2+r*cs*1.05,cs*1.1,cs,got.includes(x)||rev?x:'?',k);});}
    else{const n=t.length;const cs=Math.min(u*1.3,gridH*.7,(inner.w-u*.4)/(n*1.15));const tot=n*cs*1.1+(n-1)*cs*.1;t.forEach((x,i)=>{const sx=inner.x+inner.w/2-tot/2+i*cs*1.2;this.chip(g,sx,ay+gridH*.5-cs*.5,cs*1.1,cs,got.includes(x)||rev?x:'?',got.includes(x)?'ok':(rev?'miss':'q'));});}
    if(m.feed&&m.T<m.feed.until){QK.txt(g,m.feed.t,inner.x+inner.w/2,ay+gridH+feedH*.5,inner.w,feedH,Math.min(u*.62,feedH*.42),m.feed.cls==='good'?'#7dffb2':m.feed.cls==='bad'?'#ff9aa5':'#e9dcff',1.15);}},
  draw(p,g){const m=p.state,G0=this.geo(p),W0=G0.W,H0=G0.H,u=G0.u;NOWS=m.T;ctx=g;K.vgrad(g,0,0,W0,H0,['#2a1257','#130828']);
    const M=G0.M,sc=G0.sc;
    /* 기계 */
    K.card(g,M.x-u*.1,M.y-u*.1,M.w+u*.2,M.h+u*.2,u*.3,p.color,{blur:u*.4,dy:u*.1});
    g.save();g.translate(M.x,M.y);g.scale(sc,sc);g.beginPath();rr(0,0,W,H,14);g.clip();drawBackground(m.T);
    for(const d of m.dolls)if(!d.gone&&!d.held)drawDoll(d);drawDivider();if(m.claw.held)drawDoll(m.claw.held);drawClaw(m.claw);drawGlass();drawHud(m);drawFloats(m,0);g.restore();
    /* 단계 알림 */
    if(m.banner&&m.T<m.banner.until&&!m.quizOpen){const a=Math.min(1,(m.banner.until-m.T)*2);g.save();g.globalAlpha=a;K.card(g,M.x+M.w*.1,M.y+M.h*.38,M.w*.8,M.h*.16,u*.3,'rgba(19,8,40,.88)',{stroke:'#ffd23f',lw:2,blur:0,dy:0});K.txt(g,m.banner.t,M.x+M.w/2,M.y+M.h*.46,{size:Math.min(u*.9,M.h*.07),color:'#ffd23f',maxW:M.w*.74});g.restore();}
    /* 진행 칸 */
    this.progress(p,g);
    /* 단추 */
    const B=G0.btn;const act=m.claw.state==='ready'&&!m.quizOpen&&!m.done;
    const bt=(r,txt,fill,ink,on,dirv)=>{const dn=on||false;K.card(g,r.x,r.y+(dn?r.h*.05:0),r.w,r.h,u*.35,fill,{stroke:'#fff',lw:Math.max(2,u*.06),blur:0,dy:r.h*.08,sc:'rgba(0,0,0,.5)'});K.txt(g,txt,r.x+r.w/2,r.y+r.h/2+r.h*.02,{size:Math.min(r.h*.5,u*1.6),color:ink,maxW:r.w*.9});};
    g.save();g.globalAlpha=act?1:.55;bt(B.l,'◀',p.color,'#fff',m.dir===-1);bt(B.r,'▶',p.color,'#fff',m.dir===1);bt(B.d,'뽑기!',act?'#ffd23f':'#a58b2c','#4a3300',!!m.press);g.restore();
    /* 문제 / 결과 겹침 */
    if(m.quizOpen&&m.quiz){const Z=m.quiz;g.fillStyle='rgba(15,5,35,.88)';K.rr(g,M.x,M.y,M.w,M.h,u*.3);g.fill();K.txt(g,Z.tag,M.x+M.w/2,M.y+M.h*.1,{size:Math.min(u*.7,M.h*.06),color:'#ffd23f',maxW:M.w*.9});QK.txt(g,Z.q,M.x+M.w/2,M.y+M.h*.24,M.w*.86,M.h*.22,Math.min(u*1.2,M.h*.1),'#fff',1.2);
      this.quizRects(p).forEach((r,i)=>{let st2='idle';if(Z.sel>=0){if(Z.opts[i]===Z.ans)st2='ok';else if(i===Z.sel)st2='bad';else st2='dim';}QK.card(g,u,r,String(Z.opts[i]),st2,{fill:'#fff',bd:'#7c5fc7',ink:INK,blur:0});});
      K.txt(g,Z.msg||Z.sub,M.x+M.w/2,M.y+M.h*.97,{size:Math.min(u*.5,M.h*.045),color:Z.msg?'#7dffb2':'#c7b3ea',maxW:M.w*.92});}
    else if(m.res&&m.T>=m.res.show){const R=m.res;g.fillStyle='rgba(15,5,35,.82)';K.rr(g,M.x,M.y,M.w,M.h,u*.3);g.fill();K.txt(g,R.ok?'🎉':'🪙',M.x+M.w/2,M.y+M.h*.2,{size:Math.min(u*2.2,M.h*.2)});K.txt(g,R.ok?'미션 성공!':'코인을 다 썼어요',M.x+M.w/2,M.y+M.h*.4,{size:Math.min(u*1.3,M.h*.11),color:'#ffd23f',maxW:M.w*.9});
      QK.txt(g,strip(R.line),M.x+M.w/2,M.y+M.h*.58,M.w*.86,M.h*.16,Math.min(u*.8,M.h*.07),'#fff',1.2);if(R.bonus)K.txt(g,'남은 코인 보너스 +'+R.bonus,M.x+M.w/2,M.y+M.h*.74,{size:Math.min(u*.6,M.h*.055),color:'#7dffb2',maxW:M.w*.9});K.txt(g,'이번 라운드 '+(R.gain>=0?'+':'')+R.gain+'점',M.x+M.w/2,M.y+M.h*.84,{size:Math.min(u*.7,M.h*.06),color:'#fff',maxW:M.w*.9});}
    /* 도감 */
    if(m.dexOpen){g.fillStyle='rgba(15,5,35,.94)';K.rr(g,M.x,M.y,M.w,M.h+(G0.box.y-M.y-M.h)+G0.box.h,u*.3);g.fill();K.txt(g,'📘 인형 도감 '+DEX_LIST.filter(T0=>dex[T0.id]).length+' / '+DEX_LIST.length,M.x+M.w/2,M.y+u*.8,{size:Math.min(u*.9,M.h*.07),color:'#ffd23f',maxW:M.w*.9});
      const cols=G0.land?4:4,rows=Math.ceil(DEX_LIST.length/cols);const cw=M.w/cols,chh=(M.h*.82)/rows;DEX_LIST.forEach((T0,i)=>{const cx=M.x+(i%cols)*cw+cw/2,cy=M.y+u*1.6+Math.floor(i/cols)*chh+chh*.4;const s2=Math.min(cw*.5,chh*.55)/30;g.save();g.translate(cx,cy);g.scale(s2,s2);drawDoll({x:0,y:0,r:30,v:null,type:T0,glow:false});if(!dex[T0.id]){g.globalCompositeOperation='source-atop';g.fillStyle='#3b2476';g.fillRect(-45,-50,90,100);g.globalCompositeOperation='source-over';}g.restore();
        K.txt(g,dex[T0.id]?T0.name:'???',cx,cy+chh*.34,{size:Math.min(u*.5,chh*.16),color:'#fff',maxW:cw*.92});if(dex[T0.id])K.txt(g,dex[T0.id]+'번',cx,cy+chh*.48,{size:Math.min(u*.4,chh*.13),color:'#c7b3ea',maxW:cw*.9});});
      K.txt(g,'화면을 누르면 닫혀요',M.x+M.w/2,G0.box.y+G0.box.h-u*.4,{size:u*.45,color:'#c7b3ea'});}
  },
};
function spawnDollsS(m,P){const vals=shuffle([...P.targets,...P.decoys,...(P.golden?['?']:[])]);m.dolls=vals.map((v,i)=>({v,r:30,gold:v==='?',type:v==='?'?GOLD_TYPE:pickWeighted(DOLL_TYPES),glow:false,x:DIV_X+44+(i%8)*61+Math.random()*10,y:FLOOR_Y-40-Math.floor(i/8)*66-Math.random()*30,vx:0,vy:0,held:false,gone:false,grabSpeed:null}));
  for(let i=0;i<420;i++)stepPhysics(m,1/120);m.dolls.forEach(d=>{d.vx=0;d.vy=0;});}
function grabDollS(m,d,slip){d.held=true;d.grabSpeed=m.claw.dropT;m.claw.held=d;m.claw.slipAt=slip;}
function judge(m,d){GAME.judge(m,d);}
Engine.boot(GAME);
