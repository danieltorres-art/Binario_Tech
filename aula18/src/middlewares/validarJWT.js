const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  // Captura o header de autorização
  const authHeader = req.headers['authorization'];
  
  // O token geralmente vem no formato "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(' ')[1];

  // Se o token for omitido / não enviado -> Retorna HTTP 401
  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Valida o token com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'binario_tech_chave_oficial_exame_2026');
    
    // Anexa os dados decodificados do usuário na requisição
    req.user = decoded;
    next();
  } catch (error) {
    // Se o token for inválido ou expirado -> Retorna HTTP 403
    return res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
};

module.exports = validarJWT;
