'use strict'

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch')
} else {
    document.body.classList.add('_pc')
}

/* Menu Burger */

const iconMenu = document.querySelector('.menu-header__icon');

if (iconMenu) {
    const menuBody = document.querySelector('.menu-header__body');
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

/* Slider */

let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
let count = 0;
let width;
const container = document.querySelector('.feedback-slider__container');
const track = document.querySelector('.feedback-slider__track');
const btnPrev = document.querySelector('.switch__link_left');
const btnNext = document.querySelector('.switch__link_right');
const items = document.querySelectorAll('.feedback-slider__item');
const itemWidth = container.clientWidth / slidesToShow;
const itemsCount = items.length;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;

    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
});

btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
});

const init = () => {
    console.log('resize');
    width = container.offsetWidth;
    track.style.width = width * items.length + 'px';
    items.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    });
}

const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
};    

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

window.addEventListener('resize', init);

init();
checkBtns();
