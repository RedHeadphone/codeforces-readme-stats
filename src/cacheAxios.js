import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

const instance = Axios.create({
  baseURL: 'https://codeforces.com/api',
});
const api = setupCache(instance)

export default api