import json
from datetime import datetime

from django import forms
from django.utils.translation import ugettext as _

from apps.search.solr_facet_field_list import facet_field_list
from apps.search.solr_facet_field_list import DV_TYPE_CHOICES
from apps.search.solr_highlight_field_list import highlight_field_list

class MilestoneFormNoRepositoryException(Exception):
    pass

# "2014-08-15T18:18:04Z"
#datetime.strptime('2014-08-15T18:18:04Z', GITHUB_TIME_FORMAT_STRING)


class BasicSearchForm(forms.Form):

    pre_formatted_search_term = None
    search_term = forms.CharField(max_length=100)#, required=False)
    page_num = forms.IntegerField(initial=1, widget=forms.HiddenInput())
    #dv_type = forms.ChoiceField(label='DvObject Facet'\
    #                , choices=DV_TYPE_CHOICES\
    #                , widget=forms.CheckboxSelectMultiple(attrs={'class':'appt_choice cbox',})\
    #          )

    
    def clean_search_term(self):
        self.pre_formatted_search_term = None
        
        search_term = self.cleaned_data.get('search_term', None)
        
        if search_term is None:
            raise forms.ValidationError(_('Search term is required'))
        
        search_term = search_term.strip()
        if search_term == '':
            raise forms.ValidationError(_('Search term cannot be blank'))
        print ("SEARCH TERM: %s" % search_term)
        
        self.pre_formatted_search_term = search_term
        #formatted_term = ' AND '.join(search_term.split())
        #if not search_term.startswith(u'"') and not search_term.ensdswith(u'"'):
        search_term = u'"%s"' % search_term
        print ("SEARCH TERM: %s" % search_term)
        return search_term
        
        return 'fq=itemtype:(%s)' % search_term
     
    class Meta:
        pass


  