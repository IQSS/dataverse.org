"""
Production script

Purpose: 
    - Retrieve dataverse stats from DVN 3.6
    - Save them to the DataverseStatsSnapshot models
"""
from __future__ import print_function
import os, sys

if __name__=='__main__':
    from os.path import dirname, abspath
    DJANGO_ROOT = dirname(dirname(abspath(__file__)))
    sys.path.append(DJANGO_ROOT)
    os.environ['DJANGO_SETTINGS_MODULE'] = 'dataverse_org.settings.local'
    #os.environ['DJANGO_SETTINGS_MODULE'] = 'dataverse_org.settings.production'

from datetime import datetime
from dataverse_org.utils.msg_util import *
from apps.dataverse_stats.models import MonthlyDownloadStats


stat_data = '''4/1/2010	1	0
6/1/2012	41	41
7/1/2012	182	223
8/1/2012	7023	7246
9/1/2012	11753	18999
10/1/2012	15192	34191
11/1/2012	17389	51580
12/1/2012	11962	63542
1/1/2013	13238	76780
2/1/2013	14853	91633
3/1/2013	19852	111485
4/1/2013	13634	125119
5/1/2013	12784	137903
6/1/2013	12971	150874
7/1/2013	11780	162654
8/1/2013	10561	173215
9/1/2013	15064	188279
10/1/2013	16251	204530
11/1/2013	19316	223846
12/1/2013	12701	236547
1/1/2014	18082	254629
2/1/2014	25363	279992
3/1/2014	23314	303306
4/1/2014	21630	324936
5/1/2014	21498	346434
6/1/2014	23422	369856
7/1/2014	14925	384781
8/1/2014	15169	399950
9/1/2014	22484	422434
10/1/2014	28856	451290
11/1/2014	28807	480097
12/1/2014	6411	486508'''.split('\n')


def format_date(dt_str):
    """
    m/d/yyyy
    """
    return datetime.strptime(dt_str, '%m/%d/%Y').date()
    

def load_initial_stats():
    global stat_data    
    stat_data_fmt = [x.strip() for x in stat_data if len(x.strip()) > 0]
    stat_data_fmt = [x.split() for x in stat_data_fmt]
    stat_data_fmt = [ (format_date(x[0]), int(x[1]), int(x[2]) ) for x in stat_data_fmt]
    msg('stat_data_fmt: %s' % stat_data_fmt)
    msg('stat_data_fmt: %s' % len(stat_data_fmt))
    
    for info in stat_data_fmt:
        print ('%s %s %s' % (info))   
        mds = MonthlyDownloadStats(retrieval_date=info[0]\
                            , month_count=info[1]\
                            , cumulative_count=info[2]\
                    )
        mds.save()


    
if __name__=='__main__':
    load_initial_stats()
    
    