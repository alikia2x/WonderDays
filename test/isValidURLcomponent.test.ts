import { describe, expect, it } from "@jest/globals";
import isValidURLcomponent from "../utils/isValidURLcomponent";

describe("isValidURLcomponent", () => {
    it("should return true for valid URL component", () => {
        expect(isValidURLcomponent("foo")).toBe(true);
        expect(isValidURLcomponent("foo&bar")).toBe(true);
    });

    it("should return false for invalid URL component", () => {
        expect(isValidURLcomponent("foo/")).toBe(false);
        expect(isValidURLcomponent("foo?bar")).toBe(false);
        expect(isValidURLcomponent("foo?bar=1&baz=false")).toBe(false);
    });
});
