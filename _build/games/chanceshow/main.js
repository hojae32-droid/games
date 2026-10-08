/* 5학년 2학기 수학 · 평균과 가능성 — 가능성 룰렛 쇼
   디자인: 번쩍이는 전구 무대의 퀴즈 쇼. 블록을 옮겨 평평하게 만들면 평균! 룰렛은 칸을 직접 칠해 주문한 가능성을 만들고 빙글빙글 돌려요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#1a0628',GOLD='#ffd23f',PINK='#ff4fa3';
const LOGO=gkLogo('#3b1458','#ffd23f','🎡');
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const J=(w,t)=>{w=String(w);const c=w.charCodeAt(w.length-1);const b=c>=0xAC00&&c<=0xD7A3?(c-0xAC00)%28!==0:/[013678]/.test(w[w.length-1]);const m={'은':['은','는'],'이':['이','가'],'을':['을','를']}[t];return w+(b?m[0]:m[1]);};
const WORDS=['불가능하다','~아닐 것 같다','반반이다','~일 것 같다','확실하다'];
const lvOf=(r,t)=>r===0?0:r===t?4:r*2===t?2:r*2<t?1:3;
const SMALL=[{title:'읽은 책 수',what:'모둠 친구들이 읽은 책 수',u:'권',ic:'📚',col:'#fca5a5'},{title:'고리 던지기',what:'넣은 고리 수',u:'개',ic:'⭕',col:'#fdba74'},{title:'칭찬 도장',what:'모은 칭찬 도장 수',u:'개',ic:'⭐',col:'#fde68a'},{title:'딴 사과',what:'과수원에서 딴 사과 수',u:'개',ic:'🍎',col:'#86efac'}];
const CTX=[{title:'줄넘기 기록',what:'줄넘기 기록',u:'번',lo:20,hi:90,ic:'🪢'},{title:'50 m 달리기',what:'달리기 기록',u:'초',lo:8,hi:14,ic:'🏃'},{title:'읽은 책 수',what:'한 달 동안 읽은 책 수',u:'권',lo:2,hi:15,ic:'📚'},{title:'공 던지기',what:'공 던지기 기록',u:'m',lo:12,hi:35,ic:'⚾'},{title:'수학 점수',what:'수학 점수',u:'점',lo:60,hi:100,ic:'💯'}];
const NM=['지우','민준','서연','하준','도윤','수아','예준','지아','시우','하린'],NM2=['은우','채원','유준','윤서','건우'];
const LV={
  a:{g:'5학년 2학기',t:'평균 구하기',d:'블록 옮겨 고르게 · 합 ÷ 개수'},
  b:{g:'5학년 2학기',t:'평균 이용하기',d:'목표 평균 맞추기 · 평균 비교'},
  c:{g:'5학년 2학기',t:'일이 일어날 가능성',d:'룰렛 칠하기 · 공 넣기 · 말과 수로'},
};
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#4c1d95','#1a0628']);for(let i=0;i<18;i++){const x=W*(i+.5)/18;g.fillStyle=(Math.floor(T*3)+i)%2?GOLD:PINK;g.beginPath();g.arc(x,H*.07,u*.17,0,TAU);g.fill();K.glow(g,x,H*.07,u*.7,(Math.floor(T*3)+i)%2?GOLD:PINK,.4);}
  const cx=W/2,cy=H*.55,R=Math.min(W*.28,H*.36);g.save();g.translate(cx,cy);g.rotate(T*.8);for(let k=0;k<8;k++){g.beginPath();g.moveTo(0,0);g.arc(0,0,R,k*TAU/8,(k+1)*TAU/8);g.closePath();g.fillStyle=[1,0,0,1,0,1,0,0][k]?'#ef4444':'#3b82f6';g.fill();g.strokeStyle='#fff';g.lineWidth=4;g.stroke();}g.restore();
  g.fillStyle='#fff';g.beginPath();g.arc(cx,cy,R*.1,0,TAU);g.fill();g.fillStyle=GOLD;g.beginPath();g.moveTo(cx,cy-R-u*.2);g.lineTo(cx-u*.35,cy-R-u*.9);g.lineTo(cx+u*.35,cy-R-u*.9);g.fill();}
const GAME={
  id:'g21-chance-show',title:'가능성 룰렛 쇼',title1:'전구 무대 퀴즈 쇼',title2:'가능성 룰렛 쇼',emoji:LOGO,
  subtitle:'5학년 2학기 수학 · 평균과 가능성',
  howto:'🎡 두근두근 퀴즈 쇼! 높은 막대의 블록을 <b>콕 집어</b> 낮은 막대로 옮겨 <b>평평하게</b> 만들면 그 높이가 평균! 룰렛은 <b>칸을 직접 칠해</b> 주문한 가능성을 만들고 빙글빙글 돌려 봐요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#7c3aed',c2:GOLD},hero:gkHero(hero),vignette:.04,durs:[120,180,300],levelTitle:'어떤 무대에 오를까요?',
  txt:{who:'누가 출연할까요?',dur:'쇼 시간',pace:'생각하는 시간',seat:'번 출연자 ',go:'쇼 시작!',s1:'1. 무대',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>평균</b>은 자료의 값을 모두 더한 수를 자료의 수로 나눈 값이에요. 블록을 옮겨 고르게 만들면 그 높이가 평균이에요.</li>
    <li>평균을 알면 모르는 한 값도 구할 수 있어요. (평균 × 자료 수 − 나머지 합) 사람 수가 달라도 <b>평균</b>으로 비교할 수 있어요.</li>
    <li>일이 일어날 가능성은 <b>불가능하다 · ~아닐 것 같다 · 반반이다 · ~일 것 같다 · 확실하다</b>로 말하고, 수로는 0 · 1/2 · 1로 나타내요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,gap=u*.25,q=p.state.q;const land=W>=H*1.15;
    const ty=q?q.ty:'avg';const nopt=q&&q.opts?q.opts.length:0;let rows=1,btns=[];
    let oh=Math.min(u*2.2,H*.15);let n=0;
    if(ty==='balls')rows=2;
    const ch=oh*rows+gap*(rows-1);const sc={x:pad,y:top,w:W-pad*2,h:H-top-pad-ch-gap};
    const oy=H-pad-ch;
    if(nopt){const cols=nopt;const w=(W-pad*2-gap*(cols-1))/cols;for(let i=0;i<nopt;i++)btns.push({id:'o'+i,i,x:pad+i*(w+gap),y:oy,w,h:oh});}
    else if(ty==='balls'){const w=(W-pad*2-gap*3)/4;['+🔴','−🔴','+🔵','−🔵'].forEach((t,i)=>btns.push({id:'b'+i,t,x:pad+i*(w+gap),y:oy,w,h:oh}));btns.push({id:'go',t:'🎁 상자 완성!',x:pad,y:oy+oh+gap,w:W-pad*2,h:oh,go:1});}
    else btns.push({id:'go',t:ty==='level'?'✨ 평평하게 완성!':'🎡 돌려라!',x:pad,y:oy,w:W-pad*2,h:oh,go:1});
    return{W,H,u,top,pad,sc,btns,land};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={};
    const mkVals=(ctx,n)=>{let vals;for(let t=0;t<100;t++){vals=[];for(let k=0;k<n;k++)vals.push(R.int(ctx.lo,ctx.hi));if(vals.reduce((a,b)=>a+b)%n===0)break;}return vals;};
    if(L==='a'){if(R.chance(.55)){const c=R.pick(SMALL);const n=R.int(4,5);let v;do{v=[];for(let k=0;k<n;k++)v.push(R.int(1,9));}while(v.reduce((a,b)=>a+b)%n||new Set(v).size<3);
        Object.assign(q,{ty:'level',c,names:R.sample(NM,n),vals:v,avg:v.reduce((a,b)=>a+b)/n});q.text=c.ic+' '+c.what+'! 블록을 옮겨 <b>평평하게</b> 만들어요';q.reveal='평균 '+q.avg+c.u+' (합 '+v.reduce((a,b)=>a+b)+' ÷ '+n+')';}
      else{const ctx=R.pick(CTX),n=R.int(4,5),vals=mkVals(ctx,n),avg=vals.reduce((a,b)=>a+b)/n;Object.assign(q,{ty:'avg',ctx,names:R.sample(NM,n),vals,ans:avg});q.text=ctx.ic+' '+ctx.what+'의 <b>평균</b>은 몇 '+ctx.u+'일까요?';q.reveal=avg+ctx.u+' (합 '+vals.reduce((a,b)=>a+b)+' ÷ '+n+')';
        const o=gkOpts3(R,avg,[avg+1,avg-1,avg+2,avg-2,avg+5,Math.round(vals.reduce((a,b)=>a+b)/(n+1))],x=>x+' '+ctx.u);q.opts=o.labels;q.okIdx=o.okIdx;}}
    else if(L==='b'){const ctx=R.pick(CTX),n=R.int(4,5),vals=mkVals(ctx,n),avg=vals.reduce((a,b)=>a+b)/n;Object.assign(q,{ctx,names:R.sample(NM,n),vals});
      if(R.chance(.65)){q.ty='miss';q.hide=n-1;q.ans=vals[n-1];q.avg=avg;q.text=ctx.ic+' 모둠 평균 <b>'+avg+ctx.u+'</b>를 만들려면 <b>'+q.names[n-1]+'</b>는 몇 '+ctx.u+'?';q.reveal=q.ans+ctx.u+' ('+avg+'×'+n+' − 나머지 합)';
        const o=gkOpts3(R,q.ans,[q.ans+1,q.ans-1,q.ans+3,q.ans-3,q.ans+5].filter(x=>x>0),x=>x+' '+ctx.u);q.opts=o.labels;q.okIdx=o.okIdx;}
      else{q.ty='cmp';let v2;for(let t=0;t<100;t++){v2=[];for(let k=0;k<n-1;k++)v2.push(R.int(ctx.lo,ctx.hi));if(v2.reduce((a,b)=>a+b)%(n-1)===0&&v2.reduce((a,b)=>a+b)/(n-1)!==avg)break;}
        const a2=v2.reduce((a,b)=>a+b)/(n-1);q.v2=v2;q.a2=a2;q.text=ctx.ic+' '+ctx.what+'의 <b>평균이 더 높은</b> 모둠은?';q.reveal=(avg>a2?'가':'나')+' 모둠 (가 '+avg+', 나 '+(+a2.toFixed(2))+')';q.opts=['🅰️ 가 모둠','🅱️ 나 모둠'];q.okIdx=avg>a2?0:1;}}
    else{const lv=R.int(0,4);q.lvl=lv;const k=R.pick(['paint','paint','balls','read']);const W=WORDS[lv];
      if(k==='paint'){q.ty='paint';q.text='🎡 빨간색에 멈출 가능성이 <b>‘'+W+'’</b> 가 되도록 룰렛을 칠해요!';q.reveal='빨간 칸 '+['0칸','1~3칸','4칸','5~7칸','8칸'][lv];}
      else if(k==='balls'){q.ty='balls';q.text='🎁 공 1개를 꺼낼 때 빨간 공일 가능성이 <b>‘'+W+'’</b> 가 되도록 공을 넣어요!';q.reveal=['빨간 공 0개(파란 공만)','빨간 공이 파란 공보다 적게','빨간 공과 파란 공을 같게','빨간 공이 파란 공보다 많게','빨간 공만'][lv];}
      else{q.ty='read';const r=[0,R.int(1,3),4,R.int(5,7),8][lv];q.wheel=R.shuffle([...Array(r).fill(1),...Array(8-r).fill(0)]);const asNum=R.chance(.4)&&lv%2===0;
        q.text='🎡 화살이 <b>빨간색</b>에 멈출 가능성을 '+(asNum?'<b>수</b>로':'말로')+' 나타내면?';const nums=['0','','1/2','','1'];
        if(asNum){q.reveal=nums[lv];q.opts=['0','1/2','1'];q.okIdx=['0','1/2','1'].indexOf(nums[lv]);}else{const idx=R.shuffle([0,1,2,3,4].filter(i=>i!==lv)).slice(0,2);const all=R.shuffle([lv,...idx]);q.reveal=W;q.opts=all.map(i=>WORDS[i]);q.okIdx=all.indexOf(lv);}}}
    q.review=strip(q.text)+(q.vals?' ['+q.vals.join(', ')+']':'')+' → '+q.reveal;q.speak='';return q;},
  qtime(q){return q.ty==='level'?70:q.ty==='paint'||q.ty==='balls'?40:30;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.ty==='level'?'높은 막대를 콕 → 낮은 막대를 콕':q.ty==='paint'?'칸을 눌러 빨강·파랑을 바꿔요':q.ty==='balls'?'버튼으로 공을 넣고 빼요':'';},
  isOk(q,i,p){return q.opts?i===q.okIdx:!!p.state.okFlag;},tipOf(q){return q.reveal;},goodTip(q){return '정답! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+50*frac);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.hand=-1;st.h=q.vals?q.vals.slice():null;st.seg=q.ty==='read'?q.wheel.slice():Array(8).fill(0);st.r=0;st.b=0;st.spinA=0;st.spinT=0;st.extra='';},
  onVerdict(p,q,ok){const st=p.state;if(q.ty==='paint'){st.spin=true;st.spinTarget=TAU*(2+Math.random()*2)+Math.random()*TAU;st.spinT=0;}},
  upd(p,dt){const st=p.state;if(st.spin&&st.spinT<1.6){st.spinT+=dt;const k=Math.min(1,st.spinT/1.6);st.spinA=st.spinTarget*(1-Math.pow(1-k,3));}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const b=G.btns.find(b=>K.inRect(x,y,b));
    if(b){if(b.id[0]==='o'){this.verdict(p,b.i,false);return;}
      if(b.id==='go'){if(q.ty==='level'){if(st.hand>=0){st.h[st.hand]++;st.hand=-1;}const ok=st.h.every(h=>h===st.h[0]);st.okFlag=ok;if(!ok)st.extra='아직 높이가 달라요';this.verdict(p,0,false);}
        else if(q.ty==='paint'){const r=st.seg.filter(v=>v).length;const ok=lvOf(r,8)===q.lvl;st.okFlag=ok;q.reveal2='빨간 칸 '+r+'칸은 ‘'+WORDS[lvOf(r,8)]+'’예요';if(!ok)q.review+=' (내가 칠한 것: '+q.reveal2+')';this.verdict(p,0,false);}
        else if(q.ty==='balls'){if(st.r+st.b===0){p.Snd.bad&&p.Snd.bad();return;}const ok=lvOf(st.r,st.r+st.b)===q.lvl;st.okFlag=ok;if(!ok)q.review+=' (내가 넣은 것: 빨강 '+st.r+' · 파랑 '+st.b+')';this.verdict(p,0,false);}return;}
      if(b.id[0]==='b'){const k=+b.id[1];if(k===0&&st.r<8)st.r++;if(k===1&&st.r>0)st.r--;if(k===2&&st.b<8)st.b++;if(k===3&&st.b>0)st.b--;p.Snd.tap&&p.Snd.tap();return;}}
    if(q.ty==='level'){const A=this.barGeo(G,q.vals.length);const j=A.cols.findIndex(c=>x>=c.x&&x<=c.x+c.w&&y>=G.sc.y&&y<=G.sc.y+G.sc.h);if(j>=0){if(st.hand<0){if(st.h[j]===0)return;st.hand=j;st.h[j]--;p.Snd.tap&&p.Snd.tap();}else{st.h[j]++;st.hand=-1;p.Snd.tone&&p.Snd.tone(500+st.h[j]*40,.08,'sine',.05);}}}
    if(q.ty==='paint'){const W=this.wheelGeo(G);const dx=x-W.cx,dy=y-W.cy;if(Math.hypot(dx,dy)<W.R){let a=Math.atan2(dy,dx)+Math.PI/2;if(a<0)a+=TAU;const k=Math.floor(a/(TAU/8));st.seg[k]=1-st.seg[k];p.Snd.tap&&p.Snd.tap();}}},
  barGeo(G,n){const S=G.sc;const gap=G.u*.3;const cw=Math.min(G.u*2.6,(S.w-gap*(n+1))/n);const tot=cw*n+gap*(n-1);const x0=S.x+(S.w-tot)/2;return{cw,cols:Array.from({length:n},(_,i)=>({x:x0+i*(cw+gap),w:cw}))};},
  wheelGeo(G){const S=G.sc;const R=Math.min(S.w*.36,S.h*.4);return{cx:S.x+S.w/2,cy:S.y+S.h*.54,R};},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=(x,y)=>({k:'click',x:rc.left+x,y:rc.top+y});const bc=b=>cl(b.x+b.w/2,b.y+b.h/2);
    if(q.opts)return bc(G.btns[q.okIdx]);
    if(q.ty==='level'){const A=this.barGeo(G,q.vals.length);const avg=q.avg;const hi=st.h.findIndex(h=>h>avg),lo=st.h.findIndex(h=>h<avg);const cc=j=>cl(A.cols[j].x+A.cw/2,G.sc.y+G.sc.h*.5);
      if(st.hand>=0){const t=st.h.findIndex(h=>h<avg);return cc(t>=0?t:st.hand);}if(hi>=0)return cc(hi);return bc(G.btns[0]);}
    if(q.ty==='paint'){const want=[0,2,4,6,8][q.lvl];const r=st.seg.filter(v=>v).length;const W=this.wheelGeo(G);if(r===want)return bc(G.btns[0]);const k=r<want?st.seg.indexOf(0):st.seg.indexOf(1);const a=(k+.5)*TAU/8-Math.PI/2;return cl(W.cx+Math.cos(a)*W.R*.6,W.cy+Math.sin(a)*W.R*.6);}
    if(q.ty==='balls'){const tr=[[0,3],[1,3],[1,1],[3,1],[1,0]][q.lvl];if(st.r!==tr[0]){return bc(G.btns[st.r<tr[0]?0:1]);}if(st.b!==tr[1]){return bc(G.btns[st.b<tr[1]?2:3]);}return bc(G.btns[4]);}
    return null;},
  bars(g,G,names,vals,tag,x,y,w,h,line,hideIdx,u,mx){const n=vals.length;const gap=u*.2;const bw=Math.min(u*1.8,(w-gap*(n+1))/n);const tot=bw*n+gap*(n-1);const x0=x+(w-tot)/2;const base=y+h-u*.9;const ch=h-u*2.2;
    if(tag)K.txt(g,tag,x+w/2,y+u*.2,{size:u*.5,color:GOLD,maxW:w});
    vals.forEach((v,k)=>{const bx=x0+k*(bw+gap);const bh=hideIdx===k?ch*.25:ch*v/mx;K.rr(g,bx,base-bh,bw,bh,u*.15);g.fillStyle=hideIdx===k?'#a78bfa':['#f472b6','#60a5fa','#facc15','#4ade80','#fb923c'][k%5];g.fill();if(hideIdx===k){g.setLineDash([6,5]);g.strokeStyle='#fff';g.lineWidth=2;g.stroke();g.setLineDash([]);}
      K.txt(g,hideIdx===k?'?':String(v),bx+bw/2,base-bh-u*.35,{size:u*.5,color:'#fff',maxW:bw});K.txt(g,names[k],bx+bw/2,base+u*.45,{size:Math.min(u*.42,bw*.5),color:'#e9d5ff',maxW:bw*1.1});});
    g.fillStyle='#fff';g.fillRect(x0-gap,base,tot+gap*2,2);
    if(line!=null){const ly=base-ch*line/mx;g.setLineDash([8,6]);g.strokeStyle=GOLD;g.lineWidth=3;g.beginPath();g.moveTo(x0-gap,ly);g.lineTo(x0+tot+gap,ly);g.stroke();g.setLineDash([]);K.txt(g,'평균 '+line,x0+tot+gap,ly-u*.3,{size:u*.4,color:GOLD,align:'right'});}},
  wheel(g,W,seg,edit,rot){g.save();g.translate(W.cx,W.cy);g.rotate(rot||0);for(let k=0;k<8;k++){g.beginPath();g.moveTo(0,0);g.arc(0,0,W.R,k*TAU/8-Math.PI/2,(k+1)*TAU/8-Math.PI/2);g.closePath();g.fillStyle=seg[k]?'#ef4444':'#3b82f6';g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(3,W.R*.04);g.stroke();}g.restore();
    g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=3;g.beginPath();g.arc(W.cx,W.cy,W.R*.1,0,TAU);g.fill();g.stroke();g.fillStyle=GOLD;g.strokeStyle=INK;g.beginPath();g.moveTo(W.cx,W.cy-W.R*.98);g.lineTo(W.cx-W.R*.1,W.cy-W.R*1.2);g.lineTo(W.cx+W.R*.1,W.cy-W.R*1.2);g.closePath();g.fill();g.stroke();},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,S=G.sc;if(!q)return;
    K.vgrad(g,0,0,W,H,['#2a0a3d','#4c1d95']);for(let i=0;i<Math.ceil(W/(u*1.2));i++){const on=(Math.floor(st.T*3)+i)%2;g.fillStyle=on?GOLD:PINK;g.globalAlpha=.9;g.beginPath();g.arc(i*u*1.2+u*.6,(p.top||0)+u*.08,u*.1,0,TAU);g.fill();g.globalAlpha=1;}
    K.card(g,S.x,S.y+u*.2,S.w,S.h-u*.1,u*.35,'rgba(26,6,40,.75)',{stroke:GOLD,lw:Math.max(3,u*.08),blur:u*.3,dy:0,sc:'rgba(255,210,63,.4)'});
    const ty=q.ty;
    if(ty==='level'){const A=this.barGeo(G,q.vals.length);const cell=Math.min(A.cw*.8,(S.h*.7)/9);const base=S.y+S.h-u*1.1;
      st.h.forEach((h,j)=>{const c=A.cols[j];if(st.hand===j){K.rr(g,c.x-4,S.y+u*.5,c.w+8,S.h-u*.8,u*.2);g.strokeStyle=GOLD;g.lineWidth=3;g.stroke();}
        for(let k=0;k<h;k++){K.rr(g,c.x+(c.w-cell)/2,base-(k+1)*cell+2,cell-2,cell-3,cell*.14);g.fillStyle=q.c.col;g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.5;g.stroke();if(k===h-1)K.emo(g,q.c.ic,c.x+c.w/2,base-(k+.5)*cell,cell*.7);}
        K.txt(g,q.names[j],c.x+c.w/2,base+u*.35,{size:Math.min(u*.42,c.w*.4),color:'#e9d5ff',maxW:c.w});K.txt(g,String(h),c.x+c.w/2,base+u*.8,{size:u*.5,color:'#fff'});});
      K.txt(g,st.hand>=0?'✋ 블록 1개를 들고 있어요 → 놓을 막대를 콕!':'높은 막대를 콕 → 낮은 막대를 콕',S.x+S.w/2,S.y+u*.65,{size:u*.5,color:'#ffe9a8',maxW:S.w*.95});
      if(st.lock)K.txt(g,st.okFlag?'평균 '+q.avg+q.c.u+'! 🎉':st.extra,S.x+S.w/2,S.y+S.h/2,{size:u*.9,color:st.okFlag?'#bef264':'#fecaca',stroke:INK,lw:u*.18,maxW:S.w*.9});}
    else if(ty==='avg'||ty==='miss'){K.txt(g,q.ctx.ic+' '+q.ctx.title+' ('+q.ctx.u+')',S.x+S.w/2,S.y+u*.7,{size:u*.55,color:'#fff',maxW:S.w*.9});this.bars(g,G,q.names,q.vals,null,S.x,S.y+u*.9,S.w,S.h-u*1.1,ty==='miss'?q.avg:null,ty==='miss'?q.hide:-1,u,q.ctx.hi*1.1);}
    else if(ty==='cmp'){K.txt(g,q.ctx.ic+' '+q.ctx.title+' ('+q.ctx.u+') — 사람 수가 달라도 평균으로 비교!',S.x+S.w/2,S.y+u*.7,{size:u*.45,color:'#fff',maxW:S.w*.95});const hw=S.w/2;this.bars(g,G,q.names,q.vals,'🅰️ 가 모둠',S.x,S.y+u*.9,hw,S.h-u*1.1,null,-1,u,q.ctx.hi*1.1);this.bars(g,G,q.v2.map((x,k)=>NM2[k]),q.v2,'🅱️ 나 모둠',S.x+hw,S.y+u*.9,hw,S.h-u*1.1,null,-1,u,q.ctx.hi*1.1);}
    else if(ty==='paint'||ty==='read'){const Wg=this.wheelGeo(G);this.wheel(g,Wg,st.seg,ty==='paint',st.spinA);
      if(ty==='paint'){const r=st.seg.filter(v=>v).length;K.txt(g,'🔴 '+r+'칸 · 🔵 '+(8-r)+'칸',S.x+S.w/2,S.y+S.h-u*.5,{size:u*.55,color:'#fff'});
        if(st.lock&&st.spinT>=1.6){const k=Math.floor((((TAU-(st.spinA%TAU))%TAU))/(TAU/8));K.txt(g,'🎯 결과: '+(st.seg[k]?'🔴 빨강!':'🔵 파랑!'),S.x+S.w/2,S.y+u*.7,{size:u*.8,color:GOLD,stroke:INK,lw:u*.15});}}}
    else{const bw=Math.min(S.w*.6,u*9),bh=Math.min(S.h*.55,u*5);const bx=S.x+(S.w-bw)/2,by=S.y+S.h*.2;K.card(g,bx,by,bw,bh,u*.3,'#92400e',{stroke:'#451a03',lw:4,blur:0,dy:u*.1});K.rr(g,bx+u*.3,by+u*.3,bw-u*.6,bh-u*.6,u*.2);g.fillStyle='#fde68a';g.fill();
      const tot=st.r+st.b;const cs=Math.min(u*.9,(bw-u*.8)/8);for(let i=0;i<tot;i++){const col=i%8,row=Math.floor(i/8);const cx=bx+bw/2-(Math.min(tot,8)-1)*cs/2+col*cs,cy=by+bh*.4+row*cs;g.fillStyle=i<st.r?'#ef4444':'#3b82f6';g.beginPath();g.arc(cx,cy,cs*.4,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.4)';g.beginPath();g.arc(cx-cs*.12,cy-cs*.12,cs*.12,0,TAU);g.fill();}
      if(!tot)K.txt(g,'빈 상자',bx+bw/2,by+bh/2,{size:u*.7,color:'#92400e'});K.txt(g,'🔴 '+st.r+'개 · 🔵 '+st.b+'개',S.x+S.w/2,S.y+S.h-u*.6,{size:u*.6,color:'#fff'});
      if(st.lock&&!st.okFlag)K.txt(g,'정답: '+q.reveal,S.x+S.w/2,S.y+u*.9,{size:u*.5,color:'#fecaca',maxW:S.w*.9});}
    if(st.lock&&q.ty!=='level'&&q.ty!=='balls'){const msg=st.okFlag||(q.opts&&st.pick===q.okIdx)?'정답! 🎉':'정답: '+q.reveal+(q.reveal2&&!st.okFlag?' ('+q.reveal2+')':'');K.txt(g,msg,S.x+S.w/2,S.y+S.h-u*(ty==='paint'?1.4:.5),{size:u*.55,color:(st.okFlag||(q.opts&&st.pick===q.okIdx))?'#bef264':'#fecaca',stroke:INK,lw:u*.12,maxW:S.w*.95});}
    if(!st.lock&&st.qmax>0)QZ.bar(g,S.x+u*.3,S.y+S.h+u*.03,S.w-u*.6,Math.max(6,u*.14),st.qt/st.qmax,{good:GOLD});
    G.btns.forEach(b=>{const isO=b.id[0]==='o';let bg=b.go?GOLD:'#5b2a86',ink=b.go?INK:'#fff',bd=GOLD;if(isO&&st.lock){if(b.i===q.okIdx){bg='#22c55e';ink='#052e16';}else if(b.i===st.pick){bg='#ef4444';ink='#fff';}else{bg='#3b1458';ink='#a78bfa';}}
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=bg;g.fill();g.lineWidth=3;g.strokeStyle=bd;g.stroke();K.txt(g,isO?q.opts[b.i]:b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.42,u*.9),color:ink,maxW:b.w*.92});});
  },
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1800,badMs:3400});
Engine.boot(GAME);
