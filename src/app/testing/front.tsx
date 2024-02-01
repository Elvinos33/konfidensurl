'use client';

import React from 'react';
import { Link, newLink, deleteLink, login, register } from '@/lib/links';

export default function Front({ links, users }: { links: Link[]; users: any }) {
  const [q, setQ] = React.useState('');

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function loginUser(e, username: string, password: string) {
    e.preventDefault();
    const user = await login(username, password);
    console.log(user);
  }

  // objektet som blir sendt når man lager ny link
  const linkData = {
    url: 'https://www.eliasuran.dev',
    path: q,
    expires: new Date(),
  };
  return (
    <div className='flex flex-col gap-4'>
      <h1>elias tester</h1>
      {/* input field for å gi navn til nye paths */}
      <input
        type='text'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className='text-red-900 border-black border-2 rounded-md'
        placeholder='Path...'
      />
      <button onClick={() => newLink(linkData)} className='bg-red-400 p-2'>
        Legg til en ny url
      </button>

      <h1 className='text-3xl'>Alle linker laget:</h1>
      <div className='flex flex-col gap-2'>
        {/* mapper over alle linker */}
        {links.map((link) => (
          <div
            key={link.path}
            className='flex items-center gap-2 bg-red-400 rounded-lg p-1'
          >
            <a className='text-blue-700 underline' href={`/${link.path}`}>
              Path: {link.path}
            </a>{' '}
            - URL: {link.url} - Expires:{' '}
            {new Date(link.expires).toLocaleDateString('no-NO')} - Clicks:{' '}
            {link.clicks}
            {/* slett link */}
            <button
              onClick={() => deleteLink(link.path)}
              className='border-black border-2 rounded-lg p-1'
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
      <h1 className='text-2xl'>Login</h1>
      <form onSubmit={(e) => loginUser(e, username, password)}>
        <input
          type='text'
          className='border-black border-2'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          className='border-black border-2'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Login</button>
      </form>

      <h1 className='text-2xl'>Lag bruker</h1>
      <form onSubmit={() => register(username, password)}>
        <input
          type='text'
          className='border-black border-2'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          className='border-black border-2'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Lag bruker</button>
      </form>

      <div className='flex'>
        {users.map((user: any) => (
          <div
            key={user.id}
            className='p-2 flex flex-col border-2 border-black rounded-md'
          >
            <span>{user.username}</span>
            <span>{user.password}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
