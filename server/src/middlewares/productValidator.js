const {check} = require('express-validator');

const productValidator = [
  check('title').notEmpty().withMessage('Insira o nome do produto'),
  check('brand').notEmpty().withMessage('Insira a marca do produto'),
  check('flavor').notEmpty().withMessage('Insira o sabor do produto'),
  check('roast').notEmpty().withMessage('Insira o tipo de torra do produto'),
  check('description').notEmpty().withMessage('Insira a descrição do produto'),
  check('content').notEmpty().withMessage('Insira o conteúdo da embalagem do produto'),
  check('format').notEmpty().withMessage('Insira o formato do produto'),
  check('price').notEmpty().withMessage('Insira o preço do produto'),
  check('installment').notEmpty().withMessage('Insira o número de parcelas do produto'),
  check('sku').notEmpty().withMessage('Insira o código do produto'),
  check('quantity').notEmpty().withMessage('Insira a quantidade de itens em estoque do produto'),
  check('category').notEmpty().withMessage('Insira a categoria do produto'),
  check('active').notEmpty().withMessage('Insira o status do produto'),
]

module.exports = productValidator;