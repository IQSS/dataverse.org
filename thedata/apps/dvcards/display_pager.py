"""
python manage.py test apps.dvcards.tests
python apps/dvcards/display_pager.py
"""


class DisplayPager:
    """
    This will be used to create the HTML results pager.
    """
    def __init__(self, num_hits, items_per_page=10, result_start_offset=0, **kwargs):
        assert(num_hits >= 0)
        assert(items_per_page >= 1)
        assert(result_start_offset >= 0)
        
        self.num_pager_buttons = kwargs.get('num_pager_buttons', 5)
        
        assert(self.num_pager_buttons > 0)
        # make sure offset doesn't exceed num_hits
        # possible that query results could change (solr cleared, etc)
        #
        if (result_start_offset+1) > num_hits:
            result_start_offset = 0
        
        # Should the pager be used at all
        self.show_pager = False     # No need to show the page if only 1 page is available

        # Numbers to start with
        self.num_hits = num_hits
        self.items_per_page = items_per_page
        self.result_start_offset = result_start_offset
        
        self.current_page = 0
    
        
        # to calculate
        self.page_count = 0

        self.page_menu_range = None
        
        self.pager_calculated = False
        
        self.calculate_pager_items()
    
    def em_current_page(self, page_num):
        assert(type(page_num) is int)
        
        if self.current_page == page_num:
            return '<em>%s</em>' % page_num
        
        return page_num
        
    def get_page_menu_with_chosen(self):
        if self.page_menu_range is None:
            return None
        return [self.em_current_page(x) for x in self.page_menu_range]
        
    def show(self):
        
        page_menu = self.get_page_menu_with_chosen()
        
        test_str = """
------------
page settings
------------
current page: %s
num pages: %s 
num_pager_buttons: %s
menu: %s
first|prev|next|last: %s | %s | %s | %s
------------

""" % (self.current_page\
    , self.page_count\
    , self.num_pager_buttons
    , page_menu
    , self.first_page
    , self.previous_page
    , self.next_page
    , self.last_page
    )
        print(test_str)
        
    def get_current_page(self):
        # start on page 1
        if self.num_hits == 0:
            return 0
            
        if self.result_start_offset == 0:    
            return 1
        
        # only enough results for 1 page
        if self.num_hits <= self.items_per_page:
            return 1

        # calculate page number based on offset
        current_page_num = (self.result_start_offset + 1) / self.items_per_page
        if ( (self.result_start_offset + 1) % self.items_per_page) > 0:
               current_page_num += 1 
        return current_page_num
        
    '''
    def get_solr_offset(self):
        """
        if items_per_page == 10:
            page 1 offset: 0
            page 2 offset: 10
            page 3 offset: 20
        """
        if self.pager_calculated is False:
            self.calculate_pager_items()
            
        return (self.current_page - 1) * (self.items_per_page)
    '''
    
    def set_page_count(self):
        """Set the number of pages"""

        if self.num_hits == 0: # No hits, no pages
            self.page_count = 0
        else:
            # number of full pages
            self.page_count = (self.num_hits / self.items_per_page) 
            # is there a partial page
            if ( self.num_hits % self.items_per_page) > 0:
                self.page_count += 1
        
    def calculate_pager_items(self):
        if self.num_hits >= 0 and self.num_hits <= self.items_per_page:
            # no need for a pager
            return 
        
        self.set_page_count()
        
        # Do we need the pager to display
        if self.page_count > 0:
            self.show_pager = True
        
        self.current_page = self.get_current_page()
        
        # set first_page, previous_page, next_page, last_page
        #
        if self.current_page > 1:
            self.first_page = 1
            self.previous_page = self.current_page - 1
        
        if self.current_page < self.page_count:
            self.last_page = self.page_count
            self.next_page = self.current_page + 1
        
        # list of page menu numbers to display
        #
        odd_pages = False
        if (self.num_pager_buttons % 2) > 0:
            odd_pages = True

        # how many page buttons do we need
        page_button_count = min(self.page_count, self.num_pager_buttons)
        
        # calculate the mid_button
        if odd_pages: 
            mid_button = (page_button_count / 2) + 1    # 1, 2, 3, 4, 5 -> "mid page is 3"
            num_left = page_button_count / 2
            num_right = num_left
        else: 
            mid_button = (page_button_count / 2)    # 1, 2, 3, 4 -> "mid page is 2"
            num_left = (page_button_count / 2) - 1
            num_right = page_button_count / 2 
        
        # calculate the page range

        leftmost_page = self.current_page - num_left
        leftmost_page = max(leftmost_page, 1)   # should not be less than 1
        
        rightmost_page = self.current_page + num_right
        rightmost_page = min(rightmost_page, self.page_count)   # should not be less than 1
        
        left_page_range = range(leftmost_page, self.current_page)
        right_page_range = range(self.current_page+1, rightmost_page + 1)

        # Is left page range filled out? If not, add right pages
        #
        num_left_unused = num_left - len(left_page_range) 
        while num_left_unused > 0:
            if len(right_page_range) == 0 or right_page_range[-1] == self.page_count:
                break
            right_page_range.append(right_page_range[-1] + 1)
            num_left_unused = num_left_unused - 1

        # Is right page range filled out? If not, add left pages
        #
        num_right_unused = num_right - len(right_page_range) 
        while num_right_unused > 0:
            if len(left_page_range) == 0 or left_page_range[0] == 1:
                break
            left_page_range.insert(0, left_page_range[0] - 1)
            num_right_unused = num_right_unused - 1
        
        self.page_menu_range = left_page_range\
                        + [self.current_page]\
                        + right_page_range
        

        self.pager_calculated = True

if __name__=='__main__':
    kwargs = dict(num_pager_buttons=5)
    p = DisplayPager(num_hits=70, items_per_page=10, result_start_offset=71, **kwargs)
    p.show()
    #print (p.page_count)
    #print (p.page_menu_range)
    