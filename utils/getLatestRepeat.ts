import moment from "moment";

export default function (e: CountdownEvent) {
    let fullDate = moment();
    // TODO: create a uify function for multi-calendar transforming
    if (e.calendar == "gregorian") {
        fullDate = moment(e.date);
        if (!e.repeat) {
            return fullDate;
        }
        const repeatInterval = e.repeat.split(",")[0];
        const repeatUnit = e.repeat.split(",")[1];
        if (fullDate.isSame(moment(), 'day')){
            return fullDate;
        }

        const maxIterations = 100000; // prevent infinite loop

        for (let i = 0; i < maxIterations; i++) {
            if (fullDate >= moment()) {
                break;
            }
            switch (repeatUnit) {
                case "year":
                    fullDate.year(fullDate.year() + parseInt(repeatInterval));
                    break;
                case "month":
                    fullDate.month(fullDate.month() + parseInt(repeatInterval));
                    break;
                case "week":
                    fullDate.add(parseInt(repeatInterval), "weeks");
                    break;
                case "day":
                    fullDate.add(parseInt(repeatInterval), "days");
                default:
                    break;
            }
        }
    }
    return fullDate;
}
