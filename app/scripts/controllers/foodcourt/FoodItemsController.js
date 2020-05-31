(function (module) {
    mifosX.controllers = _.extend(module, {
        FoodItemsController: function (scope, resourceFactory, location) {

            resourceFactory.foodItemsResource.getAll(function (data) {
                scope.foodItemsData = data ;
            });

            scope.routeTo=function(id){
                location.path('/fooditems/view/'+id);
            }
        }
    });

    mifosX.ng.application.controller('FoodItemsController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.FoodItemsController]).run(function ($log) {
        $log.info("FoodItemsController initialized");
    });
}(mifosX.controllers || {}));