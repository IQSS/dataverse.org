from django.test import TestCase

from apps.dvcards.display_pager import DisplayPager
from dataverse_org.utils.msg_util import *

class DisplayPagerTests(TestCase):

    def test_calculation_for_current_page(self):
        """
        Tests that 1 + 1 always equals 2.
        """
        msgt('Test calculation for current page ')

        p = DisplayPager(num_hits=26, items_per_page=5, result_start_offset=21)
        #p.show()
        msg('should be 6 pages')
        self.assertEqual(p.page_count, 6)

        msg('current page should be 5')
        self.assertEqual(p.current_page, 5)

        p = DisplayPager(num_hits=0, items_per_page=5, result_start_offset=0)
        #p.show()
        msg('should be 0 pages')
        self.assertEqual(p.page_count, 0)

        msg('current page should be 0')
        self.assertEqual(p.current_page, 0)
    
    def test_left_fillin(self):
        msgt('test_left_fillin')
        
        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=126, items_per_page=5, result_start_offset=125, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 26)
        self.assertEqual(p.current_page, 26)
        self.assertEqual(p.get_page_menu_with_chosen(), [22, 23, 24, 25, '<em>26</em>'])        
  
    def test_right_fillin(self):
        msgt('test_right_fillin')

        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=116, items_per_page=10, result_start_offset=2, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 12)
        self.assertEqual(p.current_page, 1)
        self.assertEqual(p.get_page_menu_with_chosen(), ['<em>1</em>', 2, 3, 4, 5])        
    
    def test_page2(self):
        msgt('test_page2')

        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=116, items_per_page=10, result_start_offset=12, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 12)
        self.assertEqual(p.current_page, 2)
        self.assertEqual(p.get_page_menu_with_chosen(), [1, '<em>2</em>', 3, 4, 5])        

    def test_zero_pages(self):
        msgt('test_page2')

        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=1, items_per_page=10, result_start_offset=0, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 0)
        self.assertEqual(p.current_page, 0)
        self.assertEqual(p.get_page_menu_with_chosen(), None)        

    def test_four_buttons(self):
        msgt('test_four_buttons')

        kwargs = dict(num_pager_buttons=4)
        p = DisplayPager(num_hits=12, items_per_page=3, result_start_offset=5, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 4)
        self.assertEqual(p.current_page, 2)
        self.assertEqual(p.get_page_menu_with_chosen(), [1, '<em>2</em>', 3, 4])        

    def test_two_pages(self):
        msgt('test_two_pages')

        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=12, items_per_page=10, result_start_offset=0, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 2)
        self.assertEqual(p.current_page, 1)
        self.assertEqual(p.get_page_menu_with_chosen(), ['<em>1</em>', 2])        

    def test_bad_offset(self):
        msgt('offset beyond # of hits, should revert to page 1')
        kwargs = dict(num_pager_buttons=5)
        p = DisplayPager(num_hits=70, items_per_page=10, result_start_offset=71, **kwargs)
        msg(p.get_page_menu_with_chosen())
        self.assertEqual(p.page_count, 7)
        self.assertEqual(p.current_page, 1)
        self.assertEqual(p.get_page_menu_with_chosen(), ['<em>1</em>', 2, 3, 4, 5])        
        
