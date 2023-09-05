import { DatePickerWithRange } from "@/components/ui/daterangepicker";
import { TypographyH2 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";
import { addNewDatesToCalendar } from "@/network/nomadcore/client";
import { useLocation } from "react-router";

type DateRangeObject = {
  from?: Date;
  to?: Date;
};

const CalendarPicker = () => {
  const { state } = useLocation();
  const { calendarId } = state;

  const toastdate = (message: string) => {
    toast({
      title: "Added Dates",
      description: message,
    });
  };

  const handleSubmit = (x: DateRangeObject | undefined) => {
    if (!x?.from || !x?.to || !calendarId) {
      console.error("Missing required data");
      return;
    }

    console.log(calendarId);
    console.log(x.from.toISOString());
    console.log(x.to);

    addNewDatesToCalendar(calendarId, x.from.toISOString(), x.to.toISOString())
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
