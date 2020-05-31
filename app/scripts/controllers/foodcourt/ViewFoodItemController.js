(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewFoodItemController: function (scope, routeParams, resourceFactory, location) {
            resourceFactory.foodItemsResource.get({ 'foodItemId': routeParams.id }, function (data) {
                scope.foodItemData = data;
            });

            scope.delete=function(){
                resourceFactory.foodItemsResource.delete({ 'foodItemId': routeParams.id }, function (data) {
                    location.path('fooditems')
                });
            };

        }
    });

    mifosX.ng.application.controller('ViewFoodItemController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.ViewFoodItemController]).run(function ($log) {
        $log.info("ViewFoodItemController initialized");
    });
}(mifosX.controllers || {}));