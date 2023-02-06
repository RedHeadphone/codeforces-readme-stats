import axios from "axios";
import nunjucks from "nunjucks";
import path from "path";

import themes from "../../themes.js";

import { get_color_from_rank } from "../../scripts/common.js";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function count_submissions(submissions) {
  let alreadySolved = {};
  let problemID;
  let count = 0;
  for (const submission of submissions) {
    problemID = submission.problem.contestId+"-"+submission.problem.index;
    if (submission.verdict == "OK" && !alreadySolved[problemID]) {
      count++;
      alreadySolved[problemID] = true;
    }
  }
  return count;
}

function word_count(str) { 
  return str.split(" ").length;
}

function check_overflow(category,maxCategory){
  return ( word_count(category) + word_count(maxCategory) )>2;
}

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const { username, forceusername, theme = "default", title_color, text_color, icon_color, border_color, bg_color } = req.query;

    nunjucks.configure(path.join(process.cwd(), "src/template"), {
      autoescape: true,
    });

    if (themes[theme] == undefined) {
      res.status(404).send("Theme not found");
      resolve();
      return;
    }

    Promise.all([
      axios.get(`https://codeforces.com/api/user.info?handles=${username}`),
      axios.get(`https://codeforces.com/api/user.rating?handle=${username}`),
      axios.get(`https://codeforces.com/api/user.status?handle=${username}`),
    ])
      .then((responses) => {
        res.setHeader("Content-Type", "image/svg+xml");
        const {
          firstName,
          lastName,
          rating,
          rank,
          maxRank,
          maxRating,
          friendOfCount,
          contribution,
        } = responses[0].data.result[0];
        let name;
        if (
          forceusername ||
          (firstName == undefined && lastName == undefined)
        ) {
          name = username;
        } else {
          name = `${firstName} ${lastName}`.toString();
          name = name.replace("undefined", "").trim();
        }
        const category = capitalize(rank);
        const maxCategory = capitalize(maxRank);

        const contests = responses[1].data.result.length;

        const problemsSolved = count_submissions(
          responses[2].data.result
        );
        const colorScheme = {title_color, text_color, icon_color, border_color, bg_color}
        Object.keys(colorScheme).forEach((key) => (colorScheme[key] == undefined) && delete colorScheme[key]);
        const themeConfig = {
          ...themes["default"],
          ...themes[theme],
          ...colorScheme
        };
        res.send(
          nunjucks.render("card.svg", {
            name,
            rating,
            category,
            maxCategory,
            breakCategory: check_overflow(category,maxCategory),
            maxRating,
            contests,
            problemsSolved,
            friendOfCount,
            contribution,
            categoryColor: get_color_from_rank(rating),
            maxCategoryColor: get_color_from_rank(maxRating),
            theme: themeConfig,
          })
        );
        resolve();
      })
      .catch((error) => {
        res.status(404).send("User not found");
        resolve();
      });
  });
}
