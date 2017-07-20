"use strict";

app.controller('mktFlowController', ['$scope', '$cookieStore', 'MarketSvc', function ($scope, $cookieStore, MarketSvc) {

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobile = $cookieStore.get('rechargeMobile');
    } else {
        if ($scope.appAuth) {
            $scope.mobile = $scope.appAuth.receiverMobile;
        }
    }

    /*$scope.getFlows = function (mobile) {
        MarketSvc.getFlows(mobile).then(function success(data) {
            console.log(data);
            $scope.regionProducts = data.regionProducts;
        });
    };*/

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        alert('还没下单接口');
        $scope.state.overlay.open(true, $("#paySuccess").html());
    };

    $scope.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode) {
console.log(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode);
        MarketSvc.pay(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                console.log(data.payUrl);
                window.location.href = data.payUrl;
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        if (n) {
            $cookieStore.put('rechargeMobile', n);
            MarketSvc.getFlows(n).then(function success(data) {
                console.log(data);
                $scope.listData = data;
            });
        }
    });

}]);