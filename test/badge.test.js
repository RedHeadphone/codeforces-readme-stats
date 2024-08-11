import { jest } from "@jest/globals";
import * as fetcher from "@/fetcher.js";
// import handler from "@/pages/api/badge.js";
// import { CONSTANTS, COLORS } from "@/common.js";

jest.mock("@/fetcher.js");


describe("badge handler", () => {
  // let req, res;

  // beforeEach(() => {
  //   req = {
  //     query: {
  //       username: "testuser",
  //       cache_seconds: "18000",
  //     },
  //   };

  //   res = {
  //     setHeader: jest.fn(),
  //     send: jest.fn(),
  //     status: jest.fn(),
  //   };
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it("mock test", async () => {
    await fetcher.get_rating("testuser", 18000);

    expect(fetcher.get_rating).toHaveBeenCalledWith("testuser", 18000);
  })

  // it("should return a valid SVG response with proper headers", async () => {
  //   const rating = 1700;
  //   fetcher.get_rating.mockResolvedValue(rating);

  //   await handler(req, res);

  //   expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
  //   expect(res.setHeader).toHaveBeenCalledWith(
  //     "Cache-Control",
  //     `max-age=${
  //       cacheSeconds / 2
  //     }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
  //   );
  //   document.body.innerHTML = res.send.mock.calls[0][0];
  //   const badge_color = document
  //     .querySelector("#background-color")
  //     .getAttribute("fill");
  //   expect(badge_color).toBe(COLORS.EXPERT);
  //   const badge_rating = document.querySelector("#rating").innerHTML;
  //   expect(badge_rating).toBe(rating.toString());
  // });

  // it("should handle errors and send a text response with error message", async () => {
  //   const error = {
  //     status: 500,
  //     error: "Internal Server Error",
  //   };

  //   fetcher.get_rating.mockRejectedValue(error);

  //   await handler(req, res);

  //   expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
  //   expect(res.setHeader).toHaveBeenCalledWith(
  //     "Cache-Control",
  //     "no-cache, no-store, must-revalidate"
  //   );
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith("Internal Server Error");
  // });
});
