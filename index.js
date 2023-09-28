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
    console.error('Erro ao conectar ao banco de dados:', error);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send("Olá, mundo! v0.5");
});

app.get("/test", async (req, res) => {
    res.send("Roda de test!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Encerre o aplicativo ou tome outras medidas apropriadas
});
