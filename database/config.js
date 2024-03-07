/**
 * @typedef {Object} Pudding
 * @property {function} verifyEmailExist - Método para verificar se um e-mail existe no banco de dados
 * @property {function} registerAccount - Método para registrar uma nova conta no banco de dados
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

module.exports.configDatabase = () => {
    return new Promise((resolve, reject) => {
        // Importar as funções necessárias dos SDKs
        const { initializeApp } = require("firebase/app");
        const { getDatabase } = require("firebase/database"); // Importar o módulo do banco de dados

        const firebaseConfig = {
            //algo aq ;3
        };

        // Inicializar o Firebase
        const app = initializeApp(firebaseConfig);

        const db = getDatabase(); // Inicializar o banco de dados

        class Pudding {
            static verifyEmailExist = async (email) => {
                const data = await db.ref(`auth/accounts/${email}`).once("value");
                return data.val() ? true : false;
            }

            static registerAccount = async (name, email, password) => {
                try {
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
        }

        resolve({ db, Pudding });
    });
}