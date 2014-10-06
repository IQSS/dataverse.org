from __future__ import print_function

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template import RequestContext

from apps.federated_dataverses.models import FederatedDataverseInfo


def view_homepage(request):
    d = {}
    #d['page_title'] = 'Phthisis Ravens: TB Project'
    d['home_page'] = True
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




