var app = angular.module('app', []);
app.controller('svgMap', function($scope, $rootScope) {
  $scope.countries = {
    'russia': {
      name: 'Россия'
  }}


});
app.directive('svgMap', function($rootScope,$http,$timeout) {
  return {
    restrict: 'A',
    templateUrl: 'img/map.svg',
    link: function(scope, element, attrs) {
      element.find('path').bind('click', function() {
      scope.country = {};
        $http.get('data/'+this.id+'.json').success(function(data) {
          scope.country = data;
        });
          //$timeout(function () {
            scope.$digest();
            angular.element('body').addClass('open-modal');
            angular.element('.full-width-modal').removeClass('closed').addClass('opened');
            angular.element('div.__close-modal').bind('click', function () {
              angular.element('.full-width-modal').removeClass('opened').addClass('closed');
              angular.element('body').removeClass('open-modal');
            })
          //},0)


        //console.log(this.id)
      });
    }
  }
});