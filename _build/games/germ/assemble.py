import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('4b5a69a7')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const GERM={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'거품으로 쏘자!',"{who:'누구와 지킬까요?',dur:'방어 시간',pace:'세균 속도',seat:'번 대원 ',go:'방어 시작!',s1:'1. 임무',s2:'2. 방법',s3:'3. 이름'}",'어떤 임무를 할까요?'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
