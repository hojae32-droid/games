/* 퀴즈형 게임 공통 진행: 새 문제 → 고르기/시간 초과 → 풀이 보여 주기 → 자동으로 다음 문제
   게임 쪽에서 make(p,L), isOk(q,i,p), tipOf(q,timeout), onNew(p,q), onVerdict(p,q,ok,i,timeout), upd(p,dt), askHtml(q), askSub(q), qtime(q) 를 넣어요. */
const QZ={
  mix(G,o){o=o||{};Object.assign(G,{
    newQ(p){const st=p.state;const L=this.level?this.level(p):p.levelId;const q=this.make(p,L);st.q=q;st.n++;st.lock=false;st.pick=-1;st.res=null;st.rT=0;
      st.qmax=(this.qtime?this.qtime(q):20)/p.pace;st.qt=st.qmax;
      p.ask((this.askHtml?this.askHtml(q):q.text),this.askSub?this.askSub(q):'');if(this.onNew)this.onNew(p,q);
      if(p.n===1&&q.speak&&o.say)setTimeout(()=>{if(p.active&&st.q===q)QK.say(q.speak);},350);},
    verdict(p,i,timeout){const st=p.state,q=st.q;if(!q||st.lock)return;st.lock=true;st.pick=i;const ok=!timeout&&this.isOk(q,i,p);st.res=ok?'ok':'bad';st.rT=0;st.mood=ok?'happy':'oops';st.mT=1.6;
      const frac=st.qmax>0?Math.max(0,st.qt/st.qmax):.5;const pts=ok?(this.ptsOf?this.ptsOf(p,q,frac):Math.round((o.pts0||60)+(o.pts1==null?60:o.pts1)*frac)):undefined;
      if(ok)st.okN=(st.okN||0)+1;
      p.hit(ok,{pts,x:p.W/2,y:(p.top||0)+p.u*3,tip:ok?(this.goodTip?this.goodTip(q):undefined):(timeout?'시간이 다 됐어요! ':'')+(this.tipOf?this.tipOf(q):q.reveal),review:q.review,tipMs:ok?1000:3200,pen:o.pen});
      if(this.onVerdict)this.onVerdict(p,q,ok,i,timeout);
      setTimeout(()=>{if(p.active)this.newQ(p);},ok?(o.okMs||1300):(o.badMs||2700));},
    update(p,dt){const st=p.state;st.T+=dt;if(st.mT>0){st.mT-=dt;if(st.mT<=0)st.mood='neutral';}if(st.res)st.rT+=dt;if(st.press){st.press.t-=dt;if(st.press.t<=0)st.press=null;}
      if(this.upd)this.upd(p,dt);
      if(st.q&&!st.lock&&st.qmax>0&&!(this.hold&&this.hold(p))){st.qt-=dt;if(st.qt<=0)this.verdict(p,-1,true);}},
  });},
  /* 시간 막대 */
  bar(g,x,y,w,h,f,st){f=Math.max(0,Math.min(1,f));K.rr(g,x,y,w,h,h/2);g.fillStyle='rgba(0,0,0,.14)';g.fill();K.rr(g,x,y,Math.max(h,w*f),h,h/2);g.fillStyle=f>.4?(st&&st.good)||'#22c55e':(f>.2?'#f59e0b':'#ef4444');g.fill();},
};
