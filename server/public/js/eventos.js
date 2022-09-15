const senha = document.querySelector('.senha');
const imagemAberta = document.querySelector('.imagemAberta');

imagemAberta.addEventListener('click', function () {
    if (senha.type === 'password') {
        senha.type = 'text';
        imagemAberta.src = '/img/aberto.svg';
    } else {
        senha.type = 'password';
        imagemAberta.src = '/img/fechado.svg';
    }
});




