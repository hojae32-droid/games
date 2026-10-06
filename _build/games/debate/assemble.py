import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('eb7aad0e')
m=open(d+'/main.js',encoding='utf8').read()
data=between(code,'const EMO=','\nEngine.boot(GAME);').rstrip('\n')
m=m.replace('/*@@DATA@@*/',data)
open(d+'/game_a.js','w',encoding='utf8').write(m)
