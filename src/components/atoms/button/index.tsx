import React from "react";
import MaterialButton from "@material-ui/core/Button";

interface Props {
  children?: any;
  onClick?: any;
  style?: any;
  type?: any;
  color?: any;
  variant?: any;
  className?: any;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  style,
  type,
  color,
  variant,
  className
}): JSX.Element => {
  return (
    <MaterialButton
      className={className}
      type={type}
      style={style}
      variant={variant ?? "contained"}
      color={color ?? 'primary'}
      onClick={onClick}
      fullWidth
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
