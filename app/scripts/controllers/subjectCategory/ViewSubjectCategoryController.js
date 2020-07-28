(function (module){
    mifosX.controllers = _.extend(module, {
        ViewSubjectCategoryController: function (scope, routeParams, resourceFactory, location){
            resourceFactory.subjectCategoryResource.get({ 'subjectCategoryId': routeParams.id }, function (data){
                scope.subjectCategoryData = data;
            });

            scope.delete=function(){
                resourceFactory.subjectCategoryResource.delete({ 'subjectCategoryId': routeParams.id }, function (data) {
                    location.path('subjectcategories')
                });
            };
        }
    });

    mifosX.ng.application.controller('ViewSubjectCategoryController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.ViewSubjectCategoryController]).run(function ($log) {
        $log.info("ViewSubjectCategoryController initialized");
    });
}(mifosX.controllers || {}));
