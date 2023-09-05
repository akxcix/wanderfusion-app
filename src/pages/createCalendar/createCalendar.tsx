import { TypographyH1 } from "@/components/ui/typography";
import { CreateCalendarForm } from "./createCalendarForm";

export function CreateCalendar() {
  return (
    <div className="updateProfile">
      <TypographyH1>Create New Calendar</TypographyH1>
      <CreateCalendarForm />
    </div>
  );
}
