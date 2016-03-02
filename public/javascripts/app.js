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

  $scope.addToFavorites = function(result) {
    console.log('addToFavorites');
    console.log(result);
    $http(
      {
        url: '/favorites',
        params: {
          "Title": result.Title,
          "Plot": result.Plot,
          "Poster": result.Poster
        },
        method: 'POST'
      }
    ).then(function (data) {
      console.log(data);
    })
    // $http.post('/favorites', result).success(function(data) {
    //   console.log(data);
    // });
  }
}]);

app.controller('FavoritesController', ['$http', '$scope', function($http, $scope) {
  $scope.favorites = []

  $http({
    url: '/favorites',
    method: 'GET'
  }).then(
    function(response) {
      $scope.favorites = response.data;
    }
  )

}]);