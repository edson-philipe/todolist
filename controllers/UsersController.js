const User = require("../models/User");

async function createUsers(req, res) {
  let hierarquia = req.session.user.hierarquia || "";
  let theme = req.session.user.informacao1;
  let mensagem = req.session.mensagem || "";
  req.session.mensagem = null;
  res.render("admin/users/create", {
    mensagem,
    hierarquia,
    theme,
  });
}

async function saveUsers(req, res) {
  let user = await User.findOne({
    where: { email: req.body.email }
  });

  if (user == undefined) {
    await User.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      hierarquia: req.body.hierarquia,
      informacao1: "light",
    });
    req.session.mensagem = {
      texto: "A conta foi criada com sucesso!",
    }
  } else {
    req.session.mensagem = {
      texto: "Não foi possível criar sua conta porque o email já está sendo usado!",
    };
  }
  res.redirect('/admin/users/create');
}

async function loginUsers(req, res) {
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
        email: user.email,
        hierarquia: user.hierarquia,
        informacao1: user.informacao1,
      }
      res.redirect("/admin/racks/index");
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

module.exports = {
  createUsers,
  saveUsers,
  loginUsers,
  authenticateLogin,
  selectTheme,
};
