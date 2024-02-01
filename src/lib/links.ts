////////////////////////////// IMPORTS //////////////////////////////
import prisma from './prisma';

////////////////////////////// TYPES //////////////////////////////
export interface Link {
  url: string;
  path: string;
  expires: Date | null;
  clicks?: number;
}

////////////////////////////// FUNCTIONS //////////////////////////////
// lager en ny link med url, path og expires som parametere
export async function newLink({ url, path, expires }: Link) {
  const res = await fetch('api/links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
      path: path,
      expires: expires,
    }),
  });

  return await res.json();
}

// får url, path og expires som paramater og oppdaterer linken til path-en som er gitt.
// alle parameterene må være med, ellers blir de satt til default valuene sine
export async function updateLink({ url, path, expires }: Link) {
  const res = await fetch('api/links', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
      path: path,
      expires: expires,
    }),
  });

  return await res.json();
}

// sletter linken med path-en den får som param
export async function deleteLink(path: string) {
  const res = await fetch('api/links', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: path,
    }),
  });

  return await res.json();
}

// henter alle linker som eksisterer
export async function getAllLinks() {
  const links = await prisma.links.findMany();
  return links;
}

// henter en link basert på path som den får som parameter
export async function getLink(path: string) {
  const link = await prisma.links.findUnique({
    where: {
      path: path,
    },
  });
  return link;
}

// finner først antall clicks til linken med path-en fra param
// etter det legger den til et klikk til linken (clicks field er 0 by default, så trenger ikke sjekke for null eller no sånt)
export async function incrementClicks(path: string) {
  const data = await prisma.links.findUnique({
    where: {
      path: path,
    },
    select: {
      clicks: true,
    },
  });
  await prisma.links.update({
    where: {
      path: path,
    },
    data: {
      clicks: data.clicks + 1,
    },
  });
}
