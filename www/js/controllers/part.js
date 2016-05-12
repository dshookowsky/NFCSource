angular.module('nfcsource.controllers')
    .controller('PartCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Parts', 'Tasks',  function ($scope, $stateParams, $ionicHistory,  Parts, Tasks) {

    var part = Parts.get($stateParams.partId);
    $scope.tasks = [];

    Tasks.get(part.type).then(function (tasks) {
        $scope.tasks =  tasks;
    });

    $scope.part = part;

    $scope.clear = function () {
        Parts.clearCurrentPart();
    };

    $scope.save = function (task) {
        Parts.save($scope.part, task)
        $ionicHistory.goBack();
    };

    $scope.cancel = function () {
        $ionicHistory.goBack();
    };
}]);
