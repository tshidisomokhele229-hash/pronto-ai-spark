import { useState } from "react";
import { CalendarDays, Clock, Loader2, ListTodo } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  generatePlan,
  SAMPLE_TODOS,
  type Block,
  type Priority,
  type Style,
  type Timeframe,
} from "@/lib/mock-ai";

const TIMEFRAMES: Timeframe[] = ["Daily Breakdown", "Weekly Sprint"];
const STYLES: Style[] = ["Deep Work", "Balanced", "Quick Wins"];

const priorityClass: Record<Priority, string> = {
  High: "border-transparent bg-danger/15 text-danger",
  Medium: "border-transparent bg-warning/15 text-warning",
  Low: "border-transparent bg-muted text-muted-foreground",
};

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
          : "border-border bg-muted/50 text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function PlannerTool() {
  const [input, setInput] = useState(SAMPLE_TODOS);
  const [timeframe, setTimeframe] = useState<Timeframe>("Daily Breakdown");
  const [style, setStyle] = useState<Style>("Balanced");
  const [loading, setLoading] = useState(false);
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const run = () => {
    if (!input.trim()) {
      toast.error("Add a few tasks or goals first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setBlocks(generatePlan(input, timeframe, style));
      setDone({});
      setLoading(false);
      toast.success("Schedule generated", { description: `${timeframe} · ${style}` });
    }, 1200);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="todos">To-do list / project goals</Label>
          <Textarea
            id="todos"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label>Timeframe</Label>
          <div className="flex flex-wrap gap-2">
            {TIMEFRAMES.map((t) => (
              <Pill key={t} active={timeframe === t} onClick={() => setTimeframe(t)}>
                {t}
              </Pill>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Planning style</Label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <Pill key={s} active={style === s} onClick={() => setStyle(s)}>
                {s}
              </Pill>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setInput(SAMPLE_TODOS)}>
            <ListTodo /> Load sample tasks
          </Button>
          <Button onClick={run} disabled={loading} className="glow-hover">
            {loading ? <Loader2 className="animate-spin" /> : <CalendarDays />}
            {loading ? "Planning…" : "Generate Schedule"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {!blocks && !loading && (
          <div className="surface-card flex h-full min-h-[20rem] items-center justify-center rounded-2xl p-6 text-center text-sm text-muted-foreground">
            Your prioritized time blocks will appear here.
          </div>
        )}
        {loading && (
          <div className="surface-card flex h-64 items-center justify-center rounded-2xl text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" /> Balancing focus and energy…
          </div>
        )}
        {blocks &&
          !loading &&
          blocks.map((b) => (
            <div key={b.label} className="surface-card rounded-2xl p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="truncate text-sm font-semibold">{b.label}</h3>
                <span className="shrink-0 text-xs text-muted-foreground">{b.time}</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {b.tasks.map((t) => (
                  <div
                    key={t.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3"
                  >
                    <Checkbox
                      checked={!!done[t.id]}
                      onCheckedChange={(v) => setDone((d) => ({ ...d, [t.id]: !!v }))}
                    />
                    <span
                      className={cn(
                        "min-w-0 truncate text-sm",
                        done[t.id] && "text-muted-foreground line-through",
                      )}
                    >
                      {t.title}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                        <Clock className="h-3.5 w-3.5" /> {t.minutes} mins
                      </span>
                      <Badge className={priorityClass[t.priority]}>{t.priority}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
