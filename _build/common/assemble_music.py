# 음악 게임 공통 조립기: python3 assemble.py 에서 import 해서 사용
import os,sys
def build(D,extra_files=()):
    C=os.path.dirname(os.path.abspath(__file__))+'/'
    m=open(D+'/main.js',encoding='utf8').read()
    pre=''.join(open(C+f,encoding='utf8').read()+'\n' for f in ('mus_engine.js','quizkit.js','qz.js','musk.js'))
    for f in extra_files:
        pre+=open(C+f,encoding='utf8').read()+'\n'
    open(D+'/game_a.js','w',encoding='utf8').write(pre+m)
