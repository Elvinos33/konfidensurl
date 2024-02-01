import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ user: user, status: 'ok' });
}
