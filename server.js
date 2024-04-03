const express = require("express");
const { configDatabase } = require("./database/config");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const cors = require('cors');
const admin = require('firebase-admin');
const { pagesRedirect } = require("./modules/pages/router");
const { apiRouter } = require("./modules/api/router");
const LocalStrategy = require('passport-local').Strategy;
const FirestoreStore = require('connect-session-firebase')(session);
const jwt = require('jsonwebtoken');

configDatabase()
    .then(async ({ db, Pudding, credentialAdmin }) => {
        const customTokenConfig = {
            expiresIn: 31536000,
            expires: 31536000,
        };

        admin.initializeApp({
            credential: admin.credential.cert(credentialAdmin),
            databaseURL: 'https://disco-genius-351411-default-rtdb.firebaseio.com'
        });

        admin.auth().createCustomToken('uid-do-usuario', customTokenConfig);
        // Obtém uma referência para o Firestore do Firebase

        app.engine('html', require('ejs').renderFile);
        app.engine('scss', require('ejs').renderFile);
        app.engine('css', require('ejs').renderFile);
        app.engine('js', require('ejs').renderFile);

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(session({
            expiresIn: 31536000,
            expires: 31536000,
            store: new FirestoreStore({
                database: admin.database(),
                collection: 'sessions',
            }),
            secret: 'youshallnotpass',
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias em milissegundos
                secure: false,
                httpOnly: true,
            },
        }));

        app.use(cors());
        app.use(cookieParser());
        app.use(flash());
        app.use((req, res, next) => {
            if (req.cookies.authToken) {
                jwt.verify(req.cookies.authToken, 'gtvOMEq6PbPC0DczIh5jMbdrmjq9FYMd', (err, decoded) => { if (!err) req.user = decoded; });
            }

            next();
        });

        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await Pudding.getAccount(email);
                if (!user) {
                    return done(null, false, { message: 'Este email não existe...' });
                } else {
                    var verified = await Pudding.authenticateUser(email, password);
                    if (verified) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Senha incorreta!' });
                    }
                }
            } catch (error) {
                return done(error);
            }
        }));

        passport.serializeUser((user, done) => {
            done(null, user.email);
        });

        passport.deserializeUser(async (email, done) => {
            const user = await Pudding.getAccount(email)
            user.password = "curioso..."
            done(null, user);
        });
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(async (req, res, next) => {
            var info = await Pudding.globalConfig();
            req.server = { config: info };
            next();
        });

        app.use("/api", apiRouter(db, Pudding, { passport }));
        app.use("/", pagesRedirect(db));

        app.listen(80, () => {
            console.log("Site online, sistemas funcionando!")
        });
    }).catch(err => {
        console.log(err)
    })