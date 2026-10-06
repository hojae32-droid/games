import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('718e6b28')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const LIGHT_Q=[','const GAME={').rstrip('\n'))
m=m.replace('/*@@GEN@@*/',between(code,'  gen(p,R){','  geo(p){').rstrip('\n'))
m=m.replace('/*@@HEAD@@*/',head(code,'빛의 길을 열어라',"{who:'누구와 실험할까요?',dur:'실험 시간',pace:'한 문제 시간',seat:'번 연구원 ',go:'실험 시작!',s1:'1. 실험',s2:'2. 방법',s3:'3. 이름'}",'어떤 실험을 할까요?'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
