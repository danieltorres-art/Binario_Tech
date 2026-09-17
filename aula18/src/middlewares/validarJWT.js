const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Se o token for omitido -> Retorna HTTP 401
  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'binario_tech_chave_oficial_exame_2026';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    // Se o token for inválido -> Retorna HTTP 403
    return res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
};

module.exports = validarJWT;
