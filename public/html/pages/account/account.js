"use strict";

app.controller('accountController', ['$scope', '$cookieStore', '$window', 'UserSvc', function ($scope, $cookieStore, $window, UserSvc) {

    $scope.tab = 'income';

    $scope.setTab = function (tab) {
        $scope.tab = tab;
    };

    UserSvc.getMembers().then(function success(data) {
        console.log(data);
        $scope.members = data;
    });

    $scope.logout = function () {
        $cookieStore.remove('appAuth');
        $window.location.href = "/userController/login.html?openid=" + $scope.$root.appAuth.weiXinData.openid;
    }
}]);