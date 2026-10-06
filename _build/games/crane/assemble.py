import os,sys
d=os.path.dirname(os.path.abspath(__file__))
C=d+'/../../common/'
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@ART@@*/',open(d+'/art.js',encoding='utf8').read())
m=open(C+'quizkit.js',encoding='utf8').read()+'\n'+m
open(d+'/game_a.js','w',encoding='utf8').write(m)
