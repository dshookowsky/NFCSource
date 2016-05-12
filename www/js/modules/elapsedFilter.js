// {{ dateString | elapsed }}

angular.module('nfcsource.filters')
.filter('elapsed', function(){
    return function(date){
        if (!date) return;
        var time = Date.parse(date);
        var timeNow = new Date().getTime();
        var difference = timeNow - time;
        var days = Math.floor(difference / (24 * 60 * 60 * 1000));
        difference -= days * 24 * 60 * 60 * 1000;
        var hours = Math.floor(difference / (60 * 60 * 1000 ));
        difference -= hours * 60 * 60 * 1000;
        var minutes = Math.floor(difference / (60 * 1000));
        difference -= minutes * 60 * 1000;
        var seconds = Math.floor(difference / (1000));

        var returnString = "";

        var appendUnit = function (unit, count) {
            if (count && count > 1) {
                return count + " " + unit + "s ";
            } else if (count && count == 1) {
                return count + " " + unit + " ";
            } else {
                return "";
            }
        }

        returnString += appendUnit("day", days);
        returnString += appendUnit("hour", hours);
        returnString += appendUnit("minute", minutes);
        returnString += appendUnit("second", seconds);

        return returnString
    }
})
