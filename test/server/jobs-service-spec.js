var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");

var dataSavedJob;

var db = {
	saveJob: function(job){
		return new Promise(function(resolve, reject){
			dataSavedJob = job;
			resolve(job);
		});
	},
    findJobs: function(){
        return new Promise(function(resolve, reject){
           resolve(["hi"]);
        });
    }
};
var jobService = require("../../jobs-service")(db, app);


describe("find jobs", function(){

	it("should return all jobs from the database", function(done){
		request(app).get("/api/jobs").expect("Content-Type", /json/).end(function(err, resp){
			expect(resp.body).to.be.a("Array");
			done();
		});
	});

});

describe("save jobs", function(){

	it("should validate the title is greater than 4 characters", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(dataSavedJob.title.length).least(4);
			done();
		});
	});
	it("should validate the title is less than 40 characters", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(dataSavedJob.title.length).most(40);
			done();
		});
	});
	it("should validate the description is greater than 4 characters", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(dataSavedJob.description.length).least(4);
			done();
		});
	});
	it("should validate the description is less than 250 characters", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(dataSavedJob.description.length).most(40);
			done();
		});
	});

	var newJob = {id: 1, title:"Cook", description:"You will be making bagels"};

	it("should pass the job to the database save", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(dataSavedJob).to.deep.equal(newJob);
			done();
		});
	});
	it("should return a status of 200 to the front end if the database saved", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(resp.statusCode).to.equal(201);
			done();
		});
	});
	it("should return a job with an id", function(done){
		request(app).post("/api/jobs").send(newJob).end(function(err, resp){
			expect(resp.body).to.not.be.empty;
			expect(resp.body.id).to.not.be.empty;
			done();
		});
	});
	it("should send an error if the database failed", function(){

	});

});