import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const TextField = (props) => {
  return (
    <Box>
      <MaterialTextField {...props} margin="dense" fullWidth />
      {
        props.error ? props.error : ''
      }
      </Box>
  );
}

export default TextField;
