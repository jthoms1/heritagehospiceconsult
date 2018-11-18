(function (window, $) {
    "use strict";

    $.fn.smoothScrollTo = function (options) {
        return this.on('click', function (event) {
            event.preventDefault();
            var elm = $(this).attr('href'),
                heightOffset = options.heightOffset || 40,
                animateOptions = {
                    'scrollTop': $(elm).offset().top - heightOffset + 'px'
                };

            if (typeof options.complete !== "undefined") {
                $('html,body').animate(animateOptions, options.complete); // 40px buffer to top.
            } else {
                $('html,body').animate(animateOptions); // 40px buffer to top.
            }
        });
    };

    $.fn.stickyHead = function (options) {

        return this.each(function () {

            var el = $(this),
                offset = el.offset();

            $(window).bind('scroll.DOMWindow', function () {

                var scrollTop = $(window).scrollTop();

                if (scrollTop >= offset.top && !el.hasClass(options.className)) {
                    options.stickIt(el);
                } else if (scrollTop < offset.top && el.hasClass(options.className)) {
                    options.loosenIt(el);
                }
            });
        });
    };

    $('.sticky-goals').stickyHead({
        className: 'on-top',
        stickIt: function (el) {
            console.log('stickIt');
            el.addClass('on-top');
            $('.primary-nav ul')
                .css({position: 'fixed', top: '-40px'})
                .animate({top: '0'}, 200);
            $('.masthead .logo')
                .show()
                .css({position: 'fixed', top: '-40px'})
                .animate({top: '0'}, 200);
        },
        loosenIt: function (el) {
            console.log('loosenIt');
            el.removeClass('on-top');
            $('.primary-nav ul')
                .animate({top: '-40'}, 200, function () {
                    $(this).css({
                        position: 'absolute',
                        top: '0'
                    });
                });
            $('.masthead .logo')
                .animate({top: '-40'}, 200, function () {
                    $(this).hide();
                });
        }
    });

    $('.page-nav a').smoothScrollTo({
        heightOffset: 45
    });
    $('a[data-action="scrollto"]').smoothScrollTo({
        heightOffset: 45,
        complete: function () {
            $('#contact-name').focus();
        }
    });
}(window, jQuery));