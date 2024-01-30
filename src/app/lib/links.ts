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

// henter alle linker som eksisterer
export async function getAllLinks() {
  // får error uten localhost:3000 vet ikke hvorfor
  const res = await fetch('http://localhost:3000/api/getAllLinks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.log('Error: ', await res.json());
  }

  const data = await res.json();
  return data;
}
