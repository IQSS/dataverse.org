from django.db import models
from django.db.models.signals import post_save      

from django.utils.text import slugify
from model_utils.models import TimeStampedModel
from django.conf import settings
from hashlib import md5

from PIL import Image

LOGO_MAX_WIDTH = 400
LOGO_MAX_HEIGHT = 200
LOGO_MAX_SIZE = (LOGO_MAX_WIDTH, LOGO_MAX_HEIGHT)

class FederatedDataverseInfo(TimeStampedModel):
    
    name = models.CharField(max_length=255, unique=True)
    
    visible = models.BooleanField(default=False)
    
    sort_order = models.IntegerField(default=10)
    
    homepage = models.URLField(help_text='url to the dataverse')
    
    description = models.TextField(blank=True, help_text='optional')
    
    logo_image = models.ImageField(upload_to='federated_logos', help_text='scaled down on save')
        
    slug = models.SlugField(blank=True, help_text='auto-filled on save')

    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)[:50]
        super(FederatedDataverseInfo, self).save(*args, **kwargs)
        
    def __unicode__(self):
        return self.name
        
    class Meta:
        ordering = ( 'sort_order', 'name',)
        
    def img_view(self):
        """View image in the admin"""
        
        return '<a href="%s"><img src="%s" style="border:1px solid #333;" width=100 /></a><br />(click for fullsize)' % (self.logo_image.url, self.logo_image.url)
        
        return '(auto-filled when main image is uploaded)'
    img_view.allow_tags = True


    @staticmethod
    def update_image_size( sender, **kwargs):
        """
        If logo image is too big, resize it
        """
        federated_info = kwargs.get('instance', None)
        if federated_info is None or not federated_info.logo_image:
            return

        img_field = federated_info.logo_image
        
        if img_field.width > LOGO_MAX_WIDTH or img_field.height > LOGO_MAX_HEIGHT:
            im = im = Image.open(img_field.file.name) 
            im.thumbnail(LOGO_MAX_SIZE, Image.ANTIALIAS) # resize
            im.save(img_field.file.name, quality=90)   #save

post_save.connect(FederatedDataverseInfo.update_image_size, sender=FederatedDataverseInfo)
