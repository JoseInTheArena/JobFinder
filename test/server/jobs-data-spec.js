var chai = require("chai");
var expect = chai.expect;
var mongoose = require("mongoose");
var Job = require("../../models/Job");
var Promise = require("bluebird");
var jobsData = require("../../jobs-data");

function resetJobs(){
	return new Promise(function(resolve, reject){
		mongoose.connection.collections["jobs"].drop(resolve, reject);
	});
};

var connectDB = Promise.promisify(mongoose.connect, mongoose);

describe("save jobs", function(){

    var newJob = {title:"Teacher", description:"You will shaping minds"};

    it("should have an id after saving the job to the database", function(done){
        jobsData.connectDB("mongodb://root:p0r!v071@ds053937.mongolab.com:53937/jobfinder")
            .then(resetJobs)
            .then(jobsData.saveJob.bind(null, newJob))
            .then(function(savedJob){
                expect(savedJob.id).is.not.empty;
                done();
            });
    });

    after(function(){
        mongoose.connection.close();
    });

});

describe("get jobs", function(){

	var jobs = [];

	before(function(done){
		jobsData.connectDB("mongodb://root:p0r!v071@ds053937.mongolab.com:53937/jobfinder")
		//jobsData.connectDB("mongodb://localhost/jobfinder")
		.then(resetJobs)
		.then(jobsData.seedJobs)
		.then(jobsData.findJobs)
		.then(function(collection){
			jobs = collection;
			done();
		});
	});

	it("should never be empty since jobs are seeded", function(){
		expect(jobs.length).to.be.at.least(1);
	});

	it("should have a title", function(){
		expect(jobs[0].title).to.not.be.empty;
	});

	it("should have a description", function(){
		expect(jobs[0].description).to.not.be.empty;
	});
});