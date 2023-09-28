const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const connection = require("./database/database");
const Tarefa = require("./database/Tarefa");

connection.authenticate().then(() => {
    console.log('Conectado ao banco de dados!!');
}).catch((error) => {
    console.error(error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Tarefa.findAll(
        {
            raw: true, 
            order: [
                ['id', 'DESC']
            ]
        },
    ).then(tarefas => {
        res.render("index", {
            tarefas: tarefas,
        });
    });
});

app.get("/inserirtarefa", (req, res) => {
    res.render("inserirTarefa");
});

app.post("/salvarInsercaoTarefa", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    Tarefa.create({
        titulo: titulo,
        descricao: descricao,
        concluido: false,
    }).then(() => {
        res.redirect('/');
    });
});

app.post("/excluirTarefa", (req, res) => {
    const id = req.body.id;
    Tarefa.destroy({
        where: {
            id: id,
        }
    }).then(() => {
        res.redirect('/');
    });
});


app.listen(3000, () => {
    console.log("Servidor rodando!");
});