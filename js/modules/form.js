function form() {

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
}

export default form;