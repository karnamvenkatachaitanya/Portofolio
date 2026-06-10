import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Blog — Karnam Venkata Chaitanya",
  description: "Thoughts on AI, building, and competing.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const hasDrafts = posts.some((p) => p.draft);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Thoughts on AI, building, and competing.
          </p>

          {hasDrafts && (
            <div className="mt-8 rounded-lg border border-accent-pop/30 bg-accent-pop/10 px-4 py-3 text-sm text-text-secondary">
              📝 Some posts are still in draft — content coming soon.
            </div>
          )}

          {allTags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted dark:border-border-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-bg-secondary p-6 transition-shadow hover:shadow-md dark:border-border-dark"
              >
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  {post.draft && (
                    <span className="rounded bg-accent-pop/20 px-2 py-0.5 text-accent">
                      Draft
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-text-primary group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
