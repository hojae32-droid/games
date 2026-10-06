import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('9650b0a1')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const LIFE={','const GAME={').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'알에서 어른까지',"{who:'누구와 쌓을까요?',dur:'공사 시간',pace:'크레인 속도',seat:'번 건축가 ',go:'탑 쌓기 시작!',s1:'1. 주제',s2:'2. 방법',s3:'3. 이름'}",'무엇의 한살이를 쌓을까요?'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
