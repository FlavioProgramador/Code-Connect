import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      postId: data.postId,
      authorId: data.authorId,
    },
  });
  return Response.json(comment);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  if (!postId)
    return Response.json({ error: "postId é obrigatório" }, { status: 400 });
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    include: { author: true },
  });
  return Response.json(comments);
}
