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