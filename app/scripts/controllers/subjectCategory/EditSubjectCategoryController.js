(function (module) {
    mifosX.controllers = _.extend(module, {
        EditSubjectCategoryController: function (scope, routeParams, resourceFactory, location) {
            scope.formData = {};
            resourceFactory.subjectCategoryResource.get({ 'subjectCategoryId': routeParams.id }, function (data) {
                scope.formData.name = data.name;
                scope.formData.isActive = data.isActive;
            });
            
            scope.cancel = function () {
                location.path('/subjectcategory/view/' + routeParams.id);
            };

            scope.update = function () {
                resourceFactory.subjectCategoryResource.update({ 'subjectCategoryId': routeParams.id },scope.formData, function (data){
                    location.path('/subjectcategory/view/' + routeParams.id);
                });
            };
        }
    });

    mifosX.ng.application.controller('EditSubjectCategoryController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditSubjectCategoryController]).run(function ($log) {
        $log.info("EditSubjectCategoryController initialized");
    });
}(mifosX.controllers || {}));