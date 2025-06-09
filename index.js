const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const validacaoRoutes = require("./routes/validacaoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Função auxiliar para logs formatados
function logInfo(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.log(`[${timestamp}] [INFO] ${message}`);
}

function logError(message) {
  const timestamp = new Date().toLocaleString("pt-BR");
  console.error(`[${timestamp}] [ERROR] ${message}`);
}

// Middlewares globais
app.use(cors());
app.use(express.json());

// Logs no console (morgan para requisições HTTP)
app.use(morgan("dev"));

// Rota de saúde para monitoramento
app.get("/health", (req, res) => {
  logInfo("Rota de saúde chamada");
  res.send("API rodando com sucesso!");
});

// Rota principal de validação
app.use("/validacao-customizadaCsv", validacaoRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Início do servidor
app.listen(PORT, () => {
  logInfo(`Servidor rodando na porta ${PORT}`);
});
