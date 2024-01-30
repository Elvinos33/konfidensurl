import prisma from "./prisma";

export interface Link {
  url: string;
  path: string;
  expires: Date;
  clicks?: number;
}

export async function newLink({ url, path, expires }: Link) {
  const res = await fetch('api/newLink', {
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

  if (!res.ok) {
    console.log('Error: ', await res.json());
  }

  console.log("Successfully added new link with path: ", path)
  const data = await res.json();
  return data;
}

// henter alle linker som eksisterer
export async function getAllLinks() {
  const links = await prisma.links.findMany();
  console.log("Links: ", links)
  return links;
}

export async function getLink(path: string) {
  const link = await prisma.links.findUnique({
    where: {
      path: path,
    },
  })
  return link
}
