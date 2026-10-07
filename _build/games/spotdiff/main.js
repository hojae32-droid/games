/* 3~6학년 미술 · 관찰하기 — 관찰 탐정
   디자인: 낙서 가득한 스케치북. 두 그림에서 다른 곳을 찾아 눌러요. 어느 그림을 눌러도 돼요. 아무 곳이나 마구 누르면 점수가 깎여요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3a3226',TEAL='#0d9488',ROSE='#e11d48';
const LOGO=gkLogo('#fffef7','#4a4034','🔎');
const LV={
  easy:{t:'쉬운 관찰',d:'다른 곳 5개, 눈에 잘 띄는 변화',n:5},
  hard:{t:'꼼꼼한 관찰',d:'다른 곳 7개, 색·크기·방향의 작은 변화',n:7},
};
/*@@DATA@@*/
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fbf7e8','#f1e9c8']);const pw=W*.36,ph=pw*.7,y=H*.2;[[W*.1,0],[W*.54,1]].forEach(([x,k])=>{K.card(g,x,y,pw,ph,u*.2,'#bde7ff',{stroke:'#4a4034',lw:3,blur:0,dy:0});g.fillStyle='#9bd27a';g.fillRect(x+3,y+ph*.62,pw-6,ph*.35);K.emo(g,'🌳',x+pw*.25,y+ph*.5,u*1.1);K.emo(g,'🐶',x+pw*.6,y+ph*.62,u*.9);if(!k)K.emo(g,'🎈',x+pw*.8,y+ph*.3,u*.8);});
  const mx=W*.5+Math.sin(T*1.3)*W*.3,my=H*.55+Math.cos(T*1.7)*H*.1;g.strokeStyle='#4a4034';g.lineWidth=u*.14;g.beginPath();g.arc(mx,my,u*.9,0,TAU);g.stroke();g.beginPath();g.moveTo(mx+u*.64,my+u*.64);g.lineTo(mx+u*1.6,my+u*1.6);g.stroke();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.arc(mx,my,u*.9,0,TAU);g.fill();}
const GAME={
  id:'spotdiff',title:'관찰 탐정',title1:'낙서 스케치북',title2:'관찰 탐정',emoji:LOGO,
  subtitle:'3~6학년 미술 · 관찰하기',
  howto:'두 그림에서 <b>다른 곳</b>을 찾아 눌러요. 어느 그림을 눌러도 돼요. 아무 곳이나 마구 누르면 점수가 깎여요. 다 찾으면 다음 그림으로!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:TEAL,c2:ROSE},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 관찰을 할까요?',
  txt:{who:'누가 탐정일까요?',dur:'수사 시간',pace:'난이도',seat:'번 탐정 ',go:'수사 시작!',s1:'1. 사건',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>관찰</b>은 대상을 자세히 살펴서 특징을 알아내는 것이에요. 모양·색·크기·방향·있고 없음을 하나씩 비교해 보면 차이를 쉽게 찾을 수 있어요.</li>
    <li>그림을 반으로 나누어 위에서 아래로 차례대로 살피면 놓치지 않아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const land=W>=H*1.1;const infoH=u*1.3;let pw,ph,pics;
    if(land){pw=Math.min((W-pad*3)/2,(H-top-pad-infoH)/.7);ph=pw*.7;const x0=(W-(pw*2+pad))/2;const y=top+infoH+(H-top-pad-infoH-ph)/2;pics=[{x:x0,y,w:pw,h:ph},{x:x0+pw+pad,y,w:pw,h:ph}];}
    else{pw=Math.min(W-pad*2,((H-top-pad-infoH-pad)/2)/.7);ph=pw*.7;const x0=(W-pw)/2;const y0=top+infoH+((H-top-pad-infoH)-(ph*2+pad))/2;pics=[{x:x0,y:y0,w:pw,h:ph},{x:x0,y:y0+ph+pad,w:pw,h:ph}];}
    return{W,H,u,top,pad,pics,infoH};},
  init(p){const st=p.state;Object.assign(st,{T:0,objs:[],diffs:[],found:0,cool:0,wrong:[],th:null,msg:'',msgT:0,scenes:0,next:0,bonusDone:false,done:false,sceneT:0});this.scene(p);},
  scene(p){const st=p.state,R=p.R,ND=LV[p.levelId].n;const pickf=a=>a[R.int(0,a.length-1)];const th=THEMES[pickf(Object.keys(THEMES))];st.th=th;const objs=[];const n=16;
    for(let k=0;k<200&&objs.length<n;k++){const o={e:pickf(th.items),x:6+R.f()*88,y:8+R.f()*56,s:6.5+R.f()*4.5,r:0,flip:false,hide:false};if(objs.every(q=>Math.hypot(q.x-o.x,(q.y-o.y)*1.2)>Math.max(q.s,o.s)*1.05))objs.push(o);}
    const idx=R.shuffle(objs.map((_,i)=>i));const diffs=[];const types=p.levelId==='easy'?['hide','swap','swap','big','hide','flip']:['hide','swap','big','small','flip','rot','swap','hide'];
    for(const i of idx){if(diffs.length>=ND)break;const o=objs[i],t=pickf(types);if(t==='swap'&&!SWAP[o.e])continue;const b=Object.assign({},o);if(t==='hide')b.hide=true;else if(t==='swap')b.e=SWAP[o.e];else if(t==='big')b.s=o.s*1.55;else if(t==='small')b.s=o.s*.7;else if(t==='flip')b.flip=true;else if(t==='rot')b.r=p.levelId==='easy'?90:35;o.b=b;diffs.push({i,x:o.x,y:o.y,r:Math.max(5.5,o.s*.8),found:false});}
    st.objs=objs;st.diffs=diffs;st.found=0;st.wrong=[];st.msg='두 그림을 꼼꼼히 비교해요';st.msgT=0;st.sceneT=0;st.scenes++;st.bonusDone=false;st.done=false;p.ask('🔎 두 그림에서 <b>다른 곳</b> '+ND+'개를 찾아요','어느 그림을 눌러도 돼요');},
  tapAt(p,pi,x,y){const st=p.state;if(st.done)return;const G=this.geo(p);const r=G.pics[pi];const sx=(x-r.x)/r.w*100,sy=(y-r.y)/r.h*70;const now=st.T;if(now<st.cool)return;
    const d=st.diffs.find(d=>!d.found&&Math.hypot(d.x-sx,d.y-sy)<d.r+2.5);
    if(d){d.found=true;st.found++;p.hit(true,{pts:30,x,y});p.Snd.tone&&p.Snd.tone(784,.1,'sine',.07);st.msg='찾았어요! 남은 곳 '+(st.diffs.length-st.found)+'개';st.msgT=1.5;
      if(st.found===st.diffs.length){st.done=true;const el=st.sceneT;const bonus=Math.round(60*Math.max(0,1-el/(st.diffs.length*9)));p.hit(true,{pts:20+bonus,x:p.W/2,y:p.H*.4,tip:'🎉 모두 찾았어요! 관찰 보너스'});st.next=1.6;}}
    else{st.wrong.push({x:sx,y:sy,pi,t:now});p.hit(false,{pen:12,shake:false,x,y,quiet:false,review:'다른 곳이 아닌 곳을 눌렀어요 (같은 부분이에요)',tip:'거기는 같아요',tipMs:900});st.cool=now+.5;}},
  down(p,x,y){const st=p.state;const G=this.geo(p);for(let i=0;i<2;i++){const r=G.pics[i];if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h){this.tapAt(p,i,x,y);return;}}},
  update(p,dt){const st=p.state;st.T+=dt;st.sceneT+=dt;if(st.msgT>0)st.msgT-=dt;st.wrong=st.wrong.filter(w=>st.T-w.t<.6);if(st.next>0){st.next-=dt;if(st.next<=0)this.scene(p);}},
  botAct(p){const st=p.state;if(st.done)return null;const d=st.diffs.find(d=>!d.found);if(!d)return null;const G=this.geo(p);const r=G.pics[0];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+d.x/100*r.w,y:rc.top+r.y+d.y/70*r.h};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T;K.vgrad(g,0,0,W,H,['#fbf7e8','#f3ecd0']);
    K.txt(g,'🔎 다른 곳 찾기',G.pics[0].x+u*3,G.top+u*.5,{size:u*.7,color:INK,maxW:u*5,align:'center'});K.card(g,W-G.pad-u*5.2,G.top+u*.05,u*5.2,u*.9,u*.2,'#fffef7',{stroke:'#4a4034',lw:2,blur:0,dy:0,});K.txt(g,'남은 곳 '+(st.diffs.length-st.found)+'개',W-G.pad-u*2.6,G.top+u*.5,{size:u*.55,color:ROSE,maxW:u*4.8});
    if(st.msgT>0||true)K.txt(g,st.msg,W/2,G.top+u*1.0,{size:u*.5,color:'#6b5d4a',maxW:W*.6});
    G.pics.forEach((r,pi)=>{const th=st.th;K.card(g,r.x-u*.15,r.y-u*.15,r.w+u*.3,r.h+u*.3,u*.15,'#fffef7',{stroke:'#4a4034',lw:3,blur:u*.2,dy:u*.08});g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.fillStyle=th.sky;g.fillRect(r.x,r.y,r.w,r.h);g.fillStyle=th.ground;g.beginPath();g.moveTo(r.x,r.y+r.h*(46/70));g.quadraticCurveTo(r.x+r.w*.25,r.y+r.h*(40/70),r.x+r.w*.5,r.y+r.h*(45/70));g.quadraticCurveTo(r.x+r.w*.75,r.y+r.h*(50/70),r.x+r.w,r.y+r.h*(44/70));g.lineTo(r.x+r.w,r.y+r.h);g.lineTo(r.x,r.y+r.h);g.closePath();g.fill();
      const k=r.w/100;st.objs.forEach(o=>{const d=(pi===1&&o.b)?o.b:o;if(d.hide)return;const cx=r.x+d.x*k,cy=r.y+d.y*k;g.save();g.translate(cx,cy);if(d.flip)g.scale(-1,1);K.emo(g,d.e,0,0,d.s*k*1.15,d.r*Math.PI/180);g.restore();});
      st.diffs.forEach(d=>{if(d.found){g.strokeStyle='#16a34a';g.lineWidth=Math.max(3,u*.1);g.beginPath();g.arc(r.x+d.x*k,r.y+d.y*k,d.r*k,0,TAU);g.stroke();}});
      st.wrong.forEach(w=>{if(w.pi!==pi)return;const x=r.x+w.x*k,y=r.y+w.y*k,s=3*k;g.strokeStyle='#dc2626';g.lineWidth=Math.max(3,u*.1);g.beginPath();g.moveTo(x-s,y-s);g.lineTo(x+s,y+s);g.moveTo(x+s,y-s);g.lineTo(x-s,y+s);g.stroke();});g.restore();});
    if(st.done)K.txt(g,'🎉 모두 찾았어요!',W/2,H-G.pad-u*.4,{size:u*.9,color:'#15803d',stroke:'#fff',lw:u*.2,maxW:W*.8});
  },
};
Engine.boot(GAME);
