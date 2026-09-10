const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    // req.usuario é injetado pelo middleware 'autenticarToken'
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        status: "ERRO",
        mensagem: "Acesso negado. Seu perfil não tem permissão para acessar este recurso."
      });
    }
    next();
  };
};

module.exports = autorizarPerfil;
