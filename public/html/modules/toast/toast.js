'use strict';

app.directive("appToast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "toast/toast.html",
        link: function (scope, element, attrs) {
            scope.$root.toast = {
                show: false,
                open: function (type) {
                    this.show = type;
                    $timeout(function () {
                        scope.$root.toast.show = false;
                    }, 2000);
                },
                openUnLimit: function (type) {
                    this.show = type;
                }
            };

            scope.$root.loadingToast = {
                show: false,
                open: function (type) {
                    this.show = type;
                    $timeout(function () {
                        scope.$root.loadingToast.show = false;
                    }, 2000);
                },
                openUnLimit: function (type) {
                    this.show = type;
                }
            };
        }
    };
}]);