
/* ═════════ 미션 3 : 전지·전구 연결 (직렬 · 병렬) ═════════ */
const mkC=(bs,bp,ls,lp,rem)=>({bs,bp,ls,lp,rem:rem||0});   /* 전지: 한 줄에 bs개 직렬 × bp줄 병렬, 전구: 한 줄에 ls개 직렬 × lp줄 병렬 */
const brightOf=c=>(c.rem&&c.ls>1)?0:c.bs/c.ls;               /* 전구 한 개의 밝기: 전지 직렬 수 ÷ 한 줄에 달린 전구 수 */
const lvOf=b=>b<=0?0:.3+.7*clamp(b/3,0,1);
const duraOf=c=>c.bp/Math.max(1,c.lp-((c.rem&&c.ls===1)?1:0));  /* 오래 가는 정도: 전지 병렬 수 ÷ 전구 병렬 수 */
function drawCircuit(g,c,B,o){const u=o.u,T=o.T;const nL=c.bp,nR=c.lp;const gapB=1.9;
  const unitsW=(nL-1)+(nR-1)+gapB+1.3;const colW=Math.min(B.w/unitsW,B.h*.46);
  const totalW=((nL-1)+(nR-1)+gapB)*colW;const x0=B.x+(B.w-totalW)/2;const top=B.y+B.h*.2,bot=B.y+B.h*.9,Hh=bot-top;
  const Lx=[],Rx=[];for(let i=0;i<nL;i++)Lx.push(x0+i*colW);for(let j=0;j<nR;j++)Rx.push(x0+(nL-1)*colW+gapB*colW+j*colW);
  const rev=o.rev,rt=o.rt||0;const bright=brightOf(c);const open=c.rem&&c.ls>1;
  const lvBase=lvOf(bright)*(rev?easeOut(rt/.6):0);
  const branchLv=j=>{if(!rev)return 0;if(c.rem&&j===0)return 0;return open?0:lvBase;};
  const anyLit=(()=>{for(let j=0;j<nR;j++)if(branchLv(j)>0)return true;return false;})();
  const wc=anyLit?'#ffd23f':COL.copper,lw=Math.max(2.5,u*.16);
  for(const x of Lx)D.wire(g,[[x,top],[x,bot]],lw,wc,anyLit);for(const x of Rx)D.wire(g,[[x,top],[x,bot]],lw,wc,anyLit);
  if(nL>1){D.wire(g,[[Lx[0],top],[Lx[nL-1],top]],lw,wc,anyLit);D.wire(g,[[Lx[0],bot],[Lx[nL-1],bot]],lw,wc,anyLit);}
  if(nR>1){D.wire(g,[[Rx[0],top],[Rx[nR-1],top]],lw,wc,anyLit);D.wire(g,[[Rx[0],bot],[Rx[nR-1],bot]],lw,wc,anyLit);}
  D.wire(g,[[Lx[nL-1],top],[Rx[0],top]],lw,wc,anyLit);D.wire(g,[[Lx[nL-1],bot],[Rx[0],bot]],lw,wc,anyLit);
  /* 전지 */
  const m=c.bs;const charge=o.charge?o.charge(c):null;
  for(const x of Lx)for(let k=0;k<m;k++){const y=top+Hh*(k+.5)/m;const len=Math.min(Hh/m*.8,Hh*.46,colW*1.6);D.battery(g,x,y,len,Math.min(len*.5,colW*.62),-Math.PI/2,{charge});}
  /* 전구 */
  const ml=c.ls;for(let j=0;j<nR;j++)for(let k=0;k<ml;k++){const y=top+Hh*(k+.5)/ml;const r=Math.min(Hh/ml*.34,colW*.38,u*1.15);
    const removed=c.rem&&j===0&&k===ml-1;D.bulb(g,Rx[j],y,r,removed?0:branchLv(j),T,removed);}
  if(anyLit&&o.flow!==false){const pts=[[Lx[nL-1],bot],[Lx[nL-1],top],[Rx[0],top],[Rx[0],bot],[Lx[nL-1],bot]];D.dots(g,pts,T,u*(2+lvBase*4),12,u*.08);}
  return{Lx,Rx,top,bot};}

const M3={
  genQ(p){const R=p.R;const kind=p.deck(['k1','k2','k3','k4','k5','k6'],'k3deck');let q={kind,A:null,B:null,single:false,opts:['A','B','똑같아요'],long:false};
    const cmp=(fn)=>{const a=fn(q.A),b=fn(q.B);return a>b+1e-9?0:b>a+1e-9?1:2;};
    const swap=()=>{if(R.chance(.5)){const t=q.A;q.A=q.B;q.B=t;}};
    if(kind==='k1'){let a=R.int(1,3),b=R.int(1,3);while(b===a)b=R.int(1,3);q.A=mkC(a,1,1,1);q.B=mkC(b,1,1,1);
      q.ask='전구가 <b>더 밝은</b> 쪽은?';q.sub='A와 B 회로를 살펴봐요';q.ans=cmp(brightOf);q.why='전지를 <b>직렬</b>로 많이 연결할수록 전구가 더 밝아요';}
    else if(kind==='k2'){q.A=mkC(1,2,1,1);q.B=mkC(1,1,1,1);swap();q.long=R.chance(.5);
      if(q.long){q.ask='전구를 <b>더 오래</b> 켤 수 있는 쪽은?';q.sub='전지가 더 오래 가는 쪽을 골라요';q.ans=cmp(duraOf);q.why='전지를 <b>병렬</b>로 연결하면 전지 1개일 때와 밝기는 같지만 <b>더 오래</b> 켜져요';}
      else{q.ask='전구가 <b>더 밝은</b> 쪽은?';q.sub='A와 B 회로를 살펴봐요';q.ans=cmp(brightOf);q.why='전지를 <b>병렬</b>로 연결해도 전구의 밝기는 전지 1개일 때와 <b>같아요</b>';}}
    else if(kind==='k3'){q.A=mkC(2,1,1,1);q.B=mkC(1,2,1,1);swap();q.long=R.chance(.5);
      if(q.long){q.ask='전구를 <b>더 오래</b> 켤 수 있는 쪽은?';q.sub='전지 2개를 연결한 두 방법을 비교해요';q.ans=cmp(duraOf);q.why='전지 2개를 <b>병렬</b>로 연결하면 직렬 연결보다 <b>오래</b> 켜져요';}
      else{q.ask='전구가 <b>더 밝은</b> 쪽은?';q.sub='전지 2개를 연결한 두 방법을 비교해요';q.ans=cmp(brightOf);q.why='전지 2개를 <b>직렬</b>로 연결하면 병렬 연결보다 전구가 <b>더 밝아요</b>';}}
    else if(kind==='k4'){const bs=R.pick([1,2]);q.A=mkC(bs,1,2,1);q.B=mkC(bs,1,1,2);swap();q.long=R.chance(.5);
      if(q.long){q.ask='전지가 <b>더 오래</b> 가는 쪽은?';q.sub='전구 2개를 연결한 두 방법을 비교해요';q.ans=cmp(duraOf);q.why='전구를 <b>직렬</b>로 연결하면 전지가 천천히 닳아서 <b>더 오래</b> 켜져요';}
      else{q.ask='전구가 <b>더 밝은</b> 쪽은?';q.sub='전구 2개를 연결한 두 방법을 비교해요';q.ans=cmp(brightOf);q.why='전구를 <b>병렬</b>로 연결하면 직렬 연결보다 전구가 <b>더 밝아요</b>';}}
    else if(kind==='k5'){const par=R.chance(.5);const bs=R.int(1,2);q.single=true;q.A=par?mkC(bs,1,1,2,1):mkC(bs,1,2,1,1);q.opts=['모두 꺼져요','남은 전구는 켜져 있어요'];q.ans=par?1:0;
      q.ask='전구 한 개를 <b>빼면</b> 남은 전구는?';q.sub='빠진 자리가 점선으로 보여요';
      q.why=par?'전구를 <b>병렬</b>로 연결하면 한 개를 빼도 나머지 전구는 <b>켜져 있어요</b>':'전구를 <b>직렬</b>로 연결하면 한 개를 빼면 회로가 끊겨 <b>모두 꺼져요</b>';}
    else{const tgt=R.pick(['bat','bulb']);const par=R.chance(.5);q.single=true;q.opts=['직렬 연결','병렬 연결'];q.ans=par?1:0;
      q.A=tgt==='bat'?(par?mkC(1,2,1,1):mkC(2,1,1,1)):(par?mkC(1,1,1,2):mkC(1,1,2,1));
      q.ask=`<b>${tgt==='bat'?'전지':'전구'}</b>는 어떻게 연결되어 있나요?`;q.sub='한 줄로 이어졌는지, 나란히 갈라졌는지 봐요';
      q.why=par?`${tgt==='bat'?'전지':'전구'}를 <b>나란히 갈라서</b> 연결한 것은 <b>병렬 연결</b>이에요`:`${tgt==='bat'?'전지':'전구'}를 <b>한 줄로 이어서</b> 연결한 것은 <b>직렬 연결</b>이에요`;}
    return q;},
  init(p){const st=p.state;const q=this.genQ(p);st.q=q;st.rev=false;st.rt=0;st.lock=false;
    p.ask(q.ask,q.sub);
    p.tools(q.opts.map(t=>({t})),(i)=>{if(st.lock||st.rev)return;st.lock=true;st.rev=true;st.rt=0;const ok=i===q.ans;
      if(ok){goodHit(p,110,p.W/2,p.H*.18,q.why);}else p.hit(false,{x:p.W/2,y:p.H*.18,tip:'정답: <b>'+q.opts[q.ans]+'</b><br>'+q.why,tipMs:3400,review:plain(q.ask)+' → '+q.opts[q.ans]+' ('+plain(q.why)+')'});
      zap(p);nextRound(p,3000);},{toggle:false});},
  lay(p){const A=areaOf(p),u=p.u;const m=u*.3;const q=p.state.q;
    if(q.single)return[{x:A.w*.06,y:m,w:A.w*.88,h:A.h-m*2}];
    if(A.w>A.h*1.05){const w=(A.w-m*3)/2;return[{x:m,y:m,w,h:A.h-m*2},{x:m*2+w,y:m,w,h:A.h-m*2}];}
    const h=(A.h-m*3)/2;return[{x:m,y:m,w:A.w-m*2,h},{x:m,y:m*2+h,w:A.w-m*2,h}];},
  draw(p,g,A,dt){const st=p.state,u=p.u,q=st.q,T=st.T;if(st.rev)st.rt+=dt;const a=intro(p);const boxes=this.lay(p);
    g.save();g.globalAlpha=a;g.translate(0,(1-a)*u*.6);
    const cs=q.single?[q.A]:[q.A,q.B];
    cs.forEach((c,i)=>{const B=boxes[i];K.card(g,B.x,B.y,B.w,B.h,u*.35,'#0e1a3f',{blur:u*.4,dy:u*.12,stroke:'rgba(120,150,255,.28)',lw:1.5,hi:false});
      if(!q.single){const win=st.rev&&q.ans===i;K.orb(g,B.x+u*.8,B.y+u*.8,u*.5,win?'#3df0b8':'#4da3ff');K.txt(g,i?'B':'A',B.x+u*.8,B.y+u*.8,{size:u*.62,color:win?'#04251c':'#fff'});}
      drawCircuit(g,c,{x:B.x+B.w*.04,y:B.y+B.h*.02,w:B.w*.92,h:B.h*.96},{u,T,rev:st.rev,rt:st.rt,charge:q.long&&st.rev?(cc=>clamp(1-st.rt*.2/duraOf(cc),.12,1)):null});
      if(!st.rev){K.txt(g,'?',B.x+B.w-u*.8,B.y+u*.8,{size:u*.9,color:'rgba(159,176,230,.45)'});}});
    g.restore();}
};

/* ═════════ 미션 4 : 전자석 크레인 ═════════ */
function drawMagnet(g,mx,topY,len,wid,turns,on,T,o={}){
  /* 못 */
  const gr=g.createLinearGradient(mx-wid/2,0,mx+wid/2,0);gr.addColorStop(0,'#e5eaf5');gr.addColorStop(.5,'#9aa8c6');gr.addColorStop(1,'#5f6d8e');g.fillStyle=gr;
  g.beginPath();g.moveTo(mx-wid*.42,topY+len*.06);g.lineTo(mx+wid*.42,topY+len*.06);g.lineTo(mx+wid*.42,topY+len*.9);g.lineTo(mx,topY+len);g.lineTo(mx-wid*.42,topY+len*.9);g.closePath();g.fill();
  g.fillStyle='#c7d1e8';g.beginPath();g.ellipse(mx,topY+len*.06,wid*.62,wid*.2,0,0,TAU);g.fill();
  /* 코일 */
  const nc=clamp(Math.round(turns/4),3,14);const c0=topY+len*.2,c1=topY+len*.78;const cw=wid*1.2;
  for(let i=0;i<nc;i++){const y=lerp(c0,c1,i/(nc-1));g.strokeStyle='#8f4d14';g.lineWidth=Math.max(2,len*.035);g.beginPath();g.moveTo(mx-cw/2,y+len*.03);g.lineTo(mx+cw/2,y-len*.02);g.stroke();
    g.strokeStyle=on?'#ffd23f':'#e58a3a';g.lineWidth=Math.max(1.5,len*.026);g.beginPath();g.moveTo(mx-cw/2,y+len*.03);g.lineTo(mx+cw/2,y-len*.02);g.stroke();}
  if(on){K.glow(g,mx,topY+len,len*.5,'#7ff0ff',.35);K.glow(g,mx,topY+len*.5,len*.6,'#7ff0ff',.12);}}
function fieldLines(g,mx,topY,len,wid,T){g.save();g.strokeStyle='rgba(127,240,255,.35)';g.lineWidth=1.6;g.setLineDash([6,7]);g.lineDashOffset=-T*30;
  for(const k of [1,2,3]){const rx=wid*(1.1+k*.95),ry=len*(.5+k*.08);const cy=topY+len*.5;g.beginPath();g.ellipse(mx,cy,rx,ry,0,-Math.PI/2,Math.PI/2);g.stroke();g.beginPath();g.ellipse(mx,cy,rx,ry,0,Math.PI/2,Math.PI*1.5);g.stroke();}g.restore();}
const M4={
  CL:12,
  lift(mg,N){return Math.min(N,Math.round(mg.bs*mg.turns/10*1.6));},
  init(p){const st=p.state,R=p.R;st.n4=st.n4||0;st.lock=false;st.cr={ph:'idle',t:0,L:0};
    const kind=(st.n4%3===2)?p.deck(['pole','off','strong'],'m4p'):'build';st.mk=kind;st.n4++;st.rev=false;st.rt=0;
    st.clipPos=[];for(let i=0;i<this.CL;i++){const cc=i%6,rr=Math.floor(i/6);st.clipPos.push({x:(cc+.5)/6+R.num(-.04,.04),y:.3+rr*.4+R.num(-.06,.06),r:R.num(-1.4,1.4)});}
    if(kind==='build'){const tier=Math.min(3,Math.floor((st.n4-1)/2));const target=[4,6,8,10][Math.min(3,R.int(Math.max(0,tier-1),tier))];
      st.mg={bs:1,bp:1,turns:10,on:false,target};
      p.ask(`🧲 전자석으로 클립을 <b>${target}개 이상</b> 들어 올려요!`,'전자석을 더 세게 만든 다음 스위치를 켜 봐요');
      const tl=[{e:'🔋',t:'전지 직렬'},{e:'🔋',t:'전지 병렬'},{e:'🌀',t:'코일 +10번'},{e:'⚡',t:'스위치 켜기'}];
      p.tools(tl,(i)=>this.press(p,i),{toggle:false});st.btns=p.toolBtns;st.btns[3].classList.add('go');this.syncBtns(p);}
    else{st.mg={bs:R.int(1,2),bp:1,turns:R.pick([20,30]),on:true,target:0};
      if(kind==='pole'){st.pole0=R.pick(['N','S']);st.mg.bs=1;st.mg.turns=30;
        st.askT='전지의 방향을 반대로 끼우면 전자석 아래쪽 끝의 극';p.ask('🧲 전지의 방향을 <b>반대로</b> 끼우면 전자석 <b>아래쪽 끝</b>은 무슨 극이 될까요?','지금 아래쪽 끝의 극과 나침반을 살펴봐요');
        st.opts=['N극','S극'];st.ans=st.pole0==='N'?1:0;st.why='전지의 방향을 바꾸면 전류의 방향이 바뀌어 전자석의 <b>N극과 S극이 서로 바뀌어요</b>';}
      else if(kind==='off'){st.askT='스위치를 끄면 전자석에 붙은 클립';p.ask('🧲 스위치를 <b>끄면</b> 전자석에 붙어 있던 클립은 어떻게 될까요?','전자석은 전기가 흐를 때만 자석이 돼요');st.opts=['계속 붙어 있어요','모두 떨어져요'];st.ans=1;
        st.why='전자석은 <b>전기가 흐를 때만</b> 자석의 성질을 가져서, 스위치를 끄면 클립이 떨어져요';st.mg.bs=2;st.mg.turns=20;}
      else{const pairs=[['전지를 직렬로 더 연결해요','전지를 하나 빼요','전지를 <b>직렬</b>로 더 연결하면 전류가 세져서 전자석이 더 세져요'],
          ['코일을 더 많이 감아요','코일을 풀어서 적게 감아요','코일을 <b>많이 감을수록</b> 전자석이 세져요'],
          ['전지를 직렬로 더 연결해요','전지를 병렬로 더 연결해요','전지를 <b>직렬</b>로 연결해야 세져요. 병렬로 연결하면 세기는 그대로예요']];
        const pr=R.pick(pairs);const sw=R.chance(.5);st.opts=sw?[pr[1],pr[0]]:[pr[0],pr[1]];st.ans=sw?1:0;st.why=pr[2];
        st.askT='전자석을 더 세게 만드는 방법';p.ask('🧲 전자석을 <b>더 세게</b> 만들려면 어떻게 해야 할까요?','클립이 더 많이 붙는 방법을 골라요');}
      p.tools(st.opts.map(t=>({t})),(i)=>{if(st.lock||st.rev)return;st.lock=true;st.rev=true;st.rt=0;if(st.mk==='off')st.mg.on=false;const ok=i===st.ans;
        if(ok)goodHit(p,110,p.W/2,p.H*.18,st.why);else p.hit(false,{x:p.W/2,y:p.H*.18,tip:'정답: <b>'+st.opts[st.ans]+'</b><br>'+st.why,tipMs:3400,review:st.askT+' → '+st.opts[st.ans]+' ('+plain(st.why)+')'});
        p.Snd.slide(300,900,.3,.06);nextRound(p,3000);},{toggle:false});}},
  syncBtns(p){const st=p.state,mg=st.mg;if(!st.btns)return;st.btns[0].classList.toggle('off',mg.bs>=3);st.btns[1].classList.toggle('off',mg.bp>=3);st.btns[2].classList.toggle('off',mg.turns>=50);},
  press(p,i){const st=p.state,mg=st.mg;if(st.lock||st.cr.ph!=='idle')return;
    if(i===0){if(mg.bs>=3){p.tip('전지는 <b>직렬로 3개</b>까지만 연결할 수 있어요','bad',1600);return;}mg.bs++;p.Snd.bell(660+mg.bs*90,0,.06);}
    else if(i===1){if(mg.bp>=3){p.tip('병렬은 <b>3줄</b>까지만 연결할 수 있어요','bad',1600);return;}mg.bp++;p.Snd.bell(520,0,.05);p.tip('전지를 병렬로 연결해도 전자석의 <b>세기는 그대로</b>예요 (더 오래 써요)','',2400);}
    else if(i===2){if(mg.turns>=50){p.tip('코일은 <b>50번</b>까지만 감을 수 있어요','bad',1600);return;}mg.turns+=10;p.Snd.tone(540+mg.turns*4,.08,'triangle',.06);}
    else{mg.on=true;st.cr={ph:'down',t:0,L:0};zap(p);}
    this.syncBtns(p);},
  lay(p){const A=areaOf(p),u=p.u;const land=A.w>A.h*1.05;const mx=A.w*(land?.6:.68);const len=Math.min(A.h*.34,u*4.4);
    const yRest=A.h*.46,tray={x:A.w*(land?.22:.06),y:A.h*.76,w:A.w*(land?.56:.88),h:A.h*.2};
    return{A,u,land,mx,len,wid:len*.19,yRest,yGrab:tray.y+tray.h*.3,railY:A.h*.07,tray};},
  /* 제어반(전지·코일·스위치) */
  panel(p,g,L,mg,flip,T){const u=L.u;const cw=Math.min(u*.95,(L.A.w*.4)/3.3),th=cw*.46;const bs=mg.bs,bp=mg.bp;
    const pw=Math.max(u*3.6,bs*cw*1.12+u*.9),ph=u*1.15+bp*th*1.35+u*.9;const x=u*.35,y=L.A.h*.14;
    K.card(g,x,y,pw,ph,u*.25,'#0e1a3f',{blur:u*.3,dy:u*.1,stroke:'rgba(120,150,255,.35)',lw:1.5,hi:false});
    D.label(g,'제어반',x+pw/2,y+u*.38,clamp(u*.3,10,14),'#9db0e6');
    for(let r=0;r<bp;r++)for(let k=0;k<bs;k++){const cx=x+pw/2+(k-(bs-1)/2)*cw*1.08,cy=y+u*.9+th*.75+r*th*1.35;D.battery(g,cx,cy,cw,th,flip?Math.PI:0,{labels:true});}
    D.label(g,`코일 ${mg.turns}번 감김`,x+pw/2,y+ph-u*.35,clamp(u*.34,11,16),'#ffe58a');
    return{x,y,w:pw,h:ph};},
  chainPos(L,j,T,sw){const s=L.u*.34;return[L.mx+Math.sin(T*2+j*.7)*L.u*.05*sw,0+j*s];},
  draw(p,g,A,dt){const st=p.state,u=p.u,T=st.T;const L=this.lay(p);const a=intro(p);const mg=st.mg;const build=st.mk==='build';
    if(st.rev)st.rt+=dt;
    /* 크레인 동작 */
    const cr=st.cr;let tipY=L.yRest,carry=0,drop=0;
    if(build&&cr.ph!=='idle'){cr.t+=dt;
      if(cr.ph==='down'){const e=easeIO(cr.t/.85);tipY=lerp(L.yRest,L.yGrab,e);if(cr.t>=.85){cr.L=this.lift(mg,this.CL);cr.ph='up';cr.t=0;if(cr.L>0){p.Snd.noise(.12,2500,.14);}}}
      else if(cr.ph==='up'){const e=easeIO(cr.t/.95);tipY=lerp(L.yGrab,L.yRest,e);carry=cr.L;if(cr.t>=.95){cr.ph='hold';cr.t=0;const okk=cr.L>=mg.target;
        if(okk){zap(p);goodHit(p,150,p.W/2,p.H*.18,`클립 ${cr.L}개를 들어 올렸어요! 전자석이 충분히 셌어요`);}
        else{p.hit(false,{pen:20,x:p.W/2,y:p.H*.18,tip:`클립이 <b>${cr.L}개</b>밖에 안 붙었어요. 전지를 <b>직렬</b>로 더 연결하거나 코일을 더 감아 봐요`,tipMs:3400,review:`전자석을 세게 하려면 전지를 직렬로 더 연결하거나 코일을 더 많이 감아요 (병렬 연결은 세기가 그대로예요)`});}}}
      else if(cr.ph==='hold'){tipY=L.yRest;carry=cr.L;if(cr.t>=1.3){if(cr.L>=mg.target){cr.ph='idle';st.lock=true;nextRound(p,50);}else{cr.ph='drop';cr.t=0;mg.on=false;}}}
      else if(cr.ph==='drop'){tipY=L.yRest;drop=cr.t/.7;carry=cr.L;if(cr.t>=.7){cr.ph='idle';cr.L=0;this.syncBtns(p);}}}
    g.save();g.globalAlpha=a;g.translate(0,(1-a)*u*.6);
    /* 레일과 도르래 */
    g.fillStyle='#16275a';g.fillRect(0,L.railY-u*.12,p.W,u*.24);g.fillStyle='rgba(120,150,255,.35)';g.fillRect(0,L.railY-u*.12,p.W,2);
    const topY=tipY-L.len;
    if(!build){/* 맞히기 장면: 가운데에 */}
    const mx=build?L.mx:p.W*.58;const ty=build?topY:L.yRest-L.len;
    D.wire(g,[[mx,L.railY],[mx,ty+L.len*.06]],Math.max(2,u*.08),'#7684b0',false);
    g.fillStyle='#3b4f94';K.rr(g,mx-u*.45,L.railY-u*.3,u*.9,u*.6,u*.15);g.fill();
    /* 제어반 + 전선 */
    const flip=(st.mk==='pole'&&st.rev)?true:false;
    const pn=this.panel(p,g,L,mg,flip,T);
    const coilY=ty+L.len*.5;
    const cab=(x1,y1,x2,y2,sag)=>{const pts=[];for(let i=0;i<=24;i++){const t=i/24,a=1-t;pts.push([a*a*x1+2*a*t*((x1+x2)/2)+t*t*x2,a*a*y1+2*a*t*(Math.max(y1,y2)+sag)+t*t*y2]);}return pts;};
    D.wire(g,cab(pn.x+pn.w,pn.y+pn.h*.35,mx-L.wid*.6,coilY-L.len*.2,u*1.2),Math.max(2,u*.09),mg.on?'#ffd23f':COL.copper,mg.on);
    D.wire(g,cab(pn.x+pn.w,pn.y+pn.h*.7,mx+L.wid*.6,coilY+L.len*.18,u*1.8),Math.max(2,u*.09),mg.on?'#ffd23f':COL.copper,mg.on);
    /* 스위치 */
    D.knife(g,pn.x+pn.w/2,pn.y+pn.h+u*.55,u*1.5,0,mg.on,T,!mg.on&&build&&cr.ph==='idle');
    /* 트레이와 클립 */
    const tr=L.tray;K.card(g,tr.x,tr.y,tr.w,tr.h,u*.25,'#16275a',{blur:u*.3,dy:u*.08,stroke:'rgba(120,150,255,.3)',lw:1.5,hi:false});
    const lifted=build?((cr.ph==='up'||cr.ph==='hold'||cr.ph==='drop')?cr.L:0):0;
    const csz=u*.62;
    st.clipPos.forEach((c,i)=>{const cx=tr.x+c.x*tr.w,cy=tr.y+c.y*tr.h;const idx=this.CL-1-i;
      if(build&&idx<lifted&&cr.ph!=='drop')return;
      if(build&&idx<lifted&&cr.ph==='drop'){const [chx,chy]=[L.mx+Math.sin(T*2+idx*.7)*u*.05,tipY+L.len*0+u*.2+idx*u*.34];const e=Math.pow(clamp(drop,0,1),2);D.paperclip(g,lerp(chx,cx,e),lerp(chy,cy,e),csz,lerp(0,c.r,e),'#c3cde6');return;}
      D.paperclip(g,cx,cy,csz,c.r,'#b9c4de');});
    /* 전자석(못+코일)과 자기장 */
    const on=mg.on;
    if(on&&(!build||cr.ph!=='idle'))fieldLines(g,mx,ty,L.len,L.wid,T);
    drawMagnet(g,mx,ty,L.len,L.wid,mg.turns,on,T);
    /* 매달린 클립 */
    const chainN=build?carry:(st.mk==='off'?3:(st.mk==='strong'?4:0));
    if(chainN>0){const off=st.mk==='off'&&st.rev;const fall=off?clamp(st.rt/.8,0,1):0;
      for(let j=0;j<chainN;j++){const cx=mx+Math.sin(T*2+j*.7)*u*.05+(j%2?u*.04:-u*.04),cy=ty+L.len+u*.2+j*u*.34+(build&&cr.ph==='down'?0:0);
        if(off){const e=Math.pow(fall,2);D.paperclip(g,cx+Math.sin(j*3)*u*.3*e,cy+e*(L.tray.y+L.tray.h*.5-cy),csz,.4*e*(j%2?1:-1),'#c3cde6');}
        else D.paperclip(g,cx,cy,csz,j%2?.12:-.12,'#c3cde6');}}
    /* 극 표시와 나침반 */
    if(st.mk==='pole'){const bot0=st.pole0;const botNow=st.rev?(bot0==='N'?'S':'N'):bot0;const topNow=botNow==='N'?'S':'N';
      const pc=n=>n==='N'?'#ff5a7a':'#4da3ff';
      const tag=(n,x,y)=>{K.orb(g,x,y,u*.52,pc(n));K.txt(g,n,x,y,{size:u*.62,color:'#fff'});};
      tag(botNow,mx+L.wid*1.6,ty+L.len*.96);tag(topNow,mx+L.wid*1.6,ty+L.len*.12);
      /* 나침반: 아래쪽 끝 옆 */
      const cxn=mx-L.wid*2.7,cyn=ty+L.len*1.14,rr=u*.8;K.card(g,cxn-rr,cyn-rr,rr*2,rr*2,rr,'#e8eeff',{blur:u*.2,dy:u*.06,hi:false});g.save();g.translate(cxn,cyn);
      const toward=botNow==='N'?1:-1; /* 바늘의 S극(흰색)이 N극 쪽을 향해요: 위쪽(자석 쪽) */
      const ang=(st.rev?easeOut(st.rt/.7):1)*0;g.rotate(toward>0?0:Math.PI);
      g.fillStyle='#ff5a7a';g.beginPath();g.moveTo(0,rr*.75);g.lineTo(-rr*.18,0);g.lineTo(rr*.18,0);g.closePath();g.fill();g.fillStyle='#6b7aa8';g.beginPath();g.moveTo(0,-rr*.75);g.lineTo(-rr*.18,0);g.lineTo(rr*.18,0);g.closePath();g.fill();g.restore();
      D.label(g,'나침반',cxn,cyn+rr+u*.35,clamp(u*.3,10,14),'#9db0e6');
      if(!st.rev)K.txt(g,'?',mx+L.wid*3.4,ty+L.len*.5,{size:u*1.1,color:'rgba(255,229,138,.7)'});}
    g.restore();}
};
