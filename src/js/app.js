angular.module('app', []).controller('RankingController', ['$scope', '$http', function($scope, $http) {
  $scope.users = [];
  $scope.first = 1;

  $scope.settings = {
    currentPage: 0,
    offset: 0,
    pageLimit: 14
  };

  $http.get('https://auth.onawa.me/we2019?level=associate').then(function(response){
    $scope.users = response.data;
    $scope.settings.pages = new Array(Math.ceil($scope.users.length/$scope.settings.pageLimit));
    for(var i=0;i<$scope.settings.pages.length;i++) {
      $scope.settings.pages[i] = i + 1;
    }
  });

  $http.get('https://auth.onawa.me/we2019count').then(function(response){
    $scope.undurraga = response.data[0];
    $scope.undurraga.total = $scope.undurraga.count.toString();
    $scope.undurraga.numbers = [];
    count = $scope.undurraga.total.length;
    for (var i = 0; i < count; i++ ) {
      $scope.undurraga.numbers.push({value: $scope.undurraga.total[i]});
    }
  });

  $scope.goToPage = function (page) {
    $scope.settings.currentPage = page;
  };

  $scope.prevPage = function () {
    if ($scope.settings.currentPage > 0) {
      $scope.settings.currentPage--;
    }
  };

  $scope.nextPage = function () {
    if ($scope.settings.currentPage < ($scope.settings.pages.length-1)) {
      $scope.settings.currentPage++;
    }
  };
}]);
