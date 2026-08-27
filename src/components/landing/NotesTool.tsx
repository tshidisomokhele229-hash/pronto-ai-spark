import { useState } from "react";
import { CheckCircle2, Download, FileText, Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SAMPLE_TRANSCRIPT, summarizeNotes, type Priority, type Summary } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";

const priorityClass: Record<Priority, string> = {
  High: "border-transparent bg-danger/15 text-danger",
  Medium: "border-transparent bg-warning/15 text-warning",
  Low: "border-transparent bg-muted text-muted-foreground",
};

export function NotesTool() {
  const [raw, setRaw] = useState(SAMPLE_TRANSCRIPT);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const run = () => {
    if (!raw.trim()) {
      toast.error("Paste some notes to summarize.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSummary(summarizeNotes(raw));
      setDone({});
      setLoading(false);
      toast.success("Summary ready");
    }, 1300);
  };

  const exportMd = () => {
    if (!summary) return;
    const md = [
      "# Meeting Summary",
      "",
      "## Executive Summary",
      summary.executive,
      "",
      "## Key Decisions",
      ...summary.decisions.map((d) => `- ${d}`),
      "",
      "## Action Items",
      "| Task | Owner | Priority | Deadline |",
      "| --- | --- | --- | --- |",
      ...summary.actions.map((a) => `| ${a.task} | ${a.owner} | ${a.priority} | ${a.deadline} |`),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-summary.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Summary exported as Markdown");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <Label htmlFor="transcript">Raw transcript or messy notes</Label>
          <Textarea
            id="transcript"
            rows={8}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="resize-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setRaw(SAMPLE_TRANSCRIPT)}>
            <FileText /> Load Sample Transcript
          </Button>
          <Button onClick={run} disabled={loading} className="glow-hover">
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            {loading ? "Analyzing…" : "Analyze & Summarize"}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="surface-card flex h-48 items-center justify-center rounded-2xl text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" /> Extracting decisions and owners…
        </div>
      )}

      {summary && !loading && (
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="surface-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Executive Summary
              </h3>
              <p className="mt-3 text-sm leading-relaxed">{summary.executive}</p>
            </div>
            <div className="surface-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Key Decisions
              </h3>
              <ul className="mt-3 space-y-3">
                {summary.decisions.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surface-card overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4">
              <h3 className="truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Action Items
              </h3>
              <Button size="sm" variant="outline" onClick={exportMd}>
                <Download /> Export Summary
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10" />
                    <TableHead>Task</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.actions.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <Checkbox
                          checked={!!done[a.id]}
                          onCheckedChange={(v) => setDone((d) => ({ ...d, [a.id]: !!v }))}
                        />
                      </TableCell>
                      <TableCell
                        className={cn("max-w-sm", done[a.id] && "text-muted-foreground line-through")}
                      >
                        {a.task}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{a.owner}</TableCell>
                      <TableCell>
                        <Badge className={priorityClass[a.priority]}>{a.priority}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{a.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
