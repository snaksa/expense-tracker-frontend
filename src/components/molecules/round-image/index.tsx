import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import Image from "../../atoms/image";

export interface Props {
  src: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
}

const RoundImage: React.FunctionComponent<Props> = ({
  src,
  borderColor,
  borderWidth,
  borderStyle
}: Props): JSX.Element => {
  const classes = useStyles({});

  return (
    <Box
      className={classes.main}
      style={{ borderColor, borderWidth, borderStyle }}
    >
      <Image src={src} />
    </Box>
  );
};

export default RoundImage;
