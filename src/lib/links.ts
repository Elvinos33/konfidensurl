////////////////////////////// IMPORTS //////////////////////////////
import prisma from "./prisma";

////////////////////////////// TYPES //////////////////////////////
export interface Link {
  url: string;
  path: string;
  expires: number | null;
  clicks?: number;
}

////////////////////////////// FUNCTIONS //////////////////////////////
// lager en ny link med url, path og expires som parametere
export async function newLink({ url, path, expires }: Link) {
  const res = await fetch("/api/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const res = await fetch("/api/links", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
      path: path,
      expires: expires,
    }),
  });

  return await res.json();
}

export async function deletion(path: string) {
  await prisma.links.delete({
    where: { path: path },
  });
}

// sletter linken med path-en den får som param
export async function deleteLink(path: string) {
  const res = await fetch("/api/links", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: path,
    }),
  });

  return await res.json();
}

// henter alle linker som eksisterer
export async function getAllLinks() {
  const res = await fetch("/api/links", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

// henter en link basert på path som den får som parameter
// sjekker også om linken har utløpt, og om den har det slette den linken
export async function getLink(path: string) {
  const parsedPath = path.replaceAll("%20", " ");
  const link: Link = await prisma.links.findUnique({
    where: {
      path: parsedPath,
    },
  });

  if (link && link.expires && Date.now() > link.expires) {
    await deletion(path);
    return null;
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
