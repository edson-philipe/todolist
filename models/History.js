const DataTypes = require("sequelize");
const connection = require("../database/database");

const Historys = connection.define("historys", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Adicione esta linha para configurar o autoincremento
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    informacao1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    informacao2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    informacao3: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    informacao4: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    informacao5: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

//Historys.sync({force: true});

module.exports = Historys;