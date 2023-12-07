const DataTypes = require("sequelize");
const connection = require("../database/database");

const Movements = connection.define("movements", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expedidor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destinatario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaEntradaSaida: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    consumiveis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacoesMercadoria: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    saldosAnterior: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    saldosPosterior: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    conferente: {
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

Movements.sync({force: true});

module.exports = Movements;