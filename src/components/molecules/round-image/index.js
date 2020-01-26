import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import Image from '../../atoms/image'

const RoundImage = ({ src, borderColor, borderWidth, borderStyle }) => {
  const classes = useStyles();
  return (
    <Box className={classes.main} style={{borderColor, borderWidth, borderStyle}}>
      <Image src={src} />
    </Box>
  );
}

export default RoundImage;
