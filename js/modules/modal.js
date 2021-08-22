function modal() {

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

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ``;
    }
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })
}

export default modal;