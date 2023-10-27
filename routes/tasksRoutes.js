// Importando o módulo express e criando um roteador
const express = require("express");
const router = express.Router();

const TasksController = require("../controllers/TasksController");

router.get("/", TasksController.showTasks);
router.get("/task/:id", TasksController.showTaskId);

router.get("/inserttask", TasksController.insertTask);
router.post("/inserttasksave", TasksController.insertTaskSave);

router.get("/deletetask/:id", TasksController.deleteTask);
router.post("/deletetaskconfirm", TasksController.deleteTaskConfirm);

router.get("/edittask/:id", TasksController.editTask);
router.post("/edittaskconfirm", TasksController.editTaskConfirm);

router.post("/completedtask", TasksController.completedTaskId);

module.exports = router;