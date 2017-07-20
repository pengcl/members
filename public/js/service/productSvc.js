appServices.factory("ProductSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getProducts = function () {//获取订单统计 promise对象
            var d = $q.defer();
            $http.get('/mock-data/products.json').success(function (data) {
                return d.resolve(data);
            }).error(function (error) {
                d.reject(error);
            });
            return d.promise;
        };

    return service;
}]);