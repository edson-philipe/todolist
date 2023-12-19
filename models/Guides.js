const DataTypes = require("sequelize");
const connection = require("../database/database");

const Guides = connection.define("guides", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalPaletes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    expedidor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    destinatario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaEntrada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaSaida: {
        type: DataTypes.TIME,
        allowNull: false
    },
    mercadorias: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: true,
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

//Guides.sync({ force: true });

module.exports = Guides;