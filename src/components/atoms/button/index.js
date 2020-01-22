import React from 'react';
import MaterialButton from '@material-ui/core/Button';

const Button = ({ children, onClick, style }) => {
  return (
    <MaterialButton
      style={style}
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth>
      {children}
    </MaterialButton>
  );
}

export default Button;
