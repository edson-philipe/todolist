const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const Task = connection.define("tarefa", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    concluido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: false,
});

module.exports = Task;
