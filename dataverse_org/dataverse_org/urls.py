from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    #url(r'^$', TemplateView.as_view(template_name='base.html')),

    # Home page
    url(r'^$', 'apps.basic_pages.views.view_homepage', name='view_homepage'),
    #url(r'^search/', include('apps.search.urls')),

    url(r'^nav-only/$', 'apps.basic_pages.views.view_nav_only', name='view_nav_only'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^dataverse-org-admin/', include(admin.site.urls)),


    #url(r'^', include('apps.basic_pages.urls')),
    #(r'^(?P<url>.*)$', 'django.contrib.flatpages.views.flatpage'),
)

urlpatterns += patterns('django.contrib.flatpages.views',
    url(r'^(?P<url>.*/)$', 'flatpage', name='view_flatpage'),
)
#url(r'^best-practices/$', 'view_best_practices_page', name="view_best_practices_page"),


# Uncomment the next line to serve media files in dev.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

"""
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
                            url(r'^__debug__/', include(debug_toolbar.urls)),
                            )
"""