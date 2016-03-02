'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .when('/favorites', {
      templateUrl: '/partials/favorites.html',
      controller: 'FavoritesController',
      controllerAs: 'favoritesCtrl'
    })
    .otherwise({ redirectTo: '/' });
});

app.controller('SearchController', ['$http', '$scope', function($http, $scope) {
  $scope.results = [];
  $scope.search = {}

  $scope.submit = function() {
    $http({
      url: '/search',
      method: 'GET',
      params: { q: $scope.search.Title }
    }).then(
      function(response) {
        console.log(response);
        $scope.results = response.data;
        console.log($scope.results);
      }
    )
  }
}]);

app.controller('FavoritesController', ['$http', '$scope', function($http, $scope) {

}]);