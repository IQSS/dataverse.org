from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Homepage
    url(r'^$', 'apps.basic_pages.views.view_homepage', name='view_homepage'),

    # about page
    url(r'^about$', 'apps.basic_pages.views.view_about_page', name='view_about_page'),

    # nav bars for sphinx
    url(r'^nav-only/$', 'apps.navbar.views.view_nav_only', name='view_nav_only'),
    url(r'^nav-only-json/$', 'apps.navbar.views.view_nav_only_as_json', name='view_nav_only_as_json'),

    # contact page
    url(r'^contact$', 'apps.basic_pages.views.view_contact_page', name='view_contact_page'),

    # Uncomment the next line to enable the admin:
    url(r'^dataverse-org-admin/', include(admin.site.urls)),

    #url(r'^search/', include('apps.search.urls')),
    
    #url(r'^', include('apps.basic_pages.urls')),
  
    
)

#urlpatterns += patterns('django.contrib.flatpages.views',
#    url(r'^(?P<url>.*/)$', 'flatpage', name='view_flatpage'),
#)

