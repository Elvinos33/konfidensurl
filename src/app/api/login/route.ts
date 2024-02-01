import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const foundUser = await prisma.users.findUnique({
      where: {
        username: username,
      },
      select: {
        password: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json(
        {
          message: 'Did not find a user with that username',
        },
        { status: 404 },
      );
    }

    const foundPassword = foundUser.password;

    const match = await bcrypt.compare(password, foundPassword);

    if (match) {
      const user = await prisma.users.findUnique({
        where: {
          username: username,
          password: foundPassword,
        },
        select: {
          username: true,
          id: true,
        },
      });
      return NextResponse.json({ user: user }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: 'Incorrect password',
        },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
