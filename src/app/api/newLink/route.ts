import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

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
