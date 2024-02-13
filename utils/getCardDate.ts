import moment from "moment";

export default function (e: CountdownEvent) {
    // BUG: fromNow() function currently returns 'a' instead of 1 in English context.
    // That will make `num` into NaN...
    // Fix it just by simply replace a to 1: Feb 14, 2023
    const cardDate: string = moment(getLatestRepeat(e)).fromNow(true).replaceAll('a ','1 ');
    const num: number = parseInt(cardDate.split(" ")[0]);
    const unit: string = cardDate.split(" ")[1];
    return [num, unit];
}