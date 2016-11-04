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

    Tasks.get('body').then(function (tasks) {
        $scope.tasks = tasks;
    });

    $scope.$on('$ionicView.enter', function () {
        $scope.currentEmployee = Employees.currentEmployee();
        $scope.currentTask = Parts.currentTask();
        $scope.currentPart = Parts.currentPart();

        // Only send the event message the first time we enter this page after
        // starting a task (work-in-progress is false)
        if (!Tasks.isWip()) {
            if ($scope.currentPart && $scope.currentTask && $scope.currentEmployee) {
                IoT.send($scope.currentPart,
                         $scope.currentTask,
                         $scope.currentEmployee,
                         "Task Started").then(function (response) {

                         });
                Tasks.start();
            }
        }
        $scope.updateElapsedTime()
    });

    $scope.completeTask = function () {
        Parts.clear();
        var part = $scope.currentPart;
        var task = $scope.currentTask;
        var employee = $scope.currentEmployee;

        Tasks.stop();
        $scope.currentPart = null;
        $scope.currentTask = null;
        $scope.send(part, task, employee, "Task Complete");
    };

    /* upload the data to the IoT hub */
    $scope.send = function (part, task, employee, description) {
            IoT.send(part, task, employee, description).then(function (response) {
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
