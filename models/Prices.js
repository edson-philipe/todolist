const DataTypes = require("sequelize");
const connection = require("../database/database");

const Prices = connection.define("prices", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Adicione esta linha para configurar o autoincremento
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    observacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
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

//Prices.sync({force: true});

module.exports = Prices;