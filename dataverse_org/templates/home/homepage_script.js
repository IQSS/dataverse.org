

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
                    'top': lastelement.top,
                    'left': lastelement.left
            });
            $lastelement.css('opacity', 0);

            //Need to dynamically alter contents of the clone rear BEFORE it animates? Do it here
            //$('#cloneBack').html('hi');

            //Flip the card while centering it in the screen
            //[hack: we have to wait for the clone to finish drawing before calling the transform so we put it in a 100 millisecond settimeout callback]
            setTimeout(function () {
                $clone.css({
                    'top': '75px',
                        'left': 'calc(50% - 200px)',
                        'height': '400px',
                        'width': '400px'
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
    $('body').click(function (e) {
        if (cloneflipped) {
            if (e.target === e.currentTarget) {
                //Reverse the animation
                $clone.css({
                    'top': lastelement.top + 'px',
                        'left': lastelement.left - 130 + 'px',
                        'height': lastelement.height + 'px',
                        'width': lastelement.width + 'px'
                });
                $clone.find('#cloneFront').css({
                    'transform': 'rotateY(0deg)'
                });
                $clone.find('#cloneBack').css({
                    'transform': 'rotateY(-180deg)'
                });
            }
        }
    });
}

/* End Flip-cards */

$(document).ready(function () {
    load_chart();
    flipCards();
});

