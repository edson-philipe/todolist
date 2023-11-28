const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const wmsRoutes = require("./routes/wmsRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use("/", wmsRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});