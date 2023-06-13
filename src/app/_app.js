import { NextApp } from 'next/app';
import { metadata } from '@/app/components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;