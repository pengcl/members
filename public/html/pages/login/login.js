"use strict";

app.controller('loginController', ['$scope', '$location', '$cookieStore', 'AuthenticationSvc', function ($scope, $location, $cookieStore, AuthenticationSvc) {

    $scope.pageName = "login";

    $scope.login = function (receiverMobile, code) {
        if (checkMobileCode(receiverMobile, code)) {
            AuthenticationSvc.binding(receiverMobile).then(function success(data) {
                if (data.resultCode === 1) {
                    $scope.$root.appAuth = data;
                    $scope.$root.appAuth.isLogin = true;
                    $cookieStore.put('appAuth', $scope.$root.appAuth);
                    $location.path('appBody');
                }
            });
        } else {
            $scope.dialog.open(true, '系统提示', '您的验证码不正确，请重新输入！', ['我知道了','']);
        }
    }
}]);