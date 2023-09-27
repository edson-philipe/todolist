// Importando o Sequelize e a conexão com o banco de dados.
const Sequelize = require("sequelize");
const connection = require("./database");

// Definindo o modelo da tabela de tarefas.
const Tarefa = connection.define("tarefas", {
    titulo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    descricao: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    concluido: { 
        type: Sequelize.DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false, // Definindo um valor padrão (neste caso, inicializado como falso).
        validate: {
            notEmpty: true,
        },
    },
});

// Sincronizando o modelo com o banco de dados (comentar essa linha após a criação da tabela).
//Tarefa.sync({force: true});

// Exportando o modelo para ser utilizado em outras partes da aplicação.
module.exports = Tarefa;
