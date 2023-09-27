// Importando o Sequelize
const Sequelize = require("sequelize");

// Criando uma nova conexão com o banco de dados
const connection = new Sequelize('tarefas', 'root', '157123', {
    host: 'localhost',
    dialect: 'mysql'
});

// Exportando a conexão para ser utilizada em outros arquivos
module.exports = connection;
