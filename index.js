const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const wmsRoutes = require("./routes/wmsRoutes");
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 300000000000 },
    cookie: { },
}));

app.use("/", wmsRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});