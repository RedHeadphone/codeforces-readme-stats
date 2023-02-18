
import { COLORS } from "../common";
import { renderCard } from "../pages/api/card";

describe("renderCard", () => {
    it("should render correct stats", () => {
        const data = {
            name: "RedHeadphone",
            rating: 1616,
            category: "Expert",
            maxCategory: "Candidate Master",
            maxRating: 1933,
            contests: 28,
            problemsSolved: 99,
            friendOfCount: 69,
            contribution: 140,
            themeConfig: {
                title_color: "2f80ed",
                icon_color: "4c71f2",
                text_color: "434d58",
                bg_color: "fffefe",
                border_color: "e4e2e2",
            },
            disable_animations: true,
            show_icons: true,
        }
        document.body.innerHTML = renderCard(data.name, data.rating, data.category, data.maxCategory, data.maxRating, data.contests, data.problemsSolved, data.friendOfCount, data.contribution, data.themeConfig, data.disable_animations, data.show_icons);
        const name = document.querySelector("#name").innerHTML;
        expect(name).toBe(data.name);
        const rating = document.querySelector("#rating").innerHTML;
        expect(rating).toBe(data.rating.toString());
        const category = document.querySelector("#category").innerHTML;
        expect(category).toBe(data.category);
        const maxCategory = document.querySelector("#max-category").innerHTML;
        expect(maxCategory).toBe(data.maxCategory);
        const maxRating = document.querySelector("#max-rating").innerHTML;
        expect(maxRating).toBe(data.maxRating.toString());
        const contests = document.querySelector("#contests").innerHTML;
        expect(contests).toBe(data.contests.toString());
        const problemsSolved = document.querySelector("#problems-solved").innerHTML;
        expect(problemsSolved).toBe(data.problemsSolved.toString());
        const friendOfCount = document.querySelector("#friend-of-count").innerHTML;
        expect(friendOfCount).toBe(data.friendOfCount.toString());
        const contribution = document.querySelector("#contribution").innerHTML;
        expect(contribution).toBe(data.contribution.toString());

    });
}
);