import moment from "moment";

export default function (e: CountdownEvent) {
    const cardDate: number = Math.abs(moment(getLatestRepeat(e)).diff(moment(), "days"));
    return cardDate;
}