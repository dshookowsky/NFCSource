angular.module('nfcsource.controllers', [])
/*
.controller('DashCtrl', function($scope, $timeout) {
    $scope.updateTime = function () {
        $scope.time = {
            now: new Date(),
            weekdays: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]
        }
        $timeout($scope.updateTime, 1000);

    }

    $scope.updateTime();
})
*/
.controller('HomeTabCtrl', function($scope, $timeout) {
  console.log('HomeTabCtrl');
  $scope.updateTime = function () {
      $scope.time = {
          now: new Date(),
          weekdays: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
          ]
      }
      $timeout($scope.updateTime, 1000);
  }

  $scope.updateTime();
})
.controller('FactsCtrl', function($ionicNavBarDelegate) {
  console.log('FactsCtrl');
})
