const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Exportação da Questão 1
exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!senha || senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres.' });
    }
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const novoUsuario = await User.create({ email, senha: senhaHash });
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: novoUsuario._id });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

// Exportação da Questão 2
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'secreta_padrao',
      { expiresIn: '30m' }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};
