"use strict";

appServices.factory('WxSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    /*service.getWxParameter = function () {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/product/getWxParameter.html?shareUrl=" + window.location.href.split("#")[0].replace(/&/gi, "AND") + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);