'use strict';

app.directive("appActiveCode", ['$interval', 'ActiveCodeSvc', function ($interval, ActiveCodeSvc) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "activeCode/activeCode.html",
        link: function (scope, element, attrs) {
            scope.activeText = "获取验证码";
            scope.activeClass = true;

            var second = 59, timePromise = undefined;
            scope.getActiveCode = function (e, receiverMobile) {
                if ($(e.currentTarget).hasClass("disabled")) {
                    return false;
                }
                scope.loadingToast.open(true);
                ActiveCodeSvc.getActiveCode(receiverMobile).then(function success(data) {
                    if (data == "") {
                        scope.activeClass = false;
                        scope.loadingToast.open(false);
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.activeText = "重发验证码";
                                scope.activeClass = true;
                            } else {
                                scope.activeText = second + "秒后可重发";
                                scope.activeClass = false;
                                second--;

                            }
                        }, 1000, 100);
                    }
                });
            };
        }
    };
}]);
