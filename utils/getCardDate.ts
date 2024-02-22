import moment from "moment";

export default function (e: CountdownEvent) {
    const cardDate: string = moment(getLatestRepeat(e)).fromNow(true);
    const num: number = parseInt(cardDate.split(" ")[0]);
    const unit: string = cardDate.split(" ")[1];
    return [num, unit];
}