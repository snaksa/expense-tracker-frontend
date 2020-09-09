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
  disabled?: boolean;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  style,
  type,
  color,
  variant,
  className,
  disabled,
}): JSX.Element => {
  return (
    <MaterialButton
      className={className}
      type={type}
      style={style}
      variant={variant ?? "contained"}
      color={color ?? "primary"}
      onClick={onClick}
      disabled={disabled}
      fullWidth
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
