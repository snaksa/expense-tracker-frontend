import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import Image from '../../atoms/image'

const RoundImage = ({ src }) => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Image src={src} />
    </Box>
  );
}

export default RoundImage;
