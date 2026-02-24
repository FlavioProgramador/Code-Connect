import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Nenhuma imagem foi recebida" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Gerar nome único evitando colisões
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // Manter a extensão original
    const extension = path.extname(file.name);
    const filename = `upload-${uniqueSuffix}${extension}`;

    // Path absoluto para pasta public local do React NextJs
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Certificar diretório existente
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    // Salvar o buffer diretamente na máquina local
    fs.writeFileSync(filepath, buffer);

    // Retorna a URL relativa servida em produção na var /uploads/arquivo.xxx
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 200 });

  } catch (error) {
    console.error("Erro no Upload Local:", error);
    return NextResponse.json(
      { error: "Houve um problema ao subir o arquivo." },
      { status: 500 }
    );
  }
}
