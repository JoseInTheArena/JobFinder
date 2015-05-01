var mongoose = require("mongoose");
var Promise = require("bluebird");
var Job = mongoose.model("Job");

var createJob = Promise.promisify(Job.create, Job);

var jobs = [
			{title:"Cook", description:"You will be making bagels"},
			{title:"Waiter", description:"You will be putting food on peoples' tab"},
			{title:"Programmer", description:"You will be mindlessly typing"},
			{title:"Axe Maker", description:"We need many axes made...so many..."}
];

exports.findJobs = function(query){
	return Promise.cast(Job.find(query).exec());
};

exports.seedJobs = function(){
	return findJobs({}).then(function(collection){
		if(!collection || collection.length === 0 ){
			return Promise.map(jobs, function(job){
				return createJob(job);
			});
		}
	});
};

exports.saveJob = function(newJob){
    return createJob(newJob);
};

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

function findJobs(query){
	return Promise.cast(Job.find(query).exec());
};