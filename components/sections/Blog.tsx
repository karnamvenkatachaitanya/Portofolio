import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

export function Blog() {
  const posts = getAllPosts().slice(0, 2);
  const hasDrafts = posts.some((p) => p.draft);

  return (
    <section id="blog" className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts on AI, building, and competing."
        />

        {hasDrafts && (
          <div className="mb-8 rounded-lg border border-accent-pop/30 bg-accent-pop/10 px-4 py-3 text-sm text-text-secondary">
            📝 Posts are in draft — full blog coming soon at{" "}
            <Link href="/blog" className="font-medium text-text-primary underline">
              /blog
            </Link>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 2xl:gap-8 3xl:gap-10">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-bg-primary p-6 transition-shadow hover:shadow-md dark:border-border-dark"
              >
                <div className="flex items-center gap-3 text-xs 2xl:text-sm 3xl:text-base text-text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
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
                <h3 className="mt-3 font-display text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-text-primary group-hover:underline">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm 2xl:text-base 3xl:text-lg leading-relaxed text-text-secondary">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] 2xl:text-xs 3xl:text-sm text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog">
            <Button variant="outline">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
