'use strict';
/*********************************************** directives ***********************************************************************/
var app = angular.module('APP.directives', []);

app.directive('footerDirective', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/footer/footer.html'
      };

        return elementLogin;
}]);

app.directive('headerDirective', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/header/header.html'
      };

        return elementLogin;
}]);

app.directive('prevnextDirective', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/prevNext/prevNext.html'
      };

        return elementLogin;
}]);

app.directive('menuDirective', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/menu/menu.html'
      };

        return elementLogin;
}]);

app.directive('rfcDirective', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/rfc/rfc.html'
      };

        return elementLogin;
}]);
app.directive('confirmRfcDelete', [function() {
    var elementLogin = {
      restrict:'E',
        priority:99,
        transclude:true,
        templateUrl:'js/directives/rfc/confirm.html'
      };

        return elementLogin;
}]);
