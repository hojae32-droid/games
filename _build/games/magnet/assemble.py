import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('1d379b8c')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const MAG_ITEMS={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'끌리고 밀리는 힘',"{who:'누구와 탐사할까요?',dur:'탐사 시간',pace:'움직이는 속도',seat:'번 탐사대원 ',go:'탐사 출발!',s1:'1. 탐사',s2:'2. 방법',s3:'3. 이름'}",'무엇을 탐사할까요?'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
