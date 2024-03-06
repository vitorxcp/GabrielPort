const express = require("express");
const { configDatabase } = require("./database/config");
const app = express();

configDatabase().then(async (db) => {
    app.engine("html", require("ejs").renderFile)

    app.get("/", function (req, res) {
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

    app.listen(80, () => { console.log("Site Online!") });
}).catch(err => {
    console.log(err)
})