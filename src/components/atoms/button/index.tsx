import React from "react";
import MaterialButton from "@material-ui/core/Button";
interface Props {
  children?: any;
  onClick?: any;
  style?: any;
  type?: any;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  style,
  type
}): JSX.Element => {
  return (
    <MaterialButton
      type={type}
      style={style}
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
