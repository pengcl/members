appServices.factory('accountSvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.getUserAccount = function (mobile) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/findAccountInfo.html?mobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBanks = function (accountId) {

        var d = $q.defer();
        $http.get('/mock-data/banks.json').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.recharge = function (mobile, amount) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/doAccountConsum.html?accountId=1&amount=' + amount + '&type=1&rechargeMobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.refund = function (accountId, amount) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/doAccountConsum.html?accountId=' + accountId + '&amount=' + amount + '&type=0&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getUserAccountLog = function (mobile) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/findAccountLogInfo.html?mobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);