angular.module('nfcsource.services')
    .factory('Employees', function () {
        var employees = {
            '1234': { id: '1234', name: 'Jason Isbell'},
            '2345': { id: '2345', name: 'Jonathan Coulton' },
            '5678': { id: '5678', name: 'Steve Earle'},
            '3456': { id: '3456', name: 'Amanda Shires'},
            '4567': { id: '4567', name: 'Jimmy Page'},
            '6789': { id: '6789', name: 'Joey Ryan'},
            '7890': { id: '7890', name: 'Neil Young'}
        }
        return {
            all: function () {
                return employees;
            },
            clear: function () {
                this.employee = null;
            },
            get: function (id) {
                return employees[id];
            },
            save: function (employee) {
                this.employee = employee;
            },
            currentEmployee: function () {
                return this.employee;
            }
        };
    });
