import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

interface CalendarViewerProps {
  dateRanges: Date[][];
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
    for (const range of dateRanges) {
      if (isInRange(date, range)) {
        return "bg-blue-200";
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <button onClick={goPrevMonth} className="p-2">
          <ArrowLeftIcon />
        </button>
        <div className="text-center">
          {currentMonth.toLocaleString("default", { month: "long" })}
        </div>
        <button onClick={goNextMonth} className="p-2">
          <ArrowRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 p-5 w-72 place-items-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="border p-4 grow text-center">
            {day}
          </div>
        ))}
        {monthDays.map((date, index) => (
          <div
            key={index}
            className={`border p-4 grow text-center ${
              date ? getColor(date) : ""
            }`}
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarViewer;
