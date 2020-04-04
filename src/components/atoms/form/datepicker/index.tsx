import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { KeyboardDatePicker } from "@material-ui/pickers";

interface Props {
  name: string;
  date: any;
  onChange: any;
}

const DatePicker: React.FunctionComponent<Props> = ({
  name,
  date,
  onChange
}: Props): JSX.Element => {
  const handleDateChange = (newDate: Date) => {
    onChange(newDate);
  };

  const [open, setOpen] = useState(false);

  return (
    <Box>
        <KeyboardDatePicker
          open={open}
          onClick={() => setOpen(true)}
          onAccept={() => setOpen(false)}
          onClose={() => setOpen(false)}
          margin="normal"
          name={name}
          id="date-picker-dialog"
          label="Date"
          animateYearScrolling={true}
          format="yyyy-MM-dd"
          value={date}
          onChange={handleDateChange}
          fullWidth
        />
    </Box>
  );
};

export default DatePicker;
