import React, { useMemo } from "react";
import {
  Box,
  Select as MaterialSelect,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

interface Props {
  label: string;
  name: string;
  selected: any;
  options: any[];
  onChange: any;
}

const Select: React.FunctionComponent<Props> = ({
  label,
  name,
  selected,
  options,
  onChange,
}: Props): JSX.Element => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const inputLabel = React.useRef<HTMLLabelElement>(null);

  const renderOptions = useMemo(
    () =>
      options.map((option: any) => (
        <MenuItem key={option.id} value={option.id}>
          {option.value}
        </MenuItem>
      )),
    [options]
  );

  return (
    <Box>
      <FormControl variant="outlined" margin="dense" style={{ width: "100%" }}>
        <InputLabel ref={inputLabel} id={`select-${name}`}>
          {label}
        </InputLabel>
        <MaterialSelect
          name={name}
          variant="outlined"
          value={selected}
          onChange={onChange}
          labelWidth={labelWidth}
          labelId={`select-${name}`}
        >
          {renderOptions}
        </MaterialSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
