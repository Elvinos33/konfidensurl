'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4';

export default function Redirect({ url }: { url: string | undefined }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!url) return;
    ReactGA.send({
      hitType: 'pageview',
      page: pathname,
      title: `The path: ${pathname} was visited`,
    });
    window.location.href = url;
  }, []);
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      {url ? (
        <div className='flex flex-col items-center'>
          <h1 className='text-konfidens-green text-4xl font-bold'>
            Redirecting to:
          </h1>
          <h2 className='text-konfidens-darkGreen text-2xl font-semibold'>
            {url}
          </h2>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <h1 className='text-konfidens-green text-4xl font-bold'>404</h1>
          <h2 className='text-konfidens-darkGreen text-2xl font-semibold'>
            No URL found at {pathname}
          </h2>
        </div>
      )}
    </div>
  );
}
