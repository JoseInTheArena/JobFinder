angular.module("app", ["ngResource"]);

angular.module("app").controller("testController", function($scope, $resource){
    $scope.jobs = $resource("/api/jobs").query();
});