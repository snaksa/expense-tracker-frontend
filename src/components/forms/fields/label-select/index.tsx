import React, { useMemo } from "react";
import {
  Box,
  FormControl,
} from "@material-ui/core";
import ReactSelect from 'react-select';
import { Label } from "api";

interface Props {
  placeholder: string;
  selected: any;
  options: any[];
  onChange: any;
}

const LabelSelect: React.FunctionComponent<Props> = ({
  placeholder,
  selected,
  options,
  onChange,
}: Props): JSX.Element => {

  const allOptions = useMemo(
    () =>
      options.map((option: Label) => (
        {
          key: option.id,
          label: option.name,
          value: option.id
        }
      )),
    [options]
  );

  return (
    <Box>
      <FormControl variant="outlined" margin="dense" style={{ width: "100%" }}>
        <ReactSelect isMulti placeholder={placeholder} options={allOptions} onChange={onChange} value={selected}/>
      </FormControl>
    </Box>
  );
};

export default LabelSelect;
