type Event = {
    name: string;
    calendar: string;
    year: number;
    month: number;
    day: number;
    repeat: string;
    reminder: string[];
    background: string;
    border: string;
};

export default function (e: Event) {
    let fullDate = new Date();
    if (e.calendar == "gregorian") {
        fullDate = new Date(e.year, e.month - 1, e.day);
        if (e.repeat != undefined) {
            let repeatInterval = e.repeat.split(",")[0];
            let repeatUnit = e.repeat.split(",")[1];
            while (true) {
                switch (repeatUnit) {
                    case "year":
                        fullDate.setFullYear(fullDate.getFullYear() + parseInt(repeatInterval));
                        break;
                    case "month":
                        fullDate.setMonth(fullDate.getMonth() + parseInt(repeatInterval));
                        break;
                    case "day":
                        fullDate.setDate(fullDate.getDate() + parseInt(repeatInterval));
                        break;
                }
                if (fullDate.getTime() >= Date.now()) {
                    break;
                }
            }
        }
    }
    return fullDate;
}
