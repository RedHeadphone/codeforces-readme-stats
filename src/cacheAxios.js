import { setup } from 'axios-cache-adapter'

const api = setup({
    baseURL: 'https://codeforces.com/api',
    cache: {
      exclude: { query: false }
    }
})

export default api