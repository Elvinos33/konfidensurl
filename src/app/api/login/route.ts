import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

      let secret = '';
      if (process.env.JWT_SECRET) secret = process.env.JWT_SECRET;

      if (!user) {
        return NextResponse.json(
          {
            message: 'Did not find a user with that username',
          },
          { status: 404 },
        );
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secret,
        { expiresIn: '1h' },
      );

      const response = NextResponse.json(
        { user: user, token: token },
        { status: 200 },
      );

      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
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
