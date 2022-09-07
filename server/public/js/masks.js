const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("keypress",()=>{

    //Contando os caracteres digitados
    let inputLength = cpfInput.value.length;
    
    //Quando a quantidade de caracteres for igual a 3 ou 7, adiciona ao valor do input o ponto
    //Quando for igual a 11, adiciona o traço
    if(inputLength===3 || inputLength===7){
        cpfInput.value += ".";
    }else if(inputLength===11){
        cpfInput.value += "-";
    };
});
