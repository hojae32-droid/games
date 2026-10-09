/* 5~6학년 실과 · 소프트웨어와 코딩(순차·반복) — 코딩 로봇 길 찾기
   디자인: 붉은 화성 탐사 지도. 로버(🤖)를 명령 블록으로 ⭐ 기지까지 안내해요. 바위와 벽에 부딪히면 실패! 6학년은 블록 수가 정해져 있어 반복 블록(앞으로 ×3)을 써야 해요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#ffe9d6',ORG='#ffb347',RED='#e0592b';
const LOGO=gkLogo('#3a1410','#ffb347','🤖');
const LV={
  '5':{g:'5~6학년',t:'5학년 순차 코딩',d:'앞으로·왼쪽·오른쪽 (5×5)'},
  '6':{g:'5~6학년',t:'6학년 반복 코딩',d:'반복 블록으로 아껴서 (6×6)'},
};
const D=[[0,-1],[1,0],[0,1],[-1,0]];
const LAB={F1:'⬆1',F2:'⬆×2',F3:'⬆×3',L:'↰',R:'↱'};
const PAL5=[['F1','⬆ 앞으로'],['L','↰ 왼쪽'],['R','↱ 오른쪽']],PAL6=[['F1','⬆ 앞으로 ×1'],['F2','⬆ 앞으로 ×2'],['F3','⬆ 앞으로 ×3'],['L','↰ 왼쪽'],['R','↱ 오른쪽']];
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#8a3a1f','#3a1410']);const N=6,cs=Math.min(W*.5/N,H*.7/N);const x0=W/2-cs*N/2,y0=H*.15;for(let y=0;y<N;y++)for(let x=0;x<N;x++){g.fillStyle=(x+y)%2?'rgba(255,200,150,.12)':'rgba(255,200,150,.2)';g.fillRect(x0+x*cs,y0+y*cs,cs-2,cs-2);}
  K.emo(g,'⭐',x0+cs*5.5,y0+cs*.5,cs*.8);K.emo(g,'🪨',x0+cs*3.5,y0+cs*2.5,cs*.8);K.emo(g,'🪨',x0+cs*1.5,y0+cs*4.5,cs*.8);const k=(T*.5)%3;const px=x0+cs*(.5+Math.min(5,k*2)),py=y0+cs*.5+(k>2?cs*(k-2)*0:0);K.emo(g,'🤖',x0+cs*(.5+Math.min(5,Math.floor(T*2)%6)),y0+cs*.5,cs*.8);}
const GAME={
  id:'coderobot',title:'코딩 로봇 길 찾기',title1:'붉은 화성 탐사 지도',title2:'코딩 로봇 길 찾기',emoji:LOGO,
  subtitle:'5~6학년 실과 · 소프트웨어와 코딩 (순차·반복)',
  howto:'🤖 로봇(빨간 화살표가 앞)을 <b>명령 블록</b>으로 ⭐ 목적지까지 안내해요. 블록을 눌러 쌓고 <b>▶ 실행</b>! 바위나 벽에 부딪히면 실패예요. 6학년은 블록 개수가 정해져 있어서 <b>"앞으로 ×3"</b> 같은 반복 블록을 써야 해요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:ORG},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 코딩을 할까요?',
  txt:{who:'누가 프로그래머일까요?',dur:'탐사 시간',pace:'생각하는 시간',seat:'번 프로그래머 ',go:'탐사 시작!',s1:'1. 코딩',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>순차</b>는 명령을 차례대로 실행하는 거예요. 순서가 바뀌면 결과도 달라져요.</li>
    <li><b>반복</b>은 같은 명령을 여러 번 되풀이하는 거예요. "앞으로 ×3"은 "앞으로"를 3번 쓴 것과 같고, 블록을 아낄 수 있어요.</li>
    <li>프로그램이 잘 안 될 때는 <b>어디가 틀렸는지 찾아서 고치는(디버깅)</b> 일이 필요해요.</li></ul>`,
  N(p){return p.levelId==='5'?5:6;},
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const land=W>=H*1.15;const N=this.N(p);const pal=p.levelId==='5'?PAL5:PAL6;const items=pal.map(x=>({k:x[0],t:x[1]})).concat([{k:'del',t:'⌫ 지우기'},{k:'run',t:'▶ 실행',go:1}]);
    let gr,qb,pb;
    if(land){const gs=Math.min(H-top-pad,W*.52);gr={x:pad,y:top,s:gs};const rx=pad*2+gs;qb={x:rx,y:top+u*1.2,w:W-rx-pad,h:Math.min(u*5,(H-top)*.3)};pb={x:rx,y:qb.y+qb.h+gap,w:W-rx-pad,h:H-pad-(qb.y+qb.h+gap)};}
    else{const gs=Math.min(W-pad*2,(H-top)*.46);gr={x:(W-gs)/2,y:top,s:gs};qb={x:pad,y:top+gs+u*1.1,w:W-pad*2,h:Math.min(u*3.2,(H-top)*.14)};pb={x:pad,y:qb.y+qb.h+gap,w:W-pad*2,h:H-pad-(qb.y+qb.h+gap)};}
    const cols=land?2:3,rows=Math.ceil(items.length/cols),g2=u*.2;const bw=(pb.w-g2*(cols-1))/cols,bh=Math.min(u*2.4,(pb.h-g2*(rows-1))/rows);const btns=items.map((it,i)=>Object.assign({},it,{x:pb.x+(i%cols)*(bw+g2),y:pb.y+Math.floor(i/cols)*(bh+g2),w:bw,h:bh}));
    return{W,H,u,top,pad,land,N,gr,cs:gr.s/N,qb,btns};},
  init(p){const st=p.state;Object.assign(st,{T:0,L:null,prog:[],phase:'edit',t0:0,tries:0,msg:'',msgC:'',steps:[],si:0,acc:0,rx:0,ry:0,rd:0,trail:[],bump:0,wait:0,nowI:-1,solved:0});this.newLevel(p);},
  gen(p){const R=p.R,deck=p.levelId,N=this.N(p);
    for(let k=0;k<500;k++){let x=R.int(0,N-1),y=R.int(0,N-1),d=R.int(0,3);const d0=d,x0=x,y0=y;const cells=[[x,y]];const segs=[];let ok=true;const ns=deck==='5'?2:3+R.int(0,1);
      for(let s=0;s<ns&&ok;s++){if(s>0){const t=R.chance(.5)?'L':'R';d=t==='L'?(d+3)%4:(d+1)%4;segs.push(t);}const n=1+R.int(0,2);let c=0;
        for(let i=0;i<n;i++){const nx=x+D[d][0],ny=y+D[d][1];if(nx<0||ny<0||nx>=N||ny>=N||cells.some(q=>q[0]===nx&&q[1]===ny))break;x=nx;y=ny;cells.push([x,y]);c++;}if(!c){ok=false;break;}segs.push('F'+c);}
      if(!ok)continue;const moves=segs.filter(s=>s[0]==='F').reduce((a,s)=>a+ +s[1],0);if(moves<(deck==='5'?3:5))continue;
      const rocks=[];const nr=deck==='5'?3:6;let tr=0;while(rocks.length<nr&&tr++<80){const rx=R.int(0,N-1),ry=R.int(0,N-1);if(cells.some(q=>q[0]===rx&&q[1]===ry)||rocks.some(r=>r[0]===rx&&r[1]===ry))continue;rocks.push([rx,ry]);}
      return{x0,y0,d0,goal:[x,y],rocks,segs,cells,cap:deck==='5'?14:segs.length};}
    return{x0:0,y0:0,d0:1,goal:[2,0],rocks:[],segs:['F2'],cells:[],cap:3};},
  newLevel(p){const st=p.state;st.L=this.gen(p);st.prog=[];st.phase='edit';st.tries=0;st.t0=st.T;st.rx=st.L.x0;st.ry=st.L.y0;st.rd=st.L.d0;st.trail=[];st.msg=p.levelId==='5'?'명령을 쌓고 ▶를 눌러요':'블록을 '+st.L.cap+'개 이하로 써서 안내해요';st.msgC='';st.nowI=-1;st.bump=0;
    p.ask('🤖 로봇을 ⭐까지 안내해요',p.levelId==='5'?'명령을 쌓고 ▶ 실행':'블록은 '+st.L.cap+'개까지!');},
  press(p,k){const st=p.state;if(st.phase!=='edit')return;if(k==='run'){this.run(p);return;}if(k==='del'){st.prog.pop();return;}
    if(p.levelId==='6'&&st.prog.length>=st.L.cap){st.msg='블록이 너무 많아요! 반복 블록을 써 봐요';st.msgC='bad';return;}if(st.prog.length>=14)return;st.prog.push(k);st.msg='';p.Snd.tap&&p.Snd.tap();},
  run(p){const st=p.state;if(st.phase!=='edit'||!st.prog.length)return;st.phase='run';st.rx=st.L.x0;st.ry=st.L.y0;st.rd=st.L.d0;st.trail=[];const steps=[];
    st.prog.forEach((k,i)=>{if(k==='L')steps.push(['t',3,i]);else if(k==='R')steps.push(['t',1,i]);else for(let n=0;n<+k[1];n++)steps.push(['f',0,i]);});st.steps=steps;st.si=0;st.acc=.3;},
  finish(p,ok,why){const st=p.state,G=this.geo(p);st.nowI=-1;
    if(ok){st.phase='wait';st.wait=1.9;const el=st.T-st.t0;st.solved++;p.hit(true,{pts:st.tries?55:Math.round(50+50*Math.max(0,1-el/40)),x:G.gr.x+G.gr.s/2,y:G.gr.y+G.gr.s*.1});st.msg='🎉 도착! 코딩 성공!';st.msgC='good';}
    else{st.tries++;const prog=st.prog.map(k=>LAB[k]).join(' ');p.hit(false,{pen:12,shake:false,x:G.gr.x+G.gr.s/2,y:G.gr.y+G.gr.s*.5,tip:why==='bump'?'💥 부딪혔어요':'🤔 목적지에 닿지 못했어요',tipMs:1100,review:'로봇 길 찾기: 명령 「'+prog+'」은(는) 목적지에 닿지 못했어요 (정답 예: '+st.L.segs.map(s=>LAB[s]).join(' ')+')'});st.msg=why==='bump'?'💥 부딪혔어요! 명령을 고쳐 봐요':'🤔 목적지에 닿지 못했어요. 명령을 고쳐 봐요';st.msgC='bad';st.phase='fail';st.wait=.9;}},
  update(p,dt){const st=p.state;st.T+=dt;if(st.bump>0)st.bump-=dt;
    if(st.phase==='run'){st.acc-=dt;if(st.acc<=0){const N=this.N(p);if(st.si>=st.steps.length){this.finish(p,st.rx===st.L.goal[0]&&st.ry===st.L.goal[1]);return;}
      const [t,v,i]=st.steps[st.si++];st.nowI=i;if(t==='t'){st.rd=(st.rd+v)%4;}else{const nx=st.rx+D[st.rd][0],ny=st.ry+D[st.rd][1];
        if(nx<0||ny<0||nx>=N||ny>=N||st.L.rocks.some(q=>q[0]===nx&&q[1]===ny)){st.bump=.4;st.phase='bumped';st.acc=.4;p.Snd.bad&&p.Snd.bad();return;}
        st.rx=nx;st.ry=ny;st.trail.push([nx,ny]);p.Snd.tone&&p.Snd.tone(500+st.trail.length*40,.06,'square',.03);}st.acc=.42;}}
    else if(st.phase==='bumped'){st.acc-=0;st.wait=st.wait||.4;st.wait-=dt;if(st.wait<=0){st.wait=0;this.finish(p,false,'bump');}}
    else if(st.phase==='fail'){st.wait-=dt;if(st.wait<=0){st.phase='edit';st.rx=st.L.x0;st.ry=st.L.y0;st.rd=st.L.d0;st.trail=[];}}
    else if(st.phase==='wait'){st.wait-=dt;if(st.wait<=0)this.newLevel(p);}},
  down(p,x,y){const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));if(b)this.press(p,b.k);},
  botAct(p){const st=p.state;if(st.phase!=='edit')return null;const G=this.geo(p);const tgt=[];st.L.segs.forEach(s=>{if(p.levelId==='5'&&s[0]==='F'){for(let i=0;i<+s[1];i++)tgt.push('F1');}else tgt.push(s);});
    let k;if(st.prog.length<tgt.length){if(st.prog.some((v,i)=>v!==tgt[i])){k='del';}else k=tgt[st.prog.length];}else k='run';const b=G.btns.find(b=>b.k===k);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,L=st.L,N=G.N;if(!L)return;
    K.vgrad(g,0,0,W,H,['#6b2a18','#2a0e0a']);for(let i=0;i<14;i++){g.fillStyle='rgba(0,0,0,.12)';g.beginPath();g.ellipse((i*977)%W,H*.5+((i*431)%(H*.5)),u*(.6+(i%3)*.4),u*.25,0,0,TAU);g.fill();}
    const R=G.gr,cs=G.cs;K.card(g,R.x-u*.2,R.y-u*.2,R.s+u*.4,R.s+u*.4,u*.2,'#2a0e0a',{stroke:ORG,lw:Math.max(3,u*.08),blur:u*.3,dy:0,sc:'rgba(255,140,60,.4)'});
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){g.fillStyle=(x+y)%2?'#c26a3d':'#b85d33';g.fillRect(R.x+x*cs,R.y+y*cs,cs,cs);}
    st.trail.forEach(([x,y])=>{g.fillStyle='rgba(255,230,160,.45)';g.fillRect(R.x+x*cs+cs*.1,R.y+y*cs+cs*.1,cs*.8,cs*.8);});
    L.rocks.forEach(([x,y])=>K.emo(g,'🪨',R.x+(x+.5)*cs,R.y+(y+.5)*cs,cs*.78));
    K.emo(g,'⭐',R.x+(L.goal[0]+.5)*cs,R.y+(L.goal[1]+.5)*cs+Math.sin(st.T*4)*cs*.04,cs*.78);
    {const bx=R.x+(st.rx+.5)*cs+(st.bump>0?Math.sin(st.bump*50)*cs*.06:0),by=R.y+(st.ry+.5)*cs;K.emo(g,'🤖',bx,by,cs*.74);g.save();g.translate(bx,by);g.rotate(st.rd*Math.PI/2);g.fillStyle='#ef4444';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(0,-cs*.5);g.lineTo(cs*.16,-cs*.3);g.lineTo(-cs*.16,-cs*.3);g.closePath();g.fill();g.stroke();g.restore();}
    /* 명령 줄 */
    const Q=G.qb;K.card(g,Q.x,Q.y,Q.w,Q.h,u*.2,'#1e0a07',{stroke:ORG,lw:2,blur:0,dy:0});K.txt(g,p.levelId==='5'?'명령 '+st.prog.length+'개':'블록 '+st.prog.length+' / '+L.cap+'개까지',Q.x+Q.w/2,Q.y-u*.45,{size:u*.55,color:ORG,maxW:Q.w});
    if(!st.prog.length)K.txt(g,'여기에 명령이 쌓여요',Q.x+Q.w/2,Q.y+Q.h/2,{size:u*.5,color:'#a08066',maxW:Q.w*.9});
    const cw=Math.min(u*1.9,(Q.w-u*.4)/7),per=Math.floor((Q.w-u*.4)/cw);st.prog.forEach((k,i)=>{const cx=Q.x+u*.2+(i%per)*cw+cw/2,cy=Q.y+u*.2+Math.floor(i/per)*(cw*.75)+cw*.35;K.rr(g,cx-cw*.45,cy-cw*.3,cw*.9,cw*.62,u*.15);g.fillStyle=st.nowI===i?ORG:'#5a2318';g.fill();g.lineWidth=2;g.strokeStyle=ORG;g.stroke();K.txt(g,LAB[k],cx,cy,{size:Math.min(cw*.4,u*.8),color:st.nowI===i?'#1e0a07':INK,maxW:cw*.85});});
    /* 메시지 */
    if(st.msg)K.txt(g,st.msg,Q.x+Q.w/2,Q.y+Q.h-u*.4,{size:Math.min(u*.5,Q.w/22),color:st.msgC==='bad'?'#fca5a5':st.msgC==='good'?'#bbf7d0':INK,maxW:G.land?Q.w:W*.95});
    G.btns.forEach(b=>{const dis=st.phase!=='edit';K.rr(g,b.x,b.y,b.w,b.h,u*.2);g.fillStyle=b.go?(dis?'#7a4a2a':ORG):(dis?'#3a1a12':'#5a2318');g.fill();g.lineWidth=3;g.strokeStyle=b.go?'#fff':ORG;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.42,u*.8),color:b.go?'#1e0a07':INK,maxW:b.w*.92});});
  },
};
Engine.boot(GAME);
