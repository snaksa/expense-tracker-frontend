import React from 'react';
import useStyles from './styles';

const Image = ({ src }) => {
  const classes = useStyles();
  return (
    <img className={classes.main} src={src} />
  );
}

export default Image;
