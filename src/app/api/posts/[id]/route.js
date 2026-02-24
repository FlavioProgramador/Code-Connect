import { NextResponse } from "next/server";
import {
  getPostById,
  updateExistingPost,
  removePost,
} from "@/services/post.service";

/**
 * GET /api/posts/:id — Buscar post por ID
 */
export async function GET(request, { params }) {
  try {
    const post = await getPostById(params.id);
    return NextResponse.json(post);
  } catch (error) {
    const status = error.message.includes("não encontrado") ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

/**
 * PUT /api/posts/:id — Atualizar post
 * Body: campos a atualizar (title, slug, body, cover, markdown)
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const post = await updateExistingPost(params.id, body);
    return NextResponse.json(post);
  } catch (error) {
    const status = error.message.includes("obrigatório") ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}

/**
 * DELETE /api/posts/:id — Remover post
 */
export async function DELETE(request, { params }) {
  try {
    await removePost(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
