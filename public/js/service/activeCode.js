"use strict";

appServices.factory('ActiveCodeSvc', ['$resource', '$q', '$http', function ($resource, $q, $http) {
    var service = {};

    /*service.getActiveCode = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/wap/customer/getMobileCodeSync.html?reciverMoblie=' + receiverMobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);