const validacaoService = require("../services/validacaoService");

// Função de log personalizada
function logInfo(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.log(`[${timestamp}] [INFO] ${message}`);
}

exports.validarCracha = async (req, res, next) => {
  const { cardNumber, name } = req.body;

  try {
    const resultado = await validacaoService.validarCracha(req.body);

    if (resultado.authorized) {
      logInfo(`ACESSO LIBERADO para ${name || 'desconhecido'} (${cardNumber})`);
return res.status(200).json({
  message: "Acesso liberado",
  cardNumber: cardNumber,
  name: name || 'desconhecido'
});
    } else {
      logInfo(`ACESSO NEGADO para ${name || 'desconhecido'} (${cardNumber})`);
      return res.status(403).json({ message: "Acesso negado: crachá não autorizado" });
    }
  } catch (error) {
    logInfo(`ERRO INTERNO para ${cardNumber} - ${error.message}`);
    return res.status(500).json({ message: "Erro interno na validação" });
  }
};
