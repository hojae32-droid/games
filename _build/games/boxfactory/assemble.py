import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))+'/../../common')
from exthead import *
d=os.path.dirname(os.path.abspath(__file__))
code=load('26b8def0')
m=open(d+'/main.js',encoding='utf8').read()
m=m.replace('/*@@DATA@@*/',between(code,'const VX=','function cubSVG').rstrip('\n')+'\n'+between(code,'function normals(','function polySVG').rstrip('\n'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
