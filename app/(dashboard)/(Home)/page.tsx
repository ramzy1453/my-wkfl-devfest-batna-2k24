"use client";
import { WorkflowCard } from "../(Home)/_component/workflow-card";
import { CalendarHeader } from "../(Home)/_component/calendar/calendar-header";
import { CalendarGrid } from "../(Home)/_component/calendar/calendar-grid";
import { ChatInterface } from "../(Home)/_component/chat/chat-interface";

const workflows = [
  {
    title: "AeroFlow",
    description:
      "A streamlined workflow for managing tasks with a focus on speed and efficiency.",
  },
  {
    title: "ChronoTrack",
    description:
      "A time-sensitive workflow designed to keep projects on schedule.",
  },
  {
    title: "SyncWave",
    description:
      "A collaborative workflow emphasizing seamless team integration.",
  },
];

const sampleEvents = [
  {
    id: "day-7",
    title: "Team Meeting",
    time: "9:00",
    duration: "2 hours",
    color: "bg-green-500/20 text-green-500",
  },
  {
    id: "day-7",
    title: "Project Review",
    time: "13:00",
    duration: "1 hour",
    color: "bg-orange-500/20 text-orange-500",
  },
  // Add more events as needed
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Trending workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <WorkflowCard
                key={workflow.title}
                title={workflow.title}
                description={workflow.description}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Manage your latest tasks
          </h2>
          <div className="grid md:grid-cols-[1fr,400px] gap-6">
            <div className="space-y-4">
              <CalendarHeader
                currentMonth={new Date()}
                onPrevMonth={() => {}}
                onNextMonth={() => {}}
                view="month"
                onViewChange={() => {}}
              />
              <CalendarGrid events={sampleEvents} />
            </div>
            <ChatInterface />
          </div>
        </section>
      </div>
    </div>
  );
}
