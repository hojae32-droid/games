#!/bin/bash
# usage: mk.sh energy
cd /tmp/claude-0/-home-user-games/468d8a32-314f-509d-a8d2-96719987af43/scratchpad
mkdir -p /home/user/games/$1 && python3 build.py games/$1 /home/user/games/$1/index.html
