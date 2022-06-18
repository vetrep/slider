'use strict';

(() => {
    class SliderCollection {
        constructor(sliders, animationDuration = 1000) {
            this.slides = sliders;
            this.currentSliderIndex = 0;
            this.animationDuration = animationDuration;

            this._addStyles();

            sliders[this.currentSliderIndex].style.zIndex = 2;
        }

        toPrev() {
            const currentSlide = this.slides[this._getCurrentIndex('prev')];
            const prevSlide = this.slides[this._getPrevIndex('prev')];
            const nextSlide = this.slides[this._getNextIndex('prev')];

            nextSlide.style.zIndex = 1;
            nextSlide.style.left = '0';

            prevSlide.style.zIndex = 0;
            prevSlide.style.left = '0';

            currentSlide.style.zIndex = 2;
            currentSlide.style.left = '-100%';

            this.currentSliderIndex--;
        }

        toNext() {
            const currentSlide = this.slides[this._getCurrentIndex('next')];
            const prevSlide = this.slides[this._getPrevIndex('next')];
            const nextSlide = this.slides[this._getNextIndex('next')];

            nextSlide.style.zIndex = 1;
            nextSlide.style.left = '0';

            prevSlide.style.zIndex = 0;
            prevSlide.style.left = '0';

            currentSlide.style.zIndex = 2;
            currentSlide.style.left = '100%';

            this.currentSliderIndex++;
        }

        _getPrevIndex(direction) {
            const maxIndex = this.slides.length - 1;

            switch (direction) {
                case 'prev': {
                    let prevIndex = this.currentSliderIndex + 1;

                    if (maxIndex < prevIndex) {
                        prevIndex = 0;
                    }

                    return prevIndex;
                }
                case 'next': {
                    let prevIndex = this.currentSliderIndex - 1;

                    if (prevIndex < 0) {
                        prevIndex = maxIndex;
                    }

                    return prevIndex;
                }
                default:
                    console.error('Неверное направление', direction);
            }
        }

        _getCurrentIndex(direction) {
            const maxIndex = this.slides.length - 1;

            if (this.currentSliderIndex < 0) {
                this.currentSliderIndex = maxIndex;
            }

            if (maxIndex < this.currentSliderIndex) {
                this.currentSliderIndex = 0;
            }

            return this.currentSliderIndex;
        }

        _getNextIndex(direction) {
            const maxIndex = this.slides.length - 1;

            switch (direction) {
                case 'prev': {
                    let nextIndex = this.currentSliderIndex - 1;

                    if (nextIndex < 0) {
                        nextIndex = maxIndex;
                    }

                    return nextIndex;
                }
                case 'next': {
                    let nextIndex = this.currentSliderIndex + 1;

                    if (maxIndex < nextIndex) {
                        nextIndex = 0;
                    }

                    return nextIndex;
                }
                default:
                    console.error('Неверное направление', direction);
            }
        }

        _addStyles() {
            if (0 === this.slides.length) {
                return;
            }

            const slide = this.slides[0];
            const parentElement = slide.parentElement;

            const animationClassName = 'animation_' + Math.round(Math.random() * 1e12);
            parentElement.classList.add(animationClassName);

            const styles = document.createElement('style');
            styles.textContent = `.${animationClassName} > * { transition: left ${this.animationDuration}ms; }`;
            
            parentElement.insertAdjacentElement('beforebegin', styles);
        }
    }


    function isButtonElement(elem) {
        return !!elem.getAttribute('role');
    }

    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slider__slide');

    const sliderCollection = new SliderCollection(slides, 3000);

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