const DataTypes = require("sequelize");
const connection = require("../database/database");

const Sales = connection.define("sales", {
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    funcionarioResponsavel: {
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

// Sales.sync({ force: true });

module.exports = Sales;