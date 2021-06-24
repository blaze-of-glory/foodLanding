window.addEventListener('DOMContentLoaded', () => {
    /* Реализация табов */
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabParent = document.querySelector('.tabheader__items');
    /* Изначально скрыли все табы */
    const hideTabContent = () => {
        tabContent.forEach(item => {
            item.style.display = `none`;
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }
    hideTabContent();
    /* Сделали функцию которая показывает табы (в том числе и первую отрисовку) */
    const showTabContent = (i = 0) => {
        tabContent[i].style.display = `block`;
        tabs[i].classList.add('tabheader__item_active');
    }
    showTabContent();
    /* Навесили обработчик событий */
    tabParent.addEventListener(`click`, (e) => {
        console.log(e);
    })
    /* Реализовали переключение табов за счёт перебора всех табов и сравнения с нажатым */
    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
    /* Реализация табов END*/
    /* Реализация таймера */
    const deadline = '2021-07-5';

    function getTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

    }
    function addZero(num) {
        if (num < 10) {
            return `0${num}`
        } else return num;
    }
    function setTime(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');
        const updateTimerInterval = setInterval(updateTimer, 1000);
        updateTimer();

        function updateTimer() {
            const t = getTime(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(updateTimerInterval);
            }
        }
    }
    setTime('.timer', deadline);
    /* Реализация таймера END*/
    // Модальное окно 
    const modalOpenBtn = document.querySelectorAll('[data-openModal]');
    const modalCloseBtn = document.querySelector('[data-closeModal]');
    const modal = document.querySelector('.modal');
    const openModal = () => {
        modal.style.display = 'block';
        document.body.style.overflow = `hidden`;
    }
    modalOpenBtn.forEach((btn) => {
        btn.addEventListener('click', openModal)
    })
    /*modalOpenBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    }) */

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ``;
    }
    modalCloseBtn.addEventListener('click', closeModal);
    //закрытие по нажатию вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })
    // Слайдер

    let slideIndex = 1;
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });
})
