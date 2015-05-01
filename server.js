var express = require("express");
require("./models/Job");
var jobsData = require("./jobs-data");
var app = express();
require("./jobs-service")(jobsData, app);


app.set("views", __dirname);
app.set("view engine", "jade");

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res){
    res.render("index");
});

//mongoose.connect("mongodb://localhost/jobfinder");
//jobsData.connectDB("mongodb://localhost/jobfinder").then(function(){
jobsData.connectDB("mongodb://root:p0r!v071@ds053937.mongolab.com:53937/jobfinder").then(function(){
	console.log("Connected to MongoDB!");
	jobsData.seedJobs();
});

if(process.env.PORT){
	app.listen(process.env.PORT, process.env.IP);	
}
else{
	app.listen(3000);
}