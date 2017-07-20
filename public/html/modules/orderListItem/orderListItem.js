'use strict';

app.directive("orderListItem", ['PaySvc', function (PaySvc) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            orderListItem: '='
        },
        templateUrl: "orderListItem/orderListItem.html",
        link: function (scope, element, attrs) {
            scope.dialog = function (show, title, body, btnTxt) {
                scope.$root.dialog.open(show, title, body, btnTxt);
            };
            scope.setCertification = function (e) {
                if (scope.$root.appAuth.isWeiXin) {

                } else {
                    e.preventDefault();
                    var _body = '<img width="50%" src="/templates/fenxiao/pages/member/public/images/qrcode.jpg"><br><p>请长按上图二维码，进入公众号实名认证。</p>';
                    scope.$root.dialog.open(true, '实名认证', _body, ['我知道了','']);
                }
            };
            scope.buyNow = function (orderId, frompage, orderNo) {
                scope.$root.loadingToast.open(true);
                PaySvc.pay(orderId).then(function success(data) {
                    if (data == "allow") {
                        if (frompage == 'jikaNew.html' || frompage == 'jktchd' || frompage == 'jktchdd') {
                            //window.location.href="http://app.yfq.cn/payment?orderNo="+orderNo;
                            window.location.href = "/wap/payment/payView.html?orderNo=" + orderNo;
                        } else {
                            window.location.href = "/wap/taokafanghaoNew/checkData.html?orderId=" + orderId;
                        }

                    } else//错误信息
                    {
                        scope.$root.loadingToast.open(false);
                        scope.$root.dialog.open(true, '系统提示', data, ['我知道了','']);
                    }
                });
            };
        }
    };
}]);