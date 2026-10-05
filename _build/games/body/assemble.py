import os
d=os.path.dirname(os.path.abspath(__file__))
m=open(d+'/main.js',encoding='utf8').read()
for key,f in [('ORG','org_data.js'),('DRAWORGAN','draw_organ.js'),('FIGURE','figure.js')]:
    m=m.replace('/*@@'+key+'@@*/',open(d+'/'+f,encoding='utf8').read().rstrip('\n'))
open(d+'/game_a.js','w',encoding='utf8').write(m)
