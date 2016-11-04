angular.module('nfcsource.services')
    .factory('Tasks', function ($q, $timeout) {
        var tasks = [];

        return {
            get: function (type) {
                deferred = $q.defer();

                $timeout(function () {
                    switch (type) {
                        case 'body' :
                            tasks = [
                            { workflow_step: 1.0, name: 'Cut Profile'},
                            { workflow_step: 2.0, name: 'Route Rosette'},
                            { workflow_step: 3.0, name: 'Inlay Rosette' },
                            { workflow_step: 4.0, name: 'Bracing (glue-up)'},
                            { workflow_step: 4.1, name: 'Bracing (scallop)'},
                            { workflow_step: 5.0, name: 'Bending Sides'},
                            { workflow_step: 6.0, name: 'Kerfing (glue-up)'},
                            { workflow_step: 6.1, name: 'Kerfing (notch for Bracing'},
                            { workflow_step: 7.0, name: 'Binding'}]
                            break;
                        case 'neck' :
                            tasks = [
                                { workflow_step: 12.0, name: 'Cut Frets'},
                                { workflow_step: 13.0, name: 'Shape Headstock'},
                                { workflow_step: 13.1, name: 'Volute' },
                                { workflow_step: 13.0, name: 'Shape Heel'}
                            ]
                            break;
                        default:
                            tasks = [];
                            break;
                    }
                    deferred.resolve(tasks);
                }, 1000);
                return deferred.promise;
            },
            start: function () {
                this.wip = true;
            },
            stop: function () {
                this.wip = false;
            },
            isWip: function () {
                return this.wip || false;
            }
        };
    });
