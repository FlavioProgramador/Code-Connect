"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./CardPost.module.css";
import Link from "next/link";
import api from "../../services/api";

const CardPost = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", authorId: 1 });
  const [editId, setEditId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar Posts: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.patch(`/posts/${editId}`, form);
      } else {
        await api.post("/posts", form);
      }
      setForm({ title: "", content: "", authorId: 1 });
      setEditId(null);
      fetchPosts();
    } catch (error) {
      alert("Erro ao salvar post");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      authorId: post.authorId,
    });
    setEditId(post.id);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles["form-post"]}
        style={{ marginBottom: 32 }}
      >
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
        />
        {/* Ajuste o authorId conforme sua lógica de autenticação */}
        <button type="submit">{editId ? "Salvar edição" : "Publicar"}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ title: "", content: "", authorId: 1 });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className={styles["card-container"]}>
        {posts.map((post) => (
          <article key={post.id} className={styles["card-post"]}>
            <header className={styles["header-card"]}>
              <figure className={styles["figure-card"]}>
                <Image
                  className={styles["img-card"]}
                  src={post.cover || "/default-cover.jpg"}
                  width={438}
                  height={133}
                  alt={`Capa do post de titulo ${post.title}`}
                />
              </figure>
            </header>
            <section className={styles["section-card"]}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link className={styles["link-card"]} href={`/post/${post.id}`}>
                Ver detalhes
              </Link>
              <button onClick={() => handleEdit(post)}>Editar</button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ color: "red" }}
              >
                Excluir
              </button>
            </section>
            <footer className={styles["footer-card"]}>
              {post.author && (
                <Avatar
                  imageSrc={post.author.avatar || "/default-avatar.png"}
                  name={post.author.name}
                />
              )}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CardPost;
