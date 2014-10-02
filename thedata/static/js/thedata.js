/* Project specific Javascript goes here. Nothing yet */
function link_popovers(){

    // show milestone descriptions when hovering over titles
   $('[data-toggle="popover"]').popover({
    	html: true,
    	trigger: 'hover',
    	placement: 'auto',
    	delay: { "show": 00, "hide": 500 },
    	content: function() {
            var content = $(this).data('content-target');
            try { content = $(content).html() } catch(e) {/* Ignore */}
            return content || $(this).data('content');
    	}
    });
    
    // show repository descriptions when hovering over repo header names
    $('[data-toggle="popoverb"]').popover({
        trigger: 'hover',
        placement: 'auto',
        html: true,
        content: function() {
            var content = $(this).data('content-target');
            try { content = $(content).html() } catch(e) {/* Ignore */}
            return content || $(this).data('content');
    	}           	
    });
}