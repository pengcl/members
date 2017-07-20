"use strict";

app.controller('refundController', ['$scope', 'UserSvc', 'accountSvc', function ($scope, UserSvc, accountSvc) {

    /*UserSvc.getUserAccount('15013262507').then(function success(data) {
        $scope.userAccount = data;
    });*/

    $scope.total = 999;

    $scope.showBanks = function () {
        accountSvc.getBanks().then(function success(data) {
            $scope.banks = data;
        });
        $scope.isPickerShow = true;
    };

    $scope.withdrawal = function (checked, id, amount) {
        if (checked) {
            $scope.dialog.open(true, '系统提示', '您的申请已提交成功', ['我知道了', '']);
            /*UserSvc.withdrawal(id, amount).then(function success(data) {
                $scope.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            });*/
        } else {
            $scope.dialog.open(true, '系统提示', '请输入提现金额', ['我知道了', '']);
        }
    };

    //$scope.showWaitingIcon = false;//是否等待数据

    $scope.setBank = function (bank) {//选定数据
        $scope.bank = bank;
        $scope.isPickerShow = false;
    };

}]);