'use strict';

app.directive("appOverlay", ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "overlay/overlay.html",
        replace: true,
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.removeOverlay = function () {
                scope.state.overlay.open(false);
            };
        }
    };
}]);