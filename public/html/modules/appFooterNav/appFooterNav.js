'use strict';

app.directive("appFooterNav", ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "appFooterNav/appFooterNav.html",
        link: function (scope, element, attrs) {
        }
    };
}]);