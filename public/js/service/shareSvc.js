"use strict";

appServices.factory('ShareSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    /*service.config = {
        title: '翼分期商城 - 会员中心',
        desc: '翼分期商城 - 流量话费充值平台',
        summary: '流量话费充值平台',
        site: 'app.yfq.cn',
        pic: '',
        url: 'http://' + window.location.host + '/userController/index.html'
    };

    service.getShareUrl = function (mobile, pid, gh, category, url) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/share/doProductShare.html?mobile=" + mobile + "&pid=" + pid + "&gh=" + gh + "&category=" + category + "&productUrl=" + url + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getShareProduct = function (mobile) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/share/findProductShareInfo.html?mobile=" + mobile + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);