import React from "react";
import useStyles from "./styles";

export interface Props {
  src: string;
  alt?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  maxWidth?: string;
}

const Image: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { src, alt, borderColor, borderWidth, borderStyle, maxWidth } = props;
  const classes = useStyles();

  return (
    <img
      className={classes.main}
      src={src}
      alt={alt}
      style={{ borderColor, borderWidth, borderStyle, maxWidth }}
    />
  );
};

export default Image;
