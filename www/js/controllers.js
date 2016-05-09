angular.module('nfcsource.controllers', ['nfcFilters', 'nfcsource.services'])
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
.controller('HomeTabCtrl', ['$rootScope', '$scope', '$timeout', '$state', '$filter', 'nfcService', 'Employees', 'Parts', function($rootScope, $scope, $timeout, $state, $filter, nfcService, Employees, Parts) {
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

  $rootScope.$on('tagFound', function (event, tag) {
     var id = $filter('decodePayload')(tag.ndefMessage[0]);

     if (Employees.get(id)) {
         $state.go('tabs.employee', {employeeId: id });
     } else {
         part = Parts.get(id);
         if (part.type === 'body') {
             $state.go('tabs.bodyWork', { partId: id });
         } else if (part.type === 'neck') {
             $state.go('tabs.neckWork', { partId: id });
         }
     }
  });
}])
.controller('FactsCtrl', function($ionicNavBarDelegate) {
  console.log('FactsCtrl');
})

.controller('EmployeeCtrl', ['$ionicNavBarDelegate', '$stateParams', '$scope', '$ionicHistory', function($ionicNavBarDelegate, $stateParams, $scope, $ionicHistory) {
    console.log($stateParams.employeeId)
    $scope.employee = {
        id: $stateParams.employeeId
    }

    $scope.cancel = function () {
        $ionicHistory.goBack();
    };
}])
