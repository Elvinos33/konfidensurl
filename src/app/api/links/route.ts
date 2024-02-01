import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function handleError(error: any) {
  if (error.code === 'P2002') {
    return NextResponse.json(
      { message: 'Path already exists' },
      { status: 400 },
    );
  }
  return NextResponse.json({ message: 'Error' }, { status: 500 });
}

// get all links
export async function GET() {
  try {
    const links = await prisma.links.findMany();
    return NextResponse.json({ links: links }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// new link
export async function POST(request: NextRequest) {
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
      { link: link, message: 'Successfully created new link' },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}

// update link
export async function PUT(request: NextRequest) {
  try {
    const { url, path, expires } = await request.json();
    const link = await prisma.links.update({
      where: { path: path },
      data: {
        url: url,
        path: path,
        expires: expires,
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
    return handleError(error);
  }
}

// delete link
export async function DELETE(request: NextRequest) {
  try {
    const { path } = await request.json();
    await prisma.links.delete({
      where: { path: path },
    });
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
