import React, { useState } from "react";
import { Box } from "@material-ui/core";
import useStyles from "./styles";
import Select from "../../atoms/form/select";
import moment from "moment";

interface Props {
  onChange: Function;
}

interface optionProps {
  id: number;
  value: string;
}

export enum Range {
  All = 0,
  Last7Days = 2,
  Last30Days = 3,
  Last12Months = 4
}

export const calculateBackDate = (value: number) => {
  let backDate: any = moment
    .utc()
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  if (value === Range.Last7Days) {
    backDate = backDate.subtract(7, "days");
  } else if (value === Range.Last30Days) {
    backDate = backDate.subtract(30, "days");
  } else if (value === Range.Last12Months) {
    backDate = backDate.subtract(12, "months");
  } else if (value === Range.All) {
    backDate = null;
  }

  return backDate ? backDate.format("Y-M-D") : null;
};

const DateRangePicker = ({ onChange }: Props): JSX.Element => {
  const classes = useStyles({});

  const options: optionProps[] = [
    { id: Range.Last7Days, value: "Last 7 days" },
    { id: Range.Last30Days, value: "Last 30 days" },
    { id: Range.Last12Months, value: "Last 12 months" },
    { id: Range.All, value: "All" }
  ];

  const [selected, setSelected] = useState<number>(Range.Last7Days);

  return (
    <Box mx="auto" className={classes.main}>
      <Select
        options={options}
        onChange={(event: any) => {
          const value = event.target.value;
          setSelected(value);
          onChange(calculateBackDate(value));
        }}
        selected={selected}
        label={"Date Range"}
        name={"name"}
      />
    </Box>
  );
};

export default DateRangePicker;
