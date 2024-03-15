/**
 * @typedef {Object} Pudding
 * @property {function} verifyEmailExist - Método para verificar se um e-mail existe no banco de dados
 * @property {function} registerAccount - Método para registrar uma nova conta no banco de dados
 * @property {function} authenticateUser - Método para autenticar no sistema no banco de dados
 * @property {function} getAccount - Método para pegar os dados da conta no banco de dados
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

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, child, get } = require('firebase/database');
const bcrypt = require('bcrypt');
const ConfigProject = require('../config');

module.exports.configDatabase = () => {
    return new Promise((resolve, reject) => {
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

        // Inicialize o Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        class Pudding {
            static verifyEmailExist = async (email) => {
                email = String(email).replaceAll(".", "_");

                const data = await get(child(ref(db), `auth/accounts/${email}`));
                console.log(data.exists(), data.val())
                return data.exists();
            }

            static getAccount = async (email) => {
                email = String(email).replaceAll(".", "_");

                const data = await get(child(ref(db), `auth/accounts/${email}`));
                return data.val();
            }

            static registerAccount = async (name, email, password) => {
                try {
                    email = String(email).replaceAll(".", "_");

                    const hashedPassword = await bcrypt.hash(password, 10);
                    await set(ref(db, `auth/accounts/${email}`), {
                        name,
                        email,
                        password: hashedPassword
                    });
                    console.log("e")
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            };

            static authenticateUser = async (email, password) => {
                try {
                    email = String(email).replaceAll(".", "_");

                    const data = await get(child(ref(db), `auth/accounts/${email}`));
                    const userData = data.val();

                    if (userData && await bcrypt.compare(password, userData.password)) return true;
                    else return false;
                } catch (error) {
                    console.error('Erro ao autenticar usuário:', error);
                    return false;
                }
            };
        }

        resolve({ db, Pudding, credentialAdmin: ConfigProject.database.admin });
    });
}