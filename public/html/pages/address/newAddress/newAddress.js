"use strict";

app.controller('newAddressController', ['$scope', 'UserSvc', function ($scope, UserSvc) {

    //$scope.$root.toast.open(true);

    $scope.userInfo = {//初始化用户对象
        name: '',
        mobile: '',
        address: {
            id: '',
            province: '',
            city: '',
            district: '',
            room: '',
            isDefault: true
        }
    };

    $scope.checkAddress = function () {
        if (!$scope.newAddressForm.receiverName.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入收件人'});
            //alert("请输入收件人");
            //$(".input-name").addClass("weui-cell_warn");
        } else if (!$scope.newAddressForm.receiverMobile.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入联系电话'});
            //alert("请输入联系电话");
            //$(".input-mobile").addClass("weui-cell_warn");
        } else if (!$scope.newAddressForm.receiverCity.$valid) {
            $scope.$emit('notification', {show: true, content: '请选择收件区域'});
            //$(".input-city").addClass("weui-cell_warn");
            //alert("请选择收件区域");
        } else if (!$scope.newAddressForm.receiverRoom.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入详细地址'});
            //$(".input-room").addClass("weui-cell_warn");
            //alert("请输入详细地址");
        }
    };

    $scope.saveUser = function (isValid) {
        if (!isValid) {
            $scope.checkAddress();
            return false;
        }
        UserSvc.putUserInfo($scope.userInfo.name, $scope.userInfo.mobile, $scope.userInfo.address.id, $scope.userInfo.address.province + $scope.userInfo.address.city + $scope.userInfo.address.district, $scope.userInfo.address.room, $scope.userInfo.address.isDefault, 0).then(function success(data) {
            if (data.success) {
                history.back();
            } else {
                $scope.$root.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            }
        });
    };
}]);