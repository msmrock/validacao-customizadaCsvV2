const csvReader = require("../utils/csvReader");

// Funções de log com timestamp
function logInfo(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.log(`[${timestamp}] [INFO] ${message}`);
}

function logWarn(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.warn(`[${timestamp}] [WARN] ${message}`);
}

function logError(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.error(`[${timestamp}] [ERROR] ${message}`);
}

exports.validarCracha = async (dados) => {
  try {
    const autorizados = await csvReader.lerCSV("data/autorizados.csv");

    const autorizado = autorizados.find(
      (pessoa) => pessoa.cardNumber.trim() === String(dados.cardNumber).trim()
    );

    if (!autorizado) {
      logWarn(`Crachá ${dados.cardNumber} NÃO autorizado`);
      return {
        authorized: false,
        message: "Acesso negado: crachá não autorizado.",
      };
    }

    logInfo(`Crachá ${dados.cardNumber} autorizado para ${autorizado.name || 'Nome não informado'}`);
    return {
      authorized: true,
      message: "Acesso autorizado.",
      data: autorizado,
    };
  } catch (error) {
    logError(`Erro ao validar crachá ${dados.cardNumber}: ${error.message}`);
    throw new Error("Erro na validação do crachá");
  }
};
