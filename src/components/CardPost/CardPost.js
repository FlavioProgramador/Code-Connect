"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./CardPost.module.css";
import Link from "next/link";

const CardPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:3042/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar Posts: ", error);
      }
    };
    fetchPost();
  }, []);
  return (
    <div className={styles["card-container"]}>
      {posts.map((post) => (
        <article key={post.id} className={styles["card-post"]}>
          <header className={styles["header-card"]}>
            <figure className={styles["figure-card"]}>
              <Image
                className={styles["img-card"]}
                src={post.cover}
                width={438}
                height={133}
                alt={`Capa do post de titulo ${post.title}`}
              />
            </figure>
          </header>
          <section className={styles["section-card"]}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Link className={styles["link-card"]} href={`/post/${post.id}`}>Ver detalhes</Link>
          </section>
          <footer className={styles["footer-card"]}>
            <Avatar imageSrc={post.author.avatar} name={post.author.username} />
          </footer>
        </article>
      ))}
    </div>
  );
};

export default CardPost;
