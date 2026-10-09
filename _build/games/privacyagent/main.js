/* 5~6학년 실과 · 정보 윤리와 개인정보 보호 — 개인정보 보안 요원
   디자인: 검은 화면에 초록 글자가 흐르는 사이버 보안실. 친구가 올리려는 게시글에서 위험한 정보를 눌러 검은 줄(검열)로 가려요. 안전한 문장을 가리면 감점! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const INK='#b7ffd6',GRN='#39ff88',BG='#05140c';
const LOGO=gkLogo('#05140c','#39ff88','🕵️');
const LV={
  '5':{g:'5~6학년',t:'알아보기 쉬운 위험',d:'전화번호·주소·비밀번호 찾기'},
  '6':{g:'5~6학년',t:'숨은 위험',d:'위치 태그·배경 사진·피싱 찾기'},
};
    const S=(t)=>({t,r:0}),X=(t,w)=>({t,r:1,w});
    const PAD={
      '5':[
        ['🎢','놀이공원 다녀온 날',[S('놀이공원에 다녀왔어요 🎢'),S('롤러코스터가 정말 재밌었어요'),S('내 별명은 코딩왕 😎'),X('내 전화번호는 010-1234-5678','전화번호는 개인정보예요'),X('우리 집은 햇살아파트 101동 502호','집 주소는 알려 주면 안 돼요'),X('내 주민등록번호 앞자리는 140512','주민번호·생년월일은 절대 비밀!')]],
        ['🎮','게임 레벨 업',[S('오늘 게임 레벨 업! 🎮'),S('같이 해 준 친구 고마워'),S('다음 목표는 30레벨'),X('내 게임 아이디 coding_boy / 비밀번호 1234','비밀번호는 누구에게도 알리면 안 돼요'),X('엄마 카드 번호는 5412-8890-…','카드 번호는 위험해요'),X('내 진짜 이름은 김하늘, 햇살초 5학년 3반','실명과 학교·반은 함께 알리면 위험해요')]],
        ['🏫','학교 자랑',[S('오늘 급식 맛있었다 🍚'),S('체육 시간에 피구 이겼다'),S('내일은 소풍!'),X('이름표가 보이는 내 사진 (햇살초 5-3 김하늘)','이름표엔 학교와 이름이 있어요'),X('친구 얼굴 사진 (친구 허락을 안 받았어요)','다른 사람 사진은 허락을 받아야 해요'),X('학원 끝나는 시간은 5시, 혼자 집에 가요','혼자 있는 시간은 알리면 위험해요')]],
        ['🐶','우리 강아지',[S('우리 강아지 콩이 🐶'),S('콩이는 간식을 좋아해요'),S('산책은 즐거워'),X('산책은 매일 6시 햇살공원 벤치에서 해요','매일 가는 장소와 시간이 알려져요'),X('우리 집 현관 비밀번호는 4321','집 비밀번호는 절대 비밀!'),X('엄마 전화번호 010-9876-5432','다른 사람의 전화번호도 개인정보예요')]],
        ['✈️','여행 계획',[S('가족 여행 기대돼요 ✈️'),S('바다에서 수영할 거예요'),S('맛있는 회도 먹고 싶어'),X('이번 주 토요일부터 3일간 우리 집은 비어 있어요','집이 비는 시간은 알리면 위험해요'),X('숙소 이름과 방 호수는 301호예요','묵는 곳을 알리면 위험해요'),X('비행기표 예약번호 AB12CD','예약번호는 개인정보예요')]],
        ['🎨','그림 대회',[S('미술 대회에서 상을 받았어요 🎨'),S('열심히 그린 보람이 있어요'),S('응원해 준 선생님 감사해요'),X('상장에 내 이름과 생년월일이 그대로 보여요','이름과 생년월일은 가려야 해요'),X('우리 집 사진과 약도를 올렸어요','집 위치가 알려져요'),X('내 이메일 hana@mail.com / 비밀번호 hana1','계정 정보는 비밀!')]],
      ],
      '6':[
        ['📷','놀이터 사진 올리기',[S('친구들과 놀이터에서 신나게 놀았어요'),S('날씨가 정말 좋았다 ☀️'),S('다음엔 자전거 탈 거야'),X('사진 배경에 우리 집 현관과 호수가 보여요','사진 배경에도 개인정보가 숨어 있어요'),X('위치 태그: 햇살초등학교 앞 문구점','위치 태그는 내가 있는 곳을 알려 줘요'),X('친구가 올리지 말라고 한 사진이에요','친구의 동의 없이 올리면 안 돼요')]],
        ['💬','메시지와 링크',[S('오늘 숙제 어렵다 ㅠㅠ'),S('과학 실험 재미있었어요'),S('내일 발표 떨려요'),X('모르는 사람이 보낸 링크를 눌러 로그인했어요','가짜 사이트(피싱)일 수 있어요'),X('친구에게 내 계정 비밀번호를 빌려줬어요','비밀번호는 친구에게도 알리지 않아요'),X('"사진 보내 주면 선물 줄게" 대화에 답장했어요','낯선 사람의 부탁은 어른께 알려요')]],
        ['🎥','실시간 방송',[S('게임 방송 시작합니다 🎥'),S('오늘은 퀴즈 풀이를 해요'),S('구독과 좋아요 부탁해요'),X('실시간 위치 공유가 켜져 있어요','내 위치가 계속 알려져요'),X('방송 화면에 택배 송장(이름·주소)이 보여요','송장에는 이름과 주소가 있어요'),X('시청자에게 우리 집 근처 놀이터를 알려 줬어요','집 근처 장소도 위험해요')]],
        ['🤖','학급 앱과 AI',[S('모둠 활동 자료를 올립니다'),S('자료 조사 열심히 했어요'),S('출처도 꼼꼼히 적었어요'),X('AI 앱에 내 이름·학교·주소를 모두 입력했어요','AI에도 개인정보를 입력하면 안 돼요'),X('아무 QR코드나 스캔해서 앱을 설치했어요','출처를 모르는 QR코드는 위험해요'),X('앱 가입 때 주민등록번호 앞자리를 입력했어요','꼭 필요하지 않은 정보는 주지 않아요')]],
        ['🙂','SNS 프로필',[S('취미: 그림 그리기 🎨'),S('좋아하는 음식: 떡볶이'),S('별명: 코딩왕'),X('프로필에 실명·학교·학년·반을 모두 적었어요','너무 많은 정보를 공개했어요'),X('프로필 사진이 이름표가 보이는 단체 사진이에요','사진 속 이름표도 개인정보예요'),X('계정 공개 범위가 "전체 공개"예요','공개 범위를 친구로 제한해야 해요')]],
        ['🛵','배달 후기',[S('오늘 간식은 떡볶이 🍢'),S('배달 앱 후기 5점!'),S('정말 맛있었어요'),X('후기 사진에 영수증(이름·주소)이 같이 찍혔어요','영수증에는 이름과 주소가 있어요'),X('후기에 "엄마 없을 때 혼자 있어요"라고 썼어요','혼자 있다는 정보는 위험해요'),X('배달 요청 메모에 집 비밀번호를 적었어요','비밀번호는 어디에도 적지 않아요')]],
      ],
    };

const RANKS=['신입 요원','요원','선임 요원','팀장','국장'];
function wrapKo(g,s,maxW){const out=[];let line='';for(const ch of String(s)){const t=line+ch;if(g.measureText(t).width>maxW&&line){out.push(line);line=ch===' '?'':ch;}else line=t;}if(line)out.push(line);return out;}
function hero(g,W,H,T,u){g.fillStyle=BG;g.fillRect(0,0,W,H);g.font=K.font(u*.5);g.fillStyle='rgba(57,255,136,.25)';g.textAlign='left';for(let i=0;i<16;i++)for(let j=0;j<6;j++)g.fillText('0101 1010'.slice((i+j)%4,(i+j)%4+5),(i*W/14+(T*30)%40)%W,H*.1+j*H*.15);
  K.card(g,W*.18,H*.2,W*.64,H*.58,u*.2,'#0b2417',{stroke:GRN,lw:3,blur:u*.5,dy:0,sc:'rgba(57,255,136,.5)'});['오늘 놀이공원에 다녀왔어요 🎢','내 전화번호는 010-1234-5678','우리 집은 햇살아파트 101동'].forEach((t,i)=>{const y=H*.32+i*u*1.5;K.txt(g,t,W/2,y,{size:u*.5,color:INK,maxW:W*.58});if(i>0){const k=Math.min(1,((T*.6+i*.3)%1.6));g.fillStyle='#000';g.fillRect(W*.2+W*.6*(1-k)*0,y-u*.5,W*.6*k,u);}});K.emo(g,'🕵️',W*.82,H*.82,u*1.6);}
const GAME={
  id:'privacyagent',title:'개인정보 보안 요원',title1:'사이버 보안실',title2:'개인정보 보안 요원',emoji:LOGO,
  subtitle:'5~6학년 실과 · 정보 윤리와 개인정보 보호',
  howto:'🕵️ 친구가 올리려는 게시글에서 <b>인터넷에 올리면 위험한 정보</b>를 눌러 <b>검은 줄</b>로 가려요! 올려도 괜찮은 문장을 가리면 감점이에요. 위험한 것은 <b>3개씩</b> 숨어 있어요. 모두 가리면 게시글 통과! 빠르게 찾을수록 점수가 커요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:'#16a34a',c2:GRN},hero:gkHero(hero),vignette:.04,durs:[90,120,180],levelTitle:'어떤 임무를 맡을까요?',
  txt:{who:'누가 요원일까요?',dur:'임무 시간',pace:'제한 시간',seat:'번 요원 ',go:'임무 시작!',s1:'1. 임무',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li><b>개인정보</b>는 이름·전화번호·주소·주민등록번호·비밀번호처럼 나를 알아볼 수 있는 정보예요. 인터넷에 올리면 누구나 볼 수 있어요.</li>
    <li>사진 배경, <b>위치 태그</b>, 이름표, 영수증, 집이 비는 시간도 개인정보가 될 수 있어요.</li>
    <li>낯선 링크(<b>피싱</b>)는 누르지 않고, 비밀번호는 친구에게도 알려 주지 않아요. 다른 사람의 사진은 허락을 받아요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.3,pad=u*.4,gap=u*.2;const msgH=Math.min(u*2.4,H*.13);const hdr=u*1.6;const card={x:pad,y:top,w:W-pad*2,h:H-top-pad-msgH-gap};
    const n=6;const rh=(card.h-hdr-gap*(n+1))/n;const rows=Array.from({length:n},(_,i)=>({x:card.x+u*.3,y:card.y+hdr+gap+i*(rh+gap),w:card.w-u*.6,h:rh}));
    return{W,H,u,top,pad,card,hdr,rows,msg:{x:pad,y:H-pad-msgH,w:W-pad*2,h:msgH}};},
  init(p){const st=p.state;Object.assign(st,{T:0,C:null,items:[],left:0,hid:new Set(),bad:new Map(),msg:'',msgC:'',t0:0,wait:0,done:false,posts:0,flash:0,rank:0});this.next(p);},
  next(p){const st=p.state,R=p.R;const C=p.deck(PAD[p.levelId],'pa');st.C=C;st.items=R.shuffle(C[2].slice());st.left=st.items.filter(i=>i.r).length;st.hid=new Set();st.bad=new Map();st.t0=st.T;st.done=false;st.wait=0;st.msg='위험한 정보를 눌러 가려요';st.msgC='';st.posts++;
    p.ask('🕵️ 위험한 정보 '+st.left+'개를 가려요','안전한 문장을 가리면 감점!');},
  update(p,dt){const st=p.state;st.T+=dt;if(st.flash>0)st.flash-=dt;st.bad.forEach((t,k)=>{if(st.T-t>.6)st.bad.delete(k);});
    if(!st.done&&st.T-st.t0>34){st.done=true;st.wait=2.4;st.msg='시간 끝! 위험한 정보가 남아 있어요';st.msgC='bad';st.items.forEach((it,i)=>{if(it.r)st.hid.add(i);});const un=st.items.find((it,i)=>it.r&&!st.hid.has(i));p.hit(false,{pen:10,shake:false,tip:'시간이 다 됐어요',tipMs:1200,review:st.C[1]+': 놓친 위험 정보 → '+st.items.filter(i=>i.r).map(i=>i.t+' ('+i.w+')').join(' / ')});}
    if(st.wait>0){st.wait-=dt;if(st.wait<=0)this.next(p);}},
  down(p,x,y){const st=p.state;if(st.done)return;const G=this.geo(p);const i=G.rows.findIndex(r=>K.inRect(x,y,r));if(i<0||st.hid.has(i))return;const it=st.items[i],r=G.rows[i];
    if(it.r){st.hid.add(i);st.left--;st.flash=.25;const el=st.T-st.t0;st.t0=st.T-Math.max(0,el-0);const pts=Math.round(45+45*Math.max(0,1-el/14));p.hit(true,{pts,x:r.x+r.w/2,y:r.y});st.msg='가렸어요! '+it.w;st.msgC='good';p.Snd.noise&&p.Snd.noise(.1,2400,.2);
      if(st.left<=0){st.done=true;st.wait=2.0;st.msg='✅ 안전한 게시글이 됐어요!';st.rank++;}}
    else{st.bad.set(i,st.T);p.hit(false,{pen:15,shake:false,x:r.x+r.w/2,y:r.y,tip:'안전한 문장이에요',tipMs:900,review:st.C[1]+': 「'+it.t+'」은(는) 올려도 괜찮은 내용이에요 (위험한 정보: '+st.items.filter(k=>k.r).map(k=>k.t).join(' / ')+')'});st.msg='앗! 이건 올려도 괜찮은 내용이에요';st.msgC='bad';}},
  botAct(p){const st=p.state;if(st.done)return null;const G=this.geo(p);const i=st.items.findIndex((it,k)=>it.r&&!st.hid.has(k));if(i<0)return null;const r=G.rows[i];const rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+r.x+r.w/2,y:rc.top+r.y+r.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u,C=st.C;if(!C)return;
    g.fillStyle=BG;g.fillRect(0,0,W,H);g.strokeStyle='rgba(57,255,136,.06)';g.lineWidth=1;for(let x=0;x<W;x+=u*.9){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();}for(let y=(st.T*20)%(u*.9);y<H;y+=u*.9){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
    const c=G.card;K.card(g,c.x,c.y,c.w,c.h,u*.25,'#0b2417',{stroke:st.flash>0?'#fff':GRN,lw:Math.max(3,u*.08),blur:u*.4,dy:0,sc:'rgba(57,255,136,.45)'});
    K.txt(g,C[0]+' '+C[1],c.x+u*.5,c.y+G.hdr*.5,{size:Math.min(u*.8,c.w/16),color:INK,align:'left',maxW:c.w*.52});K.txt(g,'🔍 위험 '+st.left+'개'+(c.w>u*18?' · '+RANKS[Math.min(4,Math.floor(st.rank/3))]:''),c.x+c.w-u*.4,c.y+G.hdr*.5,{size:Math.min(u*.55,c.w/24),color:GRN,align:'right',maxW:c.w*.36});
    st.items.forEach((it,i)=>{const r=G.rows[i];const hid=st.hid.has(i);const bad=st.bad.has(i);K.rr(g,r.x,r.y,r.w,r.h,u*.15);g.fillStyle=bad?'#4a1010':'#0f2f1e';g.fill();g.lineWidth=2;g.strokeStyle=bad?'#ef4444':'rgba(57,255,136,.5)';g.stroke();
      const fs=Math.min(r.h*.36,u*.7,r.w/18);g.font=K.font(fs);g.fillStyle=INK;g.textAlign='left';g.textBaseline='middle';const ls=wrapKo(g,it.t,r.w-u*1.8);
      K.txt(g,hid?'🔒':'🔍',r.x+u*.6,r.y+r.h/2,{size:Math.min(r.h*.5,u*.8)});g.fillStyle=hid?'#6b8f7a':INK;ls.slice(0,2).forEach((l,k)=>g.fillText(l,r.x+u*1.2,r.y+r.h/2+(k-(Math.min(ls.length,2)-1)/2)*fs*1.15));
      if(hid){const k=1;g.fillStyle='#000';g.fillRect(r.x+u*1.1,r.y+r.h*.18,r.w-u*1.3,r.h*.64);g.strokeStyle='#ef4444';g.lineWidth=2;g.strokeRect(r.x+u*1.1,r.y+r.h*.18,r.w-u*1.3,r.h*.64);K.txt(g,'CLASSIFIED',r.x+r.w/2+u*.5,r.y+r.h/2,{size:Math.min(r.h*.38,u*.6),color:'#ef4444',maxW:r.w*.6});}});
    const M=G.msg;K.card(g,M.x,M.y,M.w,M.h,u*.2,'#021008',{stroke:st.msgC==='bad'?'#ef4444':GRN,lw:2,blur:0,dy:0});g.font=K.font(Math.min(u*.6,M.h*.3));const fs3=Math.min(u*.6,M.h*.3);g.fillStyle=st.msgC==='bad'?'#fca5a5':INK;g.textAlign='center';g.textBaseline='middle';const ml=wrapKo(g,st.msg,M.w-u);ml.slice(0,2).forEach((l,i)=>g.fillText(l,M.x+M.w/2,M.y+M.h/2+(i-(Math.min(ml.length,2)-1)/2)*fs3*1.2));
    if(!st.done)QZ.bar(g,c.x+u*.3,c.y+c.h-u*.18,c.w-u*.6,Math.max(5,u*.12),Math.max(0,1-(st.T-st.t0)/34),{good:GRN});
  },
};
Engine.boot(GAME);
