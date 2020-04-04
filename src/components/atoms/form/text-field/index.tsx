import React from "react";
import MaterialTextField, { TextFieldProps } from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const TextField: React.FunctionComponent<TextFieldProps> = (
  props: TextFieldProps
): JSX.Element => {
  return (
    <Box>
      <MaterialTextField margin="dense" {...props} helperText={props.error && props.helperText} fullWidth />
    </Box>
  );
};

export default TextField;
