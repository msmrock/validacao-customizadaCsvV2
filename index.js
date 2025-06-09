const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const winston = require("winston");
//const { carregarCrachaLiberado } = require("./utils/leituraCSV");

const validacaoRoutes = require("./routes/validacaoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

/*/ Logger configurado
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [new winston.transports.File({ filename: "logs/acessos.log" })],
});

// Garante que pasta "logs" existe
if (!fs.existsSync("logs")) fs.mkdirSync("logs");

app.post("/validacao-customizada", async (req, res) => {
  const { cardNumber, deviceId, name, accessDirection } = req.body;

  try {
    const autorizados = await carregarCrachaLiberado();

    const autorizado = autorizados.find(
      (item) => item.cardNumber === String(cardNumber)
    );

    let status, motivo;

    if (!autorizado) {
      status = "NEGADO";
      motivo = "Crachá não autorizado";
    } else if (parseInt(deviceId) === 25) {
      status = "NEGADO";
      motivo = "Equipamento bloqueado";
    } else {
      status = "LIBERADO";
      motivo = "Acesso autorizado";
    }

    logger.info(`${status} - ${name} (${cardNumber}) - ${motivo}`);

    if (status === "LIBERADO") return res.sendStatus(200);
    return res.status(403).send(motivo);
  } catch (error) {
    logger.error(`Erro interno para ${cardNumber} - ${error.message}`);
    return res.status(500).send("Erro interno na validação");
  }
});
//FIM "logs"*/

app.get("/health", (req, res) => res.send("API rodando com sucesso!"));
app.use("/validacao-customizadaCsv", validacaoRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
