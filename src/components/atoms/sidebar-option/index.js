import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

const SidebarOption = ({option}) => {
  const classes = useStyles();
  return (
    <Box className={classes.main} p={1}>
      {option.label}
    </Box>
  );
}

export default SidebarOption;
