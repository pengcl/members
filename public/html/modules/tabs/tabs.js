'use strict';

app.directive("appTabs", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            tabs: "="
        },
        templateUrl: "tabs/tabs.html",
        link: function (scope, element, attrs) {

        }
    };
}]);