const { Sequelize, DataTypes } = require("sequelize");
const connection = require("./database");

const Tarefa = connection.define("tarefas", {
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
    },
});

module.exports = Tarefa;