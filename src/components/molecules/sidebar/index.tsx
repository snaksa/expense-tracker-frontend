import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import SidebarOption from '../../atoms/sidebar-option';

export interface Props {
  isVisible: boolean;
  options: object[];
}

const Sidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { isVisible, options } = props;
  const classes = useStyles();
  return isVisible ? (
    <Grid container className={classes.main} direction='column'>
      {
        options.map(option => <Grid item>
          <SidebarOption option={option} />
        </Grid>)
      }
    </Grid>
  )
  : <React.Fragment>No menu found</React.Fragment>;
}

export default Sidebar;
