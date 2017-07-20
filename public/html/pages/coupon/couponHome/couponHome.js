"use strict";

app.controller('couponHomeController', ['$scope', 'CouponSvc', function ($scope, CouponSvc) {
    CouponSvc.getCouponList($scope.$root.appAuth.receiverMobile).then(function success(data) {
        $scope.couponList = data;
    });
}]);