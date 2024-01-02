const Historys = require("../models/History");

async function showHistorys(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    const { datainicial, datafinal } = req.query;
    let historys = await Historys.findAll({
        raw: true,
        order: [["createdAt", "ASC"]],
    });
    const totalHistorysCadastrados = historys.length;
    historys = historys.filter((history) => {
        if (datainicial && datafinal) {
            // Supondo que os campos de data no banco de dados estão em um formato que pode ser comparado diretamente com os parâmetros da consulta
            const dataMovimento = new Date(history.createdAt); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            // Supondo que dataMovimento esteja entre datainicial e datafinal, inclusive
            return dataMovimento >= new Date(datainicial) && dataMovimento <= new Date(datafinal);
        } else if (datainicial) {
            // Filtra apenas com base em datainicial se datafinal não for fornecido
            const dataMovimento = new Date(history.createdAt); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento >= new Date(datainicial);
        } else if (datafinal) {
            // Filtra apenas com base em datafinal se datainicial não for fornecido
            const dataMovimento = new Date(history.createdAt); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento <= new Date(datafinal);
        }
        return true; // Retorna verdadeiro para itens onde nenhum filtro de data é necessário
    });
    res.render("admin/historys/index", {
        historys,
        totalHistorysCadastrados,
        datainicial,
        datafinal,
        mensagem,
        hierarquia,
        theme,
    });
}

module.exports = {
    showHistorys,
};
