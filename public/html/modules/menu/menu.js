'use strict';

app.directive("appMenu", ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "menu/menu.html",
        link: function (scope, element, attrs) {
        }
    };
}]);