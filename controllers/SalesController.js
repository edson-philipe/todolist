const Sales = require("../models/Sales");
const Prices = require("../models/Prices");

async function showSales(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    const { datainicial, datafinal } = req.query;
    let sales = await Sales.findAll({
        raw: true,
        order: [["data", "ASC"]],
    });
    const totalVendasCadastrados = sales.length;
    sales = sales.filter((sale) => {
        if (datainicial && datafinal) {
            // Supondo que os campos de data no banco de dados estão em um formato que pode ser comparado diretamente com os parâmetros da consulta
            const dataMovimento = new Date(sale.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            // Supondo que dataMovimento esteja entre datainicial e datafinal, inclusive
            return dataMovimento >= new Date(datainicial) && dataMovimento <= new Date(datafinal);
        } else if (datainicial) {
            // Filtra apenas com base em datainicial se datafinal não for fornecido
            const dataMovimento = new Date(sale.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento >= new Date(datainicial);
        } else if (datafinal) {
            // Filtra apenas com base em datafinal se datainicial não for fornecido
            const dataMovimento = new Date(sale.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento <= new Date(datafinal);
        }
        return true; // Retorna verdadeiro para itens onde nenhum filtro de data é necessário
    });
    res.render("admin/sales/index", {
        sales,
        totalVendasCadastrados,
        datainicial,
        datafinal,
        mensagem,
        hierarquia,
        theme,
    });
}
async function createSale(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    const { cliente } = req.query;
    let prices = await Prices.findAll({
        where: { 
            categoria: "categoria2" 
        },
        raw: true,
        order: [["id", "DESC"]],
    });
    prices = prices.filter((price) => {
        if (cliente && cliente !== "Todos" && price.cliente.trim() !== cliente) {
            return false;
        }
        return true;
    });
    res.render("admin/sales/new", {
        prices,
        mensagem,
        hierarquia,
        theme,
    });
}
async function saveSale(req, res) {
    await Sales.create({
        data: req.body.data,
        cliente: req.body.cliente,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        total: req.body.total,
        funcionarioResponsavel: req.session.user.nome,
    });
    req.session.mensagem = {
        texto: "A venda foi criada com sucesso!",
    }
    res.redirect('/admin/sales/new');
}

async function editSale(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    const { cliente } = req.query;
    let prices = await Prices.findAll({
        raw: true,
        order: [["id", "DESC"]],
    });
    prices = prices.filter((price) => {
        if (cliente && cliente !== "Todos" && price.cliente.trim() !== cliente) {
            return false;
        }
        return true;
    });

    const sale = await Sales.findOne({
        where: { id: req.params.id },
    });
    res.render("admin/sales/edit", {
        sale,
        prices,
        mensagem,
        hierarquia,
        theme,
    });
}

async function updateSale(req, res) {
    req.session.mensagem = {
        texto: "Informações da venda alteradas com sucesso!",
    }
    await Sales.update(
        {
            data: req.body.data,
            cliente: req.body.cliente,
            descricao: req.body.descricao,
            quantidade: req.body.quantidade,
            valor: req.body.valor,
            total: req.body.total,
            funcionarioResponsavel: req.body.funcionarioResponsavel,
        },
        { where: { id: req.body.id } }
    );
    res.redirect("/admin/sales/index");
}

async function deleteSale(req, res) {
    req.session.mensagem = {
        texto: "Venda excluída com sucesso!",
    }
    await Sales.destroy({
        where: { id: req.body.id },
    });
    res.redirect("/admin/sales/index");
}
module.exports = {
    showSales,
    createSale,
    saveSale,
    editSale,
    updateSale,
    deleteSale,
};
