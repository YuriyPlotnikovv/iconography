const sliders = document.querySelectorAll('.slider');

const initSlider = (slider) => {
    const defaultSliderOptions = {
        speed: 1500,
        watchOverflow: true,
        observer: true,
        resizeObserver: true,
        loop: true,
        spaceBetween: 20,
    };

    const sliderOptions = {...defaultSliderOptions};

    if (slider.hasAttribute('data-pagination')) {
        sliderOptions.pagination = {
            el: '.slider__pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return current + ' | ' + total;
            },
        };
    }

    if (slider.hasAttribute('data-navigation')) {
        sliderOptions.navigation = {
            prevEl: '.slider__navigation-item--prev',
            nextEl: '.slider__navigation-item--next',
        };
    }

    if (slider.hasAttribute('data-autoplay')) {
        sliderOptions.autoplay = {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        };
    }

    if (slider.hasAttribute('data-grid')) {
        sliderOptions.grid = {
            rows: 2,
            fill: 'row'
        };
        sliderOptions.breakpoints = {
            320: {
                slidesPerView: 1,
                grid: {
                    rows: 1,
                }
            },
            769: {
                slidesPerView: 2,
            },
            1101: {
                slidesPerView: 3,
            },
            1601: {
                slidesPerView: 4,
            },
        };
    }

    if (slider.hasAttribute('data-cards')) {
        sliderOptions.breakpoints = {
            320: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 2,
            },
            1100: {
                slidesPerView: 3,
            },
            1600: {
                slidesPerView: 4,
            },
        };
    }

    new Swiper(slider, sliderOptions);
};

if (sliders.length > 0) {
    sliders.forEach((slider) => {
        initSlider(slider);
    });
}
