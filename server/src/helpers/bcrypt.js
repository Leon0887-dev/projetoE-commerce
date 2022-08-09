const { compareSync, hashSync } = require("bcrypt");

const bcrypt = {
  // Receber string e aplica algoritmo de criptografia na string
  // Algoritomo de criptografia pode ser aplicado diversas vezes
  // O segundo parametro que irá definir quantas vezes será aplicado
  // Quanto mais vezes rodar maior será a hash
  generateHash: (text) => {
    return hashSync(text, 10);
  },
  // Receber string e um hash
  // Vai passar a string, aplicar o algoritmo de criptografia e comparar com o hash
  // Se forem iguais retorna true, se não retorna false
  compareHash: (text, hashed) => {
    return compareSync(text, hashed);
  },
};

module.exports = bcrypt;
