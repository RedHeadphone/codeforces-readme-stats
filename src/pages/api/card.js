import { get_stats } from "@/fetcher.js";
import themes from "@/themes.js";
import {
  renderTemplate,
  get_color_from_rating,
  CONSTANTS,
  clamp_value,
} from "@/common.js";

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    let {
      username,
      force_username,
      theme = "default",
      title_color,
      text_color,
      icon_color,
      border_color,
      bg_color,
      cache_seconds,
      disable_animations,
      show_icons,
    } = req.query;

    if (themes[theme] == undefined) {
      res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
      res.status(404).send("Theme not found");
      resolve();
      return;
    }

    const cacheSeconds = clamp_value(
      parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY
    );

    get_stats(username, cacheSeconds)
      .then(
        ({
          username,
          fullName,
          rating,
          maxRating,
          rank,
          maxRank,
          contestsCount,
          problemsSolved,
          submissions,
          friendOfCount,
          contribution,
        }) => {
          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader(
            "Cache-Control",
            `max-age=${
              cacheSeconds / 2
            }, s-maxage=${cacheSeconds}, stale-while-revalidate=${
              CONSTANTS.ONE_DAY
            }`
          );

          show_icons = show_icons !== "false";
          disable_animations = disable_animations === "true";
          force_username = force_username === "true";

          const name = force_username || fullName === "" ? username : fullName;

          const customColorScheme = {
            title_color,
            text_color,
            icon_color,
            border_color,
            bg_color,
          };
          Object.keys(customColorScheme).forEach(
            (key) =>
              customColorScheme[key] == undefined &&
              delete customColorScheme[key]
          );
          const colorScheme = {
            ...themes["default"],
            ...themes[theme],
            ...customColorScheme,
          };
          const width = Math.max(380, 70 + name.length * 13);
          const breakBetweenRank = (rank.length + maxRank.length + 8)*10 + 34 > width;
          const height = 290 + (breakBetweenRank ? 22 : 0);

          res.send(
            renderTemplate("card.svg", {
              name,
              rating,
              maxRating,
              rank,
              maxRank,
              breakBetweenRank,
              height,
              width,
              contestsCount,
              problemsSolved,
              submissions,
              friendOfCount,
              contribution,
              rankColor: get_color_from_rating(rating),
              maxRankColor: get_color_from_rating(maxRating),
              theme: colorScheme,
              animation: !disable_animations,
              show_icons: show_icons,
            })
          );
          resolve();
        }
      )
      .catch(({ status, error }) => {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
        res.status(status).send(error);
        resolve();
      });
  });
}
