angular.module('nfcsource.controllers')
.controller('HomeTabCtrl', ['$rootScope', '$scope', '$timeout', '$state', '$filter', 'nfcService', 'Employees', 'Parts', 'Tasks', 'IoT', function($rootScope, $scope, $timeout, $state, $filter, nfcService, Employees, Parts, Tasks, IoT) {
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

    $scope.updateElapsedTime = function () {
        $scope.elapsedTime = $filter('elapsed')(Parts.getStartTime());
        $timeout($scope.updateElapsedTime, 1000);
    }
    //$scope.updateElapsedTime();

    //$scope.tasks = [];
    Tasks.get('body').then(function (tasks) {
        $scope.tasks = tasks;
    });

    $scope.employee = null;
    $scope.part = null;

    $scope.$on('$ionicView.enter', function () {
        $scope.currentEmployee = Employees.currentEmployee();
        $scope.currentTask = Parts.currentTask();
        $scope.currentPart = Parts.currentPart();
        $scope.updateElapsedTime()
    });

    $scope.completeTask = function () {
        Parts.clear();
        $scope.currentPart = null;
        $scope.currentTask = null;
    };

    /* upload the data to the IoT hub */
    $scope.send = function () {
            IoT.send($scope.task, $scope.employee.id, 1, $scope.part.id).then(function (response) {
        });
    };

    $scope.logout = function () {
        Parts.clear();
        Employees.clear();
        $scope.currentEmployee = null;
        $scope.currentTask = null;
        $scope.currentPart = null;

    };

  /* Listen for NFC tag events */
  $rootScope.$on('tagFound', function (event, tag) {
     var id = $filter('decodePayload')(tag.ndefMessage[0]);

     if (Employees.get(id)) {
         $state.go('tabs.employee', {employeeId: id });
         //$scope.employee = Employees.get(id);
     } else {
         $state.go('tabs.part', {partId: id});
     }
  });
}]);
