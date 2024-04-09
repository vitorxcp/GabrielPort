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
 * @typedef {Object} Database
 * @property {any} db - Objeto do banco de dados Firebase
 * @property {Pudding} Pudding - Objeto da classe pudding com métodos relacionados ao banco de dados
 */

/**
 * Configura o banco de dados Firebase
 * @returns {Promise<Database>} Uma promessa que resolve com o banco de dados e a classe pudding
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, child, get, update, remove } = require('firebase/database');
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
                try {
                    email = String(email).replaceAll(".", "_");

                    const data = await get(child(ref(db), `auth/accounts/${email}`));
                    return data.exists();
                } catch (err) { return 2345 }
            }

            static getAccount = async (email) => {
                try {
                    email = String(email).replaceAll(".", "_");

                    const data = await get(child(ref(db), `auth/accounts/${email}`));
                    return data.val();
                } catch (err) { return 2345 }
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

            static getRecoverPasswordCode = async (email) => {
                try {
                    var code = generateSixDigitNumber();
                    email = String(email).replaceAll(".", "_");
                    await update(ref(db, `auth/accounts/${email}`), { codeRecover: code });
                    setTimeout(async () => {
                        await update(ref(db, `auth/accounts/${email}`), { codeRecover: null })
                    }, 900000)
                    return code;
                } catch (error) {
                    console.error('Erro ao verificar email:', error);
                    return null;
                }
            }

            static recoverPasswordCode = async (email, code) => {
                try {
                    email = String(email).replaceAll(".", "_");
                    const data = await get(child(ref(db), `auth/accounts/${email}`));
                    const userData = data.val();

                    if (userData && String(userData ? userData.codeRecover : null) === code) { await update(ref(db, `auth/accounts/${email}`), { codeRecover: null }); return true }
                    else return false;
                } catch (error) {
                    console.error('Erro ao verificar email:', error);
                    return false;
                }
            }

            static passwordUpdate = async (email, password) => {
                try {
                    email = String(email).replaceAll(".", "_");
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await update(ref(db, `auth/accounts/${email}`), {
                        password: hashedPassword
                    });
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }

            static globalConfig = async () => {
                try {
                    const data = await get(child(ref(db), `config`));
                    return data.val();
                } catch (err) { return null }
            }

            static globalConfigDelete = async (configId) => {
                try {
                    await remove(ref(db, `config/${configId}`));
                    const configData = await get(child(ref(db), `config`));
                    return configData.val();
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }

            static globalConfigUpdate = async (dataToUpdate) => {
                try {
                    const data = await get(child(ref(db), `config`));
                    await update(ref(db, `config`), dataToUpdate);
                    const updatedData = await get(child(ref(db), `config`));
                    return updatedData.val();
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }

            static getUsers = async () => {
                try {
                    const data = await get(child(ref(db), `auth/accounts`));
                    return data.val();
                } catch (err) { return null }
            }

            static setUserPermission = async (email, permissions) => {
                try {
                    await update(ref(db, `auth/accounts/${email}/permissions`), permissions);
                    const updatedData = await get(child(ref(db), `auth/accounts/${email}`));
                    return updatedData.val();
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }
        }

        resolve({ db, Pudding, credentialAdmin: ConfigProject.database.admin });
    });

    function generateSixDigitNumber() {
        return Math.floor(Math.random() * 900000) + 100000;
    }
}