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
    /* Реализация карточек через классы */
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML =
                `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        12,
        '.menu .container',
        "menu__item"
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, нои качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        40,
        '.menu .container',
        "menu__item"
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        20,
        '.menu .container',
        "menu__item"
    ).render();
    /* Реализация карточек через классы  END */

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
                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
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
    // Модальное окно END
    // Отправка данных из формы
    const forms = document.querySelectorAll('form');
    forms.forEach(item => {
        postForm(item);
    });
    const requestMessageText = {
        loading: 'Загрузка',
        success: 'Данные получены',
        failure: 'Произошла ошибка'
    }

    function postForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const requestMessageBlock = document.createElement('div');
            requestMessageBlock.classList.add('status');
            requestMessageBlock.textContent = requestMessageText.loading;
            form.appendChild(requestMessageBlock);
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            const formData = new FormData(form);
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    requestMessageBlock.textContent = requestMessageText.success;
                    form.reset();
                    setTimeout(() => {
                        requestMessageBlock.remove();
                    }, 5000);
                } else {
                    requestMessageBlock.textContent = requestMessageText.failure;
                }
            })
        })
    };
    // Отправка данных из формы END
    /* Слайдер v1
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
     END Слайдер v1*/

    // Слайдер v2
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider');
    let slideIndex = 1;
    let offset = 0;

    const widthConverter = (width) => {
        return +width.replace(/\D/g, '');
    }
    //Добавляем нолик для отображения чисел меньше чем 10 (панель состояния слайдов)
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Задаём ширину, позиционирование и анимацию блока, в котором будут крутиться слайды
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    //Прячем слайды, которые не являются текущими 
    slidesWrapper.style.overflow = 'hidden';

    //Делаем так,что бы все слайды были по размеру равны окну показа (влезали целиком)
    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';
    //Создаём точки как элемент списка на странице и массив точек, для их манипуляций в дальнейшем 
    const indicators = document.createElement('ol'),
        dots = [];
    //Добавляем им стили
    indicators.classList.add('carousel-indicators');
    //Добавляем на страницу
    slider.append(indicators);
    //Создаём точку как элменет списка в зависимости от количества слайдов с дата атрибутом равным её порядковому номеру (в пользовательском представлении),
    //добавляем стили, выделяем стартовую точку, добавляем точку в  список точек и в массив для дальнейшей манипуляции
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    //Создаём обработчик событя, который при нажатии, если ширина отступа ровна колличеству слайдов (долистали в конец), сделает отступ равным 0(вернёт в начало),
    // инчае просто добавит к отступу ширину другого слайда (перелистнёт на следующий)
    next.addEventListener('click', () => {
        if (offset == widthConverter(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthConverter(width);
        }
        //Непосредственно сам механизм переключения, использующий значение отступа
        slidesField.style.transform = `translateX(-${offset}px)`;
        //Изменение номера текущего слайда
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        //Отображение номера текущего слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        //Затемнение всех точек навигации
        dots.forEach(dot => dot.style.opacity = '.5');
        //Выделение активной точки навигации
        dots[slideIndex - 1].style.opacity = 1;
    });

    //Создаем обработчик события для отлистывания назад, если отступ 0(находлимся в начале) то добавляет ширины всех слайдов (оказываемся в конце),
    //если нет, то просто отнимаем ширину одного слайда
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthConverter(width) * (slides.length - 1);
        } else {
            offset -= widthConverter(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        // Изменение номера текущего слайда
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        //Отображение номера текущего слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        //Затемнение всех точек навигации
        dots.forEach(dot => dot.style.opacity = '.5');
        //Выделение активной точки навигации
        dots[slideIndex - 1].style.opacity = 1;
    })
    //Создаем обработчик события для каждой точки в массиве
    dots.forEach(dot => dot.addEventListener('click', (e) => {
        //Получаем атрибут точки
        const slideTo = e.target.getAttribute('data-slide-to');
        //Делаем переключение сладйда по значению атрибута
        slideIndex = slideTo;
        offset = widthConverter(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        //Отображение текущего слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        //Затемнение всех точек навигации
        dots.forEach(dot => dot.style.opacity = '.5');
        //Выделение активной точки навигации
        dots[slideIndex - 1].style.opacity = 1;
    }))
    //END Слайдер v2

    //Калькулятор 

    const result = document.querySelector('.calculating__result span');
    let gender = 'female',
        height, weight, age, ratio = 1.375;

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if (gender === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                gender = e.target.getAttribute('id');
            }
            console.log(ratio, gender);
            elements.forEach(elem => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            calcTotal();
        }))
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;

            }
            calcTotal();
        })
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    //Калькулятор END




})