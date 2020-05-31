(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewOfficeController: function (scope, routeParams, route, location, resourceFactory) {
            scope.charges = [];
            
            scope.addresses=[];
            scope.view={};
            var entityname="ADDRESS";
            var subentity = "OFFICE";
            resourceFactory.officeTemplateResource.getOfficeTemplate(function (data) {
                scope.enableAddress = data.isAddressEnabled;
                if(scope.enableAddress){
                    resourceFactory.addressFieldConfiguration.get({entity:entityname, subentity: subentity},function(data){
                        for(var i=0;i<data.length;i++){
                            data[i].field='scope.view.'+data[i].field;
                            eval(data[i].field+"="+data[i].is_enabled);
                        }
                    });
                    resourceFactory.officeAddress.getAllAddresses({officeId: routeParams.id}, function(data) {
                        scope.addresses=data;
                    });
                }
            });

            resourceFactory.officeResource.get({officeId: routeParams.id}, function (data) {
                scope.office = data;
            });

            resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_office'}, function (data) {
                scope.officedatatables = data;
            });

            scope.dataTableChange = function (officedatatable) {
                resourceFactory.DataTablesResource.getTableDetails({datatablename: officedatatable.registeredTableName,
                    entityId: routeParams.id, genericResultSet: 'true'}, function (data) {
                    scope.datatabledetails = data;
                    scope.datatabledetails.isData = data.data.length > 0 ? true : false;
                    scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;
                    scope.showDataTableAddButton = !scope.datatabledetails.isData || scope.datatabledetails.isMultirow;
                    scope.showDataTableEditButton = scope.datatabledetails.isData && !scope.datatabledetails.isMultirow;
                    scope.singleRow = [];
                    for (var i in data.columnHeaders) {
                        if (scope.datatabledetails.columnHeaders[i].columnCode) {
                            for (var j in scope.datatabledetails.columnHeaders[i].columnValues) {
                                for (var k in data.data) {
                                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                                        data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                                    }
                                }
                            }
                        }
                    }
                    if (scope.datatabledetails.isData) {
                        for (var i in data.columnHeaders) {
                            if (!scope.datatabledetails.isMultirow) {
                                var row = {};
                                row.key = data.columnHeaders[i].columnName;
                                row.value = data.data[0].row[i];
                                scope.singleRow.push(row);
                            }
                        }
                    }
                });
            };

            scope.deleteAll = function (apptableName, entityId) {
                resourceFactory.DataTablesResource.delete({datatablename: apptableName, entityId: entityId, genericResultSet: 'true'}, {}, function (data) {
                    route.reload();
                });
            };

            scope.viewDataTable = function (registeredTableName, data){
                if (scope.datatabledetails.isMultirow) {
                    location.path("/viewdatatableentry/"+registeredTableName+"/"+scope.office.id+"/"+data.row[0]);
                }else{
                    location.path("/viewsingledatatableentry/"+registeredTableName+"/"+scope.office.id);
                }
            };

            scope.routeToAddAddress = function (){
                location.path("/address/offices/"+routeParams.id);
            };

            scope.changeAddressStatus=function(addressId, status) {
                var formdata = {};
                formdata.isActive=!status;
                resourceFactory.officeAddress.put({officeId:id, addressId: addressId},formdata,function(data) {
                    route.reload();
                })
            }
        }

    });
    mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', mifosX.controllers.ViewOfficeController]).run(function ($log) {
        $log.info("ViewOfficeController initialized");
    });
}(mifosX.controllers || {}));