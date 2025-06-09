const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Lê um arquivo CSV e retorna um array de objetos.
 * @param {string} caminhoRelativo - Caminho relativo do arquivo CSV (ex: "data/autorizados.csv")
 * @returns {Promise<Array<Object>>} - Promise com os dados do CSV como array de objetos
 */
exports.lerCSV = (caminhoRelativo) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const caminhoAbsoluto = path.resolve(__dirname, '..', caminhoRelativo);

    fs.createReadStream(caminhoAbsoluto)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const timestamp = new Date().toLocaleString('pt-BR');
        console.log(`[${timestamp}] CSV lido com sucesso: ${caminhoRelativo} (${results.length} registros)`);
        resolve(results);
      })
      .on('error', (err) => {
        const timestamp = new Date().toLocaleString('pt-BR');
        console.error(`[${timestamp}] Erro ao ler CSV: ${err.message}`);
        reject(err);
      });
  });
};
