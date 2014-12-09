"""
Purpose: 
    - Retrieve dataverse stats from 
    - Save them to the DataverseStatsSnapshot models
"""
from __future__ import print_function
import os, sys

if __name__=='__main__':
    from os.path import dirname, abspath
    DJANGO_ROOT = dirname(dirname(dirname(abspath(__file__))))
    sys.path.append(DJANGO_ROOT)
    os.environ['DJANGO_SETTINGS_MODULE'] = 'dataverse_org.settings.local'

import re
import requests

from django.core.mail import send_mail
from django.conf import settings

from datetime import datetime
from dataverse_org.utils.msg_util import *
from apps.dataverse_stats.forms import StatsSnapshotValidationForm
from bs4 import BeautifulSoup

class StatsRetriever:
    
    def __init__(self, dv_url='http://thedata.harvard.edu/dvn/'):
        self.dv_url = dv_url
        self.snapshot_time = datetime.now()
        
        self.stats_snapshot = None  # Will be a DataverseStatsSnapshot object
        self.page_source = None
        
        self.err_found = False
        self.err_msg = None
    
    def add_error(self, msg):
        self.err_msg = msg
        self.err_found = True
        
    def retrieve_stats(self):
        
        # (1) Retrieve stats page
        self.retrieve_stats_page()
        if self.err_found:
            return False

        # (2) Scrape stats page
        self.scrape_stats_page()
        if self.err_found:
            return False
            
    def send_email_report(self):
        assert len(settings.ADMINS) > 0, "There must be at least 1 ADMIN contact in the settings file."
        
        if self.err_found:            
            subject = "(ERROR) Dataverse.org stats update: %s" \
                    % (self.snapshot_time.strftime('%a, %b %d, %Y at %I:%M:%S'))
        
            msg = """An error occurred when scraping the Dataverse 3.6 homepage for stats.
-------------------
page scraped: %s
-------------------
error message: %s            
-------------------
(end of email)
            """ % (self.dv_url, self.err_msg)
        else: 
            subject = "(ok) Dataverse.org stats update: %s" \
                    % (self.snapshot_time.strftime('%a, %b %d, %Y at %I:%M:%S'))
            msg = "Everything went well:)"
        
        
        to_addresses = [x[1] for x in settings.ADMINS]
        if len(to_addresses) == 0:
            raise exception("No admins found in settings.ADMINS")

        send_mail(subject, msg, to_addresses[0],
                to_addresses, fail_silently=False)


    def retrieve_stats_page(self):

        try:
            r = requests.get(self.dv_url)
        except requests.exceptions.ConnectionError as e:
            self.add_error( 'Sorry! Failed to retrieve data from: %s\nError: %s' % (self.svn_url, e.message))
            return
        except:
            self.add_error("Unexpected error: %s" % sys.exc_info()[0])
            return 

        if r.status_code != 200:
            self.add_error('Status code is %s\n\nFull response:' % (r.status_code, r.text))
            return
        
        self.page_source = r.text


    def format_to_int(self, count_str):
        assert count_str is not None, "count_str cannot be None"

        # Strip out commas, spaces, etc
        count_str_formatted = re.sub(r"[^\d]+", "", count_str)

        assert len(count_str_formatted) > 0\
            , "count_str_formatted must contain digits.  Found empty string."
        return int(count_str_formatted)


    def scrape_stats_page(self):
        assert self.page_source is not None, "self.page_source cannot be None"

        soup = None
        try:
            soup = BeautifulSoup(self.page_source)
        except:
            self.add_error('Failed to parse HTML page.\n\nError: %s' % (sys.exc_info()[0]) )
            return

        # Start storing values to create a DataverseStatsSnapshot object
        #
        stats_dict = dict(retrieval_datetime=self.snapshot_time)

        data_divs = soup.find_all('div', { 'class':'dvnHmpgColumnTotals'})
        for idx, data_div in enumerate(data_divs):
            if idx == 0:            # has the # of dataverses
                msg(data_div.span.text)
                stats_dict['dataverse_count'] = self.format_to_int(data_div.span.text)
            elif idx == 1:
                for idx2, span_tag in enumerate(data_div.find_all('span')):
                    msg('%s: %s' % (idx2, span_tag.text))
                    if idx2 == 0:
                        stats_dict['dataset_count'] = self.format_to_int(span_tag.text)
                    elif idx2 == 2:
                        stats_dict['file_count'] = self.format_to_int(span_tag.text)
                    elif idx2 == 4:
                        stats_dict['download_count'] = self.format_to_int(span_tag.text)
        msg('stats_dict: %s' % stats_dict)
        f = StatsSnapshotValidationForm(stats_dict)
        msg('form: %s' % f.is_valid())
        if not f.is_valid():
            msg(f.errors)
            self.add_error('Form validation failed.\nError dict:[%s]' % f.errors)
            return

        self.stats_snapshot = f.save()
        msgt('New DataverseStatsSnapshot object saved')

def scrape_test_file():
    """
    <div class="dvnHmpgColumnTotals"><span class="iceOutTxt dvn_totalsValue" id="form1:j_idt174">833</span><span class="iceOutTxt" id="form1:j_idt175"> Dataverses</span>
    """
    fcontents = open('test_files/dvn3.6_homepage.html', 'r').read()
    sr = StatsRetriever()
    sr.page_source = fcontents
    sr.scrape_stats_page()

def create_test_page(output_file='test_files/dvn3.6_homepage.html'):
    """
    pull page and save for testing
    """
    msgt("Attempt to retrieve/save test page")
    sr = StatsRetriever()
    sr.retrieve_stats_page()
    msg(sr.page_source)
    open(output_File, 'w').write(sr.page_source)
    msg('file saved: %s' % output_file)


if __name__=='__main__':
    msg('test snippet')
    scrape_test_file()
    