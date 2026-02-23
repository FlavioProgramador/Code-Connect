import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
  return Response.json(posts);
}

export async function POST(req) {
  const data = await req.json();
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    },
  });
  return Response.json(post);
}
