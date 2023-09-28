const express = require("express");
const Sequelize = require("sequelize");

const connection = new Sequelize(
    'bd6vxflkis8r477dvxzt',
    'ugvggxef85iupzhw',
    'gnTp0oU8HWidecLlVYGB',
    {
        host: 'bd6vxflkis8r477dvxzt-mysql.services.clever-cloud.com',
        dialect: 'mysql'
    }
);

connection.authenticate().then(() => {
    console.log('Conectado ao banco de dados!');
}).catch((error) => {
    console.error(error);
});

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
