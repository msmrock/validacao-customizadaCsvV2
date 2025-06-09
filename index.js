const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const validacaoRoutes = require("./routes/validacaoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Logs no console (ideal para Render)
app.use(morgan("dev"));

// Rota de saúde para monitoramento
app.get("/health", (req, res) => res.send("API rodando com sucesso!"));

// Rota principal de validação
app.use("/validacao-customizadaCsv", validacaoRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Início do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
