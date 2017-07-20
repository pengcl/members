"use strict";

app.controller('logisticsController', ['$scope', 'OrderSvc', function ($scope, OrderSvc) {
//{"邮政快递","EMS快递","顺丰快递","圆通快递","中通快递"};
    var logisticsCompany = [
        {
            "companyId": 0,
            "companyName": "邮政快递",
            "phoneNo":"11183",
            "logo": $scope.imgPath + "/logistics/0.png"
        },
        {
            "companyId": 1,
            "companyName": "EMS快递",
            "phoneNo":"11183",
            "logo": $scope.imgPath + "/logistics/1.png"
        },
        {
            "companyId": 2,
            "companyName": "顺丰快递",
            "phoneNo":"11183",
            "logo": $scope.imgPath + "/logistics/2.png"
        },
        {
            "companyId": 3,
            "companyName": "圆通快递",
            "phoneNo":"11183",
            "logo": $scope.imgPath + "/logistics/3.png"
        },
        {
            "companyId": 4,
            "companyName": "中通快递",
            "phoneNo":"11183",
            "logo": $scope.imgPath + "/logistics/4.png"
        }
    ];

    //从地址栏获取订单号
    if (getUrlParam('orderNo') != null) {
        $scope.orderNo = getUrlParam('orderNo');
    } else {
        $scope.orderNo = '';
    }

    OrderSvc.getLogistics($scope.orderNo).then(function success(data) {
        $scope.logistics = $.parseJSON(data);

        $.each(logisticsCompany,function (i,k) {//获取快递公司信息
            if(k.companyName = $scope.logistics.comName){
                $scope.logisticsCompany = k;
            }
        });
    });

}]);