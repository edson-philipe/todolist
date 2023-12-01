function checkLogin(hierarquiaNecessaria) {
    return function(req, res, next) {
        if (req.session.user != undefined && (req.session.user.hierarquia == hierarquiaNecessaria || req.session.user.hierarquia == "adm")) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

module.exports = checkLogin;