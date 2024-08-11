import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = Axios.create({
  baseURL: "https://codeforces.com/api",
  headers: {
    "User-Agent": "Codeforces Readme Stats",
  },
});
export const api = setupCache(instance);
