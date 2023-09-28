// Importando as dependências necessárias......
const express = require("express");
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Tarefa = require("./database/Tarefa");

// Criando a aplicação Express.
const app = express();

// Configurando o middleware para parse de JSON e urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Configurando a porta usando variável de ambiente ou padrão 3000.
const PORT = process.env.PORT || 3000;

// Conectando ao banco de dados.
(async () => {
    try {
        await connection.authenticate();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error(error);
    }
})();

// Configurando o mecanismo de visualização EJS.
app.set('view engine', 'ejs');

// Rota principal para renderizar a página inicial.
app.get("/", async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll({
            order: [['id', 'DESC']],
        });
        res.render('index', { tarefas });
    } catch (error) {
        console.error(error);
    }
});

// Rota para adicionar tarefa.
app.get("/adicionar-tarefa", (req, res) => {
    res.render('adicionartarefa');
});

// Rota para salvar tarefa.
app.post("/adicionar-tarefa", async (req, res) => {
    try {
        const { titulo, descricao, concluido } = req.body;
        await Tarefa.create({ titulo, descricao, concluido });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

app.get("/deletar-tarefa/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tarefa = await Tarefa.findOne({
            where: { id }
        });
        res.render("deletartarefa", { tarefa });
    } catch (error) {
        console.error(error);
    }
});

// Rota para deletar tarefa.
app.post("/deletar-tarefa", async (req, res) => {
    try {
        const { id } = req.body;
        await Tarefa.destroy({ where: { id } });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

app.get("/editar-tarefa/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tarefa = await Tarefa.findOne({
            where: { id }
        });
        res.render("editartarefa", { tarefa });
    } catch (error) {
        console.error(error);
    }
});

// Rota para editar tarefa.
app.post("/editar-tarefa/", async (req, res) => {
    try {
        const { titulo, descricao, concluido, id } = req.body;
        await Tarefa.update(
            { titulo, descricao, concluido },
            { where: { id } }
        );
        res.redirect('/tarefa/' + id);
    } catch (error) {
        console.error(error);
    }
});

// Rota para exibir detalhes de uma tarefa.
app.get("/tarefa/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tarefa = await Tarefa.findOne({
            where: { id }
        });
        res.render("tarefa", { tarefa });
    } catch (error) {
        console.error(error);
    }
});

// Middleware para tratar erro 404.
app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

// Iniciando o servidor na porta especificada.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});
