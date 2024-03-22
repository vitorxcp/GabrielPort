/**
 * @typedef {Object} Database
 * @property {any} db - Objeto do banco de dados Firebase
 */

/**
 * @typedef {Object} Pudding
 * @property {function} verifyEmailExist - Método para verificar se um e-mail existe no banco de dados
 * @property {function} registerAccount - Método para registrar uma nova conta no banco de dados
 * @property {function} authenticateUser - Método para autenticar no sistema no banco de dados
 * @property {function} getAccount - Método para pegar os dados da conta no banco de dados
 * @property {function} getRecoverPasswordCode - Método gerar e salvar o codigo de recuperação
 * @property {function} recoverPasswordCode - Método para verificar o codigo de verificação é remover do banco de dados
 * @property {function} passwordUpdate - Método para mudar senha do usuário
 */

/**
 * Cria e retorna um roteador de API express
 * @param {Database} db - Objeto do banco de dados
 * @param {Pudding} Pudding - Objeto da classe pudding
 * @returns {express.Router} O roteador de API express configurado
 */

module.exports.pagesRedirect = (db, Pudding) => {
    const express = require("express");
    const app = express.Router();

    app.get("/", function (req, res) {
        res.render("index.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/biography", function (req, res) {
        res.render("biography.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/blog", function (req, res) {
        res.render("blog.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/galery", function (req, res) {
        res.render("galery.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/textest", function (req, res) {
        res.render("textecss.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/admin/painel", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/painel.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.get("/admin/permissions", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/permissions.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    app.use(express.static('views'));

    app.get("*", function (req, res) {
        res.render("404.html", {
            Auth: req.isAuthenticated(),
            user: req.user
        })
    })

    return app;
}