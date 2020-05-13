import React, { useMemo } from "react";
import { Checkbox, Grid } from "@material-ui/core";

interface Props {
  options: any;
  onChange: Function;
}

const CheckboxList = ({ options, onChange }: Props) => {
  const renderOptions = useMemo(
    () =>
      options.map((option: any) => {
        return (
          <Grid item key={option.id}>
            <Checkbox
              checked={option.checked}
              onChange={() => onChange(option.id, !option.checked)}
            />
            {option.label}
          </Grid>
        );
      }),
    [options, onChange]
  );

  return (
    <Grid container direction={"column"}>
      {renderOptions}
    </Grid>
  );
};

export default CheckboxList;
