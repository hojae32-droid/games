/* 3~6학년 미술 · 조형 요소와 원리 — 조형 원리 큐레이터
   디자인: 몬드리안 같은 빨강·파랑·노랑 블록 벽의 밝은 미술관. 문제의 원리(요소)가 가장 잘 드러난 작품을 고르면 관람객이 우르르 몰려와요! 연속으로 맞히면 ‘특별 전시’ 보너스. 작품은 매번 새로 그려져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#111',GOLD='#f5c04a';
const LOGO=gkLogo('#ffffff','#111111','🏛️');
const LV={
  elements:{t:'조형 요소',d:'점 · 선 · 면 · 질감'},
  basic:{t:'조형 원리 기초',d:'반복 · 점증 · 강조 · 대칭'},
  adv:{t:'조형 원리 더하기',d:'대비 · 율동(리듬) · 방사 · 반복 · 점증 · 강조 · 대칭'},
};
const SETS={elements:['점','선','면','질감'],basic:['반복','점증','강조','대칭'],adv:['대비','율동','방사','반복','점증','강조','대칭']};
const CLASH={'반복':['율동','점증'],'율동':['반복','점증'],'점증':['반복','율동'],'강조':['대비'],'대비':['강조']};
let RNG=Math.random;const R=()=>RNG();const pick=a=>a[Math.floor(R()*a.length)];
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
/*@@DATA@@*/
const imgCache=new Map();
function artImg(name){const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400"><rect width="100" height="100" fill="'+pick(BG)+'"/>'+GEN[name]()+'</svg>';const im=new Image();im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);return im;}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#1f1b24','#3a2f44']);for(let i=0;i<3;i++){const cx=W*(.2+i*.3),w=W*.22,y=H*.2;const gr=g.createRadialGradient(cx,0,10,cx,H*.5,W*.25);gr.addColorStop(0,'rgba(245,192,74,.35)');gr.addColorStop(1,'rgba(245,192,74,0)');g.fillStyle=gr;g.fillRect(cx-W*.15,0,W*.3,H);
    g.fillStyle='#f5c04a';g.fillRect(cx-w/2-6,y-6,w+12,w+12);g.fillStyle='#fff';g.fillRect(cx-w/2,y,w,w);const k=(T*.7+i*.33)%1;g.fillStyle=['#ef4444','#3b82f6','#16a34a'][i];for(let a=0;a<4;a++)for(let b=0;b<4;b++){g.beginPath();g.arc(cx-w/2+w*(a+.5)/4,y+w*(b+.5)/4,w*.07*(i===1?.4+.6*(a/3):1)+(i===2&&a===1&&b===1?w*.06:0),0,TAU);g.fill();}}}
const GAME={
  id:'curator',title:'조형 원리 큐레이터',title1:'몬드리안 블록 미술관',title2:'조형 원리 큐레이터',emoji:LOGO,
  subtitle:'3~6학년 미술 · 조형 요소와 원리',
  howto:'🏛️ 미술관 큐레이터가 되어 보아요! 작품 4점 중 <b>문제의 원리(요소)가 가장 잘 드러난 작품</b>을 골라 전시해요. 맞히면 <b>관람객</b>이 몰려와요! 3번 연속 맞히면 ✨특별 전시(점수 1.5배). 작품은 매번 새로 그려져요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#d62828',c2:'#f7b801'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 전시를 준비할까요?',
  txt:{who:'누가 큐레이터일까요?',dur:'전시 준비 시간',pace:'생각하는 시간',seat:'번 큐레이터 ',go:'전시 시작!',s1:'1. 전시',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.t,d:v.d})),
  summary:`<ul><li><b>조형 요소</b>: 점·선·면·질감처럼 작품을 이루는 기본 재료예요.</li>
    <li><b>반복</b>은 같은 모양이 되풀이되는 것, <b>점증</b>은 크기나 색이 조금씩 단계적으로 변하는 것, <b>강조</b>는 한 부분을 눈에 띄게 하는 것, <b>대칭</b>은 가운데 선을 중심으로 양쪽이 똑같은 것이에요.</li>
    <li><b>대비</b>는 서로 반대되는 것이 맞서 강하게 보이는 것, <b>율동(리듬)</b>은 반복되면서 흐름이 느껴지는 것, <b>방사</b>는 가운데에서 바깥으로 퍼져 나가는 것이에요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4;const land=W>=H*1.1;const msgH=u*2.6;const areaH=H-top-pad-msgH;const rects=[];
    if(land){const gap=u*.5;const fw=Math.min((W-pad*2-gap*3)/4,areaH*.88);const x0=(W-(fw*4+gap*3))/2;const y=top+(areaH-fw*1.15)/2;for(let i=0;i<4;i++)rects.push({x:x0+i*(fw+gap),y,w:fw,h:fw*1.15});}
    else{const gap=u*.5;const fw=Math.min((W-pad*2-gap)/2,(areaH-gap)/2/1.15);const x0=(W-(fw*2+gap))/2;const y0=top+(areaH-(fw*1.15*2+gap))/2;for(let i=0;i<4;i++)rects.push({x:x0+(i%2)*(fw+gap),y:y0+Math.floor(i/2)*(fw*1.15+gap),w:fw,h:fw*1.15});}
    return{W,H,u,top,pad,rects,msg:{x:pad,y:H-pad-msgH,w:W-pad*2,h:msgH}};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false,streak:0,vis:[],visN:0,fame:0});this.newQ(p);},
  make(p,L){RNG=()=>p.R.f();const set=SETS[L];const ans=p.deck(set,'dk_'+L);let pool=set.filter(s=>s!==ans&&!(CLASH[ans]||[]).includes(s));pool=p.R.shuffle(pool);const opts=p.R.shuffle([ans,...pool.slice(0,3)]);
    const q={ans,opts,imgs:opts.map(o=>artImg(o)),okIdx:opts.indexOf(ans)};q.title=L==='elements'?"'"+ans+"'"+jo(ans,'이','가')+' 돋보이는 작품':"'"+ans+"'의 원리가 드러난 작품";q.text='🏛️ 이번 전시 주제: <b>'+q.title+'</b>';q.reveal=ans+': '+DESC[ans];q.review=q.title+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return 15;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(){return '작품을 잘 살펴보고 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return '전시 완료! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round((50+50*frac)*(p.state.streak>=2?1.5:1));},
  onVerdict(p,q,ok){const st=p.state;if(ok){st.streak++;const n=3+Math.min(st.streak,4);for(let k=0;k<n;k++)st.vis.push({e:['🧑‍🎓','👩‍🎨','👴','👧','🧑‍🦱','👩‍🦳','🧒'][Math.floor(Math.random()*7)],x:-Math.random()*60-20*k,s:25+Math.random()*25,y:Math.random()});st.visN+=n;}else st.streak=0;},
  upd(p,dt){const st=p.state;const G=this.geo(p);st.vis.forEach(v=>v.x+=v.s*dt*G.u*.05*(1+Math.sin(st.T*3+v.y*9)*.1));st.vis=st.vis.filter(v=>v.x<110);},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=gkHit(G.rects,x,y);if(i>=0)this.verdict(p,i,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.rects[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    g.fillStyle='#f6f2e8';g.fillRect(0,0,W,H);{const cs=[['#d62828',.0,.0,.16,.3],['#1d4ed8',.84,.55,.16,.45],['#f7b801',.62,.0,.38,.12],['#d62828',.0,.7,.1,.3]];cs.forEach(c=>{g.fillStyle=c[0];g.fillRect(W*c[1],H*c[2],W*c[3],H*c[4]);});g.fillStyle='#111';g.fillRect(W*.16,0,6,H);g.fillRect(W*.84-3,0,6,H);g.fillRect(0,H*.3,W*.16,6);g.fillRect(W*.62,H*.12,W*.38,6);g.fillRect(W*.84,H*.55,W*.16,6);}
    G.rects.forEach((r,i)=>{const right=st.lock&&i===q.okIdx,wrong=st.lock&&st.pick===i&&i!==q.okIdx;
      
      K.card(g,r.x,r.y,r.w,r.w,u*.1,right?'#bbf7d0':wrong?'#fecaca':'#111',{stroke:right?'#16a34a':'#111',lw:right?6:3,blur:u*.2,dy:u*.14,sc:'rgba(0,0,0,.35)'});const m=r.w*.07;g.fillStyle='#fffdf6';g.fillRect(r.x+m,r.y+m,r.w-2*m,r.w-2*m);const im=q.imgs[i];const m2=m*2.2;if(im&&im.complete&&im.naturalWidth)g.drawImage(im,r.x+m2,r.y+m2,r.w-2*m2,r.w-2*m2);
      K.card(g,r.x+r.w*.15,r.y+r.w+u*.2,r.w*.7,u*.8,u*.1,'#fff',{stroke:'#111',lw:3,blur:0,dy:0});K.txt(g,st.lock?q.opts[i]:(i+1)+'번 작품',r.x+r.w/2,r.y+r.w+u*.6,{size:Math.min(u*.55,r.w*.13),color:right?'#15803d':'#111',maxW:r.w*.64});});
    if(!st.lock&&st.qmax>0)QZ.bar(g,W-G.pad-Math.min(W*.3,u*7),G.top+u*.05,Math.min(W*.3,u*7),Math.max(6,u*.2),st.qt/st.qmax,{good:'#d62828'});
    const M=G.msg;K.card(g,M.x,M.y,M.w,M.h,u*.2,'#fff',{stroke:'#111',lw:3,blur:0,dy:u*.06,sc:'#111'});K.txt(g,st.lock?q.ans+': '+DESC[q.ans]:'작품을 잘 살펴보고 골라요',M.x+M.w/2,M.y+M.h*.3,{size:Math.min(u*.65,M.h*.26),color:st.lock?(st.res==='ok'?'#15803d':'#b91c1c'):'#111',maxW:M.w*.94});
    g.fillStyle='#d9cfc0';g.fillRect(M.x+4,M.y+M.h*.62,M.w-8,M.h*.34);st.vis.forEach(v=>{const x=M.x+M.w*(v.x/100);if(x<M.x||x>M.x+M.w)return;const bob=Math.abs(Math.sin(st.T*8+v.y*9))*u*.12;K.emo(g,v.e,x,M.y+M.h*.8-bob,u*.85);});
    K.card(g,u*.3,G.top-u*.15,u*5.6,u*.7,u*.2,'#fff',{stroke:'#111',lw:3,blur:0,dy:0});K.txt(g,'👥 관람객 '+st.visN+'명'+(st.streak>=2?' ✨특별 전시':''),u*.3+u*2.8,G.top+u*.2,{size:u*.42,color:INK,maxW:u*5.2});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1900,badMs:3000});
Engine.boot(GAME);
