import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, FileText, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { EmailTool } from "@/components/landing/EmailTool";
import { NotesTool } from "@/components/landing/NotesTool";
import { PlannerTool } from "@/components/landing/PlannerTool";
import { Faq, Features, HowItWorks, SiteFooter, Testimonials } from "@/components/landing/Sections";

const title = "JackOfAllTradesAI — All-in-One AI Productivity Suite";
const description =
  "Draft emails in your exact tone, turn messy meeting notes into action items, and build prioritized schedules in seconds.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState("email");

  const goto = (t: string) => {
    setTab(t);
    document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main>
        <Hero onQuickAction={goto} />

        <section id="workspace" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20">
          <div className="surface-card rounded-3xl p-4 sm:p-8">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3">
                <TabsTrigger value="email" className="gap-2 py-2.5">
                  <Mail className="h-4 w-4" /> Smart Email
                </TabsTrigger>
                <TabsTrigger value="notes" className="gap-2 py-2.5">
                  <FileText className="h-4 w-4" /> Notes Summarizer
                </TabsTrigger>
                <TabsTrigger value="planner" className="gap-2 py-2.5">
                  <CalendarDays className="h-4 w-4" /> Task Planner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-8">
                <EmailTool />
              </TabsContent>
              <TabsContent value="notes" className="mt-8">
                <NotesTool />
              </TabsContent>
              <TabsContent value="planner" className="mt-8">
                <PlannerTool />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
