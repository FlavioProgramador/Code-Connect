import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return Response.json(user);
}

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
