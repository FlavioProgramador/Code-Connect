import Image from "next/image";
import Avatar from "../Avatar/Avatar";
import styles from "./CardPost.module.css";
import Link from "next/link";

// Server Component — sem interatividade, sem "use client"
const CardPost = ({ posts = [] }) => {
  return (
    <div className={styles["card-container"]}>
      {posts.map((post) => (
        <article key={post.id} className={styles["card-post"]}>
          <header className={styles["header-card"]}>
            <figure className={styles["figure-card"]}>
              <Image
                className={styles["img-card"]}
                src={post.cover || "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png"}
                width={438}
                height={133}
                alt={`Capa do post de titulo ${post.title}`}
              />
            </figure>
          </header>
          <section className={styles["section-card"]}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <Link className={styles["link-card"]} href={`/post/${post.id}`}>
              Ver detalhes
            </Link>
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

