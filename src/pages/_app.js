import dynamic from 'next/dynamic'
import Head from 'next/head'
import '@/styles/globals.css'

function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>Codeforces Readme Stats</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </Head>
  <Component {...pageProps} />
  </>
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false
})