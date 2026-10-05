  buildSetup(){
    const G=this.G,S=$('#setup');S.innerHTML='';const X=Object.assign({who:'누구와 함께 할까요?',n:'몇 명이 할까요?',dur:'작업 시간',seat:'번 기사 ',go:'작업 시작!',pickN:'몇 명이 할지 먼저 골라 주세요.',pickWho:'누구와 함께 할지 먼저 골라 주세요.'},G.txt||{});
    const top=h('div','topbar-mini');
    const fsb=h('button','icon-btn',ICO.fs);fsb.title='전체 화면';fsb.onclick=toggleFS;top.appendChild(fsb);
    S.appendChild(top);
    /* 왼쪽: 정전된 마을이 하나씩 밝아지는 그림 + 네온 간판 */
    const booth=h('div','booth');const bcv=h('canvas');bcv.setAttribute('aria-hidden','true');booth.appendChild(bcv);
    const sign=h('div','sign',`<span class="sub">${G.subtitle||''}</span><h1><span class="l1">${G.title1||''}</span><span class="l2">${G.title2||G.title}</span></h1>`);booth.appendChild(sign);
    booth.appendChild(h('div','booth-how',G.howto||''));
    S.appendChild(booth);
    this.hero=G.hero?G.hero(bcv):null;
    /* 오른쪽: 배전반(차단기를 하나씩 올리면 준비 끝) */
    const col=h('div','counter-col');S.appendChild(col);
    const W=h('div','form');col.appendChild(W);
    const cfg=this.cfg={level:null,mode:null,n:null,dur:null,nicks:[],room:'',netRole:null,joinCode:'',watch:false};
    const secs={};
    const sec=(key,title,parent=W)=>{const s=h('section','stn');s.dataset.sec=key;s.innerHTML=`<div class="stn-h"><i class="lamp"></i><h2>${title}</h2><em class="needmsg">골라 주세요</em></div>`;parent.appendChild(s);secs[key]=s;return s;};
    const lit=(key,on)=>{if(secs[key]){secs[key].classList.toggle('done',!!on);if(on)secs[key].classList.remove('need');}};
    const chips=(parent,items,onSel,cls='')=>{const c=h('div','chips'+(cls?' '+cls:''));items.forEach(it=>{const b=h('button','chip',(it.ic||'')+`<span>${it.label}${it.small?`<small>${it.small}</small>`:''}</span>`);b.type='button';
      b.onclick=()=>{Snd.tap();c.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');onSel(it.v);};c.appendChild(b);});parent.appendChild(c);return c;};
    const s1=sec('level',G.levelTitle||'고칠 일 고르기');
    const groups={};G.levels.forEach(l=>{(groups[l.g]=groups[l.g]||[]).push(l);});
    const allChipBoxes=[];const many=Object.keys(groups).length>1;
    Object.entries(groups).forEach(([g,ls])=>{const gg=h('div','grade-group');if(many)gg.appendChild(h('div','gl',g));s1.appendChild(gg);
      const box=chips(gg,ls.map(l=>({label:l.t,small:l.d,v:l.id,ic:l.ic})),v=>{allChipBoxes.forEach(b=>b!==box&&b.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel')));cfg.level=v;lit('level',1);},'lv');
      allChipBoxes.push(box);});
    const s2=sec('mode',X.who);
    const maxP=G.maxPlayers||4;
    const MI={solo:'<svg viewBox="0 0 40 40"><circle cx="20" cy="13" r="7" fill="currentColor"/><path d="M7 35c1-8 6-12 13-12s12 4 13 12z" fill="currentColor"/></svg>',
      board:'<svg viewBox="0 0 40 40"><rect x="3" y="6" width="34" height="23" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 6v23" stroke="currentColor" stroke-width="2.5"/><path d="M14 35h12M20 29v6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
      device:'<svg viewBox="0 0 40 40"><rect x="4" y="7" width="14" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><rect x="22" y="7" width="14" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="11" cy="28" r="1.6" fill="currentColor"/><circle cx="29" cy="28" r="1.6" fill="currentColor"/></svg>'};
    chips(s2,[{label:'혼자 하기',small:'나 혼자 연습',v:'solo',ic:MI.solo},{label:'한 화면 대결',small:`전자칠판 · 2~${maxP}명`,v:'board',ic:MI.board},{label:'각자 기기 대결',small:`2~${maxP}명 · 방 코드`,v:'device',ic:MI.device}],v=>{cfg.mode=v;lit('mode',1);refresh();},'md');
    const s3=sec('n',X.n);
    const nOpts=[];for(let k=2;k<=maxP;k++)nOpts.push({label:k+'명',v:k});
    chips(s3,nOpts,v=>{cfg.n=v;lit('n',1);refresh();},'tm');
    const s4=sec('dur',X.dur);
    chips(s4,this.durs.map(c=>({label:this.durText(c),v:c})),v=>{cfg.dur=v;lit('dur',1);},'tm');
    const s5=sec('nick','닉네임');
    const nickBox=h('div');s5.appendChild(nickBox);
    const nickHint=h('div','hint','개인 정보 보호를 위해 이름 대신 닉네임을 써요. 🎲를 누르면 닉네임을 정해 줘요.');s5.appendChild(nickHint);
    const roomWrap=h('div');s5.appendChild(roomWrap);Net.ui(roomWrap,cfg,()=>refresh());
    const nickDone=()=>{const n=cfg.nicks.length;const ok=cfg.mode&&cfg.nicks.every(x=>x)&&!(cfg.mode==='device'&&Net.need(cfg).length);lit('nick',ok&&(n>0||cfg.mode==='device'));};
    const st=h('button','fire',`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M23 3L8 23h10l-3 14 17-22H22z" fill="currentColor"/></svg><span>${X.go}</span>`);
    st.id='startBtn';st.type='button';
    const refresh=()=>{
      s3.style.display=cfg.mode==='board'?'':'none';
      roomWrap.style.display=cfg.mode==='device'?'':'none';
      const guest=Net.isGuestSetup(cfg);s1.style.display=guest?'none':'';s4.style.display=guest?'none':'';
      const n=cfg.mode==='board'?(cfg.n||0):(cfg.mode?(Net.isWatchSetup(cfg)?0:1):0);
      while(cfg.nicks.length<n)cfg.nicks.push('');cfg.nicks.length=n;
      nickBox.innerHTML=n?'':(cfg.mode?(cfg.mode==='board'?'<div class="hint">'+X.pickN+'</div>':'<div class="hint">진행만 하면 닉네임이 필요 없어요.</div>'):'<div class="hint">'+X.pickWho+'</div>');
      nickHint.style.display=n?'':'none';
      for(let i=0;i<n;i++){const r=h('div','nick-row');
        r.innerHTML=`<span class="dot" style="background:${PHEX[i]}"></span><input maxlength="10" placeholder="${n>1?(i+1)+X.seat:''}닉네임"><button class="dice" type="button" title="랜덤 닉네임">🎲</button>`;
        const inp=$('input',r);inp.value=cfg.nicks[i];
        inp.oninput=()=>{cfg.nicks[i]=inp.value.trim();nickDone();};
        $('.dice',r).onclick=()=>{Snd.tap();inp.value=randNick(cfg.nicks);cfg.nicks[i]=inp.value;nickDone();};
        nickBox.appendChild(r);}
      st.querySelector('span').textContent=cfg.mode==='device'?(cfg.netRole==='join'?'방에 들어가기':'방 만들기'):X.go;
      nickDone();
    };
    refresh();
    W.appendChild(st);
    st.onclick=()=>{
      const miss=[];const guest=Net.isGuestSetup(cfg);
      if(!cfg.level&&!guest)miss.push('level');if(!cfg.mode)miss.push('mode');
      if(cfg.mode==='board'&&!cfg.n)miss.push('n');
      if(!cfg.dur&&!guest)miss.push('dur');
      if(cfg.mode&&(cfg.nicks.some(x=>!x)||(cfg.mode==='device'&&Net.need(cfg).length)))miss.push('nick');
      Object.values(secs).forEach(s=>s.classList.remove('need'));
      if(miss.length){miss.forEach(k=>{const s=secs[k];void s.offsetWidth;s.classList.add('need');});secs[miss[0]].scrollIntoView({behavior:'smooth',block:'center'});Snd.bad();return;}
      if(cfg.mode==='device')Net.go(cfg);else this.start();
    };
    W.appendChild(h('div','maker','제작 : 비춤이샘'));
  },
