import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  // Garante que um usuário só pode dar like uma vez por post
  const like = await prisma.like.upsert({
    where: {
      postId_userId: {
        postId: data.postId,
        userId: data.userId,
      },
    },
    update: {},
    create: {
      postId: data.postId,
      userId: data.userId,
    },
  });
  return Response.json(like);
}

export async function DELETE(req) {
  const data = await req.json();
  await prisma.like.delete({
    where: {
      postId_userId: {
        postId: data.postId,
        userId: data.userId,
      },
    },
  });
  return Response.json({ success: true });
}
