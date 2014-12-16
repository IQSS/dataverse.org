from __future__ import print_function

import json

from django.shortcuts import render_to_response
from django.template.loader import render_to_string
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template import RequestContext

# cache related
from django.views.decorators.cache import cache_page

from apps.federated_dataverses.models import FederatedDataverseInfo
from apps.dataverse_stats.models import DataverseStatsSnapshot, MonthlyDownloadStats


@cache_page(60 * 15)    # 15 minutes (900 seconds)
def view_homepage(request):
    d = {}

    # Stats for the "Find Data" box
    #
    try:
        stats_snapshot = DataverseStatsSnapshot.objects.latest('retrieval_datetime')
    except DataverseStatsSnapshot.DoesNotExist:
        stats_snapshot = None
    
    # Stats for the chart
    download_stats = MonthlyDownloadStats.objects.all().order_by('retrieval_date')
        
    
    d['home_page'] = True
    d['basic_stats'] = stats_snapshot
    d['download_stats'] = download_stats
    d['federated_dataverses'] = FederatedDataverseInfo.objects.filter(visible=True)
    
    return render_to_response('home/homepage.html'\
                              , d\
                              , context_instance=RequestContext(request))



def view_support_page(request):
    d = {}
    d['support_page'] = True
    return render_to_response('support.html'\
                              , d\
                              , context_instance=RequestContext(request))


def view_best_practices_page(request):
  d = {}
  d['best_practices_page'] = True
  return render_to_response('best_practices.html'\
                            , d\
                            , context_instance=RequestContext(request))


def view_map_page(request):

  d = {}
  d['map_page'] = True
  return render_to_response('map.html'\
                            , d\
                            , context_instance=RequestContext(request))


def view_explore_page(request):

  d = {}
  d['explore_page'] = True
  return render_to_response('explore.html'\
                            , d\
                            , context_instance=RequestContext(request))




