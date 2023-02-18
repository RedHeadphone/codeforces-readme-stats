
import { clamp_value } from "../common";

describe("clamp_value", () => {
    it("should return the minimum value if the number is less than the minimum", () => {
        expect(clamp_value(1, 2, 3)).toBe(2);
    });
    it("should return the maximum value if the number is greater than the maximum", () => {
        expect(clamp_value(4, 2, 3)).toBe(3);
    });
    it("should return the number if it is between the minimum and maximum", () => {
        expect(clamp_value(2, 2, 3)).toBe(2);
    });
    }
);