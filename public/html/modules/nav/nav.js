'use strict';

app.directive("appNav", ['$location', function ($location) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "nav/nav.html",
        link: function (scope, element, attrs) {

            var $contentContainer = $("#content-container");

            scope.navItem = JSON.parse(attrs.navItem);
            scope.$root.title = scope.navItem.title;

            scope.back = function () {
                if (scope.navItem.backUrl) {
                    $location.path(scope.navItem.backUrl);
                } else {
                    history.back();
                }
                $contentContainer.addClass('ng-back');
                scope.$emit('viewBack', 'ng-back');
            };

            scope.getBill = function (mobile) {
                scope.$emit('navEvent', {navType: 'bill', mobile: mobile});
            }


            /*scope.$on('$destroy', function() {
                console.log("destroy");
            });*/
        }
    };
}]);