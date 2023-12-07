const Prices = require("../models/Prices");

async function showPrices(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let prices = await Prices.findAll({
        raw: true,
        order: [["id", "DESC"]],
    });
    const totalPrecosCadastrados = prices.length;
    res.render("admin/prices/index", {
        prices,
        totalPrecosCadastrados,
        mensagem,
        hierarquia,
        theme,
    });
}

async function createPrice(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    res.render("admin/prices/new", {
        mensagem,
        hierarquia,
        theme,
    });
}

async function savePrice(req, res) {
    await Prices.create({
        cliente: req.body.cliente,
        descricao: req.body.descricao,
        valor: req.body.valor,
        observacao: req.body.observacao,
    });
    req.session.mensagem = {
        texto: "O preço foi cadastrado com sucesso!",
    }
    res.redirect('/admin/prices/new');
}

async function editPrice(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    const price = await Prices.findOne({
        where: { id: req.params.id },
    });
    res.render("admin/prices/edit", {
        price,
        mensagem,
        hierarquia,
        theme,
    });
}

async function updatePrice(req, res) {
    req.session.mensagem = {
        texto: "Informações do preço alteradas com sucesso!",
    }
    await Prices.update(
        {
            cliente: req.body.cliente,
            descricao: req.body.descricao,
            valor: req.body.valor,
            observacao: req.body.observacao,
        },
        { where: { id: req.body.id } }
    );
    res.redirect("/admin/prices/index");
}

async function deletePrice(req, res) {
    req.session.mensagem = {
        texto: "Preço excluído com sucesso!",
    }
    await Prices.destroy({
        where: { id: req.body.id },
    });
    res.redirect("/admin/prices/index");
}

module.exports = {
    showPrices,
    createPrice,
    savePrice,
    editPrice,
    updatePrice,
    deletePrice,
};
