angular.module('nfcsource.services')
    .factory('IoT', ['$http', function ($http) {
        return {
            send: function(workflow_step, employee_id, job_number, part_number) {
                //var target = "";

                return $http.post(targetUrl, {
                    created_date: new Date(),
                    workflow_step: workflow_step,
                    event_desc: "RFID Scanned...",
                    employee_id: employee_id,
                    job_number: job_number,
                    part_number: part_number
                });
            }
        };
    }]);
