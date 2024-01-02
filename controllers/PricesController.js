const Prices = require("../models/Prices");
const History = require("../models/History");

async function showPrices(req, res) {

    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let prices = await Prices.findAll({
        raw: true,
        order: [["id", "DESC"]],
    });

    const totalRegisteredPrices = prices.length;
    res.render("admin/prices/index", {
        prices,
        totalRegisteredPrices,
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
        cliente: (req.body.cliente).trim(),
        descricao: (req.body.descricao).trim(),
        valor: (req.body.valor).trim(),
        observacao: (req.body.observacao).trim(),
        categoria: (req.body.categoria).trim(),
    });

    await History.create({
        usuario: req.session.user.nome,
        acao: "Cadastrar preço",
        resumo: `"${(req.body.descricao).trim()}" com o valor por unidade de €${(Number(req.body.valor).toFixed(2)).trim()} e com a observação "${(req.body.observacao).trim()}"`,
        cliente: (req.body.cliente).trim(),
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
            cliente: (req.body.cliente).trim(),
            descricao: (req.body.descricao).trim(),
            valor: (req.body.valor).trim(),
            observacao: (req.body.observacao).trim(),
        },
        { where: { id: req.body.id } }
    );

    res.redirect("/admin/prices/index");
}

async function deletePrice(req, res) {
    req.session.mensagem = {
        texto: "Preço excluído com sucesso!",
    }
    
    const price = await Prices.findOne({
        where: { id: req.body.id },
    });

    await History.create({
        usuario: req.session.user.nome,
        acao: "Deletar preço",
        resumo: `"${(price.descricao).trim()}" com o valor por unidade de €${(Number(price.valor).toFixed(2)).trim()} e com a observação "${(price.observacao).trim()}"`,
        cliente: (req.body.cliente).trim(),
    });

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
