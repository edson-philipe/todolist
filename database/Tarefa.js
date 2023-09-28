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
}, {
    timestamps: false, // Isso desativará a criação automática de createdAt e updatedAt
});


module.exports = Tarefa;