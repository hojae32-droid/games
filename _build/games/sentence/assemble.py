import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('037de810')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'// [앞말, 맞는 끝, 틀린 끝, 틀린 끝, 짝]','\nEngine.boot(GAME);').rstrip('\n'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
