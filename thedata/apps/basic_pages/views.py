from __future__ import print_function

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.template import RequestContext


def view_homepage(request):
    d = {}
    #d['page_title'] = 'Phthisis Ravens: TB Project'
    d['home_page'] = True

    return render_to_response('base.html'\
                              , d\
                              , context_instance=RequestContext(request))


def view_about_page(request):
    d = {}
    d['about_page'] = True
    return render_to_response('about.html'\
                              , d\
                              , context_instance=RequestContext(request))


def view_predict_page(request):
  d = {}
  d['predict_page'] = True
  return render_to_response('predict.html'\
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




