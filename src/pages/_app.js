import dynamic from 'next/dynamic'
import '@/styles/globals.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false
})