import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyMutedCentered } from "@/components/ui/typography";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

interface CalendarViewerProps {
  dateRanges?: Date[][];
}

const CalendarViewer = ({ dateRanges }: CalendarViewerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = Array(42).fill(null);

    for (let i = 1; i <= lastDate; i++) {
      days[firstDay + i - 1] = new Date(year, month, i);
    }

    return days;
  };

  const isInRange = (date: Date, [from, to]: Date[]) => {
    return date >= from && date <= to;
  };

  const getColor = (date: Date) => {
    for (const range of dateRanges ?? []) {
      if (isInRange(date, range)) {
        return "bg-slate-900";
      }
    }
    return "";
  };

  const monthDays = getMonthDays(currentMonth);

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const goPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  return (
    <div className="calendarViewer">
      <Card>
        <CardHeader className="flex flex-row items-center justify-center">
          <button onClick={goPrevMonth} className="p-2">
            <ArrowLeftIcon />
          </button>
          <div className="flex-grow" />
          <div className="text-center">
            {currentMonth.toLocaleString("default", { month: "long" })}
          </div>
          <div className="flex-grow" />
          <button onClick={goNextMonth} className="p-2">
            <ArrowRightIcon />
          </button>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex flex-row">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="flex-grow text-center justify-center border p-2 w-1/6"
              >
                <TypographyMutedCentered>{day}</TypographyMutedCentered>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {Array.from({ length: Math.ceil(monthDays.length / 7) }).map(
              (_, rowIndex) => (
                <div key={rowIndex} className="flex flex-row w-full">
                  {monthDays
                    .slice(rowIndex * 7, (rowIndex + 1) * 7)
                    .map((date, index) => (
                      <div
                        key={index}
                        className={`flex-grow text-center justify-center border p-2 w-1/6 ${
                          date ? getColor(date) : ""
                        }`}
                      >
                        {date ? date.getDate() : ""}
                      </div>
                    ))}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarViewer;
