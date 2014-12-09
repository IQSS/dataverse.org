from django import forms
from apps.dataverse_stats.models import DataverseStatsSnapshot

class StatsSnapshotValidationForm(forms.ModelForm):

    class Meta:
        model = DataverseStatsSnapshot
        exclude = ('created', 'modified')