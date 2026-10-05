import os
d=os.path.dirname(os.path.abspath(__file__))
r=lambda f:open(d+'/'+f,encoding='utf8').read().rstrip('\n')
m=open(d+'/main.js',encoding='utf8').read().replace('/*@@DATA@@*/',r('data.js')).replace('/*@@SUMMARY@@*/',r('summary.js')).replace('/*@@DRAWITEM@@*/',r('drawitem.js'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
