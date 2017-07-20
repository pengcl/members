"use strict";

app.controller('mktFlowListController', ['$scope', '$stateParams', 'MarketSvc', function ($scope, $stateParams, MarketSvc) {

    $scope.mobile = $stateParams.mobile;

    $scope.selectedProd = function (product) {
        $scope.product = product;
    };

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        alert([$scope.product.productId, $scope.regionProduct.productFlowPriceId]);
        $scope.state.overlay.open(true, $("#paySuccess").html());
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        if (n) {
            MarketSvc.getFlows(n).then(function success(data) {
                $scope.listData = data;
            });
        }
    });
}]);