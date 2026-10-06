import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('9293baaf')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const SEA_Q={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'두근두근',"{who:'누가 잠수정을 몰까요?',dur:'탐험 시간',pace:'헤엄치는 속도',seat:'번 탐험대원 ',go:'출발!',s1:'1. 바다',s2:'2. 방법',s3:'3. 이름'}",'어디를 탐험할까요?','바다 탐험 잠수정'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
