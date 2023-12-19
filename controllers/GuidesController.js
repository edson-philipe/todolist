const Guides = require("../models/Guides");
const Racks = require("../models/Racks");
const Prices = require("../models/Prices");

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
    const { tipo, totalPaletes, expedidor, destinatario, matricula, data, horaEntrada, horaSaida } = req.body;
    const referencias = [];
    const posicionamentos = [];
    const contratos = [];
    const valores = [];

    // Preencha referencias e posicionamentos a partir do req.body
    for (let i = 0; i < totalPaletes; i++) {
        referencias.push(req.body[`referencia${i}`]);
        posicionamentos.push(req.body[`posicionamento${i}`]);
        let contratoValorConcatenado = (req.body[`contrato${i}`]).split(';');
        contratos.push(contratoValorConcatenado[0].trim());
        valores.push(contratoValorConcatenado[1].trim());

        let posicionamentosSeparado = posicionamentos[i].match(/^(.*[^\d])(\d+)$/).slice(1); // Separando texto e número

        let predioSeparado = posicionamentosSeparado[0]; // String contendo o texto
        let numeroSeparado = posicionamentosSeparado[1]; // String contendo o número
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

    // Converta os arrays em strings JSON
    const referenciasString = JSON.stringify(referencias);
    const posicionamentosString = JSON.stringify(posicionamentos);
    const contratosString = JSON.stringify(contratos);
    const valoresString = JSON.stringify(valores);

    // Crie um novo guia com os dados formatados corretamente
    await Guides.create({
        tipo,
        totalPaletes,
        expedidor,
        destinatario,
        matricula,
        data,
        horaEntrada,
        horaSaida,
        mercadorias: `${referenciasString};${posicionamentosString};${contratosString};${valoresString}`,
        responsavel: req.session.user.nome,
    });
    req.session.mensagem = {
        texto: "A guia de entrada foi criada com sucesso!",
    };
    res.redirect('/admin/guides/new/enter');
}

module.exports = {
    showGuides,
    enterGuide,
    saveEnterGuide,
};
