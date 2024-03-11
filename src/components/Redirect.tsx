'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function Redirect({ url }: { url: string | undefined }) {
  useEffect(() => {
    if (url) window.location.href = url;
    ReactGA.initialize('G-L6ZR8P56VP');
    ReactGA.send({ hitType: 'pageview', page: url });
  }, []);
  return (
    <>
      {url ? (
        <h1 className='text-4xl'>Redirecting to {url}</h1>
      ) : (
        <h1 className='text-4xl'>404</h1>
      )}
    </>
  );
}
