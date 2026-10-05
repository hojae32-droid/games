/* ===== 비춤이샘 수업용 게임 · 각자 기기 대결 (PeerJS · 가입 없이 기기끼리 연결) =====
   방 만들기 → 대기실(누가 들어왔는지) → 방장이 시작 → 모두 같은 문제 → 실시간 점수판 → 다 같이 보는 최종 등수 */
(function(){
'use strict';
const css=`
#lobby,#netboard{overflow-y:auto;align-items:center;padding:24px 16px 40px}
.nl-wrap{width:min(720px,100%)}
.nl-card{background:#fff;border-radius:26px;padding:20px 22px;box-shadow:0 8px 0 rgba(0,0,0,.06),0 12px 30px rgba(0,0,0,.08);border:3px solid var(--c1);text-align:center}
.nl-tag{display:inline-block;font-family:Jua;font-size:16px;background:var(--c1);color:#fff;border-radius:999px;padding:2px 12px}
.nl-card h2{font-family:Jua;font-weight:400;font-size:clamp(24px,4vw,34px);margin:8px 0 2px;color:var(--c1)}
.nl-code{display:inline-block;font-family:Jua;font-size:clamp(46px,12vw,76px);letter-spacing:.22em;padding:2px 6px 2px 22px;border:3px dashed var(--c1);border-radius:20px;margin:8px 0;color:#111}
.nl-set{color:var(--sub);font-size:16px;margin:4px 0 10px}
.nl-list{display:flex;flex-direction:column;gap:8px;margin:12px 0;text-align:left}
.nl-p{display:flex;align-items:center;gap:10px;background:#f8fafc;border:3px solid var(--line);border-radius:16px;padding:8px 14px;font-family:Jua;font-size:22px}
.nl-p .dot{width:18px;height:18px;border-radius:50%;flex:0 0 auto}
.nl-p .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nl-p .bd{font-family:'Gowun Dodum';font-size:14px;color:var(--sub);white-space:nowrap}
.nl-p.me{border-color:var(--c1)}
.nl-p.empty{color:#cbd5e1;border-style:dashed;font-size:18px}
.nl-p.left{opacity:.45}
.nl-p .bar{flex:0 0 32%;height:12px;border-radius:6px;background:#e5e7eb;overflow:hidden}
.nl-p .bar i{display:block;height:100%;border-radius:6px;transition:width .4s}
.nl-p .pt{min-width:70px;text-align:right}
.nl-p .rk{width:34px;text-align:center;font-size:24px}
.nl-hint{color:var(--sub);font-size:15px;line-height:1.6;margin:6px 0}
.nl-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}
.nl-btns button{font-family:Jua;font-size:24px;padding:12px 26px;border:none;border-radius:18px;background:var(--c1);color:#fff;box-shadow:0 5px 0 #0003}
.nl-btns button.sub{background:#fff;color:var(--ink);border:3px solid var(--line);box-shadow:0 4px 0 #0001}
.nl-btns button:disabled{opacity:.4;box-shadow:none}
.nl-role{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0}
.nl-join{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:10px}
.nl-join input{font-family:Jua;font-size:28px;width:160px;text-align:center;letter-spacing:8px;padding:8px;border-radius:14px;border:3px solid var(--line)}
.nl-chk{display:flex;align-items:center;gap:8px;font-size:16px;margin-top:10px;cursor:pointer}
.nl-chk input{width:22px;height:22px}
.nl-msg{margin-top:8px;font-size:15px;color:var(--bad);min-height:1em}
.nl-msg.ok{color:var(--ok)}
.netstrip{display:flex;gap:6px;align-items:center;padding:4px 8px;overflow-x:auto;background:#ffffffd9;border-bottom:2px solid #0000000d;flex:0 0 auto;white-space:nowrap}
.netstrip .ch{display:inline-flex;align-items:center;gap:5px;font-family:Jua;font-size:16px;background:#fff;border:2px solid var(--line);border-radius:999px;padding:1px 10px}
.netstrip .ch.me{border-color:var(--c1);background:#fffbeb}
.netstrip .ch .dot{width:11px;height:11px;border-radius:50%}
.netstrip .ch.done{opacity:.75}
.netstrip .ch.left{opacity:.4;text-decoration:line-through}
.netstrip .lb{font-family:Jua;color:var(--sub);font-size:14px}
.netstrip .endall{margin-left:auto;font-family:Jua;font-size:14px;border:2px solid var(--bad);color:var(--bad);background:#fff;border-radius:999px;padding:1px 10px}
.nl-me{outline:4px solid #facc15;outline-offset:3px}
#netboard .nl-wrap{width:min(1100px,100%)}
#netboard .nl-p{font-size:clamp(24px,3.4vw,42px);padding:14px 20px}
#netboard .nl-p .bar{height:20px;border-radius:10px}
#netboard .nl-p .dot{width:26px;height:26px}
#netboard .nl-p .rk{width:56px;font-size:clamp(26px,3.4vw,42px)}
#netboard .nl-p .pt{min-width:120px}
`;
const PHEX=['#2f6fed','#e5484d','#12a150','#a35ae6'];
const MAX=4;
const $=(s,r=document)=>r.querySelector(s);
const h=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.innerHTML=x;return e;};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const medal=['🥇','🥈','🥉','🏅'];

const Net={
  on:false,role:null,peer:null,conns:[],conn:null,code:'',roster:[],myId:null,watch:false,started:false,final:false,seed:null,set:null,gone:false,timers:[],
  E:null,

  init(E){this.E=E;const st=h('style');st.textContent=css;document.head.appendChild(st);
    ['lobby','netboard'].forEach(id=>{if(!document.getElementById(id)){const s=h('div','screen');s.id=id;document.body.appendChild(s);}});
    window.addEventListener('beforeunload',()=>this.leave(true));},
  prefix(){return 'bichum-'+String(this.E.G.id).replace(/[^a-z0-9-]/gi,'')+'-';},
  opts(){return Object.assign({debug:0},window.__PEER_OPTS||{});},
  load(){return new Promise((res,rej)=>{if(window.Peer)return res();const sc=h('script');sc.src=window.__PEER_SRC||'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';
    sc.onload=()=>window.Peer?res():rej(new Error('noPeer'));sc.onerror=()=>rej(new Error('load'));document.head.appendChild(sc);});},

  /* ---------- 설정 화면 5번 칸 (각자 기기 대결일 때) ---------- */
  ui(box,cfg,onChange){
    box.innerHTML='';
    const role=h('div','nl-role');
    const mk=(v,label,small)=>{const b=h('button','chip',label+(small?`<small>${small}</small>`:''));b.type='button';b.onclick=()=>{this.E.sndTap&&this.E.sndTap();role.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');cfg.netRole=v;draw();onChange();};return b;};
    role.append(mk('host','🏠 방 만들기','선생님 또는 대표 한 명'),mk('join','🚪 방 들어가기','방 코드 4자리 입력'));
    box.appendChild(role);
    const more=h('div');box.appendChild(more);
    this.msgEl=h('div','nl-msg');box.appendChild(this.msgEl);
    const draw=()=>{more.innerHTML='';
      if(cfg.netRole==='host'){const c=h('label','nl-chk',`<input type="checkbox"> 나는 진행만 할게요 <span style="color:var(--sub)">(전자칠판에 점수판 띄우기 · 닉네임 필요 없음)</span>`);
        const ib=$('input',c);ib.checked=!!cfg.watch;ib.onchange=()=>{cfg.watch=ib.checked;onChange();};more.appendChild(c);
        more.appendChild(h('div','hint','방을 만들면 4자리 방 코드가 나와요. 친구들이 들어오면 대기실에서 이름이 보이고, 방장이 <b>시작</b>을 누르면 모두 똑같은 문제로 동시에 시작해요. (최대 4명)'));}
      else if(cfg.netRole==='join'){const j=h('div','nl-join',`<b class="jua" style="font-size:20px">방 코드</b><input inputmode="numeric" maxlength="4" placeholder="----">`);
        const inp=$('input',j);inp.value=cfg.joinCode||'';inp.oninput=()=>{inp.value=inp.value.replace(/\D/g,'').slice(0,4);cfg.joinCode=inp.value;};more.appendChild(j);
        more.appendChild(h('div','hint','단원과 문제 수는 방장이 정해요. 닉네임과 방 코드만 넣고 들어가세요.'));}};
    draw();
  },
  /* 설정 화면 검사: 빠진 칸 key 목록 */
  need(cfg){const m=[];if(!cfg.netRole)m.push('nick');else if(cfg.netRole==='join'&&!/^\d{4}$/.test(cfg.joinCode||''))m.push('nick');return m;},
  isGuestSetup(cfg){return cfg.mode==='device'&&cfg.netRole==='join';},
  isWatchSetup(cfg){return cfg.mode==='device'&&cfg.netRole==='host'&&cfg.watch;},
  say(t,ok){if(this.msgEl){this.msgEl.className='nl-msg'+(ok?' ok':'');this.msgEl.textContent=t;}},

  /* 설정 화면에서 '시작'을 눌렀을 때 */
  async go(cfg){
    const E=this.E;
    if(!window.RTCPeerConnection){this.say('이 화면에서는 온라인 연결을 쓸 수 없어요. 게임을 올린 인터넷 주소(예: Vercel)에서 열어 주세요.');return;}
    // 이미 방장으로 방을 열어 둔 상태에서 설정만 바꾼 경우 → 대기실로
    if(this.on&&this.role==='host'&&this.peer&&!this.peer.destroyed&&cfg.netRole==='host'){this.set=this.pickSet(cfg);this.setWatch(cfg.watch,cfg.nicks[0]);this.bcast({t:'lobby',roster:this.roster,set:this.set});this.showLobby();return;}
    this.leave(true);
    this.say('연결하는 중…',true);
    try{await this.load();}catch(e){this.say('연결 도구를 불러오지 못했어요. 인터넷 연결을 확인해 주세요.');return;}
    if(cfg.netRole==='host')this.host(cfg);else this.join(cfg);
  },
  pickSet(cfg){return{level:cfg.level,count:cfg.count,dur:cfg.dur};},
  setWatch(w,nick){this.watch=!!w;const me=this.roster.find(p=>p.id==='host');
    if(this.watch&&me)this.roster=this.roster.filter(p=>p!==me);
    if(!this.watch){if(me)me.nick=nick;else this.roster.unshift(this.entry('host',nick));}
    this.myId=this.watch?null:'host';},
  entry(id,nick){const used=this.roster.map(p=>p.ci);let ci=0;while(used.includes(ci))ci++;return{id,nick,ci,score:0,prog:0,done:false,left:false,k2:0,k3:0,line:'',seen:Date.now()};},

  host(cfg){
    const tryHost=k=>{const code=String(1000+Math.floor(Math.random()*9000));
      const peer=new Peer(this.prefix()+code,this.opts());let opened=false;
      peer.on('open',()=>{opened=true;Object.assign(this,{on:true,role:'host',peer,code,conns:[],roster:[],started:false,final:false,gone:false,set:this.pickSet(cfg)});
        this.setWatch(cfg.watch,cfg.nicks[0]);
        this.every(3000,()=>{this.bcast({t:'hb'});const now=Date.now();this.roster.forEach(p=>{if(p.id!=='host'&&!p.left&&now-p.seen>10000)this.drop(p.id);});});
        this.say('');this.showLobby();});
      peer.on('connection',c=>this.hostConn(c));
      peer.on('error',err=>{if(!opened&&err.type==='unavailable-id'&&k<6){try{peer.destroy();}catch(e){}tryHost(k+1);return;}
        if(!opened){this.say('방을 만들지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요.');try{peer.destroy();}catch(e){}}});
      peer.on('disconnected',()=>{try{if(!peer.destroyed)peer.reconnect();}catch(e){}});};
    tryHost(0);
  },
  hostConn(conn){
    conn.on('data',msg=>{if(!msg||!this.on)return;const p=this.roster.find(x=>x.id===conn.peer);if(p)p.seen=Date.now();
      if(msg.t==='hello'){
        if(this.started&&!this.final){conn.send({t:'deny',why:'이미 게임이 시작됐어요. 끝난 뒤에 다시 들어와 주세요.'});setTimeout(()=>conn.close(),400);return;}
        if(this.roster.filter(x=>!x.left).length>=MAX){conn.send({t:'deny',why:`방이 가득 찼어요 (최대 ${MAX}명).`});setTimeout(()=>conn.close(),400);return;}
        let nick=String(msg.nick||'친구').slice(0,10);if(this.roster.some(x=>x.nick===nick))nick=nick+'2';
        this.roster=this.roster.filter(x=>!x.left);
        this.roster.push(this.entry(conn.peer,nick));this.conns.push(conn);
        conn.send({t:'welcome',you:conn.peer,code:this.code,roster:this.roster,set:this.set});
        this.bcast({t:'lobby',roster:this.roster,set:this.set});this.showLobby();Snd.tone(660,.08,'sine',.05);return;}
      if(msg.t==='sc'&&p){Object.assign(p,{score:msg.score,prog:msg.prog,done:msg.done,k2:msg.k2,k3:msg.k3,line:msg.line});this.boardSync();this.checkDone();return;}
      if(msg.t==='bye'){this.drop(conn.peer);}});
    conn.on('close',()=>{if(this.on&&this.role==='host')this.drop(conn.peer);});
  },
  drop(id){const p=this.roster.find(x=>x.id===id);this.conns.filter(c=>c.peer===id).forEach(c=>{try{c.close();}catch(e){}});this.conns=this.conns.filter(c=>c.peer!==id);
    if(!p||p.left)return;p.left=true;
    if(!this.started||this.final){this.roster=this.roster.filter(x=>x!==p);this.bcast({t:'lobby',roster:this.roster,set:this.set});if($('#lobby').classList.contains('on'))this.showLobby();}
    else{this.boardSync();this.checkDone();}},
  bcast(m){if(this.role!=='host')return;this.conns.forEach(c=>{try{if(c.open)c.send(m);}catch(e){}});},

  join(cfg){
    const code=cfg.joinCode;const peer=new Peer(undefined,this.opts());let done=false;
    const fail=t=>{if(done)return;done=true;clearTimeout(tm);this.say(t);try{peer.destroy();}catch(e){}this.on=false;};
    const tm=setTimeout(()=>fail('방을 찾지 못했어요. 방 코드를 확인하고, 방장 화면이 켜져 있는지 봐 주세요.'),12000);
    Object.assign(this,{role:'guest',peer,code,roster:[],myId:null,watch:false,started:false,final:false,gone:false,myNick:cfg.nicks[0]});
    peer.on('open',()=>{const conn=peer.connect(this.prefix()+code,{reliable:true});this.conn=conn;
      conn.on('open',()=>conn.send({t:'hello',nick:cfg.nicks[0]}));
      conn.on('data',msg=>{if(!msg)return;this.lastHost=Date.now();
        if(msg.t==='deny'){fail(msg.why);return;}
        if(msg.t==='welcome'){done=true;clearTimeout(tm);this.on=true;this.myId=msg.you;this.roster=msg.roster;this.set=msg.set;this.say('');this.showLobby();
          this.every(3000,()=>{try{conn.send({t:'hb'});}catch(e){}if(Date.now()-this.lastHost>12000)this.hostLost();});return;}
        if(msg.t==='lobby'){this.roster=msg.roster;this.set=msg.set;if(!this.started||this.final){this.started=false;this.showLobby();}return;}
        if(msg.t==='start'){this.begin(msg);return;}
        if(msg.t==='board'){this.mergeBoard(msg.roster);this.renderLive();return;}
        if(msg.t==='final'){this.roster=msg.roster;this.finalize();return;}
        if(msg.t==='close'){this.hostLost(true);}});
      conn.on('close',()=>{if(this.on&&this.role==='guest')this.hostLost();});});
    peer.on('error',err=>{if(err.type==='peer-unavailable')fail('그 방 코드는 없어요. 방 코드를 다시 확인해 주세요.');else if(!done)fail('연결하지 못했어요. 인터넷 연결을 확인해 주세요.');});
  },
  mergeBoard(r){const mine=this.me();this.roster=r;if(mine){const m=this.me();if(m)Object.assign(m,{score:mine.score,prog:mine.prog,done:mine.done,k2:mine.k2,k3:mine.k3,line:mine.line});}},
  hostLost(closed){if(this.gone||!this.on)return;this.gone=true;
    const lobbyOn=$('#lobby').classList.contains('on');
    if(lobbyOn||!this.started){alert(closed?'방장이 방을 닫았어요.':'방장과 연결이 끊어졌어요.');this.leave();this.E.show('setup');return;}
    this.banner('⚠️ 방장과 연결이 끊어졌어요. 내 게임은 끝까지 할 수 있어요.');
    const me=this.me();if(me&&me.done&&!this.final)this.finalize();},
  banner(t){const s=$('.netstrip');if(s){const b=h('span','lb',t);b.style.color='var(--bad)';s.appendChild(b);}},
  every(ms,fn){const t=setInterval(fn,ms);this.timers.push(t);},
  me(){return this.roster.find(p=>p.id===this.myId);},

  /* ---------- 대기실 ---------- */
  setText(){const E=this.E,s=this.set||{};const L=E.G.levels.find(l=>l.id===s.level);
    return (L?`${L.g} · ${L.t}`:'')+(s.count?` · ${s.count}문제`:'')+(s.dur?` · ${s.dur%60?Math.floor(s.dur/60)+'분 '+s.dur%60+'초':s.dur/60+'분'}`:'');},
  showLobby(){const E=this.E,S=$('#lobby');S.innerHTML='';const host=this.role==='host';
    const W=h('div','nl-wrap');S.appendChild(W);const C=h('div','nl-card');W.appendChild(C);
    C.innerHTML=`<span class="nl-tag">${host?(this.watch?'🏠 방장 · 진행만':'🏠 방장'):'🚪 참가자'}</span><h2>${E.G.emoji} ${esc(E.G.title)} 대기실</h2>
      <div class="nl-hint">친구들에게 이 방 코드를 알려 주세요</div><div class="nl-code">${this.code}</div><div class="nl-set">${this.setText()}</div>`;
    const list=h('div','nl-list');C.appendChild(list);
    const ps=this.roster.filter(p=>!p.left);
    ps.forEach(p=>{list.appendChild(h('div','nl-p'+(p.id===this.myId?' me':''),`<span class="dot" style="background:${PHEX[p.ci]}"></span><span class="nm">${esc(p.nick)}</span><span class="bd">${p.id==='host'?'방장':''}${p.id===this.myId?' (나)':''}</span>`));});
    for(let k=ps.length;k<MAX;k++)list.appendChild(h('div','nl-p empty','<span class="dot" style="background:#e5e7eb"></span><span class="nm">기다리는 중…</span>'));
    C.appendChild(h('div','nl-hint',`들어온 사람 <b>${ps.length}</b> / ${MAX}명`));
    const bt=h('div','nl-btns');C.appendChild(bt);
    const leave=h('button','sub','나가기');leave.onclick=()=>{if(confirm(host?'방을 닫을까요? 친구들도 나가게 돼요.':'방에서 나갈까요?')){this.leave();E.show('setup');}};
    if(host){const ch=h('button','sub','⚙️ 설정 바꾸기');ch.onclick=()=>E.show('setup');
      const need=this.watch?1:2;const go=h('button','',`게임 시작! (${ps.length}명)`);go.disabled=ps.length<need;go.onclick=()=>this.hostStart();
      bt.append(leave,ch,go);
      if(ps.length<need)C.appendChild(h('div','nl-hint',this.watch?'한 명 이상 들어오면 시작할 수 있어요.':'친구가 한 명 이상 들어오면 시작할 수 있어요.'));}
    else{bt.append(leave);C.appendChild(h('div','nl-hint','⏳ 방장이 시작하기를 기다리고 있어요…'));}
    E.show('lobby');},

  /* ---------- 시작 ---------- */
  hostStart(){const seed=Math.floor(Math.random()*1e9);this.roster=this.roster.filter(p=>!p.left);
    const msg={t:'start',seed,set:this.set,roster:this.roster.map(p=>Object.assign({},p,{score:0,prog:0,done:false,k2:0,k3:0,line:''}))};
    this.bcast(msg);this.begin(msg);},
  begin(msg){const E=this.E;this.seed=msg.seed;this.set=msg.set;this.roster=msg.roster;this.started=true;this.final=false;
    clearTimeout(this.forceT);
    const c=E.cfg;c.mode='device';c.level=msg.set.level;if(msg.set.count)c.count=msg.set.count;if(msg.set.dur)c.dur=msg.set.dur;
    E.level=E.G.levels.find(l=>l.id===c.level);
    if(this.role==='host'&&this.watch){this.showBoard();if(msg.set.dur)this.forceT=setTimeout(()=>this.forceFinal(),(msg.set.dur+12)*1000);return;}
    c.nicks=[this.me()?this.me().nick:c.nicks[0]];
    E.start();},
  /* 플레이 화면 위쪽 실시간 점수 줄 */
  mountStrip(P){const s=h('div','netstrip');const bar=P.querySelector('.pbar');bar.after(s);this.renderLive();},
  sorted(){return this.roster.slice().sort((a,b)=>(a.left-b.left)||b.score-a.score||b.k2-a.k2||a.k3-b.k3);},
  renderLive(){const s=$('.netstrip');if(s){s.innerHTML=`<span class="lb">📡 방 ${this.code}</span>`;
      this.sorted().forEach((p,i)=>{s.appendChild(h('span','ch'+(p.id===this.myId?' me':'')+(p.done?' done':'')+(p.left?' left':''),`${p.left?'':(i+1)+'위'} <span class="dot" style="background:${PHEX[p.ci]}"></span>${esc(p.nick)} ${p.score}점${p.done?' ✅':''}`));});
      if(this.role==='host'&&!this.final){const b=h('button','endall','⏹ 모두 끝내기');b.onclick=()=>{if(confirm('지금 점수로 게임을 끝낼까요?'))this.forceFinal();};s.appendChild(b);}}
    if($('#netboard').classList.contains('on'))this.showBoard();},
  /* 진행만 하는 방장: 전자칠판 점수판 */
  showBoard(){const E=this.E,S=$('#netboard');S.innerHTML='';
    const W=h('div','nl-wrap');S.appendChild(W);const C=h('div','nl-card');W.appendChild(C);
    C.innerHTML=`<span class="nl-tag">📺 실시간 점수판</span><h2>${E.G.emoji} ${esc(E.G.title)}</h2><div class="nl-set">방 ${this.code} · ${this.setText()}</div>`;
    const list=h('div','nl-list');C.appendChild(list);
    this.sorted().forEach((p,i)=>{list.appendChild(h('div','nl-p'+(p.left?' left':''),`<span class="rk">${p.left?'🚪':p.done?'✅':(i+1)}</span><span class="dot" style="background:${PHEX[p.ci]}"></span><span class="nm">${esc(p.nick)}</span><span class="bar"><i style="width:${Math.round((p.prog||0)*100)}%;background:${PHEX[p.ci]}"></i></span><span class="pt">${p.score}점</span>`));});
    const bt=h('div','nl-btns');const end=h('button','sub','⏹ 지금 끝내기');end.onclick=()=>{if(confirm('지금 점수로 게임을 끝낼까요?'))this.forceFinal();};bt.appendChild(end);C.appendChild(bt);
    C.appendChild(h('div','nl-hint','모두 끝나면 자동으로 등수가 나와요.'));
    E.show('netboard');},

  /* ---------- 점수 보내기 ---------- */
  report(st){if(!this.on||!this.started)return;const me=this.me();if(!me)return;
    Object.assign(me,st);
    if(this.role==='host'){this.boardSync();this.checkDone();}
    else{try{this.conn&&this.conn.open&&this.conn.send(Object.assign({t:'sc'},st));}catch(e){}this.renderLive();
      if(st.done&&this.gone&&!this.final)this.finalize();}},
  boardSync(){this.bcast({t:'board',roster:this.roster});this.renderLive();},
  checkDone(){if(this.role!=='host'||this.final||!this.started)return;
    const act=this.roster.filter(p=>!p.left);if(act.length&&act.every(p=>p.done)){this.forceFinal();}},
  forceFinal(){if(this.role!=='host'||this.final)return;clearTimeout(this.forceT);this.bcast({t:'final',roster:this.roster});this.finalize();},
  finalize(){if(this.final)return;this.final=true;this.started=false;const E=this.E;
    E.stopAll&&E.stopAll();setTimeout(()=>E.results(),300);},

  /* ---------- 결과 화면 (모두의 등수) ---------- */
  results(W,unit){const E=this.E;const ps=this.sorted().filter(p=>!p.left);const gone=this.roster.filter(p=>p.left);
    const same=(a,b)=>a.score===b.score&&a.k2===b.k2&&a.k3===b.k3;ps.forEach((p,k)=>{p.rank=k&&same(p,ps[k-1])?ps[k-1].rank:k;});
    const tops=ps.filter(p=>p.rank===0);const me=this.me();
    W.appendChild(h('div','res-title',ps.length?(tops.length>1?`🏆 공동 1등! ${tops.map(p=>esc(p.nick)).join(', ')}`:`🏆 ${esc(ps[0].nick)} 승리!`):'게임 끝!'));
    if(me&&ps.length>1)W.appendChild(h('div','room-note',`나는 <b class="jua" style="font-size:24px">${me.rank+1}등</b>! · 방 ${this.code} · ${this.setText()}`));
    else W.appendChild(h('div','room-note',`방 ${this.code} · ${this.setText()}`));
    const pod=h('div','podium');W.appendChild(pod);
    ps.forEach(p=>{const c=h('div','pcard'+(p.id===this.myId?' nl-me':''));c.style.setProperty('--pc',PHEX[p.ci]);
      c.innerHTML=`<div class="rk">${ps.length>1?medal[Math.min(p.rank,3)]:'⭐'}</div><div class="nm">${esc(p.nick)}${p.id===this.myId?' (나)':''}</div><div class="pts">${N.comma(p.score)}${unit||'점'}</div><div class="st">${p.line||''}${p.done?'':' · 다 못 풀었어요'}</div>`;pod.appendChild(c);});
    if(gone.length)W.appendChild(h('div','hint',`🚪 중간에 나간 친구: ${gone.map(p=>esc(p.nick)).join(', ')}`));},
  buttons(W){const E=this.E;const bt=h('div','res-btns');
    if(this.role==='host'&&!this.gone){const again=h('button','','🔁 같은 방에서 한 판 더');again.onclick=()=>{this.final=false;this.started=false;this.roster.forEach(p=>Object.assign(p,{score:0,prog:0,done:false}));this.bcast({t:'lobby',roster:this.roster,set:this.set});this.showLobby();};
      const out=h('button','sub','방 닫기');out.onclick=()=>{this.leave();E.show('setup');};bt.append(again,out);}
    else{const out=h('button','sub','나가기');out.onclick=()=>{this.leave();E.show('setup');};bt.append(out);
      if(!this.gone)W.appendChild(h('div','hint','⏳ 방장이 한 판 더 하면 대기실로 자동으로 이동해요.'));}
    W.appendChild(bt);},

  leave(silent){this.timers.forEach(clearInterval);this.timers=[];clearTimeout(this.forceT);
    try{if(this.role==='host')this.bcast({t:'close'});else if(this.conn&&this.conn.open)this.conn.send({t:'bye'});}catch(e){}
    const p=this.peer;if(p)setTimeout(()=>{try{p.destroy();}catch(e){}},silent?0:200);
    Object.assign(this,{on:false,role:null,peer:null,conns:[],conn:null,roster:[],myId:null,started:false,final:false,gone:false});},
};
window.Net=Net;
})();

