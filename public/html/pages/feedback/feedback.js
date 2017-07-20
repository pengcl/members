"use strict";

app.controller('feedbackController', ['$scope', 'MessageSvc', function ($scope, MessageSvc) {
    $scope.feedback = "";
    $scope.postMessage = function (receiverMobile, feedback) {
        MessageSvc.postMessage(receiverMobile, feedback).then(function success(data) {
            if (data.success) {
                $scope.dialog.open(true, '系统提示', '反馈成功提交，请耐心等待回复', ['我知道了','']);
                $scope.feedback = "";
                history.back();
            } else {
                $scope.dialog.open(true, '系统提示', data.msg, ['我知道了','']);
            }
        });
    }
}]);