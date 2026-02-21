import { Prompt } from 'next/font/google'

import Aside from "@/components/Aside/Aside";
import "./globals.css";
import CardPost from '@/components/CardPost/CardPost';

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs",
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
