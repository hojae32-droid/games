/* 6학년 1학기 수학 · 직육면체의 부피와 겉넓이 — 선물 포장 가게
   디자인: 물방울 무늬 포장지와 리본의 선물 가게. 포장지 넓이(겉넓이)를 계산하면 상자가 포장되고, 사탕 수(부피)를 계산하면 사탕이 한 층씩 채워져요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#6b1245',PINK='#be185d',TEAL='#0d9488';
const LOGO=gkLogo('#fce7f3','#9d174d','🎁');
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const fx=x=>String(+x.toFixed(4));
const comma=n=>String(n);
const LV={
  a:{g:'6학년 1학기',t:'겉넓이 (포장지)',d:'세 면의 합 × 2 · 정육면체 한 면 × 6'},
  b:{g:'6학년 1학기',t:'부피 (사탕 채우기)',d:'한 층의 개수 × 층 수'},
  c:{g:'6학년 1학기',t:'큰 상자 (m³)',d:'1 m³ = 1000000 cm³ · 이삿짐'},
};
function hero(g,W,H,T,u){g.fillStyle='#fdf2f8';g.fillRect(0,0,W,H);g.fillStyle='#f9a8d4';for(let y=0;y<H;y+=u*1.3)for(let x=((y/(u*1.3))%2)*u*.65;x<W;x+=u*1.3){g.beginPath();g.arc(x,y,u*.15,0,TAU);g.fill();}
  const bw=Math.min(W*.3,H*.5),bx=W/2-bw/2,by=H*.72;GAME.box(g,bx,by,bw,bw*.7,bw*.3,true,'#f9a8d4');K.emo(g,'🎀',W/2,by-bw*.72,bw*.5+Math.sin(T*3)*4);K.emo(g,'🍬',W*.22,H*.35+Math.sin(T*2)*8,u*1.3);K.emo(g,'🍬',W*.78,H*.3+Math.cos(T*2)*8,u*1.3);}
const GAME={
  id:'giftwrap',title:'선물 포장 가게',title1:'물방울 포장지 선물 가게',title2:'선물 포장 가게',emoji:LOGO,
  subtitle:'6학년 1학기 수학 · 직육면체의 부피와 겉넓이',
  howto:'🎁 손님의 선물을 포장해요! 상자를 감쌀 <b>포장지 넓이(겉넓이)</b>를 계산하면 상자가 포장되고, 상자에 넣을 <b>사탕 수(부피)</b>를 계산하면 사탕이 한 층씩 채워져요. 알맞은 답을 골라요!',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:PINK,c2:TEAL},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 선물을 포장할까요?',
  txt:{who:'누가 포장할까요?',dur:'영업 시간',pace:'손님의 인내심',seat:'번 점원 ',go:'영업 시작!',s1:'1. 포장',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>직육면체의 겉넓이</b> = (서로 다른 세 면의 넓이의 합) × 2. 정육면체는 한 면의 넓이 × 6.</li>
    <li><b>직육면체의 부피</b> = 가로 × 세로 × 높이. 한 층에 놓이는 쌓기나무(사탕) 수 × 층 수로도 구해요.</li>
    <li><b>1 m³ = 1000000 cm³</b>예요. 큰 상자는 m 단위로 부피를 구한 뒤 단위를 바꿔요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.3;const land=W>=H*1.15;const oh=Math.min(u*2.3,H*.14);const oy=H-pad-oh;
    const sc={x:pad,y:top,w:W-pad*2,h:oy-top-gap};const btns=[];const w=(W-pad*2-gap*2)/3;for(let i=0;i<3;i++)btns.push({i,x:pad+i*(w+gap),y:oy,w,h:oh});
    let bx,qb;if(land){bx={x:sc.x,y:sc.y,w:sc.w*.52,h:sc.h};qb={x:sc.x+sc.w*.54,y:sc.y,w:sc.w*.46,h:sc.h};}else{bx={x:sc.x,y:sc.y,w:sc.w,h:sc.h*.55};qb={x:sc.x,y:sc.y+sc.h*.57,w:sc.w,h:sc.h*.43};}
    return{W,H,u,top,pad,sc,btns,bx,qb,land};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={steps:[]};const S=(ask,ans,unit,st,bad)=>q.steps.push({ask,ans,unit,st,bad:bad||[]});
    if(L==='a'){if(R.chance(.3)){const a=R.int(2,12);q.dim=[a,a,a];q.order='한 모서리 <b>'+a+' cm</b> 정육면체 상자를 포장해 주세요';S('한 면의 넓이는 몇 cm²?',a*a,'cm²','face',[4*a,a*a*a,2*a*a]);S('포장지(겉넓이)는 몇 cm²? (면이 6개)',6*a*a,'cm²','wrap',[4*a*a,3*a*a,a*a*a]);}
      else{const l=R.int(3,15),w=R.int(2,10),h=R.int(2,10);q.dim=[l,w,h];const s3=l*w+w*h+h*l;q.order='가로 '+l+' cm, 세로 '+w+' cm, 높이 '+h+' cm 상자를 포장해 주세요';S('서로 다른 <b>세 면의 넓이의 합</b>은? ('+l+'×'+w+' + '+w+'×'+h+' + '+h+'×'+l+')',s3,'cm²','face',[l*w*h,2*s3,s3+l]);S('포장지(겉넓이)는 몇 cm²? (세 면의 합 × 2)',2*s3,'cm²','wrap',[s3,l*w*h,4*s3]);}
      q.price=55;}
    else if(L==='b'){const l=R.int(2,6),w=R.int(2,5),h=R.int(2,5);q.dim=[l,w,h];q.cubes=true;q.order='가로 '+l+' cm, 세로 '+w+' cm, 높이 '+h+' cm 상자에 <b>1 cm³ 사탕</b>을 꽉 채워 주세요!';S('<b>한 층</b>에 사탕이 몇 개 들어갈까요? (가로 × 세로)',l*w,'개','layer',[l+w,l*h,l*w+l]);S('사탕은 모두 몇 개(부피 몇 cm³)? (한 층 × '+h+'층)',l*w*h,'개','fill',[l*w+h,l*w*h+l*w,2*(l*w+w*h+h*l)]);q.price=55;}
    else{const l=R.int(1,5),w=R.int(1,4);const hc=R.pick([100,200,300,400,500]);q.dim=[l,w,hc/100];q.big=true;
      if(R.chance(.5)){q.order='가로 '+l+' m, 세로 '+w+' m, 높이 <b>'+hc+' cm</b>짜리 이삿짐 상자예요';S('높이 '+hc+' cm는 몇 m?',hc/100,'m','face',[hc/10,hc,hc/1000]);S('이삿짐 상자의 부피는 몇 m³?',l*w*hc/100,'m³','fill',[l*w*hc,l*w+hc/100,l*w*hc/10]);}
      else{const v=l*w*hc/100;q.order='가로 '+l+' m, 세로 '+w+' m, 높이 '+hc/100+' m 상자예요. 1 cm³ 구슬로 채우면?';S('상자의 부피는 몇 m³?',v,'m³','face',[l*w,v*10,l+w+hc/100]);S(fx(v)+' m³는 몇 cm³? (1 m³ = 1000000 cm³)',v*1000000,'cm³','fill',[v*1000,v*100000,v*10000000]);}
      q.price=70;}
    q.text='🎀 계산을 맞힐 때마다 포장이 한 단계씩 완성돼요';q.reveal=q.steps.map(s=>comma(fx(s.ans))+' '+s.unit).join(' → ');q.review=strip(q.order)+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.price;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.order;},askSub(q){return q.text;},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return '정답: '+q.reveal;},goodTip(q){return '완벽한 포장! 🎁';},
  ptsOf(p,q,frac){return Math.round(60+50*frac);},
  setStep(p){const st=p.state,q=st.q,R=p.R;const s=q.steps[st.k];const cands=[...s.bad,s.ans*2,s.ans+1].filter(x=>x>0&&Math.abs(x-s.ans)>1e-9);const o=gkOpts3(R,s.ans,cands,x=>comma(fx(x))+' '+s.unit);st.opts=o.labels;st.okI=o.okIdx;st.wait=0;st.msg='';},
  onNew(p,q){const st=p.state;st.k=0;st.burnt=0;st.parts=[];st.okFlag=false;st.pickS=-1;st.anim=0;this.setStep(p);},
  upd(p,dt){const st=p.state,q=st.q;if(!q||st.lock)return;st.anim+=dt;if(st.wait>0){st.wait-=dt;if(st.wait<=0){if(st.k>=q.steps.length){st.okFlag=!st.burnt;this.verdict(p,0,false);}else this.setStep(p);}}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock||st.wait>0||st.k>=q.steps.length)return;const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));if(!b)return;const s=q.steps[st.k];const ok=b.i===st.okI;
    st.parts.push({st:s.st,b:!ok});st.pickS=b.i;st.anim=0;if(!ok){st.burnt++;st.msg='앗! '+comma(fx(s.ans))+' '+s.unit+'였어요';p.Snd.tone&&p.Snd.tone(150,.3,'sine',.07);q.review+=' [틀린 단계: '+strip(s.ask)+' → 정답 '+comma(fx(s.ans))+' '+s.unit+']';}else{st.msg='✅ 맞아요!';p.Snd.tone&&p.Snd.tone(600+st.k*120,.12,'sine',.06);}
    st.k++;st.wait=ok?.9:1.5;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock||st.wait>0||st.k>=q.steps.length)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const b=G.btns[st.okI];return{k:'click',x:rc.left+b.x+b.w/2,y:rc.top+b.y+b.h/2};},
  /* 상자 그리기: 앞면 폭 bw 높이 bh, 깊이 오프셋 d (비스듬히) */
  box(g,x,y,bw,bh,d,wrapped,col,ribbon){const dx=d*.9,dy=d*.55;g.lineJoin='round';g.lineWidth=Math.max(2,bw*.015);g.strokeStyle='#92400e';
    const faces=[[[x,y],[x+bw,y],[x+bw,y-bh],[x,y-bh],'#fde68a'],[[x,y-bh],[x+dx,y-bh-dy],[x+bw+dx,y-bh-dy],[x+bw,y-bh],'#fef3c7'],[[x+bw,y],[x+bw+dx,y-dy],[x+bw+dx,y-bh-dy],[x+bw,y-bh],'#fcd34d']];
    faces.forEach(f=>{g.beginPath();f.slice(0,4).forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();g.fillStyle=wrapped?(col||'#f9a8d4'):f[4];g.fill();if(wrapped){g.fillStyle='rgba(255,255,255,.6)';f.slice(0,4);const cx=(f[0][0]+f[2][0])/2,cy=(f[0][1]+f[2][1])/2;for(let k=0;k<4;k++){g.beginPath();g.arc(cx+(k%2?1:-1)*bw*.12,cy+(k<2?-1:1)*bh*.2,Math.max(3,bw*.03),0,TAU);g.fill();}}g.stroke();});
    if(ribbon){g.strokeStyle='#dc2626';g.lineWidth=Math.max(5,bw*.06);g.beginPath();g.moveTo(x+bw/2,y);g.lineTo(x+bw/2,y-bh);g.lineTo(x+bw/2+dx,y-bh-dy);g.stroke();K.emo(g,'🎀',x+bw/2+dx/2,y-bh-dy/2+bw*.02,Math.max(20,bw*.28));}},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q;if(!q)return;
    g.fillStyle='#fdf2f8';g.fillRect(0,0,W,H);g.fillStyle='#f9a8d4';g.globalAlpha=.6;for(let y=0;y<H;y+=u*1.3)for(let x=((y/(u*1.3))%2)*u*.65;x<W;x+=u*1.3){g.beginPath();g.arc(x,y,u*.12,0,TAU);g.fill();}g.globalAlpha=1;
    const S=G.sc;K.card(g,S.x,S.y,S.w,S.h,u*.35,'rgba(255,255,255,.96)',{stroke:'#9d174d',lw:Math.max(3,u*.08),blur:0,dy:u*.08,sc:'#831843'});
    const B=G.bx;let [l,w,h]=q.dim;const has=t=>st.parts.find(x=>x.st===t);const bad=t=>{const x=has(t);return x&&x.b;};
    const k=Math.min(B.w*.55/(l+w*.5),B.h*.7/(h+w*.5));const bw=l*k,bh=h*k,dd=w*k;const x0=Math.max(B.x+u*2,B.x+(B.w-bw-dd*.9)/2),y0=B.y+B.h*.88;const dx=dd*.9,dy=dd*.55;
    const wrapAll=has('wrap'),wrapF=has('face')&&!q.cubes&&!q.big;
    if(q.cubes){const nz=has('fill')?h:has('layer')?1:0;const u1=k;const col=n=>n?'#a8a29e':'#fda4af';
      for(let z=0;z<nz;z++)for(let yy=w-1;yy>=0;yy--)for(let x=0;x<l;x++){const X=x0+x*u1+yy*u1*.9,Y=y0-z*u1-yy*u1*.55;const b=z===0?bad('layer'):bad('fill');
        g.lineWidth=1;g.strokeStyle='#831843';g.fillStyle=b?'#a8a29e':'#fda4af';g.fillRect(X,Y-u1,u1,u1);g.strokeRect(X,Y-u1,u1,u1);g.beginPath();g.moveTo(X,Y-u1);g.lineTo(X+u1*.9,Y-u1*1.55);g.lineTo(X+u1*1.9,Y-u1*1.55);g.lineTo(X+u1,Y-u1);g.closePath();g.fillStyle=b?'#d6d3d1':'#fecdd3';g.fill();g.stroke();g.beginPath();g.moveTo(X+u1,Y);g.lineTo(X+u1*1.9,Y-u1*.55);g.lineTo(X+u1*1.9,Y-u1*1.55);g.lineTo(X+u1,Y-u1);g.closePath();g.fillStyle=b?'#78716c':'#fb7185';g.fill();g.stroke();}
      g.strokeStyle=TEAL;g.lineWidth=3;g.setLineDash([7,5]);g.strokeRect(x0,y0-bh,bw,bh);g.beginPath();g.moveTo(x0,y0-bh);g.lineTo(x0+dx,y0-bh-dy);g.lineTo(x0+bw+dx,y0-bh-dy);g.lineTo(x0+bw,y0-bh);g.moveTo(x0+bw,y0);g.lineTo(x0+bw+dx,y0-dy);g.lineTo(x0+bw+dx,y0-bh-dy);g.stroke();g.setLineDash([]);}
    else{const wr=wrapAll||wrapF;this.box(g,x0,y0,bw,bh,dd,wr,bad('face')||bad('wrap')?'#78716c':'#f9a8d4',wrapAll&&!(bad('face')||bad('wrap')));
      if(q.big&&has('fill'))K.emo(g,bad('fill')?'💥':'📦',x0+bw/2,y0-bh/2,Math.max(24,bw*.4));}
    const U=q.big?'m':'cm';const lab=(t,x,y)=>K.txt(g,t,x,y,{size:Math.max(14,u*.5),color:INK,stroke:'#fff',lw:u*.1});
    lab(l+' '+U,x0+bw/2,y0+u*.5);lab(w+' '+U,x0+bw+dx/2+u*.9,y0-dy/2+u*.1);lab(q.big&&!has('face')?(h*100)+' cm':h+' '+U,x0-u*.9,y0-bh/2);
    /* 질문 */
    const Q=G.qb;for(let i=0;i<q.steps.length;i++){const x=Q.x+Q.w/2+(i-(q.steps.length-1)/2)*u*1.6;const pt=st.parts[i];K.txt(g,pt?(pt.b?'❌':'✅'):i===st.k?'👉':'⬜',x,Q.y+u*.9,{size:u*.8});}
    const cur=q.steps[Math.min(st.k,q.steps.length-1)];const fs=Math.min(u*.66,Q.w/14);g.font=K.font(fs);g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';
    const lines=wrapKo(g,st.k<q.steps.length?strip(cur.ask):'🎀 예쁘게 완성!',Q.w-u);lines.slice(0,4).forEach((l2,i)=>g.fillText(l2,Q.x+Q.w/2,Q.y+u*2.3+i*fs*1.25));
    if(st.msg)K.txt(g,st.msg,Q.x+Q.w/2,Math.min(Q.y+Q.h-u*.6,Q.y+u*2.3+Math.min(lines.length,4)*fs*1.25+u*.5),{size:u*.6,color:st.msg[0]==='✅'?'#15803d':'#b91c1c',maxW:Q.w*.95});
    if(st.lock)K.txt(g,st.okFlag?'완벽한 포장! 🎁':'포장이 엉망이래요… '+q.reveal,S.x+S.w/2,S.y+S.h-u*.5,{size:u*.55,color:st.okFlag?'#15803d':'#b91c1c',stroke:'#fff',lw:u*.12,maxW:S.w*.95});
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*.4,S.y+S.h-u*.28,S.w-u*.8,Math.max(6,u*.14),st.qt/st.qmax,{good:PINK});
    G.btns.forEach(b=>{let bg='#fff';if((st.wait>0||st.k>=q.steps.length)&&b.i===st.pickS)bg=st.parts.length&&st.parts[st.parts.length-1].b?'#fecaca':'#bbf7d0';
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=bg;g.fill();g.lineWidth=3;g.strokeStyle='#9d174d';g.stroke();K.txt(g,!st.lock&&st.opts?st.opts[b.i]:'',b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.42,u*.9),color:INK,maxW:b.w*.92});});
  },
};
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
QZ.mix(GAME,{say:false,pts0:60,pts1:50,okMs:1700,badMs:3300});
Engine.boot(GAME);
