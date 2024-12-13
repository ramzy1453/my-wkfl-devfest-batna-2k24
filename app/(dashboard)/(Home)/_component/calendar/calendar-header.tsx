import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  view: "month" | "week" | "day" | "list";
  onViewChange: (view: "month" | "week" | "day" | "list") => void;
}

export function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  view,
  onViewChange,
}: CalendarHeaderProps) {
  const views = ["Month", "Week", "Day", "List"];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="ghost" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
        {views.map((v) => (
          <Button
            key={v}
            variant={
              view.toLowerCase() === v.toLowerCase() ? "secondary" : "ghost"
            }
            size="sm"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => onViewChange(v.toLowerCase() as any)}
            className="text-sm"
          >
            {v}
          </Button>
        ))}
      </div>
    </div>
  );
}
