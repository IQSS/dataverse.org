from __future__ import print_function

from datetime import datetime

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template import RequestContext

from django.db.models import Q

from thedata.utils.msg_util import *

from apps.search.forms import BasicSearchForm
from apps.search.solr_searcher import SolrSearcher

def get_search_results(formatted_search_term, page_num, num_display_rows):
    
    ss = SolrSearcher(solr_server_url=None  # will use defaulut 
                        , solr_server_timeout=10\
                        , **dict(num_display_rows=num_display_rows\
                                , page_num=page_num)\
                        )
    
    return ss.conduct_search(formatted_search_term)
    
    
def view_basic_search(request):

    num_display_rows = 10
    d = dict(num_display_rows=num_display_rows)
    
    if request.POST:
        search_form = BasicSearchForm(request.POST)
        if search_form.is_valid():
            d['display_search_term'] = search_form.pre_formatted_search_term

            (success, search_results_or_err_msg) = get_search_results(\
                                     search_form.cleaned_data['search_term']\
                                    , search_form.cleaned_data['page_num']\
                                    , num_display_rows\
                            )
            if success:
                d['search_results'] = search_results_or_err_msg
                d['display_pager'] = search_results_or_err_msg.display_pager
                #search_form = BasicSearchForm({ 'search_term' : search_form.pre_formatted_search_term })
            else:
                d['ERR_FOUND'] = True
                d['ERR_Msg'] = search_results_or_err_msg
                search_form = BasicSearchForm()
            
    else:
        (success, search_results_or_err_msg) = get_search_results('*', 1, num_display_rows)
        if success:
            d['search_results'] = search_results_or_err_msg
            d['display_pager'] = search_results_or_err_msg.display_pager
            #search_form = BasicSearchForm({ 'search_term' : search_form.pre_formatted_search_term })

        search_form = BasicSearchForm()

    d['search_form'] = search_form
        
    return render_to_response('search/view_basic_search.html'\
                              , d\
                              , context_instance=RequestContext(request))

    