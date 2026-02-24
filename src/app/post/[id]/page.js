import { getPostById } from "@/services/post.service";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }) {
  const { id } = await params;
  
  try {
    const post = await getPostById(Number(id));

    if (!post) {
      notFound();
    }

    return (
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.actions}>
            <Link href="/" className={styles.backButton}>
              Voltar para o Feed
            </Link>
          </div>

          <header className={styles.header}>
            <figure className={styles.cover}>
              <Image
                src={post.cover || "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png"}
                alt={`Capa do post ${post.title}`}
                width={800}
                height={300}
                className={styles.coverImage}
              />
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
          </section>
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
