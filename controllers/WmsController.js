const Racks = require("../models/Racks");

async function showHome(req, res) {
  //res.render("index");
  res.redirect("/admin/users/login");
}

async function showRacks(req, res) {
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;

  let racks = await Racks.findAll({
    raw: true,
    order: [["id", "ASC"]],
  });

  const totalRacksCadastrados = racks.length;
  const clienteLista = [...new Set(racks.map((rack) => rack.cliente))];
  const predioLista = [...new Set(racks.map((rack) => rack.predio))];
  const numeroLista = [...new Set(racks.map((rack) => rack.numero))];
  const andarLista = [...new Set(racks.map((rack) => rack.andar))];
  const ocupadoLista = [...new Set(racks.map((rack) => rack.ocupado))];

  const { cliente, predio, numero, andar, ocupado } = req.query;
  const clienteSelecionado = cliente || "Todos";
  const predioSelecionado = predio || "Todos";
  const numeroSelecionado = numero || "Todos";
  const andarSelecionado = andar || "Todos";
  const ocupadoSelecionado = ocupado || "Todos";

  racks = racks.filter((rack) => {
    if (cliente && cliente !== "Todos" && rack.cliente.trim() !== cliente) {
      return false;
    }
    if (predio && predio !== "Todos" && rack.predio !== predio) {
      return false;
    }
    if (numero && numero !== "Todos" && rack.numero != numero) {
      return false;
    }
    if (andar && andar !== "Todos" && rack.andar != andar) {
      return false;
    }
    if (ocupado && ocupado !== "Todos" && rack.ocupado != ocupado) {
      return false;
    }
    return true;
  });

  res.render("admin/racks/index", {
    racks,
    clienteLista,
    predioLista,
    numeroLista,
    andarLista,
    ocupadoLista,
    totalRacksCadastrados,
    clienteSelecionado,
    predioSelecionado,
    numeroSelecionado,
    andarSelecionado,
    ocupadoSelecionado,
    hierarquia,
    theme,
  });
}

async function registerNewRack(req, res) {
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;

  const racks = await Racks.findAll({
    raw: true,
    order: [["id", "ASC"]],
  });

  const prediosNumerosConcatenados = racks.map(
    (rack) => `${rack.predio}${rack.numero}`
  );

  res.render("admin/racks/new", { 
    prediosNumerosConcatenados, 
    hierarquia, 
    mensagem,
    theme,
  });
}

async function saveNewRack(req, res) {
  req.session.mensagem = {
    texto: "Rack cadastrada com sucesso!",
  }

  await Racks.create({
    cliente: "Sem cliente",
    descricao: "Espaço vazio",
    predio: req.body.predio.trim().toUpperCase(),
    numero: req.body.numero,
    andar: req.body.andar,
    ocupado: "false",
  });
  res.redirect("/admin/racks/new");
}

async function editRack(req, res) {
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;
  const rack = await Racks.findOne({
    where: { id: req.params.id },
  });
  res.render("admin/racks/edit", { 
    rack,
    hierarquia,
    theme,
  });
}

async function updateRack(req, res) {
  if (req.body.cliente == "Sem cliente") {
    await Racks.update(
      {
        cliente: req.body.cliente,
        descricao: "Espaço vazio",
        ocupado: "false",
      },
      { where: { id: req.body.id } }
    );
  } else {
    await Racks.update(
      {
        cliente: req.body.cliente,
        descricao: req.body.descricao,
        ocupado: "true",
      },
      { where: { id: req.body.id } }
    );
  }
  res.redirect("/admin/racks/index");
}

async function deleteRack(req, res) {
  await Racks.destroy({
    where: { id: req.body.id },
  });
  res.redirect("/admin/racks/index");
}

async function selectRacksInversion(req, res) {
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;
  const racks = await Racks.findAll({
    raw: true,
    order: [["id", "ASC"]],
  });

  const prediosNumerosConcatenados = racks.map(
    (rack) => `${rack.predio}${rack.numero}`
  );

  const { predio1, numero1, predio2, numero2 } = req.query;

  // Busca pelo primeiro rack se predio1 e numero1 estiverem presentes
  let rack1 = null;
  if (predio1 && numero1) {
    rack1 = await Racks.findOne({
      where: { predio: predio1, numero: numero1 },
    });
  } else {
    rack1 = racks[0];
  }
  let rack2 = null;
  if (predio2 && numero2) {
    rack2 = await Racks.findOne({
      where: { predio: predio2, numero: numero2 },
    });
  } else {
    rack2 = racks[1];
  }

  // Renderiza a página com os dados dos racks
  res.render("admin/racks/reverse", {
    prediosNumerosConcatenados,
    rack1,
    rack2,
    hierarquia,
    theme,
  });
}

async function confirmRacksInversion(req, res) {
  await Racks.update(
    {
      cliente: req.body.cliente2,
      descricao: req.body.descricao2,
      ocupado: req.body.ocupado2,
    },
    { where: { id: req.body.id1 } }
  );
  await Racks.update(
    {
      cliente: req.body.cliente1,
      descricao: req.body.descricao1,
      ocupado: req.body.ocupado1,
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
