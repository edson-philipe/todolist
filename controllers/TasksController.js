const Task = require("../models/Task");

async function showTasks(req, res) {
    const tarefas = await Task.findAll({
        raw: true,
        order: [['id', 'DESC']]
    });
    res.render("index", { tarefas });
}

async function showTaskId(req, res) {
    const tarefa = await Task.findOne({
        where: { id: req.params.id }
    });
    res.render("task", { tarefa });
}

async function insertTask(req, res) {
    res.render("insertTask");
}

async function insertTaskSave(req, res) {
    await Task.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        concluido: false,
    });
    res.redirect('/');
}

async function deleteTask(req, res) {
    const tarefa = await Task.findOne({
        where: { id: req.params.id }
    });
    res.render("deleteTask", { tarefa });
}

async function deleteTaskConfirm(req, res) {
    await Task.destroy({
        where: { id: req.body.id }
    });
    res.redirect('/');
}

async function editTask(req, res) {
    const tarefa = await Task.findOne({
        where: { id: req.params.id }
    });
    res.render("editTask", { tarefa });
}

async function editTaskConfirm(req, res) {
    await Task.update(
        {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            concluido: req.body.concluido,
        },
        { where: { id: req.body.id } }
    );
    res.redirect('/task/' + req.body.id);
}

async function completedTaskId(req, res) {
    let concluido;
    if (req.body.concluido == "0") {
        concluido = 1;
    } else {
        concluido = 0;
    }
    await Task.update(
        {
            concluido: concluido,
        },
        { where: { id: req.body.id } }
    );
    res.redirect('/#secao' + req.body.id);
}

module.exports = {
    showTasks,
    showTaskId,
    insertTask,
    insertTaskSave,
    deleteTask,
    deleteTaskConfirm,
    editTask,
    editTaskConfirm,
    completedTaskId
};
