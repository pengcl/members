appServices.factory("MessageSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    /*service.postMessage = function (receiverMobile, message) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.czHost + '/yfqcz/czInterfaceController.do?memberMessage&phoneNumber=' + receiverMobile + '&message=' + message + "&callback=JSON_CALLBACK").success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);