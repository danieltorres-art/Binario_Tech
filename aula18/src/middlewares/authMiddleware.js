const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ erro: 'Erro no formato do token.' });
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ erro: 'Token malformatado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secreta_padrao', (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    return next();
  });
};
