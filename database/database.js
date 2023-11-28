const Sequelize = require("sequelize");

const connection = new Sequelize(
    'mydb1',
    'edsonphilipe',
    'Doris2008.',
    {
        host: 'mydb1.mysql.uhserver.com',
        dialect: 'mysql'
    }
);

connection.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

module.exports = connection;