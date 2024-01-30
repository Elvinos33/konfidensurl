import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  const links = await prisma.links.findMany();
  console.log(links);
  return NextResponse.json(links);
}
