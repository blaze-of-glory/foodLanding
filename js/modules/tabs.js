function tabs() {
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
}

export default tabs;