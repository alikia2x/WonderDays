import dayjs from "dayjs";
import moment from "moment";

export default function (e: CountdownEvent) {
    return Math.abs(Math.ceil(dayjs(getLatestRepeat(e).format("YYYY-MM-DD")).diff(dayjs(), "days", true)));
}