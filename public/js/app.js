'use strict';

// Declare app level module which depends on views, and components

/* App Module */

var app = angular.module('app', ['appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']).controller('appController', ['$scope', function ($scope) {

    $scope.imgPath = '/images';

    $scope.isPickerShow = false;

}]);