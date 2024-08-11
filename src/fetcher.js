import { capitalize } from "@/common.js";
import { api, last_rating_cache, last_stats_cache } from "@/fetcher-utils.js";

function fetch_error_handler(fetch, username, last_cache) {
  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(function () {
      const res = last_cache.get(username);
      if (res != null) resolve(res);
      else reject({ status: 500, error: "Codeforces Server Error" });
    }, 2000);
    fetch()
      .then((result) => {
        clearTimeout(timeoutID);
        resolve(result);
      })
      .catch((error) => {
        if (error.status === 400){
          clearTimeout(timeoutID);
          reject(error);
        }
      });
  });
}

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
  return fetch_error_handler(
    () =>
      new Promise((resolve, reject) => {
        api
          .get(`/user.info?handles=${username}`, {
            cache: {
              ttl: cache_seconds * 1000,
            },
          })
          .then((response) => {
            const res = response.data.result[0].rating || 0;
            last_rating_cache.set(username, res);
            resolve(res);
          })
          .catch((error) => {
            if (error.response.status === 400)
              reject({ status: 400, error: "Codeforces Handle Not Found" });
            else reject({ status: 500, error: "Codeforces Server Error" });
          });
      }),
    username,
    last_rating_cache
  );
}

export function get_stats(username, cache_seconds) {
  const apiConfig = {
    cache: {
      ttl: cache_seconds * 1000,
    },
  };
  return fetch_error_handler(
    () =>
      new Promise((resolve, reject) => {
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

            const res = {
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
            };

            last_stats_cache.set(username, res);
            resolve(res);
          })
          .catch((error) => {
            if (error.response.status === 400)
              reject({ status: 400, error: "Codeforces Handle Not Found" });
            else reject({ status: 500, error: "Codeforces Server Error" });
          });
      }),
    username,
    last_stats_cache
  );
}
