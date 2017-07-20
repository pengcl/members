appServices.factory("AddressSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    /*service.getProvince = function () {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "province",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getCity = function (province) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "city",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getDistrict = function (province, city) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "district",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);