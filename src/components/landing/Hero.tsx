import { Zap, Mail, FileText, CalendarDays, Gauge, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { icon: Gauge, label: "10x Faster Output" },
  { icon: Target, label: "99.4% Accuracy" },
  { icon: Users, label: "42,000+ Teams" },
];

export function Hero({ onQuickAction }: { onQuickAction: (tab: string) => void }) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-20 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[28rem] w-[52rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Next-Gen Workplace Productivity
        </span>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Write Faster. <span className="text-gradient-brand">Summarize Instantly.</span> Plan Smarter.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          The unified AI workspace that turns messy notes into action items, crafts emails in your exact
          tone, and builds prioritized schedules in seconds.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow-hover" onClick={() => onQuickAction("email")}>
            <Mail /> Write an email
          </Button>
          <Button size="lg" variant="outline" onClick={() => onQuickAction("notes")}>
            <FileText /> Summarize notes
          </Button>
          <Button size="lg" variant="outline" onClick={() => onQuickAction("planner")}>
            <CalendarDays /> Plan my day
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="surface-card flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground"
            >
              <m.icon className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
