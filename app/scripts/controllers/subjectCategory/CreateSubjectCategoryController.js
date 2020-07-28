(function (module){
    mifosX.controllers = _.extend(module, {
        CreateSubjectCategoryController: function(scope, resourceFactory, location){
            scope.formData = {};
            scope.formData.isActive = true;
            
            scope.submit = function(){
                resourceFactory.subjectCategoryResource.save(scope.formData, function(data){
                    location.path('/subjectcategory/view/'+data.resourceId);
                });
            };
        }
    });
    mifosX.ng.application.controller('CreateSubjectCategoryController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateSubjectCategoryController]).run(function ($log) {
        $log.info("CreateSubjectCategoryController initialized");
    });
}(mifosX.controllers || {}));