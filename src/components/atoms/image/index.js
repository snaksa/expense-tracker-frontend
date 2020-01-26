import React from 'react';
import useStyles from './styles';

const Image = ({ src, alt, borderColor, borderWidth, borderStyle }) => {
  const classes = useStyles();
  return (
    <img className={classes.main} src={src} alt={alt} style={{borderColor, borderWidth, borderStyle}} />
  );
}

export default Image;
