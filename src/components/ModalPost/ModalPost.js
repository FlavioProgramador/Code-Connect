"use client";
import { useState } from "react";
import styles from "./ModalPost.module.css";

const ModalPost = ({ open, onClose, onSubmit, authorId }) => {
  const [form, setForm] = useState({ title: "", content: "" });
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
    setForm({ title: "", content: "" });
    onClose();
  };

  return (
    <div className={styles["modal-bg"]}>
      <div className={styles["modal-content"]}>
        <h2>Criar Post</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Conteúdo"
            value={form.content}
            onChange={handleChange}
            required
            rows={5}
          />
          {error && <p style={{ color: "#ff5252" }}>{error}</p>}
          <button type="submit">Publicar</button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#23282a",
              color: "#fff",
              border: "1px solid #00bfae",
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
