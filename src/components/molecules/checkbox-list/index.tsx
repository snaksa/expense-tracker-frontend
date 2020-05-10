import React from "react";
import { Checkbox, Grid } from "@material-ui/core";

interface Props {
  options: any;
  onChange: Function;
}

const CheckboxList = ({ options, onChange }: Props) => {
  return (
    <Grid container direction={"column"}>
      {options.map((option: any) => {
        return (
          <Grid item key={option.id}>
            <Checkbox
              checked={option.checked}
              onChange={() => onChange(option.id, !option.checked)}
            />
            {option.label}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CheckboxList;
