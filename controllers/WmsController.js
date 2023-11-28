const Racks = require("../models/Racks");

async function showHome(req, res) {
    res.render("index");
}

async function showRacks(req, res) {
    const racks = await Racks.findAll({
        raw: true,
        order: [['id', 'ASC']],
    });
    res.render("admin/racks/index", { racks });
}

async function registerNewRack(req, res) {
    const racks = await Racks.findAll({
        raw: true,
        order: [['id', 'ASC']],
    });

    const prediosNumerosConcatenados = racks.map(rack => `${rack.predio}${rack.numero}`);

    res.render("admin/racks/new", { prediosNumerosConcatenados });
}

async function saveNewRack(req, res) {
    await Racks.create({
        cliente: "Sem cliente",
        descricao: "Espaço vazio",
        predio: ((req.body.predio).trim()).toUpperCase(),
        numero: req.body.numero,
        andar: req.body.andar,
        ocupado: "false",
    });
    res.redirect('/admin/racks/index');
}

async function editRack(req, res) {
    const rack = await Racks.findOne({
        where: { id: req.params.id }
    });
    res.render("admin/racks/edit", { rack });
}

async function updateRack(req, res) {
    if (req.body.cliente == "Sem cliente") {
        await Racks.update(
            {
                cliente: req.body.cliente,
                descricao: "Espaço vazio",
                predio: req.body.predio,
                numero: req.body.numero,
                andar: req.body.andar,
                ocupado: "false",
            },
            { where: { id: req.body.id } }
        );
    } else {
        await Racks.update(
            {
                cliente: req.body.cliente,
                descricao: req.body.descricao,
                predio: req.body.predio,
                numero: req.body.numero,
                andar: req.body.andar,
                ocupado: "true",
            },
            { where: { id: req.body.id } }
        );
    }
    res.redirect("/admin/racks/index");
}

async function deleteRack(req, res) {
    await Racks.destroy({
        where: { id: req.body.id }
    });
    res.redirect('/admin/racks/index');
}

async function selectRacksInversion(req, res) {
    const racks = await Racks.findAll({
        raw: true,
        order: [['id', 'ASC']],
    });

    const prediosNumerosConcatenados = racks.map(rack => `${rack.predio}${rack.numero}`);

    const { predio1, numero1, predio2, numero2 } = req.query;

    // Busca pelo primeiro rack se predio1 e numero1 estiverem presentes
    let rack1 = null;
    if (predio1 && numero1) {
        rack1 = await Racks.findOne({
            where: { predio: predio1, numero: numero1 }
        });
    } else {
        rack1 = racks[0];
    }
    let rack2 = null;
    if (predio2 && numero2) {
        rack2 = await Racks.findOne({
            where: { predio: predio2, numero: numero2 }
        });
    } else {
        rack2 = racks[1];
    }       

    // Renderiza a página com os dados dos racks
    res.render("admin/racks/reverse", { prediosNumerosConcatenados, rack1, rack2 });
}

async function confirmRacksInversion(req, res) {
    await Racks.update(
        {
            cliente: req.body.cliente2,
            descricao: req.body.descricao2,
        },
        { where: { id: req.body.id1 } }
    );
    await Racks.update(
        {
            cliente: req.body.cliente1,
            descricao: req.body.descricao1,
        },
        { where: { id: req.body.id2 } }
    );
    res.redirect("/admin/racks/index");
}

module.exports = {
    showHome,

    showRacks,
    registerNewRack,
    saveNewRack,
    editRack,
    updateRack,
    deleteRack,
    selectRacksInversion,
    confirmRacksInversion,
};