'use client';

import { newLink } from '../lib/links';

export default function Page() {
  const linkData = {
    url: 'eliasuran.dev',
    path: 'elias',
    expires: new Date(),
  };
  return (
    <div>
      <h1>elias tester</h1>
      <button onClick={() => newLink(linkData)} className='bg-red-400 p-2'>
        Legg til en ny url
      </button>
    </div>
  );
}
