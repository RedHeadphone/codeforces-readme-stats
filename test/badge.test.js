import { jest } from "@jest/globals";
import { CONSTANTS, COLORS, clamp_value } from "@/common.js";

jest.unstable_mockModule("@/fetcher-utils", () => {
  return {
    api: {
      get: jest.fn(),
    },
    last_rating_cache: {set: jest.fn(), get: jest.fn()},
    last_stats_cache: {set: jest.fn(), get: jest.fn()},
  };
});

const { api, last_rating_cache } = await import("@/fetcher-utils.js");
const handler = (await import("@/pages/api/badge.js")).default;

describe("badge handler", () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        username: "testuser",
        cache_seconds: "18000",
      },
    };

    res = {
      setHeader: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a valid SVG response with proper headers", async () => {
    const rating = 1700;
    let cacheSeconds = parseInt(
      req.query.cache_seconds || CONSTANTS.FOUR_HOURS,
      10
    );
    cacheSeconds = clamp_value(
      cacheSeconds,
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY
    );

    api.get.mockResolvedValue({
      data: {
        result: [
          {
            rating,
          },
        ],
      },
    });

    await handler(req, res);

    document.body.innerHTML = res.send.mock.calls[0][0];
    const badge_color = document
      .querySelector("#background-color")
      .getAttribute("fill");
    const badge_rating = document.querySelector("#rating").innerHTML;

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
    );
    expect(badge_color).toBe(COLORS.EXPERT);
    expect(badge_rating).toBe(rating.toString());
  });

  it("should return a valid SVG response with proper headers for Unrated", async () => {
    let cacheSeconds = parseInt(
      req.query.cache_seconds || CONSTANTS.FOUR_HOURS,
      10
    );
    cacheSeconds = clamp_value(
      cacheSeconds,
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY
    );

    api.get.mockResolvedValue({
      data: {
        result: [
          {},
        ],
      },
    });

    await handler(req, res);

    document.body.innerHTML = res.send.mock.calls[0][0];
    const badge_color = document
      .querySelector("#background-color")
      .getAttribute("fill");
    const badge_rating = document.querySelector("#rating").innerHTML;

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      `max-age=${
        cacheSeconds / 2
      }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`
    );
    expect(badge_color).toBe(COLORS.NEWBIE);
    expect(badge_rating).toBe("0");
  });

  it("should handle Codeforces server error and send a text response with error message", async () => {
    api.get.mockRejectedValue({
      response: {
        status: 403,
      },
    });

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Codeforces Server Error");
  });

  it("should handle Codeforces handle not found error and send a text response with error message", async () => {
    api.get.mockRejectedValue({
      response: {
        status: 400,
      },
    });
    last_rating_cache.get = () => undefined;

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/plain");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Codeforces Handle Not Found");
  });
});
