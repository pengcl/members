"use strict";

app.controller('payStateController', ['$scope', 'ShareSvc', function ($scope, ShareSvc) {
    $scope.addOverlay = function () {
        $scope.state.overlay.open(true, $("#shareTips").html());
    };

    $scope.setShareState = function (config, id, gh, category) {
        //mobile, pid, gh, category, url
        ShareSvc.getShareUrl($scope.appAuth.receiverMobile, id, gh, category, config.url).then(function success(data) {
            if (data.resultCode === 1) {
                config.url = data.shareUrl;
                $scope.state.share.open(true, config);
                /*$scope.$emit('share', {
                    show: true,
                    config: config
                });*/
            }
        });
    }
}]);