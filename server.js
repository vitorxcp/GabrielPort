const express = require("express");
const app = express();

app.engine("html", require("ejs").renderFile)

app.get("/", function (req, res) {
    res.render("index.html")
})

app.use(express.static('views'));

app.listen(80);