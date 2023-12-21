const DataTypes = require("sequelize");
const connection = require("../database/database");

const Billings = connection.define("billings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Adicione esta linha para configurar o autoincremento
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
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

//Billings.sync({ force: true });

module.exports = Billings;