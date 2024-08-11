import { get_rating } from "@/fetcher.js";
import {
  renderTemplate,
  get_color_from_rating,
  CONSTANTS,
  clamp_value,
} from "@/common.js";

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { username, cache_seconds } = req.query;

    const cacheSeconds = clamp_value(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY
    );

    get_rating(username, cacheSeconds)
      .then((rating) => {
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader(
          "Cache-Control",
          `max-age=${
            cacheSeconds / 2
          }, s-maxage=${cacheSeconds}, stale-while-revalidate=${
            CONSTANTS.ONE_DAY
          }`
        );

        res.send(
          renderTemplate("badge.svg", {
            rating,
            color: get_color_from_rating(rating),
          })
        );
        resolve();
      })
      .catch(({ status, error }) => {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
        res.status(status).send(error);
        resolve();
      });
  });
}
