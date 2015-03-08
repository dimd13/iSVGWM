var app = angular.module('app', []);
app.controller('svgMap', function($scope, $rootScope, $http) {

  $http.get('data/countries.json').success(function(data) {
    $scope.countries = data;
  });

});
app.directive('svgMap', function($rootScope) {
  return {
    restrict: 'A',
    templateUrl: 'img/map.svg',
    link: function(scope, element, attrs) {
      element.find('path').bind('click', function() {
        scope.country = {};
        scope.country = scope.countries[this.id];
        scope.$digest();
        angular.element('body').addClass('open-modal');
        angular.element('.full-width-modal').removeClass('closed').addClass('opened');
        angular.element('div.__close-modal').bind('click', function () {
          angular.element('.full-width-modal').removeClass('opened').addClass('closed');
          angular.element('body').removeClass('open-modal');
        });
      });
    }
  }
});