import { Prompt } from 'next/font/google'
import { cookies } from "next/headers";

import Aside from "@/components/Aside/Aside";
import "./globals.css";

export const metadata = {
  title: "Code Connect",
  description: "Code Connect é a rede social para desenvolvedores: compartilhe posts, descubra projetos e conecte-se com a comunidade dev.",
};

const prompt = Prompt({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
})

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return (
    <html lang="pt-BR" className={prompt.className}>
      <body>
        <div className="app-container">
          {userId && <Aside authorId={Number(userId)} />}
          {children}
        </div>
      </body>
    </html>
  );
}

