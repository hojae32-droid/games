/* 3~4학년 수학 · 그림그래프 · 막대그래프 · 꺾은선그래프 — 날씨 방송국
   디자인: 'ON AIR' 불이 켜진 TV 스튜디오. 그래프에서 답을 직접 눌러 짚어 주고, 빈 막대와 점은 끌어 올려 그래프를 완성하면 시청률이 쑥쑥 올라가요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#08142a',SKY='#38bdf8',AMB='#f59e0b';
const LOGO=gkLogo('#173560','#38bdf8','📺');
const LV={
  '3-2':{g:'3학년 2학기',t:'그림그래프',d:'읽기 · 짚기 · 그림 붙여 만들기'},
  '4-1a':{g:'4학년 1학기',t:'막대그래프 읽기',d:'눈금 한 칸 · 막대 짚기 · 비교'},
  '4-1b':{g:'4학년 1학기',t:'막대그래프 그리기',d:'표를 보고 막대 끌어 올리기'},
  '4-2':{g:'4학년 2학기',t:'꺾은선그래프',d:'변화 짚기 · 중간값 어림 · 점 찍기'},
};
const J=(w,j)=>{const c=w.charCodeAt(w.length-1);if(c<0xAC00||c>0xD7A3)return w+(j==='을'?'를':j==='은'?'는':'가');const b=(c-0xAC00)%28===0;return w+(j==='을'?(b?'를':'을'):j==='은'?(b?'는':'은'):(b?'가':'이'));};
const PIC=[{title:'마을별 사과 수확량',what:'사과 수확량',u:'상자',ic:'🍎',big:10,cats:['가 마을','나 마을','다 마을','라 마을','마 마을']},
  {title:'지역별 비 온 날수',what:'비 온 날수',u:'일',ic:'☔',big:10,cats:['서울','부산','대구','광주','강릉']},
  {title:'농장별 귤 생산량',what:'귤 생산량',u:'kg',ic:'🍊',big:100,cats:['햇살 농장','바람 농장','구름 농장','별빛 농장']}];
const BAR=[{title:'이번 달 날씨별 날수',u:'일',cats:['맑음','흐림','비','눈']},{title:'좋아하는 계절',u:'명',cats:['봄','여름','가을','겨울']},{title:'도시별 미세먼지 나쁨 날수',u:'일',cats:['서울','인천','대전','울산']},{title:'우리 반 우산 색깔',u:'개',cats:['빨강','파랑','노랑','초록']}];
const LINE=[{title:'오늘의 기온 변화',what:'기온',u:'℃',step:1,lo:10,mv:[-2,-1,1,2,3,4],t:['9시','10시','11시','12시','1시','2시'],mid:['9시 30분','10시 30분','11시 30분','12시 30분','1시 30분']},
  {title:'강아지 몸무게 변화',what:'몸무게',u:'kg',step:1,lo:2,mv:[1,2,0,1,3],t:['1월','2월','3월','4월','5월','6월'],mid:['1월 15일','2월 15일','3월 15일','4월 15일','5월 15일']},
  {title:'강물 높이 변화',what:'강물 높이',u:'cm',step:2,lo:20,mv:[-3,-1,1,2,4,5],t:['월','화','수','목','금','토'],mid:['월요일 밤','화요일 밤','수요일 밤','목요일 밤','금요일 밤']}];
function hero(g,W,H,T,u){K.vgrad(g,0,0,W,H,['#10243f','#1d4577']);const bx=W*.12,by=H*.18,bw=W*.76,bh=H*.62;K.card(g,bx,by,bw,bh,u*.3,'#f8fbff',{stroke:'#38bdf8',lw:4,blur:0,dy:0});
  const n=5;for(let i=0;i<n;i++){const h=bh*.7*(.3+.7*Math.abs(Math.sin(T*.8+i)));g.fillStyle=i%2?'#38bdf8':'#f59e0b';g.fillRect(bx+bw*(.1+i*.17),by+bh*.85-h,bw*.1,h);}
  g.fillStyle='#ef4444';K.rr(g,W*.72,H*.06,W*.16,H*.1,u*.15);g.fill();K.txt(g,'● ON AIR',W*.8,H*.11,{size:H*.06,color:'#fff',maxW:W*.15});}
const GAME={
  id:'weathertv',title:'날씨 방송국',title1:'ON AIR 스튜디오',title2:'날씨 방송국',emoji:LOGO,
  subtitle:'3~4학년 수학 · 그림그래프 · 막대그래프 · 꺾은선그래프',
  howto:'오늘의 기상 캐스터는 바로 나! 그래프에서 답을 <b>직접 눌러</b> 짚어 주고, 빈 막대와 점은 <b>끌어 올려</b> 그래프를 완성해요. 정확하게 방송하면 <b>시청률</b>이 쑥쑥 올라가요! 📈',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#0369a1',c2:AMB},hero:gkHero(hero),vignette:.03,durs:[120,180,300],levelTitle:'어떤 방송을 할까요?',
  txt:{who:'누가 캐스터일까요?',dur:'방송 시간',pace:'생각하는 시간',seat:'번 캐스터 ',go:'방송 시작!',s1:'1. 방송',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>그림그래프</b>: 그림의 크기로 수량을 나타내요. 큰 그림과 작은 그림이 각각 얼마를 뜻하는지 범례를 먼저 확인해요.</li>
    <li><b>막대그래프</b>: 막대의 길이로 수량을 비교해요. 세로 눈금 한 칸이 얼마인지 먼저 살펴보고, 막대 끝이 가리키는 눈금을 읽어요.</li>
    <li><b>꺾은선그래프</b>: 시간에 따라 변하는 양을 선으로 이어 나타내요. 선이 오르면 늘어난 것, 내리면 줄어든 것이고, 기울기가 클수록 많이 변한 거예요. 두 점 사이의 값은 가운데 쯤으로 어림해요.</li></ul>`,
  /* 레이아웃 */
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.35,q=p.state.q;let rows=[];
    if(q){if(q.labels)rows=[q.labels.map((t,i)=>({id:'o'+i,t,i}))];
      else if(q.ty==='picmake')rows=[[{id:'big',t:'+ 큰 그림 '+gkComma(q.ctx.big)},{id:'sm',t:'+ 작은 그림 '+gkComma(q.ctx.big/10)},{id:'clr',t:'↩ 지우기'}],[{id:'ok',t:'📡 방송하기!',go:1}]];
      else if(q.ty==='bardraw'||q.ty==='linedraw'){const nm=q.ty==='bardraw'?q.cats:q.times;rows=[q.edit.map(j=>({id:'u'+j,t:'▲ '+nm[j],j,d:1})),q.edit.map(j=>({id:'d'+j,t:'▼ '+nm[j],j,d:-1})),[{id:'ok',t:'📡 방송하기!',go:1}]];}}
    const rowH=Math.min(u*1.55,(H-top)*.1);const ctrlH=rows.length?rows.length*rowH+(rows.length-1)*u*.2:0;const oy=H-pad-ctrlH;const gap=u*.2;const list=[];
    rows.forEach((row,r)=>{const w=(W-pad*2-gap*(row.length-1))/row.length;row.forEach((b,c)=>list.push(Object.assign({},b,{x:pad+c*(w+gap),y:oy+r*(rowH+gap),w,h:rowH})));});
    const barH=Math.min(u*1.5,(H-top)*.1);const C={x:pad,y:top+barH+u*.2,w:W-pad*2,h:(rows.length?oy-u*.3:H-pad)-(top+barH+u*.2)};
    return{W,H,u,top,pad,list,C,barH};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,rate:8,rshow:8,v:[],sel:-1,pb:0,ps:0,drag:false,okFlag:false});this.newQ(p);},
  make(p,L){const R=p.R,q={};const strip=s=>s.replace(/<[^>]+>/g,'');const fin=()=>{q.review=strip(q.text)+' → '+q.reveal;q.speak='';return q;};
    const numOpts=(ans,u)=>{const o=gkOpts3(R,ans,[ans+1,ans-1,ans+2,ans-2,ans+10,ans-10,ans*2].filter(x=>x>=0),v=>gkComma(v)+(u?' '+u:''));q.labels=o.labels;q.okIdx=o.okIdx;};
    if(L==='3-2'){const ctx=R.pick(PIC),big=ctx.big,cats=R.sample(ctx.cats,4);const vals=cats.map(()=>R.int(1,4)*big+R.int(0,big===10?6:5)*(big/10));if(new Set(vals).size<4)vals[0]+=big/10;
      q.ty='pic';q.ctx=ctx;q.cats=cats;q.vals=vals;q.unit=ctx.u;const k=R.pick(['read','most','least','total','diff','make','make']);
      if(k==='read'){const j=R.int(0,3);q.ans=vals[j];q.text='<b>'+cats[j]+'</b>의 '+J(ctx.what,'은')+' 몇 '+ctx.u+'일까요?';}
      else if(k==='most'||k==='least'){const v=k==='most'?Math.max(...vals):Math.min(...vals);q.tapAns=vals.indexOf(v);q.text=J(ctx.what,'이')+' <b>가장 '+(k==='most'?'많은':'적은')+'</b> 곳을 그래프에서 <b>눌러요!</b>';q.reveal=cats[q.tapAns]+'('+gkComma(v)+ctx.u+')';}
      else if(k==='total'){q.ans=vals.reduce((a,b)=>a+b,0);q.text='네 곳의 '+J(ctx.what,'은')+' <b>모두</b> 몇 '+ctx.u+'일까요?';}
      else if(k==='diff'){const[a,b]=R.sample([0,1,2,3],2);const hi=vals[a]>=vals[b]?a:b,lo=hi===a?b:a;q.ans=vals[hi]-vals[lo];q.text='<b>'+J(cats[hi],'은')+'</b> <b>'+cats[lo]+'</b>보다 몇 '+ctx.u+' 더 많을까요?';}
      else{q.ty='picmake';q.j=R.int(0,3);q.text='<b>'+cats[q.j]+'</b> '+gkComma(vals[q.j])+ctx.u+'! 그림을 붙여 그래프를 완성해요';q.reveal='큰 그림 '+Math.floor(vals[q.j]/big)+'개, 작은 그림 '+Math.round(vals[q.j]%big/(big/10))+'개';}
      if(q.ans!=null){q.reveal=gkComma(q.ans)+' '+ctx.u;numOpts(q.ans,ctx.u);}return fin();}
    if(L==='4-1a'||L==='4-1b'){const ctx=R.pick(BAR),step=R.pick([1,2,5]),cats=ctx.cats.slice(0,4);const vals=cats.map(()=>R.int(1,9)*step);while(new Set(vals).size<4)vals[R.int(0,3)]=R.int(1,9)*step;Object.assign(q,{ctx,cats,vals,step,max:step*10,unit:ctx.u,ty:'bar'});
      if(L==='4-1b'){q.ty='bardraw';q.edit=R.sample([0,1,2,3],R.pick([2,2,3])).sort((a,b)=>a-b);q.text='표를 보고 <b>빈 막대</b>를 끌어 올려 그려요!';q.reveal=q.edit.map(j=>cats[j]+' '+vals[j]+ctx.u+'('+vals[j]/step+'칸)').join(', ');return fin();}
      const k=R.pick(['scale','read','read','most','least','diff','over']);
      if(k==='scale'){q.ans=step;q.text='세로 눈금 <b>한 칸</b>은 몇 '+J(ctx.u,'을')+' 나타낼까요?';}
      else if(k==='read'){const j=R.int(0,3);q.ans=vals[j];q.text='<b>'+J(cats[j],'은')+'</b> 몇 '+ctx.u+'일까요?';}
      else if(k==='most'||k==='least'){const v=k==='most'?Math.max(...vals):Math.min(...vals);q.tapAns=vals.indexOf(v);q.text='<b>가장 '+(k==='most'?'많은':'적은')+'</b> 막대를 <b>눌러요!</b>';q.reveal=cats[q.tapAns];}
      else if(k==='over'){const j=R.int(0,3),v=vals[j];const cand=[0,1,2,3].filter(k2=>k2!==j&&vals[k2]<v);if(!cand.length){q.ans=v;q.text='<b>'+J(cats[j],'은')+'</b> 몇 '+ctx.u+'일까요?';}else{const o=R.pick(cand);q.ans=(v-vals[o])/step;q.text='<b>'+cats[j]+'</b> 막대는 <b>'+cats[o]+'</b> 막대보다 눈금 몇 칸 더 높을까요?';q.unit='칸';}}
      else{const j=vals.indexOf(Math.max(...vals)),m=vals.indexOf(Math.min(...vals));q.ans=vals[j]-vals[m];q.text='가장 많은 것과 가장 적은 것의 차는 몇 '+ctx.u+'일까요?';}
      if(q.ans!=null){q.reveal=q.ans+' '+q.unit;numOpts(q.ans,q.unit);}return fin();}
    const ctx=R.pick(LINE),n=6,step=ctx.step;let v=R.int(ctx.lo,ctx.lo+4)*step;const vals=[];for(let k=0;k<n;k++){vals.push(v);v=Math.max(step,v+R.pick(ctx.mv)*step);}
    q.ty='line';q.ctx=ctx;q.vals=vals;q.times=ctx.t;q.step=step;q.unit=ctx.u;const k=R.pick(['read','most','mid','trend','draw','draw']);
    if(k==='read'){const j=R.int(0,n-1);q.ans=vals[j];q.text='<b>'+ctx.t[j]+'</b>의 '+J(ctx.what,'은')+' 몇 '+ctx.u+'일까요?';q.reveal=q.ans+' '+ctx.u;numOpts(q.ans,ctx.u);}
    else if(k==='most'){const d=vals.slice(1).map((x,j)=>Math.abs(x-vals[j]));const mx=Math.max(...d);if(d.filter(x=>x===mx).length>1){vals[n-1]=vals[n-2]+mx+step;d[n-2]=mx+step;}q.tapAns=d.indexOf(Math.max(...d));q.seg=true;q.text=J(ctx.what,'이')+' <b>가장 많이 변한</b> 선분을 <b>눌러요!</b>';q.reveal=ctx.t[q.tapAns]+'~'+ctx.t[q.tapAns+1];}
    else if(k==='mid'){let j=0;for(let t=0;t<20;t++){j=R.int(0,n-2);if((vals[j]+vals[j+1])%2===0&&vals[j]!==vals[j+1])break;}if((vals[j]+vals[j+1])%2){vals[j+1]+=step;if((vals[j]+vals[j+1])%2)vals[j+1]+=1;}q.ans=(vals[j]+vals[j+1])/2;q.text='<b>'+ctx.mid[j]+'</b>의 '+J(ctx.what,'은')+' 약 몇 '+ctx.u+'였을까요? (두 점 사이의 가운데)';q.reveal='약 '+q.ans+' '+ctx.u;numOpts(q.ans,ctx.u);}
    else if(k==='trend'){let j=R.int(0,n-2);if(vals[j]===vals[j+1])vals[j+1]+=step;const up=vals[j+1]>vals[j];q.text='<b>'+ctx.t[j]+'</b>부터 <b>'+ctx.t[j+1]+'</b>까지 '+J(ctx.what,'은')+'?';q.labels=['늘었어요 ↗','줄었어요 ↘'];q.okIdx=up?0:1;q.reveal=up?'늘었어요':'줄었어요';}
    else{q.ty='linedraw';q.edit=R.sample([1,2,3,4,5],2).sort((a,b)=>a-b);q.text='표를 보고 <b>빈 점</b>을 끌어 올려 찍어요!';q.reveal=q.edit.map(j=>ctx.t[j]+' '+vals[j]+ctx.u).join(', ');}
    q.lo=Math.max(0,Math.min(...vals)-step*2);q.hi=Math.max(...vals)+step*2;return fin();},
  qtime(q){return q.ty==='bardraw'||q.ty==='linedraw'||q.ty==='picmake'?50:25;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return '📺 '+q.text;},askSub(q){return q.tapAns!=null?'그래프에서 직접 눌러요':q.edit?'막대(점)를 위아래로 끌거나 ▲▼ 버튼':q.ty==='picmake'?'버튼으로 그림을 붙여요':'알맞은 답을 눌러요';},
  isOk(q,i,p){return !!p.state.okFlag;},tipOf(q){return '정답: '+q.reveal;},goodTip(q){return '방송 성공! '+q.reveal;},
  ptsOf(p,q,frac){return Math.round(55+50*frac);},
  onNew(p,q){const st=p.state;st.okFlag=false;st.pb=0;st.ps=0;st.sel=-1;st.drag=false;st.tapped=-1;
    if(q.ty==='bardraw'){st.v=q.vals.map((v,j)=>q.edit.includes(j)?0:v);st.sel=q.edit[0];}else if(q.ty==='linedraw'){st.v=q.vals.map((v,j)=>q.edit.includes(j)?null:v);st.sel=q.edit[0];}},
  onVerdict(p,q,ok){const st=p.state;st.rate=clamp(st.rate+(ok?1.5+Math.random()*1.5:-2),1,99);},
  /* 차트 기하 */
  bg(G,q){const C=G.C,u=G.u;const tbl=q.ty==='bardraw'||q.ty==='linedraw'?u*2.4:0;const left=u*2,x0=C.x+left,y0=C.y+C.h-u*1.2,top=C.y+u*.6+tbl;const n=q.cats?q.cats.length:q.vals.length;return{x0,y0,top,tbl,left,n,w:C.x+C.w-x0-u*.3};},
  barPos(G,q){const B=this.bg(G,q);const bw=B.w/q.cats.length,ky=(B.y0-B.top)/q.max;return Object.assign(B,{bw,ky});},
  linePos(G,q){const B=this.bg(G,q);const n=q.vals.length;const dx=(B.w-B.left*.5-G.u*.4)/(n-1);const ky=(B.y0-B.top)/(q.hi-q.lo);return Object.assign(B,{dx,ky,X:j=>B.x0+G.u*.9+j*dx,Y:v=>B.y0-(v-q.lo)*ky});},
  setFromPt(p,x,y,first){const st=p.state,q=st.q,G=this.geo(p);
    if(q.ty==='bardraw'){const B=this.barPos(G,q);const j=Math.floor((x-B.x0)/B.bw);if(first){if(!q.edit.includes(j))return false;st.sel=j;}let v=Math.round((B.y0-y)/B.ky/q.step)*q.step;st.v[st.sel]=clamp(v,0,q.max);return true;}
    if(q.ty==='linedraw'){const B=this.linePos(G,q);const j=Math.round((x-B.X(0))/B.dx);if(first){if(!q.edit.includes(j))return false;st.sel=j;}let v=q.lo+Math.round((B.y0-y)/B.ky/q.step)*q.step;st.v[st.sel]=clamp(v,q.lo,q.hi);return true;}return false;},
  down(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const G=this.geo(p);
    const b=G.list.find(b=>K.inRect(x,y,b));if(b){p.Snd.tap&&p.Snd.tap();
      if(b.i!=null){st.okFlag=b.i===q.okIdx;this.verdict(p,b.i,false);return;}
      if(b.id==='big'){if(st.pb<9)st.pb++;return;}if(b.id==='sm'){if(st.ps<9)st.ps++;return;}if(b.id==='clr'){st.pb=0;st.ps=0;return;}
      if(b.j!=null){st.sel=b.j;const lo=q.ty==='bardraw'?0:q.lo,hi=q.ty==='bardraw'?q.max:q.hi;const cur=st.v[b.j];st.v[b.j]=cur==null?lo:clamp(cur+b.d*q.step,lo,hi);return;}
      if(b.id==='ok'){this.submit(p);}return;}
    if(q.tapAns!=null){const k=this.tapIdx(p,x,y);if(k>=0){st.tapped=k;st.okFlag=k===q.tapAns;this.verdict(p,k,false);}return;}
    if(q.edit&&this.setFromPt(p,x,y,true)){st.drag=true;}},
  move(p,x,y,down){const st=p.state;if(st.drag&&down&&!st.lock)this.setFromPt(p,x,y,false);},up(p){p.state.drag=false;},
  tapIdx(p,x,y){const q=p.state.q,G=this.geo(p);
    if(q.ty==='pic'){const R=this.picRows(G,q);return R.findIndex(r=>y>=r.y&&y<=r.y+r.h&&x>=r.x&&x<=r.x+r.w);}
    if(q.ty==='bar'){const B=this.barPos(G,q);const j=Math.floor((x-B.x0)/B.bw);return j>=0&&j<q.cats.length&&y>B.top-G.u&&y<B.y0+G.u*.8?j:-1;}
    if(q.ty==='line'){const B=this.linePos(G,q);let best=-1,bd=G.u*.7;for(let j=0;j<q.vals.length-1;j++){const x1=B.X(j),y1=B.Y(q.vals[j]),x2=B.X(j+1),y2=B.Y(q.vals[j+1]);const dx=x2-x1,dy=y2-y1;const t=clamp(((x-x1)*dx+(y-y1)*dy)/(dx*dx+dy*dy),0,1);const d=Math.hypot(x-(x1+t*dx),y-(y1+t*dy));if(d<bd){bd=d;best=j;}}return best;}return -1;},
  submit(p){const st=p.state,q=st.q;
    if(q.ty==='picmake'){const v=q.vals[q.j],big=q.ctx.big;st.okFlag=st.pb===Math.floor(v/big)&&st.ps===Math.round(v%big/(big/10));this.verdict(p,0,false);}
    else if(q.ty==='bardraw'){st.okFlag=q.edit.every(j=>st.v[j]===q.vals[j]);this.verdict(p,0,false);}
    else if(q.ty==='linedraw'){if(q.edit.some(j=>st.v[j]==null)){p.Snd.bad&&p.Snd.bad();return;}st.okFlag=q.edit.every(j=>st.v[j]===q.vals[j]);this.verdict(p,0,false);}},
  upd(p,dt){const st=p.state;st.rshow+=(st.rate-st.rshow)*Math.min(1,dt*3);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const rc=p.cv.getBoundingClientRect();const cl=r=>({k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2});
    if(q.labels)return cl(G.list[q.okIdx]);
    if(q.tapAns!=null){if(q.ty==='pic'){const r=this.picRows(G,q)[q.tapAns];return cl(r);}if(q.ty==='bar'){const B=this.barPos(G,q);return{k:'click',x:rc.left+B.x0+(q.tapAns+.5)*B.bw,y:rc.top+B.y0-G.u};}
      const B=this.linePos(G,q),j=q.tapAns;return{k:'click',x:rc.left+(B.X(j)+B.X(j+1))/2,y:rc.top+(B.Y(q.vals[j])+B.Y(q.vals[j+1]))/2};}
    if(q.ty==='picmake'){const v=q.vals[q.j],big=q.ctx.big;st.pb=Math.floor(v/big);st.ps=Math.round(v%big/(big/10));}else if(q.ty==='bardraw'){q.edit.forEach(j=>st.v[j]=q.vals[j]);}else if(q.ty==='linedraw'){q.edit.forEach(j=>st.v[j]=q.vals[j]);}
    return cl(G.list.find(b=>b.id==='ok'));},
  picRows(G,q){const C=G.C,u=G.u;const n=q.cats.length;const legH=u*1.3;const rh=(C.h-legH-u*.3)/n;return q.cats.map((c,j)=>({x:C.x+u*.3,y:C.y+u*.2+j*rh,w:C.w-u*.6,h:rh*.92}));},
  /* ── 그리기 ── */
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,q=st.q,t=st.T;if(!q)return;
    K.vgrad(g,0,0,W,H,['#10243f','#1b3f6e']);
    /* 방송 상단 바 */
    const by=G.top;K.card(g,G.pad,by,W-G.pad*2,G.barH,u*.25,'rgba(8,20,42,.9)',{stroke:SKY,lw:3,blur:0,dy:0});K.emo(g,st.res==='bad'?'😱':st.res==='ok'?'😄':'🧑‍💼',G.pad+G.barH*.6,by+G.barH*.5,G.barH*.8);
    K.txt(g,q.ctx.title,W/2,by+G.barH*.5,{size:Math.min(u*.85,G.barH*.5),color:'#e8f1ff',maxW:W*.45});
    K.rr(g,W-G.pad-u*9.2,by+G.barH*.15,u*2.6,G.barH*.7,u*.15);g.fillStyle='#ef4444';g.fill();K.txt(g,'● ON AIR',W-G.pad-u*7.9,by+G.barH*.5,{size:u*.5,color:'#fff',maxW:u*2.4});
    K.txt(g,'📈 '+st.rshow.toFixed(1)+'%',W-G.pad-u*3.1,by+G.barH*.5,{size:Math.min(u*.8,G.barH*.5),color:st.res==='bad'?'#fca5a5':'#bbf7d0',maxW:u*5.6});
    /* 차트 패널 */
    const C=G.C;K.card(g,C.x,C.y,C.w,C.h,u*.3,'#f8fbff',{stroke:SKY,lw:Math.max(3,u*.08),blur:u*.3,dy:u*.06});
    if(q.ty==='pic'||q.ty==='picmake')this.drawPic(g,G,q,st);else if(q.ty==='bar'||q.ty==='bardraw')this.drawBar(g,G,q,st);else this.drawLine(g,G,q,st);
    if(!st.lock&&st.qmax>0){QZ.bar(g,C.x+C.w-u*7.2,C.y+C.h+u*.05<H?C.y+u*.1:C.y,u*7,Math.max(5,u*.16),st.qt/st.qmax,{good:SKY});}
    G.list.forEach(b=>{let fill='#173560',ink='#e8f1ff',line=SKY;if(b.go){fill=st.lock?'#64748b':'#ef4444';ink='#fff';line='#fecaca';}if(b.i!=null&&st.lock){fill=b.i===q.okIdx?'#16a34a':b.i===st.pick?'#dc2626':'#0b1a33';}
      K.rr(g,b.x,b.y,b.w,b.h,u*.25);g.fillStyle=fill;g.fill();g.lineWidth=3;g.strokeStyle=line;g.stroke();K.txt(g,b.t,b.x+b.w/2,b.y+b.h/2,{size:Math.min(b.h*.45,u*.9),color:ink,maxW:b.w*.92});});
    if(st.lock)K.txt(g,st.okFlag?'📡 방송 성공!':'📵 방송 사고!',W/2,C.y+C.h*.5,{size:u*1.2,color:st.okFlag?'#bbf7d0':'#fecaca',stroke:INK,lw:u*.25,maxW:W*.8});
  },
  drawPic(g,G,q,st){const u=G.u,c=q.ctx,big=c.big,sm=big/10;const rows=this.picRows(G,q);const fs=Math.min(u*.85,rows[0].h*.5);
    rows.forEach((r,j)=>{const good=st.lock&&q.tapAns===j,bad=st.lock&&st.tapped===j&&!st.okFlag;K.rr(g,r.x,r.y,r.w,r.h,u*.2);g.fillStyle=good?'#bbf7d0':bad?'#fecaca':j%2?'#eef6ff':'#fff';g.fill();g.strokeStyle='#cbd5e1';g.lineWidth=2;g.stroke();
      K.txt(g,q.cats[j],r.x+u*2.2,r.y+r.h/2,{size:fs,color:INK,maxW:u*4.2});
      const edit=q.ty==='picmake'&&j===q.j;const nb=edit?st.pb:Math.floor(q.vals[j]/big),ns=edit?st.ps:Math.round(q.vals[j]%big/sm);const bs=Math.min(r.h*.8,u*1.5),ss=bs*.6;let x=r.x+u*4.8;
      for(let k=0;k<nb;k++){K.emo(g,c.ic,x+bs*.5,r.y+r.h/2,bs);x+=bs*1.05;}for(let k=0;k<ns;k++){K.emo(g,c.ic,x+ss*.5,r.y+r.h/2,ss);x+=ss*1.05;}
      if(edit&&!nb&&!ns)K.txt(g,'여기에 그림을 붙여요',r.x+u*5+u*3,r.y+r.h/2,{size:u*.6,color:'#94a3b8',maxW:r.w-u*6});
      if(edit){g.strokeStyle='#f59e0b';g.setLineDash([8,6]);g.lineWidth=3;g.strokeRect(r.x+2,r.y+2,r.w-4,r.h-4);g.setLineDash([]);}});
    const ly=G.C.y+G.C.h-u*.65;K.emo(g,c.ic,G.C.x+u*1.2,ly,u*.9);K.txt(g,'= '+gkComma(big)+c.u,G.C.x+u*3.4,ly,{size:u*.6,color:INK,maxW:u*4,align:'left'});K.emo(g,c.ic,G.C.x+u*6.4,ly,u*.55);K.txt(g,'= '+gkComma(sm)+c.u,G.C.x+u*8.2,ly,{size:u*.6,color:INK,maxW:u*4,align:'left'});},
  tableBar(g,G,names,vals,unit,B){const u=G.u,C=G.C;const n=names.length,w=(C.w-u*1)/(n+1),y=C.y+u*.2,h=u*2;g.lineWidth=2;g.strokeStyle='#475569';[['',names],[unit,vals]].forEach(([lab,arr],r)=>{for(let i=0;i<=n;i++){const x=C.x+u*.5+i*w;g.fillStyle=i===0||r===0?'#e0f2fe':'#fff';g.fillRect(x,y+r*h/2,w,h/2);g.strokeRect(x,y+r*h/2,w,h/2);K.txt(g,i===0?String(lab):String(arr[i-1]),x+w/2,y+r*h/2+h/4,{size:Math.min(u*.6,h*.28),color:INK,maxW:w*.92});}});},
  drawBar(g,G,q,st){const u=G.u,B=this.barPos(G,q),draw=q.ty==='bardraw';if(draw)this.tableBar(g,G,q.cats,q.vals,q.unit,B);const vals=draw?st.v:q.vals;
    g.lineWidth=1;const ev=Math.max(1,Math.ceil(u*.62/(B.ky*q.step)));for(let v=0,i=0;v<=q.max;v+=q.step,i++){const y=B.y0-v*B.ky;g.strokeStyle='#cbd5e1';g.beginPath();g.moveTo(B.x0,y);g.lineTo(B.x0+B.w,y);g.stroke();if(i%ev===0)K.txt(g,String(v),B.x0-u*.2,y,{size:u*.5,color:'#334155',maxW:u*1.6,align:'right'});}
    K.txt(g,'('+(q.unit==='칸'?q.ctx.u:q.unit)+')',B.x0-u*1.0,B.top-u*.35,{size:u*.45,color:'#475569',maxW:u*2});g.strokeStyle='#334155';g.lineWidth=Math.max(2,u*.06);g.beginPath();g.moveTo(B.x0,B.top);g.lineTo(B.x0,B.y0);g.lineTo(B.x0+B.w,B.y0);g.stroke();
    q.cats.forEach((c,j)=>{const x=B.x0+j*B.bw,ed=draw&&q.edit.includes(j),v=vals[j];const good=st.lock&&q.tapAns===j,bad=st.lock&&st.tapped===j&&!st.okFlag;
      if(ed){g.fillStyle=st.sel===j?'#fef3c7':'#fffbeb';g.fillRect(x+B.bw*.1,B.top,B.bw*.8,B.y0-B.top);g.strokeStyle='#f59e0b';g.setLineDash([6,5]);g.lineWidth=2;g.strokeRect(x+B.bw*.1,B.top,B.bw*.8,B.y0-B.top);g.setLineDash([]);}
      g.fillStyle=bad?'#f87171':good?'#4ade80':ed?AMB:SKY;g.fillRect(x+B.bw*.2,B.y0-v*B.ky,B.bw*.6,v*B.ky);g.strokeStyle='#0c4a6e';g.lineWidth=2;g.strokeRect(x+B.bw*.2,B.y0-v*B.ky,B.bw*.6,v*B.ky);
      if(ed&&v>0){g.fillStyle='#b45309';K.rr(g,x+B.bw*.2,B.y0-v*B.ky-u*.12,B.bw*.6,u*.24,u*.1);g.fill();}
      if(st.lock&&draw&&!st.okFlag&&ed){g.strokeStyle='#16a34a';g.setLineDash([5,4]);g.lineWidth=3;g.strokeRect(x+B.bw*.2,B.y0-q.vals[j]*B.ky,B.bw*.6,q.vals[j]*B.ky);g.setLineDash([]);}
      K.txt(g,c,x+B.bw/2,B.y0+u*.55,{size:Math.min(u*.65,B.bw*.2),color:INK,maxW:B.bw*.95});});},
  drawLine(g,G,q,st){const u=G.u,B=this.linePos(G,q),draw=q.ty==='linedraw';if(draw)this.tableBar(g,G,q.times,q.vals,q.ctx.u,B);const vals=draw?st.v:q.vals;
    const every=Math.ceil((q.hi-q.lo)/q.step/9);for(let v=q.lo,i=0;v<=q.hi;v+=q.step,i++){const y=B.Y(v);g.strokeStyle='#e2e8f0';g.lineWidth=1;g.beginPath();g.moveTo(B.x0,y);g.lineTo(B.x0+B.w,y);g.stroke();if(i%every===0)K.txt(g,String(v),B.x0-u*.2,y,{size:u*.5,color:'#334155',maxW:u*1.6,align:'right'});}
    K.txt(g,'('+q.ctx.u+')',B.x0-u*1.0,B.top-u*.35,{size:u*.45,color:'#475569',maxW:u*2});g.strokeStyle='#334155';g.lineWidth=Math.max(2,u*.06);g.beginPath();g.moveTo(B.x0,B.top);g.lineTo(B.x0,B.y0);g.lineTo(B.x0+B.w,B.y0);g.stroke();
    if(q.lo>0){g.beginPath();g.moveTo(B.x0-u*.2,B.y0-u*.3);g.lineTo(B.x0+u*.2,B.y0-u*.45);g.moveTo(B.x0-u*.2,B.y0-u*.1);g.lineTo(B.x0+u*.2,B.y0-u*.25);g.stroke();}
    if(draw)q.edit.forEach(j=>{g.fillStyle=st.sel===j?'#fef3c7':'#fffbeb';g.fillRect(B.X(j)-B.dx*.4,B.top,B.dx*.8,B.y0-B.top);g.strokeStyle=AMB;g.setLineDash([6,5]);g.lineWidth=2;g.strokeRect(B.X(j)-B.dx*.4,B.top,B.dx*.8,B.y0-B.top);g.setLineDash([]);});
    for(let j=0;j<q.vals.length-1;j++){if(vals[j]==null||vals[j+1]==null)continue;const good=st.lock&&q.tapAns===j,bad=st.lock&&st.tapped===j&&!st.okFlag;g.strokeStyle=bad?'#7f1d1d':good?'#16a34a':'#ef4444';g.lineWidth=Math.max(3,u*.1);g.lineCap='round';g.beginPath();g.moveTo(B.X(j),B.Y(vals[j]));g.lineTo(B.X(j+1),B.Y(vals[j+1]));g.stroke();}
    vals.forEach((v,j)=>{const ed=draw&&q.edit.includes(j);if(v!=null){g.fillStyle=ed?AMB:'#fff';g.strokeStyle='#ef4444';g.lineWidth=Math.max(2.5,u*.08);g.beginPath();g.arc(B.X(j),B.Y(v),ed?u*.26:u*.18,0,TAU);g.fill();g.stroke();}
      if(st.lock&&draw&&!st.okFlag&&ed){g.strokeStyle='#16a34a';g.lineWidth=3;g.beginPath();g.arc(B.X(j),B.Y(q.vals[j]),u*.32,0,TAU);g.stroke();}K.txt(g,q.times[j],B.X(j),B.y0+u*.55,{size:Math.min(u*.65,B.dx*.3),color:INK,maxW:B.dx*.95});});},
};
QZ.mix(GAME,{say:false,pts0:55,pts1:50,okMs:1700,badMs:3400});
Engine.boot(GAME);
