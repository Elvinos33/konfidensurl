////////////////////////////// IMPORTS //////////////////////////////
import prisma from './prisma';

////////////////////////////// TYPES //////////////////////////////
export interface Link {
  id: number;
  url: string;
  path: string;
  expires: Date | undefined | null;
  clicks?: number;
}

////////////////////////////// FUNCTIONS //////////////////////////////
// lager en ny link med url, path og expires som parametere
export async function newLink({ url, path, expires }: Link, token: string) {
  const res = await fetch('/api/links', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
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
export async function updateLink({ id, url, path, expires }: Link) {
  const res = await fetch('/api/links', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      url: url,
      path: path,
      expires: expires,
    }),
  });

  return await res.json();
}

export async function deletion(id: number) {
  await prisma.links.delete({
    where: { id: id },
  });
}

// sletter linken med path-en den får som param
export async function deleteLink(id: number) {
  const res = await fetch('/api/links', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  return await res.json();
}

// henter alle linker som eksisterer
export async function getAllLinks() {
  const res = await fetch('/api/links', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

// henter en link basert på path som den får som parameter
// sjekker også om linken har utløpt, og om den har det slette den linken
export async function getLink(path: string) {
  const parsedPath = path.replaceAll('%20', ' ');
  const link = await prisma.links.findUnique({
    where: {
      path: parsedPath,
    },
  });

  if (link && link.expires && new Date() > link.expires) {
    await deletion(link.id);
    return undefined;
  }

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
  if (!data) {
    return null;
  }
  await prisma.links.update({
    where: {
      path: path,
    },
    data: {
      clicks: data?.clicks + 1,
    },
  });
}
