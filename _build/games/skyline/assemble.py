import os,sys
D=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,D+'/../../common')
import assemble_music
assemble_music.build(D)
