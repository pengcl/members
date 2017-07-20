'use strict';

app.directive("appDialog", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.$root.dialog = {
                show: false,
                title: '',
                body: '',
                btnTxt: '',
                open: function (show, title, body, btnTxt) {
                    this.show = show;
                    this.title = title;
                    this.body = body;
                    this.btnTxt = btnTxt;
                },
                close: function () {
                    this.show = false;
                }
            };
        }
    };
}]);