// Focus state for append/prepend inputs
    $('.form-control-group').on('focus', '.form-control', function () {
        $(this).closest('.form-control-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.form-control-group').removeClass('focus');
    });

    $(function() {

        // Set active nav link state
        $('.nav li a:first').click().addClass('active');
        $('.nav a').on('click', function() {
            $(this).parent().parent().find('a.active').removeClass('active');
            $(this).addClass('active');

        });

        // Fix navigation on splash page when scrolled past
        var navCurrent    = $('.features-nav').offset().top;
        var fixedNav = function(){
            var scrollTop = $(window).scrollTop();

            if ( scrollTop > navCurrent) {
                $('.features-nav').addClass('features-nav-fixed');

            } else {
                $('.features-nav').removeClass('features-nav-fixed');
            }
        };

        fixedNav();

        $(window).scroll(function() {
            fixedNav();
        });
    });



    // $(document).ready(function ( {
    //     var panels    = $('.feature-block'),
    //         container = $('.feature'),
    //         scroll    = $('.features');
    // });
