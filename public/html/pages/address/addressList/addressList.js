"use strict";

app.controller('addressListController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    //$scope.$root.toast.open(true);
    $scope.userAddresses = [];
    var users = [];
    UserSvc.getUserInfo($scope.$root.appAuth.receiverMobile).then(function success(data) {
        if (data.result) {
            $.each(data.result, function (i, k) {
                var user = {
                    name: k.memberName,
                    mobile: k.recieverPhone,
                    address: {
                        id: k.id,
                        province: '',
                        city: k.city,
                        district: '',
                        room: k.city,
                        receiverAddress: k.recieverAddress,
                        isDefault: k.isDefault
                    }
                };
                users.push(user);
            });
            $scope.userAddresses = users;
        }
    });

    $scope.updateAddress = function (address, isDefault, isDel) {
        if (isDel === 1) {
            var users = [];
            $.each($scope.userAddresses, function (i, k) {
                if (address.address.id !== k.address.id) {
                    var user = {
                        name: k.name,
                        mobile: k.mobile,
                        address: {
                            id: k.address.id,
                            province: k.address.province,
                            city: k.address.city,
                            district: '',
                            room: k.address.room,
                            receiverAddress: k.address.receiverAddress,
                            isDefault: k.address.isDefault
                        }
                    };
                    users.push(user);
                }
            });
            $scope.userAddresses = users;
        }
        UserSvc.putUserInfo(address.name, address.mobile, address.address.id, address.address.province + address.address.city, address.address.room, isDefault, isDel).then(function success(data) {
            if (data.success) {
                $scope.$root.toast.open(true);
            } else {
                $scope.$root.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            }
        });
    };

    $scope.back = function () {
        history.back();
    }
}]);