import React from "react";
import Typography from "@material-ui/core/Typography";

const Title: React.FunctionComponent<any> = (
  props
): JSX.Element => {
  const children = props.children;
  return (
    <Typography {...props} fullWidth>
      {children}
    </Typography>
  );
};

export default Title;
