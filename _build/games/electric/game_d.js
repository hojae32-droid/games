
/* ═════════ 미션 5 : 전기 안전 · 절약 순찰 ═════════ */
function plugShape(g,x,y,rot,s){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
  g.strokeStyle='#2a3a76';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(0,28);g.bezierCurveTo(0,44,18,40,24,52);g.stroke();
  g.fillStyle='#c4cfe8';g.fillRect(-11,-30,5,18);g.fillRect(6,-30,5,18);
  const gr=g.createLinearGradient(-16,0,16,0);gr.addColorStop(0,'#f3f6ff');gr.addColorStop(1,'#aeb9d8');g.fillStyle=gr;K.rr(g,-17,-14,34,44,9);g.fill();
  g.fillStyle='rgba(60,80,140,.25)';g.fillRect(-17,-2,34,3);g.fillRect(-17,6,34,3);g.restore();}
function dropShape(g,x,y,r){g.save();g.fillStyle='#4da3ff';g.beginPath();g.moveTo(x,y-r*1.5);g.bezierCurveTo(x+r*1.1,y-r*.2,x+r,y+r,x,y+r);g.bezierCurveTo(x-r,y+r,x-r*1.1,y-r*.2,x,y-r*1.5);g.fill();
  g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(x-r*.35,y+r*.1,r*.18,r*.35,.3,0,TAU);g.fill();g.restore();}
function sparkShape(g,x,y,s){g.save();g.fillStyle='#ffd23f';g.strokeStyle='#fff6c0';g.lineWidth=1.5;g.beginPath();g.moveTo(x+s*.15,y-s);g.lineTo(x-s*.5,y+s*.1);g.lineTo(x-s*.05,y+s*.1);g.lineTo(x-s*.2,y+s);g.lineTo(x+s*.5,y-s*.2);g.lineTo(x+s*.05,y-s*.2);g.closePath();g.fill();g.stroke();g.restore();}
function wavy(g,x,y,len,amp,col){g.save();g.strokeStyle=col;g.lineWidth=3.4;g.lineCap='round';g.beginPath();for(let i=0;i<=20;i++){const t=i/20;const px=x+Math.sin(t*Math.PI*3)*amp,py=y-t*len;i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();g.restore();}
function tvShape(g,on){g.fillStyle='#10193a';K.rr(g,-40,-30,80,56,7);g.fill();
  const gr=g.createLinearGradient(-34,-24,34,20);gr.addColorStop(0,on?'#7fd0ff':'#27335e');gr.addColorStop(1,on?'#3a7bff':'#1b2548');g.fillStyle=gr;K.rr(g,-35,-25,70,46,4);g.fill();
  g.fillStyle='#2a3a76';g.fillRect(-14,26,28,7);g.fillRect(-24,32,48,4);}
function bulbShape(g,lit,led){const r=24;g.save();g.translate(0,-8);D.bulb(g,0,0,r,lit?1:0,0);g.restore();
  g.fillStyle='#8fa0cc';g.fillRect(-11,18,22,9);g.fillStyle='#667ab5';g.fillRect(-9,27,18,7);
  if(led){g.fillStyle='#3df0b8';K.rr(g,-14,16,28,11,3);g.fill();g.fillStyle='#04251c';g.font='bold 10px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('LED',0,22);}}
const SI={
  wetplug(g){plugShape(g,0,8,0,1);[[-30,-24],[30,-18],[0,-40],[-20,18],[26,22]].forEach(q=>dropShape(g,q[0],q[1],6));},
  strip(g){g.fillStyle='#e8eeff';K.rr(g,-46,10,92,26,6);g.fill();g.fillStyle='#2a3a76';for(let i=0;i<5;i++){K.rr(g,-38+i*17,15,12,16,3);g.fill();}
    for(let i=0;i<4;i++){g.save();g.translate(-32+i*17,6);g.fillStyle=['#e0455d','#4da3ff','#3df0b8','#ffd23f'][i];K.rr(g,-6,-22-i%2*6,12,22+i%2*6,3);g.fill();g.restore();}
    wavy(g,-24,-24,18,4,'#ff7a5a');wavy(g,6,-30,22,4,'#ff5a7a');wavy(g,30,-24,16,4,'#ff7a5a');},
  fray(g){g.strokeStyle='#3a4a86';g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(-46,10);g.bezierCurveTo(-30,-8,-14,24,0,6);g.stroke();
    g.strokeStyle='#e58a3a';g.lineWidth=3.2;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(0,6);g.quadraticCurveTo(14,6+i*3,28,-4+i*9);g.stroke();}sparkShape(g,30,-14,13);},
  lamp(g){g.save();g.translate(0,-2);for(let i=0;i<8;i++){const a=i/8*TAU;g.strokeStyle='rgba(255,226,120,.8)';g.lineWidth=3;g.beginPath();g.moveTo(Math.cos(a)*34,Math.sin(a)*34-6);g.lineTo(Math.cos(a)*44,Math.sin(a)*44-6);g.stroke();}bulbShape(g,true,false);g.restore();
    g.fillStyle='#3a4a86';K.rr(g,-30,34,60,9,3);g.fill();g.fillStyle='#56608a';g.fillRect(-22,43,4,8);g.fillRect(18,43,4,8);},
  tv(g){g.save();g.translate(0,-2);tvShape(g,true);g.restore();g.fillStyle='#ffe58a';g.font='bold 15px sans-serif';g.textAlign='center';g.fillText('z z Z',34,-34);},
  charger(g){g.fillStyle='#e8eeff';K.rr(g,-34,-20,30,38,6);g.fill();g.fillStyle='#c4cfe8';g.fillRect(-27,-30,5,10);g.fillRect(-16,-30,5,10);
    g.strokeStyle='#2a3a76';g.lineWidth=4;g.beginPath();g.moveTo(-19,18);g.bezierCurveTo(-19,40,14,30,12,12);g.stroke();
    g.fillStyle='#10193a';K.rr(g,4,-26,34,56,6);g.fill();g.fillStyle='#3df0b8';K.rr(g,8,-22,26,48,3);g.fill();g.fillStyle='#04251c';g.font='bold 13px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('100%',21,2);},
  fridge(g){g.fillStyle='#cfd8ef';K.rr(g,-26,-42,52,84,6);g.fill();g.fillStyle='#10193a';g.fillRect(-20,-36,40,72);
    g.fillStyle='#e8eeff';g.beginPath();g.moveTo(-26,-42);g.lineTo(-48,-34);g.lineTo(-48,34);g.lineTo(-26,42);g.closePath();g.fill();g.fillStyle='rgba(120,200,255,.7)';
    g.beginPath();g.arc(2,6,10,0,TAU);g.arc(14,20,8,0,TAU);g.arc(-6,24,9,0,TAU);g.fill();g.strokeStyle='#4da3ff';g.lineWidth=2.4;g.beginPath();g.moveTo(30,-4);g.lineTo(46,-10);g.moveTo(30,6);g.lineTo(48,8);g.moveTo(30,16);g.lineTo(44,26);g.stroke();},
  yank(g){plugShape(g,-14,-6,-.5,1);g.strokeStyle='#2a3a76';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-2,26);g.lineTo(30,32);g.stroke();
    g.strokeStyle='#ffd23f';g.lineWidth=4;g.beginPath();g.moveTo(34,32);g.lineTo(52,36);g.moveTo(44,26);g.lineTo(52,36);g.lineTo(44,44);g.stroke();sparkShape(g,18,-26,11);},
  plughold(g){plugShape(g,0,-2,0,1);g.fillStyle='#f2b894';K.rr(g,-24,6,48,24,10);g.fill();g.fillStyle='#e8a47c';K.rr(g,-22,0,10,16,5);g.fill();K.rr(g,12,0,10,16,5);g.fill();
    g.strokeStyle='#3df0b8';g.lineWidth=6;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(24,-34);g.lineTo(32,-26);g.lineTo(46,-44);g.stroke();},
  lampoff(g){g.save();g.translate(-12,0);bulbShape(g,false,false);g.restore();g.fillStyle='#e8eeff';K.rr(g,18,-18,24,38,5);g.fill();g.fillStyle='#2a3a76';K.rr(g,23,-8,14,18,3);g.fill();g.fillStyle='#e8eeff';g.font='bold 9px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('OFF',30,12);},
  unplug(g){g.fillStyle='#e8eeff';K.rr(g,6,-24,34,48,8);g.fill();g.fillStyle='#2a3a76';K.rr(g,16,-12,5,14,2);g.fill();K.rr(g,26,-12,5,14,2);g.fill();
    plugShape(g,-24,0,-.2,.85);g.strokeStyle='#ffd23f';g.lineWidth=3;g.beginPath();g.moveTo(-6,-6);g.lineTo(2,-6);g.stroke();},
  led(g){g.save();g.translate(0,-4);bulbShape(g,true,true);g.restore();g.fillStyle='#3df0b8';g.font='bold 14px sans-serif';g.textAlign='center';g.fillText('절약!',0,46);},
  grade1(g){g.fillStyle='#e8eeff';K.rr(g,-34,-38,68,76,8);g.fill();g.fillStyle='#3df0b8';K.rr(g,-34,-38,68,20,8);g.fill();g.fillStyle='#04251c';g.font='bold 12px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('에너지',0,-28);
    g.fillStyle='#10193a';g.font='bold 44px sans-serif';g.fillText('1',-8,6);g.font='bold 14px sans-serif';g.fillText('등급',16,18);g.fillStyle='#3df0b8';g.fillRect(-26,26,52,5);},
  dryplug(g){g.fillStyle='#e8eeff';K.rr(g,6,-24,34,48,8);g.fill();g.fillStyle='#2a3a76';K.rr(g,16,-12,5,14,2);g.fill();K.rr(g,26,-12,5,14,2);g.fill();
    plugShape(g,-14,0,-.1,.85);g.fillStyle='#ffd23f';g.beginPath();g.arc(-26,-32,9,0,TAU);g.fill();for(let i=0;i<8;i++){const a=i/8*TAU;g.strokeStyle='#ffd23f';g.lineWidth=2.4;g.beginPath();g.moveTo(-26+Math.cos(a)*13,-32+Math.sin(a)*13);g.lineTo(-26+Math.cos(a)*18,-32+Math.sin(a)*18);g.stroke();}},
};
const SAFE=[
  {id:'wetplug',name:'젖은 손으로 플러그 만지기',bad:1,tag:'감전 위험',note:'물은 전기가 잘 통해서 젖은 손으로 플러그를 만지면 <b>감전</b>될 수 있어요'},
  {id:'strip',name:'멀티탭 하나에 플러그 가득',bad:1,tag:'화재 위험',note:'콘센트 하나에 플러그를 많이 꽂으면 전선이 뜨거워져 <b>불이 날</b> 수 있어요'},
  {id:'fray',name:'피복이 벗겨진 전선',bad:1,tag:'감전 위험',note:'피복이 벗겨진 전선은 만지면 <b>감전</b>되고 불이 날 수도 있어요'},
  {id:'lamp',name:'아무도 없는데 켜진 전등',bad:1,tag:'전기 낭비',note:'쓰지 않는 전등은 꺼서 <b>전기를 아껴요</b>'},
  {id:'tv',name:'보지 않는데 켜 둔 TV',bad:1,tag:'전기 낭비',note:'보지 않을 때는 TV를 꺼서 <b>전기를 아껴요</b>'},
  {id:'charger',name:'충전이 끝났는데 꽂힌 충전기',bad:1,tag:'전기 낭비',note:'충전이 끝나면 플러그를 뽑아서 <b>전기를 아껴요</b>'},
  {id:'fridge',name:'문이 열려 있는 냉장고',bad:1,tag:'전기 낭비',note:'냉장고 문을 오래 열어 두면 냉기가 빠져서 <b>전기가 더 들어요</b>'},
  {id:'yank',name:'전선을 잡고 확 잡아당기기',bad:1,tag:'감전 위험',note:'플러그를 뽑을 때는 전선이 아니라 <b>플러그 몸통</b>을 잡아요'},
  {id:'plughold',name:'플러그 몸통을 잡고 뽑기',bad:0,note:'<b>올바른 행동</b>이에요! 플러그 몸통을 잡고 뽑아요'},
  {id:'lampoff',name:'나가면서 전등 끄기',bad:0,note:'<b>올바른 행동</b>이에요! 전기를 아낄 수 있어요'},
  {id:'unplug',name:'쓰지 않는 기구의 플러그 뽑기',bad:0,note:'<b>올바른 행동</b>이에요! 전기를 아낄 수 있어요'},
  {id:'led',name:'전기를 적게 쓰는 LED 전등',bad:0,note:'<b>올바른 선택</b>이에요! 전기를 적게 써요'},
  {id:'grade1',name:'에너지 소비 효율 1등급 제품',bad:0,note:'<b>올바른 선택</b>이에요! 전기를 적게 쓰는 제품이에요'},
  {id:'dryplug',name:'마른 손으로 플러그 꽂기',bad:0,note:'<b>올바른 행동</b>이에요! 손이 마른 상태에서 만져요'},
];
const TAGC={'감전 위험':'#ff5a7a','화재 위험':'#ff8a3d','전기 낭비':'#4da3ff'};
function wrap2(str){const w=String(str).split(' ');if(w.length<2)return[str];let best=1,bd=1e9;for(let i=1;i<w.length;i++){const a=w.slice(0,i).join(' ').length,b=w.slice(i).join(' ').length;if(Math.abs(a-b)<bd){bd=Math.abs(a-b);best=i;}}return[w.slice(0,best).join(' '),w.slice(best).join(' ')];}
const M5={
  init(p){const st=p.state,R=p.R;const nb=R.int(2,4);const bad=R.sample(SAFE.filter(s=>s.bad),nb),ok=R.sample(SAFE.filter(s=>!s.bad),6-nb);
    st.cards=R.shuffle([...bad,...ok]).map(o=>({...o,fixed:false,shake:0,wrong:false}));st.need=nb;st.fixedN=0;st.lock=false;
    p.ask(`🔍 <b>위험하거나 전기를 낭비</b>하는 모습 <b>${nb}곳</b>을 찾아 눌러요`,'올바른 행동을 누르면 감점이에요');p.tools([],()=>{});},
  lay(p){const A=areaOf(p),u=p.u;const land=A.w>A.h*1.05;const cols=land?3:2,rows=land?2:3;const m=u*.3,gp=u*.3;
    const cw=(A.w-m*2-gp*(cols-1))/cols,ch=(A.h-m*2-gp*(rows-1))/rows;const out=[];
    for(let i=0;i<6;i++){const c=i%cols,r=Math.floor(i/cols);out.push({x:m+c*(cw+gp),y:m+r*(ch+gp),w:cw,h:ch});}return out;},
  down(p,x,y){const st=p.state;if(st.lock)return;const L=this.lay(p);
    for(let i=0;i<6;i++){if(!K.inRect(x,y,L[i]))continue;const c=st.cards[i];if(c.fixed||c.wrong)return;const r=L[i];
      if(c.bad){c.fixed=true;st.fixedN++;zap(p);goodHit(p,90,r.x+r.w/2,r.y+r.h*.4,`<b>${c.tag}</b> · ${c.note}`);
        if(st.fixedN>=st.need){st.lock=true;nextRound(p,1100);}}
      else{c.wrong=true;c.shake=.5;p.hit(false,{pen:30,x:r.x+r.w/2,y:r.y+r.h*.4,tip:`<b>${c.name}</b>: ${c.note}`,tipMs:3000,review:`${c.name} → ${plain(c.note)}`});}
      return;}},
  draw(p,g,A,dt){const st=p.state,u=p.u;const L=this.lay(p);const a=intro(p);g.save();g.globalAlpha=a;g.translate(0,(1-a)*u*.6);
    st.cards.forEach((c,i)=>{const r=L[i];c.shake=Math.max(0,c.shake-dt);const sx=c.shake>0?Math.sin(c.shake*60)*u*.12:0;
      g.save();g.translate(sx,0);
      const bg=c.fixed?'#134638':c.wrong?'#3a2540':'#1a2a60';const bd=c.fixed?'rgba(61,240,184,.85)':c.wrong?'rgba(255,90,122,.6)':'rgba(120,150,255,.38)';
      K.card(g,r.x,r.y,r.w,r.h,u*.3,bg,{blur:u*.3,dy:u*.1,stroke:bd,lw:c.fixed?3:1.5,hi:false});
      const isz=Math.min(r.w*.62,r.h*.56);const cx=r.x+r.w/2,cy=r.y+r.h*.4;
      g.save();g.translate(cx,cy);g.scale(isz/100,isz/100);g.shadowColor='rgba(0,0,0,.4)';g.shadowBlur=isz*.1;SI[c.id](g);g.restore();
      const fs=clamp(Math.min(r.h*.115,r.w*.092),11,20);const ls=wrap2(c.name);const ly=r.y+r.h*.8;
      ls.forEach((s,k)=>K.txt(g,s,cx,ly+(k-(ls.length-1)/2)*fs*1.2,{size:fs,maxW:r.w*.94,color:c.fixed?'#c9fff0':'#e8eeff'}));
      if(c.fixed){K.box(g,r.x+r.w*.5-u*1.35,r.y+u*.2,u*2.7,u*.75,u*.25,TAGC[c.tag]||'#4da3ff');K.txt(g,c.tag,r.x+r.w*.5,r.y+u*.58,{size:clamp(u*.42,11,17),color:'#fff'});
        g.save();g.strokeStyle='#3df0b8';g.lineWidth=u*.22;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(cx-isz*.2,cy+isz*.02);g.lineTo(cx-isz*.04,cy+isz*.18);g.lineTo(cx+isz*.24,cy-isz*.16);g.stroke();g.restore();}
      if(c.wrong){K.emo(g,'❌',r.x+r.w-u*.7,r.y+u*.7,u*.8);}
      g.restore();});
    g.restore();}
};

/* ═════════ 게임 정의 ═════════ */
const MIS={circuit:M1,cond:M2,conn:M3,magnet:M4,safe:M5};
const IC={
  circuit:'<svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="20" cy="9" r="5" fill="#ffd23f" stroke="#0b1430" stroke-width="2"/><rect x="14" y="28" width="12" height="6" rx="1.5" fill="currentColor"/></svg>',
  cond:'<svg viewBox="0 0 40 40"><path d="M14 8v21a6 6 0 0 0 12 0V12a4 4 0 0 0-8 0v15" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>',
  conn:'<svg viewBox="0 0 40 40"><rect x="5" y="14" width="13" height="12" rx="2" fill="currentColor"/><rect x="18" y="17" width="3" height="6" fill="currentColor"/><rect x="22" y="14" width="13" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="3"/><path d="M5 31h30" stroke="currentColor" stroke-width="2.4" stroke-dasharray="3 3"/></svg>',
  magnet:'<svg viewBox="0 0 40 40"><path d="M9 8v14a11 11 0 0 0 22 0V8" fill="none" stroke="currentColor" stroke-width="7"/><path d="M5.5 8h7M27.5 8h7" stroke="#ff5a7a" stroke-width="7"/><path d="M5.5 14h7M27.5 14h7" stroke="#e8eeff" stroke-width="5"/></svg>',
  safe:'<svg viewBox="0 0 40 40"><path d="M20 5L37 34H3z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/><path d="M20 15v10" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><circle cx="20" cy="29.5" r="2.2" fill="currentColor"/></svg>',
  all:'<svg viewBox="0 0 40 40"><path d="M20 4l4.6 10.6 11.4 1-8.6 7.6 2.6 11.2L20 28.2 10 34.4l2.6-11.2L4 15.6l11.4-1z" fill="currentColor"/></svg>',
};
const GAME={
  id:'sci6-electric-town',title:'정전 마을 전기 기사',title1:'정전 마을',title2:'전기 기사',emoji:LOGO,
  subtitle:'6학년 과학 · 전기의 이용',
  howto:'마을이 <b>정전</b>됐어요! 전기 기사가 되어 <b>회로를 고치고</b>, 물체를 <b>테스터로 검사</b>하고, <b>전자석 크레인</b>을 움직이고, 위험한 곳을 찾아 보세요. 미션을 해결할 때마다 마을의 창문에 불이 하나씩 켜져요.',
  how(p){const m={circuit:'전선 타일을 <b>톡톡</b> 돌려 <b>끊어지지 않는 회로</b>를 만들고<br><b>스위치</b>를 닫아 전구를 켜요',cond:'물체를 <b>회로 테스터</b>에 끼워 보고<br><b>전구가 켜지는</b> 물체 2개를 찾아요',conn:'두 회로를 비교해서<br><b>직렬·병렬</b> 연결의 차이를 맞혀요',magnet:'전지와 코일로 <b>전자석</b>을 세게 만들어<br>클립을 들어 올려요',safe:'<b>위험하거나 전기를 낭비</b>하는 모습을<br>찾아 눌러요 (올바른 행동은 감점!)',all:'회로 · 테스터 · 연결 · 전자석 · 안전<br><b>다섯 가지 미션</b>이 번갈아 나와요'};return m[p.levelId]||'';},
  theme:{c1:'#ffd23f',c2:'#3ee6ff'},
  durs:[90,120,180],
  vignette:.1,
  hero:heroScene,
  levelTitle:'고칠 일 고르기',
  levels:[
    {id:'circuit',g:'6학년 · 전기의 이용',t:'전기 회로 완성하기',d:'전선을 돌려 전구 켜기 · 스위치',ic:IC.circuit},
    {id:'cond',g:'6학년 · 전기의 이용',t:'전기가 통하는 물체',d:'회로 테스터로 검사하기',ic:IC.cond},
    {id:'conn',g:'6학년 · 전기의 이용',t:'전지·전구 연결하기',d:'직렬 · 병렬 비교',ic:IC.conn},
    {id:'magnet',g:'6학년 · 전기의 이용',t:'전자석 크레인',d:'전자석의 세기 · 극',ic:IC.magnet},
    {id:'safe',g:'6학년 · 전기의 이용',t:'전기 안전·절약 순찰',d:'위험·낭비 찾기',ic:IC.safe},
    {id:'all',g:'6학년 · 전기의 이용',t:'모두 섞기',d:'다섯 미션이 번갈아 나와요',ic:IC.all},
  ],
  summary:`<ul><li>전구에 불이 켜지려면 전지의 (+)극과 (−)극, 전구가 <b>끊어지지 않게</b> 이어져야 해요 (전기 회로). 스위치를 닫아야 전기가 흘러요.</li>
    <li>전기가 통하는 물체: 철·구리·알루미늄 같은 <b>금속</b> · 통하지 않는 물체: 고무·나무·플라스틱·유리·종이</li>
    <li>전지를 <b>직렬</b>로 연결하면 전구가 더 밝아요. <b>병렬</b>로 연결하면 밝기는 전지 1개와 같지만 더 오래 켜져요.</li>
    <li>전구를 <b>직렬</b>로 연결하면 어둡고 한 개를 빼면 모두 꺼져요. <b>병렬</b>로 연결하면 밝고 한 개를 빼도 나머지는 켜져 있어요.</li>
    <li><b>전자석</b>: 전기가 흐를 때만 자석이 돼요. 전지를 직렬로 더 연결하거나 코일을 더 많이 감으면 세져요. 전지의 방향을 바꾸면 N극과 S극이 바뀌어요.</li>
    <li>젖은 손으로 전기 기구를 만지지 않고, 한 콘센트에 플러그를 많이 꽂지 않아요. 안 쓰는 전기 기구는 끄거나 플러그를 뽑아 전기를 아껴요.</li></ul>`,
  init(p){const st=p.state;st.T=0;this.round(p);},
  round(p){const st=p.state;const L=p.levelId;const k=L==='all'?p.deck(['circuit','cond','conn','magnet','safe'],'kinds'):L;
    st.k=k;st.lock=false;st.t0=st.T||0;st.rev=false;p.ctrl.innerHTML='';MIS[k].init(p);},
  draw(p,g,dt){bgScene(p,g,dt);const st=p.state;if(!st.k)return;MIS[st.k].draw(p,g,areaOf(p),dt);},
  down(p,x,y){const st=p.state;if(st.k&&MIS[st.k].down)MIS[st.k].down(p,x,y);},
  resize(p){const st=p.state;if(st.k==='circuit'&&st.grid){const A=areaOf(p);const want=A.w>A.h*1.05?7:5;if(st.C!==want&&!st.lock)M1.gen(p);}},
};
Engine.boot(GAME);
