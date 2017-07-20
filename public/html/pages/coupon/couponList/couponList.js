"use strict";

app.controller('couponListController', ['$scope', '$stateParams', '$location', '$filter', 'CouponSvc', function ($scope, $stateParams, $location, $filter, CouponSvc) {
    $scope.isUsed = $stateParams.isUsed;
    $scope.isOverdue = $stateParams.isOverdue;

    CouponSvc.getCouponList($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.couponList = $filter('filter')(data.couponList, {isUsed: $scope.isUsed, isOverdue: $scope.isOverdue});
    });
}]);