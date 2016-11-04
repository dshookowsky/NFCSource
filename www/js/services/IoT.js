angular.module('nfcsource.services')
    .factory('IoT', ['$http', function ($http) {
        return {
            send: function(part, task, employee, description) {

                return $http.post(targetUrl, {
                    created_date: new Date(),
                    event_desc: description,
                    employee: employee,
                    task: task,
                    part: part
                }, {
                    headers: {
                        'Authorization': 'SharedAccessSignature sr=TechSummitIoTDemo.azure-devices.net%2Fdevices%2FmyFirstDevice&sig=PW%2Fpwvw1dAXkyKSjNq3ocJOTiHItoKIMS3l47pRt4iE%3D&se=1478372356'
                    }
                });
            }
        };
    }]);
