describe("posting jobs", function(){

    var newJob = {title:"Cook", description:"You will be making bagels"};

    beforeEach(module("app"));
    it("should call /api/jobs with job data", inject(function($httpBackend, jobFactory){
        $httpBackend.whenPOST("/api/jobs", function(data){
            postRequestJob = JSON.parse(data);
            expect(postRequestJob).to.not.be.emtpy;
            return true;
        }).respond(201);
        jobFactory.save(newJob);
        $httpBackend.flush();
    }));
});