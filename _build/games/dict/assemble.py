import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load_game('d88ca434')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'function cho(c)','\nEngine.boot(GAME);').rstrip('\n'))
C=d+'/../../common/'
m=open(C+'quizkit.js',encoding='utf8').read()+'\n'+open(C+'qz.js',encoding='utf8').read()+'\n'+m
open(d+'/game_a.js','w',encoding='utf8').write(m)
