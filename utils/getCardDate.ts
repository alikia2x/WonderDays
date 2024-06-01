import dayjs from "dayjs";
import getLatestRepeat from "./getLatestRepeat";

export default function (e: CountdownEvent, today?: string): number {
    return Math.abs(Math.ceil(dayjs(getLatestRepeat(e, today).format("YYYY-MM-DD")).diff(dayjs(today), "days", true)));
}