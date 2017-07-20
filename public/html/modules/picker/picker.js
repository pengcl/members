'use strict';

/*

inputData = {
tag:String,
data:Object[]
}

outputData = {
tag: String,
data: Object
}

isShow = bool;

 */

app.directive("appPicker", [function () {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            isShow: '='
        },
        templateUrl: "picker/picker.html",
        link: function (scope, element, attrs) {

            scope.showWaitingIcon = false;//是否等待数据

            scope.setPicker = function (picker) {//选定数据
                scope.outputData = picker;
            };

            scope.setPickerHide = function (state) {//设置隐藏显示picker状态
                scope.isPickerShow = false;
            };
        }
    };
}]);