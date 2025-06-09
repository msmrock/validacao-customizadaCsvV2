const csvReader = require("../utils/csvReader");

exports.validarCracha = async (dados) => {
  const autorizados = await csvReader.lerCSV("data/autorizados.csv");
  const autorizado = autorizados.find(
    (pessoa) => pessoa.cardNumber === String(dados.cardNumber)
  );

  if (!autorizado) {
    return {
      authorized: false,
      message: "Acesso negado: crachá não autorizado.",
    };
  }

  return {
    authorized: true,
    message: "Acesso autorizado.",
    data: autorizado,
  };
};
