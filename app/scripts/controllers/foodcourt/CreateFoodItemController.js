(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateFoodItemController: function (scope, resourceFactory, location) {
            scope.formData = {};

            scope.submit = function () {
                //alert(scope.formData);
                //alert(JSON.stringify(scope.formData));
                //console.log(scope.formData);
                //console.log(JSON.stringify(scope.formData));

                resourceFactory.foodItemsResource.save(scope.formData, function (data) {
                    //alert(data);
                    location.path('/fooditems');
                });
            };
        }
    });

    mifosX.ng.application.controller('CreateFoodItemController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateFoodItemController]).run(function ($log) {
        $log.info("CreateFoodItemController initialized");
    });
}(mifosX.controllers || {}));