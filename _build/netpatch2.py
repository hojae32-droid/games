import sys,re
TAG='<script src="https://cdn.jsdelivr.net/npm/peerjs@1.5.5/dist/peerjs.min.js"></script>\n'
def patch(s,html):
    if 'iceCandidatePoolSize' not in s: raise ValueError('no v1')
    a=s.index("config:{iceServers:[");b=s.index("iceCandidatePoolSize:2}",a)+len("iceCandidatePoolSize:2}")
    s=s[:a]+"config:{iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]}"+s[b:]
    s=s.replace('peerjs@1.5.4','peerjs@1.5.5')
    s=s.replace("peer.on('error',err=>{if(!opened){retry(","peer.on('error',err=>{this.lastErr=err.type;if(!opened){retry(")
    s=s.replace("this.say('방을 만들지 못했어요. 인터넷이 불안정한 것 같아요. 잠시 뒤에 다시 눌러 주세요.');","this.say('방을 만들지 못했어요. 잠시 뒤에 다시 눌러 주세요. (오류: '+(this.lastErr||'시간 초과')+')');")
    s=s.replace("else again('연결하지 못했어요. 인터넷 연결을 확인해 주세요.');","else again('연결하지 못했어요. 잠시 뒤에 다시 눌러 주세요. (오류: '+err.type+')');")
    if html and 'peerjs@1.5.5/dist' not in s.split('</head>')[0]:
        s=s.replace('<head>\n','<head>\n'+TAG,1)
    return s
for f in sys.argv[1:]:
    s=open(f,encoding='utf8').read()
    try:t=patch(s,f.endswith('.html'))
    except ValueError as e:print('skip',f,e);continue
    open(f,'w',encoding='utf8').write(t);print('ok',f)
