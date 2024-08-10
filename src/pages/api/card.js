import api from "../../cacheAxios.js";
import nunjucks from "nunjucks";
import path from "path";

import themes from "../../themes.js";

import {
  get_color_from_rating,
  CONSTANTS,
  clamp_value,
  capitalize,
  word_count,
} from "../../common.js";

function count_submissions(submissions) {
  let alreadySolved = {};
  let problemID;
  let count = 0;
  for (const submission of submissions) {
    problemID = submission.problem.contestId + "-" + submission.problem.index;
    if (submission.verdict == "OK" && !alreadySolved[problemID]) {
      count++;
      alreadySolved[problemID] = true;
    }
  }
  return count;
}

function check_overflow(category, maxCategory) {
  return word_count(category) + word_count(maxCategory) > 2;
}

export function renderCard(
  name,
  rating,
  category,
  maxCategory,
  maxRating,
  contests,
  problemsSolved,
  friendOfCount,
  contribution,
  themeConfig,
  disable_animations,
  show_icons
) {
  nunjucks.configure(path.join(process.cwd(), "src/template"), {
    autoescape: true,
  });
  return nunjucks.render("card.svg", {
    name,
    rating,
    category,
    maxCategory,
    breakCategory: check_overflow(category, maxCategory),
    height: 290 + (check_overflow(category, maxCategory) ? 25 : 0),
    maxRating,
    contests,
    problemsSolved,
    friendOfCount,
    contribution,
    categoryColor: get_color_from_rating(rating),
    maxCategoryColor: get_color_from_rating(maxRating),
    theme: themeConfig,
    animation: !disable_animations,
    show_icons: show_icons,
  });
}

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
    const apiConfig = {
      cache: {
        maxAge: cacheSeconds * 1000,
      },
    };

    Promise.all([
      api.get(`/user.info?handles=${username}`, apiConfig),
      api.get(`/user.rating?handle=${username}`, apiConfig),
      api.get(`/user.status?handle=${username}`, apiConfig),
    ])
      .then((responses) => {
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader(
          "Cache-Control",
          `max-age=${
            cacheSeconds / 2
          }, s-maxage=${cacheSeconds}, stale-while-revalidate=${
            CONSTANTS.ONE_DAY
          }`
        );

        let {
          firstName,
          lastName,
          rating,
          rank,
          maxRank,
          maxRating,
          friendOfCount,
          contribution,
        } = responses[0].data.result[0];

        rating = rating ? rating : 0;
        maxRating = maxRating ? maxRating : 0;
        show_icons = show_icons ? show_icons == "true" : true;
        disable_animations = disable_animations
          ? disable_animations == "true"
          : false;
        force_username = force_username ? force_username == "true" : false;
        const category = rank ? capitalize(rank) : "Unrated";
        const maxCategory = maxRank ? capitalize(maxRank) : "Unrated";

        let name;
        if (
          force_username ||
          (firstName == undefined && lastName == undefined)
        ) {
          name = username;
        } else {
          name = `${firstName} ${lastName}`
            .toString()
            .replace("undefined", "")
            .trim();
        }

        const contests = responses[1].data.result.length;

        const problemsSolved = count_submissions(responses[2].data.result);

        const colorScheme = {
          title_color,
          text_color,
          icon_color,
          border_color,
          bg_color,
        };
        Object.keys(colorScheme).forEach(
          (key) => colorScheme[key] == undefined && delete colorScheme[key]
        );
        const themeConfig = {
          ...themes["default"],
          ...themes[theme],
          ...colorScheme,
        };

        res.send(
          renderCard(
            name,
            rating,
            category,
            maxCategory,
            maxRating,
            contests,
            problemsSolved,
            friendOfCount,
            contribution,
            themeConfig,
            disable_animations,
            show_icons
          )
        );
        resolve();
      })
      .catch((error) => {
        res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
        res.status(404).send("User not found");
        console.error(error);
        resolve();
      });
  });
}
