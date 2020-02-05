import React from "react";
import useStyles from "./styles";

export interface Props {
  src: string;
  alt?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
}

const Image: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { src, alt, borderColor, borderWidth, borderStyle } = props;
  const classes = useStyles({});

  return (
    <img
      className={classes.main}
      src={src}
      alt={alt}
      style={{ borderColor, borderWidth, borderStyle }}
    />
  );
};

export default Image;
