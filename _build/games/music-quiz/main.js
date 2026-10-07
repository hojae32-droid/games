/* 3~6학년 음악 · 명곡·민요 감상과 음악가, 음악 요소(장조·단조·박자·높낮이) — 음악 퀴즈쇼
   디자인: 생방송 TV 퀴즈쇼 무대. 가락이 나오는 동안 알 것 같으면 바로 버저! 먼저, 빨리 맞힐수록 점수가 커요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const n=s=>s.split(' ').map(t=>{const [m,b]=t.split(':');return[+m,b?+b:1];});
const CLASSIC=/*@@CLASSIC@@*/;
const FOLK=/*@@FOLK@@*/;
const COMP=/*@@COMP@@*/;
const ALLC=[...new Set(COMP.map(c=>c[1]))];
const YEL='#ffe14d',PINK='#ff3d7f',CY='#5ee7ff';
const OCOL=['#ff3d7f','#2f80ed','#ffb703','#2dbf8a'];
const LV={
  classic:{label:'명곡 듣고 맞히기',desc:'귀에 익은 클래식 명곡의 가락을 듣고 곡 찾기',tag:'3~6학년',ic:'🎼',songs:CLASSIC},
  folk:{label:'민요·동요 듣고 맞히기',desc:'우리 민요와 세계 여러 나라 노래',tag:'3~4학년',ic:'🎶',songs:FOLK},
  all:{label:'명곡 + 민요 모두',desc:'36곡 가운데 무작위로 나와요',tag:'도전',ic:'🔥',songs:[...CLASSIC,...FOLK]},
  composer:{label:'작곡가 퀴즈',desc:'서양 음악가와 우리나라 작곡가',tag:'5~6학년',ic:'🎩'},
  ear:{label:'음악 요소 듣기',desc:'장조·단조 느낌, 2·3·4박자, 음색 높낮이',tag:'4~6학년',ic:'👂'},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="28" rx="4" fill="#4a1a8c" stroke="#ffe14d" stroke-width="3"/><circle cx="15" cy="22" r="4" fill="#ff3d7f"/><circle cx="24" cy="22" r="4" fill="#ffe14d"/><circle cx="33" cy="22" r="4" fill="#5ee7ff"/><path d="M14 42h20" stroke="#ffe14d" stroke-width="4" stroke-linecap="round"/></svg>';
const QS={};let CH=null;
function stageBg(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#2d0a5c','#4a1a8c','#2d0a5c']);g.save();g.globalAlpha=.15;g.fillStyle='#ffe14d';for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(W/2,-H*.1);g.lineTo(W/2+k*W*.2-W*.04,H);g.lineTo(W/2+k*W*.2+W*.04,H);g.closePath();g.fill();}g.restore();}
function bulbs(g,x,y,w,h,t,u){const n=Math.max(8,Math.round(w/(u*.9)));for(let i=0;i<n;i++){const on=(i+Math.floor(t*4))%3===0;for(const yy of[y,y+h]){g.fillStyle=on?YEL:'rgba(255,225,77,.25)';g.beginPath();g.arc(x+w*(i+.5)/n,yy,u*.13,0,TAU);g.fill();if(on)K.glow(g,x+w*(i+.5)/n,yy,u*.5,YEL,.4);}}}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;stageBg(g,W0,H0,u,T);bulbs(g,W0*.1,H0*.18,W0*.8,H0*.6,T,u);K.txt(g,'ON AIR',W0/2,H0*.3,{size:u*.9,color:PINK,stroke:'#12032e',lw:u*.15});
    const bw=Math.min(W0*.012,u*.12);for(let i=0;i<24;i++){const h=(Math.abs(Math.sin(T*4+i*.6))*.6+.1)*H0*.28;g.fillStyle=['#ff3d7f','#ffe14d','#5ee7ff'][i%3];K.rr(g,W0*.2+i*(W0*.6/24),H0*.62-h/2,bw*1.6,h,bw*.5);g.fill();}
    const k=Math.floor(T*1.2)%4;['A','B','C','D'].forEach((l,i)=>{const bx=W0*.16+i*W0*.18;K.rr(g,bx,H0*.78,W0*.15,H0*.1,u*.2);g.fillStyle=i===k?OCOL[i]:'rgba(255,255,255,.12)';g.fill();K.txt(g,l,bx+W0*.075,H0*.83,{size:u*.6,color:i===k?'#fff':OCOL[i]});});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'music-quiz',title:'음악 퀴즈쇼',title1:'생방송 퀴즈 무대',title2:'음악 퀴즈쇼',emoji:LOGO,
  subtitle:'3~6학년 음악 · 감상과 음악 요소',
  howto:'퀴즈쇼에 오신 걸 환영해요! 가락이 나오는 동안 <b>알 것 같으면 바로</b> 정답 버튼을 눌러요. 먼저 맞힐수록 점수가 커요. 한 화면 대결에서는 <b>가장 먼저 맞힌 사람</b>에게 보너스 불이 켜져요! (키보드: 1~4)',
  how:p=>(LV[p.levelId].label+' — '+LV[p.levelId].desc),
  theme:{c1:'#ff3d7f',c2:'#ffe14d'},hero:heroScene,vignette:.1,durs:[120,180,300],levelTitle:'어떤 퀴즈를 풀까요?',
  txt:{who:'누가 출연자일까요?',dur:'방송 시간',pace:'문제 시간',seat:'번 출연자 ',go:'방송 시작!',s1:'1. 코너',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li>같은 곡도 <b>가락</b>을 끝까지 들으면 더 잘 알 수 있어요. 처음 나오는 몇 음만으로도 곡을 알아맞히는 귀를 길러요.</li>
    <li><b>장조</b>는 밝고 즐거운 느낌, <b>단조</b>는 어둡고 슬픈 느낌이에요. 2박자는 강 약, 3박자는 강 약 약, 4박자는 강 약 중강 약이에요.</li>
    <li>작곡가: 바흐(음악의 아버지) · 헨델(음악의 어머니) · 하이든(교향곡의 아버지) · 모차르트 · 베토벤 · 슈베르트(가곡의 왕) · 쇼팽(피아노의 시인) · 슈트라우스(왈츠의 왕) · 안익태(애국가) · 윤이상</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const top=(p.top||0)+u*.4;const pad=u*.35;const land=W>=H*1.1;const boardH=Math.max(u*4,(H-top)*(land?.4:.32));const board={x:pad,y:top,w:W-pad*2,h:boardH};const oy=top+boardH+u*.35;const gap=u*.3;const q=p.state.q;const nn=q?q.opts.length:4;const cols=nn===4?2:nn,rows=nn===4?2:1;const availH=H-oy-pad-u*1.3;const ow=(W-pad*2-gap*(cols-1))/cols,oh=(availH-gap*(rows-1))/rows;const opts=[];for(let i=0;i<nn;i++)opts.push({x:pad+(i%cols)*(ow+gap),y:oy+Math.floor(i/cols)*(oh+gap),w:ow,h:oh});
    return{W,H,u,land,board,opts,rep:{x:W-pad-u*3.8,y:H-pad-u*.95,w:u*3.8,h:u*.9},pad};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,listen:0,wave:0,first:false,lamp:'',pr:{}});},
  shuffleOpts(R,arr){return R.shuffle(arr);},
  make(p,L){const R=p.R;const lv=LV[L];
    if(lv.songs){const s=p.deck(lv.songs,'dk_'+L);const others=R.shuffle(lv.songs.filter(x=>x!==s)).slice(0,3);const opts=R.shuffle([s,...others]).map(x=>({k:x[0],l:x[0],s:x[1]}));return{type:'song',s,ans:s[0],opts,okIdx:opts.findIndex(o=>o.k===s[0]),text:'',reveal:s[0]+' ('+s[1]+')',review:'가락의 곡은 '+s[0]+' — '+s[1],speak:''};}
    if(L==='composer'){const c=p.deck(COMP,'dk_'+L);const others=R.shuffle(ALLC.filter(x=>x!==c[1])).slice(0,3);const opts=R.shuffle([c[1],...others]).map(x=>({k:x,l:x,s:''}));return{type:'text',q:c[0],ans:c[1],opts,okIdx:opts.findIndex(o=>o.k===c[1]),text:c[0],reveal:c[1],review:c[0]+' → '+c[1],speak:''};}
    const r=R.f();
    if(r<.4){const major=R.f()<.5;const MEL=[[0,2,4,2,0,4,7,4,0],[0,1,2,3,4,3,2,1,0],[4,3,2,0,2,4,4,4],[0,2,4,7,4,2,0],[7,5,4,2,0,2,4,0],[0,4,2,5,4,2,1,0]];const opts=[{k:'장조',l:'장조',s:'밝고 즐거운 느낌'},{k:'단조',l:'단조',s:'어둡고 슬픈 느낌'}];const ans=major?'장조':'단조';
      return{type:'mode',major,base:57+R.int(0,6),mel:R.pick(MEL),inst:R.pick(['piano','xylo','flute','bowed']),ans,opts,okIdx:opts.findIndex(o=>o.k===ans),text:'',reveal:ans,review:'장조는 밝고 단조는 어두운 느낌이에요 → '+ans,speak:''};}
    if(r<.8){const m=R.pick([2,3,4]);const opts=[2,3,4].map(x=>({k:x+'박자',l:x+'박자',s:{2:'강 약',3:'강 약 약',4:'강 약 중강 약'}[x]}));return{type:'metre',m,spb:.36+R.f()*.14,root:R.pick([48,50,53,55]),ans:m+'박자',opts,okIdx:opts.findIndex(o=>o.k===m+'박자'),text:'',reveal:m+'박자',review:'첫 박이 센 박자예요: '+m+'박자',speak:''};}
    const up=R.f()<.5;const opts=[{k:'점점 높아져요',l:'점점 높아져요',s:'↗'},{k:'점점 낮아져요',l:'점점 낮아져요',s:'↘'}];const ans=up?'점점 높아져요':'점점 낮아져요';
    return{type:'reg',up,start:55+R.int(0,7),len:7+R.int(0,3),inst:R.pick(['xylo','piano','bell','flute']),step:R.f()<.5,ans,opts,okIdx:opts.findIndex(o=>o.k===ans),text:'',reveal:ans,review:'소리가 '+ans,speak:''};},
  qtime(){return 16;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return {song:'🎼 이 가락은 어떤 곡일까요?',text:'🎩 이 작곡가는 누구일까요?',mode:'🎹 이 연주의 느낌은?',metre:'🥁 몇 박자일까요?',reg:'🎵 소리의 높낮이는?'}[q.type];},
  askSub(q){return q.type==='text'?q.text:'가락이 나오는 동안 알 것 같으면 바로 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '정답은 '+q.reveal;},goodTip(q){return '정답! '+q.reveal;},
  ptsOf(p,q,frac){const st=p.state;const first=!QS[st.n]&&Engine.players.length>1;if(first){QS[st.n]=1;st.first=true;}return Math.round(50+50*frac)+(first?20:0);},
  hold(p){return false;},
  onNew(p,q){const st=p.state;this._p=p;st.first=false;st.lamp='';const len=this.playQ(p,q);st.wave=len;st.tlen=len;},
  playQ(p,q){if(q.type==='text')return 0;if(!M.lead(p))return this.lenOf(q);if(!CH&&M.ok()){try{CH=MUS.channel();}catch(e){}}if(CH)CH.stop(.12);const o=CH?{ch:CH}:{};const t=M.now()+.3;let tt=0,len=0;
    if(q.type==='song'){const spb=q.s[3]||.46;q.s[2].forEach(([m,b])=>{M.play('piano',m,t+tt*spb,b*spb*.95,.85,o);tt+=b;});len=.3+tt*spb+.2;}
    else if(q.type==='mode'){const sc=q.major?[0,2,4,5,7,9,11,12]:[0,2,3,5,7,8,10,12];const mel=q.mel.map(i=>q.base+sc[Math.min(7,i)]);mel.forEach((m,i)=>M.play(q.inst,m,t+i*.38,.36,.8,o));M.chord('pad',[q.base-12,q.base-12+(q.major?4:3),q.base-12+7],t,mel.length*.38,.7,o);len=.3+mel.length*.38+.3;}
    else if(q.type==='metre'){const spb=q.spb,bars=4;for(let b=0;b<bars*q.m;b++){const strong=b%q.m===0,mid=q.m===4&&b%4===2;M.hit(strong?'kick':'wood',t+b*spb,strong?.8:mid?.5:.35,Object.assign({hi:strong},o));if(strong)M.play('piano',q.root,t+b*spb,spb*q.m*.9,.6,o);else M.chord('piano',[q.root+12,q.root+16,q.root+19],t+b*spb,spb*.5,mid?.45:.3,o);}len=.3+bars*q.m*spb+.2;}
    else{const st=[0,2,4,5,7,9,11,12,14,16,17,19];const sc=[];for(let i=0;i<q.len;i++)sc.push(q.start+st[q.step?i:Math.min(st.length-1,Math.round(i*1.4))]);const seq=q.up?sc:sc.slice().reverse();seq.forEach((m,i)=>M.play(q.inst,m,t+i*.3,.3,.8,o));len=.3+seq.length*.3;}
    return len;},
  lenOf(q){if(q.type==='song'){let tt=0;q.s[2].forEach(([m,b])=>tt+=b);return .3+tt*(q.s[3]||.46)+.2;}if(q.type==='mode')return .3+q.mel.length*.38+.3;if(q.type==='metre')return .3+4*q.m*q.spb+.2;if(q.type==='reg')return .3+q.len*.3;return 0;},
  onVerdict(p,q,ok){const st=p.state;st.wave=0;if(ok&&st.first)st.lamp='🥇 1등!';if(CH&&M.lead(p))CH.stop(.3);},
  upd(p,dt){const st=p.state;this._p=p;if(st.wave>0)st.wave-=dt;M.decay(st,dt);},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;const G=this.geo(p);if(K.inRect(x,y,G.rep)){if(q.type!=='text'&&!st.lock&&st.wave<=0){this.onNew(p,q);}return;}if(st.lock)return;const i=G.opts.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  key(p,e){const nn=Number(e.key);const st=p.state;if(st.q&&!st.lock&&nn>=1&&nn<=st.q.opts.length)this.verdict(p,nn-1,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.opts[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;stageBg(g,W,H,u,t);if(!q)return;const b=G.board;
    K.card(g,b.x,b.y,b.w,b.h,u*.4,'rgba(18,3,46,.78)',{stroke:YEL,lw:4,blur:0,dy:0});bulbs(g,b.x+u*.3,b.y,b.w-u*.6,b.h,t,u);
    K.txt(g,{song:'🎼 이 가락은 어떤 곡?',text:'🎩 이 작곡가는 누구?',mode:'🎹 밝을까, 어두울까?',metre:'🥁 몇 박자?',reg:'🎵 높아질까, 낮아질까?'}[q.type],b.x+b.w/2,b.y+(G.land?u*.75:u*1.6),{size:Math.min(u*.8,b.w*.05),color:YEL,maxW:b.w*.9});
    if(q.type==='text')QK.txt(g,q.text,b.x+b.w/2,b.y+b.h*.58,b.w*.86,b.h*.5,Math.min(u*1.2,b.h*.2),'#fff6d6',1.3);
    else{const bw=Math.min(b.w*.012,u*.12);const nb=28,ww=b.w*.7;const on=st.wave>0;for(let i=0;i<nb;i++){const h=on?(Math.abs(Math.sin(t*6+i*.7))*.6+.12)*b.h*.45:b.h*.04;g.fillStyle=['#ff3d7f','#ffe14d','#5ee7ff'][i%3];K.rr(g,b.x+(b.w-ww)/2+i*ww/nb,b.y+b.h*.62-h/2,ww/nb*.6,h,3);g.fill();}
      K.txt(g,on?'🎧 연주 중… 알 것 같으면 바로 눌러요!':st.lock?'정답: '+q.reveal:'다시 듣고 싶으면 아래 버튼',b.x+b.w/2,b.y+b.h*.9,{size:Math.min(u*.55,b.w*.035),color:'#fff6d6',maxW:b.w*.9});}
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:YEL});}
    G.opts.forEach((r,i)=>{const o=q.opts[i];if(!o){g.save();g.globalAlpha=.2;K.card(g,r.x,r.y,r.w,r.h,u*.3,'#1a0538',{stroke:'#555',lw:2,blur:0,dy:0});g.restore();return;}let s='idle';if(st.lock){if(i===q.okIdx)s='ok';else if(i===st.pick)s='bad';else s='dim';}
      g.save();g.globalAlpha=s==='dim'?.45:1;K.card(g,r.x,r.y,r.w,r.h,u*.3,s==='ok'?'#1f8a4c':s==='bad'?'#9c1f3d':OCOL[i],{stroke:s==='ok'?'#9bf59b':s==='bad'?'#ff9ab4':'#12032e',lw:4,blur:u*.2,dy:u*.1});
      g.fillStyle='rgba(255,255,255,.25)';K.rr(g,r.x+u*.15,r.y+u*.1,r.w-u*.3,r.h*.2,u*.15);g.fill();
      K.txt(g,String.fromCharCode(65+i),r.x+u*.55,r.y+r.h*.5,{size:Math.min(r.h*.5,u*1.2),color:'rgba(255,255,255,.55)'});
      if(o.s){QK.txt(g,o.l,r.x+r.w*.58,r.y+r.h*.4,r.w*.72,r.h*.4,Math.min(u*1,r.h*.3),'#fff',1.1);K.txt(g,o.s,r.x+r.w*.58,r.y+r.h*.78,{size:Math.min(r.h*.2,u*.55),color:'rgba(255,255,255,.85)',maxW:r.w*.72});}else QK.txt(g,o.l,r.x+r.w*.58,r.y+r.h/2,r.w*.72,r.h*.7,Math.min(u*1.1,r.h*.35),'#fff',1.1);
      g.restore();});
    if(st.lamp)K.txt(g,st.lamp,W/2,G.opts[0].y-u*.1,{size:u*.9,color:YEL,stroke:'#12032e',lw:u*.18,maxW:W*.6});
    if(q.type!=='text'){const rp=G.rep,can=!st.lock&&st.wave<=0;K.rr(g,rp.x,rp.y,rp.w,rp.h,rp.h/2);g.fillStyle=can?'#4a1a8c':'rgba(255,255,255,.08)';g.fill();g.lineWidth=2;g.strokeStyle=can?PINK:'#5a4a80';g.stroke();K.txt(g,'🔁 다시 듣기',rp.x+rp.w/2,rp.y+rp.h/2,{size:u*.46,color:can?'#fff':'#8a7aa8',maxW:rp.w*.9});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.8,u*.8,u*.3,'rgba(74,26,140,.92)',{stroke:YEL,lw:2,blur:0,dy:0});K.txt(g,'🎙️ '+(st.okN||0)+'문제 정답',u*.3+u*1.9,(p.top||0)+u*.9,{size:u*.42,color:YEL,maxW:u*3.4});
  },
};
M.mix(GAME,{say:false,pts0:50,pts1:50,okMs:2100,badMs:2800});
Engine.boot(GAME);
