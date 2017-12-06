export default class MyFunctions {
    dateDiff(firstDay, secondDay, diffType) {
        var d1 = firstDay.getTime();
        var d2 = secondDay.getTime();

        if (diffType=="day") {
            return Math.round((d2 - d1)/(1000*60*60*24));
        } else if (diffType=="week") {
            return Math.round((d2 - d1)/(1000*60*60*24*7));
        }
    }

    addTime(startDate, addValue, addType, returnType) {
        var result = null;
        if (addType=="year") {
            var vYear = startDate.getFullYear();
            var vMonth = startDate.getMonth() + 1;
            var vDate = startDate.getDate();

            vYear = vYear + Math.round(addValue);
            result = new Date(vYear + "-" + vMonth + "-" + vDate);
        }

        console.log(result);

        if (returnType=="day") {
            return this.dateDiff(startDate, result, "day");
        } else if (returnType=="week") {
            return this.dateDiff(startDate, result, "week");
        } else if (returnType=="month") {
            return this.dateDiff(startDate, result, "month");
        }
    }
}
