export type Tone = "Formal" | "Friendly" | "Persuasive" | "Concise" | "Urgent";
export type Length = "Short" | "Medium" | "Detailed";

const toneOpeners: Record<Tone, string> = {
  Formal: "I hope this message finds you well.",
  Friendly: "Hope your week is going great!",
  Persuasive: "I want to share something that could meaningfully move the needle for your team.",
  Concise: "Quick note on the items below.",
  Urgent: "Flagging this as time-sensitive — it needs a decision today.",
};

const toneClosers: Record<Tone, string> = {
  Formal: "Kind regards,",
  Friendly: "Thanks so much,",
  Persuasive: "Looking forward to your thoughts,",
  Concise: "Best,",
  Urgent: "Appreciate the fast turnaround,",
};

export function generateEmail(points: string, recipient: string, tone: Tone, length: Length) {
  const bullets = points
    .split(/\n|•|;/)
    .map((p) => p.trim().replace(/^[-*]\s*/, ""))
    .filter(Boolean);

  const topic = bullets[0]?.slice(0, 60) ?? "our next steps";
  const subject =
    tone === "Urgent"
      ? `Action needed: ${topic}`
      : tone === "Persuasive"
        ? `A faster path forward on ${topic}`
        : `Re: ${topic}`;

  const role = recipient.trim() || "team";
  const body: string[] = [];
  body.push(`Hi ${role},`);
  body.push(toneOpeners[tone]);

  if (length === "Detailed") {
    body.push(
      `I wanted to give you the full picture before we commit to a direction, so I've laid out the key context, the trade-offs we considered, and what I'd recommend we do next.`,
    );
  }

  if (bullets.length > 1) {
    body.push(bullets.map((b) => `• ${capitalize(b)}`).join("\n"));
  } else {
    body.push(capitalize(bullets[0] ?? "Sharing a quick update on where things stand."));
  }

  if (length !== "Short") {
    body.push(
      tone === "Persuasive"
        ? "Given the upside here, I'd suggest we lock this in this week so we don't lose the momentum we've built."
        : "Happy to walk through any of this in more detail — a 15 minute call would be plenty.",
    );
  }

  if (length === "Detailed") {
    body.push(
      "If it's helpful, I can circulate a short brief with owners and dates so everyone is working from the same plan.",
    );
  }

  body.push(
    tone === "Urgent"
      ? "Could you confirm by end of day so we stay on schedule?"
      : "Let me know what you think and I'll take it from there.",
  );
  body.push(`${toneClosers[tone]}\nAlex`);

  return { subject, body: body.join("\n\n") };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export type Priority = "High" | "Medium" | "Low";

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  priority: Priority;
  deadline: string;
}

export interface Summary {
  executive: string;
  decisions: string[];
  actions: ActionItem[];
}

const OWNERS = ["Maya", "Daniel", "Priya", "Tom", "Sofia"];
const DEADLINES = ["Tomorrow", "Fri, 3pm", "Next Monday", "In 3 days", "End of sprint"];

export function summarizeNotes(raw: string): Summary {
  const lines = raw
    .split(/\n|\.\s/)
    .map((l) => l.trim())
    .filter((l) => l.length > 12);

  const decisionLines = lines.filter((l) => /decid|agree|approv|will|go with|chose/i.test(l));
  const actionLines = lines.filter((l) => /follow|send|draft|review|ship|schedul|prepar|fix|build/i.test(l));

  const decisions = (decisionLines.length ? decisionLines : lines.slice(0, 3))
    .slice(0, 4)
    .map((l) => capitalize(l.replace(/^[-*•]\s*/, "")));

  const source = actionLines.length ? actionLines : lines.slice(-4);
  const actions: ActionItem[] = source.slice(0, 5).map((l, i) => ({
    id: `a${i}`,
    task: capitalize(l.replace(/^[-*•]\s*/, "").slice(0, 90)),
    owner: OWNERS[i % OWNERS.length]!,
    priority: (["High", "Medium", "Low", "High", "Medium"] as Priority[])[i % 5]!,
    deadline: DEADLINES[i % DEADLINES.length]!,
  }));

  const executive = `The team covered ${lines.length} discussion points, converging on ${decisions.length} decisions and ${actions.length} concrete follow-ups. The dominant themes were delivery timing, ownership clarity, and unblocking the work already in flight. Momentum is good; the main risk is unassigned follow-through, which the action list below resolves.`;

  return { executive, decisions, actions };
}

export interface PlanTask {
  id: string;
  title: string;
  priority: Priority;
  minutes: number;
}

export interface Block {
  label: string;
  time: string;
  tasks: PlanTask[];
}

export type Timeframe = "Daily Breakdown" | "Weekly Sprint";
export type Style = "Deep Work" | "Balanced" | "Quick Wins";

export function generatePlan(input: string, timeframe: Timeframe, style: Style): Block[] {
  const items = input
    .split(/\n|,/)
    .map((l) => l.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean);

  const durations = style === "Deep Work" ? [90, 120, 75] : style === "Quick Wins" ? [20, 30, 45] : [45, 60, 30];
  const tasks: PlanTask[] = items.map((t, i) => ({
    id: `t${i}`,
    title: capitalize(t),
    priority: /urgent|asap|today|critical|deadline/i.test(t)
      ? "High"
      : i < Math.ceil(items.length / 2)
        ? "Medium"
        : "Low",
    minutes: durations[i % durations.length]!,
  }));

  const sorted = [...tasks].sort(
    (a, b) => rank(b.priority) - rank(a.priority) || (style === "Quick Wins" ? a.minutes - b.minutes : 0),
  );

  const labels =
    timeframe === "Daily Breakdown"
      ? [
          { label: "Morning Focus", time: "09:00 – 12:00" },
          { label: "Afternoon Collab", time: "13:00 – 16:00" },
          { label: "Wrap-up", time: "16:00 – 17:00" },
        ]
      : [
          { label: "Mon–Tue · Deep Build", time: "Sprint days 1–2" },
          { label: "Wed–Thu · Collaborate", time: "Sprint days 3–4" },
          { label: "Friday · Ship & Review", time: "Sprint day 5" },
        ];

  const blocks: Block[] = labels.map((l) => ({ ...l, tasks: [] }));
  sorted.forEach((t, i) => {
    const idx = t.priority === "High" ? 0 : t.priority === "Medium" ? 1 : 2;
    blocks[Math.min(idx + (i > 6 ? 1 : 0), blocks.length - 1)]!.tasks.push(t);
  });

  return blocks.filter((b) => b.tasks.length > 0);
}

function rank(p: Priority) {
  return p === "High" ? 3 : p === "Medium" ? 2 : 1;
}

export const SAMPLE_TRANSCRIPT = `Standup notes — Product sync, Tuesday
Maya: we decided to move the billing revamp to the next sprint because the API contract isn't final.
Daniel will draft the migration plan and share it before Friday.
The team agreed to go with the usage-based pricing tier for the beta cohort.
Priya raised that onboarding drop-off is at 38%, mostly on step 3.
We will ship a simplified 2-step onboarding behind a flag.
Tom to review the analytics instrumentation and fix the broken funnel events.
Sofia will schedule the customer interviews for the pricing test.
Everyone approved the new design system tokens rollout.`;

export const SAMPLE_TODOS = `Finish Q3 board deck — urgent
Review 12 pull requests
Write the pricing experiment brief
Reply to investor update thread
Deep work: refactor the billing service
Interview two candidates
Clean up the backlog`;
