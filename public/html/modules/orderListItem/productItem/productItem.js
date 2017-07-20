'use strict';

app.directive("productItem", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            productItem: '=',
            totalAmount: '=',
            buyMobile: '='
        },
        templateUrl: "orderListItem/productItem/productItem.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
