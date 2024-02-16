import moment from "moment";

export default function (e: CountdownEvent) {
    // BUG: fromNow() function currently returns 'a' instead of 1 in English context.
    // That will make `num` into NaN...
    // Finally fix it by replacing default locale settings: Feb 16, 2024
    // This comment will be removed after next commit.
    const cardDate: string = moment(getLatestRepeat(e)).fromNow(true);
    const num: number = parseInt(cardDate.split(" ")[0]);
    const unit: string = cardDate.split(" ")[1];
    return [num, unit];
}