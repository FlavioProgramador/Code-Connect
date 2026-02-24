import { NextResponse } from "next/server";
import {
  getAllPosts,
  createNewPost,
} from "@/services/post.service";

/**
 * GET /api/posts — Listar todos os posts
 */
export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts — Criar novo post
 * Body: { title, slug, body, authorId, cover?, markdown? }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const post = await createNewPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    const status = error.message.includes("obrigatório") ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
