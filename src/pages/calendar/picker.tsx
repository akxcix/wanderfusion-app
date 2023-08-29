import { DatePickerWithRange } from "@/components/ui/daterangepicker";
import { TypographyH2 } from "@/components/ui/typography";
import { toast } from "@/components/ui/use-toast";

type DateRangeObject = {
  from?: Date;
  to?: Date;
};

const CalendarPicker = () => {
  const toastdate = (x: DateRangeObject | undefined) => {
    console.log(x);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(x, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <div>
      <TypographyH2>Pick Dates</TypographyH2>
      <DatePickerWithRange onSelectedDates={toastdate} />
    </div>
  );
};

export default CalendarPicker;
