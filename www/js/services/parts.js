angular.module('nfcsource.services')
    .factory('Parts', [function () {
        var parts = {
            '9876': { id: '9876', type: 'body' },
            '8765': { id: '8765', type: 'body' },
            '7654': { id: '7654', type: 'neck'}
        }

        return {
            all: function () {
                return parts;
            },
            clear: function () {
                this.part = null;
                this.task = null;
                this.startTime = null;
            },
            currentPart: function () {
                return this.part;
            },
            currentTask: function () {
                return this.task;
            },
            get: function (id) {
                return parts[id];
            },
            getStartTime: function () {
                return this.startTime;
            },
            save: function(part, task) {
                this.part = part;
                this.task = task;
                this.startTime = new Date();
            }
        }
    }]);
