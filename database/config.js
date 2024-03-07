/**
 * @typedef {Object} Pudding
 * @property {function} verifyEmailExist - Método para verificar se um e-mail existe no banco de dados
 * @property {function} registerAccount - Método para registrar uma nova conta no banco de dados
 * @property {function} authenticateUser - Método para autenticar no sistema no banco de dados
 */

/**
 * @typedef {Object} Database
 * @property {any} db - Objeto do banco de dados Firebase
 * @property {Pudding} Pudding - Objeto da classe pudding com métodos relacionados ao banco de dados
 */

/**
 * Configura o banco de dados Firebase
 * @returns {Promise<Database>} Uma promessa que resolve com o banco de dados e a classe pudding
 */

const bcrypt = require('bcrypt');
const ConfigProject = require('../config');

module.exports.configDatabase = () => {
    return new Promise((resolve, reject) => {
        // Importar as funções necessárias dos SDKs
        const { initializeApp } = require("firebase/app");
        const { getDatabase } = require("firebase/database"); // Importar o módulo do banco de dados

        const firebaseConfig = {
            apiKey: ConfigProject.database.apiKey,
            authDomain: ConfigProject.database.authDomain,
            databaseURL: ConfigProject.database.databaseURL,
            projectId: ConfigProject.database.projectId,
            storageBucket: ConfigProject.database.storageBucket,
            messagingSenderId: ConfigProject.database.messagingSenderId,
            appId: ConfigProject.database.appId,
            measurementId: ConfigProject.database.measurementId
        };

        // Inicializar o Firebase
        const app = initializeApp(firebaseConfig);

        const db = getDatabase(); // Inicializar o banco de dados

        class Pudding {
            static verifyEmailExist = async (email) => {
                email = String(email).replaceAll(".", "_");

                const data = await db.ref(`auth/accounts/${email}`).once("value");
                return data.val() ? true : false;
            }

            static registerAccount = async (name, email, password) => {
                try {
                    email = String(email).replaceAll(".", "_");

                    const hashedPassword = await bcrypt.hash(password, 10);
                    await db.ref(`auth/accounts/${email}`).set({
                        name,
                        password: hashedPassword
                    });
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            };

            static authenticateUser = async (email, password) => {
                try {
                    email = String(email).replaceAll(".", "_");

                    // Recupere a senha criptografada do banco de dados para o usuário com base no e-mail fornecido
                    const data = await db.ref(`auth/accounts/${email}`).once('value');
                    const userData = data.val();

                    // Verifique se o usuário existe e se a senha está correta
                    if (userData && await bcrypt.compare(password, userData.password)) return true;
                    else return false;
                } catch (error) {
                    console.error('Erro ao autenticar usuário:', error);
                    return false; // Autenticação falhou
                }
            };
        }

        resolve({ db, Pudding });
    });
}