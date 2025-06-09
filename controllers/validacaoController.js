
const validacaoService = require('../services/validacaoService');

exports.validarCracha = async (req, res, next) => {
  try {
    const resultado = await validacaoService.validarCracha(req.body);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};
