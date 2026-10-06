import sys,re,glob
OPTS_LOAD=r"""  opts(){return Object.assign({debug:0,config:{iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'},{urls:'stun:stun.cloudflare.com:3478'},{urls:'turn:eu-0.turn.peerjs.com:3478',username:'peerjs',credential:'peerjsp'},{urls:'turn:us-0.turn.peerjs.com:3478',username:'peerjs',credential:'peerjsp'}],iceCandidatePoolSize:2}},window.__PEER_OPTS||{});},
  load(){return new Promise((res,rej)=>{if(window.Peer)return res();
    const srcs=window.__PEER_SRC?[window.__PEER_SRC]:['https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js','https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js','https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js','https://fastly.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js'];
    let i=0;const next=()=>{if(window.Peer)return res();if(i>=srcs.length*2)return rej(new Error('load'));const src=srcs[i++%srcs.length];const sc=h('script');let fin=false;
      const tm=setTimeout(()=>{if(fin)return;fin=true;sc.remove();next();},9000);
      sc.onload=()=>{if(fin)return;fin=true;clearTimeout(tm);if(window.Peer)res();else{sc.remove();next();}};
      sc.onerror=()=>{if(fin)return;fin=true;clearTimeout(tm);sc.remove();setTimeout(next,300);};sc.src=src;document.head.appendChild(sc);};next();});},
"""
HOST=r"""  host(cfg){
    let tries=0;
    const tryHost=k=>{const code=String(1000+Math.floor(Math.random()*9000));
      const peer=new Peer(this.prefix()+code,this.opts());let opened=false,dead=false,ot=0;
      const retry=why=>{if(dead)return;dead=true;clearTimeout(ot);try{peer.destroy();}catch(e){}
        if(why==='id'&&k<8){tryHost(k+1);return;}
        if(why!=='id'&&++tries<=3){this.say('연결하는 중… ('+(tries+1)+'번째 시도)',true);setTimeout(()=>tryHost(0),1200*tries);return;}
        this.say('방을 만들지 못했어요. 인터넷이 불안정한 것 같아요. 잠시 뒤에 다시 눌러 주세요.');};
      ot=setTimeout(()=>{if(!opened)retry('net');},12000);
      peer.on('open',()=>{if(dead)return;opened=true;clearTimeout(ot);Object.assign(this,{on:true,role:'host',peer,code,conns:[],roster:[],started:false,final:false,gone:false,set:this.pickSet(cfg)});
        this.setWatch(cfg.watch,cfg.nicks[0]);
        this.every(3000,()=>{this.bcast({t:'hb'});const now=Date.now();this.roster.forEach(p=>{if(p.id!=='host'&&!p.left&&now-p.seen>10000)this.drop(p.id);});});
        this.say('');this.showLobby();});
      peer.on('connection',c=>this.hostConn(c));
      peer.on('error',err=>{if(!opened){retry(err.type==='unavailable-id'?'id':'net');return;}
        if(['network','server-error','socket-error','socket-closed'].includes(err.type)){try{if(!peer.destroyed)peer.reconnect();}catch(e){}}});
      peer.on('disconnected',()=>{try{if(!peer.destroyed)peer.reconnect();}catch(e){}});};
    tryHost(0);
  },
"""
JOIN=r"""  join(cfg){
    const code=cfg.joinCode;let done=false,tries=0,peer=null,tm=0;
    const fail=t=>{if(done)return;done=true;clearTimeout(tm);try{peer&&peer.destroy();}catch(e){}this.on=false;this.say(t);};
    Object.assign(this,{role:'guest',peer:null,code,roster:[],myId:null,watch:false,started:false,final:false,gone:false,myNick:cfg.nicks[0]});
    const attempt=()=>{if(done)return;clearTimeout(tm);try{peer&&peer.destroy();}catch(e){}
      const pr=new Peer(undefined,this.opts());peer=pr;this.peer=pr;
      const again=msg=>{if(done||pr!==peer)return;if(++tries<=3){this.say('연결하는 중… ('+(tries+1)+'번째 시도)',true);try{pr.destroy();}catch(e){}clearTimeout(tm);setTimeout(attempt,1000*tries);}else fail(msg);};
      tm=setTimeout(()=>again('방을 찾지 못했어요. 방 코드를 확인하고, 방장 화면이 켜져 있는지 봐 주세요.'),12000);
      pr.on('open',()=>{if(pr!==peer)return;const conn=pr.connect(this.prefix()+code,{reliable:true});this.conn=conn;
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
      pr.on('error',err=>{if(done||pr!==peer)return;if(err.type==='peer-unavailable')again('그 방 코드는 없어요. 방 코드를 다시 확인해 주세요.');else again('연결하지 못했어요. 인터넷 연결을 확인해 주세요.');});};
    attempt();
  },
"""
def patch(s):
    n=0
    a=s.index("  opts(){");b=s.index("document.head.appendChild(sc);});},",a)+len("document.head.appendChild(sc);});},\n")
    s=s[:a]+OPTS_LOAD+s[b:];n+=1
    a=s.index("  host(cfg){");b=s.index("    tryHost(0);\n  },\n",a)+len("    tryHost(0);\n  },\n");s=s[:a]+HOST+s[b:];n+=1
    a=s.index("  join(cfg){");m="fail('연결하지 못했어요. 인터넷 연결을 확인해 주세요.');});\n  },\n";b=s.index(m,a)+len(m);s=s[:a]+JOIN+s[b:];n+=1
    return s
if __name__=='__main__':
    for f in sys.argv[1:]:
        s=open(f,encoding='utf8').read()
        if "iceCandidatePoolSize" in s: print('skip',f);continue
        try: t=patch(s)
        except ValueError as e: print('FAIL',f,e);continue
        open(f,'w',encoding='utf8').write(t);print('ok',f)
