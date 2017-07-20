"use strict";

app.controller('choppingCartController', ['$scope', 'OrderSvc', function ($scope, OrderSvc) {

    OrderSvc.getOrderList('15013262507', '').then(function success(data) {
        $scope.orderList = data;
    });
}]);