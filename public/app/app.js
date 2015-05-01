angular.module("app", ["ngResource"]);

angular.module("app").controller("testController", function($scope, $resource, jobFactory){

    $scope.jobs = $resource("/api/jobs").query();

    $scope.submit = function(){

        var newJob = {title: $scope.title, description: $scope.description};
        jobFactory.save(newJob, function(){
            //$scope.jobs = $resource("/api/jobs").query();
        });
        $scope.jobs.push(newJob);
    }

});