const Prices = require("../models/Prices");

async function showPrices(req, res) {
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let prices = await Prices.findAll({
        raw: true,
        order: [["id", "DESC"]],
    });
    const totalPrecosCadastrados = prices.length;
    res.render("admin/prices/index", {
        prices,
        hierarquia,
        theme,
        totalPrecosCadastrados,
    });
}

async function createPrices(req, res) {
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    res.render("admin/prices/new", {
        mensagem,
        hierarquia,
        theme,
    });
}

async function savePrices(req, res) {
    await Prices.create({
        cliente: req.body.cliente,
        descricao: req.body.descricao,
        valor: req.body.valor,
        observacao: req.body.observacao,
    });
    req.session.mensagem = {
        texto: "O contrato foi criado com sucesso!",
    }
    res.redirect('/admin/prices/new');
}

async function deletePrice(req, res) {
    await Prices.destroy({
      where: { id: req.body.id },
    });
    res.redirect("/admin/prices/index");
  }

module.exports = {
    showPrices,
    createPrices,
    savePrices,
    deletePrice,
};
