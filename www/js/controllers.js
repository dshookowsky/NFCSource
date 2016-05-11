angular.module('nfcsource.controllers', ['nfcFilters', 'nfcsource.services'])

.controller('HomeTabCtrl', ['$rootScope', '$scope', '$timeout', '$state', '$filter', 'nfcService', 'Employees', 'Parts', 'Tasks', function($rootScope, $scope, $timeout, $state, $filter, nfcService, Employees, Parts, Tasks) {
    /* update the clock once a minute */
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

      $timeout($scope.updateTime, 1000 * 60);
    }

    $scope.updateTime();  // Initialize clock
    $scope.tasks = [];
    $scope.employee = null;
    $scope.workflow_step = null;
    $scope.part = null;

    /* upload the data to the IoT hub */
    $scope.send = function () {
        Tasks.send($scope.workflow_step, $scope.employee.id, 1, $scope.part.id).then(function (response) {
        });
    };

  /* Listen for NFC tag events */
  $rootScope.$on('tagFound', function (event, tag) {
     var id = $filter('decodePayload')(tag.ndefMessage[0]);

     if (Employees.get(id)) {
         //$state.go('tabs.employee', {employeeId: id });
         $scope.employee = Employees.get(id);
     } else {

         var part = Parts.get(id);
         Tasks.get(part.type).then(function (tasks) {
             $scope.tasks = tasks;
         });
         $scope.part = part;

         /*
         if (part.type === 'body') {
             $state.go('tabs.bodyWork', { partId: id });
         } else if (part.type === 'neck') {
             $state.go('tabs.neckWork', { partId: id });
         }
         */
     }
  });
}]);

/*
.controller('EmployeeCtrl', ['$ionicNavBarDelegate', '$stateParams', '$scope', '$ionicHistory', function($ionicNavBarDelegate, $stateParams, $scope, $ionicHistory) {
    console.log($stateParams.employeeId)
    $scope.employee = {
        id: $stateParams.employeeId
    }

    $scope.cancel = function () {
        $ionicHistory.goBack();
    };
}])
*/
