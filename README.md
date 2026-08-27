# Spark Workflow

Build a modern, high-conversion SaaS productivity web application called "JackOfAllTradesAI" (All-in-One AI Productivity & Workflow Suite).




Tech Stack & Architecture

Framework: React + TypeScript + Vite

Styling: Tailwind CSS + Radix UI / Shadcn UI components

Icons: lucide-react

Interactivity: State-driven UI with realistic mock client-side generation logic, interactive filters, active state indicators, and copy/export actions.

Design System & Theme

Vibe: Sleek modern SaaS (Linear/Vercel style), dark/light balanced slate aesthetic, subtle gradient borders, backdrop blur, clean typography (Inter/Sans), and refined micro-interactions.

Palette:




Primary: Deep Indigo / Violet (indigo-600)

Neutral Dark: Slate 900 (#0F172A)

Neutral Light: Slate 50 (#F8FAFC)

Accent Success: Emerald (#10B981)

Priority Tags: Rose (#F43F5E), Amber (#F59E0B), Slate (#64748B)

Key Sections & Layout

1. Sticky Navigation Header

Brand logo with an AI spark icon and gradient text "BrieflyAI".

Anchor navigation links: "Tools", "Features", "How It Works", "Testimonials".

"Try Free" CTA button with hover glow animation.

2. Hero Section

Tagline pill: ⚡ Next-Gen Workplace Productivity.

Main Headline: "Write Faster. Summarize Instantly. Plan Smarter."

Sub-headline: "The unified AI workspace that turns messy notes into action items, crafts emails in your exact tone, and builds prioritized schedules in seconds."

Quick-action buttons linking directly to each of the 3 workspace tabs.

Social proof metric badges (e.g., "10x Faster Output", "99.4% Accuracy").

3. Core Interactive Workspace (Tabbed Dashboard)

Implement a clean, centralized workspace using Shadcn Tabs with full working mock generation logic and loading states:




Tab 1: ✉️ Smart Email Generator




Inputs: Key points / Context (Textarea), Recipient Role (Input), Tone Selector (Pill buttons: Formal, Friendly, Persuasive, Concise, Urgent), Output Length (Short, Medium, Detailed).

Actions: "Generate Email" button with realistic spinner state.

Output Panel: Formatted Subject line field, email body container, character/word counter, and a functional "Copy to Clipboard" button with toast notification.

Tab 2: 📝 Meeting Notes Summarizer




Inputs: Raw transcript or messy notes (Textarea) with a "Load Sample Transcript" helper button.

Actions: "Analyze & Summarize" button.

Output Dashboard:




Executive Summary Card (concise overview paragraph).

Key Decisions List (bulleted takeaways with checkmark badges).

Action Items Table (Columns: Task, Owner, Priority, Deadline) with interactive checkboxes.

"Export Summary" button (downloads as formatted Markdown or text file).

Tab 3: 🗓️ AI Task Planner & Scheduler




Inputs: Unorganized to-do list / project goals (Textarea), Timeframe toggle ("Daily Breakdown" vs. "Weekly Sprint"), Planning Style (Deep Work, Balanced, Quick Wins).

Actions: "Generate Schedule" button.

Output View: Interactive schedule view:




Grouped time blocks (Morning Focus 09:00–12:00, Afternoon Collab 13:00–16:00, Wrap-up 16:00–17:00).

Task cards with dynamic Priority Badges (High, Medium, Low), estimated time durations (e.g., "45 mins"), and toggleable completion checkboxes.

4. Feature Highlights Grid

4-card feature grid with subtle hover animations and clean iconography:




Context-Aware Email Engine

Intelligent Decision Extraction

Eisenhower Matrix Auto-Priority

One-Click Team Export

5. User Testimonials & Proof

3-column responsive card layout featuring customer quotes, avatars, ratings (5 stars), and job titles (Product Manager, Founder, Executive Assistant).

6. Interactive FAQ Accordion

4 collapsible questions covering data privacy, output accuracy, export formats, and workflow integrations.

7. Modern SaaS Footer

Company links, resource links, legal terms, newsletter signup field, and social icons.

UX & Polish Requirements

Ensure every tab has working pre-filled default examples and sample buttons so the tools are immediately testable.

Include smooth toast notifications using Sonner or Shadcn Toast when users copy text or complete tasks.

Mobile-responsive layout where the workspace gracefully stacks on smaller screens.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pronto-ai-spark.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ce3ff4e-b8bc-453a-a019-28aebdfe55cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
