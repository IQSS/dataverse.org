from django.conf.urls import patterns, include, url


urlpatterns = patterns('apps.basic_pages.views',

    url(r'^home/$', 'view_homepage', name="view_homepage"),

    url(r'^support/$', 'view_support_page', name="view_support_page"),

    url(r'^best-practices/$', 'view_best_practices_page', name="view_best_practices_page"),

    url(r'^/?$', 'view_homepage', name="default_homepage"),


)
