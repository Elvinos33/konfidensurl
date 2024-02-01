import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { url, path, expires } = await request.json();
  await prisma.links.create({
    data: {
      url: url,
      path: path,
      expires: expires,
    },
  });
  return NextResponse.json({ status: 'ok' });
}

export async function PUT(request: NextRequest) {
  const { url, path, expires } = await request.json();
  const link = await prisma.links.update({
    where: { path: path},
    data: {
      url: url,
      path: path,
      expires: expires,
    },
  })
  return NextResponse.json({ link: link, status: 'ok' });
}

export async function DELETE(request: NextRequest) {
  const { path } = await request.json();
  await prisma.links.delete({
    where: { path: path },
  })
  return NextResponse.json({ status: 'ok' });
}
