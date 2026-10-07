/* 1·2·4학년 수학 · 규칙 찾기 — 노래하는 구슬 목걸이
   디자인: 반짝이는 보석 가게. 구슬이 딩동댕 노래하며 줄에 꿰어져요. 규칙을 찾아 ? 자리에 알맞은 구슬을 끼우면 목걸이가 춤춰요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#6b1d5c',PK='#db2777';
const LOGO=gkLogo('#fbcfe8','#9d174d','📿');
const LV={
  '1-2a':{g:'1~2학년',t:'모양과 색깔 규칙',d:'반복되는 규칙 찾기',time:16},
  '1-2b':{g:'1~2학년',t:'수 배열 규칙',d:'몇씩 커지는(작아지는) 규칙',time:18},
  '2-2a':{g:'1~2학년',t:'덧셈표·곱셈표 규칙',d:'표에서 규칙 찾기',time:22},
  '2-2b':{g:'1~2학년',t:'생활 속 규칙',d:'달력 · 무늬 · 수 배열',time:22},
  '4-1':{g:'4학년',t:'수와 계산식 배열',d:'곱해지는 규칙 · 계산식 규칙',time:30},
};
const BEADS=[{name:'빨간 동그라미',c:'#ef4444',s:'c'},{name:'파란 네모',c:'#3b82f6',s:'s'},{name:'노란 별',c:'#facc15',s:'t'},{name:'초록 세모',c:'#22c55e',s:'tr'},{name:'보라 하트',c:'#a855f7',s:'h'},{name:'주황 동그라미',c:'#f97316',s:'c'}];
const SCALE=[523,587,659,784,880,1047,1175,1319];
function beadArt(g,b,x,y,r,o){o=o||{};g.save();g.translate(x,y);g.lineWidth=Math.max(2,r*.14);g.strokeStyle='#4a1d4f';g.lineJoin='round';
  if(o.num!=null){g.fillStyle='#fbcfe8';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.stroke();K.txt(g,String(o.num),0,r*.04,{size:r*([1.1,1.1,1.1,.95,.8,.65,.6][String(o.num).length]||.5),color:'#831843',maxW:r*1.8});g.restore();return;}
  g.fillStyle=b.c;g.beginPath();
  if(b.s==='c'){g.arc(0,0,r,0,TAU);}
  else if(b.s==='s'){K.rr(g,-r,-r,2*r,2*r,r*.25);}
  else if(b.s==='tr'){g.moveTo(0,-r*1.1);g.lineTo(r*1.1,r*.85);g.lineTo(-r*1.1,r*.85);g.closePath();}
  else if(b.s==='h'){g.moveTo(0,r*.9);g.bezierCurveTo(-r*1.6,-r*.2,-r*.6,-r*1.3,0,-r*.45);g.bezierCurveTo(r*.6,-r*1.3,r*1.6,-r*.2,0,r*.9);}
  else{for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.48:r*1.15;k?g.lineTo(rr*Math.cos(a),rr*Math.sin(a)):g.moveTo(rr*Math.cos(a),rr*Math.sin(a));}g.closePath();}
  g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.arc(-r*.35,-r*.35,r*.2,0,TAU);g.fill();g.restore();}
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#fdeaf6','#f5d0fe']);for(let i=0;i<14;i++){const x=(i*97)%100/100*W,y=(i*53)%100/100*H,s=.5+.5*Math.sin(T*2+i);g.fillStyle='rgba(255,255,255,'+s+')';g.beginPath();g.arc(x,y,u*.08+u*.06*s,0,TAU);g.fill();}
  const n=9;for(let k=0;k<n;k++){const t=(k+1)/(n+1);const x=W*.1+t*W*.8,y=H*.25+Math.sin(t*Math.PI)*H*.35+Math.sin(T*3+k)*u*.1;beadArt(g,BEADS[k%6],x,y,u*.4);}
  g.strokeStyle='#9ca3af';g.lineWidth=2;g.beginPath();g.moveTo(W*.1,H*.25);g.quadraticCurveTo(W*.5,H*.95,W*.9,H*.25);g.stroke();}
const GAME={
  id:'beads',title:'노래하는 구슬 목걸이',title1:'반짝반짝 보석 가게',title2:'노래하는 구슬 목걸이',emoji:LOGO,
  subtitle:'1·2·4학년 수학 · 규칙 찾기',
  howto:'구슬이 <b>딩동댕</b> 노래하며 줄에 꿰어져요. 규칙을 찾아 <b>?</b> 자리에 맞는 구슬(수)을 끼우면 목걸이가 노래를 불러요! 완성한 목걸이는 진열장에 모아요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:PK,c2:'#7c3aed'},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 목걸이를 만들까요?',
  txt:{who:'누가 목걸이를 만들까요?',dur:'작업 시간',pace:'생각하는 시간',seat:'번 장인 ',go:'목걸이 만들기!',s1:'1. 목걸이',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>규칙 찾기</b>: 되풀이되는 무늬나 수의 변화를 살펴 다음에 올 것을 찾아요.</li>
    <li><b>수 배열</b>: 몇씩 커지는지(작아지는지) 알아보고 그만큼 더하거나 빼요.</li>
    <li><b>덧셈표·곱셈표</b>: 가로줄과 세로줄을 더하거나 곱한 값이 칸에 들어가요. <b>달력</b>은 한 주 뒤가 7일 뒤예요.</li>
    <li><b>계산식 배열</b>: 같은 모양으로 변하는 식의 규칙(예: 곱하는 수가 10배씩)을 찾아 다음 식을 써요.</li></ul>`,
  geo(p){const q=p.state.q;const n=q?q.nOpt:3;const cols=q&&q.ty==='eq'&&p.W<p.H?1:(q&&q.ty==='eq'?3:3);return gkGeo(p,n,cols,2.4);},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,made:0,qT:0,played:0});this.newQ(p);},
  make(p,L){const R=p.R;let q={};const lv=L;
    if(lv==='1-2a'||(lv==='2-2b'&&R.chance(.3))){const units=[[0,1],[0,0,1],[0,1,1],[0,1,2],[0,1,2,2],[0,0,1,1]];const u=R.pick(lv==='1-2a'?units:units.slice(3));
      const types=R.sample(BEADS,3);const len=Math.min(9,u.length*2+R.int(1,u.length));const seq=[];for(let k=0;k<len;k++)seq.push(u[k%u.length]);const pos=R.chance(.7)?len-1:R.int(Math.floor(len/2),len-2);
      q.ty='bead';q.beads=seq.map((t,k)=>k===pos?null:types[t]);q.pos=pos;q.ansBead=types[seq[pos]];const others=R.shuffle(types.filter(t=>t!==q.ansBead)).slice(0,2);if(others.length<2)others.push(BEADS.find(b=>!types.includes(b)));
      q.obeads=R.shuffle([q.ansBead,...others]);q.okIdx=q.obeads.indexOf(q.ansBead);q.nOpt=3;q.text='<b>?</b> 에 알맞은 구슬은?';q.reveal=q.ansBead.name+'이(가) 규칙대로 와요';}
    else if(lv==='1-2b'||(lv==='2-2b'&&R.chance(.4))){const st=R.pick([1,2,5,10,-1,-2,3]),n=6,a=st>0?R.int(1,99-st*n):R.int(-st*n+1,99);const seq=[];for(let k=0;k<n;k++)seq.push(a+st*k);const pos=R.chance(.6)?n-1:R.int(2,n-2);
      q.ty='num';q.ans=seq[pos];q.pos=pos;q.beads=seq.map((v,k)=>k===pos?null:{num:v});Object.assign(q,gkOpts3(R,q.ans,[q.ans+1,q.ans-1,q.ans+st,q.ans-st,q.ans+10,q.ans-10].filter(x=>x>=0),String));q.nOpt=3;
      q.text='<b>?</b> 에 알맞은 수는? <small>몇씩 '+(st>0?'커지는':'작아지는')+'지 살펴봐요</small>';q.reveal=Math.abs(st)+'씩 '+(st>0?'커져서 ':'작아져서 ')+q.ans;}
    else if(lv==='2-2a'){const mul=R.chance(.5),r0=R.int(mul?2:1,6),c0=R.int(mul?2:1,6);const rows=[r0,r0+1,r0+2],cols=[c0,c0+1,c0+2];const op=(a,b)=>mul?a*b:a+b;const mr=R.int(0,2),mc=R.int(0,2);q.ans=op(rows[mr],cols[mc]);
      q.ty='table';q.table={mul,rows,cols,mr,mc,op};Object.assign(q,gkOpts3(R,q.ans,[q.ans+1,q.ans-1,q.ans+(mul?rows[mr]:1),q.ans-(mul?cols[mc]:1),q.ans+2],String));q.nOpt=3;q.text=(mul?'곱셈표':'덧셈표')+'의 <b>?</b> 에 알맞은 수는?';q.reveal=rows[mr]+(mul?' × ':' + ')+cols[mc]+' = '+q.ans;}
    else if(lv==='2-2b'){const day=R.int(1,9),k=R.int(1,3);q.ty='cal';q.cal={first:R.int(0,6),hi:day};q.ans=day+7*k;Object.assign(q,gkOpts3(R,q.ans,[day+k,day+5*k,q.ans+1,q.ans-1,day+10*k],v=>v+'일'));q.nOpt=3;q.text='달력에서 <b>'+day+'일</b>과 같은 요일인 날 중 <b>'+k+'주 뒤</b>는 며칠일까요?';q.reveal=day+' + 7×'+k+' = '+q.ans+'일 (7일씩 커져요)';}
    else{if(R.chance(.5)){const m=R.pick([2,3,10]),a=m===10?R.pick([1,2,3]):R.pick([1,2,3,5,4]);const seq=[];for(let k=0;k<5;k++)seq.push(a*Math.pow(m,k));q.ty='num';q.ans=seq[4];q.pos=4;q.beads=seq.map((v,k)=>k===4?null:{num:v});
        Object.assign(q,gkOpts3(R,q.ans,[seq[3]+(seq[3]-seq[2]),q.ans*m,q.ans/m*(m+1),q.ans+m],gkComma));q.nOpt=3;q.text='<b>?</b> 에 알맞은 수는? <small>몇 배씩 커지는지 살펴봐요</small>';q.reveal=m+'배씩 커져서 '+gkComma(q.ans);}
      else{const kind=R.pick(['add','mul','sub']);const lines=[];
        if(kind==='add'){const a=R.int(1,4)*100+R.int(1,3),b=R.int(2,6)*100+R.int(0,3);for(let k=0;k<5;k++)lines.push([a+k*10,'+',b+k*10]);}
        else if(kind==='sub'){const a=R.int(5,8)*100+R.int(50,80),b=R.int(1,3)*100+R.int(10,40);for(let k=0;k<5;k++)lines.push([a+k*100,'-',b+k*100]);}
        else{const d=R.pick([1,3]);for(let k=1;k<=5;k++){const ones=Number('1'.repeat(k));lines.push(d===1?[ones,'×',ones]:[ones*9,'×',9]);}}
        const ev=l=>l[1]==='+'?l[0]+l[2]:l[1]==='-'?l[0]-l[2]:l[0]*l[2];q.ty='eq';q.lines=lines.slice(0,4).map(l=>l[0]+' '+l[1]+' '+l[2]+' = '+ev(l));const last=lines[4];const right=last[0]+' '+last[1]+' '+last[2]+' = '+ev(last);
        const w1=last[0]+' '+last[1]+' '+last[2]+' = '+(ev(last)+(kind==='mul'?last[0]:10)),w2=lines[3][0]+' '+last[1]+' '+last[2]+' = '+ev([lines[3][0],last[1],last[2]]),w3=last[0]+' '+last[1]+' '+last[2]+' = '+(ev(last)-(kind==='mul'?1:100));
        let o=R.shuffle([right,w1,w2,w3]).slice(0,3);if(!o.includes(right))o[0]=right;o=R.shuffle(o);q.labels=o;q.okIdx=o.indexOf(right);q.nOpt=3;q.text='다섯째 계산식으로 알맞은 것은?';q.reveal=right;}}
    q.review=q.text.replace(/<[^>]+>/g,'')+' → '+q.reveal;q.speak=q.text.replace(/<[^>]+>/g,'');q.speak=q.speak.replace('?','물음표');return q;},
  qtime(q){return LV[this._p.levelId].time;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return q.text;},askSub(q){return q.beads?'규칙을 찾아 알맞은 것을 눌러요':'알맞은 답을 눌러요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+45*frac);},
  note(q,k){if(q.ty==='num'){const v=q.beads[k]?q.beads[k].num:q.ans;return SCALE[((v%8)+8)%8];}const b=q.beads[k]||q.ansBead;return SCALE[BEADS.indexOf(b)%SCALE.length];},
  onNew(p,q){const st=p.state;st.qT=0;st.played=0;st.fill=0;st.dance=0;},
  onVerdict(p,q,ok,i,to){const st=p.state;st.fill=0;if(ok){st.made++;st.dance=0;}},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);const i=gkHit(G.list,x,y);if(i>=0)this.verdict(p,i,false);},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;st.qT+=dt;if(st.fill!=null&&st.lock)st.fill=Math.min(1,st.fill+dt*2.2);if(st.res==='ok')st.dance+=dt;
    if(q.beads){const n=q.beads.length;while(st.played<n&&st.qT>.15+st.played*.17){const k=st.played++;if(q.beads[k]!==null&&p.Snd.tone)p.Snd.tone(this.note(q,k),.25,'sine',.05);}
      if(st.res==='ok'&&!st.sung){st.sung=true;}}if(!st.lock)st.sung=false;
    if(st.res==='ok'&&q.beads){const k=Math.floor((st.dance-.3)/.13);if(k>=0&&k<q.beads.length&&k!==st.lastK){st.lastK=k;p.Snd.tone&&p.Snd.tone(this.note(q,k),.22,'sine',.06);}}else st.lastK=-1;},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.list[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#fdeaf6','#f5d0fe']);for(let i=0;i<16;i++){const x=(i*97)%100/100*W,y=G.top+((i*53)%100/100)*(G.oy-G.top),s=.5+.5*Math.sin(t*2+i);g.fillStyle='rgba(255,255,255,'+(.4+.5*s)+')';g.beginPath();g.arc(x,y,u*.07+u*.05*s,0,TAU);g.fill();}
    K.card(g,G.bx,G.by,G.bw,G.bh,u*.4,'rgba(255,255,255,.7)',{stroke:'#9d174d',lw:Math.max(3,u*.08),blur:u*.3,dy:u*.08});
    if(q.beads)this.drawNecklace(p,g,G);else if(q.ty==='table')this.drawTable(g,G,q);else if(q.ty==='cal')this.drawCal(g,G,q);else this.drawEq(g,G,q);
    if(!st.lock&&st.qmax>0){const bw=Math.min(W*.4,u*8);QZ.bar(g,W-bw-u*.3,G.by+u*.2,bw,Math.max(6,u*.2),st.qt/st.qmax,{good:'#a855f7'});}
    K.card(g,u*.5,G.by+u*.2,u*3.1,u*.75,u*.37,'rgba(255,255,255,.95)',{stroke:'#9d174d',lw:3,blur:0,dy:0});K.txt(g,'💎 '+st.made+'개',u*.5+u*1.55,G.by+u*.58,{size:u*.5,color:INK,maxW:u*2.7});
    G.list.forEach((r,i)=>{let s='idle';if(st.lock)s=i===q.okIdx?'ok':(i===st.pick?'bad':'dim');
      if(q.obeads){QK.card(g,u,r,'',s,{fill:'#fff',bd:'#9d174d',rad:u*.4,blur:0});beadArt(g,q.obeads[i],r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.32,u*.95));}
      else QK.card(g,u,r,q.labels[i],s,{fill:'#fff',bd:'#9d174d',ink:INK,rad:u*.4,blur:0});});
  },
  drawNecklace(p,g,G){const st=p.state,q=st.q,n=q.beads.length,u=G.u,t=st.T;const x0=G.bx+u*.8,x1=G.bx+G.bw-u*.8,yT=G.by+G.bh*.2,sag=G.bh*.62;const P=s=>{const a=(1-s)*(1-s),b=2*(1-s)*s,c=s*s;return[a*x0+b*(x0+x1)/2+c*x1,a*yT+b*(yT+sag)+c*yT];};
    g.strokeStyle='#9ca3af';g.lineWidth=Math.max(2,u*.06);g.beginPath();for(let s=0;s<=1.001;s+=.02){const[x,y]=P(s);s?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();
    const r=Math.min(u*1.0,(x1-x0)/(n+1)*.42,G.bh*.17);
    for(let k=0;k<n;k++){const s=(k+1)/(n+1);let[x,y]=P(s);const ap=clamp((st.qT-.15-k*.17)/.25,0,1);if(ap<=0)continue;y-=(1-ap)*u*2;g.save();g.globalAlpha=ap;
      let dy=0,sc=1;if(st.res==='ok'){const d=st.dance-.3-k*.13;if(d>0&&d<.4){dy=-Math.sin(d/.4*Math.PI)*u*.7;sc=1+.25*Math.sin(d/.4*Math.PI);}}
      const b=q.beads[k];
      if(b===null){const f=st.lock?st.fill:0;if(!st.lock||st.res==='bad'&&f<1&&false){}
        if(st.lock&&st.res==='ok'){const ob=q.ty==='bead'?q.ansBead:null;const ry=y+dy;if(ob)beadArt(g,ob,x,ry,r*sc);else beadArt(g,null,x,ry,r*sc,{num:q.ans});}
        else if(st.lock&&st.res==='bad'&&st.pick>=0){const ob=q.ty==='bead'?q.obeads[st.pick]:null;g.globalAlpha=ap*.8;if(ob)beadArt(g,ob,x,y+Math.abs(Math.sin(st.rT*8))*-u*.2,r);else beadArt(g,null,x,y,r,{num:q.vals[st.pick]});}
        else{g.fillStyle='#fff';g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.setLineDash([u*.18,u*.14]);g.lineWidth=Math.max(2.5,u*.08);g.strokeStyle=PK;g.stroke();g.setLineDash([]);K.txt(g,'?',x,y+r*.05,{size:r*1.2,color:PK,maxW:r*1.6});}}
      else if(q.ty==='bead')beadArt(g,b,x,y+dy,r*sc);else beadArt(g,null,x,y+dy,r*sc,{num:b.num});
      g.restore();}},
  drawTable(g,G,q){const t=q.table,u=G.u,cs=Math.min(G.bw/5.2,G.bh/4.6);const x0=G.bx+(G.bw-cs*4)/2,y0=G.by+(G.bh-cs*4)/2+u*.2;
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){const x=x0+c*cs,y=y0+r*cs;const hd=r===0||c===0;const tg=r>0&&c>0&&r-1===t.mr&&c-1===t.mc;g.fillStyle=tg?'#fde68a':hd?'#fbcfe8':'#fff';g.fillRect(x,y,cs,cs);g.strokeStyle='#9d174d';g.lineWidth=Math.max(2,u*.06);g.strokeRect(x,y,cs,cs);
      const v=r===0&&c===0?(t.mul?'×':'+'):r===0?t.cols[c-1]:c===0?t.rows[r-1]:tg?'?':t.op(t.rows[r-1],t.cols[c-1]);K.txt(g,String(v),x+cs/2,y+cs/2+cs*.03,{size:cs*.5,color:tg?PK:INK,maxW:cs*.85});}},
  drawCal(g,G,q){const c=q.cal,u=G.u,cs=Math.min(G.bw/7.4,G.bh/7.2),x0=G.bx+(G.bw-cs*7)/2,y0=G.by+(G.bh-cs*7)/2+u*.2;
    ['일','월','화','수','목','금','토'].forEach((d,k)=>{K.txt(g,d,x0+k*cs+cs/2,y0+cs/2,{size:cs*.5,color:k===0?'#dc2626':k===6?'#2563eb':INK,maxW:cs*.9});});
    let col=c.first,row=1;for(let d=1;d<=30;d++){if(col===7){col=0;row++;}const x=x0+col*cs,y=y0+row*cs;const hl=d===c.hi;const qm=d>c.hi&&(d-c.hi)%7===0;g.fillStyle=hl?'#fde68a':qm?'#e9d5ff':'#fff';g.fillRect(x,y,cs,cs);g.strokeStyle='#d8b4d8';g.lineWidth=2;g.strokeRect(x,y,cs,cs);K.txt(g,qm?'?':String(d),x+cs/2,y+cs/2+cs*.03,{size:cs*.45,color:qm?PK:INK,maxW:cs*.9});col++;}},
  drawEq(g,G,q){const u=G.u,fs=Math.min(u*1.15,G.bh/6.5,G.bw/12);const lines=q.lines.concat(['?']);lines.forEach((l,i)=>{K.txt(g,l,G.bx+G.bw/2,G.by+G.bh*(.12+i*.76/4.5)+fs*.2,{size:fs,color:i===4?PK:INK,maxW:G.bw*.92});});},
};
QZ.mix(GAME,{say:true,pts0:55,pts1:45,okMs:1900,badMs:2900});
Engine.boot(GAME);
