import { describe, expect, it } from "@jest/globals";
import getLatestRepeat from "../utils/getLatestRepeat";

const r1: CountdownEvent = {
    name: "repeat",
    calendar: "gregorian",
    date: "2008-08-16",
    repeat: "1,year",
    reminder: [],
    background: "blue",
    border: "blue",
}

describe("get repeat event's ", () => {
    it("Same day returns same thing", () => {
        expect(getLatestRepeat(r1, "2008-08-16").format('YYYY-MM-DD')).toBe('2008-08-16');
    });
    it("After iterations", () => {
        expect(getLatestRepeat(r1, "2024-08-16").format('YYYY-MM-DD')).toBe('2024-08-16');
    });
});
