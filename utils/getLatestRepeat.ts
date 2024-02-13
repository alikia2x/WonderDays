import moment from "moment";

export default function (e: CountdownEvent) {
    let fullDate = moment();
    // TODO: create a uify function for mutil-calendar transforming
    if (e.calendar == "gregorian") {
        fullDate = moment(e.date);
        if (!e.repeat) {
            return fullDate;
        }
        let repeatInterval = e.repeat.split(",")[0];
        let repeatUnit = e.repeat.split(",")[1];
        if (fullDate.isSame(moment(), 'day')){
            return fullDate;
        }
        while (true) { // Repeat until now
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
            }
        }
    }
    return fullDate;
}
