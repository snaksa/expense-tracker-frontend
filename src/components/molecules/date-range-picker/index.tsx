import React, { useState, useCallback } from "react";
import { Box } from "@material-ui/core";
import moment from "moment";
import useTranslations from "translations";
import Select from "components/atoms/form/select";
import useStyles from "./styles";

interface Props {
  onChange: Function;
  responsive?: boolean;
}

interface optionProps {
  id: number;
  value: string;
}

export enum Range {
  All = 0,
  Last7Days = 2,
  Last30Days = 3,
  Last12Months = 4,
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

const DateRangePicker = ({ onChange, responsive }: Props): JSX.Element => {
  const classes = useStyles({});
  const { t } = useTranslations();

  const options: optionProps[] = [
    { id: Range.Last7Days, value: t("Last 7 days") },
    { id: Range.Last30Days, value: t("Last 30 days") },
    { id: Range.Last12Months, value: t("Last 12 months") },
    { id: Range.All, value: t("All") },
  ];

  const [selected, setSelected] = useState<number>(Range.Last7Days);

  const selectionChange = useCallback(
    (event: any) => {
      const value = event.target.value;
      setSelected(value);
      onChange(calculateBackDate(value));
    },
    [onChange]
  );

  return (
    <Box
      mx="auto"
      className={`${classes.main} ${responsive ? classes.responsive : ""}`}
    >
      <Select
        options={options}
        onChange={selectionChange}
        selected={selected}
        label={t("Date Range")}
        name={"name"}
      />
    </Box>
  );
};

export default DateRangePicker;
