/* 3~6학년 체육 · 순발력 — 번쩍 반응왕
   디자인: 파란 하늘 아래 육상 경기장. 신호에 빨리 반응할수록 내 선수가 쭉쭉 달려요! 친구 선수들보다 먼저 결승선을 통과해 보세요. 부정 출발은 넘어져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const GRN='#2fbf71',RED='#ff4d4d',INK='#1d3557',NAVY='#1d3557';
const LOGO=gkLogo('#ffffff','#1d3557','🏃');
const CL=[['빨강','#ef4444'],['파랑','#3b82f6'],['노랑','#facc15'],['초록','#22c55e'],['보라','#a855f7']];
const DIRS=['L','U','D','R'],DG={L:'왼쪽',U:'위쪽',D:'아래쪽',R:'오른쪽'};
const LV={
  start:{t:'출발 신호',d:'빨강 → 초록! 초록불에 바로 터치',g:'3~6학년'},
  color:{t:'색 구별 반응',d:'말한 색만 터치, 다른 색은 참기',g:'3~6학년'},
  arrow:{t:'방향 반응',d:'화살표 방향 버튼을 빠르게',g:'4~6학년'},
};
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#0d1017','#232a3d']);g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<14;i++){g.fillRect((i*W/7+T*u*3)%W,H*.88,u*1.2,u*.18);}
  const bw=u*2.2,bh=u*5.6,x=W/2-bw/2,y=H*.5-bh/2;K.card(g,x,y,bw,bh,u*.4,'#11141c',{stroke:'#586079',lw:4,blur:u*.4,dy:u*.1});const ph=Math.floor(T*.7)%2;
  [[0,RED],[1,GRN]].forEach(([i,c])=>{const cy=y+bh*(.28+i*.44),on=ph===i;if(on)K.glow(g,W/2,cy,u*2.2,c,.7);g.fillStyle=on?c:'#2a2f3d';g.beginPath();g.arc(W/2,cy,u*.8,0,TAU);g.fill();});
  K.emo(g,'🏃',W*.2+((T*.3)%1)*W*.6,H*.82,u*1.1);}
const GAME={
  id:'reaction',title:'번쩍 반응왕',title1:'육상 경기장 달리기 대회',title2:'번쩍 반응왕',emoji:LOGO,
  subtitle:'3~6학년 체육 · 순발력 · 신호에 빠르게 반응하기',
  howto:'🏃 신호가 바뀌는 <b>순간</b> 터치해요! 빠르게 반응할수록 내 선수가 <b>멀리 달려요</b>. 너무 일찍 누르면 <b>부정 출발</b>로 넘어져요. 100 m 결승선을 친구들보다 먼저 통과하면 보너스! 내 반응 시간(ms)도 기록돼요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#e76f51',c2:'#2a9d8f'},hero:gkHero(hero),vignette:.04,durs:[90,120,180],levelTitle:'어떤 반응을 연습할까요?',
  txt:{who:'누가 달릴까요?',dur:'게임 시간',pace:'신호 속도',seat:'번 선수 ',go:'출발 준비!',s1:'1. 종목',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>순발력</b>은 신호를 보고 몸을 재빨리 움직이는 힘이에요.</li>
    <li>출발선에서는 신호를 <b>예상해서 먼저 움직이면 안 돼요</b>. 눈으로 신호를 확인하고 반응해요(부정 출발).</li>
    <li>반응 시간은 사람마다 달라요. 보통 0.2~0.4초(200~400ms) 정도이고, 연습하면 조금씩 빨라져요.</li>
    <li>준비 자세(무릎을 살짝 굽히고 집중하기)가 순발력을 높여 줘요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,pad=u*.4,L=p.levelId;const raceH=Math.min(H*.25,u*6);const rY=(p.top||0)+u*.25;const top=rY+raceH+u*.25;const logH=u*1.0,btnH=L==='arrow'?Math.min(u*2.6,H*.2):0;
    const aw=W-pad*2,ah=H-top-pad-logH-btnH-(btnH?pad:0);const land=aw>ah*1.5;const R=Math.max(40,Math.min(aw*.45,ah*.48));
    const cx=W/2,cy=top+ah/2;const btns=[];if(btnH){const gap=u*.3,bw=(aw-gap*3)/4;DIRS.forEach((d,i)=>btns.push({d,x:pad+i*(bw+gap),y:top+ah+pad,w:bw,h:btnH}));}
    return{W,H,u,top,pad,R,cx,cy,btns,logY:H-pad-logH*.5,land,ah,rY,raceH};},
  init(p){const st=p.state;Object.assign(st,{T:0,state:'idle',rd:null,sch:[],fi:0,t0:0,goN:0,fakeEnd:0,lamp:null,gap:.8,best:null,times:[],txt:'',txtC:'',shake:0,pulse:0,hitMs:0,dir:null,tgt:null,you:0,youShow:0,fall:0,raceN:1,fin:[],raceEnd:0,rv:null,medals:[]});this.newRace(p);this.newRound(p);},
  newRace(p){const st=p.state,R=p.R;const base=(2.0+R.f()*.6)*Math.min(1.3,p.pace);st.you=0;st.fin=[];st.raceEnd=0;st.rv=[['🐇','토끼'],['🐆','치타'],['🦘','캥거루']].map(([e,n],i)=>({e,n,m:0,spd:base*(.8+i*.14+R.f()*.15),ph:R.f()*6,fin:false}));},
  newRound(p){const st=p.state,R=p.R,L=p.levelId;const wait=(1.2+R.f()*2.6)/Math.max(.8,p.pace);const rd={type:L,wait};st.sch=[];
    if(L==='start'){st.sch.push({at:wait,go:true});p.ask('🚦 초록불이 켜지면 터치!','빨간불에는 참아요');}
    else if(L==='color'){const tgt=R.int(0,CL.length-1);const n=R.int(0,2);const seq=[];for(let i=0;i<n;i++){let c;do{c=R.int(0,CL.length-1);}while(c===tgt);seq.push(c);}seq.push(tgt);rd.tgt=tgt;st.tgt=tgt;
      seq.forEach((c,i)=>st.sch.push({at:wait*(.55+i*.45/seq.length)+i*.7,c,go:i===seq.length-1}));p.ask('🎨 <b style="color:'+CL[tgt][1]+'">'+CL[tgt][0]+'</b>이 켜지면 터치!','다른 색은 참아요');}
    else{rd.dir=R.pick(DIRS);st.sch.push({at:wait,go:true});p.ask('➡️ 화살표 방향 버튼을 눌러요','신호가 뜨기 전에는 참아요');}
    st.rd=rd;st.fi=0;st.t0=st.T;st.state='wait';st.lamp=null;st.txt=L==='start'?'준비…':'기다려요…';st.txtC='';},
  update(p,dt){const st=p.state;st.T+=dt;if(st.shake>0)st.shake-=dt;if(st.pulse>0)st.pulse-=dt;if(st.fall>0)st.fall-=dt;st.youShow+=(st.you-st.youShow)*Math.min(1,dt*5);this.race(p,dt);
    if(st.state==='idle')return;const el=st.T-st.t0;
    if(st.state==='wait'||st.state==='fake'){
      if(st.state==='fake'&&st.T>=st.fakeEnd){st.state='wait';st.lamp=null;st.txt='기다려요…';}
      const s=st.sch[st.fi];if(s&&el>=s.at){st.fi++;
        if(s.go){st.state='go';st.goN=performance.now();st.goT=st.T;st.lamp=s.c!=null?CL[s.c][1]:GRN;st.txt=st.rd.type==='color'?CL[s.c][0]:st.rd.type==='arrow'?'':'지금!';p.Snd.tone&&p.Snd.tone(st.rd.type==='start'?880:660,.12,'sine',.06);}
        else{st.state='fake';st.fakeEnd=st.T+.6;st.lamp=CL[s.c][1];st.txt=CL[s.c][0];}}}
    else if(st.state==='go'){if(st.T-st.goT>1.8){p.hit(false,{pen:5,quiet:false,tip:'너무 늦었어요! 신호를 잘 봐요',tipMs:1200,review:LV[p.levelId].t+': 신호가 바뀌면 바로 반응해요 (늦으면 점수가 없어요)'});st.state='done';st.gap=1;st.txt='늦었어요!';st.txtC='bad';st.lamp=null;this.move(p,-2);}}
    else if(st.state==='done'){st.gap-=dt;if(st.gap<=0)this.newRound(p);}},
  race(p,dt){const st=p.state;if(st.raceEnd>0){st.raceEnd-=dt;if(st.raceEnd<=0){st.raceN++;this.newRace(p);}return;}
    st.rv.forEach(r=>{if(r.fin)return;r.ph+=dt*1.5;r.m+=r.spd*dt*(1+Math.sin(r.ph)*.25);if(r.m>=100){r.m=100;r.fin=true;st.fin.push(r.n);}});
    if(st.you>=100){st.you=100;const rank=st.fin.length+1;const G=this.geo(p);const bonus=[40,25,10,0][Math.min(3,rank-1)];st.medals.push(rank);st.lastRank=rank;if(bonus)p.add(bonus,G.cx,G.rY+G.raceH*.5);p.tip(rank===1?'🥇 1등! 결승선 통과 +'+bonus:rank===2?'🥈 2등! +'+bonus:rank===3?'🥉 3등! +'+bonus:'결승선 통과!',rank<4?'good':'bad',1800);st.raceEnd=2.6;st.finRank=rank;}
    else if(st.rv.every(r=>r.fin)){st.raceEnd=2.2;st.finRank=4;p.tip('친구들이 먼저 들어왔어요! 다음 경기 준비','bad',1500);}},
  move(p,dm){const st=p.state;st.you=clamp(st.you+dm,0,100);},
  press(p,d,x,y){const st=p.state,G=this.geo(p);if(st.state==='go'){const ms=Math.round(performance.now()-st.goN);
      if(st.rd.type==='arrow'&&d!==st.rd.dir){p.hit(false,{pen:10,tip:'반대 방향이에요! 화살표를 잘 봐요',tipMs:1300,review:'방향 반응: 화살표가 가리키는 방향 버튼을 눌러요 ('+DG[st.rd.dir]+')'});st.state='done';st.gap=1.1;st.txt='반대 방향!';st.txtC='bad';st.shake=.3;this.move(p,-4);st.fall=.6;return;}
      st.times.push(ms);if(st.best==null||ms<st.best)st.best=ms;st.hitMs=ms;st.pulse=.5;const pts=Math.max(10,Math.round(130-ms/5));
      p.hit(true,{pts,x:G.cx,y:G.cy-G.R*.3,tip:ms<250?'번개 같아요! ⚡':ms<400?'좋아요!':'조금 더 빠르게!',tipMs:900});st.state='done';st.gap=1.1;st.txt=ms+'ms';st.txtC='good';this.move(p,clamp(16-ms/35,3,15));
      if(st.times.length>8)st.times.shift();}
    else if(st.state==='wait'||st.state==='fake'){const fk=st.state==='fake';p.hit(false,{pen:10,tip:fk?'다른 색이었어요!':'부정 출발! 신호를 보고 눌러요',tipMs:1400,review:fk?'색 구별 반응: 말한 색이 아닌 불에는 참아요':'신호가 바뀌기 전에 누르면 부정 출발 → 신호를 눈으로 확인하고 눌러요'});st.state='done';st.gap=1.2;st.txt=fk?'다른 색!':'부정 출발!';st.txtC='bad';st.lamp=null;st.shake=.35;this.move(p,-6);st.fall=.8;}},
  down(p,x,y){const st=p.state,G=this.geo(p);if(st.rd.type==='arrow'){const b=G.btns.find(b=>K.inRect(x,y,b));if(b)this.press(p,b.d);return;}this.press(p,null);},
  botAct(p){const st=p.state,G=this.geo(p);if(st.state!=='go'||performance.now()-st.goN<260)return null;const rc=p.cv.getBoundingClientRect();
    if(st.rd.type==='arrow'){const b=G.btns.find(b=>b.d===st.rd.dir);return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};}return{k:'click',x:rc.left+G.cx,y:rc.top+G.cy};},
  arrow(g,d,cx,cy,r,col){g.save();g.translate(cx,cy);g.rotate({R:0,D:Math.PI/2,L:Math.PI,U:-Math.PI/2}[d]);g.fillStyle=col;g.beginPath();g.moveTo(r*.9,0);g.lineTo(0,-r*.8);g.lineTo(0,-r*.35);g.lineTo(-r*.9,-r*.35);g.lineTo(-r*.9,r*.35);g.lineTo(0,r*.35);g.lineTo(0,r*.8);g.closePath();g.fill();g.restore();},
  track(g,G,st,p){const u=G.u,W=G.W;const x0=G.pad+u*2.4,x1=W-G.pad-u*.6,y0=G.rY,h=G.raceH;const lanes=[{e:'🏃',n:'나',me:true},...st.rv];const lh=h/4;
    K.card(g,G.pad,y0,W-G.pad*2,h,u*.3,'#e2673a',{stroke:NAVY,lw:Math.max(3,u*.08),blur:0,dy:u*.06,sc:'#12263f'});
    g.save();K.rr(g,G.pad,y0,W-G.pad*2,h,u*.3);g.clip();
    for(let i=0;i<=4;i++){g.fillStyle='rgba(255,255,255,.75)';g.fillRect(G.pad,y0+i*lh-1,W-G.pad*2,2);}
    for(let k=0;k<10;k++){const x=x0+(x1-x0)*k/10;g.fillStyle='rgba(255,255,255,.22)';g.fillRect(x,y0,1.5,h);}
    const fx=x1;for(let r=0;r<8;r++)for(let c=0;c<2;c++){g.fillStyle=(r+c)%2?'#111':'#fff';g.fillRect(fx+c*u*.28-u*.2,y0+r*h/8,u*.28,h/8);}
    lanes.forEach((l,i)=>{const m=l.me?st.youShow:l.m;const x=x0+(x1-x0)*m/100;const cy=y0+i*lh+lh/2;
      if(l.me){g.fillStyle='rgba(255,255,255,.28)';g.fillRect(G.pad,y0+i*lh,W-G.pad*2,lh);}
      K.txt(g,l.me?(st.raceEnd>0?(st.finRank<4?['🥇','🥈','🥉'][st.finRank-1]:'😢')+' ':'')+'나 '+Math.round(st.youShow)+'m':l.n,G.pad+u*1.3,cy,{size:Math.min(lh*.38,u*.55),color:'#fff',stroke:'#12263f',lw:u*.1,maxW:u*2});
      const bob=Math.abs(Math.sin((l.me?st.T*9:st.T*8+i)))*lh*.08;g.save();g.translate(x,cy-bob);if(l.me&&st.fall>0){g.rotate(Math.sin(st.fall*20)*.5);}
      if(l.me){g.fillStyle=p.color;g.beginPath();g.arc(0,lh*.38,lh*.3,0,Math.PI*2);g.globalAlpha=.35;g.fill();g.globalAlpha=1;}
      K.emo(g,l.e,0,0,lh*.9);g.restore();});
    g.restore();
      },
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,R=G.R;
    K.vgrad(g,0,0,W,H,['#8fd3ff','#dff3ff']);g.fillStyle='#7ccf6a';g.fillRect(0,H*.82,W,H*.18);K.clouds&&K.clouds(g,W,H*.4,st.T*.8,.5,3,u*1.6);
    this.track(g,G,st,p);
    const sx=st.shake>0?Math.sin(st.shake*70)*u*.15:0;g.save();g.translate(sx,0);
    const L=p.levelId;
    if(L==='start'){const bw=R*.9,bh=R*2;const x=G.cx-bw/2,y=G.cy-bh/2;K.card(g,x,y,bw,bh,bw*.2,'#1d3557',{stroke:'#12263f',lw:Math.max(4,u*.1),blur:u*.4,dy:u*.1});
      const on=st.state==='go'?1:(st.state==='wait'||st.state==='fake')?0:(st.txtC==='good'?1:-1);
      [[0,RED,on===0],[1,GRN,on===1]].forEach(([i,c,lit])=>{const cy=y+bh*(.27+i*.46),r=bw*.36;if(lit)K.glow(g,G.cx,cy,r*2.6,c,.7);g.fillStyle=lit?c:'#2d4a73';g.beginPath();g.arc(G.cx,cy,r,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,'+(lit?.3:.08)+')';g.beginPath();g.arc(G.cx-r*.3,cy-r*.3,r*.3,0,TAU);g.fill();});
      g.fillStyle='#12263f';g.fillRect(G.cx-bw*.06,y+bh,bw*.12,Math.max(4,H-(y+bh)-u*.8));}
    else{const lit=st.lamp;const col=lit||'#a9c4de';if(lit)K.glow(g,G.cx,G.cy,R*1.5,lit,.55);g.fillStyle='#1d3557';g.beginPath();g.arc(G.cx,G.cy,R*1.05,0,TAU);g.fill();g.strokeStyle='#12263f';g.lineWidth=Math.max(4,u*.12);g.stroke();
      g.fillStyle=col;g.beginPath();g.arc(G.cx,G.cy,R*.9,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,'+(lit?.3:.25)+')';g.beginPath();g.arc(G.cx-R*.28,G.cy-R*.3,R*.28,0,TAU);g.fill();
      if(L==='arrow'&&st.state==='go')this.arrow(g,st.rd.dir,G.cx,G.cy,R*.62,'#fff');
      else if(L==='color'&&st.txt&&(st.state==='go'||st.state==='fake'))K.txt(g,st.txt,G.cx,G.cy,{size:R*.5,color:'#fff',stroke:INK,lw:R*.08,maxW:R*1.5});}
    const tc=st.txtC==='bad'?'#c1121f':st.txtC==='good'?'#1b7f55':NAVY;
    if(L==='start'){K.txt(g,st.txt,G.land?G.cx+R*1.6:G.cx+R*.95+u*.2,G.cy,{size:Math.min(u*1.5,R*.5),color:tc,stroke:'#fff',lw:u*.15,align:'left',maxW:Math.max(u*4,W-(G.cx+R*1.6)-u*.3)});}
    else if(st.txt&&!(L==='color'&&(st.state==='go'||st.state==='fake'))&&!(L==='arrow'&&st.state==='go'))K.txt(g,st.txt,G.cx,G.cy,{size:Math.min(R*.38,u*1.7),color:tc,stroke:'#fff',lw:u*.14,maxW:R*1.6});
    if(st.txtC==='good'&&L!=='start')K.txt(g,st.txt,G.cx,G.cy,{size:Math.min(R*.45,u*2),color:'#fff',stroke:INK,lw:u*.14,maxW:R*1.6});
    g.restore();
    G.btns.forEach(b=>{const hot=st.state==='go'&&st.rd.dir===b.d;K.rr(g,b.x,b.y,b.w,b.h,u*.3);g.fillStyle=hot?'#c6f6d5':'#fff';g.fill();g.lineWidth=3;g.strokeStyle=hot?GRN:NAVY;g.stroke();this.arrow(g,b.d,b.x+b.w/2,b.y+b.h/2,Math.min(b.h*.34,b.w*.3),NAVY);});
    const by=G.logY;K.card(g,G.pad,by-u*.4,u*4.3,u*.8,u*.4,'#fff',{stroke:'#e76f51',lw:2,blur:0,dy:0});K.txt(g,'⏱ 최고 '+(st.best==null?'-':st.best+'ms'),G.pad+u*2.15,by,{size:u*.4,color:NAVY,maxW:u*4});
    st.times.slice(-6).forEach((ms,i,a)=>{const x=W-G.pad-(a.length-1-i)*u*1.55-u*.7;const c=ms<300?'#1b7f55':ms<450?'#b7791f':'#c1121f';K.card(g,x-u*.7,by-u*.38,u*1.4,u*.76,u*.3,'#fff',{stroke:c,lw:2,blur:0,dy:0});K.txt(g,String(ms),x,by,{size:u*.36,color:c,maxW:u*1.3});});
  },
};
Engine.boot(GAME);
