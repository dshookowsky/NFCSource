angular.module('nfcsource.services')
    .factory('Parts', function () {
        var parts = {
            '9876': { id: '9876', type: 'body' },
            '8765': { id: '8765', type: 'body' },
            '7654': { id: '7654', type: 'neck'}
        }

        return {
            all: function () {
                return parts;
            },
            get: function (id) {
                return parts[id];
            }
        }
    });
