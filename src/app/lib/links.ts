export interface Link {
  url: string;
  path: string;
  expires: Date;
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

  const data = await res.json();
  return data;
}

// get links
export async function getAllLinks() {
  // TODO: get all links
}
