from django.contrib import admin

from apps.dataverse_stats.models import DataverseStatsSnapshot, MonthlyDownloadStats

class DataverseStatsSnapshotAdmin(admin.ModelAdmin):
    save_on_top = True
    #search_fields = ('description', )
    list_display = ('retrieval_datetime', 'dataset_count', 'file_count', 'download_count', )
    readonly_fields = ('modified', 'created',)
admin.site.register(DataverseStatsSnapshot, DataverseStatsSnapshotAdmin)


class MonthlyDownloadStatsAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('retrieval_date', 'month_count', 'cumulative_count')
    readonly_fields = ('modified', 'created',)
admin.site.register(MonthlyDownloadStats, MonthlyDownloadStatsAdmin)

