import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Link, deletion } from '@/lib/links';
import { headers } from 'next/headers';
import { validateUser } from '@/lib/login';

function handleError(error: any) {
  if (error.code === 'P2002') {
    return NextResponse.json(
      { message: 'Path already exists' },
      { status: 400 },
    );
  }
  return NextResponse.json({ message: error.message }, { status: 500 });
}

// get all links
export async function GET() {
  try {
    const links = await prisma.links.findMany();
    links.map(
      (link: Link) =>
        link.expires && new Date() > link.expires && deletion(link.id),
    );
    return NextResponse.json({ links: links }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { links: [], message: error.message },
      { status: 200 },
    );
  }
}

// new link
export async function POST(request: NextRequest) {
  const authorized = await checkAuthorization();
  if (!authorized)
    return NextResponse.json(
      {
        message: 'Unauthorized token or missing token in Authorization header',
      },
      { status: 401 },
    );

  try {
    const { url, path, expires } = await request.json();

    const link = await prisma.links.create({
      data: {
        url: url,
        path: path,
        expires: expires,
      },
    });

    return NextResponse.json(
      { link: link, message: 'Successfully created new link', status: 200 },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}

// update link
export async function PUT(request: NextRequest) {
  const authorized = await checkAuthorization();
  if (!authorized)
    return NextResponse.json(
      {
        message: 'Unauthorized token or missing token in Authorization header',
      },
      { status: 401 },
    );

  try {
    const { id, url, path, expires } = await request.json();

    let checkedExpires = expires;

    if (!expires) {
      checkedExpires = null;
    }

    const link = await prisma.links.update({
      where: { id: id },
      data: {
        url,
        path,
        expires: checkedExpires,
      },
    });

    return NextResponse.json(
      {
        link: link,
        message: 'Successfully updated link',
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

// delete link
export async function DELETE(request: NextRequest) {
  const authorized = await checkAuthorization();
  if (!authorized)
    return NextResponse.json(
      {
        message: 'Unauthorized token or missing token in Authorization header',
      },
      { status: 401 },
    );

  try {
    const { id } = await request.json();
    await deletion(id);
    return NextResponse.json(
      {
        message: 'Successfully deleted link',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}

// used to validate the user's token on requests
// getting the token from authorization header
// maybe better built in way to do this, but this at least works
export async function checkAuthorization() {
  const authHeader = headers().get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.split(' ')[1];

  const validate = await validateUser(token);
  if (!validate.valid) return false;

  return true;
}
