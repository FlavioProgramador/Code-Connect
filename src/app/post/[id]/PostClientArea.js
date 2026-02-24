"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar/Avatar";
import styles from "./page.module.css";

export default function PostClientArea({ post }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const loggedInUserId = 1; // HARDCODED DEMO - ID do usuário na sessão atual que possui "permissões de dono" (o mesmo que criava via aside)
  const isPostOwner = post.authorId === loggedInUserId;

  const [form, setForm] = useState({
    title: post.title,
    content: post.body,
    cover: post.cover || "",
    markdown: post.markdown || "",
  });
  const [file, setFile] = useState(null);

  // States UI para modals de aviso customizados
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = () => {
    setShowConfirmModal(true);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    setError("");
    
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      
      if (!res.ok) {
        // Se a API não estourar mas vier um err JSON ex: res.status == 500
        const errData = await res.json();
        throw new Error(errData.error || "Erro misterioso ao deletar post");
      }
      
      // Deletado com sucesso, sem content back (204)
      router.push("/");
      router.refresh();
      
    } catch (err) {
      console.error(err);
      setError(`Falha ao excluir: ${err.message}`);
      setIsDeleting(false);
      setShowConfirmModal(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.content) {
      setError("Título e Conteúdo são obrigatórios.");
      return;
    }

    setLoading(true);
    let finalCoverUrl = form.cover;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Erro no upload da imagem");
        const uploadData = await uploadRes.json();
        finalCoverUrl = uploadData.url;
      }

      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          body: form.content,
          cover: finalCoverUrl,
          markdown: form.markdown,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar o post");
      
      setIsEditing(false);
      setFile(null);
      router.refresh(); // Força update server-side pros novos dados
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className={styles.editForm}>
        <h2>Editando Post</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleUpdate} className={styles.formContainer}>
          <label>Título principal do POST:</label>
          <input name="title" value={form.title} onChange={handleChange} required />
          
          <label>Imagem de Capa (Opcional):</label>
          <div className={styles.fileInputs}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <span>OU</span>
            <input name="cover" placeholder="Cole uma URL" value={form.cover} onChange={handleChange} disabled={!!file} />
          </div>

          <label>Resumo ou Conteúdo do post:</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={3} />

          <label>Trecho de Código ou Markdown (Opcional):</label>
          <textarea name="markdown" value={form.markdown} onChange={handleChange} rows={6} className={styles.codeTextarea} />

          <div className={styles.editActions}>
            <button type="button" onClick={() => setIsEditing(false)} disabled={loading} className={styles.btnCancel}>Cancelar</button>
            <button type="submit" disabled={loading} className={styles.btnSave}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {error && !isEditing && (
        <div style={{ color: "#e53e3e", padding: "0 32px 16px", fontWeight: "bold" }}>
          {error}
        </div>
      )}

      {/* Condicional de Autorização de Sessão: Só donos da postagem visualizam e editam. */}
      {isPostOwner && (
        <div className={styles.crudActions}>
          <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>✏️ Editar Meu Post</button>
          <button onClick={confirmDelete} className={styles.btnDelete}>🗑️ Excluir Post</button>
        </div>
      )}

      {/* MODAL CUSTOMIZADO (SUBSTITUI O WINDOW.CONFIRM FEIO) */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
           <div className={styles.confirmDialog}>
              <h3>Deletar Postagem?</h3>
              <p>Essa ação não pode ser desfeita. Todos os dados serão perdidos.</p>
              <div className={styles.dialogActions}>
                 <button onClick={cancelDelete} disabled={isDeleting} className={styles.btnCancel}>Cancelar</button>
                 <button onClick={executeDelete} disabled={isDeleting} className={styles.btnDeleteSolid}>
                    {isDeleting ? "Deletando..." : "Sim, excluir"}
                 </button>
              </div>
           </div>
        </div>
      )}

      <header className={styles.header}>
        <figure className={styles.cover}>
          {post.cover ? (
             <Image
               src={post.cover}
               alt={`Capa do post ${post.title}`}
               layout="fill"
               objectFit="cover"
               className={styles.coverImage}
             />
          ) : (
             <div className={styles.defaultCoverHeader}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
          )}
        </figure>

        
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.author}>
            <Avatar imageSrc={post.author?.avatar} name={post.author?.username || post.author?.name} />
          </div>
        </div>
      </header>

      <section className={styles.body}>
        <p>{post.body}</p>
        {post.markdown && (
          <div className={styles.codeSnippet}>
            <pre>
              <code>{post.markdown}</code>
            </pre>
          </div>
        )}
      </section>
    </>
  );
}
