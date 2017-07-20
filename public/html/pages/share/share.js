"use strict";

app.controller('shareController', ['$scope', 'UserSvc', 'ShareSvc', function ($scope, UserSvc, ShareSvc) {

    UserSvc.getUserAccount($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.userAccount = data;
    });

    ShareSvc.getShareProduct($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.products = data;
    });

    $scope.recharge = function (mobile) {
        UserSvc.recharge(mobile).then(function success(data) {
            console.log(data);
        });
    };

    $scope.withdrawal = function (id) {
        UserSvc.withdrawal(id).then(function success(data) {
            console.log(data);
        });
    };

    $scope.showMoneyTips = function () {
        $scope.state.overlay.open(true, $("#moneyTips").html());
    }
}]);