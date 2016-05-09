angular.module('nfcsource.controllers')
    .controller('NeckCtrl', ['$scope', '$ionicHistory', '$stateParams', function ($scope, $ionicHistory, $stateParams) {
        $scope.partId = $stateParams.partId;

        $scope.cancel = function () {
            $ionicHistory.goBack();
        }
    }])
