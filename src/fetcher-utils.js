import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = Axios.create({
  baseURL: "https://codeforces.com/api",
  headers: {
    "User-Agent": "Codeforces Readme Stats",
  },
});

export const api = setupCache(instance);
export const last_rating_cache = new Map();
export const last_stats_cache = new Map();
