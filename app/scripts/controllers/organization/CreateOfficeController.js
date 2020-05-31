(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateOfficeController: function (scope, resourceFactory, location, dateFilter) {
            scope.offices = [];
            scope.first = {};
            scope.first.date = new Date();
            scope.restrictDate = new Date();

            scope.enableAddress = false;
            var entityname = "ADDRESS";
            var subentity = "OFFICE";
            scope.addressArray = [];

            resourceFactory.officeTemplateResource.getOfficeTemplate(function (data) {
                scope.offices = data.allowedParents;
                scope.formData = {
                    parentId: scope.offices[0].id
                }
                scope.enableAddress = data.isAddressEnabled;
                if(scope.enableAddress){
                    scope.addressTypes = data.address.addressTypeIdOptions;
                    scope.countryOptions = data.address.countryIdOptions;
                    scope.stateOptions = data.address.stateProvinceIdOptions;
                    resourceFactory.addressFieldConfiguration.get({entity:entityname, subentity: subentity},function(data){
                        for(var i=0;i<data.length;i++){
                            data[i].field='scope.'+data[i].field;
                            eval(data[i].field+"="+data[i].is_enabled);
                        }
                    });
                }
            });

            

            scope.addAddress = function(){
                scope.addressArray.push({});
            };


            scope.removeAddress = function(index){
                scope.addressArray.splice(index,1);
            };

            scope.submit = function () {
                if(scope.enableAddress===true)
                {
                    scope.formData.address=[];

                    for(var i=0;i<scope.addressArray.length;i++)
                    {
                        var temp=new Object();
                        if(scope.addressArray[i].addressTypeId)
                        {
                            temp.addressTypeId=scope.addressArray[i].addressTypeId;
                        }
                        if(scope.addressArray[i].street)
                        {
                            temp.street=scope.addressArray[i].street;
                        }
                        if(scope.addressArray[i].addressLine1)
                        {
                            temp.addressLine1=scope.addressArray[i].addressLine1;
                        }
                        if(scope.addressArray[i].addressLine2)
                        {
                            temp.addressLine2=scope.addressArray[i].addressLine2;
                        }
                        if(scope.addressArray[i].addressLine3)
                        {
                            temp.addressLine3=scope.addressArray[i].addressLine3;
                        }
                        if(scope.addressArray[i].townVillage)
                        {
                            temp.townVlage=scope.addressArray[i].townVillage;
                        }
                        if(scope.addressArray[i].city)
                        {
                            temp.city=scope.addressArray[i].city;
                        }
                        if(scope.addressArray[i].countyDistrict)
                        {
                            temp.countyDistrict=scope.addressArray[i].countyDistrict;
                        }
                        if(scope.addressArray[i].countryId)
                        {
                            temp.countryId=scope.addressArray[i].countryId;
                        }
                        if(scope.addressArray[i].stateProvinceId)
                        {
                            temp.stateProvinceId=scope.addressArray[i].stateProvinceId;
                        }
                        if(scope.addressArray[i].postalCode)
                        {
                            temp.postalCode=scope.addressArray[i].postalCode;
                        }
                        if(scope.addressArray[i].latitude)
                        {
                            temp.latitude=scope.addressArray[i].latitude;
                        }
                        if(scope.addressArray[i].longitude)
                        {
                            temp.longitude=scope.addressArray[i].longitude;
                        }
                        if(scope.addressArray[i].isActive)
                        {
                            temp.isActive=scope.addressArray[i].isActive;

                        }
                        if(_.isUndefined(temp.isActive)){
                            temp.isActive = false;
                        }
                        this.formData.address.push(temp);
                    }
                }
                this.formData.locale = scope.optlang.code;
                var reqDate = dateFilter(scope.first.date, scope.df);
                this.formData.dateFormat = scope.df;
                this.formData.openingDate = reqDate;
                resourceFactory.officeResource.save(this.formData, function (data) {
                    location.path('/viewoffice/' + data.resourceId);
                });
            };
        }
    });
    mifosX.ng.application.controller('CreateOfficeController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.CreateOfficeController]).run(function ($log) {
        $log.info("CreateOfficeController initialized");
    });
}(mifosX.controllers || {}));
