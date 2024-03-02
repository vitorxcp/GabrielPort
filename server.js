const express = require("express");
const app = express();

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

app.use(express.static('views'));

app.listen(80);