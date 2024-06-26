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
 * @property {function} globalConfig - Método para ver todos os dados de configuração
 * @property {function} globalConfigDelete
 * @property {function} globalConfigUpdate
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
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"],
            page: req.server.config["page-initial"]
        })
    })

    app.get("/biography", function (req, res) {
        res.render("biography.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"],
            page: req.server.config["page-bio"]
        })
    })

    app.get("/blog", function (req, res) {
        res.render("blog.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/galery", function (req, res) {
        res.render("galery.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/textest", function (req, res) {
        res.render("textecss.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/admin/painel", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/painel.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/admin/permissions", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/permissions.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/admin/pages/index", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/pages/index.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.get("/admin/pages/biography", async (req, res) => {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null)) return res.redirect("/");
        res.render("admin/pages/biography.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    app.use(express.static('views'));

    app.get("*", function (req, res) {
        res.render("404.html", {
            Auth: req.isAuthenticated(),
            user: req.user,
            title: req.server.config.title,
            image: req.server.config["image-url"]
        })
    })

    return app;
}