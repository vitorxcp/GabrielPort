module.exports.pagesRedirect = (db, pudding) => {
    const express = require("express");
    const app = express.Router();

    app.get("/", function (req, res) {
        console.log(req.user)
        res.render("index.html")
    })

    app.get("/biography", function (req, res) {
        res.render("biography.html")
    })

    app.get("/blog", function (req, res) {
        res.render("blog.html")
    })

    app.get("/galery", function (req, res) {
        res.render("galery.html")
    })

    app.get("/textest", function (req, res) {
        res.render("textecss.html")
    })

    app.use(express.static('views'));

    app.get("*", function (req, res) {
        res.render("404.html")
    })

    return app;
}