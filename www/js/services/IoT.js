/*
{
                created_date: 1462801247,
                workflow_step: 1.1,
                event_desc: “RFID Scanned..”,
                employee_id: 1234,
                job_number: 1234,
                part_number: 1234
}
*/
angular.module('nfcsource.services')
    .factory('IoT', ['$http', function ($http) {
        return {
            send: function(workflow_step, employee_id, job_number, part_number) {
                var target = "";

                return $http.post(target, {
                    created_date: new Date(),
                    workflow_step: workflow_step,
                    event_desc: "RFID Scanned...",
                    employee_id: employee_id,
                    job_number: job_number,
                    part_number: part_number
                })
            }
        };
    });
