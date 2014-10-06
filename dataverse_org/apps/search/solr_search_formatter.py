from apps.search.solr_facet_field_list import facet_field_list
from apps.search.solr_highlight_field_list import highlight_field_list

DEFAULT_NUM_DISPLAY_ROWS = 10 

class SolrSearchFormatter:
    """
    Testing out solr.  Learning search strucure, etc
    """
    def __init__(self, **kwargs):
        self.search_str = ''
        self.stats_on = kwargs.get('stats', 'true')
        self.debug = kwargs.get('debug', 'true')

        self.num_display_rows = kwargs.get('num_display_rows', DEFAULT_NUM_DISPLAY_ROWS)
        self.page_num = kwargs.get('page_num', 1)

        self.result_start_offset = (self.page_num -1) * self.num_display_rows  # kwargs.get('result_start_offset', 0)

        assert(self.page_num >= 1)
        assert(self.num_display_rows >= 1)
        assert(self.result_start_offset >= 0)

        self.highlight_start_tag = kwargs.get('highlight_start_tag', '<em>')
        self.highlight_end_tag = kwargs.get('highlight_end_tag', '</em>')

    def get_solr_kwargs(self):
        solr_kw = {
            'facet' : 'on'\
            , 'facet.field' : facet_field_list\
            , 'start': self.result_start_offset     # result offset
            , 'rows': self.num_display_rows      # num results
            , 'hl': 'true'\
            , 'hl.fragsize': 500\
            , 'hl.fl' : highlight_field_list\
            #, 'hl.fl' :  ['title','authorName', 'dsDescription', 'publicationCitation', 'authorName_ss']\
            , 'hl.simple.pre' : self.highlight_start_tag\
            , 'hl.simple.post' : self.highlight_end_tag\
            , 'fq' : [ 'dvtype:(dataverses OR datasets OR files)']\
            , 'debug' : self.debug\
            , 'sort' : ['release_or_create_date_dt desc'],\
            
        }
        
        if self.stats_on:
            solr_kw.update({\
                        'stats' : 'true'\
                        , 'stats.field' : ['dvtype', 'subject_ss']\
                    })
                    
        return solr_kw
            #'stats')
        
    