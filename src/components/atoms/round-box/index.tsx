import React from "react";
import useStyles from "./styles";
import { Box } from "@material-ui/core";

export interface Props {
  color: string | undefined;
  background?: string;
  width: number,
  height: number,
  centered?: boolean;
}

const RoundBox: React.FunctionComponent<Props> = ({color, background, width, height, centered}: Props): JSX.Element => {
  const classes = useStyles({});

  return (
    <Box
    className={classes.main}
    style={{
      background: background ?? '',
      backgroundColor: color,
      width: width,
      height: height
    }}
    mx={centered ? 'auto' : ''}
  ></Box>
  );
};

export default RoundBox;
