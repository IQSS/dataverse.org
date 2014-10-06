from __future__ import print_function
import sys

def msg(m): print(m)
def dashes(): msg('-' * 40)
def msgt(m): dashes(); msg(m); dashes()
def msgx(m): msgt(m); sys.exit(0)
