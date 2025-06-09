
const express = require('express');
const router = express.Router();
const validacaoController = require('../controllers/validacaoController');

router.post('/', validacaoController.validarCracha);

module.exports = router;
