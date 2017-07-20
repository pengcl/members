'use strict';

app.directive("contentScrollableScrolled", ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).bind('scroll',function (e) {
                if($(element).scrollTop() >= 32){
                    $("nav.nav").addClass("scrolled");
                }else {
                    $("nav.nav").removeClass("scrolled");
                }
            });
        }
    };
}]);