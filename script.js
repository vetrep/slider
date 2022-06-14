'use strict';

(() => {
    class SliderCollection {
        constructor(sliders) {
            this.slides = sliders;
            this.currentSliderIndex = 0;

            sliders[this.currentSliderIndex].style.zIndex = 2;
        }

        toPrev() {
            const currentSlide = this.slides[this.currentSliderIndex];

            this.currentSliderIndex--;

            if (this.currentSliderIndex < 0) {
                this.currentSliderIndex = this.slides.length - 1;
            }

            const nextSlide = this.slides[this.currentSliderIndex];
            nextSlide.style.zIndex = 1;
            nextSlide.style.left = 0;

            currentSlide.style.left = '-100%';
        }

        toNext() {
            const currentSlide = this.slides[this.currentSliderIndex];

            this.currentSliderIndex++;

            if (this.slides.length <= this.currentSliderIndex) {
                this.currentSliderIndex = 0;
            }

            const nextSlide = this.slides[this.currentSliderIndex];
            nextSlide.classList.remove('animation');
            nextSlide.style.zIndex = 1;
            nextSlide.style.left = 0;

            currentSlide.classList.add('animation');
            currentSlide.style.left = '100%';
        }
    }


    function isButtonElement(elem) {
        return !!elem.getAttribute('role');
    }

    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slider__slide');

    const sliderCollection = new SliderCollection(slides);

    slider.addEventListener('click', (event) => {
        const { target } = event;

        if (!isButtonElement(target)) {
            return;
        }

        const direction = target.getAttribute('role');

        switch (direction) {
            case 'prev':
                sliderCollection.toPrev();
                break;
            case 'next':
                sliderCollection.toNext();
                break;
            default:
        }
    });
})();