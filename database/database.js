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

connection.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = connection;
