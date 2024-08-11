import { capitalize } from "@/common.js";
import { api } from "@/axios.js";

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

export function get_rating(username, cache_seconds) {
  return new Promise((resolve, reject) => {
    api
      .get(`/user.info?handles=${username}`, {
        cache: {
          ttl: cache_seconds * 1000,
        },
      })
      .then((response) => {
        resolve(response.data.result[0].rating || 0);
      })
      .catch((error) => {
        if (error.response.status === 400)
          reject({ status: 400, error: "Codeforces Handle Not Found" });
        else reject({ status: 500, error: "Codeforces Server Error" });
      });
  });
}

export function get_stats(username, cache_seconds) {
  const apiConfig = {
    cache: {
      ttl: cache_seconds * 1000,
    },
  };
  return new Promise((resolve, reject) => {
    Promise.all([
      api.get(`/user.info?handles=${username}`, apiConfig),
      api.get(`/user.rating?handle=${username}`, apiConfig),
      api.get(`/user.status?handle=${username}`, apiConfig),
    ])
      .then((responses) => {
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
        rank = rank ? capitalize(rank) : "Unrated";
        maxRank = maxRank ? capitalize(maxRank) : "Unrated";

        const fullName = `${firstName} ${lastName}`
          .replace("undefined", "")
          .replace("undefined", "")
          .trim();
        const contestsCount = responses[1].data.result.length;
        const problemsSolved = count_submissions(responses[2].data.result);

        resolve({
          username,
          fullName,
          rating,
          maxRating,
          rank,
          maxRank,
          contestsCount,
          problemsSolved,
          friendOfCount,
          contribution,
        });
      })
      .catch((error) => {
        if (error.response.status === 400)
          reject({ status: 400, error: "Codeforces Handle Not Found" });
        else reject({ status: 500, error: "Codeforces Server Error" });
      });
  });
}
