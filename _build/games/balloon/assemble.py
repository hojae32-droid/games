import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('95180716')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const GAS_Q={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'하늘을 나는 기체 실험',"{who:'누구와 날아갈까요?',dur:'비행 시간',pace:'날아가는 속도',seat:'번 조종사 ',go:'이륙!',s1:'1. 비행',s2:'2. 방법',s3:'3. 이름'}",'어떤 하늘을 날까요?'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
