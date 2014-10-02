from django.contrib import admin

from apps.federated_dataverses.models import FederatedDataverseInfo

class FederatedDataverseInfoAdmin(admin.ModelAdmin):
    save_on_top = True
    search_fields = ('name', 'description', )
    list_editable = ('sort_order',)
    list_display = ('name', 'visible', 'sort_order', 'homepage', 'img_view', 'slug')
    readonly_fields = ('modified', 'created', 'img_view')
admin.site.register(FederatedDataverseInfo,FederatedDataverseInfoAdmin)

