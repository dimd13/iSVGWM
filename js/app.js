var app = angular.module('app', []);
app.controller('svgMap', function($scope, $rootScope, $http) {
  $scope.countries = {};
  $http.get('data/countries.json').success(function(data) {
    $scope.countries = data;
    angular.element('svg').find('path').each(function(i, el){
      var id = el.id
      if ($scope.countries.hasOwnProperty(id)) {
        //d3.selectAll('#'+ id).attr('data-content', '<h3><img src="'+$scope.countries[id]['flag']+'" alt=""/>'+$scope.countries[id]['name']+'</h3>');
        d3.selectAll('#'+ id).attr('data-content', $scope.countries[id]['text']);
        d3.selectAll('#'+ id).attr('title', '<div class="popover-country"><img src="'+$scope.countries[id]['flag']+'" alt=""/>'+$scope.countries[id]['name']+'</div>');
      }
    });
    $('svg .country_shape').popover({
      'trigger':'hover'
      ,'container': 'body'
      ,'placement': 'auto'
      ,'white-space': 'nowrap'
      ,'html':'true'
    });

  });

});
app.directive('svgMap', function() {
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