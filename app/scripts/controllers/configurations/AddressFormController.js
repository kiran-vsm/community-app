 (function (module) {
    mifosX.controllers = _.extend(module, {
        AddressFormController: function ($scope, resourceFactory, routeParams, location) {
            $scope.formData={};
            $scope.formData.isActive=false;
            $scope.addressTypes=[];
            $scope.countryOptions=[];
            $scope.stateOptions=[];
            var entityname="ADDRESS";
            var subentity = "CLIENT";
            $scope.editable=false;
            var clientId = undefined;
            var officeId = undefined;

            if(!_.isUndefined(routeParams.subentity) && routeParams.subentity=='offices'){
                subentity = 'OFFICE';
                officeId = routeParams.id;
                resourceFactory.officeAddressTemplate.template({officeId: officeId},function(template){
                    addressTemplate(template);
                });
            }else{
                clientId = routeParams.id;
                resourceFactory.clientaddressFields.get(function(template){
                    addressTemplate(template);
                });
            }

            function addressTemplate(template){
                $scope.addressTypes=template.addressTypeIdOptions;
                $scope.countryOptions=template.countryIdOptions;
                $scope.stateOptions=template.stateProvinceIdOptions;
            }

            $scope.viewFields = {};
            resourceFactory.addressFieldConfiguration.get({entity:entityname, subentity: subentity},function(data){
                for(var i=0;i<data.length;i++){
                    data[i].field='$scope.viewFields.'+data[i].field;
                    eval(data[i].field+"="+data[i].is_enabled);
                }
            })

            $scope.routeTo = function(){
                if(!_.isUndefined(officeId)){
                    location.path('/viewoffice/'+officeId);
                }else{
                    location.path('/viewclient/'+clientId);
                }
            }

          

            $scope.isEditRequired=function(){
                resourceFactory.clientAddress.get({type:$scope.formData.addressTypeId,clientId:routeParams.id,status:true},function(data){
                    if(data[0]){      // index is added just to sense whether it is empty or contains data    
                        $scope.editable=true;
                    } else {
                        $scope.editable=false;
                    }
                })
            }

            $scope.updateaddress=function(){
                $scope.formData.locale="en";
                resourceFactory.clientAddress.put({'clientId': routeParams.id,'type':$scope.formData.addressTypeId},$scope.formData,function (data) {
                    $scope.routeTo();
                });
            }

            $scope.submit = function () {
                $scope.formData.locale="en";
                if(!_.isUndefined(officeId)){
                    resourceFactory.officeAddress.save({'officeId': routeParams.id,'type':$scope.formData.addressTypeId},$scope.formData,function (data) {
                        $scope.routeTo();
                    });
                }else{
                    resourceFactory.clientAddress.save({'clientId': routeParams.id,'type':$scope.formData.addressTypeId},$scope.formData,function (data) {
                        $scope.routeTo();
                    });
                }
               
            };
        }


    });
    mifosX.ng.application.controller('AddressFormController', ['$scope','ResourceFactory', '$routeParams', '$location', mifosX.controllers.AddressFormController]).run(function ($log) {
        $log.info("AddressFormController initialized");
    });

}
(mifosX.controllers || {}));