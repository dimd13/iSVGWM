var app = angular.module('app', []);
app.controller('svgMapData', function($scope, $rootScope, $http) {
  $scope.countries = {};
  $http.get('data/countries.json').success(function(data) {
    return $scope.countries = data;

  }).then(function() {
    /*TODO: some times not work...WHY?*/

    jQuery('.country_shape').each(function(){
      if ($scope.countries.hasOwnProperty(this.id)) {
        d3.select(this)
          .attr('data-toggle','popover')
          .attr('data-content', $scope.countries[this.id]['text'])
          .attr('title', '<div class="popover-country"><img src="'+$scope.countries[this.id]['flag']+'" alt=""/>'+$scope.countries[this.id]['name']+'</div>');
        angular.element(this).popover({
          'trigger':'hover'
          ,'container': 'body'
          ,'placement': 'auto'
          ,'white-space': 'wrap'
          ,'html':'true'
        })
      }
    });

    $scope.startHighlight = function (id) {
      angular.element('svg #' + id).attr('class', 'country_shape highlight-path').mouseenter();
    };

    $scope.stopHighlight = function (id) {
      angular.element('svg #' + id).attr('class', 'country_shape').mouseleave();
    };

    $scope.showCountryInfo = function (id) {
      $scope.country = {};
      $scope.country = $scope.countries[id];
      angular.element('body').addClass('open-modal');
      angular.element('.full-width-modal').removeClass('closed').addClass('opened');
      angular.element('div.__close-modal').bind('click', function () {
        angular.element('.full-width-modal').removeClass('opened').addClass('closed');
        angular.element('body').removeClass('open-modal');
      });
    };
  });

});
app.directive('svgMap', function() {
  return {
    restrict: 'A',
    templateUrl: 'img/map.svg',
    link: function(scope, element, attrs) {
      element.find('path').bind('click', function() {
        if (scope.countries.hasOwnProperty(this.id)) {
          scope.showCountryInfo(this.id);
        }
        scope.$digest();
      });
    },
    controller: 'svgMapData'
  }
});