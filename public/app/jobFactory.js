angular
    .module("app")
    .factory("jobFactory", Jobs);

Jobs.$inject = ['$resource'];

/* @ngInject */
function Jobs ($resource){
    return $resource("/api/jobs");
}
