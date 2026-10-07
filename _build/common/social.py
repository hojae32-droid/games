import re,os
Z='/tmp/claude-0/-home-user-games/468d8a32-314f-509d-a8d2-96719987af43/scratchpad/zip/'
def script1(name):
    s=open(Z+name+'/index.html',encoding='utf8').read()
    return [m for m in re.finditer(r'<script[^>]*>(.*?)</script>',s,re.S)][0].group(1)
def literal(src,marker):
    """marker 뒤에 오는 첫 { 또는 [ 로 시작하는 리터럴 전체(괄호 짝 맞춤, 문자열 건너뜀)"""
    i=src.index(marker)+len(marker)
    while src[i] not in '{[':i+=1
    st=i;depth=0;q=None;esc=False
    while i<len(src):
        c=src[i]
        if q:
            if esc:esc=False
            elif c=='\\':esc=True
            elif c==q:q=None
            elif q=='`' and c=='$' and src[i+1]=='{':pass
        else:
            if c in '\'"`':q=c
            elif c in '{[(':depth+=1
            elif c in '}])':
                depth-=1
                if depth==0:return src[st:i+1]
        i+=1
    raise ValueError('unbalanced '+marker)
def decks(src):
    return literal(src,'decks:')

def build(d,name,extra=None,qmarker='const Q='):
    """d=게임 폴더. main.js 의 /*@@DECKS@@*/ /*@@Q@@*/ 자리를 원본 데이터로 채워요. extra={'/*@@X@@*/':'marker'}"""
    src=script1(name)
    m=open(d+'/main.js',encoding='utf8').read()
    m=m.replace('/*@@DECKS@@*/',decks(src))
    if '/*@@Q@@*/' in m:m=m.replace('/*@@Q@@*/',literal(src,qmarker))
    for k,v in (extra or {}).items():m=m.replace(k,literal(src,v))
    C=d+'/../../common/'
    m=open(C+'quizkit.js',encoding='utf8').read()+'\n'+open(C+'qz.js',encoding='utf8').read()+'\n'+m
    open(d+'/game_a.js','w',encoding='utf8').write(m)
