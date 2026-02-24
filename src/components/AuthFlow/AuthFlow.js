"use client";

import { useState } from "react";
import Login from "../Login/Login";
import UserForm from "../UserForm/UserForm";

export default function AuthFlow() {
  const [showLogin, setShowLogin] = useState(true);

  // Aqui as props conectam a troca de state nativamente como a tela anterior
  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
      {showLogin ? (
        <Login
          onLogin={(user) => {
            // Seta o cookie simples que o Server Component page.js vai ler
            document.cookie = `userId=${user.id}; path=/; max-age=86400`;
            // Refresh da página obriga o Next a re-renderizar o Server Component
            window.location.reload(); 
          }}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <UserForm onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </main>
  );
}
