"use client";
import { useState } from "react";
import styles from "./ModalPost.module.css";

const ModalPost = ({ open, onClose, onSubmit, authorId }) => {
  const [form, setForm] = useState({ title: "", content: "", cover: "", markdown: "" });
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.content) {
      setError("Preencha todos os campos.");
      return;
    }
    await onSubmit({ ...form, authorId });
    setForm({ title: "", content: "", cover: "", markdown: "" });
    onClose();
  };

  return (
    <div className={styles["modal-bg"]}>
      <div className={styles["modal-content"]}>
        <h2>Criar Post</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            name="title"
            placeholder="Título principal do seu POST"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="cover"
            placeholder="URL da Imagem de Capa (Opcional)"
            value={form.cover}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Escreva seu resumo ou conteúdo aqui..."
            value={form.content}
            onChange={handleChange}
            required
            rows={3}
          />
          <textarea
            name="markdown"
            placeholder="Trecho de Código ou Markdown (Opcional)"
            value={form.markdown}
            onChange={handleChange}
            rows={4}
            style={{ fontFamily: "monospace" }}
          />
          {error && <p style={{ color: "var(--text-error)" }}>{error}</p>}
          <button type="submit">Publicar</button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "var(--bg-input)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalPost;
