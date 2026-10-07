/* 3~6학년 체육 · 안전 — 안전 탐정
   디자인: 노랑·검정 공사장 안전 테이프와 형광 조끼. 그림 속에 숨은 위험한 장면 4곳을 찾아 눌러요. 안전한 곳을 누르면 점수가 깎여요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2b2b2b',ORG='#ff6a00',YEL='#ffe14d';
const LOGO=gkLogo('#ffe14d','#2b2b2b','⚠️');
const LV={
  gym:{t:'운동장 · 체육관',d:'운동할 때 위험한 행동과 물건',g:'3~6학년'},
  water:{t:'물놀이 · 여름',d:'수영장과 바다, 더운 날의 안전',g:'3~6학년'},
  daily:{t:'생활 · 교통 안전',d:'자전거, 킥보드, 겨울철 안전',g:'3~6학년'},
};
/* 그림 [이모지, 위험한 이유] / 안전한 그림 */
const SD={
      gym:{bg:['#BFE6FF','#E8C48F'],haz:[['🧍‍♂️🏏','방망이를 휘두르는 친구 가까이에 서 있어요. 멀리 떨어져요'],['🏃🔙','뒤를 보며 달리고 있어요. 앞을 보고 달려요'],['🧗🥅','골대에 매달려 있어요. 골대가 넘어질 수 있어요'],['👟🔓','신발 끈이 풀린 채 뛰고 있어요'],['⚽🪨','운동장에 돌이 굴러다녀요. 치우고 운동해요'],['🧊❌🤸','준비 운동 없이 바로 뛰어요. 몸을 먼저 풀어요'],['💍🏀','목걸이·반지를 낀 채 운동해요. 빼고 운동해요'],['🥤💦🏀','바닥에 물이 쏟아져 있어요. 미끄러질 수 있어요'],['🎒🏃','줄넘기를 하는 곳에 가방이 놓여 있어요'],['🤼👊','장난으로 친구를 밀고 있어요']],
        safe:['🏃‍♀️👟','🧘🌳','🚰🥤','🙆⏱️','🏃‍♀️','⛹️','🤸','🧘','🚰','🌳','🏐','🥇','🪃','⛳','🙆','🧢','🏸','🥏']},
      water:{bg:['#BFEFFF','#5EC2E8'],haz:[['🏃💦','수영장 옆에서 뛰고 있어요. 미끄러워요, 걸어요'],['🤿🌊❗','어른 없이 깊은 곳에 들어가요'],['🍔🏊','밥을 먹자마자 바로 물에 들어가요'],['🌞🥵','모자 없이 뙤약볕에 오래 있어요. 그늘에서 쉬어요'],['🤽🙃','친구를 물속으로 밀거나 눌러요'],['⚡🌧️🏖️','천둥 번개가 치는데 물에 있어요'],['🛟❌','구명조끼 없이 배를 타요'],['🏞️🌊🚫','물살이 센 계곡에 들어가요'],['🍦☀️🧴❌','햇볕이 강한데 선크림을 안 발랐어요']],
        safe:['🏊🛟','👒🧴','🍉⛱️','🧑‍🏫🏊','🏊','🛟','🧴','👒','🏖️','🐚','🍉','⛱️','🦀','🏄','🧃','🩴','🐬']},
      daily:{bg:['#D7F0FF','#B9B9B9'],haz:[['🚲🎧','이어폰을 끼고 자전거를 타요'],['🛴⛑️❌','헬멧 없이 킥보드를 타요'],['🚸📱','휴대폰을 보며 횡단보도를 건너요'],['🧊🏃','빙판길에서 뛰어요'],['🚗⚽','차도에서 공놀이를 해요'],['🚦🔴🚶','빨간불에 길을 건너요'],['🧯🔥🧒','어린이 혼자 불을 다뤄요'],['🛗🙃','엘리베이터 문에 기대 있어요'],['🛹🌙','깜깜한 밤에 밝은 옷 없이 보드를 타요'],['🪜🧒','높은 의자를 쌓고 올라가요']],
        safe:['🚶🚦','🚴‍♀️⛑️','🧥🧤','🚸👀','🚶','🚦','⛑️','🚌','🏫','🌳','🚴‍♀️','🧥','🐕','🏡','🛑','👩‍👧','🧤']},
    };
const NEED=4;
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#bfe6ff','#e8c48f']);g.fillStyle='#e8c48f';g.fillRect(0,H*.45,W,H*.55);
  g.save();g.translate(0,0);for(let i=0;i<Math.ceil(W/(u*1.6))+2;i++){g.fillStyle=i%2?YEL:INK;g.beginPath();g.moveTo(i*u*1.6-u*.8,0);g.lineTo(i*u*1.6+u*.8,0);g.lineTo(i*u*1.6,u*.7);g.fill();}g.restore();
  [['🏃',.2,.62],['🥅',.78,.55],['🛴',.5,.75],['⚽',.35,.5],['🚲',.65,.7]].forEach(([e,x,y],i)=>K.emo(g,e,W*x,H*y,u*1.3+Math.sin(T*3+i)*u*.06));
  const k=(T*.5)%1.4;if(k<1){const cx=W*.5,cy=H*.4;g.strokeStyle='#ff3b30';g.lineWidth=u*.14;g.setLineDash([u*.4,u*.3]);g.beginPath();g.arc(cx,cy,u*(1+k*.4),0,TAU);g.stroke();g.setLineDash([]);}
  K.emo(g,'🔎',W*.5+Math.sin(T)*W*.2,H*.36,u*1.6);}
const GAME={
  id:'safety',title:'안전 탐정',title1:'형광 조끼 안전 점검',title2:'안전 탐정',emoji:LOGO,
  subtitle:'3~6학년 체육 · 운동장·물놀이·생활 안전',
  howto:'🔎 그림 속에 <b>위험한 장면</b> 4곳이 숨어 있어요. 찾아서 눌러요! 왜 위험한지도 알려 줘요. <b>안전한 곳을 누르면</b> 점수가 깎여요. 모두 찾으면 새 그림으로!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:ORG,c2:YEL},hero:gkHero(hero),vignette:.02,durs:[90,120,180],levelTitle:'어디를 점검할까요?',
  txt:{who:'누가 탐정일까요?',dur:'점검 시간',pace:'난이도',seat:'번 탐정 ',go:'점검 시작!',s1:'1. 장소',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>운동장·체육관</b>: 준비 운동을 하고, 신발 끈을 묶고, 운동장의 돌과 물기를 치우고, 골대에 매달리지 않아요.</li>
    <li><b>물놀이</b>: 어른과 함께, 준비 운동 후 구명조끼를 입고, 천둥 번개가 치면 바로 물 밖으로 나와요. 더운 날에는 모자와 선크림, 그늘에서 쉬기!</li>
    <li><b>생활·교통</b>: 횡단보도는 초록불에 좌우를 살피고, 자전거·킥보드는 헬멧을 쓰고 이어폰은 빼요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const cardH=Math.min(u*3.2,H*.2);const ar={x:pad,y:top,w:W-pad*2,h:H-top-pad-cardH-gap};
    const portrait=ar.w<ar.h*1.1;const VW=portrait?100:160,VH=portrait?140:100;const s=Math.min(ar.w/VW,ar.h/VH);const x0=ar.x+(ar.w-VW*s)/2,y0=ar.y+(ar.h-VH*s)/2;
    return{W,H,u,top,pad,ar,cardH,card:{x:pad,y:H-pad-cardH,w:W-pad*2,h:cardH},VW,VH,s,x0,y0,P:(nx,ny)=>({x:x0+nx*VW*s,y:y0+ny*VH*s})};},
  init(p){const st=p.state;Object.assign(st,{T:0,items:[],found:0,msg:'',msgC:'',card:null,cool:0,t0:0,wait:0,marks:[],bag:[],scenes:0,nopeT:0,nopeI:-1,flash:0});this.scene(p);},
  scene(p){const st=p.state,R=p.R,D=SD[p.levelId];if(st.bag.length<NEED)st.bag=R.shuffle(D.haz.slice());
    const hz=st.bag.splice(0,NEED);const sf=R.sample(D.safe,9);const G=this.geo(p);const VW=G.VW,VH=G.VH;const items=[];
    const place=(e,h,reason)=>{for(let t=0;t<300;t++){const n=[...new Intl.Segmenter().segment(e)].length;const w=n*11+3;const o={e,h,reason,w,nx:0,ny:0,x:w/2+3+R.f()*(VW-w-6),y:12+R.f()*(VH-22),n};
      if(items.every(q=>Math.abs(q.x-o.x)<(q.w+o.w)/2+2?Math.abs(q.y-o.y)>16:true)){o.nx=o.x/VW;o.ny=o.y/VH;items.push(o);return;}}};
    hz.forEach(([e,r])=>place(e,true,r));sf.forEach(e=>place(e,false));st.items=R.shuffle(items);st.found=0;st.card=null;st.marks=[];st.t0=st.T;st.wait=0;
    st.msg='그림을 꼼꼼히 살펴봐요';st.msgC='';p.ask('🔎 위험한 곳 '+NEED+'군데를 찾아요','안전한 곳을 누르면 점수가 깎여요');},
  update(p,dt){const st=p.state;st.T+=dt;if(st.nopeT>0)st.nopeT-=dt;if(st.flash>0)st.flash-=dt;if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.scene(p);}},
  hitTest(p,x,y){const G=this.geo(p),st=p.state;for(let i=st.items.length-1;i>=0;i--){const o=st.items[i];const c=G.P(o.nx,o.ny);const hw=(o.w/2+1)*G.s,hh=7*G.s;if(Math.abs(x-c.x)<=hw&&Math.abs(y-c.y)<=hh)return i;}return -1;},
  down(p,x,y){const st=p.state;if(st.wait>0)return;const now=performance.now();if(now<st.cool)return;const G=this.geo(p);const i=this.hitTest(p,x,y);
    if(i<0){if(K.inRect(x,y,G.ar)){st.cool=now+500;this.miss(p,x,y,'거기에는 위험한 게 없어요',-1);}return;}
    const o=st.items[i];const c=G.P(o.nx,o.ny);
    if(o.h){if(o.done)return;o.done=true;st.found++;st.card=o.reason;st.msg='찾았어요! 위험한 곳 '+(NEED-st.found)+'군데 남았어요';st.msgC='good';p.Snd.bell?p.Snd.bell(880,0,.05):0;
      p.hit(true,{pts:40,x:c.x,y:c.y-G.s*8,tip:'⚠️ 위험! '+o.reason,tipMs:1800});st.flash=.25;
      if(st.found>=NEED){const el=st.T-st.t0;setTimeout(()=>{if(p.active&&!p.finished)p.hit(true,{pts:20+Math.round(40*Math.max(0,1-el/40)),x:G.W/2,y:G.ar.y+G.ar.h*.4,tip:'🎉 모두 찾았어요! 안전 지킴이 보너스',tipMs:1500});},400);st.msg='🎉 모두 찾았어요!';st.wait=2.6;}}
    else{st.cool=now+500;st.nopeI=i;st.nopeT=.5;this.miss(p,c.x,c.y,'여기는 안전해요',i);}},
  miss(p,x,y,t,i){const st=p.state;const un=st.items.find(q=>q.h&&!q.done);st.msg=t;st.msgC='bad';
    p.hit(false,{pen:15,x,y,tip:t,tipMs:900,review:un?'숨은 위험 찾기: '+un.reason:'안전한 곳을 위험하다고 눌렀어요'});},
  botAct(p){const st=p.state;if(st.wait>0||performance.now()<st.cool)return null;const o=st.items.find(q=>q.h&&!q.done);if(!o)return null;const G=this.geo(p);const c=G.P(o.nx,o.ny);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+c.x,y:rc.top+c.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,s=G.s,L=p.levelId;const D=SD[L];
    g.fillStyle=YEL;g.fillRect(0,0,W,H);
    /* 장면 */
    const A=G.ar,x0=G.x0,y0=G.y0,VW=G.VW*s,VH=G.VH*s;g.save();K.rr(g,x0,y0,VW,VH,u*.3);g.clip();
    g.fillStyle=D.bg[0];g.fillRect(x0,y0,VW,VH);const gy=y0+VH*.36;g.fillStyle=D.bg[1];g.beginPath();g.moveTo(x0,gy+4*s);g.quadraticCurveTo(x0+VW*.25,gy-4*s,x0+VW/2,gy+2*s);g.quadraticCurveTo(x0+VW*.75,gy+8*s,x0+VW,gy);g.lineTo(x0+VW,y0+VH);g.lineTo(x0,y0+VH);g.fill();
    if(L==='gym'){g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=Math.max(2,s*.8);g.setLineDash([3*s,2*s]);g.beginPath();g.ellipse(x0+VW/2,y0+VH*.7,VW*.4,VH*.2,0,0,TAU);g.stroke();g.setLineDash([]);}
    else if(L==='water'){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=Math.max(2,s*.6);for(let r=0;r<4;r++){g.beginPath();for(let x=0;x<=VW;x+=s*10){g.quadraticCurveTo(x0+x+s*2.5,y0+VH*(.58+r*.09)-s*3+Math.sin(st.T*2+r)*s,x0+x+s*5,y0+VH*(.58+r*.09));g.quadraticCurveTo(x0+x+s*7.5,y0+VH*(.58+r*.09)+s*3,x0+x+s*10,y0+VH*(.58+r*.09));}g.stroke();}}
    else{g.fillStyle='#6b7280';g.fillRect(x0,y0+VH*.62,VW,s*16);g.fillStyle='#fff';for(let i=0;i<Math.ceil(G.VW/20);i++)g.fillRect(x0+(10+i*20)*s,y0+VH*.62+7*s,10*s,2*s);}
    g.restore();g.lineWidth=Math.max(4,u*.12);g.strokeStyle=INK;K.rr(g,x0,y0,VW,VH,u*.3);g.stroke();
    /* 그림들 */
    st.items.forEach((o,i)=>{const c=G.P(o.nx,o.ny);const sz=Math.max(18,9.2*s);const w=o.n*sz*1.05;if(o.done){g.save();g.shadowColor='#22c55e';g.shadowBlur=u*.5;}
      if(i===st.nopeI&&st.nopeT>0){g.save();g.translate(Math.sin(st.nopeT*60)*u*.1,0);}
      K.emo(g,o.e,c.x,c.y,sz*Math.min(1,(o.w/ (o.n*11+3))*1.0)*1.0);
      if(i===st.nopeI&&st.nopeT>0){g.restore();K.txt(g,'✖',c.x,c.y-sz*.7,{size:sz*.8,color:'#ef4444',stroke:'#fff',lw:u*.1});}
      if(o.done){g.restore();g.strokeStyle='#ef2d2d';g.lineWidth=Math.max(3,u*.1);g.beginPath();g.ellipse(c.x,c.y,w/2+s*3,s*7.5,0,0,TAU);g.stroke();K.txt(g,'⚠️',c.x+w/2,c.y-s*7,{size:u*.7});}});
    /* 카드 */
    const C=G.card;K.card(g,C.x,C.y,C.w,C.h,u*.3,'#fffbe0',{stroke:INK,lw:Math.max(3,u*.09),blur:0,dy:u*.08,sc:INK});
    for(let i=0;i<NEED;i++){g.fillStyle=i<st.found?'#ff3b30':'rgba(43,43,43,.22)';g.beginPath();g.arc(C.x+u*.7+i*u*.75,C.y+u*.6,u*.26,0,TAU);g.fill();}
    K.txt(g,'남은 위험 '+(NEED-st.found),C.x+C.w-u*.3,C.y+u*.6,{size:u*.5,color:INK,align:'right',maxW:C.w*.4});
    const txt=st.card?'⚠️ '+st.card:st.msg;g.font=K.font(Math.min(u*.62,C.w/16));const fs=Math.min(u*.62,C.w/16);g.fillStyle=st.card?'#b42318':st.msgC==='bad'?'#b42318':INK;g.textAlign='center';g.textBaseline='middle';
    const words=wrapKo(g,txt,C.w-u*.8);words.slice(0,2).forEach((l,i)=>g.fillText(l,C.x+C.w/2,C.y+C.h*.62+(i-(Math.min(words.length,2)-1)/2)*fs*1.2));
    if(st.flash>0){g.fillStyle='rgba(255,255,255,'+st.flash*1.2+')';g.fillRect(x0,y0,VW,VH);}
  },
};
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
Engine.boot(GAME);
