import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  const clicks = await prisma.links.findUnique({
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
      clicks: clicks.clicks + 1,
    },
  });
  return NextResponse.json({ status: 'ok' });
}
