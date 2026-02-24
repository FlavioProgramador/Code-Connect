import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const authors = await prisma.author.findMany();
    // Mapeando a entidade Author (banco) para o formato esperado pelo front (Login/UserForm)
    const users = authors.map((author) => ({
      id: author.id,
      name: author.name,
      email: author.username, // Usa username como email
      avatar: author.avatar,
    }));
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Nome e Email são obrigatórios" }, { status: 400 });
    }

    const newAuthor = await prisma.author.create({
      data: {
        name: body.name,
        username: body.email, // Usa email como username no BD
        avatar: "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png", // Mock
      },
    });

    return NextResponse.json({
      id: newAuthor.id,
      name: newAuthor.name,
      email: newAuthor.username
    }, { status: 201 });
  } catch (error) {
    // Erro de unique constraint (usuário já existe)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este email já está cadastrado" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
