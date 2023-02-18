
import { COLORS } from "../common";
import { renderBadge } from "../pages/api/badge";

describe("renderBadge", () => {
    it("should render cyan if specialist rating", () => {
        const rating = 1500;
        document.body.innerHTML = renderBadge(rating);
        const badge_color = document.querySelector("#background-color").getAttribute("fill");
        expect(badge_color).toBe(COLORS.SPECIALIST);
    });
    it("should render blue if expert rating", () => {
        const rating = 1700;
        document.body.innerHTML = renderBadge(rating);
        const badge_color = document.querySelector("#background-color").getAttribute("fill");
        expect(badge_color).toBe(COLORS.EXPERT);
    });
    it("should render same rating", () => {
        const rating = 1212;
        document.body.innerHTML = renderBadge(rating);
        const badge_rating = document.querySelector("#rating").innerHTML;
        expect(badge_rating).toBe(rating.toString());
    });
}
);