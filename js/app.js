var app = angular.module('app', []);
app.controller('svgMap', function($scope, $rootScope, $http) {
  $scope.countries = {};
  $http.get('data/countries.json').success(function(data) {
    $scope.countries = data;

  }).then(function() {
    /*TODO: some times not work...WHY?*/
    jQuery('svg').find('path').each(function(i, el){
    console.log('asd')
      var id = el.id;
      console.log(id)
      if ($scope.countries.hasOwnProperty(id)) {
        //d3.selectAll('#'+ id).attr('data-content', '<h3><img src="'+$scope.countries[id]['flag']+'" alt=""/>'+$scope.countries[id]['name']+'</h3>');
        d3.selectAll('#'+ id).attr('data-content', $scope.countries[id]['text']);
        d3.selectAll('#'+ id).attr('title', '<div class="popover-country"><img src="'+$scope.countries[id]['flag']+'" alt=""/>'+$scope.countries[id]['name']+'</div>');
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
    angular.element('svg path.country_shape').popover({
      'trigger':'hover'
      ,'container': '#map'//body
      ,'placement': 'auto'
      ,'white-space': 'wrap'
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
        if (scope.countries.hasOwnProperty(this.id)) {
          scope.showCountryInfo(this.id);
          scope.$digest();
        }
      });
    }
  }
});