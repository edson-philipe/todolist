const DataTypes = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hierarquia: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//User.sync({force: true});

module.exports = User;