const User = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// QUESTÃO 1: Registro de Usuário
exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validação: senha deve ter no mínimo 6 caracteres
    if (!senha || senha.length < 6) {
      return res.status(400).json({ 
        erro: 'A senha deve ter no mínimo 6 caracteres.' 
      });
    }

    // Verificar se o usuário já existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    // Gerar Hash da senha com bcryptjs (salt 10)
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Salvar no banco de dados
    const novoUsuario = await User.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      id: novoUsuario._id
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

// QUESTÃO 2: Login de Usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário pelo email
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // Validar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // Gerar Token JWT contendo 'id' e 'email' com expiração de 30 minutos
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

// QUESTÃO 3: Rota protegida
exports.relatorio = async (req, res) => {
  return res.status(200).json({
    mensagem: 'Acesso autorizado ao relatório protegido!',
    usuario: req.user
  });
};
