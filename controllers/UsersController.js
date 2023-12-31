const User = require("../models/User");
const History = require("../models/History");

async function showUsers(req, res) {
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;

  let users = await User.findAll({
    raw: true,
    order: [["id", "DESC"]],
  });
  const totalUsuariosCadastrados = users.length;
  res.render("admin/users/index", {
    users,
    totalUsuariosCadastrados,
    mensagem,
    hierarquia,
    theme,
  });
}

async function createUser(req, res) {
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;

  res.render("admin/users/new", {
    mensagem,
    hierarquia,
    theme,
  });
}

async function saveUser(req, res) {
  let user = await User.findOne({
    where: { email: req.body.email }
  });

  if (user == undefined) {
    await User.create({
      nome: req.body.nome,
      email: (req.body.email).toLowerCase(),
      senha: req.body.senha,
      hierarquia: req.body.hierarquia,
      informacao1: "light",
    });
    req.session.mensagem = {
      texto: "Usuário criado com sucesso!",
    }
    if (req.body.hierarquia == "adm") {
      await History.create({
        usuario: req.session.user.nome,
        acao: "Cadastrar usuário",
        resumo: `"${(req.body.nome).trim()}" com o email "${(req.body.email).trim()}" e com a hierarquia de administrador`,
        cliente: "REDA XXI",
      });
    } else if (req.body.hierarquia == "usuario") {
      await History.create({
        usuario: req.session.user.nome,
        acao: "Cadastrar usuário",
        resumo: `"${(req.body.nome).trim()}" com o email "${(req.body.email).trim()}" e com a hierarquia de usuário`,
        cliente: "REDA XXI",
      });
    } else {
      await History.create({
        usuario: req.session.user.nome,
        acao: "Cadastrar usuário",
        resumo: `"${(req.body.nome).trim()}" com o email "${(req.body.email).trim()}" e com a hierarquia de cliente`,
        cliente: "REDA XXI",
      });
    }
  } else {
    req.session.mensagem = {
      texto: "Não foi possível criar o usuário porque o email já está sendo usado!",
    };
  }
  res.redirect('/admin/users/new');
}

async function editUser(req, res) {
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;

  const user = await User.findOne({
    where: { id: req.params.id },
  });
  res.render("admin/users/edit", {
    user,
    mensagem,
    hierarquia,
    theme,
  });
}

async function updateUser(req, res) {
  req.session.mensagem = {
    texto: "Informações do usuário alteradas com sucesso!",
  }
  await User.update(
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      hierarquia: req.body.hierarquia,
    },
    { where: { id: req.body.id } }
  );
  res.redirect("/admin/users/index");
}

async function deleteUser(req, res) {
  req.session.mensagem = {
    texto: "Usuário excluído com sucesso!",
  }
  let user = await User.findOne({
    where: { id: req.body.id }
  });

  if (user.hierarquia == "adm") {
    await History.create({
      usuario: req.session.user.nome,
      acao: "Deletar usuário",
      resumo: `"${user.nome}" com o email "${user.email}" e com a hierarquia de administrador`,
      cliente: "REDA XXI",
    });
  } else if (user.hierarquia == "usuario") {
    await History.create({
      usuario: req.session.user.nome,
      acao: "Deletar usuário",
      resumo: `"${user.nome}" com o email "${user.email}" e com a hierarquia de usuário`,
      cliente: "REDA XXI",
    });
  } else {
    await History.create({
      usuario: req.session.user.nome,
      acao: "Deletar usuário",
      resumo: `"${user.nome}" com o email "${user.email}" e com a hierarquia de cliente`,
      cliente: "REDA XXI",
    });
  }
  await User.destroy({
    where: { id: req.body.id },
  });
  res.redirect("/admin/users/index");
}

async function loginUser(req, res) {
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;
  res.render('admin/users/login', {
    mensagem,
  });
}

async function authenticateLogin(req, res) {
  let user = await User.findOne({
    where: { email: req.body.email }
  });
  if (user != undefined) {
    if (user.senha == req.body.senha) {
      req.session.user = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        hierarquia: user.hierarquia,
        informacao1: user.informacao1,
      }
      req.session.mensagem = {
        texto: `${req.session.user.nome}, seja bem-vindo(a) ao nosso novo sistema de gerenciamento de armazém!`,
      };
      res.redirect("/");
    } else {
      req.session.mensagem = {
        texto: "Oops! A senha está incorreta. Por favor, tente novamente.",
      }
      res.redirect('/admin/users/login');
    }
  } else {
    req.session.mensagem = {
      texto: "Oops! Este email não está cadastrado. Por favor, tente novamente.",
    }
    res.redirect('/admin/users/login');
  }
}

async function selectTheme(req, res) {
  console.log(req.session.user.informacao1);
  console.log()
  if (req.session.user.informacao1 == "light") {
    req.session.user.informacao1 = "dark"
  } else {
    req.session.user.informacao1 = "light";
  }
  await User.update(
    {
      informacao1: req.session.user.informacao1,
    },
    { where: { id: req.session.user.id } }
  );
  let link = req.body.link;
  res.redirect(link);
}

async function logoutUser(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = {
  showUsers,
  createUser,
  saveUser,
  editUser,
  updateUser,
  deleteUser,
  loginUser,
  authenticateLogin,
  selectTheme,
  logoutUser,
};
