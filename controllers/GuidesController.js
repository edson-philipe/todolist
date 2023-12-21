const Guides = require("../models/Guides");
const Racks = require("../models/Racks");
const Prices = require("../models/Prices");
const Billings = require("../models/Billings");

async function showGuides(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let guides = await Guides.findAll({
        raw: true,
        order: [["data", "ASC"]],
    });
    const totalGuiasCadastradas = guides.length;
    res.render("admin/guides/index", {
        guides,
        totalGuiasCadastradas,
        mensagem,
        hierarquia,
        theme,
    });
}

async function enterGuide(req, res) {
    let mensagem = req.session.mensagem || "";
    req.session.mensagem = null;
    let hierarquia = req.session.user.hierarquia || "";
    let theme = req.session.user.informacao1;

    let racks = await Racks.findAll({
        where: {
            ocupado: 'false'
        },
        raw: true,
        order: [
            ["predio", "ASC"],
            ["numero", "ASC"]
        ],
    });
    let totalRacksDisponiveis = racks.length;
    let prices = await Prices.findAll({
        where: {
            categoria: "categoria1"
        },
        raw: true,
        order: [["id", "DESC"]],
    });

    res.render("admin/guides/enter", {
        racks,
        totalRacksDisponiveis,
        prices,
        mensagem,
        hierarquia,
        theme,
    });
}

async function saveEnterGuide(req, res) {
    // Extrai informações do corpo da requisição
    const { tipo, totalPaletes, expedidor, destinatario, matricula, data, horaEntrada, horaSaida } = req.body;

    // Arrays para armazenar informações
    const referencias = [];
    const posicionamentos = [];
    const contratos = [];
    const valores = [];

    // Preenche arrays com informações do req.body
    for (let i = 0; i < totalPaletes; i++) {
        referencias.push(req.body[`referencia${i}`]);
        posicionamentos.push(req.body[`posicionamento${i}`]);

        // Divide a informação de contrato em contrato e valor
        let contratoValorConcatenado = req.body[`contrato${i}`].split(';');
        contratos.push(contratoValorConcatenado[0].trim());
        valores.push(contratoValorConcatenado[1].trim());

        // Separa o texto do número no posicionamento
        let posicionamentosSeparado = posicionamentos[i].match(/^(.*[^\d])(\d+)$/).slice(1);
        let predioSeparado = posicionamentosSeparado[0];
        let numeroSeparado = posicionamentosSeparado[1];

        // Atualiza informações no banco de dados usando Racks
        let racks = await Racks.update(
            {
                cliente: expedidor,
                descricao: referencias[i],
                ocupado: "true",
                contrato: contratoValorConcatenado[0].trim(),
                valorMensal: contratoValorConcatenado[1].trim(),
            },
            { where: { predio: predioSeparado, numero: numeroSeparado } }
        );
    }

    // Converte arrays em strings JSON
    const referenciasString = JSON.stringify(referencias);
    const posicionamentosString = JSON.stringify(posicionamentos);
    const contratosString = JSON.stringify(contratos);
    const valoresString = JSON.stringify(valores);

    // Conta a quantidade de contratos e atualiza informações de preço
    const contratosArray = JSON.parse(contratosString);
    const count = {};

    contratosArray.forEach(contrato => {
        if (count[contrato]) {
            count[contrato] += 1;
        } else {
            count[contrato] = 1;
        }
    });

    let dataMilissegundos = new Date(req.body.data);
    dataMilissegundos.setHours(0, 0, 0, 0);
    dataMilissegundos = dataMilissegundos.getTime();

    for (const contrato in count) {
        let price = await Prices.findOne({
            where: {
                cliente: expedidor,
                descricao: contrato,
            },
            raw: true,
        });

        await Billings.create({
            tipo: tipo,
            cliente: expedidor,
            descricao: contrato,
            total: count[contrato],
            data: dataMilissegundos,
            valor: price.valor,
        });
    }

    await Guides.create({
        tipo,
        totalPaletes,
        expedidor,
        destinatario,
        matricula,
        data,
        horaEntrada,
        horaSaida,
        mercadorias: `[${referenciasString},${posicionamentosString},${contratosString},${valoresString}]`,
        responsavel: req.session.user.nome,
    });

    // Define uma mensagem de sucesso e redireciona para uma rota específica
    req.session.mensagem = {
        texto: "A guia de entrada foi criada com sucesso!",
    };
    res.redirect('/admin/guides/new/enter');
}


async function deleteGuide(req, res) {
    req.session.mensagem = {
        texto: "Movimentação excluída com sucesso!",
    }
    await Guides.destroy({
        where: { id: req.body.id },
    });
    res.redirect("/admin/guides/index");
}


module.exports = {
    showGuides,
    enterGuide,
    saveEnterGuide,
    deleteGuide,
};
