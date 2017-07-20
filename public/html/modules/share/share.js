'use strict';

app.directive("appShare", ['ShareSvc', function (ShareSvc) {
    return {
        restrict: 'E',
        templateUrl: "share/share.html",
        link: function (scope, element, attrs) {
            scope.hideShare = function () {
                scope.state.share.open(false)
            };
        }
    };
}]);