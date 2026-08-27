import {
  BrainCircuit,
  Grid2x2Check,
  MailCheck,
  Share2,
  Star,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: MailCheck,
    title: "Context-Aware Email Engine",
    body: "Reads your bullet points and the recipient's role, then writes in the tone and length you pick — never generic filler.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Decision Extraction",
    body: "Separates chatter from commitments, surfacing the decisions your team actually made in a meeting.",
  },
  {
    icon: Grid2x2Check,
    title: "Eisenhower Matrix Auto-Priority",
    body: "Every task lands in the right urgency bucket with a realistic time estimate before it hits your calendar.",
  },
  {
    icon: Share2,
    title: "One-Click Team Export",
    body: "Ship summaries as Markdown or copy clean text straight into Slack, Notion, or your ticket tracker.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for the work between the work
        </h2>
        <p className="mt-3 text-muted-foreground">
          Four engines, one workspace — tuned for the writing, deciding, and planning that eats your day.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="surface-card glow-hover rounded-2xl p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
              <f.icon className="h-5 w-5 text-primary" />
            </span>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Dump the mess", d: "Paste raw notes, half-formed bullets, or a chaotic to-do list." },
  { n: "02", t: "Pick your intent", d: "Choose tone, length, timeframe, or planning style in one click." },
  { n: "03", t: "Ship the output", d: "Copy, export, or check items off as your team executes." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="surface-card rounded-2xl p-6">
              <span className="text-sm font-semibold text-gradient-brand">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "Our weekly product sync used to cost me an hour of note cleanup. Now the action items are assigned before I leave the room.",
    name: "Maya Osei",
    role: "Product Manager, Northwind",
    initials: "MO",
  },
  {
    quote:
      "The email tone control is uncannily good. Persuasive mode has closed two partnerships for us this quarter.",
    name: "Daniel Reyes",
    role: "Founder, Loop Labs",
    initials: "DR",
  },
  {
    quote:
      "I plan three executives' weeks in the time it took to plan one. The priority badges alone are worth it.",
    name: "Priya Nair",
    role: "Executive Assistant, Vantage",
    initials: "PN",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Loved by busy teams</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="surface-card glow-hover flex flex-col rounded-2xl p-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex min-w-0 items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {t.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{t.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Is my data private?",
    a: "Everything you type in this demo stays in your browser — nothing is uploaded. On paid plans, content is encrypted in transit and at rest, never used for model training, and purged on request.",
  },
  {
    q: "How accurate are the outputs?",
    a: "Summaries and action items are extracted from what you provide, with owners and deadlines suggested from context. Treat drafts as a strong first pass — you stay the editor.",
  },
  {
    q: "What export formats are supported?",
    a: "Meeting summaries export as formatted Markdown, and every output panel has one-click copy for plain text you can drop anywhere.",
  },
  {
    q: "Does it fit into my existing workflow?",
    a: "Yes — the outputs are designed to paste cleanly into Slack, Notion, Linear, Jira, and Google Docs, so nothing needs to change about where your team already works.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-lg font-semibold text-gradient-brand">JackOfAllTradesAI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The all-in-one AI productivity and workflow suite for teams that ship.
          </p>
          <form
            className="mt-5 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list", { description: "Product updates, once a month." });
            }}
          >
            <Input type="email" required placeholder="you@company.com" aria-label="Email address" />
            <Button type="submit">Subscribe</Button>
          </form>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#top" aria-label="Twitter">
              <Twitter className="h-5 w-5 transition-colors hover:text-foreground" />
            </a>
            <a href="#top" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 transition-colors hover:text-foreground" />
            </a>
            <a href="#top" aria-label="GitHub">
              <Github className="h-5 w-5 transition-colors hover:text-foreground" />
            </a>
          </div>
        </div>

        {[
          { h: "Company", items: ["About", "Careers", "Blog", "Contact"] },
          { h: "Resources", items: ["Docs", "Changelog", "Templates", "Support"] },
          { h: "Legal", items: ["Privacy", "Terms", "Security", "DPA"] },
        ].map((col) => (
          <div key={col.h}>
            <h3 className="text-sm font-semibold">{col.h}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((i) => (
                <li key={i}>
                  <a
                    href="#top"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JackOfAllTradesAI. All rights reserved.
      </div>
    </footer>
  );
}
