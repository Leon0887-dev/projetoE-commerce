const fs = require('fs');
const path = require('path');
const productsJson = path.join("database","products.json");

const productController = {
    index: (req,res)=>{
        return res.render("productListing",{title:"Produtos"});
    },
    show: (req,res)=>{

        //Pegando o id que virá via url - GET
        const {id} = req.params;

        // Lendo arquivo json
        let products = fs.readFileSync(productsJson,{enconding:'utf-8'})
        // Transformando o formato JSON em um array novamente
        products=JSON.parse(products);

        //Verificando se o id existe
        const productResult = products.find((product)=>product.id===parseInt(id));
        // Se não existir, renderiza a view error mostrando a mensagem 
        if(!productResult){
            return res.render("error",{
                title:"Ops!",
                message:"Produto não encontrado."
            });
        };
        // Caso contrário, copiamos as informações de productResult usando spread operator para a variável product
        const product = {
            ...productResult,
        };

        // Por fim, retorno a view passando as informações do produto
        return res.render("product",{
            title:"Detalhe do Produto",
            product,
        });
    },
};

module.exports = productController;