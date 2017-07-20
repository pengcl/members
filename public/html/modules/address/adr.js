'use strict';

app.directive("appAddress", ['$timeout', 'AddressSvc', function ($timeout, AddressSvc) {
    return {
        restrict: 'E',
        templateUrl: "address/adr.html",
        link: function (scope, element, attrs) {

            AddressSvc.getProvince().then(function success(data) {//页面载入时获取[{省}]数据
                scope.$root.inputPickerData = {
                    tag: 'address',
                    data: data
                };
            });

            scope.setPickerShow = function () {//设置是否显示picker控件
                scope.$root.isPickerShow = true;
            };

            scope.$watch('outputPickerData', function (n, o, scope) {//监听picker控件传出的值{name<string>,value<string>}
                if (n !== o && n != undefined) {

                    if (n.tag !== 'address') {
                        return false;
                    }

                    if (n.data.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                        scope.userInfo.address.province = n.data.value;
                        AddressSvc.getCity(n.data.value).then(function success(data) {
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                        scope.userInfo.address.city = n.data.value;
                        AddressSvc.getDistrict(scope.userInfo.address.province, n.data.value).then(function success(data) {
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                        scope.$root.isPickerShow = false;//隐藏picker空间
                        scope.userInfo.address.district = n.data.value;//设置district值
                        AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                }
            }, true);

            scope.$watch('userInfo.address', function (n, o, scope) {
                $timeout(function () {
                    if (scope.newAddressForm.receiverProvince.$valid && scope.newAddressForm.receiverCity.$valid && scope.newAddressForm.receiverDistrict.$valid) {
                        scope.receiverAddress = scope.userInfo.address.province + scope.userInfo.address.city + scope.userInfo.address.district;
                    }
                });
            }, true);
        }
    };
}]);