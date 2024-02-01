import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const user = await prisma.users.findUnique({
    where: {
      username: username,
      password: password,
    },
  });

  console.log(user);

  return NextResponse.json({ user: user, status: 'ok' });
}
