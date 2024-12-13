"use client";

import { motion } from "framer-motion";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  color: string;
}

interface CalendarGridProps {
  events: CalendarEvent[];
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="grid grid-cols-7 gap-[1px] bg-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      {days.map((day) => (
        <div
          key={day}
          className="bg-zinc-900 p-2 text-center text-sm text-zinc-400"
        >
          {day}
        </div>
      ))}

      {/* Calendar cells */}
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="bg-zinc-900 h-24 p-1">
          <div className="text-xs text-zinc-500 mb-1">{i + 1}</div>
          {events
            .filter((event) => event.id === `day-${i + 1}`)
            .map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${event.color} text-xs p-1 rounded mb-1 cursor-pointer`}
              >
                {event.time} - {event.title}
              </motion.div>
            ))}
        </div>
      ))}
    </div>
  );
}
