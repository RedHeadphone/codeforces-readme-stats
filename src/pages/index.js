import Head from 'next/head'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.replace('https://redheadphone.github.io/Codeforces-readme-stats/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head>
        <title>CodeForces Readme Stats</title>
        <meta name="description" content="Dynamically generated codeforces stats for your github readmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Redirecting to docs...
    </>
  )
}
