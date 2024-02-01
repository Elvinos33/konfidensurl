import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (user === null) {
    return NextResponse.json({
      status: 401,
      message: 'Did not find a user with that username',
    });
  }

  const foundPassword = user.password;

  await bcrypt.compare(password, foundPassword, function (err, result) {
    if (err) {
      return NextResponse.json({
        status: 401,
        message: 'Incorrect username or password',
      });
    }
  });

  return NextResponse.json({ user: user, status: 'ok' });
}
