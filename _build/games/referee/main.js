/* 3~6학년 체육 · 경기 규칙 — 휘슬 심판
   디자인: 조명이 환한 밤 경기장과 관중석. 판정이 맞으면 관중이 환호하고, 환호 게이지가 가득 차면 골든 휘슬 타임(점수 2배)! 오심은 야유가 나와요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#07132a',RED='#ef4444',YEL='#ffd84d';
const LOGO=gkLogo('#0b1d3a','#ffd84d','📣');
const SPORT={net:['🏐','네트·피구형'],goal:['🏀','영역형'],field:['⚾','필드형']};
const LV={
  net:{t:'피구 · 배구 · 배드민턴',d:'네트형·피하기 경기 규칙',g:'3~6학년'},
  goal:{t:'축구 · 농구 · 핸드볼',d:'영역형(골) 경기 규칙',g:'4~6학년'},
  field:{t:'티볼 · 발야구',d:'필드형(베이스) 경기 규칙',g:'4~6학년'},
  all:{t:'모든 경기 심판',d:'여러 경기가 섞여 나와요',g:'도전'},
};
/* [종목, 그림, 상황, 정답, 오답들, 설명] */
const Q=[
  ['net','🔴🏐➡️🧍','피구에서 던진 공이 상대의 머리에 맞았어요.','아웃이 아니에요(머리는 제외)',['아웃이에요','던진 팀이 1점'],'안전을 위해 보통 머리·얼굴에 맞은 것은 아웃으로 하지 않아요.'],
  ['net','🧍🏐🙌','피구에서 날아온 공을 땅에 떨어뜨리지 않고 잡았어요.','잡은 사람은 살아 있어요',['잡은 사람이 아웃','다시 던지기'],'공을 떨어뜨리지 않고 잡으면 아웃이 아니고, 공격권을 얻어요.'],
  ['net','🧍🏐⬇️','피구에서 바닥에 한 번 튄 공에 다리가 맞았어요.','아웃이 아니에요',['아웃이에요','상대 팀 1점'],'바닥에 먼저 닿은 공에 맞은 것은 아웃이 아니에요.'],
  ['net','🦶➖🏐','피구에서 공을 던지는 사람이 경계선을 밟고 던졌어요.','공격권이 상대에게 넘어가요',['그대로 인정','던진 사람이 2점'],'선을 밟거나 넘어가서 던지면 반칙이에요.'],
  ['net','🏐🏐🏐🏐','배구에서 우리 팀이 네 번 공을 쳐서 넘겼어요.','상대 팀 득점 (오버 타임스)',['우리 팀 득점','다시 하기'],'배구는 같은 팀이 세 번 안에 공을 넘겨야 해요.'],
  ['net','🙋🏐🕸️','배구에서 공격하던 선수의 손이 네트에 닿았어요.','상대 팀 득점 (네트 터치)',['그대로 진행','공격한 팀 득점'],'경기 중 네트를 건드리면 반칙이에요.'],
  ['net','🏐⬇️📏','배구에서 넘어온 공이 상대 코트 라인 위에 떨어졌어요.','인(IN)이에요, 공격한 팀 득점',['아웃(OUT)이에요','다시 하기'],'라인 위에 떨어진 공은 안으로 들어온 것(인)으로 판정해요.'],
  ['net','🏸🕸️⬆️','배드민턴 서브에서 셔틀콕이 네트에 걸렸어요.','서브 실패, 상대 득점',['다시 서브(렛)','서브한 사람 득점'],'배드민턴은 서브가 네트에 걸려 넘어가지 못하면 실점이에요.'],
  ['net','🏐👐✋','배구에서 공을 손바닥으로 잡았다가 던졌어요.','반칙, 상대 팀 득점 (홀딩)',['그대로 진행','잘한 수비'],'배구는 공을 잡거나 들고 있으면 안 되고 순간적으로 쳐야 해요.'],
  ['goal','⚽✋🧍','축구에서 골키퍼가 아닌 선수가 경기장 안에서 손으로 공을 막았어요.','핸드볼 반칙, 상대 프리킥',['그대로 진행','스로인'],'골키퍼(자기 페널티 구역)를 빼고는 손이나 팔로 공을 다룰 수 없어요.'],
  ['goal','⚽➡️📏','축구에서 공이 옆줄(터치라인)을 완전히 넘어 나갔어요.','상대 팀 스로인',['코너킥','골킥'],'옆줄 밖으로 나가면 마지막에 닿지 않은 팀이 두 손으로 던져 넣어요.'],
  ['goal','⚽🥅↩️','축구에서 수비팀 선수에게 맞은 공이 자기 팀 골라인 밖으로 나갔어요(골은 아님).','공격 팀 코너킥',['골킥','스로인'],'수비팀이 마지막에 닿고 골라인 밖으로 나가면 코너킥이에요.'],
  ['goal','🦵💥🧍','축구에서 공 대신 상대 선수의 다리를 걷어찼어요.','반칙, 상대 프리킥',['그대로 진행','골킥'],'상대를 차거나 넘어뜨리는 것은 반칙이에요.'],
  ['goal','🏀🚶🚶🚶','농구에서 공을 들고 드리블 없이 세 걸음 걸었어요.','트래블링, 상대 공격',['그대로 진행','자유투 2개'],'농구는 공을 들고 걸으면 안 돼요(트래블링).'],
  ['goal','🏀✋✋🏀','농구에서 드리블을 멈추고 공을 잡은 뒤 다시 드리블했어요.','더블 드리블, 상대 공격',['그대로 진행','점프볼'],'드리블을 끝낸 뒤 다시 드리블하면 반칙이에요.'],
  ['goal','🏀🌈🥅','농구에서 3점 라인 밖에서 던진 슛이 들어갔어요.','3점',['2점','1점'],'3점 라인 바깥에서 던져 넣으면 3점이에요.'],
  ['goal','🏀🙌💥','농구에서 슛하는 선수의 팔을 쳤는데 슛은 들어가지 않았어요.','반칙, 자유투',['그대로 진행','상대 공격권 없음'],'슛 동작 중 반칙을 당하면 자유투를 얻어요.'],
  ['goal','🤾🚶🚶🚶🚶','핸드볼에서 공을 들고 네 걸음을 걸었어요.','오버스텝, 상대 공격',['그대로 진행','7m 던지기'],'핸드볼은 공을 들고 세 걸음까지만 걸을 수 있어요.'],
  ['goal','🤾⭕🦶','핸드볼에서 공격 선수가 골 영역(6m) 선 안을 밟고 슛했어요.','골 무효, 상대 공',['골 인정','다시 슛'],'골 영역 안은 골키퍼만 들어갈 수 있어요.'],
  ['field','⚾🧤✨','티볼에서 친 공을 수비수가 땅에 떨어지기 전에 잡았어요.','타자 아웃 (플라이 아웃)',['타자는 1루로','다시 치기'],'뜬 공을 바로 잡으면 타자는 아웃이에요.'],
  ['field','🏃🧤🔵','티볼에서 타자보다 공이 먼저 1루수에게 전달됐어요.','타자 아웃 (포스 아웃)',['타자 세이프','2루까지 진루'],'공을 가진 수비수가 베이스를 먼저 밟으면 아웃이에요.'],
  ['field','⚾↗️📏','티볼에서 친 공이 파울 라인 밖으로 나갔어요.','파울, 다시 치기',['홈런','타자 아웃'],'파울 라인 밖으로 나간 공은 파울이에요.'],
  ['field','🏃🔵🔵🔵🏠','티볼에서 타자가 1·2·3루를 차례로 밟고 홈까지 들어왔어요.','1점 득점',['3점 득점','아웃'],'주자가 베이스를 모두 돌아 홈에 들어오면 1점이에요.'],
  ['field','🦶⚽💨','발야구에서 굴러온 공을 차서 앞으로 보냈어요.','정상 타격, 1루로 달려요',['반칙','다시 차기'],'발야구는 굴러오는 공을 발로 차서 쳐요.'],
  ['field','🏃⬅️🔵','티볼에서 주자가 베이스를 밟지 않고 다음 베이스로 달렸어요.','주자 아웃 (베이스 안 밟음)',['그대로 인정','1점 추가'],'주자는 베이스를 차례대로 밟아야 해요.'],
  ['field','🧍🏏3️⃣','티볼에서 타자가 세 번 헛쳤어요(티를 쳐서 공이 앞으로 가지 않음).','타자 아웃 (삼진)',['계속 치기','1루로'],'정해진 횟수만큼 헛치면 아웃이에요(학교 규칙마다 달라요).'],
];
function wrap(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){if(ch===' '){out.push(line);line='';continue;}out.push(line);line=ch.trim()?ch:'';}else line=t;}if(line)out.push(line);return out;}
function hero(g,W,H,T,u){g.fillStyle='#fff';g.fillRect(0,0,W,H);for(let i=0;i<14;i++){g.fillStyle=i%2?'#111':'#f4f4f4';g.fillRect(i*W/14,0,W/14,H);}
  K.card(g,W*.12,H*.14,W*.76,H*.58,u*.4,'#0b0b0b',{stroke:'#fff',lw:6,blur:u*.4,dy:u*.15});K.txt(g,'LIVE',W*.2,H*.22,{size:u*.5,color:'#fff'});g.fillStyle=RED;g.beginPath();g.arc(W*.16,H*.22,u*.16,0,TAU);g.fill();
  const em=['🏐','⚽','⚾'][Math.floor(T*.6)%3];K.emo(g,em,W/2,H*.43,u*2.6+Math.sin(T*5)*u*.15);
  K.card(g,W*.3,H*.78,u*2.4,u*1.2,u*.2,YEL,{stroke:INK,lw:4,blur:0,dy:u*.05});K.card(g,W*.55,H*.78,u*2.4,u*1.2,u*.2,RED,{stroke:INK,lw:4,blur:0,dy:u*.05});K.emo(g,'📣',W/2,H*.9,u*1.2);}
const GAME={
  id:'referee',title:'휘슬 심판',title1:'함성 가득한 밤 경기장',title2:'휘슬 심판',emoji:LOGO,
  subtitle:'3~6학년 체육 · 피구 · 배구 · 축구 · 농구 · 티볼 경기 규칙',
  howto:'📣 경기 장면이 전광판에 나와요. 내가 심판이라면 어떻게 <b>판정</b>할까요? 맞게 판정하면 관중이 환호하고 <b>환호 게이지</b>가 올라요. 가득 차면 <b>🏆 골든 휘슬</b> — 다음 3문제는 점수 2배! 오심은 야유가 나와요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#1e4a8f',c2:YEL},hero:gkHero(hero),vignette:.02,durs:[120,180,300],levelTitle:'어떤 경기를 심판할까요?',
  txt:{who:'누가 심판일까요?',dur:'경기 시간',pace:'판정 시간',seat:'번 심판 ',go:'경기 시작!',s1:'1. 종목',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>피구·배구·배드민턴</b>: 피구는 바닥에 한 번 튄 공은 아웃이 아니고, 배구는 한 팀이 세 번 안에 공을 넘겨야 하며 네트를 건드리면 반칙이에요.</li>
    <li><b>축구·농구·핸드볼</b>: 축구는 손으로 공을 다루면 안 되고, 농구는 공을 들고 걸으면 트래블링, 핸드볼은 세 걸음까지 걸을 수 있어요.</li>
    <li><b>티볼·발야구</b>: 뜬 공을 바로 잡으면 아웃, 주자는 베이스를 차례로 밟아야 하고 홈까지 들어오면 1점이에요.</li>
    <li>심판은 <b>공정하게, 규칙대로</b> 판정하고, 판정에 따르는 것도 스포츠맨십이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*2.3,pad=u*.4;const land=W>=H*1.15;const gap=u*.3;
    if(land){const sw=W*.5-pad*1.5;const scr={x:pad,y:top,w:sw,h:H-top-pad};const ox=pad*2+sw;const n=3;const oh=(H-top-pad-gap*(n-1))/n;const opts=[0,1,2].map(i=>({x:ox,y:top+i*(oh+gap),w:W-ox-pad,h:oh}));return{W,H,u,top,pad,land,scr,opts};}
    const oh=Math.min(u*2.3,(H-top-pad)*.15);const oy=H-pad-oh*3-gap*2;const scr={x:pad,y:top,w:W-pad*2,h:oy-top-gap*1.5};const opts=[0,1,2].map(i=>({x:pad,y:oy+i*(oh+gap),w:W-pad*2,h:oh}));return{W,H,u,top,pad,land,scr,opts};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,streak3:0,meter:30,gold:0,crowd:0,boo:0,rank:0});this.newQ(p);},
  make(p,L){const R=p.R;const pool=L==='all'?Q:Q.filter(x=>x[0]===L);const it=p.deck(pool,'ref');const opts=R.shuffle([it[3],...it[4]]);
    const q={it,sp:it[0],pic:it[1],sit:it[2],ans:it[3],exp:it[5],labels:opts,okIdx:opts.indexOf(it[3])};
    q.text='📣 어떻게 판정할까요?';q.reveal='정답: '+q.ans+' — '+q.exp;q.review=q.sit+' → '+q.ans+' ('+q.exp+')';q.speak=q.sit;return q;},
  qtime(q){return 15;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return SPORT[q.sp][0]+' '+SPORT[q.sp][1]+' 경기';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return '정확한 판정! '+q.exp;},
  ptsOf(p,q,frac){return Math.round((50+50*frac)*(p.state.gold>0?2:1));},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.meter=Math.min(100,st.meter+(st.gold>0?0:14));st.crowd=1;st.rank++;if(st.gold>0)st.gold--;if(st.meter>=100){st.gold=3;st.meter=40;p.tip('🏆 골든 휘슬 타임! 3문제 점수 2배','good',2000);}}else{st.meter=Math.max(0,st.meter-22);st.boo=1;if(st.gold>0)st.gold--;}},
  upd(p,dt){const st=p.state;if(st.crowd>0)st.crowd=Math.max(0,st.crowd-dt*.7);if(st.boo>0)st.boo=Math.max(0,st.boo-dt*.7);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=G.opts.findIndex(b=>K.inRect(x,y,b));if(i>=0)this.verdict(p,i,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const b=G.opts[q.okIdx];return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  crowd(g,G,st){const u=G.u,W=G.W;const y0=(G.top-u*2.1),h=u*1.9;K.rr(g,G.pad,y0,W-G.pad*2,h,u*.3);g.fillStyle='#0a2147';g.fill();
    g.save();K.rr(g,G.pad,y0,W-G.pad*2,h,u*.3);g.clip();const cols=['#ef4444','#3b82f6','#facc15','#22c55e','#f472b6','#fff'];const n=Math.floor((W-G.pad*2)/(u*.62));
    for(let r=0;r<3;r++)for(let i=0;i<n;i++){const x=G.pad+u*.35+i*u*.62+(r%2)*u*.3;const jump=Math.abs(Math.sin(st.T*6+i*1.7+r))*u*(.05+st.crowd*.42)*(st.boo>0?-.2:1);const y=y0+h*.3+r*u*.5-jump;
      g.fillStyle=cols[(i*7+r*3)%cols.length];g.beginPath();g.arc(x,y,u*.17,0,Math.PI*2);g.fill();g.fillStyle='#16294d';g.fillRect(x-u*.15,y+u*.16,u*.3,u*.22);
      if(st.crowd>.3&&(i+r)%4===0){g.strokeStyle=cols[(i*7+r*3)%cols.length];g.lineWidth=2;g.beginPath();g.moveTo(x+u*.15,y);g.lineTo(x+u*.3,y-u*.4-jump);g.stroke();}}
    g.restore();
    const mw=Math.min(u*7,(W-G.pad*2)*.4),mx=W-G.pad-mw-u*.3,my=y0+h-u*.5;K.rr(g,mx,my,mw,u*.28,u*.14);g.fillStyle='rgba(255,255,255,.2)';g.fill();K.rr(g,mx,my,Math.max(u*.28,mw*st.meter/100),u*.28,u*.14);g.fillStyle=st.gold>0?'#ffd84d':'#34d399';g.fill();
    K.rr(g,mx-u*.2,y0+h-u*1.2,mw+u*.4,u*1.1,u*.2);g.fillStyle='rgba(5,11,24,.82)';g.fill();K.txt(g,st.gold>0?'🏆 골든 휘슬 ×2 ('+st.gold+')':'📣 환호 '+Math.round(st.meter)+'%',mx+mw/2,y0+h-u*.9,{size:u*.42,color:st.gold>0?YEL:'#fff',stroke:'#07132a',lw:u*.1,maxW:mw});
    K.rr(g,G.pad+u*.2,y0+h-u*.95,u*4.4,u*.8,u*.2);g.fillStyle='rgba(5,11,24,.82)';g.fill();const rk=['견습 심판','선심','부심','주심','국제 심판','월드컵 심판'][Math.min(5,Math.floor(st.rank/4))];K.txt(g,'🎽 '+rk,G.pad+u*.4,y0+h-u*.5,{size:u*.42,color:'#fff',stroke:'#07132a',lw:u*.1,align:'left',maxW:u*5});},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;
    K.vgrad(g,0,0,W,H,['#06122a','#0f2c5c']);[.15,.5,.85].forEach(x=>{K.glow(g,W*x,0,u*6,'#fff6c9',.35);});
    this.crowd(g,G,st);
    const S=G.scr;K.card(g,S.x,S.y,S.w,S.h,u*.4,'#050b18',{stroke:st.gold>0?YEL:'#7aa7ff',lw:Math.max(4,u*.12),blur:u*.5,dy:u*.08,sc:st.gold>0?'rgba(255,216,77,.6)':'rgba(122,167,255,.5)'});
    g.fillStyle=RED;g.beginPath();g.arc(S.x+u*.7,S.y+u*.6,u*.18,0,Math.PI*2);g.fill();K.txt(g,'VAR · '+SPORT[q.sp][1]+' 경기',S.x+u*1.0,S.y+u*.6,{size:u*.42,color:'#ffe9a3',align:'left',maxW:S.w-u*1.5});
    const picH=Math.min(S.h*.4,S.w*.42);K.txt(g,q.pic,S.x+S.w/2,S.y+u*.7+picH*.5+u*.4,{size:picH*.7,maxW:S.w*.9});
    const fs=Math.min(u*.72,Math.max(u*.5,S.w/20));g.font=K.font(fs);const lines=wrap(g,q.sit,S.w-u*.9);const lh=fs*1.3;const ty=S.y+u*.7+picH+u*1.4;
    g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,S.x+S.w/2,ty+i*lh));
    if(st.lock){const by=Math.min(S.y+S.h-u*1.2,ty+lines.length*lh+u*.3);const fs2=Math.min(u*.55,S.w/24);g.font=K.font(fs2);const ex=wrap(g,(st.res==='ok'?'✅ ':'❌ ')+q.exp,S.w-u*.9);g.fillStyle=st.res==='ok'?'#8affb0':'#ffb3b3';ex.slice(0,3).forEach((l,i)=>g.fillText(l,S.x+S.w/2,Math.min(by+i*fs2*1.25,S.y+S.h-u*.5)));}
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*.5,S.y+S.h-u*.45,S.w-u*1,Math.max(6,u*.18),st.qt/st.qmax,{good:YEL});
    G.opts.forEach((b,i)=>{const done=st.lock;const isAns=i===q.okIdx,picked=st.pick===i;let bg='#14305c',bd='#7aa7ff',ink='#fff';if(done){if(isAns){bg='#22c55e';ink='#052e16';bd='#bbf7d0';}else if(picked){bg='#ef4444';ink='#fff';bd='#fecaca';}else{bg='#0b1d3a';ink='#6b7fa8';bd='#27406b';}}
      K.rr(g,b.x,b.y+u*.06,b.w,b.h,u*.25);g.fillStyle='#02060f';g.fill();K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=bg;g.fill();g.lineWidth=3;g.strokeStyle=bd;g.stroke();
      K.txt(g,['①','②','③'][i],b.x+u*.7,b.y+b.h/2,{size:Math.min(b.h*.5,u*1.0),color:YEL});
      const lfs=Math.min(b.h*.34,u*.8);g.font=K.font(lfs);const ll=wrap(g,q.labels[i],b.w-u*1.8);const l2=ll.length>1?lfs*1.15:0;g.fillStyle=ink;g.textAlign='left';g.textBaseline='middle';ll.slice(0,2).forEach((l,k)=>g.fillText(l,b.x+u*1.35,b.y+b.h/2+(k-(ll.slice(0,2).length-1)/2)*l2));});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:2200,badMs:3400});
Engine.boot(GAME);
