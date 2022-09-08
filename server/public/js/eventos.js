const imagem = require('../public/img/naoVerSenha.png');

const senha = document.querySelector('.senha');
const imagemAberta = document.querySelector('.imagemAberta');

imagemAberta.addEventListener('click', function () {
    if (senha.type === 'password') {
        senha.type = 'text';
        imagemAberta.src = 'naoVerSenha.png';
    } else {
        senha.type = 'password';
        imagemAberta.src = 'imagemAberta.png';
    }
});




