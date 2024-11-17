"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerPopoverProps {
  selected: Date | null;
  onChange: (date: Date) => void;
}

function DatePickerPopover({ selected, onChange }: DatePickerPopoverProps) {
  const [date, setDate] = React.useState(selected);

  React.useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date, onChange]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date as Date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePickerPopover;
// import * as React from "react"
// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// interface DatePickerPopoverProps {
//     selected:Date,
//     onChange:(date:Date)=>void
// }

// function DatePickerPopover({selected,onChange}:DatePickerPopoverProps) {
//     const [date, setDate] = React.useState<Date>()

//     React.useEffect(() => {
//         if(date){
//             onChange(date)
//         }
//     }, [date, onChange])

//     React.useEffect(() => {
//         if(selected) {
//             setDate(selected);
//         }
//     }, [selected])

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default DatePickerPopover
