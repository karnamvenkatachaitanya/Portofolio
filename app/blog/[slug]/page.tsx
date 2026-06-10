import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Karnam Venkata Chaitanya`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.tags);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              {post.draft && (
                <span className="rounded bg-accent-pop/20 px-2 py-0.5 text-xs text-accent">
                  Draft
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              {post.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted dark:border-border-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-code:font-mono prose-code:text-sm prose-pre:bg-bg-secondary">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>

          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-12 dark:border-border-dark">
              <h2 className="font-display text-xl font-semibold">
                Related Posts
              </h2>
              <div className="mt-6 space-y-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block rounded-lg border border-border p-4 transition-shadow hover:shadow-md dark:border-border-dark"
                  >
                    <h3 className="font-display font-medium text-text-primary">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
