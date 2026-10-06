# 5개 새 스킨 생성: python3 genskins.py  (결과는 skins/*.css)
def skin(name,disp,sans,imports,P,extra):
    d=dict(
     page=P['page'],ink=P['ink'],sub=P['sub'],focus=P.get('focus','#ffb703'),bw=P.get('bw','2px'),line=P['line'],rad=P.get('rad','18px'),**{'rad-s':P.get('rads','12px')},
     card=P['card'],**{'card-ink':P['cardInk']},hl=P['hl'],
     **{'sh-card':P['shCard'],'sh-btn':P['shBtn'],'sh-btn-down':P.get('shDown','0 1px 0 rgba(0,0,0,.2)'),'sh-go':P['shGo']},
     **{'btn-bg':P['card'],'btn-ink':P['cardInk']},stage=P['stage'],
     **{'tag-bg':P['tagBg'],'tag-ink':P['tagInk']},title=P.get('title','#fff'),title1=P.get('title1','#fff'),title2=P.get('title2','#fff'),
     **{'lamp-r':P.get('lampR','50%'),'lamp-bg':P['chipBg'],'lamp-ink':P['cardInk'],'lamp-on':P.get('ok','#2fbf71')},bad=P.get('bad','#e5383b'),
     **{'chip-bg':P['chipBg'],'chip-ink':P['cardInk'],'chip-line':P['chipLine'],'chip-sub':P['sub2'],'sel-bg':P['acc'],'sel-ink':P.get('accInk','#fff'),'sel-line':P['accLine'],'sel-sub':P.get('accSub','#fff')},
     **{'input-bg':'#fff','input-ink':P.get('dInk',P['cardInk']),'input-ph':P.get('ph','#9aa')},
     **{'go-bg':P['go'],'go-ink':P.get('goInk','#fff')},
     **{'bar-bg':P['hud'],'bar-ink':'#fff','bar-sub':'#ddd'},
     **{'clock-bg':'#fff','clock-ring':P['acc'],'clock-track':P.get('track','#ddd'),'clock-ink':P.get('dInk',P['cardInk'])},
     arena=P['hud'],gap='3px',
     **{'phead-ink':'#fff','no-r':P.get('noR','50%'),'sc-bg':'#fff','sc-ink':P.get('dInk',P['cardInk']),'sc-sub':P['sub2'],'sc-r':P.get('scR','999px')},
     **{'prog-bg':'rgba(255,255,255,.25)','prog-fill':P['prog']},
     **{'q-bg':P['qbg'],'q-ink':P['qink'],'q-hl':P.get('qhl',P['hl']),'q-sub':P['sub2']},
     **{'tip-bg':'#fff','tip-ink':P.get('dInk',P['cardInk']),'tip-hl':P.get('qhl',P['hl']),'tip-bad':'#ffe3e0','tip-good':'#dcf7ea'},
     **{'streak-bg':P['tagBg'],'streak-ink':P['tagInk']},
     **{'tools-bg':P['hud'],'tool-bg':'#fff','tool-ink':P.get('dInk',P['cardInk']),'tool-line':P['line'],'tool-sel':P['acc'],'tool-sel-ink':P.get('accInk','#fff')},
     veil=P['veil'],num=P['go'],
     **{'done-bg':P['veil'].replace('.6','.93').replace('.7','.93'),'done-ink':'#fff','done-hl':P['tagBg']},
     **{'res-title':P['hl'],'pname-b':P.get('pnb','.9'),'acc':P['acc'],'hud-bg':P['hud'],'wz-bg':P.get('wz',P['card']),'tools-fade':'linear-gradient(transparent,rgba(0,0,0,.45))'},
    )
    css=f"@import url('https://fonts.googleapis.com/css2?{imports}&display=swap');\n@font-face{{font-family:'DH-fb';src:local('Noto Sans CJK KR Black'),local('Noto Sans KR Black'),local('Malgun Gothic Bold'),local('AppleSDGothicNeo-Heavy');}}\n:root{{\n --disp:'{disp}','DH-fb','Noto Sans CJK KR','Malgun Gothic',sans-serif; --sans:'{sans}','Noto Sans CJK KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;\n"
    css+=''.join(f" --{k}:{v};\n" for k,v in d.items())+"}\n/*==EXTRA==*/\n"+extra
    open('skins/'+name+'.css','w',encoding='utf8').write(css)

# 1) 클리닉: 하얀 병원 + 민트 + 산호
skin('clinic','Sunflower','Gowun Dodum','family=Sunflower:wght@300;500;700&family=Gowun+Dodum',dict(
 page='#e9f7f4',ink='#0f4c4a',sub='#4f8c88',line='#0f766e',card='#ffffff',cardInk='#0f4c4a',hl='#e11d48',stage='#dff5f1',
 shCard='0 8px 24px rgba(15,118,110,.18)',shBtn='0 3px 0 #a7dbd4',shDown='0 1px 0 #a7dbd4',shGo='0 6px 0 #9f1239',rad='20px',rads='14px',
 tagBg='#ff5d73',tagInk='#fff',chipBg='#f1fbf9',chipLine='#a7dbd4',sub2='#4f8c88',acc='#14b8a6',accLine='#0f766e',go='#ff5d73',hud='#0b3d3a',
 prog='linear-gradient(90deg,#5eead4,#ff5d73)',qbg='rgba(255,255,255,.96)',qink='#0f4c4a',veil='rgba(11,61,58,.6)',track='#cdeee9',title='#fff',title1='#d1fae5',title2='#fff',noR='8px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#e9f7f4;background-image:linear-gradient(rgba(20,184,166,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,.07) 1px,transparent 1px);background-size:36px 36px}
.sign h1{text-shadow:0 3px 0 #0f766e,0 6px 16px rgba(0,60,50,.35);letter-spacing:.01em}
.sign .sub{border:0;box-shadow:0 3px 0 #b3243d}
.booth{background:#0f766e}
.stn{border-top:5px solid #14b8a6}
.chip{border-radius:14px}.chip.sel{box-shadow:0 4px 0 #0f766e}
.fire,.wz-next{border-radius:16px}
.wz-dot{border-radius:12px}
.res-title{text-shadow:none}
.qbox.ask{border:0;border-bottom:4px solid #14b8a6}
""")

# 2) 오로라: 밤하늘 오로라 + 얼음
skin('aurora','Single Day','Gowun Dodum','family=Single+Day&family=Gowun+Dodum',dict(
 page='linear-gradient(#0a1233,#173a6b 55%,#2a7a8c) fixed',ink='#eaf6ff',sub='#a9cde6',line='rgba(180,230,255,.6)',bw='2px',card='rgba(255,255,255,.14)',cardInk='#f0faff',hl='#7ff0d0',stage='#12335f',
 shCard='0 10px 30px rgba(0,10,40,.45)',shBtn='0 4px 12px rgba(0,10,40,.35)',shDown='0 1px 3px rgba(0,10,40,.35)',shGo='0 8px 24px rgba(70,255,200,.35)',rad='22px',rads='16px',
 tagBg='#7ff0d0',tagInk='#06324a',chipBg='rgba(255,255,255,.14)',chipLine='rgba(180,230,255,.45)',sub2='#b5d8ee',acc='#38bdf8',accInk='#04263d',accLine='#bfeaff',accSub='#05405f',go='#2dd4a8',goInk='#04302b',hud='rgba(6,20,52,.9)',
 prog='linear-gradient(90deg,#7ff0d0,#a78bfa)',qbg='rgba(240,250,255,.95)',qink='#0b2a4a',veil='rgba(6,20,52,.7)',track='#9cc8e6',title='#fff',title1='#b8f5ff',title2='#fff',ph='#7b93a8',pnb='1.3',dInk='#0b2a4a',qhl='#0a7d6a'),
 """.stn,.wz,.review,.pcard,.room-note,body .nl-card,.howcard .in{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.howcard .in{background:rgba(10,30,70,.85)}
.sign h1{text-shadow:0 0 22px rgba(120,255,230,.55),0 4px 0 rgba(0,20,60,.6);letter-spacing:.02em}
.sign .sub{border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.14);color:#fff;box-shadow:none}
.chip{border-radius:999px;padding-left:18px}.chips.md .chip{border-radius:18px}
.chip.sel{box-shadow:0 0 18px rgba(56,189,248,.6)}
.fire,.wz-next{border-radius:999px}
.wz-dot{background:rgba(255,255,255,.12);color:#cfe8f7}.wz-dot.on{color:#04263d}
.nick-row .dot{border-radius:50%}
.pcard .nm{filter:none;color:#fff}
.review li b,.hint b{color:#7ff0d0}.review,.review summary{color:#f0faff}.hint{color:#b5d8ee}.maker{color:#a9cde6}
.qbox.ask{border:0;font-size:clamp(17px,min(5.4cqw,3.8dvh),30px)}
.booth{background:#0a1233}
.toolbtn{border-radius:999px}
""")

# 3) 야생: 사바나 흙빛 + 노랑 + 거친 붓글씨
skin('wild','Yeon Sung','Gowun Dodum','family=Yeon+Sung&family=Gowun+Dodum',dict(
 page='#f0d9a8',ink='#3b2410',sub='#8a6a3c',line='#3b2410',bw='3px',card='#fff6dc',cardInk='#3b2410',hl='#c2410c',stage='#9bcf6a',
 shCard='5px 5px 0 #3b2410',shBtn='3px 3px 0 #3b2410',shDown='0 0 0 #3b2410',shGo='5px 6px 0 #3b2410',rad='10px',rads='8px',
 tagBg='#ffcb2e',tagInk='#3b2410',chipBg='#fff0c4',chipLine='#3b2410',sub2='#8a6a3c',acc='#ff8a1f',accLine='#3b2410',accSub='#3b2410',accInk='#3b2410',go='#e8541a',hud='#3b2410',
 prog='linear-gradient(90deg,#ffcb2e,#e8541a)',qbg='#fff6dc',qink='#3b2410',veil='rgba(59,36,16,.7)',track='#e8d6a8',title='#fff7d6',title1='#ffe08a',title2='#fff',noR='4px',scR='6px',lampR='6px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#f0d9a8;background-image:radial-gradient(rgba(139,94,40,.18) 2px,transparent 2.5px);background-size:22px 22px}
.sign h1{text-shadow:4px 4px 0 #3b2410;letter-spacing:.02em;transform:rotate(-2deg)}
.sign .sub{border-radius:4px;box-shadow:3px 3px 0 #3b2410;transform:rotate(1.5deg)}
.stn,.wz,.review,.pcard{border-radius:10px}
.chip{border-radius:6px;font-weight:700}
.chip.sel{transform:translate(2px,2px);box-shadow:1px 1px 0 #3b2410}
.fire,.wz-next{border-radius:8px;font-size:30px;letter-spacing:.04em}
.toolbtn{border-radius:8px;border-width:3px}
.qbox.ask{border:3px solid #3b2410;border-radius:10px;box-shadow:4px 4px 0 #3b2410;font-size:clamp(18px,min(5.6cqw,4dvh),32px)}
.res-title{text-shadow:3px 3px 0 #3b2410;color:#ffcb2e}
.booth{background:#9bcf6a}
.nick-row .dot{border-radius:3px}
""")

# 4) 놀이터: 장난감 블록 — 빨강·파랑·노랑
skin('toybox','Kirang Haerang','Gowun Dodum','family=Kirang+Haerang&family=Gowun+Dodum',dict(
 page='#fff3c9',ink='#1f2d5a',sub='#6b6fa0',line='#1f2d5a',bw='3px',card='#ffffff',cardInk='#1f2d5a',hl='#e63946',stage='#8fd3ff',
 shCard='0 8px 0 #1f2d5a',shBtn='0 5px 0 #1f2d5a',shDown='0 1px 0 #1f2d5a',shGo='0 8px 0 #9d1d28',rad='22px',rads='16px',
 tagBg='#ffd23f',tagInk='#1f2d5a',chipBg='#fff',chipLine='#1f2d5a',sub2='#6b6fa0',acc='#2d7ff9',accLine='#1f2d5a',accSub='#dbe8ff',go='#e63946',hud='#1f2d5a',
 prog='linear-gradient(90deg,#ffd23f,#e63946)',qbg='#fff',qink='#1f2d5a',veil='rgba(31,45,90,.65)',track='#ffe9a0',title='#fff',title1='#ffe27a',title2='#fff',noR='8px',lampR='8px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#fff3c9;background-image:radial-gradient(circle,#ffe08a 8px,transparent 9px),radial-gradient(circle,#bfe0ff 8px,transparent 9px);background-size:64px 64px;background-position:0 0,32px 32px}
.sign h1{text-shadow:0 5px 0 #1f2d5a,3px 3px 0 #1f2d5a,-3px 3px 0 #1f2d5a;letter-spacing:.02em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #1f2d5a}
.stn{border-radius:26px}
.stn-h h2{font-size:22px}
.chip{border-radius:18px;font-weight:700}
.chip.sel{box-shadow:0 5px 0 #14408f}
.lamp{font-family:var(--disp);font-weight:400;border-radius:8px}
.wz-dot{font-family:var(--disp);font-weight:400;font-size:17px;border-radius:14px}
.fire,.wz-next{border-radius:20px;font-size:30px}
.toolbtn{border-radius:18px;border-bottom-width:6px}
.qbox.ask{border:3px solid #1f2d5a;font-size:clamp(18px,min(5.8cqw,4dvh),34px)}
.res-title{text-shadow:0 4px 0 #ffd23f}
.booth{background:#8fd3ff}
.res-tab{font-family:var(--disp);font-weight:400;font-size:clamp(15px,2.4dvh,19px)}
.nick-row .dot{border-radius:5px;width:16px;height:16px}
""")

# 5) 탐사: 양피지 + 놋쇠 현장 노트
skin('expedition','Stylish','Gowun Dodum','family=Stylish&family=Gowun+Dodum',dict(
 page='#3a2a1d',ink='#fff1d6',sub='#d9bf94',line='#6b4a2a',bw='2px',card='#f6e8c8',cardInk='#3a2a1d',hl='#b4451f',stage='#8a6a45',
 shCard='inset 0 0 0 3px #f6e8c8,inset 0 0 0 5px #b8893f,0 10px 24px rgba(0,0,0,.45)',shBtn='0 4px 0 #8a6a45',shDown='0 1px 0 #8a6a45',shGo='0 6px 0 #6b2a10',rad='10px',rads='8px',
 tagBg='#c99a3e',tagInk='#2a1c10',chipBg='#fbf1d8',chipLine='#b8893f',sub2='#7a6244',acc='#0d9488',accLine='#064e46',accSub='#d1fae5',go='#d9531e',hud='#241810',
 prog='linear-gradient(90deg,#e0b252,#d9531e)',qbg='#f6e8c8',qink='#3a2a1d',veil='rgba(36,24,16,.7)',track='#d9c49a',title='#fff1d6',title1='#f0cf8a',title2='#fff',ph='#a89070',noR='4px',scR='6px',lampR='4px'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:400}
body{background:#3a2a1d;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 2px,transparent 2px 6px)}
.sign h1{text-shadow:0 3px 0 #1c120a,0 8px 18px rgba(0,0,0,.5);letter-spacing:.03em}
.sign .sub{border-radius:4px;border:1px solid #1c120a;box-shadow:0 3px 0 #7a5a20}
.chip{border-radius:6px;font-weight:700}
.chip.sel{box-shadow:0 4px 0 #064e46}
.wz-dot{border-radius:4px}
.fire,.wz-next{border-radius:8px;letter-spacing:.05em}
.toolbtn{border-radius:8px}
.qbox.ask{border:2px solid #b8893f;border-radius:8px;box-shadow:inset 0 0 0 3px #f6e8c8,inset 0 0 0 4px #b8893f,0 6px 16px rgba(0,0,0,.4);font-size:clamp(16px,min(5cqw,3.6dvh),28px)}
.res-title{text-shadow:0 3px 0 #1c120a}
.booth{background:#4a3524}
.review,.review summary,.pcard{color:#3a2a1d}
.stn-h h2{letter-spacing:.02em}
.maker{color:#d9bf94}.hint{color:#7a6244}
""")

# ---- 3차 묶음 ----
# 열기구: 노을 + 하늘
skin('balloon','Gamja Flower','Gowun Dodum','family=Gamja+Flower&family=Gowun+Dodum',dict(
 page='linear-gradient(#ffd9b8,#ffeedd 45%,#cfeaff) fixed',ink='#5a2d1a',sub='#9a6a4c',line='#c2410c',bw='2px',card='#fffaf2',cardInk='#5a2d1a',hl='#e0451f',stage='#8fcfff',
 shCard='0 8px 22px rgba(194,65,12,.18)',shBtn='0 4px 0 #f0b98a',shDown='0 1px 0 #f0b98a',shGo='0 7px 0 #b32d10',rad='24px',rads='16px',
 tagBg='#ffcf6b',tagInk='#5a2d1a',chipBg='#fff1e0',chipLine='#f0b98a',sub2='#9a6a4c',acc='#ff7a45',accLine='#c2410c',accSub='#fff0e6',go='#ff5a36',hud='#7c2d12',
 prog='linear-gradient(90deg,#ffd36b,#ff5a36)',qbg='rgba(255,250,242,.96)',qink='#5a2d1a',veil='rgba(124,45,18,.6)',track='#f6d9bf',title='#fff',title1='#fff1c9',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
.sign h1{text-shadow:0 3px 0 #c2410c,0 6px 16px rgba(120,40,0,.4);letter-spacing:.02em}
.sign .sub{border:0;box-shadow:0 3px 0 #b8860b}
.booth{background:#ffb27a}
.chip{border-radius:18px}.chip.sel{box-shadow:0 4px 0 #b32d10}
.fire,.wz-next{border-radius:999px}
.wz-dot{border-radius:999px}
.qbox.ask{border:0;font-size:clamp(17px,min(5.4cqw,3.8dvh),30px)}
.res-title{text-shadow:0 3px 0 #ffe29a}
""")

# 세균 방어대: 비누 거품 + 민트·핑크
skin('germ','Jua','Gowun Dodum','family=Jua&family=Gowun+Dodum',dict(
 page='#d7f7ee',ink='#0f5a4a',sub='#4d8f7f',line='#0f9e82',bw='3px',card='#ffffff',cardInk='#0f5a4a',hl='#e11d6a',stage='#bff0e4',
 shCard='0 7px 0 #8fdcc9',shBtn='0 4px 0 #8fdcc9',shDown='0 1px 0 #8fdcc9',shGo='0 7px 0 #b0124f',rad='28px',rads='20px',
 tagBg='#ffe066',tagInk='#5a4300',chipBg='#effcf8',chipLine='#8fdcc9',sub2='#4d8f7f',acc='#ff5c8a',accLine='#b0124f',accSub='#ffe3ec',go='#ff5c8a',hud='#0b6b57',
 prog='linear-gradient(90deg,#7ee8c9,#ff5c8a)',qbg='#ffffff',qink='#0f5a4a',veil='rgba(11,107,87,.6)',track='#c6efe4',title='#fff',title1='#e6fff7',title2='#fff'),
 """body{background:#d7f7ee;background-image:radial-gradient(circle,rgba(255,255,255,.9) 14px,transparent 15px),radial-gradient(circle,rgba(143,220,201,.5) 8px,transparent 9px);background-size:90px 90px;background-position:0 0,45px 45px}
.sign h1{text-shadow:0 5px 0 #0b6b57,3px 3px 0 #0b6b57,-3px 3px 0 #0b6b57,0 8px 14px rgba(0,60,50,.3);letter-spacing:.02em}
.sign .sub{border-radius:999px;box-shadow:0 3px 0 #b8860b}
.booth{background:#7ee8c9}
.stn{border-radius:30px}.chip{border-radius:22px;font-weight:700}.chip.sel{box-shadow:0 4px 0 #b0124f}
.fire,.wz-next{border-radius:999px;font-family:var(--disp);letter-spacing:.03em}
.toolbtn{border-radius:999px;border-bottom-width:6px}
.qbox.ask{border:3px solid #0f9e82;font-size:clamp(17px,min(5.6cqw,3.9dvh),32px)}
.res-title{text-shadow:0 4px 0 #ffe066}
.nick-row .dot{border-radius:50%;width:16px;height:16px}
""")

# 한살이 탑: 그림책(색연필)
skin('storybook','Gaegu','Gowun Dodum','family=Gaegu:wght@400;700&family=Gowun+Dodum',dict(
 page='#fdf1d8',ink='#4b3a7a',sub='#8a7bb8',line='#7a63c9',bw='3px',card='#fffdf6',cardInk='#4b3a7a',hl='#d9436a',stage='#cfc4ff',
 shCard='5px 5px 0 #cfc4ff',shBtn='3px 3px 0 #cfc4ff',shDown='0 0 0 #cfc4ff',shGo='5px 6px 0 #b4506a',rad='18px',rads='12px',
 tagBg='#ffd36b',tagInk='#4b3a7a',chipBg='#fff8e6',chipLine='#b7a8f0',sub2='#8a7bb8',acc='#8b6bea',accLine='#4b3a7a',accSub='#ece6ff',go='#ff8fa3',hud='#5b47b0',
 prog='linear-gradient(90deg,#ffd36b,#ff8fa3)',qbg='#fffdf6',qink='#4b3a7a',veil='rgba(75,58,122,.6)',track='#e8e0ff',title='#fff',title1='#fff1c9',title2='#fff'),
 """h1,h2,h3,.big,.jua,.clock b,.phead .sc,.qbox.ask,.toolbtn,.fire,.res-title,.pcard .pts,.howcard .t,.howcard .num,.res-btns button,.wz-next,.stn-h h2,.res-tab{font-weight:700}
body{background:#fdf1d8;background-image:repeating-linear-gradient(0deg,rgba(122,99,201,.07) 0 1px,transparent 1px 28px)}
.stn,.wz,.review,.pcard,.qbox.ask,.chip,.fire,.wz-next,.wz-dot{border-style:dashed}
.sign h1{text-shadow:3px 3px 0 #4b3a7a,0 8px 14px rgba(40,20,90,.3);letter-spacing:.03em;transform:rotate(-1.5deg)}
.sign .sub{border-radius:8px;box-shadow:3px 3px 0 #4b3a7a}
.booth{background:#cfc4ff}
.chip.sel{box-shadow:2px 2px 0 #4b3a7a}
.qbox.ask{font-size:clamp(18px,min(5.8cqw,4dvh),34px)}
.res-title{text-shadow:3px 3px 0 #ffd36b}
""")

# 빛 반사: 어두운 광학 실험실 + 무지개
skin('laser','Orbit','Gowun Dodum','family=Orbit&family=Gowun+Dodum',dict(
 page='#0b0a1a',ink='#e8e6ff',sub='#a9a4d8',line='rgba(180,170,255,.5)',bw='1.5px',card='rgba(255,255,255,.07)',cardInk='#f0eeff',hl='#fde047',stage='#14123a',
 shCard='0 10px 30px rgba(0,0,0,.5)',shBtn='0 3px 10px rgba(0,0,0,.4)',shDown='0 1px 2px rgba(0,0,0,.4)',shGo='0 8px 26px rgba(167,139,250,.5)',rad='16px',rads='12px',
 tagBg='#fde047',tagInk='#1e1b4b',chipBg='rgba(255,255,255,.08)',chipLine='rgba(180,170,255,.4)',sub2='#b6b1e6',acc='#a78bfa',accInk='#10092e',accLine='#ddd6fe',accSub='#2a1d66',go='linear-gradient(90deg,#f472b6,#a78bfa,#38bdf8)',goInk='#10092e',hud='rgba(10,8,30,.92)',
 prog='linear-gradient(90deg,#f472b6,#fde047,#38bdf8)',qbg='rgba(22,20,60,.94)',qink='#f0eeff',qhl='#fde047',veil='rgba(8,6,28,.72)',track='#4a4580',title='#fff',title1='#c7d2fe',title2='#fff',dInk='#10092e',pnb='1.4',wz='rgba(16,13,48,.86)'),
 """.stn,.wz,.review,.pcard,.room-note,body .nl-card,.howcard .in{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.howcard .in{background:rgba(20,18,60,.9)}
body{background:#0b0a1a;background-image:radial-gradient(circle at 20% 10%,rgba(167,139,250,.18),transparent 40%),radial-gradient(circle at 80% 90%,rgba(56,189,248,.14),transparent 40%)}
.sign h1{text-shadow:0 0 24px rgba(167,139,250,.7);letter-spacing:.04em;font-weight:700}
.sign .sub{border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.1);color:#fff;box-shadow:none}
.chip{border-radius:12px}.chip.sel{box-shadow:0 0 18px rgba(167,139,250,.7)}
.fire,.wz-next{border-radius:12px;font-weight:700;letter-spacing:.06em}
.wz-dot.on{color:#10092e}
.pcard .nm{filter:none;color:#fff}
.review li b,.hint b{color:#fde047}.review,.review summary{color:#f0eeff}.hint{color:#b6b1e6}.maker{color:#a9a4d8}
.qbox.ask{border:1px solid rgba(180,170,255,.5);font-size:clamp(16px,min(5cqw,3.6dvh),28px)}
.booth{background:#0b0a1a}
.toolbtn{border-radius:12px}
.res-title{text-shadow:0 0 22px rgba(167,139,250,.7)}
""")

# 자석: 빨강·파랑 장난감 실험실
skin('magnet','Do Hyeon','Gowun Dodum','family=Do+Hyeon&family=Gowun+Dodum',dict(
 page='#f4efe6',ink='#1b2a4a',sub='#6a7592',line='#1b2a4a',bw='3px',card='#ffffff',cardInk='#1b2a4a',hl='#dc2626',stage='#dbe7ff',
 shCard='0 7px 0 #1b2a4a',shBtn='0 4px 0 #1b2a4a',shDown='0 1px 0 #1b2a4a',shGo='0 7px 0 #1a3fa8',rad='14px',rads='10px',
 tagBg='#facc15',tagInk='#1b2a4a',chipBg='#ffffff',chipLine='#1b2a4a',sub2='#6a7592',acc='#dc2626',accLine='#7f1d1d',accSub='#ffe4e4',go='#2563eb',hud='#1b2a4a',
 prog='linear-gradient(90deg,#dc2626,#2563eb)',qbg='#ffffff',qink='#1b2a4a',veil='rgba(27,42,74,.65)',track='#dfe6f5',title='#fff',title1='#ffd9d9',title2='#cfe0ff'),
 """body{background:#f4efe6;background-image:linear-gradient(90deg,rgba(220,38,38,.07) 50%,rgba(37,99,235,.07) 50%);background-size:80px 80px}
.sign h1{text-shadow:0 4px 0 #1b2a4a,3px 3px 0 #1b2a4a;letter-spacing:.02em}
.sign .sub{border-radius:6px;box-shadow:0 3px 0 #1b2a4a}
.booth{background:#2b3f73}
.chip{border-radius:10px;font-weight:700}.chip.sel{box-shadow:0 4px 0 #7f1d1d}
.fire,.wz-next{border-radius:10px;font-size:30px}
.toolbtn{border-radius:12px;border-bottom-width:6px}
.qbox.ask{border:3px solid #1b2a4a;font-size:clamp(18px,min(5.6cqw,4dvh),32px);box-shadow:0 5px 0 #1b2a4a}
.res-title{text-shadow:0 3px 0 #facc15}
""")
