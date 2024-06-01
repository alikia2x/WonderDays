import { describe, expect, it } from "@jest/globals";
import getCardDate from "../utils/getCardDate";

const e1: CountdownEvent = {
    name: "normal",
    calendar: "gregorian",
    date: "2022-07-17",
    repeat: "",
    reminder: [],
    background: "blue",
    border: "blue",
}

const r1: CountdownEvent = {
    name: "repeat",
    calendar: "gregorian",
    date: "2008-08-16",
    repeat: "1,year",
    reminder: [],
    background: "blue",
    border: "blue",
}

describe("get normal event's cardDate ", () => {
    it("Same day returns 0", () => {
        expect(getCardDate(e1, "2022-07-17")).toBe(0);
    });
    it("Next day returns 1", () => {
        expect(getCardDate(e1, "2022-07-18")).toBe(1);
    });
    it("Last day returns 1", () => {
        expect(getCardDate(e1, "2022-07-16")).toBe(1);
    });
});

describe("get repeat event's cardDate ", () => {
    it("Same day returns 0", () => {
        expect(getCardDate(r1, "2008-08-16")).toBe(0);
    });
    it("Same day after repeat returns 0", () => {
        expect(getCardDate(r1, "2024-08-16")).toBe(0);
    });
    
});
