function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    // Слайдер v2
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(container);
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
}

export default slider;