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
    #os.environ['DJANGO_SETTINGS_MODULE'] = 'dataverse_org.settings.local'
    os.environ['DJANGO_SETTINGS_MODULE'] = 'dataverse_org.settings.production'

from apps.dataverse_stats.stats_retriever import StatsRetriever

def scrape_latest_stats():
    sr = StatsRetriever()
    sr.retrieve_stats()
    #sr.send_email_report()
    
if __name__=='__main__':
    scrape_latest_stats()
    
    
"""
su plaid
source /opt/rh/python27/root/usr/bin/virtualenvwrapper.sh
export WORKON_HOME=/webapps/virtualenvs
workon dataverse_org
/webapps/code/dataverse.org/dataverse_org 
/webapps/virtualenvs/dataverse_org/bin/python2.7 /webapps/code/dataverse.org/dataverse_org/scripts/retrieve_dv3dot6_stats.py

"""