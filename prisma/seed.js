import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// A migration cria o banco em ./dev.db relativo à raiz do projeto (conforme prisma.config.ts)
const dbPath = path.resolve(__dirname, "../dev.db");

const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpar dados existentes
  await prisma.post.deleteMany();
  await prisma.author.deleteMany();

  // Criar autores
  const ana = await prisma.author.create({
    data: {
      name: "Ana Beatriz",
      username: "anabeatriz_dev",
      avatar:
        "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png",
    },
  });

  const joao = await prisma.author.create({
    data: {
      name: "João Silva",
      username: "joaosilva",
      avatar:
        "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png",
    },
  });

  // A única imagem de post confirmada nos assets do curso é introducao-ao-react.png
  const COVER = "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png";

  // Criar posts
  await prisma.post.createMany({
    data: [
      {
        cover: COVER,
        title: "Introdução ao React",
        slug: "introducao-ao-react",
        body: "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
        markdown:
          "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
        authorId: ana.id,
      },
      {
        cover: COVER,
        title: "Desbravando o Rust",
        slug: "desbravando-rust",
        body: "Rust é uma linguagem de programação de sistemas focada em segurança, velocidade e concorrência. Vamos explorar os fundamentos do Rust e seu sistema de ownership.",
        markdown:
          "```rust\nfn main() {\n  println!(\"Hello, Rust!\");\n}\n```",
        authorId: joao.id,
      },
      {
        cover: COVER,
        title: "Angular Directives na Prática",
        slug: "angular-directives",
        body: "As directives são uma das funcionalidades mais poderosas do Angular. Aprenda a criar structural e attribute directives para tornar seus templates mais dinâmicos.",
        markdown:
          "```typescript\n@Directive({ selector: '[appHighlight]' })\nexport class HighlightDirective {}\n```",
        authorId: ana.id,
      },
    ],
  });


  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
