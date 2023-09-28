const express = require("express");

// Criando a aplicação Express.
const app = express();

// Configurando a porta usando variável de ambiente ou padrão 3000.
const PORT = process.env.PORT || 3000;

// Rota principal para renderizar a página inicial.
app.get("/", async (req, res) => {
    res.send("Olá, mundo!");
});

// Iniciando o servidor na porta especificada.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});
