import React from "react";
import useStyles from "./styles";
import { Box } from "@material-ui/core";

export interface Props {
  color: string | undefined;
  width: number,
  height: number
}

const RoundBox: React.FunctionComponent<Props> = ({color, width, height}: Props): JSX.Element => {
  const classes = useStyles({});

  return (
    <Box
    className={classes.main}
    style={{
      backgroundColor: color,
      width: width,
      height: height
    }}
  ></Box>
  );
};

export default RoundBox;
