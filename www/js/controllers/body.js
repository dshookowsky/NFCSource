angular.module('nfcsource.controllers')
    .controller('BodyCtrl', ['$scope', '$ionicHistory', '$stateParams', function ($scope, $ionicHistory, $stateParams) {
        $scope.partId = $stateParams.partId;

        $scope.cancel = function () {
            $ionicHistory.goBack();
        }
    }])
