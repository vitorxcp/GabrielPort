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
const FirebaseStore = require('connect-session-firebase')(session);

configDatabase()
    .then(async ({ db, Pudding }) => {

        app.engine("html", require("ejs").renderFile)

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            expiresIn: 31536000,
            expires: 31536000,
            secret: 'youshallnotpass',
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: false,
                httpOnly: true,
            },
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy({
            emailField: 'email',
            passwordField: 'password'
        }, (email, password, done) => {
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return done(null, false, { message: 'Credenciais inválidas' });
            }
            return done(null, user);
        }));

        passport.serializeUser((user, done) => {
            done(null, user.email);
        });

        passport.deserializeUser((email, done) => {
            const user = users.find(u => u.email === email);
            done(null, user);
        });

        app.use("/api", apiRouter(db, Pudding, {passport}));
        app.use("/", pagesRedirect(db));

        app.listen(80, () => {
            console.log("Site online, sistemas funcionando!")
        });
    }).catch(err => {
        console.log(err)
    })