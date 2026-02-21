
import "./globals.css";


export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
