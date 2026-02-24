import prisma from "@/lib/prisma";

/**
 * Repository Layer — acesso direto ao banco via Prisma.
 * Responsabilidade: CRUD puro, sem regras de negócio.
 */

export async function findAllPosts() {
  return prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function findPostById(id) {
  return prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
}

export async function createPost(data) {
  return prisma.post.create({
    data,
    include: { author: true },
  });
}

export async function updatePost(id, data) {
  return prisma.post.update({
    where: { id: Number(id) },
    data,
    include: { author: true },
  });
}

export async function deletePost(id) {
  return prisma.post.delete({
    where: { id: Number(id) },
  });
}

