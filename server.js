var express = require("express");

var app = express();

app.set("views", __dirname);
app.set("view engine", "jade");

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res){
    res.render("index");
});

//This setting works for Cloud9
app.listen(3000);