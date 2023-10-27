const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const tasksRoutes = require("./routes/tasksRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use("/", tasksRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});