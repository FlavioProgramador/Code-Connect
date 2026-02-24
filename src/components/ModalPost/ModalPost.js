"use client";
import { useState } from "react";
import styles from "./ModalPost.module.css";

const ModalPost = ({ open, onClose, onSubmit, authorId }) => {
  const [form, setForm] = useState({ title: "", content: "", cover: "", markdown: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.content) {
      setError("Preencha todos os campos obrigatórios (Título e Resumo).");
      return;
    }

    setLoading(true);
    let finalCoverUrl = form.cover;

    try {
      // 1. Se o usuário escolheu um arquivo do Computador Local, envia pro servidor.
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Falha ao enviar a imagem local.");
        }

        const uploadData = await uploadRes.json();
        finalCoverUrl = uploadData.url; // Resgata a URL '/uploads/nome.jpg'
      }

      // 2. Chama o onSubmit original injetando as propriedades atualizadas
      await onSubmit({ ...form, authorId, cover: finalCoverUrl });

      setForm({ title: "", content: "", cover: "", markdown: "" });
      setFile(null);
      onClose();
    } catch (err) {
      setError(err.message || "Erro durante o envio da postagem.");
    } finally {
      setLoading(false);
    }
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
          <div className={styles["file-upload-group"]}>
            <label className={styles["file-label"]}>Imagem de Capa (Opcional):</label>
            <div className={styles["file-inputs"]}>
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 className={styles["file-input"]}
               />
               <span className={styles["or-divider"]}>OU</span>
               <input
                 name="cover"
                 placeholder="Cole um URL externo"
                 value={form.cover}
                 onChange={handleChange}
                 disabled={!!file} // Desativa URL se houver arquivo
                 className={styles["url-input"]}
               />
            </div>
            {file && <span className={styles["file-name"]}>Anexo: {file.name}</span>}
          </div>
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
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={loading} className={styles.cancel}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPost;
