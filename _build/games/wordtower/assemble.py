import os,sys
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import assemble_plain
assemble_plain.build(D,('gk.js','en.js'))
