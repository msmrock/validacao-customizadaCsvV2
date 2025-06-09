// Middleware de tratamento de erros globais

module.exports = (err, req, res, next) => {
  const timestamp = new Date().toLocaleString("pt-BR");
  
  // Log detalhado no console
  console.error(`[${timestamp}] [ERROR] Erro interno:`, err);

  // Resposta genérica para o cliente
  res.status(500).json({ error: "Erro interno no servidor" });
};
