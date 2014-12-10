from django.db import models
from model_utils.models import TimeStampedModel

class DataverseStatsSnapshot(TimeStampedModel):
    """
    This model stores stats retrieved/screen scraped from the DV 3.6 homepage:
    
        http://thedata.harvard.edu/dvn/
    """
    retrieval_datetime = models.DateTimeField()

    dataverse_count = models.IntegerField("Dataverse count")
    dataset_count = models.IntegerField("Study/Dataset count")
    file_count = models.IntegerField("File count")
    download_count = models.IntegerField("Total download count")

    description = models.TextField(blank=True, help_text='optional')
    
    
    def save(self, *args, **kwargs):
        #
        super(DataverseStatsSnapshot, self).save(*args, **kwargs)
        
    def __unicode__(self):
        return '%s' % self.retrieval_datetime.strftime('%a, %b %d, %Y at %I:%M:%S')
        
    class Meta:
        ordering = ( '-retrieval_datetime', )
 
 
class MonthlyDownloadStats(TimeStampedModel):
    retrieval_date = models.DateField()
    
    month_count = models.IntegerField()
    cumulative_count = models.IntegerField()
    
    def __unicode__(self):
        return '%s' % self.retrieval_date.strftime('%a, %b %d, %Y at %I:%M:%S')
        
    class Meta:
        ordering = ( '-retrieval_date', )
        verbose_name_plural = 'Monthly download stats'
    