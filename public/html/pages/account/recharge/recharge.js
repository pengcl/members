"use strict";

app.controller('rechargeController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    $scope.recharge = function (checked, mobile, amount) {
        if (checked) {
            UserSvc.recharge(mobile, amount).then(function success(data) {
                $scope.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            });
        } else {
            $scope.dialog.open(true, '系统提示', '请输入充值金额', ['我知道了', '']);
        }
    };
}]);