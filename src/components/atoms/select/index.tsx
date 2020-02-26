import React from "react";
import Box from "@material-ui/core/Box";
import {
  Select as MaterialSelect,
  MenuItem,
  InputLabel,
  FormControl
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
  onChange
}: Props): JSX.Element => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const inputLabel = React.useRef<HTMLLabelElement>(null);

  return (
    <Box>
      <FormControl variant="outlined" margin='dense' 
          style={{ width: "100%" }}>
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
          {options.map((option: any) => (
            <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
