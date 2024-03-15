// Sistema sendo feito, pode apresentar erros ou bugs caso usem...

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
 */

/**
 * Cria e retorna um roteador de API express
 * @param {Database} db - Objeto do banco de dados
 * @param {Pudding} Pudding - Objeto da classe pudding
 * @returns {express.Router} O roteador de API express configurado
 */

module.exports.apiRouter = (db, Pudding, { passport }) => {
    const express = require("express");
    const app = express.Router();
    const bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/auth/login', (req, res, next) => {
        const { email, password } = req.body;

        if (!String(email).trim() || !String(password).trim()) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        if (!String(email).trim().includes("@")) {
            return res.status(400).send({ message: 'Email invalido...' });
        }

        if (req.user) {
            return res.status(500).send({ message: "Você já possuí uma conta conectada no servidor, desconecte ela para entrar em outra!" })
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).send({ message: 'Ocorreu um erro durante a autenticação.', error: err });
            }
            if (!user) {
                return res.status(401).send(info);
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Ocorreu um erro durante a autenticação.', error: err });
                }
                return res.status(200).send({ message: 'Autenticação bem-sucedida.' });
            });
        })(req, res, next);
    });


    app.post('/auth/register', async (req, res, next) => {
        const { name, email, password } = req.body;

        if (!String(name).trim() || !String(email).trim() || !String(password).trim()) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        if (!String(email).trim().includes("@")) {
            return res.status(400).send({ message: 'Email invalido...' });
        }

        if (req.user) {
            return res.status(500).send({ message: "Você já possuí uma conta conectada no servidor, desconecte ela para registrar outra conta!" })
        }

        const existingUser = await Pudding.verifyEmailExist(email);
        if (existingUser) {
            return res.status(400).send({ message: 'E-mail já registrado.' });
        }

        var register = await Pudding.registerAccount(name, email, password);
        if (register === true) {
            // Autenticar o usuário após o registro bem-sucedido
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return res.status(500).send({ message: 'Ocorreu um erro durante a autenticação.', error: err });
                }
                if (!user) {
                    return res.status(401).send({ message: 'Credenciais inválidas.' });
                }
                req.login(user, async (err) => {
                    if (err) {
                        return res.status(500).send({ message: 'Ocorreu um erro durante a autenticação.', error: err });
                    }
                    return res.status(200).send({ message: 'Registro e autenticação bem-sucedidos.' });
                });
            })(req, res, next);
        } else {
            res.status(500).send({ message: "Ocorreu algum imprevisto na hora de registrar, tente novamente mais tarde!" });
        }
    });


    app.post("/auth/logout", function (req, res, next) {
        req.logout(function (err) {
            if (err) {
                res.status(500).send({ message: "Ocorreu um erro na hora de se desconectar...", error: err });
                return next(err);
            }
            res.status(200).send({ message: "Desconectado!" })
        });
    })

    app.get("/auth/user/@me", (req, res) => {
        var user = req.user ?? null;
        if (!user) return res.status(500).send({ message: "Não esta Logado..." });
        else return res.status(200).send({ message: "Conectado!", user })
    })
    return app;
}