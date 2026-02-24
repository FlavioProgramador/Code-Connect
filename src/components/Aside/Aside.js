"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "./logo-code-connect.png";
import styles from "./Aside.module.css";
import ModalPost from "../ModalPost/ModalPost";

const Aside = ({ authorId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleCreatePost = async (data) => {
    try {
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      
      const payload = {
        title: data.title,
        slug: slug,
        body: data.content,
        // Usa o authorId real do usuário autenticado (ou 1 de fallback)
        authorId: authorId || 1
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), 
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar no banco");
      }

      router.refresh(); 
      setModalOpen(false);
    } catch (err) {
      alert("Erro ao criar post: " + err.message);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <aside className={styles.aside}>
      <Image src={logo} alt="Logo Code Connect" className={styles.logo} />

      <button
        className={styles["publish-btn"]}
        onClick={() => setModalOpen(true)}
      >
        Publicar
      </button>

      <nav className={styles.nav}>
        <Link href="/" className={styles["nav-item"]}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Feed
        </Link>

        <Link href="#" className={styles["nav-item"]}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Perfil
        </Link>

        <Link href="#" className={styles["nav-item"]}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Sobre nós
        </Link>
        
        {/* Sair */}
        <Link href="#" onClick={handleLogout} className={styles["nav-item"]} style={{ marginTop: "auto" }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </Link>
      </nav>

      <ModalPost
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </aside>
  );
};

export default Aside;
