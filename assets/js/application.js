// Focus state for append/prepend inputs
    $('.form-control-group').on('focus', '.form-control', function () {
        $(this).closest('.form-control-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.form-control-group').removeClass('focus');
    });

$(function() {
    //Cache the page
    var $page = $('html, body');

    // Set the speed of the assisted page scroll
    var pageScrollSpeed = 500;

    // -------------------------------------------------------------------------
    // SETUP - NAVIGATION
    // -------------------------------------------------------------------------
    // Cache Navigation in jQuery objects
    var $navContainer = $('.features-nav');

    // All nav items
    var $navLinks = $('.nav-link');
    // Specific nav item, e.g., navItem.$home

    var navLink = {
        "$admin": $navLinks.filter('.admin'),
        "$user":  $navLinks.filter('.user'),
        "$dev":   $navLinks.filter('.dev'),
        "$des":   $navLinks.filter('.des'),
        "$home":  $navLinks.filter('.top')
    };


    // -------------------------------------------------------------------------
    // SETUP - PAGE CONTENT
    // -------------------------------------------------------------------------

    // Specific section, e.g., section.$home
    var section = {
        "$admin": $('#feture-admin'),
        "$user":  $('#feture-user'),
        "$dev":   $('#feture-dev'),
        "$des":   $('#feture-des'),
        "$home":  $('#phpbb')
    };


    // -------------------------------------------------------------------------
    // SETUP - HELPER FUNCTIONS
    // -------------------------------------------------------------------------

    var pageScrollTo = function (target) {
        target = target > 0 ? target : target.offset().top;
        $page.animate({ 'scrollTop': target }, pageScrollSpeed);
    };

    // -------------------------------------------------------------------------
    // SETUP - EVENT BINDINGS
    // -------------------------------------------------------------------------

    // CLICK EVENTS ------------------------------------------------------------

    $navLinks.on('click', function (event) {
        var $this = $(this);
        var destination = $this.attr('href');

        event.preventDefault();

        $navLinks.removeClass('active');
        if(destination == '#phpbb' ) {
            navLink.$admin.addClass('active');
        } else {
            $this.addClass('active');
        }
        pageScrollTo($(destination));
    });

    // END CLICK EVENTS --------------------------------------------------------

    section.$admin.waypoint(function(){
        $navLinks.removeClass('active');
        navLink.$admin.addClass('active');
    });

    section.$user.waypoint(function(){
        $navLinks.removeClass('active');
        navLink.$user.addClass('active');
    });

    section.$dev.waypoint(function(){
        $navLinks.removeClass('active');
        navLink.$dev.addClass('active');
    });

    section.$des.waypoint(function(){
        $navLinks.removeClass('active');
        navLink.$des.addClass('active');
    });

    section.$home.waypoint(function(){
        $navLinks.removeClass('active');
        navLink.$admin.addClass('active');
    });

    $navContainer.waypoint('sticky');
});


