/* 6학년 2학기 수학 · 원주와 원의 넓이 — 동글동글 피자 가게
   디자인: 빨강·하양 체크 식탁보 위의 피자 가게. 주문서를 읽고 치즈 길이(원주)와 소스 넓이(원의 넓이)를 계산하면 피자가 한 단계씩 완성돼요. 틀리면 그 부분이 타 버려요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#5a1a12',RED='#dc2626',GOLD='#ca8a04';
const LOGO=gkLogo('#fef3c7','#7f1d1d','🍕');
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const fx=x=>String(+x.toFixed(4));
const LV={
  a:{t:'원주 (치즈 크러스트)',d:'지름 · 반지름으로 원주 구하기'},
  b:{t:'원의 넓이 (소스 바르기)',d:'반지름 × 반지름 × 원주율'},
  c:{t:'특별 피자',d:'반반 · 조각 · 상자 빈 곳 · 도넛'},
};
function pizzaArt(g,cx,cy,R,T){g.fillStyle='#fde68a';g.strokeStyle='#d97706';g.lineWidth=Math.max(3,R*.04);g.beginPath();g.arc(cx,cy,R,0,TAU);g.fill();g.stroke();g.fillStyle='#dc2626';g.beginPath();g.arc(cx,cy,R*.88,0,TAU);g.fill();g.fillStyle='#fef3c7';g.globalAlpha=.75;g.beginPath();g.arc(cx,cy,R*.8,0,TAU);g.fill();g.globalAlpha=1;[[-.35,-.3],[.3,-.4],[.4,.2],[-.2,.4],[0,0],[-.5,.1]].forEach(([x,y])=>{g.fillStyle='#b91c1c';g.beginPath();g.arc(cx+x*R,cy+y*R,R*.1,0,TAU);g.fill();});}
function hero(g,W,H,T,u){g.fillStyle='#fff';g.fillRect(0,0,W,H);const s=u*1.6;for(let y=0;y<H/s;y++)for(let x=0;x<W/s;x++){if((x+y)%2){g.fillStyle='#fecaca';g.fillRect(x*s,y*s,s,s);}}
  const R=Math.min(W*.2,H*.32);K.card(g,W*.1,H*.12,W*.8,H*.76,u*.4,'rgba(255,250,240,.96)',{stroke:'#7f1d1d',lw:5,blur:u*.4,dy:u*.1});pizzaArt(g,W/2,H*.5,R,T);
  g.save();g.translate(W/2,H*.5);g.strokeStyle='#1d4ed8';g.lineWidth=3;g.setLineDash([8,6]);const a=T*.8;g.beginPath();g.moveTo(-Math.cos(a)*R,-Math.sin(a)*R);g.lineTo(Math.cos(a)*R,Math.sin(a)*R);g.stroke();g.restore();K.txt(g,'π ≈ 3.14',W/2,H*.5+R+u*.9,{size:u*.8,color:'#7f1d1d'});}
const GAME={
  id:'pizzashop',title:'동글동글 피자 가게',title1:'체크 식탁보 피자 가게',title2:'동글동글 피자 가게',emoji:LOGO,
  subtitle:'6학년 2학기 수학 · 원주와 원의 넓이',
  howto:'🍕 주문서를 읽고 <b>치즈 길이(원주)</b>, <b>소스 넓이(원의 넓이)</b>를 계산해 알맞은 답을 골라요. 맞히면 피자가 한 단계씩 완성되고, 틀리면 그 부분이 타 버려요! 주문서의 <b>원주율</b>을 꼭 확인!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:RED,c2:GOLD},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 피자를 만들까요?',
  txt:{who:'누가 요리사일까요?',dur:'영업 시간',pace:'손님의 인내심',seat:'번 요리사 ',go:'영업 시작!',s1:'1. 메뉴',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'6학년 2학기',t:v.t,d:v.d})),
  summary:`<ul><li><b>원주율</b>은 (원주) ÷ (지름)이에요. 3.14 · 3.1 · 3 처럼 문제에서 정한 값을 써요.</li>
    <li><b>원주</b> = 지름 × 원주율 = 반지름 × 2 × 원주율</li>
    <li><b>원의 넓이</b> = 반지름 × 반지름 × 원주율</li>
    <li>반원·부채꼴은 전체 넓이를 나누고, 도넛 모양은 큰 원 − 작은 원으로 구해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const land=W>=H*1.15;const oh=Math.min(u*2.3,H*.14);const oy=H-pad-oh;
    const sc={x:pad,y:top,w:W-pad*2,h:oy-top-gap};const btns=[];const w=(W-pad*2-gap*2)/3;for(let i=0;i<3;i++)btns.push({i,x:pad+i*(w+gap),y:oy,w,h:oh});
    let pz,qb;if(land){pz={x:sc.x,y:sc.y,w:sc.w*.5,h:sc.h};qb={x:sc.x+sc.w*.52,y:sc.y,w:sc.w*.48,h:sc.h};}else{pz={x:sc.x,y:sc.y,w:sc.w,h:sc.h*.52};qb={x:sc.x,y:sc.y+sc.h*.54,w:sc.w,h:sc.h*.46};}
    return{W,H,u,top,pad,sc,btns,pz,qb,land};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={steps:[]};const pi=R.pick([3,3.1,3.14]);q.pi=pi;const f=x=>+x.toFixed(4);
    const S=(ask,ans,unit,st,bad)=>q.steps.push({ask,ans,unit,st,bad:bad||[]});
    if(L==='a'){const k=R.pick(['d','r','back']);
      if(k==='d'){const d=R.int(2,8)*5;q.d=d;q.order='지름 <b>'+d+' cm</b> 치즈 크러스트 피자요!';S('테두리에 두를 치즈 길이(원주)는? (지름 × 원주율)',f(d*pi),'cm','crust',[f(d*d*pi/4),f(d*pi/2),f(d*2*pi)]);}
      else if(k==='r'){const r=R.int(4,20);q.d=2*r;q.hideD=true;q.order='반지름 <b>'+r+' cm</b> 치즈 크러스트 피자요!';S('먼저 도우의 <b>지름</b>은 몇 cm?',2*r,'cm','dough',[r,r*r,r+2]);S('테두리 치즈 길이(원주)는?',f(2*r*pi),'cm','crust',[f(r*pi),f(r*r*pi),f(4*r*pi)]);}
      else{const d=R.int(2,8)*5;q.d=d;q.hideD=true;const c=f(d*pi);q.order='치즈가 <b>'+c+' cm</b> 있어요. 딱 맞는 크러스트 피자요!';S('치즈 '+c+' cm로 두를 수 있는 피자의 <b>지름</b>은? (원주 ÷ 원주율)',d,'cm','crust',[d*2,d/2,d+5]);}
      q.price=50;}
    else if(L==='b'){const r=R.int(3,15);q.d=2*r;if(R.chance(.5)){q.order='반지름 <b>'+r+' cm</b> 피자, 소스 듬뿍이요!';S('소스를 바를 넓이는 몇 cm²?',f(r*r*pi),'cm²','sauce',[f(2*r*pi),f(2*r*2*r*pi),f(r*pi)]);}
      else{q.order='지름 <b>'+2*r+' cm</b> 피자, 소스 듬뿍이요!';S('먼저 <b>반지름</b>은 몇 cm?',r,'cm','dough',[2*r,r*r,r+2]);S('소스를 바를 넓이는 몇 cm²?',f(r*r*pi),'cm²','sauce',[f(2*r*pi),f(4*r*r*pi),f(r*pi)]);}
      q.price=55;}
    else{const k=R.pick(['half','quarter','box','ring']);const r=R.int(2,10)*2;q.d=2*r;q.kind=k;const A=f(r*r*pi);
      if(k==='half'){q.order='반지름 <b>'+r+' cm</b> <b>반반 피자</b>! 반쪽에만 불고기 올려 주세요';S('전체 피자 넓이는?',A,'cm²','sauce',[f(2*r*pi),f(A/2),f(4*A)]);S('불고기를 올릴 <b>반쪽</b> 넓이는?',f(A/2),'cm²','half',[A,f(A/4),f(A*2)]);}
      else if(k==='quarter'){q.order='반지름 <b>'+r+' cm</b> 피자의 <b>한 조각(1/4)</b>만 주세요';S('전체 피자 넓이는?',A,'cm²','sauce',[f(2*r*pi),f(A/2),f(4*A)]);S('<b>한 조각(1/4)</b>의 넓이는?',f(A/4),'cm²','quarter',[f(A/2),A,f(A/8)]);}
      else if(k==='box'){q.order='지름 <b>'+2*r+' cm</b> 피자를 꼭 맞는 정사각형 상자에 담아 주세요';S('상자 바닥 넓이는? (한 변 '+2*r+' cm)',4*r*r,'cm²','box',[2*r*r,2*r+2*r,r*r]);S('피자 넓이는?',A,'cm²','sauce',[f(2*r*pi),f(4*A),f(A/2)]);S('상자 바닥의 <b>남는 부분</b> 넓이는?',f(4*r*r-A),'cm²','boxleft',[f(A),f(4*r*r+A),f(2*r*r-A)]);}
      else{const r2=r/2;q.r2=r2;q.order='반지름 <b>'+r+' cm</b> 도넛 피자! 가운데 반지름 <b>'+r2+' cm</b>는 구멍이에요';S('큰 원의 넓이는?',A,'cm²','sauce',[f(2*r*pi),f(A*2),f(A/2)]);S('구멍(작은 원)의 넓이는?',f(r2*r2*pi),'cm²','hole',[f(r2*pi*2),f(A/2),f(r2*pi)]);S('도넛 피자의 넓이는?',f((r*r-r2*r2)*pi),'cm²','ring',[f((r-r2)*(r-r2)*pi),A,f(r2*r2*pi)]);}
      q.price=70;}
    q.text='원주율 '+pi;q.reveal=q.steps.map(s=>fx(s.ans)+' '+s.unit).join(' → ');q.review=strip(q.order)+' (원주율 '+pi+') → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.price;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.order;},askSub(q){return '📋 주문서 원주율: '+q.pi;},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return '정답: '+q.reveal;},goodTip(q){return '맛있대요! 🍕';},
  ptsOf(p,q,frac){return Math.round(60+50*frac);},
  setStep(p){const st=p.state,q=st.q,R=p.R;const s=q.steps[st.k];const cands=[...s.bad,s.ans*3,s.ans+1].filter(x=>x>0&&Math.abs(x-s.ans)>1e-6);const o=gkOpts3(R,s.ans,cands,x=>fx(x)+' '+s.unit);st.opts=o.labels;st.okI=o.okIdx;st.wait=0;st.msg='';},
  onNew(p,q){const st=p.state;st.k=0;st.burnt=0;st.parts=[];st.okFlag=false;st.fin=false;st.pickS=-1;this.setStep(p);},
  upd(p,dt){const st=p.state,q=st.q;if(!q||st.lock)return;if(st.wait>0){st.wait-=dt;if(st.wait<=0){if(st.k>=q.steps.length){st.okFlag=!st.burnt;this.verdict(p,0,false);}else this.setStep(p);}}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock||st.wait>0||st.k>=q.steps.length)return;const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));if(!b)return;const s=q.steps[st.k];const ok=b.i===st.okI;
    st.parts.push({st:s.st,b:!ok});st.pickS=b.i;if(!ok){st.burnt++;st.msg='🔥 앗! '+fx(s.ans)+' '+s.unit+'였어요';p.Snd.tone&&p.Snd.tone(150,.3,'sine',.07);}else{st.msg='✅ 맞아요!';p.Snd.tone&&p.Snd.tone(600+st.k*120,.12,'sine',.06);}
    if(!ok)q.review+=' [틀린 단계: '+strip(s.ask)+' → 정답 '+fx(s.ans)+' '+s.unit+']';st.k++;st.wait=ok?.7:1.5;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.wait>0||st.k>=q.steps.length)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const b=G.btns[st.okI];return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  pizza(g,q,st,cx,cy,R,u){const has=t=>st.parts.find(x=>x.st===t);const bad=t=>{const x=has(t);return x&&x.b;};
    g.fillStyle='#e2e8f0';g.beginPath();g.ellipse(cx,cy+R*.06,R*1.2,R*1.14,0,0,TAU);g.fill();
    if(q.kind==='box'&&has('box')){const s=R+R*.07;g.fillStyle=bad('box')?'#57534e':'#d6a77a';g.strokeStyle='#92400e';g.lineWidth=4;g.fillRect(cx-s,cy-s,2*s,2*s);g.strokeRect(cx-s,cy-s,2*s,2*s);}
    g.fillStyle='#fde68a';g.strokeStyle='#d97706';g.lineWidth=Math.max(3,R*.035);g.beginPath();g.arc(cx,cy,R,0,TAU);g.fill();g.stroke();
    if(q.kind==='box'&&has('boxleft')){const s=R*1.07;g.fillStyle=bad('boxleft')?'#57534e':'#fde047';g.globalAlpha=.85;[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{g.beginPath();g.moveTo(cx+sx*s,cy+sy*s);g.lineTo(cx+sx*(s-R*.5),cy+sy*s);g.arc(cx,cy,R,Math.atan2(0,sx)+(sy<0?(sx>0?-.0:0):0)*0,0,false);g.closePath();});g.globalAlpha=1;
      g.fillStyle=bad('boxleft')?'rgba(87,83,78,.7)':'rgba(253,224,71,.7)';[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{g.save();g.beginPath();g.rect(cx+(sx>0?0:-s),cy+(sy>0?0:-s),s,s);g.clip();g.beginPath();g.rect(cx+(sx>0?0:-s),cy+(sy>0?0:-s),s,s);g.arc(cx,cy,R,0,TAU,true);g.fill('evenodd');g.restore();});}
    if(has('sauce')){const b=bad('sauce');g.fillStyle=b?'#44403c':RED;g.beginPath();g.arc(cx,cy,R*.88,0,TAU);g.fill();if(!b){g.fillStyle='rgba(254,243,199,.75)';g.beginPath();g.arc(cx,cy,R*.8,0,TAU);g.fill();[[-.35,-.3],[.3,-.4],[.4,.2],[-.2,.4],[0,0],[-.5,.1]].forEach(([x,y])=>{g.fillStyle='#b91c1c';g.beginPath();g.arc(cx+x*R,cy+y*R,R*.1,0,TAU);g.fill();});}}
    if(has('half')){g.fillStyle=bad('half')?'#44403c':'#7c2d12';g.globalAlpha=.9;g.beginPath();g.moveTo(cx,cy-R*.88);g.arc(cx,cy,R*.88,-Math.PI/2,Math.PI/2);g.closePath();g.fill();g.globalAlpha=1;}
    if(has('quarter')){g.strokeStyle=bad('quarter')?'#111':'#16a34a';g.lineWidth=Math.max(4,R*.05);g.beginPath();g.moveTo(cx,cy);g.lineTo(cx,cy-R);g.arc(cx,cy,R,-Math.PI/2,0);g.closePath();g.stroke();}
    if(has('hole')||has('ring')){const r2=R*q.r2/(q.d/2);g.fillStyle='#e2e8f0';g.strokeStyle=bad('hole')?'#111':'#d97706';g.lineWidth=3;g.beginPath();g.arc(cx,cy,r2,0,TAU);g.fill();g.stroke();if(has('ring')){g.strokeStyle=bad('ring')?'rgba(68,64,60,.6)':'rgba(22,163,74,.4)';g.lineWidth=R-r2-R*.12;g.beginPath();g.arc(cx,cy,(R+r2)/2,0,TAU);g.stroke();}}
    if(has('crust')){g.strokeStyle=bad('crust')?'#292524':'#facc15';g.lineWidth=Math.max(6,R*.12);g.setLineDash(bad('crust')?[8,6]:[]);g.beginPath();g.arc(cx,cy,R*.95,0,TAU);g.stroke();g.setLineDash([]);}
    g.strokeStyle='#1d4ed8';g.lineWidth=2.5;g.setLineDash([6,5]);g.beginPath();g.moveTo(cx-R,cy);g.lineTo(cx+R,cy);g.stroke();g.setLineDash([]);
    K.txt(g,q.hideD&&!st.fin&&!has('dough')?'지름 ?':'지름 '+q.d+' cm',cx,cy-R*.1,{size:Math.max(14,R*.2),color:'#1d4ed8',stroke:'#fff',lw:R*.05,maxW:R*1.5});
    if(st.burnt)K.emo(g,'💨',cx+R*.8,cy-R*.8,R*.4);},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;
    g.fillStyle='#fff';g.fillRect(0,0,W,H);const s=u*1.5;for(let y=0;y<H/s;y++)for(let x=0;x<W/s;x++)if((x+y)%2){g.fillStyle='#fee2e2';g.fillRect(x*s,y*s,s,s);}
    const S=G.sc;K.card(g,S.x,S.y,S.w,S.h,u*.35,'rgba(255,250,240,.97)',{stroke:'#7f1d1d',lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#991b1b'});
    const P=G.pz;const R=Math.min(P.w*.36,P.h*.4);this.pizza(g,q,st,P.x+P.w/2,P.y+P.h*.5,R,u);
    /* 단계 + 질문 */
    const Q=G.qb;K.card(g,Q.x+u*.3,Q.y+u*.4,Q.w-u*.6,u*1.1,u*.25,'#fef3c7',{stroke:'#7f1d1d',lw:3,blur:0,dy:0});K.txt(g,'📋 주문서 원주율: '+q.pi,Q.x+Q.w/2,Q.y+u*.95,{size:u*.6,color:'#7f1d1d',maxW:Q.w*.9});
    for(let i=0;i<q.steps.length;i++){const x=Q.x+Q.w/2+(i-(q.steps.length-1)/2)*u*1.6;const pt=st.parts[i];K.txt(g,pt?(pt.b?'🔥':'✅'):i===st.k?'👉':'⬜',x,Q.y+u*2.1,{size:u*.8});}
    const cur=q.steps[Math.min(st.k,q.steps.length-1)];g.font=K.font(Math.min(u*.62,Q.w/14));
    const fs=Math.min(u*.62,Q.w/14);g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const lines=wrapKo(g,strip(st.k<q.steps.length?cur.ask:'🔥 오븐에서 노릇노릇 완성!'),Q.w-u);lines.slice(0,3).forEach((l,i)=>g.fillText(l,Q.x+Q.w/2,Q.y+u*3.3+i*fs*1.25));
    if(st.msg)K.txt(g,st.msg,Q.x+Q.w/2,Math.min(Q.y+Q.h-u*.5,Q.y+u*3.3+Math.min(lines.length,3)*fs*1.25+u*.4),{size:u*.6,color:st.msg[0]==='✅'?'#15803d':'#b91c1c',maxW:Q.w*.95});
    if(st.lock)K.txt(g,st.okFlag?'맛있대요! 🍕':'피자가 탔어요… '+q.reveal,S.x+S.w/2,S.y+S.h-u*.5,{size:u*.55,color:st.okFlag?'#15803d':'#b91c1c',stroke:'#fff',lw:u*.12,maxW:S.w*.95});
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*.4,S.y+S.h-u*.28,S.w-u*.8,Math.max(6,u*.14),st.qt/st.qmax,{good:RED});
    G.btns.forEach(b=>{const act=!st.lock&&st.wait<=0&&st.k<q.steps.length;let bg='#fff';if(st.wait>0||st.k>=q.steps.length){if(b.i===st.pickS)bg=st.parts.length&&st.parts[st.parts.length-1].b?'#fecaca':'#bbf7d0';}
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=bg;g.fill();g.lineWidth=3;g.strokeStyle='#7f1d1d';g.stroke();K.txt(g,act||st.wait>0?(st.opts?st.opts[b.i]:''):'',b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.42,u*.9),color:INK,maxW:b.w*.92});});
  },
};
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
QZ.mix(GAME,{say:false,pts0:60,pts1:50,okMs:1700,badMs:3300});
Engine.boot(GAME);
