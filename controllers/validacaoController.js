const validacaoService = require('../services/validacaoService');

exports.validarCracha = async (req, res, next) => {
  try {
    const resultado = await validacaoService.validarCracha(req.body);

    if (resultado.autorizado) {
      return res.status(200).json({ message: 'Acesso liberado' });
    } else {
      // Retorno diferente de 200 → acesso negado
      return res.status(403).json({ message: 'Acesso negado: crachá não autorizado' });
    }
  } catch (error) {
    // Qualquer erro também resulta em acesso negado
    return res.status(500).json({ message: 'Erro interno na validação' });
  }
};
