new Swiper('.main-slider.swiper', {
    breakpoints: {

        320: {
            pagination: {
                el: '.swiper-pagination',
            },
        },

        768: {
            pagination: {
                el: '.swiper-pagination-vertical',
            },
        },
    }
});

new Swiper('.topical-links__wrap.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        320: {
            spaceBetween: 15,
            slidesPerView: 1,
        },

        768: {
            spaceBetween: 25,
            slidesPerView: 2,
        },
        1024: {
            spaceBetween: 47,
            slidesPerView: 3,
        },
    }
});

new Swiper('.exposition__gallery-wrap.swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        320: {
            spaceBetween: 20,
        },

        768: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 1.5,
        },

        1440: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 3,
        },
    }
});

new Swiper('.museum-area__gallery-wrap.swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        320: {
            spaceBetween: 20,
        },

        768: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 1.5,
        },

        1440: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 3,
        },
    }
});

new Swiper('.museum-mariel__gallery-wrap.swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        320: {
            spaceBetween: 20,
        },

        768: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 1.5,
        },

        1440: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 3,
        },
    }
});

new Swiper('.event__gallery-wrap.swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    breakpoints: {
        320: {
            spaceBetween: 20,
        },

        768: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 1.5,
        },

        1440: {
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerView: 3,
        },
    }
});

$(document).ready(function () {
    $(".block__title").click(function (event) {
        if ($(".block").hasClass("block--showoneitem")) {
            $(".block__title").not($(this)).removeClass("active");
            $(".block__text").not($(this).next()).slideUp(300);
        }
        $(this).toggleClass("active").next().slideToggle(300);
    });
});


