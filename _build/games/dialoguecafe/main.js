/* 5~6학년 영어 · 의사소통 — 카페 영어 대화
   디자인: 분필로 쓴 메뉴판이 걸린 아늑한 동네 카페. 손님이 건네는 영어 말에 어울리는 대답을 골라 대화를 이어 가요. 팁(☕)을 모아 보세요! */
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const CH='#f8efe0',AM='#f4b860',BR='#c97b4a';
const LOGO=gkLogo('#3b2a1f','#f4b860','☕');
const LV={
  '5':{g:'5~6학년',t:'5학년 일상 대화',d:'주문·길 묻기·시간·전화 같은 생활 대화'},
  '6':{g:'5~6학년',t:'6학년 생각 나누기',d:'계획·과거 경험·이유·충고를 나누는 대화'},
};
function hero(g,W,H,T,u){g.fillStyle='#2b1d14';g.fillRect(0,0,W,H);g.strokeStyle='rgba(248,239,224,.5)';g.lineWidth=3;g.setLineDash([u*.4,u*.3]);g.strokeRect(u*.5,u*.5,W-u,H-u);g.setLineDash([]);
  K.card(g,W*.08,H*.15,W*.4,H*.3,u*.3,'#f8efe0',{stroke:'#c97b4a',lw:4,blur:0,dy:u*.06,sc:'#140c07'});K.txt(g,'Hello! Can I help you?',W*.28,H*.3,{size:u*.62,color:'#3b2a1f',maxW:W*.36});
  K.card(g,W*.5,H*.5,W*.42,H*.3,u*.3,'#f4b860',{stroke:'#c97b4a',lw:4,blur:0,dy:u*.06,sc:'#140c07'});K.txt(g,'A hot chocolate, please.',W*.71,H*.65,{size:u*.62,color:'#3b2a1f',maxW:W*.38});
  K.emo(g,'☕',W*.12,H*.7+Math.sin(T*2)*u*.1,u*1.6);K.emo(g,'👩',W*.5,H*.1,u*1.4);K.emo(g,'🥐',W*.88,H*.25,u*1.2);}
const C={
      '5':[
        ['👩',[['Hello! Can I help you?','Yes, I would like a hot chocolate, please.','I am fine, thank you.','It is two o\'clock.'],['Small or large?','Small, please.','Yes, I do.','At the park.'],['That is three dollars.','Here you are.','No, thanks.','I am sorry.']]],
        ['👦',[['Excuse me. Where is the library?','It is next to the bank.','I like books.','Yes, it is.'],['How can I get there?','Go straight and turn left.','I am ten years old.','It is Monday.'],['Thank you very much!','You are welcome.','Good morning.','Me too, I am hungry.']]],
        ['👧',[['Hi! How are you today?','I am great, thanks. And you?','I am ten years old.','It is on the desk.'],['What do you want to do after school?','Let us play soccer.','I was at home.','It is red.'],['Great idea! See you at three.','See you later!','Nice to meet you.','I am sorry.']]],
        ['🧑‍🍳',[['What would you like to eat?','I would like spaghetti, please.','Yes, I can.','I am twelve.'],['Anything to drink?','Water, please.','It is delicious.','Turn right.'],['Here is your food. Enjoy!','Thank you. It looks good!','Excuse me, where is it?','Goodbye, see you.']]],
        ['👵',[['Excuse me, what time is it?','It is four thirty.','It is Tuesday.','I am fine.'],['Is the bus coming soon?','Yes, in five minutes.','No, I am a student.','Yes, I do.'],['Thank you, dear.','No problem.','Happy birthday!','I like blue.']]],
        ['🧑',[['Do you like this shirt?','Yes, I do. It looks cool.','Yes, it is Monday.','No, it is far.'],['It is twelve dollars.','I will take it.','I am hungry.','It is far.'],['Anything else?','No, that is all.','Yes, I am twelve.','It is sunny.']]],
        ['🧒',[['Hello? Is this Mina?','Yes, speaking.','It is ten o\'clock.','I like pizza.'],['Can you come to my birthday party?','Sure! I would love to.','It is blue.','It is under the desk.'],['It is on Saturday at two.','Great! See you then.','Good morning.','I am twelve.']]],
        ['🧑‍⚕️',[['What is the matter?','I have a headache.','It is my birthday.','Yes, I do.'],['Take this medicine and rest.','Okay. Thank you, doctor.','Happy birthday!','Nice to meet you.'],['Get well soon.','Thank you.','I am hungry.','Turn left.']]],
      ],
      '6':[
        ['🧳',[['May I see your passport, please?','Sure. Here it is.','I am a student.','It is in Seoul.'],['How long will you stay?','For five days.','By airplane.','At the hotel.'],['Enjoy your trip!','Thank you. Have a nice day!','I am sorry, I am late.','I do not have any.']]],
        ['🍽️',[['Is everything okay with your meal?','Actually, my soup is cold.','I went there yesterday.','My pleasure.'],['I am so sorry. I will bring a new one.','That is okay. Thank you.','You are welcome.','It is Tuesday.'],['Anything else?','No, thank you. The bill, please.','Yes, I was born in May.','I will be a doctor.']]],
        ['🧑‍🤝‍🧑',[['What are you going to do this weekend?','I am going to visit my grandparents.','I visited my grandparents.','I am good at cooking.'],['Sounds nice! How will you get there?','We will take the train.','We took the train yesterday.','It takes two hours.'],['Have a great time!','Thanks! You too.','I am doing well.','Yes, I have.']]],
        ['🧑‍🎓',[['What did you do yesterday?','I went to the zoo with my family.','I am going to the zoo.','I like the zoo.'],['Did you see the pandas?','Yes, I did. They were cute.','Yes, I am.','No, they do not.'],['Sounds fun!','It was great. You should go!','I am sorry to hear that.','See you at five.']]],
        ['😴',[['You look tired. What is wrong?','I stayed up late last night.','I am going to be a pilot.','It is far from here.'],['You should go to bed early.','You are right. I will.','Yes, I can swim.','It is Thursday.'],['Take care!','Thanks. You too.','Nice to meet you.','I am twelve.']]],
        ['👩‍👧',[['Mom, may I use your phone?','Sure, but only for ten minutes.','No, I am sad.','Yes, you are.'],['Thank you! I want to call my friend.','Okay. Do not talk too long.','I went to bed.','I am from Busan.'],['I will finish in five minutes.','Good. Dinner is almost ready.','I am twelve years old.','Turn right at the corner.']]],
        ['🛍️',[['Which is better, the red one or the blue one?','I think the blue one is better.','Yes, the blue one.','It is five dollars.'],['Why do you think so?','Because it is lighter and cheaper.','At the department store.','In the morning.'],['Okay, let us buy it.','Great! I will pay.','Nice to meet you.','I was born in May.']]],
        ['☔',[['I forgot my umbrella, and it is raining!','Do not worry. You can share mine.','I am having a good time.','It is my favorite season.'],['That is so kind of you.','No problem. That is what friends are for.','I am sorry I am late.','Yes, it is heavy.'],['Let us go before it gets worse.','Okay, let us hurry!','It is two o\'clock.','I will be a teacher.']]],
      ],
};
const GAME={
  id:'dialoguecafe',title:'카페 영어 대화',title1:'분필 카페',title2:'영어 대화',emoji:LOGO,
  subtitle:'5~6학년 영어 · 알맞은 대답으로 대화 이어 가기',
  howto:'☕ 손님이 영어로 말을 걸어요. <b>대화에 알맞은 대답</b>을 골라 이어 가요. 엉뚱한 대답을 하면 손님의 ❤️이 하나씩 줄고, 0이 되면 손님이 돌아가요! 대화를 잘 마치면 팁 ☕을 받아요.',
  how:p=>LV[p.levelId].t+' — '+LV[p.levelId].d,
  theme:{c1:AM,c2:BR},hero:gkHero(hero),vignette:.05,durs:[120,180,300],levelTitle:'어떤 손님을 맞을까요?',
  txt:{who:'누가 바리스타일까요?',dur:'영업 시간',pace:'대답 시간',seat:'번 바리스타 ',go:'영업 시작!',s1:'1. 손님',s2:'2. 방법',s3:'3. 이름'},
  levels:Object.entries(LV).map(([k,v])=>({id:k,g:v.g,t:v.t,d:v.d})),
  summary:`<ul><li>질문의 <b>첫 낱말</b>(What, Where, When, Do you…?)을 보면 어떤 대답이 어울리는지 알 수 있어요.</li>
    <li>인사에는 <b>Thank you. / You are welcome.</b>처럼 짝이 되는 대답이 있어요.</li>
    <li>시간(It is four thirty.), 장소(It is next to the bank.)처럼 묻는 것에 맞춰 대답해요.</li></ul>`,
  geo(p){const W=p.W,H=p.H,u=p.u,top=(p.top||0)+u*.2,pad=u*.4;const th=Math.min(u*2.6,H*.12);const top1={x:pad,y:top,w:W-pad*2,h:th};const ow=Math.min(W-pad*2,u*28);const oh=Math.min(u*2.5,(H*.38)/3);const gap=u*.25;const oy=H-pad-(oh*3+gap*2);const opts=[0,1,2].map(i=>({x:(W-ow)/2,y:oy+i*(oh+gap),w:ow,h:oh}));const log={x:pad,y:top1.y+th+u*.3,w:W-pad*2,h:oy-u*.4-(top1.y+th+u*.3)};return{W,H,u,top,pad,top1,opts,log,oh};},
  init(p){const st=p.state;st.data=C[p.levelId];st.bag=EN.bag(st.data,()=>p.R.f());Object.assign(st,{T:0,cu:null,ti:0,hearts:3,tips:0,phase:'idle',t0:0,cur:null,opts:[],msgs:[],face:'🙂',q:[],right:-1,wrong:-1,lim:14});this.nextCust(p);},
  at(st,t,fn){st.q.push({t,fn});},
  nextCust(p){const st=p.state;st.cu=st.bag();st.ti=0;st.hearts=3;st.face=st.cu[0];st.msgs=[];this.turn(p);},
  turn(p){const st=p.state,R=p.R;st.cur=st.cu[1][st.ti];st.msgs.push({c:'c',t:st.cur[0]});st.opts=EN.shuffle([st.cur[1],st.cur[2],st.cur[3]],()=>R.f());st.phase='play';st.t0=st.T;st.right=-1;st.wrong=-1;p.ask('☕ '+st.cu[0]+' 손님과 대화해요','알맞은 대답을 골라요');enSay(st.cur[0],.8);},
  update(p,dt){const st=p.state;st.T+=dt;
    if(st.phase==='play'&&st.T-st.t0>st.lim)this.answer(p,-1);
    if(st.q.length){st.q.forEach(e=>e.t-=dt);const due=st.q.filter(e=>e.t<=0);st.q=st.q.filter(e=>e.t>0);due.forEach(e=>e.fn());}},
  down(p,x,y){const st=p.state,G=this.geo(p);if(st.phase!=='play')return;for(let i=0;i<3;i++){const o=G.opts[i];if(x>=o.x&&x<=o.x+o.w&&y>=o.y&&y<=o.y+o.h){this.answer(p,i);return;}}},
  answer(p,i){const st=p.state,G=this.geo(p);st.phase='wait';const cur=st.cur;const ri=st.opts.indexOf(cur[1]);st.right=ri;const ok=i===ri;const o=G.opts[Math.max(0,i)];
    if(i>=0)st.msgs.push({c:'p',t:st.opts[i]});
    if(ok){p.hit(true,{pts:EN.pts(Math.min(st.T-st.t0,12),12),x:o.x+o.w/2,y:o.y});st.ti++;
      if(st.ti>=st.cu[1].length){st.tips++;st.face='😄';this.at(st,1.5,()=>this.nextCust(p));}else this.at(st,.9,()=>this.turn(p));}
    else{st.wrong=i;p.hit(false,{pen:5,shake:false,x:o.x+o.w/2,y:o.y,tip:i<0?'시간이 다 됐어요':'어울리지 않는 대답이에요',tipMs:1300,review:cur[0]+' → '+cur[1]});st.hearts--;st.face=st.hearts<=0?'😠':'😕';
      if(st.hearts<=0)this.at(st,1.9,()=>this.nextCust(p));else{st.ti++;if(st.ti>=st.cu[1].length)this.at(st,1.9,()=>this.nextCust(p));else this.at(st,1.8,()=>{st.face=st.cu[0];this.turn(p);});}}},
  botAct(p){const st=p.state,G=this.geo(p);if(st.phase!=='play')return null;const i=st.opts.indexOf(st.cur[1]);const o=G.opts[i],rc=p.cv.getBoundingClientRect();return{k:'click',x:rc.left+o.x+o.w/2,y:rc.top+o.y+o.h/2};},
  draw(p,g){const st=p.state,G=this.geo(p),W=G.W,H=G.H,u=G.u;if(!st.cur)return;
    g.fillStyle='#2b1d14';g.fillRect(0,0,W,H);g.fillStyle='rgba(255,220,160,.07)';g.beginPath();g.arc(W*.25,H*.2,H*.4,0,TAU);g.fill();
    g.strokeStyle='rgba(248,239,224,.35)';g.lineWidth=2;g.setLineDash([u*.35,u*.25]);K.rr(g,u*.15,G.top+u*.1,W-u*.3,H-G.top-u*.25,u*.5);g.stroke();g.setLineDash([]);
    // top row
    const T=G.top1;K.emo(g,st.face,T.x+T.h*.55,T.y+T.h*.5,T.h*.9);K.txt(g,'❤️'.repeat(Math.max(0,st.hearts))+'🖤'.repeat(3-Math.max(0,st.hearts)),T.x+T.w*.5,T.y+T.h*.5,{size:Math.min(T.h*.5,W*.055),color:CH});
    K.txt(g,'☕ '+st.tips,T.x+T.w-Math.min(u*1.8,W*.1),T.y+T.h*.5,{size:Math.min(T.h*.55,W*.06),color:AM,maxW:W*.2});
    if(st.phase==='play')QZ.bar(g,T.x,T.y+T.h+u*.05,T.w,Math.max(4,u*.12),Math.max(0,1-(st.T-st.t0)/st.lim),{good:AM});
    // chat
    const L=G.log;let ls=Math.min(u*1.05,L.h/4.5);let items;for(;;){g.font=K.font(ls);const mw=L.w*.74;items=st.msgs.slice(-4).map(m=>({m,lines:enWrap(g,m.t,mw-ls*1.2)}));const tot=items.reduce((a,b)=>a+b.lines.length*ls*1.2+ls*.9,0);if(tot<=L.h||ls<9)break;ls*=.92;}
    let y=L.y+L.h;for(let k=items.length-1;k>=0;k--){const it=items[k],h=it.lines.length*ls*1.2+ls*.6;y-=h;if(y<L.y-2)break;let mw=0;g.font=K.font(ls);it.lines.forEach(l=>mw=Math.max(mw,g.measureText(l).width));const bw=mw+ls*1.2;const mine=it.m.c==='p';const bx=mine?L.x+L.w-bw:L.x;const old=k<items.length-1;
      g.globalAlpha=old?.65:1;K.card(g,bx,y,bw,h,ls*.5,mine?AM:CH,{stroke:mine?BR:'#d6c3a0',lw:3,blur:0,dy:ls*.08,sc:'#140c07'});it.lines.forEach((l,i)=>K.txt(g,l,bx+bw/2,y+ls*.3+ls*.6+i*ls*1.2,{size:ls,color:'#3b2a1f',maxW:bw}));g.globalAlpha=1;y-=ls*.3;}
    // options
    st.opts.forEach((t,i)=>{const o=G.opts[i];const isR=st.phase==='wait'&&st.right===i,isW=st.wrong===i;g.fillStyle=isR?'rgba(134,239,172,.25)':isW?'rgba(248,113,113,.3)':'rgba(255,255,255,.06)';K.rr(g,o.x,o.y,o.w,o.h,u*.35);g.fill();g.lineWidth=isR?5:3;g.strokeStyle=isR?'#86efac':isW?'#f87171':CH;g.setLineDash(isR||isW?[]:[u*.3,u*.2]);g.stroke();g.setLineDash([]);
      let os=Math.min(o.h*.42,u*1.3),lines;for(;;){g.font=K.font(os);lines=enWrap(g,t,o.w*.82);if(lines.length*os*1.15<=o.h*.9||os<8)break;os*=.92;}
      lines.forEach((l,li)=>K.txt(g,l,o.x+o.w/2+u*.35,o.y+o.h/2+(li-(lines.length-1)/2)*os*1.15,{size:os,color:CH,maxW:o.w*.84}));K.txt(g,String(i+1),o.x+u*.5,o.y+o.h/2,{size:Math.min(o.h*.4,u),color:AM});});
  },
};
Engine.boot(GAME);
