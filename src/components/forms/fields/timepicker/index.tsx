import React, { useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import { KeyboardTimePicker } from "@material-ui/pickers";
import useTranslations from "translations";

interface Props {
  name: string;
  date: any;
  onChange: any;
}

const TimePicker: React.FunctionComponent<Props> = ({
  name,
  date,
  onChange,
}: Props): JSX.Element => {
  const { t } = useTranslations();

  const handleChange = useCallback((newDate: Date) => {
    onChange(newDate);
  }, [onChange]);

  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <Box>
      <KeyboardTimePicker
        ampm={false}
        open={open}
        onClick={show}
        onAccept={hide}
        onClose={hide}
        margin="normal"
        name={name}
        id="time-picker-dialog"
        label={t("Time")}
        value={date}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default TimePicker;
