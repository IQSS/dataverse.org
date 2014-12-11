/*
 Add active class to menu item that matches current page
*/
function highlight_selected_menu_item(){
    // iterate through each <a href..> in a .nav
    $('.nav a').each(function() {       

        // does path match?
        if ($(this).attr('href')  ===  window.location.pathname) {  

            // yes, add "active" class to enclosing <li..>
            $(this).parent().addClass('active');  
        }

     });        
}
