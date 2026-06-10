"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, MessageCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { href: SITE_CONFIG.github, icon: GitHubIcon, label: "GitHub", detail: "github.com/karnamvenkatachaitanya" },
  { href: SITE_CONFIG.linkedin, icon: LinkedInIcon, label: "LinkedIn", detail: "in/venkata-chaitanya-karnam-5849322ba" },
  { href: `mailto:${SITE_CONFIG.email}`, icon: Mail, label: "Email", detail: SITE_CONFIG.email },
  { href: SITE_CONFIG.whatsapp, icon: MessageCircle, label: "WhatsApp", detail: "+91 94918 03089" },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Failed to send message");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 xl:max-w-7xl 2xl:max-w-screen-2xl 3xl:max-w-[95rem] 2xl:px-8">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 2xl:gap-24 3xl:gap-32">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl 2xl:text-6xl 3xl:text-7xl">
              Let&apos;s <span className="highlight-word">build something</span>.
            </h2>
            <p className="mt-6 text-base 2xl:text-lg 3xl:text-xl leading-relaxed text-text-secondary">
              Whether it&apos;s a <span className="highlight-word">full-time role</span> or a <span className="highlight-word">freelance project</span> — I&apos;d love to hear from you. I
              typically <span className="highlight-word">respond within 24 hours</span>.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:gap-5">
              {socialLinks.map(({ href, icon: Icon, label, detail }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 rounded-2xl border border-border p-6 text-text-secondary transition-all duration-300 hover:border-accent hover:bg-bg-secondary hover:text-text-primary dark:border-border-dark group shadow-sm hover:shadow-md"
                  aria-label={label}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-bg-secondary group-hover:bg-bg-primary dark:bg-bg-dark transition-colors border border-border dark:border-border-dark shadow-sm">
                    <Icon className="h-7 w-7 text-text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-base font-semibold text-text-primary">{label}</p>
                    <p className="text-sm text-text-muted truncate mt-0.5" title={detail}>{detail}</p>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-bg-secondary p-12 text-center dark:border-border-dark"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-pop/20">
                    <Check className="h-8 w-8 text-accent" />
                  </div>
                  <p className="mt-4 font-display text-xl font-semibold">
                    Message sent!
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 rounded-xl border border-border bg-bg-secondary p-6 dark:border-border-dark md:p-8"
                >
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Your name"
                      className="mt-1.5"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      className="mt-1.5"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="What is this about?"
                      className="mt-1.5"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell me about your project or opportunity..."
                      className="mt-1.5"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    className="w-full"
                    disabled={isSubmitting}
                    aria-label="Send message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
