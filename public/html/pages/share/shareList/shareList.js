"use strict";

app.controller('shareListController', ['$scope', 'ShareSvc', function ($scope, ShareSvc) {
    ShareSvc.getShareProduct($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.products = data;
    });

    $scope.showShare = function (show, config) {
        $scope.state.share.open(true, config);
        /*$scope.$emit('share', {
            show: true,
            config: share //配置 share.config
        });*/
    };

}]);