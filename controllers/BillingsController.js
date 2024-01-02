const Billings = require("../models/Billings");

async function showBillings(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;
    const { datainicial, datafinal } = req.query;
    let billings = await Billings.findAll({
        raw: true,
        order: [["data", "ASC"]],
    });
    // const diasSelecionados = (new Date(datafinal).getDate() - new Date(datainicial).getDate()) + 1;
    const diasSelecionados = ((new Date(datafinal) - new Date(datainicial)) / (1000 * 60 * 60 * 24)) + 1;
    let obterDiasDoMes = new Date(datainicial).getMonth();
    switch (obterDiasDoMes) {
        case 0: // Janeiro
        case 2: // Março
        case 4: // Maio
        case 6: // Julho
        case 7: // Agosto
        case 9: // Outubro
        case 11: // Dezembro
            obterDiasDoMes = 31;
            break;
        case 3: // Abril
        case 5: // Junho
        case 8: // Setembro
        case 10: // Novembro
            obterDiasDoMes = 30;
            break;
        case 1: // Fevereiro
            obterDiasDoMes = 28;
            break;
    }
    const totalFaturacoesCadastradas = billings.length;
    billings = billings.filter((billings) => {
        if (datainicial && datafinal) {
            // Supondo que os campos de data no banco de dados estão em um formato que pode ser comparado diretamente com os parâmetros da consulta
            const dataMovimento = new Date(billings.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            // Supondo que dataMovimento esteja entre datainicial e datafinal, inclusive
            return dataMovimento >= new Date(datainicial) && dataMovimento <= new Date(datafinal);
        } else if (datainicial) {
            // Filtra apenas com base em datainicial se datafinal não for fornecido
            const dataMovimento = new Date(billings.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento >= new Date(datainicial);
        } else if (datafinal) {
            // Filtra apenas com base em datafinal se datainicial não for fornecido
            const dataMovimento = new Date(billings.data); // Substitua 'data' pelo campo real que contém a data nos 'movimentos'
            return dataMovimento <= new Date(datafinal);
        }
        return true; // Retorna verdadeiro para itens onde nenhum filtro de data é necessário
    });
    const separatedByDescription = {};

    billings.forEach((billing) => {
        const { descricao } = billing;
        if (!separatedByDescription[descricao]) {
            separatedByDescription[descricao] = []; // Inicializa um array vazio se a descrição ainda não existe como chave
        }
        separatedByDescription[descricao].push(billing); // Adiciona a fatura ao array correspondente à descrição
    });

    // Função para criar uma fatura padrão
    function criarFaturaPadrao(descricao, data, valor) {
        return {
            tipo: 'Sem movimentação',
            cliente: 'LQS',
            descricao: descricao,
            total: 0,
            saldo: 0,
            data: data,
            valor: valor,
        };
    }

    // Preenche lacunas de datas ausentes com faturas padrão
    for (const descricao in separatedByDescription) {
        const faturas = separatedByDescription[descricao];
        const datasFatura = faturas.map((fatura) => fatura.data);

        let dataAtual = new Date(datainicial);
        const dataLimite = new Date(datafinal);

        while (dataAtual <= dataLimite) {
            const dataString = dataAtual.toISOString().split('T')[0];

            if (!datasFatura.includes(dataString)) {
                const faturaPadrao = criarFaturaPadrao(descricao, dataString, faturas[0].valor);
                separatedByDescription[descricao].push(faturaPadrao);
            }

            dataAtual.setDate(dataAtual.getDate() + 1);
        }
    }

    // Função para comparar datas
    function compareDates(a, b) {
        return new Date(a.data) - new Date(b.data);
    }

    // Ordenar as faturas por data dentro de cada descrição
    for (const descricao in separatedByDescription) {
        separatedByDescription[descricao].sort(compareDates);
    }

    for (const item in separatedByDescription) {
        const movimentacoes = separatedByDescription[item];
        let saldo = 0;
        for (let i = 0; i < movimentacoes.length; i++) {
            if (movimentacoes[i].saldo > saldo) {
                saldo = movimentacoes[i].saldo;
            } else if (movimentacoes[i].saldo == 0 && saldo > 0) {
                movimentacoes[i].saldo = saldo;
            }
        }
    }

    res.render("admin/billings/index", {
        billings,
        separatedByDescription,
        totalFaturacoesCadastradas,
        datainicial,
        datafinal,
        diasSelecionados,
        obterDiasDoMes,
        mensagem,
        hierarquia,
        theme,
    });
}


module.exports = {
    showBillings,
};
