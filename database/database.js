const Sequelize = require("sequelize");
const connection = new Sequelize(
 'todolist',
 'root',
 '157123',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = connection;