from django.conf.urls import patterns, include, url


urlpatterns = patterns('apps.basic_pages.views',

    url(r'^home/$', 'view_homepage', name="view_homepage"),

    url(r'^support/$', 'view_support_page', name="view_support_page"),

    url(r'^best-practices/$', 'view_best_practices_page', name="view_best_practices_page"),

    #url(r'^about/$', 'view_about_page', name="view_about_page"),

    #url(r'^predict/$', 'view_predict_page', name="view_predict_page"),

    #url(r'^share/$', 'view_share_page', name="view_share_page"),


    url(r'^/?$', 'view_homepage', name="default_homepage"),

    #url(r'^milestone-history/(?P<chosen_year>(\d){4})/$', 'view_milestone_history', name="view_milestone_history_by_year"),

    #url(r'^milestone-roadmap/(?P<repo_name>(\-|_|\w){1,120})/$', 'view_single_repo_column', name="view_single_repo_column"),

)
