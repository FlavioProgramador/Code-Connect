import CardPost from "@/components/CardPost/CardPost";
import { getAllPosts } from "@/services/post.service";

// Dynamic: dados vêm de API externa — não pré-renderizável em build
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <CardPost posts={posts} />
    </main>
  );
}
