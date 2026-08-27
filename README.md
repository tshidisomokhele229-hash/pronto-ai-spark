# BrieflyAI — All-in-One AI Productivity & Workflow Suite

BrieflyAI (also branded as JackOfAllTradesAI) is a modern, high-conversion SaaS landing page and interactive workspace that demonstrates three core AI-powered productivity tools in a single responsive web app.

![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4?logo=lovable)

## What it does

BrieflyAI helps knowledge workers write, summarize, and plan faster with an AI-assisted workspace:

1. **Smart Email Generator** — Draft professional emails in seconds. Choose a tone (Formal, Friendly, Persuasive, Urgent, Casual) and desired length, then get a ready-to-send message with one click.
2. **Meeting Notes Summarizer** — Paste a transcript or raw notes and instantly receive an executive summary, key decisions, and a table of action items with owners and deadlines.
3. **AI Task Planner** — Enter your tasks and pick a planning style (Time Blocking, Priority Matrix, or Energy Mapping) to generate an organized daily schedule with priority badges and interactive checkboxes.

The app also includes a sticky header, hero section, feature grid, "How It Works" steps, testimonials, FAQ accordion, newsletter signup, and footer.

## Tech stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI components:** shadcn/ui
- **Notifications:** Sonner
- **Routing:** TanStack Router (file-based)

## Project structure

```text
src/
├── components/landing/   # Page sections and tool components
│   ├── EmailTool.tsx
│   ├── Hero.tsx
│   ├── NotesTool.tsx
│   ├── PlannerTool.tsx
│   ├── Sections.tsx
│   └── SiteHeader.tsx
├── lib/
│   └── mock-ai.ts        # Mock AI generation logic for email, notes, and planner
├── routes/
│   ├── __root.tsx        # Root layout (fonts, toaster, SEO metadata)
│   └── index.tsx         # Landing page with tabbed workspace
├── router.tsx            # TanStack Router setup
├── server.ts             # Server entry
├── start.ts              # Client entry
└── styles.css            # Design tokens, utilities, and Tailwind theme
```

## Getting started

### Prerequisites

- Node.js 20+
- A package manager such as `npm`, `pnpm`, or `bun`

### Install dependencies

```sh
npm install
```

### Run the development server

```sh
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for production

```sh
npm run build
```

## Key features

- **Responsive design** — Works seamlessly on desktop, tablet, and mobile.
- **Interactive workspace** — Three tabbed tools with realistic mock generation logic.
- **Loading states** — Each tool shows a skeleton/loading state while "AI" processes.
- **Toast notifications** — Copy, export, and success feedback via Sonner.
- **Accessible UI** — Built on shadcn/ui primitives with keyboard-friendly controls.
- **SEO-ready** — Unique page titles, descriptions, and Open Graph metadata per route.

## Customization

- **Colors & theme:** Edit `src/styles.css` to update Tailwind theme variables and custom utilities.
- **Mock AI logic:** Update `src/lib/mock-ai.ts` to change sample data or replace mocks with real API calls.
- **Content:** Modify `src/components/landing/Sections.tsx` for testimonials, FAQ, and feature copy.
- **Routes:** Add new pages under `src/routes/` using TanStack Router file conventions.

## Deployment

This project is built with [Lovable](https://lovable.dev). You can deploy directly from the Lovable editor or connect the project to GitHub to sync changes to your own repository.

## License

This project is generated for you. Feel free to customize and use it for your own product or business.
