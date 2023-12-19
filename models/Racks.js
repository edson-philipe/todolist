const DataTypes = require("sequelize");
const connection = require("../database/database");
const Racks = connection.define("racks", {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    predio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    andar: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ocupado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrato: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valorMensal: {
        type: DataTypes.FLOAT,
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
}, {
    timestamps: true,
});
//Racks.sync({force: true});
module.exports = Racks;