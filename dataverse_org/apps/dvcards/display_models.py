from apps.search.solr_highlight_field_list import highlight_field_list
from apps.search.solr_facet_field_list import DV_TYPE_VALUES, DVTYPE_KEY

#DV_TYPE_VALUES = ( 'dataverses','datasets','files')
DISPLAY_MODEL_NAMES = ('DataverseDisplay', 'DatasetDisplay', 'FileDisplay')
DISPLAY_MODEL_DICT = dict(zip(DV_TYPE_VALUES, DISPLAY_MODEL_NAMES))

class BasicDisplay(object):
    
    def __init__(self, display_vals):
        if not type(display_vals) is dict:
            raise TypeError('Exepcted display_vals to be a dict')
    
        for k, v in display_vals.items():
            self.__dict__[k] = v
        
class DataverseDisplay(BasicDisplay):
    pass  
    
class DatasetDisplay(BasicDisplay):
    pass  

class FileDisplay(BasicDisplay):
    pass  


def get_display_model(display_vals):
    """
    Given raw documents values from solr, 
    return either a DataverseDisplay, DatasetDisplay, or FileDisplay object
    """
    if not type(display_vals) is dict:
        raise TypeError('Exepcted display_vals to be a dict')
    
    display_class_name = DISPLAY_MODEL_DICT.get(display_vals.get(DVTYPE_KEY, {}), None)
    if display_class_name is None:
        return None
    DisplayObj = eval(display_class_name)
    return DisplayObj(display_vals)
    #if display_vals.has_key('dvtype'):
        