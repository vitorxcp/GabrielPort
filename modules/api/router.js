const ConfigProject = require("../../config");

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
 * @property {function} getUsers
 * @property {function} setUserPermission
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
    const nodemailer = require('nodemailer');

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
            if (existingUser === 2345) return res.status(400).send({ message: 'E-mail invalido.' });
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

    app.post("/auth/password/recover", async (req, res) => {
        const { email } = req.body;

        if (!String(email).trim()) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        if (!String(email).trim().includes("@")) {
            return res.status(400).send({ message: 'Email invalido...' });
        }

        const existingUser = await Pudding.verifyEmailExist(email);

        if (!existingUser || existingUser === 2345) return res.status(500).send({ message: 'E-mail invalido.' });

        const { MailtrapClient } = require("mailtrap");

        const TOKEN = ConfigProject.email.token;
        const ENDPOINT = ConfigProject.email.endpoint;

        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

        const sender = {
            email: ConfigProject.email.painel,
            name: ConfigProject.email.name,
        };
        const recipients = [
            { email }
        ];

        var user = await Pudding.getAccount(email);
        var code = await Pudding.getRecoverPasswordCode(email);

        client
            .send({
                from: sender,
                to: recipients,
                subject: `Gabriel Martins - Recuperar Senha`,
                html: `
                <div style="display: flex;flex-direction: column;align-items: center;">
                <div style="border-radius: 1rem;padding: 1.25rem;background-color: #0a87ff30;color: #000;">
                <h1 style="text-transform: uppercase;font-size: 32px;color: #000;">Código de Recuperação</h1>
                <p style="color: #000;">Olá, <strong>${user.name}</strong>.</p>
                <p style="color: #000;">Recebemos uma solicitação de código de acesso para recuperação de senha, esté código expira em 15 minutos.</p>
                <div>
                <h1 style="font-size: 26px;color: #000;">Seu Código:</h1>
                <span style="text-transform: uppercase;font-size: 32px;color: rgb(59,130,246);font-weight: 700;">${code}</span>
                </div>
                <p style="color: rgb(239,68,68);">Se você não solicitou a recuperação de senha, é recomendável que altere sua senha para garantir a segurança da sua conta.</p>
                </div>
                </div>
                `
            })
            .then(res2 => {
                if (!res2.success) return res.status(500).send({ message: "Erro para enviar o código..." });
                else return res.status(200).send({ message: "Código enviado." });
            }).catch(e => {
                res.status(500).send({ message: "Erro para enviar o código..." })
            })
    })

    app.post("/auth/password/recover/code", async (req, res) => {
        const { email, code } = req.body;

        if (!String(email).trim() || !String(code).trim()) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        if (!String(email).trim().includes("@")) {
            return res.status(400).send({ message: 'Email invalido...' });
        }

        const existingUser = await Pudding.verifyEmailExist(email);

        if (!existingUser || existingUser === 2345) return res.status(500).send({ message: 'E-mail invalido.' });

        var codev = await Pudding.recoverPasswordCode(email, code);

        if (codev === true) return res.status(200).send({ message: "Código correto!" })
        else return res.status(404).send({ message: "Código errado, verifique é tente novamente..." })
    })

    app.post("/auth/password/update", async (req, res) => {
        const { email, password } = req.body;

        if (!String(email).trim() || !String(password).trim()) {
            return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
        }

        if (!String(email).trim().includes("@")) {
            return res.status(400).send({ message: 'Email invalido...' });
        }

        const existingUser = await Pudding.verifyEmailExist(email);

        if (!existingUser || existingUser === 2345) return res.status(500).send({ message: 'E-mail invalido.' });
        var modf = await Pudding.passwordUpdate(email, password);

        if (modf === true) return res.status(200).send({ message: "Senha alterada com sucesso!" });
        else return res.status(500).send({ message: "Erro para alterar senha, tente novamente mais tarde..." })
    })

    app.get("/config/modules", async function (req, res) {
        res.status(200).send(req.server);
    })

    app.post("/config/modules", async function (req, res) {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null))
            return res.status(500).send("Você não possuí permissão para isso...");

        if (!req.body) return res.status(500).send({ message: "Formulario invalido." })

        const update = await Pudding.globalConfigUpdate(req.body);

        if (update) return res.status(200).send({ message: "Alterado com sucesso!" });
        else res.status(404).send({ message: "Erro para salvar..." });

    })

    app.delete("/config/modules", async function (req, res) {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null))
            return res.status(500).send("Você não possuí permissão para isso...");

        if (!req.body || !req.body.delete) return res.status(500).send({ message: "Formulario invalido." })

        const update = await Pudding.globalConfigDelete(req.body.delete);

        if (update) return res.status(200).send({ message: "Deletado com sucesso!" });
        else res.status(404).send({ message: "Erro para deletar..." });
    })

    app.get("/admin/search/user/:search", async function (req, res) {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null))
            return res.status(500).send("Você não possuí permissão para isso...")

        if (req.params && !req.params.search) {
            return res.status(500).send({ message: "Campo email obrigatório." });
        }

        var users = await Pudding.getUsers();
        var usersP = [];

        if (users) {
            for (i in users) {
                if (String(i).replaceAll("_", ".").includes(req.params.search)) {
                    var user = users[i];
                    user.password = "Safado"
                    user.email = String(user.email).replaceAll("_", ".");
                    usersP.push(user);
                }
            }
            res.status(200).send(usersP);
        } else res.status(501).send("Ocorreu um erro ao buscar os usuários.");
    })

    app.get("/config/users/permissions", async function (req, res) {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null))
            return res.status(500).send("Você não possuí permissão para isso...");

        var users = await Pudding.getUsers();

        var usersP = [];

        if (users) {
            for (i in users) {
                var user = users[i];
                user.password = "tem nd aqui não safado...";
                user.email = String(user.email).replaceAll("_", ".");

                if (user.permissions) {
                    usersP.push(user);
                }
            }
            res.status(200).send(usersP);
        } else res.status(501).send("Ocorreu um erro ao buscar os usuários.");
    })

    app.put("/config/user/permission", async function (req, res) {
        if (!(req.isAuthenticated() ? (req.user.permissions ? req.user.permissions["admin"] : null) : null))
            return res.status(500).send("Você não possuí permissão para isso...");
        if (!req.body || !req.body.email || !req.body.permissions) return res.status(500).send({ message: "Formulario invalido." })

        const email = String(req.body.email).replaceAll(".", "_");
        let permissions = req.body.permissions;

        var user = await Pudding.getAccount(email);
        if (!user) return res.status(404).send({ message: `Usuário não encontrado.` });

        if (await Pudding.setUserPermission(email, permissions)) {
            return res.status(200).send({ message: "Permissões atualizadas com sucesso!" });
        } else {
            return res.status(501).send(`Erro no servidor ao atualizar as permissões do usuário.`);
        }
    })
    return app;
}