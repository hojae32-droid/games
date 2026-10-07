/* 6학년 사회 · 세계 여러 나라 — 빙글빙글 지구본
   디자인: 깊은 우주 속 놋쇠 지구본. 손가락으로 돌려서 대륙·대양·나라를 찾아요. (세계지도 내장 — 인터넷 없이도 돼요) */
const TAU=Math.PI*2,D2R=Math.PI/180;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#14264f',GOLD='#ffd166',BRASS='#c89b3c';
const LOGO='<svg class="logo" viewBox="0 0 48 48"><circle cx="24" cy="23" r="15" fill="#2a7fd0" stroke="#ffe08a" stroke-width="3"/><path d="M15 17c4-4 8-1 9 2s-3 4-4 7-5 1-6-3 0-4 1-6zM28 24c3-2 6 0 6 3s-3 5-5 4-2-5-1-7z" fill="#f4e3b2"/><path d="M24 38v6M16 45h16" stroke="#ffe08a" stroke-width="3.5" stroke-linecap="round"/></svg>';
const DECKS=/*@@DECKS@@*/;
const CONT=/*@@CONT@@*/;
const L=/*@@L@@*/;
const KO=/*@@KO@@*/;
const ASK=/*@@ASK@@*/;
const OCEAN=/*@@OCEAN@@*/;
const WORLD=/*@@WORLD@@*/;
const OCEAN_TIP={pac:'가장 넓은 바다예요',atl:'아메리카와 유럽·아프리카 사이',ind:'아프리카와 오스트레일리아 사이',arc:'지구의 가장 북쪽 바다',sou:'남극 대륙을 둘러싼 바다'};
const OCEAN_PT={pac:[-160,0],atl:[-30,10],ind:[78,-20],arc:[0,85],sou:[60,-66]};
function oceanAt(lon,lat){
  if(lat>66)return'arc';if(lat<-60)return'sou';
  let west;if(lat>=17)west=-100;else if(lat>=8)west=-84;else if(lat>=-10)west=-78;else west=-69;
  if(lat>30){if(lon>west&&lon<45)return'atl';return'pac';}
  if(lon>west&&lon<20)return'atl';
  if(lon>=20&&lon<147&&lat<-8)return'ind';
  if(lon>=20&&lon<100&&lat<30)return'ind';
  return'pac';}
const contOf={};Object.entries(L).forEach(([k,v])=>v.split('|').forEach(n=>(contOf[n]=contOf[n]||[]).push(k)));
const jo=w=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?'을':'를';};
const ida=w=>{w=w.replace(/\(.*\)/,'');const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?'이에요':'예요';};
const koName=n=>KO[n]||n;
/* ───── 세계지도 풀기 (topojson → 나라별 다각형, 3차원 단위 벡터) ───── */
const MAP=(()=>{const T=WORLD,sc=T.transform.scale,tr=T.transform.translate;
  const arcs=T.arcs.map(a=>{let x=0,y=0;return a.map(([dx,dy])=>{x+=dx;y+=dy;return[x*sc[0]+tr[0],y*sc[1]+tr[1]];});});
  const ringOf=idx=>{const out=[];idx.forEach(i=>{let a=i<0?arcs[~i].slice().reverse():arcs[i];if(out.length)a=a.slice(1);for(const q of a)out.push(q);});return out;};
  const cs=[];
  T.objects.countries.geometries.forEach(geo=>{const name=geo.properties.name;if(name==='Fr. S. Antarctic Lands')return;
    const P=geo.type==='Polygon'?[geo.arcs]:geo.arcs;
    const polys=P.map(rs=>{const rings=rs.map(ringOf);const outer=rings[0];let a=1e9,b=1e9,c=-1e9,d=-1e9;outer.forEach(([x,y])=>{if(x<a)a=x;if(x>c)c=x;if(y<b)b=y;if(y>d)d=y;});
      const v=rings.map(r=>{const f=new Float32Array(r.length*3);r.forEach(([x,y],i)=>{const cl=Math.cos(y*D2R);f[i*3]=cl*Math.cos(x*D2R);f[i*3+1]=cl*Math.sin(x*D2R);f[i*3+2]=Math.sin(y*D2R);});return f;});
      return{rings,v,bb:[a,b,c,d],ar:(c-a)*(d-b)};});
    cs.push({name,polys,idx:cs.length});});
  return cs;})();
const BYNAME={};MAP.forEach(c=>BYNAME[c.name]=c);
function pip(x,y,rings){let ins=false;for(const r of rings){for(let i=0,j=r.length-1;i<r.length;j=i++){const a=r[i],b=r[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])ins=!ins;}}return ins;}
function countryAt(lon,lat){for(const c of MAP)for(const p of c.polys){const b=p.bb;if(lon<b[0]||lon>b[2]||lat<b[1]||lat>b[3])continue;if(pip(lon,lat,p.rings))return c;}return null;}
const _in={};
/* 나라(또는 대륙)에서 확실히 육지 안쪽인 점 하나 */
function insidePt(c){if(_in[c.name])return _in[c.name];const p=c.polys.reduce((a,b)=>b.ar>a.ar?b:a);const b=p.bb;const cx=(b[0]+b[2])/2,cy=(b[1]+b[3])/2;let best=null,bd=1e9;const N=14;
  for(let i=0;i<=N;i++)for(let j=0;j<=N;j++){const x=b[0]+(b[2]-b[0])*i/N,y=b[1]+(b[3]-b[1])*j/N;if(pip(x,y,p.rings)){const d=Math.hypot(x-cx,y-cy);if(d<bd){bd=d;best=[x,y];}}}
  return _in[c.name]=best||[cx,cy];}
/* 한 대륙에서 가장 큰 나라의 안쪽 점 */
function contPt(k){const cs=MAP.filter(c=>(contOf[c.name]||[])[0]===k);const big=cs.reduce((a,b)=>b.polys[0].ar>a.polys[0].ar?b:a);return insidePt(big);}
/* ───── 지구본 그리기 ───── */
const BUF=new Float32Array(60000);
function basis(lon0,lat0){const l=lon0*D2R,f=lat0*D2R;return{ex:-Math.sin(l),ey:Math.cos(l),nx:-Math.sin(f)*Math.cos(l),ny:-Math.sin(f)*Math.sin(l),nz:Math.cos(f),cx:Math.cos(f)*Math.cos(l),cy:Math.cos(f)*Math.sin(l),cz:Math.sin(f)};}
function projLL(B,lon,lat,R){const cl=Math.cos(lat*D2R),X=cl*Math.cos(lon*D2R),Y=cl*Math.sin(lon*D2R),Z=Math.sin(lat*D2R);
  return{x:(X*B.ex+Y*B.ey)*R,y:-(X*B.nx+Y*B.ny+Z*B.nz)*R,vis:X*B.cx+Y*B.cy+Z*B.cz>0};}
/* 한 고리를 보이는 쪽만 경로로 만들기(뒤쪽은 가장자리에 붙여요). 보이는 점이 하나도 없으면 false */
function ringPath(g,v,B,cx,cy,R){const n=v.length/3;let m=0,any=false,pd=0,px=0,py=0,pvis=0;
  for(let i=0;i<n;i++){const X=v[i*3],Y=v[i*3+1],Z=v[i*3+2];const d=X*B.cx+Y*B.cy+Z*B.cz,x=X*B.ex+Y*B.ey,y=X*B.nx+Y*B.ny+Z*B.nz;let sx,sy,vis=d>=0?1:0;
    if(vis){sx=x;sy=y;any=true;}else{const l=Math.hypot(x,y)||1e-9;sx=x/l;sy=y/l;}
    if(i>0&&vis!==pvis){const t=pd/(pd-d);const qx=px+(x-px)*t,qy=py+(y-py)*t;const l=Math.hypot(qx,qy)||1e-9;BUF[m++]=qx/l;BUF[m++]=qy/l;}
    BUF[m++]=sx;BUF[m++]=sy;pd=d;px=x;py=y;pvis=vis;if(m>BUF.length-8)break;}
  if(!any)return false;g.moveTo(cx+BUF[0]*R,cy-BUF[1]*R);for(let i=2;i<m;i+=2)g.lineTo(cx+BUF[i]*R,cy-BUF[i+1]*R);g.closePath();return true;}
function graticule(g,B,cx,cy,R){g.beginPath();
  const line=pts=>{let pen=false;for(const[lo,la]of pts){const q=projLL(B,lo,la,R);if(!q.vis){pen=false;continue;}pen?g.lineTo(cx+q.x,cy+q.y):g.moveTo(cx+q.x,cy+q.y);pen=true;}};
  for(let lo=-180;lo<180;lo+=30){const a=[];for(let la=-90;la<=90;la+=4)a.push([lo,la]);line(a);}
  for(let la=-60;la<=60;la+=30){const a=[];for(let lo=-180;lo<=180;lo+=4)a.push([lo,la]);line(a);}
  g.stroke();}
const HLC={win:['#ffd166','#fff3b0'],ans:['#ff7a59','#ffc2a8'],miss:['#ff5252','#ffb3b3'],hint:['#9be28f','#d9f7d4']};
function globe(g,cx,cy,R,lon0,lat0,o){o=o||{};const B=basis(lon0,lat0);const T=o.t||0;
  K.glow(g,cx,cy,R*1.35,'#6fb4ff',.28);
  g.save();g.beginPath();g.arc(cx,cy,R,0,TAU);
  const sea=g.createRadialGradient(cx-R*.35,cy-R*.4,R*.1,cx,cy,R*1.05);sea.addColorStop(0,'#4fc3f7');sea.addColorStop(.55,'#1b72c4');sea.addColorStop(1,'#0a2f6b');g.fillStyle=sea;g.fill();g.clip();
  g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=Math.max(1,R*.006);graticule(g,B,cx,cy,R);
  const hl=o.hl||{};
  g.lineJoin='round';g.lineWidth=Math.max(.8,R*.005);g.strokeStyle='rgba(90,60,10,.65)';
  for(const c of MAP){const kind=hl[c.idx];g.beginPath();let drew=false;for(const p of c.polys)for(const v of p.v)if(ringPath(g,v,B,cx,cy,R))drew=true;if(!drew)continue;
    let fill='#efe0b0';if(kind){const hc=HLC[kind],pul=(kind==='ans'||kind==='win')?.5+.5*Math.sin(T*6):0;fill=pul>.5?hc[1]:hc[0];}else if(o.dim&&o.dim[c.idx])fill='#d9c78f';
    g.fillStyle=fill;g.fill('evenodd');g.stroke();}
  const sh=g.createRadialGradient(cx-R*.4,cy-R*.45,R*.2,cx,cy,R);sh.addColorStop(0,'rgba(255,255,255,.18)');sh.addColorStop(.55,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,10,50,.55)');g.fillStyle=sh;g.beginPath();g.arc(cx,cy,R,0,TAU);g.fill();
  g.restore();
  g.lineWidth=Math.max(2,R*.035);g.strokeStyle=BRASS;g.beginPath();g.arc(cx,cy,R*1.015,0,TAU);g.stroke();
  g.lineWidth=Math.max(1,R*.01);g.strokeStyle='#ffe9a8';g.beginPath();g.arc(cx,cy,R*1.03,Math.PI*1.15,Math.PI*1.55);g.stroke();}
function stars(g,W,H,t,n){for(let i=0;i<n;i++){const x=(i*7919%1000)/1000*W,y=(i*104729%997)/997*H,s=.6+((i*31)%5)*.35;g.fillStyle=`rgba(255,255,255,${.25+.35*Math.abs(Math.sin(t*.8+i))})`;g.fillRect(x,y,s,s);}}
function space(g,W,H,t){K.vgrad(g,0,0,W,H,['#050b1f','#0a1b45','#06122e']);stars(g,W,H,t,70);}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    space(g,W0,H0,T);const R=Math.min(W0*.4,H0*.4);const cx=W0/2,cy=H0*.52;globe(g,cx,cy,R,T*14-40,18+Math.sin(T*.4)*10,{t:T});
    const a=T*.7;const sx=cx+Math.cos(a)*R*1.45,sy=cy+Math.sin(a)*R*.42-R*.25;const fr=Math.sin(a)>0;
    if(fr||Math.abs(sx-cx)>R){g.fillStyle=GOLD;g.beginPath();g.arc(sx,sy,Math.max(3,R*.05),0,TAU);g.fill();K.glow(g,sx,sy,R*.18,'#ffe08a',.6);}
    K.emo(g,'🧭',W0*.14,H0*.8,Math.min(W0,H0)*.16,Math.sin(T)*.3);K.emo(g,'⭐',W0*.86,H0*.2,Math.min(W0,H0)*.09,T);};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'globe',title:'빙글빙글 지구본',title1:'세계 탐험 아틀라스',title2:'빙글빙글 지구본',emoji:LOGO,
  subtitle:'6학년 사회 · 세계 여러 나라',
  howto:'지구본을 손가락으로 <b>끌어서 돌리고</b>, 문제에 나온 곳을 <b>톡</b> 눌러요. ＋ － 로 크게 볼 수 있고, 가만히 있으면 힌트가 나와요. 빨리 찾을수록 점수가 커요!',
  how:p=>({continent:'<b>6대륙</b>을 찾아요',ocean:'<b>5대양</b>을 찾아요',country:'<b>세계 여러 나라</b>를 찾아요',mix:'대륙·대양·나라를 <b>섞어서</b> 찾아요'}[p.levelId]),
  theme:{c1:'#c89b3c',c2:'#1b72c4'},hero:heroScene,vignette:.1,durs:[90,150,240],levelTitle:'어디를 탐험할까요?',
  txt:{who:'누가 탐험가일까요?',dur:'탐험 시간',pace:'한 곳 찾는 시간',seat:'번 탐험가 ',go:'탐험 출발!',s1:'1. 탐험지',s2:'2. 방법',s3:'3. 이름'},
  levels:DECKS.map(d=>({id:d.key,g:'6학년',t:d.ic+' '+d.label,d:d.tag+' · '+d.desc})),
  summary:`<ul><li><b>6대륙</b>: 아시아·유럽·아프리카·북아메리카·남아메리카·오세아니아(그리고 남극 대륙)가 있어요. 우리나라는 <b>아시아</b>에 있어요.</li>
    <li><b>5대양</b>: 태평양(가장 넓음)·대서양·인도양·북극해·남극해예요.</li>
    <li>나라를 찾을 때는 먼저 <b>대륙</b>을 떠올리고, 이웃 나라와 바다를 기준으로 찾으면 쉬워요.</li></ul>`,
  geo(p){const W0=p.W,H0=p.H,u=p.u;const top=(p.top||0)+u*.5;const bot=H0-u*1.05;const A=Math.max(10,bot-top);const R=Math.min(W0*.47,A/2*.91);return{W:W0,H:H0,u,top,bot,R,cx:W0/2,cy:top+A/2,A};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,lon:127,lat:20,zoom:1,drag:null,vx:0,vy:0,spin:0,hl:{},mark:null,msg:'',msgT:0,hinted:false,wrongT:0,tgt:null});this.newQ(p);},
  pool(L0){const C=Object.keys(CONT).filter(k=>k!=='an').map(k=>'cont:'+k);const O=Object.keys(OCEAN).map(k=>'ocean:'+k);const N=ASK.map(n=>'country:'+n);
    return{continent:[...C,...C,'cont:an'],ocean:O.concat(O),country:N,mix:[...C,...O,...N.slice(0,14)]}[L0];},
  make(p,L0){const R=p.R;const s=p.deck(this.pool(L0),'g_'+L0);const[ty,key]=s.split(':');let name,text,rev,pt,sub;
    if(ty==='cont'){name=CONT[key];text='🌏 <b>'+name+'</b>'+jo(name)+' 찾아 눌러요';pt=contPt(key);const ex=MAP.filter(c=>(contOf[c.name]||[])[0]===key&&KO[c.name]).slice(0,4).map(c=>koName(c.name).replace(/\(.*\)/,'')).join('·');rev=name+(ex?' — '+ex+' 같은 나라가 있어요':'');}
    else if(ty==='ocean'){name=OCEAN[key];text='🌊 <b>'+name+'</b>의 바다를 찾아 눌러요';pt=OCEAN_PT[key];rev=name+' — '+OCEAN_TIP[key];}
    else{name=koName(key).replace(/\(.*\)/,'');text='🧭 <b>'+name+'</b>'+jo(name)+' 찾아 눌러요';pt=insidePt(BYNAME[key]);rev=name+' — '+(contOf[key]||[]).map(k=>CONT[k]).join('·')+'에 있어요';}
    return{ty,key,name,text,pt,review:rev,reveal:rev,ans:name,speak:name,home:[R.f()*360-180,R.f()*40-5]};},
  qtime(){return 22;},askHtml(q){return q.text;},askSub(q){return q.ty==='ocean'?'바다의 이름을 찾아요':q.ty==='cont'?'그 대륙에 있는 땅을 눌러요':'지구본을 돌려 나라를 찾아요';},
  isOk(q,i){return i===0;},tipOf(q){return q.reveal;},goodTip(q){return '딩동댕! '+q.name;},
  ptsOf(p,q,frac){return Math.round(50+50*frac);},
  onNew(p,q){const st=p.state;st.hl={};st.mark=null;st.msg='';st.hinted=false;st.vx=st.vy=0;st.spin=1.1;st.tgt={lon:q.home[0],lat:q.home[1]};},
  inAns(q,c){return q.ty==='cont'?(contOf[c.name]||[]).includes(q.key):q.ty==='country'?c.name===q.key:false;},
  paint(st,q,kind){st.hl={};if(q.ty==='ocean')return;MAP.forEach(c=>{if(this.inAns(q,c))st.hl[c.idx]=kind;});},
  onVerdict(p,q,ok,i,to){const st=p.state;this.paint(st,q,ok?'win':'ans');
    if(ok){st.msg='딩동댕! '+q.name;st.msgT=2;}
    else{st.msg='시간 끝! 여기가 '+q.name+ida(q.name);st.msgT=3;st.mark={lon:q.pt[0],lat:q.pt[1],ok:true,t:0};st.tgt={lon:q.pt[0],lat:q.pt[1]};st.zoom=1;}},
  hold(p){return false;},
  pos(p,x,y){const G=this.geo(p),st=p.state;const R=G.R*st.zoom;const dx=(x-G.cx)/R,dy=-(y-G.cy)/R;const r=Math.hypot(dx,dy);if(r>1)return null;
    const c=Math.sqrt(1-r*r),f0=st.lat*D2R,l0=st.lon*D2R;const lat=Math.asin(c*Math.sin(f0)+dy*Math.cos(f0));const lon=l0+Math.atan2(dx,c*Math.cos(f0)-dy*Math.sin(f0));let lo=lon/D2R;lo=((lo+540)%360)-180;return[lo,lat/D2R];},
  btns(p){const G=this.geo(p);const b=clamp(G.u*1.05,32,56);const x=G.W-b*.7-6,y0=G.bot-b*3.4;return[{k:'+',x:x-b/2,y:y0,w:b,h:b},{k:'-',x:x-b/2,y:y0+b*1.15,w:b,h:b},{k:'h',x:x-b/2,y:y0+b*2.3,w:b,h:b}];},
  down(p,x,y,e){const st=p.state;const q=st.q;if(!q)return;
    for(const b of this.btns(p))if(K.inRect(x,y,b)){if(b.k==='+')st.zoom=clamp(st.zoom*1.35,1,3.2);else if(b.k==='-')st.zoom=clamp(st.zoom/1.35,1,3.2);else{st.tgt={lon:127,lat:20};st.zoom=1;}p.Snd.tone&&p.Snd.tone(600,.05,'sine',.04);return;}
    const G=this.geo(p);if(Math.hypot(x-G.cx,y-G.cy)>G.R*st.zoom*1.02&&y>G.top-G.u)return;
    st.drag={x,y,lon:st.lon,lat:st.lat,moved:false,px:x,py:y,pt:performance.now()};st.tgt=null;st.spin=0;},
  move(p,x,y,down){const st=p.state,d=st.drag;if(!d||!down)return;const G=this.geo(p);const dx=x-d.x,dy=y-d.y;if(Math.hypot(dx,dy)>7)d.moved=true;if(!d.moved)return;
    const k=(90/(G.R*st.zoom))*1.15;st.lon=d.lon-dx*k;st.lat=clamp(d.lat+dy*k,-80,80);const now=performance.now(),dt=Math.max(8,now-d.pt);st.vx=(d.px-x)/dt*k*1000;st.vy=(y-d.py)/dt*k*1000;d.px=x;d.py=y;d.pt=now;},
  up(p,x,y,dd,e){const st=p.state,d=st.drag;st.drag=null;if(!d)return;if(d.moved){if(performance.now()-d.pt>90){st.vx=st.vy=0;}return;}this.tap(p,x,y);},
  tap(p,x,y){const st=p.state,q=st.q;if(!q||st.lock)return;const ll=this.pos(p,x,y);if(!ll)return;const G=this.geo(p);
    let c=countryAt(ll[0],ll[1]);
    if(!c&&q.ty!=='ocean'){/* 작은 나라·섬은 조금 빗나가도 잡아 줘요 */const snap=Math.max(9,G.R*st.zoom*.03),B=basis(st.lon,st.lat),R=G.R*st.zoom;const eps=snap/R*57.3*1.5;let bd=snap;
      for(const k of MAP)for(const pl of k.polys){const b=pl.bb;if(ll[0]<b[0]-eps||ll[0]>b[2]+eps||ll[1]<b[1]-eps||ll[1]>b[3]+eps)continue;for(const r of pl.rings)for(let i=0;i<r.length;i+=1){const s=projLL(B,r[i][0],r[i][1],R);if(!s.vis)continue;const dd=Math.hypot(G.cx+s.x-x,G.cy+s.y-y);if(dd<bd){bd=dd;c=k;}}}}
    let ok=false,what='';
    if(q.ty==='cont'){ok=!!c&&(contOf[c.name]||[]).includes(q.key);what=c?((contOf[c.name]||[]).map(k=>CONT[k]).join('·')||'다른 땅'):'바다';}
    else if(q.ty==='ocean'){const o=c?null:oceanAt(ll[0],ll[1]);ok=o===q.key;what=c?'육지':OCEAN[o];}
    else{ok=!!c&&c.name===q.key;what=c?koName(c.name).replace(/\(.*\)/,''):'바다';}
    st.mark={lon:ll[0],lat:ll[1],ok,t:0};
    if(ok){this.verdict(p,0,false);}
    else{const now=st.T;if(now-st.wrongT<.4)return;st.wrongT=now;const msg='거기는 '+what+'! 다시 찾아봐요';st.msg=msg;st.msgT=2;
      if(c&&q.ty!=='ocean'){st.hl={};st.hl[c.idx]='miss';setTimeout(()=>{if(st.hl[c.idx]==='miss')delete st.hl[c.idx];},700);}
      p.hit(false,{review:q.review,tip:msg,tipMs:1500,quiet:false});}},
  upd(p,dt){const st=p.state,q=st.q;if(!q)return;st.msgT-=dt;if(st.mark)st.mark.t+=dt;
    if(st.tgt&&!st.drag){let dl=st.tgt.lon-st.lon;dl=((dl+540)%360)-180;const k=Math.min(1,dt*(st.spin?5:4));st.lon+=dl*k;st.lat+=(clamp(st.tgt.lat,-70,70)-st.lat)*k;if(Math.abs(dl)<.3&&Math.abs(st.tgt.lat-st.lat)<.3)st.tgt=null;}
    else if(!st.drag&&(st.vx||st.vy)){st.lon+=st.vx*dt;st.lat=clamp(st.lat+st.vy*dt,-80,80);const f=Math.pow(.03,dt);st.vx*=f;st.vy*=f;if(Math.abs(st.vx)<.5&&Math.abs(st.vy)<.5)st.vx=st.vy=0;}
    else if(!st.drag&&!st.tgt&&!st.lock&&!q.hov){}
    st.lon=((st.lon+540)%360)-180;
    const el=st.qmax-st.qt;
    if(!st.hinted&&!st.lock&&el>9/Math.max(.8,p.pace)&&q.ty!=='cont'){st.hinted=true;st.msg='💡 힌트: '+(q.ty==='ocean'?OCEAN_TIP[q.key]:(contOf[q.key]||[]).map(k=>CONT[k]).join('·')+'에 있어요');st.msgT=6;}
    if(!st.hinted&&!st.lock&&el>9/Math.max(.8,p.pace)&&q.ty==='cont'){st.hinted=true;const ex=MAP.filter(c=>(contOf[c.name]||[])[0]===q.key&&KO[c.name]).slice(0,2).map(c=>koName(c.name).replace(/\(.*\)/,'')).join('·');st.msg='💡 힌트: '+(ex?ex+'이(가) 있는 곳이에요':'가장 아래쪽 하얀 땅이에요');st.msgT=6;}},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);st.tgt=null;st.drag=null;st.zoom=1;st.lon=q.pt[0];st.lat=clamp(q.pt[1],-70,70);const s=projLL(basis(st.lon,st.lat),q.pt[0],q.pt[1],G.R);const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+G.cx+s.x,y:rc.top+G.cy+s.y};},
  draw(p,g){const st=p.state,G=this.geo(p),W0=G.W,H0=G.H,u=G.u,t=st.T,q=st.q;if(!q)return;space(g,W0,H0,t);
    g.save();g.beginPath();g.rect(0,G.top-u*.45,W0,G.bot-G.top+u*.9);g.clip();
    const R=G.R*st.zoom;const hl=st.hl;globe(g,G.cx,G.cy,R,st.lon,st.lat,{hl,t});
    if(st.mark){const m=st.mark,B=basis(st.lon,st.lat),s=projLL(B,m.lon,m.lat,R);if(s.vis){const x=G.cx+s.x,y=G.cy+s.y,k=Math.min(1,m.t/.35);const col=m.ok?'#ffd166':'#ff5252';
      g.strokeStyle=col;g.lineWidth=Math.max(2,u*.08);g.beginPath();g.arc(x,y,u*(.25+.5*(1-k)+.12*Math.sin(t*8)),0,TAU);g.stroke();g.fillStyle=col;g.beginPath();g.arc(x,y,Math.max(3,u*.12),0,TAU);g.fill();
      if(!m.ok&&m.t>.9)st.mark=null;}}
    g.restore();
    /* 위쪽 시간 막대 */
    if(!st.lock&&st.qmax>0){const bw=Math.min(W0*.5,u*10);QZ.bar(g,W0/2-bw/2,(p.top||0)+u*.12,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:GOLD});}
    /* 확대·축소·처음으로 */
    this.btns(p).forEach(b=>{K.rr(g,b.x,b.y,b.w,b.h,b.w*.28);g.fillStyle='rgba(15,29,63,.88)';g.fill();g.lineWidth=2;g.strokeStyle=BRASS;g.stroke();
      if(b.k==='h'){K.emo(g,'🧭',b.x+b.w/2,b.y+b.h/2,b.w*.62);}else K.txt(g,b.k==='+'?'＋':'－',b.x+b.w/2,b.y+b.h/2,{size:b.w*.62,color:GOLD});});
    if(st.zoom>1.05)K.txt(g,'×'+st.zoom.toFixed(1),G.W-u*.9,G.top+u*.2,{size:u*.4,color:'#9fb4d9',maxW:u*2});
    if(st.msgT>0&&st.msg)K.txt(g,st.msg,W0/2,H0-u*.5,{size:Math.min(u*.72,W0*.042),color:st.res==='ok'?'#fff3b0':'#fff',stroke:'#050b1f',lw:u*.14,maxW:W0*.94});
    else if(!st.lock)K.txt(g,'끌어서 돌리고 톡 눌러요',W0/2,H0-u*.5,{size:Math.min(u*.5,W0*.032),color:'#9fb4d9',maxW:W0*.9});
    K.card(g,u*.3,(p.top||0)+u*.5,u*3.6,u*.8,u*.2,'rgba(15,29,63,.9)',{stroke:BRASS,lw:2,blur:0,dy:0});K.txt(g,'🧭 '+(st.okN||0)+'곳 발견',u*.3+u*1.8,(p.top||0)+u*.9,{size:u*.44,color:'#ffe9a8',maxW:u*3.2});
  },
};
QZ.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1500,badMs:3000});
Engine.boot(GAME);
