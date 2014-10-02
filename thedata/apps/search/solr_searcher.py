if __name__=='__main__':
    import os, sys
    from os.path import dirname, abspath, join
    d1 = dirname(dirname(dirname(abspath(__file__))))
    sys.path.append(d1)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "thedata.settings.local")

import pysolr
from  pysolr import Results as PySolrResults

from django.conf import settings

from thedata.utils.msg_util import *

from apps.search.solr_search_formatter import SolrSearchFormatter, DEFAULT_NUM_DISPLAY_ROWS
from apps.search.solr_results_handler import SolrResultsHandler


class SolrSearcher:
    
    def __init__(self, solr_server_url=None, solr_server_timeout=10, **kwargs):
        if solr_server_url is None:
            solr_server_url = settings.SOLR_SERVER_URL
        if solr_server_timeout is None:
            solr_server_timeout = settings.SOLR_SERVER_TIMEOUT_SECONDS
            
        self.num_display_rows = kwargs.get('num_display_rows', DEFAULT_NUM_DISPLAY_ROWS)
        self.page_num = kwargs.get('page_num', DEFAULT_NUM_DISPLAY_ROWS)

        # initialize connection to solr
        self.solr_object = pysolr.Solr(solr_server_url, timeout=solr_server_timeout)

        # object to process solr results
        self.searchFormatter = SolrSearchFormatter(**dict(num_display_rows=self.num_display_rows\
                                                        , page_num=2#self.page_num\
                                                        )\
                                                    )
        
        # err flags
        self.err_found = False
        self.err_msg = None
        
        
    def reset_search(self):
        self.err_found = False
        self.err_msg = None
        
    def add_err(self, err_msg):
        msgt(err_msg)
        self.err_found = True
        self.err_msg = err_msg
        
    def conduct_search(self, qstr, solr_kwargs=None):
        """Executes solr search and returns a tuple:
        
        on success: (True, SolrResultsHandler)
        on fail: (False, error message str)
        """
        assert type(qstr) in  (unicode, str)\
                , 'qstr is not type "unicode" or "str", instead is "%s"' % type(qstr)
        assert type(solr_kwargs) is (dict) or solr_kwargs is None\
                , 'solr_kwargs is not type "dict" or value "None", instead is type "%s"' % type(solr_kwargs)
                            
        self.reset_search()
        
        if solr_kwargs is None:
            solr_kwargs = self.searchFormatter.get_solr_kwargs()

        try:
            results = self.solr_object.search(qstr, **solr_kwargs)
        except pysolr.SolrError as e:
            self.add_err('SOLR ERROR:\n%s' % str(e))    #'solr connection error')
            return (False, 'SOLR ERROR:\n%s' % str(e))

        assert type(results ) is PySolrResults\
            , 'search_results is not type "PySolrResults", instead is type "%s"' % type(PySolrResults)

        solr_results = SolrResultsHandler(results\
                                        , self.searchFormatter.num_display_rows\
                                        , self.searchFormatter.result_start_offset\
                                        )
        return (True, solr_results)

if __name__=='__main__':
    ss = SolrSearcher()
    ss.conduct_search('Stephen King')
