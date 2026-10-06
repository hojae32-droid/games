import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('6d12c3cb')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const ART=','\nEngine.boot(GAME);').rstrip('\n'))
m=open(d+'/../../common/quizkit.js',encoding='utf8').read()+'\n'+m
open(d+'/game_a.js','w',encoding='utf8').write(m)
