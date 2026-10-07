/* 4~6학년 사회 · 공공 기관 · 촌락과 도시 · 헌법 · 경제 · 삼권 분립 — 결재 서류 휙휙
   디자인: 관공서 나무 책상. 서류를 읽고 알맞은 결재함으로 휙 밀고, 고무 도장을 쾅! 찍어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#3b2a1c',GREEN='#2f6f4f',RED='#c0392b';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><rect x="9" y="6" width="28" height="36" rx="2" fill="#fffaf0" stroke="#3b2a1c" stroke-width="3"/><path d="M15 16h16M15 22h16M15 28h10" stroke="#3b2a1c" stroke-width="2.5" stroke-linecap="round"/><circle cx="33" cy="33" r="8" fill="none" stroke="#c0392b" stroke-width="3"/><path d="M29 33l3 3 5-6" fill="none" stroke="#c0392b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const SETS=/*@@SETS@@*/;
function desk(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#a9743f','#8a5a33','#6f4524']);g.save();g.strokeStyle='rgba(60,30,10,.12)';g.lineWidth=2;for(let y=u*.7;y<H;y+=u*.9){g.beginPath();for(let x=0;x<=W;x+=24){const yy=y+Math.sin(x/90+y)*3;x?g.lineTo(x,yy):g.moveTo(x,yy);}g.stroke();}g.restore();}
function paper(g,x,y,w,h,u,o){o=o||{};g.save();g.translate(x+w/2,y+h/2);if(o.rot)g.rotate(o.rot);g.translate(-w/2,-h/2);
  K.card(g,0,0,w,h,u*.1,'#fffdf5',{stroke:'#8b7a55',lw:Math.max(2,u*.04),blur:o.shadow===false?0:u*.25,dy:u*.12});
  g.strokeStyle='rgba(90,120,170,.18)';g.lineWidth=1;for(let yy=h*.34;yy<h*.84;yy+=u*.5){g.beginPath();g.moveTo(w*.06,yy);g.lineTo(w*.94,yy);g.stroke();}
  g.restore();}
function stampMark(g,cx,cy,r,txt,col,rot,alpha){g.save();g.translate(cx,cy);g.rotate(rot);g.globalAlpha=alpha;g.strokeStyle=col;g.lineWidth=Math.max(3,r*.14);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();g.lineWidth=Math.max(1.5,r*.05);g.beginPath();g.arc(0,0,r*.82,0,TAU);g.stroke();
  K.txt(g,txt,0,r*.04,{size:r*.62,color:col,maxW:r*1.45});g.restore();}
function tray(g,x,y,w,h,u,gr,count,lean,state){const col=gr[2];g.save();
  if(lean){K.glow(g,x+w/2,y+h/2,Math.max(w,h)*.8,col,.45);}
  /* 서류가 쌓여 있어요 */
  for(let i=0;i<Math.min(6,count);i++){g.save();g.translate(x+w/2,y+h*.38-i*u*.07);g.rotate(((i*37)%7-3)*.02);K.card(g,-w*.4,-h*.12,w*.8,h*.3,u*.05,'#fffdf5',{stroke:'#8b7a55',lw:1.5,blur:0,dy:0});g.restore();}
  K.rr(g,x,y+h*.3,w,h*.7,u*.18);g.fillStyle=col;g.fill();g.lineWidth=Math.max(3,u*.09);g.strokeStyle=state==='ok'?'#16a34a':state==='bad'?'#dc2626':INK;g.stroke();
  g.fillStyle='rgba(255,255,255,.2)';K.rr(g,x+w*.06,y+h*.34,w*.88,h*.1,u*.06);g.fill();
  K.card(g,x+w*.1,y+h*.5,w*.8,h*.42,u*.1,'#fffaf0',{stroke:INK,lw:2,blur:0,dy:0});
  K.emo(g,gr[0],x+w*.5,y+h*.58,Math.min(h*.22,w*.26));K.txt(g,gr[1],x+w/2,y+h*.83,{size:Math.min(h*.15,u*.62),color:INK,maxW:w*.74});
  K.card(g,x+w-u*.95,y+h*.22,u*.9,u*.6,u*.3,'#fff',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,String(count),x+w-u*.5,y+h*.22+u*.3+u*.02,{size:u*.4,color:INK,maxW:u*.7});
  g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;desk(g,W0,H0,u,T);const ph=(T%2.4)/2.4;const dw=Math.min(W0*.34,u*3.4),dh=dw*1.25;
    const cx=W0/2+(ph<.5?0:(ph-.5)*2*(W0*.32)*(Math.sin(T)>0?1:-1)),cy=H0*.5+(ph<.5?0:-(ph-.5)*u*.4);paper(g,cx-dw/2,cy-dh/2,dw,dh,u*.8,{rot:ph>.5?(ph-.5)*.9:0});
    K.txt(g,'제 001호',cx-dw*.2,cy-dh*.36,{size:u*.28,color:INK});K.txt(g,'서류',cx,cy-dh*.05,{size:u*.5,color:INK,maxW:dw*.8});
    if(ph>.35&&ph<.8)stampMark(g,cx+dw*.18,cy+dh*.22,dw*.22*Math.min(1,.7+(ph-.35)*3),'승인',RED,-.3,Math.min(1,(ph-.35)*6));
    tray(g,W0*.04,H0*.46,Math.min(W0*.22,u*2.6),Math.min(H0*.36,u*2.4),u*.8,['🏢','기관','#2E9C6A'],3,ph>.5&&Math.sin(T)>0,'');tray(g,W0*.96-Math.min(W0*.22,u*2.6),H0*.46,Math.min(W0*.22,u*2.6),Math.min(H0*.36,u*2.4),u*.8,['⚖️','법원','#8E5BD0'],2,ph>.5&&Math.sin(T)<=0,'');};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'petition',title:'결재 서류 휙휙',title1:'관공서 결재 대작전',title2:'결재 서류 휙휙',emoji:LOGO,
  subtitle:'4~6학년 사회 · 우리 사회의 모습',
  howto:'책상에 서류가 올라와요. 서류를 읽고 알맞은 <b>결재함 쪽으로 휙 밀어요</b>. 결재함을 눌러도 돼요. 맞으면 <b>승인</b> 도장이, 틀리면 <b>반려</b> 도장이 쾅!',
  how:p=>({office:'<b>공공 기관</b>(경찰서·소방서·행정복지센터)에 서류 보내기',village:'<b>농촌·어촌·산지촌</b> 소식 나누기',city:'<b>도시</b>와 <b>촌락</b> 소식 나누기',rights:'<b>기본권</b>과 <b>국민의 의무</b> 나누기',economy:'<b>가계</b>와 <b>기업</b>의 활동 나누기',power:'<b>국회·정부·법원</b>이 하는 일 나누기'}[p.levelId]),
  theme:{c1:'#2f6f4f',c2:'#c0392b'},hero:heroScene,vignette:.06,durs:[90,150,240],levelTitle:'어느 부서의 서류를 처리할까요?',
  txt:{who:'누가 담당자일까요?',dur:'근무 시간',pace:'한 장 처리 시간',seat:'번 담당자 ',go:'업무 시작!',s1:'1. 부서',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:d.tag,t:d.ic+' '+d.label,d:d.desc})),
  summary:`<ul><li><b>공공 기관</b>: 경찰서(안전·범죄 예방), 소방서(불·구조·구급), 행정복지센터(주민 등록·복지)가 우리 생활을 도와줘요.</li>
    <li><b>촌락</b>은 농촌·어촌·산지촌으로 나뉘고, <b>도시</b>는 사람과 건물이 많고 교통이 복잡해요.</li>
    <li>헌법의 <b>기본권</b>(평등·자유·참정·사회권·청구권)과 <b>국민의 의무</b>(국방·납세·교육·근로·환경 보전)를 구분해요.</li>
    <li><b>가계</b>는 소비 활동, <b>기업</b>은 생산 활동의 주인공이에요. 나랏일은 <b>국회(법 만들기)·정부(법 집행)·법원(재판)</b>이 나누어 맡아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const st=p.state;const q=st.q;const n=q?q.G.length:2;const three=n===3;const top=(p.top||0)+u*.5;const y0=top+u*.3,y1=H-u*.4;const A=y1-y0;
    const port=H>W*1.1;const tw=port?Math.min(W*.4,u*5.2):Math.min(W*.27,u*5.5),th=port?Math.min(A*.26,tw*.95):Math.min(A*(three?.34:.52),u*5);const rects=[];
    const dw=port?Math.min(W*.74,u*10):Math.min(W*.34,u*8),dh=port?Math.min(A*.46,dw*1.05):Math.min(A*(three?.52:.62),dw*1.1);
    const tt=Math.min(W*.4,u*7);
    if(three){const ty=port?y0+A*.2:y0+A*.3;rects.push({x:u*.3,y:ty,w:tw,h:th},{x:W/2-tt/2,y:y0-u*.2,w:tt,h:Math.min(A*(port?.18:.28),u*3)},{x:W-u*.3-tw,y:ty,w:tw,h:th});}
    else{const ty=port?y0+A*.08:y0+A*.25;rects.push({x:u*.3,y:ty,w:tw,h:th},{x:W-u*.3-tw,y:ty,w:tw,h:th});}
    const cy=port?y0+A*(three?.7:.68):three?y0+A*.6:y0+A*.52;return{W,H,u,y0,y1,A,three,n,rects,dw,dh,cx:W/2,cy};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,dx:0,dy:0,dr:null,lean:-1,cnt:[0,0,0],no:0,flyTo:-1});this.newQ(p);},
  make(p,L){const S=SETS[L];const it=p.deck(S.items,'dk_'+L);const G=S.g;return{G,kind:S.kind,ans:it[0],text:it[1],okIdx:it[0],reveal:G[it[0]][0]+' '+G[it[0]][1],review:it[1]+' → '+G[it[0]][1],speak:it[1]};},
  qtime(){return 9;},askHtml(q){return '📄 새 '+q.kind+'이(가) 도착했어요';},askSub(q){return q.G.length===3?'← ↑ → 밀어서 보내요':'← → 밀어서 보내요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return '이 서류는 '+q.reveal;},goodTip(q){return '승인! '+q.G[q.ans][1];},
  onNew(p,q){const st=p.state;st.no++;st.dx=st.dy=0;st.dr=null;st.lean=-1;st.flyTo=-1;if(st.cnt.length<q.G.length)st.cnt=[0,0,0];},
  onVerdict(p,q,ok,i){const st=p.state;if(ok){st.cnt[q.ans]++;st.flyTo=q.ans;}},
  dirOf(p,dx,dy){const G=this.geo(p);const w=G.W*.5;if(G.three&&dy<-G.A*.12&&Math.abs(dy)>Math.abs(dx)*.8)return 1;if(dx<-w*.22)return 0;if(dx>w*.22)return G.three?2:1;return -1;},
  docRect(p){const G=this.geo(p),st=p.state;return{x:G.cx-G.dw/2+st.dx,y:G.cy-G.dh/2+st.dy,w:G.dw,h:G.dh};},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const gi=G.rects.findIndex(r=>K.inRect(x,y,r));if(gi>=0){this.verdict(p,gi,false);return;}
    const r=this.docRect(p);if(K.inRect(x,y,r))st.dr={x,y};},
  move(p,x,y,down){const st=p.state;if(!st.dr||st.lock)return;st.dx=x-st.dr.x;st.dy=Math.min(y-st.dr.y,40);st.lean=this.dirOf(p,st.dx,st.dy);},
  up(p,x,y){const st=p.state;if(!st.dr)return;const dx=x-st.dr.x,dy=y-st.dr.y;st.dr=null;st.lean=-1;if(st.lock)return;const d=this.dirOf(p,dx,dy);if(d>=0)this.verdict(p,d,false);else{st.dx=0;st.dy=0;}},
  upd(p,dt){const st=p.state;if(!st.dr&&!st.lock){st.dx*=Math.pow(.001,dt);st.dy*=Math.pow(.001,dt);}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.rects[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;desk(g,W,H,u,t);
    /* 시간 막대 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.5,u*10);QZ.bar(g,W/2-bw/2,(p.top||0)+u*.14,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:'#2f6f4f'});}
    G.rects.forEach((r,i)=>{let s='';if(st.lock){if(i===q.okIdx)s='ok';else if(i===st.pick)s='bad';}tray(g,r.x,r.y,r.w,r.h,u,q.G[i],st.cnt[i]||0,st.lean===i,s);});
    /* 서류 */
    let rect=this.docRect(p),alpha=1,rot=clamp(st.dx/G.W*.6,-.35,.35);
    if(st.lock&&st.res==='ok'&&st.flyTo>=0){const tr=G.rects[st.flyTo],k=Math.min(1,Math.max(0,(st.rT-.18)/.35));const e=k*k;rect={x:rect.x+(tr.x+tr.w/2-rect.w/2-rect.x)*e,y:rect.y+(tr.y+tr.h*.4-rect.h/2-rect.y)*e,w:rect.w*(1-.45*e),h:rect.h*(1-.45*e)};rot+=e*(st.flyTo===0?-.4:st.flyTo===2||(!G.three&&st.flyTo===1)?.4:0);alpha=1-Math.max(0,(k-.7)/.3);}
    else if(st.lock&&st.res==='bad'){rect.x+=Math.sin(st.rT*30)*u*.1*Math.max(0,1-st.rT*2);}
    if(alpha>0){g.save();g.globalAlpha=alpha;paper(g,rect.x,rect.y,rect.w,rect.h,u,{rot});g.save();g.translate(rect.x+rect.w/2,rect.y+rect.h/2);g.rotate(rot);g.translate(-rect.w/2,-rect.h/2);
      const hw=rect.w;K.rr(g,0,0,hw,rect.h*.17,u*.1);g.fillStyle='#e8dcc0';g.fill();K.txt(g,q.kind,hw*.3,rect.h*.085,{size:Math.min(rect.h*.1,u*.5),color:INK,maxW:hw*.45});K.txt(g,'제 '+String(st.no).padStart(3,'0')+'호',hw*.78,rect.h*.085,{size:Math.min(rect.h*.085,u*.42),color:'#7a6246',maxW:hw*.35});
      QK.txt(g,q.text,hw/2,rect.h*.5,hw*.86,rect.h*.4,Math.min(u*.95,rect.h*.17),INK,1.3);
      const sg=['담당','과장','결재'];sg.forEach((s,i)=>{const bx=hw*.08+i*hw*.29,by=rect.h*.8,bw=hw*.26,bh=rect.h*.14;g.strokeStyle='#8b7a55';g.lineWidth=1.5;g.strokeRect(bx,by,bw,bh);K.txt(g,s,bx+bw/2,by+bh*.25,{size:Math.min(bh*.28,u*.3),color:'#7a6246',maxW:bw*.9});});
      g.restore();
      if(st.lock){const k=Math.min(1,st.rT/.18);const ok=st.res==='ok';stampMark(g,rect.x+rect.w*.68,rect.y+rect.h*.78,Math.min(rect.w*.2,u*1.5)*(1+(1-k)*1.2),ok?'승인':'반려',ok?'#16a34a':RED,ok?-.25:.25,Math.min(1,k*1.5));}
      g.restore();}
    if(!st.lock&&!st.dr&&st.n<3){K.txt(g,G.three?'← ↑ → 밀어서 보내요':'←  → 밀어서 보내요',W/2,G.cy+G.dh/2+u*.7,{size:u*.5,color:'#fff',stroke:'#3b2412',lw:u*.12,maxW:W*.8});}
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.12,'#fffaf0',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'📂 처리 '+(st.okN||0)+'건',u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.46,color:INK,maxW:u*3.2});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:900,badMs:1900});
Engine.boot(GAME);
