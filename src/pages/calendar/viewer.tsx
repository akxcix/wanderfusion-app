import { Calendar } from "@/components/ui/calendar";

interface CalendarViewerProps {
  from?: Date;
  to?: Date;
}

const CalendarViewer = ({ from, to }: CalendarViewerProps) => {
  return (
    <div>
      <Calendar fromDate={from} toDate={to} />
    </div>
  );
};

export default CalendarViewer;
