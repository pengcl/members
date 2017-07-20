"use strict";

appServices.factory('UserSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.getMembers = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get('/mock-data/members.json').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);