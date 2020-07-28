(function (module) {
    mifosX.controllers = _.extend(module, {
        SubjectCategoryController: function (scope, resourceFactory, location) {
            
            resourceFactory.subjectCategoryResource.getAll(function (data) {
                scope.subjectCategoriesData = data ;
            });

            scope.routeTo=function(id){
                location.path('/subjectcategory/view/'+id);
            }
        }
    });

    mifosX.ng.application.controller('SubjectCategoryController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.SubjectCategoryController]).run(function ($log) {
        $log.info("SubjectCategoryController initialized");
    });
}(mifosX.controllers || {}));
