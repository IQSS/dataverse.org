from django.contrib import admin

from apps.dataverse_stats.models import DataverseStatsSnapshot

class DataverseStatsSnapshotAdmin(admin.ModelAdmin):
    save_on_top = True
    #search_fields = ('description', )
    list_display = ('retrieval_datetime', 'dataset_count', 'file_count', 'download_count', )
    readonly_fields = ('modified', 'created',)
admin.site.register(DataverseStatsSnapshot, DataverseStatsSnapshotAdmin)

