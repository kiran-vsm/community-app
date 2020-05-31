(function (module) {
    mifosX.controllers = _.extend(module, {
        EditFoodItemController: function (scope, routeParams, resourceFactory, location) {
            scope.foodItemId = routeParams.id;
            scope.formData = {};
            resourceFactory.foodItemsResource.get({ 'foodItemId': routeParams.id }, function (data) {
                scope.formData.item = data.item;
                scope.formData.price = data.price;
            });
            
            scope.cancel = function () {
                location.path('/fooditems/view/' + routeParams.id);
            };

            scope.update = function () {
                resourceFactory.foodItemsResource.update({ 'foodItemId': routeParams.id },scope.formData, function (data){
                    location.path('/fooditems/view/' + routeParams.id);
                });
            };
        }
    });

    mifosX.ng.application.controller('EditFoodItemController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditFoodItemController]).run(function ($log) {
        $log.info("EditFoodItemController initialized");
    });
}(mifosX.controllers || {}));