"use strict";

app.controller('billController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    $scope.tabs = [
        {
            "name": "充值",
            "count":"2",
            "target": ""
        },
        {
            "name": "消费",
            "count":"7",
            "target": ""
        },
        {
            "name": "提现",
            "count":"5",
            "target": ""
        },
        {
            "name": "转账",
            "count":"1",
            "target": ""
        }
    ]
}]);