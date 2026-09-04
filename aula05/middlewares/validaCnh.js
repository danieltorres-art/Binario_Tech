function validaCnh(req, res, next) {
    const { cnh } = req.body;

    // Expressão regular para verificar exatamente 11 dígitos numéricos
    const cnhValida = /^\d{11}$/.test(cnh);

    if (!cnh || !cnhValida) {
        return res.status(400).json({
            erro: "CNH invalida. A CNH deve conter exatamente 11 digitos numericos."
        });
    }

    next();
}

module.exports = validaCnh;
