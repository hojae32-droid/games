/* 3~6학년 음악 · 악기의 종류와 소리(서양 악기·국악기) — 무대 위 악기 자리
   디자인: 연주회 포스터 같은 오케스트라 무대. 악기 소리를 직접 들어 보고, 알맞은 악기 무리 자리에 앉혀서 연주단을 완성해요. 소리만 듣고 맞히는 단계도 있어요. */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#2a1f17',CRIM='#a4161a';
const SEC0=/*@@SEC@@*/;
const ITEMS0=/*@@ITEMS@@*/;
const HINT0=/*@@HINT@@*/;
const VO=/*@@VO@@*/;
const LV={
  play:{label:'연주 방법으로 나누기',desc:'켜는 · 뜯는 · 부는 · 치는 악기',tag:'3~4학년',ic:'🎻',deck:'play'},
  west:{label:'관현악단 자리 찾기',desc:'현악기 · 목관악기 · 금관악기 · 타악기',tag:'5~6학년',ic:'🎺',deck:'west'},
  korean:{label:'국악기 나누기',desc:'국악 현악기 · 관악기 · 타악기',tag:'5~6학년',ic:'🪘',deck:'korean'},
  palum:{label:'국악기 재료 (팔음)',desc:'쇠·돌·실·대나무·바가지·흙·가죽·나무',tag:'6학년 도전',ic:'🏺',deck:'palum'},
  hearW:{label:'소리만 듣고 맞히기 (관현악)',desc:'이름 없이 소리만 듣고 자리 찾기',tag:'5~6학년',ic:'👂',deck:'west',hear:true},
  hearK:{label:'소리만 듣고 맞히기 (국악기)',desc:'이름 없이 소리만 듣고 자리 찾기',tag:'5~6학년',ic:'🎧',deck:'korean',hear:true},
};
const LOGO='<svg class="logo" viewBox="0 0 48 48"><path d="M4 40h40" stroke="#2a1f17" stroke-width="3"/><circle cx="14" cy="30" r="6" fill="#a4161a" stroke="#2a1f17" stroke-width="2.5"/><circle cx="24" cy="26" r="6" fill="#c47f00" stroke="#2a1f17" stroke-width="2.5"/><circle cx="34" cy="30" r="6" fill="#1d4e89" stroke="#2a1f17" stroke-width="2.5"/><path d="M24 20V8l8 3" fill="none" stroke="#2a1f17" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b;};
function voice(p,name){const v=VO[name];if(!v)return;const vol=M.vol(p),t=M.now()+.04;if(v[0]==='P'){v[1].forEach(([h,d])=>M.hit(h,t+d,.85,{vol}));return;}
  const [inst,notes,gap,o,len]=v;const step=gap||.3;notes.forEach((m,i)=>M.play(inst,m,t+i*step,len||(gap?1:.32),.8,Object.assign({vol},o||{})));}
function curtain(g,W,H,u,t){K.vgrad(g,0,0,W,H,['#fffaf0','#f5ecd7']);g.fillStyle=CRIM;g.fillRect(0,0,W,u*.35);for(let x=0;x<W;x+=u*1.1){g.fillStyle='rgba(107,16,16,.3)';g.fillRect(x,0,u*.2,u*.35);}}
function stageFloor(g,x,y,w,h,u,t,spot){K.rr(g,x,y,w,h,u*.3);const gr=g.createLinearGradient(x,y,x,y+h);gr.addColorStop(0,'#3a2a20');gr.addColorStop(1,'#241812');g.fillStyle=gr;g.fill();
  g.save();K.rr(g,x,y,w,h,u*.3);g.clip();g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=2;for(let i=1;i<8;i++){g.beginPath();g.moveTo(x,y+h*i/8);g.lineTo(x+w,y+h*i/8);g.stroke();}
  const sp=g.createRadialGradient(x+w/2,y+h*.35,u,x+w/2,y+h*.4,w*.55);sp.addColorStop(0,'rgba(255,240,180,'+(.45+.1*Math.sin(t*2))+')');sp.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=sp;g.fillRect(x,y,w,h);g.restore();}
function heroScene(cv){const g=cv.getContext('2d');let raf=0,W0=0,H0=0,dpr=1,last=0,T=0,run=false;
  const size=()=>{const r=cv.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(10,r.width),h=Math.max(10,r.height);if(w===W0&&h===H0&&d===dpr)return;W0=w;H0=h;dpr=d;cv.width=Math.round(W0*dpr);cv.height=Math.round(H0*dpr);};
  const frame=now=>{if(!run)return;raf=requestAnimationFrame(frame);const dt=Math.max(0,Math.min(.05,(now-last)/1000||0));last=now;T+=dt;size();g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W0,H0);
    const u=Math.min(W0,H0)/6;curtain(g,W0,H0,u,T);stageFloor(g,u*.4,H0*.2,W0-u*.8,H0*.68,u,T);const names=[['켜는','#C1121F','🎻'],['뜯는','#C47F00','🎸'],['부는','#2A9D8F','🎺'],['치는','#577590','🥁']];const n=4,sw=(W0-u*1.6)/n;
    names.forEach((s,i)=>{const x=u*.8+i*sw,y=H0*.5+Math.sin(T*2+i)*u*.1;K.rr(g,x+4,H0*.55,sw-8,H0*.28,u*.2);g.fillStyle=s[1];g.fill();K.txt(g,s[0],x+sw/2,H0*.69,{size:u*.6,color:'#fff',maxW:sw*.8});K.emo(g,s[2],x+sw/2,y,Math.min(sw*.5,u*1.6));});};
  return{start(){if(run)return;run=true;last=performance.now();raf=requestAnimationFrame(frame);},stop(){run=false;cancelAnimationFrame(raf);}};}
const GAME={
  id:'orchestra',title:'무대 위 악기 자리',title1:'오케스트라 연주회',title2:'무대 위 악기 자리',emoji:LOGO,
  subtitle:'3~6학년 음악 · 악기의 종류와 소리',
  howto:'무대 위로 악기가 올라와요. 이 악기가 앉을 <b>알맞은 자리</b>를 눌러요. 악기 카드를 누르면 <b>그 악기 소리</b>를 미리 들을 수 있어요! 맞히면 악기 소리가 나고 자리에 앉아요. 「소리만 듣고 맞히기」에서는 이름 없이 소리만 듣고 자리를 찾아요.',
  how:p=>(LV[p.levelId].label+' — '+LV[p.levelId].desc),
  theme:{c1:'#a4161a',c2:'#2a1f17'},hero:heroScene,vignette:.05,durs:[90,120,180],levelTitle:'어떤 연주단을 만들까요?',
  txt:{who:'누가 단원일까요?',dur:'연습 시간',pace:'생각하는 시간',seat:'번 단원 ',go:'연주회 시작!',s1:'1. 연주단',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:'3~6학년',t:v.ic+' '+v.label,d:v.tag+' · '+v.desc})),
  summary:`<ul><li>악기는 소리 내는 방법에 따라 <b>켜는(활로 켜는) · 뜯는 · 부는 · 치는</b> 악기로 나눌 수 있어요.</li>
    <li><b>관현악단</b>은 현악기(바이올린·비올라·첼로·콘트라베이스·하프), 목관악기(플루트·클라리넷·오보에·바순), 금관악기(트럼펫·호른·트롬본·튜바), 타악기(팀파니·작은북·심벌즈)로 이루어져요.</li>
    <li><b>국악기</b>는 현악기(가야금·거문고·해금·아쟁), 관악기(대금·단소·피리·태평소), 타악기(장구·북·꽹과리·징)로 나눠요.</li>
    <li><b>팔음</b>: 국악기를 만든 재료에 따라 쇠(금)·돌(석)·실(사)·대나무(죽)·바가지(포)·흙(토)·가죽(혁)·나무(목) 8가지로 나누어요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u;const L=LV[p.levelId];const SEC=SEC0[L.deck];const n=SEC.length;const top=(p.top||0)+u*.5;const pad=u*.35;const land=W>=H*1.1;let card,secs=[];
    if(land){card={x:pad,y:top,w:W*.4-pad*1.5,h:H-top-pad};const sx=W*.4+pad*.5,sw=W-sx-pad;const cols=n===3?3:n<=4?2:4,rows=Math.ceil(n/cols);const g=u*.3;const cw=(sw-g*(cols-1))/cols,ch=(H-top-pad-g*(rows-1))/rows;for(let i=0;i<n;i++)secs.push({x:sx+(i%cols)*(cw+g),y:top+Math.floor(i/cols)*(ch+g),w:cw,h:ch});}
    else{const chh=Math.min((H-top)*.3,u*6.5);card={x:pad,y:top,w:W-pad*2,h:chh};const sy=top+chh+u*.3;const cols=n===3?1:2,rows=Math.ceil(n/cols);const g=u*.25;const cw=(W-pad*2-g*(cols-1))/cols,ch=(H-sy-pad-g*(rows-1))/rows;for(let i=0;i<n;i++)secs.push({x:pad+(i%cols)*(cw+g),y:sy+Math.floor(i/cols)*(ch+g),w:cw,h:ch});}
    return{W,H,u,land,card,secs,SEC,n,L};},
  init(p){const st=p.state;Object.assign(st,{T:0,q:null,n:0,okN:0,lock:false,res:null,pick:-1,mood:'neutral',mT:0,qt:0,qmax:0,rT:0,listen:0,seated:{},pr:{},fx:[],big:0});},
  make(p,L){const lv=LV[L];const items=ITEMS0[lv.deck];const it=p.deck(items,'dk_'+L);const SEC=SEC0[lv.deck];return{it,name:it[0],ans:it[1],okIdx:it[1],text:'',reveal:it[0]+jo(it[0],'은','는')+' '+SEC[it[1]][0],review:it[0]+' → '+SEC[it[1]][0]+' ('+HINT0[lv.deck][it[1]]+')',speak:''};},
  qtime(){return LV[this._p.levelId].hear?14:12;},level(p){this._p=p;return p.levelId;},
  askHtml(q){return LV[this._p.levelId].hear?'🎧 이 소리의 악기는 어느 자리일까요?':'🎼 <b>'+q.name+'</b>의 자리는 어디일까요?';},
  askSub(){return LV[this._p.levelId].hear?'카드를 누르면 소리를 다시 들어요':'카드를 누르면 악기 소리를 들어요';},
  isOk(q,i){return i===q.okIdx;},tipOf(q){return q.reveal;},goodTip(q){return q.name+jo(q.name,'은','는')+' '+SEC0[LV[this._p.levelId].deck][q.ans][0]+'!';},
  hold(p){return p.state.listen>0;},
  onNew(p,q){const st=p.state;this._p=p;st.listen=0;if(LV[p.levelId].hear){if(M.lead(p))voice(p,q.name);st.listen=.9;}},
  onVerdict(p,q,ok,i){const st=p.state;st.listen=0;const lv=LV[p.levelId];const SEC=SEC0[lv.deck];
    if(ok){st.seated[q.ans]=(st.seated[q.ans]||[]);st.seated[q.ans].push(q.name);if(st.seated[q.ans].length>6)st.seated[q.ans].shift();st.total=(st.total||0)+1;voice(p,q.name);const G=this.geo(p);const sc=G.secs[q.ans];for(let k=0;k<8;k++)st.fx.push({x:sc.x+sc.w/2,y:sc.y+sc.h*.4,a:k/8*TAU,t:0,c:SEC[q.ans][1]});
      if(st.total%8===0){setTimeout(()=>{if(!p.active)return;const t=M.now()+.05;M.chord('pad',[60,64,67,72],t,1.4,.8,{vol:M.vol(p)});M.hit('kick',t,.6,{vol:M.vol(p)});p.hit(true,{pts:30,x:p.W/2,y:p.H*.3,tip:'🎉 연주단이 함께 연주해요! +30',tipMs:1500});},500);}}
    else setTimeout(()=>{if(p.active)voice(p,q.name);},250);},
  upd(p,dt){const st=p.state;this._p=p;if(st.listen>0)st.listen-=dt;M.decay(st,dt);st.fx=st.fx.filter(f=>(f.t+=dt)<.7);},
  down(p,x,y){const st=p.state,q=st.q;if(!q)return;const G=this.geo(p);if(K.inRect(x,y,G.card)){if(!st.lock&&q)voice(p,q.name);M.press(st,'card',.2);return;}if(st.lock)return;const i=G.secs.findIndex(r=>K.inRect(x,y,r));if(i>=0)this.verdict(p,i,false);},
  key(p,e){const n=Number(e.key);const st=p.state,G=this.geo(p);if(st.q&&!st.lock&&n>=1&&n<=G.n)this.verdict(p,n-1,false);},
  botAct(p){const st=p.state,q=st.q;if(!q||st.lock)return null;const G=this.geo(p);const r=G.secs[q.okIdx];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,t=st.T,q=st.q,L=G.L;this._p=p;curtain(g,W,H,u,t);
    /* 무대와 악기 카드 */
    const c=G.card;stageFloor(g,c.x,c.y,c.w,c.h,u,t);
    if(q){const pr=st.pr.card>0;const cw=Math.min(c.w*.8,u*8),ch=Math.min(c.h*.6,u*6);const cx=c.x+c.w/2,cy=c.y+c.h*.46;const pul=1+(pr?.06:0)+Math.sin(t*3)*.01;
      g.save();g.translate(cx,cy);g.scale(pul,pul);K.card(g,-cw/2,-ch/2,cw,ch,u*.25,st.lock?(st.res==='ok'?'#e8f7e8':'#ffe3e0'):'#fffaf0',{stroke:'#d4a537',lw:5,blur:u*.3,dy:u*.15});
      if(L.hear&&!st.lock){K.txt(g,'❓',0,-ch*.12,{size:Math.min(ch*.45,cw*.35),color:CRIM});K.txt(g,'무슨 소리일까요?',0,ch*.26,{size:Math.min(ch*.14,u*.9),color:INK,maxW:cw*.85});}
      else{const ic=q.it[2]||'🎼';K.emo(g,ic,0,-ch*.14,Math.min(ch*.45,cw*.4));QK.txt(g,q.name,0,ch*.25,cw*.86,ch*.28,Math.min(ch*.2,u*1.5),INK,1.1);}
      K.txt(g,'🔊 눌러서 소리 듣기',0,ch*.43,{size:Math.min(ch*.09,u*.5),color:'#8a6a3a',maxW:cw*.9});g.restore();
      if(st.listen>0){for(let i=0;i<3;i++){g.strokeStyle=`rgba(255,240,180,${.6-i*.15})`;g.lineWidth=3;g.beginPath();g.arc(cx,cy,ch*.5+((t*60+i*30)%90),0,TAU);g.stroke();}}}
    K.card(g,c.x+u*.2,c.y+u*.2,u*4,u*.8,u*.2,'rgba(255,250,240,.92)',{stroke:INK,lw:2,blur:0,dy:0});K.txt(g,'🎼 연주단 '+(st.total||0)+'명',c.x+u*.2+u*2,c.y+u*.6,{size:u*.42,color:INK,maxW:u*3.6});
    if(!st.lock&&st.listen<=0&&st.qmax>0){const bw=Math.min(c.w*.7,u*9);QZ.bar(g,c.x+c.w/2-bw/2,c.y+c.h-u*.5,bw,Math.max(5,u*.2),st.qt/st.qmax,{good:CRIM});}
    /* 무리(자리) */
    G.secs.forEach((r,i)=>{const s=G.SEC[i];const ok=st.lock&&q&&i===q.ok;let right=st.lock&&q&&i===q.okIdx,wrong=st.lock&&st.res==='bad'&&i===st.pick;
      g.save();g.globalAlpha=st.lock&&!right&&!wrong?.55:1;K.card(g,r.x,r.y,r.w,r.h,u*.25,'#fffaf0',{stroke:right?'#16a34a':wrong?'#dc2626':s[1],lw:right||wrong?6:4,blur:u*.2,dy:u*.1});
      g.fillStyle=s[1];K.rr(g,r.x+4,r.y+4,r.w-8,Math.min(r.h*.32,u*1.6),u*.2);g.fill();K.txt(g,s[0],r.x+r.w/2,r.y+4+Math.min(r.h*.32,u*1.6)/2,{size:Math.min(u*.85,r.h*.2),color:'#fff',stroke:'rgba(0,0,0,.25)',lw:u*.1,maxW:r.w*.9});
      K.txt(g,String(i+1),r.x+u*.4,r.y+r.h-u*.35,{size:u*.4,color:'rgba(42,31,23,.4)'});
      const hint=HINT0[LV[p.levelId].deck][i];QK.txt(g,hint,r.x+r.w/2,r.y+r.h*.52,r.w*.88,r.h*.22,Math.min(u*.5,r.h*.1),'#6b5a4a',1.15);
      const seated=st.seated[i]||[];seated.forEach((nm,k)=>{const cols=Math.max(2,Math.floor(r.w/(u*3)));const cx=r.x+r.w*.5+((k%cols)-(Math.min(cols,seated.length)-1)/2)*Math.min(u*2.6,(r.w-u*.6)/cols);const cy=r.y+r.h*.82-Math.floor(k/cols)*u*.55;K.rr(g,cx-u*1.2,cy-u*.22,u*2.4,u*.46,u*.23);g.fillStyle=s[1];g.globalAlpha*=.9;g.fill();g.globalAlpha=st.lock&&!right&&!wrong?.55:1;K.txt(g,nm,cx,cy,{size:u*.34,color:'#fff',maxW:u*2.2});});
      g.restore();});
    for(const f of st.fx){const r=u*(.5+f.t*3);g.fillStyle=f.c;g.globalAlpha=1-f.t/.7;g.beginPath();g.arc(f.x+Math.cos(f.a)*r,f.y+Math.sin(f.a)*r,u*.15,0,TAU);g.fill();g.globalAlpha=1;}
  },
};
M.mix(GAME,{say:false,pts0:50,pts1:50,okMs:1200,badMs:2100});
Engine.boot(GAME);
