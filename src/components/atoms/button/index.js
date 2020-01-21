import React from 'react';
import MaterialButton from '@material-ui/core/Button';

const Button = ({ children, onClick }) => {
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth>
      {children}
    </MaterialButton>
  );
}

export default Button;
