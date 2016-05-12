angular.module('nfcsource.controllers')
    .controller('EmployeeCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Employees', function ($scope, $stateParams, $ionicHistory, Employees) {
        $scope.employee = Employees.get($stateParams.employeeId);

        $scope.cancel = function () {
            $ionicHistory.goBack();
        };
        
        $scope.login = function () {
            Employees.save($scope.employee);
            $ionicHistory.goBack();
        }
}]);
