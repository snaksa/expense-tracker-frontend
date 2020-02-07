import React from "react";
import useStyles from "./styles";
import { Box } from "@material-ui/core";

export interface Props {
  color: string | undefined;
  width: number,
  height: number,
  centered?: boolean;
}

const RoundBox: React.FunctionComponent<Props> = ({color, width, height, centered}: Props): JSX.Element => {
  const classes = useStyles({});

  return (
    <Box
    className={classes.main}
    style={{
      backgroundColor: color,
      width: width,
      height: height
    }}
    mx={centered ? 'auto' : ''}
  ></Box>
  );
};

export default RoundBox;
