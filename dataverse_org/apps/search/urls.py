from django.conf.urls import patterns, include, url


urlpatterns = patterns('apps.search.views',

    url(r'^basic/$', 'view_basic_search', name="view_basic_search"),
    
)

