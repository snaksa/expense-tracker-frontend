import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { KeyboardTimePicker } from "@material-ui/pickers";

interface Props {
  name: string;
  date: any;
  onChange: any;
}

const TimePicker: React.FunctionComponent<Props> = ({
  name,
  date,
  onChange
}: Props): JSX.Element => {
  const handleChange = (newDate: Date) => {
    onChange(newDate);
  };

  const [open, setOpen] = useState(false);
  console.log(date);

  return (
    <Box>
        <KeyboardTimePicker
          ampm={false}
          open={open}
          onClick={() => setOpen(true)}
          onAccept={() => setOpen(false)}
          onClose={() => setOpen(false)}
          margin="normal"
          name={name}
          id="time-picker-dialog"
          label="Time"
          value={date}
          onChange={handleChange}
          fullWidth
        />
    </Box>
  );
};

export default TimePicker;
