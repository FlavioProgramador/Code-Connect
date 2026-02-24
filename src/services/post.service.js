import {
  findAllPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from "@/repositories/post.repository";

/**
 * Service Layer — lógica de negócio, validação e normalização de erros.
 * A UI deve chamar apenas esta camada, nunca o repository diretamente.
 */

export async function getAllPosts() {
  try {
    return await findAllPosts();
  } catch (error) {
    console.error("[PostService] getAllPosts:", error.message);
    throw new Error("Não foi possível carregar os posts.");
  }
}

export async function getPostById(id) {
  if (!id) throw new Error("ID do post é obrigatório.");
  try {
    const post = await findPostById(id);
    if (!post) throw new Error("Post não encontrado.");
    return post;
  } catch (error) {
    console.error(`[PostService] getPostById(${id}):`, error.message);
    throw error;
  }
}

export async function createNewPost(data) {
  const { title, slug, body, authorId } = data;
  if (!title || !slug || !body || !authorId) {
    throw new Error("Campos obrigatórios: title, slug, body, authorId.");
  }
  try {
    return await createPost(data);
  } catch (error) {
    console.error("[PostService] createNewPost:", error.message);
    throw new Error("Não foi possível criar o post.");
  }
}

export async function updateExistingPost(id, data) {
  if (!id) throw new Error("ID do post é obrigatório.");
  try {
    return await updatePost(id, data);
  } catch (error) {
    console.error(`[PostService] updateExistingPost(${id}):`, error.message);
    throw new Error("Não foi possível atualizar o post.");
  }
}

export async function removePost(id) {
  if (!id) throw new Error("ID do post é obrigatório.");
  try {
    await deletePost(id);
  } catch (error) {
    console.error(`[PostService] removePost(${id}):`, error.message);
    throw new Error("Não foi possível remover o post.");
  }
}

