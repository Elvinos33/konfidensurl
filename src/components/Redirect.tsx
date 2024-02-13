'use client';

import { useEffect } from 'react';

export default function Redirect({ url }: { url: string }) {
  useEffect(() => {
    if (url) window.location.href = url;
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
