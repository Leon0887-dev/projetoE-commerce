// Verifica se o usuário está logado
const guestMiddleware = (req, res, next) => {
    const isAuth = req.cookies.user;
    // Se está não está autenticado vai para a próxima função
    if (!isAuth) {
      next();
    }else{
      res.redirect("/");
    }
  };
  
  module.exports = guestMiddleware;