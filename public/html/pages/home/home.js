"use strict";

app.controller('homeController', ['$scope', 'ProductSvc', function ($scope, ProductSvc) {
    $scope.imgUrls = [];

    for (var i = 1; i <= 3; i++) {
        $scope.imgUrls.push($scope.imgPath + '/ad-' + i + '.jpg');
    }

    ProductSvc.getProducts().then(function success(data) {
        console.log(data);
        $scope.products = data;
    });

    /*OrderSvc.getCounts($scope.$root.appAuth.receiverMobile).then(function success(data) {
        $scope.orderStatusCounts = $.parseJSON(data);
    });*/

    /*UserSvc.getUserInfo($scope.$root.appAuth.receiverMobile).then(function success(data) {
        if(data.result){
            var addressIndex = getIndex(data.result, 'isDefault', true);
            $scope.address = data.result[addressIndex];
        }
    });*/

}]);