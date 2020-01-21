import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';

const TextField = (props) => {
  return (
      <MaterialTextField {...props} margin="dense" fullWidth />
  );
}

export default TextField;
