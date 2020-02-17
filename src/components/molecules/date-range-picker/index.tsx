import React, {useState} from "react";
import { Box } from "@material-ui/core";
import useStyles from "./styles";
import Select from "../../atoms/select";

interface Props {
  onChange: Function;
}

interface optionProps {
  id: number, 
  value: string
};

export enum Range {
  All = 0,
  Last7Days = 2,
  Last30Days = 3,
  Last12Months = 4
}

const DateRangePicker = ({onChange}: Props): JSX.Element => {
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
          setSelected(event.target.value);
          onChange(event.target.value);
        }}
        selected={selected}
        label={"Date Range"}
        name={"name"}
      />
    </Box>
  );
};

export default DateRangePicker;
