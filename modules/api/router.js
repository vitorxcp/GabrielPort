/**
 * @typedef {Object} Database
 * @property {any} db - Objeto do banco de dados Firebase
 */

/**
 * @typedef {Object} Pudding
 * @property {function} verifyEmailExist - Método para verificar se um e-mail existe no banco de dados
 * @property {function} registerAccount - Método para registrar uma nova conta no banco de dados
 */

/**
 * Cria e retorna um roteador de API express
 * @param {Database} db - Objeto do banco de dados
 * @param {Pudding} Pudding - Objeto da classe pudding
 * @returns {express.Router} O roteador de API express configurado
 */

module.exports.apiRouter = (db, Pudding) => {
    const express = require("express");
    const app = express.Router();

    app.post('/auth/login', passport.authenticate('local', {}));

    app.post('/auth/register', (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('Todos os campos são obrigatórios');
        }
        const existingUser = Pudding.verifyEmailExist(email);
        if (existingUser) {
            return res.status(400).send('E-mail já registrado');
        }
        Pudding.registerAccount(name, email, password)
    });

    return app;
}