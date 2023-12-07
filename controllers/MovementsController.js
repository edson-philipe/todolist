const Movements = require("../models/Movements");
const Prices = require("../models/Prices");

async function createEnterMovement(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let prices = await Prices.findAll({
        raw: true,
        order: [["id", "DESC"]],
    });
    res.render("admin/movements/enter", {
        prices,
        mensagem,
        hierarquia,
        theme,
    });
}

async function saveEnterMovement(req, res) {

}

module.exports = {
    createEnterMovement,
    saveEnterMovement,
};
