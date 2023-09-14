import { DatePickerWithRange } from "@/components/ui/daterangepicker";
import { TypographyH2 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { addNewDatesToCalendar } from "@/network/nomadcore/client";

type DateRangeObject = {
  from?: Date;
  to?: Date;
};

interface CalendarPickerProps {
  groupId: string;
  callback?: () => void;
}
const CalendarPicker = ({ groupId, callback }: CalendarPickerProps) => {
  const toastdate = (message: string) => {
    toast({
      title: "Added Dates",
      description: message,
    });
    if (callback) {
      callback();
    }
  };

  const handleSubmit = (x: DateRangeObject | undefined) => {
    if (!x?.from || !x?.to || !groupId) {
      console.error("Missing required data");
      return;
    }

    addNewDatesToCalendar(groupId, x.from.toISOString(), x.to.toISOString())
      .then((response) => {
        if (response) {
          toastdate(response);
        }
      })
      .catch((e) => {
        console.error("Error adding dates:", e);
      });
  };

  return (
    <div>
      <TypographyH2>Pick Dates</TypographyH2>
      <DatePickerWithRange onSelectedDates={handleSubmit} />
    </div>
  );
};

export default CalendarPicker;
