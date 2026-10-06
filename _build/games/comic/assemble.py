import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('40704f53')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const NM=','\nEngine.boot(GAME);').rstrip('\n'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
