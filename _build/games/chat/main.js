/* 4~5학년 사회 · 다름을 존중해요 · 똑똑한 디지털 시민 · 모두의 인권 — 친구 톡방
   디자인: 말랑한 보라·민트 메신저. 친구 메시지에 가장 알맞은 답장을 골라 보내요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2d1b69';
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M8 10h32a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H22l-9 7v-7H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="#a78bfa" stroke="#2d1b69" stroke-width="3.2" stroke-linejoin="round"/><circle cx="15" cy="23" r="2.6" fill="#fff"/><circle cx="24" cy="23" r="2.6" fill="#fff"/><circle cx="33" cy="23" r="2.6" fill="#fff"/></svg>';
const DECKS=/*@@DECKS@@*/;
const Q=/*@@Q@@*/;
const FR=[['🐰','하늘'],['🐻','바다'],['🦊','별이'],['🐼','도윤'],['🐱','서아'],['🐶','지호'],['🐧','하린'],['🐯','준서']];
const MC=(()=>{const c=document.createElement('canvas');return c.getContext('2d');})();
function wrapLines(text,fs,maxW){MC.font=K.font(fs);const out=[];let cur='';for(const ch of String(text)){const t=cur+ch;if(MC.measureText(t).width>maxW&&cur){out.push(cur);cur=ch.trim()?ch:'';}else cur=t;}if(cur)out.push(cur);return out;}
/* 말풍선: 높이를 돌려줘요. draw=false 면 크기만 재요 */
function bubble(g,x,y,maxW,text,fs,kind,draw,col){const pad=fs*.7;const lines=wrapLines(text,fs,maxW-pad*2);MC.font=K.font(fs);const w=Math.min(maxW,Math.max(...lines.map(l=>MC.measureText(l).width))+pad*2);const h=lines.length*fs*1.28+pad*1.2;
  if(draw){const bx=kind==='out'?x-w:x;const bg=kind==='out'?'#a78bfa':kind==='good'?'#d1fae5':kind==='bad'?'#ffe4e6':'#fff';K.card(g,bx,y,w,h,fs*.7,bg,{stroke:kind==='out'?'#6d28d9':'#d4cff0',lw:2,blur:0,dy:2,sc:'rgba(45,27,105,.25)'});
    g.save();g.fillStyle=bg;g.strokeStyle=kind==='out'?'#6d28d9':'#d4cff0';g.lineWidth=2;g.beginPath();const tx=kind==='out'?bx+w:bx;g.moveTo(tx,y+fs*.5);g.lineTo(tx+(kind==='out'?fs*.5:-fs*.5),y+fs*.9);g.lineTo(tx,y+fs*1.3);g.fill();g.restore();
    g.fillStyle=kind==='out'?'#fff':INK;g.font=K.font(fs);g.textAlign='left';g.textBaseline='middle';lines.forEach((l,i)=>g.fillText(l,bx+pad,y+pad*.6+fs*.64+i*fs*1.28));}
  return{w,h};}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W=0,H=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);};
  const MSG=[['하늘','새로 온 친구가 혼자 있어'],['나','같이 놀자고 하자!'],['바다','역시 너야 👍']];
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    const wide=W>H*1.25;const u=wide?H/8:Math.min(W,H)/7.5;K.vgrad(g,0,0,W,H,['#c4b5fd','#e9e3ff','#d1fae5']);
    for(let i=0;i<10;i++){const x=(i*173)%W,y=(H-((T*u*.5+i*97)%H));g.fillStyle=`rgba(255,255,255,${.3+.3*(i%3)/3})`;g.beginPath();g.arc(x,y,u*(.15+(i%4)*.1),0,TAU);g.fill();}
    const pw=Math.min(W*.8,u*7.5),ph=H*.72,px=W/2-pw/2,py=H*.24;K.card(g,px,py,pw,ph,u*.5,'#f7f4ff',{stroke:INK,lw:4,blur:u*.4,dy:u*.2,sc:'rgba(45,27,105,.35)'});K.rr(g,px,py,pw,u*.9,u*.5);g.fillStyle='#7c3aed';g.fill();K.txt(g,'우리 반 톡방 🏫',W/2,py+u*.45,{size:u*.45,color:'#fff',maxW:pw*.8});
    const n=Math.min(3,Math.floor((T%7)/1.5)+1);let y=py+u*1.2;for(let i=0;i<n;i++){const m=MSG[i],out=i===1;const fs=u*.4;const b=bubble(g,out?px+pw-u*.5:px+u*1.2,y,pw*.6,m[1],fs,i===2?'good':out?'out':'in',true);if(!out)K.emo(g,['🐰','🐻'][i?1:0],px+u*.6,y+u*.35,u*.7);y+=b.h+u*.3;}
    if(n<3&&Math.sin(T*6)>0){K.txt(g,'• • •',px+u*1.8,y+u*.2,{size:u*.5,color:'#7c3aed'});}};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'chat',title:'친구 톡방',title1:'우리 반 단톡방',title2:'친구 톡방',emoji:LOGO,
  subtitle:'4~5학년 사회 · 다름 존중 · 디지털 시민 · 인권',
  howto:'우리 반 톡방에 친구 메시지가 와요. 아래 답장 중 <b>가장 알맞은 답장</b>을 눌러 보내요. 좋은 답장을 보내면 친구가 고마워하고, 왜 좋은 답인지 설명이 나타나요.',
  how:p=>({diversity:'<b>문화 다양성</b>과 편견·차별을 생각해요',digital:'<b>개인 정보</b>, 저작권, 사이버 예절',rights:'<b>어린이·장애인·노동자의 인권</b>'}[p.levelId]),
  theme:{c1:'#7c3aed',c2:'#10b981'},hero:heroScene,vignette:.04,durs:[90,150,240],levelTitle:'어떤 이야기를 나눌까요?',
  txt:{who:'누가 톡을 보낼까요?',dur:'채팅 시간',pace:'한 문제 시간',seat:'번 친구 ',go:'톡방 입장!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'4~5학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>다름을 존중</b>해요. 문화·종교·성별·피부색이 달라도 서로 존중하고, 겉모습으로 놀리는 것은 <b>차별</b>이에요.</li>
    <li><b>디지털 시민</b>은 개인 정보와 비밀번호를 지키고, 남의 사진과 작품은 <b>허락과 저작권</b>을 지켜요. 온라인에서도 말 예절을 지키고 사실인지 확인해요.</li>
    <li><b>인권</b>은 누구나 사람답게 살 권리예요. 어린이도 의견을 말하고 놀 권리가 있고, 장애인·노동자의 권리도 함께 지켜요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const land=W>=H*1.2;const pw=land?Math.min(W*.5,u*17):W;const px=(W-pw)/2;const Z0=(p.top||0)+u*.5;const q=p.state.q;const n=q?q.ch.length:3;const pad=Math.max(8,u*.3),gap=Math.max(6,u*.2);
    const rh=Math.min(u*2.5,(H-Z0)*.12);const rep=[];const ry=H-pad-n*rh-(n-1)*gap;for(let i=0;i<n;i++)rep.push({x:px+pad,y:ry+i*(rh+gap),w:pw-pad*2,h:rh});
    const head={x:px,y:Z0,w:pw,h:u*1.3};const log={x:px+pad,y:Z0+u*1.4,w:pw-pad*2,h:ry-gap-(Z0+u*1.4)};
    return{W,H,u,Z0,land,pw,px,pad,gap,rep,head,log};},
  init(p){Object.assign(p.state,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,items:[],ready:false,timers:[],f:FR[0]});p.ask('💬 친구에게 알맞은 답장을 보내요!','가장 알맞은 답장을 눌러요');p.state.items=[{k:'note',t:'📢 선생님: 친구에게 다정하고 올바르게 답장해 보아요!',a:0}];this.newQ(p);},
  make(p,L){const R=p.R,it=p.deck(Q[L],'dk_'+L);const f=FR[Math.floor(R.f()*FR.length)];const ch=R.shuffle([it[1],...it[2]]);return{it,f,text:it[0],ans:it[1],ch,okIdx:ch.indexOf(it[1]),reveal:it[1],note:it[3],review:it[0]+' → '+it[1],speak:it[0]};},
  qtime(){return 16;},askHtml(){return '💬 친구에게 알맞은 답장을 보내요!';},askSub(){return '가장 알맞은 답장을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '더 좋은 답장: '+q.ans;},hold(p){return !p.state.ready;},
  later(p,fn,ms){const st=p.state;st.timers.push(setTimeout(()=>{if(!p.finished)fn();},ms));},
  push(st,o){o.a=0;st.items.push(o);while(st.items.length>10)st.items.shift();},
  onNew(p,q){const st=p.state;st.ready=false;st.f=q.f;const typ={k:'typing',f:q.f};this.push(st,typ);this.later(p,()=>{const i=st.items.indexOf(typ);if(i>=0)st.items.splice(i,1);this.push(st,{k:'in',f:q.f,t:q.text});st.ready=true;p.Snd.tap&&p.Snd.tap();},650);},
  onVerdict(p,q,ok,i,to){const st=p.state;st.ready=false;if(i>=0)this.push(st,{k:'out',t:q.ch[i]});
    if(to){this.push(st,{k:'note',t:'⏰ 답장이 늦었어요! 좋은 답장: “'+q.ans+'”',bad:1});return;}
    if(ok)this.later(p,()=>{this.push(st,{k:'in',f:q.f,t:['고마워! 😊','역시 너야 👍','그렇게 할게! 💛','맞아, 좋은 생각이야 ✨'][Math.floor(p.R.f()*4)],c:'good'});this.push(st,{k:'note',t:'💡 '+q.note});},450);
    else this.later(p,()=>{this.push(st,{k:'in',f:q.f,t:'음… 그건 좀 아닌 것 같아 😢',c:'bad'});this.push(st,{k:'note',t:'💡 더 좋은 답장: “'+q.ans+'”  '+q.note,bad:1});},450);},
  upd(p,dt){p.state.items.forEach(it=>it.a=Math.min(1,it.a+dt*5));},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock||!st.ready)return;const G=this.geo(p);const i=G.rep.findIndex(r=>K.inRect(x,y,r));if(i>=0){p.Snd.tap&&p.Snd.tap();this.verdict(p,i,false);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||!st.ready)return null;const r=this.geo(p).rep[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;K.vgrad(g,0,0,W,H,G.land?['#c4b5fd','#e9e3ff','#d1fae5']:['#f7f4ff','#f7f4ff']);
    if(G.land){for(let i=0;i<12;i++){const x=(i*173)%W,y=(H-((t*u*.4+i*97)%H));g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.arc(x,y,u*(.15+(i%4)*.12),0,TAU);g.fill();}K.card(g,G.px,G.Z0-u*.1,G.pw,H-G.Z0,u*.5,'#f7f4ff',{stroke:INK,lw:4,blur:u*.4,dy:u*.2,sc:'rgba(45,27,105,.35)'});}
    const hd=G.head;K.rr(g,hd.x,hd.y,hd.w,hd.h,G.land?u*.5:0);g.fillStyle='#7c3aed';g.fill();K.txt(g,'‹',hd.x+u*.6,hd.y+hd.h/2,{size:u*.9,color:'#fff'});K.txt(g,'우리 반 톡방 🏫',hd.x+hd.w/2,hd.y+hd.h/2,{size:u*.6,color:'#fff',maxW:hd.w*.6});K.txt(g,'24',hd.x+hd.w-u*.8,hd.y+hd.h/2,{size:u*.45,color:'#ddd6fe'});
    if(!st.lock&&st.ready&&st.qmax>0){QZ.bar(g,hd.x+G.pad,hd.y+hd.h+u*.04,hd.w-G.pad*2,Math.max(5,u*.16),st.qt/st.qmax,{good:'#7c3aed'});}
    /* 대화 기록: 아래부터 쌓아요 */
    const L=G.log,fs=Math.min(u*.7,H*.03);let y=L.y+L.h;g.save();g.beginPath();g.rect(L.x-G.pad,L.y+u*.2,L.w+G.pad*2,L.h-u*.2);g.clip();
    for(let i=st.items.length-1;i>=0&&y>L.y;i--){const it=st.items[i];const mw=L.w*(it.k==='note'?1:.74);
      if(it.k==='typing'){const h=fs*2.2;y-=h+fs*.4;K.emo(g,it.f[0],L.x+fs,y+h/2,fs*1.6);g.save();g.globalAlpha=it.a;K.card(g,L.x+fs*2.2,y,fs*3.4,h,h/2,'#fff',{stroke:'#d4cff0',lw:2,blur:0,dy:2,sc:'rgba(45,27,105,.2)'});for(let k=0;k<3;k++){g.fillStyle='#7c3aed';g.globalAlpha=it.a*(.4+.6*Math.max(0,Math.sin(t*6-k)));g.beginPath();g.arc(L.x+fs*3+k*fs*.9,y+h/2,fs*.2,0,TAU);g.fill();}g.restore();continue;}
      if(it.k==='note'){const b=bubble(g,0,0,mw,it.t,fs*.86,'in',false);y-=b.h+fs*.5;g.save();g.globalAlpha=it.a;K.card(g,L.x+(L.w-b.w)/2,y,b.w,b.h,fs*.5,it.bad?'#ffe4e6':'#ecfdf5',{stroke:it.bad?'#fda4af':'#6ee7b7',lw:2,blur:0,dy:0});g.fillStyle=INK;g.font=K.font(fs*.86);g.textAlign='left';g.textBaseline='middle';wrapLines(it.t,fs*.86,mw-fs*1.4).forEach((l,k)=>g.fillText(l,L.x+(L.w-b.w)/2+fs*.7,y+fs*.7+fs*.55+k*fs*1.1));g.restore();continue;}
      const b=bubble(g,0,0,mw,it.t,fs,it.k,false);y-=b.h+fs*.5;g.save();g.globalAlpha=it.a;g.translate(0,(1-it.a)*fs);
      if(it.k==='in'){K.emo(g,it.f[0],L.x+fs,y+fs*.9,fs*1.7);K.txt(g,it.f[1],L.x+fs*2.2,y-fs*.1,{size:fs*.65,color:'#6b5b9a',align:'left'});bubble(g,L.x+fs*2.2,y+fs*.2,mw,it.t,fs,it.c||'in',true);}
      else bubble(g,L.x+L.w,y,mw,it.t,fs,'out',true);g.restore();}
    g.restore();
    /* 답장 단추 */
    G.rep.forEach((r,i)=>{if(!st.ready&&!st.lock){g.save();g.globalAlpha=.35;}const isAns=i===q.okIdx,picked=st.pick===i;let c='#fff',bd='#a78bfa';if(st.lock){if(isAns){c='#d1fae5';bd='#10b981';}else if(picked){c='#ffe4e6';bd='#f43f5e';}}
      K.card(g,r.x,r.y,r.w,r.h,r.h*.35,c,{stroke:bd,lw:3,blur:0,dy:3,sc:'rgba(45,27,105,.25)'});g.save();if(st.lock&&!isAns&&!picked)g.globalAlpha=.5;QK.txt(g,q.ch[i],r.x+r.w/2,r.y+r.h/2,r.w-u*.8,r.h*.8,Math.min(u*.8,r.h*.36),INK,1.15);g.restore();if(!st.ready&&!st.lock)g.restore();});
    K.card(g,G.px+G.pad,hd.y+hd.h+u*.3,u*3.6,u*.7,u*.35,'rgba(255,255,255,.9)',{stroke:'#d4cff0',lw:2,blur:0,dy:0});K.txt(g,'💌 좋은 답장 '+(st.okN||0),G.px+G.pad+u*1.8,hd.y+hd.h+u*.65,{size:u*.42,color:INK,maxW:u*3.3});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:2600,badMs:3600});
Engine.boot(GAME);
