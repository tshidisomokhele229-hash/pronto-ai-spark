import { useState } from "react";
import { Copy, Loader2, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generateEmail, type Length, type Tone } from "@/lib/mock-ai";

const TONES: Tone[] = ["Formal", "Friendly", "Persuasive", "Concise", "Urgent"];
const LENGTHS: Length[] = ["Short", "Medium", "Detailed"];

const DEFAULT_POINTS = `Kickoff for the Q3 billing revamp is slipping by a week
We need sign-off on the usage-based pricing tier
Proposing a 15 min sync Thursday to unblock the API contract`;

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

export function EmailTool() {
  const [points, setPoints] = useState(DEFAULT_POINTS);
  const [recipient, setRecipient] = useState("Head of Product");
  const [tone, setTone] = useState<Tone>("Persuasive");
  const [length, setLength] = useState<Length>("Medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);

  const run = () => {
    if (!points.trim()) {
      toast.error("Add a few key points first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult(generateEmail(points, recipient, tone, length));
      setLoading(false);
      toast.success("Email drafted", { description: `${tone} tone · ${length} length` });
    }, 1100);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    toast.success("Copied to clipboard");
  };

  const words = result ? result.body.trim().split(/\s+/).length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="points">Key points / context</Label>
          <Textarea
            id="points"
            rows={7}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient role</Label>
          <Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Tone</Label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <Pill key={t} active={tone === t} onClick={() => setTone(t)}>
                {t}
              </Pill>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Output length</Label>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((l) => (
              <Pill key={l} active={length === l} onClick={() => setLength(l)}>
                {l}
              </Pill>
            ))}
          </div>
        </div>

        <Button onClick={run} disabled={loading} className="glow-hover w-full sm:w-auto">
          {loading ? <Loader2 className="animate-spin" /> : <Mail />}
          {loading ? "Generating…" : "Generate Email"}
        </Button>
      </div>

      <div className="surface-card flex min-h-[22rem] flex-col rounded-2xl p-5">
        {!result && !loading && (
          <div className="m-auto max-w-xs text-center text-sm text-muted-foreground">
            Your polished draft will appear here — subject line, body, and a one-click copy.
          </div>
        )}
        {loading && (
          <div className="m-auto flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Matching your tone and structure…
          </div>
        )}
        {result && !loading && (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Subject</Label>
              <Input readOnly value={result.subject} className="font-medium" />
            </div>
            <div className="mt-4 flex-1 whitespace-pre-wrap rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed">
              {result.body}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {words} words · {result.body.length} characters
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={run}>
                  <RefreshCw /> Regenerate
                </Button>
                <Button size="sm" onClick={copy}>
                  <Copy /> Copy
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
