const express = require("express");
const router = express.Router();
const validacaoController = require("../controllers/validacaoController");

// Função de log personalizada com timestamp
function logInfo(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.log(`[${timestamp}] [INFO] ${message}`);
}

// Rota de validação
router.post("/", (req, res, next) => {
  logInfo("Rota POST /validacao-customizadaCsv acionada");
  validacaoController.validarCracha(req, res, next);
});

module.exports = router;

