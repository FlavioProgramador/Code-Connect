import { cookies } from "next/headers";
import CardPost from "@/components/CardPost/CardPost";
import { getAllPosts } from "@/services/post.service";
import AuthFlow from "@/components/AuthFlow/AuthFlow";

// Dynamic: dados vêm de API externa ou banco de dados relacional
export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return <AuthFlow />;
  }

  const posts = await getAllPosts();

  return (
    <main style={{ flex: 1 }}>
      <CardPost posts={posts} />
    </main>
  );
}
