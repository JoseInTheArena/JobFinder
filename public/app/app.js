angular.module("app", []);

angular.module("app").controller("testController", function($scope){
    $scope.jobs = [{title: "Software Engineer", description: "Write Code"}, {title: "Psychologist", description: "Cure People"}];
});