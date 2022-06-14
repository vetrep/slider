'use strict';

(() => {
    class SliderCollection {
        static ANIMATION_TIME = 500;

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
            nextSlide.classList.remove('animation_opacity');
            nextSlide.style.zIndex = 1;
            nextSlide.style.opacity = 1;

            setTimeout(() => {
                nextSlide.style.zIndex = 2;
            }, SliderCollection.ANIMATION_TIME);

            currentSlide.classList.add('animation_opacity');
            currentSlide.style.opacity = '0';
        }

        toNext() {
            const currentSlide = this.slides[this.currentSliderIndex];

            this.currentSliderIndex++;

            if (this.slides.length <= this.currentSliderIndex) {
                this.currentSliderIndex = 0;
            }

            const nextSlide = this.slides[this.currentSliderIndex];
            nextSlide.classList.remove('animation_opacity');
            nextSlide.style.zIndex = 1;
            nextSlide.style.opacity = 1;

            setTimeout(() => {
                nextSlide.style.zIndex = 2;
            }, SliderCollection.ANIMATION_TIME);

            currentSlide.classList.add('animation_opacity');
            currentSlide.style.opacity = '0';
        }
    }


    function isButtonElement(elem) {
        return !!elem.getAttribute('role');
    }

    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slider__slide');

    const sliderCollection = new SliderCollection(slides);

    let lastTime = 0;

    slider.addEventListener('click', (event) => {
        const { target } = event;
        const currentTime = Date.now();

        if (!isButtonElement(target) || currentTime - lastTime < SliderCollection.ANIMATION_TIME) {
            return;
        }

        lastTime = currentTime;
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