////////////////////////////// IMPORTS //////////////////////////////
import prisma from './prisma';
import jwt from 'jsonwebtoken';

////////////////////////////// TYPES //////////////////////////////
export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Token {
  userId: number;
  username: string;
}

////////////////////////////// LOGIN RELATED FUNCTIONS //////////////////////////////
// lager ny bruker
// hasher passord
export async function register(username: string, password: string) {
  const res = await fetch('/api/register', {
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
  const res = await fetch('/api/login', {
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

// henter alle brukere
export async function getAllUsers() {
  const users: User[] = await prisma.users.findMany();
  return users;
}

////////////////////////////// LOGIN SESSION //////////////////////////////
// sjekker om bruker er logget inn
// trenger token som parameter siden får ikke lov til å hente cookies her av en eller annen grunn
// BARE KALL PÅ DENNE FUNKSJONEN SERVERSIDE!!!
export async function validateUser(token: string | undefined) {
  if (!token) {
    return { message: 'No token found', token: null };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { message: 'Validated token, access granted >:)', token: decoded };
  } catch (error) {
    return { message: 'Invalid token', token: null };
  }
}
