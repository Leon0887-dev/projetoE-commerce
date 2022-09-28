const {check} = require('express-validator');

const adminUserValidator = [
  check('first_name').notEmpty().withMessage('Insira o nome do usuário'),
  check('last_name').notEmpty().withMessage('Insira a sobrenome do usuário'),
  check('email').notEmpty().withMessage('Insira o e-mail do usuário'),
  check('password').notEmpty().withMessage('Insira a senha do usuário'),
  check('confirm_password').notEmpty().withMessage('Insira a confirmação de senha do usuário'),
]

module.exports = adminUserValidator;