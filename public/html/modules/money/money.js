app.directive('money', [function () {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            ctrl.$parsers.push(function (viewValue) {
                var refundValue = parseInt(viewValue),
                    totalValue = parseInt(attrs.maxValue);

                if (refundValue <= totalValue && refundValue > 0) {
                    ctrl.$setValidity('money', true);
                } else {
                    ctrl.$setValidity('money', false);
                }
                return refundValue;
            });
        }
    }
}]);