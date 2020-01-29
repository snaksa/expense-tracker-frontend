import React from 'react';
import MaterialButton from '@material-ui/core/Button';

const Button = ({ children, onClick, style, type }) => {
  return (
    <MaterialButton
      type={type}
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
