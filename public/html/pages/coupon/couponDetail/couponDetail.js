"use strict";

app.controller('couponDetailController', ['$scope', '$stateParams', 'CouponSvc', 'UserAgentSvc', function ($scope, $stateParams, CouponSvc, UserAgentSvc) {
    $scope.couponNo = $stateParams.couponNo;
    CouponSvc.getCouponDetail($scope.appAuth.receiverMobile, $scope.couponNo).then(function success(data) {
        $scope.coupon = data;
    });

    $scope.showShare = function (isUsed, isOverdue) {
        if (isUsed == 1) {
            $scope.state.notification.open(true, '此优惠券已使用，无法分享');
            return false;
        }
        if (isOverdue == 1) {
            $scope.state.notification.open(true, '此优惠券已过期，无法分享');
            return false;
        }

        //do something
    };

    $scope.useCoupon = function (e, isUsed, isOverdue) {
        if (isUsed == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已使用，无法分享');
            return false;
        }
        if (isOverdue == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已过期，无法分享');
            return false;
        }

        //do something
    };
}]);