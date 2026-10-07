import os
def build(D,extra_files=()):
    C=os.path.dirname(os.path.abspath(__file__))+'/'
    m=open(D+'/main.js',encoding='utf8').read()
    pre=''.join(open(C+f,encoding='utf8').read()+'\n' for f in ('quizkit.js','qz.js')+tuple(extra_files))
    open(D+'/game_a.js','w',encoding='utf8').write(pre+m)
