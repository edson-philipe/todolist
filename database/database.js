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

module.exports = connection;