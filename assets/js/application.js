// Focus state for append/prepend inputs
    $('.form-control-group').on('focus', '.form-control', function () {
        $(this).closest('.form-control-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.form-control-group').removeClass('focus');
    });

    $(function() {
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
