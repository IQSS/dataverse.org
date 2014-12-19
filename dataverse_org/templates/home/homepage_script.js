

/* Flip-cards */
/* http://stackoverflow.com/questions/24503882/the-google-cards-flip-and-grow-effect */

function flipCards() {
    //Cache the clone since we have to select it a couple of times
    $clone = $('#cardClone');

    //Set a global for the card we just clicked so we can track it
    $lastelement = "";

    //Set up an object for last clicked element so we know where to return to on collapse
    lastelement = {
        'top': 0,
            'left': 0,
            'width': 0,
            'height': 0
    };

    //Set a flag to determine the current flip state of our clone
    cloneflipped = false;




    //Bind a handler to the clone so we can detect when the transition is done
    $('#cardClone').on("transitionend webkitTransitionEnd oTransitionEnd", function (e) {
        if (e.target === e.currentTarget) {
            if (e.originalEvent.propertyName == 'top') {

                //Toggle the clone state
                cloneflipped = !cloneflipped;

                //Detect if our clone has returned to the original position and then hide it
                if (!cloneflipped) {
                    $($lastelement).css('opacity', 1);
                    $($clone).hide();
                } else {
                    //Need to dynamically alter contents of the clone rear AFTER it animates? Do it here
                    //$('#cloneBack').html('hi');
                }
            }
        }
    });


    $(".cards").click(function () {
        if (!cloneflipped) {
            //Cache clicked card
            $lastelement = $(this);

            var lastelementID = $lastelement.attr("id");

            //Store position of this element for the return trip
            //[hack: subtract 30 due to the margin of .cards in this demo]
            var offset = $lastelement.offset();
            lastelement.top = offset.top - 4 - $(document).scrollTop();
            lastelement.left = offset.left - 4;
            lastelement.width = $lastelement.width();
            lastelement.height = $lastelement.height();

            //BONUS: lets check to see if the clicked card is further to the left or the right of the screen
            //This way we can make the animation rotate inwards toward the center, google doesn't do this
            var rotatefront = "rotateY(180deg)";
            var rotateback = "rotateY(0deg)";
            if ((lastelement.left + lastelement.width / 2) > $(window).width() / 2) {
                rotatefront = "rotateY(-180deg)";
                rotateback = "rotateY(-360deg)";
            }


            //Copy contents of the clicked card into the clones front card
            $clone.find('#cloneFront').html($lastelement.html());


            //Show the clone on top of the clicked card and hide the clicked card
            //[hack: using opacity for hiding here, visibility:hidden has a weird lag in win chrome]
            $clone.css({
                'display': 'block',
                    'top': lastelement.top + 4 + 'px',
                    'left': lastelement.left - 79 + 'px'
            });
            $lastelement.css('opacity', 0);

            //Need to dynamically alter contents of the clone rear BEFORE it animates? Do it here
            //$('#cloneBack').html('hi');

            // Show hidden description for clicked card
            $('#cloneBack').find('#card-' + lastelementID).removeClass('hidden');

            //Flip the card while centering it in the screen
            //[hack: we have to wait for the clone to finish drawing before calling the transform so we put it in a 100 millisecond settimeout callback]
            setTimeout(function () {
                $clone.css({
                    'top': 'calc(50% - 184px)',
                        'left': 'calc(50% - 180px)',
                        'height': '360px',
                        'width': '360px'
                        //'width': $(document).width() - 140 + 'px'
                });
                $clone.find('#cloneFront').css({
                    'transform': rotatefront
                });
                $clone.find('#cloneBack').css({
                    'transform': rotateback
                });
            }, 100);
        } else {
            $('body').click();
        }
    });


    //If user clicks outside of the flipped card, return to default state
    $('body, body *:not(a)').click(function (e) {
        if (cloneflipped) {
            if (e.target === e.currentTarget) {
                //Reverse the animation
                $clone.css({
                    'top': lastelement.top + 6 + 'px',
                        'left': lastelement.left - 76 + 'px',
                        'height': lastelement.height + 'px',
                        'width': lastelement.width + 'px'
                });
                $clone.find('#cloneFront').css({
                    'transform': 'rotateY(0deg)'
                });
                $clone.find('#cloneBack').css({
                    'transform': 'rotateY(-180deg)'
                });

                // Set timeout to hide visible description
                setTimeout(function () {
                    $clone.find('#cloneBack').find('p:visible').addClass('hidden');
                }, 100);
                
            }
        }
    });
}

function search_dataverses(searchVal){
    window.open('http://thedata.harvard.edu/dvn/faces/StudyListingPage.xhtml?mode=2&searchValue=' + searchVal + '', '_blank');
}

function bind_popover_search(){
    console.log('popover showing');

    var elem_find_button = $('.popover-content').find('#popoverSearchButton');
    var elem_search_input = $('.popover-content').find('#searchInputPopover');

    // Bind 'Find Button'
    //
    elem_find_button.click(function(e) {
         e.preventDefault();
         var searchVal = elem_search_input.val();
         console.log('click? ' + searchVal);
         search_dataverses(searchVal);
         $("#finddata").popover('hide');
     });     
     
     // Bind: Pressing "Enter" on search box
     //
     elem_search_input.keypress(function (e) {
       if (e.which == 13) {
         e.preventDefault();
         var searchVal = elem_search_input.val();
         console.log('press return? ' + searchVal);
         search_dataverses(searchVal);
         $("#finddata").popover('hide');
       }
     });
}


function findDataPopover() {
    $("#finddata").popover({
        html: true, 
        content: function() {
              return $('#finddata-popover-content').html();
            }
    });
    
    $('#finddata').on('shown.bs.popover', function () {
          bind_popover_search();
    })
}

/* End Flip-cards */

$(document).ready(function () {
    load_chart();
    flipCards();
    findDataPopover();
});

