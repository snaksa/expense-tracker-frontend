import React, { useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import { KeyboardDatePicker } from "@material-ui/pickers";
import useTranslations from 'translations';

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
  const {t} = useTranslations();

  const handleDateChange = (newDate: Date) => {
    onChange(newDate);
  };

  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <Box>
        <KeyboardDatePicker
          open={open}
          onClick={show}
          onAccept={hide}
          onClose={hide}
          margin="normal"
          name={name}
          id="date-picker-dialog"
          label={t("Date")}
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
