"use client";
import { useState } from "react";
import CardPost from "@/components/CardPost/CardPost";
import UserForm from "@/components/UserForm";
import Login from "@/components/Login";
import ModalPost from "@/components/ModalPost";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const api = require("../services/api").default;

  const handleCreatePost = async (data) => {
    try {
      await api.post("/posts", data);
      setRefresh((r) => r + 1);
    } catch {
      alert("Erro ao criar post");
    }
  };

  if (!user) {
    return (
      <main>
        {showLogin ? (
          <Login
            onLogin={setUser}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <UserForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </main>
    );
  }

  return (
    <main>
      <p style={{ textAlign: "right", margin: 0 }}>Bem-vindo, {user.name}!</p>
      <button
        style={{
          background: "#171d1f",
          color: "#00bfae",
          border: "1px solid #00bfae",
          borderRadius: 8,
          padding: "12px 32px",
          fontSize: 20,
          fontWeight: 600,
          margin: "24px 0 32px 0",
          display: "block",
        }}
        onClick={() => setModalOpen(true)}
      >
        Publicar
      </button>
      <ModalPost
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
        authorId={user.id}
      />
      <CardPost key={refresh} />
    </main>
  );
}
