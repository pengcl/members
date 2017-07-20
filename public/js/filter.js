'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('orderState', function () {//订单状态
    return function (type) {
        if (type == 0) {
            return "未支付";
        }
        if (type == 1) {
            return "已支付";
        }
        if (type == 2) {
            return "配送中";
        }
        if (type == 3) {
            return "受理中";
        }
        if (type == 4) {
            return "已完成";
        }
        if (type == 5) {
            return "已失效";
        }
    }
});

appFilters.filter('bankNo', function () {//订单状态
    return function (bankNo) {
        return bankNo.substr(-4);
    }
});