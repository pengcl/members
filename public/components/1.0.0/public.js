'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']).controller('appController', ['$scope', function ($scope) {

    $scope.imgPath = '/images';

    $scope.isPickerShow = false;

}]);
//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

//获取地址栏参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
};

$(document).ready(function () {
    var $container = $("#container");
    $("html").css("font-size", ($container.width() / 375) * parseInt($("html").css("font-size")));
});
'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('orderState', function () {//订单状态
    return function (type) {
        if (type == 0) {
            return "未支付";
        }
        if (type == 1) {
            return "已支付";
        }
        if (type == 2) {
            return "配送中";
        }
        if (type == 3) {
            return "受理中";
        }
        if (type == 4) {
            return "已完成";
        }
        if (type == 5) {
            return "已失效";
        }
    }
});

appFilters.filter('bankNo', function () {//订单状态
    return function (bankNo) {
        return bankNo.substr(-4);
    }
});
var appServices = angular.module('appServices', ['ngResource']);
appServices.factory('accountSvc', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.getUserAccount = function (mobile) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/findAccountInfo.html?mobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getBanks = function (accountId) {

        var d = $q.defer();
        $http.get('/mock-data/banks.json').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.recharge = function (mobile, amount) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/doAccountConsum.html?accountId=1&amount=' + amount + '&type=1&rechargeMobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.refund = function (accountId, amount) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/doAccountConsum.html?accountId=' + accountId + '&amount=' + amount + '&type=0&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getUserAccountLog = function (mobile) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/share/findAccountLogInfo.html?mobile=' + mobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
"use strict";

appServices.factory('ActiveCodeSvc', ['$resource', '$q', '$http', function ($resource, $q, $http) {
    var service = {};

    /*service.getActiveCode = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/wap/customer/getMobileCodeSync.html?reciverMoblie=' + receiverMobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);
appServices.factory("AddressSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    /*service.getProvince = function () {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=province&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "province",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getCity = function (province) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=city&province=" + encodeURI(province) + "&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "city",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getDistrict = function (province, city) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/wap/comm/czCommonController/getRegion.html?need=district&province=" + encodeURI(province) + "&city=" + encodeURI(city) + "&key=" + new Date()).success(function (data) {
            var _data = [];
            $.each(eval(data), function (i, k) {
                _data.push(
                    {
                        name: "district",
                        value: k.name
                    }
                );
            });
            return d.resolve(_data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);
appServices.factory("AuthenticationSvc", ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
    var service = {};

    return service;
}]);
appServices.factory("CouponSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    return service;
}]);
appServices.factory("MessageSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    /*service.postMessage = function (receiverMobile, message) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.jsonp(apiConfig.czHost + '/yfqcz/czInterfaceController.do?memberMessage&phoneNumber=' + receiverMobile + '&message=' + message + "&callback=JSON_CALLBACK").success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);
appServices.factory("OrderSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCounts = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findOrderStatusCounts.html?receiverMobile=' + receiverMobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderList = function (receiverMobile, orderStatus) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.jsonp('http://m.yfq.cn/product/searchOrders.html?receiverMobile=' + receiverMobile + '&orderStatus=' + orderStatus + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getLogistics = function (orderNo) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findLogistics.html?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
appServices.factory("PaySvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    return service;
}]);
appServices.factory("ProductSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getProducts = function () {//获取订单统计 promise对象
            var d = $q.defer();
            $http.get('/mock-data/products.json').success(function (data) {
                return d.resolve(data);
            }).error(function (error) {
                d.reject(error);
            });
            return d.promise;
        };

    return service;
}]);
"use strict";

appServices.factory('ShareSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    /*service.config = {
        title: '翼分期商城 - 会员中心',
        desc: '翼分期商城 - 流量话费充值平台',
        summary: '流量话费充值平台',
        site: 'app.yfq.cn',
        pic: '',
        url: 'http://' + window.location.host + '/userController/index.html'
    };

    service.getShareUrl = function (mobile, pid, gh, category, url) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/share/doProductShare.html?mobile=" + mobile + "&pid=" + pid + "&gh=" + gh + "&category=" + category + "&productUrl=" + url + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getShareProduct = function (mobile) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/share/findProductShareInfo.html?mobile=" + mobile + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);
appServices.factory("UserAgentSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    var av = navigator.appVersion;//window.navigator 对象包含有关访问者浏览器的信息。
    var ua = navigator.userAgent;

    var getPlatform = function () {//获取手机平台
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
            return "iPhone"
        }
        return "Android"
    };

    var checkWx = function () {//检查是否微信
        var a = av.toLowerCase();
        if (a.match(/MicroMessenger/i) == "micromessenger") {
            return true
        } else {
            return false
        }
    };

    service.isWx = checkWx();
    service.platform_os = getPlatform();

    return service;
}]);
"use strict";

appServices.factory('UserSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.getMembers = function () {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get('/mock-data/members.json').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);
"use strict";

appServices.factory('WxSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    /*service.getWxParameter = function () {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + "/product/getWxParameter.html?shareUrl=" + window.location.href.split("#")[0].replace(/&/gi, "AND") + "&callback=JSON_CALLBACK").success(function (data, status, headers, config) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };*/

    return service;
}]);
"use strict";

app.controller('aboutController', ['$scope', function ($scope) {

}]);
"use strict";

app.controller('accountController', ['$scope', '$cookieStore', '$window', 'UserSvc', function ($scope, $cookieStore, $window, UserSvc) {

    $scope.tab = 'income';

    $scope.setTab = function (tab) {
        $scope.tab = tab;
    };

    UserSvc.getMembers().then(function success(data) {
        console.log(data);
        $scope.members = data;
    });

    $scope.logout = function () {
        $cookieStore.remove('appAuth');
        $window.location.href = "/userController/login.html?openid=" + $scope.$root.appAuth.weiXinData.openid;
    }
}]);
"use strict";

app.controller('bookmarkController', ['$scope', function ($scope) {
    $scope.bookmarks = [];
}]);
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
"use strict";

app.controller('helpController', ['$scope', function ($scope) {

}]);
"use strict";

app.controller('homeController', ['$scope', 'ProductSvc', function ($scope, ProductSvc) {
    $scope.imgUrls = [];

    for (var i = 1; i <= 3; i++) {
        $scope.imgUrls.push($scope.imgPath + '/ad-' + i + '.jpg');
    }

    ProductSvc.getProducts().then(function success(data) {
        console.log(data);
        $scope.products = data;
    });

    /*OrderSvc.getCounts($scope.$root.appAuth.receiverMobile).then(function success(data) {
        $scope.orderStatusCounts = $.parseJSON(data);
    });*/

    /*UserSvc.getUserInfo($scope.$root.appAuth.receiverMobile).then(function success(data) {
        if(data.result){
            var addressIndex = getIndex(data.result, 'isDefault', true);
            $scope.address = data.result[addressIndex];
        }
    });*/

}]);
"use strict";

app.controller('loginController', ['$scope', '$location', '$cookieStore', 'AuthenticationSvc', function ($scope, $location, $cookieStore, AuthenticationSvc) {

    $scope.pageName = "login";

    $scope.login = function (receiverMobile, code) {
        if (checkMobileCode(receiverMobile, code)) {
            AuthenticationSvc.binding(receiverMobile).then(function success(data) {
                if (data.resultCode === 1) {
                    $scope.$root.appAuth = data;
                    $scope.$root.appAuth.isLogin = true;
                    $cookieStore.put('appAuth', $scope.$root.appAuth);
                    $location.path('appBody');
                }
            });
        } else {
            $scope.dialog.open(true, '系统提示', '您的验证码不正确，请重新输入！', ['我知道了','']);
        }
    }
}]);
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
"use strict";

app.controller('memberController', ['$scope', '$cookieStore', '$window', 'UserSvc', function ($scope, $cookieStore, $window, UserSvc) {

    $scope.tab = 'income';

    $scope.setTab = function (tab) {
        $scope.tab = tab;
    };

    UserSvc.getMembers().then(function success(data) {
        console.log(data);
        $scope.members = data;
    });

    $scope.logout = function () {
        $cookieStore.remove('appAuth');
        $window.location.href = "/userController/login.html?openid=" + $scope.$root.appAuth.weiXinData.openid;
    }
}]);
"use strict";

app.controller('payStateController', ['$scope', 'ShareSvc', function ($scope, ShareSvc) {
    $scope.addOverlay = function () {
        $scope.state.overlay.open(true, $("#shareTips").html());
    };

    $scope.setShareState = function (config, id, gh, category) {
        //mobile, pid, gh, category, url
        ShareSvc.getShareUrl($scope.appAuth.receiverMobile, id, gh, category, config.url).then(function success(data) {
            if (data.resultCode === 1) {
                config.url = data.shareUrl;
                $scope.state.share.open(true, config);
                /*$scope.$emit('share', {
                    show: true,
                    config: config
                });*/
            }
        });
    }
}]);
"use strict";

app.controller('shareController', ['$scope', 'UserSvc', 'ShareSvc', function ($scope, UserSvc, ShareSvc) {

    UserSvc.getUserAccount($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.userAccount = data;
    });

    ShareSvc.getShareProduct($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.products = data;
    });

    $scope.recharge = function (mobile) {
        UserSvc.recharge(mobile).then(function success(data) {
            console.log(data);
        });
    };

    $scope.withdrawal = function (id) {
        UserSvc.withdrawal(id).then(function success(data) {
            console.log(data);
        });
    };

    $scope.showMoneyTips = function () {
        $scope.state.overlay.open(true, $("#moneyTips").html());
    }
}]);
"use strict";

app.controller('choppingCartController', ['$scope', 'OrderSvc', function ($scope, OrderSvc) {

    OrderSvc.getOrderList('15013262507', '').then(function success(data) {
        $scope.orderList = data;
    });
}]);
app.directive("loadNext", [function () {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            inputDataTag: '='
        },
        templateUrl: "loadMore/loadNext/loadNext.html",
        link: function (scope, element, attrs) {

            scope.showWaitingIcon = false;//是否等待数据

            if (scope.pageSize) {
                scope.pageSize = attrs.pageSize;
            } else {
                scope.pageSize = 10;
            }

            scope.dataInit = function () {
                scope.selPage = 1;
                scope.pages = Math.ceil(scope.inputData.length / scope.pageSize); //分页数
                scope.outputData = scope.inputData.slice(0, scope.pageSize);

                //console.log(scope.outputData);
            };

            scope.setData = function () {
                scope.outputData = scope.inputData.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
            };

            scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.setData();
            };

            scope.selectMore = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.outputData = scope.inputData.slice(0, (scope.selPage * scope.pageSize));
            };

            //上一页
            scope.Previous = function () {
                scope.selectPage(scope.selPage - 1);
            };
            //下一页
            scope.Next = function () {
                scope.selectPage(scope.selPage + 1);
            };

            scope.More = function () {
                scope.selectMore(1 + scope.selPage);
            };

            scope.$watch('inputData', function (n, o, scope) {//监听输入数据
                if (n !== o && n !== undefined) {
                    scope.dataInit();
                }
            }, true);

            /*scope.$watch('outputData', function (n, o, scope) {//监听输出数据
                if (n !== o && n !== undefined) {
                    scope.showWaitingIcon = true;
                }
            }, true);*/
        }
    };
}]);
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

"use strict";

app.controller('addBankController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    /*UserSvc.getUserAccountLog().then(function success(data) {
        console.log(data);
    });*/
}]);
"use strict";

app.controller('rechargeController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    $scope.recharge = function (checked, mobile, amount) {
        if (checked) {
            UserSvc.recharge(mobile, amount).then(function success(data) {
                $scope.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            });
        } else {
            $scope.dialog.open(true, '系统提示', '请输入充值金额', ['我知道了', '']);
        }
    };
}]);
"use strict";

app.controller('billController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    $scope.tabs = [
        {
            "name": "充值",
            "count":"2",
            "target": ""
        },
        {
            "name": "消费",
            "count":"7",
            "target": ""
        },
        {
            "name": "提现",
            "count":"5",
            "target": ""
        },
        {
            "name": "转账",
            "count":"1",
            "target": ""
        }
    ]
}]);
"use strict";

app.controller('refundController', ['$scope', 'UserSvc', 'accountSvc', function ($scope, UserSvc, accountSvc) {

    /*UserSvc.getUserAccount('15013262507').then(function success(data) {
        $scope.userAccount = data;
    });*/

    $scope.total = 999;

    $scope.showBanks = function () {
        accountSvc.getBanks().then(function success(data) {
            $scope.banks = data;
        });
        $scope.isPickerShow = true;
    };

    $scope.withdrawal = function (checked, id, amount) {
        if (checked) {
            $scope.dialog.open(true, '系统提示', '您的申请已提交成功', ['我知道了', '']);
            /*UserSvc.withdrawal(id, amount).then(function success(data) {
                $scope.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            });*/
        } else {
            $scope.dialog.open(true, '系统提示', '请输入提现金额', ['我知道了', '']);
        }
    };

    //$scope.showWaitingIcon = false;//是否等待数据

    $scope.setBank = function (bank) {//选定数据
        $scope.bank = bank;
        $scope.isPickerShow = false;
    };

}]);
"use strict";

app.controller('addressListController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    //$scope.$root.toast.open(true);
    $scope.userAddresses = [];
    var users = [];
    UserSvc.getUserInfo($scope.$root.appAuth.receiverMobile).then(function success(data) {
        if (data.result) {
            $.each(data.result, function (i, k) {
                var user = {
                    name: k.memberName,
                    mobile: k.recieverPhone,
                    address: {
                        id: k.id,
                        province: '',
                        city: k.city,
                        district: '',
                        room: k.city,
                        receiverAddress: k.recieverAddress,
                        isDefault: k.isDefault
                    }
                };
                users.push(user);
            });
            $scope.userAddresses = users;
        }
    });

    $scope.updateAddress = function (address, isDefault, isDel) {
        if (isDel === 1) {
            var users = [];
            $.each($scope.userAddresses, function (i, k) {
                if (address.address.id !== k.address.id) {
                    var user = {
                        name: k.name,
                        mobile: k.mobile,
                        address: {
                            id: k.address.id,
                            province: k.address.province,
                            city: k.address.city,
                            district: '',
                            room: k.address.room,
                            receiverAddress: k.address.receiverAddress,
                            isDefault: k.address.isDefault
                        }
                    };
                    users.push(user);
                }
            });
            $scope.userAddresses = users;
        }
        UserSvc.putUserInfo(address.name, address.mobile, address.address.id, address.address.province + address.address.city, address.address.room, isDefault, isDel).then(function success(data) {
            if (data.success) {
                $scope.$root.toast.open(true);
            } else {
                $scope.$root.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            }
        });
    };

    $scope.back = function () {
        history.back();
    }
}]);
"use strict";

app.controller('newAddressController', ['$scope', 'UserSvc', function ($scope, UserSvc) {

    //$scope.$root.toast.open(true);

    $scope.userInfo = {//初始化用户对象
        name: '',
        mobile: '',
        address: {
            id: '',
            province: '',
            city: '',
            district: '',
            room: '',
            isDefault: true
        }
    };

    $scope.checkAddress = function () {
        if (!$scope.newAddressForm.receiverName.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入收件人'});
            //alert("请输入收件人");
            //$(".input-name").addClass("weui-cell_warn");
        } else if (!$scope.newAddressForm.receiverMobile.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入联系电话'});
            //alert("请输入联系电话");
            //$(".input-mobile").addClass("weui-cell_warn");
        } else if (!$scope.newAddressForm.receiverCity.$valid) {
            $scope.$emit('notification', {show: true, content: '请选择收件区域'});
            //$(".input-city").addClass("weui-cell_warn");
            //alert("请选择收件区域");
        } else if (!$scope.newAddressForm.receiverRoom.$valid) {
            $scope.$emit('notification', {show: true, content: '请输入详细地址'});
            //$(".input-room").addClass("weui-cell_warn");
            //alert("请输入详细地址");
        }
    };

    $scope.saveUser = function (isValid) {
        if (!isValid) {
            $scope.checkAddress();
            return false;
        }
        UserSvc.putUserInfo($scope.userInfo.name, $scope.userInfo.mobile, $scope.userInfo.address.id, $scope.userInfo.address.province + $scope.userInfo.address.city + $scope.userInfo.address.district, $scope.userInfo.address.room, $scope.userInfo.address.isDefault, 0).then(function success(data) {
            if (data.success) {
                history.back();
            } else {
                $scope.$root.dialog.open(true, '系统提示', data.msg, ['我知道了', '']);
            }
        });
    };
}]);
"use strict";

app.controller('couponDetailController', ['$scope', '$stateParams', 'CouponSvc', 'UserAgentSvc', function ($scope, $stateParams, CouponSvc, UserAgentSvc) {
    $scope.couponNo = $stateParams.couponNo;
    CouponSvc.getCouponDetail($scope.appAuth.receiverMobile, $scope.couponNo).then(function success(data) {
        $scope.coupon = data;
    });

    $scope.showShare = function (isUsed, isOverdue) {
        if (isUsed == 1) {
            $scope.state.notification.open(true, '此优惠券已使用，无法分享');
            return false;
        }
        if (isOverdue == 1) {
            $scope.state.notification.open(true, '此优惠券已过期，无法分享');
            return false;
        }

        //do something
    };

    $scope.useCoupon = function (e, isUsed, isOverdue) {
        if (isUsed == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已使用，无法分享');
            return false;
        }
        if (isOverdue == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已过期，无法分享');
            return false;
        }

        //do something
    };
}]);
"use strict";

app.controller('couponHomeController', ['$scope', 'CouponSvc', function ($scope, CouponSvc) {
    CouponSvc.getCouponList($scope.$root.appAuth.receiverMobile).then(function success(data) {
        $scope.couponList = data;
    });
}]);
"use strict";

app.controller('couponListController', ['$scope', '$stateParams', '$location', '$filter', 'CouponSvc', function ($scope, $stateParams, $location, $filter, CouponSvc) {
    $scope.isUsed = $stateParams.isUsed;
    $scope.isOverdue = $stateParams.isOverdue;

    CouponSvc.getCouponList($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.couponList = $filter('filter')(data.couponList, {isUsed: $scope.isUsed, isOverdue: $scope.isOverdue});
    });
}]);
"use strict";

app.controller('orderDetailController', ['$scope', '$cookieStore', function ($scope, $cookieStore) {

}]);
"use strict";

app.controller('orderListController', ['$scope', 'OrderSvc', '$location', function ($scope, OrderSvc, $location) {

    OrderSvc.getOrderList('15013262507','').then(function success(data) {
        $scope.orderList = data;
    });
}]);
"use strict";

app.controller('shareListController', ['$scope', 'ShareSvc', function ($scope, ShareSvc) {
    ShareSvc.getShareProduct($scope.appAuth.receiverMobile).then(function success(data) {
        $scope.products = data;
    });

    $scope.showShare = function (show, config) {
        $scope.state.share.open(true, config);
        /*$scope.$emit('share', {
            show: true,
            config: share //配置 share.config
        });*/
    };

}]);
"use strict";

app.controller('billDetailsController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    /*UserSvc.getUserAccountLog().then(function success(data) {
        console.log(data);
    });*/
}]);
"use strict";

app.controller('mktFlowController', ['$scope', '$cookieStore', 'MarketSvc', function ($scope, $cookieStore, MarketSvc) {

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobile = $cookieStore.get('rechargeMobile');
    } else {
        if ($scope.appAuth) {
            $scope.mobile = $scope.appAuth.receiverMobile;
        }
    }

    /*$scope.getFlows = function (mobile) {
        MarketSvc.getFlows(mobile).then(function success(data) {
            console.log(data);
            $scope.regionProducts = data.regionProducts;
        });
    };*/

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        alert('还没下单接口');
        $scope.state.overlay.open(true, $("#paySuccess").html());
    };

    $scope.pay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode) {
console.log(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode);
        MarketSvc.pay(mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, encodeURIComponent('http://mall.yfq.cn/payState/A/flow?returnUrl=' + encodeURIComponent(window.location.href))).then(function success(data) {
            if (data.result) {
                console.log(data.payUrl);
                window.location.href = data.payUrl;
            } else {
                console.log(data.msg);
            }
        });
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        if (n) {
            $cookieStore.put('rechargeMobile', n);
            MarketSvc.getFlows(n).then(function success(data) {
                console.log(data);
                $scope.listData = data;
            });
        }
    });

}]);
"use strict";

app.controller('mktFlowListController', ['$scope', '$stateParams', 'MarketSvc', function ($scope, $stateParams, MarketSvc) {

    $scope.mobile = $stateParams.mobile;

    $scope.selectedProd = function (product) {
        $scope.product = product;
    };

    $scope.buyProd = function (product) {
        $scope.regionProduct = product;
        alert([$scope.product.productId, $scope.regionProduct.productFlowPriceId]);
        $scope.state.overlay.open(true, $("#paySuccess").html());
    };

    $scope.showOverlay = function () {
        $scope.state.overlay.open(true, $("#flowTips").html());
    };

    $scope.$watch('mobile', function (n, o, $scope) {
        if (n) {
            MarketSvc.getFlows(n).then(function success(data) {
                $scope.listData = data;
            });
        }
    });
}]);
'use strict';

app.directive("appActiveCode", ['$interval', 'ActiveCodeSvc', function ($interval, ActiveCodeSvc) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "activeCode/activeCode.html",
        link: function (scope, element, attrs) {
            scope.activeText = "获取验证码";
            scope.activeClass = true;

            var second = 59, timePromise = undefined;
            scope.getActiveCode = function (e, receiverMobile) {
                if ($(e.currentTarget).hasClass("disabled")) {
                    return false;
                }
                scope.loadingToast.open(true);
                ActiveCodeSvc.getActiveCode(receiverMobile).then(function success(data) {
                    if (data == "") {
                        scope.activeClass = false;
                        scope.loadingToast.open(false);
                        timePromise = $interval(function () {
                            if (second <= 0) {
                                $interval.cancel(timePromise);
                                timePromise = undefined;

                                second = 59;
                                scope.activeText = "重发验证码";
                                scope.activeClass = true;
                            } else {
                                scope.activeText = second + "秒后可重发";
                                scope.activeClass = false;
                                second--;

                            }
                        }, 1000, 100);
                    }
                });
            };
        }
    };
}]);

'use strict';

app.directive("appFooterNav", ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "appFooterNav/appFooterNav.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
'use strict';

app.directive("appAddress", ['$timeout', 'AddressSvc', function ($timeout, AddressSvc) {
    return {
        restrict: 'E',
        templateUrl: "address/adr.html",
        link: function (scope, element, attrs) {

            AddressSvc.getProvince().then(function success(data) {//页面载入时获取[{省}]数据
                scope.$root.inputPickerData = {
                    tag: 'address',
                    data: data
                };
            });

            scope.setPickerShow = function () {//设置是否显示picker控件
                scope.$root.isPickerShow = true;
            };

            scope.$watch('outputPickerData', function (n, o, scope) {//监听picker控件传出的值{name<string>,value<string>}
                if (n !== o && n != undefined) {

                    if (n.tag !== 'address') {
                        return false;
                    }

                    if (n.data.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                        scope.userInfo.address.province = n.data.value;
                        AddressSvc.getCity(n.data.value).then(function success(data) {
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                        scope.userInfo.address.city = n.data.value;
                        AddressSvc.getDistrict(scope.userInfo.address.province, n.data.value).then(function success(data) {
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                        scope.$root.isPickerShow = false;//隐藏picker空间
                        scope.userInfo.address.district = n.data.value;//设置district值
                        AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                            scope.$root.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                }
            }, true);

            scope.$watch('userInfo.address', function (n, o, scope) {
                $timeout(function () {
                    if (scope.newAddressForm.receiverProvince.$valid && scope.newAddressForm.receiverCity.$valid && scope.newAddressForm.receiverDistrict.$valid) {
                        scope.receiverAddress = scope.userInfo.address.province + scope.userInfo.address.city + scope.userInfo.address.district;
                    }
                });
            }, true);
        }
    };
}]);
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
'use strict';

app.directive("appMenu", ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "menu/menu.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
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
'use strict';

app.directive("appOverlay", ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "overlay/overlay.html",
        replace: true,
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            var $container = $("#container");
            scope.removeOverlay = function () {
                scope.state.overlay.open(false);
            };
        }
    };
}]);
'use strict';

app.directive("owlCarousel", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        templateUrl: "owlCarousel/owlCarousel.html",
        scope: {
            imgUrls: '='
        },
        link: function (scope, element, attrs) {

        }
    };
}]).directive("carouselItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    navigation: true, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true,
                    autoPlay: 3000
                });
            }
        }
    };
}]);
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
'use strict';

app.directive("appTabs", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            tabs: "="
        },
        templateUrl: "tabs/tabs.html",
        link: function (scope, element, attrs) {

        }
    };
}]);
'use strict';

app.directive("appToast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "toast/toast.html",
        link: function (scope, element, attrs) {
            scope.$root.toast = {
                show: false,
                open: function (type) {
                    this.show = type;
                    $timeout(function () {
                        scope.$root.toast.show = false;
                    }, 2000);
                },
                openUnLimit: function (type) {
                    this.show = type;
                }
            };

            scope.$root.loadingToast = {
                show: false,
                open: function (type) {
                    this.show = type;
                    $timeout(function () {
                        scope.$root.loadingToast.show = false;
                    }, 2000);
                },
                openUnLimit: function (type) {
                    this.show = type;
                }
            };
        }
    };
}]);