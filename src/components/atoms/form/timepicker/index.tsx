import React, { useState } from "react";
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

  const handleChange = (newDate: Date) => {
    onChange(newDate);
  };

  const [open, setOpen] = useState(false);

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
        label={t("Time")}
        value={date}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default TimePicker;
