
const fs = require('fs');
const csv = require('csv-parser');

exports.lerCSV = (caminho) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(caminho)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};
