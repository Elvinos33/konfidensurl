////////////////////////////// IMPORTS //////////////////////////////
import prisma from './prisma';

////////////////////////////// TYPES //////////////////////////////
export interface User {
  id: number;
  username: string;
  password: string;
}

////////////////////////////// LOGIN RELATED FUNCTIONS //////////////////////////////
// lager ny bruker
// hasher passord
export async function register(username: string, password: string) {
  const res = await fetch('api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return await res.json();
}

// logger in bruker
export async function login(username: string, password: string) {
  try {
    const res = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    return await res.json();
  } catch (error) {
    console.log('Error: ', error);
  }
}

// henter alle brukere
export async function getAllUsers() {
  const users: User[] = await prisma.users.findMany();
  return users;
}
