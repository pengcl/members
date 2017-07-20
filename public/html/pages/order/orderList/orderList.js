"use strict";

app.controller('orderListController', ['$scope', 'OrderSvc', '$location', function ($scope, OrderSvc, $location) {

    OrderSvc.getOrderList('15013262507','').then(function success(data) {
        $scope.orderList = data;
    });
}]);