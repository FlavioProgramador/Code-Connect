import { Prompt } from 'next/font/google'

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR " className={prompt.className}>
      <body>
        <div className="app-container">
          <Aside />
          {children}
        </div>
      </body>
    </html>
  );
}
