import { getPostById } from "@/services/post.service";
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import PostClientArea from "./PostClientArea";

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
          <div className={styles.navigationRow}>
            <Link href="/" className={styles.backButton}>
              Voltar para o Feed
            </Link>
          </div>

          <PostClientArea post={post} />
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
