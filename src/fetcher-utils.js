import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { kv } from "@vercel/kv";

const instance = Axios.create({
  baseURL: "https://codeforces.com/api",
  headers: {
    "User-Agent": "Codeforces Readme Stats",
  },
});

export const api = setupCache(instance);

class KVCache {
  constructor(type) {
    this.type = type;
  }

  get(key) {
    return kv.get(key+"/"+this.type);
  }

  set(key, value) {
    kv.set(key+"/"+this.type, value);
  }
}

export const last_rating_cache = new KVCache("rating");
export const last_stats_cache = new KVCache("stats");
