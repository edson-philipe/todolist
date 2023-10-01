const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const connection = require("./database/database");
const Tarefa = require("./database/Tarefa");

connection.authenticate().then(() => {
    console.log('Conectado ao banco de dados!');
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

app.get("/tarefa/:id", (req, res) => {
    const id = req.params.id;
    Tarefa.findOne({
        where: {
            id : id
        }
    }).then(tarefa => {
        res.render("tarefa", {
            tarefa: tarefa,
        });
    })
});

app.get("/inserirtarefa", (req, res) => {
    res.render("inserirTarefa");
});

app.post("/inserirtarefa", (req, res) => {
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

app.get("/excluirtarefa/:id", (req, res) => {
    const id = req.params.id;
    Tarefa.findOne({
        where: {
            id : id
        }
    }).then(tarefa => {
        res.render("excluirTarefa", {
            tarefa: tarefa,
        });
    })
});

app.post("/excluirtarefa", (req, res) => {
    const id = req.body.id;
    Tarefa.destroy({
        where: {
            id: id,
        }
    }).then(() => {
        res.redirect('/');
    });
});

app.get("/editartarefa/:id", (req, res) => {
    const id = req.params.id;
    Tarefa.findOne({
        where: {
            id : id
        }
    }).then(tarefa => {
        res.render("editarTarefa", {
            tarefa: tarefa,
        });
    })
});

app.post("/editartarefa", (req, res) => {
    const id = req.body.id;
    const titulo = req.body.titulo; 
    const descricao = req.body.descricao; 
    Tarefa.update(
        {
            titulo: titulo,
            descricao: descricao,
            concluido: false,
        },
        {
            where: { id: id },
        }
    ).then(() => {
        res.redirect('/');
    });
});


app.listen(3000, () => {
    console.log("Servidor rodando!");
});