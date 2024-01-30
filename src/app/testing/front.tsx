'use client';

import { newLink } from '../lib/links';

export default async function Front() {
  const linkData = {
    url: 'eliasuran.dev',
    path: 'elias',
    expires: new Date(),
  };
  return (
    <div className='flex flex-col gap-4'>
      <h1>elias tester</h1>
      <button onClick={() => newLink(linkData)} className='bg-red-400 p-2'>
        Legg til en ny url
      </button>

      <h1 className='text-3xl'>Alle linker laget:</h1>
      <div className='flex flex-wrap gap-2'></div>
    </div>
  );
}
